import test from 'ava';
import { Script } from '../../src';
import { BucketAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { illegalParamType, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) => new BucketAggregationBase('my_agg', 'my_type', ...args);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'my_type'));

test('can be instantiated', t => {
    t.truthy(getInstance());
});

test(setsOption, 'field', { param: 'my_field' });
test(setsOption, 'script', {
    param: new Script().lang('groovy').file('calculate-score').params({ my_modifier: 2 })
});
test(illegalParamType, getInstance(), 'script', 'Script');

test('constructor sets arguments', t => {
    const value = getInstance('my_field').toJSON(),
        myOtherAgg = getInstance().field('my_field').toJSON();
    t.deepEqual(value, myOtherAgg);
});
