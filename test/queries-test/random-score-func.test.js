import { describe, test, expect } from 'vitest';
import { randomScoreFunction } from '../../src';

describe('RandomScoreFunction', () => {
    describe('options', () => {
        test('sets seed option', () => {
            const seed = Date.now();
            const result = randomScoreFunction().seed(seed).toJSON();
            const expected = {
                random_score: {
                    seed: seed
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
