import test from 'ava';
import { AdjacencyMatrixAggregation, termQuery } from '../../src';
import { illegalCall, setsAggType, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new AdjacencyMatrixAggregation('my_adj_mat_agg');

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_adj_mat_agg', 'adjacency_matrix')
);

const filterQryA = termQuery('user', 'kimchy');
const filterQryB = termQuery('company', 'elastic');

test(setsAggType, AdjacencyMatrixAggregation, 'adjacency_matrix');
test(illegalCall, AdjacencyMatrixAggregation, 'field', 'my_agg');
test(illegalCall, AdjacencyMatrixAggregation, 'script', 'my_agg');
test(setsOption, 'separator', { param: '$' });

test('filters are set', t => {
    let value = getInstance()
        .filter('user_kimchy', filterQryA)
        .filter('company_elastic', filterQryB)
        .toJSON();
    const expected = {
        my_adj_mat_agg: {
            adjacency_matrix: {
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

test('filters are merged', t => {
    const agg = getInstance().filters({ user_kimchy: filterQryA });
    agg.filters({ company_elastic: filterQryB });

    const value = agg.toJSON();
    const expected = {
        my_adj_mat_agg: {
            adjacency_matrix: {
                filters: {
                    user_kimchy: { term: { user: 'kimchy' } },
                    company_elastic: { term: { company: 'elastic' } }
                }
            }
        }
    };
    t.deepEqual(value, expected);
});
