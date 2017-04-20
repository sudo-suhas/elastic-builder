import test from 'ava';
import { FiltersAggregation, termQuery } from '../../src';
import { illegalCall, illegalParamType, setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new FiltersAggregation('my_filters_agg', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_filters_agg', 'filters');

const filterQryA = termQuery('user', 'kimchy');
const filterQryB = termQuery('company', 'elastic');

test(setsAggType, FiltersAggregation, 'filters');
test(illegalCall, FiltersAggregation, 'field');
test(illegalCall, FiltersAggregation, 'script');
test(illegalParamType, getInstance(), 'filter', 'Query');
test(aggPropIsSet, 'otherBucket', { param: true });
test(aggPropIsSet, 'otherBucketKey', { param: 'other_messages' });

test('named filters are set', t => {
    let value = getInstance()
        .filter('user_kimchy', filterQryA)
        .filter('company_elastic', filterQryB)
        .toJSON();
    const expected = {
        my_filters_agg: {
            filters: {
                filters: {
                    user_kimchy: { term: { user: 'kimchy' } },
                    company_elastic: { term: { company: 'elastic' } }
                }
            }
        }
    };
    t.deepEqual(value, expected);

    value = getInstance()
        .filters({
            user_kimchy: filterQryA,
            company_elastic: filterQryB
        })
        .toJSON();
    t.deepEqual(value, expected);
});

test('anonymous filters are set', t => {
    let value = getInstance().anonymousFilter(filterQryA).anonymousFilter(filterQryB).toJSON();
    const expected = {
        my_filters_agg: {
            filters: {
                filters: [{ term: { user: 'kimchy' } }, { term: { company: 'elastic' } }]
            }
        }
    };
    t.deepEqual(value, expected);

    value = getInstance().anonymousFilters([filterQryA, filterQryB]).toJSON();
    t.deepEqual(value, expected);
});

test('mixed representation', t => {
    let value = getInstance()
        .filter('user_kimchy', filterQryA)
        .anonymousFilter(filterQryB)
        .toJSON();
    let expected = {
        my_filters_agg: {
            filters: {
                filters: [{ term: { company: 'elastic' } }]
            }
        }
    };
    t.deepEqual(value, expected);

    value = getInstance()
        .anonymousFilter(filterQryA)
        .filter('company_elastic', filterQryB)
        .toJSON();
    expected = {
        my_filters_agg: {
            filters: {
                filters: { company_elastic: { term: { company: 'elastic' } } }
            }
        }
    };
    t.deepEqual(value, expected);
});

test('other_bucket_key is set', t => {
    const value = getInstance().otherBucket(true, 'other_messages').toJSON();
    const expected = {
        my_filters_agg: {
            filters: {
                other_bucket: true,
                other_bucket_key: 'other_messages'
            }
        }
    };
    t.deepEqual(value, expected);
});

// TODO: Test warnings for mixed representation
