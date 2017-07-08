import test from 'ava';
import sinon from 'sinon';
import { FiltersAggregation, termQuery } from '../../src';
import {
    illegalCall,
    illegalParamType,
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (...args) => new FiltersAggregation('my_filters_agg', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_filters_agg', 'filters')
);

const filterQryA = termQuery('user', 'kimchy');
const filterQryB = termQuery('company', 'elastic');

test(setsAggType, FiltersAggregation, 'filters');
test(illegalCall, FiltersAggregation, 'field', 'my_agg');
test(illegalCall, FiltersAggregation, 'script', 'my_agg');
test(illegalParamType, getInstance(), 'filter', 'Query');
test(setsOption, 'otherBucket', { param: true });
test(setsOption, 'otherBucketKey', { param: 'other_messages' });

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

test.serial('mixed representation logs warning', t => {
    const spy = sinon.spy(console, 'warn');

    getInstance().filter('user_kimchy', filterQryA).anonymousFilter(filterQryB).toJSON();

    t.true(spy.calledTwice);
    t.true(
        spy.firstCall.calledWith('[FiltersAggregation] Do not mix named and anonymous filters!')
    );
    t.true(spy.secondCall.calledWith('[FiltersAggregation] Overwriting named filters.'));

    console.warn.restore();
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
