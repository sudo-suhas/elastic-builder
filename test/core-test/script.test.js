import test from 'ava';
import sinon from 'sinon';
import { Script, script } from '../../src';
import { makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(script);

test(setsOption, 'inline', { param: "doc['my_field'] * multiplier" });
test(setsOption, 'file', { param: 'calculate-score' });
test(setsOption, 'stored', { param: 'calculate-score' });
test(setsOption, 'lang', { param: 'painless' });
test(setsOption, 'params', { param: { my_modifier: 2 } });

test('constructor sets arguments', t => {
    let valueA = new Script(
        'inline',
        'params.my_var1 / params.my_var2'
    ).toJSON();
    let valueB = new Script()
        .inline('params.my_var1 / params.my_var2')
        .toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        inline: 'params.my_var1 / params.my_var2'
    };
    t.deepEqual(valueA, expected);

    valueA = new Script('file', 'calculate-score').toJSON();
    valueB = new Script().file('calculate-score').toJSON();
    t.deepEqual(valueA, valueB);

    expected = {
        file: 'calculate-score'
    };
    t.deepEqual(valueA, expected);

    valueA = new Script('stored', 'calculate-score').toJSON();
    valueB = new Script().stored('calculate-score').toJSON();
    t.deepEqual(valueA, valueB);

    expected = {
        stored: 'calculate-score'
    };
    t.deepEqual(valueA, expected);

    const err = t.throws(() => new Script('invalid_script_type', 'src'), Error);
    t.is(err.message, '`type` must be one of `inline`, `stored`, `file`');
});

test.serial('mixed representaion', t => {
    const spy = sinon.spy(console, 'warn');

    const value = new Script()
        .file('calculate-score')
        .stored('calculate-score')
        .toJSON();
    const expected = {
        stored: 'calculate-score'
    };
    t.deepEqual(value, expected);

    t.true(spy.calledTwice);
    t.true(
        spy.firstCall.calledWith(
            '[Script] Script source(`inline`/`stored`/`file`) was already specified!'
        )
    );
    t.true(spy.secondCall.calledWith('[Script] Overwriting.'));
    console.warn.restore();
});
