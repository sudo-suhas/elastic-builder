import test from 'ava';
import { GeoHashGridAggregation } from '../../src';
import {
    illegalCall,
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new GeoHashGridAggregation('my_geo_agg');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_geo_agg', 'geohash_grid')
);

test(setsAggType, GeoHashGridAggregation, 'geohash_grid');
test(illegalCall, GeoHashGridAggregation, 'format', 'my_agg');
test(illegalCall, GeoHashGridAggregation, 'script', 'my_agg');
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

    err = t.throws(() => getInstance().precision(undefined), Error);
    t.is(err.message, '`precision` can only be value from 1 to 12.');
});
