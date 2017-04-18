import _ from 'lodash';
import { recursiveToJSON } from '../src/core/util';

/**
 * Macro for testing that aggregation type is set as expected.
 *
 * @param {*} t
 * @param {function} Cls
 * @param {string} aggType
 * @param {Object=} defaultDef
 */
export function setsAggType(t, Cls, aggType, defaultDef) {
    const myAgg = new Cls('my_agg').toJSON();
    const expected = {
        my_agg: {
            [aggType]: Object.assign({}, defaultDef)
        }
    };
    t.deepEqual(myAgg, expected);
}

setsAggType.title = (ignore, Cls, aggType) => `sets type as ${aggType}`;

/**
 * Macro for checking method cannot be called on the instance
 *
 * @param {*} t
 * @param {*} Cls constructor class
 * @param {string} propKey method name
 */
export function illegalCall(t, Cls, propKey) {
    const err = t.throws(() => new Cls('my_agg')[propKey](), Error);
    t.is(err.message, `${propKey} is not supported in ${Cls.name}`);
}

illegalCall.title = (ignore, Cls, propKey) => `${_.snakeCase(propKey)} cannot be called`;

/**
 * Check that calling method on instance with illegal param type throws error
 *
 * @param {*} t
 * @param {*} instance
 * @param {string} method
 * @param {string} clsName
 */
export function illegalParamType(t, instance, method, clsName) {
    const err = t.throws(() => instance[method](null), TypeError);
    t.is(err.message, `Argument must be an instance of ${clsName}`);
}

illegalParamType.title = (ignore, instance, method, clsName) => `checks ${clsName} class`;

/**
 * Macro for testing method validation
 *
 * @param {*} t
 * @param {function} getInstance
 * @param {string} method
 * @param {Array} validValues
 * @param {boolean=} toggleCase
 */
export function validatedCorrectly(t, getInstance, method, validValues, toggleCase = true) {
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
 * Make macro for checking property is set.
 *
 * @param {function} getInstance
 * @param {string} name
 * @param {string} type
 * @param {Object=} defaultDef
 * @returns {function}
 */
export function makeAggPropIsSetMacro(getInstance, name, type, defaultDef) {
    /**
     * Macro for testing that property is being set
     *
     * @param {*} t
     * @param {string} methodName
     * @param {*} methodParam
     * @param {*=} propValue Optional argument for use when value passed is not the value set
     */
    function aggPropIsSet(t, methodName, methodParam, propValue = methodParam) {
        const myAgg = Array.isArray(methodParam)
            ? getInstance()[methodName](...methodParam).toJSON()
            : getInstance()[methodName](methodParam).toJSON();
        const expected = {
            [name]: {
                [type]: Object.assign(
                    { [_.snakeCase(methodName)]: recursiveToJSON(propValue) },
                    defaultDef
                )
            }
        };
        t.deepEqual(myAgg, expected);
    }

    aggPropIsSet.title = (ignore, methodName) => `${_.snakeCase(methodName)} is set`;

    return aggPropIsSet;
}
