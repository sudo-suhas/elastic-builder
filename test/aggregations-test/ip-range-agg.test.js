import test from 'ava';
import { IpRangeAggregation } from '../../src';
import { illegalCall } from '../_macros';

const getInstance = (...args) =>
    new IpRangeAggregation('my_agg', ...args).range({ to: '10.0.0.5' });

test(illegalCall, IpRangeAggregation, 'format');

test('sets type as ip_range', t => {
    const myAgg = getInstance().toJSON();
    const expected = {
        my_agg: {
            ip_range: {
                ranges: [{ to: '10.0.0.5' }]
            }
        }
    };
    t.deepEqual(myAgg, expected);
});

test('constructor sets arguments', t => {
    const myAgg = getInstance('ip').toJSON(),
        expected = {
            my_agg: {
                ip_range: {
                    field: 'ip',
                    ranges: [{ to: '10.0.0.5' }]
                }
            }
        };
    t.deepEqual(myAgg, expected);
});

test('range checks required keys', t => {
    t.throws(() => getInstance().range({}), Error);
    t.throws(() => getInstance().range({ key: 'invalid' }), Error);

    t.notThrows(() => getInstance().range({ to: '10.0.0.5' }));
    t.notThrows(() => getInstance().range({ to: '10.0.0.5', key: 'my_ip_range_key' }));
    t.notThrows(() => getInstance().range({ from: '10.0.0.5' }));
    t.notThrows(() => getInstance().range({ from: '10.0.0.5', key: 'my_ip_range_key' }));
    t.notThrows(() => getInstance().range({ mask: '10.0.0.0/25' }));
    t.notThrows(() => getInstance().range({ mask: '10.0.0.0/25', key: 'my_ip_range_key' }));
});
