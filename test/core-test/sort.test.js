import test from 'ava';
import { Sort, BoolQuery, TermQuery, Script } from '../../src';
import {
    illegalParamType,
    validatedCorrectly,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = order => new Sort('my_field', order);

const sortExpectStrategy = (keyName, propValue) => ({
    my_field: { [keyName]: propValue }
});

const setsOption = makeSetsOptionMacro(getInstance, sortExpectStrategy);

const filterQry = new BoolQuery()
    .filter(new TermQuery('user', 'Idan'))
    .filter(new TermQuery('level', 'INFO'));

test(illegalParamType, new Sort(), 'nestedFilter', 'Query');
test(illegalParamType, new Sort(), 'script', 'Script');
test(validatedCorrectly, getInstance, 'order', ['asc', 'desc']);
test(validatedCorrectly, getInstance, 'mode', [
    'avg',
    'min',
    'max',
    'sum',
    'median'
]);
test(validatedCorrectly, getInstance, 'distanceType', ['plane', 'arc']);
// prettier-ignore
test(validatedCorrectly, getInstance, 'unit', [
        'in', 'inch',
        'yd', 'yards',
        'ft', 'feet',
        'km', 'kilometers',
        'NM', 'nmi', 'nauticalmiles',
        'mm', 'millimeters',
        'cm', 'centimeters',
        'mi', 'miles',
        'm', 'meters'
    ], false
);
test(setsOption, 'nestedPath', { param: 'offer' });
test(setsOption, 'nestedFilter', { param: filterQry });
test(setsOption, 'nested', {
    param: {
        filter: filterQry,
        path: 'offer'
    },
    keyName: 'nested'
});
test(setsOption, 'nested', {
    param: {
        path: 'offer'
    },
    keyName: 'nested'
});
test(setsOption, 'missing', { param: '_last' });
test(setsOption, 'unmappedType', { param: 'long' });
test(setsOption, 'reverse', { param: true });

test('super simple sort', t => {
    t.is(getInstance().toJSON(), 'my_field');
});

test('sets ordered', t => {
    const value = getInstance('desc').toJSON();
    const expected = { my_field: 'desc' };
    t.deepEqual(value, expected);
});

test('_geo_distance sort', t => {
    const value = getInstance('asc')
        .geoDistance([-70, 40])
        .unit('km')
        .mode('min')
        .distanceType('arc')
        .toJSON();
    const expected = {
        _geo_distance: {
            my_field: [-70, 40],
            order: 'asc',
            unit: 'km',
            mode: 'min',
            distance_type: 'arc'
        }
    };
    t.deepEqual(value, expected);
});

test('_script sort', t => {
    const value = new Sort()
        .order('asc')
        .script(
            new Script('inline', "doc['field_name'].value * params.factor")
                .lang('painless')
                .params({ factor: 1.1 })
        )
        .type('number')
        .toJSON();
    const expected = {
        _script: {
            type: 'number',
            script: {
                lang: 'painless',
                inline: "doc['field_name'].value * params.factor",
                params: {
                    factor: 1.1
                }
            },
            order: 'asc'
        }
    };
    t.deepEqual(value, expected);
});

test('_format sort', t => {
    const value = new Sort('date_field')
        .order('asc')
        .format('epoch_millis')
        .toJSON();
    const expected = {
        date_field: {
            order: 'asc',
            format: 'epoch_millis'
        }
    };
    t.deepEqual(value, expected);
});
