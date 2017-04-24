import test from 'ava';
import { GeoHashGridAggregation } from '../../src';
import { illegalCall, setsAggType, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new GeoHashGridAggregation('my_geo_agg');

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_geo_agg', 'geohash_grid')
);

test(setsAggType, GeoHashGridAggregation, 'geohash_grid');
test(illegalCall, GeoHashGridAggregation, 'format');
test(illegalCall, GeoHashGridAggregation, 'script');
test(setsOption, 'precision', { param: 8 });
test(setsOption, 'size', { param: 10000 });
test(setsOption, 'shardSize', { param: 3 });

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
