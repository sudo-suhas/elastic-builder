import test from 'ava';
import esb, { SemanticQuery } from '../../src';

test('constructor sets field and query correctly', t => {
    const q = new SemanticQuery('inference_field', 'Best surfing places');

    const expected = {
        semantic: {
            field: 'inference_field',
            query: 'Best surfing places'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('empty constructor allows method chaining', t => {
    const q = new SemanticQuery();
    q.field('inference_field').query('Best surfing places');

    const expected = {
        semantic: {
            field: 'inference_field',
            query: 'Best surfing places'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('field method sets field correctly', t => {
    const q = new SemanticQuery();
    q.field('title_semantic');

    const expected = {
        semantic: {
            field: 'title_semantic'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('query method sets query text correctly', t => {
    const q = new SemanticQuery();
    q.query('mountain lake');

    const expected = {
        semantic: {
            query: 'mountain lake'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('supports boost parameter', t => {
    const q = new SemanticQuery('title_semantic', 'mountain lake');
    q.boost(2);

    const expected = {
        semantic: {
            field: 'title_semantic',
            query: 'mountain lake',
            boost: 2
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('call semantic query via esb factory function', t => {
    const q = esb.semanticQuery('inference_field', 'Best surfing places');

    const expected = {
        semantic: {
            field: 'inference_field',
            query: 'Best surfing places'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('call semantic query via esb factory function with chaining', t => {
    const q = esb
        .semanticQuery()
        .field('semantic_field')
        .query('shoes')
        .boost(1.5);

    const expected = {
        semantic: {
            field: 'semantic_field',
            query: 'shoes',
            boost: 1.5
        }
    };
    t.deepEqual(q.toJSON(), expected);
});

test('overwriting field and query works correctly', t => {
    const q = new SemanticQuery('old_field', 'old query');
    q.field('new_field').query('new query');

    const expected = {
        semantic: {
            field: 'new_field',
            query: 'new query'
        }
    };
    t.deepEqual(q.toJSON(), expected);
});
