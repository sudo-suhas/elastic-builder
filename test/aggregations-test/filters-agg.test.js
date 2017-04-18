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
test(aggPropIsSet, 'otherBucket', true);
test(aggPropIsSet, 'otherBucketKey', 'other_messages');

test('named filters are set', t => {
    let myAgg = getInstance()
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
    t.deepEqual(myAgg, expected);

    myAgg = getInstance()
        .filters({
            user_kimchy: filterQryA,
            company_elastic: filterQryB
        })
        .toJSON();
    t.deepEqual(myAgg, expected);
});

test('anonymous filters are set', t => {
    let myAgg = getInstance().anonymousFilter(filterQryA).anonymousFilter(filterQryB).toJSON();
    const expected = {
        my_filters_agg: {
            filters: {
                filters: [{ term: { user: 'kimchy' } }, { term: { company: 'elastic' } }]
            }
        }
    };
    t.deepEqual(myAgg, expected);

    myAgg = getInstance().anonymousFilters([filterQryA, filterQryB]).toJSON();
    t.deepEqual(myAgg, expected);
});

test('mixed representation', t => {
    let myAgg = getInstance()
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
    t.deepEqual(myAgg, expected);

    myAgg = getInstance()
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
    t.deepEqual(myAgg, expected);
});

// TODO: Test warnings for mixed representation
