import test from 'ava';
import { FilterAggregation, TermQuery } from '../../src';
import { illegalCall, illegalParamType, setsAggType } from '../_macros';

const getInstance = (...args) =>
    new FilterAggregation('my_filter_agg', ...args);

const filterQry = new TermQuery('user', 'kimchy');

test('constructor sets arguments', t => {
    const value = getInstance(filterQry).toJSON();
    const expected = getInstance().filter(filterQry).toJSON();
    t.deepEqual(value, expected);
});

test(setsAggType, FilterAggregation, 'filter');
test(illegalCall, FilterAggregation, 'field', 'my_agg');
test(illegalCall, FilterAggregation, 'script', 'my_agg');
test(illegalParamType, getInstance(), 'filter', 'Query');

test('filter is set', t => {
    const value = getInstance().filter(filterQry).toJSON();
    const expected = {
        my_filter_agg: {
            filter: { term: { user: 'kimchy' } }
        }
    };
    t.deepEqual(value, expected);
});
