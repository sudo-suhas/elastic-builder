import test from 'ava';
import { util } from '../../src/core';

test('just for 100% coverage', t => {
    t.is(util.firstDigitPos(''), -1);
    t.is(util.firstDigitPos('no-digits-in-string'), -1);
});
