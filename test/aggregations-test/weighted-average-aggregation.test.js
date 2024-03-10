import test from 'ava';
import { WeightedAverageAggregation, Script } from '../../src';
import {
    illegalCall,
    makeSetsOptionMacro,
    nameTypeExpectStrategy,
    setsAggType
} from '../_macros';

test(setsAggType, WeightedAverageAggregation, 'weighted_avg', {
    value: {},
    weight: {}
});

const getInstance = (...args) =>
    new WeightedAverageAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'weighted_avg', { value: {}, weight: {} })
);
test(illegalCall, WeightedAverageAggregation, 'field', 'my_agg');
test(illegalCall, WeightedAverageAggregation, 'script', 'my_agg');
test(illegalCall, WeightedAverageAggregation, 'missing', 'my_agg');

test(setsOption, 'weight', {
    param: 'my_weight_field',
    propValue: { field: 'my_weight_field' }
});
test(setsOption, 'value', {
    param: 'my_value_field',
    propValue: { field: 'my_value_field' }
});

test(setsOption, 'weight', {
    param: ['my_weight_field', 20],
    spread: true,
    propValue: { field: 'my_weight_field', missing: 20 }
});
test(setsOption, 'value', {
    param: ['my_value_field', 10],
    spread: true,
    propValue: { field: 'my_value_field', missing: 10 }
});

test(setsOption, 'value', {
    param: new Script('inline', "doc['field'].value"),
    propValue: { script: { inline: "doc['field'].value" } }
});
test(setsOption, 'weight', {
    param: new Script('inline', "doc['field'].value"),
    propValue: { script: { inline: "doc['field'].value" } }
});

test('throws if value is not a script or string', t => {
    const error = t.throws(
        () => new WeightedAverageAggregation('my_agg').value(10, 10),
        TypeError
    );
    t.is(error.message, 'Value must be either a string or instanceof Script');
});

test('throws if weight is not a script or string', t => {
    const error = t.throws(
        () => new WeightedAverageAggregation('my_agg').weight(10, 10),
        TypeError
    );
    t.is(error.message, 'Weight must be either a string or instanceof Script');
});

test('removes previously set value field/script when updated', t => {
    const valueOne = new WeightedAverageAggregation('my_agg').value(
        new Script('inline', 'script')
    );
    const expectedOne = {
        my_agg: {
            weighted_avg: {
                value: {
                    script: {
                        inline: 'script'
                    }
                },
                weight: {}
            }
        }
    };
    t.deepEqual(valueOne.toJSON(), expectedOne);
    const valueTwo = valueOne.value('my_field');
    const expectedTwo = {
        my_agg: {
            weighted_avg: {
                value: {
                    field: 'my_field'
                },
                weight: {}
            }
        }
    };
    t.deepEqual(valueTwo.toJSON(), expectedTwo);
    const valueThree = valueOne.value(new Script('inline', 'script2'));
    const expectedThree = {
        my_agg: {
            weighted_avg: {
                value: {
                    script: {
                        inline: 'script2'
                    }
                },
                weight: {}
            }
        }
    };
    t.deepEqual(valueThree.toJSON(), expectedThree);
});

test('removes previously set weight field/script when updated', t => {
    const valueOne = new WeightedAverageAggregation('my_agg').weight(
        new Script('inline', 'script')
    );
    const expectedOne = {
        my_agg: {
            weighted_avg: {
                weight: {
                    script: {
                        inline: 'script'
                    }
                },
                value: {}
            }
        }
    };
    t.deepEqual(valueOne.toJSON(), expectedOne);
    const valueTwo = valueOne.weight('my_field');
    const expectedTwo = {
        my_agg: {
            weighted_avg: {
                weight: {
                    field: 'my_field'
                },
                value: {}
            }
        }
    };
    t.deepEqual(valueTwo.toJSON(), expectedTwo);
    const valueThree = valueOne.weight(new Script('inline', 'script2'));
    const expectedThree = {
        my_agg: {
            weighted_avg: {
                weight: {
                    script: {
                        inline: 'script2'
                    }
                },
                value: {}
            }
        }
    };
    t.deepEqual(valueThree.toJSON(), expectedThree);
});

test('constructor sets value and weight', t => {
    const value = new WeightedAverageAggregation(
        'my_agg',
        'my_value',
        'my_weight'
    ).toJSON();
    const expected = {
        my_agg: {
            weighted_avg: {
                value: {
                    field: 'my_value'
                },
                weight: {
                    field: 'my_weight'
                }
            }
        }
    };
    t.deepEqual(value, expected);
});

test('constructor sets value and weight as scripts', t => {
    const getScript = arg => new Script('inline', `doc['${arg}'].value`);
    const value = new WeightedAverageAggregation(
        'my_agg',
        getScript('value'),
        getScript('weight')
    ).toJSON();
    const expected = {
        my_agg: {
            weighted_avg: {
                value: {
                    script: {
                        inline: "doc['value'].value"
                    }
                },
                weight: {
                    script: {
                        inline: "doc['weight'].value"
                    }
                }
            }
        }
    };
    t.deepEqual(value, expected);
});
