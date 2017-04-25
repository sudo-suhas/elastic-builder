import test from 'ava';
import sinon from 'sinon';
import { CommonTermsQuery } from '../../src';
import { validatedCorrectly, fullTextQryExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new CommonTermsQuery('my_field', 'query str');

const setsOption = makeSetsOptionMacro(getInstance, fullTextQryExpectStrategy('common'));

test(validatedCorrectly, getInstance, 'lowFreqOperator', ['and', 'or']);
test(validatedCorrectly, getInstance, 'highFreqOperator', ['and', 'or']);
test(setsOption, 'cutoffFrequency', { param: 10 });
test(setsOption, 'lowFreqOperator', { param: 'and' });
test(setsOption, 'highFreqOperator', { param: 'and' });
test(setsOption, 'lowFreq', {
    param: '30%',
    propValue: { low_freq: '30%' },
    keyName: 'minimum_should_match'
});
test(setsOption, 'highFreq', {
    param: '30%',
    propValue: { high_freq: '30%' },
    keyName: 'minimum_should_match'
});
test(setsOption, 'disableCoord', { param: true });

test('constructor sets arguments', t => {
    const valueA = getInstance().toJSON();
    const valueB = new CommonTermsQuery().field('my_field').query('query str').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        common: {
            my_field: 'query str'
        }
    };
    t.deepEqual(valueA, expected);
});

test('mixed minimum_should_match repr', t => {
    const value = getInstance().minimumShouldMatch('30%').lowFreq('50%').highFreq('10%').toJSON();
    const expected = {
        common: {
            my_field: {
                query: 'query str',
                minimum_should_match: { low_freq: '50%', high_freq: '10%' }
            }
        }
    };
    t.deepEqual(value, expected);
});

test.serial('mixed representation logs warning', t => {
    const spy = sinon.spy(console, 'warn');

    getInstance().minimumShouldMatch('30%').lowFreq('50%').highFreq('10%').toJSON();

    t.true(spy.calledTwice);
    t.true(spy.firstCall.calledWith('[CommonTermsQuery] Do not mix with other representation!'));
    t.true(spy.secondCall.calledWith('[CommonTermsQuery] Overwriting.'));

    console.warn.restore();
});
