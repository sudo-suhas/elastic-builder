import { describe, test, expect } from 'vitest';
import { SpanTermQuery } from '../../src';

describe('SpanTermQuery', () => {
    test('all in one', () => {
        let valueA = new SpanTermQuery('user', 'kimchy').toJSON();
        const valueB = new SpanTermQuery()
            .field('user')
            .value('kimchy')
            .toJSON();
        expect(valueA).toEqual(valueB);

        let expected = {
            span_term: {
                user: 'kimchy'
            }
        };
        expect(valueA).toEqual(expected);

        valueA = new SpanTermQuery('user', 'kimchy').boost(2).toJSON();
        expected = {
            span_term: {
                user: { value: 'kimchy', boost: 2 }
            }
        };
        expect(valueA).toEqual(expected);
    });

    test('value is required', () => {
        expect(() => new SpanTermQuery('user').toJSON()).toThrow(
            new Error('Value is required for Span term query!')
        );
    });
});
