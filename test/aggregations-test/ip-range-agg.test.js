import { describe, test, expect } from 'vitest';
import { IpRangeAggregation } from '../../src';

const getInstance = (...args) =>
    new IpRangeAggregation('my_agg', ...args).range({ to: '10.0.0.5' });

describe('IpRangeAggregation', () => {
    test('format cannot be set', () => {
        expect(() => new IpRangeAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in IpRangeAggregation')
        );
    });

    describe('constructor', () => {
        test('sets type as ip_range', () => {
            const value = getInstance().toJSON();
            const expected = {
                my_agg: {
                    ip_range: {
                        ranges: [{ to: '10.0.0.5' }]
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets arguments', () => {
            const value = getInstance('ip').toJSON(),
                expected = {
                    my_agg: {
                        ip_range: {
                            field: 'ip',
                            ranges: [{ to: '10.0.0.5' }]
                        }
                    }
                };
            expect(value).toEqual(expected);
        });
    });

    describe('range() validation', () => {
        test.each([
            { name: 'throws for empty object', value: {} },
            {
                name: 'throws for object with only key property',
                value: { key: 'invalid' }
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().range(value)).toThrow(
                new Error(
                    'Invalid Range! Range must have at least one of from,to,mask'
                )
            );
        });

        test.each([
            {
                name: 'does not throw for object with to property',
                value: { to: '10.0.0.5' }
            },
            {
                name: 'does not throw for object with to and key properties',
                value: { to: '10.0.0.5', key: 'my_ip_range_key' }
            },
            {
                name: 'does not throw for object with from property',
                value: { from: '10.0.0.5' }
            },
            {
                name: 'does not throw for object with from and key properties',
                value: { from: '10.0.0.5', key: 'my_ip_range_key' }
            },
            {
                name: 'does not throw for object with mask property',
                value: { mask: '10.0.0.0/25' }
            },
            {
                name: 'does not throw for object with mask and key properties',
                value: { mask: '10.0.0.0/25', key: 'my_ip_range_key' }
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().range(value)).not.toThrow();
        });
    });
});
