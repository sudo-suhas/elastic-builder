import { describe, test, expect } from 'vitest';
import { WeightScoreFunction } from '../../src';

describe('WeightScoreFunction', () => {
    describe('constructor', () => {
        test('constructor sets weight', () => {
            const valueA = new WeightScoreFunction(42).toJSON();
            const valueB = new WeightScoreFunction().weight(42).toJSON();
            expect(valueA).toEqual(valueB);

            const expected = { weight: 42 };
            expect(valueA).toEqual(expected);
        });
    });
});
