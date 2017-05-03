import _ from 'lodash';
import test from 'ava';
import { Highlight, highlight, BoolQuery, MatchQuery, MatchPhraseQuery } from '../../src';
import { recursiveToJSON } from '../../src/core/util';
import { illegalParamType, validatedCorrectly } from '../_macros';

/**
 * Macro for testing highlight option.
 *
 * @param {*} t
 * @param {string} methodName
 * @param {*} param
 * @param {*} paramValue
 */
function setHighlightOption(t, methodName, param, paramValue = recursiveToJSON(param)) {
    const keyName = _.snakeCase(methodName);

    let value = new Highlight()[methodName](param).toJSON();
    let expected = {
        fields: {},
        [keyName]: paramValue
    };
    t.deepEqual(value, expected);

    value = new Highlight()[methodName](param, 'my_field').toJSON();
    expected = {
        fields: {
            my_field: { [keyName]: paramValue }
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight('my_field')[methodName](param, 'my_field').toJSON();
    expected = {
        fields: {
            my_field: { [keyName]: paramValue }
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight(['my_field_a', 'my_field_b'])[methodName](param, 'my_field_a').toJSON();
    expected = {
        fields: {
            my_field_a: { [keyName]: paramValue },
            my_field_b: {}
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight(['my_field_a', 'my_field_b']);
    value[methodName](param, 'my_field_a');
    value[methodName](param, 'my_field_b');
    expected = {
        fields: {
            my_field_a: { [keyName]: paramValue },
            my_field_b: { [keyName]: paramValue }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value = new Highlight(['my_field_a', 'my_field_b']);
    value[methodName](param, 'my_field_a');
    value[methodName](param, 'my_field_b');
    value[methodName](param);
    expected = {
        fields: {
            my_field_a: { [keyName]: paramValue },
            my_field_b: { [keyName]: paramValue }
        },
        [keyName]: paramValue
    };
    t.deepEqual(value.toJSON(), expected);

    value = new Highlight()[methodName](param, 'my_field')[methodName](param).toJSON();
    expected = {
        fields: {
            my_field: { [keyName]: paramValue }
        },
        [keyName]: paramValue
    };
    t.deepEqual(value, expected);
}

setHighlightOption.title = (providedTitle, methodName) =>
    !_.isEmpty(providedTitle) ? providedTitle : `sets ${_.snakeCase(methodName)} option`;

test(illegalParamType, new Highlight(), 'fields', 'Array');
test(illegalParamType, new Highlight(), 'highlightQuery', 'Query');
test(illegalParamType, new Highlight(), 'matchedFields', 'Array');
test(validatedCorrectly, highlight, 'encoder', ['default', 'html']);
test(validatedCorrectly, highlight, 'type', ['plain', 'postings', 'fvh']);
test(validatedCorrectly, highlight, 'fragmenter', ['simple', 'span']);
test(setHighlightOption, 'preTags', ['<tag1>', '<tag2>']);
test('sets pre_tags(str) option', setHighlightOption, 'preTags', '<tag1>', ['<tag1>']);
test(setHighlightOption, 'postTags', ['</tag1>', '</tag2>']);
test('sets post_tags(str) option', setHighlightOption, 'postTags', '</tag1>', ['</tag1>']);
test(setHighlightOption, 'fragmentSize', 150);
test(setHighlightOption, 'numberOfFragments', 3);
test(setHighlightOption, 'noMatchSize', 150);
test(
    setHighlightOption,
    'highlightQuery',
    new BoolQuery()
        .must(new MatchQuery('content', 'foo bar'))
        .should(new MatchPhraseQuery('content', 'foo bar').slop(1).boost(10.0))
        .minimumShouldMatch(0)
);
test(setHighlightOption, 'requireFieldMatch', false);
test(setHighlightOption, 'boundaryMaxScan', 25);
test(setHighlightOption, 'boundaryChars', '.,!?; \t\n');
test(setHighlightOption, 'forceSource', true);

test('constructor sets fields', t => {
    let value = new Highlight('my_field').toJSON();
    let expected = {
        fields: {
            my_field: {}
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight(['my_field_a', 'my_field_b']).toJSON();
    expected = {
        fields: {
            my_field_a: {},
            my_field_b: {}
        }
    };
    t.deepEqual(value, expected);
});

test('sets field', t => {
    const value = new Highlight().field('my_field').toJSON();
    const expected = {
        fields: {
            my_field: {}
        }
    };
    t.deepEqual(value, expected);
});

test('fields are set', t => {
    const value = new Highlight().fields(['my_field_a', 'my_field_b']).toJSON();
    const expected = {
        fields: {
            my_field_a: {},
            my_field_b: {}
        }
    };
    t.deepEqual(value, expected);
});

test('sets tags_schema as styled', t => {
    const value = new Highlight().styledTagsSchema().toJSON();
    const expected = {
        fields: {},
        tags_schema: 'styled'
    };
    t.deepEqual(value, expected);
});

test('sets order as score', t => {
    let value = new Highlight().scoreOrder().toJSON();
    let expected = {
        fields: {},
        order: 'score'
    };
    t.deepEqual(value, expected);

    value = new Highlight().scoreOrder('my_field').toJSON();
    expected = {
        fields: {
            my_field: { order: 'score' }
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight('my_field').scoreOrder('my_field').toJSON();
    expected = {
        fields: {
            my_field: { order: 'score' }
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight(['my_field_a', 'my_field_b']).scoreOrder('my_field_a').toJSON();
    expected = {
        fields: {
            my_field_a: { order: 'score' },
            my_field_b: {}
        }
    };
    t.deepEqual(value, expected);

    value = new Highlight(['my_field_a', 'my_field_b']);
    value.scoreOrder('my_field_a');
    value.scoreOrder('my_field_b');
    expected = {
        fields: {
            my_field_a: { order: 'score' },
            my_field_b: { order: 'score' }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value = new Highlight(['my_field_a', 'my_field_b'])
        .scoreOrder('my_field_a')
        .scoreOrder('my_field_b')
        .scoreOrder();
    expected = {
        fields: {
            my_field_a: { order: 'score' },
            my_field_b: { order: 'score' }
        },
        order: 'score'
    };
    t.deepEqual(value.toJSON(), expected);

    value = new Highlight().scoreOrder('my_field').scoreOrder().toJSON();
    expected = {
        fields: {
            my_field: { order: 'score' }
        },
        order: 'score'
    };
    t.deepEqual(value, expected);
});

test('sets matched_fields option', t => {
    const value = new Highlight().matchedFields(['content', 'content.plain'], 'content').toJSON();
    const expected = {
        fields: {
            content: {
                matched_fields: ['content', 'content.plain'],
                type: 'fvh'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('set matched_fields throws on no field', t => {
    const err = t.throws(() => new Highlight().matchedFields(['content', 'content.plain']), Error);
    t.is(err.message, '`matched_fields` requires field name to be passed');
});

test('sets phrase_limit option', t => {
    const value = new Highlight().phraseLimit(512).toJSON();
    const expected = {
        fields: {},
        phrase_limit: 512
    };
    t.deepEqual(value, expected);
});
