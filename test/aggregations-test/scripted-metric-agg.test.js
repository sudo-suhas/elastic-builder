import { describe, test, expect } from 'vitest';
import { ScriptedMetricAggregation } from '../../src';

const getInstance = () => new ScriptedMetricAggregation('my_agg');

describe('ScriptedMetricAggregation', () => {
    test('sets type as scripted_metric', () => {
        const value = new ScriptedMetricAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { scripted_metric: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new ScriptedMetricAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in ScriptedMetricAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new ScriptedMetricAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in ScriptedMetricAggregation')
        );
    });

    test('missing cannot be set', () => {
        expect(() => new ScriptedMetricAggregation('my_agg').missing()).toThrow(
            new Error('missing is not supported in ScriptedMetricAggregation')
        );
    });

    describe('options', () => {
        test('sets initScript', () => {
            const value = getInstance()
                .initScript('params._agg.transactions = []')
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    scripted_metric: {
                        init_script: 'params._agg.transactions = []'
                    }
                }
            });
        });

        test('sets mapScript', () => {
            const value = getInstance()
                .mapScript(
                    "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)"
                )
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    scripted_metric: {
                        map_script:
                            "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)"
                    }
                }
            });
        });

        test('sets combineScript', () => {
            const value = getInstance()
                .combineScript(
                    'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit'
                )
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    scripted_metric: {
                        combine_script:
                            'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit'
                    }
                }
            });
        });

        test('sets reduceScript', () => {
            const value = getInstance()
                .reduceScript(
                    'double profit = 0; for (a in params._aggs) { profit += a } return profit'
                )
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    scripted_metric: {
                        reduce_script:
                            'double profit = 0; for (a in params._aggs) { profit += a } return profit'
                    }
                }
            });
        });

        test('sets params', () => {
            // Apparently if you specify script parameters then you must specify "_agg": {}.
            const value = getInstance()
                .params({ field: 'amount', _agg: {} })
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    scripted_metric: {
                        params: { field: 'amount', _agg: {} }
                    }
                }
            });
        });
    });
});
