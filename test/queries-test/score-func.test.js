import { describe, test, expect } from 'vitest';
import { ScoreFunction } from '../../src/queries/compound-queries/score-functions';
import { BoolQuery, TermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const getInstance = () => new ScoreFunction('my_score_func');

describe('ScoreFunction', () => {
    describe('parameter type validation', () => {
        test('checks Query class for filter', () => {
            const instance = getInstance();
            expect(() => instance.filter(null)).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
            expect(() => instance.filter(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });
    });

    describe('options', () => {
        test('sets filter option', () => {
            const filterQry = new BoolQuery()
                .filter(new TermQuery('user', 'Idan'))
                .filter(new TermQuery('level', 'INFO'));
            const result = getInstance().filter(filterQry).toJSON();
            const expected = {
                my_score_func: {},
                filter: recursiveToJSON(filterQry.toJSON())
            };
            expect(result).toEqual(expected);
        });

        test('sets weight option', () => {
            const result = getInstance().weight(10).toJSON();
            const expected = {
                my_score_func: {},
                weight: 10
            };
            expect(result).toEqual(expected);
        });
    });
});
