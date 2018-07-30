import test from 'ava';
import * as esb from '../src';
import { illegalParamType } from './_macros';

test('missing query recipe', t => {
    t.is(esb.recipes.missingQuery, esb.cookMissingQuery);

    const value = esb.recipes.missingQuery('my_field');
    t.is(value.constructor.name, 'BoolQuery');

    const expected = {
        bool: {
            must_not: { exists: { field: 'my_field' } }
        }
    };
    t.deepEqual(value.toJSON(), expected);
});

test(illegalParamType, esb.recipes, 'randomSortQuery', 'Query');
test('random sort query', t => {
    t.is(esb.recipes.randomSortQuery, esb.cookRandomSortQuery);

    let value = esb.recipes.randomSortQuery();
    t.is(value.constructor.name, 'FunctionScoreQuery');

    let expected = {
        function_score: {
            query: {
                match_all: {}
            },
            functions: [{ random_score: {} }]
        }
    };
    t.deepEqual(value.toJSON(), expected);

    const seed = Date.now();
    value = esb.recipes
        .randomSortQuery(new esb.RangeQuery('age').gte(10), seed)
        .toJSON();
    expected = {
        function_score: {
            query: {
                range: { age: { gte: 10 } }
            },
            functions: [{ random_score: { seed } }]
        }
    };
    t.deepEqual(value, expected);
});

test(illegalParamType, esb.recipes, 'filterQuery', 'Query');
test('filter query', t => {
    t.is(esb.recipes.filterQuery, esb.cookFilterQuery);

    const qry = new esb.TermQuery('status', 'active');
    let value = esb.recipes.filterQuery(qry);
    t.is(value.constructor.name, 'BoolQuery');

    let expected = {
        bool: {
            filter: {
                term: { status: 'active' }
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value = esb.recipes.filterQuery(qry, true).toJSON();
    expected = {
        bool: {
            must: { match_all: {} },
            filter: {
                term: { status: 'active' }
            }
        }
    };
    t.deepEqual(value, expected);
});
