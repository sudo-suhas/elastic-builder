import test from 'ava';
import { RangeAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { illegalParamType, nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) =>
    new RangeAggregationBase('my_agg', 'my_type', ...args).range({ from: 10, to: 20 });

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'my_type', {
        ranges: [{ from: 10, to: 20 }]
    })
);

test(illegalParamType, getInstance(), 'range', 'Object');
test(illegalParamType, getInstance(), 'ranges', 'Array');
test(setsOption, 'format', { param: 'MM-yyy' });
test(setsOption, 'missing', { param: '01-1970' });
test(setsOption, 'keyed', { param: true });

test('empty ranges throws', t => {
    const err = t.throws(() => new RangeAggregationBase('my_agg', 'my_type').toJSON(), Error);
    t.is(err.message, '`ranges` cannot be empty.');
});

test('range checks required keys', t => {
    t.throws(() => getInstance().range({}), Error);
    t.throws(() => getInstance().range({ key: 'invalid' }), Error);

    t.notThrows(() => getInstance().range({ to: 50 }));
    t.notThrows(() => getInstance().range({ to: 50, key: 'fifty' }));
    t.notThrows(() => getInstance().range({ from: 10 }));
    t.notThrows(() => getInstance().range({ from: 10, key: 'ten' }));
});

test('ranges are set', t => {
    const valueA = getInstance()
        .range({ from: 20, to: 30 })
        .range({ from: 30, to: 40 })
        .range({ from: 40, to: 50 })
        .toJSON();
    const valueB = getInstance()
        .ranges([{ from: 20, to: 30 }, { from: 30, to: 40 }, { from: 40, to: 50 }])
        .toJSON();
    const expected = {
        my_agg: {
            my_type: {
                ranges: [
                    { from: 10, to: 20 },
                    { from: 20, to: 30 },
                    { from: 30, to: 40 },
                    { from: 40, to: 50 }
                ]
            }
        }
    };
    t.deepEqual(valueA, valueB);
    t.deepEqual(valueA, expected);
});
