import test from 'ava';
import { Query } from '../../src/core';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new Query('my_type');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('my_type')
);

test(setsOption, 'boost', { param: 10 });
test(setsOption, 'name', { param: 'my_name', keyName: '_name' });

test('getDSL gets DSL', t => {
    const valueA = getInstance()
        .boost(10)
        .toJSON();
    const valueB = getInstance()
        .boost(10)
        .getDSL();
    const expected = {
        my_type: {
            boost: 10
        }
    };

    t.deepEqual(valueA, valueB);
    t.deepEqual(valueA, expected);
});
