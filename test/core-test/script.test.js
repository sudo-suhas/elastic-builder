import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { Script, script } from '../../src';

describe('Script', () => {
    describe('options', () => {
        test('sets inline option', () => {
            const result = script()
                .inline("doc['my_field'] * multiplier")
                .toJSON();
            const expected = { inline: "doc['my_field'] * multiplier" };
            expect(result).toEqual(expected);
        });

        test('sets source option', () => {
            const result = script()
                .source("doc['my_field'] * multiplier")
                .toJSON();
            const expected = { source: "doc['my_field'] * multiplier" };
            expect(result).toEqual(expected);
        });

        test('sets file option', () => {
            const result = script().file('calculate-score').toJSON();
            const expected = { file: 'calculate-score' };
            expect(result).toEqual(expected);
        });

        test('sets stored option', () => {
            const result = script().stored('calculate-score').toJSON();
            const expected = { stored: 'calculate-score' };
            expect(result).toEqual(expected);
        });

        test('sets id option', () => {
            const result = script().id('calculate-score').toJSON();
            const expected = { id: 'calculate-score' };
            expect(result).toEqual(expected);
        });

        test('sets lang option', () => {
            const result = script().lang('painless').toJSON();
            const expected = { lang: 'painless' };
            expect(result).toEqual(expected);
        });

        test('sets params option', () => {
            const result = script().params({ my_modifier: 2 }).toJSON();
            const expected = { params: { my_modifier: 2 } };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('sets inline via constructor', () => {
            const valueA = new Script(
                'inline',
                'params.my_var1 / params.my_var2'
            ).toJSON();
            const valueB = new Script()
                .inline('params.my_var1 / params.my_var2')
                .toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({
                inline: 'params.my_var1 / params.my_var2'
            });
        });

        test('sets source via constructor', () => {
            const valueA = new Script(
                'source',
                'params.my_var1 / params.my_var2'
            ).toJSON();
            const valueB = new Script()
                .source('params.my_var1 / params.my_var2')
                .toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({
                source: 'params.my_var1 / params.my_var2'
            });
        });

        test('sets file via constructor', () => {
            const valueA = new Script('file', 'calculate-score').toJSON();
            const valueB = new Script().file('calculate-score').toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({ file: 'calculate-score' });
        });

        test('sets stored via constructor', () => {
            const valueA = new Script('stored', 'calculate-score').toJSON();
            const valueB = new Script().stored('calculate-score').toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({ stored: 'calculate-score' });
        });

        test('sets id via constructor', () => {
            const valueA = new Script('id', 'calculate-score').toJSON();
            const valueB = new Script().id('calculate-score').toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({ id: 'calculate-score' });
        });

        test('throws error for invalid script type', () => {
            expect(() => new Script('invalid_script_type', 'src')).toThrow(
                new Error('`type` must be one of `inline`, `stored`, `file`')
            );
        });
    });

    describe('mixed representation', () => {
        let spy;

        beforeEach(() => {
            spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockRestore();
        });

        test('logs warnings when overwriting script source', () => {
            const value = new Script()
                .file('calculate-score')
                .stored('calculate-score')
                .toJSON();
            const expected = {
                stored: 'calculate-score'
            };
            expect(value).toEqual(expected);

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[Script] Script source(`inline`/`source`/`stored`/`id`/`file`) was already specified!'
            );
            expect(spy).toHaveBeenNthCalledWith(2, '[Script] Overwriting.');
        });
    });
});
