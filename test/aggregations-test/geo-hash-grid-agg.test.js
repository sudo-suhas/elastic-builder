import test from 'ava';
import { GeoHashGridAggregation } from '../../src';
import { illegalCall, setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = () => new GeoHashGridAggregation('my_geo_agg');

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_geo_agg', 'geohash_grid');

test(setsAggType, GeoHashGridAggregation, 'geohash_grid');
test(illegalCall, GeoHashGridAggregation, 'format');
test(illegalCall, GeoHashGridAggregation, 'script');
test(aggPropIsSet, 'precision', 8);
test(aggPropIsSet, 'size', 10000);
test(aggPropIsSet, 'shardSize', 3);

test('precision correctly validated', t => {
    let err = t.throws(() => getInstance().precision(0), Error);
    t.is(err.message, '`precision` can only be value from 1 to 12.');

    err = t.throws(() => getInstance().precision(13), Error);
    t.is(err.message, '`precision` can only be value from 1 to 12.');

    err = t.throws(() => getInstance().precision(null), Error);
    t.is(err.message, '`precision` can only be value from 1 to 12.');

    err = t.throws(() => getInstance().precision(void 0), Error);
    t.is(err.message, '`precision` can only be value from 1 to 12.');
});
