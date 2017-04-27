import test from 'ava';
import { IdsQuery, idsQuery } from '../../src';
import { illegalParamType, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(idsQuery, nameExpectStrategy('ids'));

test(illegalParamType, new IdsQuery(), 'values', 'Array');
test(setsOption, 'type', { param: 'my_type' });
test(setsOption, 'values', { param: ['1', '4', '100'], spread: false });
test(setsOption, 'ids', { param: ['1', '4', '100'], spread: false, keyName: 'values' });

test('constructor sets arguments', t => {
    const value = new IdsQuery('my_type', ['1', '4', '100']).toJSON();
    const expected = {
        ids: {
            type: 'my_type',
            values: ['1', '4', '100']
        }
    };
    t.deepEqual(value, expected);
});
