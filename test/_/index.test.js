import test from 'ava';
import * as _ from '../../src/_';

// Type-checking utilities tests

test('isNil returns true for null', t => {
    t.true(_.isNil(null));
});

test('isNil returns true for undefined', t => {
    t.true(_.isNil(undefined));
});

test('isNil returns false for empty string', t => {
    t.false(_.isNil(''));
});

test('isNil returns false for string', t => {
    t.false(_.isNil('hello'));
});

test('isNil returns false for number zero', t => {
    t.false(_.isNil(0));
});

test('isNil returns false for number', t => {
    t.false(_.isNil(42));
});

test('isNil returns false for empty object', t => {
    t.false(_.isNil({}));
});

test('isNil returns false for object', t => {
    t.false(_.isNil({ key: 'value' }));
});

test('isNil returns false for empty array', t => {
    t.false(_.isNil([]));
});

test('isNil returns false for array', t => {
    t.false(_.isNil([1, 2, 3]));
});

test('isNil returns false for boolean false', t => {
    t.false(_.isNil(false));
});

test('isString returns true for empty string', t => {
    t.true(_.isString(''));
});

test('isString returns true for string', t => {
    t.true(_.isString('hello'));
});

test('isString returns false for number', t => {
    t.false(_.isString(42));
});

test('isString returns false for object', t => {
    t.false(_.isString({}));
});

test('isString returns false for null', t => {
    t.false(_.isString(null));
});

test('isString returns false for undefined', t => {
    t.false(_.isString(undefined));
});

test('isString returns false for array', t => {
    t.false(_.isString([]));
});

test('isString returns false for boolean', t => {
    t.false(_.isString(true));
});

test('isObject returns true for object', t => {
    t.true(_.isObject({ key: 'value' }));
});

test('isObject returns true for empty object', t => {
    t.true(_.isObject({}));
});

test('isObject returns false for array', t => {
    t.false(_.isObject([]));
});

test('isObject returns false for null', t => {
    t.false(_.isObject(null));
});

test('isObject returns false for undefined', t => {
    t.false(_.isObject(undefined));
});

test('isObject returns false for string', t => {
    t.false(_.isObject('string'));
});

test('isObject returns false for number', t => {
    t.false(_.isObject(42));
});

test('isObject returns false for boolean', t => {
    t.false(_.isObject(true));
});

test('isObject returns false for function', t => {
    t.false(_.isObject(() => {}));
});

// Object manipulation utilities tests

test('has returns true for own property', t => {
    const obj = { key: 'value' };
    t.true(_.has(obj, 'key'));
});

test('has returns false for inherited property', t => {
    const obj = Object.create({ inherited: 'value' });
    t.false(_.has(obj, 'inherited'));
});

test('has returns false for missing property', t => {
    const obj = { key: 'value' };
    t.false(_.has(obj, 'missing'));
});

test('has returns false for null object', t => {
    t.false(_.has(null, 'key'));
});

test('has returns false for undefined object', t => {
    t.false(_.has(undefined, 'key'));
});

test('has returns true for hasOwnProperty key', t => {
    const obj = { hasOwnProperty: 'custom' };
    t.true(_.has(obj, 'hasOwnProperty'));
});

test('hasIn returns true for own property', t => {
    const obj = { key: 'value' };
    t.true(_.hasIn(obj, 'key'));
});

test('hasIn returns true for inherited property', t => {
    const obj = Object.create({ inherited: 'value' });
    t.true(_.hasIn(obj, 'inherited'));
});

test('hasIn returns true for prototype chain property', t => {
    const obj = {};
    t.true(_.hasIn(obj, 'toString'));
});

test('hasIn returns false for missing property', t => {
    const obj = { key: 'value' };
    t.false(_.hasIn(obj, 'missing'));
});

test('hasIn returns false for null object', t => {
    t.false(_.hasIn(null, 'key'));
});

test('hasIn returns false for undefined object', t => {
    t.false(_.hasIn(undefined, 'key'));
});

test('omit creates new object excluding single key', t => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = _.omit(obj, ['b']);
    t.deepEqual(result, { a: 1, c: 3 });
});

test('omit creates new object excluding multiple keys', t => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = _.omit(obj, ['b', 'd']);
    t.deepEqual(result, { a: 1, c: 3 });
});

test('omit returns object with all keys when empty array provided', t => {
    const obj = { a: 1, b: 2 };
    const result = _.omit(obj, []);
    t.deepEqual(result, { a: 1, b: 2 });
});

test('omit ignores non-existent keys', t => {
    const obj = { a: 1, b: 2 };
    const result = _.omit(obj, ['c', 'd']);
    t.deepEqual(result, { a: 1, b: 2 });
});

test('omit returns empty object for empty source object', t => {
    const result = _.omit({}, ['a', 'b']);
    t.deepEqual(result, {});
});

test('omit returns empty object for null', t => {
    const result = _.omit(null, ['a']);
    t.deepEqual(result, {});
});

test('omit returns empty object for undefined', t => {
    const result = _.omit(undefined, ['a']);
    t.deepEqual(result, {});
});

test('omit does not include inherited properties', t => {
    const parent = { inherited: 'value' };
    const obj = Object.create(parent);
    obj.own = 'ownValue';
    const result = _.omit(obj, []);
    t.deepEqual(result, { own: 'ownValue' });
});

// Collection utilities tests

test('isEmpty returns true for null', t => {
    t.true(_.isEmpty(null));
});

test('isEmpty returns true for undefined', t => {
    t.true(_.isEmpty(undefined));
});

test('isEmpty returns true for empty string', t => {
    t.true(_.isEmpty(''));
});

test('isEmpty returns false for non-empty string', t => {
    t.false(_.isEmpty('hello'));
});

test('isEmpty returns true for empty array', t => {
    t.true(_.isEmpty([]));
});

test('isEmpty returns false for non-empty array', t => {
    t.false(_.isEmpty([1, 2, 3]));
});

test('isEmpty returns true for empty object', t => {
    t.true(_.isEmpty({}));
});

test('isEmpty returns false for non-empty object', t => {
    t.false(_.isEmpty({ key: 'value' }));
});

test('isEmpty returns false for number', t => {
    t.false(_.isEmpty(42));
});

test('isEmpty returns false for number zero', t => {
    t.false(_.isEmpty(0));
});

test('isEmpty returns false for boolean true', t => {
    t.false(_.isEmpty(true));
});

test('isEmpty returns false for boolean false', t => {
    t.false(_.isEmpty(false));
});

test('head returns first element of array', t => {
    const arr = [1, 2, 3];
    t.is(_.head(arr), 1);
});

test('head returns first element of string array', t => {
    const arr = ['a', 'b', 'c'];
    t.is(_.head(arr), 'a');
});

test('head returns undefined for empty array', t => {
    t.is(_.head([]), undefined);
});

test('head returns undefined for null', t => {
    t.is(_.head(null), undefined);
});

test('head returns undefined for undefined', t => {
    t.is(_.head(undefined), undefined);
});

test('head returns only element for single-element array', t => {
    t.is(_.head([42]), 42);
});

test('head works with array of objects', t => {
    const arr = [{ id: 1 }, { id: 2 }];
    t.deepEqual(_.head(arr), { id: 1 });
});
