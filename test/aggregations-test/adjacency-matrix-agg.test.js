import { describe, test, expect } from 'vitest';
import { AdjacencyMatrixAggregation, termQuery } from '../../src';

const getInstance = () => new AdjacencyMatrixAggregation('my_adj_mat_agg');

const filterQryA = termQuery('user', 'kimchy');
const filterQryB = termQuery('company', 'elastic');

describe('AdjacencyMatrixAggregation', () => {
    test('sets type as adjacency_matrix', () => {
        const value = new AdjacencyMatrixAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { adjacency_matrix: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new AdjacencyMatrixAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in AdjacencyMatrixAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new AdjacencyMatrixAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in AdjacencyMatrixAggregation')
        );
    });

    describe('options', () => {
        test('sets separator', () => {
            const value = getInstance().separator('$').toJSON();
            expect(value).toEqual({
                my_adj_mat_agg: {
                    adjacency_matrix: {
                        separator: '$'
                    }
                }
            });
        });
    });

    describe('filters', () => {
        test('filters are set', () => {
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
            expect(value).toEqual(expected);

            value = getInstance()
                .filters({
                    user_kimchy: filterQryA,
                    company_elastic: filterQryB
                })
                .toJSON();
            expect(value).toEqual(expected);
        });

        test('filters are merged', () => {
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
            expect(value).toEqual(expected);
        });
    });
});
