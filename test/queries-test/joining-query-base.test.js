import test from 'ava';
import { JoiningQueryBase } from '../../src/queries/joining-queries';
import { TermQuery, InnerHits } from '../../src';
import {
    illegalParamType,
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = qry => new JoiningQueryBase('my_qry_type', '', qry);

const setsOption = makeSetsOptionMacro(getInstance, nameExpectStrategy('my_qry_type'));

const qry = new TermQuery('user', 'kimchy');

test(illegalParamType, getInstance(), 'query', 'Query');
test(illegalParamType, getInstance(), 'innerHits', 'InnerHits');
test(validatedCorrectly, getInstance, 'scoreMode', ['none', 'sum', 'min', 'max', 'avg']);
test(setsOption, 'query', { param: qry });
test(setsOption, 'scoreMode', { param: 'sum' });
test(setsOption, 'ignoreUnmapped', { param: true });
test(setsOption, 'innerHits', { param: new InnerHits('my_inner_hits') });

test('constructor sets arguments', t => {
    const valueA = getInstance(qry).toJSON();
    const valueB = getInstance().query(qry).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_qry_type: {
            query: { term: { user: 'kimchy' } }
        }
    };
    t.deepEqual(valueA, expected);
});
