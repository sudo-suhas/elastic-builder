import test from 'ava';
import { Script } from '../../src';
import { BucketAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new BucketAggregationBase('my_agg', 'my_type', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'my_type');

test('can be instantiated', t => {
    t.truthy(getInstance());
});

test(aggPropIsSet, 'field', 'my_field');
test(
    aggPropIsSet,
    'script',
    new Script().lang('groovy').file('calculate-score').params({ my_modifier: 2 })
);
test(illegalParamType, getInstance(), 'script', 'Script');

test('constructor sets arguments', t => {
    const myAgg = getInstance('my_field').toJSON(),
        myOtherAgg = getInstance().field('my_field').toJSON();
    t.deepEqual(myAgg, myOtherAgg);
});
