import { describe, test, expect } from 'vitest';
import { TypeQuery } from '../../src';

describe('TypeQuery', () => {
    test('all in one', () => {
        const valueA = new TypeQuery('my_type').toJSON();
        let valueB = new TypeQuery().value('my_type').toJSON();
        expect(valueA).toEqual(valueB);

        valueB = new TypeQuery().type('my_type').toJSON();
        expect(valueA).toEqual(valueB);

        const expected = { type: { value: 'my_type' } };
        expect(valueA).toEqual(expected);
    });
});
