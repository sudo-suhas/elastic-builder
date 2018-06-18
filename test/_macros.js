import _ from 'lodash';
import { recursiveToJSON } from '../src/core/util';

const ILLEGAL_PARAM = Object.create(null);

/**
 * Macro for testing that aggregation type is set as expected.
 *
 * @param {*} t
 * @param {function} Cls
 * @param {string} aggType
 * @param {Object=} defaultDef
 */
export function setsAggType(t, Cls, aggType, defaultDef) {
    const value = new Cls('my_agg').toJSON();
    const expected = {
        my_agg: {
            [aggType]: Object.assign({}, defaultDef)
        }
    };
    t.deepEqual(value, expected);
}

setsAggType.title = (ignore, Cls, aggType) => `sets type as ${aggType}`;

/**
 * Macro for checking method cannot be called on the instance
 *
 * @param {*} t
 * @param {*} Cls constructor class
 * @param {string} propKey method name
 */
export function illegalCall(t, Cls, propKey, ...args) {
    const err = t.throws(() => new Cls(...args)[propKey](), Error);
    t.is(err.message, `${propKey} is not supported in ${Cls.name}`);
}

illegalCall.title = (ignore, Cls, propKey) =>
    `${_.snakeCase(propKey)} cannot be set`;

/**
 * Check that calling method on instance with illegal param type throws error
 *
 * @param {*} t
 * @param {*} instance
 * @param {string} method
 * @param {string} clsName
 */
export function illegalParamType(t, instance, method, clsName) {
    let err = t.throws(() => instance[method](null), TypeError);
    t.is(err.message, `Argument must be an instance of ${clsName}`);

    err = t.throws(() => instance[method](ILLEGAL_PARAM), TypeError);
    t.is(err.message, `Argument must be an instance of ${clsName}`);
}

illegalParamType.title = (ignore, instance, method, clsName) =>
    `checks ${clsName} class`;

/**
 * Macro for testing method validation
 *
 * @param {*} t
 * @param {function} getInstance
 * @param {string} method
 * @param {Array} validValues
 * @param {boolean=} toggleCase
 */
export function validatedCorrectly(
    t,
    getInstance,
    method,
    validValues,
    toggleCase = true
) {
    _.forEach(validValues, val => {
        t.notThrows(() => getInstance()[method](val));

        if (toggleCase) {
            t.notThrows(() => getInstance()[method](val.toLowerCase()));
            t.notThrows(() => getInstance()[method](val.toUpperCase()));
        }
    });

    t.throws(() => getInstance()[method](null));
    t.throws(() => getInstance()[method](`invalid_${_.snakeCase(method)}`));
}

validatedCorrectly.title = (ignore, getInstance, method) =>
    `${_.snakeCase(method)} correctly validated`;

/**
 * Simple strategy for checking option is set for use with `makeSetsOptionMacro`
 *
 * @param {string} keyName
 * @param {*} propValue
 * @returns {function}
 */
export function simpleExpect(keyName, propValue) {
    return { [keyName]: propValue };
}

/**
 * Expect strategy for use with `makeSetsOptionMacro` for aggregations
 *
 * @param {string} name
 * @param {string} type
 * @param {Object} defaultDef
 * @returns {function}
 */
export function nameTypeExpectStrategy(name, type, defaultDef) {
    return (keyName, propValue) => ({
        [name]: {
            [type]: Object.assign({}, defaultDef, { [keyName]: propValue })
        }
    });
}

/**
 * Expect strategy for use with `makeSetsOptionMacro` for queries, score functions
 *
 * @param {string} name
 * @param {Object=} defaultDef
 * @returns {function}
 */
export function nameExpectStrategy(name, defaultDef) {
    return (keyName, propValue) => ({
        [name]: Object.assign({}, defaultDef, { [keyName]: propValue })
    });
}

/**
 * Expect strategy for use with `makeSetsOptionMacro` for full text queries
 *
 * @param {string} name
 * @param {Object=} defaultDef
 * @returns {function}
 */
export function nameFieldExpectStrategy(name, defaultDef) {
    return (keyName, propValue) => ({
        [name]: {
            my_field: Object.assign({}, defaultDef, { [keyName]: propValue })
        }
    });
}

/**
 * Make macro for checking property is set.
 *
 * @param {function} getInstance
 * @param {function=} getExpected Set to `simpleExpect` by default
 * @returns {function}
 */
export function makeSetsOptionMacro(getInstance, getExpected = simpleExpect) {
    /**
     * Macro for testing that property is being set
     *
     * @param {*} t
     * @param {string} methodName
     * @param {Object} options
     * @param {*} options.param
     * @param {*=} options.propValue Optional argument for use when value passed is not the value set
     * @param {boolean=} options.spread If array is passed, to control spread
     * @param {string=} options.keyName Optional override argument, default is `_.snakeCase(methodName)`
     */
    function setsOption(
        t,
        methodName,
        {
            param,
            propValue = param,
            spread = true,
            keyName = _.snakeCase(methodName)
        }
    ) {
        const value =
            Array.isArray(param) && spread
                ? getInstance()
                      [methodName](...param)
                      .toJSON()
                : getInstance()
                      [methodName](param)
                      .toJSON();
        const expected = getExpected(keyName, recursiveToJSON(propValue));
        t.deepEqual(value, expected);
    }

    setsOption.title = (providedTitle, methodName) =>
        !_.isEmpty(providedTitle)
            ? providedTitle
            : `sets ${_.snakeCase(methodName)} option`;

    return setsOption;
}
