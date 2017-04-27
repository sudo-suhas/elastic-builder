import test from 'ava';
import { RangeQuery } from '../../src';
import {
    illegalCall,
    validatedCorrectly,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new RangeQuery('my_field');

const setsOption = makeSetsOptionMacro(getInstance, nameFieldExpectStrategy('range'));

test(illegalCall, RangeQuery, 'value');
test(validatedCorrectly, getInstance, 'relation', ['WITHIN', 'CONTAINS', 'DISJOINT', 'INTERSECTS']);
test(setsOption, 'gte', { param: 10 });
test(setsOption, 'lte', { param: 20 });
test(setsOption, 'gt', { param: 10 });
test(setsOption, 'lt', { param: 20 });
test(setsOption, 'from', { param: 10 });
test(setsOption, 'to', { param: 20 });
test(setsOption, 'includeLower', { param: true });
test(setsOption, 'includeUpper', { param: true });
test(setsOption, 'timeZone', { param: '+0530' });
test(setsOption, 'format', { param: '####.00' });
test(setsOption, 'relation', { param: 'WITHIN' });
