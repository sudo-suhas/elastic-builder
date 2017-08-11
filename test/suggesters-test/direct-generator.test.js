import test from 'ava';
import { DirectGenerator } from '../../src';
import { validatedCorrectly, makeSetsOptionMacro } from '../_macros';

const getInstance = field => new DirectGenerator(field);

const setsOption = makeSetsOptionMacro(getInstance);

test('constructor sets field', t => {
    const value = getInstance('my_field').toJSON();
    const expected = {
        field: 'my_field'
    };
    t.deepEqual(value, expected);
});

test(validatedCorrectly, getInstance, 'suggestMode', [
    'missing',
    'popular',
    'always'
]);

test(setsOption, 'field', { param: 'my_field' });
test(setsOption, 'size', { param: 7 });
test(setsOption, 'suggestMode', { param: 'always' });
test(setsOption, 'maxEdits', { param: 3 });
test(setsOption, 'prefixLength', { param: 3 });
test(setsOption, 'minWordLength', { param: 5 });
test(setsOption, 'maxInspections', { param: 4 });
test(setsOption, 'minDocFreq', { param: 0.4 });
test(setsOption, 'maxTermFreq', { param: 1 });
test(setsOption, 'preFilter', { param: 'reverse' });
test(setsOption, 'postFilter', { param: 'reverse' });
