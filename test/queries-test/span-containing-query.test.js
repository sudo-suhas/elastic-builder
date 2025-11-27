import { describe, test, expect } from 'vitest';
import { SpanContainingQuery } from '../../src';

describe('SpanContainingQuery', () => {
    test('sets correct type', () => {
        const value = new SpanContainingQuery().toJSON();
        const expected = {
            span_containing: {}
        };
        expect(value).toEqual(expected);
    });
});
