import test from 'ava';
import { SparseVectorQuery } from '../../src';

test('with inference id and query', t => {
    const q = new SparseVectorQuery();
    q.field('my_field')
        .inferenceId('model_id')
        .query('my query');

    const expected = {
        sparse_vector: {
            field: 'my_field',
            inference_id: 'model_id',
            query: 'my query'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('with vector as parameter', t => {
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
    t.deepEqual(q.toJSON(), expected);
});

test('with pruning enabled', t => {
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
    t.deepEqual(q.toJSON(), expected);
});

test('with pruning config for only scoring pruned tokens', t => {
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
    t.deepEqual(q.toJSON(), expected);
});

test('with pruning config for token weight threshold', t => {
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
    t.deepEqual(q.toJSON(), expected);
});

test('with pruning config for token freq ration threshold', t => {
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
    t.deepEqual(q.toJSON(), expected);
});

test('with pruning config for multiple elements', t => {
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
    t.deepEqual(q.toJSON(), expected);
});
