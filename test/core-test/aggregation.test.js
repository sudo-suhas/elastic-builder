import test from 'ava';
import { Aggregation } from '../../src/core';
import { TermsAggregation, FilterAggregation, StatsAggregation, TermQuery } from '../../src';
import { illegalParamType } from '../_macros';

const getInstance = () => new Aggregation('my_agg', 'my_type');

const termsAgg = new TermsAggregation('users', 'user');

test(illegalParamType, getInstance(), 'aggregation', 'Aggregation');
test(illegalParamType, getInstance(), 'agg', 'Aggregation');

test('can be instantiated', t => {
    const value = getInstance().toJSON();
    const expected = {
        my_agg: {
            my_type: {}
        }
    };
    t.deepEqual(value, expected);
});

test('name cannot be empty', t => {
    const err = t.throws(() => new Aggregation());
    t.is(err.message, 'Aggregation `name` cannot be empty');
});

test('aggType cannot be empty', t => {
    const err = t.throws(() => new Aggregation('my_agg'));
    t.is(err.message, 'Aggregation `aggType` cannot be empty');
});

test('getDSL gets DSL', t => {
    const value = new TermsAggregation('countries', 'artist.country')
        .order('rock>playback_stats.avg', 'desc')
        .agg(
            new FilterAggregation('rock', new TermQuery('genre', 'rock')).agg(
                new StatsAggregation('playback_stats', 'play_count')
            )
        );
    t.deepEqual(value.toJSON(), value.getDSL());
});

test('nested aggs', t => {
    const valueA = getInstance().agg(termsAgg).toJSON();
    const valueB = getInstance().aggregation(termsAgg).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            my_type: {},
            aggs: {
                users: {
                    terms: {
                        field: 'user'
                    }
                }
            }
        }
    };
    t.deepEqual(valueA, expected);
});

test('deep nested aggs', t => {
    const value = new TermsAggregation('countries', 'artist.country')
        .order('rock>playback_stats.avg', 'desc')
        .agg(
            new FilterAggregation('rock', new TermQuery('genre', 'rock')).agg(
                new StatsAggregation('playback_stats', 'play_count')
            )
        )
        .toJSON();

    const expected = {
        countries: {
            terms: {
                field: 'artist.country',
                order: { 'rock>playback_stats.avg': 'desc' }
            },
            aggs: {
                rock: {
                    filter: { term: { genre: 'rock' } },
                    aggs: {
                        playback_stats: { stats: { field: 'play_count' } }
                    }
                }
            }
        }
    };
    t.deepEqual(value, expected);
});

test('meta is set', t => {
    const value = getInstance().meta({ color: 'blue' }).toJSON();
    const expected = {
        my_agg: {
            my_type: {},
            meta: { color: 'blue' }
        }
    };
    t.deepEqual(value, expected);
});
