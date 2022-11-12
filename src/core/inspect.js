/* istanbul ignore file */
/* eslint-disable max-lines */
'use strict';

const isString = require('lodash.isstring'),
    isObject = require('lodash.isobject');

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 * @returns {string}
 */
function inspect(obj, opts) {
    /* eslint-disable prefer-rest-params */
    // default options
    const ctx = {
        seen: [],
        stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
        // legacy...
        ctx.showHidden = opts;
    } else if (opts) {
        // got an "options" object
        exports._extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
    /* eslint-enable prefer-rest-params */
}

module.exports = inspect;

/* eslint-disable require-jsdoc */

function stylizeNoColor(str) {
    return str;
}

function stylizeWithColor(str, styleType) {
    const style = inspect.styles[styleType];

    if (style) {
        return `\u001B[${inspect.colors[style][0]}m${str}\u001B[${inspect.colors[style][1]}m`;
    }
    return str;
}

// eslint-disable-next-line complexity, max-statements
function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (
        ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== exports.inspect &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)
    ) {
        let ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
    }

    // Primitive types cannot have properties
    const primitive = formatPrimitive(ctx, value);
    if (primitive) {
        return primitive;
    }

    // Look up the keys of the object.
    let keys = Object.keys(value);
    const visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (
        isError(value) &&
        (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)
    ) {
        return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (isFunction(value)) {
            const name = value.name ? `: ${value.name}` : '';
            return ctx.stylize(`[Function${name}]`, 'special');
        }
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
            return formatError(value);
        }
    }

    let base = '',
        array = false,
        braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
        const n = value.name ? `: ${value.name}` : '';
        base = ` [Function${n}]`;
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
        base = ` ${RegExp.prototype.toString.call(value)}`;
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
        base = ` ${Date.prototype.toUTCString.call(value)}`;
    }

    // Make error with message first say the error
    if (isError(value)) {
        base = ` ${formatError(value)}`;
    }

    if (keys.length === 0 && (!array || value.length === 0)) {
        return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        return ctx.stylize('[Object]', 'special');
    }

    ctx.seen.push(value);

    let output;
    if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
        output = keys.map(key =>
            formatProperty(ctx, value, recurseTimes, visibleKeys, key, array)
        );
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
}

function isArray(ar) {
    return Array.isArray(ar);
}

function isBoolean(arg) {
    return typeof arg === 'boolean';
}

function isNull(arg) {
    return arg === null;
}

function isNumber(arg) {
    return typeof arg === 'number';
}

function isUndefined(arg) {
    return arg === undefined;
}

function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
    return (
        isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error)
    );
}

function isFunction(arg) {
    return typeof arg === 'function';
}

function arrayToHash(array) {
    const hash = {};

    array.forEach(val => {
        hash[val] = true;
    });

    return hash;
}

function formatError(value) {
    return `[${Error.prototype.toString.call(value)}]`;
}

// eslint-disable-next-line consistent-return
function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
        const simple = `'${JSON.stringify(value)
            .replace(/^"|"$/g, '')
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')}'`;
        return ctx.stylize(simple, 'string');
    }
    if (isNumber(value)) return ctx.stylize(`${value}`, 'number');
    if (isBoolean(value)) return ctx.stylize(`${value}`, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    const output = [];
    for (let i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
            output.push(
                formatProperty(
                    ctx,
                    value,
                    recurseTimes,
                    visibleKeys,
                    String(i),
                    true
                )
            );
        } else {
            output.push('');
        }
    }
    keys.forEach(key => {
        if (!key.match(/^\d+$/)) {
            output.push(
                formatProperty(ctx, value, recurseTimes, visibleKeys, key, true)
            );
        }
    });
    return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    let name, str;
    const desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
    };
    if (desc.get) {
        if (desc.set) {
            str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
            str = ctx.stylize('[Getter]', 'special');
        }
    } else if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
    }
    if (!hasOwnProperty(visibleKeys, key)) {
        name = `[${key}]`;
    }
    if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
            } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
                if (array) {
                    str = str
                        .split('\n')
                        .map(line => `  ${line}`)
                        .join('\n')
                        .slice(2);
                } else {
                    str = `\n${str
                        .split('\n')
                        .map(line => `   ${line}`)
                        .join('\n')}`;
                }
            }
        } else {
            str = ctx.stylize('[Circular]', 'special');
        }
    }
    if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
            return str;
        }
        name = JSON.stringify(`${key}`);
        if (name.match(/^"([a-zA-Z_]\w*)"$/)) {
            name = name.slice(1, -1);
            name = ctx.stylize(name, 'name');
        } else {
            name = name
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, 'string');
        }
    }

    return `${name}: ${str}`;
}

function reduceToSingleString(output, base, braces) {
    const length = output.reduce(
        (prev, cur) =>
            // eslint-disable-next-line no-control-regex
            prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1,
        0
    );

    if (length > 60) {
        return `${braces[0] + (base === '' ? '' : `${base}\n `)} ${output.join(
            ',\n  '
        )} ${braces[1]}`;
    }

    return `${braces[0] + base} ${output.join(', ')} ${braces[1]}`;
}

function objectToString(o) {
    return Object.prototype.toString.call(o);
}

/* eslint-enable require-jsdoc */
