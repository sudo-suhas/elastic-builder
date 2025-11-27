import { describe, test, expect } from 'vitest';
import esb, { SparseVectorQuery } from '../../src';

describe('SparseVectorQuery', () => {
    describe('options', () => {
        test('sets inference id and query', () => {
            const q = new SparseVectorQuery();
            q.field('my_field').inferenceId('model_id').query('my query');

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    inference_id: 'model_id',
                    query: 'my query'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('sets vector as parameter', () => {
            const q = new SparseVectorQuery();
            q.field('my_field').queryVector({ a: 1, b: 2, c: 0.4 });

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    query_vector: {
                        a: 1,
                        b: 2,
                        c: 0.4
                    }
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('sets pruning enabled', () => {
            const q = new SparseVectorQuery();
            q.field('my_field')
                .inferenceId('model_id')
                .query('my query')
                .prune(true);

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    inference_id: 'model_id',
                    query: 'my query',
                    prune: true
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('sets pruning config for only scoring pruned tokens', () => {
            const q = new SparseVectorQuery();
            q.field('my_field')
                .inferenceId('model_id')
                .query('my query')
                .onlyScorePrunedTokens(true);

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    inference_id: 'model_id',
                    query: 'my query',
                    pruning_config: {
                        only_score_pruned_tokens: true
                    }
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('sets pruning config for token weight threshold', () => {
            const q = new SparseVectorQuery();
            q.field('my_field')
                .inferenceId('model_id')
                .query('my query')
                .tokensWeightThreshold(0.4);

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    inference_id: 'model_id',
                    query: 'my query',
                    pruning_config: {
                        tokens_weight_threshold: 0.4
                    }
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('sets pruning config for token freq ratio threshold', () => {
            const q = new SparseVectorQuery();
            q.field('my_field')
                .inferenceId('model_id')
                .query('my query')
                .tokensFreqRatioThreshold(5);

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    inference_id: 'model_id',
                    query: 'my query',
                    pruning_config: {
                        tokens_freq_ratio_threshold: 5
                    }
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('sets pruning config for multiple elements', () => {
            const q = new SparseVectorQuery();
            q.field('my_field')
                .inferenceId('model_id')
                .query('my query')
                .onlyScorePrunedTokens(true)
                .tokensFreqRatioThreshold(5)
                .tokensWeightThreshold(0.4)
                .onlyScorePrunedTokens(false);

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    inference_id: 'model_id',
                    query: 'my query',
                    pruning_config: {
                        tokens_freq_ratio_threshold: 5,
                        tokens_weight_threshold: 0.4,
                        only_score_pruned_tokens: false
                    }
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('calls sparse vector query via esb factory function', () => {
            const q = esb.sparseVectorQuery('my_field').query('my query');

            const expected = {
                sparse_vector: {
                    field: 'my_field',
                    query: 'my query'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });
    });
});
