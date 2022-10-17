import test from 'ava';
import { DistanceFeatureQuery } from '../../src';
// import { makeSetsOptionMacro } from '../_macros';

// const getInstance = () => new DistanceFeatureQuery('time_field');

// const setsOption = makeSetsOptionMacro(
//     getInstance,
//     makeSetsOptionMacro('my_suggester', 'completion')
// );

test(t => {
    const value = new DistanceFeatureQuery('time')
        .origin('now')
        .pivot('1h')
        .toJSON();
    const expected = {
        distance_feature: {
            field: 'time',
            pivot: '1h',
            origin: 'now'
        }
    };
    t.deepEqual(value, expected);
});
