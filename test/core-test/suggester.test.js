import test from 'ava';
import { Suggester } from '../../src/core';
import { nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = field => new Suggester('my_type', 'my_suggester', field);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_suggester', 'my_type')
);

test('aggType cannot be empty', t => {
    const err = t.throws(() => new Suggester());
    t.is(err.message, 'Suggester `suggesterType` cannot be empty');
});

test('name cannot be empty', t => {
    const err = t.throws(() => new Suggester('my_type'));
    t.is(err.message, 'Suggester `name` cannot be empty');
});

test('can be instantiated', t => {
    const value = getInstance().toJSON();
    const expected = {
        my_suggester: {
            my_type: {}
        }
    };
    t.deepEqual(value, expected);
});

test('constructor sets field', t => {
    const value = getInstance('my_field').toJSON();
    const expected = {
        my_suggester: {
            my_type: { field: 'my_field' }
        }
    };
    t.deepEqual(value, expected);
});

test(setsOption, 'field', { param: 'my_field' });
test(setsOption, 'size', { param: 5 });
