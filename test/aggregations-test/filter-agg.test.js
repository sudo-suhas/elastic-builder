import { describe, test, expect } from 'vitest';
import { FilterAggregation, TermQuery } from '../../src';

const getInstance = (...args) =>
    new FilterAggregation('my_filter_agg', ...args);

const filterQry = new TermQuery('user', 'kimchy');

describe('FilterAggregation', () => {
    test('sets type as filter', () => {
        const value = new FilterAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { filter: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new FilterAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in FilterAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new FilterAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in FilterAggregation')
        );
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('filter()', () => {
                expect(() => getInstance().filter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    test('constructor sets arguments', () => {
        const value = getInstance(filterQry).toJSON();
        const expected = getInstance().filter(filterQry).toJSON();
        expect(value).toEqual(expected);
    });

    test('filter is set', () => {
        const value = getInstance().filter(filterQry).toJSON();
        const expected = {
            my_filter_agg: {
                filter: { term: { user: 'kimchy' } }
            }
        };
        expect(value).toEqual(expected);
    });
});
