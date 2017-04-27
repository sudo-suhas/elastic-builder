import test from 'ava';
import { FuzzyQuery } from '../../src';
import { nameFieldExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new FuzzyQuery('my_field', 'my-value');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('fuzzy', { value: 'my-value' })
);

test(setsOption, 'fuzziness', { param: 'AUTO' });
test(setsOption, 'prefixLength', { param: 3 });
test(setsOption, 'maxExpansions', { param: 25 });
test(setsOption, 'transpositions', { param: true });
