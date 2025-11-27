import { describe, test, expect } from 'vitest';
import { SpanWithinQuery } from '../../src';

describe('SpanWithinQuery', () => {
    test('sets correct type', () => {
        const value = new SpanWithinQuery().toJSON();
        const expected = {
            span_within: {}
        };
        expect(value).toEqual(expected);
    });
});
