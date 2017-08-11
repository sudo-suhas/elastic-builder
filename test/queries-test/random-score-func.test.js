import test from 'ava';
import { randomScoreFunction } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(
    randomScoreFunction,
    nameExpectStrategy('random_score')
);

test(setsOption, 'seed', { param: Date.now() });
