import { describe, test, expect } from 'vitest';
import { Sort, BoolQuery, TermQuery, Script } from '../../src';

const getInstance = order => new Sort('my_field', order);

describe('Sort', () => {
    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('nestedFilter()', () => {
                expect(() => new Sort().nestedFilter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('script()', () => {
                expect(() => new Sort().script(value)).toThrow(
                    new TypeError('Argument must be an instance of Script')
                );
            });
        });
    });

    describe('order() validation', () => {
        test.each([
            { name: 'accepts valid order: asc', value: 'asc' },
            {
                name: 'accepts valid order: ASC (case-insensitive)',
                value: 'ASC'
            },
            { name: 'accepts valid order: desc', value: 'desc' },
            {
                name: 'accepts valid order: DESC (case-insensitive)',
                value: 'DESC'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().order(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null order', value: null },
            { name: 'throws for invalid order', value: 'invalid_order' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().order(value)).toThrow(
                new Error(
                    "The 'order' parameter should be one of 'asc' or 'desc'"
                )
            );
        });
    });

    describe('mode() validation', () => {
        test.each([
            { name: 'accepts valid mode: avg', value: 'avg' },
            {
                name: 'accepts valid mode: AVG (case-insensitive)',
                value: 'AVG'
            },
            { name: 'accepts valid mode: min', value: 'min' },
            {
                name: 'accepts valid mode: MIN (case-insensitive)',
                value: 'MIN'
            },
            { name: 'accepts valid mode: max', value: 'max' },
            {
                name: 'accepts valid mode: MAX (case-insensitive)',
                value: 'MAX'
            },
            { name: 'accepts valid mode: sum', value: 'sum' },
            {
                name: 'accepts valid mode: SUM (case-insensitive)',
                value: 'SUM'
            },
            { name: 'accepts valid mode: median', value: 'median' },
            {
                name: 'accepts valid mode: MEDIAN (case-insensitive)',
                value: 'MEDIAN'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().mode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null mode', value: null },
            { name: 'throws for invalid mode', value: 'invalid_mode' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().mode(value)).toThrow(
                /The 'mode' parameter should be one of/
            );
        });
    });

    describe('distanceType() validation', () => {
        test.each([
            { name: 'accepts valid distanceType: plane', value: 'plane' },
            {
                name: 'accepts valid distanceType: PLANE (case-insensitive)',
                value: 'PLANE'
            },
            { name: 'accepts valid distanceType: arc', value: 'arc' },
            {
                name: 'accepts valid distanceType: ARC (case-insensitive)',
                value: 'ARC'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().distanceType(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null distanceType', value: null },
            {
                name: 'throws for invalid distanceType',
                value: 'invalid_distance_type'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().distanceType(value)).toThrow(
                new Error(
                    "The 'distance_type' parameter should be one of 'plane' or 'arc'"
                )
            );
        });
    });

    describe('unit() validation', () => {
        test.each([
            { name: 'accepts valid unit: in', value: 'in' },
            { name: 'accepts valid unit: inch', value: 'inch' },
            { name: 'accepts valid unit: yd', value: 'yd' },
            { name: 'accepts valid unit: yards', value: 'yards' },
            { name: 'accepts valid unit: ft', value: 'ft' },
            { name: 'accepts valid unit: feet', value: 'feet' },
            { name: 'accepts valid unit: km', value: 'km' },
            { name: 'accepts valid unit: kilometers', value: 'kilometers' },
            { name: 'accepts valid unit: NM', value: 'NM' },
            { name: 'accepts valid unit: nmi', value: 'nmi' },
            {
                name: 'accepts valid unit: nauticalmiles',
                value: 'nauticalmiles'
            },
            { name: 'accepts valid unit: mm', value: 'mm' },
            { name: 'accepts valid unit: millimeters', value: 'millimeters' },
            { name: 'accepts valid unit: cm', value: 'cm' },
            { name: 'accepts valid unit: centimeters', value: 'centimeters' },
            { name: 'accepts valid unit: mi', value: 'mi' },
            { name: 'accepts valid unit: miles', value: 'miles' },
            { name: 'accepts valid unit: m', value: 'm' },
            { name: 'accepts valid unit: meters', value: 'meters' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().unit(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null unit', value: null },
            { name: 'throws for invalid unit', value: 'invalid_unit' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().unit(value)).toThrow(
                /The 'unit' parameter should be one of/
            );
        });
    });

    describe('options', () => {
        test('sets nestedPath option', () => {
            const result = getInstance().nestedPath('offer').toJSON();
            const expected = {
                my_field: { nested_path: 'offer' }
            };
            expect(result).toEqual(expected);
        });

        test('sets nestedFilter option', () => {
            const filterQry = new BoolQuery()
                .filter(new TermQuery('user', 'Idan'))
                .filter(new TermQuery('level', 'INFO'));
            const result = getInstance().nestedFilter(filterQry).toJSON();
            const expected = {
                my_field: { nested_filter: filterQry.toJSON() }
            };
            expect(result).toEqual(expected);
        });

        test('sets missing option', () => {
            const result = getInstance().missing('_last').toJSON();
            const expected = {
                my_field: { missing: '_last' }
            };
            expect(result).toEqual(expected);
        });

        test('sets unmappedType option', () => {
            const result = getInstance().unmappedType('long').toJSON();
            const expected = {
                my_field: { unmapped_type: 'long' }
            };
            expect(result).toEqual(expected);
        });

        test('sets reverse option', () => {
            const result = getInstance().reverse(true).toJSON();
            const expected = {
                my_field: { reverse: true }
            };
            expect(result).toEqual(expected);
        });

        test('sets nested option with filter and path', () => {
            const filterQry = new BoolQuery()
                .filter(new TermQuery('user', 'Idan'))
                .filter(new TermQuery('level', 'INFO'));
            const result = getInstance()
                .nested({
                    filter: filterQry,
                    path: 'offer'
                })
                .toJSON();
            const expected = {
                my_field: {
                    nested: {
                        filter: filterQry.toJSON(),
                        path: 'offer'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets nested option with path only', () => {
            const result = getInstance()
                .nested({
                    path: 'offer'
                })
                .toJSON();
            const expected = {
                my_field: {
                    nested: {
                        path: 'offer'
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('toJSON', () => {
        test('super simple sort', () => {
            expect(getInstance().toJSON()).toBe('my_field');
        });

        test('sets ordered', () => {
            const value = getInstance('desc').toJSON();
            const expected = { my_field: 'desc' };
            expect(value).toEqual(expected);
        });

        test('_geo_distance sort', () => {
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
            expect(value).toEqual(expected);
        });

        test('_script sort', () => {
            const value = new Sort()
                .order('asc')
                .script(
                    new Script(
                        'inline',
                        "doc['field_name'].value * params.factor"
                    )
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
            expect(value).toEqual(expected);
        });

        test('_format sort', () => {
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
            expect(value).toEqual(expected);
        });
    });
});
