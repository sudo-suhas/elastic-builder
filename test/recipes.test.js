import test from 'ava';
import * as bob from '../src';
import { illegalParamType } from './_macros';

test('missing query recipe', t => {
    t.is(bob.recipes.missingQuery, bob.cookMissingQuery);

    const value = bob.recipes.missingQuery('my_field');
    t.is(value.constructor.name, 'BoolQuery');

    const expected = {
        bool: {
            must_not: { exists: { field: 'my_field' } }
        }
    };
    t.deepEqual(value.toJSON(), expected);
});

test(illegalParamType, bob.recipes, 'randomSortQuery', 'Query');
test('random sort query', t => {
    t.is(bob.recipes.randomSortQuery, bob.cookRandomSortQuery);

    let value = bob.recipes.randomSortQuery();
    t.is(value.constructor.name, 'FunctionScoreQuery');

    let expected = {
        function_score: {
            query: {
                match_all: {}
            },
            random_score: {}
        }
    };
    t.deepEqual(value.toJSON(), expected);

    const seed = Date.now();
    value = bob.recipes
        .randomSortQuery(new bob.RangeQuery('age').gte(10), seed)
        .toJSON();
    expected = {
        function_score: {
            query: {
                range: { age: { gte: 10 } }
            },
            random_score: { seed }
        }
    };
    t.deepEqual(value, expected);
});

test(illegalParamType, bob.recipes, 'filterQuery', 'Query');
test('filter query', t => {
    t.is(bob.recipes.filterQuery, bob.cookFilterQuery);

    const qry = new bob.TermQuery('status', 'active');
    let value = bob.recipes.filterQuery(qry);
    t.is(value.constructor.name, 'BoolQuery');

    let expected = {
        bool: {
            filter: {
                term: { status: 'active' }
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value = bob.recipes.filterQuery(qry, true).toJSON();
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
