import { describe, test, expect } from 'vitest';
import { RangeQuery } from '../../src';

const getInstance = () => new RangeQuery('my_field');

describe('RangeQuery', () => {
    describe('illegal method call', () => {
        test('value cannot be set', () => {
            expect(() => new RangeQuery().value()).toThrow(
                new Error('value is not supported in RangeQuery')
            );
        });
    });

    describe('relation() validation', () => {
        test.each([
            { name: 'accepts valid value: WITHIN', value: 'WITHIN' },
            {
                name: 'accepts valid value: within (case-insensitive)',
                value: 'within'
            },
            { name: 'accepts valid value: CONTAINS', value: 'CONTAINS' },
            {
                name: 'accepts valid value: contains (case-insensitive)',
                value: 'contains'
            },
            { name: 'accepts valid value: DISJOINT', value: 'DISJOINT' },
            {
                name: 'accepts valid value: disjoint (case-insensitive)',
                value: 'disjoint'
            },
            { name: 'accepts valid value: INTERSECTS', value: 'INTERSECTS' },
            {
                name: 'accepts valid value: intersects (case-insensitive)',
                value: 'intersects'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().relation(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_relation' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().relation(value)).toThrow(
                /The 'relation' parameter should be one of/
            );
        });
    });

    describe('options', () => {
        test('sets gte option', () => {
            const result = getInstance().gte(10).toJSON();
            const expected = {
                range: {
                    my_field: {
                        gte: 10
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets lte option', () => {
            const result = getInstance().lte(20).toJSON();
            const expected = {
                range: {
                    my_field: {
                        lte: 20
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets gt option', () => {
            const result = getInstance().gt(10).toJSON();
            const expected = {
                range: {
                    my_field: {
                        gt: 10
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets lt option', () => {
            const result = getInstance().lt(20).toJSON();
            const expected = {
                range: {
                    my_field: {
                        lt: 20
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets from option', () => {
            const result = getInstance().from(10).toJSON();
            const expected = {
                range: {
                    my_field: {
                        from: 10
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets to option', () => {
            const result = getInstance().to(20).toJSON();
            const expected = {
                range: {
                    my_field: {
                        to: 20
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets include_lower option', () => {
            const result = getInstance().includeLower(true).toJSON();
            const expected = {
                range: {
                    my_field: {
                        include_lower: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets include_upper option', () => {
            const result = getInstance().includeUpper(true).toJSON();
            const expected = {
                range: {
                    my_field: {
                        include_upper: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets time_zone option', () => {
            const result = getInstance().timeZone('+0530').toJSON();
            const expected = {
                range: {
                    my_field: {
                        time_zone: '+0530'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets format option', () => {
            const result = getInstance().format('####.00').toJSON();
            const expected = {
                range: {
                    my_field: {
                        format: '####.00'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets relation option', () => {
            const result = getInstance().relation('WITHIN').toJSON();
            const expected = {
                range: {
                    my_field: {
                        relation: 'WITHIN'
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
