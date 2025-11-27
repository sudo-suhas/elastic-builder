import { describe, test, expect } from 'vitest';
import { WeightedAverageAggregation, Script } from '../../src';

const getInstance = (...args) =>
    new WeightedAverageAggregation('my_agg', ...args);

describe('WeightedAverageAggregation', () => {
    test('sets type as weighted_avg', () => {
        const value = new WeightedAverageAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: {
                weighted_avg: {
                    value: {},
                    weight: {}
                }
            }
        });
    });

    test('field cannot be set', () => {
        expect(() => new WeightedAverageAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in WeightedAverageAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new WeightedAverageAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in WeightedAverageAggregation')
        );
    });

    test('missing cannot be set', () => {
        expect(() =>
            new WeightedAverageAggregation('my_agg').missing()
        ).toThrow(
            new Error('missing is not supported in WeightedAverageAggregation')
        );
    });

    describe('options', () => {
        test('sets weight with field name', () => {
            const value = getInstance().weight('my_weight_field').toJSON();
            expect(value).toEqual({
                my_agg: {
                    weighted_avg: {
                        weight: { field: 'my_weight_field' },
                        value: {}
                    }
                }
            });
        });

        test('sets value with field name', () => {
            const value = getInstance().value('my_value_field').toJSON();
            expect(value).toEqual({
                my_agg: {
                    weighted_avg: {
                        value: { field: 'my_value_field' },
                        weight: {}
                    }
                }
            });
        });

        test('sets weight with field and missing', () => {
            const value = getInstance().weight('my_weight_field', 20).toJSON();
            expect(value).toEqual({
                my_agg: {
                    weighted_avg: {
                        weight: { field: 'my_weight_field', missing: 20 },
                        value: {}
                    }
                }
            });
        });

        test('sets value with field and missing', () => {
            const value = getInstance().value('my_value_field', 10).toJSON();
            expect(value).toEqual({
                my_agg: {
                    weighted_avg: {
                        value: { field: 'my_value_field', missing: 10 },
                        weight: {}
                    }
                }
            });
        });

        test('sets value with script', () => {
            const scriptInstance = new Script('inline', "doc['field'].value");
            const value = getInstance().value(scriptInstance).toJSON();
            expect(value).toEqual({
                my_agg: {
                    weighted_avg: {
                        value: { script: { inline: "doc['field'].value" } },
                        weight: {}
                    }
                }
            });
        });

        test('sets weight with script', () => {
            const scriptInstance = new Script('inline', "doc['field'].value");
            const value = getInstance().weight(scriptInstance).toJSON();
            expect(value).toEqual({
                my_agg: {
                    weighted_avg: {
                        weight: { script: { inline: "doc['field'].value" } },
                        value: {}
                    }
                }
            });
        });
    });

    describe('validation', () => {
        test('throws if value is not a script or string', () => {
            expect(() =>
                new WeightedAverageAggregation('my_agg').value(10, 10)
            ).toThrow(
                new TypeError(
                    'Value must be either a string or instanceof Script'
                )
            );
        });

        test('throws if weight is not a script or string', () => {
            expect(() =>
                new WeightedAverageAggregation('my_agg').weight(10, 10)
            ).toThrow(
                new TypeError(
                    'Weight must be either a string or instanceof Script'
                )
            );
        });
    });

    describe('field/script updates', () => {
        test('removes previously set value field/script when updated', () => {
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
            expect(valueOne.toJSON()).toEqual(expectedOne);

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
            expect(valueTwo.toJSON()).toEqual(expectedTwo);

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
            expect(valueThree.toJSON()).toEqual(expectedThree);
        });

        test('removes previously set weight field/script when updated', () => {
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
            expect(valueOne.toJSON()).toEqual(expectedOne);

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
            expect(valueTwo.toJSON()).toEqual(expectedTwo);

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
            expect(valueThree.toJSON()).toEqual(expectedThree);
        });
    });

    describe('constructor', () => {
        test('sets value and weight', () => {
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
            expect(value).toEqual(expected);
        });

        test('sets value and weight as scripts', () => {
            const getScript = arg =>
                new Script('inline', `doc['${arg}'].value`);
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
            expect(value).toEqual(expected);
        });
    });
});
