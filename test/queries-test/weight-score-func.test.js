import test from 'ava';
import { WeightScoreFunction } from '../../src';

test('constructor sets weight', t => {
    const valueA = new WeightScoreFunction(42).toJSON();
    const valueB = new WeightScoreFunction().weight(42).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = { weight: 42 };
    t.deepEqual(valueA, expected);
});
