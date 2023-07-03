import test from 'ava';
import { GeoHexGridAggregation } from '../../src';
import {
    illegalCall,
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new GeoHexGridAggregation('my_geo_agg');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_geo_agg', 'geohex_grid')
);

test(setsAggType, GeoHexGridAggregation, 'geohex_grid');
test(illegalCall, GeoHexGridAggregation, 'format', 'my_agg');
test(illegalCall, GeoHexGridAggregation, 'script', 'my_agg');
test(setsOption, 'precision', { param: 8 });
test(setsOption, 'size', { param: 10000 });
test(setsOption, 'shardSize', { param: 3 });

test('precision correctly validated', t => {
    let err = t.throws(() => getInstance().precision(-1), Error);
    t.is(err.message, '`precision` can only be value from 0 to 15.');

    err = t.throws(() => getInstance().precision(16), Error);
    t.is(err.message, '`precision` can only be value from 0 to 15.');

    err = t.throws(() => getInstance().precision(null), Error);
    t.is(err.message, '`precision` can only be value from 0 to 15.');

    err = t.throws(() => getInstance().precision(undefined), Error);
    t.is(err.message, '`precision` can only be value from 0 to 15.');
});
