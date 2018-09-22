/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dojo_datepicker_example", [], factory);
	else if(typeof exports === 'object')
		exports["dojo_datepicker_example"] = factory();
	else
		root["dojo_datepicker_example"] = factory();
})(this, function() {
return dojoWebpackJsonpdojo_datepicker_example(["main"],{

/***/ "./node_modules/@dojo/framework/core/Destroyable.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__("./node_modules/@dojo/framework/core/lang.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Promise__ = __webpack_require__("./node_modules/@dojo/framework/shim/Promise.mjs");


/**
 * No operation function to replace own once instance is destoryed
 */
function noop() {
    return __WEBPACK_IMPORTED_MODULE_1__shim_Promise__["a" /* default */].resolve(false);
}
/**
 * No op function used to replace own, once instance has been destoryed
 */
function destroyed() {
    throw new Error('Call made to destroyed method');
}
class Destroyable {
    /**
     * @constructor
     */
    constructor() {
        this.handles = [];
    }
    /**
     * Register handles for the instance that will be destroyed when `this.destroy` is called
     *
     * @param {Handle} handle The handle to add for the instance
     * @returns {Handle} a handle for the handle, removes the handle for the instance and calls destroy
     */
    own(handles) {
        const handle = Array.isArray(handles) ? Object(__WEBPACK_IMPORTED_MODULE_0__lang__["b" /* createCompositeHandle */])(...handles) : handles;
        const { handles: _handles } = this;
        _handles.push(handle);
        return {
            destroy() {
                _handles.splice(_handles.indexOf(handle));
                handle.destroy();
            }
        };
    }
    /**
     * Destrpys all handers registered for the instance
     *
     * @returns {Promise<any} a promise that resolves once all handles have been destroyed
     */
    destroy() {
        return new __WEBPACK_IMPORTED_MODULE_1__shim_Promise__["a" /* default */]((resolve) => {
            this.handles.forEach((handle) => {
                handle && handle.destroy && handle.destroy();
            });
            this.destroy = noop;
            this.own = destroyed;
            resolve(true);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Destroyable;

/* unused harmony default export */ var _unused_webpack_default_export = (Destroyable);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/Evented.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isGlobMatch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Destroyable__ = __webpack_require__("./node_modules/@dojo/framework/core/Destroyable.mjs");


/**
 * Map of computed regular expressions, keyed by string
 */
const regexMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
/**
 * Determines is the event type glob has been matched
 *
 * @returns boolean that indicates if the glob is matched
 */
function isGlobMatch(globString, targetString) {
    if (typeof targetString === 'string' && typeof globString === 'string' && globString.indexOf('*') !== -1) {
        let regex;
        if (regexMap.has(globString)) {
            regex = regexMap.get(globString);
        }
        else {
            regex = new RegExp(`^${globString.replace(/\*/g, '.*')}$`);
            regexMap.set(globString, regex);
        }
        return regex.test(targetString);
    }
    else {
        return globString === targetString;
    }
}
/**
 * Event Class
 */
class Evented extends __WEBPACK_IMPORTED_MODULE_1__Destroyable__["a" /* Destroyable */] {
    constructor() {
        super(...arguments);
        /**
         * map of listeners keyed by event type
         */
        this.listenersMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
    }
    emit(event) {
        this.listenersMap.forEach((methods, type) => {
            if (isGlobMatch(type, event.type)) {
                [...methods].forEach((method) => {
                    method.call(this, event);
                });
            }
        });
    }
    on(type, listener) {
        if (Array.isArray(listener)) {
            const handles = listener.map((listener) => this._addListener(type, listener));
            return {
                destroy() {
                    handles.forEach((handle) => handle.destroy());
                }
            };
        }
        return this._addListener(type, listener);
    }
    _addListener(type, listener) {
        const listeners = this.listenersMap.get(type) || [];
        listeners.push(listener);
        this.listenersMap.set(type, listeners);
        return {
            destroy: () => {
                const listeners = this.listenersMap.get(type) || [];
                listeners.splice(listeners.indexOf(listener), 1);
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Evented;

/* harmony default export */ __webpack_exports__["b"] = (Evented);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/has.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testCache", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testFunctions", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "load", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "add", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a"]; });



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["b" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('object-assign', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Object.assign === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('arraybuffer', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].ArrayBuffer !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('formdata', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].FormData !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('filereader', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].FileReader !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('xhr', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].XMLHttpRequest !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('xhr2', true && 'responseType' in __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].XMLHttpRequest.prototype, true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('blob', function () {
    if (false) {
        return false;
    }
    const request = new __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].XMLHttpRequest();
    request.open('GET', __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].location.protocol + '//www.google.com', true);
    request.responseType = 'blob';
    request.abort();
    return request.responseType === 'blob';
}, true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('node-buffer', 'Buffer' in __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */] && typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Buffer === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('fetch', 'fetch' in __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */] && typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].fetch === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('web-worker-xhr-upload', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Promise !== 'undefined' &&
    new Promise((resolve) => {
        try {
            if (__WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Worker !== undefined && __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].URL && __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].URL.createObjectURL) {
                const blob = new Blob([
                    `(function () {
self.addEventListener('message', function () {
	var xhr = new XMLHttpRequest();
	try {
		xhr.upload;
		postMessage('true');
	} catch (e) {
		postMessage('false');
	}
});
		})()`
                ], { type: 'application/javascript' });
                const worker = new Worker(URL.createObjectURL(blob));
                worker.addEventListener('message', ({ data: result }) => {
                    resolve(result === 'true');
                });
                worker.postMessage({});
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            // IE11 on Winodws 8.1 encounters a security error.
            resolve(false);
        }
    }), true);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/lang.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* unused harmony export deepAssign */
/* unused harmony export deepMixin */
/* unused harmony export duplicate */
/* unused harmony export isIdentical */
/* unused harmony export lateBind */
/* unused harmony export mixin */
/* unused harmony export partial */
/* harmony export (immutable) */ __webpack_exports__["c"] = createHandle;
/* harmony export (immutable) */ __webpack_exports__["b"] = createCompositeHandle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_object__ = __webpack_require__("./node_modules/@dojo/framework/shim/object.mjs");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__shim_object__["a"]; });


const slice = Array.prototype.slice;
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Type guard that ensures that the value can be coerced to Object
 * to weed out host objects that do not derive from Object.
 * This function is used to check if we want to deep copy an object or not.
 * Note: In ES6 it is possible to modify an object's Symbol.toStringTag property, which will
 * change the value returned by `toString`. This is a rare edge case that is difficult to handle,
 * so it is not handled here.
 * @param  value The value to check
 * @return       If the value is coercible into an Object
 */
function shouldDeepCopyObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
function copyArray(array, inherited) {
    return array.map(function (item) {
        if (Array.isArray(item)) {
            return copyArray(item, inherited);
        }
        return !shouldDeepCopyObject(item)
            ? item
            : _mixin({
                deep: true,
                inherited: inherited,
                sources: [item],
                target: {}
            });
    });
}
function _mixin(kwArgs) {
    const deep = kwArgs.deep;
    const inherited = kwArgs.inherited;
    const target = kwArgs.target;
    const copied = kwArgs.copied || [];
    const copiedClone = [...copied];
    for (let i = 0; i < kwArgs.sources.length; i++) {
        const source = kwArgs.sources[i];
        if (source === null || source === undefined) {
            continue;
        }
        for (let key in source) {
            if (inherited || hasOwnProperty.call(source, key)) {
                let value = source[key];
                if (copiedClone.indexOf(value) !== -1) {
                    continue;
                }
                if (deep) {
                    if (Array.isArray(value)) {
                        value = copyArray(value, inherited);
                    }
                    else if (shouldDeepCopyObject(value)) {
                        const targetValue = target[key] || {};
                        copied.push(source);
                        value = _mixin({
                            deep: true,
                            inherited: inherited,
                            sources: [value],
                            target: targetValue,
                            copied
                        });
                    }
                }
                target[key] = value;
            }
        }
    }
    return target;
}
function create(prototype, ...mixins) {
    if (!mixins.length) {
        throw new RangeError('lang.create requires at least one mixin object.');
    }
    const args = mixins.slice();
    args.unshift(Object.create(prototype));
    return __WEBPACK_IMPORTED_MODULE_0__shim_object__["a" /* assign */].apply(null, args);
}
function deepAssign(target, ...sources) {
    return _mixin({
        deep: true,
        inherited: false,
        sources: sources,
        target: target
    });
}
function deepMixin(target, ...sources) {
    return _mixin({
        deep: true,
        inherited: true,
        sources: sources,
        target: target
    });
}
/**
 * Creates a new object using the provided source's prototype as the prototype for the new object, and then
 * deep copies the provided source's values into the new target.
 *
 * @param source The object to duplicate
 * @return The new object
 */
function duplicate(source) {
    const target = Object.create(Object.getPrototypeOf(source));
    return deepMixin(target, source);
}
/**
 * Determines whether two values are the same value.
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @return true if the values are the same; false otherwise
 */
function isIdentical(a, b) {
    return (a === b ||
        /* both values are NaN */
        (a !== a && b !== b));
}
/**
 * Returns a function that binds a method to the specified object at runtime. This is similar to
 * `Function.prototype.bind`, but instead of a function it takes the name of a method on an object.
 * As a result, the function returned by `lateBind` will always call the function currently assigned to
 * the specified property on the object as of the moment the function it returns is called.
 *
 * @param instance The context object
 * @param method The name of the method on the context object to bind to itself
 * @param suppliedArgs An optional array of values to prepend to the `instance[method]` arguments list
 * @return The bound function
 */
function lateBind(instance, method, ...suppliedArgs) {
    return suppliedArgs.length
        ? function () {
            const args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
            // TS7017
            return instance[method].apply(instance, args);
        }
        : function () {
            // TS7017
            return instance[method].apply(instance, arguments);
        };
}
function mixin(target, ...sources) {
    return _mixin({
        deep: false,
        inherited: true,
        sources: sources,
        target: target
    });
}
/**
 * Returns a function which invokes the given function with the given arguments prepended to its argument list.
 * Like `Function.prototype.bind`, but does not alter execution context.
 *
 * @param targetFunction The function that needs to be bound
 * @param suppliedArgs An optional array of arguments to prepend to the `targetFunction` arguments list
 * @return The bound function
 */
function partial(targetFunction, ...suppliedArgs) {
    return function () {
        const args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
        return targetFunction.apply(this, args);
    };
}
/**
 * Returns an object with a destroy method that, when called, calls the passed-in destructor.
 * This is intended to provide a unified interface for creating "remove" / "destroy" handlers for
 * event listeners, timers, etc.
 *
 * @param destructor A function that will be called when the handle's `destroy` method is invoked
 * @return The handle object
 */
function createHandle(destructor) {
    let called = false;
    return {
        destroy: function () {
            if (!called) {
                called = true;
                destructor();
            }
        }
    };
}
/**
 * Returns a single handle that can be used to destroy multiple handles simultaneously.
 *
 * @param handles An array of handles with `destroy` methods
 * @return The handle object
 */
function createCompositeHandle(...handles) {
    return createHandle(function () {
        for (let i = 0; i < handles.length; i++) {
            handles[i].destroy();
        }
    });
}


/***/ }),

/***/ "./node_modules/@dojo/framework/core/load/util.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPlugin */
/* harmony export (immutable) */ __webpack_exports__["a"] = useDefault;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");

function isPlugin(value) {
    return Boolean(value) && typeof value.load === 'function';
}
function useDefault(modules) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__shim_iterator__["a" /* isArrayLike */])(modules)) {
        let processedModules = [];
        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];
            processedModules.push(module.__esModule && module.default ? module.default : module);
        }
        return processedModules;
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_0__shim_iterator__["b" /* isIterable */])(modules)) {
        let processedModules = [];
        for (const module of modules) {
            processedModules.push(module.__esModule && module.default ? module.default : module);
        }
        return processedModules;
    }
    else {
        return modules.__esModule && modules.default ? modules.default : modules;
    }
}


/***/ }),

/***/ "./node_modules/@dojo/framework/core/uuid.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = uuid;
/**
 * Returns a v4 compliant UUID.
 *
 * @returns {string}
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


/***/ }),

/***/ "./node_modules/@dojo/framework/has/has.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {/* harmony export (immutable) */ __webpack_exports__["d"] = load;
/* harmony export (immutable) */ __webpack_exports__["e"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["c"] = exists;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* harmony export (immutable) */ __webpack_exports__["b"] = has;
function isFeatureTestThenable(value) {
    return value && value.then;
}
/**
 * A cache of results of feature tests
 */
const testCache = {};
/* harmony export (immutable) */ __webpack_exports__["f"] = testCache;

/**
 * A cache of the un-resolved feature tests
 */
const testFunctions = {};
/* harmony export (immutable) */ __webpack_exports__["g"] = testFunctions;

/**
 * A cache of unresolved thenables (probably promises)
 * @type {{}}
 */
const testThenables = {};
/**
 * A reference to the global scope (`window` in a browser, `global` in NodeJS)
 */
const globalScope = (function () {
    /* istanbul ignore else */
    if (typeof window !== 'undefined') {
        // Browsers
        return window;
    }
    else if (typeof global !== 'undefined') {
        // Node
        return global;
    }
    else if (typeof self !== 'undefined') {
        // Web workers
        return self;
    }
    /* istanbul ignore next */
    return {};
})();
/* Grab the staticFeatures if there are available */
const { staticFeatures } = globalScope.DojoHasEnvironment || {};
/* Cleaning up the DojoHasEnviornment */
if ('DojoHasEnvironment' in globalScope) {
    delete globalScope.DojoHasEnvironment;
}
/**
 * Custom type guard to narrow the `staticFeatures` to either a map or a function that
 * returns a map.
 *
 * @param value The value to guard for
 */
function isStaticFeatureFunction(value) {
    return typeof value === 'function';
}
/**
 * The cache of asserted features that were available in the global scope when the
 * module loaded
 */
const staticCache = staticFeatures
    ? isStaticFeatureFunction(staticFeatures)
        ? staticFeatures.apply(globalScope)
        : staticFeatures
    : {}; /* Providing an empty cache, if none was in the environment

/**
* AMD plugin function.
*
* Conditional loads modules based on a has feature test value.
*
* @param resourceId Gives the resolved module id to load.
* @param require The loader require function with respect to the module that contained the plugin resource in its
*                dependency list.
* @param load Callback to loader that consumes result of plugin demand.
*/
function load(resourceId, require, load, config) {
    resourceId ? require([resourceId], load) : load();
}
/**
 * AMD plugin function.
 *
 * Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
 * value(s).
 *
 * @param resourceId The id of the module
 * @param normalize Resolves a relative module id into an absolute module id
 */
function normalize(resourceId, normalize) {
    const tokens = resourceId.match(/[\?:]|[^:\?]*/g) || [];
    let i = 0;
    function get(skip) {
        const term = tokens[i++];
        if (term === ':') {
            // empty string module name, resolves to null
            return null;
        }
        else {
            // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
            if (tokens[i++] === '?') {
                if (!skip && has(term)) {
                    // matched the feature, get the first value from the options
                    return get();
                }
                else {
                    // did not match, get the second value, passing over the first
                    get(true);
                    return get(skip);
                }
            }
            // a module
            return term;
        }
    }
    const id = get();
    return id && normalize(id);
}
/**
 * Check if a feature has already been registered
 *
 * @param feature the name of the feature
 */
function exists(feature) {
    const normalizedFeature = feature.toLowerCase();
    return Boolean(normalizedFeature in staticCache || normalizedFeature in testCache || testFunctions[normalizedFeature]);
}
/**
 * Register a new test for a named feature.
 *
 * @example
 * has.add('dom-addeventlistener', !!document.addEventListener);
 *
 * @example
 * has.add('touch-events', function () {
 *    return 'ontouchstart' in document
 * });
 *
 * @param feature the name of the feature
 * @param value the value reported of the feature, or a function that will be executed once on first test
 * @param overwrite if an existing value should be overwritten. Defaults to false.
 */
function add(feature, value, overwrite = false) {
    const normalizedFeature = feature.toLowerCase();
    if (exists(normalizedFeature) && !overwrite && !(normalizedFeature in staticCache)) {
        throw new TypeError(`Feature "${feature}" exists and overwrite not true.`);
    }
    if (typeof value === 'function') {
        testFunctions[normalizedFeature] = value;
    }
    else if (isFeatureTestThenable(value)) {
        testThenables[feature] = value.then((resolvedValue) => {
            testCache[feature] = resolvedValue;
            delete testThenables[feature];
        }, () => {
            delete testThenables[feature];
        });
    }
    else {
        testCache[normalizedFeature] = value;
        delete testFunctions[normalizedFeature];
    }
}
/**
 * Return the current value of a named feature.
 *
 * @param feature The name (if a string) or identifier (if an integer) of the feature to test.
 */
function has(feature) {
    let result;
    const normalizedFeature = feature.toLowerCase();
    if (normalizedFeature in staticCache) {
        result = staticCache[normalizedFeature];
    }
    else if (testFunctions[normalizedFeature]) {
        result = testCache[normalizedFeature] = testFunctions[normalizedFeature].call(null);
        delete testFunctions[normalizedFeature];
    }
    else if (normalizedFeature in testCache) {
        result = testCache[normalizedFeature];
    }
    else if (feature in testThenables) {
        return false;
    }
    else {
        throw new TypeError(`Attempt to detect unregistered has feature "${feature}"`);
    }
    return result;
}
/*
 * Out of the box feature tests
 */
/* Environments */
/* Used as a value to provide a debug only code path */
add('debug', true);
/* Detects if the environment is "browser like" */
add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
/* Detects if the environment appears to be NodeJS */
add('host-node', function () {
    if (typeof process === 'object' && process.versions && process.versions.node) {
        return process.versions.node;
    }
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@dojo/framework/i18n/cldr/load.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isLoaded"] = isLoaded;
/* harmony export (immutable) */ __webpack_exports__["default"] = loadCldrData;
/* harmony export (immutable) */ __webpack_exports__["reset"] = reset;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cldrjs_dist_cldr_unresolved__ = __webpack_require__("./node_modules/cldrjs/dist/cldr/unresolved.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cldrjs_dist_cldr_unresolved___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cldrjs_dist_cldr_unresolved__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_globalize_dist_globalize__ = __webpack_require__("./node_modules/globalize/dist/globalize.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_globalize_dist_globalize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_globalize_dist_globalize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__locales__ = __webpack_require__("./node_modules/@dojo/framework/i18n/cldr/locales.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_main__ = __webpack_require__("./node_modules/@dojo/framework/i18n/util/main.mjs");
// required for Globalize/Cldr to properly resolve locales in the browser.




/**
 * A list of all required CLDR packages for an individual locale.
 */
const mainPackages = Object.freeze([
    'dates/calendars/gregorian',
    'dates/fields',
    'dates/timeZoneNames',
    'numbers',
    'numbers/currencies',
    'units'
]);
/* harmony export (immutable) */ __webpack_exports__["mainPackages"] = mainPackages;

/**
 * A list of all required CLDR supplement packages.
 */
const supplementalPackages = Object.freeze([
    'currencyData',
    'likelySubtags',
    'numberingSystems',
    'plurals-type-cardinal',
    'plurals-type-ordinal',
    'timeData',
    'weekData'
]);
/* harmony export (immutable) */ __webpack_exports__["supplementalPackages"] = supplementalPackages;

/**
 * @private
 * A simple map containing boolean flags indicating whether a particular CLDR package has been loaded.
 */
const loadCache = {
    main: Object.create(null),
    supplemental: generateSupplementalCache()
};
/**
 * @private
 * Generate the locale-specific data cache from a list of keys. Nested objects will be generated from
 * slash-separated strings.
 *
 * @param cache
 * An empty locale cache object.
 *
 * @param keys
 * The list of keys.
 */
function generateLocaleCache(cache, keys) {
    return keys.reduce((tree, key) => {
        const parts = key.split('/');
        if (parts.length === 1) {
            tree[key] = false;
            return tree;
        }
        parts.reduce((tree, key, i) => {
            if (typeof tree[key] !== 'object') {
                tree[key] = i === parts.length - 1 ? false : Object.create(null);
            }
            return tree[key];
        }, tree);
        return tree;
    }, cache);
}
/**
 * @private
 * Generate the supplemental data cache.
 */
function generateSupplementalCache() {
    return supplementalPackages.reduce((map, key) => {
        map[key] = false;
        return map;
    }, Object.create(null));
}
/**
 * @private
 * Recursively determine whether a list of packages have been loaded for the specified CLDR group.
 *
 * @param group
 * The CLDR group object (e.g., the supplemental data, or a specific locale group)
 *
 * @param args
 * A list of keys to recursively check from left to right. For example, if [ "en", "numbers" ],
 * then `group.en.numbers` must exist for the test to pass.
 *
 * @return
 * `true` if the deepest value exists; `false` otherwise.
 */
function isLoadedForGroup(group, args) {
    return args.every((arg) => {
        const next = group[arg];
        group = next;
        return Boolean(next);
    });
}
/**
 * @private
 * Recursively flag as loaded all recognized keys on the provided CLDR data object.
 *
 * @param cache
 * The load cache (either the entire object, or a nested segment of it).
 *
 * @param localeData
 * The CLDR data object being loaded (either the entire object, or a nested segment of it).
 */
function registerLocaleData(cache, localeData) {
    Object.keys(localeData).forEach((key) => {
        if (key in cache) {
            const value = cache[key];
            if (typeof value === 'boolean') {
                cache[key] = true;
            }
            else {
                registerLocaleData(value, localeData[key]);
            }
        }
    });
}
/**
 * @private
 * Flag all supplied CLDR packages for a specific locale as loaded.
 *
 * @param data
 * The `main` locale data.
 */
function registerMain(data) {
    if (!data) {
        return;
    }
    Object.keys(data).forEach((locale) => {
        if (__WEBPACK_IMPORTED_MODULE_2__locales__["a" /* default */].indexOf(locale) < 0) {
            return;
        }
        let loadedData = loadCache.main[locale];
        if (!loadedData) {
            loadedData = loadCache.main[locale] = generateLocaleCache(Object.create(null), mainPackages);
        }
        registerLocaleData(loadedData, data[locale]);
    });
}
/**
 * @private
 * Flag all supplied CLDR supplemental packages as loaded.
 *
 * @param data
 * The supplemental data.
 */
function registerSupplemental(data) {
    if (!data) {
        return;
    }
    const supplemental = loadCache.supplemental;
    Object.keys(data).forEach((key) => {
        if (key in supplemental) {
            supplemental[key] = true;
        }
    });
}
/**
 * Determine whether a particular CLDR package has been loaded.
 *
 * Example: to check that `supplemental.likelySubtags` has been loaded, `isLoaded` would be called as
 * `isLoaded('supplemental', 'likelySubtags')`.
 *
 * @param groupName
 * The group to check; either "main" or "supplemental".
 *
 * @param ...args
 * Any remaining keys in the path to the desired package.
 *
 * @return
 * `true` if the deepest value exists; `false` otherwise.
 */
function isLoaded(groupName, ...args) {
    let group = loadCache[groupName];
    if (groupName === 'main' && args.length > 0) {
        const locale = args[0];
        if (!Object(__WEBPACK_IMPORTED_MODULE_3__util_main__["c" /* validateLocale */])(locale)) {
            return false;
        }
        args = args.slice(1);
        return Object(__WEBPACK_IMPORTED_MODULE_3__util_main__["a" /* generateLocales */])(locale).some((locale) => {
            const next = group[locale];
            return next ? isLoadedForGroup(next, args) : false;
        });
    }
    return isLoadedForGroup(group, args);
}
/**
 * Load the specified CLDR data with the i18n ecosystem.
 *
 * @param data
 * A data object containing `main` and/or `supplemental` objects with CLDR data.
 */
function loadCldrData(data) {
    registerMain(data.main);
    registerSupplemental(data.supplemental);
    __WEBPACK_IMPORTED_MODULE_1_globalize_dist_globalize__["load"](data);
    return Promise.resolve();
}
/**
 * Clear the load cache, either the entire cache for the specified group. After calling this method,
 * `isLoaded` will return false for keys within the specified group(s).
 *
 * @param group
 * An optional group name. If not provided, then both the "main" and "supplemental" caches will be cleared.
 */
function reset(group) {
    if (group !== 'supplemental') {
        loadCache.main = Object.create(null);
    }
    if (group !== 'main') {
        loadCache.supplemental = generateSupplementalCache();
    }
}


/***/ }),

/***/ "./node_modules/@dojo/framework/i18n/cldr/locales.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * A list of `cldr-data/main` directories used to load the correct CLDR data for a given locale.
 */
const localesList = [
    'af-NA',
    'af',
    'agq',
    'ak',
    'am',
    'ar-AE',
    'ar-BH',
    'ar-DJ',
    'ar-DZ',
    'ar-EG',
    'ar-EH',
    'ar-ER',
    'ar-IL',
    'ar-IQ',
    'ar-JO',
    'ar-KM',
    'ar-KW',
    'ar-LB',
    'ar-LY',
    'ar-MA',
    'ar-MR',
    'ar-OM',
    'ar-PS',
    'ar-QA',
    'ar-SA',
    'ar-SD',
    'ar-SO',
    'ar-SS',
    'ar-SY',
    'ar-TD',
    'ar-TN',
    'ar-YE',
    'ar',
    'as',
    'asa',
    'ast',
    'az-Cyrl',
    'az-Latn',
    'az',
    'bas',
    'be',
    'bem',
    'bez',
    'bg',
    'bm',
    'bn-IN',
    'bn',
    'bo-IN',
    'bo',
    'br',
    'brx',
    'bs-Cyrl',
    'bs-Latn',
    'bs',
    'ca-AD',
    'ca-ES-VALENCIA',
    'ca-FR',
    'ca-IT',
    'ca',
    'ce',
    'cgg',
    'chr',
    'ckb-IR',
    'ckb',
    'cs',
    'cu',
    'cy',
    'da-GL',
    'da',
    'dav',
    'de-AT',
    'de-BE',
    'de-CH',
    'de-IT',
    'de-LI',
    'de-LU',
    'de',
    'dje',
    'dsb',
    'dua',
    'dyo',
    'dz',
    'ebu',
    'ee-TG',
    'ee',
    'el-CY',
    'el',
    'en-001',
    'en-150',
    'en-AG',
    'en-AI',
    'en-AS',
    'en-AT',
    'en-AU',
    'en-BB',
    'en-BE',
    'en-BI',
    'en-BM',
    'en-BS',
    'en-BW',
    'en-BZ',
    'en-CA',
    'en-CC',
    'en-CH',
    'en-CK',
    'en-CM',
    'en-CX',
    'en-CY',
    'en-DE',
    'en-DG',
    'en-DK',
    'en-DM',
    'en-ER',
    'en-FI',
    'en-FJ',
    'en-FK',
    'en-FM',
    'en-GB',
    'en-GD',
    'en-GG',
    'en-GH',
    'en-GI',
    'en-GM',
    'en-GU',
    'en-GY',
    'en-HK',
    'en-IE',
    'en-IL',
    'en-IM',
    'en-IN',
    'en-IO',
    'en-JE',
    'en-JM',
    'en-KE',
    'en-KI',
    'en-KN',
    'en-KY',
    'en-LC',
    'en-LR',
    'en-LS',
    'en-MG',
    'en-MH',
    'en-MO',
    'en-MP',
    'en-MS',
    'en-MT',
    'en-MU',
    'en-MW',
    'en-MY',
    'en-NA',
    'en-NF',
    'en-NG',
    'en-NL',
    'en-NR',
    'en-NU',
    'en-NZ',
    'en-PG',
    'en-PH',
    'en-PK',
    'en-PN',
    'en-PR',
    'en-PW',
    'en-RW',
    'en-SB',
    'en-SC',
    'en-SD',
    'en-SE',
    'en-SG',
    'en-SH',
    'en-SI',
    'en-SL',
    'en-SS',
    'en-SX',
    'en-SZ',
    'en-TC',
    'en-TK',
    'en-TO',
    'en-TT',
    'en-TV',
    'en-TZ',
    'en-UG',
    'en-UM',
    'en-US-POSIX',
    'en-VC',
    'en-VG',
    'en-VI',
    'en-VU',
    'en-WS',
    'en-ZA',
    'en-ZM',
    'en-ZW',
    'en',
    'eo',
    'es-419',
    'es-AR',
    'es-BO',
    'es-BR',
    'es-CL',
    'es-CO',
    'es-CR',
    'es-CU',
    'es-DO',
    'es-EA',
    'es-EC',
    'es-GQ',
    'es-GT',
    'es-HN',
    'es-IC',
    'es-MX',
    'es-NI',
    'es-PA',
    'es-PE',
    'es-PH',
    'es-PR',
    'es-PY',
    'es-SV',
    'es-US',
    'es-UY',
    'es-VE',
    'es',
    'et',
    'eu',
    'ewo',
    'fa-AF',
    'fa',
    'ff-CM',
    'ff-GN',
    'ff-MR',
    'ff',
    'fi',
    'fil',
    'fo-DK',
    'fo',
    'fr-BE',
    'fr-BF',
    'fr-BI',
    'fr-BJ',
    'fr-BL',
    'fr-CA',
    'fr-CD',
    'fr-CF',
    'fr-CG',
    'fr-CH',
    'fr-CI',
    'fr-CM',
    'fr-DJ',
    'fr-DZ',
    'fr-GA',
    'fr-GF',
    'fr-GN',
    'fr-GP',
    'fr-GQ',
    'fr-HT',
    'fr-KM',
    'fr-LU',
    'fr-MA',
    'fr-MC',
    'fr-MF',
    'fr-MG',
    'fr-ML',
    'fr-MQ',
    'fr-MR',
    'fr-MU',
    'fr-NC',
    'fr-NE',
    'fr-PF',
    'fr-PM',
    'fr-RE',
    'fr-RW',
    'fr-SC',
    'fr-SN',
    'fr-SY',
    'fr-TD',
    'fr-TG',
    'fr-TN',
    'fr-VU',
    'fr-WF',
    'fr-YT',
    'fr',
    'fur',
    'fy',
    'ga',
    'gd',
    'gl',
    'gsw-FR',
    'gsw-LI',
    'gsw',
    'gu',
    'guz',
    'gv',
    'ha-GH',
    'ha-NE',
    'ha',
    'haw',
    'he',
    'hi',
    'hr-BA',
    'hr',
    'hsb',
    'hu',
    'hy',
    'id',
    'ig',
    'ii',
    'is',
    'it-CH',
    'it-SM',
    'it',
    'ja',
    'jgo',
    'jmc',
    'ka',
    'kab',
    'kam',
    'kde',
    'kea',
    'khq',
    'ki',
    'kk',
    'kkj',
    'kl',
    'kln',
    'km',
    'kn',
    'ko-KP',
    'ko',
    'kok',
    'ks',
    'ksb',
    'ksf',
    'ksh',
    'kw',
    'ky',
    'lag',
    'lb',
    'lg',
    'lkt',
    'ln-AO',
    'ln-CF',
    'ln-CG',
    'ln',
    'lo',
    'lrc-IQ',
    'lrc',
    'lt',
    'lu',
    'luo',
    'luy',
    'lv',
    'mas-TZ',
    'mas',
    'mer',
    'mfe',
    'mg',
    'mgh',
    'mgo',
    'mk',
    'ml',
    'mn',
    'mr',
    'ms-BN',
    'ms-SG',
    'ms',
    'mt',
    'mua',
    'my',
    'mzn',
    'naq',
    'nb-SJ',
    'nb',
    'nd',
    'nds-NL',
    'nds',
    'ne-IN',
    'ne',
    'nl-AW',
    'nl-BE',
    'nl-BQ',
    'nl-CW',
    'nl-SR',
    'nl-SX',
    'nl',
    'nmg',
    'nn',
    'nnh',
    'nus',
    'nyn',
    'om-KE',
    'om',
    'or',
    'os-RU',
    'os',
    'pa-Arab',
    'pa-Guru',
    'pa',
    'pl',
    'prg',
    'ps',
    'pt-AO',
    'pt-CH',
    'pt-CV',
    'pt-GQ',
    'pt-GW',
    'pt-LU',
    'pt-MO',
    'pt-MZ',
    'pt-PT',
    'pt-ST',
    'pt-TL',
    'pt',
    'qu-BO',
    'qu-EC',
    'qu',
    'rm',
    'rn',
    'ro-MD',
    'ro',
    'rof',
    'root',
    'ru-BY',
    'ru-KG',
    'ru-KZ',
    'ru-MD',
    'ru-UA',
    'ru',
    'rw',
    'rwk',
    'sah',
    'saq',
    'sbp',
    'se-FI',
    'se-SE',
    'se',
    'seh',
    'ses',
    'sg',
    'shi-Latn',
    'shi-Tfng',
    'shi',
    'si',
    'sk',
    'sl',
    'smn',
    'sn',
    'so-DJ',
    'so-ET',
    'so-KE',
    'so',
    'sq-MK',
    'sq-XK',
    'sq',
    'sr-Cyrl-BA',
    'sr-Cyrl-ME',
    'sr-Cyrl-XK',
    'sr-Cyrl',
    'sr-Latn-BA',
    'sr-Latn-ME',
    'sr-Latn-XK',
    'sr-Latn',
    'sr',
    'sv-AX',
    'sv-FI',
    'sv',
    'sw-CD',
    'sw-KE',
    'sw-UG',
    'sw',
    'ta-LK',
    'ta-MY',
    'ta-SG',
    'ta',
    'te',
    'teo-KE',
    'teo',
    'th',
    'ti-ER',
    'ti',
    'tk',
    'to',
    'tr-CY',
    'tr',
    'twq',
    'tzm',
    'ug',
    'uk',
    'ur-IN',
    'ur',
    'uz-Arab',
    'uz-Cyrl',
    'uz-Latn',
    'uz',
    'vai-Latn',
    'vai-Vaii',
    'vai',
    'vi',
    'vo',
    'vun',
    'wae',
    'xog',
    'yav',
    'yi',
    'yo-BJ',
    'yo',
    'yue',
    'zgh',
    'zh-Hans-HK',
    'zh-Hans-MO',
    'zh-Hans-SG',
    'zh-Hans',
    'zh-Hant-HK',
    'zh-Hant-MO',
    'zh-Hant',
    'zh',
    'zu'
];
/* harmony default export */ __webpack_exports__["a"] = (localesList);


/***/ }),

/***/ "./node_modules/@dojo/framework/i18n/i18n.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["formatMessage"] = formatMessage;
/* harmony export (immutable) */ __webpack_exports__["getCachedMessages"] = getCachedMessages;
/* harmony export (immutable) */ __webpack_exports__["getMessageFormatter"] = getMessageFormatter;
/* harmony export (immutable) */ __webpack_exports__["invalidate"] = invalidate;
/* harmony export (immutable) */ __webpack_exports__["setLocaleMessages"] = setLocaleMessages;
/* harmony export (immutable) */ __webpack_exports__["switchLocale"] = switchLocale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_has__ = __webpack_require__("./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_uuid__ = __webpack_require__("./node_modules/@dojo/framework/core/uuid.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_load_util__ = __webpack_require__("./node_modules/@dojo/framework/core/load/util.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__ = __webpack_require__("./node_modules/globalize/dist/globalize/message.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cldr_load__ = __webpack_require__("./node_modules/@dojo/framework/i18n/cldr/load.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_main__ = __webpack_require__("./node_modules/@dojo/framework/i18n/util/main.mjs");

/* tslint:disable:interface-name */









const TOKEN_PATTERN = /\{([a-z0-9_]+)\}/gi;
const bundleMap = new __WEBPACK_IMPORTED_MODULE_2__shim_Map__["b" /* default */]();
const formatterMap = new __WEBPACK_IMPORTED_MODULE_2__shim_Map__["b" /* default */]();
const localeProducer = new __WEBPACK_IMPORTED_MODULE_3__core_Evented__["b" /* default */]();
let rootLocale;
/**
 * Return the bundle's unique identifier, creating one if it does not already exist.
 *
 * @param bundle A message bundle
 * @return The bundle's unique identifier
 */
function getBundleId(bundle) {
    if (bundle.id) {
        return bundle.id;
    }
    const id = Object(__WEBPACK_IMPORTED_MODULE_5__core_uuid__["a" /* default */])();
    Object.defineProperty(bundle, 'id', {
        value: id
    });
    return id;
}
/**
 * @private
 * Return a function that formats an ICU-style message, and takes an optional value for token replacement.
 *
 * Usage:
 * const formatter = getMessageFormatter(bundle, 'guestInfo', 'fr');
 * const message = formatter({
 *   host: 'Miles',
 *   gender: 'male',
 *   guest: 'Oscar',
 *   guestCount: '15'
 * });
 *
 * @param id
 * The message's bundle id.
 *
 * @param key
 * The message's key.
 *
 * @param locale
 * An optional locale for the formatter. If no locale is supplied, or if the locale is not supported, the
 * default locale is used.
 *
 * @return
 * The message formatter.
 */
function getIcuMessageFormatter(id, key, locale) {
    locale = Object(__WEBPACK_IMPORTED_MODULE_9__util_main__["b" /* normalizeLocale */])(locale || getRootLocale());
    const formatterKey = `${locale}:${id}:${key}`;
    let formatter = formatterMap.get(formatterKey);
    if (formatter) {
        return formatter;
    }
    const globalize = locale !== getRootLocale() ? new __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__(Object(__WEBPACK_IMPORTED_MODULE_9__util_main__["b" /* normalizeLocale */])(locale)) : __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__;
    formatter = globalize.messageFormatter(`${id}/${key}`);
    const cached = bundleMap.get(id);
    if (cached && cached.get(locale)) {
        formatterMap.set(formatterKey, formatter);
    }
    return formatter;
}
/**
 * @private
 * Load the specified locale-specific bundles, mapping the default exports to simple `Messages` objects.
 */
function loadLocaleBundles(locales, supported) {
    return Promise.all(supported.map((locale) => locales[locale]())).then((bundles) => {
        return bundles.map((bundle) => Object(__WEBPACK_IMPORTED_MODULE_6__core_load_util__["a" /* useDefault */])(bundle));
    });
}
/**
 * @private
 * Return the root locale. Defaults to the system locale.
 */
function getRootLocale() {
    return rootLocale || systemLocale;
}
/**
 * @private
 * Retrieve a list of supported locales that can provide messages for the specified locale.
 *
 * @param locale
 * The target locale.
 *
 * @param supported
 * The locales that are supported by the bundle.
 *
 * @return
 * A list of supported locales that match the target locale.
 */
function getSupportedLocales(locale, supported = []) {
    return Object(__WEBPACK_IMPORTED_MODULE_9__util_main__["a" /* generateLocales */])(locale).filter((locale) => supported.indexOf(locale) > -1);
}
/**
 * @private
 * Inject messages for the specified locale into the i18n system.
 *
 * @param id
 * The bundle's unique identifier
 *
 * @param messages
 * The messages to inject
 *
 * @param locale
 * An optional locale. If not specified, then it is assumed that the messages are the defaults for the given
 * bundle path.
 */
function loadMessages(id, messages, locale = 'root') {
    let cached = bundleMap.get(id);
    if (!cached) {
        cached = new __WEBPACK_IMPORTED_MODULE_2__shim_Map__["b" /* default */]();
        bundleMap.set(id, cached);
    }
    cached.set(locale, messages);
    __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__["loadMessages"]({
        [locale]: {
            [id]: messages
        }
    });
}
/**
 * Return a formatted message.
 *
 * If both the "supplemental/likelySubtags" and "supplemental/plurals-type-cardinal" CLDR data have been loaded, then
 * the ICU message format is supported. Otherwise, a simple token-replacement mechanism is used.
 *
 * Usage:
 * formatMessage(bundle, 'guestInfo', {
 *   host: 'Bill',
 *   guest: 'John'
 * }, 'fr');
 *
 * @param bundle
 * The bundle containing the target message.
 *
 * @param key
 * The message's key.
 *
 * @param options
 * An optional value used by the formatter to replace tokens with values.
 *
 * @param locale
 * An optional locale for the formatter. If no locale is supplied, or if the locale is not supported, the
 * default locale is used.
 *
 * @return
 * The formatted message.
 */
function formatMessage(bundle, key, options, locale) {
    return getMessageFormatter(bundle, key, locale)(options);
}
/**
 * Return the cached messages for the specified bundle and locale. If messages have not been previously loaded for the
 * specified locale, no value will be returned.
 *
 * @param bundle
 * The default bundle that is used to determine where the locale-specific bundles are located.
 *
 * @param locale
 * The locale of the desired messages.
 *
 * @return The cached messages object, if it exists.
 */
function getCachedMessages(bundle, locale) {
    const { id = getBundleId(bundle), locales, messages } = bundle;
    const cached = bundleMap.get(id);
    if (!cached) {
        loadMessages(id, messages);
    }
    else {
        const localeMessages = cached.get(locale);
        if (localeMessages) {
            return localeMessages;
        }
    }
    const supportedLocales = getSupportedLocales(locale, locales && Object.keys(locales));
    if (!supportedLocales.length) {
        return messages;
    }
    if (cached) {
        return cached.get(supportedLocales[supportedLocales.length - 1]);
    }
}
/**
 * Return a function that formats a specific message, and takes an optional value for token replacement.
 *
 * If both the "supplemental/likelySubtags" and "supplemental/plurals-type-cardinal" CLDR data have been loaded, then
 * the returned function will have ICU message format support. Otherwise, the returned function will perform a simple
 * token replacement on the message string.
 *
 * Usage:
 * const formatter = getMessageFormatter(bundle, 'guestInfo', 'fr');
 * const message = formatter({
 *   host: 'Miles',
 *   gender: 'male',
 *   guest: 'Oscar',
 *   guestCount: '15'
 * });
 *
 * @param bundle
 * The bundle containing the target message.
 *
 * @param key
 * The message's key.
 *
 * @param locale
 * An optional locale for the formatter. If no locale is supplied, or if the locale is not supported, the
 * default locale is used.
 *
 * @return
 * The message formatter.
 */
function getMessageFormatter(bundle, key, locale) {
    const { id = getBundleId(bundle) } = bundle;
    if (Object(__WEBPACK_IMPORTED_MODULE_8__cldr_load__["isLoaded"])('supplemental', 'likelySubtags') && Object(__WEBPACK_IMPORTED_MODULE_8__cldr_load__["isLoaded"])('supplemental', 'plurals-type-cardinal')) {
        return getIcuMessageFormatter(id, key, locale);
    }
    const cached = bundleMap.get(id);
    const messages = cached ? cached.get(locale || getRootLocale()) || cached.get('root') : null;
    if (!messages) {
        throw new Error(`The bundle has not been registered.`);
    }
    return function (options = Object.create(null)) {
        return messages[key].replace(TOKEN_PATTERN, (token, property) => {
            const value = options[property];
            if (typeof value === 'undefined') {
                throw new Error(`Missing property ${property}`);
            }
            return value;
        });
    };
}
/**
 * Load locale-specific messages for the specified bundle and locale.
 *
 * @param bundle
 * The default bundle that is used to determine where the locale-specific bundles are located.
 *
 * @param locale
 * An optional locale. If no locale is provided, then the current locale is assumed.
 *
 * @return A promise to the locale-specific messages.
 */
function i18n(bundle, locale) {
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
        const currentLocale = locale ? Object(__WEBPACK_IMPORTED_MODULE_9__util_main__["b" /* normalizeLocale */])(locale) : getRootLocale();
        const cachedMessages = getCachedMessages(bundle, currentLocale);
        if (cachedMessages) {
            return cachedMessages;
        }
        const locales = bundle.locales;
        const supportedLocales = getSupportedLocales(currentLocale, Object.keys(locales));
        const bundles = yield loadLocaleBundles(locales, supportedLocales);
        return bundles.reduce((previous, partial) => {
            const localeMessages = Object.assign({}, previous, partial);
            loadMessages(getBundleId(bundle), Object.freeze(localeMessages), currentLocale);
            return localeMessages;
        }, bundle.messages);
    });
}
Object.defineProperty(i18n, 'locale', {
    get: getRootLocale
});
/* harmony default export */ __webpack_exports__["default"] = (i18n);
/**
 * Invalidate the cache for a particular bundle, or invalidate the entire cache. Note that cached messages for all
 * locales for a given bundle will be cleared.
 *
 * @param bundle
 * An optional bundle to invalidate. If no bundle is provided, then the cache is cleared for all bundles.
 */
function invalidate(bundle) {
    if (bundle) {
        bundle.id && bundleMap.delete(bundle.id);
    }
    else {
        bundleMap.clear();
    }
}
/**
 * Register an observer to be notified when the root locale changes.
 *
 * @param callback
 * A callback function which will receive the updated locale string on updates.
 *
 * @return
 * A handle object that can be used to unsubscribe from updates.
 */
const observeLocale = function (callback) {
    return localeProducer.on('change', (event) => {
        callback(event.target);
    });
};
/* harmony export (immutable) */ __webpack_exports__["observeLocale"] = observeLocale;

/**
 * Pre-load locale-specific messages into the i18n system.
 *
 * @param bundle
 * The default bundle that is used to merge locale-specific messages with the default messages.
 *
 * @param messages
 * The messages to cache.
 *
 * @param locale
 * The locale for the messages
 */
function setLocaleMessages(bundle, localeMessages, locale) {
    const messages = Object.assign({}, bundle.messages, localeMessages);
    loadMessages(getBundleId(bundle), Object.freeze(messages), locale);
}
/**
 * Change the root locale, and notify any registered observers.
 *
 * @param locale
 * The new locale.
 */
function switchLocale(locale) {
    const previous = rootLocale;
    rootLocale = locale ? Object(__WEBPACK_IMPORTED_MODULE_9__util_main__["b" /* normalizeLocale */])(locale) : '';
    if (previous !== rootLocale) {
        if (Object(__WEBPACK_IMPORTED_MODULE_8__cldr_load__["isLoaded"])('supplemental', 'likelySubtags')) {
            __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__["load"]({
                main: {
                    [rootLocale]: {}
                }
            });
            __WEBPACK_IMPORTED_MODULE_7_globalize_dist_globalize_message__["locale"](rootLocale);
        }
        localeProducer.emit({ type: 'change', target: rootLocale });
    }
}
/**
 * The default environment locale.
 *
 * It should be noted that while the system locale will be normalized to a single
 * format when loading message bundles, this value represents the unaltered
 * locale returned directly by the environment.
 */
const systemLocale = (function () {
    let systemLocale = 'en';
    if (true) {
        const navigator = __WEBPACK_IMPORTED_MODULE_1__shim_global__["a" /* default */].navigator;
        systemLocale = navigator.language || navigator.userLanguage;
    }
    else if (false) {
        systemLocale = process.env.LANG || systemLocale;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_9__util_main__["b" /* normalizeLocale */])(systemLocale);
})();
/* harmony export (immutable) */ __webpack_exports__["systemLocale"] = systemLocale;



/***/ }),

/***/ "./node_modules/@dojo/framework/i18n/util/main.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateLocales;
/* harmony export (immutable) */ __webpack_exports__["c"] = validateLocale;
// Matches an ISO 639.1/639.2 compatible language, followed by optional subtags.
const VALID_LOCALE_PATTERN = /^[a-z]{2,3}(-[a-z0-9\-\_]+)?$/i;
/**
 * Retrieve a list of locales that can provide substitute for the specified locale
 * (including itself).
 *
 * For example, if 'fr-CA' is specified, then `[ 'fr', 'fr-CA' ]` is returned.
 *
 * @param locale
 * The target locale.
 *
 * @return
 * A list of locales that match the target locale.
 */
function generateLocales(locale) {
    const normalized = normalizeLocale(locale);
    const parts = normalized.split('-');
    let current = parts[0];
    const result = [current];
    for (let i = 0; i < parts.length - 1; i += 1) {
        current += '-' + parts[i + 1];
        result.push(current);
    }
    return result;
}
/**
 * Normalize a locale so that it can be converted to a bundle path.
 *
 * @param locale
 * The target locale.
 *
 * @return The normalized locale.
 */
const normalizeLocale = (function () {
    function removeTrailingSeparator(value) {
        return value.replace(/(\-|_)$/, '');
    }
    function normalize(locale) {
        if (locale.indexOf('.') === -1) {
            return removeTrailingSeparator(locale);
        }
        return locale
            .split('.')
            .slice(0, -1)
            .map((part) => {
            return removeTrailingSeparator(part).replace(/_/g, '-');
        })
            .join('-');
    }
    return function (locale) {
        const normalized = normalize(locale);
        if (!validateLocale(normalized)) {
            throw new Error(`${normalized} is not a valid locale.`);
        }
        return normalized;
    };
})();
/* harmony export (immutable) */ __webpack_exports__["b"] = normalizeLocale;

/**
 * Validates that the provided locale at least begins with a ISO 639.1/639.2 comptabile language subtag,
 * and that any additional subtags contain only valid characters.
 *
 * While locales should adhere to the guidelines set forth by RFC 5646 (https://tools.ietf.org/html/rfc5646),
 * only the language subtag is strictly enforced.
 *
 * @param locale
 * The locale to validate.
 *
 * @return
 * `true` if the locale is valid; `false` otherwise.
 */
function validateLocale(locale) {
    return VALID_LOCALE_PATTERN.test(locale);
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Map.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__object__ = __webpack_require__("./node_modules/@dojo/framework/shim/object.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");





let Map = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Map;
if (false) {
    Map = (_a = class Map {
            constructor(iterable) {
                this._keys = [];
                this._values = [];
                this[Symbol.toStringTag] = 'Map';
                if (iterable) {
                    if (isArrayLike(iterable)) {
                        for (let i = 0; i < iterable.length; i++) {
                            const value = iterable[i];
                            this.set(value[0], value[1]);
                        }
                    }
                    else {
                        for (const value of iterable) {
                            this.set(value[0], value[1]);
                        }
                    }
                }
            }
            /**
             * An alternative to Array.prototype.indexOf using Object.is
             * to check for equality. See http://mzl.la/1zuKO2V
             */
            _indexOfKey(keys, key) {
                for (let i = 0, length = keys.length; i < length; i++) {
                    if (objectIs(keys[i], key)) {
                        return i;
                    }
                }
                return -1;
            }
            get size() {
                return this._keys.length;
            }
            clear() {
                this._keys.length = this._values.length = 0;
            }
            delete(key) {
                const index = this._indexOfKey(this._keys, key);
                if (index < 0) {
                    return false;
                }
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            }
            entries() {
                const values = this._keys.map((key, i) => {
                    return [key, this._values[i]];
                });
                return new ShimIterator(values);
            }
            forEach(callback, context) {
                const keys = this._keys;
                const values = this._values;
                for (let i = 0, length = keys.length; i < length; i++) {
                    callback.call(context, values[i], keys[i], this);
                }
            }
            get(key) {
                const index = this._indexOfKey(this._keys, key);
                return index < 0 ? undefined : this._values[index];
            }
            has(key) {
                return this._indexOfKey(this._keys, key) > -1;
            }
            keys() {
                return new ShimIterator(this._keys);
            }
            set(key, value) {
                let index = this._indexOfKey(this._keys, key);
                index = index < 0 ? this._keys.length : index;
                this._keys[index] = key;
                this._values[index] = value;
                return this;
            }
            values() {
                return new ShimIterator(this._values);
            }
            [Symbol.iterator]() {
                return this.entries();
            }
        },
        _a[Symbol.species] = _a,
        _a);
}
/* harmony default export */ __webpack_exports__["b"] = (Map);
var _a;


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Promise.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ShimPromise */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__support_queue__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/queue.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");




let ShimPromise = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Promise;
const isThenable = function isThenable(value) {
    return value && typeof value.then === 'function';
};
/* unused harmony export isThenable */

if (false) {
    global.Promise = ShimPromise = (_a = class Promise {
            /**
             * Creates a new Promise.
             *
             * @constructor
             *
             * @param executor
             * The executor function is called immediately when the Promise is instantiated. It is responsible for
             * starting the asynchronous operation when it is invoked.
             *
             * The executor must call either the passed `resolve` function when the asynchronous operation has completed
             * successfully, or the `reject` function when the operation fails.
             */
            constructor(executor) {
                /**
                 * The current state of this promise.
                 */
                this.state = 1 /* Pending */;
                this[Symbol.toStringTag] = 'Promise';
                /**
                 * If true, the resolution of this promise is chained ("locked in") to another promise.
                 */
                let isChained = false;
                /**
                 * Whether or not this promise is in a resolved state.
                 */
                const isResolved = () => {
                    return this.state !== 1 /* Pending */ || isChained;
                };
                /**
                 * Callbacks that should be invoked once the asynchronous operation has completed.
                 */
                let callbacks = [];
                /**
                 * Initially pushes callbacks onto a queue for execution once this promise settles. After the promise settles,
                 * enqueues callbacks for execution on the next event loop turn.
                 */
                let whenFinished = function (callback) {
                    if (callbacks) {
                        callbacks.push(callback);
                    }
                };
                /**
                 * Settles this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                const settle = (newState, value) => {
                    // A promise can only be settled once.
                    if (this.state !== 1 /* Pending */) {
                        return;
                    }
                    this.state = newState;
                    this.resolvedValue = value;
                    whenFinished = queueMicroTask;
                    // Only enqueue a callback runner if there are callbacks so that initially fulfilled Promises don't have to
                    // wait an extra turn.
                    if (callbacks && callbacks.length > 0) {
                        queueMicroTask(function () {
                            if (callbacks) {
                                let count = callbacks.length;
                                for (let i = 0; i < count; ++i) {
                                    callbacks[i].call(null);
                                }
                                callbacks = null;
                            }
                        });
                    }
                };
                /**
                 * Resolves this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                const resolve = (newState, value) => {
                    if (isResolved()) {
                        return;
                    }
                    if (isThenable(value)) {
                        value.then(settle.bind(null, 0 /* Fulfilled */), settle.bind(null, 2 /* Rejected */));
                        isChained = true;
                    }
                    else {
                        settle(newState, value);
                    }
                };
                this.then = (onFulfilled, onRejected) => {
                    return new Promise((resolve, reject) => {
                        // whenFinished initially queues up callbacks for execution after the promise has settled. Once the
                        // promise has settled, whenFinished will schedule callbacks for execution on the next turn through the
                        // event loop.
                        whenFinished(() => {
                            const callback = this.state === 2 /* Rejected */ ? onRejected : onFulfilled;
                            if (typeof callback === 'function') {
                                try {
                                    resolve(callback(this.resolvedValue));
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }
                            else if (this.state === 2 /* Rejected */) {
                                reject(this.resolvedValue);
                            }
                            else {
                                resolve(this.resolvedValue);
                            }
                        });
                    });
                };
                try {
                    executor(resolve.bind(null, 0 /* Fulfilled */), resolve.bind(null, 2 /* Rejected */));
                }
                catch (error) {
                    settle(2 /* Rejected */, error);
                }
            }
            static all(iterable) {
                return new this(function (resolve, reject) {
                    const values = [];
                    let complete = 0;
                    let total = 0;
                    let populating = true;
                    function fulfill(index, value) {
                        values[index] = value;
                        ++complete;
                        finish();
                    }
                    function finish() {
                        if (populating || complete < total) {
                            return;
                        }
                        resolve(values);
                    }
                    function processItem(index, item) {
                        ++total;
                        if (isThenable(item)) {
                            // If an item Promise rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(fulfill.bind(null, index), reject);
                        }
                        else {
                            Promise.resolve(item).then(fulfill.bind(null, index));
                        }
                    }
                    let i = 0;
                    for (const value of iterable) {
                        processItem(i, value);
                        i++;
                    }
                    populating = false;
                    finish();
                });
            }
            static race(iterable) {
                return new this(function (resolve, reject) {
                    for (const item of iterable) {
                        if (item instanceof Promise) {
                            // If a Promise item rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(resolve, reject);
                        }
                        else {
                            Promise.resolve(item).then(resolve);
                        }
                    }
                });
            }
            static reject(reason) {
                return new this(function (resolve, reject) {
                    reject(reason);
                });
            }
            static resolve(value) {
                return new this(function (resolve) {
                    resolve(value);
                });
            }
            catch(onRejected) {
                return this.then(undefined, onRejected);
            }
        },
        _a[Symbol.species] = ShimPromise,
        _a);
}
/* harmony default export */ __webpack_exports__["a"] = (ShimPromise);
var _a;


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Set.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Set */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");




let Set = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Set;
if (false) {
    Set = (_a = class Set {
            constructor(iterable) {
                this._setData = [];
                this[Symbol.toStringTag] = 'Set';
                if (iterable) {
                    if (isArrayLike(iterable)) {
                        for (let i = 0; i < iterable.length; i++) {
                            this.add(iterable[i]);
                        }
                    }
                    else {
                        for (const value of iterable) {
                            this.add(value);
                        }
                    }
                }
            }
            add(value) {
                if (this.has(value)) {
                    return this;
                }
                this._setData.push(value);
                return this;
            }
            clear() {
                this._setData.length = 0;
            }
            delete(value) {
                const idx = this._setData.indexOf(value);
                if (idx === -1) {
                    return false;
                }
                this._setData.splice(idx, 1);
                return true;
            }
            entries() {
                return new ShimIterator(this._setData.map((value) => [value, value]));
            }
            forEach(callbackfn, thisArg) {
                const iterator = this.values();
                let result = iterator.next();
                while (!result.done) {
                    callbackfn.call(thisArg, result.value, result.value, this);
                    result = iterator.next();
                }
            }
            has(value) {
                return this._setData.indexOf(value) > -1;
            }
            keys() {
                return new ShimIterator(this._setData);
            }
            get size() {
                return this._setData.length;
            }
            values() {
                return new ShimIterator(this._setData);
            }
            [Symbol.iterator]() {
                return new ShimIterator(this._setData);
            }
        },
        _a[Symbol.species] = _a,
        _a);
}
/* harmony default export */ __webpack_exports__["a"] = (Set);
var _a;


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Symbol.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Symbol */
/* unused harmony export isSymbol */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_util__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/util.mjs");



let Symbol = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Symbol;
if (false) {
    /**
     * Throws if the value is not a symbol, used internally within the Shim
     * @param  {any}    value The value to check
     * @return {symbol}       Returns the symbol or throws
     */
    const validateSymbol = function validateSymbol(value) {
        if (!isSymbol(value)) {
            throw new TypeError(value + ' is not a symbol');
        }
        return value;
    };
    const defineProperties = Object.defineProperties;
    const defineProperty = Object.defineProperty;
    const create = Object.create;
    const objPrototype = Object.prototype;
    const globalSymbols = {};
    const getSymbolName = (function () {
        const created = create(null);
        return function (desc) {
            let postfix = 0;
            let name;
            while (created[String(desc) + (postfix || '')]) {
                ++postfix;
            }
            desc += String(postfix || '');
            created[desc] = true;
            name = '@@' + desc;
            // FIXME: Temporary guard until the duplicate execution when testing can be
            // pinned down.
            if (!Object.getOwnPropertyDescriptor(objPrototype, name)) {
                defineProperty(objPrototype, name, {
                    set: function (value) {
                        defineProperty(this, name, getValueDescriptor(value));
                    }
                });
            }
            return name;
        };
    })();
    const InternalSymbol = function Symbol(description) {
        if (this instanceof InternalSymbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        return Symbol(description);
    };
    Symbol = global.Symbol = function Symbol(description) {
        if (this instanceof Symbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        const sym = Object.create(InternalSymbol.prototype);
        description = description === undefined ? '' : String(description);
        return defineProperties(sym, {
            __description__: getValueDescriptor(description),
            __name__: getValueDescriptor(getSymbolName(description))
        });
    };
    /* Decorate the Symbol function with the appropriate properties */
    defineProperty(Symbol, 'for', getValueDescriptor(function (key) {
        if (globalSymbols[key]) {
            return globalSymbols[key];
        }
        return (globalSymbols[key] = Symbol(String(key)));
    }));
    defineProperties(Symbol, {
        keyFor: getValueDescriptor(function (sym) {
            let key;
            validateSymbol(sym);
            for (key in globalSymbols) {
                if (globalSymbols[key] === sym) {
                    return key;
                }
            }
        }),
        hasInstance: getValueDescriptor(Symbol.for('hasInstance'), false, false),
        isConcatSpreadable: getValueDescriptor(Symbol.for('isConcatSpreadable'), false, false),
        iterator: getValueDescriptor(Symbol.for('iterator'), false, false),
        match: getValueDescriptor(Symbol.for('match'), false, false),
        observable: getValueDescriptor(Symbol.for('observable'), false, false),
        replace: getValueDescriptor(Symbol.for('replace'), false, false),
        search: getValueDescriptor(Symbol.for('search'), false, false),
        species: getValueDescriptor(Symbol.for('species'), false, false),
        split: getValueDescriptor(Symbol.for('split'), false, false),
        toPrimitive: getValueDescriptor(Symbol.for('toPrimitive'), false, false),
        toStringTag: getValueDescriptor(Symbol.for('toStringTag'), false, false),
        unscopables: getValueDescriptor(Symbol.for('unscopables'), false, false)
    });
    /* Decorate the InternalSymbol object */
    defineProperties(InternalSymbol.prototype, {
        constructor: getValueDescriptor(Symbol),
        toString: getValueDescriptor(function () {
            return this.__name__;
        }, false, false)
    });
    /* Decorate the Symbol.prototype */
    defineProperties(Symbol.prototype, {
        toString: getValueDescriptor(function () {
            return 'Symbol (' + validateSymbol(this).__description__ + ')';
        }),
        valueOf: getValueDescriptor(function () {
            return validateSymbol(this);
        })
    });
    defineProperty(Symbol.prototype, Symbol.toPrimitive, getValueDescriptor(function () {
        return validateSymbol(this);
    }));
    defineProperty(Symbol.prototype, Symbol.toStringTag, getValueDescriptor('Symbol', false, false, true));
    defineProperty(InternalSymbol.prototype, Symbol.toPrimitive, getValueDescriptor(Symbol.prototype[Symbol.toPrimitive], false, false, true));
    defineProperty(InternalSymbol.prototype, Symbol.toStringTag, getValueDescriptor(Symbol.prototype[Symbol.toStringTag], false, false, true));
}
/**
 * A custom guard function that determines if an object is a symbol or not
 * @param  {any}       value The value to check to see if it is a symbol or not
 * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
 */
function isSymbol(value) {
    return (value && (typeof value === 'symbol' || value['@@toStringTag'] === 'Symbol')) || false;
}
/**
 * Fill any missing well known symbols if the native Symbol is missing them
 */
[
    'hasInstance',
    'isConcatSpreadable',
    'iterator',
    'species',
    'replace',
    'search',
    'split',
    'match',
    'toPrimitive',
    'toStringTag',
    'unscopables',
    'observable'
].forEach((wellKnown) => {
    if (!Symbol[wellKnown]) {
        Object.defineProperty(Symbol, wellKnown, Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["a" /* getValueDescriptor */])(Symbol.for(wellKnown), false, false));
    }
});
/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/WeakMap.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WeakMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");




let WeakMap = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].WeakMap;
if (false) {
    const DELETED = {};
    const getUID = function getUID() {
        return Math.floor(Math.random() * 100000000);
    };
    const generateName = (function () {
        let startId = Math.floor(Date.now() % 100000000);
        return function generateName() {
            return '__wm' + getUID() + (startId++ + '__');
        };
    })();
    WeakMap = class WeakMap {
        constructor(iterable) {
            this[Symbol.toStringTag] = 'WeakMap';
            this._name = generateName();
            this._frozenEntries = [];
            if (iterable) {
                if (isArrayLike(iterable)) {
                    for (let i = 0; i < iterable.length; i++) {
                        const item = iterable[i];
                        this.set(item[0], item[1]);
                    }
                }
                else {
                    for (const [key, value] of iterable) {
                        this.set(key, value);
                    }
                }
            }
        }
        _getFrozenEntryIndex(key) {
            for (let i = 0; i < this._frozenEntries.length; i++) {
                if (this._frozenEntries[i].key === key) {
                    return i;
                }
            }
            return -1;
        }
        delete(key) {
            if (key === undefined || key === null) {
                return false;
            }
            const entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED) {
                entry.value = DELETED;
                return true;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                this._frozenEntries.splice(frozenIndex, 1);
                return true;
            }
            return false;
        }
        get(key) {
            if (key === undefined || key === null) {
                return undefined;
            }
            const entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED) {
                return entry.value;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return this._frozenEntries[frozenIndex].value;
            }
        }
        has(key) {
            if (key === undefined || key === null) {
                return false;
            }
            const entry = key[this._name];
            if (Boolean(entry && entry.key === key && entry.value !== DELETED)) {
                return true;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return true;
            }
            return false;
        }
        set(key, value) {
            if (!key || (typeof key !== 'object' && typeof key !== 'function')) {
                throw new TypeError('Invalid value used as weak map key');
            }
            let entry = key[this._name];
            if (!entry || entry.key !== key) {
                entry = Object.create(null, {
                    key: { value: key }
                });
                if (Object.isFrozen(key)) {
                    this._frozenEntries.push(entry);
                }
                else {
                    Object.defineProperty(key, this._name, {
                        value: entry
                    });
                }
            }
            entry.value = value;
            return this;
        }
    };
}
/* harmony default export */ __webpack_exports__["a"] = (WeakMap);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/array.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return from; });
/* unused harmony export of */
/* unused harmony export copyWithin */
/* unused harmony export fill */
/* unused harmony export find */
/* unused harmony export findIndex */
/* unused harmony export includes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number__ = __webpack_require__("./node_modules/@dojo/framework/shim/number.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__support_util__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/util.mjs");





let from;
/**
 * Creates a new array from the function parameters.
 *
 * @param arguments Any number of arguments for the array
 * @return An array from the given arguments
 */
let of;
/* ES6 Array instance methods */
/**
 * Copies data internally within an array or array-like object.
 *
 * @param target The target array-like object
 * @param offset The index to start copying values to; if negative, it counts backwards from length
 * @param start The first (inclusive) index to copy; if negative, it counts backwards from length
 * @param end The last (exclusive) index to copy; if negative, it counts backwards from length
 * @return The target
 */
let copyWithin;
/**
 * Fills elements of an array-like object with the specified value.
 *
 * @param target The target to fill
 * @param value The value to fill each element of the target with
 * @param start The first index to fill
 * @param end The (exclusive) index at which to stop filling
 * @return The filled target
 */
let fill;
/**
 * Finds and returns the first instance matching the callback or undefined if one is not found.
 *
 * @param target An array-like object
 * @param callback A function returning if the current value matches a criteria
 * @param thisArg The execution context for the find function
 * @return The first element matching the callback, or undefined if one does not exist
 */
let find;
/**
 * Performs a linear search and returns the first index whose value satisfies the passed callback,
 * or -1 if no values satisfy it.
 *
 * @param target An array-like object
 * @param callback A function returning true if the current value satisfies its criteria
 * @param thisArg The execution context for the find function
 * @return The first index whose value satisfies the passed callback, or -1 if no values satisfy it
 */
let findIndex;
/* ES7 Array instance methods */
/**
 * Determines whether an array includes a given value
 *
 * @param target the target array-like object
 * @param searchElement the item to search for
 * @param fromIndex the starting index to search from
 * @return `true` if the array includes the element, otherwise `false`
 */
let includes;
if (true) {
    from = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.from;
    of = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.of;
    copyWithin = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.copyWithin);
    fill = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.fill);
    find = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.find);
    findIndex = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.findIndex);
}
else {
    // It is only older versions of Safari/iOS that have a bad fill implementation and so aren't in the wild
    // To make things easier, if there is a bad fill implementation, the whole set of functions will be filled
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    const toLength = function toLength(length) {
        if (isNaN(length)) {
            return 0;
        }
        length = Number(length);
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), MAX_SAFE_INTEGER);
    };
    /**
     * From ES6 7.1.4 ToInteger()
     *
     * @param value A value to convert
     * @return An integer
     */
    const toInteger = function toInteger(value) {
        value = Number(value);
        if (isNaN(value)) {
            return 0;
        }
        if (value === 0 || !isFinite(value)) {
            return value;
        }
        return (value > 0 ? 1 : -1) * Math.floor(Math.abs(value));
    };
    /**
     * Normalizes an offset against a given length, wrapping it if negative.
     *
     * @param value The original offset
     * @param length The total length to normalize against
     * @return If negative, provide a distance from the end (length); otherwise provide a distance from 0
     */
    const normalizeOffset = function normalizeOffset(value, length) {
        return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
    };
    from = function from(arrayLike, mapFunction, thisArg) {
        if (arrayLike == null) {
            throw new TypeError('from: requires an array-like object');
        }
        if (mapFunction && thisArg) {
            mapFunction = mapFunction.bind(thisArg);
        }
        /* tslint:disable-next-line:variable-name */
        const Constructor = this;
        const length = toLength(arrayLike.length);
        // Support extension
        const array = typeof Constructor === 'function' ? Object(new Constructor(length)) : new Array(length);
        if (!isArrayLike(arrayLike) && !isIterable(arrayLike)) {
            return array;
        }
        // if this is an array and the normalized length is 0, just return an empty array. this prevents a problem
        // with the iteration on IE when using a NaN array length.
        if (isArrayLike(arrayLike)) {
            if (length === 0) {
                return [];
            }
            for (let i = 0; i < arrayLike.length; i++) {
                array[i] = mapFunction ? mapFunction(arrayLike[i], i) : arrayLike[i];
            }
        }
        else {
            let i = 0;
            for (const value of arrayLike) {
                array[i] = mapFunction ? mapFunction(value, i) : value;
                i++;
            }
        }
        if (arrayLike.length !== undefined) {
            array.length = length;
        }
        return array;
    };
    of = function of(...items) {
        return Array.prototype.slice.call(items);
    };
    copyWithin = function copyWithin(target, offset, start, end) {
        if (target == null) {
            throw new TypeError('copyWithin: target must be an array-like object');
        }
        const length = toLength(target.length);
        offset = normalizeOffset(toInteger(offset), length);
        start = normalizeOffset(toInteger(start), length);
        end = normalizeOffset(end === undefined ? length : toInteger(end), length);
        let count = Math.min(end - start, length - offset);
        let direction = 1;
        if (offset > start && offset < start + count) {
            direction = -1;
            start += count - 1;
            offset += count - 1;
        }
        while (count > 0) {
            if (start in target) {
                target[offset] = target[start];
            }
            else {
                delete target[offset];
            }
            offset += direction;
            start += direction;
            count--;
        }
        return target;
    };
    fill = function fill(target, value, start, end) {
        const length = toLength(target.length);
        let i = normalizeOffset(toInteger(start), length);
        end = normalizeOffset(end === undefined ? length : toInteger(end), length);
        while (i < end) {
            target[i++] = value;
        }
        return target;
    };
    find = function find(target, callback, thisArg) {
        const index = findIndex(target, callback, thisArg);
        return index !== -1 ? target[index] : undefined;
    };
    findIndex = function findIndex(target, callback, thisArg) {
        const length = toLength(target.length);
        if (!callback) {
            throw new TypeError('find: second argument must be a function');
        }
        if (thisArg) {
            callback = callback.bind(thisArg);
        }
        for (let i = 0; i < length; i++) {
            if (callback(target[i], i, target)) {
                return i;
            }
        }
        return -1;
    };
}
if (true) {
    includes = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.includes);
}
else {
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    const toLength = function toLength(length) {
        length = Number(length);
        if (isNaN(length)) {
            return 0;
        }
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), MAX_SAFE_INTEGER);
    };
    includes = function includes(target, searchElement, fromIndex = 0) {
        let len = toLength(target.length);
        for (let i = fromIndex; i < len; ++i) {
            const currentElement = target[i];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
        }
        return false;
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/global.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {const globalObject = (function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
})();
/* harmony default export */ __webpack_exports__["a"] = (globalObject);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@dojo/framework/shim/iterator.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isIterable;
/* harmony export (immutable) */ __webpack_exports__["a"] = isArrayLike;
/* unused harmony export get */
/* unused harmony export forOf */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__string__ = __webpack_require__("./node_modules/@dojo/framework/shim/string.mjs");


const staticDone = { done: true, value: undefined };
/**
 * A class that _shims_ an iterator interface on array like objects.
 */
class ShimIterator {
    constructor(list) {
        this._nextIndex = -1;
        if (isIterable(list)) {
            this._nativeIterator = list[Symbol.iterator]();
        }
        else {
            this._list = list;
        }
    }
    /**
     * Return the next iteration result for the Iterator
     */
    next() {
        if (this._nativeIterator) {
            return this._nativeIterator.next();
        }
        if (!this._list) {
            return staticDone;
        }
        if (++this._nextIndex < this._list.length) {
            return {
                done: false,
                value: this._list[this._nextIndex]
            };
        }
        return staticDone;
    }
    [Symbol.iterator]() {
        return this;
    }
}
/* unused harmony export ShimIterator */

/**
 * A type guard for checking if something has an Iterable interface
 *
 * @param value The value to type guard against
 */
function isIterable(value) {
    return value && typeof value[Symbol.iterator] === 'function';
}
/**
 * A type guard for checking if something is ArrayLike
 *
 * @param value The value to type guard against
 */
function isArrayLike(value) {
    return value && typeof value.length === 'number';
}
/**
 * Returns the iterator for an object
 *
 * @param iterable The iterable object to return the iterator for
 */
function get(iterable) {
    if (isIterable(iterable)) {
        return iterable[Symbol.iterator]();
    }
    else if (isArrayLike(iterable)) {
        return new ShimIterator(iterable);
    }
}
/**
 * Shims the functionality of `for ... of` blocks
 *
 * @param iterable The object the provides an interator interface
 * @param callback The callback which will be called for each item of the iterable
 * @param thisArg Optional scope to pass the callback
 */
function forOf(iterable, callback, thisArg) {
    let broken = false;
    function doBreak() {
        broken = true;
    }
    /* We need to handle iteration of double byte strings properly */
    if (isArrayLike(iterable) && typeof iterable === 'string') {
        const l = iterable.length;
        for (let i = 0; i < l; ++i) {
            let char = iterable[i];
            if (i + 1 < l) {
                const code = char.charCodeAt(0);
                if (code >= __WEBPACK_IMPORTED_MODULE_1__string__["b" /* HIGH_SURROGATE_MIN */] && code <= __WEBPACK_IMPORTED_MODULE_1__string__["a" /* HIGH_SURROGATE_MAX */]) {
                    char += iterable[++i];
                }
            }
            callback.call(thisArg, char, iterable, doBreak);
            if (broken) {
                return;
            }
        }
    }
    else {
        const iterator = get(iterable);
        if (iterator) {
            let result = iterator.next();
            while (!result.done) {
                callback.call(thisArg, result.value, iterable, doBreak);
                if (broken) {
                    return;
                }
                result = iterator.next();
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/number.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isNaN */
/* unused harmony export isFinite */
/* unused harmony export isInteger */
/* unused harmony export isSafeInteger */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");

/**
 * The smallest interval between two representable numbers.
 */
const EPSILON = 1;
/* unused harmony export EPSILON */

/**
 * The maximum safe integer in JavaScript
 */
const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
/* unused harmony export MAX_SAFE_INTEGER */

/**
 * The minimum safe integer in JavaScript
 */
const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;
/* unused harmony export MIN_SAFE_INTEGER */

/**
 * Determines whether the passed value is NaN without coersion.
 *
 * @param value The value to test
 * @return true if the value is NaN, false if it is not
 */
function isNaN(value) {
    return typeof value === 'number' && __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].isNaN(value);
}
/**
 * Determines whether the passed value is a finite number without coersion.
 *
 * @param value The value to test
 * @return true if the value is finite, false if it is not
 */
function isFinite(value) {
    return typeof value === 'number' && __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].isFinite(value);
}
/**
 * Determines whether the passed value is an integer.
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value;
}
/**
 * Determines whether the passed value is an integer that is 'safe,' meaning:
 *   1. it can be expressed as an IEEE-754 double precision number
 *   2. it has a one-to-one mapping to a mathematical integer, meaning its
 *      IEEE-754 representation cannot be the result of rounding any other
 *      integer to fit the IEEE-754 representation
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isSafeInteger(value) {
    return isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/object.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assign; });
/* unused harmony export getOwnPropertyDescriptor */
/* unused harmony export getOwnPropertyNames */
/* unused harmony export getOwnPropertySymbols */
/* unused harmony export is */
/* unused harmony export keys */
/* unused harmony export getOwnPropertyDescriptors */
/* unused harmony export entries */
/* unused harmony export values */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");



let assign;
/**
 * Gets the own property descriptor of the specified object.
 * An own property descriptor is one that is defined directly on the object and is not
 * inherited from the object's prototype.
 * @param o Object that contains the property.
 * @param p Name of the property.
 */
let getOwnPropertyDescriptor;
/**
 * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
 * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
 * @param o Object that contains the own properties.
 */
let getOwnPropertyNames;
/**
 * Returns an array of all symbol properties found directly on object o.
 * @param o Object to retrieve the symbols from.
 */
let getOwnPropertySymbols;
/**
 * Returns true if the values are the same value, false otherwise.
 * @param value1 The first value.
 * @param value2 The second value.
 */
let is;
/**
 * Returns the names of the enumerable properties and methods of an object.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
let keys;
/* ES7 Object static methods */
let getOwnPropertyDescriptors;
let entries;
let values;
if (true) {
    const globalObject = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Object;
    assign = globalObject.assign;
    getOwnPropertyDescriptor = globalObject.getOwnPropertyDescriptor;
    getOwnPropertyNames = globalObject.getOwnPropertyNames;
    getOwnPropertySymbols = globalObject.getOwnPropertySymbols;
    is = globalObject.is;
    keys = globalObject.keys;
}
else {
    keys = function symbolAwareKeys(o) {
        return Object.keys(o).filter((key) => !Boolean(key.match(/^@@.+/)));
    };
    assign = function assign(target, ...sources) {
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        sources.forEach((nextSource) => {
            if (nextSource) {
                // Skip over if undefined or null
                keys(nextSource).forEach((nextKey) => {
                    to[nextKey] = nextSource[nextKey];
                });
            }
        });
        return to;
    };
    getOwnPropertyDescriptor = function getOwnPropertyDescriptor(o, prop) {
        if (isSymbol(prop)) {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
        else {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
    };
    getOwnPropertyNames = function getOwnPropertyNames(o) {
        return Object.getOwnPropertyNames(o).filter((key) => !Boolean(key.match(/^@@.+/)));
    };
    getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return Object.getOwnPropertyNames(o)
            .filter((key) => Boolean(key.match(/^@@.+/)))
            .map((key) => Symbol.for(key.substring(2)));
    };
    is = function is(value1, value2) {
        if (value1 === value2) {
            return value1 !== 0 || 1 / value1 === 1 / value2; // -0
        }
        return value1 !== value1 && value2 !== value2; // NaN
    };
}
if (true) {
    const globalObject = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Object;
    getOwnPropertyDescriptors = globalObject.getOwnPropertyDescriptors;
    entries = globalObject.entries;
    values = globalObject.values;
}
else {
    getOwnPropertyDescriptors = function getOwnPropertyDescriptors(o) {
        return getOwnPropertyNames(o).reduce((previous, key) => {
            previous[key] = getOwnPropertyDescriptor(o, key);
            return previous;
        }, {});
    };
    entries = function entries(o) {
        return keys(o).map((key) => [key, o[key]]);
    };
    values = function values(o) {
        return keys(o).map((key) => o[key]);
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/string.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fromCodePoint */
/* unused harmony export raw */
/* unused harmony export codePointAt */
/* unused harmony export endsWith */
/* unused harmony export includes */
/* unused harmony export normalize */
/* unused harmony export repeat */
/* unused harmony export startsWith */
/* unused harmony export padEnd */
/* unused harmony export padStart */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_util__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/util.mjs");



/**
 * The minimum location of high surrogates
 */
const HIGH_SURROGATE_MIN = 0xd800;
/* harmony export (immutable) */ __webpack_exports__["b"] = HIGH_SURROGATE_MIN;

/**
 * The maximum location of high surrogates
 */
const HIGH_SURROGATE_MAX = 0xdbff;
/* harmony export (immutable) */ __webpack_exports__["a"] = HIGH_SURROGATE_MAX;

/**
 * The minimum location of low surrogates
 */
const LOW_SURROGATE_MIN = 0xdc00;
/* unused harmony export LOW_SURROGATE_MIN */

/**
 * The maximum location of low surrogates
 */
const LOW_SURROGATE_MAX = 0xdfff;
/* unused harmony export LOW_SURROGATE_MAX */

/* ES6 static methods */
/**
 * Return the String value whose elements are, in order, the elements in the List elements.
 * If length is 0, the empty string is returned.
 * @param codePoints The code points to generate the string
 */
let fromCodePoint;
/**
 * `raw` is intended for use as a tag function of a Tagged Template String. When called
 * as such the first argument will be a well formed template call site object and the rest
 * parameter will contain the substitution values.
 * @param template A well-formed template string call site representation.
 * @param substitutions A set of substitution values.
 */
let raw;
/* ES6 instance methods */
/**
 * Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
 * value of the UTF-16 encoded code point starting at the string element at position pos in
 * the String resulting from converting this object to a String.
 * If there is no element at that position, the result is undefined.
 * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
 */
let codePointAt;
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * endPosition – length(this). Otherwise returns false.
 */
let endsWith;
/**
 * Returns true if searchString appears as a substring of the result of converting this
 * object to a String, at one or more positions that are
 * greater than or equal to position; otherwise, returns false.
 * @param target The target string
 * @param searchString search string
 * @param position If position is undefined, 0 is assumed, so as to search all of the String.
 */
let includes;
/**
 * Returns the String value result of normalizing the string into the normalization form
 * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
 * @param target The target string
 * @param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
 * is "NFC"
 */
let normalize;
/**
 * Returns a String value that is made from count copies appended together. If count is 0,
 * T is the empty String is returned.
 * @param count number of copies to append
 */
let repeat;
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 */
let startsWith;
/* ES7 instance methods */
/**
 * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the end (right) of the current string.
 *
 * @param target The target string
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
let padEnd;
/**
 * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the start (left) of the current string.
 *
 * @param target The target string
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
let padStart;
if (true) {
    fromCodePoint = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.fromCodePoint;
    raw = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.raw;
    codePointAt = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.codePointAt);
    endsWith = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.endsWith);
    includes = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.includes);
    normalize = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.normalize);
    repeat = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.repeat);
    startsWith = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.startsWith);
}
else {
    /**
     * Validates that text is defined, and normalizes position (based on the given default if the input is NaN).
     * Used by startsWith, includes, and endsWith.
     *
     * @return Normalized position.
     */
    const normalizeSubstringArgs = function (name, text, search, position, isEnd = false) {
        if (text == null) {
            throw new TypeError('string.' + name + ' requires a valid string to search against.');
        }
        const length = text.length;
        position = position !== position ? (isEnd ? length : 0) : position;
        return [text, String(search), Math.min(Math.max(position, 0), length)];
    };
    fromCodePoint = function fromCodePoint(...codePoints) {
        // Adapted from https://github.com/mathiasbynens/String.fromCodePoint
        const length = arguments.length;
        if (!length) {
            return '';
        }
        const fromCharCode = String.fromCharCode;
        const MAX_SIZE = 0x4000;
        let codeUnits = [];
        let index = -1;
        let result = '';
        while (++index < length) {
            let codePoint = Number(arguments[index]);
            // Code points must be finite integers within the valid range
            let isValid = isFinite(codePoint) && Math.floor(codePoint) === codePoint && codePoint >= 0 && codePoint <= 0x10ffff;
            if (!isValid) {
                throw RangeError('string.fromCodePoint: Invalid code point ' + codePoint);
            }
            if (codePoint <= 0xffff) {
                // BMP code point
                codeUnits.push(codePoint);
            }
            else {
                // Astral code point; split in surrogate halves
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                let highSurrogate = (codePoint >> 10) + HIGH_SURROGATE_MIN;
                let lowSurrogate = (codePoint % 0x400) + LOW_SURROGATE_MIN;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += fromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    raw = function raw(callSite, ...substitutions) {
        let rawStrings = callSite.raw;
        let result = '';
        let numSubstitutions = substitutions.length;
        if (callSite == null || callSite.raw == null) {
            throw new TypeError('string.raw requires a valid callSite object with a raw value');
        }
        for (let i = 0, length = rawStrings.length; i < length; i++) {
            result += rawStrings[i] + (i < numSubstitutions && i < length - 1 ? substitutions[i] : '');
        }
        return result;
    };
    codePointAt = function codePointAt(text, position = 0) {
        // Adapted from https://github.com/mathiasbynens/String.prototype.codePointAt
        if (text == null) {
            throw new TypeError('string.codePointAt requries a valid string.');
        }
        const length = text.length;
        if (position !== position) {
            position = 0;
        }
        if (position < 0 || position >= length) {
            return undefined;
        }
        // Get the first code unit
        const first = text.charCodeAt(position);
        if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > position + 1) {
            // Start of a surrogate pair (high surrogate and there is a next code unit); check for low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            const second = text.charCodeAt(position + 1);
            if (second >= LOW_SURROGATE_MIN && second <= LOW_SURROGATE_MAX) {
                return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
            }
        }
        return first;
    };
    endsWith = function endsWith(text, search, endPosition) {
        if (endPosition == null) {
            endPosition = text.length;
        }
        [text, search, endPosition] = normalizeSubstringArgs('endsWith', text, search, endPosition, true);
        const start = endPosition - search.length;
        if (start < 0) {
            return false;
        }
        return text.slice(start, endPosition) === search;
    };
    includes = function includes(text, search, position = 0) {
        [text, search, position] = normalizeSubstringArgs('includes', text, search, position);
        return text.indexOf(search, position) !== -1;
    };
    repeat = function repeat(text, count = 0) {
        // Adapted from https://github.com/mathiasbynens/String.prototype.repeat
        if (text == null) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (count !== count) {
            count = 0;
        }
        if (count < 0 || count === Infinity) {
            throw new RangeError('string.repeat requires a non-negative finite count.');
        }
        let result = '';
        while (count) {
            if (count % 2) {
                result += text;
            }
            if (count > 1) {
                text += text;
            }
            count >>= 1;
        }
        return result;
    };
    startsWith = function startsWith(text, search, position = 0) {
        search = String(search);
        [text, search, position] = normalizeSubstringArgs('startsWith', text, search, position);
        const end = position + search.length;
        if (end > text.length) {
            return false;
        }
        return text.slice(position, end) === search;
    };
}
if (true) {
    padEnd = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.padEnd);
    padStart = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.padStart);
}
else {
    padEnd = function padEnd(text, maxLength, fillString = ' ') {
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padEnd requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        let strText = String(text);
        const padding = maxLength - strText.length;
        if (padding > 0) {
            strText +=
                repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length);
        }
        return strText;
    };
    padStart = function padStart(text, maxLength, fillString = ' ') {
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padStart requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        let strText = String(text);
        const padding = maxLength - strText.length;
        if (padding > 0) {
            strText =
                repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length) +
                    strText;
        }
        return strText;
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/has.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__has_has__ = __webpack_require__("./node_modules/@dojo/framework/has/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["g"]; });


/* harmony default export */ __webpack_exports__["b"] = (__WEBPACK_IMPORTED_MODULE_0__has_has__["b" /* default */]);

/* ECMAScript 6 and 7 Features */
/* Array */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-array', () => {
    return (['from', 'of'].every((key) => key in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array) &&
        ['findIndex', 'find', 'copyWithin'].every((key) => key in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array.prototype));
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-array-fill', () => {
    if ('fill' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array.prototype) {
        /* Some versions of Safari do not properly implement this */
        return [1].fill(9, Number.POSITIVE_INFINITY)[0] === 1;
    }
    return false;
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es7-array', () => 'includes' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array.prototype, true);
/* Map */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-map', () => {
    if (typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Map === 'function') {
        /*
    IE11 and older versions of Safari are missing critical ES6 Map functionality
    We wrap this in a try/catch because sometimes the Map constructor exists, but does not
    take arguments (iOS 8.4)
     */
        try {
            const map = new __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Map([[0, 1]]);
            return map.has(0) &&
                typeof map.keys === 'function' &&
                true &&
                typeof map.values === 'function' &&
                typeof map.entries === 'function';
        }
        catch (e) {
            /* istanbul ignore next: not testing on iOS at the moment */
            return false;
        }
    }
    return false;
}, true);
/* Math */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-math', () => {
    return [
        'clz32',
        'sign',
        'log10',
        'log2',
        'log1p',
        'expm1',
        'cosh',
        'sinh',
        'tanh',
        'acosh',
        'asinh',
        'atanh',
        'trunc',
        'fround',
        'cbrt',
        'hypot'
    ].every((name) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Math[name] === 'function');
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-math-imul', () => {
    if ('imul' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Math) {
        /* Some versions of Safari on ios do not properly implement this */
        return Math.imul(0xffffffff, 5) === -5;
    }
    return false;
}, true);
/* Object */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-object', () => {
    return true &&
        ['assign', 'is', 'getOwnPropertySymbols', 'setPrototypeOf'].every((name) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Object[name] === 'function');
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es2017-object', () => {
    return ['values', 'entries', 'getOwnPropertyDescriptors'].every((name) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Object[name] === 'function');
}, true);
/* Observable */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es-observable', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Observable !== 'undefined', true);
/* Promise */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-promise', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Promise !== 'undefined' && true, true);
/* Set */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-set', () => {
    if (typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Set === 'function') {
        /* IE11 and older versions of Safari are missing critical ES6 Set functionality */
        const set = new __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Set([1]);
        return set.has(1) && 'keys' in set && typeof set.keys === 'function' && true;
    }
    return false;
}, true);
/* String */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-string', () => {
    return ([
        /* static methods */
        'fromCodePoint'
    ].every((key) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String[key] === 'function') &&
        [
            /* instance methods */
            'codePointAt',
            'normalize',
            'repeat',
            'startsWith',
            'endsWith',
            'includes'
        ].every((key) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String.prototype[key] === 'function'));
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-string-raw', () => {
    function getCallSite(callSite, ...substitutions) {
        const result = [...callSite];
        result.raw = callSite.raw;
        return result;
    }
    if ('raw' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String) {
        let b = 1;
        let callSite = getCallSite `a\n${b}`;
        callSite.raw = ['a\\n'];
        const supportsTrunc = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String.raw(callSite, 42) === 'a:\\n';
        return supportsTrunc;
    }
    return false;
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es2017-string', () => {
    return ['padStart', 'padEnd'].every((key) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String.prototype[key] === 'function');
}, true);
/* Symbol */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-symbol', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Symbol !== 'undefined' && typeof Symbol() === 'symbol', true);
/* WeakMap */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-weakmap', () => {
    if (typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WeakMap !== 'undefined') {
        /* IE11 and older versions of Safari are missing critical ES6 Map functionality */
        const key1 = {};
        const key2 = {};
        const map = new __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WeakMap([[key1, 1]]);
        Object.freeze(key1);
        return map.get(key1) === 1 && map.set(key2, 2) === map && true;
    }
    return false;
}, true);
/* Miscellaneous features */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('microtasks', () => true || false || true, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('postmessage', () => {
    // If window is undefined, and we have postMessage, it probably means we're in a web worker. Web workers have
    // post message but it doesn't work how we expect it to, so it's best just to pretend it doesn't exist.
    return typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].window !== 'undefined' && typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].postMessage === 'function';
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('raf', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].requestAnimationFrame === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('setimmediate', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].setImmediate !== 'undefined', true);
/* DOM Features */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('dom-mutationobserver', () => {
    if (true && Boolean(__WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].MutationObserver || __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WebKitMutationObserver)) {
        // IE11 has an unreliable MutationObserver implementation where setProperty() does not
        // generate a mutation event, observers can crash, and the queue does not drain
        // reliably. The following feature test was adapted from
        // https://gist.github.com/t10ko/4aceb8c71681fdb275e33efe5e576b14
        const example = document.createElement('div');
        /* tslint:disable-next-line:variable-name */
        const HostMutationObserver = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].MutationObserver || __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WebKitMutationObserver;
        const observer = new HostMutationObserver(function () { });
        observer.observe(example, { attributes: true });
        example.style.setProperty('display', 'block');
        return Boolean(observer.takeRecords().length);
    }
    return false;
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('dom-webanimation', () => true && __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Animation !== undefined && __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].KeyframeEffect !== undefined, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('abort-controller', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].AbortController !== 'undefined');
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('abort-signal', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].AbortSignal !== 'undefined');


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/queue.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export queueMicroTask */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");


function executeTask(item) {
    if (item && item.isActive && item.callback) {
        item.callback();
    }
}
function getQueueHandle(item, destructor) {
    return {
        destroy: function () {
            this.destroy = function () { };
            item.isActive = false;
            item.callback = null;
            if (destructor) {
                destructor();
            }
        }
    };
}
let checkMicroTaskQueue;
let microTasks;
/**
 * Schedules a callback to the macrotask queue.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
const queueTask = (function () {
    let destructor;
    let enqueue;
    // Since the IE implementation of `setImmediate` is not flawless, we will test for `postMessage` first.
    if (true) {
        const queue = [];
        __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].addEventListener('message', function (event) {
            // Confirm that the event was triggered by the current window and by this particular implementation.
            if (event.source === __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */] && event.data === 'dojo-queue-message') {
                event.stopPropagation();
                if (queue.length) {
                    executeTask(queue.shift());
                }
            }
        });
        enqueue = function (item) {
            queue.push(item);
            __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].postMessage('dojo-queue-message', '*');
        };
    }
    else if (false) {
        destructor = global.clearImmediate;
        enqueue = function (item) {
            return setImmediate(executeTask.bind(null, item));
        };
    }
    else {
        destructor = global.clearTimeout;
        enqueue = function (item) {
            return setTimeout(executeTask.bind(null, item), 0);
        };
    }
    function queueTask(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        const id = enqueue(item);
        return getQueueHandle(item, destructor &&
            function () {
                destructor(id);
            });
    }
    // TODO: Use aspect.before when it is available.
    return true
        ? queueTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueTask(callback);
        };
})();
/* unused harmony export queueTask */

// When no mechanism for registering microtasks is exposed by the environment, microtasks will
// be queued and then executed in a single macrotask before the other macrotasks are executed.
if (false) {
    let isMicroTaskQueued = false;
    microTasks = [];
    checkMicroTaskQueue = function () {
        if (!isMicroTaskQueued) {
            isMicroTaskQueued = true;
            queueTask(function () {
                isMicroTaskQueued = false;
                if (microTasks.length) {
                    let item;
                    while ((item = microTasks.shift())) {
                        executeTask(item);
                    }
                }
            });
        }
    };
}
/**
 * Schedules an animation task with `window.requestAnimationFrame` if it exists, or with `queueTask` otherwise.
 *
 * Since requestAnimationFrame's behavior does not match that expected from `queueTask`, it is not used there.
 * However, at times it makes more sense to delegate to requestAnimationFrame; hence the following method.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
const queueAnimationTask = (function () {
    if (false) {
        return queueTask;
    }
    function queueAnimationTask(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        const rafId = requestAnimationFrame(executeTask.bind(null, item));
        return getQueueHandle(item, function () {
            cancelAnimationFrame(rafId);
        });
    }
    // TODO: Use aspect.before when it is available.
    return true
        ? queueAnimationTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueAnimationTask(callback);
        };
})();
/* unused harmony export queueAnimationTask */

/**
 * Schedules a callback to the microtask queue.
 *
 * Any callbacks registered with `queueMicroTask` will be executed before the next macrotask. If no native
 * mechanism for scheduling macrotasks is exposed, then any callbacks will be fired before any macrotask
 * registered with `queueTask` or `queueAnimationTask`.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
let queueMicroTask = (function () {
    let enqueue;
    if (false) {
        enqueue = function (item) {
            global.process.nextTick(executeTask.bind(null, item));
        };
    }
    else if (true) {
        enqueue = function (item) {
            __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Promise.resolve(item).then(executeTask);
        };
    }
    else if (true) {
        /* tslint:disable-next-line:variable-name */
        const HostMutationObserver = global.MutationObserver || global.WebKitMutationObserver;
        const node = document.createElement('div');
        const queue = [];
        const observer = new HostMutationObserver(function () {
            while (queue.length > 0) {
                const item = queue.shift();
                if (item && item.isActive && item.callback) {
                    item.callback();
                }
            }
        });
        observer.observe(node, { attributes: true });
        enqueue = function (item) {
            queue.push(item);
            node.setAttribute('queueStatus', '1');
        };
    }
    else {
        enqueue = function (item) {
            checkMicroTaskQueue();
            microTasks.push(item);
        };
    }
    return function (callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        enqueue(item);
        return getQueueHandle(item);
    };
})();


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/util.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getValueDescriptor;
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapNative;
/**
 * Helper function to generate a value property descriptor
 *
 * @param value        The value the property descriptor should be set to
 * @param enumerable   If the property should be enumberable, defaults to false
 * @param writable     If the property should be writable, defaults to true
 * @param configurable If the property should be configurable, defaults to true
 * @return             The property descriptor object
 */
function getValueDescriptor(value, enumerable = false, writable = true, configurable = true) {
    return {
        value: value,
        enumerable: enumerable,
        writable: writable,
        configurable: configurable
    };
}
function wrapNative(nativeFunction) {
    return function (target, ...args) {
        return nativeFunction.apply(target, args);
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/Injector.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");

class Injector extends __WEBPACK_IMPORTED_MODULE_0__core_Evented__["a" /* Evented */] {
    constructor(payload) {
        super();
        this._payload = payload;
    }
    setInvalidator(invalidator) {
        this._invalidator = invalidator;
    }
    get() {
        return this._payload;
    }
    set(payload) {
        this._payload = payload;
        if (this._invalidator) {
            this._invalidator();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Injector;

/* unused harmony default export */ var _unused_webpack_default_export = (Injector);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/NodeHandler.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NodeEventType */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");


/**
 * Enum to identify the type of event.
 * Listening to 'Projector' will notify when projector is created or updated
 * Listening to 'Widget' will notify when widget root is created or updated
 */
var NodeEventType;
(function (NodeEventType) {
    NodeEventType["Projector"] = "Projector";
    NodeEventType["Widget"] = "Widget";
})(NodeEventType || (NodeEventType = {}));
class NodeHandler extends __WEBPACK_IMPORTED_MODULE_0__core_Evented__["a" /* Evented */] {
    constructor() {
        super(...arguments);
        this._nodeMap = new __WEBPACK_IMPORTED_MODULE_1__shim_Map__["b" /* default */]();
    }
    get(key) {
        return this._nodeMap.get(key);
    }
    has(key) {
        return this._nodeMap.has(key);
    }
    add(element, key) {
        this._nodeMap.set(key, element);
        this.emit({ type: key });
    }
    addRoot() {
        this.emit({ type: NodeEventType.Widget });
    }
    addProjector() {
        this.emit({ type: NodeEventType.Projector });
    }
    clear() {
        this._nodeMap.clear();
    }
}
/* unused harmony export NodeHandler */

/* harmony default export */ __webpack_exports__["a"] = (NodeHandler);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/Registry.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = isWidgetBaseConstructor;
/* unused harmony export isWidgetConstructorDefaultExport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Promise__ = __webpack_require__("./node_modules/@dojo/framework/shim/Promise.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");




/**
 * Widget base symbol type
 */
const WIDGET_BASE_TYPE = Object(__WEBPACK_IMPORTED_MODULE_2__shim_Symbol__["a" /* default */])('Widget Base');
/* harmony export (immutable) */ __webpack_exports__["b"] = WIDGET_BASE_TYPE;

/**
 * Checks is the item is a subclass of WidgetBase (or a WidgetBase)
 *
 * @param item the item to check
 * @returns true/false indicating if the item is a WidgetBaseConstructor
 */
function isWidgetBaseConstructor(item) {
    return Boolean(item && item._type === WIDGET_BASE_TYPE);
}
function isWidgetConstructorDefaultExport(item) {
    return Boolean(item &&
        item.hasOwnProperty('__esModule') &&
        item.hasOwnProperty('default') &&
        isWidgetBaseConstructor(item.default));
}
/**
 * The Registry implementation
 */
class Registry extends __WEBPACK_IMPORTED_MODULE_3__core_Evented__["a" /* Evented */] {
    /**
     * Emit loaded event for registry label
     */
    emitLoadedEvent(widgetLabel, item) {
        this.emit({
            type: widgetLabel,
            action: 'loaded',
            item
        });
    }
    define(label, item) {
        if (this._widgetRegistry === undefined) {
            this._widgetRegistry = new __WEBPACK_IMPORTED_MODULE_1__shim_Map__["b" /* default */]();
        }
        if (this._widgetRegistry.has(label)) {
            throw new Error(`widget has already been registered for '${label.toString()}'`);
        }
        this._widgetRegistry.set(label, item);
        if (item instanceof __WEBPACK_IMPORTED_MODULE_0__shim_Promise__["a" /* default */]) {
            item.then((widgetCtor) => {
                this._widgetRegistry.set(label, widgetCtor);
                this.emitLoadedEvent(label, widgetCtor);
                return widgetCtor;
            }, (error) => {
                throw error;
            });
        }
        else if (isWidgetBaseConstructor(item)) {
            this.emitLoadedEvent(label, item);
        }
    }
    defineInjector(label, injectorFactory) {
        if (this._injectorRegistry === undefined) {
            this._injectorRegistry = new __WEBPACK_IMPORTED_MODULE_1__shim_Map__["b" /* default */]();
        }
        if (this._injectorRegistry.has(label)) {
            throw new Error(`injector has already been registered for '${label.toString()}'`);
        }
        const invalidator = new __WEBPACK_IMPORTED_MODULE_3__core_Evented__["a" /* Evented */]();
        const injectorItem = {
            injector: injectorFactory(() => invalidator.emit({ type: 'invalidate' })),
            invalidator
        };
        this._injectorRegistry.set(label, injectorItem);
        this.emitLoadedEvent(label, injectorItem);
    }
    get(label) {
        if (!this._widgetRegistry || !this.has(label)) {
            return null;
        }
        const item = this._widgetRegistry.get(label);
        if (isWidgetBaseConstructor(item)) {
            return item;
        }
        if (item instanceof __WEBPACK_IMPORTED_MODULE_0__shim_Promise__["a" /* default */]) {
            return null;
        }
        const promise = item();
        this._widgetRegistry.set(label, promise);
        promise.then((widgetCtor) => {
            if (isWidgetConstructorDefaultExport(widgetCtor)) {
                widgetCtor = widgetCtor.default;
            }
            this._widgetRegistry.set(label, widgetCtor);
            this.emitLoadedEvent(label, widgetCtor);
            return widgetCtor;
        }, (error) => {
            throw error;
        });
        return null;
    }
    getInjector(label) {
        if (!this._injectorRegistry || !this.hasInjector(label)) {
            return null;
        }
        return this._injectorRegistry.get(label);
    }
    has(label) {
        return Boolean(this._widgetRegistry && this._widgetRegistry.has(label));
    }
    hasInjector(label) {
        return Boolean(this._injectorRegistry && this._injectorRegistry.has(label));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Registry;

/* harmony default export */ __webpack_exports__["c"] = (Registry);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/RegistryHandler.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");



class RegistryHandler extends __WEBPACK_IMPORTED_MODULE_1__core_Evented__["a" /* Evented */] {
    constructor() {
        super();
        this._registry = new __WEBPACK_IMPORTED_MODULE_2__Registry__["a" /* Registry */]();
        this._registryWidgetLabelMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["a" /* Map */]();
        this._registryInjectorLabelMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["a" /* Map */]();
        this.own(this._registry);
        const destroy = () => {
            if (this.baseRegistry) {
                this._registryWidgetLabelMap.delete(this.baseRegistry);
                this._registryInjectorLabelMap.delete(this.baseRegistry);
                this.baseRegistry = undefined;
            }
        };
        this.own({ destroy });
    }
    set base(baseRegistry) {
        if (this.baseRegistry) {
            this._registryWidgetLabelMap.delete(this.baseRegistry);
            this._registryInjectorLabelMap.delete(this.baseRegistry);
        }
        this.baseRegistry = baseRegistry;
    }
    define(label, widget) {
        this._registry.define(label, widget);
    }
    defineInjector(label, injector) {
        this._registry.defineInjector(label, injector);
    }
    has(label) {
        return this._registry.has(label) || Boolean(this.baseRegistry && this.baseRegistry.has(label));
    }
    hasInjector(label) {
        return this._registry.hasInjector(label) || Boolean(this.baseRegistry && this.baseRegistry.hasInjector(label));
    }
    get(label, globalPrecedence = false) {
        return this._get(label, globalPrecedence, 'get', this._registryWidgetLabelMap);
    }
    getInjector(label, globalPrecedence = false) {
        return this._get(label, globalPrecedence, 'getInjector', this._registryInjectorLabelMap);
    }
    _get(label, globalPrecedence, getFunctionName, labelMap) {
        const registries = globalPrecedence ? [this.baseRegistry, this._registry] : [this._registry, this.baseRegistry];
        for (let i = 0; i < registries.length; i++) {
            const registry = registries[i];
            if (!registry) {
                continue;
            }
            const item = registry[getFunctionName](label);
            const registeredLabels = labelMap.get(registry) || [];
            if (item) {
                return item;
            }
            else if (registeredLabels.indexOf(label) === -1) {
                const handle = registry.on(label, (event) => {
                    if (event.action === 'loaded' &&
                        this[getFunctionName](label, globalPrecedence) === event.item) {
                        this.emit({ type: 'invalidate' });
                    }
                });
                this.own(handle);
                labelMap.set(registry, [...registeredLabels, label]);
            }
        }
        return null;
    }
}
/* unused harmony export RegistryHandler */

/* harmony default export */ __webpack_exports__["a"] = (RegistryHandler);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/WidgetBase.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_WeakMap__ = __webpack_require__("./node_modules/@dojo/framework/shim/WeakMap.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__diff__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/diff.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RegistryHandler__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/RegistryHandler.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__NodeHandler__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/NodeHandler.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vdom__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/vdom.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");









const decoratorMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
const boundAuto = __WEBPACK_IMPORTED_MODULE_4__diff__["a" /* auto */].bind(null);
const noBind = __WEBPACK_IMPORTED_MODULE_2__shim_Symbol__["a" /* default */].for('dojoNoBind');
/* harmony export (immutable) */ __webpack_exports__["b"] = noBind;

/**
 * Main widget base for all widgets to extend
 */
class WidgetBase {
    /**
     * @constructor
     */
    constructor() {
        /**
         * Indicates if it is the initial set properties cycle
         */
        this._initialProperties = true;
        /**
         * Array of property keys considered changed from the previous set properties
         */
        this._changedPropertyKeys = [];
        this._nodeHandler = new __WEBPACK_IMPORTED_MODULE_6__NodeHandler__["a" /* default */]();
        this._handles = [];
        this._children = [];
        this._decoratorCache = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
        this._properties = {};
        this._boundRenderFunc = this.render.bind(this);
        this._boundInvalidate = this.invalidate.bind(this);
        __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].set(this, {
            dirty: true,
            onAttach: () => {
                this.onAttach();
            },
            onDetach: () => {
                this.onDetach();
                this.destroy();
            },
            nodeHandler: this._nodeHandler,
            registry: () => {
                return this.registry;
            },
            coreProperties: {},
            rendering: false,
            inputProperties: {}
        });
        this._runAfterConstructors();
    }
    meta(MetaType) {
        if (this._metaMap === undefined) {
            this._metaMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
        }
        let cached = this._metaMap.get(MetaType);
        if (!cached) {
            cached = new MetaType({
                invalidate: this._boundInvalidate,
                nodeHandler: this._nodeHandler,
                bind: this
            });
            this.own(cached);
            this._metaMap.set(MetaType, cached);
        }
        return cached;
    }
    onAttach() {
        // Do nothing by default.
    }
    onDetach() {
        // Do nothing by default.
    }
    get properties() {
        return this._properties;
    }
    get changedPropertyKeys() {
        return [...this._changedPropertyKeys];
    }
    __setCoreProperties__(coreProperties) {
        const { baseRegistry } = coreProperties;
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        if (instanceData.coreProperties.baseRegistry !== baseRegistry) {
            if (this._registry === undefined) {
                this._registry = new __WEBPACK_IMPORTED_MODULE_5__RegistryHandler__["a" /* default */]();
                this.own(this._registry);
                this.own(this._registry.on('invalidate', this._boundInvalidate));
            }
            this._registry.base = baseRegistry;
            this.invalidate();
        }
        instanceData.coreProperties = coreProperties;
    }
    __setProperties__(originalProperties) {
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        instanceData.inputProperties = originalProperties;
        const properties = this._runBeforeProperties(originalProperties);
        const registeredDiffPropertyNames = this.getDecorator('registeredDiffProperty');
        const changedPropertyKeys = [];
        const propertyNames = Object.keys(properties);
        if (this._initialProperties === false || registeredDiffPropertyNames.length !== 0) {
            const allProperties = [...propertyNames, ...Object.keys(this._properties)];
            const checkedProperties = [];
            const diffPropertyResults = {};
            let runReactions = false;
            for (let i = 0; i < allProperties.length; i++) {
                const propertyName = allProperties[i];
                if (checkedProperties.indexOf(propertyName) !== -1) {
                    continue;
                }
                checkedProperties.push(propertyName);
                const previousProperty = this._properties[propertyName];
                const newProperty = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                if (registeredDiffPropertyNames.indexOf(propertyName) !== -1) {
                    runReactions = true;
                    const diffFunctions = this.getDecorator(`diffProperty:${propertyName}`);
                    for (let i = 0; i < diffFunctions.length; i++) {
                        const result = diffFunctions[i](previousProperty, newProperty);
                        if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                            changedPropertyKeys.push(propertyName);
                        }
                        if (propertyName in properties) {
                            diffPropertyResults[propertyName] = result.value;
                        }
                    }
                }
                else {
                    const result = boundAuto(previousProperty, newProperty);
                    if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                        changedPropertyKeys.push(propertyName);
                    }
                    if (propertyName in properties) {
                        diffPropertyResults[propertyName] = result.value;
                    }
                }
            }
            if (runReactions) {
                const reactionFunctions = this.getDecorator('diffReaction');
                const executedReactions = [];
                reactionFunctions.forEach(({ reaction, propertyName }) => {
                    const propertyChanged = changedPropertyKeys.indexOf(propertyName) !== -1;
                    const reactionRun = executedReactions.indexOf(reaction) !== -1;
                    if (propertyChanged && !reactionRun) {
                        reaction.call(this, this._properties, diffPropertyResults);
                        executedReactions.push(reaction);
                    }
                });
            }
            this._properties = diffPropertyResults;
            this._changedPropertyKeys = changedPropertyKeys;
        }
        else {
            this._initialProperties = false;
            for (let i = 0; i < propertyNames.length; i++) {
                const propertyName = propertyNames[i];
                if (typeof properties[propertyName] === 'function') {
                    properties[propertyName] = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                }
                else {
                    changedPropertyKeys.push(propertyName);
                }
            }
            this._changedPropertyKeys = changedPropertyKeys;
            this._properties = Object.assign({}, properties);
        }
        if (this._changedPropertyKeys.length > 0) {
            this.invalidate();
        }
    }
    get children() {
        return this._children;
    }
    __setChildren__(children) {
        if (this._children.length > 0 || children.length > 0) {
            this._children = children;
            this.invalidate();
        }
    }
    __render__() {
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        instanceData.dirty = false;
        const render = this._runBeforeRenders();
        let dNode = render();
        dNode = this.runAfterRenders(dNode);
        this._nodeHandler.clear();
        return dNode;
    }
    invalidate() {
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        if (instanceData.invalidate) {
            instanceData.invalidate();
        }
    }
    render() {
        return Object(__WEBPACK_IMPORTED_MODULE_3__d__["h" /* v */])('div', {}, this.children);
    }
    /**
     * Function to add decorators to WidgetBase
     *
     * @param decoratorKey The key of the decorator
     * @param value The value of the decorator
     */
    addDecorator(decoratorKey, value) {
        value = Array.isArray(value) ? value : [value];
        if (this.hasOwnProperty('constructor')) {
            let decoratorList = decoratorMap.get(this.constructor);
            if (!decoratorList) {
                decoratorList = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
                decoratorMap.set(this.constructor, decoratorList);
            }
            let specificDecoratorList = decoratorList.get(decoratorKey);
            if (!specificDecoratorList) {
                specificDecoratorList = [];
                decoratorList.set(decoratorKey, specificDecoratorList);
            }
            specificDecoratorList.push(...value);
        }
        else {
            const decorators = this.getDecorator(decoratorKey);
            this._decoratorCache.set(decoratorKey, [...decorators, ...value]);
        }
    }
    /**
     * Function to build the list of decorators from the global decorator map.
     *
     * @param decoratorKey  The key of the decorator
     * @return An array of decorator values
     * @private
     */
    _buildDecoratorList(decoratorKey) {
        const allDecorators = [];
        let constructor = this.constructor;
        while (constructor) {
            const instanceMap = decoratorMap.get(constructor);
            if (instanceMap) {
                const decorators = instanceMap.get(decoratorKey);
                if (decorators) {
                    allDecorators.unshift(...decorators);
                }
            }
            constructor = Object.getPrototypeOf(constructor);
        }
        return allDecorators;
    }
    /**
     * Function to retrieve decorator values
     *
     * @param decoratorKey The key of the decorator
     * @returns An array of decorator values
     */
    getDecorator(decoratorKey) {
        let allDecorators = this._decoratorCache.get(decoratorKey);
        if (allDecorators !== undefined) {
            return allDecorators;
        }
        allDecorators = this._buildDecoratorList(decoratorKey);
        this._decoratorCache.set(decoratorKey, allDecorators);
        return allDecorators;
    }
    /**
     * Binds unbound property functions to the specified `bind` property
     *
     * @param properties properties to check for functions
     */
    _bindFunctionProperty(property, bind) {
        if (typeof property === 'function' && !property[noBind] && Object(__WEBPACK_IMPORTED_MODULE_8__Registry__["d" /* isWidgetBaseConstructor */])(property) === false) {
            if (this._bindFunctionPropertyMap === undefined) {
                this._bindFunctionPropertyMap = new __WEBPACK_IMPORTED_MODULE_1__shim_WeakMap__["a" /* default */]();
            }
            const bindInfo = this._bindFunctionPropertyMap.get(property) || {};
            let { boundFunc, scope } = bindInfo;
            if (boundFunc === undefined || scope !== bind) {
                boundFunc = property.bind(bind);
                this._bindFunctionPropertyMap.set(property, { boundFunc, scope: bind });
            }
            return boundFunc;
        }
        return property;
    }
    get registry() {
        if (this._registry === undefined) {
            this._registry = new __WEBPACK_IMPORTED_MODULE_5__RegistryHandler__["a" /* default */]();
            this.own(this._registry);
            this.own(this._registry.on('invalidate', this._boundInvalidate));
        }
        return this._registry;
    }
    _runBeforeProperties(properties) {
        const beforeProperties = this.getDecorator('beforeProperties');
        if (beforeProperties.length > 0) {
            return beforeProperties.reduce((properties, beforePropertiesFunction) => {
                return Object.assign({}, properties, beforePropertiesFunction.call(this, properties));
            }, Object.assign({}, properties));
        }
        return properties;
    }
    /**
     * Run all registered before renders and return the updated render method
     */
    _runBeforeRenders() {
        const beforeRenders = this.getDecorator('beforeRender');
        if (beforeRenders.length > 0) {
            return beforeRenders.reduce((render, beforeRenderFunction) => {
                const updatedRender = beforeRenderFunction.call(this, render, this._properties, this._children);
                if (!updatedRender) {
                    console.warn('Render function not returned from beforeRender, using previous render');
                    return render;
                }
                return updatedRender;
            }, this._boundRenderFunc);
        }
        return this._boundRenderFunc;
    }
    /**
     * Run all registered after renders and return the decorated DNodes
     *
     * @param dNode The DNodes to run through the after renders
     */
    runAfterRenders(dNode) {
        const afterRenders = this.getDecorator('afterRender');
        if (afterRenders.length > 0) {
            dNode = afterRenders.reduce((dNode, afterRenderFunction) => {
                return afterRenderFunction.call(this, dNode);
            }, dNode);
        }
        if (this._metaMap !== undefined) {
            this._metaMap.forEach((meta) => {
                meta.afterRender();
            });
        }
        return dNode;
    }
    _runAfterConstructors() {
        const afterConstructors = this.getDecorator('afterConstructor');
        if (afterConstructors.length > 0) {
            afterConstructors.forEach((afterConstructor) => afterConstructor.call(this));
        }
    }
    own(handle) {
        this._handles.push(handle);
    }
    destroy() {
        while (this._handles.length > 0) {
            const handle = this._handles.pop();
            if (handle) {
                handle.destroy();
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WidgetBase;

/**
 * static identifier
 */
WidgetBase._type = __WEBPACK_IMPORTED_MODULE_8__Registry__["b" /* WIDGET_BASE_TYPE */];
/* unused harmony default export */ var _unused_webpack_default_export = (WidgetBase);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/animations/cssTransitions.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let browserSpecificTransitionEndEventName = '';
let browserSpecificAnimationEndEventName = '';
function determineBrowserStyleNames(element) {
    if ('WebkitTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
        browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
    }
    else if ('transition' in element.style || 'MozTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'transitionend';
        browserSpecificAnimationEndEventName = 'animationend';
    }
    else {
        throw new Error('Your browser is not supported');
    }
}
function initialize(element) {
    if (browserSpecificAnimationEndEventName === '') {
        determineBrowserStyleNames(element);
    }
}
function runAndCleanUp(element, startAnimation, finishAnimation) {
    initialize(element);
    let finished = false;
    let transitionEnd = function () {
        if (!finished) {
            finished = true;
            element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
            element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
            finishAnimation();
        }
    };
    startAnimation();
    element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
    element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
}
function exit(node, properties, exitAnimation, removeNode) {
    const activeClass = properties.exitAnimationActive || `${exitAnimation}-active`;
    runAndCleanUp(node, () => {
        node.classList.add(exitAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, () => {
        removeNode();
    });
}
function enter(node, properties, enterAnimation) {
    const activeClass = properties.enterAnimationActive || `${enterAnimation}-active`;
    runAndCleanUp(node, () => {
        node.classList.add(enterAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, () => {
        node.classList.remove(enterAnimation);
        node.classList.remove(activeClass);
    });
}
/* harmony default export */ __webpack_exports__["a"] = ({
    enter,
    exit
});


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/d.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = isWNode;
/* harmony export (immutable) */ __webpack_exports__["f"] = isVNode;
/* harmony export (immutable) */ __webpack_exports__["e"] = isDomVNode;
/* unused harmony export isElementNode */
/* harmony export (immutable) */ __webpack_exports__["c"] = decorate;
/* harmony export (immutable) */ __webpack_exports__["i"] = w;
/* harmony export (immutable) */ __webpack_exports__["h"] = v;
/* harmony export (immutable) */ __webpack_exports__["d"] = dom;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");

/**
 * The symbol identifier for a WNode type
 */
const WNODE = Object(__WEBPACK_IMPORTED_MODULE_0__shim_Symbol__["a" /* default */])('Identifier for a WNode.');
/* harmony export (immutable) */ __webpack_exports__["b"] = WNODE;

/**
 * The symbol identifier for a VNode type
 */
const VNODE = Object(__WEBPACK_IMPORTED_MODULE_0__shim_Symbol__["a" /* default */])('Identifier for a VNode.');
/* harmony export (immutable) */ __webpack_exports__["a"] = VNODE;

/**
 * The symbol identifier for a VNode type created using dom()
 */
const DOMVNODE = Object(__WEBPACK_IMPORTED_MODULE_0__shim_Symbol__["a" /* default */])('Identifier for a VNode created using existing dom.');
/* unused harmony export DOMVNODE */

/**
 * Helper function that returns true if the `DNode` is a `WNode` using the `type` property
 */
function isWNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === WNODE);
}
/**
 * Helper function that returns true if the `DNode` is a `VNode` using the `type` property
 */
function isVNode(child) {
    return Boolean(child && typeof child !== 'string' && (child.type === VNODE || child.type === DOMVNODE));
}
/**
 * Helper function that returns true if the `DNode` is a `VNode` created with `dom()` using the `type` property
 */
function isDomVNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === DOMVNODE);
}
function isElementNode(value) {
    return !!value.tagName;
}
function decorate(dNodes, optionsOrModifier, predicate) {
    let shallow = false;
    let modifier;
    if (typeof optionsOrModifier === 'function') {
        modifier = optionsOrModifier;
    }
    else {
        modifier = optionsOrModifier.modifier;
        predicate = optionsOrModifier.predicate;
        shallow = optionsOrModifier.shallow || false;
    }
    let nodes = Array.isArray(dNodes) ? [...dNodes] : [dNodes];
    function breaker() {
        nodes = [];
    }
    while (nodes.length) {
        const node = nodes.shift();
        if (node) {
            if (!shallow && (isWNode(node) || isVNode(node)) && node.children) {
                nodes = [...nodes, ...node.children];
            }
            if (!predicate || predicate(node)) {
                modifier(node, breaker);
            }
        }
    }
    return dNodes;
}
/**
 * Wrapper function for calls to create a widget.
 */
function w(widgetConstructor, properties, children = []) {
    return {
        children,
        widgetConstructor,
        properties,
        type: WNODE
    };
}
function v(tag, propertiesOrChildren = {}, children = undefined) {
    let properties = propertiesOrChildren;
    let deferredPropertiesCallback;
    if (Array.isArray(propertiesOrChildren)) {
        children = propertiesOrChildren;
        properties = {};
    }
    if (typeof properties === 'function') {
        deferredPropertiesCallback = properties;
        properties = {};
    }
    return {
        tag,
        deferredPropertiesCallback,
        children,
        properties,
        type: VNODE
    };
}
/**
 * Create a VNode for an existing DOM Node.
 */
function dom({ node, attrs = {}, props = {}, on = {}, diffType = 'none' }, children) {
    return {
        tag: isElementNode(node) ? node.tagName.toLowerCase() : '',
        properties: props,
        attributes: attrs,
        events: on,
        children,
        type: DOMVNODE,
        domNode: node,
        text: isElementNode(node) ? undefined : node.data,
        diffType
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/afterRender.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = afterRender;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");

function afterRender(method) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__handleDecorator__["a" /* handleDecorator */])((target, propertyKey) => {
        target.addDecorator('afterRender', propertyKey ? target[propertyKey] : method);
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (afterRender);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/alwaysRender.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = alwaysRender;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__beforeProperties__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/beforeProperties.mjs");


function alwaysRender() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__handleDecorator__["a" /* handleDecorator */])((target, propertyKey) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__beforeProperties__["a" /* beforeProperties */])(function () {
            this.invalidate();
        })(target);
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (alwaysRender);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/beforeProperties.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = beforeProperties;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");

function beforeProperties(method) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__handleDecorator__["a" /* handleDecorator */])((target, propertyKey) => {
        target.addDecorator('beforeProperties', propertyKey ? target[propertyKey] : method);
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (beforeProperties);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = customElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__registerCustomElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/registerCustomElement.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");


/**
 * This Decorator is provided properties that define the behavior of a custom element, and
 * registers that custom element.
 */
function customElement({ tag, properties = [], attributes = [], events = [], childType = __WEBPACK_IMPORTED_MODULE_0__registerCustomElement__["a" /* CustomElementChildType */].DOJO, registryFactory = () => new __WEBPACK_IMPORTED_MODULE_1__Registry__["c" /* default */]() }) {
    return function (target) {
        target.prototype.__customElementDescriptor = {
            tagName: tag,
            attributes,
            properties,
            events,
            childType,
            registryFactory
        };
    };
}
/* harmony default export */ __webpack_exports__["b"] = (customElement);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/diffProperty.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = diffProperty;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__diff__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/diff.mjs");


/**
 * Decorator that can be used to register a function as a specific property diff
 *
 * @param propertyName  The name of the property of which the diff function is applied
 * @param diffType      The diff type, default is DiffType.AUTO.
 * @param diffFunction  A diff function to run if diffType if DiffType.CUSTOM
 */
function diffProperty(propertyName, diffFunction = __WEBPACK_IMPORTED_MODULE_1__diff__["a" /* auto */], reactionFunction) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__handleDecorator__["a" /* handleDecorator */])((target, propertyKey) => {
        target.addDecorator(`diffProperty:${propertyName}`, diffFunction.bind(null));
        target.addDecorator('registeredDiffProperty', propertyName);
        if (reactionFunction || propertyKey) {
            target.addDecorator('diffReaction', {
                propertyName,
                reaction: propertyKey ? target[propertyKey] : reactionFunction
            });
        }
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (diffProperty);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleDecorator;
/**
 * Generic decorator handler to take care of whether or not the decorator was called at the class level
 * or the method level.
 *
 * @param handler
 */
function handleDecorator(handler) {
    return function (target, propertyKey, descriptor) {
        if (typeof target === 'function') {
            handler(target.prototype, undefined);
        }
        else {
            handler(target, propertyKey);
        }
    };
}
/* unused harmony default export */ var _unused_webpack_default_export = (handleDecorator);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/inject.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_WeakMap__ = __webpack_require__("./node_modules/@dojo/framework/shim/WeakMap.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__beforeProperties__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/beforeProperties.mjs");



/**
 * Map of instances against registered injectors.
 */
const registeredInjectorsMap = new __WEBPACK_IMPORTED_MODULE_0__shim_WeakMap__["a" /* default */]();
/**
 * Decorator retrieves an injector from an available registry using the name and
 * calls the `getProperties` function with the payload from the injector
 * and current properties with the the injected properties returned.
 *
 * @param InjectConfig the inject configuration
 */
function inject({ name, getProperties }) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__handleDecorator__["a" /* handleDecorator */])((target, propertyKey) => {
        Object(__WEBPACK_IMPORTED_MODULE_2__beforeProperties__["a" /* beforeProperties */])(function (properties) {
            const injectorItem = this.registry.getInjector(name);
            if (injectorItem) {
                const { injector, invalidator } = injectorItem;
                const registeredInjectors = registeredInjectorsMap.get(this) || [];
                if (registeredInjectors.length === 0) {
                    registeredInjectorsMap.set(this, registeredInjectors);
                }
                if (registeredInjectors.indexOf(injectorItem) === -1) {
                    this.own(invalidator.on('invalidate', () => {
                        this.invalidate();
                    }));
                    registeredInjectors.push(injectorItem);
                }
                return getProperties(injector(), properties);
            }
        })(target);
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (inject);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/diff.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export always */
/* unused harmony export ignore */
/* unused harmony export reference */
/* harmony export (immutable) */ __webpack_exports__["b"] = shallow;
/* harmony export (immutable) */ __webpack_exports__["a"] = auto;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");

function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value);
}
function always(previousProperty, newProperty) {
    return {
        changed: true,
        value: newProperty
    };
}
function ignore(previousProperty, newProperty) {
    return {
        changed: false,
        value: newProperty
    };
}
function reference(previousProperty, newProperty) {
    return {
        changed: previousProperty !== newProperty,
        value: newProperty
    };
}
function shallow(previousProperty, newProperty) {
    let changed = false;
    const validOldProperty = previousProperty && isObjectOrArray(previousProperty);
    const validNewProperty = newProperty && isObjectOrArray(newProperty);
    if (!validOldProperty || !validNewProperty) {
        return {
            changed: true,
            value: newProperty
        };
    }
    const previousKeys = Object.keys(previousProperty);
    const newKeys = Object.keys(newProperty);
    if (previousKeys.length !== newKeys.length) {
        changed = true;
    }
    else {
        changed = newKeys.some((key) => {
            return newProperty[key] !== previousProperty[key];
        });
    }
    return {
        changed,
        value: newProperty
    };
}
function auto(previousProperty, newProperty) {
    let result;
    if (typeof newProperty === 'function') {
        if (newProperty._type === __WEBPACK_IMPORTED_MODULE_0__Registry__["b" /* WIDGET_BASE_TYPE */]) {
            result = reference(previousProperty, newProperty);
        }
        else {
            result = ignore(previousProperty, newProperty);
        }
    }
    else if (isObjectOrArray(newProperty)) {
        result = shallow(previousProperty, newProperty);
    }
    else {
        result = reference(previousProperty, newProperty);
    }
    return result;
}


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/meta/Base.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Destroyable__ = __webpack_require__("./node_modules/@dojo/framework/core/Destroyable.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Set__ = __webpack_require__("./node_modules/@dojo/framework/shim/Set.mjs");


class Base extends __WEBPACK_IMPORTED_MODULE_0__core_Destroyable__["a" /* Destroyable */] {
    constructor(properties) {
        super();
        this._requestedNodeKeys = new __WEBPACK_IMPORTED_MODULE_1__shim_Set__["a" /* default */]();
        this._invalidate = properties.invalidate;
        this.nodeHandler = properties.nodeHandler;
        if (properties.bind) {
            this._bind = properties.bind;
        }
    }
    has(key) {
        return this.nodeHandler.has(key);
    }
    getNode(key) {
        const stringKey = `${key}`;
        const node = this.nodeHandler.get(stringKey);
        if (!node && !this._requestedNodeKeys.has(stringKey)) {
            const handle = this.nodeHandler.on(stringKey, () => {
                handle.destroy();
                this._requestedNodeKeys.delete(stringKey);
                this.invalidate();
            });
            this.own(handle);
            this._requestedNodeKeys.add(stringKey);
        }
        return node;
    }
    invalidate() {
        this._invalidate();
    }
    afterRender() {
        // Do nothing by default.
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;

/* unused harmony default export */ var _unused_webpack_default_export = (Base);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/meta/Focus.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/meta/Base.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_lang__ = __webpack_require__("./node_modules/@dojo/framework/core/lang.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");



const defaultResults = {
    active: false,
    containsFocus: false
};
class Focus extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* Base */] {
    constructor() {
        super(...arguments);
        this._onFocusChange = () => {
            this._activeElement = __WEBPACK_IMPORTED_MODULE_2__shim_global__["a" /* default */].document.activeElement;
            this.invalidate();
        };
    }
    get(key) {
        const node = this.getNode(key);
        if (!node) {
            return Object.assign({}, defaultResults);
        }
        if (!this._activeElement) {
            this._activeElement = __WEBPACK_IMPORTED_MODULE_2__shim_global__["a" /* default */].document.activeElement;
            this._createListener();
        }
        return {
            active: node === this._activeElement,
            containsFocus: !!this._activeElement && node.contains(this._activeElement)
        };
    }
    set(key) {
        const node = this.getNode(key);
        node && node.focus();
    }
    _createListener() {
        __WEBPACK_IMPORTED_MODULE_2__shim_global__["a" /* default */].document.addEventListener('focusin', this._onFocusChange);
        __WEBPACK_IMPORTED_MODULE_2__shim_global__["a" /* default */].document.addEventListener('focusout', this._onFocusChange);
        this.own(Object(__WEBPACK_IMPORTED_MODULE_1__core_lang__["c" /* createHandle */])(this._removeListener.bind(this)));
    }
    _removeListener() {
        __WEBPACK_IMPORTED_MODULE_2__shim_global__["a" /* default */].document.removeEventListener('focusin', this._onFocusChange);
        __WEBPACK_IMPORTED_MODULE_2__shim_global__["a" /* default */].document.removeEventListener('focusout', this._onFocusChange);
    }
}
/* unused harmony export Focus */

/* harmony default export */ __webpack_exports__["a"] = (Focus);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/mixins/I18n.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export registerI18nInjector */
/* harmony export (immutable) */ __webpack_exports__["a"] = I18nMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__i18n_i18n__ = __webpack_require__("./node_modules/@dojo/framework/i18n/i18n.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__decorators_afterRender__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/afterRender.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__decorators_inject__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/inject.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Injector__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Injector.mjs");

/* tslint:disable:interface-name */






const INJECTOR_KEY = Symbol('i18n');
/* unused harmony export INJECTOR_KEY */

function registerI18nInjector(localeData, registry) {
    const injector = new __WEBPACK_IMPORTED_MODULE_6__Injector__["a" /* Injector */](localeData);
    registry.defineInjector(INJECTOR_KEY, (invalidator) => {
        injector.setInvalidator(invalidator);
        return () => injector.get();
    });
    return injector;
}
function I18nMixin(Base) {
    let I18n = class I18n extends Base {
        /**
         * Return a localized messages object for the provided bundle, deferring to the `i18nBundle` property
         * when present. If the localized messages have not yet been loaded, return either a blank bundle or the
         * default messages.
         *
         * @param bundle
         * The bundle to localize
         *
         * @param useDefaults
         * If `true`, the default messages will be used when the localized messages have not yet been loaded. If `false`
         * (the default), then a blank bundle will be returned (i.e., each key's value will be an empty string).
         */
        localizeBundle(baseBundle, useDefaults = false) {
            const bundle = this._resolveBundle(baseBundle);
            const messages = this._getLocaleMessages(bundle);
            const isPlaceholder = !messages;
            const { locale } = this.properties;
            const format = isPlaceholder && !useDefaults
                ? (key, options) => ''
                : (key, options) => Object(__WEBPACK_IMPORTED_MODULE_1__i18n_i18n__["formatMessage"])(bundle, key, options, locale);
            return Object.create({
                format,
                isPlaceholder,
                messages: messages || (useDefaults ? bundle.messages : this._getBlankMessages(bundle))
            });
        }
        renderDecorator(result) {
            Object(__WEBPACK_IMPORTED_MODULE_3__d__["c" /* decorate */])(result, {
                modifier: (node, breaker) => {
                    const { locale, rtl } = this.properties;
                    const properties = {};
                    if (typeof rtl === 'boolean') {
                        properties['dir'] = rtl ? 'rtl' : 'ltr';
                    }
                    if (locale) {
                        properties['lang'] = locale;
                    }
                    node.properties = Object.assign({}, node.properties, properties);
                    breaker();
                },
                predicate: __WEBPACK_IMPORTED_MODULE_3__d__["f" /* isVNode */]
            });
            return result;
        }
        /**
         * @private
         * Return a message bundle containing an empty string for each key in the provided bundle.
         *
         * @param bundle
         * The message bundle
         *
         * @return
         * The blank message bundle
         */
        _getBlankMessages(bundle) {
            const blank = {};
            return Object.keys(bundle.messages).reduce((blank, key) => {
                blank[key] = '';
                return blank;
            }, blank);
        }
        /**
         * @private
         * Return the cached dictionary for the specified bundle and locale, if it exists. If the requested dictionary does not
         * exist, then load it and update the instance's state with the appropriate messages.
         *
         * @param bundle
         * The bundle for which to load a locale-specific dictionary.
         *
         * @return
         * The locale-specific dictionary, if it has already been loaded and cached.
         */
        _getLocaleMessages(bundle) {
            const { properties } = this;
            const locale = properties.locale || __WEBPACK_IMPORTED_MODULE_1__i18n_i18n__["default"].locale;
            const localeMessages = Object(__WEBPACK_IMPORTED_MODULE_1__i18n_i18n__["getCachedMessages"])(bundle, locale);
            if (localeMessages) {
                return localeMessages;
            }
            Object(__WEBPACK_IMPORTED_MODULE_1__i18n_i18n__["default"])(bundle, locale).then(() => {
                this.invalidate();
            });
        }
        /**
         * @private
         * Resolve the bundle to use for the widget's messages to either the provided bundle or to the
         * `i18nBundle` property.
         *
         * @param bundle
         * The base bundle
         *
         * @return
         * Either override bundle or the original bundle.
         */
        _resolveBundle(bundle) {
            let { i18nBundle } = this.properties;
            if (i18nBundle) {
                if (i18nBundle instanceof __WEBPACK_IMPORTED_MODULE_2__shim_Map__["b" /* default */]) {
                    i18nBundle = i18nBundle.get(bundle);
                    if (!i18nBundle) {
                        return bundle;
                    }
                }
                return i18nBundle;
            }
            return bundle;
        }
    };
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_4__decorators_afterRender__["a" /* afterRender */])()
    ], I18n.prototype, "renderDecorator", null);
    I18n = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_5__decorators_inject__["a" /* inject */])({
            name: INJECTOR_KEY,
            getProperties: (localeData, properties) => {
                const { locale = localeData.locale, rtl = localeData.rtl } = properties;
                return { locale, rtl };
            }
        })
    ], I18n);
    return I18n;
}
/* unused harmony default export */ var _unused_webpack_default_export = (I18nMixin);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/mixins/Projector.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ProjectorAttachState */
/* unused harmony export AttachType */
/* harmony export (immutable) */ __webpack_exports__["a"] = ProjectorMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_lang__ = __webpack_require__("./node_modules/@dojo/framework/core/lang.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animations_cssTransitions__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/animations/cssTransitions.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__decorators_afterRender__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/afterRender.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vdom__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/vdom.mjs");






/**
 * Represents the attach state of the projector
 */
var ProjectorAttachState;
(function (ProjectorAttachState) {
    ProjectorAttachState[ProjectorAttachState["Attached"] = 1] = "Attached";
    ProjectorAttachState[ProjectorAttachState["Detached"] = 2] = "Detached";
})(ProjectorAttachState || (ProjectorAttachState = {}));
/**
 * Attach type for the projector
 */
var AttachType;
(function (AttachType) {
    AttachType[AttachType["Append"] = 1] = "Append";
    AttachType[AttachType["Merge"] = 2] = "Merge";
})(AttachType || (AttachType = {}));
function ProjectorMixin(Base) {
    class Projector extends Base {
        constructor(...args) {
            super(...args);
            this._root = document.body;
            this._async = true;
            this._projectorProperties = {};
            this._projectionOptions = {
                transitions: __WEBPACK_IMPORTED_MODULE_2__animations_cssTransitions__["a" /* default */]
            };
            this.root = document.body;
            this.projectorState = ProjectorAttachState.Detached;
        }
        append(root) {
            const options = {
                type: AttachType.Append,
                root
            };
            return this._attach(options);
        }
        merge(root) {
            const options = {
                type: AttachType.Merge,
                root
            };
            return this._attach(options);
        }
        set root(root) {
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot change root element');
            }
            this._root = root;
        }
        get root() {
            return this._root;
        }
        get async() {
            return this._async;
        }
        set async(async) {
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot change async mode');
            }
            this._async = async;
        }
        sandbox(doc = document) {
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot create sandbox');
            }
            this._async = false;
            const previousRoot = this.root;
            /* free up the document fragment for GC */
            this.own({
                destroy: () => {
                    this._root = previousRoot;
                }
            });
            this._attach({
                /* DocumentFragment is not assignable to Element, but provides everything needed to work */
                root: doc.createDocumentFragment(),
                type: AttachType.Append
            });
        }
        setChildren(children) {
            this.__setChildren__(children);
        }
        setProperties(properties) {
            this.__setProperties__(properties);
        }
        __setProperties__(properties) {
            if (this._projectorProperties && this._projectorProperties.registry !== properties.registry) {
                if (this._projectorProperties.registry) {
                    this._projectorProperties.registry.destroy();
                }
            }
            this._projectorProperties = Object(__WEBPACK_IMPORTED_MODULE_1__core_lang__["a" /* assign */])({}, properties);
            super.__setCoreProperties__({ bind: this, baseRegistry: properties.registry });
            super.__setProperties__(properties);
        }
        toHtml() {
            if (this.projectorState !== ProjectorAttachState.Attached || !this._projection) {
                throw new Error('Projector is not attached, cannot return an HTML string of projection.');
            }
            return this._projection.domNode.childNodes[0].outerHTML;
        }
        afterRender(result) {
            let node = result;
            if (typeof result === 'string' || result === null || result === undefined) {
                node = Object(__WEBPACK_IMPORTED_MODULE_4__d__["h" /* v */])('span', {}, [result]);
            }
            return node;
        }
        destroy() {
            super.destroy();
        }
        _attach({ type, root }) {
            if (root) {
                this.root = root;
            }
            if (this._attachHandle) {
                return this._attachHandle;
            }
            this.projectorState = ProjectorAttachState.Attached;
            const handle = {
                destroy: () => {
                    if (this.projectorState === ProjectorAttachState.Attached) {
                        this._projection = undefined;
                        this.projectorState = ProjectorAttachState.Detached;
                    }
                }
            };
            this.own(handle);
            this._attachHandle = handle;
            this._projectionOptions = Object.assign({}, this._projectionOptions, { sync: !this._async });
            switch (type) {
                case AttachType.Append:
                    this._projection = __WEBPACK_IMPORTED_MODULE_5__vdom__["a" /* dom */].append(this.root, this, this._projectionOptions);
                    break;
                case AttachType.Merge:
                    this._projection = __WEBPACK_IMPORTED_MODULE_5__vdom__["a" /* dom */].merge(this.root, this, this._projectionOptions);
                    break;
            }
            return this._attachHandle;
        }
    }
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_3__decorators_afterRender__["a" /* afterRender */])()
    ], Projector.prototype, "afterRender", null);
    return Projector;
}
/* unused harmony default export */ var _unused_webpack_default_export = (ProjectorMixin);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = theme;
/* harmony export (immutable) */ __webpack_exports__["b"] = registerThemeInjector;
/* harmony export (immutable) */ __webpack_exports__["a"] = ThemedMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Injector__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Injector.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__decorators_inject__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/inject.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__decorators_handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__decorators_diffProperty__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/diffProperty.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__diff__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/diff.mjs");






const THEME_KEY = ' _key';
const INJECTED_THEME_KEY = Symbol('theme');
/* unused harmony export INJECTED_THEME_KEY */

/**
 * Decorator for base css classes
 */
function theme(theme) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__decorators_handleDecorator__["a" /* handleDecorator */])((target) => {
        target.addDecorator('baseThemeClasses', theme);
    });
}
/**
 * Creates a reverse lookup for the classes passed in via the `theme` function.
 *
 * @param classes The baseClasses object
 * @requires
 */
function createThemeClassesLookup(classes) {
    return classes.reduce((currentClassNames, baseClass) => {
        Object.keys(baseClass).forEach((key) => {
            currentClassNames[baseClass[key]] = key;
        });
        return currentClassNames;
    }, {});
}
/**
 * Convenience function that is given a theme and an optional registry, the theme
 * injector is defined against the registry, returning the theme.
 *
 * @param theme the theme to set
 * @param themeRegistry registry to define the theme injector against. Defaults
 * to the global registry
 *
 * @returns the theme injector used to set the theme
 */
function registerThemeInjector(theme, themeRegistry) {
    const themeInjector = new __WEBPACK_IMPORTED_MODULE_1__Injector__["a" /* Injector */](theme);
    themeRegistry.defineInjector(INJECTED_THEME_KEY, (invalidator) => {
        themeInjector.setInvalidator(invalidator);
        return () => themeInjector.get();
    });
    return themeInjector;
}
/**
 * Function that returns a class decorated with with Themed functionality
 */
function ThemedMixin(Base) {
    let Themed = class Themed extends Base {
        constructor() {
            super(...arguments);
            /**
             * Registered base theme keys
             */
            this._registeredBaseThemeKeys = [];
            /**
             * Indicates if classes meta data need to be calculated.
             */
            this._recalculateClasses = true;
            /**
             * Loaded theme
             */
            this._theme = {};
        }
        theme(classes) {
            if (this._recalculateClasses) {
                this._recalculateThemeClasses();
            }
            if (Array.isArray(classes)) {
                return classes.map((className) => this._getThemeClass(className));
            }
            return this._getThemeClass(classes);
        }
        /**
         * Function fired when `theme` or `extraClasses` are changed.
         */
        onPropertiesChanged() {
            this._recalculateClasses = true;
        }
        _getThemeClass(className) {
            if (className === undefined || className === null) {
                return className;
            }
            const extraClasses = this.properties.extraClasses || {};
            const themeClassName = this._baseThemeClassesReverseLookup[className];
            let resultClassNames = [];
            if (!themeClassName) {
                console.warn(`Class name: '${className}' not found in theme`);
                return null;
            }
            if (extraClasses[themeClassName]) {
                resultClassNames.push(extraClasses[themeClassName]);
            }
            if (this._theme[themeClassName]) {
                resultClassNames.push(this._theme[themeClassName]);
            }
            else {
                resultClassNames.push(this._registeredBaseTheme[themeClassName]);
            }
            return resultClassNames.join(' ');
        }
        _recalculateThemeClasses() {
            const { theme = {} } = this.properties;
            const baseThemes = this.getDecorator('baseThemeClasses');
            if (!this._registeredBaseTheme) {
                this._registeredBaseTheme = baseThemes.reduce((finalBaseTheme, baseTheme) => {
                    const _a = THEME_KEY, key = baseTheme[_a], classes = __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __rest */](baseTheme, [typeof _a === "symbol" ? _a : _a + ""]);
                    this._registeredBaseThemeKeys.push(key);
                    return Object.assign({}, finalBaseTheme, classes);
                }, {});
                this._baseThemeClassesReverseLookup = createThemeClassesLookup(baseThemes);
            }
            this._theme = this._registeredBaseThemeKeys.reduce((baseTheme, themeKey) => {
                return Object.assign({}, baseTheme, theme[themeKey]);
            }, {});
            this._recalculateClasses = false;
        }
    };
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_4__decorators_diffProperty__["a" /* diffProperty */])('theme', __WEBPACK_IMPORTED_MODULE_5__diff__["b" /* shallow */]),
        Object(__WEBPACK_IMPORTED_MODULE_4__decorators_diffProperty__["a" /* diffProperty */])('extraClasses', __WEBPACK_IMPORTED_MODULE_5__diff__["b" /* shallow */])
    ], Themed.prototype, "onPropertiesChanged", null);
    Themed = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_2__decorators_inject__["a" /* inject */])({
            name: INJECTED_THEME_KEY,
            getProperties: (theme, properties) => {
                if (!properties.theme) {
                    return { theme };
                }
                return {};
            }
        })
    ], Themed);
    return Themed;
}
/* unused harmony default export */ var _unused_webpack_default_export = (ThemedMixin);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/registerCustomElement.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomElementChildType; });
/* unused harmony export DomToWidgetWrapper */
/* unused harmony export create */
/* unused harmony export register */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_Projector__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Projector.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shim_array__ = __webpack_require__("./node_modules/@dojo/framework/shim/array.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__decorators_alwaysRender__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/alwaysRender.mjs");








var CustomElementChildType;
(function (CustomElementChildType) {
    CustomElementChildType["DOJO"] = "DOJO";
    CustomElementChildType["NODE"] = "NODE";
    CustomElementChildType["TEXT"] = "TEXT";
})(CustomElementChildType || (CustomElementChildType = {}));
function DomToWidgetWrapper(domNode) {
    let DomToWidgetWrapper = class DomToWidgetWrapper extends __WEBPACK_IMPORTED_MODULE_1__WidgetBase__["a" /* WidgetBase */] {
        render() {
            const properties = Object.keys(this.properties).reduce((props, key) => {
                const value = this.properties[key];
                if (key.indexOf('on') === 0) {
                    key = `__${key}`;
                }
                props[key] = value;
                return props;
            }, {});
            return Object(__WEBPACK_IMPORTED_MODULE_4__d__["d" /* dom */])({ node: domNode, props: properties, diffType: 'dom' });
        }
        static get domNode() {
            return domNode;
        }
    };
    DomToWidgetWrapper = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_7__decorators_alwaysRender__["a" /* alwaysRender */])()
    ], DomToWidgetWrapper);
    return DomToWidgetWrapper;
}
function create(descriptor, WidgetConstructor) {
    const { attributes, childType, registryFactory } = descriptor;
    const attributeMap = {};
    attributes.forEach((propertyName) => {
        const attributeName = propertyName.toLowerCase();
        attributeMap[attributeName] = propertyName;
    });
    return class extends HTMLElement {
        constructor() {
            super(...arguments);
            this._properties = {};
            this._children = [];
            this._eventProperties = {};
            this._initialised = false;
        }
        connectedCallback() {
            if (this._initialised) {
                return;
            }
            const domProperties = {};
            const { attributes, properties, events } = descriptor;
            this._properties = Object.assign({}, this._properties, this._attributesToProperties(attributes));
            [...attributes, ...properties].forEach((propertyName) => {
                const value = this[propertyName];
                const filteredPropertyName = propertyName.replace(/^on/, '__');
                if (value !== undefined) {
                    this._properties[propertyName] = value;
                }
                if (filteredPropertyName !== propertyName) {
                    domProperties[filteredPropertyName] = {
                        get: () => this._getProperty(propertyName),
                        set: (value) => this._setProperty(propertyName, value)
                    };
                }
                domProperties[propertyName] = {
                    get: () => this._getProperty(propertyName),
                    set: (value) => this._setProperty(propertyName, value)
                };
            });
            events.forEach((propertyName) => {
                const eventName = propertyName.replace(/^on/, '').toLowerCase();
                const filteredPropertyName = propertyName.replace(/^on/, '__on');
                domProperties[filteredPropertyName] = {
                    get: () => this._getEventProperty(propertyName),
                    set: (value) => this._setEventProperty(propertyName, value)
                };
                this._eventProperties[propertyName] = undefined;
                this._properties[propertyName] = (...args) => {
                    const eventCallback = this._getEventProperty(propertyName);
                    if (typeof eventCallback === 'function') {
                        eventCallback(...args);
                    }
                    this.dispatchEvent(new CustomEvent(eventName, {
                        bubbles: false,
                        detail: args
                    }));
                };
            });
            Object.defineProperties(this, domProperties);
            const children = childType === CustomElementChildType.TEXT ? this.childNodes : this.children;
            Object(__WEBPACK_IMPORTED_MODULE_3__shim_array__["a" /* from */])(children).forEach((childNode) => {
                if (childType === CustomElementChildType.DOJO) {
                    childNode.addEventListener('dojo-ce-render', () => this._render());
                    childNode.addEventListener('dojo-ce-connected', () => this._render());
                    this._children.push(DomToWidgetWrapper(childNode));
                }
                else {
                    this._children.push(Object(__WEBPACK_IMPORTED_MODULE_4__d__["d" /* dom */])({ node: childNode, diffType: 'dom' }));
                }
            });
            this.addEventListener('dojo-ce-connected', (e) => this._childConnected(e));
            const widgetProperties = this._properties;
            const renderChildren = () => this.__children__();
            const Wrapper = class extends __WEBPACK_IMPORTED_MODULE_1__WidgetBase__["a" /* WidgetBase */] {
                render() {
                    return Object(__WEBPACK_IMPORTED_MODULE_4__d__["i" /* w */])(WidgetConstructor, widgetProperties, renderChildren());
                }
            };
            const registry = registryFactory();
            const themeContext = Object(__WEBPACK_IMPORTED_MODULE_6__mixins_Themed__["b" /* registerThemeInjector */])(this._getTheme(), registry);
            __WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */].addEventListener('dojo-theme-set', () => themeContext.set(this._getTheme()));
            const Projector = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_Projector__["a" /* ProjectorMixin */])(Wrapper);
            this._projector = new Projector();
            this._projector.setProperties({ registry });
            this._projector.append(this);
            this._initialised = true;
            this.dispatchEvent(new CustomEvent('dojo-ce-connected', {
                bubbles: true,
                detail: this
            }));
        }
        _getTheme() {
            if (__WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */] && __WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */].dojoce && __WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */].dojoce.theme) {
                return __WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */].dojoce.themes[__WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */].dojoce.theme];
            }
        }
        _childConnected(e) {
            const node = e.detail;
            if (node.parentNode === this) {
                const exists = this._children.some((child) => child.domNode === node);
                if (!exists) {
                    node.addEventListener('dojo-ce-render', () => this._render());
                    this._children.push(DomToWidgetWrapper(node));
                    this._render();
                }
            }
        }
        _render() {
            if (this._projector) {
                this._projector.invalidate();
                this.dispatchEvent(new CustomEvent('dojo-ce-render', {
                    bubbles: false,
                    detail: this
                }));
            }
        }
        __properties__() {
            return Object.assign({}, this._properties, this._eventProperties);
        }
        __children__() {
            if (childType === CustomElementChildType.DOJO) {
                return this._children.filter((Child) => Child.domNode.isWidget).map((Child) => {
                    const { domNode } = Child;
                    return Object(__WEBPACK_IMPORTED_MODULE_4__d__["i" /* w */])(Child, Object.assign({}, domNode.__properties__()), [...domNode.__children__()]);
                });
            }
            else {
                return this._children;
            }
        }
        attributeChangedCallback(name, oldValue, value) {
            const propertyName = attributeMap[name];
            this._setProperty(propertyName, value);
        }
        _setEventProperty(propertyName, value) {
            this._eventProperties[propertyName] = value;
        }
        _getEventProperty(propertyName) {
            return this._eventProperties[propertyName];
        }
        _setProperty(propertyName, value) {
            if (typeof value === 'function') {
                value[__WEBPACK_IMPORTED_MODULE_1__WidgetBase__["b" /* noBind */]] = true;
            }
            this._properties[propertyName] = value;
            this._render();
        }
        _getProperty(propertyName) {
            return this._properties[propertyName];
        }
        _attributesToProperties(attributes) {
            return attributes.reduce((properties, propertyName) => {
                const attributeName = propertyName.toLowerCase();
                const value = this.getAttribute(attributeName);
                if (value !== null) {
                    properties[propertyName] = value;
                }
                return properties;
            }, {});
        }
        static get observedAttributes() {
            return Object.keys(attributeMap);
        }
        get isWidget() {
            return true;
        }
    };
}
function register(WidgetConstructor) {
    const descriptor = WidgetConstructor.prototype && WidgetConstructor.prototype.__customElementDescriptor;
    if (!descriptor) {
        throw new Error('Cannot get descriptor for Custom Element, have you added the @customElement decorator to your Widget?');
    }
    __WEBPACK_IMPORTED_MODULE_5__shim_global__["a" /* default */].customElements.define(descriptor.tagName, create(descriptor, WidgetConstructor));
}
/* unused harmony default export */ var _unused_webpack_default_export = (register);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/vdom.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toParentVNode */
/* unused harmony export toTextVNode */
/* unused harmony export filterAndDecorateChildren */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_array__ = __webpack_require__("./node_modules/@dojo/framework/shim/array.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__ = __webpack_require__("./node_modules/@dojo/framework/shim/WeakMap.mjs");





const NAMESPACE_W3 = 'http://www.w3.org/';
const NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
const NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
const emptyArray = [];
const nodeOperations = ['focus', 'blur', 'scrollIntoView', 'click'];
const widgetInstanceMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["b"] = widgetInstanceMap;

const instanceMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
const nextSiblingMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
const projectorStateMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
function same(dnode1, dnode2) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(dnode1) && Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(dnode2)) {
        if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isDomVNode */])(dnode1) || Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isDomVNode */])(dnode2)) {
            if (dnode1.domNode !== dnode2.domNode) {
                return false;
            }
        }
        if (dnode1.tag !== dnode2.tag) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(dnode1) && Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(dnode2)) {
        if (dnode1.instance === undefined && typeof dnode2.widgetConstructor === 'string') {
            return false;
        }
        if (dnode1.widgetConstructor !== dnode2.widgetConstructor) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    return false;
}
const missingTransition = function () {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
};
function getProjectionOptions(projectorOptions, projectorInstance) {
    const defaults = {
        namespace: undefined,
        styleApplyer: function (domNode, styleName, value) {
            domNode.style[styleName] = value;
        },
        transitions: {
            enter: missingTransition,
            exit: missingTransition
        },
        depth: 0,
        merge: false,
        sync: false,
        projectorInstance
    };
    return Object.assign({}, defaults, projectorOptions);
}
function checkStyleValue(styleValue) {
    if (typeof styleValue !== 'string') {
        throw new Error('Style values must be strings');
    }
}
function updateEvent(domNode, eventName, currentValue, projectionOptions, bind, previousValue) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    const eventMap = projectorState.nodeMap.get(domNode) || new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
    if (previousValue) {
        const previousEvent = eventMap.get(previousValue);
        domNode.removeEventListener(eventName, previousEvent);
    }
    let callback = currentValue.bind(bind);
    if (eventName === 'input') {
        callback = function (evt) {
            currentValue.call(this, evt);
            evt.target['oninput-value'] = evt.target.value;
        }.bind(bind);
    }
    domNode.addEventListener(eventName, callback);
    eventMap.set(currentValue, callback);
    projectorState.nodeMap.set(domNode, eventMap);
}
function addClasses(domNode, classes) {
    if (classes) {
        const classNames = classes.split(' ');
        for (let i = 0; i < classNames.length; i++) {
            domNode.classList.add(classNames[i]);
        }
    }
}
function removeClasses(domNode, classes) {
    if (classes) {
        const classNames = classes.split(' ');
        for (let i = 0; i < classNames.length; i++) {
            domNode.classList.remove(classNames[i]);
        }
    }
}
function buildPreviousProperties(domNode, previous, current) {
    const { diffType, properties, attributes } = current;
    if (!diffType || diffType === 'vdom') {
        return { properties: previous.properties, attributes: previous.attributes, events: previous.events };
    }
    else if (diffType === 'none') {
        return { properties: {}, attributes: previous.attributes ? {} : undefined, events: previous.events };
    }
    let newProperties = {
        properties: {}
    };
    if (attributes) {
        newProperties.attributes = {};
        newProperties.events = previous.events;
        Object.keys(properties).forEach((propName) => {
            newProperties.properties[propName] = domNode[propName];
        });
        Object.keys(attributes).forEach((attrName) => {
            newProperties.attributes[attrName] = domNode.getAttribute(attrName);
        });
        return newProperties;
    }
    newProperties.properties = Object.keys(properties).reduce((props, property) => {
        props[property] = domNode.getAttribute(property) || domNode[property];
        return props;
    }, {});
    return newProperties;
}
function nodeOperation(propName, propValue, previousValue, domNode, projectionOptions) {
    let result;
    if (typeof propValue === 'function') {
        result = propValue();
    }
    else {
        result = propValue && !previousValue;
    }
    if (result === true) {
        const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
        projectorState.deferredRenderCallbacks.push(() => {
            domNode[propName]();
        });
    }
}
function removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions, onlyEvents = false) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    const eventMap = projectorState.nodeMap.get(domNode);
    if (eventMap) {
        Object.keys(previousProperties).forEach((propName) => {
            const isEvent = propName.substr(0, 2) === 'on' || onlyEvents;
            const eventName = onlyEvents ? propName : propName.substr(2);
            if (isEvent && !properties[propName]) {
                const eventCallback = eventMap.get(previousProperties[propName]);
                if (eventCallback) {
                    domNode.removeEventListener(eventName, eventCallback);
                }
            }
        });
    }
}
function updateAttribute(domNode, attrName, attrValue, projectionOptions) {
    if (projectionOptions.namespace === NAMESPACE_SVG && attrName === 'href') {
        domNode.setAttributeNS(NAMESPACE_XLINK, attrName, attrValue);
    }
    else if ((attrName === 'role' && attrValue === '') || attrValue === undefined) {
        domNode.removeAttribute(attrName);
    }
    else {
        domNode.setAttribute(attrName, attrValue);
    }
}
function updateAttributes(domNode, previousAttributes, attributes, projectionOptions) {
    const attrNames = Object.keys(attributes);
    const attrCount = attrNames.length;
    for (let i = 0; i < attrCount; i++) {
        const attrName = attrNames[i];
        const attrValue = attributes[attrName];
        const previousAttrValue = previousAttributes[attrName];
        if (attrValue !== previousAttrValue) {
            updateAttribute(domNode, attrName, attrValue, projectionOptions);
        }
    }
}
function updateProperties(domNode, previousProperties, properties, projectionOptions, includesEventsAndAttributes = true) {
    let propertiesUpdated = false;
    const propNames = Object.keys(properties);
    const propCount = propNames.length;
    if (propNames.indexOf('classes') === -1 && previousProperties.classes) {
        if (Array.isArray(previousProperties.classes)) {
            for (let i = 0; i < previousProperties.classes.length; i++) {
                removeClasses(domNode, previousProperties.classes[i]);
            }
        }
        else {
            removeClasses(domNode, previousProperties.classes);
        }
    }
    includesEventsAndAttributes && removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions);
    for (let i = 0; i < propCount; i++) {
        const propName = propNames[i];
        let propValue = properties[propName];
        const previousValue = previousProperties[propName];
        if (propName === 'classes') {
            const previousClasses = Array.isArray(previousValue) ? previousValue : [previousValue];
            const currentClasses = Array.isArray(propValue) ? propValue : [propValue];
            if (previousClasses && previousClasses.length > 0) {
                if (!propValue || propValue.length === 0) {
                    for (let i = 0; i < previousClasses.length; i++) {
                        removeClasses(domNode, previousClasses[i]);
                    }
                }
                else {
                    const newClasses = [...currentClasses];
                    for (let i = 0; i < previousClasses.length; i++) {
                        const previousClassName = previousClasses[i];
                        if (previousClassName) {
                            const classIndex = newClasses.indexOf(previousClassName);
                            if (classIndex === -1) {
                                removeClasses(domNode, previousClassName);
                            }
                            else {
                                newClasses.splice(classIndex, 1);
                            }
                        }
                    }
                    for (let i = 0; i < newClasses.length; i++) {
                        addClasses(domNode, newClasses[i]);
                    }
                }
            }
            else {
                for (let i = 0; i < currentClasses.length; i++) {
                    addClasses(domNode, currentClasses[i]);
                }
            }
        }
        else if (nodeOperations.indexOf(propName) !== -1) {
            nodeOperation(propName, propValue, previousValue, domNode, projectionOptions);
        }
        else if (propName === 'styles') {
            const styleNames = Object.keys(propValue);
            const styleCount = styleNames.length;
            for (let j = 0; j < styleCount; j++) {
                const styleName = styleNames[j];
                const newStyleValue = propValue[styleName];
                const oldStyleValue = previousValue && previousValue[styleName];
                if (newStyleValue === oldStyleValue) {
                    continue;
                }
                propertiesUpdated = true;
                if (newStyleValue) {
                    checkStyleValue(newStyleValue);
                    projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                }
                else {
                    projectionOptions.styleApplyer(domNode, styleName, '');
                }
            }
        }
        else {
            if (!propValue && typeof previousValue === 'string') {
                propValue = '';
            }
            if (propName === 'value') {
                const domValue = domNode[propName];
                if (domValue !== propValue &&
                    (domNode['oninput-value']
                        ? domValue === domNode['oninput-value']
                        : propValue !== previousValue)) {
                    domNode[propName] = propValue;
                    domNode['oninput-value'] = undefined;
                }
                if (propValue !== previousValue) {
                    propertiesUpdated = true;
                }
            }
            else if (propName !== 'key' && propValue !== previousValue) {
                const type = typeof propValue;
                if (type === 'function' && propName.lastIndexOf('on', 0) === 0 && includesEventsAndAttributes) {
                    updateEvent(domNode, propName.substr(2), propValue, projectionOptions, properties.bind, previousValue);
                }
                else if (type === 'string' && propName !== 'innerHTML' && includesEventsAndAttributes) {
                    updateAttribute(domNode, propName, propValue, projectionOptions);
                }
                else if (propName === 'scrollLeft' || propName === 'scrollTop') {
                    if (domNode[propName] !== propValue) {
                        domNode[propName] = propValue;
                    }
                }
                else {
                    domNode[propName] = propValue;
                }
                propertiesUpdated = true;
            }
        }
    }
    return propertiesUpdated;
}
function findIndexOfChild(children, sameAs, start) {
    for (let i = start; i < children.length; i++) {
        if (same(children[i], sameAs)) {
            return i;
        }
    }
    return -1;
}
function toParentVNode(domNode) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        domNode,
        type: __WEBPACK_IMPORTED_MODULE_2__d__["a" /* VNODE */]
    };
}
function toTextVNode(data) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        text: `${data}`,
        domNode: undefined,
        type: __WEBPACK_IMPORTED_MODULE_2__d__["a" /* VNODE */]
    };
}
function toInternalWNode(instance, instanceData) {
    return {
        instance,
        rendered: [],
        coreProperties: instanceData.coreProperties,
        children: instance.children,
        widgetConstructor: instance.constructor,
        properties: instanceData.inputProperties,
        type: __WEBPACK_IMPORTED_MODULE_2__d__["b" /* WNODE */]
    };
}
function filterAndDecorateChildren(children, instance) {
    if (children === undefined) {
        return emptyArray;
    }
    children = Array.isArray(children) ? children : [children];
    for (let i = 0; i < children.length;) {
        const child = children[i];
        if (child === undefined || child === null) {
            children.splice(i, 1);
            continue;
        }
        else if (typeof child === 'string') {
            children[i] = toTextVNode(child);
        }
        else {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(child)) {
                if (child.properties.bind === undefined) {
                    child.properties.bind = instance;
                    if (child.children && child.children.length > 0) {
                        filterAndDecorateChildren(child.children, instance);
                    }
                }
            }
            else {
                if (!child.coreProperties) {
                    const instanceData = widgetInstanceMap.get(instance);
                    child.coreProperties = {
                        bind: instance,
                        baseRegistry: instanceData.coreProperties.baseRegistry
                    };
                }
                if (child.children && child.children.length > 0) {
                    filterAndDecorateChildren(child.children, instance);
                }
            }
        }
        i++;
    }
    return children;
}
function nodeAdded(dnode, transitions) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(dnode) && dnode.properties) {
        const enterAnimation = dnode.properties.enterAnimation;
        if (enterAnimation) {
            if (typeof enterAnimation === 'function') {
                enterAnimation(dnode.domNode, dnode.properties);
            }
            else {
                transitions.enter(dnode.domNode, dnode.properties, enterAnimation);
            }
        }
    }
}
function nodeToRemove(dnode, transitions, projectionOptions) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(dnode)) {
        const item = instanceMap.get(dnode.instance);
        const rendered = (item ? item.dnode.rendered : dnode.rendered) || emptyArray;
        if (dnode.instance) {
            const instanceData = widgetInstanceMap.get(dnode.instance);
            instanceData.onDetach();
            instanceMap.delete(dnode.instance);
        }
        for (let i = 0; i < rendered.length; i++) {
            nodeToRemove(rendered[i], transitions, projectionOptions);
        }
    }
    else {
        const domNode = dnode.domNode;
        const properties = dnode.properties;
        if (dnode.children && dnode.children.length > 0) {
            for (let i = 0; i < dnode.children.length; i++) {
                nodeToRemove(dnode.children[i], transitions, projectionOptions);
            }
        }
        const exitAnimation = properties.exitAnimation;
        if (properties && exitAnimation) {
            domNode.style.pointerEvents = 'none';
            const removeDomNode = function () {
                domNode && domNode.parentNode && domNode.parentNode.removeChild(domNode);
                dnode.domNode = undefined;
            };
            if (typeof exitAnimation === 'function') {
                exitAnimation(domNode, removeDomNode, properties);
                return;
            }
            else {
                transitions.exit(dnode.domNode, properties, exitAnimation, removeDomNode);
                return;
            }
        }
        domNode && domNode.parentNode && domNode.parentNode.removeChild(domNode);
        dnode.domNode = undefined;
    }
}
function checkDistinguishable(childNodes, indexToCheck, parentInstance) {
    const childNode = childNodes[indexToCheck];
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(childNode) && !childNode.tag) {
        return; // Text nodes need not be distinguishable
    }
    const { key } = childNode.properties;
    if (key === undefined || key === null) {
        for (let i = 0; i < childNodes.length; i++) {
            if (i !== indexToCheck) {
                const node = childNodes[i];
                if (same(node, childNode)) {
                    let nodeIdentifier;
                    const parentName = parentInstance.constructor.name || 'unknown';
                    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(childNode)) {
                        nodeIdentifier = childNode.widgetConstructor.name || 'unknown';
                    }
                    else {
                        nodeIdentifier = childNode.tag;
                    }
                    console.warn(`A widget (${parentName}) has had a child addded or removed, but they were not able to uniquely identified. It is recommended to provide a unique 'key' property when using the same widget or element (${nodeIdentifier}) multiple times as siblings`);
                    break;
                }
            }
        }
    }
}
function updateChildren(parentVNode, siblings, oldChildren, newChildren, parentInstance, projectionOptions) {
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren;
    const oldChildrenLength = oldChildren.length;
    const newChildrenLength = newChildren.length;
    const transitions = projectionOptions.transitions;
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectionOptions = Object.assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    let oldIndex = 0;
    let newIndex = 0;
    let i;
    let textUpdated = false;
    while (newIndex < newChildrenLength) {
        let oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
        const newChild = newChildren[newIndex];
        if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(newChild) && typeof newChild.deferredPropertiesCallback === 'function') {
            newChild.inserted = Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(oldChild) && oldChild.inserted;
            addDeferredProperties(newChild, projectionOptions);
        }
        if (oldChild !== undefined && same(oldChild, newChild)) {
            oldIndex++;
            newIndex++;
            textUpdated =
                updateDom(oldChild, newChild, projectionOptions, parentVNode, parentInstance, oldChildren.slice(oldIndex), newChildren.slice(newIndex)) || textUpdated;
            continue;
        }
        const findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        const addChild = () => {
            let insertBeforeDomNode = undefined;
            let childrenArray = oldChildren;
            let nextIndex = oldIndex + 1;
            let child = oldChildren[oldIndex];
            if (!child) {
                child = siblings[0];
                nextIndex = 1;
                childrenArray = siblings;
            }
            if (child) {
                let insertBeforeChildren = [child];
                while (insertBeforeChildren.length) {
                    const insertBefore = insertBeforeChildren.shift();
                    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(insertBefore)) {
                        const item = instanceMap.get(insertBefore.instance);
                        if (item && item.dnode.rendered) {
                            insertBeforeChildren.push(...item.dnode.rendered);
                        }
                    }
                    else {
                        if (insertBefore.domNode) {
                            if (insertBefore.domNode.parentElement !== parentVNode.domNode) {
                                break;
                            }
                            insertBeforeDomNode = insertBefore.domNode;
                            break;
                        }
                    }
                    if (insertBeforeChildren.length === 0 && childrenArray[nextIndex]) {
                        insertBeforeChildren.push(childrenArray[nextIndex]);
                        nextIndex++;
                    }
                }
            }
            createDom(newChild, parentVNode, newChildren.slice(newIndex + 1), insertBeforeDomNode, projectionOptions, parentInstance);
            nodeAdded(newChild, transitions);
            const indexToCheck = newIndex;
            projectorState.afterRenderCallbacks.push(() => {
                checkDistinguishable(newChildren, indexToCheck, parentInstance);
            });
        };
        if (!oldChild || findOldIndex === -1) {
            addChild();
            newIndex++;
            continue;
        }
        const removeChild = () => {
            const indexToCheck = oldIndex;
            projectorState.afterRenderCallbacks.push(() => {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(oldChild)) {
                const item = instanceMap.get(oldChild.instance);
                if (item) {
                    oldChild = item.dnode;
                }
            }
            nodeToRemove(oldChild, transitions, projectionOptions);
        };
        const findNewIndex = findIndexOfChild(newChildren, oldChild, newIndex + 1);
        if (findNewIndex === -1) {
            removeChild();
            oldIndex++;
            continue;
        }
        addChild();
        removeChild();
        oldIndex++;
        newIndex++;
    }
    if (oldChildrenLength > oldIndex) {
        // Remove child fragments
        for (i = oldIndex; i < oldChildrenLength; i++) {
            const indexToCheck = i;
            projectorState.afterRenderCallbacks.push(() => {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            let childToRemove = oldChildren[i];
            if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(childToRemove)) {
                const item = instanceMap.get(childToRemove.instance);
                if (item) {
                    childToRemove = item.dnode;
                }
            }
            nodeToRemove(childToRemove, transitions, projectionOptions);
        }
    }
    return textUpdated;
}
function addChildren(parentVNode, children, projectionOptions, parentInstance, insertBefore = undefined, childNodes) {
    if (children === undefined) {
        return;
    }
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.merge && childNodes === undefined) {
        childNodes = Object(__WEBPACK_IMPORTED_MODULE_1__shim_array__["a" /* from */])(parentVNode.domNode.childNodes);
    }
    const transitions = projectionOptions.transitions;
    projectionOptions = Object.assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const nextSiblings = children.slice(i + 1);
        if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["f" /* isVNode */])(child)) {
            if (projectorState.merge && childNodes) {
                let domElement = undefined;
                while (child.domNode === undefined && childNodes.length > 0) {
                    domElement = childNodes.shift();
                    if (domElement && domElement.tagName === (child.tag.toUpperCase() || undefined)) {
                        child.domNode = domElement;
                    }
                }
            }
            createDom(child, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance);
        }
        else {
            createDom(child, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance, childNodes);
        }
        nodeAdded(child, transitions);
    }
}
function initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions) {
    addChildren(dnode, dnode.children, projectionOptions, parentInstance, undefined);
    if (typeof dnode.deferredPropertiesCallback === 'function' && dnode.inserted === undefined) {
        addDeferredProperties(dnode, projectionOptions);
    }
    if (dnode.attributes && dnode.events) {
        updateAttributes(domNode, {}, dnode.attributes, projectionOptions);
        updateProperties(domNode, {}, dnode.properties, projectionOptions, false);
        removeOrphanedEvents(domNode, {}, dnode.events, projectionOptions, true);
        const events = dnode.events;
        Object.keys(events).forEach((event) => {
            updateEvent(domNode, event, events[event], projectionOptions, dnode.properties.bind);
        });
    }
    else {
        updateProperties(domNode, {}, dnode.properties, projectionOptions);
    }
    if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
        const instanceData = widgetInstanceMap.get(parentInstance);
        instanceData.nodeHandler.add(domNode, `${dnode.properties.key}`);
    }
    dnode.inserted = true;
}
function createDom(dnode, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance, childNodes) {
    let domNode;
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(dnode)) {
        let { widgetConstructor } = dnode;
        const parentInstanceData = widgetInstanceMap.get(parentInstance);
        if (!Object(__WEBPACK_IMPORTED_MODULE_3__Registry__["d" /* isWidgetBaseConstructor */])(widgetConstructor)) {
            const item = parentInstanceData.registry().get(widgetConstructor);
            if (item === null) {
                return;
            }
            widgetConstructor = item;
        }
        const instance = new widgetConstructor();
        dnode.instance = instance;
        nextSiblingMap.set(instance, nextSiblings);
        const instanceData = widgetInstanceMap.get(instance);
        instanceData.invalidate = () => {
            instanceData.dirty = true;
            if (instanceData.rendering === false) {
                projectorState.renderQueue.push({ instance, depth: projectionOptions.depth });
                scheduleRender(projectionOptions);
            }
        };
        instanceData.rendering = true;
        instance.__setCoreProperties__(dnode.coreProperties);
        instance.__setChildren__(dnode.children);
        instance.__setProperties__(dnode.properties);
        const rendered = instance.__render__();
        instanceData.rendering = false;
        if (rendered) {
            const filteredRendered = filterAndDecorateChildren(rendered, instance);
            dnode.rendered = filteredRendered;
            addChildren(parentVNode, filteredRendered, projectionOptions, instance, insertBefore, childNodes);
        }
        instanceMap.set(instance, { dnode, parentVNode });
        instanceData.nodeHandler.addRoot();
        projectorState.afterRenderCallbacks.push(() => {
            instanceData.onAttach();
        });
    }
    else {
        if (projectorState.merge && projectorState.mergeElement !== undefined) {
            domNode = dnode.domNode = projectionOptions.mergeElement;
            projectorState.mergeElement = undefined;
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            return;
        }
        const doc = parentVNode.domNode.ownerDocument;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.domNode !== undefined && parentVNode.domNode) {
                const newDomNode = dnode.domNode.ownerDocument.createTextNode(dnode.text);
                if (parentVNode.domNode === dnode.domNode.parentNode) {
                    parentVNode.domNode.replaceChild(newDomNode, dnode.domNode);
                }
                else {
                    parentVNode.domNode.appendChild(newDomNode);
                    dnode.domNode.parentNode && dnode.domNode.parentNode.removeChild(dnode.domNode);
                }
                dnode.domNode = newDomNode;
            }
            else {
                domNode = dnode.domNode = doc.createTextNode(dnode.text);
                if (insertBefore !== undefined) {
                    parentVNode.domNode.insertBefore(domNode, insertBefore);
                }
                else {
                    parentVNode.domNode.appendChild(domNode);
                }
            }
        }
        else {
            if (dnode.domNode === undefined) {
                if (dnode.tag === 'svg') {
                    projectionOptions = Object.assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
                }
                if (projectionOptions.namespace !== undefined) {
                    domNode = dnode.domNode = doc.createElementNS(projectionOptions.namespace, dnode.tag);
                }
                else {
                    domNode = dnode.domNode = dnode.domNode || doc.createElement(dnode.tag);
                }
            }
            else {
                domNode = dnode.domNode;
            }
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            if (insertBefore !== undefined) {
                parentVNode.domNode.insertBefore(domNode, insertBefore);
            }
            else if (domNode.parentNode !== parentVNode.domNode) {
                parentVNode.domNode.appendChild(domNode);
            }
        }
    }
}
function updateDom(previous, dnode, projectionOptions, parentVNode, parentInstance, oldNextSiblings, nextSiblings) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["g" /* isWNode */])(dnode)) {
        const { instance } = previous;
        const { parentVNode, dnode: node } = instanceMap.get(instance);
        const previousRendered = node ? node.rendered : previous.rendered;
        const instanceData = widgetInstanceMap.get(instance);
        instanceData.rendering = true;
        instance.__setCoreProperties__(dnode.coreProperties);
        instance.__setChildren__(dnode.children);
        instance.__setProperties__(dnode.properties);
        nextSiblingMap.set(instance, nextSiblings);
        dnode.instance = instance;
        if (instanceData.dirty === true) {
            const rendered = instance.__render__();
            instanceData.rendering = false;
            dnode.rendered = filterAndDecorateChildren(rendered, instance);
            updateChildren(parentVNode, oldNextSiblings, previousRendered, dnode.rendered, instance, projectionOptions);
        }
        else {
            instanceData.rendering = false;
            dnode.rendered = previousRendered;
        }
        instanceMap.set(instance, { dnode, parentVNode });
        instanceData.nodeHandler.addRoot();
    }
    else {
        if (previous === dnode) {
            return false;
        }
        const domNode = (dnode.domNode = previous.domNode);
        let textUpdated = false;
        let updated = false;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.text !== previous.text) {
                const newDomNode = domNode.ownerDocument.createTextNode(dnode.text);
                domNode.parentNode.replaceChild(newDomNode, domNode);
                dnode.domNode = newDomNode;
                textUpdated = true;
                return textUpdated;
            }
        }
        else {
            if (dnode.tag && dnode.tag.lastIndexOf('svg', 0) === 0) {
                projectionOptions = Object.assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (previous.children !== dnode.children) {
                const children = filterAndDecorateChildren(dnode.children, parentInstance);
                dnode.children = children;
                updated =
                    updateChildren(dnode, oldNextSiblings, previous.children, children, parentInstance, projectionOptions) || updated;
            }
            const previousProperties = buildPreviousProperties(domNode, previous, dnode);
            if (dnode.attributes && dnode.events) {
                updateAttributes(domNode, previousProperties.attributes, dnode.attributes, projectionOptions);
                updated =
                    updateProperties(domNode, previousProperties.properties, dnode.properties, projectionOptions, false) || updated;
                removeOrphanedEvents(domNode, previousProperties.events, dnode.events, projectionOptions, true);
                const events = dnode.events;
                Object.keys(events).forEach((event) => {
                    updateEvent(domNode, event, events[event], projectionOptions, dnode.properties.bind, previousProperties.events[event]);
                });
            }
            else {
                updated =
                    updateProperties(domNode, previousProperties.properties, dnode.properties, projectionOptions) ||
                        updated;
            }
            if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
                const instanceData = widgetInstanceMap.get(parentInstance);
                instanceData.nodeHandler.add(domNode, `${dnode.properties.key}`);
            }
        }
        if (updated && dnode.properties && dnode.properties.updateAnimation) {
            dnode.properties.updateAnimation(domNode, dnode.properties, previous.properties);
        }
    }
}
function addDeferredProperties(vnode, projectionOptions) {
    // transfer any properties that have been passed - as these must be decorated properties
    vnode.decoratedDeferredProperties = vnode.properties;
    const properties = vnode.deferredPropertiesCallback(!!vnode.inserted);
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    vnode.properties = Object.assign({}, properties, vnode.decoratedDeferredProperties);
    projectorState.deferredRenderCallbacks.push(() => {
        const properties = Object.assign({}, vnode.deferredPropertiesCallback(!!vnode.inserted), vnode.decoratedDeferredProperties);
        updateProperties(vnode.domNode, vnode.properties, properties, projectionOptions);
        vnode.properties = properties;
    });
}
function runDeferredRenderCallbacks(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.deferredRenderCallbacks.length) {
        if (projectionOptions.sync) {
            while (projectorState.deferredRenderCallbacks.length) {
                const callback = projectorState.deferredRenderCallbacks.shift();
                callback && callback();
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestAnimationFrame(() => {
                while (projectorState.deferredRenderCallbacks.length) {
                    const callback = projectorState.deferredRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function runAfterRenderCallbacks(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        while (projectorState.afterRenderCallbacks.length) {
            const callback = projectorState.afterRenderCallbacks.shift();
            callback && callback();
        }
    }
    else {
        if (__WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestIdleCallback) {
            __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestIdleCallback(() => {
                while (projectorState.afterRenderCallbacks.length) {
                    const callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
        else {
            setTimeout(() => {
                while (projectorState.afterRenderCallbacks.length) {
                    const callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function scheduleRender(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        render(projectionOptions);
    }
    else if (projectorState.renderScheduled === undefined) {
        projectorState.renderScheduled = __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestAnimationFrame(() => {
            render(projectionOptions);
        });
    }
}
function render(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectorState.renderScheduled = undefined;
    const renderQueue = projectorState.renderQueue;
    const renders = [...renderQueue];
    projectorState.renderQueue = [];
    renders.sort((a, b) => a.depth - b.depth);
    const previouslyRendered = [];
    while (renders.length) {
        const { instance } = renders.shift();
        if (instanceMap.has(instance) && previouslyRendered.indexOf(instance) === -1) {
            previouslyRendered.push(instance);
            const { parentVNode, dnode } = instanceMap.get(instance);
            const instanceData = widgetInstanceMap.get(instance);
            const nextSiblings = nextSiblingMap.get(instance);
            updateDom(dnode, toInternalWNode(instance, instanceData), projectionOptions, parentVNode, instance, nextSiblings, nextSiblings);
        }
    }
    runAfterRenderCallbacks(projectionOptions);
    runDeferredRenderCallbacks(projectionOptions);
}
const dom = {
    append: function (parentNode, instance, projectionOptions = {}) {
        const instanceData = widgetInstanceMap.get(instance);
        const finalProjectorOptions = getProjectionOptions(projectionOptions, instance);
        const projectorState = {
            afterRenderCallbacks: [],
            deferredRenderCallbacks: [],
            nodeMap: new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */](),
            renderScheduled: undefined,
            renderQueue: [],
            merge: projectionOptions.merge || false,
            mergeElement: projectionOptions.mergeElement
        };
        projectorStateMap.set(instance, projectorState);
        finalProjectorOptions.rootNode = parentNode;
        const parentVNode = toParentVNode(finalProjectorOptions.rootNode);
        const node = toInternalWNode(instance, instanceData);
        instanceMap.set(instance, { dnode: node, parentVNode });
        instanceData.invalidate = () => {
            instanceData.dirty = true;
            if (instanceData.rendering === false) {
                projectorState.renderQueue.push({ instance, depth: finalProjectorOptions.depth });
                scheduleRender(finalProjectorOptions);
            }
        };
        updateDom(node, node, finalProjectorOptions, parentVNode, instance, [], []);
        projectorState.afterRenderCallbacks.push(() => {
            instanceData.onAttach();
        });
        runDeferredRenderCallbacks(finalProjectorOptions);
        runAfterRenderCallbacks(finalProjectorOptions);
        return {
            domNode: finalProjectorOptions.rootNode
        };
    },
    create: function (instance, projectionOptions) {
        return this.append(document.createElement('div'), instance, projectionOptions);
    },
    merge: function (element, instance, projectionOptions = {}) {
        projectionOptions.merge = true;
        projectionOptions.mergeElement = element;
        const projection = this.append(element.parentNode, instance, projectionOptions);
        const projectorState = projectorStateMap.get(instance);
        projectorState.merge = false;
        return projection;
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dom;



/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/build-time-render/hasBuildTimeRender.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable-next-line
var has = __webpack_require__("./node_modules/@dojo/framework/core/has.mjs");
if (!has.exists('build-time-render')) {
    has.add('build-time-render', false, false);
}


/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/i18n-plugin/templates/setLocaleData.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable
var i18n = __webpack_require__("./node_modules/@dojo/framework/i18n/i18n.mjs");
var loadCldrData = __webpack_require__("./node_modules/@dojo/framework/i18n/cldr/load.mjs").default;
var systemLocale = i18n.systemLocale;
var userLocale = systemLocale.replace(/^([a-z]{2}).*/i, '$1');
var isUserLocaleSupported = userLocale === 'en' ||
    ["es","fr","hi","ar","ja"].some(function (locale) {
        return locale === systemLocale || locale === userLocale;
    });
loadCldrData({"main":{"en":{"identity":{"version":{"_number":"$Revision: 13927 $","_cldrVersion":"33"},"language":"en"},"dates":{"calendars":{"gregorian":{"months":{"format":{"abbreviated":{"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"},"narrow":{"1":"J","2":"F","3":"M","4":"A","5":"M","6":"J","7":"J","8":"A","9":"S","10":"O","11":"N","12":"D"},"wide":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}},"stand-alone":{"abbreviated":{"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"},"narrow":{"1":"J","2":"F","3":"M","4":"A","5":"M","6":"J","7":"J","8":"A","9":"S","10":"O","11":"N","12":"D"},"wide":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}}},"days":{"format":{"abbreviated":{"sun":"Sun","mon":"Mon","tue":"Tue","wed":"Wed","thu":"Thu","fri":"Fri","sat":"Sat"},"narrow":{"sun":"S","mon":"M","tue":"T","wed":"W","thu":"T","fri":"F","sat":"S"},"short":{"sun":"Su","mon":"Mo","tue":"Tu","wed":"We","thu":"Th","fri":"Fr","sat":"Sa"},"wide":{"sun":"Sunday","mon":"Monday","tue":"Tuesday","wed":"Wednesday","thu":"Thursday","fri":"Friday","sat":"Saturday"}},"stand-alone":{"abbreviated":{"sun":"Sun","mon":"Mon","tue":"Tue","wed":"Wed","thu":"Thu","fri":"Fri","sat":"Sat"},"narrow":{"sun":"S","mon":"M","tue":"T","wed":"W","thu":"T","fri":"F","sat":"S"},"short":{"sun":"Su","mon":"Mo","tue":"Tu","wed":"We","thu":"Th","fri":"Fr","sat":"Sa"},"wide":{"sun":"Sunday","mon":"Monday","tue":"Tuesday","wed":"Wednesday","thu":"Thursday","fri":"Friday","sat":"Saturday"}}},"quarters":{"format":{"abbreviated":{"1":"Q1","2":"Q2","3":"Q3","4":"Q4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"1st quarter","2":"2nd quarter","3":"3rd quarter","4":"4th quarter"}},"stand-alone":{"abbreviated":{"1":"Q1","2":"Q2","3":"Q3","4":"Q4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"1st quarter","2":"2nd quarter","3":"3rd quarter","4":"4th quarter"}}},"dayPeriods":{"format":{"abbreviated":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"},"narrow":{"midnight":"mi","am":"a","am-alt-variant":"am","noon":"n","pm":"p","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"},"wide":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"}},"stand-alone":{"abbreviated":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"morning","afternoon1":"afternoon","evening1":"evening","night1":"night"},"narrow":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"morning","afternoon1":"afternoon","evening1":"evening","night1":"night"},"wide":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"morning","afternoon1":"afternoon","evening1":"evening","night1":"night"}}},"eras":{"eraNames":{"0":"Before Christ","1":"Anno Domini","0-alt-variant":"Before Common Era","1-alt-variant":"Common Era"},"eraAbbr":{"0":"BC","1":"AD","0-alt-variant":"BCE","1-alt-variant":"CE"},"eraNarrow":{"0":"B","1":"A","0-alt-variant":"BCE","1-alt-variant":"CE"}},"dateFormats":{"full":"EEEE, MMMM d, y","long":"MMMM d, y","medium":"MMM d, y","short":"M/d/yy"},"timeFormats":{"full":"h:mm:ss a zzzz","long":"h:mm:ss a z","medium":"h:mm:ss a","short":"h:mm a"},"dateTimeFormats":{"full":"{1} 'at' {0}","long":"{1} 'at' {0}","medium":"{1}, {0}","short":"{1}, {0}","availableFormats":{"Bh":"h B","Bhm":"h:mm B","Bhms":"h:mm:ss B","d":"d","E":"ccc","EBhm":"E h:mm B","EBhms":"E h:mm:ss B","Ed":"d E","Ehm":"E h:mm a","EHm":"E HH:mm","Ehms":"E h:mm:ss a","EHms":"E HH:mm:ss","Gy":"y G","GyMMM":"MMM y G","GyMMMd":"MMM d, y G","GyMMMEd":"E, MMM d, y G","h":"h a","H":"HH","hm":"h:mm a","Hm":"HH:mm","hms":"h:mm:ss a","Hms":"HH:mm:ss","hmsv":"h:mm:ss a v","Hmsv":"HH:mm:ss v","hmv":"h:mm a v","Hmv":"HH:mm v","M":"L","Md":"M/d","MEd":"E, M/d","MMM":"LLL","MMMd":"MMM d","MMMEd":"E, MMM d","MMMMd":"MMMM d","MMMMW-count-one":"'week' W 'of' MMMM","MMMMW-count-other":"'week' W 'of' MMMM","ms":"mm:ss","y":"y","yM":"M/y","yMd":"M/d/y","yMEd":"E, M/d/y","yMMM":"MMM y","yMMMd":"MMM d, y","yMMMEd":"E, MMM d, y","yMMMM":"MMMM y","yQQQ":"QQQ y","yQQQQ":"QQQQ y","yw-count-one":"'week' w 'of' Y","yw-count-other":"'week' w 'of' Y"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{0} {1}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{0} {1}"},"intervalFormats":{"intervalFormatFallback":"{0} – {1}","d":{"d":"d – d"},"h":{"a":"h a – h a","h":"h – h a"},"H":{"H":"HH – HH"},"hm":{"a":"h:mm a – h:mm a","h":"h:mm – h:mm a","m":"h:mm – h:mm a"},"Hm":{"H":"HH:mm – HH:mm","m":"HH:mm – HH:mm"},"hmv":{"a":"h:mm a – h:mm a v","h":"h:mm – h:mm a v","m":"h:mm – h:mm a v"},"Hmv":{"H":"HH:mm – HH:mm v","m":"HH:mm – HH:mm v"},"hv":{"a":"h a – h a v","h":"h – h a v"},"Hv":{"H":"HH – HH v"},"M":{"M":"M – M"},"Md":{"d":"M/d – M/d","M":"M/d – M/d"},"MEd":{"d":"E, M/d – E, M/d","M":"E, M/d – E, M/d"},"MMM":{"M":"MMM – MMM"},"MMMd":{"d":"MMM d – d","M":"MMM d – MMM d"},"MMMEd":{"d":"E, MMM d – E, MMM d","M":"E, MMM d – E, MMM d"},"y":{"y":"y – y"},"yM":{"M":"M/y – M/y","y":"M/y – M/y"},"yMd":{"d":"M/d/y – M/d/y","M":"M/d/y – M/d/y","y":"M/d/y – M/d/y"},"yMEd":{"d":"E, M/d/y – E, M/d/y","M":"E, M/d/y – E, M/d/y","y":"E, M/d/y – E, M/d/y"},"yMMM":{"M":"MMM – MMM y","y":"MMM y – MMM y"},"yMMMd":{"d":"MMM d – d, y","M":"MMM d – MMM d, y","y":"MMM d, y – MMM d, y"},"yMMMEd":{"d":"E, MMM d – E, MMM d, y","M":"E, MMM d – E, MMM d, y","y":"E, MMM d, y – E, MMM d, y"},"yMMMM":{"M":"MMMM – MMMM y","y":"MMMM y – MMMM y"}}}}},"fields":{"era":{"displayName":"era"},"era-short":{"displayName":"era"},"era-narrow":{"displayName":"era"},"year":{"displayName":"year","relative-type--1":"last year","relative-type-0":"this year","relative-type-1":"next year","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} year","relativeTimePattern-count-other":"in {0} years"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} year ago","relativeTimePattern-count-other":"{0} years ago"}},"year-short":{"displayName":"yr.","relative-type--1":"last yr.","relative-type-0":"this yr.","relative-type-1":"next yr.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} yr.","relativeTimePattern-count-other":"in {0} yr."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} yr. ago","relativeTimePattern-count-other":"{0} yr. ago"}},"year-narrow":{"displayName":"yr.","relative-type--1":"last yr.","relative-type-0":"this yr.","relative-type-1":"next yr.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} yr.","relativeTimePattern-count-other":"in {0} yr."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} yr. ago","relativeTimePattern-count-other":"{0} yr. ago"}},"quarter":{"displayName":"quarter","relative-type--1":"last quarter","relative-type-0":"this quarter","relative-type-1":"next quarter","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} quarter","relativeTimePattern-count-other":"in {0} quarters"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} quarter ago","relativeTimePattern-count-other":"{0} quarters ago"}},"quarter-short":{"displayName":"qtr.","relative-type--1":"last qtr.","relative-type-0":"this qtr.","relative-type-1":"next qtr.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} qtr.","relativeTimePattern-count-other":"in {0} qtrs."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} qtr. ago","relativeTimePattern-count-other":"{0} qtrs. ago"}},"quarter-narrow":{"displayName":"qtr.","relative-type--1":"last qtr.","relative-type-0":"this qtr.","relative-type-1":"next qtr.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} qtr.","relativeTimePattern-count-other":"in {0} qtrs."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} qtr. ago","relativeTimePattern-count-other":"{0} qtrs. ago"}},"month":{"displayName":"month","relative-type--1":"last month","relative-type-0":"this month","relative-type-1":"next month","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} month","relativeTimePattern-count-other":"in {0} months"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} month ago","relativeTimePattern-count-other":"{0} months ago"}},"month-short":{"displayName":"mo.","relative-type--1":"last mo.","relative-type-0":"this mo.","relative-type-1":"next mo.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} mo.","relativeTimePattern-count-other":"in {0} mo."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} mo. ago","relativeTimePattern-count-other":"{0} mo. ago"}},"month-narrow":{"displayName":"mo.","relative-type--1":"last mo.","relative-type-0":"this mo.","relative-type-1":"next mo.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} mo.","relativeTimePattern-count-other":"in {0} mo."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} mo. ago","relativeTimePattern-count-other":"{0} mo. ago"}},"week":{"displayName":"week","relative-type--1":"last week","relative-type-0":"this week","relative-type-1":"next week","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} week","relativeTimePattern-count-other":"in {0} weeks"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} week ago","relativeTimePattern-count-other":"{0} weeks ago"},"relativePeriod":"the week of {0}"},"week-short":{"displayName":"wk.","relative-type--1":"last wk.","relative-type-0":"this wk.","relative-type-1":"next wk.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} wk.","relativeTimePattern-count-other":"in {0} wk."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} wk. ago","relativeTimePattern-count-other":"{0} wk. ago"},"relativePeriod":"the week of {0}"},"week-narrow":{"displayName":"wk.","relative-type--1":"last wk.","relative-type-0":"this wk.","relative-type-1":"next wk.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} wk.","relativeTimePattern-count-other":"in {0} wk."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} wk. ago","relativeTimePattern-count-other":"{0} wk. ago"},"relativePeriod":"the week of {0}"},"weekOfMonth":{"displayName":"week of month"},"weekOfMonth-short":{"displayName":"wk. of mo."},"weekOfMonth-narrow":{"displayName":"wk. of mo."},"day":{"displayName":"day","relative-type--1":"yesterday","relative-type-0":"today","relative-type-1":"tomorrow","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} day","relativeTimePattern-count-other":"in {0} days"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} day ago","relativeTimePattern-count-other":"{0} days ago"}},"day-short":{"displayName":"day","relative-type--1":"yesterday","relative-type-0":"today","relative-type-1":"tomorrow","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} day","relativeTimePattern-count-other":"in {0} days"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} day ago","relativeTimePattern-count-other":"{0} days ago"}},"day-narrow":{"displayName":"day","relative-type--1":"yesterday","relative-type-0":"today","relative-type-1":"tomorrow","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} day","relativeTimePattern-count-other":"in {0} days"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} day ago","relativeTimePattern-count-other":"{0} days ago"}},"dayOfYear":{"displayName":"day of year"},"dayOfYear-short":{"displayName":"day of yr."},"dayOfYear-narrow":{"displayName":"day of yr."},"weekday":{"displayName":"day of the week"},"weekday-short":{"displayName":"day of wk."},"weekday-narrow":{"displayName":"day of wk."},"weekdayOfMonth":{"displayName":"weekday of the month"},"weekdayOfMonth-short":{"displayName":"wkday. of mo."},"weekdayOfMonth-narrow":{"displayName":"wkday. of mo."},"sun":{"relative-type--1":"last Sunday","relative-type-0":"this Sunday","relative-type-1":"next Sunday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Sunday","relativeTimePattern-count-other":"in {0} Sundays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Sunday ago","relativeTimePattern-count-other":"{0} Sundays ago"}},"sun-short":{"relative-type--1":"last Sun.","relative-type-0":"this Sun.","relative-type-1":"next Sun.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Sun.","relativeTimePattern-count-other":"in {0} Sun."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Sun. ago","relativeTimePattern-count-other":"{0} Sun. ago"}},"sun-narrow":{"relative-type--1":"last Su","relative-type-0":"this Su","relative-type-1":"next Su","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Su","relativeTimePattern-count-other":"in {0} Su"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Su ago","relativeTimePattern-count-other":"{0} Su ago"}},"mon":{"relative-type--1":"last Monday","relative-type-0":"this Monday","relative-type-1":"next Monday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Monday","relativeTimePattern-count-other":"in {0} Mondays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Monday ago","relativeTimePattern-count-other":"{0} Mondays ago"}},"mon-short":{"relative-type--1":"last Mon.","relative-type-0":"this Mon.","relative-type-1":"next Mon.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Mon.","relativeTimePattern-count-other":"in {0} Mon."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Mon. ago","relativeTimePattern-count-other":"{0} Mon. ago"}},"mon-narrow":{"relative-type--1":"last M","relative-type-0":"this M","relative-type-1":"next M","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} M","relativeTimePattern-count-other":"in {0} M"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} M ago","relativeTimePattern-count-other":"{0} M ago"}},"tue":{"relative-type--1":"last Tuesday","relative-type-0":"this Tuesday","relative-type-1":"next Tuesday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Tuesday","relativeTimePattern-count-other":"in {0} Tuesdays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Tuesday ago","relativeTimePattern-count-other":"{0} Tuesdays ago"}},"tue-short":{"relative-type--1":"last Tue.","relative-type-0":"this Tue.","relative-type-1":"next Tue.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Tue.","relativeTimePattern-count-other":"in {0} Tue."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Tue. ago","relativeTimePattern-count-other":"{0} Tue. ago"}},"tue-narrow":{"relative-type--1":"last Tu","relative-type-0":"this Tu","relative-type-1":"next Tu","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Tu","relativeTimePattern-count-other":"in {0} Tu"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Tu ago","relativeTimePattern-count-other":"{0} Tu ago"}},"wed":{"relative-type--1":"last Wednesday","relative-type-0":"this Wednesday","relative-type-1":"next Wednesday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Wednesday","relativeTimePattern-count-other":"in {0} Wednesdays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Wednesday ago","relativeTimePattern-count-other":"{0} Wednesdays ago"}},"wed-short":{"relative-type--1":"last Wed.","relative-type-0":"this Wed.","relative-type-1":"next Wed.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Wed.","relativeTimePattern-count-other":"in {0} Wed."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Wed. ago","relativeTimePattern-count-other":"{0} Wed. ago"}},"wed-narrow":{"relative-type--1":"last W","relative-type-0":"this W","relative-type-1":"next W","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} W","relativeTimePattern-count-other":"in {0} W"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} W ago","relativeTimePattern-count-other":"{0} W ago"}},"thu":{"relative-type--1":"last Thursday","relative-type-0":"this Thursday","relative-type-1":"next Thursday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Thursday","relativeTimePattern-count-other":"in {0} Thursdays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Thursday ago","relativeTimePattern-count-other":"{0} Thursdays ago"}},"thu-short":{"relative-type--1":"last Thu.","relative-type-0":"this Thu.","relative-type-1":"next Thu.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Thu.","relativeTimePattern-count-other":"in {0} Thu."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Thu. ago","relativeTimePattern-count-other":"{0} Thu. ago"}},"thu-narrow":{"relative-type--1":"last Th","relative-type-0":"this Th","relative-type-1":"next Th","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Th","relativeTimePattern-count-other":"in {0} Th"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Th ago","relativeTimePattern-count-other":"{0} Th ago"}},"fri":{"relative-type--1":"last Friday","relative-type-0":"this Friday","relative-type-1":"next Friday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Friday","relativeTimePattern-count-other":"in {0} Fridays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Friday ago","relativeTimePattern-count-other":"{0} Fridays ago"}},"fri-short":{"relative-type--1":"last Fri.","relative-type-0":"this Fri.","relative-type-1":"next Fri.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Fri.","relativeTimePattern-count-other":"in {0} Fri."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Fri. ago","relativeTimePattern-count-other":"{0} Fri. ago"}},"fri-narrow":{"relative-type--1":"last F","relative-type-0":"this F","relative-type-1":"next F","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} F","relativeTimePattern-count-other":"in {0} F"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} F ago","relativeTimePattern-count-other":"{0} F ago"}},"sat":{"relative-type--1":"last Saturday","relative-type-0":"this Saturday","relative-type-1":"next Saturday","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Saturday","relativeTimePattern-count-other":"in {0} Saturdays"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Saturday ago","relativeTimePattern-count-other":"{0} Saturdays ago"}},"sat-short":{"relative-type--1":"last Sat.","relative-type-0":"this Sat.","relative-type-1":"next Sat.","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Sat.","relativeTimePattern-count-other":"in {0} Sat."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Sat. ago","relativeTimePattern-count-other":"{0} Sat. ago"}},"sat-narrow":{"relative-type--1":"last Sa","relative-type-0":"this Sa","relative-type-1":"next Sa","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Sa","relativeTimePattern-count-other":"in {0} Sa"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} Sa ago","relativeTimePattern-count-other":"{0} Sa ago"}},"dayperiod-short":{"displayName":"AM/PM","displayName-alt-variant":"am/pm"},"dayperiod":{"displayName":"AM/PM","displayName-alt-variant":"am/pm"},"dayperiod-narrow":{"displayName":"AM/PM","displayName-alt-variant":"am/pm"},"hour":{"displayName":"hour","relative-type-0":"this hour","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} hour","relativeTimePattern-count-other":"in {0} hours"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} hour ago","relativeTimePattern-count-other":"{0} hours ago"}},"hour-short":{"displayName":"hr.","relative-type-0":"this hour","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} hr.","relativeTimePattern-count-other":"in {0} hr."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} hr. ago","relativeTimePattern-count-other":"{0} hr. ago"}},"hour-narrow":{"displayName":"hr.","relative-type-0":"this hour","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} hr.","relativeTimePattern-count-other":"in {0} hr."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} hr. ago","relativeTimePattern-count-other":"{0} hr. ago"}},"minute":{"displayName":"minute","relative-type-0":"this minute","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} minute","relativeTimePattern-count-other":"in {0} minutes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} minute ago","relativeTimePattern-count-other":"{0} minutes ago"}},"minute-short":{"displayName":"min.","relative-type-0":"this minute","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} min.","relativeTimePattern-count-other":"in {0} min."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} min. ago","relativeTimePattern-count-other":"{0} min. ago"}},"minute-narrow":{"displayName":"min.","relative-type-0":"this minute","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} min.","relativeTimePattern-count-other":"in {0} min."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} min. ago","relativeTimePattern-count-other":"{0} min. ago"}},"second":{"displayName":"second","relative-type-0":"now","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} second","relativeTimePattern-count-other":"in {0} seconds"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} second ago","relativeTimePattern-count-other":"{0} seconds ago"}},"second-short":{"displayName":"sec.","relative-type-0":"now","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} sec.","relativeTimePattern-count-other":"in {0} sec."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} sec. ago","relativeTimePattern-count-other":"{0} sec. ago"}},"second-narrow":{"displayName":"sec.","relative-type-0":"now","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} sec.","relativeTimePattern-count-other":"in {0} sec."},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} sec. ago","relativeTimePattern-count-other":"{0} sec. ago"}},"zone":{"displayName":"time zone"},"zone-short":{"displayName":"zone"},"zone-narrow":{"displayName":"zone"}},"timeZoneNames":{"hourFormat":"+HH:mm;-HH:mm","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","regionFormat":"{0} Time","regionFormat-type-daylight":"{0} Daylight Time","regionFormat-type-standard":"{0} Standard Time","fallbackFormat":"{1} ({0})","zone":{"America":{"Adak":{"exemplarCity":"Adak"},"Anchorage":{"exemplarCity":"Anchorage"},"Anguilla":{"exemplarCity":"Anguilla"},"Antigua":{"exemplarCity":"Antigua"},"Araguaina":{"exemplarCity":"Araguaina"},"Argentina":{"Rio_Gallegos":{"exemplarCity":"Rio Gallegos"},"San_Juan":{"exemplarCity":"San Juan"},"Ushuaia":{"exemplarCity":"Ushuaia"},"La_Rioja":{"exemplarCity":"La Rioja"},"San_Luis":{"exemplarCity":"San Luis"},"Salta":{"exemplarCity":"Salta"},"Tucuman":{"exemplarCity":"Tucuman"}},"Aruba":{"exemplarCity":"Aruba"},"Asuncion":{"exemplarCity":"Asunción"},"Bahia":{"exemplarCity":"Bahia"},"Bahia_Banderas":{"exemplarCity":"Bahia Banderas"},"Barbados":{"exemplarCity":"Barbados"},"Belem":{"exemplarCity":"Belem"},"Belize":{"exemplarCity":"Belize"},"Blanc-Sablon":{"exemplarCity":"Blanc-Sablon"},"Boa_Vista":{"exemplarCity":"Boa Vista"},"Bogota":{"exemplarCity":"Bogota"},"Boise":{"exemplarCity":"Boise"},"Buenos_Aires":{"exemplarCity":"Buenos Aires"},"Cambridge_Bay":{"exemplarCity":"Cambridge Bay"},"Campo_Grande":{"exemplarCity":"Campo Grande"},"Cancun":{"exemplarCity":"Cancun"},"Caracas":{"exemplarCity":"Caracas"},"Catamarca":{"exemplarCity":"Catamarca"},"Cayenne":{"exemplarCity":"Cayenne"},"Cayman":{"exemplarCity":"Cayman"},"Chicago":{"exemplarCity":"Chicago"},"Chihuahua":{"exemplarCity":"Chihuahua"},"Coral_Harbour":{"exemplarCity":"Atikokan"},"Cordoba":{"exemplarCity":"Cordoba"},"Costa_Rica":{"exemplarCity":"Costa Rica"},"Creston":{"exemplarCity":"Creston"},"Cuiaba":{"exemplarCity":"Cuiaba"},"Curacao":{"exemplarCity":"Curaçao"},"Danmarkshavn":{"exemplarCity":"Danmarkshavn"},"Dawson":{"exemplarCity":"Dawson"},"Dawson_Creek":{"exemplarCity":"Dawson Creek"},"Denver":{"exemplarCity":"Denver"},"Detroit":{"exemplarCity":"Detroit"},"Dominica":{"exemplarCity":"Dominica"},"Edmonton":{"exemplarCity":"Edmonton"},"Eirunepe":{"exemplarCity":"Eirunepe"},"El_Salvador":{"exemplarCity":"El Salvador"},"Fort_Nelson":{"exemplarCity":"Fort Nelson"},"Fortaleza":{"exemplarCity":"Fortaleza"},"Glace_Bay":{"exemplarCity":"Glace Bay"},"Godthab":{"exemplarCity":"Nuuk"},"Goose_Bay":{"exemplarCity":"Goose Bay"},"Grand_Turk":{"exemplarCity":"Grand Turk"},"Grenada":{"exemplarCity":"Grenada"},"Guadeloupe":{"exemplarCity":"Guadeloupe"},"Guatemala":{"exemplarCity":"Guatemala"},"Guayaquil":{"exemplarCity":"Guayaquil"},"Guyana":{"exemplarCity":"Guyana"},"Halifax":{"exemplarCity":"Halifax"},"Havana":{"exemplarCity":"Havana"},"Hermosillo":{"exemplarCity":"Hermosillo"},"Indiana":{"Vincennes":{"exemplarCity":"Vincennes, Indiana"},"Petersburg":{"exemplarCity":"Petersburg, Indiana"},"Tell_City":{"exemplarCity":"Tell City, Indiana"},"Knox":{"exemplarCity":"Knox, Indiana"},"Winamac":{"exemplarCity":"Winamac, Indiana"},"Marengo":{"exemplarCity":"Marengo, Indiana"},"Vevay":{"exemplarCity":"Vevay, Indiana"}},"Indianapolis":{"exemplarCity":"Indianapolis"},"Inuvik":{"exemplarCity":"Inuvik"},"Iqaluit":{"exemplarCity":"Iqaluit"},"Jamaica":{"exemplarCity":"Jamaica"},"Jujuy":{"exemplarCity":"Jujuy"},"Juneau":{"exemplarCity":"Juneau"},"Kentucky":{"Monticello":{"exemplarCity":"Monticello, Kentucky"}},"Kralendijk":{"exemplarCity":"Kralendijk"},"La_Paz":{"exemplarCity":"La Paz"},"Lima":{"exemplarCity":"Lima"},"Los_Angeles":{"exemplarCity":"Los Angeles"},"Louisville":{"exemplarCity":"Louisville"},"Lower_Princes":{"exemplarCity":"Lower Prince’s Quarter"},"Maceio":{"exemplarCity":"Maceio"},"Managua":{"exemplarCity":"Managua"},"Manaus":{"exemplarCity":"Manaus"},"Marigot":{"exemplarCity":"Marigot"},"Martinique":{"exemplarCity":"Martinique"},"Matamoros":{"exemplarCity":"Matamoros"},"Mazatlan":{"exemplarCity":"Mazatlan"},"Mendoza":{"exemplarCity":"Mendoza"},"Menominee":{"exemplarCity":"Menominee"},"Merida":{"exemplarCity":"Merida"},"Metlakatla":{"exemplarCity":"Metlakatla"},"Mexico_City":{"exemplarCity":"Mexico City"},"Miquelon":{"exemplarCity":"Miquelon"},"Moncton":{"exemplarCity":"Moncton"},"Monterrey":{"exemplarCity":"Monterrey"},"Montevideo":{"exemplarCity":"Montevideo"},"Montserrat":{"exemplarCity":"Montserrat"},"Nassau":{"exemplarCity":"Nassau"},"New_York":{"exemplarCity":"New York"},"Nipigon":{"exemplarCity":"Nipigon"},"Nome":{"exemplarCity":"Nome"},"Noronha":{"exemplarCity":"Noronha"},"North_Dakota":{"Beulah":{"exemplarCity":"Beulah, North Dakota"},"New_Salem":{"exemplarCity":"New Salem, North Dakota"},"Center":{"exemplarCity":"Center, North Dakota"}},"Ojinaga":{"exemplarCity":"Ojinaga"},"Panama":{"exemplarCity":"Panama"},"Pangnirtung":{"exemplarCity":"Pangnirtung"},"Paramaribo":{"exemplarCity":"Paramaribo"},"Phoenix":{"exemplarCity":"Phoenix"},"Port-au-Prince":{"exemplarCity":"Port-au-Prince"},"Port_of_Spain":{"exemplarCity":"Port of Spain"},"Porto_Velho":{"exemplarCity":"Porto Velho"},"Puerto_Rico":{"exemplarCity":"Puerto Rico"},"Punta_Arenas":{"exemplarCity":"Punta Arenas"},"Rainy_River":{"exemplarCity":"Rainy River"},"Rankin_Inlet":{"exemplarCity":"Rankin Inlet"},"Recife":{"exemplarCity":"Recife"},"Regina":{"exemplarCity":"Regina"},"Resolute":{"exemplarCity":"Resolute"},"Rio_Branco":{"exemplarCity":"Rio Branco"},"Santarem":{"exemplarCity":"Santarem"},"Santiago":{"exemplarCity":"Santiago"},"Santo_Domingo":{"exemplarCity":"Santo Domingo"},"Sao_Paulo":{"exemplarCity":"Sao Paulo"},"Scoresbysund":{"exemplarCity":"Ittoqqortoormiit"},"Sitka":{"exemplarCity":"Sitka"},"St_Barthelemy":{"exemplarCity":"St. Barthélemy"},"St_Johns":{"exemplarCity":"St. John’s"},"St_Kitts":{"exemplarCity":"St. Kitts"},"St_Lucia":{"exemplarCity":"St. Lucia"},"St_Thomas":{"exemplarCity":"St. Thomas"},"St_Vincent":{"exemplarCity":"St. Vincent"},"Swift_Current":{"exemplarCity":"Swift Current"},"Tegucigalpa":{"exemplarCity":"Tegucigalpa"},"Thule":{"exemplarCity":"Thule"},"Thunder_Bay":{"exemplarCity":"Thunder Bay"},"Tijuana":{"exemplarCity":"Tijuana"},"Toronto":{"exemplarCity":"Toronto"},"Tortola":{"exemplarCity":"Tortola"},"Vancouver":{"exemplarCity":"Vancouver"},"Whitehorse":{"exemplarCity":"Whitehorse"},"Winnipeg":{"exemplarCity":"Winnipeg"},"Yakutat":{"exemplarCity":"Yakutat"},"Yellowknife":{"exemplarCity":"Yellowknife"}},"Atlantic":{"Azores":{"exemplarCity":"Azores"},"Bermuda":{"exemplarCity":"Bermuda"},"Canary":{"exemplarCity":"Canary"},"Cape_Verde":{"exemplarCity":"Cape Verde"},"Faeroe":{"exemplarCity":"Faroe"},"Madeira":{"exemplarCity":"Madeira"},"Reykjavik":{"exemplarCity":"Reykjavik"},"South_Georgia":{"exemplarCity":"South Georgia"},"St_Helena":{"exemplarCity":"St. Helena"},"Stanley":{"exemplarCity":"Stanley"}},"Europe":{"Amsterdam":{"exemplarCity":"Amsterdam"},"Andorra":{"exemplarCity":"Andorra"},"Astrakhan":{"exemplarCity":"Astrakhan"},"Athens":{"exemplarCity":"Athens"},"Belgrade":{"exemplarCity":"Belgrade"},"Berlin":{"exemplarCity":"Berlin"},"Bratislava":{"exemplarCity":"Bratislava"},"Brussels":{"exemplarCity":"Brussels"},"Bucharest":{"exemplarCity":"Bucharest"},"Budapest":{"exemplarCity":"Budapest"},"Busingen":{"exemplarCity":"Busingen"},"Chisinau":{"exemplarCity":"Chisinau"},"Copenhagen":{"exemplarCity":"Copenhagen"},"Dublin":{"long":{"daylight":"Irish Standard Time"},"exemplarCity":"Dublin"},"Gibraltar":{"exemplarCity":"Gibraltar"},"Guernsey":{"exemplarCity":"Guernsey"},"Helsinki":{"exemplarCity":"Helsinki"},"Isle_of_Man":{"exemplarCity":"Isle of Man"},"Istanbul":{"exemplarCity":"Istanbul"},"Jersey":{"exemplarCity":"Jersey"},"Kaliningrad":{"exemplarCity":"Kaliningrad"},"Kiev":{"exemplarCity":"Kiev"},"Kirov":{"exemplarCity":"Kirov"},"Lisbon":{"exemplarCity":"Lisbon"},"Ljubljana":{"exemplarCity":"Ljubljana"},"London":{"long":{"daylight":"British Summer Time"},"exemplarCity":"London"},"Luxembourg":{"exemplarCity":"Luxembourg"},"Madrid":{"exemplarCity":"Madrid"},"Malta":{"exemplarCity":"Malta"},"Mariehamn":{"exemplarCity":"Mariehamn"},"Minsk":{"exemplarCity":"Minsk"},"Monaco":{"exemplarCity":"Monaco"},"Moscow":{"exemplarCity":"Moscow"},"Oslo":{"exemplarCity":"Oslo"},"Paris":{"exemplarCity":"Paris"},"Podgorica":{"exemplarCity":"Podgorica"},"Prague":{"exemplarCity":"Prague"},"Riga":{"exemplarCity":"Riga"},"Rome":{"exemplarCity":"Rome"},"Samara":{"exemplarCity":"Samara"},"San_Marino":{"exemplarCity":"San Marino"},"Sarajevo":{"exemplarCity":"Sarajevo"},"Saratov":{"exemplarCity":"Saratov"},"Simferopol":{"exemplarCity":"Simferopol"},"Skopje":{"exemplarCity":"Skopje"},"Sofia":{"exemplarCity":"Sofia"},"Stockholm":{"exemplarCity":"Stockholm"},"Tallinn":{"exemplarCity":"Tallinn"},"Tirane":{"exemplarCity":"Tirane"},"Ulyanovsk":{"exemplarCity":"Ulyanovsk"},"Uzhgorod":{"exemplarCity":"Uzhhorod"},"Vaduz":{"exemplarCity":"Vaduz"},"Vatican":{"exemplarCity":"Vatican"},"Vienna":{"exemplarCity":"Vienna"},"Vilnius":{"exemplarCity":"Vilnius"},"Volgograd":{"exemplarCity":"Volgograd"},"Warsaw":{"exemplarCity":"Warsaw"},"Zagreb":{"exemplarCity":"Zagreb"},"Zaporozhye":{"exemplarCity":"Zaporozhye"},"Zurich":{"exemplarCity":"Zurich"}},"Africa":{"Abidjan":{"exemplarCity":"Abidjan"},"Accra":{"exemplarCity":"Accra"},"Addis_Ababa":{"exemplarCity":"Addis Ababa"},"Algiers":{"exemplarCity":"Algiers"},"Asmera":{"exemplarCity":"Asmara"},"Bamako":{"exemplarCity":"Bamako"},"Bangui":{"exemplarCity":"Bangui"},"Banjul":{"exemplarCity":"Banjul"},"Bissau":{"exemplarCity":"Bissau"},"Blantyre":{"exemplarCity":"Blantyre"},"Brazzaville":{"exemplarCity":"Brazzaville"},"Bujumbura":{"exemplarCity":"Bujumbura"},"Cairo":{"exemplarCity":"Cairo"},"Casablanca":{"exemplarCity":"Casablanca"},"Ceuta":{"exemplarCity":"Ceuta"},"Conakry":{"exemplarCity":"Conakry"},"Dakar":{"exemplarCity":"Dakar"},"Dar_es_Salaam":{"exemplarCity":"Dar es Salaam"},"Djibouti":{"exemplarCity":"Djibouti"},"Douala":{"exemplarCity":"Douala"},"El_Aaiun":{"exemplarCity":"El Aaiun"},"Freetown":{"exemplarCity":"Freetown"},"Gaborone":{"exemplarCity":"Gaborone"},"Harare":{"exemplarCity":"Harare"},"Johannesburg":{"exemplarCity":"Johannesburg"},"Juba":{"exemplarCity":"Juba"},"Kampala":{"exemplarCity":"Kampala"},"Khartoum":{"exemplarCity":"Khartoum"},"Kigali":{"exemplarCity":"Kigali"},"Kinshasa":{"exemplarCity":"Kinshasa"},"Lagos":{"exemplarCity":"Lagos"},"Libreville":{"exemplarCity":"Libreville"},"Lome":{"exemplarCity":"Lome"},"Luanda":{"exemplarCity":"Luanda"},"Lubumbashi":{"exemplarCity":"Lubumbashi"},"Lusaka":{"exemplarCity":"Lusaka"},"Malabo":{"exemplarCity":"Malabo"},"Maputo":{"exemplarCity":"Maputo"},"Maseru":{"exemplarCity":"Maseru"},"Mbabane":{"exemplarCity":"Mbabane"},"Mogadishu":{"exemplarCity":"Mogadishu"},"Monrovia":{"exemplarCity":"Monrovia"},"Nairobi":{"exemplarCity":"Nairobi"},"Ndjamena":{"exemplarCity":"Ndjamena"},"Niamey":{"exemplarCity":"Niamey"},"Nouakchott":{"exemplarCity":"Nouakchott"},"Ouagadougou":{"exemplarCity":"Ouagadougou"},"Porto-Novo":{"exemplarCity":"Porto-Novo"},"Sao_Tome":{"exemplarCity":"São Tomé"},"Tripoli":{"exemplarCity":"Tripoli"},"Tunis":{"exemplarCity":"Tunis"},"Windhoek":{"exemplarCity":"Windhoek"}},"Asia":{"Aden":{"exemplarCity":"Aden"},"Almaty":{"exemplarCity":"Almaty"},"Amman":{"exemplarCity":"Amman"},"Anadyr":{"exemplarCity":"Anadyr"},"Aqtau":{"exemplarCity":"Aqtau"},"Aqtobe":{"exemplarCity":"Aqtobe"},"Ashgabat":{"exemplarCity":"Ashgabat"},"Atyrau":{"exemplarCity":"Atyrau"},"Baghdad":{"exemplarCity":"Baghdad"},"Bahrain":{"exemplarCity":"Bahrain"},"Baku":{"exemplarCity":"Baku"},"Bangkok":{"exemplarCity":"Bangkok"},"Barnaul":{"exemplarCity":"Barnaul"},"Beirut":{"exemplarCity":"Beirut"},"Bishkek":{"exemplarCity":"Bishkek"},"Brunei":{"exemplarCity":"Brunei"},"Calcutta":{"exemplarCity":"Kolkata"},"Chita":{"exemplarCity":"Chita"},"Choibalsan":{"exemplarCity":"Choibalsan"},"Colombo":{"exemplarCity":"Colombo"},"Damascus":{"exemplarCity":"Damascus"},"Dhaka":{"exemplarCity":"Dhaka"},"Dili":{"exemplarCity":"Dili"},"Dubai":{"exemplarCity":"Dubai"},"Dushanbe":{"exemplarCity":"Dushanbe"},"Famagusta":{"exemplarCity":"Famagusta"},"Gaza":{"exemplarCity":"Gaza"},"Hebron":{"exemplarCity":"Hebron"},"Hong_Kong":{"exemplarCity":"Hong Kong"},"Hovd":{"exemplarCity":"Hovd"},"Irkutsk":{"exemplarCity":"Irkutsk"},"Jakarta":{"exemplarCity":"Jakarta"},"Jayapura":{"exemplarCity":"Jayapura"},"Jerusalem":{"exemplarCity":"Jerusalem"},"Kabul":{"exemplarCity":"Kabul"},"Kamchatka":{"exemplarCity":"Kamchatka"},"Karachi":{"exemplarCity":"Karachi"},"Katmandu":{"exemplarCity":"Kathmandu"},"Khandyga":{"exemplarCity":"Khandyga"},"Krasnoyarsk":{"exemplarCity":"Krasnoyarsk"},"Kuala_Lumpur":{"exemplarCity":"Kuala Lumpur"},"Kuching":{"exemplarCity":"Kuching"},"Kuwait":{"exemplarCity":"Kuwait"},"Macau":{"exemplarCity":"Macau"},"Magadan":{"exemplarCity":"Magadan"},"Makassar":{"exemplarCity":"Makassar"},"Manila":{"exemplarCity":"Manila"},"Muscat":{"exemplarCity":"Muscat"},"Nicosia":{"exemplarCity":"Nicosia"},"Novokuznetsk":{"exemplarCity":"Novokuznetsk"},"Novosibirsk":{"exemplarCity":"Novosibirsk"},"Omsk":{"exemplarCity":"Omsk"},"Oral":{"exemplarCity":"Oral"},"Phnom_Penh":{"exemplarCity":"Phnom Penh"},"Pontianak":{"exemplarCity":"Pontianak"},"Pyongyang":{"exemplarCity":"Pyongyang"},"Qatar":{"exemplarCity":"Qatar"},"Qyzylorda":{"exemplarCity":"Qyzylorda"},"Rangoon":{"exemplarCity":"Yangon"},"Riyadh":{"exemplarCity":"Riyadh"},"Saigon":{"exemplarCity":"Ho Chi Minh City"},"Sakhalin":{"exemplarCity":"Sakhalin"},"Samarkand":{"exemplarCity":"Samarkand"},"Seoul":{"exemplarCity":"Seoul"},"Shanghai":{"exemplarCity":"Shanghai"},"Singapore":{"exemplarCity":"Singapore"},"Srednekolymsk":{"exemplarCity":"Srednekolymsk"},"Taipei":{"exemplarCity":"Taipei"},"Tashkent":{"exemplarCity":"Tashkent"},"Tbilisi":{"exemplarCity":"Tbilisi"},"Tehran":{"exemplarCity":"Tehran"},"Thimphu":{"exemplarCity":"Thimphu"},"Tokyo":{"exemplarCity":"Tokyo"},"Tomsk":{"exemplarCity":"Tomsk"},"Ulaanbaatar":{"exemplarCity":"Ulaanbaatar"},"Urumqi":{"exemplarCity":"Urumqi"},"Ust-Nera":{"exemplarCity":"Ust-Nera"},"Vientiane":{"exemplarCity":"Vientiane"},"Vladivostok":{"exemplarCity":"Vladivostok"},"Yakutsk":{"exemplarCity":"Yakutsk"},"Yekaterinburg":{"exemplarCity":"Yekaterinburg"},"Yerevan":{"exemplarCity":"Yerevan"}},"Indian":{"Antananarivo":{"exemplarCity":"Antananarivo"},"Chagos":{"exemplarCity":"Chagos"},"Christmas":{"exemplarCity":"Christmas"},"Cocos":{"exemplarCity":"Cocos"},"Comoro":{"exemplarCity":"Comoro"},"Kerguelen":{"exemplarCity":"Kerguelen"},"Mahe":{"exemplarCity":"Mahe"},"Maldives":{"exemplarCity":"Maldives"},"Mauritius":{"exemplarCity":"Mauritius"},"Mayotte":{"exemplarCity":"Mayotte"},"Reunion":{"exemplarCity":"Réunion"}},"Australia":{"Adelaide":{"exemplarCity":"Adelaide"},"Brisbane":{"exemplarCity":"Brisbane"},"Broken_Hill":{"exemplarCity":"Broken Hill"},"Currie":{"exemplarCity":"Currie"},"Darwin":{"exemplarCity":"Darwin"},"Eucla":{"exemplarCity":"Eucla"},"Hobart":{"exemplarCity":"Hobart"},"Lindeman":{"exemplarCity":"Lindeman"},"Lord_Howe":{"exemplarCity":"Lord Howe"},"Melbourne":{"exemplarCity":"Melbourne"},"Perth":{"exemplarCity":"Perth"},"Sydney":{"exemplarCity":"Sydney"}},"Pacific":{"Apia":{"exemplarCity":"Apia"},"Auckland":{"exemplarCity":"Auckland"},"Bougainville":{"exemplarCity":"Bougainville"},"Chatham":{"exemplarCity":"Chatham"},"Easter":{"exemplarCity":"Easter"},"Efate":{"exemplarCity":"Efate"},"Enderbury":{"exemplarCity":"Enderbury"},"Fakaofo":{"exemplarCity":"Fakaofo"},"Fiji":{"exemplarCity":"Fiji"},"Funafuti":{"exemplarCity":"Funafuti"},"Galapagos":{"exemplarCity":"Galapagos"},"Gambier":{"exemplarCity":"Gambier"},"Guadalcanal":{"exemplarCity":"Guadalcanal"},"Guam":{"exemplarCity":"Guam"},"Honolulu":{"short":{"generic":"HST","standard":"HST","daylight":"HDT"}},"Johnston":{"exemplarCity":"Johnston"},"Kiritimati":{"exemplarCity":"Kiritimati"},"Kosrae":{"exemplarCity":"Kosrae"},"Kwajalein":{"exemplarCity":"Kwajalein"},"Majuro":{"exemplarCity":"Majuro"},"Marquesas":{"exemplarCity":"Marquesas"},"Midway":{"exemplarCity":"Midway"},"Nauru":{"exemplarCity":"Nauru"},"Niue":{"exemplarCity":"Niue"},"Norfolk":{"exemplarCity":"Norfolk"},"Noumea":{"exemplarCity":"Noumea"},"Pago_Pago":{"exemplarCity":"Pago Pago"},"Palau":{"exemplarCity":"Palau"},"Pitcairn":{"exemplarCity":"Pitcairn"},"Ponape":{"exemplarCity":"Pohnpei"},"Port_Moresby":{"exemplarCity":"Port Moresby"},"Rarotonga":{"exemplarCity":"Rarotonga"},"Saipan":{"exemplarCity":"Saipan"},"Tahiti":{"exemplarCity":"Tahiti"},"Tarawa":{"exemplarCity":"Tarawa"},"Tongatapu":{"exemplarCity":"Tongatapu"},"Truk":{"exemplarCity":"Chuuk"},"Wake":{"exemplarCity":"Wake"},"Wallis":{"exemplarCity":"Wallis"}},"Arctic":{"Longyearbyen":{"exemplarCity":"Longyearbyen"}},"Antarctica":{"Casey":{"exemplarCity":"Casey"},"Davis":{"exemplarCity":"Davis"},"DumontDUrville":{"exemplarCity":"Dumont d’Urville"},"Macquarie":{"exemplarCity":"Macquarie"},"Mawson":{"exemplarCity":"Mawson"},"McMurdo":{"exemplarCity":"McMurdo"},"Palmer":{"exemplarCity":"Palmer"},"Rothera":{"exemplarCity":"Rothera"},"Syowa":{"exemplarCity":"Syowa"},"Troll":{"exemplarCity":"Troll"},"Vostok":{"exemplarCity":"Vostok"}},"Etc":{"UTC":{"long":{"standard":"Coordinated Universal Time"},"short":{"standard":"UTC"}},"Unknown":{"exemplarCity":"Unknown City"}}},"metazone":{"Acre":{"long":{"generic":"Acre Time","standard":"Acre Standard Time","daylight":"Acre Summer Time"}},"Afghanistan":{"long":{"standard":"Afghanistan Time"}},"Africa_Central":{"long":{"standard":"Central Africa Time"}},"Africa_Eastern":{"long":{"standard":"East Africa Time"}},"Africa_Southern":{"long":{"standard":"South Africa Standard Time"}},"Africa_Western":{"long":{"generic":"West Africa Time","standard":"West Africa Standard Time","daylight":"West Africa Summer Time"}},"Alaska":{"long":{"generic":"Alaska Time","standard":"Alaska Standard Time","daylight":"Alaska Daylight Time"},"short":{"generic":"AKT","standard":"AKST","daylight":"AKDT"}},"Almaty":{"long":{"generic":"Almaty Time","standard":"Almaty Standard Time","daylight":"Almaty Summer Time"}},"Amazon":{"long":{"generic":"Amazon Time","standard":"Amazon Standard Time","daylight":"Amazon Summer Time"}},"America_Central":{"long":{"generic":"Central Time","standard":"Central Standard Time","daylight":"Central Daylight Time"},"short":{"generic":"CT","standard":"CST","daylight":"CDT"}},"America_Eastern":{"long":{"generic":"Eastern Time","standard":"Eastern Standard Time","daylight":"Eastern Daylight Time"},"short":{"generic":"ET","standard":"EST","daylight":"EDT"}},"America_Mountain":{"long":{"generic":"Mountain Time","standard":"Mountain Standard Time","daylight":"Mountain Daylight Time"},"short":{"generic":"MT","standard":"MST","daylight":"MDT"}},"America_Pacific":{"long":{"generic":"Pacific Time","standard":"Pacific Standard Time","daylight":"Pacific Daylight Time"},"short":{"generic":"PT","standard":"PST","daylight":"PDT"}},"Anadyr":{"long":{"generic":"Anadyr Time","standard":"Anadyr Standard Time","daylight":"Anadyr Summer Time"}},"Apia":{"long":{"generic":"Apia Time","standard":"Apia Standard Time","daylight":"Apia Daylight Time"}},"Aqtau":{"long":{"generic":"Aqtau Time","standard":"Aqtau Standard Time","daylight":"Aqtau Summer Time"}},"Aqtobe":{"long":{"generic":"Aqtobe Time","standard":"Aqtobe Standard Time","daylight":"Aqtobe Summer Time"}},"Arabian":{"long":{"generic":"Arabian Time","standard":"Arabian Standard Time","daylight":"Arabian Daylight Time"}},"Argentina":{"long":{"generic":"Argentina Time","standard":"Argentina Standard Time","daylight":"Argentina Summer Time"}},"Argentina_Western":{"long":{"generic":"Western Argentina Time","standard":"Western Argentina Standard Time","daylight":"Western Argentina Summer Time"}},"Armenia":{"long":{"generic":"Armenia Time","standard":"Armenia Standard Time","daylight":"Armenia Summer Time"}},"Atlantic":{"long":{"generic":"Atlantic Time","standard":"Atlantic Standard Time","daylight":"Atlantic Daylight Time"},"short":{"generic":"AT","standard":"AST","daylight":"ADT"}},"Australia_Central":{"long":{"generic":"Central Australia Time","standard":"Australian Central Standard Time","daylight":"Australian Central Daylight Time"}},"Australia_CentralWestern":{"long":{"generic":"Australian Central Western Time","standard":"Australian Central Western Standard Time","daylight":"Australian Central Western Daylight Time"}},"Australia_Eastern":{"long":{"generic":"Eastern Australia Time","standard":"Australian Eastern Standard Time","daylight":"Australian Eastern Daylight Time"}},"Australia_Western":{"long":{"generic":"Western Australia Time","standard":"Australian Western Standard Time","daylight":"Australian Western Daylight Time"}},"Azerbaijan":{"long":{"generic":"Azerbaijan Time","standard":"Azerbaijan Standard Time","daylight":"Azerbaijan Summer Time"}},"Azores":{"long":{"generic":"Azores Time","standard":"Azores Standard Time","daylight":"Azores Summer Time"}},"Bangladesh":{"long":{"generic":"Bangladesh Time","standard":"Bangladesh Standard Time","daylight":"Bangladesh Summer Time"}},"Bhutan":{"long":{"standard":"Bhutan Time"}},"Bolivia":{"long":{"standard":"Bolivia Time"}},"Brasilia":{"long":{"generic":"Brasilia Time","standard":"Brasilia Standard Time","daylight":"Brasilia Summer Time"}},"Brunei":{"long":{"standard":"Brunei Darussalam Time"}},"Cape_Verde":{"long":{"generic":"Cape Verde Time","standard":"Cape Verde Standard Time","daylight":"Cape Verde Summer Time"}},"Casey":{"long":{"standard":"Casey Time"}},"Chamorro":{"long":{"standard":"Chamorro Standard Time"}},"Chatham":{"long":{"generic":"Chatham Time","standard":"Chatham Standard Time","daylight":"Chatham Daylight Time"}},"Chile":{"long":{"generic":"Chile Time","standard":"Chile Standard Time","daylight":"Chile Summer Time"}},"China":{"long":{"generic":"China Time","standard":"China Standard Time","daylight":"China Daylight Time"}},"Choibalsan":{"long":{"generic":"Choibalsan Time","standard":"Choibalsan Standard Time","daylight":"Choibalsan Summer Time"}},"Christmas":{"long":{"standard":"Christmas Island Time"}},"Cocos":{"long":{"standard":"Cocos Islands Time"}},"Colombia":{"long":{"generic":"Colombia Time","standard":"Colombia Standard Time","daylight":"Colombia Summer Time"}},"Cook":{"long":{"generic":"Cook Islands Time","standard":"Cook Islands Standard Time","daylight":"Cook Islands Half Summer Time"}},"Cuba":{"long":{"generic":"Cuba Time","standard":"Cuba Standard Time","daylight":"Cuba Daylight Time"}},"Davis":{"long":{"standard":"Davis Time"}},"DumontDUrville":{"long":{"standard":"Dumont-d’Urville Time"}},"East_Timor":{"long":{"standard":"East Timor Time"}},"Easter":{"long":{"generic":"Easter Island Time","standard":"Easter Island Standard Time","daylight":"Easter Island Summer Time"}},"Ecuador":{"long":{"standard":"Ecuador Time"}},"Europe_Central":{"long":{"generic":"Central European Time","standard":"Central European Standard Time","daylight":"Central European Summer Time"}},"Europe_Eastern":{"long":{"generic":"Eastern European Time","standard":"Eastern European Standard Time","daylight":"Eastern European Summer Time"}},"Europe_Further_Eastern":{"long":{"standard":"Further-eastern European Time"}},"Europe_Western":{"long":{"generic":"Western European Time","standard":"Western European Standard Time","daylight":"Western European Summer Time"}},"Falkland":{"long":{"generic":"Falkland Islands Time","standard":"Falkland Islands Standard Time","daylight":"Falkland Islands Summer Time"}},"Fiji":{"long":{"generic":"Fiji Time","standard":"Fiji Standard Time","daylight":"Fiji Summer Time"}},"French_Guiana":{"long":{"standard":"French Guiana Time"}},"French_Southern":{"long":{"standard":"French Southern & Antarctic Time"}},"Galapagos":{"long":{"standard":"Galapagos Time"}},"Gambier":{"long":{"standard":"Gambier Time"}},"Georgia":{"long":{"generic":"Georgia Time","standard":"Georgia Standard Time","daylight":"Georgia Summer Time"}},"Gilbert_Islands":{"long":{"standard":"Gilbert Islands Time"}},"GMT":{"long":{"standard":"Greenwich Mean Time"},"short":{"standard":"GMT"}},"Greenland_Eastern":{"long":{"generic":"East Greenland Time","standard":"East Greenland Standard Time","daylight":"East Greenland Summer Time"}},"Greenland_Western":{"long":{"generic":"West Greenland Time","standard":"West Greenland Standard Time","daylight":"West Greenland Summer Time"}},"Guam":{"long":{"standard":"Guam Standard Time"}},"Gulf":{"long":{"standard":"Gulf Standard Time"}},"Guyana":{"long":{"standard":"Guyana Time"}},"Hawaii_Aleutian":{"long":{"generic":"Hawaii-Aleutian Time","standard":"Hawaii-Aleutian Standard Time","daylight":"Hawaii-Aleutian Daylight Time"},"short":{"generic":"HAT","standard":"HAST","daylight":"HADT"}},"Hong_Kong":{"long":{"generic":"Hong Kong Time","standard":"Hong Kong Standard Time","daylight":"Hong Kong Summer Time"}},"Hovd":{"long":{"generic":"Hovd Time","standard":"Hovd Standard Time","daylight":"Hovd Summer Time"}},"India":{"long":{"standard":"India Standard Time"}},"Indian_Ocean":{"long":{"standard":"Indian Ocean Time"}},"Indochina":{"long":{"standard":"Indochina Time"}},"Indonesia_Central":{"long":{"standard":"Central Indonesia Time"}},"Indonesia_Eastern":{"long":{"standard":"Eastern Indonesia Time"}},"Indonesia_Western":{"long":{"standard":"Western Indonesia Time"}},"Iran":{"long":{"generic":"Iran Time","standard":"Iran Standard Time","daylight":"Iran Daylight Time"}},"Irkutsk":{"long":{"generic":"Irkutsk Time","standard":"Irkutsk Standard Time","daylight":"Irkutsk Summer Time"}},"Israel":{"long":{"generic":"Israel Time","standard":"Israel Standard Time","daylight":"Israel Daylight Time"}},"Japan":{"long":{"generic":"Japan Time","standard":"Japan Standard Time","daylight":"Japan Daylight Time"}},"Kamchatka":{"long":{"generic":"Petropavlovsk-Kamchatski Time","standard":"Petropavlovsk-Kamchatski Standard Time","daylight":"Petropavlovsk-Kamchatski Summer Time"}},"Kazakhstan_Eastern":{"long":{"standard":"East Kazakhstan Time"}},"Kazakhstan_Western":{"long":{"standard":"West Kazakhstan Time"}},"Korea":{"long":{"generic":"Korean Time","standard":"Korean Standard Time","daylight":"Korean Daylight Time"}},"Kosrae":{"long":{"standard":"Kosrae Time"}},"Krasnoyarsk":{"long":{"generic":"Krasnoyarsk Time","standard":"Krasnoyarsk Standard Time","daylight":"Krasnoyarsk Summer Time"}},"Kyrgystan":{"long":{"standard":"Kyrgyzstan Time"}},"Lanka":{"long":{"standard":"Lanka Time"}},"Line_Islands":{"long":{"standard":"Line Islands Time"}},"Lord_Howe":{"long":{"generic":"Lord Howe Time","standard":"Lord Howe Standard Time","daylight":"Lord Howe Daylight Time"}},"Macau":{"long":{"generic":"Macau Time","standard":"Macau Standard Time","daylight":"Macau Summer Time"}},"Macquarie":{"long":{"standard":"Macquarie Island Time"}},"Magadan":{"long":{"generic":"Magadan Time","standard":"Magadan Standard Time","daylight":"Magadan Summer Time"}},"Malaysia":{"long":{"standard":"Malaysia Time"}},"Maldives":{"long":{"standard":"Maldives Time"}},"Marquesas":{"long":{"standard":"Marquesas Time"}},"Marshall_Islands":{"long":{"standard":"Marshall Islands Time"}},"Mauritius":{"long":{"generic":"Mauritius Time","standard":"Mauritius Standard Time","daylight":"Mauritius Summer Time"}},"Mawson":{"long":{"standard":"Mawson Time"}},"Mexico_Northwest":{"long":{"generic":"Northwest Mexico Time","standard":"Northwest Mexico Standard Time","daylight":"Northwest Mexico Daylight Time"}},"Mexico_Pacific":{"long":{"generic":"Mexican Pacific Time","standard":"Mexican Pacific Standard Time","daylight":"Mexican Pacific Daylight Time"}},"Mongolia":{"long":{"generic":"Ulaanbaatar Time","standard":"Ulaanbaatar Standard Time","daylight":"Ulaanbaatar Summer Time"}},"Moscow":{"long":{"generic":"Moscow Time","standard":"Moscow Standard Time","daylight":"Moscow Summer Time"}},"Myanmar":{"long":{"standard":"Myanmar Time"}},"Nauru":{"long":{"standard":"Nauru Time"}},"Nepal":{"long":{"standard":"Nepal Time"}},"New_Caledonia":{"long":{"generic":"New Caledonia Time","standard":"New Caledonia Standard Time","daylight":"New Caledonia Summer Time"}},"New_Zealand":{"long":{"generic":"New Zealand Time","standard":"New Zealand Standard Time","daylight":"New Zealand Daylight Time"}},"Newfoundland":{"long":{"generic":"Newfoundland Time","standard":"Newfoundland Standard Time","daylight":"Newfoundland Daylight Time"}},"Niue":{"long":{"standard":"Niue Time"}},"Norfolk":{"long":{"standard":"Norfolk Island Time"}},"Noronha":{"long":{"generic":"Fernando de Noronha Time","standard":"Fernando de Noronha Standard Time","daylight":"Fernando de Noronha Summer Time"}},"North_Mariana":{"long":{"standard":"North Mariana Islands Time"}},"Novosibirsk":{"long":{"generic":"Novosibirsk Time","standard":"Novosibirsk Standard Time","daylight":"Novosibirsk Summer Time"}},"Omsk":{"long":{"generic":"Omsk Time","standard":"Omsk Standard Time","daylight":"Omsk Summer Time"}},"Pakistan":{"long":{"generic":"Pakistan Time","standard":"Pakistan Standard Time","daylight":"Pakistan Summer Time"}},"Palau":{"long":{"standard":"Palau Time"}},"Papua_New_Guinea":{"long":{"standard":"Papua New Guinea Time"}},"Paraguay":{"long":{"generic":"Paraguay Time","standard":"Paraguay Standard Time","daylight":"Paraguay Summer Time"}},"Peru":{"long":{"generic":"Peru Time","standard":"Peru Standard Time","daylight":"Peru Summer Time"}},"Philippines":{"long":{"generic":"Philippine Time","standard":"Philippine Standard Time","daylight":"Philippine Summer Time"}},"Phoenix_Islands":{"long":{"standard":"Phoenix Islands Time"}},"Pierre_Miquelon":{"long":{"generic":"St. Pierre & Miquelon Time","standard":"St. Pierre & Miquelon Standard Time","daylight":"St. Pierre & Miquelon Daylight Time"}},"Pitcairn":{"long":{"standard":"Pitcairn Time"}},"Ponape":{"long":{"standard":"Ponape Time"}},"Pyongyang":{"long":{"standard":"Pyongyang Time"}},"Qyzylorda":{"long":{"generic":"Qyzylorda Time","standard":"Qyzylorda Standard Time","daylight":"Qyzylorda Summer Time"}},"Reunion":{"long":{"standard":"Réunion Time"}},"Rothera":{"long":{"standard":"Rothera Time"}},"Sakhalin":{"long":{"generic":"Sakhalin Time","standard":"Sakhalin Standard Time","daylight":"Sakhalin Summer Time"}},"Samara":{"long":{"generic":"Samara Time","standard":"Samara Standard Time","daylight":"Samara Summer Time"}},"Samoa":{"long":{"generic":"Samoa Time","standard":"Samoa Standard Time","daylight":"Samoa Daylight Time"}},"Seychelles":{"long":{"standard":"Seychelles Time"}},"Singapore":{"long":{"standard":"Singapore Standard Time"}},"Solomon":{"long":{"standard":"Solomon Islands Time"}},"South_Georgia":{"long":{"standard":"South Georgia Time"}},"Suriname":{"long":{"standard":"Suriname Time"}},"Syowa":{"long":{"standard":"Syowa Time"}},"Tahiti":{"long":{"standard":"Tahiti Time"}},"Taipei":{"long":{"generic":"Taipei Time","standard":"Taipei Standard Time","daylight":"Taipei Daylight Time"}},"Tajikistan":{"long":{"standard":"Tajikistan Time"}},"Tokelau":{"long":{"standard":"Tokelau Time"}},"Tonga":{"long":{"generic":"Tonga Time","standard":"Tonga Standard Time","daylight":"Tonga Summer Time"}},"Truk":{"long":{"standard":"Chuuk Time"}},"Turkmenistan":{"long":{"generic":"Turkmenistan Time","standard":"Turkmenistan Standard Time","daylight":"Turkmenistan Summer Time"}},"Tuvalu":{"long":{"standard":"Tuvalu Time"}},"Uruguay":{"long":{"generic":"Uruguay Time","standard":"Uruguay Standard Time","daylight":"Uruguay Summer Time"}},"Uzbekistan":{"long":{"generic":"Uzbekistan Time","standard":"Uzbekistan Standard Time","daylight":"Uzbekistan Summer Time"}},"Vanuatu":{"long":{"generic":"Vanuatu Time","standard":"Vanuatu Standard Time","daylight":"Vanuatu Summer Time"}},"Venezuela":{"long":{"standard":"Venezuela Time"}},"Vladivostok":{"long":{"generic":"Vladivostok Time","standard":"Vladivostok Standard Time","daylight":"Vladivostok Summer Time"}},"Volgograd":{"long":{"generic":"Volgograd Time","standard":"Volgograd Standard Time","daylight":"Volgograd Summer Time"}},"Vostok":{"long":{"standard":"Vostok Time"}},"Wake":{"long":{"standard":"Wake Island Time"}},"Wallis":{"long":{"standard":"Wallis & Futuna Time"}},"Yakutsk":{"long":{"generic":"Yakutsk Time","standard":"Yakutsk Standard Time","daylight":"Yakutsk Summer Time"}},"Yekaterinburg":{"long":{"generic":"Yekaterinburg Time","standard":"Yekaterinburg Standard Time","daylight":"Yekaterinburg Summer Time"}}}}},"numbers":{"defaultNumberingSystem":"latn","otherNumberingSystems":{"native":"latn"},"minimumGroupingDigits":"1","symbols-numberSystem-latn":{"decimal":".","group":",","list":";","percentSign":"%","plusSign":"+","minusSign":"-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"NaN","timeSeparator":":"},"decimalFormats-numberSystem-latn":{"standard":"#,##0.###","long":{"decimalFormat":{"1000-count-one":"0 thousand","1000-count-other":"0 thousand","10000-count-one":"00 thousand","10000-count-other":"00 thousand","100000-count-one":"000 thousand","100000-count-other":"000 thousand","1000000-count-one":"0 million","1000000-count-other":"0 million","10000000-count-one":"00 million","10000000-count-other":"00 million","100000000-count-one":"000 million","100000000-count-other":"000 million","1000000000-count-one":"0 billion","1000000000-count-other":"0 billion","10000000000-count-one":"00 billion","10000000000-count-other":"00 billion","100000000000-count-one":"000 billion","100000000000-count-other":"000 billion","1000000000000-count-one":"0 trillion","1000000000000-count-other":"0 trillion","10000000000000-count-one":"00 trillion","10000000000000-count-other":"00 trillion","100000000000000-count-one":"000 trillion","100000000000000-count-other":"000 trillion"}},"short":{"decimalFormat":{"1000-count-one":"0K","1000-count-other":"0K","10000-count-one":"00K","10000-count-other":"00K","100000-count-one":"000K","100000-count-other":"000K","1000000-count-one":"0M","1000000-count-other":"0M","10000000-count-one":"00M","10000000-count-other":"00M","100000000-count-one":"000M","100000000-count-other":"000M","1000000000-count-one":"0B","1000000000-count-other":"0B","10000000000-count-one":"00B","10000000000-count-other":"00B","100000000000-count-one":"000B","100000000000-count-other":"000B","1000000000000-count-one":"0T","1000000000000-count-other":"0T","10000000000000-count-one":"00T","10000000000000-count-other":"00T","100000000000000-count-one":"000T","100000000000000-count-other":"000T"}}},"scientificFormats-numberSystem-latn":{"standard":"#E0"},"percentFormats-numberSystem-latn":{"standard":"#,##0%"},"currencyFormats-numberSystem-latn":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"¤#,##0.00","accounting":"¤#,##0.00;(¤#,##0.00)","short":{"standard":{"1000-count-one":"¤0K","1000-count-other":"¤0K","10000-count-one":"¤00K","10000-count-other":"¤00K","100000-count-one":"¤000K","100000-count-other":"¤000K","1000000-count-one":"¤0M","1000000-count-other":"¤0M","10000000-count-one":"¤00M","10000000-count-other":"¤00M","100000000-count-one":"¤000M","100000000-count-other":"¤000M","1000000000-count-one":"¤0B","1000000000-count-other":"¤0B","10000000000-count-one":"¤00B","10000000000-count-other":"¤00B","100000000000-count-one":"¤000B","100000000000-count-other":"¤000B","1000000000000-count-one":"¤0T","1000000000000-count-other":"¤0T","10000000000000-count-one":"¤00T","10000000000000-count-other":"¤00T","100000000000000-count-one":"¤000T","100000000000000-count-other":"¤000T"}},"unitPattern-count-one":"{0} {1}","unitPattern-count-other":"{0} {1}"},"miscPatterns-numberSystem-latn":{"atLeast":"{0}+","range":"{0}–{1}"},"minimalPairs":{"pluralMinimalPairs-count-one":"{0} day","pluralMinimalPairs-count-other":"{0} days","few":"Take the {0}rd right.","one":"Take the {0}st right.","other":"Take the {0}th right.","two":"Take the {0}nd right."}}},"es":{"identity":{"version":{"_number":"$Revision: 13920 $","_cldrVersion":"33"},"language":"es"},"dates":{"calendars":{"gregorian":{"months":{"format":{"abbreviated":{"1":"ene.","2":"feb.","3":"mar.","4":"abr.","5":"may.","6":"jun.","7":"jul.","8":"ago.","9":"sept.","10":"oct.","11":"nov.","12":"dic."},"narrow":{"1":"E","2":"F","3":"M","4":"A","5":"M","6":"J","7":"J","8":"A","9":"S","10":"O","11":"N","12":"D"},"wide":{"1":"enero","2":"febrero","3":"marzo","4":"abril","5":"mayo","6":"junio","7":"julio","8":"agosto","9":"septiembre","10":"octubre","11":"noviembre","12":"diciembre"}},"stand-alone":{"abbreviated":{"1":"ene.","2":"feb.","3":"mar.","4":"abr.","5":"may.","6":"jun.","7":"jul.","8":"ago.","9":"sept.","10":"oct.","11":"nov.","12":"dic."},"narrow":{"1":"E","2":"F","3":"M","4":"A","5":"M","6":"J","7":"J","8":"A","9":"S","10":"O","11":"N","12":"D"},"wide":{"1":"enero","2":"febrero","3":"marzo","4":"abril","5":"mayo","6":"junio","7":"julio","8":"agosto","9":"septiembre","10":"octubre","11":"noviembre","12":"diciembre"}}},"days":{"format":{"abbreviated":{"sun":"dom.","mon":"lun.","tue":"mar.","wed":"mié.","thu":"jue.","fri":"vie.","sat":"sáb."},"narrow":{"sun":"D","mon":"L","tue":"M","wed":"X","thu":"J","fri":"V","sat":"S"},"short":{"sun":"DO","mon":"LU","tue":"MA","wed":"MI","thu":"JU","fri":"VI","sat":"SA"},"wide":{"sun":"domingo","mon":"lunes","tue":"martes","wed":"miércoles","thu":"jueves","fri":"viernes","sat":"sábado"}},"stand-alone":{"abbreviated":{"sun":"dom.","mon":"lun.","tue":"mar.","wed":"mié.","thu":"jue.","fri":"vie.","sat":"sáb."},"narrow":{"sun":"D","mon":"L","tue":"M","wed":"X","thu":"J","fri":"V","sat":"S"},"short":{"sun":"DO","mon":"LU","tue":"MA","wed":"MI","thu":"JU","fri":"VI","sat":"SA"},"wide":{"sun":"domingo","mon":"lunes","tue":"martes","wed":"miércoles","thu":"jueves","fri":"viernes","sat":"sábado"}}},"quarters":{"format":{"abbreviated":{"1":"T1","2":"T2","3":"T3","4":"T4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"1.er trimestre","2":"2.º trimestre","3":"3.er trimestre","4":"4.º trimestre"}},"stand-alone":{"abbreviated":{"1":"T1","2":"T2","3":"T3","4":"T4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"1.er trimestre","2":"2.º trimestre","3":"3.er trimestre","4":"4.º trimestre"}}},"dayPeriods":{"format":{"abbreviated":{"am":"a. m.","noon":"del mediodía","pm":"p. m.","morning1":"de la madrugada","morning2":"de la mañana","evening1":"de la tarde","night1":"de la noche"},"narrow":{"am":"a. m.","noon":"del mediodía","pm":"p. m.","morning1":"de la madrugada","morning2":"de la mañana","evening1":"de la tarde","night1":"de la noche"},"wide":{"am":"a. m.","noon":"del mediodía","pm":"p. m.","morning1":"de la madrugada","morning2":"de la mañana","evening1":"de la tarde","night1":"de la noche"}},"stand-alone":{"abbreviated":{"am":"a. m.","noon":"mediodía","pm":"p. m.","morning1":"madrugada","morning2":"mañana","evening1":"tarde","night1":"noche"},"narrow":{"am":"a. m.","noon":"mediodía","pm":"p. m.","morning1":"madrugada","morning2":"mañana","evening1":"tarde","night1":"noche"},"wide":{"am":"a. m.","noon":"mediodía","pm":"p. m.","morning1":"madrugada","morning2":"mañana","evening1":"tarde","night1":"noche"}}},"eras":{"eraNames":{"0":"antes de Cristo","1":"después de Cristo","0-alt-variant":"antes de la era común","1-alt-variant":"era común"},"eraAbbr":{"0":"a. C.","1":"d. C.","0-alt-variant":"a. e. c.","1-alt-variant":"e. c."},"eraNarrow":{"0":"a. C.","1":"d. C.","0-alt-variant":"a. e. c.","1-alt-variant":"e. c."}},"dateFormats":{"full":"EEEE, d 'de' MMMM 'de' y","long":"d 'de' MMMM 'de' y","medium":"d MMM y","short":"d/M/yy"},"timeFormats":{"full":"H:mm:ss (zzzz)","long":"H:mm:ss z","medium":"H:mm:ss","short":"H:mm"},"dateTimeFormats":{"full":"{1}, {0}","long":"{1}, {0}","medium":"{1} {0}","short":"{1} {0}","availableFormats":{"Bh":"h B","Bhm":"h:mm B","Bhms":"h:mm:ss B","d":"d","E":"ccc","EBhm":"E h:mm B","EBhms":"E h:mm:ss B","Ed":"E d","Ehm":"E, h:mm a","EHm":"E, H:mm","Ehms":"E, h:mm:ss a","EHms":"E, H:mm:ss","Gy":"y G","GyMMM":"MMM y G","GyMMMd":"d MMM y G","GyMMMEd":"E, d MMM y G","GyMMMM":"MMMM 'de' y G","GyMMMMd":"d 'de' MMMM 'de' y G","GyMMMMEd":"E, d 'de' MMMM 'de' y G","h":"h a","H":"H","hm":"h:mm a","Hm":"H:mm","hms":"h:mm:ss a","Hms":"H:mm:ss","hmsv":"h:mm:ss a v","Hmsv":"H:mm:ss v","hmsvvvv":"h:mm:ss a (vvvv)","Hmsvvvv":"H:mm:ss (vvvv)","hmv":"h:mm a v","Hmv":"H:mm v","M":"L","Md":"d/M","MEd":"E, d/M","MMd":"d/M","MMdd":"d/M","MMM":"LLL","MMMd":"d MMM","MMMEd":"E, d MMM","MMMMd":"d 'de' MMMM","MMMMEd":"E, d 'de' MMMM","MMMMW-count-one":"'semana' W 'de' MMM","MMMMW-count-other":"'semana' W 'de' MMM","ms":"mm:ss","y":"y","yM":"M/y","yMd":"d/M/y","yMEd":"EEE, d/M/y","yMM":"M/y","yMMM":"MMM y","yMMMd":"d MMM y","yMMMEd":"EEE, d MMM y","yMMMM":"MMMM 'de' y","yMMMMd":"d 'de' MMMM 'de' y","yMMMMEd":"EEE, d 'de' MMMM 'de' y","yQQQ":"QQQ y","yQQQQ":"QQQQ 'de' y","yw-count-one":"'semana' w 'de' y","yw-count-other":"'semana' w 'de' y"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{1} {0}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{1} {0}"},"intervalFormats":{"intervalFormatFallback":"{0}–{1}","d":{"d":"d–d"},"h":{"a":"h a – h a","h":"h–h a"},"H":{"H":"H–H"},"hm":{"a":"h:mm a – h:mm a","h":"h:mm – h:mm a","m":"h:mm – h:mm a"},"Hm":{"H":"H:mm–H:mm","m":"H:mm–H:mm"},"hmv":{"a":"h:mm a – h:mm a v","h":"h:mm–h:mm a v","m":"h:mm–h:mm a v"},"Hmv":{"H":"H:mm–H:mm v","m":"H:mm–H:mm v"},"hv":{"a":"h a – h a v","h":"h–h a v"},"Hv":{"H":"H–H v"},"M":{"M":"M–M"},"Md":{"d":"d/M–d/M","M":"d/M–d/M"},"MEd":{"d":"E, d/M – E, d/M","M":"E, d/M – E, d/M"},"MMM":{"M":"MMM–MMM"},"MMMd":{"d":"d–d MMM","M":"d MMM – d MMM"},"MMMEd":{"d":"E, d MMM – E, d MMM","M":"E, d MMM – E, d MMM"},"MMMMd":{"d":"d–d 'de' MMMM","M":"d 'de' MMMM–d 'de' MMMM"},"MMMMEd":{"d":"E, d 'de' MMMM–E, d 'de' MMMM","M":"E, d 'de' MMMM–E, d 'de' MMMM"},"y":{"y":"y–y"},"yM":{"M":"M/y–M/y","y":"M/y–M/y"},"yMd":{"d":"d/M/y–d/M/y","M":"d/M/y–d/M/y","y":"d/M/y–d/M/y"},"yMEd":{"d":"E, d/M/y – E, d/M/y","M":"E, d/M/y – E, d/M/y","y":"E, d/M/y – E, d/M/y"},"yMMM":{"M":"MMM–MMM y","y":"MMM y – MMM y"},"yMMMd":{"d":"d–d MMM y","M":"d MMM – d MMM y","y":"d MMM y – d MMM y"},"yMMMEd":{"d":"E, d MMM – E, d MMM y","M":"E, d MMM – E, d MMM y","y":"E, d MMM y – E, d MMM y"},"yMMMM":{"M":"MMMM–MMMM 'de' y","y":"MMMM 'de' y – MMMM 'de' y"},"yMMMMd":{"d":"d–d 'de' MMMM 'de' y","M":"d 'de' MMMM–d 'de' MMMM 'de' y","y":"d 'de' MMMM 'de' y–d 'de' MMMM 'de' y"},"yMMMMEd":{"d":"E, d 'de' MMMM–E, d 'de' MMMM 'de' y","M":"E, d 'de' MMMM–E, d 'de' MMMM 'de' y","y":"E, d 'de' MMMM 'de' y–E, d 'de' MMMM 'de' y"}}}}},"fields":{"era":{"displayName":"era"},"era-short":{"displayName":"era"},"era-narrow":{"displayName":"era"},"year":{"displayName":"año","relative-type--1":"el año pasado","relative-type-0":"este año","relative-type-1":"el próximo año","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} año","relativeTimePattern-count-other":"dentro de {0} años"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} año","relativeTimePattern-count-other":"hace {0} años"}},"year-short":{"displayName":"a","relative-type--1":"el año pasado","relative-type-0":"este año","relative-type-1":"el próximo año","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} a","relativeTimePattern-count-other":"dentro de {0} a"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} a","relativeTimePattern-count-other":"hace {0} a"}},"year-narrow":{"displayName":"a","relative-type--1":"el año pasado","relative-type-0":"este año","relative-type-1":"el próximo año","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} a","relativeTimePattern-count-other":"dentro de {0} a"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} a","relativeTimePattern-count-other":"hace {0} a"}},"quarter":{"displayName":"trimestre","relative-type--1":"el trimestre pasado","relative-type-0":"este trimestre","relative-type-1":"el próximo trimestre","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} trimestre","relativeTimePattern-count-other":"dentro de {0} trimestres"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} trimestre","relativeTimePattern-count-other":"hace {0} trimestres"}},"quarter-short":{"displayName":"trim.","relative-type--1":"el trimestre pasado","relative-type-0":"este trimestre","relative-type-1":"el próximo trimestre","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} trim.","relativeTimePattern-count-other":"dentro de {0} trim."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} trim.","relativeTimePattern-count-other":"hace {0} trim."}},"quarter-narrow":{"displayName":"trim.","relative-type--1":"el trimestre pasado","relative-type-0":"este trimestre","relative-type-1":"el próximo trimestre","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} trim.","relativeTimePattern-count-other":"dentro de {0} trim."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} trim.","relativeTimePattern-count-other":"hace {0} trim."}},"month":{"displayName":"mes","relative-type--1":"el mes pasado","relative-type-0":"este mes","relative-type-1":"el próximo mes","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} mes","relativeTimePattern-count-other":"dentro de {0} meses"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} mes","relativeTimePattern-count-other":"hace {0} meses"}},"month-short":{"displayName":"m","relative-type--1":"el mes pasado","relative-type-0":"este mes","relative-type-1":"el próximo mes","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} m","relativeTimePattern-count-other":"dentro de {0} m"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} m","relativeTimePattern-count-other":"hace {0} m"}},"month-narrow":{"displayName":"m","relative-type--1":"el mes pasado","relative-type-0":"este mes","relative-type-1":"el próximo mes","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} m","relativeTimePattern-count-other":"dentro de {0} m"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} m","relativeTimePattern-count-other":"hace {0} m"}},"week":{"displayName":"semana","relative-type--1":"la semana pasada","relative-type-0":"esta semana","relative-type-1":"la próxima semana","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} semana","relativeTimePattern-count-other":"dentro de {0} semanas"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} semana","relativeTimePattern-count-other":"hace {0} semanas"},"relativePeriod":"la semana del {0}"},"week-short":{"displayName":"sem.","relative-type--1":"la semana pasada","relative-type-0":"esta semana","relative-type-1":"la próxima semana","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} sem.","relativeTimePattern-count-other":"dentro de {0} sem."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} sem.","relativeTimePattern-count-other":"hace {0} sem."},"relativePeriod":"la sem. del {0}"},"week-narrow":{"displayName":"sem.","relative-type--1":"la semana pasada","relative-type-0":"esta semana","relative-type-1":"la próxima semana","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} sem.","relativeTimePattern-count-other":"dentro de {0} sem."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} sem.","relativeTimePattern-count-other":"hace {0} sem."},"relativePeriod":"la sem. del {0}"},"weekOfMonth":{"displayName":"semana del mes"},"weekOfMonth-short":{"displayName":"sem. de mes"},"weekOfMonth-narrow":{"displayName":"sem. de mes"},"day":{"displayName":"día","relative-type--2":"anteayer","relative-type--1":"ayer","relative-type-0":"hoy","relative-type-1":"mañana","relative-type-2":"pasado mañana","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} día","relativeTimePattern-count-other":"dentro de {0} días"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} día","relativeTimePattern-count-other":"hace {0} días"}},"day-short":{"displayName":"d","relative-type--2":"anteayer","relative-type--1":"ayer","relative-type-0":"hoy","relative-type-1":"mañana","relative-type-2":"pasado mañana","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} día","relativeTimePattern-count-other":"dentro de {0} días"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} día","relativeTimePattern-count-other":"hace {0} días"}},"day-narrow":{"displayName":"d","relative-type--2":"anteayer","relative-type--1":"ayer","relative-type-0":"hoy","relative-type-1":"mañana","relative-type-2":"pasado mañana","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} día","relativeTimePattern-count-other":"dentro de {0} días"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} día","relativeTimePattern-count-other":"hace {0} días"}},"dayOfYear":{"displayName":"día del año"},"dayOfYear-short":{"displayName":"día del a"},"dayOfYear-narrow":{"displayName":"día del a"},"weekday":{"displayName":"día de la semana"},"weekday-short":{"displayName":"día de sem."},"weekday-narrow":{"displayName":"día de sem."},"weekdayOfMonth":{"displayName":"día de la semana del mes"},"weekdayOfMonth-short":{"displayName":"día de sem. de mes"},"weekdayOfMonth-narrow":{"displayName":"día de sem. de mes"},"sun":{"relative-type--1":"el domingo pasado","relative-type-0":"este domingo","relative-type-1":"el próximo domingo","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} domingo","relativeTimePattern-count-other":"dentro de {0} domingos"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} domingo","relativeTimePattern-count-other":"hace {0} domingos"}},"sun-short":{"relative-type--1":"el dom. pasado","relative-type-0":"este dom.","relative-type-1":"el próximo dom.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} dom.","relativeTimePattern-count-other":"dentro de {0} dom."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} dom.","relativeTimePattern-count-other":"hace {0} dom."}},"sun-narrow":{"relative-type--1":"el DO pasado","relative-type-0":"este DO","relative-type-1":"el próximo DO","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} DO","relativeTimePattern-count-other":"dentro de {0} DO"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} DO","relativeTimePattern-count-other":"hace {0} DO"}},"mon":{"relative-type--1":"el lunes pasado","relative-type-0":"este lunes","relative-type-1":"el próximo lunes","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} lunes","relativeTimePattern-count-other":"dentro de {0} lunes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} lunes","relativeTimePattern-count-other":"hace {0} lunes"}},"mon-short":{"relative-type--1":"el lun. pasado","relative-type-0":"este lun.","relative-type-1":"el próximo lun.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} lun.","relativeTimePattern-count-other":"dentro de {0} lun."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} lun.","relativeTimePattern-count-other":"hace {0} lun."}},"mon-narrow":{"relative-type--1":"el LU pasado","relative-type-0":"este LU","relative-type-1":"el próximo LU","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} LU","relativeTimePattern-count-other":"dentro de {0} LU"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} LU","relativeTimePattern-count-other":"hace {0} LU"}},"tue":{"relative-type--1":"el martes pasado","relative-type-0":"este martes","relative-type-1":"el próximo martes","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} martes","relativeTimePattern-count-other":"dentro de {0} martes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} martes","relativeTimePattern-count-other":"hace {0} martes"}},"tue-short":{"relative-type--1":"el mar. pasado","relative-type-0":"este mar.","relative-type-1":"el próximo mar.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} mar.","relativeTimePattern-count-other":"dentro de {0} mar."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} mar.","relativeTimePattern-count-other":"hace {0} mar."}},"tue-narrow":{"relative-type--1":"el MA pasado","relative-type-0":"este MA","relative-type-1":"el próximo MA","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} MA","relativeTimePattern-count-other":"dentro de {0} MA"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} MA","relativeTimePattern-count-other":"hace {0} MA"}},"wed":{"relative-type--1":"el miércoles pasado","relative-type-0":"este miércoles","relative-type-1":"el próximo miércoles","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} miércoles","relativeTimePattern-count-other":"dentro de {0} miércoles"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} miércoles","relativeTimePattern-count-other":"hace {0} miércoles"}},"wed-short":{"relative-type--1":"el mié. pasado","relative-type-0":"este mié.","relative-type-1":"el próximo mié.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} mié.","relativeTimePattern-count-other":"dentro de {0} mié."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} mié.","relativeTimePattern-count-other":"hace {0} mié."}},"wed-narrow":{"relative-type--1":"el MI pasado","relative-type-0":"este MI","relative-type-1":"el próximo MI","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} MI","relativeTimePattern-count-other":"dentro de {0} MI"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} MI","relativeTimePattern-count-other":"hace {0} MI"}},"thu":{"relative-type--1":"el jueves pasado","relative-type-0":"este jueves","relative-type-1":"el próximo jueves","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} jueves","relativeTimePattern-count-other":"dentro de {0} jueves"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} jueves","relativeTimePattern-count-other":"hace {0} jueves"}},"thu-short":{"relative-type--1":"el jue. pasado","relative-type-0":"este jue.","relative-type-1":"el próximo jue.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} jue.","relativeTimePattern-count-other":"dentro de {0} jue."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} jue.","relativeTimePattern-count-other":"hace {0} jue."}},"thu-narrow":{"relative-type--1":"el JU pasado","relative-type-0":"este JU","relative-type-1":"el próximo JU","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} JU","relativeTimePattern-count-other":"dentro de {0} JU"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} JU","relativeTimePattern-count-other":"hace {0} JU"}},"fri":{"relative-type--1":"el viernes pasado","relative-type-0":"este viernes","relative-type-1":"el próximo viernes","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} viernes","relativeTimePattern-count-other":"dentro de {0} viernes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} viernes","relativeTimePattern-count-other":"hace {0} viernes"}},"fri-short":{"relative-type--1":"el vie. pasado","relative-type-0":"este vie.","relative-type-1":"el próximo vie.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} vie.","relativeTimePattern-count-other":"dentro de {0} vie."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} vie.","relativeTimePattern-count-other":"hace {0} vie."}},"fri-narrow":{"relative-type--1":"el VI pasado","relative-type-0":"este VI","relative-type-1":"el próximo VI","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} VI","relativeTimePattern-count-other":"dentro de {0} VI"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} VI","relativeTimePattern-count-other":"hace {0} VI"}},"sat":{"relative-type--1":"el sábado pasado","relative-type-0":"este sábado","relative-type-1":"el próximo sábado","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} sábado","relativeTimePattern-count-other":"dentro de {0} sábados"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} sábado","relativeTimePattern-count-other":"hace {0} sábados"}},"sat-short":{"relative-type--1":"el sáb. pasado","relative-type-0":"este sáb.","relative-type-1":"el próximo sáb.","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} sáb.","relativeTimePattern-count-other":"dentro de {0} sáb."},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} sáb.","relativeTimePattern-count-other":"hace {0} sáb."}},"sat-narrow":{"relative-type--1":"el SA pasado","relative-type-0":"este SA","relative-type-1":"el próximo SA","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} SA","relativeTimePattern-count-other":"dentro de {0} SA"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} SA","relativeTimePattern-count-other":"hace {0} SA"}},"dayperiod-short":{"displayName":"a. m./p. m."},"dayperiod":{"displayName":"a. m./p. m."},"dayperiod-narrow":{"displayName":"a. m./p. m."},"hour":{"displayName":"hora","relative-type-0":"esta hora","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} hora","relativeTimePattern-count-other":"dentro de {0} horas"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} hora","relativeTimePattern-count-other":"hace {0} horas"}},"hour-short":{"displayName":"h","relative-type-0":"esta hora","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} h","relativeTimePattern-count-other":"dentro de {0} h"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} h","relativeTimePattern-count-other":"hace {0} h"}},"hour-narrow":{"displayName":"h","relative-type-0":"esta hora","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} h","relativeTimePattern-count-other":"dentro de {0} h"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} h","relativeTimePattern-count-other":"hace {0} h"}},"minute":{"displayName":"minuto","relative-type-0":"este minuto","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} minuto","relativeTimePattern-count-other":"dentro de {0} minutos"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} minuto","relativeTimePattern-count-other":"hace {0} minutos"}},"minute-short":{"displayName":"min","relative-type-0":"este minuto","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} min","relativeTimePattern-count-other":"dentro de {0} min"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} min","relativeTimePattern-count-other":"hace {0} min"}},"minute-narrow":{"displayName":"min","relative-type-0":"este minuto","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} min","relativeTimePattern-count-other":"dentro de {0} min"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} min","relativeTimePattern-count-other":"hace {0} min"}},"second":{"displayName":"segundo","relative-type-0":"ahora","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} segundo","relativeTimePattern-count-other":"dentro de {0} segundos"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} segundo","relativeTimePattern-count-other":"hace {0} segundos"}},"second-short":{"displayName":"s","relative-type-0":"ahora","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} s","relativeTimePattern-count-other":"dentro de {0} s"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} s","relativeTimePattern-count-other":"hace {0} s"}},"second-narrow":{"displayName":"s","relative-type-0":"ahora","relativeTime-type-future":{"relativeTimePattern-count-one":"dentro de {0} s","relativeTimePattern-count-other":"dentro de {0} s"},"relativeTime-type-past":{"relativeTimePattern-count-one":"hace {0} s","relativeTimePattern-count-other":"hace {0} s"}},"zone":{"displayName":"zona horaria"},"zone-short":{"displayName":"zona"},"zone-narrow":{"displayName":"zona"}},"timeZoneNames":{"hourFormat":"+HH:mm;-HH:mm","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","regionFormat":"hora de {0}","regionFormat-type-daylight":"horario de verano de {0}","regionFormat-type-standard":"horario estándar de {0}","fallbackFormat":"{1} ({0})","zone":{"America":{"Adak":{"exemplarCity":"Adak"},"Anchorage":{"exemplarCity":"Anchorage"},"Anguilla":{"exemplarCity":"Anguila"},"Antigua":{"exemplarCity":"Antigua"},"Araguaina":{"exemplarCity":"Araguaína"},"Argentina":{"Rio_Gallegos":{"exemplarCity":"Río Gallegos"},"San_Juan":{"exemplarCity":"San Juan"},"Ushuaia":{"exemplarCity":"Ushuaia"},"La_Rioja":{"exemplarCity":"La Rioja"},"San_Luis":{"exemplarCity":"San Luis"},"Salta":{"exemplarCity":"Salta"},"Tucuman":{"exemplarCity":"Tucumán"}},"Aruba":{"exemplarCity":"Aruba"},"Asuncion":{"exemplarCity":"Asunción"},"Bahia":{"exemplarCity":"Bahía"},"Bahia_Banderas":{"exemplarCity":"Bahía de Banderas"},"Barbados":{"exemplarCity":"Barbados"},"Belem":{"exemplarCity":"Belén"},"Belize":{"exemplarCity":"Belice"},"Blanc-Sablon":{"exemplarCity":"Blanc-Sablon"},"Boa_Vista":{"exemplarCity":"Boa Vista"},"Bogota":{"exemplarCity":"Bogotá"},"Boise":{"exemplarCity":"Boise"},"Buenos_Aires":{"exemplarCity":"Buenos Aires"},"Cambridge_Bay":{"exemplarCity":"Cambridge Bay"},"Campo_Grande":{"exemplarCity":"Campo Grande"},"Cancun":{"exemplarCity":"Cancún"},"Caracas":{"exemplarCity":"Caracas"},"Catamarca":{"exemplarCity":"Catamarca"},"Cayenne":{"exemplarCity":"Cayena"},"Cayman":{"exemplarCity":"Caimán"},"Chicago":{"exemplarCity":"Chicago"},"Chihuahua":{"exemplarCity":"Chihuahua"},"Coral_Harbour":{"exemplarCity":"Atikokan"},"Cordoba":{"exemplarCity":"Córdoba"},"Costa_Rica":{"exemplarCity":"Costa Rica"},"Creston":{"exemplarCity":"Creston"},"Cuiaba":{"exemplarCity":"Cuiabá"},"Curacao":{"exemplarCity":"Curazao"},"Danmarkshavn":{"exemplarCity":"Danmarkshavn"},"Dawson":{"exemplarCity":"Dawson"},"Dawson_Creek":{"exemplarCity":"Dawson Creek"},"Denver":{"exemplarCity":"Denver"},"Detroit":{"exemplarCity":"Detroit"},"Dominica":{"exemplarCity":"Dominica"},"Edmonton":{"exemplarCity":"Edmonton"},"Eirunepe":{"exemplarCity":"Eirunepé"},"El_Salvador":{"exemplarCity":"El Salvador"},"Fort_Nelson":{"exemplarCity":"Fort Nelson"},"Fortaleza":{"exemplarCity":"Fortaleza"},"Glace_Bay":{"exemplarCity":"Glace Bay"},"Godthab":{"exemplarCity":"Nuuk"},"Goose_Bay":{"exemplarCity":"Goose Bay"},"Grand_Turk":{"exemplarCity":"Gran Turca"},"Grenada":{"exemplarCity":"Granada"},"Guadeloupe":{"exemplarCity":"Guadalupe"},"Guatemala":{"exemplarCity":"Guatemala"},"Guayaquil":{"exemplarCity":"Guayaquil"},"Guyana":{"exemplarCity":"Guyana"},"Halifax":{"exemplarCity":"Halifax"},"Havana":{"exemplarCity":"La Habana"},"Hermosillo":{"exemplarCity":"Hermosillo"},"Indiana":{"Vincennes":{"exemplarCity":"Vincennes, Indiana"},"Petersburg":{"exemplarCity":"Petersburg, Indiana"},"Tell_City":{"exemplarCity":"Tell City, Indiana"},"Knox":{"exemplarCity":"Knox, Indiana"},"Winamac":{"exemplarCity":"Winamac, Indiana"},"Marengo":{"exemplarCity":"Marengo, Indiana"},"Vevay":{"exemplarCity":"Vevay, Indiana"}},"Indianapolis":{"exemplarCity":"Indianápolis"},"Inuvik":{"exemplarCity":"Inuvik"},"Iqaluit":{"exemplarCity":"Iqaluit"},"Jamaica":{"exemplarCity":"Jamaica"},"Jujuy":{"exemplarCity":"Jujuy"},"Juneau":{"exemplarCity":"Juneau"},"Kentucky":{"Monticello":{"exemplarCity":"Monticello, Kentucky"}},"Kralendijk":{"exemplarCity":"Kralendijk"},"La_Paz":{"exemplarCity":"La Paz"},"Lima":{"exemplarCity":"Lima"},"Los_Angeles":{"exemplarCity":"Los Ángeles"},"Louisville":{"exemplarCity":"Louisville"},"Lower_Princes":{"exemplarCity":"Lower Prince’s Quarter"},"Maceio":{"exemplarCity":"Maceió"},"Managua":{"exemplarCity":"Managua"},"Manaus":{"exemplarCity":"Manaos"},"Marigot":{"exemplarCity":"Marigot"},"Martinique":{"exemplarCity":"Martinica"},"Matamoros":{"exemplarCity":"Matamoros"},"Mazatlan":{"exemplarCity":"Mazatlán"},"Mendoza":{"exemplarCity":"Mendoza"},"Menominee":{"exemplarCity":"Menominee"},"Merida":{"exemplarCity":"Mérida"},"Metlakatla":{"exemplarCity":"Metlakatla"},"Mexico_City":{"exemplarCity":"Ciudad de México"},"Miquelon":{"exemplarCity":"Miquelón"},"Moncton":{"exemplarCity":"Moncton"},"Monterrey":{"exemplarCity":"Monterrey"},"Montevideo":{"exemplarCity":"Montevideo"},"Montserrat":{"exemplarCity":"Montserrat"},"Nassau":{"exemplarCity":"Nassau"},"New_York":{"exemplarCity":"Nueva York"},"Nipigon":{"exemplarCity":"Nipigon"},"Nome":{"exemplarCity":"Nome"},"Noronha":{"exemplarCity":"Noronha"},"North_Dakota":{"Beulah":{"exemplarCity":"Beulah, Dakota del Norte"},"New_Salem":{"exemplarCity":"New Salem, Dakota del Norte"},"Center":{"exemplarCity":"Center, Dakota del Norte"}},"Ojinaga":{"exemplarCity":"Ojinaga"},"Panama":{"exemplarCity":"Panamá"},"Pangnirtung":{"exemplarCity":"Pangnirtung"},"Paramaribo":{"exemplarCity":"Paramaribo"},"Phoenix":{"exemplarCity":"Phoenix"},"Port-au-Prince":{"exemplarCity":"Puerto Príncipe"},"Port_of_Spain":{"exemplarCity":"Puerto España"},"Porto_Velho":{"exemplarCity":"Porto Velho"},"Puerto_Rico":{"exemplarCity":"Puerto Rico"},"Punta_Arenas":{"exemplarCity":"Punta Arenas"},"Rainy_River":{"exemplarCity":"Rainy River"},"Rankin_Inlet":{"exemplarCity":"Rankin Inlet"},"Recife":{"exemplarCity":"Recife"},"Regina":{"exemplarCity":"Regina"},"Resolute":{"exemplarCity":"Resolute"},"Rio_Branco":{"exemplarCity":"Río Branco"},"Santa_Isabel":{"exemplarCity":"Santa Isabel"},"Santarem":{"exemplarCity":"Santarém"},"Santiago":{"exemplarCity":"Santiago de Chile"},"Santo_Domingo":{"exemplarCity":"Santo Domingo"},"Sao_Paulo":{"exemplarCity":"São Paulo"},"Scoresbysund":{"exemplarCity":"Ittoqqortoormiit"},"Sitka":{"exemplarCity":"Sitka"},"St_Barthelemy":{"exemplarCity":"San Bartolomé"},"St_Johns":{"exemplarCity":"San Juan de Terranova"},"St_Kitts":{"exemplarCity":"San Cristóbal"},"St_Lucia":{"exemplarCity":"Santa Lucía"},"St_Thomas":{"exemplarCity":"St. Thomas"},"St_Vincent":{"exemplarCity":"San Vicente"},"Swift_Current":{"exemplarCity":"Swift Current"},"Tegucigalpa":{"exemplarCity":"Tegucigalpa"},"Thule":{"exemplarCity":"Thule"},"Thunder_Bay":{"exemplarCity":"Thunder Bay"},"Tijuana":{"exemplarCity":"Tijuana"},"Toronto":{"exemplarCity":"Toronto"},"Tortola":{"exemplarCity":"Tórtola"},"Vancouver":{"exemplarCity":"Vancouver"},"Whitehorse":{"exemplarCity":"Whitehorse"},"Winnipeg":{"exemplarCity":"Winnipeg"},"Yakutat":{"exemplarCity":"Yakutat"},"Yellowknife":{"exemplarCity":"Yellowknife"}},"Atlantic":{"Azores":{"exemplarCity":"Azores"},"Bermuda":{"exemplarCity":"Bermudas"},"Canary":{"exemplarCity":"Islas Canarias"},"Cape_Verde":{"exemplarCity":"Cabo Verde"},"Faeroe":{"exemplarCity":"Islas Feroe"},"Madeira":{"exemplarCity":"Madeira"},"Reykjavik":{"exemplarCity":"Reikiavik"},"South_Georgia":{"exemplarCity":"Georgia del Sur"},"St_Helena":{"exemplarCity":"Santa Elena"},"Stanley":{"exemplarCity":"Stanley"}},"Europe":{"Amsterdam":{"exemplarCity":"Ámsterdam"},"Andorra":{"exemplarCity":"Andorra"},"Astrakhan":{"exemplarCity":"Astracán"},"Athens":{"exemplarCity":"Atenas"},"Belgrade":{"exemplarCity":"Belgrado"},"Berlin":{"exemplarCity":"Berlín"},"Bratislava":{"exemplarCity":"Bratislava"},"Brussels":{"exemplarCity":"Bruselas"},"Bucharest":{"exemplarCity":"Bucarest"},"Budapest":{"exemplarCity":"Budapest"},"Busingen":{"exemplarCity":"Busingen"},"Chisinau":{"exemplarCity":"Chisináu"},"Copenhagen":{"exemplarCity":"Copenhague"},"Dublin":{"long":{"daylight":"hora de verano de Irlanda"},"exemplarCity":"Dublín"},"Gibraltar":{"exemplarCity":"Gibraltar"},"Guernsey":{"exemplarCity":"Guernsey"},"Helsinki":{"exemplarCity":"Helsinki"},"Isle_of_Man":{"exemplarCity":"Isla de Man"},"Istanbul":{"exemplarCity":"Estambul"},"Jersey":{"exemplarCity":"Jersey"},"Kaliningrad":{"exemplarCity":"Kaliningrado"},"Kiev":{"exemplarCity":"Kiev"},"Kirov":{"exemplarCity":"Kírov"},"Lisbon":{"exemplarCity":"Lisboa"},"Ljubljana":{"exemplarCity":"Liubliana"},"London":{"long":{"daylight":"hora de verano británica"},"exemplarCity":"Londres"},"Luxembourg":{"exemplarCity":"Luxemburgo"},"Madrid":{"exemplarCity":"Madrid"},"Malta":{"exemplarCity":"Malta"},"Mariehamn":{"exemplarCity":"Mariehamn"},"Minsk":{"exemplarCity":"Minsk"},"Monaco":{"exemplarCity":"Mónaco"},"Moscow":{"exemplarCity":"Moscú"},"Oslo":{"exemplarCity":"Oslo"},"Paris":{"exemplarCity":"París"},"Podgorica":{"exemplarCity":"Podgorica"},"Prague":{"exemplarCity":"Praga"},"Riga":{"exemplarCity":"Riga"},"Rome":{"exemplarCity":"Roma"},"Samara":{"exemplarCity":"Samara"},"San_Marino":{"exemplarCity":"San Marino"},"Sarajevo":{"exemplarCity":"Sarajevo"},"Saratov":{"exemplarCity":"Sarátov"},"Simferopol":{"exemplarCity":"Simferópol"},"Skopje":{"exemplarCity":"Skopie"},"Sofia":{"exemplarCity":"Sofía"},"Stockholm":{"exemplarCity":"Estocolmo"},"Tallinn":{"exemplarCity":"Tallin"},"Tirane":{"exemplarCity":"Tirana"},"Ulyanovsk":{"exemplarCity":"Uliánovsk"},"Uzhgorod":{"exemplarCity":"Úzhgorod"},"Vaduz":{"exemplarCity":"Vaduz"},"Vatican":{"exemplarCity":"El Vaticano"},"Vienna":{"exemplarCity":"Viena"},"Vilnius":{"exemplarCity":"Vilna"},"Volgograd":{"exemplarCity":"Volgogrado"},"Warsaw":{"exemplarCity":"Varsovia"},"Zagreb":{"exemplarCity":"Zagreb"},"Zaporozhye":{"exemplarCity":"Zaporiyia"},"Zurich":{"exemplarCity":"Zúrich"}},"Africa":{"Abidjan":{"exemplarCity":"Abiyán"},"Accra":{"exemplarCity":"Acra"},"Addis_Ababa":{"exemplarCity":"Addis Abeba"},"Algiers":{"exemplarCity":"Argel"},"Asmera":{"exemplarCity":"Asmara"},"Bamako":{"exemplarCity":"Bamako"},"Bangui":{"exemplarCity":"Bangui"},"Banjul":{"exemplarCity":"Banjul"},"Bissau":{"exemplarCity":"Bisáu"},"Blantyre":{"exemplarCity":"Blantyre"},"Brazzaville":{"exemplarCity":"Brazzaville"},"Bujumbura":{"exemplarCity":"Bujumbura"},"Cairo":{"exemplarCity":"El Cairo"},"Casablanca":{"exemplarCity":"Casablanca"},"Ceuta":{"exemplarCity":"Ceuta"},"Conakry":{"exemplarCity":"Conakry"},"Dakar":{"exemplarCity":"Dakar"},"Dar_es_Salaam":{"exemplarCity":"Dar es Salaam"},"Djibouti":{"exemplarCity":"Yibuti"},"Douala":{"exemplarCity":"Duala"},"El_Aaiun":{"exemplarCity":"El Aaiún"},"Freetown":{"exemplarCity":"Freetown"},"Gaborone":{"exemplarCity":"Gaborone"},"Harare":{"exemplarCity":"Harare"},"Johannesburg":{"exemplarCity":"Johannesburgo"},"Juba":{"exemplarCity":"Juba"},"Kampala":{"exemplarCity":"Kampala"},"Khartoum":{"exemplarCity":"Jartún"},"Kigali":{"exemplarCity":"Kigali"},"Kinshasa":{"exemplarCity":"Kinshasa"},"Lagos":{"exemplarCity":"Lagos"},"Libreville":{"exemplarCity":"Libreville"},"Lome":{"exemplarCity":"Lomé"},"Luanda":{"exemplarCity":"Luanda"},"Lubumbashi":{"exemplarCity":"Lubumbashi"},"Lusaka":{"exemplarCity":"Lusaka"},"Malabo":{"exemplarCity":"Malabo"},"Maputo":{"exemplarCity":"Maputo"},"Maseru":{"exemplarCity":"Maseru"},"Mbabane":{"exemplarCity":"Mbabane"},"Mogadishu":{"exemplarCity":"Mogadiscio"},"Monrovia":{"exemplarCity":"Monrovia"},"Nairobi":{"exemplarCity":"Nairobi"},"Ndjamena":{"exemplarCity":"Yamena"},"Niamey":{"exemplarCity":"Niamey"},"Nouakchott":{"exemplarCity":"Nuakchot"},"Ouagadougou":{"exemplarCity":"Uagadugú"},"Porto-Novo":{"exemplarCity":"Portonovo"},"Sao_Tome":{"exemplarCity":"Santo Tomé"},"Tripoli":{"exemplarCity":"Trípoli"},"Tunis":{"exemplarCity":"Túnez"},"Windhoek":{"exemplarCity":"Windhoek"}},"Asia":{"Aden":{"exemplarCity":"Adén"},"Almaty":{"exemplarCity":"Almaty"},"Amman":{"exemplarCity":"Ammán"},"Anadyr":{"exemplarCity":"Anádyr"},"Aqtau":{"exemplarCity":"Aktau"},"Aqtobe":{"exemplarCity":"Aktobe"},"Ashgabat":{"exemplarCity":"Asjabad"},"Atyrau":{"exemplarCity":"Atyrau"},"Baghdad":{"exemplarCity":"Bagdad"},"Bahrain":{"exemplarCity":"Baréin"},"Baku":{"exemplarCity":"Bakú"},"Bangkok":{"exemplarCity":"Bangkok"},"Barnaul":{"exemplarCity":"Barnaúl"},"Beirut":{"exemplarCity":"Beirut"},"Bishkek":{"exemplarCity":"Bishkek"},"Brunei":{"exemplarCity":"Brunéi"},"Calcutta":{"exemplarCity":"Calcuta"},"Chita":{"exemplarCity":"Chitá"},"Choibalsan":{"exemplarCity":"Choibalsan"},"Colombo":{"exemplarCity":"Colombo"},"Damascus":{"exemplarCity":"Damasco"},"Dhaka":{"exemplarCity":"Daca"},"Dili":{"exemplarCity":"Dili"},"Dubai":{"exemplarCity":"Dubái"},"Dushanbe":{"exemplarCity":"Dusambé"},"Famagusta":{"exemplarCity":"Famagusta"},"Gaza":{"exemplarCity":"Gaza"},"Hebron":{"exemplarCity":"Hebrón"},"Hong_Kong":{"exemplarCity":"Hong Kong"},"Hovd":{"exemplarCity":"Hovd"},"Irkutsk":{"exemplarCity":"Irkutsk"},"Jakarta":{"exemplarCity":"Yakarta"},"Jayapura":{"exemplarCity":"Jayapura"},"Jerusalem":{"exemplarCity":"Jerusalén"},"Kabul":{"exemplarCity":"Kabul"},"Kamchatka":{"exemplarCity":"Kamchatka"},"Karachi":{"exemplarCity":"Karachi"},"Katmandu":{"exemplarCity":"Katmandú"},"Khandyga":{"exemplarCity":"Khandyga"},"Krasnoyarsk":{"exemplarCity":"Krasnoyarsk"},"Kuala_Lumpur":{"exemplarCity":"Kuala Lumpur"},"Kuching":{"exemplarCity":"Kuching"},"Kuwait":{"exemplarCity":"Kuwait"},"Macau":{"exemplarCity":"Macao"},"Magadan":{"exemplarCity":"Magadán"},"Makassar":{"exemplarCity":"Makasar"},"Manila":{"exemplarCity":"Manila"},"Muscat":{"exemplarCity":"Mascate"},"Nicosia":{"exemplarCity":"Nicosia"},"Novokuznetsk":{"exemplarCity":"Novokuznetsk"},"Novosibirsk":{"exemplarCity":"Novosibirsk"},"Omsk":{"exemplarCity":"Omsk"},"Oral":{"exemplarCity":"Oral"},"Phnom_Penh":{"exemplarCity":"Phnom Penh"},"Pontianak":{"exemplarCity":"Pontianak"},"Pyongyang":{"exemplarCity":"Pyongyang"},"Qatar":{"exemplarCity":"Catar"},"Qyzylorda":{"exemplarCity":"Kyzylorda"},"Rangoon":{"exemplarCity":"Yangón (Rangún)"},"Riyadh":{"exemplarCity":"Riad"},"Saigon":{"exemplarCity":"Ciudad Ho Chi Minh"},"Sakhalin":{"exemplarCity":"Sajalín"},"Samarkand":{"exemplarCity":"Samarcanda"},"Seoul":{"exemplarCity":"Seúl"},"Shanghai":{"exemplarCity":"Shanghái"},"Singapore":{"exemplarCity":"Singapur"},"Srednekolymsk":{"exemplarCity":"Srednekolimsk"},"Taipei":{"exemplarCity":"Taipéi"},"Tashkent":{"exemplarCity":"Taskent"},"Tbilisi":{"exemplarCity":"Tiflis"},"Tehran":{"exemplarCity":"Teherán"},"Thimphu":{"exemplarCity":"Timbu"},"Tokyo":{"exemplarCity":"Tokio"},"Tomsk":{"exemplarCity":"Tomsk"},"Ulaanbaatar":{"exemplarCity":"Ulán Bator"},"Urumqi":{"exemplarCity":"Ürümqi"},"Ust-Nera":{"exemplarCity":"Ust-Nera"},"Vientiane":{"exemplarCity":"Vientián"},"Vladivostok":{"exemplarCity":"Vladivostok"},"Yakutsk":{"exemplarCity":"Yakutsk"},"Yekaterinburg":{"exemplarCity":"Ekaterimburgo"},"Yerevan":{"exemplarCity":"Ereván"}},"Indian":{"Antananarivo":{"exemplarCity":"Antananarivo"},"Chagos":{"exemplarCity":"Chagos"},"Christmas":{"exemplarCity":"Navidad"},"Cocos":{"exemplarCity":"Cocos"},"Comoro":{"exemplarCity":"Comoras"},"Kerguelen":{"exemplarCity":"Kerguelen"},"Mahe":{"exemplarCity":"Mahé"},"Maldives":{"exemplarCity":"Maldivas"},"Mauritius":{"exemplarCity":"Mauricio"},"Mayotte":{"exemplarCity":"Mayotte"},"Reunion":{"exemplarCity":"Reunión"}},"Australia":{"Adelaide":{"exemplarCity":"Adelaida"},"Brisbane":{"exemplarCity":"Brisbane"},"Broken_Hill":{"exemplarCity":"Broken Hill"},"Currie":{"exemplarCity":"Currie"},"Darwin":{"exemplarCity":"Darwin"},"Eucla":{"exemplarCity":"Eucla"},"Hobart":{"exemplarCity":"Hobart"},"Lindeman":{"exemplarCity":"Lindeman"},"Lord_Howe":{"exemplarCity":"Lord Howe"},"Melbourne":{"exemplarCity":"Melbourne"},"Perth":{"exemplarCity":"Perth"},"Sydney":{"exemplarCity":"Sídney"}},"Pacific":{"Apia":{"exemplarCity":"Apia"},"Auckland":{"exemplarCity":"Auckland"},"Bougainville":{"exemplarCity":"Bougainville"},"Chatham":{"exemplarCity":"Chatham"},"Easter":{"exemplarCity":"Isla de Pascua"},"Efate":{"exemplarCity":"Efate"},"Enderbury":{"exemplarCity":"Enderbury"},"Fakaofo":{"exemplarCity":"Fakaofo"},"Fiji":{"exemplarCity":"Fiyi"},"Funafuti":{"exemplarCity":"Funafuti"},"Galapagos":{"exemplarCity":"Galápagos"},"Gambier":{"exemplarCity":"Gambier"},"Guadalcanal":{"exemplarCity":"Guadalcanal"},"Guam":{"exemplarCity":"Guam"},"Honolulu":{"exemplarCity":"Honolulú"},"Johnston":{"exemplarCity":"Johnston"},"Kiritimati":{"exemplarCity":"Kiritimati"},"Kosrae":{"exemplarCity":"Kosrae"},"Kwajalein":{"exemplarCity":"Kwajalein"},"Majuro":{"exemplarCity":"Majuro"},"Marquesas":{"exemplarCity":"Marquesas"},"Midway":{"exemplarCity":"Midway"},"Nauru":{"exemplarCity":"Nauru"},"Niue":{"exemplarCity":"Niue"},"Norfolk":{"exemplarCity":"Norfolk"},"Noumea":{"exemplarCity":"Numea"},"Pago_Pago":{"exemplarCity":"Pago Pago"},"Palau":{"exemplarCity":"Palaos"},"Pitcairn":{"exemplarCity":"Pitcairn"},"Ponape":{"exemplarCity":"Pohnpei"},"Port_Moresby":{"exemplarCity":"Port Moresby"},"Rarotonga":{"exemplarCity":"Rarotonga"},"Saipan":{"exemplarCity":"Saipán"},"Tahiti":{"exemplarCity":"Tahití"},"Tarawa":{"exemplarCity":"Tarawa"},"Tongatapu":{"exemplarCity":"Tongatapu"},"Truk":{"exemplarCity":"Chuuk"},"Wake":{"exemplarCity":"Wake"},"Wallis":{"exemplarCity":"Wallis"}},"Arctic":{"Longyearbyen":{"exemplarCity":"Longyearbyen"}},"Antarctica":{"Casey":{"exemplarCity":"Casey"},"Davis":{"exemplarCity":"Davis"},"DumontDUrville":{"exemplarCity":"Dumont d’Urville"},"Macquarie":{"exemplarCity":"Macquarie"},"Mawson":{"exemplarCity":"Mawson"},"McMurdo":{"exemplarCity":"McMurdo"},"Palmer":{"exemplarCity":"Palmer"},"Rothera":{"exemplarCity":"Rothera"},"Syowa":{"exemplarCity":"Syowa"},"Troll":{"exemplarCity":"Troll"},"Vostok":{"exemplarCity":"Vostok"}},"Etc":{"UTC":{"long":{"standard":"tiempo universal coordinado"},"short":{"standard":"UTC"}},"Unknown":{"exemplarCity":"ciudad desconocida"}}},"metazone":{"Acre":{"long":{"generic":"Hora de Acre","standard":"Hora estándar de Acre","daylight":"Hora de verano de Acre"}},"Afghanistan":{"long":{"standard":"hora de Afganistán"}},"Africa_Central":{"long":{"standard":"hora de África central"}},"Africa_Eastern":{"long":{"standard":"hora de África oriental"}},"Africa_Southern":{"long":{"standard":"hora de Sudáfrica"}},"Africa_Western":{"long":{"generic":"hora de África occidental","standard":"hora estándar de África occidental","daylight":"hora de verano de África occidental"}},"Alaska":{"long":{"generic":"hora de Alaska","standard":"hora estándar de Alaska","daylight":"hora de verano de Alaska"}},"Amazon":{"long":{"generic":"hora del Amazonas","standard":"hora estándar del Amazonas","daylight":"hora de verano del Amazonas"}},"America_Central":{"long":{"generic":"hora central","standard":"hora estándar central","daylight":"hora de verano central"}},"America_Eastern":{"long":{"generic":"hora oriental","standard":"hora estándar oriental","daylight":"hora de verano oriental"}},"America_Mountain":{"long":{"generic":"hora de las Montañas Rocosas","standard":"hora estándar de las Montañas Rocosas","daylight":"hora de verano de las Montañas Rocosas"}},"America_Pacific":{"long":{"generic":"hora del Pacífico","standard":"hora estándar del Pacífico","daylight":"hora de verano del Pacífico"}},"Anadyr":{"long":{"generic":"hora de Anadyr","standard":"hora estándar de Anadyr","daylight":"hora de verano de Anadyr"}},"Apia":{"long":{"generic":"hora de Apia","standard":"hora estándar de Apia","daylight":"horario de verano de Apia"}},"Aqtau":{"long":{"generic":"Hora de Aktau","standard":"Hora estándar de Aktau","daylight":"Hora de verano de Aktau"}},"Aqtobe":{"long":{"generic":"Hora de Aktobe","standard":"Hora estándar de Aktobe","daylight":"Hora de verano de Aktobe"}},"Arabian":{"long":{"generic":"hora de Arabia","standard":"hora estándar de Arabia","daylight":"hora de verano de Arabia"}},"Argentina":{"long":{"generic":"hora de Argentina","standard":"hora estándar de Argentina","daylight":"hora de verano de Argentina"}},"Argentina_Western":{"long":{"generic":"hora de Argentina occidental","standard":"hora estándar de Argentina occidental","daylight":"hora de verano de Argentina occidental"}},"Armenia":{"long":{"generic":"hora de Armenia","standard":"hora estándar de Armenia","daylight":"hora de verano de Armenia"}},"Atlantic":{"long":{"generic":"hora del Atlántico","standard":"hora estándar del Atlántico","daylight":"hora de verano del Atlántico"}},"Australia_Central":{"long":{"generic":"hora de Australia central","standard":"hora estándar de Australia central","daylight":"hora de verano de Australia central"}},"Australia_CentralWestern":{"long":{"generic":"hora de Australia centroccidental","standard":"hora estándar de Australia centroccidental","daylight":"hora de verano de Australia centroccidental"}},"Australia_Eastern":{"long":{"generic":"hora de Australia oriental","standard":"hora estándar de Australia oriental","daylight":"hora de verano de Australia oriental"}},"Australia_Western":{"long":{"generic":"hora de Australia occidental","standard":"hora estándar de Australia occidental","daylight":"hora de verano de Australia occidental"}},"Azerbaijan":{"long":{"generic":"hora de Azerbaiyán","standard":"hora estándar de Azerbaiyán","daylight":"hora de verano de Azerbaiyán"}},"Azores":{"long":{"generic":"hora de las Azores","standard":"hora estándar de las Azores","daylight":"hora de verano de las Azores"}},"Bangladesh":{"long":{"generic":"hora de Bangladés","standard":"hora estándar de Bangladés","daylight":"hora de verano de Bangladés"}},"Bhutan":{"long":{"standard":"hora de Bután"}},"Bolivia":{"long":{"standard":"hora de Bolivia"}},"Brasilia":{"long":{"generic":"hora de Brasilia","standard":"hora estándar de Brasilia","daylight":"hora de verano de Brasilia"}},"Brunei":{"long":{"standard":"hora de Brunéi"}},"Cape_Verde":{"long":{"generic":"hora de Cabo Verde","standard":"hora estándar de Cabo Verde","daylight":"hora de verano de Cabo Verde"}},"Chamorro":{"long":{"standard":"hora estándar de Chamorro"}},"Chatham":{"long":{"generic":"hora de Chatham","standard":"hora estándar de Chatham","daylight":"hora de verano de Chatham"}},"Chile":{"long":{"generic":"hora de Chile","standard":"hora estándar de Chile","daylight":"hora de verano de Chile"}},"China":{"long":{"generic":"hora de China","standard":"hora estándar de China","daylight":"hora de verano de China"}},"Choibalsan":{"long":{"generic":"hora de Choibalsan","standard":"hora estándar de Choibalsan","daylight":"hora de verano de Choibalsan"}},"Christmas":{"long":{"standard":"hora de la Isla de Navidad"}},"Cocos":{"long":{"standard":"hora de las Islas Cocos"}},"Colombia":{"long":{"generic":"hora de Colombia","standard":"hora estándar de Colombia","daylight":"hora de verano de Colombia"}},"Cook":{"long":{"generic":"hora de las Islas Cook","standard":"hora estándar de las Islas Cook","daylight":"hora de verano media de las Islas Cook"}},"Cuba":{"long":{"generic":"hora de Cuba","standard":"hora estándar de Cuba","daylight":"hora de verano de Cuba"}},"Davis":{"long":{"standard":"hora de Davis"}},"DumontDUrville":{"long":{"standard":"hora de Dumont-d’Urville"}},"East_Timor":{"long":{"standard":"hora de Timor Oriental"}},"Easter":{"long":{"generic":"hora de la isla de Pascua","standard":"hora estándar de la isla de Pascua","daylight":"hora de verano de la isla de Pascua"}},"Ecuador":{"long":{"standard":"hora de Ecuador"}},"Europe_Central":{"long":{"generic":"hora de Europa central","standard":"hora estándar de Europa central","daylight":"hora de verano de Europa central"},"short":{"generic":"CET","standard":"CET","daylight":"CEST"}},"Europe_Eastern":{"long":{"generic":"hora de Europa oriental","standard":"hora estándar de Europa oriental","daylight":"hora de verano de Europa oriental"},"short":{"generic":"EET","standard":"EET","daylight":"EEST"}},"Europe_Further_Eastern":{"long":{"standard":"hora del extremo oriental de Europa"}},"Europe_Western":{"long":{"generic":"hora de Europa occidental","standard":"hora estándar de Europa occidental","daylight":"hora de verano de Europa occidental"},"short":{"generic":"WET","standard":"WET","daylight":"WEST"}},"Falkland":{"long":{"generic":"hora de las islas Malvinas","standard":"hora estándar de las islas Malvinas","daylight":"hora de verano de las islas Malvinas"}},"Fiji":{"long":{"generic":"hora de Fiyi","standard":"hora estándar de Fiyi","daylight":"hora de verano de Fiyi"}},"French_Guiana":{"long":{"standard":"hora de la Guayana Francesa"}},"French_Southern":{"long":{"standard":"hora de las Tierras Australes y Antárticas Francesas"}},"Galapagos":{"long":{"standard":"hora de Galápagos"}},"Gambier":{"long":{"standard":"hora de Gambier"}},"Georgia":{"long":{"generic":"hora de Georgia","standard":"hora estándar de Georgia","daylight":"hora de verano de Georgia"}},"Gilbert_Islands":{"long":{"standard":"hora de las islas Gilbert"}},"GMT":{"long":{"standard":"hora del meridiano de Greenwich"},"short":{"standard":"GMT"}},"Greenland_Eastern":{"long":{"generic":"hora de Groenlandia oriental","standard":"hora estándar de Groenlandia oriental","daylight":"hora de verano de Groenlandia oriental"}},"Greenland_Western":{"long":{"generic":"hora de Groenlandia occidental","standard":"hora estándar de Groenlandia occidental","daylight":"hora de verano de Groenlandia occidental"}},"Guam":{"long":{"standard":"Hora estándar de Guam"}},"Gulf":{"long":{"standard":"hora estándar del Golfo"}},"Guyana":{"long":{"standard":"hora de Guyana"}},"Hawaii_Aleutian":{"long":{"generic":"hora de Hawái-Aleutianas","standard":"hora estándar de Hawái-Aleutianas","daylight":"hora de verano de Hawái-Aleutianas"}},"Hong_Kong":{"long":{"generic":"hora de Hong Kong","standard":"hora estándar de Hong Kong","daylight":"hora de verano de Hong Kong"}},"Hovd":{"long":{"generic":"hora de Hovd","standard":"hora estándar de Hovd","daylight":"hora de verano de Hovd"}},"India":{"long":{"standard":"hora estándar de la India"}},"Indian_Ocean":{"long":{"standard":"hora del océano Índico"}},"Indochina":{"long":{"standard":"hora de Indochina"}},"Indonesia_Central":{"long":{"standard":"hora de Indonesia central"}},"Indonesia_Eastern":{"long":{"standard":"hora de Indonesia oriental"}},"Indonesia_Western":{"long":{"standard":"hora de Indonesia occidental"}},"Iran":{"long":{"generic":"hora de Irán","standard":"hora estándar de Irán","daylight":"hora de verano de Irán"}},"Irkutsk":{"long":{"generic":"hora de Irkutsk","standard":"hora estándar de Irkutsk","daylight":"hora de verano de Irkutsk"}},"Israel":{"long":{"generic":"hora de Israel","standard":"hora estándar de Israel","daylight":"hora de verano de Israel"}},"Japan":{"long":{"generic":"hora de Japón","standard":"hora estándar de Japón","daylight":"hora de verano de Japón"}},"Kamchatka":{"long":{"generic":"hora de Kamchatka","standard":"hora estándar de Kamchatka","daylight":"hora de verano de Kamchatka"}},"Kazakhstan_Eastern":{"long":{"standard":"hora de Kazajistán oriental"}},"Kazakhstan_Western":{"long":{"standard":"hora de Kazajistán occidental"}},"Korea":{"long":{"generic":"hora de Corea","standard":"hora estándar de Corea","daylight":"hora de verano de Corea"}},"Kosrae":{"long":{"standard":"hora de Kosrae"}},"Krasnoyarsk":{"long":{"generic":"hora de Krasnoyarsk","standard":"hora estándar de Krasnoyarsk","daylight":"hora de verano de Krasnoyarsk"}},"Kyrgystan":{"long":{"standard":"hora de Kirguistán"}},"Lanka":{"long":{"standard":"Hora de Sri Lanka"}},"Line_Islands":{"long":{"standard":"hora de las Espóradas Ecuatoriales"}},"Lord_Howe":{"long":{"generic":"hora de Lord Howe","standard":"hora estándar de Lord Howe","daylight":"hora de verano de Lord Howe"}},"Macau":{"long":{"generic":"Hora de Macao","standard":"Hora estándar de Macao","daylight":"Hora de verano de Macao"}},"Macquarie":{"long":{"standard":"hora de la isla Macquarie"}},"Magadan":{"long":{"generic":"hora de Magadán","standard":"hora estándar de Magadán","daylight":"hora de verano de Magadán"}},"Malaysia":{"long":{"standard":"hora de Malasia"}},"Maldives":{"long":{"standard":"hora de Maldivas"}},"Marquesas":{"long":{"standard":"hora de Marquesas"}},"Marshall_Islands":{"long":{"standard":"hora de las Islas Marshall"}},"Mauritius":{"long":{"generic":"hora de Mauricio","standard":"hora estándar de Mauricio","daylight":"hora de verano de Mauricio"}},"Mawson":{"long":{"standard":"hora de Mawson"}},"Mexico_Northwest":{"long":{"generic":"hora del noroeste de México","standard":"hora estándar del noroeste de México","daylight":"hora de verano del noroeste de México"}},"Mexico_Pacific":{"long":{"generic":"hora del Pacífico de México","standard":"hora estándar del Pacífico de México","daylight":"hora de verano del Pacífico de México"}},"Mongolia":{"long":{"generic":"hora de Ulán Bator","standard":"hora estándar de Ulán Bator","daylight":"hora de verano de Ulán Bator"}},"Moscow":{"long":{"generic":"hora de Moscú","standard":"hora estándar de Moscú","daylight":"hora de verano de Moscú"}},"Myanmar":{"long":{"standard":"hora de Myanmar (Birmania)"}},"Nauru":{"long":{"standard":"hora de Nauru"}},"Nepal":{"long":{"standard":"hora de Nepal"}},"New_Caledonia":{"long":{"generic":"hora de Nueva Caledonia","standard":"hora estándar de Nueva Caledonia","daylight":"hora de verano de Nueva Caledonia"}},"New_Zealand":{"long":{"generic":"hora de Nueva Zelanda","standard":"hora estándar de Nueva Zelanda","daylight":"hora de verano de Nueva Zelanda"}},"Newfoundland":{"long":{"generic":"hora de Terranova","standard":"hora estándar de Terranova","daylight":"hora de verano de Terranova"}},"Niue":{"long":{"standard":"hora de Niue"}},"Norfolk":{"long":{"standard":"hora de la isla Norfolk"}},"Noronha":{"long":{"generic":"hora de Fernando de Noronha","standard":"hora estándar de Fernando de Noronha","daylight":"hora de verano de Fernando de Noronha"}},"North_Mariana":{"long":{"standard":"Hora de las Islas Marianas del Norte"}},"Novosibirsk":{"long":{"generic":"hora de Novosibirsk","standard":"hora estándar de Novosibirsk","daylight":"hora de verano de Novosibirsk"}},"Omsk":{"long":{"generic":"hora de Omsk","standard":"hora estándar de Omsk","daylight":"hora de verano de Omsk"}},"Pakistan":{"long":{"generic":"hora de Pakistán","standard":"hora estándar de Pakistán","daylight":"hora de verano de Pakistán"}},"Palau":{"long":{"standard":"hora de Palaos"}},"Papua_New_Guinea":{"long":{"standard":"hora de Papúa Nueva Guinea"}},"Paraguay":{"long":{"generic":"hora de Paraguay","standard":"hora estándar de Paraguay","daylight":"hora de verano de Paraguay"}},"Peru":{"long":{"generic":"hora de Perú","standard":"hora estándar de Perú","daylight":"hora de verano de Perú"}},"Philippines":{"long":{"generic":"hora de Filipinas","standard":"hora estándar de Filipinas","daylight":"hora de verano de Filipinas"}},"Phoenix_Islands":{"long":{"standard":"hora de las Islas Fénix"}},"Pierre_Miquelon":{"long":{"generic":"hora de San Pedro y Miquelón","standard":"hora estándar de San Pedro y Miquelón","daylight":"hora de verano de San Pedro y Miquelón"}},"Pitcairn":{"long":{"standard":"hora de Pitcairn"}},"Ponape":{"long":{"standard":"hora de Pohnpei"}},"Pyongyang":{"long":{"standard":"hora de Pyongyang"}},"Qyzylorda":{"long":{"generic":"Hora de Qyzylorda","standard":"Hora estándar de Qyzylorda","daylight":"Hora de verano de Qyzylorda"}},"Reunion":{"long":{"standard":"hora de Reunión"}},"Rothera":{"long":{"standard":"hora de Rothera"}},"Sakhalin":{"long":{"generic":"hora de Sajalín","standard":"hora estándar de Sajalín","daylight":"hora de verano de Sajalín"}},"Samara":{"long":{"generic":"hora de Samara","standard":"hora estándar de Samara","daylight":"hora de verano de Samara"}},"Samoa":{"long":{"generic":"hora de Samoa","standard":"hora estándar de Samoa","daylight":"hora de verano de Samoa"}},"Seychelles":{"long":{"standard":"hora de Seychelles"}},"Singapore":{"long":{"standard":"hora de Singapur"}},"Solomon":{"long":{"standard":"hora de las Islas Salomón"}},"South_Georgia":{"long":{"standard":"hora de Georgia del Sur"}},"Suriname":{"long":{"standard":"hora de Surinam"}},"Syowa":{"long":{"standard":"hora de Syowa"}},"Tahiti":{"long":{"standard":"hora de Tahití"}},"Taipei":{"long":{"generic":"hora de Taipéi","standard":"hora estándar de Taipéi","daylight":"hora de verano de Taipéi"}},"Tajikistan":{"long":{"standard":"hora de Tayikistán"}},"Tokelau":{"long":{"standard":"hora de Tokelau"}},"Tonga":{"long":{"generic":"hora de Tonga","standard":"hora estándar de Tonga","daylight":"hora de verano de Tonga"}},"Truk":{"long":{"standard":"hora de Chuuk"}},"Turkmenistan":{"long":{"generic":"hora de Turkmenistán","standard":"hora estándar de Turkmenistán","daylight":"hora de verano de Turkmenistán"}},"Tuvalu":{"long":{"standard":"hora de Tuvalu"}},"Uruguay":{"long":{"generic":"hora de Uruguay","standard":"hora estándar de Uruguay","daylight":"hora de verano de Uruguay"}},"Uzbekistan":{"long":{"generic":"hora de Uzbekistán","standard":"hora estándar de Uzbekistán","daylight":"hora de verano de Uzbekistán"}},"Vanuatu":{"long":{"generic":"hora de Vanuatu","standard":"hora estándar de Vanuatu","daylight":"hora de verano de Vanuatu"}},"Venezuela":{"long":{"standard":"hora de Venezuela"}},"Vladivostok":{"long":{"generic":"hora de Vladivostok","standard":"hora estándar de Vladivostok","daylight":"hora de verano de Vladivostok"}},"Volgograd":{"long":{"generic":"hora de Volgogrado","standard":"hora estándar de Volgogrado","daylight":"hora de verano de Volgogrado"}},"Vostok":{"long":{"standard":"hora de Vostok"}},"Wake":{"long":{"standard":"hora de la isla Wake"}},"Wallis":{"long":{"standard":"hora de Wallis y Futuna"}},"Yakutsk":{"long":{"generic":"hora de Yakutsk","standard":"hora estándar de Yakutsk","daylight":"hora de verano de Yakutsk"}},"Yekaterinburg":{"long":{"generic":"hora de Ekaterimburgo","standard":"hora estándar de Ekaterimburgo","daylight":"hora de verano de Ekaterimburgo"}}}}},"numbers":{"defaultNumberingSystem":"latn","otherNumberingSystems":{"native":"latn"},"minimumGroupingDigits":"2","symbols-numberSystem-latn":{"decimal":",","group":".","list":";","percentSign":"%","plusSign":"+","minusSign":"-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"NaN","timeSeparator":":"},"decimalFormats-numberSystem-latn":{"standard":"#,##0.###","long":{"decimalFormat":{"1000-count-one":"0 mil","1000-count-other":"0 mil","10000-count-one":"00 mil","10000-count-other":"00 mil","100000-count-one":"000 mil","100000-count-other":"000 mil","1000000-count-one":"0 millón","1000000-count-other":"0 millones","10000000-count-one":"00 millones","10000000-count-other":"00 millones","100000000-count-one":"000 millones","100000000-count-other":"000 millones","1000000000-count-one":"0 mil millones","1000000000-count-other":"0 mil millones","10000000000-count-one":"00 mil millones","10000000000-count-other":"00 mil millones","100000000000-count-one":"000 mil millones","100000000000-count-other":"000 mil millones","1000000000000-count-one":"0 billón","1000000000000-count-other":"0 billones","10000000000000-count-one":"00 billones","10000000000000-count-other":"00 billones","100000000000000-count-one":"000 billones","100000000000000-count-other":"000 billones"}},"short":{"decimalFormat":{"1000-count-one":"0 mil","1000-count-other":"0 mil","10000-count-one":"00 mil","10000-count-other":"00 mil","100000-count-one":"000 mil","100000-count-other":"000 mil","1000000-count-one":"0 M","1000000-count-other":"0 M","10000000-count-one":"00 M","10000000-count-other":"00 M","100000000-count-one":"000 M","100000000-count-other":"000 M","1000000000-count-one":"0000 M","1000000000-count-other":"0000 M","10000000000-count-one":"00 mil M","10000000000-count-other":"00 mil M","100000000000-count-one":"000 mil M","100000000000-count-other":"000 mil M","1000000000000-count-one":"0 B","1000000000000-count-other":"0 B","10000000000000-count-one":"00 B","10000000000000-count-other":"00 B","100000000000000-count-one":"000 B","100000000000000-count-other":"000 B"}}},"scientificFormats-numberSystem-latn":{"standard":"#E0"},"percentFormats-numberSystem-latn":{"standard":"#,##0 %"},"currencyFormats-numberSystem-latn":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"#,##0.00 ¤","accounting":"#,##0.00 ¤","short":{"standard":{"1000-count-one":"0 mil ¤","1000-count-other":"0 mil ¤","10000-count-one":"00 mil ¤","10000-count-other":"00 mil ¤","100000-count-one":"000 mil ¤","100000-count-other":"000 mil ¤","1000000-count-one":"0 M¤","1000000-count-other":"0 M¤","10000000-count-one":"00 M¤","10000000-count-other":"00 M¤","100000000-count-one":"000 M¤","100000000-count-other":"000 M¤","1000000000-count-one":"0000 M¤","1000000000-count-other":"0000 M¤","10000000000-count-one":"00 mil M¤","10000000000-count-other":"00 mil M¤","100000000000-count-one":"000 mil M¤","100000000000-count-other":"000 mil M¤","1000000000000-count-one":"0 B¤","1000000000000-count-other":"0 B¤","10000000000000-count-one":"00 B¤","10000000000000-count-other":"00 B¤","100000000000000-count-one":"000 B¤","100000000000000-count-other":"000 B¤"}},"unitPattern-count-one":"{0} {1}","unitPattern-count-other":"{0} {1}"},"miscPatterns-numberSystem-latn":{"atLeast":"Más de {0}","range":"{0}-{1}"},"minimalPairs":{"pluralMinimalPairs-count-one":"{0} día","pluralMinimalPairs-count-other":"{0} días","other":"Toma la {0}.ª a la derecha."}}},"fr":{"identity":{"version":{"_number":"$Revision: 13920 $","_cldrVersion":"33"},"language":"fr"},"dates":{"calendars":{"gregorian":{"months":{"format":{"abbreviated":{"1":"janv.","2":"févr.","3":"mars","4":"avr.","5":"mai","6":"juin","7":"juil.","8":"août","9":"sept.","10":"oct.","11":"nov.","12":"déc."},"narrow":{"1":"J","2":"F","3":"M","4":"A","5":"M","6":"J","7":"J","8":"A","9":"S","10":"O","11":"N","12":"D"},"wide":{"1":"janvier","2":"février","3":"mars","4":"avril","5":"mai","6":"juin","7":"juillet","8":"août","9":"septembre","10":"octobre","11":"novembre","12":"décembre"}},"stand-alone":{"abbreviated":{"1":"janv.","2":"févr.","3":"mars","4":"avr.","5":"mai","6":"juin","7":"juil.","8":"août","9":"sept.","10":"oct.","11":"nov.","12":"déc."},"narrow":{"1":"J","2":"F","3":"M","4":"A","5":"M","6":"J","7":"J","8":"A","9":"S","10":"O","11":"N","12":"D"},"wide":{"1":"janvier","2":"février","3":"mars","4":"avril","5":"mai","6":"juin","7":"juillet","8":"août","9":"septembre","10":"octobre","11":"novembre","12":"décembre"}}},"days":{"format":{"abbreviated":{"sun":"dim.","mon":"lun.","tue":"mar.","wed":"mer.","thu":"jeu.","fri":"ven.","sat":"sam."},"narrow":{"sun":"D","mon":"L","tue":"M","wed":"M","thu":"J","fri":"V","sat":"S"},"short":{"sun":"di","mon":"lu","tue":"ma","wed":"me","thu":"je","fri":"ve","sat":"sa"},"wide":{"sun":"dimanche","mon":"lundi","tue":"mardi","wed":"mercredi","thu":"jeudi","fri":"vendredi","sat":"samedi"}},"stand-alone":{"abbreviated":{"sun":"dim.","mon":"lun.","tue":"mar.","wed":"mer.","thu":"jeu.","fri":"ven.","sat":"sam."},"narrow":{"sun":"D","mon":"L","tue":"M","wed":"M","thu":"J","fri":"V","sat":"S"},"short":{"sun":"di","mon":"lu","tue":"ma","wed":"me","thu":"je","fri":"ve","sat":"sa"},"wide":{"sun":"dimanche","mon":"lundi","tue":"mardi","wed":"mercredi","thu":"jeudi","fri":"vendredi","sat":"samedi"}}},"quarters":{"format":{"abbreviated":{"1":"T1","2":"T2","3":"T3","4":"T4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"1er trimestre","2":"2e trimestre","3":"3e trimestre","4":"4e trimestre"}},"stand-alone":{"abbreviated":{"1":"T1","2":"T2","3":"T3","4":"T4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"1er trimestre","2":"2e trimestre","3":"3e trimestre","4":"4e trimestre"}}},"dayPeriods":{"format":{"abbreviated":{"midnight":"minuit","am":"AM","noon":"midi","pm":"PM","morning1":"mat.","afternoon1":"ap.m.","evening1":"soir","night1":"nuit"},"narrow":{"midnight":"minuit","am":"AM","noon":"midi","pm":"PM","morning1":"mat.","afternoon1":"ap.m.","evening1":"soir","night1":"nuit"},"wide":{"midnight":"minuit","am":"AM","noon":"midi","pm":"PM","morning1":"du matin","afternoon1":"de l’après-midi","evening1":"du soir","night1":"du matin"}},"stand-alone":{"abbreviated":{"midnight":"minuit","am":"AM","noon":"midi","pm":"PM","morning1":"mat.","afternoon1":"ap.m.","evening1":"soir","night1":"nuit"},"narrow":{"midnight":"minuit","am":"AM","noon":"midi","pm":"PM","morning1":"mat.","afternoon1":"ap.m.","evening1":"soir","night1":"nuit"},"wide":{"midnight":"minuit","am":"AM","noon":"midi","pm":"PM","morning1":"matin","afternoon1":"après-midi","evening1":"soir","night1":"nuit"}}},"eras":{"eraNames":{"0":"avant Jésus-Christ","1":"après Jésus-Christ","0-alt-variant":"avant l’ère commune","1-alt-variant":"de l’ère commune"},"eraAbbr":{"0":"av. J.-C.","1":"ap. J.-C.","0-alt-variant":"AEC","1-alt-variant":"EC"},"eraNarrow":{"0":"av. J.-C.","1":"ap. J.-C.","0-alt-variant":"AEC","1-alt-variant":"EC"}},"dateFormats":{"full":"EEEE d MMMM y","long":"d MMMM y","medium":"d MMM y","short":"dd/MM/y"},"timeFormats":{"full":"HH:mm:ss zzzz","long":"HH:mm:ss z","medium":"HH:mm:ss","short":"HH:mm"},"dateTimeFormats":{"full":"{1} 'à' {0}","long":"{1} 'à' {0}","medium":"{1} 'à' {0}","short":"{1} {0}","availableFormats":{"Bh":"h B","Bhm":"h:mm B","Bhms":"h:mm:ss B","d":"d","E":"E","EBhm":"E h:mm B","EBhms":"E h:mm:ss B","Ed":"E d","Ehm":"E h:mm a","EHm":"E HH:mm","Ehms":"E h:mm:ss a","EHms":"E HH:mm:ss","Gy":"y G","GyMMM":"MMM y G","GyMMMd":"d MMM y G","GyMMMEd":"E d MMM y G","h":"h a","H":"HH 'h'","hm":"h:mm a","Hm":"HH:mm","hms":"h:mm:ss a","Hms":"HH:mm:ss","hmsv":"h:mm:ss a v","Hmsv":"HH:mm:ss v","hmv":"h:mm a v","Hmv":"HH:mm v","M":"L","Md":"dd/MM","MEd":"E dd/MM","MMM":"LLL","MMMd":"d MMM","MMMEd":"E d MMM","MMMMd":"d MMMM","MMMMW-count-one":"'semaine' W (MMMM)","MMMMW-count-other":"'semaine' W (MMMM)","ms":"mm:ss","y":"y","yM":"MM/y","yMd":"dd/MM/y","yMEd":"E dd/MM/y","yMMM":"MMM y","yMMMd":"d MMM y","yMMMEd":"E d MMM y","yMMMM":"MMMM y","yQQQ":"QQQ y","yQQQQ":"QQQQ y","yw-count-one":"'semaine' w 'de' Y","yw-count-other":"'semaine' w 'de' Y"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{1} {0}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{1} {0}"},"intervalFormats":{"intervalFormatFallback":"{0} – {1}","d":{"d":"d–d"},"h":{"a":"h a – h a","h":"h – h a"},"H":{"H":"HH – HH"},"hm":{"a":"h:mm a – h:mm a","h":"h:mm – h:mm a","m":"h:mm – h:mm a"},"Hm":{"H":"HH:mm – HH:mm","m":"HH:mm – HH:mm"},"hmv":{"a":"h:mm a – h:mm a v","h":"h:mm – h:mm a v","m":"h:mm – h:mm a v"},"Hmv":{"H":"HH:mm – HH:mm v","m":"HH:mm – HH:mm v"},"hv":{"a":"h a – h a v","h":"h – h a v"},"Hv":{"H":"HH – HH v"},"M":{"M":"M–M"},"Md":{"d":"dd/MM – dd/MM","M":"dd/MM – dd/MM"},"MEd":{"d":"E dd/MM – E dd/MM","M":"E dd/MM – E dd/MM"},"MMM":{"M":"MMM–MMM"},"MMMd":{"d":"d–d MMM","M":"d MMM – d MMM"},"MMMEd":{"d":"E d – E d MMM","M":"E d MMM – E d MMM"},"y":{"y":"y–y"},"yM":{"M":"MM/y – MM/y","y":"MM/y – MM/y"},"yMd":{"d":"dd/MM/y – dd/MM/y","M":"dd/MM/y – dd/MM/y","y":"dd/MM/y – dd/MM/y"},"yMEd":{"d":"E dd/MM/y – E dd/MM/y","M":"E dd/MM/y – E dd/MM/y","y":"E dd/MM/y – E dd/MM/y"},"yMMM":{"M":"MMM–MMM y","y":"MMM y – MMM y"},"yMMMd":{"d":"d–d MMM y","M":"d MMM – d MMM y","y":"d MMM y – d MMM y"},"yMMMEd":{"d":"E d – E d MMM y","M":"E d MMM – E d MMM y","y":"E d MMM y – E d MMM y"},"yMMMM":{"M":"MMMM – MMMM y","y":"MMMM y – MMMM y"}}}}},"fields":{"era":{"displayName":"ère"},"era-short":{"displayName":"ère"},"era-narrow":{"displayName":"ère"},"year":{"displayName":"année","relative-type--1":"l’année dernière","relative-type-0":"cette année","relative-type-1":"l’année prochaine","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} an","relativeTimePattern-count-other":"dans {0} ans"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} an","relativeTimePattern-count-other":"il y a {0} ans"}},"year-short":{"displayName":"an","relative-type--1":"l’année dernière","relative-type-0":"cette année","relative-type-1":"l’année prochaine","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} a","relativeTimePattern-count-other":"dans {0} a"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} a","relativeTimePattern-count-other":"il y a {0} a"}},"year-narrow":{"displayName":"a","relative-type--1":"l’année dernière","relative-type-0":"cette année","relative-type-1":"l’année prochaine","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} a","relativeTimePattern-count-other":"+{0} a"},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} a","relativeTimePattern-count-other":"-{0} a"}},"quarter":{"displayName":"trimestre","relative-type--1":"le trimestre dernier","relative-type-0":"ce trimestre","relative-type-1":"le trimestre prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} trimestre","relativeTimePattern-count-other":"dans {0} trimestres"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} trimestre","relativeTimePattern-count-other":"il y a {0} trimestres"}},"quarter-short":{"displayName":"trim.","relative-type--1":"le trimestre dernier","relative-type-0":"ce trimestre","relative-type-1":"le trimestre prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} trim.","relativeTimePattern-count-other":"dans {0} trim."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} trim.","relativeTimePattern-count-other":"il y a {0} trim."}},"quarter-narrow":{"displayName":"trim.","relative-type--1":"le trimestre dernier","relative-type-0":"ce trimestre","relative-type-1":"le trimestre prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} trim.","relativeTimePattern-count-other":"+{0} trim."},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} trim.","relativeTimePattern-count-other":"-{0} trim."}},"month":{"displayName":"mois","relative-type--1":"le mois dernier","relative-type-0":"ce mois-ci","relative-type-1":"le mois prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mois","relativeTimePattern-count-other":"dans {0} mois"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mois","relativeTimePattern-count-other":"il y a {0} mois"}},"month-short":{"displayName":"m.","relative-type--1":"le mois dernier","relative-type-0":"ce mois-ci","relative-type-1":"le mois prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} m.","relativeTimePattern-count-other":"dans {0} m."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} m.","relativeTimePattern-count-other":"il y a {0} m."}},"month-narrow":{"displayName":"m.","relative-type--1":"le mois dernier","relative-type-0":"ce mois-ci","relative-type-1":"le mois prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} m.","relativeTimePattern-count-other":"+{0} m."},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} m.","relativeTimePattern-count-other":"-{0} m."}},"week":{"displayName":"semaine","relative-type--1":"la semaine dernière","relative-type-0":"cette semaine","relative-type-1":"la semaine prochaine","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} semaine","relativeTimePattern-count-other":"dans {0} semaines"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} semaine","relativeTimePattern-count-other":"il y a {0} semaines"},"relativePeriod":"la semaine du {0}"},"week-short":{"displayName":"sem.","relative-type--1":"la semaine dernière","relative-type-0":"cette semaine","relative-type-1":"la semaine prochaine","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} sem.","relativeTimePattern-count-other":"dans {0} sem."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} sem.","relativeTimePattern-count-other":"il y a {0} sem."},"relativePeriod":"sem. du {0}"},"week-narrow":{"displayName":"sem.","relative-type--1":"la semaine dernière","relative-type-0":"cette semaine","relative-type-1":"la semaine prochaine","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} sem.","relativeTimePattern-count-other":"+{0} sem."},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} sem.","relativeTimePattern-count-other":"-{0} sem."},"relativePeriod":"sem. du {0}"},"weekOfMonth":{"displayName":"semaine (mois)"},"weekOfMonth-short":{"displayName":"sem. (m.)"},"weekOfMonth-narrow":{"displayName":"sem. (m.)"},"day":{"displayName":"jour","relative-type--2":"avant-hier","relative-type--1":"hier","relative-type-0":"aujourd’hui","relative-type-1":"demain","relative-type-2":"après-demain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} jour","relativeTimePattern-count-other":"dans {0} jours"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} jour","relativeTimePattern-count-other":"il y a {0} jours"}},"day-short":{"displayName":"j","relative-type--2":"avant-hier","relative-type--1":"hier","relative-type-0":"aujourd’hui","relative-type-1":"demain","relative-type-2":"après-demain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} j","relativeTimePattern-count-other":"dans {0} j"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} j","relativeTimePattern-count-other":"il y a {0} j"}},"day-narrow":{"displayName":"j","relative-type--2":"avant-hier","relative-type--1":"hier","relative-type-0":"aujourd’hui","relative-type-1":"demain","relative-type-2":"après-demain","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} j","relativeTimePattern-count-other":"+{0} j"},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} j","relativeTimePattern-count-other":"-{0} j"}},"dayOfYear":{"displayName":"jour (année)"},"dayOfYear-short":{"displayName":"j (an)"},"dayOfYear-narrow":{"displayName":"j (an)"},"weekday":{"displayName":"jour de la semaine"},"weekday-short":{"displayName":"j (sem.)"},"weekday-narrow":{"displayName":"j (sem.)"},"weekdayOfMonth":{"displayName":"jour (mois)"},"weekdayOfMonth-short":{"displayName":"jour (mois)"},"weekdayOfMonth-narrow":{"displayName":"jour (mois)"},"sun":{"relative-type--1":"dimanche dernier","relative-type-0":"ce dimanche","relative-type-1":"dimanche prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} dimanche","relativeTimePattern-count-other":"dans {0} dimanches"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} dimanche","relativeTimePattern-count-other":"il y a {0} dimanches"}},"sun-short":{"relative-type--1":"dim. dernier","relative-type-0":"ce dim.","relative-type-1":"dim. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} dim.","relativeTimePattern-count-other":"dans {0} dim."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} dim.","relativeTimePattern-count-other":"il y a {0} dim."}},"sun-narrow":{"relative-type--1":"dim. dernier","relative-type-0":"ce dim.","relative-type-1":"dim. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} dim.","relativeTimePattern-count-other":"dans {0} dim."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} dim.","relativeTimePattern-count-other":"il y a {0} dim."}},"mon":{"relative-type--1":"lundi dernier","relative-type-0":"ce lundi","relative-type-1":"lundi prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} lundi","relativeTimePattern-count-other":"dans {0} lundis"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} lundi","relativeTimePattern-count-other":"il y a {0} lundis"}},"mon-short":{"relative-type--1":"lun. dernier","relative-type-0":"ce lun.","relative-type-1":"lun. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} lun.","relativeTimePattern-count-other":"dans {0} lun."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} lun.","relativeTimePattern-count-other":"il y a {0} lun."}},"mon-narrow":{"relative-type--1":"lun. dernier","relative-type-0":"ce lun.","relative-type-1":"lun. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} lun.","relativeTimePattern-count-other":"dans {0} lun."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} lun.","relativeTimePattern-count-other":"il y a {0} lun."}},"tue":{"relative-type--1":"mardi dernier","relative-type-0":"ce mardi","relative-type-1":"mardi prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mardi","relativeTimePattern-count-other":"dans {0} mardis"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mardi","relativeTimePattern-count-other":"il y a {0} mardis"}},"tue-short":{"relative-type--1":"mar. dernier","relative-type-0":"ce mar.","relative-type-1":"mar. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mar.","relativeTimePattern-count-other":"dans {0} mar."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mar.","relativeTimePattern-count-other":"il y a {0} mar."}},"tue-narrow":{"relative-type--1":"mar. dernier","relative-type-0":"ce mar.","relative-type-1":"mar. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mar.","relativeTimePattern-count-other":"dans {0} mar."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mar.","relativeTimePattern-count-other":"il y a {0} mar."}},"wed":{"relative-type--1":"mercredi dernier","relative-type-0":"ce mercredi","relative-type-1":"mercredi prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mercredi","relativeTimePattern-count-other":"dans {0} mercredis"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mercredi","relativeTimePattern-count-other":"il y a {0} mercredis"}},"wed-short":{"relative-type--1":"mer. dernier","relative-type-0":"ce mer.","relative-type-1":"mer. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mer.","relativeTimePattern-count-other":"dans {0} mer."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mer.","relativeTimePattern-count-other":"il y a {0} mer."}},"wed-narrow":{"relative-type--1":"mer. dernier","relative-type-0":"ce mer.","relative-type-1":"mer. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} mer.","relativeTimePattern-count-other":"dans {0} mer."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} mer.","relativeTimePattern-count-other":"il y a {0} mer."}},"thu":{"relative-type--1":"jeudi dernier","relative-type-0":"ce jeudi","relative-type-1":"jeudi prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} jeudi","relativeTimePattern-count-other":"dans {0} jeudis"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} jeudi","relativeTimePattern-count-other":"il y a {0} jeudis"}},"thu-short":{"relative-type--1":"jeu. dernier","relative-type-0":"ce jeu.","relative-type-1":"jeu. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} jeu.","relativeTimePattern-count-other":"dans {0} jeu."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} jeu.","relativeTimePattern-count-other":"il y a {0} jeu."}},"thu-narrow":{"relative-type--1":"jeu. dernier","relative-type-0":"ce jeu.","relative-type-1":"jeu. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} jeu.","relativeTimePattern-count-other":"dans {0} jeu."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} jeu.","relativeTimePattern-count-other":"il y a {0} jeu."}},"fri":{"relative-type--1":"vendredi dernier","relative-type-0":"ce vendredi","relative-type-1":"vendredi prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} vendredi","relativeTimePattern-count-other":"dans {0} vendredis"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} vendredi","relativeTimePattern-count-other":"il y a {0} vendredis"}},"fri-short":{"relative-type--1":"ven. dernier","relative-type-0":"ce ven.","relative-type-1":"ven. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} ven.","relativeTimePattern-count-other":"dans {0} ven."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} ven.","relativeTimePattern-count-other":"il y a {0} ven."}},"fri-narrow":{"relative-type--1":"ven. dernier","relative-type-0":"ce ven.","relative-type-1":"ven. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} ven.","relativeTimePattern-count-other":"dans {0} ven."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} ven.","relativeTimePattern-count-other":"il y a {0} ven."}},"sat":{"relative-type--1":"samedi dernier","relative-type-0":"ce samedi","relative-type-1":"samedi prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} samedi","relativeTimePattern-count-other":"dans {0} samedis"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} samedi","relativeTimePattern-count-other":"il y a {0} samedis"}},"sat-short":{"relative-type--1":"sam. dernier","relative-type-0":"ce sam.","relative-type-1":"sam. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} sam.","relativeTimePattern-count-other":"dans {0} sam."},"relativeTime-type-past":{"relativeTimePattern-count-one":"dans {0} sam.","relativeTimePattern-count-other":"dans {0} sam."}},"sat-narrow":{"relative-type--1":"sam. dernier","relative-type-0":"ce sam.","relative-type-1":"sam. prochain","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} sam.","relativeTimePattern-count-other":"dans {0} sam."},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} sam.","relativeTimePattern-count-other":"il y a {0} sam."}},"dayperiod-short":{"displayName":"cadran"},"dayperiod":{"displayName":"cadran"},"dayperiod-narrow":{"displayName":"cadran"},"hour":{"displayName":"heure","relative-type-0":"cette heure-ci","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} heure","relativeTimePattern-count-other":"dans {0} heures"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} heure","relativeTimePattern-count-other":"il y a {0} heures"}},"hour-short":{"displayName":"h","relative-type-0":"cette heure-ci","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} h","relativeTimePattern-count-other":"dans {0} h"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} h","relativeTimePattern-count-other":"il y a {0} h"}},"hour-narrow":{"displayName":"h","relative-type-0":"cette heure-ci","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} h","relativeTimePattern-count-other":"+{0} h"},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} h","relativeTimePattern-count-other":"-{0} h"}},"minute":{"displayName":"minute","relative-type-0":"cette minute-ci","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} minute","relativeTimePattern-count-other":"dans {0} minutes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} minute","relativeTimePattern-count-other":"il y a {0} minutes"}},"minute-short":{"displayName":"min","relative-type-0":"cette minute-ci","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} min","relativeTimePattern-count-other":"dans {0} min"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} min","relativeTimePattern-count-other":"il y a {0} min"}},"minute-narrow":{"displayName":"min","relative-type-0":"cette minute-ci","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} min","relativeTimePattern-count-other":"+{0} min"},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} min","relativeTimePattern-count-other":"-{0} min"}},"second":{"displayName":"seconde","relative-type-0":"maintenant","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} seconde","relativeTimePattern-count-other":"dans {0} secondes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} seconde","relativeTimePattern-count-other":"il y a {0} secondes"}},"second-short":{"displayName":"s","relative-type-0":"maintenant","relativeTime-type-future":{"relativeTimePattern-count-one":"dans {0} s","relativeTimePattern-count-other":"dans {0} s"},"relativeTime-type-past":{"relativeTimePattern-count-one":"il y a {0} s","relativeTimePattern-count-other":"il y a {0} s"}},"second-narrow":{"displayName":"s","relative-type-0":"maintenant","relativeTime-type-future":{"relativeTimePattern-count-one":"+{0} s","relativeTimePattern-count-other":"+{0} s"},"relativeTime-type-past":{"relativeTimePattern-count-one":"-{0} s","relativeTimePattern-count-other":"-{0} s"}},"zone":{"displayName":"fuseau horaire"},"zone-short":{"displayName":"fuseau horaire"},"zone-narrow":{"displayName":"fuseau horaire"}},"timeZoneNames":{"hourFormat":"+HH:mm;−HH:mm","gmtFormat":"UTC{0}","gmtZeroFormat":"UTC","regionFormat":"heure : {0}","regionFormat-type-daylight":"{0} (heure d’été)","regionFormat-type-standard":"{0} (heure standard)","fallbackFormat":"{1} ({0})","zone":{"America":{"Adak":{"exemplarCity":"Adak"},"Anchorage":{"exemplarCity":"Anchorage"},"Anguilla":{"exemplarCity":"Anguilla"},"Antigua":{"exemplarCity":"Antigua"},"Araguaina":{"exemplarCity":"Araguaína"},"Argentina":{"Rio_Gallegos":{"exemplarCity":"Río Gallegos"},"San_Juan":{"exemplarCity":"San Juan"},"Ushuaia":{"exemplarCity":"Ushuaïa"},"La_Rioja":{"exemplarCity":"La Rioja"},"San_Luis":{"exemplarCity":"San Luis"},"Salta":{"exemplarCity":"Salta"},"Tucuman":{"exemplarCity":"Tucumán"}},"Aruba":{"exemplarCity":"Aruba"},"Asuncion":{"exemplarCity":"Asunción"},"Bahia":{"exemplarCity":"Bahia"},"Bahia_Banderas":{"exemplarCity":"Bahia de Banderas"},"Barbados":{"exemplarCity":"La Barbade"},"Belem":{"exemplarCity":"Belém"},"Belize":{"exemplarCity":"Belize"},"Blanc-Sablon":{"exemplarCity":"Blanc-Sablon"},"Boa_Vista":{"exemplarCity":"Boa Vista"},"Bogota":{"exemplarCity":"Bogota"},"Boise":{"exemplarCity":"Boise"},"Buenos_Aires":{"exemplarCity":"Buenos Aires"},"Cambridge_Bay":{"exemplarCity":"Cambridge Bay"},"Campo_Grande":{"exemplarCity":"Campo Grande"},"Cancun":{"exemplarCity":"Cancún"},"Caracas":{"exemplarCity":"Caracas"},"Catamarca":{"exemplarCity":"Catamarca"},"Cayenne":{"exemplarCity":"Cayenne"},"Cayman":{"exemplarCity":"Caïmans"},"Chicago":{"exemplarCity":"Chicago"},"Chihuahua":{"exemplarCity":"Chihuahua"},"Coral_Harbour":{"exemplarCity":"Atikokan"},"Cordoba":{"exemplarCity":"Córdoba"},"Costa_Rica":{"exemplarCity":"Costa Rica"},"Creston":{"exemplarCity":"Creston"},"Cuiaba":{"exemplarCity":"Cuiabá"},"Curacao":{"exemplarCity":"Curaçao"},"Danmarkshavn":{"exemplarCity":"Danmarkshavn"},"Dawson":{"exemplarCity":"Dawson"},"Dawson_Creek":{"exemplarCity":"Dawson Creek"},"Denver":{"exemplarCity":"Denver"},"Detroit":{"exemplarCity":"Détroit"},"Dominica":{"exemplarCity":"Dominique"},"Edmonton":{"exemplarCity":"Edmonton"},"Eirunepe":{"exemplarCity":"Eirunepé"},"El_Salvador":{"exemplarCity":"El Salvador"},"Fort_Nelson":{"exemplarCity":"Fort Nelson"},"Fortaleza":{"exemplarCity":"Fortaleza"},"Glace_Bay":{"exemplarCity":"Glace Bay"},"Godthab":{"exemplarCity":"Nuuk"},"Goose_Bay":{"exemplarCity":"Goose Bay"},"Grand_Turk":{"exemplarCity":"Grand Turk"},"Grenada":{"exemplarCity":"Grenade"},"Guadeloupe":{"exemplarCity":"Guadeloupe"},"Guatemala":{"exemplarCity":"Guatemala"},"Guayaquil":{"exemplarCity":"Guayaquil"},"Guyana":{"exemplarCity":"Guyana"},"Halifax":{"exemplarCity":"Halifax"},"Havana":{"exemplarCity":"La Havane"},"Hermosillo":{"exemplarCity":"Hermosillo"},"Indiana":{"Vincennes":{"exemplarCity":"Vincennes [Indiana]"},"Petersburg":{"exemplarCity":"Petersburg [Indiana]"},"Tell_City":{"exemplarCity":"Tell City [Indiana]"},"Knox":{"exemplarCity":"Knox [Indiana]"},"Winamac":{"exemplarCity":"Winamac [Indiana]"},"Marengo":{"exemplarCity":"Marengo [Indiana]"},"Vevay":{"exemplarCity":"Vevay [Indiana]"}},"Indianapolis":{"exemplarCity":"Indianapolis"},"Inuvik":{"exemplarCity":"Inuvik"},"Iqaluit":{"exemplarCity":"Iqaluit"},"Jamaica":{"exemplarCity":"Jamaïque"},"Jujuy":{"exemplarCity":"Jujuy"},"Juneau":{"exemplarCity":"Juneau"},"Kentucky":{"Monticello":{"exemplarCity":"Monticello [Kentucky]"}},"Kralendijk":{"exemplarCity":"Kralendijk"},"La_Paz":{"exemplarCity":"La Paz"},"Lima":{"exemplarCity":"Lima"},"Los_Angeles":{"exemplarCity":"Los Angeles"},"Louisville":{"exemplarCity":"Louisville"},"Lower_Princes":{"exemplarCity":"Lower Prince’s Quarter"},"Maceio":{"exemplarCity":"Maceió"},"Managua":{"exemplarCity":"Managua"},"Manaus":{"exemplarCity":"Manaos"},"Marigot":{"exemplarCity":"Marigot"},"Martinique":{"exemplarCity":"Martinique"},"Matamoros":{"exemplarCity":"Matamoros"},"Mazatlan":{"exemplarCity":"Mazatlán"},"Mendoza":{"exemplarCity":"Mendoza"},"Menominee":{"exemplarCity":"Menominee"},"Merida":{"exemplarCity":"Mérida"},"Metlakatla":{"exemplarCity":"Metlakatla"},"Mexico_City":{"exemplarCity":"Mexico"},"Miquelon":{"exemplarCity":"Miquelon"},"Moncton":{"exemplarCity":"Moncton"},"Monterrey":{"exemplarCity":"Monterrey"},"Montevideo":{"exemplarCity":"Montevideo"},"Montserrat":{"exemplarCity":"Montserrat"},"Nassau":{"exemplarCity":"Nassau"},"New_York":{"exemplarCity":"New York"},"Nipigon":{"exemplarCity":"Nipigon"},"Nome":{"exemplarCity":"Nome"},"Noronha":{"exemplarCity":"Noronha"},"North_Dakota":{"Beulah":{"exemplarCity":"Beulah (Dakota du Nord)"},"New_Salem":{"exemplarCity":"New Salem (Dakota du Nord)"},"Center":{"exemplarCity":"Center (Dakota du Nord)"}},"Ojinaga":{"exemplarCity":"Ojinaga"},"Panama":{"exemplarCity":"Panama"},"Pangnirtung":{"exemplarCity":"Pangnirtung"},"Paramaribo":{"exemplarCity":"Paramaribo"},"Phoenix":{"exemplarCity":"Phoenix"},"Port-au-Prince":{"exemplarCity":"Port-au-Prince"},"Port_of_Spain":{"exemplarCity":"Port-d’Espagne"},"Porto_Velho":{"exemplarCity":"Porto Velho"},"Puerto_Rico":{"exemplarCity":"Porto Rico"},"Punta_Arenas":{"exemplarCity":"Punta Arenas"},"Rainy_River":{"exemplarCity":"Rainy River"},"Rankin_Inlet":{"exemplarCity":"Rankin Inlet"},"Recife":{"exemplarCity":"Recife"},"Regina":{"exemplarCity":"Regina"},"Resolute":{"exemplarCity":"Resolute"},"Rio_Branco":{"exemplarCity":"Rio Branco"},"Santa_Isabel":{"exemplarCity":"Santa Isabel"},"Santarem":{"exemplarCity":"Santarém"},"Santiago":{"exemplarCity":"Santiago"},"Santo_Domingo":{"exemplarCity":"Saint-Domingue"},"Sao_Paulo":{"exemplarCity":"São Paulo"},"Scoresbysund":{"exemplarCity":"Ittoqqortoormiit"},"Sitka":{"exemplarCity":"Sitka"},"St_Barthelemy":{"exemplarCity":"Saint-Barthélemy"},"St_Johns":{"exemplarCity":"Saint-Jean de Terre-Neuve"},"St_Kitts":{"exemplarCity":"Saint-Christophe"},"St_Lucia":{"exemplarCity":"Sainte-Lucie"},"St_Thomas":{"exemplarCity":"Saint-Thomas"},"St_Vincent":{"exemplarCity":"Saint-Vincent"},"Swift_Current":{"exemplarCity":"Swift Current"},"Tegucigalpa":{"exemplarCity":"Tégucigalpa"},"Thule":{"exemplarCity":"Thulé"},"Thunder_Bay":{"exemplarCity":"Thunder Bay"},"Tijuana":{"exemplarCity":"Tijuana"},"Toronto":{"exemplarCity":"Toronto"},"Tortola":{"exemplarCity":"Tortola"},"Vancouver":{"exemplarCity":"Vancouver"},"Whitehorse":{"exemplarCity":"Whitehorse"},"Winnipeg":{"exemplarCity":"Winnipeg"},"Yakutat":{"exemplarCity":"Yakutat"},"Yellowknife":{"exemplarCity":"Yellowknife"}},"Atlantic":{"Azores":{"exemplarCity":"Açores"},"Bermuda":{"exemplarCity":"Bermudes"},"Canary":{"exemplarCity":"Îles Canaries"},"Cape_Verde":{"exemplarCity":"Cap-Vert"},"Faeroe":{"exemplarCity":"Féroé"},"Madeira":{"exemplarCity":"Madère"},"Reykjavik":{"exemplarCity":"Reykjavik"},"South_Georgia":{"exemplarCity":"Géorgie du Sud"},"St_Helena":{"exemplarCity":"Sainte-Hélène"},"Stanley":{"exemplarCity":"Stanley"}},"Europe":{"Amsterdam":{"exemplarCity":"Amsterdam"},"Andorra":{"exemplarCity":"Andorre"},"Astrakhan":{"exemplarCity":"Astrakhan"},"Athens":{"exemplarCity":"Athènes"},"Belgrade":{"exemplarCity":"Belgrade"},"Berlin":{"exemplarCity":"Berlin"},"Bratislava":{"exemplarCity":"Bratislava"},"Brussels":{"exemplarCity":"Bruxelles"},"Bucharest":{"exemplarCity":"Bucarest"},"Budapest":{"exemplarCity":"Budapest"},"Busingen":{"exemplarCity":"Büsingen"},"Chisinau":{"exemplarCity":"Chisinau"},"Copenhagen":{"exemplarCity":"Copenhague"},"Dublin":{"long":{"daylight":"heure d’été irlandaise"},"exemplarCity":"Dublin"},"Gibraltar":{"exemplarCity":"Gibraltar"},"Guernsey":{"exemplarCity":"Guernesey"},"Helsinki":{"exemplarCity":"Helsinki"},"Isle_of_Man":{"exemplarCity":"Île de Man"},"Istanbul":{"exemplarCity":"Istanbul"},"Jersey":{"exemplarCity":"Jersey"},"Kaliningrad":{"exemplarCity":"Kaliningrad"},"Kiev":{"exemplarCity":"Kiev"},"Kirov":{"exemplarCity":"Kirov"},"Lisbon":{"exemplarCity":"Lisbonne"},"Ljubljana":{"exemplarCity":"Ljubljana"},"London":{"long":{"daylight":"heure d’été britannique"},"exemplarCity":"Londres"},"Luxembourg":{"exemplarCity":"Luxembourg"},"Madrid":{"exemplarCity":"Madrid"},"Malta":{"exemplarCity":"Malte"},"Mariehamn":{"exemplarCity":"Mariehamn"},"Minsk":{"exemplarCity":"Minsk"},"Monaco":{"exemplarCity":"Monaco"},"Moscow":{"exemplarCity":"Moscou"},"Oslo":{"exemplarCity":"Oslo"},"Paris":{"exemplarCity":"Paris"},"Podgorica":{"exemplarCity":"Podgorica"},"Prague":{"exemplarCity":"Prague"},"Riga":{"exemplarCity":"Riga"},"Rome":{"exemplarCity":"Rome"},"Samara":{"exemplarCity":"Samara"},"San_Marino":{"exemplarCity":"Saint-Marin"},"Sarajevo":{"exemplarCity":"Sarajevo"},"Saratov":{"exemplarCity":"Saratov"},"Simferopol":{"exemplarCity":"Simferopol"},"Skopje":{"exemplarCity":"Skopje"},"Sofia":{"exemplarCity":"Sofia"},"Stockholm":{"exemplarCity":"Stockholm"},"Tallinn":{"exemplarCity":"Tallinn"},"Tirane":{"exemplarCity":"Tirana"},"Ulyanovsk":{"exemplarCity":"Oulianovsk"},"Uzhgorod":{"exemplarCity":"Oujgorod"},"Vaduz":{"exemplarCity":"Vaduz"},"Vatican":{"exemplarCity":"Le Vatican"},"Vienna":{"exemplarCity":"Vienne"},"Vilnius":{"exemplarCity":"Vilnius"},"Volgograd":{"exemplarCity":"Volgograd"},"Warsaw":{"exemplarCity":"Varsovie"},"Zagreb":{"exemplarCity":"Zagreb"},"Zaporozhye":{"exemplarCity":"Zaporojie"},"Zurich":{"exemplarCity":"Zurich"}},"Africa":{"Abidjan":{"exemplarCity":"Abidjan"},"Accra":{"exemplarCity":"Accra"},"Addis_Ababa":{"exemplarCity":"Addis-Abeba"},"Algiers":{"exemplarCity":"Alger"},"Asmera":{"exemplarCity":"Asmara"},"Bamako":{"exemplarCity":"Bamako"},"Bangui":{"exemplarCity":"Bangui"},"Banjul":{"exemplarCity":"Banjul"},"Bissau":{"exemplarCity":"Bissau"},"Blantyre":{"exemplarCity":"Blantyre"},"Brazzaville":{"exemplarCity":"Brazzaville"},"Bujumbura":{"exemplarCity":"Bujumbura"},"Cairo":{"exemplarCity":"Le Caire"},"Casablanca":{"exemplarCity":"Casablanca"},"Ceuta":{"exemplarCity":"Ceuta"},"Conakry":{"exemplarCity":"Conakry"},"Dakar":{"exemplarCity":"Dakar"},"Dar_es_Salaam":{"exemplarCity":"Dar es Salaam"},"Djibouti":{"exemplarCity":"Djibouti"},"Douala":{"exemplarCity":"Douala"},"El_Aaiun":{"exemplarCity":"Laâyoune"},"Freetown":{"exemplarCity":"Freetown"},"Gaborone":{"exemplarCity":"Gaborone"},"Harare":{"exemplarCity":"Harare"},"Johannesburg":{"exemplarCity":"Johannesburg"},"Juba":{"exemplarCity":"Juba"},"Kampala":{"exemplarCity":"Kampala"},"Khartoum":{"exemplarCity":"Khartoum"},"Kigali":{"exemplarCity":"Kigali"},"Kinshasa":{"exemplarCity":"Kinshasa"},"Lagos":{"exemplarCity":"Lagos"},"Libreville":{"exemplarCity":"Libreville"},"Lome":{"exemplarCity":"Lomé"},"Luanda":{"exemplarCity":"Luanda"},"Lubumbashi":{"exemplarCity":"Lubumbashi"},"Lusaka":{"exemplarCity":"Lusaka"},"Malabo":{"exemplarCity":"Malabo"},"Maputo":{"exemplarCity":"Maputo"},"Maseru":{"exemplarCity":"Maseru"},"Mbabane":{"exemplarCity":"Mbabane"},"Mogadishu":{"exemplarCity":"Mogadiscio"},"Monrovia":{"exemplarCity":"Monrovia"},"Nairobi":{"exemplarCity":"Nairobi"},"Ndjamena":{"exemplarCity":"N’Djamena"},"Niamey":{"exemplarCity":"Niamey"},"Nouakchott":{"exemplarCity":"Nouakchott"},"Ouagadougou":{"exemplarCity":"Ouagadougou"},"Porto-Novo":{"exemplarCity":"Porto-Novo"},"Sao_Tome":{"exemplarCity":"São Tomé"},"Tripoli":{"exemplarCity":"Tripoli (Libye)"},"Tunis":{"exemplarCity":"Tunis"},"Windhoek":{"exemplarCity":"Windhoek"}},"Asia":{"Aden":{"exemplarCity":"Aden"},"Almaty":{"exemplarCity":"Alma Ata"},"Amman":{"exemplarCity":"Amman"},"Anadyr":{"exemplarCity":"Anadyr"},"Aqtau":{"exemplarCity":"Aktaou"},"Aqtobe":{"exemplarCity":"Aktioubinsk"},"Ashgabat":{"exemplarCity":"Achgabat"},"Atyrau":{"exemplarCity":"Atyraou"},"Baghdad":{"exemplarCity":"Bagdad"},"Bahrain":{"exemplarCity":"Bahreïn"},"Baku":{"exemplarCity":"Bakou"},"Bangkok":{"exemplarCity":"Bangkok"},"Barnaul":{"exemplarCity":"Barnaul"},"Beirut":{"exemplarCity":"Beyrouth"},"Bishkek":{"exemplarCity":"Bichkek"},"Brunei":{"exemplarCity":"Brunei"},"Calcutta":{"exemplarCity":"Calcutta"},"Chita":{"exemplarCity":"Tchita"},"Choibalsan":{"exemplarCity":"Tchoïbalsan"},"Colombo":{"exemplarCity":"Colombo"},"Damascus":{"exemplarCity":"Damas"},"Dhaka":{"exemplarCity":"Dhaka"},"Dili":{"exemplarCity":"Dili"},"Dubai":{"exemplarCity":"Dubaï"},"Dushanbe":{"exemplarCity":"Douchanbé"},"Famagusta":{"exemplarCity":"Famagouste"},"Gaza":{"exemplarCity":"Gaza"},"Hebron":{"exemplarCity":"Hébron"},"Hong_Kong":{"exemplarCity":"Hong Kong"},"Hovd":{"exemplarCity":"Hovd"},"Irkutsk":{"exemplarCity":"Irkoutsk"},"Jakarta":{"exemplarCity":"Jakarta"},"Jayapura":{"exemplarCity":"Jayapura"},"Jerusalem":{"exemplarCity":"Jérusalem"},"Kabul":{"exemplarCity":"Kaboul"},"Kamchatka":{"exemplarCity":"Kamtchatka"},"Karachi":{"exemplarCity":"Karachi"},"Katmandu":{"exemplarCity":"Katmandou"},"Khandyga":{"exemplarCity":"Khandyga"},"Krasnoyarsk":{"exemplarCity":"Krasnoïarsk"},"Kuala_Lumpur":{"exemplarCity":"Kuala Lumpur"},"Kuching":{"exemplarCity":"Kuching"},"Kuwait":{"exemplarCity":"Koweït"},"Macau":{"exemplarCity":"Macao"},"Magadan":{"exemplarCity":"Magadan"},"Makassar":{"exemplarCity":"Macassar"},"Manila":{"exemplarCity":"Manille"},"Muscat":{"exemplarCity":"Mascate"},"Nicosia":{"exemplarCity":"Nicosie"},"Novokuznetsk":{"exemplarCity":"Novokuznetsk"},"Novosibirsk":{"exemplarCity":"Novossibirsk"},"Omsk":{"exemplarCity":"Omsk"},"Oral":{"exemplarCity":"Ouralsk"},"Phnom_Penh":{"exemplarCity":"Phnom Penh"},"Pontianak":{"exemplarCity":"Pontianak"},"Pyongyang":{"exemplarCity":"Pyongyang"},"Qatar":{"exemplarCity":"Qatar"},"Qyzylorda":{"exemplarCity":"Kzyl Orda"},"Rangoon":{"exemplarCity":"Rangoun"},"Riyadh":{"exemplarCity":"Riyad"},"Saigon":{"exemplarCity":"Hô-Chi-Minh-Ville"},"Sakhalin":{"exemplarCity":"Sakhaline"},"Samarkand":{"exemplarCity":"Samarcande"},"Seoul":{"exemplarCity":"Séoul"},"Shanghai":{"exemplarCity":"Shanghai"},"Singapore":{"exemplarCity":"Singapour"},"Srednekolymsk":{"exemplarCity":"Srednekolymsk"},"Taipei":{"exemplarCity":"Taipei"},"Tashkent":{"exemplarCity":"Tachkent"},"Tbilisi":{"exemplarCity":"Tbilissi"},"Tehran":{"exemplarCity":"Téhéran"},"Thimphu":{"exemplarCity":"Thimphu"},"Tokyo":{"exemplarCity":"Tokyo"},"Tomsk":{"exemplarCity":"Tomsk"},"Ulaanbaatar":{"exemplarCity":"Oulan-Bator"},"Urumqi":{"exemplarCity":"Ürümqi"},"Ust-Nera":{"exemplarCity":"Ust-Nera"},"Vientiane":{"exemplarCity":"Vientiane"},"Vladivostok":{"exemplarCity":"Vladivostok"},"Yakutsk":{"exemplarCity":"Iakoutsk"},"Yekaterinburg":{"exemplarCity":"Ekaterinbourg"},"Yerevan":{"exemplarCity":"Erevan"}},"Indian":{"Antananarivo":{"exemplarCity":"Antananarivo"},"Chagos":{"exemplarCity":"Chagos"},"Christmas":{"exemplarCity":"Christmas"},"Cocos":{"exemplarCity":"Cocos"},"Comoro":{"exemplarCity":"Comores"},"Kerguelen":{"exemplarCity":"Kerguelen"},"Mahe":{"exemplarCity":"Mahé"},"Maldives":{"exemplarCity":"Maldives"},"Mauritius":{"exemplarCity":"Maurice"},"Mayotte":{"exemplarCity":"Mayotte"},"Reunion":{"exemplarCity":"La Réunion"}},"Australia":{"Adelaide":{"exemplarCity":"Adélaïde"},"Brisbane":{"exemplarCity":"Brisbane"},"Broken_Hill":{"exemplarCity":"Broken Hill"},"Currie":{"exemplarCity":"Currie"},"Darwin":{"exemplarCity":"Darwin"},"Eucla":{"exemplarCity":"Eucla"},"Hobart":{"exemplarCity":"Hobart"},"Lindeman":{"exemplarCity":"Lindeman"},"Lord_Howe":{"exemplarCity":"Lord Howe"},"Melbourne":{"exemplarCity":"Melbourne"},"Perth":{"exemplarCity":"Perth"},"Sydney":{"exemplarCity":"Sydney"}},"Pacific":{"Apia":{"exemplarCity":"Apia"},"Auckland":{"exemplarCity":"Auckland"},"Bougainville":{"exemplarCity":"Bougainville"},"Chatham":{"exemplarCity":"Chatham"},"Easter":{"exemplarCity":"Île de Pâques"},"Efate":{"exemplarCity":"Éfaté"},"Enderbury":{"exemplarCity":"Enderbury"},"Fakaofo":{"exemplarCity":"Fakaofo"},"Fiji":{"exemplarCity":"Fidji"},"Funafuti":{"exemplarCity":"Funafuti"},"Galapagos":{"exemplarCity":"Galápagos"},"Gambier":{"exemplarCity":"Gambier"},"Guadalcanal":{"exemplarCity":"Guadalcanal"},"Guam":{"exemplarCity":"Guam"},"Honolulu":{"exemplarCity":"Honolulu"},"Johnston":{"exemplarCity":"Johnston"},"Kiritimati":{"exemplarCity":"Kiritimati"},"Kosrae":{"exemplarCity":"Kosrae"},"Kwajalein":{"exemplarCity":"Kwajalein"},"Majuro":{"exemplarCity":"Majuro"},"Marquesas":{"exemplarCity":"Marquises"},"Midway":{"exemplarCity":"Midway"},"Nauru":{"exemplarCity":"Nauru"},"Niue":{"exemplarCity":"Niue"},"Norfolk":{"exemplarCity":"Norfolk"},"Noumea":{"exemplarCity":"Nouméa"},"Pago_Pago":{"exemplarCity":"Pago Pago"},"Palau":{"exemplarCity":"Palau"},"Pitcairn":{"exemplarCity":"Pitcairn"},"Ponape":{"exemplarCity":"Pohnpei"},"Port_Moresby":{"exemplarCity":"Port Moresby"},"Rarotonga":{"exemplarCity":"Rarotonga"},"Saipan":{"exemplarCity":"Saipan"},"Tahiti":{"exemplarCity":"Tahiti"},"Tarawa":{"exemplarCity":"Tarawa"},"Tongatapu":{"exemplarCity":"Tongatapu"},"Truk":{"exemplarCity":"Chuuk"},"Wake":{"exemplarCity":"Wake"},"Wallis":{"exemplarCity":"Wallis"}},"Arctic":{"Longyearbyen":{"exemplarCity":"Longyearbyen"}},"Antarctica":{"Casey":{"exemplarCity":"Casey"},"Davis":{"exemplarCity":"Davis"},"DumontDUrville":{"exemplarCity":"Dumont d’Urville"},"Macquarie":{"exemplarCity":"Macquarie"},"Mawson":{"exemplarCity":"Mawson"},"McMurdo":{"exemplarCity":"McMurdo"},"Palmer":{"exemplarCity":"Palmer"},"Rothera":{"exemplarCity":"Rothera"},"Syowa":{"exemplarCity":"Showa"},"Troll":{"exemplarCity":"Troll"},"Vostok":{"exemplarCity":"Vostok"}},"Etc":{"UTC":{"long":{"standard":"Temps universel coordonné"},"short":{"standard":"UTC"}},"Unknown":{"exemplarCity":"ville inconnue"}}},"metazone":{"Acre":{"long":{"generic":"heure de l’Acre","standard":"heure normale de l’Acre","daylight":"heure d’été de l’Acre"}},"Afghanistan":{"long":{"standard":"heure de l’Afghanistan"}},"Africa_Central":{"long":{"standard":"heure normale d’Afrique centrale"}},"Africa_Eastern":{"long":{"standard":"heure normale d’Afrique de l’Est"}},"Africa_Southern":{"long":{"standard":"heure normale d’Afrique méridionale"}},"Africa_Western":{"long":{"generic":"heure d’Afrique de l’Ouest","standard":"heure normale d’Afrique de l’Ouest","daylight":"heure d’été d’Afrique de l’Ouest"}},"Alaska":{"long":{"generic":"heure de l’Alaska","standard":"heure normale de l’Alaska","daylight":"heure d’été de l’Alaska"}},"Almaty":{"long":{"generic":"heure d’Alma Ata","standard":"heure normale d’Alma Ata","daylight":"heure d’été d’Alma Ata"}},"Amazon":{"long":{"generic":"heure de l’Amazonie","standard":"heure normale de l’Amazonie","daylight":"heure d’été de l’Amazonie"}},"America_Central":{"long":{"generic":"heure du centre nord-américain","standard":"heure normale du centre nord-américain","daylight":"heure d’été du Centre"}},"America_Eastern":{"long":{"generic":"heure de l’Est nord-américain","standard":"heure normale de l’Est nord-américain","daylight":"heure d’été de l’Est"}},"America_Mountain":{"long":{"generic":"heure des Rocheuses","standard":"heure normale des Rocheuses","daylight":"heure d’été des Rocheuses"}},"America_Pacific":{"long":{"generic":"heure du Pacifique nord-américain","standard":"heure normale du Pacifique nord-américain","daylight":"heure d’été du Pacifique"}},"Anadyr":{"long":{"generic":"heure d’Anadyr","standard":"heure normale d’Anadyr","daylight":"heure d’été d’Anadyr"}},"Apia":{"long":{"generic":"heure d’Apia","standard":"heure normale d’Apia","daylight":"heure d’été d’Apia"}},"Aqtau":{"long":{"generic":"heure d’Aktaou","standard":"heure normale d’Aktaou","daylight":"heure d’été d’Aktaou"}},"Aqtobe":{"long":{"generic":"heure d’Aqtöbe","standard":"heure normale d’Aqtöbe","daylight":"heure d’été d’Aqtöbe"}},"Arabian":{"long":{"generic":"heure de l’Arabie","standard":"heure normale de l’Arabie","daylight":"heure d’été de l’Arabie"}},"Argentina":{"long":{"generic":"heure de l’Argentine","standard":"heure normale d’Argentine","daylight":"heure d’été de l’Argentine"}},"Argentina_Western":{"long":{"generic":"heure de l’Ouest argentin","standard":"heure normale de l’Ouest argentin","daylight":"heure d’été de l’Ouest argentin"}},"Armenia":{"long":{"generic":"heure de l’Arménie","standard":"heure normale de l’Arménie","daylight":"heure d’été d’Arménie"}},"Atlantic":{"long":{"generic":"heure de l’Atlantique","standard":"heure normale de l’Atlantique","daylight":"heure d’été de l’Atlantique"}},"Australia_Central":{"long":{"generic":"heure du centre de l’Australie","standard":"heure normale du centre de l’Australie","daylight":"heure d’été du centre de l’Australie"}},"Australia_CentralWestern":{"long":{"generic":"heure du centre-ouest de l’Australie","standard":"heure normale du centre-ouest de l’Australie","daylight":"heure d’été du centre-ouest de l’Australie"}},"Australia_Eastern":{"long":{"generic":"heure de l’Est de l’Australie","standard":"heure normale de l’Est de l’Australie","daylight":"heure d’été de l’Est de l’Australie"}},"Australia_Western":{"long":{"generic":"heure de l’Ouest de l’Australie","standard":"heure normale de l’Ouest de l’Australie","daylight":"heure d’été de l’Ouest de l’Australie"}},"Azerbaijan":{"long":{"generic":"heure de l’Azerbaïdjan","standard":"heure normale de l’Azerbaïdjan","daylight":"heure d’été d’Azerbaïdjan"}},"Azores":{"long":{"generic":"heure des Açores","standard":"heure normale des Açores","daylight":"heure d’été des Açores"}},"Bangladesh":{"long":{"generic":"heure du Bangladesh","standard":"heure normale du Bangladesh","daylight":"heure d’été du Bangladesh"}},"Bhutan":{"long":{"standard":"heure du Bhoutan"}},"Bolivia":{"long":{"standard":"heure de Bolivie"}},"Brasilia":{"long":{"generic":"heure de Brasilia","standard":"heure normale de Brasilia","daylight":"heure d’été de Brasilia"}},"Brunei":{"long":{"standard":"heure du Brunéi"}},"Cape_Verde":{"long":{"generic":"heure du Cap-Vert","standard":"heure normale du Cap-Vert","daylight":"heure d’été du Cap-Vert"}},"Chamorro":{"long":{"standard":"heure des Chamorro"}},"Chatham":{"long":{"generic":"heure des îles Chatham","standard":"heure normale des îles Chatham","daylight":"heure d’été des îles Chatham"}},"Chile":{"long":{"generic":"heure du Chili","standard":"heure normale du Chili","daylight":"heure d’été du Chili"}},"China":{"long":{"generic":"heure de la Chine","standard":"heure normale de la Chine","daylight":"heure d’été de Chine"}},"Choibalsan":{"long":{"generic":"heure de Choibalsan","standard":"heure normale de Choibalsan","daylight":"heure d’été de Choibalsan"}},"Christmas":{"long":{"standard":"heure de l’île Christmas"}},"Cocos":{"long":{"standard":"heure des îles Cocos"}},"Colombia":{"long":{"generic":"heure de Colombie","standard":"heure normale de Colombie","daylight":"heure d’été de Colombie"}},"Cook":{"long":{"generic":"heure des îles Cook","standard":"heure normale des îles Cook","daylight":"heure d’été des îles Cook"}},"Cuba":{"long":{"generic":"heure de Cuba","standard":"heure normale de Cuba","daylight":"heure d’été de Cuba"}},"Davis":{"long":{"standard":"heure de Davis"}},"DumontDUrville":{"long":{"standard":"heure de Dumont-d’Urville"}},"East_Timor":{"long":{"standard":"heure du Timor oriental"}},"Easter":{"long":{"generic":"heure de l’île de Pâques","standard":"heure normale de l’île de Pâques","daylight":"heure d’été de l’île de Pâques"}},"Ecuador":{"long":{"standard":"heure de l’Équateur"}},"Europe_Central":{"long":{"generic":"heure d’Europe centrale","standard":"heure normale d’Europe centrale","daylight":"heure d’été d’Europe centrale"}},"Europe_Eastern":{"long":{"generic":"heure d’Europe de l’Est","standard":"heure normale d’Europe de l’Est","daylight":"heure d’été d’Europe de l’Est"}},"Europe_Further_Eastern":{"long":{"standard":"heure de Kaliningrad"}},"Europe_Western":{"long":{"generic":"heure d’Europe de l’Ouest","standard":"heure normale d’Europe de l’Ouest","daylight":"heure d’été d’Europe de l’Ouest"}},"Falkland":{"long":{"generic":"heure des îles Malouines","standard":"heure normale des îles Malouines","daylight":"heure d’été des îles Malouines"}},"Fiji":{"long":{"generic":"heure des îles Fidji","standard":"heure normale des îles Fidji","daylight":"heure d’été des îles Fidji"}},"French_Guiana":{"long":{"standard":"heure de la Guyane française"}},"French_Southern":{"long":{"standard":"heure des Terres australes et antarctiques françaises"}},"Galapagos":{"long":{"standard":"heure des îles Galápagos"}},"Gambier":{"long":{"standard":"heure des îles Gambier"}},"Georgia":{"long":{"generic":"heure de la Géorgie","standard":"heure normale de la Géorgie","daylight":"heure d’été de Géorgie"}},"Gilbert_Islands":{"long":{"standard":"heure des îles Gilbert"}},"GMT":{"long":{"standard":"heure moyenne de Greenwich"}},"Greenland_Eastern":{"long":{"generic":"heure de l’Est du Groenland","standard":"heure normale de l’Est du Groenland","daylight":"heure d’été de l’Est du Groenland"}},"Greenland_Western":{"long":{"generic":"heure de l’Ouest du Groenland","standard":"heure normale de l’Ouest du Groenland","daylight":"heure d’été de l’Ouest du Groenland"}},"Guam":{"long":{"standard":"heure de Guam"}},"Gulf":{"long":{"standard":"heure du Golfe"}},"Guyana":{"long":{"standard":"heure du Guyana"}},"Hawaii_Aleutian":{"long":{"generic":"heure d’Hawaii - Aléoutiennes","standard":"heure normale d’Hawaii - Aléoutiennes","daylight":"heure d’été d’Hawaii - Aléoutiennes"}},"Hong_Kong":{"long":{"generic":"heure de Hong Kong","standard":"heure normale de Hong Kong","daylight":"heure d’été de Hong Kong"}},"Hovd":{"long":{"generic":"heure de Hovd","standard":"heure normale de Hovd","daylight":"heure d’été de Hovd"}},"India":{"long":{"standard":"heure de l’Inde"}},"Indian_Ocean":{"long":{"standard":"heure de l’Océan Indien"}},"Indochina":{"long":{"standard":"heure d’Indochine"}},"Indonesia_Central":{"long":{"standard":"heure du Centre indonésien"}},"Indonesia_Eastern":{"long":{"standard":"heure de l’Est indonésien"}},"Indonesia_Western":{"long":{"standard":"heure de l’Ouest indonésien"}},"Iran":{"long":{"generic":"heure de l’Iran","standard":"heure normale d’Iran","daylight":"heure d’été d’Iran"}},"Irkutsk":{"long":{"generic":"heure d’Irkoutsk","standard":"heure normale d’Irkoutsk","daylight":"heure d’été d’Irkoutsk"}},"Israel":{"long":{"generic":"heure d’Israël","standard":"heure normale d’Israël","daylight":"heure d’été d’Israël"}},"Japan":{"long":{"generic":"heure du Japon","standard":"heure normale du Japon","daylight":"heure d’été du Japon"}},"Kamchatka":{"long":{"generic":"heure de Petropavlovsk-Kamchatski","standard":"heure normale de Petropavlovsk-Kamchatski","daylight":"heure d’été de Petropavlovsk-Kamchatski"}},"Kazakhstan_Eastern":{"long":{"standard":"heure de l’Est du Kazakhstan"}},"Kazakhstan_Western":{"long":{"standard":"heure de l’Ouest du Kazakhstan"}},"Korea":{"long":{"generic":"heure de la Corée","standard":"heure normale de la Corée","daylight":"heure d’été de Corée"}},"Kosrae":{"long":{"standard":"heure de Kosrae"}},"Krasnoyarsk":{"long":{"generic":"heure de Krasnoïarsk","standard":"heure normale de Krasnoïarsk","daylight":"heure d’été de Krasnoïarsk"}},"Kyrgystan":{"long":{"standard":"heure du Kirghizistan"}},"Line_Islands":{"long":{"standard":"heure des îles de la Ligne"}},"Lord_Howe":{"long":{"generic":"heure de Lord Howe","standard":"heure normale de Lord Howe","daylight":"heure d’été de Lord Howe"}},"Macquarie":{"long":{"standard":"heure de l’île Macquarie"}},"Magadan":{"long":{"generic":"heure de Magadan","standard":"heure normale de Magadan","daylight":"heure d’été de Magadan"}},"Malaysia":{"long":{"standard":"heure de la Malaisie"}},"Maldives":{"long":{"standard":"heure des Maldives"}},"Marquesas":{"long":{"standard":"heure des îles Marquises"}},"Marshall_Islands":{"long":{"standard":"heure des îles Marshall"}},"Mauritius":{"long":{"generic":"heure de Maurice","standard":"heure normale de Maurice","daylight":"heure d’été de Maurice"}},"Mawson":{"long":{"standard":"heure de Mawson"}},"Mexico_Northwest":{"long":{"generic":"heure du Nord-Ouest du Mexique","standard":"heure normale du Nord-Ouest du Mexique","daylight":"heure d’été du Nord-Ouest du Mexique"}},"Mexico_Pacific":{"long":{"generic":"heure du Pacifique mexicain","standard":"heure normale du Pacifique mexicain","daylight":"heure d’été du Pacifique mexicain"}},"Mongolia":{"long":{"generic":"heure d’Oulan-Bator","standard":"heure normale d’Oulan-Bator","daylight":"heure d’été d’Oulan-Bator"}},"Moscow":{"long":{"generic":"heure de Moscou","standard":"heure normale de Moscou","daylight":"heure d’été de Moscou"}},"Myanmar":{"long":{"standard":"heure du Myanmar"}},"Nauru":{"long":{"standard":"heure de Nauru"}},"Nepal":{"long":{"standard":"heure du Népal"}},"New_Caledonia":{"long":{"generic":"heure de la Nouvelle-Calédonie","standard":"heure normale de la Nouvelle-Calédonie","daylight":"heure d’été de Nouvelle-Calédonie"}},"New_Zealand":{"long":{"generic":"heure de la Nouvelle-Zélande","standard":"heure normale de la Nouvelle-Zélande","daylight":"heure d’été de la Nouvelle-Zélande"}},"Newfoundland":{"long":{"generic":"heure de Terre-Neuve","standard":"heure normale de Terre-Neuve","daylight":"heure d’été de Terre-Neuve"}},"Niue":{"long":{"standard":"heure de Nioué"}},"Norfolk":{"long":{"standard":"heure de l’île Norfolk"}},"Noronha":{"long":{"generic":"heure de Fernando de Noronha","standard":"heure normale de Fernando de Noronha","daylight":"heure d’été de Fernando de Noronha"}},"North_Mariana":{"long":{"standard":"heure des îles Mariannes du Nord"}},"Novosibirsk":{"long":{"generic":"heure de Novossibirsk","standard":"heure normale de Novossibirsk","daylight":"heure d’été de Novossibirsk"}},"Omsk":{"long":{"generic":"heure de Omsk","standard":"heure normale de Omsk","daylight":"heure d’été de Omsk"}},"Pakistan":{"long":{"generic":"heure du Pakistan","standard":"heure normale du Pakistan","daylight":"heure d’été du Pakistan"}},"Palau":{"long":{"standard":"heure des Palaos"}},"Papua_New_Guinea":{"long":{"standard":"heure de la Papouasie-Nouvelle-Guinée"}},"Paraguay":{"long":{"generic":"heure du Paraguay","standard":"heure normale du Paraguay","daylight":"heure d’été du Paraguay"}},"Peru":{"long":{"generic":"heure du Pérou","standard":"heure normale du Pérou","daylight":"heure d’été du Pérou"}},"Philippines":{"long":{"generic":"heure des Philippines","standard":"heure normale des Philippines","daylight":"heure d’été des Philippines"}},"Phoenix_Islands":{"long":{"standard":"heure des îles Phoenix"}},"Pierre_Miquelon":{"long":{"generic":"heure de Saint-Pierre-et-Miquelon","standard":"heure normale de Saint-Pierre-et-Miquelon","daylight":"heure d’été de Saint-Pierre-et-Miquelon"}},"Pitcairn":{"long":{"standard":"heure des îles Pitcairn"}},"Ponape":{"long":{"standard":"heure de l’île de Pohnpei"}},"Pyongyang":{"long":{"standard":"heure de Pyongyang"}},"Reunion":{"long":{"standard":"heure de La Réunion"}},"Rothera":{"long":{"standard":"heure de Rothera"}},"Sakhalin":{"long":{"generic":"heure de Sakhaline","standard":"heure normale de Sakhaline","daylight":"heure d’été de Sakhaline"}},"Samara":{"long":{"generic":"heure de Samara","standard":"heure normale de Samara","daylight":"heure d’été de Samara"}},"Samoa":{"long":{"generic":"heure des Samoa","standard":"heure normale des Samoa","daylight":"heure d’été des Samoa"}},"Seychelles":{"long":{"standard":"heure des Seychelles"}},"Singapore":{"long":{"standard":"heure de Singapour"}},"Solomon":{"long":{"standard":"heure des îles Salomon"}},"South_Georgia":{"long":{"standard":"heure de Géorgie du Sud"}},"Suriname":{"long":{"standard":"heure du Suriname"}},"Syowa":{"long":{"standard":"heure de Syowa"}},"Tahiti":{"long":{"standard":"heure de Tahiti"}},"Taipei":{"long":{"generic":"heure de Taipei","standard":"heure normale de Taipei","daylight":"heure d’été de Taipei"}},"Tajikistan":{"long":{"standard":"heure du Tadjikistan"}},"Tokelau":{"long":{"standard":"heure de Tokelau"}},"Tonga":{"long":{"generic":"heure des Tonga","standard":"heure normale des Tonga","daylight":"heure d’été de Tonga"}},"Truk":{"long":{"standard":"heure de Chuuk"}},"Turkmenistan":{"long":{"generic":"heure du Turkménistan","standard":"heure normale du Turkménistan","daylight":"heure d’été du Turkménistan"}},"Tuvalu":{"long":{"standard":"heure des Tuvalu"}},"Uruguay":{"long":{"generic":"heure de l’Uruguay","standard":"heure normale de l’Uruguay","daylight":"heure d’été de l’Uruguay"}},"Uzbekistan":{"long":{"generic":"heure de l’Ouzbékistan","standard":"heure normale de l’Ouzbékistan","daylight":"heure d’été de l’Ouzbékistan"}},"Vanuatu":{"long":{"generic":"heure du Vanuatu","standard":"heure normale du Vanuatu","daylight":"heure d’été de Vanuatu"}},"Venezuela":{"long":{"standard":"heure du Venezuela"}},"Vladivostok":{"long":{"generic":"heure de Vladivostok","standard":"heure normale de Vladivostok","daylight":"heure d’été de Vladivostok"}},"Volgograd":{"long":{"generic":"heure de Volgograd","standard":"heure normale de Volgograd","daylight":"heure d’été de Volgograd"}},"Vostok":{"long":{"standard":"heure de Vostok"}},"Wake":{"long":{"standard":"heure de l’île Wake"}},"Wallis":{"long":{"standard":"heure de Wallis-et-Futuna"}},"Yakutsk":{"long":{"generic":"heure de Iakoutsk","standard":"heure normale de Iakoutsk","daylight":"heure d’été de Iakoutsk"}},"Yekaterinburg":{"long":{"generic":"heure d’Ekaterinbourg","standard":"heure normale d’Ekaterinbourg","daylight":"heure d’été d’Ekaterinbourg"}}}}},"numbers":{"defaultNumberingSystem":"latn","otherNumberingSystems":{"native":"latn"},"minimumGroupingDigits":"1","symbols-numberSystem-latn":{"decimal":",","group":" ","list":";","percentSign":"%","plusSign":"+","minusSign":"-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"NaN","timeSeparator":":"},"decimalFormats-numberSystem-latn":{"standard":"#,##0.###","long":{"decimalFormat":{"1000-count-one":"0 millier","1000-count-other":"0 mille","10000-count-one":"00 mille","10000-count-other":"00 mille","100000-count-one":"000 mille","100000-count-other":"000 mille","1000000-count-one":"0 million","1000000-count-other":"0 millions","10000000-count-one":"00 million","10000000-count-other":"00 millions","100000000-count-one":"000 million","100000000-count-other":"000 millions","1000000000-count-one":"0 milliard","1000000000-count-other":"0 milliards","10000000000-count-one":"00 milliard","10000000000-count-other":"00 milliards","100000000000-count-one":"000 milliard","100000000000-count-other":"000 milliards","1000000000000-count-one":"0 billion","1000000000000-count-other":"0 billions","10000000000000-count-one":"00 billion","10000000000000-count-other":"00 billions","100000000000000-count-one":"000 billion","100000000000000-count-other":"000 billions"}},"short":{"decimalFormat":{"1000-count-one":"0 k","1000-count-other":"0 k","10000-count-one":"00 k","10000-count-other":"00 k","100000-count-one":"000 k","100000-count-other":"000 k","1000000-count-one":"0 M","1000000-count-other":"0 M","10000000-count-one":"00 M","10000000-count-other":"00 M","100000000-count-one":"000 M","100000000-count-other":"000 M","1000000000-count-one":"0 Md","1000000000-count-other":"0 Md","10000000000-count-one":"00 Md","10000000000-count-other":"00 Md","100000000000-count-one":"000 Md","100000000000-count-other":"000 Md","1000000000000-count-one":"0 Bn","1000000000000-count-other":"0 Bn","10000000000000-count-one":"00 Bn","10000000000000-count-other":"00 Bn","100000000000000-count-one":"000 Bn","100000000000000-count-other":"000 Bn"}}},"scientificFormats-numberSystem-latn":{"standard":"#E0"},"percentFormats-numberSystem-latn":{"standard":"#,##0 %"},"currencyFormats-numberSystem-latn":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"#,##0.00 ¤","accounting":"#,##0.00 ¤;(#,##0.00 ¤)","short":{"standard":{"1000-count-one":"0 k ¤","1000-count-other":"0 k ¤","10000-count-one":"00 k ¤","10000-count-other":"00 k ¤","100000-count-one":"000 k ¤","100000-count-other":"000 k ¤","1000000-count-one":"0 M ¤","1000000-count-other":"0 M ¤","10000000-count-one":"00 M ¤","10000000-count-other":"00 M ¤","100000000-count-one":"000 M ¤","100000000-count-other":"000 M ¤","1000000000-count-one":"0 Md ¤","1000000000-count-other":"0 Md ¤","10000000000-count-one":"00 Md ¤","10000000000-count-other":"00 Md ¤","100000000000-count-one":"000 Md ¤","100000000000-count-other":"000 Md ¤","1000000000000-count-one":"0 Bn ¤","1000000000000-count-other":"0 Bn ¤","10000000000000-count-one":"00 Bn ¤","10000000000000-count-other":"00 Bn ¤","100000000000000-count-one":"000 Bn ¤","100000000000000-count-other":"000 Bn ¤"}},"unitPattern-count-one":"{0} {1}","unitPattern-count-other":"{0} {1}"},"miscPatterns-numberSystem-latn":{"atLeast":"⩾{0}","range":"{0}–{1}"},"minimalPairs":{"pluralMinimalPairs-count-one":"{0} jour","pluralMinimalPairs-count-other":"{0} jours","one":"Prenez la {0}re à droite.","other":"Prenez la {0}e à droite."}}},"hi":{"identity":{"version":{"_number":"$Revision: 13911 $","_cldrVersion":"33"},"language":"hi"},"dates":{"calendars":{"gregorian":{"months":{"format":{"abbreviated":{"1":"जन॰","2":"फ़र॰","3":"मार्च","4":"अप्रैल","5":"मई","6":"जून","7":"जुल॰","8":"अग॰","9":"सित॰","10":"अक्तू॰","11":"नव॰","12":"दिस॰"},"narrow":{"1":"ज","2":"फ़","3":"मा","4":"अ","5":"म","6":"जू","7":"जु","8":"अ","9":"सि","10":"अ","11":"न","12":"दि"},"wide":{"1":"जनवरी","2":"फ़रवरी","3":"मार्च","4":"अप्रैल","5":"मई","6":"जून","7":"जुलाई","8":"अगस्त","9":"सितंबर","10":"अक्तूबर","11":"नवंबर","12":"दिसंबर"}},"stand-alone":{"abbreviated":{"1":"जन॰","2":"फ़र॰","3":"मार्च","4":"अप्रैल","5":"मई","6":"जून","7":"जुल॰","8":"अग॰","9":"सित॰","10":"अक्तू॰","11":"नव॰","12":"दिस॰"},"narrow":{"1":"ज","2":"फ़","3":"मा","4":"अ","5":"म","6":"जू","7":"जु","8":"अ","9":"सि","10":"अ","11":"न","12":"दि"},"wide":{"1":"जनवरी","2":"फ़रवरी","3":"मार्च","4":"अप्रैल","5":"मई","6":"जून","7":"जुलाई","8":"अगस्त","9":"सितंबर","10":"अक्तूबर","11":"नवंबर","12":"दिसंबर"}}},"days":{"format":{"abbreviated":{"sun":"रवि","mon":"सोम","tue":"मंगल","wed":"बुध","thu":"गुरु","fri":"शुक्र","sat":"शनि"},"narrow":{"sun":"र","mon":"सो","tue":"मं","wed":"बु","thu":"गु","fri":"शु","sat":"श"},"short":{"sun":"र","mon":"सो","tue":"मं","wed":"बु","thu":"गु","fri":"शु","sat":"श"},"wide":{"sun":"रविवार","mon":"सोमवार","tue":"मंगलवार","wed":"बुधवार","thu":"गुरुवार","fri":"शुक्रवार","sat":"शनिवार"}},"stand-alone":{"abbreviated":{"sun":"रवि","mon":"सोम","tue":"मंगल","wed":"बुध","thu":"गुरु","fri":"शुक्र","sat":"शनि"},"narrow":{"sun":"र","mon":"सो","tue":"मं","wed":"बु","thu":"गु","fri":"शु","sat":"श"},"short":{"sun":"र","mon":"सो","tue":"मं","wed":"बु","thu":"गु","fri":"शु","sat":"श"},"wide":{"sun":"रविवार","mon":"सोमवार","tue":"मंगलवार","wed":"बुधवार","thu":"गुरुवार","fri":"शुक्रवार","sat":"शनिवार"}}},"quarters":{"format":{"abbreviated":{"1":"ति1","2":"ति2","3":"ति3","4":"ति4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"पहली तिमाही","2":"दूसरी तिमाही","3":"तीसरी तिमाही","4":"चौथी तिमाही"}},"stand-alone":{"abbreviated":{"1":"ति1","2":"ति2","3":"ति3","4":"ति4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"पहली तिमाही","2":"दूसरी तिमाही","3":"तीसरी तिमाही","4":"चौथी तिमाही"}}},"dayPeriods":{"format":{"abbreviated":{"midnight":"मध्यरात्रि","am":"पूर्वाह्न","pm":"अपराह्न","morning1":"सुबह","afternoon1":"अपराह्न","evening1":"शाम","night1":"रात"},"narrow":{"midnight":"मध्यरात्रि","am":"पू","pm":"अ","morning1":"सुबह","afternoon1":"अपराह्न","evening1":"शाम","night1":"रात"},"wide":{"midnight":"मध्यरात्रि","am":"पूर्वाह्न","pm":"अपराह्न","morning1":"सुबह","afternoon1":"अपराह्न","evening1":"शाम","night1":"रात"}},"stand-alone":{"abbreviated":{"midnight":"मध्यरात्रि","am":"पूर्वाह्न","pm":"अपराह्न","morning1":"सुबह","afternoon1":"दोपहर","evening1":"शाम","night1":"रात"},"narrow":{"midnight":"आधी रात","am":"पू","pm":"अ","morning1":"सुबह","afternoon1":"अपराह्न","evening1":"शाम","night1":"रात"},"wide":{"midnight":"मध्यरात्रि","am":"पूर्वाह्न","pm":"अपराह्न","morning1":"सुबह","afternoon1":"दोपहर","evening1":"शाम","night1":"रात"}}},"eras":{"eraNames":{"0":"ईसा-पूर्व","1":"ईसवी सन","0-alt-variant":"ईसवी पूर्व","1-alt-variant":"ईसवी"},"eraAbbr":{"0":"ईसा-पूर्व","1":"ईस्वी","0-alt-variant":"ईसवी पूर्व","1-alt-variant":"ईसवी"},"eraNarrow":{"0":"ईसा-पूर्व","1":"ईस्वी","0-alt-variant":"ईसवी पूर्व","1-alt-variant":"ईसवी"}},"dateFormats":{"full":"EEEE, d MMMM y","long":"d MMMM y","medium":"d MMM y","short":"d/M/yy"},"timeFormats":{"full":"h:mm:ss a zzzz","long":"h:mm:ss a z","medium":"h:mm:ss a","short":"h:mm a"},"dateTimeFormats":{"full":"{1} को {0}","long":"{1} को {0}","medium":"{1}, {0}","short":"{1}, {0}","availableFormats":{"Bh":"B h","Bhm":"B h:mm","Bhms":"B h:mm:ss","d":"d","E":"ccc","EBhm":"E B h:mm","EBhms":"E B h:mm:ss","Ed":"E d","Ehm":"E h:mm a","EHm":"E HH:mm","Ehms":"E h:mm:ss a","EHms":"E HH:mm:ss","Gy":"y G","GyMMM":"MMM G y","GyMMMd":"d MMM y G","GyMMMEd":"E, d MMM y G","h":"h a","H":"HH","hm":"h:mm a","Hm":"HH:mm","hms":"h:mm:ss a","Hms":"HH:mm:ss","hmsv":"h:mm:ss a v","Hmsv":"HH:mm:ss v","hmv":"h:mm a v","Hmv":"HH:mm v","M":"L","Md":"d/M","MEd":"E, d/M","MMdd":"dd/MM","MMM":"LLL","MMMd":"d MMM","MMMEd":"E, d MMM","MMMMd":"d MMMM","MMMMEd":"E, d MMMM","MMMMW-count-one":"MMM का सप्ताह W","MMMMW-count-other":"MMM का सप्ताह W","ms":"mm:ss","y":"y","yM":"M/y","yMd":"d/M/y","yMEd":"E, d/M/y","yMM":"MM/y","yMMdd":"dd/MM/y","yMMM":"MMM y","yMMMd":"d MMM y","yMMMEd":"E, d MMM y","yMMMM":"MMMM y","yQQQ":"QQQ y","yQQQQ":"QQQQ y","yw-count-one":"Y का सप्ताह w","yw-count-other":"Y का सप्ताह w"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{1} {0}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{1} {0}"},"intervalFormats":{"intervalFormatFallback":"{0} – {1}","d":{"d":"d–d"},"h":{"a":"h a – h a","h":"h–h a"},"H":{"H":"HH–HH"},"hm":{"a":"h:mm a – h:mm a","h":"h:mm–h:mm a","m":"h:mm–h:mm a"},"Hm":{"H":"HH:mm–HH:mm","m":"HH:mm–HH:mm"},"hmv":{"a":"h:mm a – h:mm a v","h":"h:mm–h:mm a v","m":"h:mm–h:mm a v"},"Hmv":{"H":"HH:mm–HH:mm v","m":"HH:mm–HH:mm v"},"hv":{"a":"h a – h a v","h":"h–h a v"},"Hv":{"H":"HH–HH v"},"M":{"M":"M–M"},"Md":{"d":"d/M – d/M","M":"d/M – d/M"},"MEd":{"d":"E, d/M – E, d/M","M":"E, d/M – E, d/M"},"MMM":{"M":"MMM–MMM"},"MMMd":{"d":"d MMM–d","M":"d MMM – d MMM"},"MMMEd":{"d":"E, d MMM – E, d MMM","M":"E, d MMM – E, d MMM"},"y":{"y":"y–y"},"yM":{"M":"M/y – M/y","y":"M/y – M/y"},"yMd":{"d":"d/M/y – d/M/y","M":"d/M/y – d/M/y","y":"d/M/y – d/M/y"},"yMEd":{"d":"E, d/M/y – E, d/M/y","M":"E, d/M/y – E, d/M/y","y":"E, d/M/y – E, d/M/y"},"yMMM":{"M":"MMM–MMM y","y":"MMM y – MMM y"},"yMMMd":{"d":"d–d MMM y","M":"d MMM – d MMM y","y":"d MMM y – d MMM y"},"yMMMEd":{"d":"E, d MMM – E, d MMM y","M":"E, d MMM – E, d MMM y","y":"E, d MMM y – E, d MMM y"},"yMMMM":{"M":"MMMM – MMMM y","y":"MMMM y – MMMM y"}}}}},"fields":{"era":{"displayName":"युग"},"era-short":{"displayName":"युग"},"era-narrow":{"displayName":"युग"},"year":{"displayName":"वर्ष","relative-type--1":"पिछला वर्ष","relative-type-0":"इस वर्ष","relative-type-1":"अगला वर्ष","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} वर्ष में","relativeTimePattern-count-other":"{0} वर्ष में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} वर्ष पहले","relativeTimePattern-count-other":"{0} वर्ष पहले"}},"year-short":{"displayName":"वर्ष","relative-type--1":"पिछला वर्ष","relative-type-0":"इस वर्ष","relative-type-1":"अगला वर्ष","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} वर्ष में","relativeTimePattern-count-other":"{0} वर्ष में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} वर्ष पहले","relativeTimePattern-count-other":"{0} वर्ष पहले"}},"year-narrow":{"displayName":"वर्ष","relative-type--1":"पिछला वर्ष","relative-type-0":"इस वर्ष","relative-type-1":"अगला वर्ष","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} वर्ष में","relativeTimePattern-count-other":"{0} वर्ष में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} वर्ष पहले","relativeTimePattern-count-other":"{0} वर्ष पहले"}},"quarter":{"displayName":"तिमाही","relative-type--1":"अंतिम तिमाही","relative-type-0":"इस तिमाही","relative-type-1":"अगली तिमाही","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} तिमाही में","relativeTimePattern-count-other":"{0} तिमाहियों में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} तिमाही पहले","relativeTimePattern-count-other":"{0} तिमाही पहले"}},"quarter-short":{"displayName":"तिमाही","relative-type--1":"अंतिम तिमाही","relative-type-0":"इस तिमाही","relative-type-1":"अगली तिमाही","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} तिमाही में","relativeTimePattern-count-other":"{0} तिमाहियों में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} तिमाही पहले","relativeTimePattern-count-other":"{0} तिमाहियों पहले"}},"quarter-narrow":{"displayName":"तिमाही","relative-type--1":"अंतिम तिमाही","relative-type-0":"इस तिमाही","relative-type-1":"अगली तिमाही","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} ति॰ में","relativeTimePattern-count-other":"{0} ति॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} ति॰ पहले","relativeTimePattern-count-other":"{0} ति॰ पहले"}},"month":{"displayName":"माह","relative-type--1":"पिछला माह","relative-type-0":"इस माह","relative-type-1":"अगला माह","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} माह में","relativeTimePattern-count-other":"{0} माह में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} माह पहले","relativeTimePattern-count-other":"{0} माह पहले"}},"month-short":{"displayName":"माह","relative-type--1":"पिछला माह","relative-type-0":"इस माह","relative-type-1":"अगला माह","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} माह में","relativeTimePattern-count-other":"{0} माह में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} माह पहले","relativeTimePattern-count-other":"{0} माह पहले"}},"month-narrow":{"displayName":"माह","relative-type--1":"पिछला माह","relative-type-0":"इस माह","relative-type-1":"अगला माह","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} माह में","relativeTimePattern-count-other":"{0} माह में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} माह पहले","relativeTimePattern-count-other":"{0} माह पहले"}},"week":{"displayName":"सप्ताह","relative-type--1":"पिछला सप्ताह","relative-type-0":"इस सप्ताह","relative-type-1":"अगला सप्ताह","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सप्ताह में","relativeTimePattern-count-other":"{0} सप्ताह में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सप्ताह पहले","relativeTimePattern-count-other":"{0} सप्ताह पहले"},"relativePeriod":"{0} के सप्ताह"},"week-short":{"displayName":"सप्ताह","relative-type--1":"पिछला सप्ताह","relative-type-0":"इस सप्ताह","relative-type-1":"अगला सप्ताह","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सप्ताह में","relativeTimePattern-count-other":"{0} सप्ताह में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सप्ताह पहले","relativeTimePattern-count-other":"{0} सप्ताह पहले"},"relativePeriod":"{0} के सप्ताह"},"week-narrow":{"displayName":"सप्ताह","relative-type--1":"पिछला सप्ताह","relative-type-0":"इस सप्ताह","relative-type-1":"अगला सप्ताह","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सप्ताह में","relativeTimePattern-count-other":"{0} सप्ताह में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सप्ताह पहले","relativeTimePattern-count-other":"{0} सप्ताह पहले"},"relativePeriod":"{0} के सप्ताह"},"weekOfMonth":{"displayName":"माह का सप्ताह"},"weekOfMonth-short":{"displayName":"माह का सप्ताह"},"weekOfMonth-narrow":{"displayName":"माह का सप्ताह"},"day":{"displayName":"दिन","relative-type--2":"परसों","relative-type--1":"कल","relative-type-0":"आज","relative-type-1":"कल","relative-type-2":"परसों","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} दिन में","relativeTimePattern-count-other":"{0} दिन में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} दिन पहले","relativeTimePattern-count-other":"{0} दिन पहले"}},"day-short":{"displayName":"दिन","relative-type--2":"परसों","relative-type--1":"कल","relative-type-0":"आज","relative-type-1":"कल","relative-type-2":"परसों","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} दिन में","relativeTimePattern-count-other":"{0} दिन में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} दिन पहले","relativeTimePattern-count-other":"{0} दिन पहले"}},"day-narrow":{"displayName":"दिन","relative-type--2":"परसों","relative-type--1":"कल","relative-type-0":"आज","relative-type-1":"कल","relative-type-2":"परसों","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} दिन में","relativeTimePattern-count-other":"{0} दिन में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} दिन पहले","relativeTimePattern-count-other":"{0} दिन पहले"}},"dayOfYear":{"displayName":"वर्ष का दिन"},"dayOfYear-short":{"displayName":"वर्ष का दिन"},"dayOfYear-narrow":{"displayName":"वर्ष का दिन"},"weekday":{"displayName":"सप्ताह का दिन"},"weekday-short":{"displayName":"सप्ताह का दिन"},"weekday-narrow":{"displayName":"सप्ताह का दिन"},"weekdayOfMonth":{"displayName":"माह के कार्यदिवस"},"weekdayOfMonth-short":{"displayName":"माह के कार्यदिवस"},"weekdayOfMonth-narrow":{"displayName":"माह के कार्यदिवस"},"sun":{"relative-type--1":"पिछला रविवार","relative-type-0":"इस रविवार","relative-type-1":"अगला रविवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} रविवार में","relativeTimePattern-count-other":"{0} रविवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} रविवार पूर्व","relativeTimePattern-count-other":"{0} रविवार पूर्व"}},"sun-short":{"relative-type--1":"पिछला रवि॰","relative-type-0":"इस रवि॰","relative-type-1":"अगला रवि॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} रवि॰ में","relativeTimePattern-count-other":"{0} रवि॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} रवि॰ पूर्व","relativeTimePattern-count-other":"{0} रवि॰ पूर्व"}},"sun-narrow":{"relative-type--1":"पिछला रवि॰","relative-type-0":"इस रवि॰","relative-type-1":"अगला रवि॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} रवि॰ में","relativeTimePattern-count-other":"{0} रवि॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} रवि॰ पूर्व","relativeTimePattern-count-other":"{0} रवि॰ पूर्व"}},"mon":{"relative-type--1":"पिछला सोमवार","relative-type-0":"इस सोमवार","relative-type-1":"अगला सोमवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सोमवार में","relativeTimePattern-count-other":"{0} सोमवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सोमवार पूर्व","relativeTimePattern-count-other":"{0} सोमवार पूर्व"}},"mon-short":{"relative-type--1":"पिछला सोम॰","relative-type-0":"इस सोम॰","relative-type-1":"अगला सोम॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सोम॰ में","relativeTimePattern-count-other":"{0} सोम॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सोम॰ पूर्व","relativeTimePattern-count-other":"{0} सोम॰ पूर्व"}},"mon-narrow":{"relative-type--1":"पिछला सोम॰","relative-type-0":"इस सोम॰","relative-type-1":"अगला सोम॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सोम॰ में","relativeTimePattern-count-other":"{0} सोम॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सोम॰ पूर्व","relativeTimePattern-count-other":"{0} सोम॰ पूर्व"}},"tue":{"relative-type--1":"पिछला मंगलवार","relative-type-0":"इस मंगलवार","relative-type-1":"अगला मंगलवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} मंगलवार में","relativeTimePattern-count-other":"{0} मंगलवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} मंगलवार पूर्व","relativeTimePattern-count-other":"{0} मंगलवार पूर्व"}},"tue-short":{"relative-type--1":"पिछला मंगल॰","relative-type-0":"इस मंगल॰","relative-type-1":"अगला मंगल॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} मंगल॰ में","relativeTimePattern-count-other":"{0} मंगल॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} मंगल॰ पूर्व","relativeTimePattern-count-other":"{0} मंगल॰ पूर्व"}},"tue-narrow":{"relative-type--1":"पिछला मंगल॰","relative-type-0":"इस मंगल॰","relative-type-1":"अगला मंगल॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} मंगल॰ में","relativeTimePattern-count-other":"{0} मंगल॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} मंगल॰ पूर्व","relativeTimePattern-count-other":"{0} मंगल॰ पूर्व"}},"wed":{"relative-type--1":"पिछला बुधवार","relative-type-0":"इस बुधवार","relative-type-1":"अगला बुधवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} बुधवार में","relativeTimePattern-count-other":"{0} बुधवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} बुधवार पूर्व","relativeTimePattern-count-other":"{0} बुधवार पूर्व"}},"wed-short":{"relative-type--1":"पिछला बुध॰","relative-type-0":"इस बुध॰","relative-type-1":"अगला बुध॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} बुध॰ में","relativeTimePattern-count-other":"{0} बुध॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} बुध॰ पूर्व","relativeTimePattern-count-other":"{0} बुध॰ पूर्व"}},"wed-narrow":{"relative-type--1":"पिछला बुध॰","relative-type-0":"इस बुध॰","relative-type-1":"अगला बुध॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} बुध॰ में","relativeTimePattern-count-other":"{0} बुध॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} बुध॰ पूर्व","relativeTimePattern-count-other":"{0} बुध॰ पूर्व"}},"thu":{"relative-type--1":"पिछला गुरुवार","relative-type-0":"इस गुरुवार","relative-type-1":"अगला गुरुवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} गुरुवार में","relativeTimePattern-count-other":"{0} गुरुवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} गुरुवार पूर्व","relativeTimePattern-count-other":"{0} गुरुवार पूर्व"}},"thu-short":{"relative-type--1":"पिछला गुरु॰","relative-type-0":"इस गुरु॰","relative-type-1":"अगला गुरु॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} गुरु॰ में","relativeTimePattern-count-other":"{0} गुरु॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} गुरु॰ पूर्व","relativeTimePattern-count-other":"{0} गुरु॰ पूर्व"}},"thu-narrow":{"relative-type--1":"पिछला गुरु॰","relative-type-0":"इस गुरु॰","relative-type-1":"अगला गुरु॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} गुरु॰ में","relativeTimePattern-count-other":"{0} गुरु॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} गुरु॰ पूर्व","relativeTimePattern-count-other":"{0} गुरु॰ पूर्व"}},"fri":{"relative-type--1":"पिछला शुक्रवार","relative-type-0":"इस शुक्रवार","relative-type-1":"अगला शुक्रवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} शुक्रवार में","relativeTimePattern-count-other":"{0} शुक्रवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} शुक्रवार पूर्व","relativeTimePattern-count-other":"{0} शुक्रवार पूर्व"}},"fri-short":{"relative-type--1":"पिछला शुक्र॰","relative-type-0":"इस शुक्र॰","relative-type-1":"अगला शुक्र॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} शुक्र॰ में","relativeTimePattern-count-other":"{0} शुक्र॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} शुक्र॰ पूर्व","relativeTimePattern-count-other":"{0} शुक्र॰ पूर्व"}},"fri-narrow":{"relative-type--1":"पिछला शुक्र॰","relative-type-0":"इस शुक्र॰","relative-type-1":"अगला शुक्र॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} शुक्र॰ में","relativeTimePattern-count-other":"{0} शुक्र॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} शुक्र॰ पूर्व","relativeTimePattern-count-other":"{0} शुक्र॰ पूर्व"}},"sat":{"relative-type--1":"पिछला शनिवार","relative-type-0":"इस शनिवार","relative-type-1":"अगला शनिवार","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} शनिवार में","relativeTimePattern-count-other":"{0} शनिवार में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} शनिवार पूर्व","relativeTimePattern-count-other":"{0} शनिवार पूर्व"}},"sat-short":{"relative-type--1":"पिछला शनि॰","relative-type-0":"इस शनि॰","relative-type-1":"अगला शनि॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} शनि॰ में","relativeTimePattern-count-other":"{0} शनि॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} शनि॰ पूर्व","relativeTimePattern-count-other":"{0} शनि॰ पूर्व"}},"sat-narrow":{"relative-type--1":"पिछला शनि॰","relative-type-0":"इस शनि॰","relative-type-1":"अगला शनि॰","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} शनि॰ में","relativeTimePattern-count-other":"{0} शनि॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} शनि॰ पूर्व","relativeTimePattern-count-other":"{0} शनि॰ पूर्व"}},"dayperiod-short":{"displayName":"पू/अ"},"dayperiod":{"displayName":"पूर्वाह्न/अपराह्न"},"dayperiod-narrow":{"displayName":"पू/अ"},"hour":{"displayName":"घंटा","relative-type-0":"यह घंटा","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} घंटे में","relativeTimePattern-count-other":"{0} घंटे में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} घंटे पहले","relativeTimePattern-count-other":"{0} घंटे पहले"}},"hour-short":{"displayName":"घं॰","relative-type-0":"यह घंटा","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} घं॰ में","relativeTimePattern-count-other":"{0} घं॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} घं॰ पहले","relativeTimePattern-count-other":"{0} घं॰ पहले"}},"hour-narrow":{"displayName":"घं॰","relative-type-0":"यह घंटा","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} घं॰ में","relativeTimePattern-count-other":"{0} घं॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} घं॰ पहले","relativeTimePattern-count-other":"{0} घं॰ पहले"}},"minute":{"displayName":"मिनट","relative-type-0":"यह मिनट","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} मिनट में","relativeTimePattern-count-other":"{0} मिनट में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} मिनट पहले","relativeTimePattern-count-other":"{0} मिनट पहले"}},"minute-short":{"displayName":"मि॰","relative-type-0":"यह मिनट","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} मि॰ में","relativeTimePattern-count-other":"{0} मि॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} मि॰ पहले","relativeTimePattern-count-other":"{0} मि॰ पहले"}},"minute-narrow":{"displayName":"मि॰","relative-type-0":"यह मिनट","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} मि॰ में","relativeTimePattern-count-other":"{0} मि॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} मि॰ पहले","relativeTimePattern-count-other":"{0} मि॰ पहले"}},"second":{"displayName":"सेकंड","relative-type-0":"अब","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} सेकंड में","relativeTimePattern-count-other":"{0} सेकंड में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} सेकंड पहले","relativeTimePattern-count-other":"{0} सेकंड पहले"}},"second-short":{"displayName":"से॰","relative-type-0":"अब","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} से॰ में","relativeTimePattern-count-other":"{0} से॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} से॰ पहले","relativeTimePattern-count-other":"{0} से॰ पहले"}},"second-narrow":{"displayName":"से॰","relative-type-0":"अब","relativeTime-type-future":{"relativeTimePattern-count-one":"{0} से॰ में","relativeTimePattern-count-other":"{0} से॰ में"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} से॰ पहले","relativeTimePattern-count-other":"{0} से॰ पहले"}},"zone":{"displayName":"समय क्षेत्र"},"zone-short":{"displayName":"क्षेत्र"},"zone-narrow":{"displayName":"क्षेत्र"}},"timeZoneNames":{"hourFormat":"+HH:mm;-HH:mm","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","regionFormat":"{0} समय","regionFormat-type-daylight":"{0} डेलाइट समय","regionFormat-type-standard":"{0} मानक समय","fallbackFormat":"{1} ({0})","zone":{"America":{"Adak":{"exemplarCity":"अडक"},"Anchorage":{"exemplarCity":"एंकरेज"},"Anguilla":{"exemplarCity":"एंग्विला"},"Antigua":{"exemplarCity":"एंटीगुआ"},"Araguaina":{"exemplarCity":"आराग्वेना"},"Argentina":{"Rio_Gallegos":{"exemplarCity":"रियो गालेगोस"},"San_Juan":{"exemplarCity":"सैन ह्वान"},"Ushuaia":{"exemplarCity":"उशुआइया"},"La_Rioja":{"exemplarCity":"ला रिओजा"},"San_Luis":{"exemplarCity":"सैन लूई"},"Salta":{"exemplarCity":"साल्टा"},"Tucuman":{"exemplarCity":"टोकूमन"}},"Aruba":{"exemplarCity":"अरूबा"},"Asuncion":{"exemplarCity":"एसनशियॉन"},"Bahia":{"exemplarCity":"बहिया"},"Bahia_Banderas":{"exemplarCity":"बेहिया बांडेरास"},"Barbados":{"exemplarCity":"बारबाडोस"},"Belem":{"exemplarCity":"बेलेम"},"Belize":{"exemplarCity":"बेलीज़"},"Blanc-Sablon":{"exemplarCity":"ब्लांक-सेबलोन"},"Boa_Vista":{"exemplarCity":"बोआ विस्ता"},"Bogota":{"exemplarCity":"बोगोटा"},"Boise":{"exemplarCity":"बॉइसी"},"Buenos_Aires":{"exemplarCity":"ब्यूनस आयरस"},"Cambridge_Bay":{"exemplarCity":"कैम्ब्रिज खाड़ी"},"Campo_Grande":{"exemplarCity":"कैंपो ग्रांडे"},"Cancun":{"exemplarCity":"कैनकुन"},"Caracas":{"exemplarCity":"काराकस"},"Catamarca":{"exemplarCity":"काटामार्का"},"Cayenne":{"exemplarCity":"कायेन"},"Cayman":{"exemplarCity":"कैमेन"},"Chicago":{"exemplarCity":"शिकागो"},"Chihuahua":{"exemplarCity":"चिहुआहुआ"},"Coral_Harbour":{"exemplarCity":"अटिकोकान"},"Cordoba":{"exemplarCity":"कोर्डोबा"},"Costa_Rica":{"exemplarCity":"कोस्टा रिका"},"Creston":{"exemplarCity":"क्रेस्टन"},"Cuiaba":{"exemplarCity":"क्यूआबा"},"Curacao":{"exemplarCity":"कुराकाओ"},"Danmarkshavn":{"exemplarCity":"डेनमार्कशॉन"},"Dawson":{"exemplarCity":"डॉसन"},"Dawson_Creek":{"exemplarCity":"डॉसन क्रीक"},"Denver":{"exemplarCity":"डेनवर"},"Detroit":{"exemplarCity":"डेट्रॉयट"},"Dominica":{"exemplarCity":"डोमिनिका"},"Edmonton":{"exemplarCity":"एडमंटन"},"Eirunepe":{"exemplarCity":"ईरुनेपे"},"El_Salvador":{"exemplarCity":"अल सल्वाडोर"},"Fort_Nelson":{"exemplarCity":"फ़ोर्ट नेल्सन"},"Fortaleza":{"exemplarCity":"फ़ोर्टालेज़ा"},"Glace_Bay":{"exemplarCity":"ग्लेस खाड़ी"},"Godthab":{"exemplarCity":"नुक"},"Goose_Bay":{"exemplarCity":"गूस खाड़ी"},"Grand_Turk":{"exemplarCity":"ग्रांड टर्क"},"Grenada":{"exemplarCity":"ग्रेनाडा"},"Guadeloupe":{"exemplarCity":"ग्वाडेलोप"},"Guatemala":{"exemplarCity":"ग्वाटेमाला"},"Guayaquil":{"exemplarCity":"ग्वायाकील"},"Guyana":{"exemplarCity":"गयाना"},"Halifax":{"exemplarCity":"हेलिफ़ैक्स"},"Havana":{"exemplarCity":"हवाना"},"Hermosillo":{"exemplarCity":"हर्मोसिल्लो"},"Indiana":{"Vincennes":{"exemplarCity":"विंसेनेस, इंडियाना"},"Petersburg":{"exemplarCity":"पीटर्सबर्ग, इंडियाना"},"Tell_City":{"exemplarCity":"टेल सिटी, इंडियाना"},"Knox":{"exemplarCity":"नौक्स, इंडियाना"},"Winamac":{"exemplarCity":"विनामेक, इंडियाना"},"Marengo":{"exemplarCity":"मारेंगो, इंडियाना"},"Vevay":{"exemplarCity":"वेवे, इंडियाना"}},"Indianapolis":{"exemplarCity":"इंडियानापोलिस"},"Inuvik":{"exemplarCity":"इनूविक"},"Iqaluit":{"exemplarCity":"इकालुईट"},"Jamaica":{"exemplarCity":"जमैका"},"Jujuy":{"exemplarCity":"जुजोए"},"Juneau":{"exemplarCity":"ज्यूनाउ"},"Kentucky":{"Monticello":{"exemplarCity":"मोंटीसेलो, केंटकी"}},"Kralendijk":{"exemplarCity":"क्रालैंडिजिक"},"La_Paz":{"exemplarCity":"ला पाज़"},"Lima":{"exemplarCity":"लीमा"},"Los_Angeles":{"exemplarCity":"लॉस एंजिल्स"},"Louisville":{"exemplarCity":"लुइसविले"},"Lower_Princes":{"exemplarCity":"लोअर प्रिंसेस क्वार्टर"},"Maceio":{"exemplarCity":"मेसीओ"},"Managua":{"exemplarCity":"मानागुआ"},"Manaus":{"exemplarCity":"मनौस"},"Marigot":{"exemplarCity":"मैरीगोट"},"Martinique":{"exemplarCity":"मार्टिनिक"},"Matamoros":{"exemplarCity":"माटामोरोस"},"Mazatlan":{"exemplarCity":"माज़ाटलान"},"Mendoza":{"exemplarCity":"मेंडोज़ा"},"Menominee":{"exemplarCity":"मेनोमिनी"},"Merida":{"exemplarCity":"मेरिडा"},"Metlakatla":{"exemplarCity":"मेट्लेकाट्ला"},"Mexico_City":{"exemplarCity":"मेक्सिको सिटी"},"Miquelon":{"exemplarCity":"मिकेलॉन"},"Moncton":{"exemplarCity":"मोंकटन"},"Monterrey":{"exemplarCity":"मोंटेरेरी"},"Montevideo":{"exemplarCity":"मोंटेवीडियो"},"Montserrat":{"exemplarCity":"मोंटसेरात"},"Nassau":{"exemplarCity":"नासाउ"},"New_York":{"exemplarCity":"न्यूयॉर्क"},"Nipigon":{"exemplarCity":"निपिगन"},"Nome":{"exemplarCity":"नोम"},"Noronha":{"exemplarCity":"नोरोन्हा"},"North_Dakota":{"Beulah":{"exemplarCity":"ब्यूला, उत्तरी डकोटा"},"New_Salem":{"exemplarCity":"न्यू सालेम, उत्तरी डकोटा"},"Center":{"exemplarCity":"मध्य, उत्तरी दाकोता"}},"Ojinaga":{"exemplarCity":"ओखाजीनागा"},"Panama":{"exemplarCity":"पनामा"},"Pangnirtung":{"exemplarCity":"पांगनिर्टंग"},"Paramaribo":{"exemplarCity":"पारामारिबो"},"Phoenix":{"exemplarCity":"फ़ीनिक्स"},"Port-au-Prince":{"exemplarCity":"पोर्ट-ऑ-प्रिंस"},"Port_of_Spain":{"exemplarCity":"पोर्ट ऑफ़ स्पेन"},"Porto_Velho":{"exemplarCity":"पोर्टो वेल्हो"},"Puerto_Rico":{"exemplarCity":"पोर्टो रिको"},"Punta_Arenas":{"exemplarCity":"पुंटा एरिनास"},"Rainy_River":{"exemplarCity":"रेनी नदी"},"Rankin_Inlet":{"exemplarCity":"रेंकिन इनलेट"},"Recife":{"exemplarCity":"रेसाइफ़"},"Regina":{"exemplarCity":"रेजिना"},"Resolute":{"exemplarCity":"रिसोल्यूट"},"Rio_Branco":{"exemplarCity":"रियो ब्रांको"},"Santa_Isabel":{"exemplarCity":"सांता इसाबेल"},"Santarem":{"exemplarCity":"सैंटारेम"},"Santiago":{"exemplarCity":"सैंटियागो"},"Santo_Domingo":{"exemplarCity":"सेंटो डोमिंगो"},"Sao_Paulo":{"exemplarCity":"साओ पाउलो"},"Scoresbysund":{"exemplarCity":"इटोकोर्टोरमिट"},"Sitka":{"exemplarCity":"सिट्का"},"St_Barthelemy":{"exemplarCity":"सेंट बार्थेलेमी"},"St_Johns":{"exemplarCity":"सेंट जोंस"},"St_Kitts":{"exemplarCity":"सेंट किट्स"},"St_Lucia":{"exemplarCity":"सेंट लूसिया"},"St_Thomas":{"exemplarCity":"सेंट थॉमस"},"St_Vincent":{"exemplarCity":"सेंट विंसेंट"},"Swift_Current":{"exemplarCity":"स्विफ़्ट करंट"},"Tegucigalpa":{"exemplarCity":"टेगुसिगल्पा"},"Thule":{"exemplarCity":"थ्यूले"},"Thunder_Bay":{"exemplarCity":"थंडर खाड़ी"},"Tijuana":{"exemplarCity":"तिजुआना"},"Toronto":{"exemplarCity":"टोरंटो"},"Tortola":{"exemplarCity":"टोर्टोला"},"Vancouver":{"exemplarCity":"वैंकूवर"},"Whitehorse":{"exemplarCity":"व्हाइटहोर्स"},"Winnipeg":{"exemplarCity":"विनीपेग"},"Yakutat":{"exemplarCity":"याकूटाट"},"Yellowknife":{"exemplarCity":"येलोनाइफ़"}},"Atlantic":{"Azores":{"exemplarCity":"अज़ोरेस"},"Bermuda":{"exemplarCity":"बरमूडा"},"Canary":{"exemplarCity":"कैनेरी"},"Cape_Verde":{"exemplarCity":"केप वर्ड"},"Faeroe":{"exemplarCity":"फ़ैरो"},"Madeira":{"exemplarCity":"मडेरा"},"Reykjavik":{"exemplarCity":"रेक्याविक"},"South_Georgia":{"exemplarCity":"दक्षिण जॉर्जिया"},"St_Helena":{"exemplarCity":"सेंट हेलेना"},"Stanley":{"exemplarCity":"स्टैनली"}},"Europe":{"Amsterdam":{"exemplarCity":"एम्स्टर्डम"},"Andorra":{"exemplarCity":"अंडोरा"},"Astrakhan":{"exemplarCity":"आस्ट्राखान"},"Athens":{"exemplarCity":"एथेंस"},"Belgrade":{"exemplarCity":"बेलग्रेड"},"Berlin":{"exemplarCity":"बर्लिन"},"Bratislava":{"exemplarCity":"ब्रातिस्लावा"},"Brussels":{"exemplarCity":"ब्रूसेल्स"},"Bucharest":{"exemplarCity":"बुख़ारेस्ट"},"Budapest":{"exemplarCity":"बुडापेस्ट"},"Busingen":{"exemplarCity":"ब्यूसिनजेन"},"Chisinau":{"exemplarCity":"चिसीनाउ"},"Copenhagen":{"exemplarCity":"कोपेनहेगन"},"Dublin":{"long":{"daylight":"आइरिश मानक समय"},"exemplarCity":"डबलिन"},"Gibraltar":{"exemplarCity":"जिब्राल्टर"},"Guernsey":{"exemplarCity":"गर्नसी"},"Helsinki":{"exemplarCity":"हेलसिंकी"},"Isle_of_Man":{"exemplarCity":"आइल ऑफ़ मैन"},"Istanbul":{"exemplarCity":"इस्तांबुल"},"Jersey":{"exemplarCity":"जर्सी"},"Kaliningrad":{"exemplarCity":"कालीनिनग्राड"},"Kiev":{"exemplarCity":"कीव"},"Kirov":{"exemplarCity":"किरोव"},"Lisbon":{"exemplarCity":"लिस्बन"},"Ljubljana":{"exemplarCity":"ल्यूबेलजाना"},"London":{"long":{"daylight":"ब्रिटिश ग्रीष्मकालीन समय"},"exemplarCity":"लंदन"},"Luxembourg":{"exemplarCity":"लक्ज़मबर्ग"},"Madrid":{"exemplarCity":"मैड्रिड"},"Malta":{"exemplarCity":"माल्टा"},"Mariehamn":{"exemplarCity":"मारियाहैम"},"Minsk":{"exemplarCity":"मिंस्क"},"Monaco":{"exemplarCity":"मोनाको"},"Moscow":{"exemplarCity":"मॉस्को"},"Oslo":{"exemplarCity":"ओस्लो"},"Paris":{"exemplarCity":"पेरिस"},"Podgorica":{"exemplarCity":"पोड्गोरिका"},"Prague":{"exemplarCity":"प्राग"},"Riga":{"exemplarCity":"रीगा"},"Rome":{"exemplarCity":"रोम"},"Samara":{"exemplarCity":"समारा"},"San_Marino":{"exemplarCity":"सैन मारीनो"},"Sarajevo":{"exemplarCity":"साराजेवो"},"Saratov":{"exemplarCity":"सारातोव"},"Simferopol":{"exemplarCity":"सिम्फ़ेरोपोल"},"Skopje":{"exemplarCity":"स्कोप्जे"},"Sofia":{"exemplarCity":"सोफ़िया"},"Stockholm":{"exemplarCity":"स्टॉकहोम"},"Tallinn":{"exemplarCity":"तेलिन"},"Tirane":{"exemplarCity":"टाइरेन"},"Ulyanovsk":{"exemplarCity":"उल्यानोव्स्क"},"Uzhgorod":{"exemplarCity":"अज़्गोरोद"},"Vaduz":{"exemplarCity":"वादुज़"},"Vatican":{"exemplarCity":"वेटिकन"},"Vienna":{"exemplarCity":"विएना"},"Vilnius":{"exemplarCity":"विल्नियस"},"Volgograd":{"exemplarCity":"वोल्गोग्राड"},"Warsaw":{"exemplarCity":"वॉरसॉ"},"Zagreb":{"exemplarCity":"ज़ाग्रेब"},"Zaporozhye":{"exemplarCity":"ज़ैपोरोज़ाई"},"Zurich":{"exemplarCity":"ज़्यूरिख़"}},"Africa":{"Abidjan":{"exemplarCity":"अबिदजान"},"Accra":{"exemplarCity":"एक्रा"},"Addis_Ababa":{"exemplarCity":"अदीस अबाबा"},"Algiers":{"exemplarCity":"अल्जीयर्स"},"Asmera":{"exemplarCity":"अस्मारा"},"Bamako":{"exemplarCity":"बामाको"},"Bangui":{"exemplarCity":"बांगुइ"},"Banjul":{"exemplarCity":"बैंजुल"},"Bissau":{"exemplarCity":"बिसाऊ"},"Blantyre":{"exemplarCity":"ब्लांटायर"},"Brazzaville":{"exemplarCity":"ब्राज़ाविले"},"Bujumbura":{"exemplarCity":"बुजुंबूरा"},"Cairo":{"exemplarCity":"कायरो"},"Casablanca":{"exemplarCity":"कासाब्लांका"},"Ceuta":{"exemplarCity":"सेउटा"},"Conakry":{"exemplarCity":"कोनाक्री"},"Dakar":{"exemplarCity":"डकार"},"Dar_es_Salaam":{"exemplarCity":"दार अस सलाम"},"Djibouti":{"exemplarCity":"जिबूती"},"Douala":{"exemplarCity":"डूआला"},"El_Aaiun":{"exemplarCity":"अल आइयून"},"Freetown":{"exemplarCity":"फ़्रीटाउन"},"Gaborone":{"exemplarCity":"गाबोरोन"},"Harare":{"exemplarCity":"हरारे"},"Johannesburg":{"exemplarCity":"जोहांसबर्ग"},"Juba":{"exemplarCity":"जुबा"},"Kampala":{"exemplarCity":"कंपाला"},"Khartoum":{"exemplarCity":"खार्तूम"},"Kigali":{"exemplarCity":"किगाली"},"Kinshasa":{"exemplarCity":"किंशासा"},"Lagos":{"exemplarCity":"लागोस"},"Libreville":{"exemplarCity":"लिब्रेविले"},"Lome":{"exemplarCity":"लोम"},"Luanda":{"exemplarCity":"लुआंडा"},"Lubumbashi":{"exemplarCity":"लुबुमबाशी"},"Lusaka":{"exemplarCity":"लुसाका"},"Malabo":{"exemplarCity":"मलाबो"},"Maputo":{"exemplarCity":"मापुटो"},"Maseru":{"exemplarCity":"मासेरू"},"Mbabane":{"exemplarCity":"एमबाबेन"},"Mogadishu":{"exemplarCity":"मोगादिशु"},"Monrovia":{"exemplarCity":"मोनरोविया"},"Nairobi":{"exemplarCity":"नैरोबी"},"Ndjamena":{"exemplarCity":"नेद्जामीना"},"Niamey":{"exemplarCity":"नियामी"},"Nouakchott":{"exemplarCity":"नौआकशॉट"},"Ouagadougou":{"exemplarCity":"औगाडोगू"},"Porto-Novo":{"exemplarCity":"पोर्टो-नोवो"},"Sao_Tome":{"exemplarCity":"साओ टोम"},"Tripoli":{"exemplarCity":"त्रिपोली"},"Tunis":{"exemplarCity":"ट्यूनिस"},"Windhoek":{"exemplarCity":"विंडहोक"}},"Asia":{"Aden":{"exemplarCity":"आदेन"},"Almaty":{"exemplarCity":"अल्माटी"},"Amman":{"exemplarCity":"अम्मान"},"Anadyr":{"exemplarCity":"अनाडिर"},"Aqtau":{"exemplarCity":"अक्ताउ"},"Aqtobe":{"exemplarCity":"अक्तोब"},"Ashgabat":{"exemplarCity":"अश्गाबात"},"Atyrau":{"exemplarCity":"एतराउ"},"Baghdad":{"exemplarCity":"बगदाद"},"Bahrain":{"exemplarCity":"बहरीन"},"Baku":{"exemplarCity":"बाकु"},"Bangkok":{"exemplarCity":"बैंकॉक"},"Barnaul":{"exemplarCity":"बर्नोल"},"Beirut":{"exemplarCity":"बेरुत"},"Bishkek":{"exemplarCity":"बिश्केक"},"Brunei":{"exemplarCity":"ब्रूनेई"},"Calcutta":{"exemplarCity":"कोलकाता"},"Chita":{"exemplarCity":"त्शिता"},"Choibalsan":{"exemplarCity":"चोइबालसन"},"Colombo":{"exemplarCity":"कोलंबो"},"Damascus":{"exemplarCity":"दमास्कस"},"Dhaka":{"exemplarCity":"ढाका"},"Dili":{"exemplarCity":"डिलि"},"Dubai":{"exemplarCity":"दुबई"},"Dushanbe":{"exemplarCity":"दुशांबे"},"Famagusta":{"exemplarCity":"फ़ामागुस्ता"},"Gaza":{"exemplarCity":"गाज़ा"},"Hebron":{"exemplarCity":"हेब्रोन"},"Hong_Kong":{"exemplarCity":"हाँग काँग"},"Hovd":{"exemplarCity":"होव्ड"},"Irkutsk":{"exemplarCity":"इर्कुत्स्क"},"Jakarta":{"exemplarCity":"जकार्ता"},"Jayapura":{"exemplarCity":"जयापुरा"},"Jerusalem":{"exemplarCity":"यरूशलम"},"Kabul":{"exemplarCity":"काबुल"},"Kamchatka":{"exemplarCity":"कमचत्का"},"Karachi":{"exemplarCity":"कराची"},"Katmandu":{"exemplarCity":"काठमांडू"},"Khandyga":{"exemplarCity":"खांडिगा"},"Krasnoyarsk":{"exemplarCity":"क्रास्नोयार्स्क"},"Kuala_Lumpur":{"exemplarCity":"कुआलालंपुर"},"Kuching":{"exemplarCity":"कूचिंग"},"Kuwait":{"exemplarCity":"कुवैत"},"Macau":{"exemplarCity":"मकाउ"},"Magadan":{"exemplarCity":"मागादान"},"Makassar":{"exemplarCity":"मकस्सर"},"Manila":{"exemplarCity":"मनीला"},"Muscat":{"exemplarCity":"मस्कट"},"Nicosia":{"exemplarCity":"निकोसिया"},"Novokuznetsk":{"exemplarCity":"नोवोकुज़्नेत्स्क"},"Novosibirsk":{"exemplarCity":"नोवोसिबिर्स्क"},"Omsk":{"exemplarCity":"ओम्स्क"},"Oral":{"exemplarCity":"ओरल"},"Phnom_Penh":{"exemplarCity":"नॉम पेन्ह"},"Pontianak":{"exemplarCity":"पोंटीयांक"},"Pyongyang":{"exemplarCity":"प्योंगयांग"},"Qatar":{"exemplarCity":"कतर"},"Qyzylorda":{"exemplarCity":"केज़ेलोर्डा"},"Rangoon":{"exemplarCity":"रंगून"},"Riyadh":{"exemplarCity":"रियाद"},"Saigon":{"exemplarCity":"हो ची मिन्ह सिटी"},"Sakhalin":{"exemplarCity":"सखालिन"},"Samarkand":{"exemplarCity":"समरकंद"},"Seoul":{"exemplarCity":"सिओल"},"Shanghai":{"exemplarCity":"शंघाई"},"Singapore":{"exemplarCity":"सिंगापुर"},"Srednekolymsk":{"exemplarCity":"स्रेद्निकोलिमस्क"},"Taipei":{"exemplarCity":"ताईपेई"},"Tashkent":{"exemplarCity":"ताशकंद"},"Tbilisi":{"exemplarCity":"टबिलिसी"},"Tehran":{"exemplarCity":"तेहरान"},"Thimphu":{"exemplarCity":"थिंपू"},"Tokyo":{"exemplarCity":"टोक्यो"},"Tomsk":{"exemplarCity":"तोम्स्क"},"Ulaanbaatar":{"exemplarCity":"उलानबातर"},"Urumqi":{"exemplarCity":"उरूम्की"},"Ust-Nera":{"exemplarCity":"यूस्ट–नेरा"},"Vientiane":{"exemplarCity":"विएनतियान"},"Vladivostok":{"exemplarCity":"व्लादिवोस्तोक"},"Yakutsk":{"exemplarCity":"याकूत्स्क"},"Yekaterinburg":{"exemplarCity":"येकातेरिनबर्ग"},"Yerevan":{"exemplarCity":"येरेवान"}},"Indian":{"Antananarivo":{"exemplarCity":"एंटानानरीवो"},"Chagos":{"exemplarCity":"शागोस"},"Christmas":{"exemplarCity":"क्रिसमस"},"Cocos":{"exemplarCity":"कोकोस"},"Comoro":{"exemplarCity":"कोमोरो"},"Kerguelen":{"exemplarCity":"करगुलेन"},"Mahe":{"exemplarCity":"माहे"},"Maldives":{"exemplarCity":"मालदीव"},"Mauritius":{"exemplarCity":"मॉरीशस"},"Mayotte":{"exemplarCity":"मायोत्ते"},"Reunion":{"exemplarCity":"रीयूनियन"}},"Australia":{"Adelaide":{"exemplarCity":"एडिलेड"},"Brisbane":{"exemplarCity":"ब्रिस्बन"},"Broken_Hill":{"exemplarCity":"ब्रोकन हिल"},"Currie":{"exemplarCity":"क्यूरी"},"Darwin":{"exemplarCity":"डार्विन"},"Eucla":{"exemplarCity":"यूक्ला"},"Hobart":{"exemplarCity":"होबार्ट"},"Lindeman":{"exemplarCity":"लिंडेमान"},"Lord_Howe":{"exemplarCity":"लॉर्ड होवे"},"Melbourne":{"exemplarCity":"मेलबोर्न"},"Perth":{"exemplarCity":"पर्थ"},"Sydney":{"exemplarCity":"सिडनी"}},"Pacific":{"Apia":{"exemplarCity":"एपिया"},"Auckland":{"exemplarCity":"ऑकलैंड"},"Bougainville":{"exemplarCity":"बोगनविले"},"Chatham":{"exemplarCity":"चैथम"},"Easter":{"exemplarCity":"ईस्टर"},"Efate":{"exemplarCity":"एफ़ेट"},"Enderbury":{"exemplarCity":"एंडरबरी"},"Fakaofo":{"exemplarCity":"फ़ाकाओफ़ो"},"Fiji":{"exemplarCity":"फ़िजी"},"Funafuti":{"exemplarCity":"फ़्यूनाफ़ुटी"},"Galapagos":{"exemplarCity":"गेलापागोस"},"Gambier":{"exemplarCity":"गैंबियर"},"Guadalcanal":{"exemplarCity":"ग्वाडलकनाल"},"Guam":{"exemplarCity":"गुआम"},"Honolulu":{"exemplarCity":"होनोलुलु"},"Johnston":{"exemplarCity":"जॉनस्टन"},"Kiritimati":{"exemplarCity":"किरीतिमाति"},"Kosrae":{"exemplarCity":"कोसराए"},"Kwajalein":{"exemplarCity":"क्वाज़ालीन"},"Majuro":{"exemplarCity":"माजुरो"},"Marquesas":{"exemplarCity":"मार्केसस"},"Midway":{"exemplarCity":"मिडवे"},"Nauru":{"exemplarCity":"नौरु"},"Niue":{"exemplarCity":"नीयू"},"Norfolk":{"exemplarCity":"नॉरफ़ॉक"},"Noumea":{"exemplarCity":"नौमिया"},"Pago_Pago":{"exemplarCity":"पागो पागो"},"Palau":{"exemplarCity":"पलाऊ"},"Pitcairn":{"exemplarCity":"पिटकैर्न"},"Ponape":{"exemplarCity":"पोनपेई"},"Port_Moresby":{"exemplarCity":"पोर्ट मोरेस्बी"},"Rarotonga":{"exemplarCity":"रारोटोंगा"},"Saipan":{"exemplarCity":"सायपान"},"Tahiti":{"exemplarCity":"ताहिती"},"Tarawa":{"exemplarCity":"टारावा"},"Tongatapu":{"exemplarCity":"टोंगाटापू"},"Truk":{"exemplarCity":"चक"},"Wake":{"exemplarCity":"वेक"},"Wallis":{"exemplarCity":"वालिस"}},"Arctic":{"Longyearbyen":{"exemplarCity":"लॉन्गईयरबायेन"}},"Antarctica":{"Casey":{"exemplarCity":"केसी"},"Davis":{"exemplarCity":"डेविस"},"DumontDUrville":{"exemplarCity":"ड्यूमोंट डी अर्विले"},"Macquarie":{"exemplarCity":"मक्वारी"},"Mawson":{"exemplarCity":"मॉसन"},"McMurdo":{"exemplarCity":"मैकमुर्डो"},"Palmer":{"exemplarCity":"पॉमर"},"Rothera":{"exemplarCity":"रोथेरा"},"Syowa":{"exemplarCity":"स्योवा"},"Troll":{"exemplarCity":"ट्रोल"},"Vostok":{"exemplarCity":"वोस्तोक"}},"Etc":{"UTC":{"long":{"standard":"समन्वित वैश्विक समय"},"short":{"standard":"UTC"}},"Unknown":{"exemplarCity":"अज्ञात शहर"}}},"metazone":{"Afghanistan":{"long":{"standard":"अफ़गानिस्तान समय"}},"Africa_Central":{"long":{"standard":"मध्य अफ़्रीका समय"}},"Africa_Eastern":{"long":{"standard":"पूर्वी अफ़्रीका समय"}},"Africa_Southern":{"long":{"standard":"दक्षिण अफ़्रीका मानक समय"}},"Africa_Western":{"long":{"generic":"पश्चिम अफ़्रीका समय","standard":"पश्चिम अफ़्रीका मानक समय","daylight":"पश्चिम अफ़्रीका ग्रीष्मकालीन समय"}},"Alaska":{"long":{"generic":"अलास्का समय","standard":"अलास्‍का मानक समय","daylight":"अलास्‍का डेलाइट समय"}},"Amazon":{"long":{"generic":"अमेज़न समय","standard":"अमेज़न मानक समय","daylight":"अमेज़न ग्रीष्मकालीन समय"}},"America_Central":{"long":{"generic":"उत्तरी अमेरिकी केंद्रीय समय","standard":"उत्तरी अमेरिकी केंद्रीय मानक समय","daylight":"उत्तरी अमेरिकी केंद्रीय डेलाइट समय"}},"America_Eastern":{"long":{"generic":"उत्तरी अमेरिकी पूर्वी समय","standard":"उत्तरी अमेरिकी पूर्वी मानक समय","daylight":"उत्तरी अमेरिकी पूर्वी डेलाइट समय"}},"America_Mountain":{"long":{"generic":"उत्तरी अमेरिकी माउंटेन समय","standard":"उत्तरी अमेरिकी माउंटेन मानक समय","daylight":"उत्तरी अमेरिकी माउंटेन डेलाइट समय"}},"America_Pacific":{"long":{"generic":"उत्तरी अमेरिकी प्रशांत समय","standard":"उत्तरी अमेरिकी प्रशांत मानक समय","daylight":"उत्तरी अमेरिकी प्रशांत डेलाइट समय"}},"Anadyr":{"long":{"generic":"एनाडीयर समय","standard":"एनाडीयर मानक समय","daylight":"एनाडीयर ग्रीष्मकालीन समय"}},"Apia":{"long":{"generic":"एपिआ समय","standard":"एपिआ मानक समय","daylight":"एपिआ डेलाइट समय"}},"Arabian":{"long":{"generic":"अरब समय","standard":"अरब मानक समय","daylight":"अरब डेलाइट समय"}},"Argentina":{"long":{"generic":"अर्जेंटीना समय","standard":"अर्जेंटीना मानक समय","daylight":"अर्जेंटीना ग्रीष्मकालीन समय"}},"Argentina_Western":{"long":{"generic":"पश्चिमी अर्जेंटीना समय","standard":"पश्चिमी अर्जेंटीना मानक समय","daylight":"पश्चिमी अर्जेंटीना ग्रीष्मकालीन समय"}},"Armenia":{"long":{"generic":"आर्मेनिया समय","standard":"आर्मेनिया मानक समय","daylight":"आर्मेनिया ग्रीष्मकालीन समय"}},"Atlantic":{"long":{"generic":"अटलांटिक समय","standard":"अटलांटिक मानक समय","daylight":"अटलांटिक डेलाइट समय"}},"Australia_Central":{"long":{"generic":"मध्य ऑस्ट्रेलियाई समय","standard":"ऑस्‍ट्रेलियाई केंद्रीय मानक समय","daylight":"ऑस्‍ट्रेलियाई केंद्रीय डेलाइट समय"}},"Australia_CentralWestern":{"long":{"generic":"ऑस्‍ट्रेलियाई केंद्रीय पश्चिमी समय","standard":"ऑस्‍ट्रेलियाई केंद्रीय पश्चिमी मानक समय","daylight":"ऑस्‍ट्रेलियाई केंद्रीय पश्चिमी डेलाइट समय"}},"Australia_Eastern":{"long":{"generic":"पूर्वी ऑस्ट्रेलिया समय","standard":"ऑस्‍ट्रेलियाई पूर्वी मानक समय","daylight":"ऑस्‍ट्रेलियाई पूर्वी डेलाइट समय"}},"Australia_Western":{"long":{"generic":"पश्चिमी ऑस्ट्रेलिया समय","standard":"ऑस्ट्रेलियाई पश्चिमी मानक समय","daylight":"ऑस्ट्रेलियाई पश्चिमी डेलाइट समय"}},"Azerbaijan":{"long":{"generic":"अज़रबैजान समय","standard":"अज़रबैजान मानक समय","daylight":"अज़रबैजान ग्रीष्मकालीन समय"}},"Azores":{"long":{"generic":"अज़ोरेस समय","standard":"अज़ोरेस मानक समय","daylight":"अज़ोरेस ग्रीष्मकालीन समय"}},"Bangladesh":{"long":{"generic":"बांग्लादेश समय","standard":"बांग्लादेश मानक समय","daylight":"बांग्लादेश ग्रीष्मकालीन समय"}},"Bhutan":{"long":{"standard":"भूटान समय"}},"Bolivia":{"long":{"standard":"बोलीविया समय"}},"Brasilia":{"long":{"generic":"ब्राज़ीलिया समय","standard":"ब्राज़ीलिया मानक समय","daylight":"ब्राज़ीलिया ग्रीष्मकालीन समय"}},"Brunei":{"long":{"standard":"ब्रूनेई दारूस्सलम समय"}},"Cape_Verde":{"long":{"generic":"केप वर्ड समय","standard":"केप वर्ड मानक समय","daylight":"केप वर्ड ग्रीष्मकालीन समय"}},"Chamorro":{"long":{"standard":"चामोरो मानक समय"}},"Chatham":{"long":{"generic":"चैथम समय","standard":"चैथम मानक समय","daylight":"चैथम डेलाइट समय"}},"Chile":{"long":{"generic":"चिली समय","standard":"चिली मानक समय","daylight":"चिली ग्रीष्मकालीन समय"}},"China":{"long":{"generic":"चीन समय","standard":"चीन मानक समय","daylight":"चीन डेलाइट समय"}},"Choibalsan":{"long":{"generic":"कॉइबाल्सन समय","standard":"कॉइबाल्सन मानक समय","daylight":"कॉइबाल्सन ग्रीष्मकालीन समय"}},"Christmas":{"long":{"standard":"क्रिसमस द्वीप समय"}},"Cocos":{"long":{"standard":"कोकोस द्वीपसमूह समय"}},"Colombia":{"long":{"generic":"कोलंबिया समय","standard":"कोलंबिया मानक समय","daylight":"कोलंबिया ग्रीष्मकालीन समय"}},"Cook":{"long":{"generic":"कुक द्वीपसमूह समय","standard":"कुक द्वीपसमूह मानक समय","daylight":"कुक द्वीपसमूह अर्द्ध ग्रीष्मकालीन समय"}},"Cuba":{"long":{"generic":"क्यूबा समय","standard":"क्यूबा मानक समय","daylight":"क्यूबा डेलाइट समय"}},"Davis":{"long":{"standard":"डेविस समय"}},"DumontDUrville":{"long":{"standard":"ड्यूमोंट डी अर्विले समय"}},"East_Timor":{"long":{"standard":"पूर्वी तिमोर समय"}},"Easter":{"long":{"generic":"ईस्टर द्वीप समय","standard":"ईस्टर द्वीप मानक समय","daylight":"ईस्टर द्वीप ग्रीष्मकालीन समय"}},"Ecuador":{"long":{"standard":"इक्वाडोर समय"}},"Europe_Central":{"long":{"generic":"मध्य यूरोपीय समय","standard":"मध्य यूरोपीय मानक समय","daylight":"मध्‍य यूरोपीय ग्रीष्‍मकालीन समय"}},"Europe_Eastern":{"long":{"generic":"पूर्वी यूरोपीय समय","standard":"पूर्वी यूरोपीय मानक समय","daylight":"पूर्वी यूरोपीय ग्रीष्मकालीन समय"}},"Europe_Further_Eastern":{"long":{"standard":"अग्र पूर्वी यूरोपीय समय"}},"Europe_Western":{"long":{"generic":"पश्चिमी यूरोपीय समय","standard":"पश्चिमी यूरोपीय मानक समय","daylight":"पश्चिमी यूरोपीय ग्रीष्‍मकालीन समय"}},"Falkland":{"long":{"generic":"फ़ॉकलैंड द्वीपसमूह समय","standard":"फ़ॉकलैंड द्वीपसमूह मानक समय","daylight":"फ़ॉकलैंड द्वीपसमूह ग्रीष्मकालीन समय"}},"Fiji":{"long":{"generic":"फ़िजी समय","standard":"फ़िजी मानक समय","daylight":"फ़िजी ग्रीष्मकालीन समय"}},"French_Guiana":{"long":{"standard":"फ़्रेंच गुयाना समय"}},"French_Southern":{"long":{"standard":"दक्षिणी फ़्रांस और अंटार्कटिक समय"}},"Galapagos":{"long":{"standard":"गैलापेगोस का समय"}},"Gambier":{"long":{"standard":"गैंबियर समय"}},"Georgia":{"long":{"generic":"जॉर्जिया समय","standard":"जॉर्जिया मानक समय","daylight":"जॉर्जिया ग्रीष्मकालीन समय"}},"Gilbert_Islands":{"long":{"standard":"गिल्बर्ट द्वीपसमूह समय"}},"GMT":{"long":{"standard":"ग्रीनविच मीन टाइम"}},"Greenland_Eastern":{"long":{"generic":"पूर्वी ग्रीनलैंड समय","standard":"पूर्वी ग्रीनलैंड मानक समय","daylight":"पूर्वी ग्रीनलैंड ग्रीष्मकालीन समय"}},"Greenland_Western":{"long":{"generic":"पश्चिमी ग्रीनलैंड समय","standard":"पश्चिमी ग्रीनलैंड मानक समय","daylight":"पश्चिमी ग्रीनलैंड ग्रीष्मकालीन समय"}},"Gulf":{"long":{"standard":"खाड़ी मानक समय"}},"Guyana":{"long":{"standard":"गुयाना समय"}},"Hawaii_Aleutian":{"long":{"generic":"हवाई–आल्यूशन समय","standard":"हवाई–आल्यूशन मानक समय","daylight":"हवाई–आल्यूशन डेलाइट समय"}},"Hong_Kong":{"long":{"generic":"हाँग काँग समय","standard":"हाँग काँग मानक समय","daylight":"हाँग काँग ग्रीष्मकालीन समय"}},"Hovd":{"long":{"generic":"होव्ड समय","standard":"होव्ड मानक समय","daylight":"होव्ड ग्रीष्मकालीन समय"}},"India":{"long":{"standard":"भारतीय मानक समय"},"short":{"standard":"IST"}},"Indian_Ocean":{"long":{"standard":"हिंद महासागर समय"}},"Indochina":{"long":{"standard":"इंडोचाइना समय"}},"Indonesia_Central":{"long":{"standard":"मध्य इंडोनेशिया समय"}},"Indonesia_Eastern":{"long":{"standard":"पूर्वी इंडोनेशिया समय"}},"Indonesia_Western":{"long":{"standard":"पश्चिमी इंडोनेशिया समय"}},"Iran":{"long":{"generic":"ईरान समय","standard":"ईरान मानक समय","daylight":"ईरान डेलाइट समय"}},"Irkutsk":{"long":{"generic":"इर्कुत्स्क समय","standard":"इर्कुत्स्क मानक समय","daylight":"इर्कुत्स्क ग्रीष्मकालीन समय"}},"Israel":{"long":{"generic":"इज़राइल समय","standard":"इज़राइल मानक समय","daylight":"इज़राइल डेलाइट समय"}},"Japan":{"long":{"generic":"जापान समय","standard":"जापान मानक समय","daylight":"जापान डेलाइट समय"}},"Kamchatka":{"long":{"generic":"पेट्रोपेवलास्क-कैमचात्सकी समय","standard":"पेट्रोपेवलास्क-कैमचात्सकी मानक समय","daylight":"पेट्रोपेवलास्क-कैमचात्सकी ग्रीष्मकालीन समय"}},"Kazakhstan_Eastern":{"long":{"standard":"पूर्व कज़ाखस्तान समय"}},"Kazakhstan_Western":{"long":{"standard":"पश्चिम कज़ाखस्तान समय"}},"Korea":{"long":{"generic":"कोरियाई समय","standard":"कोरियाई मानक समय","daylight":"कोरियाई डेलाइट समय"}},"Kosrae":{"long":{"standard":"कोसराए समय"}},"Krasnoyarsk":{"long":{"generic":"क्रास्नोयार्स्क समय","standard":"क्रास्नोयार्स्क मानक समय","daylight":"क्रास्नोयार्स्क ग्रीष्मकालीन समय"}},"Kyrgystan":{"long":{"standard":"किर्गिस्‍तान समय"}},"Line_Islands":{"long":{"standard":"लाइन द्वीपसमूह समय"}},"Lord_Howe":{"long":{"generic":"लॉर्ड होवे समय","standard":"लॉर्ड होवे मानक समय","daylight":"लॉर्ड होवे डेलाइट समय"}},"Macquarie":{"long":{"standard":"मक्वारी द्वीप समय"}},"Magadan":{"long":{"generic":"मागादान समय","standard":"मागादान मानक समय","daylight":"मागादान ग्रीष्मकालीन समय"}},"Malaysia":{"long":{"standard":"मलेशिया समय"}},"Maldives":{"long":{"standard":"मालदीव समय"}},"Marquesas":{"long":{"standard":"मार्केसस समय"}},"Marshall_Islands":{"long":{"standard":"मार्शल द्वीपसमूह समय"}},"Mauritius":{"long":{"generic":"मॉरीशस समय","standard":"मॉरीशस मानक समय","daylight":"मॉरीशस ग्रीष्मकालीन समय"}},"Mawson":{"long":{"standard":"माव्सन समय"}},"Mexico_Northwest":{"long":{"generic":"उत्तर पश्चिमी मेक्सिको समय","standard":"उत्तर पश्चिमी मेक्सिको मानक समय","daylight":"उत्तर पश्चिमी मेक्सिको डेलाइट समय"}},"Mexico_Pacific":{"long":{"generic":"मेक्सिकन प्रशांत समय","standard":"मेक्सिकन प्रशांत मानक समय","daylight":"मेक्सिकन प्रशांत डेलाइट समय"}},"Mongolia":{"long":{"generic":"उलान बटोर समय","standard":"उलान बटोर मानक समय","daylight":"उलान बटोर ग्रीष्मकालीन समय"}},"Moscow":{"long":{"generic":"मॉस्को समय","standard":"मॉस्को मानक समय","daylight":"मॉस्को ग्रीष्मकालीन समय"}},"Myanmar":{"long":{"standard":"म्यांमार समय"}},"Nauru":{"long":{"standard":"नौरू समय"}},"Nepal":{"long":{"standard":"नेपाल समय"}},"New_Caledonia":{"long":{"generic":"न्यू कैलेडोनिया समय","standard":"न्यू कैलेडोनिया मानक समय","daylight":"न्यू कैलेडोनिया ग्रीष्मकालीन समय"}},"New_Zealand":{"long":{"generic":"न्यूज़ीलैंड समय","standard":"न्यूज़ीलैंड मानक समय","daylight":"न्यूज़ीलैंड डेलाइट समय"}},"Newfoundland":{"long":{"generic":"न्यूफ़ाउंडलैंड समय","standard":"न्यूफ़ाउंडलैंड मानक समय","daylight":"न्यूफ़ाउंडलैंड डेलाइट समय"}},"Niue":{"long":{"standard":"नीयू समय"}},"Norfolk":{"long":{"standard":"नॉरफ़ॉक द्वीप समय"}},"Noronha":{"long":{"generic":"फ़र्नांर्डो डे नोरोन्हा समय","standard":"फ़र्नांर्डो डे नोरोन्हा मानक समय","daylight":"फ़र्नांर्डो डे नोरोन्हा ग्रीष्मकालीन समय"}},"Novosibirsk":{"long":{"generic":"नोवोसिबिर्स्क समय","standard":"नोवोसिबिर्स्क मानक समय","daylight":"नोवोसिबिर्स्क ग्रीष्मकालीन समय"}},"Omsk":{"long":{"generic":"ओम्स्क समय","standard":"ओम्स्क मानक समय","daylight":"ओम्स्क ग्रीष्मकालीन समय"}},"Pakistan":{"long":{"generic":"पाकिस्तान समय","standard":"पाकिस्तान मानक समय","daylight":"पाकिस्तान ग्रीष्मकालीन समय"}},"Palau":{"long":{"standard":"पलाउ समय"}},"Papua_New_Guinea":{"long":{"standard":"पापुआ न्यू गिनी समय"}},"Paraguay":{"long":{"generic":"पैराग्वे समय","standard":"पैराग्वे मानक समय","daylight":"पैराग्वे ग्रीष्मकालीन समय"}},"Peru":{"long":{"generic":"पेरू समय","standard":"पेरू मानक समय","daylight":"पेरू ग्रीष्मकालीन समय"}},"Philippines":{"long":{"generic":"फ़िलिपीन समय","standard":"फ़िलिपीन मानक समय","daylight":"फ़िलिपीन ग्रीष्मकालीन समय"}},"Phoenix_Islands":{"long":{"standard":"फ़ीनिक्स द्वीपसमूह समय"}},"Pierre_Miquelon":{"long":{"generic":"सेंट पिएरे और मिक्वेलान समय","standard":"सेंट पिएरे और मिक्वेलान मानक समय","daylight":"सेंट पिएरे और मिक्वेलान डेलाइट समय"}},"Pitcairn":{"long":{"standard":"पिटकैर्न समय"}},"Ponape":{"long":{"standard":"पोनापे समय"}},"Pyongyang":{"long":{"standard":"प्योंगयांग समय"}},"Reunion":{"long":{"standard":"रीयूनियन समय"}},"Rothera":{"long":{"standard":"रोथेरा समय"}},"Sakhalin":{"long":{"generic":"सखालिन समय","standard":"सखालिन मानक समय","daylight":"सखालिन ग्रीष्मकालीन समय"}},"Samara":{"long":{"generic":"समारा समय","standard":"समारा मानक समय","daylight":"समारा ग्रीष्मकालीन समय"}},"Samoa":{"long":{"generic":"समोआ समय","standard":"समोआ मानक समय","daylight":"समोआ डेलाइट समय"}},"Seychelles":{"long":{"standard":"सेशेल्स समय"}},"Singapore":{"long":{"standard":"सिंगापुर समय"}},"Solomon":{"long":{"standard":"सोलोमन द्वीपसमूह समय"}},"South_Georgia":{"long":{"standard":"दक्षिणी जॉर्जिया समय"}},"Suriname":{"long":{"standard":"सूरीनाम समय"}},"Syowa":{"long":{"standard":"स्योवा समय"}},"Tahiti":{"long":{"standard":"ताहिती समय"}},"Taipei":{"long":{"generic":"ताइपे समय","standard":"ताइपे मानक समय","daylight":"ताइपे डेलाइट समय"}},"Tajikistan":{"long":{"standard":"ताजिकिस्तान समय"}},"Tokelau":{"long":{"standard":"टोकेलाऊ समय"}},"Tonga":{"long":{"generic":"टोंगा समय","standard":"टोंगा मानक समय","daylight":"टोंगा ग्रीष्मकालीन समय"}},"Truk":{"long":{"standard":"चुक समय"}},"Turkmenistan":{"long":{"generic":"तुर्कमेनिस्तान समय","standard":"तुर्कमेनिस्तान मानक समय","daylight":"तुर्कमेनिस्तान ग्रीष्मकालीन समय"}},"Tuvalu":{"long":{"standard":"तुवालू समय"}},"Uruguay":{"long":{"generic":"उरुग्वे समय","standard":"उरुग्वे मानक समय","daylight":"उरुग्वे ग्रीष्मकालीन समय"}},"Uzbekistan":{"long":{"generic":"उज़्बेकिस्तान समय","standard":"उज़्बेकिस्तान मानक समय","daylight":"उज़्बेकिस्तान ग्रीष्मकालीन समय"}},"Vanuatu":{"long":{"generic":"वनुआतू समय","standard":"वनुआतू मानक समय","daylight":"वनुआतू ग्रीष्मकालीन समय"}},"Venezuela":{"long":{"standard":"वेनेज़ुएला समय"}},"Vladivostok":{"long":{"generic":"व्लादिवोस्तोक समय","standard":"व्लादिवोस्तोक मानक समय","daylight":"व्लादिवोस्तोक ग्रीष्मकालीन समय"}},"Volgograd":{"long":{"generic":"वोल्गोग्राड समय","standard":"वोल्गोग्राड मानक समय","daylight":"वोल्गोग्राड ग्रीष्मकालीन समय"}},"Vostok":{"long":{"standard":"वोस्तोक समय"}},"Wake":{"long":{"standard":"वेक द्वीप समय"}},"Wallis":{"long":{"standard":"वालिस और फ़्यूचूना समय"}},"Yakutsk":{"long":{"generic":"याकुत्स्क समय","standard":"याकुत्स्क मानक समय","daylight":"याकुत्स्क ग्रीष्मकालीन समय"}},"Yekaterinburg":{"long":{"generic":"येकातेरिनबर्ग समय","standard":"येकातेरिनबर्ग मानक समय","daylight":"येकातेरिनबर्ग ग्रीष्मकालीन समय"}}}}},"numbers":{"defaultNumberingSystem":"latn","otherNumberingSystems":{"native":"deva"},"minimumGroupingDigits":"1","symbols-numberSystem-deva":{"decimal":".","group":",","list":";","percentSign":"%","plusSign":"+","minusSign":"-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"NaN","timeSeparator":":"},"symbols-numberSystem-latn":{"decimal":".","group":",","list":";","percentSign":"%","plusSign":"+","minusSign":"-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"NaN","timeSeparator":":"},"decimalFormats-numberSystem-deva":{"standard":"#,##,##0.###","long":{"decimalFormat":{"1000-count-one":"0 हज़ार","1000-count-other":"0 हज़ार","10000-count-one":"00 हज़ार","10000-count-other":"00 हज़ार","100000-count-one":"0 लाख","100000-count-other":"0 लाख","1000000-count-one":"00 लाख","1000000-count-other":"00 लाख","10000000-count-one":"0 करोड़","10000000-count-other":"0 करोड़","100000000-count-one":"00 करोड़","100000000-count-other":"00 करोड़","1000000000-count-one":"0 अरब","1000000000-count-other":"0 अरब","10000000000-count-one":"00 अरब","10000000000-count-other":"00 अरब","100000000000-count-one":"0 खरब","100000000000-count-other":"0 खरब","1000000000000-count-one":"00 खरब","1000000000000-count-other":"00 खरब","10000000000000-count-one":"000 खरब","10000000000000-count-other":"000 खरब","100000000000000-count-one":"0000 खरब","100000000000000-count-other":"0000 खरब"}},"short":{"decimalFormat":{"1000-count-one":"0 हज़ार","1000-count-other":"0 हज़ार","10000-count-one":"00 हज़ार","10000-count-other":"00 हज़ार","100000-count-one":"0 लाख","100000-count-other":"0 लाख","1000000-count-one":"00 लाख","1000000-count-other":"00 लाख","10000000-count-one":"0 क॰","10000000-count-other":"0 क॰","100000000-count-one":"00 क॰","100000000-count-other":"00 क॰","1000000000-count-one":"0 अ॰","1000000000-count-other":"0 अ॰","10000000000-count-one":"00 अ॰","10000000000-count-other":"00 अ॰","100000000000-count-one":"0 ख॰","100000000000-count-other":"0 ख॰","1000000000000-count-one":"00 ख॰","1000000000000-count-other":"00 ख॰","10000000000000-count-one":"0 नील","10000000000000-count-other":"0 नील","100000000000000-count-one":"00 नील","100000000000000-count-other":"00 नील"}}},"decimalFormats-numberSystem-latn":{"standard":"#,##,##0.###","long":{"decimalFormat":{"1000-count-one":"0 हज़ार","1000-count-other":"0 हज़ार","10000-count-one":"00 हज़ार","10000-count-other":"00 हज़ार","100000-count-one":"0 लाख","100000-count-other":"0 लाख","1000000-count-one":"00 लाख","1000000-count-other":"00 लाख","10000000-count-one":"0 करोड़","10000000-count-other":"0 करोड़","100000000-count-one":"00 करोड़","100000000-count-other":"00 करोड़","1000000000-count-one":"0 अरब","1000000000-count-other":"0 अरब","10000000000-count-one":"00 अरब","10000000000-count-other":"00 अरब","100000000000-count-one":"0 खरब","100000000000-count-other":"0 खरब","1000000000000-count-one":"00 खरब","1000000000000-count-other":"00 खरब","10000000000000-count-one":"000 खरब","10000000000000-count-other":"000 खरब","100000000000000-count-one":"0000 खरब","100000000000000-count-other":"0000 खरब"}},"short":{"decimalFormat":{"1000-count-one":"0 हज़ार","1000-count-other":"0 हज़ार","10000-count-one":"00 हज़ार","10000-count-other":"00 हज़ार","100000-count-one":"0 लाख","100000-count-other":"0 लाख","1000000-count-one":"00 लाख","1000000-count-other":"00 लाख","10000000-count-one":"0 क॰","10000000-count-other":"0 क॰","100000000-count-one":"00 क॰","100000000-count-other":"00 क॰","1000000000-count-one":"0 अ॰","1000000000-count-other":"0 अ॰","10000000000-count-one":"00 अ॰","10000000000-count-other":"00 अ॰","100000000000-count-one":"0 ख॰","100000000000-count-other":"0 ख॰","1000000000000-count-one":"00 ख॰","1000000000000-count-other":"00 ख॰","10000000000000-count-one":"0 नील","10000000000000-count-other":"0 नील","100000000000000-count-one":"00 नील","100000000000000-count-other":"00 नील"}}},"scientificFormats-numberSystem-deva":{"standard":"[#E0]"},"scientificFormats-numberSystem-latn":{"standard":"[#E0]"},"percentFormats-numberSystem-deva":{"standard":"#,##,##0%"},"percentFormats-numberSystem-latn":{"standard":"#,##,##0%"},"currencyFormats-numberSystem-deva":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"¤#,##,##0.00","accounting":"¤#,##,##0.00","short":{"standard":{"1000-count-one":"¤0 हज़ार","1000-count-other":"¤0 हज़ार","10000-count-one":"¤00 हज़ार","10000-count-other":"¤00 हज़ार","100000-count-one":"¤0 लाख","100000-count-other":"¤0 लाख","1000000-count-one":"¤00 लाख","1000000-count-other":"¤00 लाख","10000000-count-one":"¤0 क॰","10000000-count-other":"¤0 क॰","100000000-count-one":"¤00 क॰","100000000-count-other":"¤00 क॰","1000000000-count-one":"¤0 अ॰","1000000000-count-other":"¤0 अ॰","10000000000-count-one":"¤00 अ॰","10000000000-count-other":"¤00 अ॰","100000000000-count-one":"¤0 ख॰","100000000000-count-other":"¤0 ख॰","1000000000000-count-one":"¤00 ख॰","1000000000000-count-other":"¤00 ख॰","10000000000000-count-one":"¤0 नील","10000000000000-count-other":"¤0 नील","100000000000000-count-one":"¤00 नील","100000000000000-count-other":"¤00 नील"}},"unitPattern-count-one":"{0} {1}","unitPattern-count-other":"{0} {1}"},"currencyFormats-numberSystem-latn":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"¤#,##,##0.00","accounting":"¤#,##,##0.00","short":{"standard":{"1000-count-one":"¤0 हज़ार","1000-count-other":"¤0 हज़ार","10000-count-one":"¤00 हज़ार","10000-count-other":"¤00 हज़ार","100000-count-one":"¤0 लाख","100000-count-other":"¤0 लाख","1000000-count-one":"¤00 लाख","1000000-count-other":"¤00 लाख","10000000-count-one":"¤0 क॰","10000000-count-other":"¤0 क॰","100000000-count-one":"¤00 क॰","100000000-count-other":"¤00 क॰","1000000000-count-one":"¤0 अ॰","1000000000-count-other":"¤0 अ॰","10000000000-count-one":"¤00 अ॰","10000000000-count-other":"¤00 अ॰","100000000000-count-one":"¤0 ख॰","100000000000-count-other":"¤0 ख॰","1000000000000-count-one":"¤00 ख॰","1000000000000-count-other":"¤00 ख॰","10000000000000-count-one":"¤0 नील","10000000000000-count-other":"¤0 नील","100000000000000-count-one":"¤00 नील","100000000000000-count-other":"¤00 नील"}},"unitPattern-count-one":"{0} {1}","unitPattern-count-other":"{0} {1}"},"miscPatterns-numberSystem-deva":{"atLeast":"{0}+","range":"{0}–{1}"},"miscPatterns-numberSystem-latn":{"atLeast":"{0}+","range":"{0}–{1}"},"minimalPairs":{"pluralMinimalPairs-count-one":"{0} घंटा","pluralMinimalPairs-count-other":"{0} घंटे","few":"{0}था दाहिना मोड़ लें॰","many":"{0}ठा दाहिना मोड़ लें॰","one":"{0}ला दाहिना मोड़ लें॰","other":"{0}वां दाहिना मोड़ लें॰","two":"{0}रा दाहिना मोड़ लें॰"}}},"ar":{"identity":{"version":{"_number":"$Revision: 13920 $","_cldrVersion":"33"},"language":"ar"},"dates":{"calendars":{"gregorian":{"months":{"format":{"abbreviated":{"1":"يناير","2":"فبراير","3":"مارس","4":"أبريل","5":"مايو","6":"يونيو","7":"يوليو","8":"أغسطس","9":"سبتمبر","10":"أكتوبر","11":"نوفمبر","12":"ديسمبر"},"narrow":{"1":"ي","2":"ف","3":"م","4":"أ","5":"و","6":"ن","7":"ل","8":"غ","9":"س","10":"ك","11":"ب","12":"د"},"wide":{"1":"يناير","2":"فبراير","3":"مارس","4":"أبريل","5":"مايو","6":"يونيو","7":"يوليو","8":"أغسطس","9":"سبتمبر","10":"أكتوبر","11":"نوفمبر","12":"ديسمبر"}},"stand-alone":{"abbreviated":{"1":"يناير","2":"فبراير","3":"مارس","4":"أبريل","5":"مايو","6":"يونيو","7":"يوليو","8":"أغسطس","9":"سبتمبر","10":"أكتوبر","11":"نوفمبر","12":"ديسمبر"},"narrow":{"1":"ي","2":"ف","3":"م","4":"أ","5":"و","6":"ن","7":"ل","8":"غ","9":"س","10":"ك","11":"ب","12":"د"},"wide":{"1":"يناير","2":"فبراير","3":"مارس","4":"أبريل","5":"مايو","6":"يونيو","7":"يوليو","8":"أغسطس","9":"سبتمبر","10":"أكتوبر","11":"نوفمبر","12":"ديسمبر"}}},"days":{"format":{"abbreviated":{"sun":"الأحد","mon":"الاثنين","tue":"الثلاثاء","wed":"الأربعاء","thu":"الخميس","fri":"الجمعة","sat":"السبت"},"narrow":{"sun":"ح","mon":"ن","tue":"ث","wed":"ر","thu":"خ","fri":"ج","sat":"س"},"short":{"sun":"أحد","mon":"إثنين","tue":"ثلاثاء","wed":"أربعاء","thu":"خميس","fri":"جمعة","sat":"سبت"},"wide":{"sun":"الأحد","mon":"الاثنين","tue":"الثلاثاء","wed":"الأربعاء","thu":"الخميس","fri":"الجمعة","sat":"السبت"}},"stand-alone":{"abbreviated":{"sun":"الأحد","mon":"الاثنين","tue":"الثلاثاء","wed":"الأربعاء","thu":"الخميس","fri":"الجمعة","sat":"السبت"},"narrow":{"sun":"ح","mon":"ن","tue":"ث","wed":"ر","thu":"خ","fri":"ج","sat":"س"},"short":{"sun":"أحد","mon":"إثنين","tue":"ثلاثاء","wed":"أربعاء","thu":"خميس","fri":"جمعة","sat":"سبت"},"wide":{"sun":"الأحد","mon":"الاثنين","tue":"الثلاثاء","wed":"الأربعاء","thu":"الخميس","fri":"الجمعة","sat":"السبت"}}},"quarters":{"format":{"abbreviated":{"1":"الربع الأول","2":"الربع الثاني","3":"الربع الثالث","4":"الربع الرابع"},"narrow":{"1":"١","2":"٢","3":"٣","4":"٤"},"wide":{"1":"الربع الأول","2":"الربع الثاني","3":"الربع الثالث","4":"الربع الرابع"}},"stand-alone":{"abbreviated":{"1":"الربع الأول","2":"الربع الثاني","3":"الربع الثالث","4":"الربع الرابع"},"narrow":{"1":"١","2":"٢","3":"٣","4":"٤"},"wide":{"1":"الربع الأول","2":"الربع الثاني","3":"الربع الثالث","4":"الربع الرابع"}}},"dayPeriods":{"format":{"abbreviated":{"am":"ص","pm":"م","morning1":"فجرًا","morning2":"ص","afternoon1":"ظهرًا","afternoon2":"بعد الظهر","evening1":"مساءً","night1":"منتصف الليل","night2":"ليلاً"},"narrow":{"am":"ص","pm":"م","morning1":"فجرًا","morning2":"صباحًا","afternoon1":"ظهرًا","afternoon2":"بعد الظهر","evening1":"مساءً","night1":"منتصف الليل","night2":"ليلاً"},"wide":{"am":"ص","pm":"م","morning1":"فجرًا","morning2":"صباحًا","afternoon1":"ظهرًا","afternoon2":"بعد الظهر","evening1":"مساءً","night1":"منتصف الليل","night2":"ليلاً"}},"stand-alone":{"abbreviated":{"am":"ص","pm":"م","morning1":"فجرًا","morning2":"ص","afternoon1":"ظهرًا","afternoon2":"بعد الظهر","evening1":"مساءً","night1":"منتصف الليل","night2":"ليلاً"},"narrow":{"am":"ص","pm":"م","morning1":"فجرًا","morning2":"صباحًا","afternoon1":"ظهرًا","afternoon2":"بعد الظهر","evening1":"مساءً","night1":"منتصف الليل","night2":"ليلاً"},"wide":{"am":"صباحًا","pm":"مساءً","morning1":"فجرًا","morning2":"صباحًا","afternoon1":"ظهرًا","afternoon2":"بعد الظهر","evening1":"مساءً","night1":"منتصف الليل","night2":"ليلاً"}}},"eras":{"eraNames":{"0":"قبل الميلاد","1":"ميلادي","0-alt-variant":"قبل الحقبة الحالية","1-alt-variant":"بعد الميلاد"},"eraAbbr":{"0":"ق.م","1":"م","0-alt-variant":"ق. م","1-alt-variant":"ب.م"},"eraNarrow":{"0":"ق.م","1":"م","0-alt-variant":"ق. م","1-alt-variant":"ب.م"}},"dateFormats":{"full":"EEEE، d MMMM y","long":"d MMMM y","medium":"dd‏/MM‏/y","short":"d‏/M‏/y"},"timeFormats":{"full":"h:mm:ss a zzzz","long":"h:mm:ss a z","medium":"h:mm:ss a","short":"h:mm a"},"dateTimeFormats":{"full":"{1} {0}","long":"{1} {0}","medium":"{1} {0}","short":"{1} {0}","availableFormats":{"Bh":"h B","Bhm":"h:mm B","Bhms":"h:mm:ss B","d":"d","E":"ccc","EBhm":"E h:mm B","EBhms":"E h:mm:ss B","Ed":"E، d","Ehm":"E h:mm a","EHm":"E HH:mm","Ehms":"E h:mm:ss a","EHms":"E HH:mm:ss","Gy":"y G","GyMMM":"MMM y G","GyMMMd":"d MMM y G","GyMMMEd":"E، d MMM y G","h":"h a","H":"HH","hm":"h:mm a","Hm":"HH:mm","hms":"h:mm:ss a","Hms":"HH:mm:ss","hmsv":"h:mm:ss a v","Hmsv":"HH:mm:ss v","hmv":"h:mm a v","Hmv":"HH:mm v","M":"L","Md":"d/‏M","MEd":"E، d/M","MMdd":"dd‏/MM","MMM":"LLL","MMMd":"d MMM","MMMEd":"E، d MMM","MMMMd":"d MMMM","MMMMEd":"E، d MMMM","MMMMW-count-zero":"الأسبوع W من MMM","MMMMW-count-one":"الأسبوع W من MMM","MMMMW-count-two":"الأسبوع W من MMM","MMMMW-count-few":"الأسبوع W من MMM","MMMMW-count-many":"الأسبوع W من MMM","MMMMW-count-other":"الأسبوع W من MMM","ms":"mm:ss","y":"y","yM":"M‏/y","yMd":"d‏/M‏/y","yMEd":"E، d/‏M/‏y","yMM":"MM‏/y","yMMM":"MMM y","yMMMd":"d MMM y","yMMMEd":"E، d MMM y","yMMMM":"MMMM y","yQQQ":"QQQ y","yQQQQ":"QQQQ y","yw-count-zero":"الأسبوع w من سنة Y","yw-count-one":"الأسبوع w من سنة Y","yw-count-two":"الأسبوع w من سنة Y","yw-count-few":"الأسبوع w من سنة Y","yw-count-many":"الأسبوع w من سنة Y","yw-count-other":"الأسبوع w من سنة Y"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{1} {0}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{1} {0}"},"intervalFormats":{"intervalFormatFallback":"{0} – {1}","d":{"d":"d–d"},"h":{"a":"h a – h a","h":"h–h a"},"H":{"H":"HH–HH"},"hm":{"a":"h:mm a – h:mm a","h":"h:mm–h:mm a","m":"h:mm–h:mm a"},"Hm":{"H":"HH:mm–HH:mm","m":"HH:mm–HH:mm"},"hmv":{"a":"h:mm a – h:mm a v","h":"h:mm–h:mm a v","m":"h:mm–h:mm a v"},"Hmv":{"H":"HH:mm–HH:mm v","m":"HH:mm–HH:mm v"},"hv":{"a":"h a – h a v","h":"h–h a v"},"Hv":{"H":"HH–HH v"},"M":{"M":"M–M"},"Md":{"d":"M/d – M/d","M":"M/d – M/d"},"MEd":{"d":"E، d/‏M –‏ E، d/‏M","M":"E، d/‏M – E، d/‏M"},"MMM":{"M":"MMM–MMM"},"MMMd":{"d":"d–d MMM","M":"d MMM – d MMM"},"MMMEd":{"d":"E، d – E، d MMM","M":"E، d MMM – E، d MMM"},"MMMM":{"M":"LLLL–LLLL"},"y":{"y":"y–y"},"yM":{"M":"M‏/y – M‏/y","y":"M‏/y – M‏/y"},"yMd":{"d":"d‏/M‏/y – d‏/M‏/y","M":"d‏/M‏/y – d‏/M‏/y","y":"d‏/M‏/y – d‏/M‏/y"},"yMEd":{"d":"E، dd‏/MM‏/y – E، dd‏/MM‏/y","M":"E، d‏/M‏/y – E، d‏/M‏/y","y":"E، d‏/M‏/y – E، d‏/M‏/y"},"yMMM":{"M":"MMM – MMM، y","y":"MMM، y – MMM، y"},"yMMMd":{"d":"d–d MMM، y","M":"d MMM – d MMM، y","y":"d MMM، y – d MMM، y"},"yMMMEd":{"d":"E، d – E، d MMM، y","M":"E، d MMM – E، d MMM، y","y":"E، d MMM، y – E، d MMM، y"},"yMMMM":{"M":"MMMM – MMMM، y","y":"MMMM، y – MMMM، y"}}}}},"fields":{"era":{"displayName":"العصر"},"era-short":{"displayName":"العصر"},"era-narrow":{"displayName":"العصر"},"year":{"displayName":"السنة","relative-type--1":"السنة الماضية","relative-type-0":"السنة الحالية","relative-type-1":"السنة القادمة","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} سنة","relativeTimePattern-count-one":"خلال سنة واحدة","relativeTimePattern-count-two":"خلال سنتين","relativeTimePattern-count-few":"خلال {0} سنوات","relativeTimePattern-count-many":"خلال {0} سنة","relativeTimePattern-count-other":"خلال {0} سنة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} سنة","relativeTimePattern-count-one":"قبل سنة واحدة","relativeTimePattern-count-two":"قبل سنتين","relativeTimePattern-count-few":"قبل {0} سنوات","relativeTimePattern-count-many":"قبل {0} سنة","relativeTimePattern-count-other":"قبل {0} سنة"}},"year-short":{"displayName":"السنة","relative-type--1":"السنة الماضية","relative-type-0":"السنة الحالية","relative-type-1":"السنة القادمة","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} سنة","relativeTimePattern-count-one":"خلال سنة واحدة","relativeTimePattern-count-two":"خلال سنتين","relativeTimePattern-count-few":"خلال {0} سنوات","relativeTimePattern-count-many":"خلال {0} سنة","relativeTimePattern-count-other":"خلال {0} سنة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} سنة","relativeTimePattern-count-one":"قبل سنة واحدة","relativeTimePattern-count-two":"قبل سنتين","relativeTimePattern-count-few":"قبل {0} سنوات","relativeTimePattern-count-many":"قبل {0} سنة","relativeTimePattern-count-other":"قبل {0} سنة"}},"year-narrow":{"displayName":"السنة","relative-type--1":"السنة الماضية","relative-type-0":"السنة الحالية","relative-type-1":"السنة القادمة","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} سنة","relativeTimePattern-count-one":"خلال سنة واحدة","relativeTimePattern-count-two":"خلال سنتين","relativeTimePattern-count-few":"خلال {0} سنوات","relativeTimePattern-count-many":"خلال {0} سنة","relativeTimePattern-count-other":"خلال {0} سنة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} سنة","relativeTimePattern-count-one":"قبل سنة واحدة","relativeTimePattern-count-two":"قبل سنتين","relativeTimePattern-count-few":"قبل {0} سنوات","relativeTimePattern-count-many":"قبل {0} سنة","relativeTimePattern-count-other":"قبل {0} سنة"}},"quarter":{"displayName":"ربع السنة","relative-type--1":"الربع الأخير","relative-type-0":"هذا الربع","relative-type-1":"الربع القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ربع سنة","relativeTimePattern-count-one":"خلال ربع سنة واحد","relativeTimePattern-count-two":"خلال ربعي سنة","relativeTimePattern-count-few":"خلال {0} أرباع سنة","relativeTimePattern-count-many":"خلال {0} ربع سنة","relativeTimePattern-count-other":"خلال {0} ربع سنة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ربع سنة","relativeTimePattern-count-one":"قبل ربع سنة واحد","relativeTimePattern-count-two":"قبل ربعي سنة","relativeTimePattern-count-few":"قبل {0} أرباع سنة","relativeTimePattern-count-many":"قبل {0} ربع سنة","relativeTimePattern-count-other":"قبل {0} ربع سنة"}},"quarter-short":{"displayName":"ربع السنة","relative-type--1":"الربع الأخير","relative-type-0":"هذا الربع","relative-type-1":"الربع القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ربع سنة","relativeTimePattern-count-one":"خلال ربع سنة واحد","relativeTimePattern-count-two":"خلال ربعي سنة","relativeTimePattern-count-few":"خلال {0} أرباع سنة","relativeTimePattern-count-many":"خلال {0} ربع سنة","relativeTimePattern-count-other":"خلال {0} ربع سنة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ربع سنة","relativeTimePattern-count-one":"قبل ربع سنة واحد","relativeTimePattern-count-two":"قبل ربعي سنة","relativeTimePattern-count-few":"قبل {0} أرباع سنة","relativeTimePattern-count-many":"قبل {0} ربع سنة","relativeTimePattern-count-other":"قبل {0} ربع سنة"}},"quarter-narrow":{"displayName":"ربع السنة","relative-type--1":"الربع الأخير","relative-type-0":"هذا الربع","relative-type-1":"الربع القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ربع سنة","relativeTimePattern-count-one":"خلال ربع سنة واحد","relativeTimePattern-count-two":"خلال ربعي سنة","relativeTimePattern-count-few":"خلال {0} أرباع سنة","relativeTimePattern-count-many":"خلال {0} ربع سنة","relativeTimePattern-count-other":"خلال {0} ربع سنة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ربع سنة","relativeTimePattern-count-one":"قبل ربع سنة واحد","relativeTimePattern-count-two":"قبل ربعي سنة","relativeTimePattern-count-few":"قبل {0} أرباع سنة","relativeTimePattern-count-many":"قبل {0} ربع سنة","relativeTimePattern-count-other":"قبل {0} ربع سنة"}},"month":{"displayName":"الشهر","relative-type--1":"الشهر الماضي","relative-type-0":"هذا الشهر","relative-type-1":"الشهر القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} شهر","relativeTimePattern-count-one":"خلال شهر واحد","relativeTimePattern-count-two":"خلال شهرين","relativeTimePattern-count-few":"خلال {0} أشهر","relativeTimePattern-count-many":"خلال {0} شهرًا","relativeTimePattern-count-other":"خلال {0} شهر"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} شهر","relativeTimePattern-count-one":"قبل شهر واحد","relativeTimePattern-count-two":"قبل شهرين","relativeTimePattern-count-few":"قبل {0} أشهر","relativeTimePattern-count-many":"قبل {0} شهرًا","relativeTimePattern-count-other":"قبل {0} شهر"}},"month-short":{"displayName":"الشهر","relative-type--1":"الشهر الماضي","relative-type-0":"هذا الشهر","relative-type-1":"الشهر القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} شهر","relativeTimePattern-count-one":"خلال شهر واحد","relativeTimePattern-count-two":"خلال شهرين","relativeTimePattern-count-few":"خلال {0} أشهر","relativeTimePattern-count-many":"خلال {0} شهرًا","relativeTimePattern-count-other":"خلال {0} شهر"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} شهر","relativeTimePattern-count-one":"قبل شهر واحد","relativeTimePattern-count-two":"قبل شهرين","relativeTimePattern-count-few":"خلال {0} أشهر","relativeTimePattern-count-many":"قبل {0} شهرًا","relativeTimePattern-count-other":"قبل {0} شهر"}},"month-narrow":{"displayName":"الشهر","relative-type--1":"الشهر الماضي","relative-type-0":"هذا الشهر","relative-type-1":"الشهر القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} شهر","relativeTimePattern-count-one":"خلال شهر واحد","relativeTimePattern-count-two":"خلال شهرين","relativeTimePattern-count-few":"خلال {0} أشهر","relativeTimePattern-count-many":"خلال {0} شهرًا","relativeTimePattern-count-other":"خلال {0} شهر"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} شهر","relativeTimePattern-count-one":"قبل شهر واحد","relativeTimePattern-count-two":"قبل شهرين","relativeTimePattern-count-few":"قبل {0} أشهر","relativeTimePattern-count-many":"قبل {0} شهرًا","relativeTimePattern-count-other":"قبل {0} شهر"}},"week":{"displayName":"الأسبوع","relative-type--1":"الأسبوع الماضي","relative-type-0":"هذا الأسبوع","relative-type-1":"الأسبوع القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أسبوع","relativeTimePattern-count-one":"خلال أسبوع واحد","relativeTimePattern-count-two":"خلال أسبوعين","relativeTimePattern-count-few":"خلال {0} أسابيع","relativeTimePattern-count-many":"خلال {0} أسبوعًا","relativeTimePattern-count-other":"خلال {0} أسبوع"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أسبوع","relativeTimePattern-count-one":"قبل أسبوع واحد","relativeTimePattern-count-two":"قبل أسبوعين","relativeTimePattern-count-few":"قبل {0} أسابيع","relativeTimePattern-count-many":"قبل {0} أسبوعًا","relativeTimePattern-count-other":"قبل {0} أسبوع"},"relativePeriod":"أسبوع {0}"},"week-short":{"displayName":"الأسبوع","relative-type--1":"الأسبوع الماضي","relative-type-0":"هذا الأسبوع","relative-type-1":"الأسبوع القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أسبوع","relativeTimePattern-count-one":"خلال أسبوع واحد","relativeTimePattern-count-two":"خلال {0} أسبوعين","relativeTimePattern-count-few":"خلال {0} أسابيع","relativeTimePattern-count-many":"خلال {0} أسبوعًا","relativeTimePattern-count-other":"خلال {0} أسبوع"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أسبوع","relativeTimePattern-count-one":"قبل أسبوع واحد","relativeTimePattern-count-two":"قبل أسبوعين","relativeTimePattern-count-few":"قبل {0} أسابيع","relativeTimePattern-count-many":"قبل {0} أسبوعًا","relativeTimePattern-count-other":"قبل {0} أسبوع"},"relativePeriod":"أسبوع {0}"},"week-narrow":{"displayName":"الأسبوع","relative-type--1":"الأسبوع الماضي","relative-type-0":"هذا الأسبوع","relative-type-1":"الأسبوع القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أسبوع","relativeTimePattern-count-one":"خلال أسبوع واحد","relativeTimePattern-count-two":"خلال أسبوعين","relativeTimePattern-count-few":"خلال {0} أسابيع","relativeTimePattern-count-many":"خلال {0} أسبوعًا","relativeTimePattern-count-other":"خلال {0} أسبوع"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أسبوع","relativeTimePattern-count-one":"قبل أسبوع واحد","relativeTimePattern-count-two":"قبل أسبوعين","relativeTimePattern-count-few":"قبل {0} أسابيع","relativeTimePattern-count-many":"قبل {0} أسبوعًا","relativeTimePattern-count-other":"قبل {0} أسبوع"},"relativePeriod":"أسبوع {0}"},"weekOfMonth":{"displayName":"الأسبوع من الشهر"},"weekOfMonth-short":{"displayName":"أسبوع من شهر"},"weekOfMonth-narrow":{"displayName":"أسبوع/شهر"},"day":{"displayName":"يوم","relative-type--2":"أول أمس","relative-type--1":"أمس","relative-type-0":"اليوم","relative-type-1":"غدًا","relative-type-2":"بعد الغد","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم","relativeTimePattern-count-one":"خلال يوم واحد","relativeTimePattern-count-two":"خلال يومين","relativeTimePattern-count-few":"خلال {0} أيام","relativeTimePattern-count-many":"خلال {0} يومًا","relativeTimePattern-count-other":"خلال {0} يوم"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم","relativeTimePattern-count-one":"قبل يوم واحد","relativeTimePattern-count-two":"قبل يومين","relativeTimePattern-count-few":"قبل {0} أيام","relativeTimePattern-count-many":"قبل {0} يومًا","relativeTimePattern-count-other":"قبل {0} يوم"}},"day-short":{"displayName":"يوم","relative-type--2":"أول أمس","relative-type--1":"أمس","relative-type-0":"اليوم","relative-type-1":"غدًا","relative-type-2":"بعد الغد","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم","relativeTimePattern-count-one":"خلال يوم واحد","relativeTimePattern-count-two":"خلال يومين","relativeTimePattern-count-few":"خلال {0} أيام","relativeTimePattern-count-many":"خلال {0} يومًا","relativeTimePattern-count-other":"خلال {0} يوم"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم","relativeTimePattern-count-one":"قبل يوم واحد","relativeTimePattern-count-two":"قبل يومين","relativeTimePattern-count-few":"قبل {0} أيام","relativeTimePattern-count-many":"قبل {0} يومًا","relativeTimePattern-count-other":"قبل {0} يوم"}},"day-narrow":{"displayName":"يوم","relative-type--2":"أول أمس","relative-type--1":"أمس","relative-type-0":"اليوم","relative-type-1":"غدًا","relative-type-2":"بعد الغد","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم","relativeTimePattern-count-one":"خلال يوم واحد","relativeTimePattern-count-two":"خلال يومين","relativeTimePattern-count-few":"خلال {0} أيام","relativeTimePattern-count-many":"خلال {0} يومًا","relativeTimePattern-count-other":"خلال {0} يوم"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم","relativeTimePattern-count-one":"قبل يوم واحد","relativeTimePattern-count-two":"قبل يومين","relativeTimePattern-count-few":"قبل {0} أيام","relativeTimePattern-count-many":"قبل {0} يومًا","relativeTimePattern-count-other":"قبل {0} يوم"}},"dayOfYear":{"displayName":"يوم من السنة"},"dayOfYear-short":{"displayName":"يوم من سنة"},"dayOfYear-narrow":{"displayName":"يوم/سنة"},"weekday":{"displayName":"اليوم"},"weekday-short":{"displayName":"اليوم"},"weekday-narrow":{"displayName":"اليوم"},"weekdayOfMonth":{"displayName":"يوم عمل من الشهر"},"weekdayOfMonth-short":{"displayName":"يوم عمل من شهر"},"weekdayOfMonth-narrow":{"displayName":"يوم عمل/شهر"},"sun":{"relative-type--1":"الأحد الماضي","relative-type-0":"الأحد الحالي","relative-type-1":"الأحد القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أحد","relativeTimePattern-count-one":"الأحد القادم","relativeTimePattern-count-two":"الأحد بعد القادم","relativeTimePattern-count-few":"خلال {0} أحد","relativeTimePattern-count-many":"خلال {0} أحد","relativeTimePattern-count-other":"خلال {0} أحد"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أحد","relativeTimePattern-count-one":"الأحد الماضي","relativeTimePattern-count-two":"الأحد قبل الماضي","relativeTimePattern-count-few":"قبل {0} أحد","relativeTimePattern-count-many":"قبل {0} أحد","relativeTimePattern-count-other":"قبل {0} أحد"}},"sun-short":{"relative-type--1":"الأحد الماضي","relative-type-0":"الأحد الحالي","relative-type-1":"الأحد القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أحد","relativeTimePattern-count-one":"أحد قادم","relativeTimePattern-count-two":"أحد بعد القادم","relativeTimePattern-count-few":"خلال {0} أحد","relativeTimePattern-count-many":"خلال {0} أحد","relativeTimePattern-count-other":"خلال {0} أحد"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أحد","relativeTimePattern-count-one":"أحد ماضي","relativeTimePattern-count-two":"أحد قبل الماضي","relativeTimePattern-count-few":"قبل {0} أحد","relativeTimePattern-count-many":"قبل {0} أحد","relativeTimePattern-count-other":"قبل {0} أحد"}},"sun-narrow":{"relative-type--1":"الأحد الماضي","relative-type-0":"الأحد الحالي","relative-type-1":"الأحد القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أحد","relativeTimePattern-count-one":"أحد قادم","relativeTimePattern-count-two":"أحد بعد القادم","relativeTimePattern-count-few":"خلال {0} أحد","relativeTimePattern-count-many":"خلال {0} أحد","relativeTimePattern-count-other":"خلال {0} أحد"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أحد","relativeTimePattern-count-one":"أحد ماضي","relativeTimePattern-count-two":"أحد قبل الماضي","relativeTimePattern-count-few":"قبل {0} أحد","relativeTimePattern-count-many":"قبل {0} أحد","relativeTimePattern-count-other":"قبل {0} أحد"}},"mon":{"relative-type--1":"الإثنين الماضي","relative-type-0":"الإثنين الحالي","relative-type-1":"الإثنين القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} إثنين","relativeTimePattern-count-one":"الإثنين القادم","relativeTimePattern-count-two":"الإثنين بعد القادم","relativeTimePattern-count-few":"خلال {0} أيام إثنين","relativeTimePattern-count-many":"خلال {0} يوم إثنين","relativeTimePattern-count-other":"خلال {0} يوم إثنين"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} إثنين","relativeTimePattern-count-one":"الإثنين الماضي","relativeTimePattern-count-two":"الإثنين قبل الماضي","relativeTimePattern-count-few":"قبل {0} أيام إثنين","relativeTimePattern-count-many":"قبل {0} يوم إثنين","relativeTimePattern-count-other":"قبل {0} يوم إثنين"}},"mon-short":{"relative-type--1":"الإثنين الماضي","relative-type-0":"الإثنين الحالي","relative-type-1":"الإثنين القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} إثنين","relativeTimePattern-count-one":"الإثنين القادم","relativeTimePattern-count-two":"الإثنين بعد القادم","relativeTimePattern-count-few":"خلال {0} إثنين","relativeTimePattern-count-many":"خلال {0} إثنين","relativeTimePattern-count-other":"خلال {0} إثنين"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} إثنين","relativeTimePattern-count-one":"الإثنين الماضي","relativeTimePattern-count-two":"الإثنين قبل الماضي","relativeTimePattern-count-few":"قبل {0} إثنين","relativeTimePattern-count-many":"قبل {0} إثنين","relativeTimePattern-count-other":"قبل {0} إثنين"}},"mon-narrow":{"relative-type--1":"الإثنين الماضي","relative-type-0":"الإثنين الحالي","relative-type-1":"الإثنين القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} إثنين","relativeTimePattern-count-one":"إثنين قادم","relativeTimePattern-count-two":"الإثنين بعد القادم","relativeTimePattern-count-few":"خلال {0} إثنين","relativeTimePattern-count-many":"خلال {0} إثنين","relativeTimePattern-count-other":"خلال {0} إثنين"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} إثنين","relativeTimePattern-count-one":"إثنين ماضي","relativeTimePattern-count-two":"إثنين قبل الماضي","relativeTimePattern-count-few":"قبل {0} إثنين","relativeTimePattern-count-many":"قبل {0} إثنين","relativeTimePattern-count-other":"قبل {0} إثنين"}},"tue":{"relative-type--1":"الثلاثاء الماضي","relative-type-0":"الثلاثاء الحالي","relative-type-1":"الثلاثاء القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم ثلاثاء","relativeTimePattern-count-one":"الثلاثاء القادم","relativeTimePattern-count-two":"الثلاثاء بعد القادم","relativeTimePattern-count-few":"خلال {0} أيام ثلاثاء","relativeTimePattern-count-many":"خلال {0} يوم ثلاثاء","relativeTimePattern-count-other":"خلال {0} يوم ثلاثاء"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم ثلاثاء","relativeTimePattern-count-one":"الثلاثاء الماضي","relativeTimePattern-count-two":"الثلاثاء قبل الماضي","relativeTimePattern-count-few":"قبل {0} أيام ثلاثاء","relativeTimePattern-count-many":"قبل {0} يوم ثلاثاء","relativeTimePattern-count-other":"قبل {0} يوم ثلاثاء"}},"tue-short":{"relative-type--1":"الثلاثاء الماضي","relative-type-0":"الثلاثاء الحالي","relative-type-1":"الثلاثاء القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ثلاثاء","relativeTimePattern-count-one":"ثلاثاء قادم","relativeTimePattern-count-two":"ثلاثاء بعد القادم","relativeTimePattern-count-few":"خلال {0} ثلاثاء","relativeTimePattern-count-many":"خلال {0} ثلاثاء","relativeTimePattern-count-other":"خلال {0} ثلاثاء"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ثلاثاء","relativeTimePattern-count-one":"ثلاثاء ماضي","relativeTimePattern-count-two":"ثلاثاء قبل الماضي","relativeTimePattern-count-few":"قبل {0} ثلاثاء","relativeTimePattern-count-many":"قبل {0} ثلاثاء","relativeTimePattern-count-other":"قبل {0} ثلاثاء"}},"tue-narrow":{"relative-type--1":"الثلاثاء الماضي","relative-type-0":"الثلاثاء الحالي","relative-type-1":"الثلاثاء القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ثلاثاء","relativeTimePattern-count-one":"ثلاثاء قادم","relativeTimePattern-count-two":"ثلاثاء بعد القادم","relativeTimePattern-count-few":"خلال {0} ثلاثاء","relativeTimePattern-count-many":"خلال {0} ثلاثاء","relativeTimePattern-count-other":"خلال {0} ثلاثاء"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ثلاثاء","relativeTimePattern-count-one":"ثلاثاء ماضي","relativeTimePattern-count-two":"ثلاثاء قبل الماضي","relativeTimePattern-count-few":"قبل {0} ثلاثاء","relativeTimePattern-count-many":"قبل {0} ثلاثاء","relativeTimePattern-count-other":"قبل {0} ثلاثاء"}},"wed":{"relative-type--1":"الأربعاء الماضي","relative-type-0":"الأربعاء الحالي","relative-type-1":"الأربعاء القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم أربعاء","relativeTimePattern-count-one":"الأربعاء القادم","relativeTimePattern-count-two":"الأربعاء بعد القادم","relativeTimePattern-count-few":"خلال {0} أيام أربعاء","relativeTimePattern-count-many":"خلال {0} يوم أربعاء","relativeTimePattern-count-other":"خلال {0} يوم أربعاء"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم أربعاء","relativeTimePattern-count-one":"الأربعاء الماضي","relativeTimePattern-count-two":"الأربعاء قبل الماضي","relativeTimePattern-count-few":"قبل {0} أيام أربعاء","relativeTimePattern-count-many":"قبل {0} يوم أربعاء","relativeTimePattern-count-other":"قبل {0} يوم أربعاء"}},"wed-short":{"relative-type--1":"الأربعاء الماضي","relative-type-0":"الأربعاء الحالي","relative-type-1":"الأربعاء القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أربعاء","relativeTimePattern-count-one":"خلال {0} أربعاء","relativeTimePattern-count-two":"خلال {0} أربعاء","relativeTimePattern-count-few":"خلال {0} أربعاء","relativeTimePattern-count-many":"خلال {0} أربعاء","relativeTimePattern-count-other":"خلال {0} أربعاء"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أربعاء","relativeTimePattern-count-one":"أربعاء ماضي","relativeTimePattern-count-two":"أربعاء قبل الماضي","relativeTimePattern-count-few":"قبل {0} أربعاء","relativeTimePattern-count-many":"قبل {0} أربعاء","relativeTimePattern-count-other":"قبل {0} أربعاء"}},"wed-narrow":{"relative-type--1":"الأربعاء الماضي","relative-type-0":"الأربعاء الحالي","relative-type-1":"الأربعاء القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} أربعاء","relativeTimePattern-count-one":"أربعاء قادم","relativeTimePattern-count-two":"أربعاء بعد القادم","relativeTimePattern-count-few":"خلال {0} أربعاء","relativeTimePattern-count-many":"خلال {0} أربعاء","relativeTimePattern-count-other":"خلال {0} أربعاء"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} أربعاء","relativeTimePattern-count-one":"أربعاء ماضي","relativeTimePattern-count-two":"أربعاء قبل الماضي","relativeTimePattern-count-few":"قبل {0} أربعاء","relativeTimePattern-count-many":"قبل {0} أربعاء","relativeTimePattern-count-other":"قبل {0} أربعاء"}},"thu":{"relative-type--1":"الخميس الماضي","relative-type-0":"الخميس الحالي","relative-type-1":"الخميس القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم خميس","relativeTimePattern-count-one":"الخميس القادم","relativeTimePattern-count-two":"الخميس بعد القادم","relativeTimePattern-count-few":"خلال {0} أيام خميس","relativeTimePattern-count-many":"خلال {0} يوم خميس","relativeTimePattern-count-other":"خلال {0} يوم خميس"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم خميس","relativeTimePattern-count-one":"الخميس الماضي","relativeTimePattern-count-two":"الخميس قبل الماضي","relativeTimePattern-count-few":"قبل {0} أيام خميس","relativeTimePattern-count-many":"قبل {0} يوم خميس","relativeTimePattern-count-other":"قبل {0} يوم خميس"}},"thu-short":{"relative-type--1":"الخميس الماضي","relative-type-0":"الخميس الحالي","relative-type-1":"الخميس القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} خميس","relativeTimePattern-count-one":"الخميس القادم","relativeTimePattern-count-two":"الخميس بعد القادم","relativeTimePattern-count-few":"خلال {0} خميس","relativeTimePattern-count-many":"خلال {0} خميس","relativeTimePattern-count-other":"خلال {0} خميس"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} خميس","relativeTimePattern-count-one":"خميس ماضي","relativeTimePattern-count-two":"خميس قبل الماضي","relativeTimePattern-count-few":"قبل {0} خميس","relativeTimePattern-count-many":"قبل {0} خميس","relativeTimePattern-count-other":"قبل {0} خميس"}},"thu-narrow":{"relative-type--1":"الخميس الماضي","relative-type-0":"الخميس الحالي","relative-type-1":"الخميس القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} خميس","relativeTimePattern-count-one":"خلال {0} يوم خميس","relativeTimePattern-count-two":"الخميس بعد القادم","relativeTimePattern-count-few":"خلال {0} خميس","relativeTimePattern-count-many":"خلال {0} خميس","relativeTimePattern-count-other":"خلال {0} خميس"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} خميس","relativeTimePattern-count-one":"خميس ماضي","relativeTimePattern-count-two":"خميس قبل الماضي","relativeTimePattern-count-few":"قبل {0} خميس","relativeTimePattern-count-many":"قبل {0} خميس","relativeTimePattern-count-other":"قبل {0} خميس"}},"fri":{"relative-type--1":"الجمعة الماضي","relative-type-0":"الجمعة الحالي","relative-type-1":"الجمعة القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} يوم جمعة","relativeTimePattern-count-one":"الجمعة القادم","relativeTimePattern-count-two":"الجمعة بعد القادم","relativeTimePattern-count-few":"خلال {0} أيام جمعة","relativeTimePattern-count-many":"خلال {0} يوم جمعة","relativeTimePattern-count-other":"خلال {0} يوم جمعة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم جمعة","relativeTimePattern-count-one":"الجمعة الماضي","relativeTimePattern-count-two":"الجمعة قبل الماضي","relativeTimePattern-count-few":"قبل {0} أيام جمعة","relativeTimePattern-count-many":"قبل {0} يوم جمعة","relativeTimePattern-count-other":"قبل {0} يوم جمعة"}},"fri-short":{"relative-type--1":"الجمعة الماضي","relative-type-0":"الجمعة الحالي","relative-type-1":"الجمعة القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} جمعة","relativeTimePattern-count-one":"جمعة قادم","relativeTimePattern-count-two":"جمعة بعد القادم","relativeTimePattern-count-few":"خلال {0} جمعة","relativeTimePattern-count-many":"خلال {0} جمعة","relativeTimePattern-count-other":"خلال {0} جمعة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} جمعة","relativeTimePattern-count-one":"جمعة ماضي","relativeTimePattern-count-two":"جمعة قبل الماضي","relativeTimePattern-count-few":"قبل {0} جمعة","relativeTimePattern-count-many":"قبل {0} جمعة","relativeTimePattern-count-other":"قبل {0} جمعة"}},"fri-narrow":{"relative-type--1":"الجمعة الماضي","relative-type-0":"الجمعة الحالي","relative-type-1":"الجمعة القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} جمعة","relativeTimePattern-count-one":"جمعة قادم","relativeTimePattern-count-two":"جمعة بعد القادم","relativeTimePattern-count-few":"خلال {0} جمعة","relativeTimePattern-count-many":"خلال {0} جمعة","relativeTimePattern-count-other":"خلال {0} جمعة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} جمعة","relativeTimePattern-count-one":"جمعة ماضي","relativeTimePattern-count-two":"جمعة قبل الماضي","relativeTimePattern-count-few":"قبل {0} جمعة","relativeTimePattern-count-many":"قبل {0} جمعة","relativeTimePattern-count-other":"قبل {0} جمعة"}},"sat":{"relative-type--1":"السبت الماضي","relative-type-0":"السبت الحالي","relative-type-1":"السبت القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"السبت القادم","relativeTimePattern-count-one":"السبت القادم","relativeTimePattern-count-two":"السبت بعد القادم","relativeTimePattern-count-few":"السبت بعد {0} أسابيع","relativeTimePattern-count-many":"خلال {0} يوم سبت","relativeTimePattern-count-other":"بعد {0} يوم سبت"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} يوم سبت","relativeTimePattern-count-one":"السبت الماضي","relativeTimePattern-count-two":"السبت قبل الماضي","relativeTimePattern-count-few":"قبل {0} يوم سبت","relativeTimePattern-count-many":"قبل {0} يوم سبت","relativeTimePattern-count-other":"قبل {0} يوم سبت"}},"sat-short":{"relative-type--1":"السبت الماضي","relative-type-0":"السبت الحالي","relative-type-1":"السبت القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} سبت","relativeTimePattern-count-one":"سبت قادم","relativeTimePattern-count-two":"سبت بعد القادم","relativeTimePattern-count-few":"خلال {0} سبت","relativeTimePattern-count-many":"خلال {0} سبت","relativeTimePattern-count-other":"خلال {0} سبت"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} سبت","relativeTimePattern-count-one":"سبت ماضي","relativeTimePattern-count-two":"سبت قبل الماضي","relativeTimePattern-count-few":"قبل {0} سبت","relativeTimePattern-count-many":"قبل {0} سبت","relativeTimePattern-count-other":"قبل {0} سبت"}},"sat-narrow":{"relative-type--1":"السبت الماضي","relative-type-0":"السبت الحالي","relative-type-1":"السبت القادم","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} سبت","relativeTimePattern-count-one":"سبت قادم","relativeTimePattern-count-two":"سبت بعد القادم","relativeTimePattern-count-few":"خلال {0} سبت","relativeTimePattern-count-many":"خلال {0} سبت","relativeTimePattern-count-other":"خلال {0} سبت"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} سبت","relativeTimePattern-count-one":"سبت ماضي","relativeTimePattern-count-two":"سبت قبل الماضي","relativeTimePattern-count-few":"قبل {0} سبت","relativeTimePattern-count-many":"قبل {0} سبت","relativeTimePattern-count-other":"قبل {0} سبت"}},"dayperiod-short":{"displayName":"ص/م"},"dayperiod":{"displayName":"ص/م"},"dayperiod-narrow":{"displayName":"ص/م"},"hour":{"displayName":"الساعات","relative-type-0":"الساعة الحالية","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ساعة","relativeTimePattern-count-one":"خلال ساعة واحدة","relativeTimePattern-count-two":"خلال ساعتين","relativeTimePattern-count-few":"خلال {0} ساعات","relativeTimePattern-count-many":"خلال {0} ساعة","relativeTimePattern-count-other":"خلال {0} ساعة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ساعة","relativeTimePattern-count-one":"قبل ساعة واحدة","relativeTimePattern-count-two":"قبل ساعتين","relativeTimePattern-count-few":"قبل {0} ساعات","relativeTimePattern-count-many":"قبل {0} ساعة","relativeTimePattern-count-other":"قبل {0} ساعة"}},"hour-short":{"displayName":"الساعات","relative-type-0":"الساعة الحالية","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ساعة","relativeTimePattern-count-one":"خلال ساعة واحدة","relativeTimePattern-count-two":"خلال ساعتين","relativeTimePattern-count-few":"خلال {0} ساعات","relativeTimePattern-count-many":"خلال {0} ساعة","relativeTimePattern-count-other":"خلال {0} ساعة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ساعة","relativeTimePattern-count-one":"قبل ساعة واحدة","relativeTimePattern-count-two":"قبل ساعتين","relativeTimePattern-count-few":"قبل {0} ساعات","relativeTimePattern-count-many":"قبل {0} ساعة","relativeTimePattern-count-other":"قبل {0} ساعة"}},"hour-narrow":{"displayName":"الساعات","relative-type-0":"الساعة الحالية","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ساعة","relativeTimePattern-count-one":"خلال ساعة واحدة","relativeTimePattern-count-two":"خلال ساعتين","relativeTimePattern-count-few":"خلال {0} ساعات","relativeTimePattern-count-many":"خلال {0} ساعة","relativeTimePattern-count-other":"خلال {0} ساعة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ساعة","relativeTimePattern-count-one":"قبل ساعة واحدة","relativeTimePattern-count-two":"قبل ساعتين","relativeTimePattern-count-few":"قبل {0} ساعات","relativeTimePattern-count-many":"قبل {0} ساعة","relativeTimePattern-count-other":"قبل {0} ساعة"}},"minute":{"displayName":"الدقائق","relative-type-0":"هذه الدقيقة","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} دقيقة","relativeTimePattern-count-one":"خلال دقيقة واحدة","relativeTimePattern-count-two":"خلال دقيقتين","relativeTimePattern-count-few":"خلال {0} دقائق","relativeTimePattern-count-many":"خلال {0} دقيقة","relativeTimePattern-count-other":"خلال {0} دقيقة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} دقيقة","relativeTimePattern-count-one":"قبل دقيقة واحدة","relativeTimePattern-count-two":"قبل دقيقتين","relativeTimePattern-count-few":"قبل {0} دقائق","relativeTimePattern-count-many":"قبل {0} دقيقة","relativeTimePattern-count-other":"قبل {0} دقيقة"}},"minute-short":{"displayName":"الدقائق","relative-type-0":"هذه الدقيقة","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} دقيقة","relativeTimePattern-count-one":"خلال دقيقة واحدة","relativeTimePattern-count-two":"خلال دقيقتين","relativeTimePattern-count-few":"خلال {0} دقائق","relativeTimePattern-count-many":"خلال {0} دقيقة","relativeTimePattern-count-other":"خلال {0} دقيقة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} دقيقة","relativeTimePattern-count-one":"قبل دقيقة واحدة","relativeTimePattern-count-two":"قبل دقيقتين","relativeTimePattern-count-few":"قبل {0} دقائق","relativeTimePattern-count-many":"قبل {0} دقيقة","relativeTimePattern-count-other":"قبل {0} دقيقة"}},"minute-narrow":{"displayName":"الدقائق","relative-type-0":"هذه الدقيقة","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} دقيقة","relativeTimePattern-count-one":"خلال دقيقة واحدة","relativeTimePattern-count-two":"خلال دقيقتين","relativeTimePattern-count-few":"خلال {0} دقائق","relativeTimePattern-count-many":"خلال {0} دقيقة","relativeTimePattern-count-other":"خلال {0} دقيقة"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} دقيقة","relativeTimePattern-count-one":"قبل دقيقة واحدة","relativeTimePattern-count-two":"قبل دقيقتين","relativeTimePattern-count-few":"قبل {0} دقائق","relativeTimePattern-count-many":"قبل {0} دقيقة","relativeTimePattern-count-other":"قبل {0} دقيقة"}},"second":{"displayName":"الثواني","relative-type-0":"الآن","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ثانية","relativeTimePattern-count-one":"خلال ثانية واحدة","relativeTimePattern-count-two":"خلال ثانيتين","relativeTimePattern-count-few":"خلال {0} ثوانٍ","relativeTimePattern-count-many":"خلال {0} ثانية","relativeTimePattern-count-other":"خلال {0} ثانية"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ثانية","relativeTimePattern-count-one":"قبل ثانية واحدة","relativeTimePattern-count-two":"قبل ثانيتين","relativeTimePattern-count-few":"قبل {0} ثوانِ","relativeTimePattern-count-many":"قبل {0} ثانية","relativeTimePattern-count-other":"قبل {0} ثانية"}},"second-short":{"displayName":"الثواني","relative-type-0":"الآن","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ثانية","relativeTimePattern-count-one":"خلال ثانية واحدة","relativeTimePattern-count-two":"خلال ثانيتين","relativeTimePattern-count-few":"خلال {0} ثوانٍ","relativeTimePattern-count-many":"خلال {0} ثانية","relativeTimePattern-count-other":"خلال {0} ثانية"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ثانية","relativeTimePattern-count-one":"قبل ثانية واحدة","relativeTimePattern-count-two":"قبل ثانيتين","relativeTimePattern-count-few":"قبل {0} ثوانٍ","relativeTimePattern-count-many":"قبل {0} ثانية","relativeTimePattern-count-other":"قبل {0} ثانية"}},"second-narrow":{"displayName":"الثواني","relative-type-0":"الآن","relativeTime-type-future":{"relativeTimePattern-count-zero":"خلال {0} ثانية","relativeTimePattern-count-one":"خلال ثانية واحدة","relativeTimePattern-count-two":"خلال ثانيتين","relativeTimePattern-count-few":"خلال {0} ثوانٍ","relativeTimePattern-count-many":"خلال {0} ثانية","relativeTimePattern-count-other":"خلال {0} ثانية"},"relativeTime-type-past":{"relativeTimePattern-count-zero":"قبل {0} ثانية","relativeTimePattern-count-one":"قبل ثانية واحدة","relativeTimePattern-count-two":"قبل ثانيتين","relativeTimePattern-count-few":"قبل {0} ثوانٍ","relativeTimePattern-count-many":"قبل {0} ثانية","relativeTimePattern-count-other":"قبل {0} ثانية"}},"zone":{"displayName":"التوقيت"},"zone-short":{"displayName":"توقيت"},"zone-narrow":{"displayName":"توقيت"}},"timeZoneNames":{"hourFormat":"+HH:mm;-HH:mm","gmtFormat":"غرينتش{0}","gmtZeroFormat":"غرينتش","regionFormat":"توقيت {0}","regionFormat-type-daylight":"توقيت {0} الصيفي","regionFormat-type-standard":"توقيت {0} الرسمي","fallbackFormat":"{1} ({0})","zone":{"America":{"Adak":{"exemplarCity":"أداك"},"Anchorage":{"exemplarCity":"أنشوراج"},"Anguilla":{"exemplarCity":"أنغويلا"},"Antigua":{"exemplarCity":"أنتيغوا"},"Araguaina":{"exemplarCity":"أروجوانيا"},"Argentina":{"Rio_Gallegos":{"exemplarCity":"ريو جالييوس"},"San_Juan":{"exemplarCity":"سان خوان"},"Ushuaia":{"exemplarCity":"أشوا"},"La_Rioja":{"exemplarCity":"لا ريوجا"},"San_Luis":{"exemplarCity":"سان لويس"},"Salta":{"exemplarCity":"سالطا"},"Tucuman":{"exemplarCity":"تاكمان"}},"Aruba":{"exemplarCity":"أروبا"},"Asuncion":{"exemplarCity":"أسونسيون"},"Bahia":{"exemplarCity":"باهيا"},"Bahia_Banderas":{"exemplarCity":"باهيا بانديراس"},"Barbados":{"exemplarCity":"بربادوس"},"Belem":{"exemplarCity":"بلم"},"Belize":{"exemplarCity":"بليز"},"Blanc-Sablon":{"exemplarCity":"بلانك-سابلون"},"Boa_Vista":{"exemplarCity":"باو فيستا"},"Bogota":{"exemplarCity":"بوغوتا"},"Boise":{"exemplarCity":"بويس"},"Buenos_Aires":{"exemplarCity":"بوينوس أيرس"},"Cambridge_Bay":{"exemplarCity":"كامبرديج باي"},"Campo_Grande":{"exemplarCity":"كومبو جراند"},"Cancun":{"exemplarCity":"كانكون"},"Caracas":{"exemplarCity":"كاراكاس"},"Catamarca":{"exemplarCity":"كاتاماركا"},"Cayenne":{"exemplarCity":"كايين"},"Cayman":{"exemplarCity":"كايمان"},"Chicago":{"exemplarCity":"شيكاغو"},"Chihuahua":{"exemplarCity":"تشيواوا"},"Coral_Harbour":{"exemplarCity":"كورال هاربر"},"Cordoba":{"exemplarCity":"كوردوبا"},"Costa_Rica":{"exemplarCity":"كوستاريكا"},"Creston":{"exemplarCity":"كريستون"},"Cuiaba":{"exemplarCity":"كيابا"},"Curacao":{"exemplarCity":"كوراساو"},"Danmarkshavn":{"exemplarCity":"دانمرك شافن"},"Dawson":{"exemplarCity":"داوسان"},"Dawson_Creek":{"exemplarCity":"داوسن كريك"},"Denver":{"exemplarCity":"دنفر"},"Detroit":{"exemplarCity":"ديترويت"},"Dominica":{"exemplarCity":"دومينيكا"},"Edmonton":{"exemplarCity":"ايدمونتون"},"Eirunepe":{"exemplarCity":"ايرونبي"},"El_Salvador":{"exemplarCity":"السلفادور"},"Fort_Nelson":{"exemplarCity":"فورت نيلسون"},"Fortaleza":{"exemplarCity":"فورتاليزا"},"Glace_Bay":{"exemplarCity":"جلاس باي"},"Godthab":{"exemplarCity":"غودثاب"},"Goose_Bay":{"exemplarCity":"جوس باي"},"Grand_Turk":{"exemplarCity":"غراند ترك"},"Grenada":{"exemplarCity":"غرينادا"},"Guadeloupe":{"exemplarCity":"غوادلوب"},"Guatemala":{"exemplarCity":"غواتيمالا"},"Guayaquil":{"exemplarCity":"غواياكويل"},"Guyana":{"exemplarCity":"غيانا"},"Halifax":{"exemplarCity":"هاليفاكس"},"Havana":{"exemplarCity":"هافانا"},"Hermosillo":{"exemplarCity":"هيرموسيلو"},"Indiana":{"Vincennes":{"exemplarCity":"فينسينس"},"Petersburg":{"exemplarCity":"بيترسبرغ"},"Tell_City":{"exemplarCity":"مدينة تل، إنديانا"},"Knox":{"exemplarCity":"كونكس"},"Winamac":{"exemplarCity":"ويناماك"},"Marengo":{"exemplarCity":"مارنجو"},"Vevay":{"exemplarCity":"فيفاي"}},"Indianapolis":{"exemplarCity":"إنديانابوليس"},"Inuvik":{"exemplarCity":"اينوفيك"},"Iqaluit":{"exemplarCity":"اكويلت"},"Jamaica":{"exemplarCity":"جامايكا"},"Jujuy":{"exemplarCity":"جوجو"},"Juneau":{"exemplarCity":"جوني"},"Kentucky":{"Monticello":{"exemplarCity":"مونتيسيلو"}},"Kralendijk":{"exemplarCity":"كرالنديك"},"La_Paz":{"exemplarCity":"لا باز"},"Lima":{"exemplarCity":"ليما"},"Los_Angeles":{"exemplarCity":"لوس انجلوس"},"Louisville":{"exemplarCity":"لويس فيل"},"Lower_Princes":{"exemplarCity":"حي الأمير السفلي"},"Maceio":{"exemplarCity":"ماشيو"},"Managua":{"exemplarCity":"ماناغوا"},"Manaus":{"exemplarCity":"ماناوس"},"Marigot":{"exemplarCity":"ماريغوت"},"Martinique":{"exemplarCity":"المارتينيك"},"Matamoros":{"exemplarCity":"ماتاموروس"},"Mazatlan":{"exemplarCity":"مازاتلان"},"Mendoza":{"exemplarCity":"ميندوزا"},"Menominee":{"exemplarCity":"مينوميني"},"Merida":{"exemplarCity":"ميريدا"},"Metlakatla":{"exemplarCity":"ميتلاكاتلا"},"Mexico_City":{"exemplarCity":"مدينة المكسيك"},"Miquelon":{"exemplarCity":"مكويلون"},"Moncton":{"exemplarCity":"وينكتون"},"Monterrey":{"exemplarCity":"مونتيري"},"Montevideo":{"exemplarCity":"مونتفيديو"},"Montserrat":{"exemplarCity":"مونتسيرات"},"Nassau":{"exemplarCity":"ناسو"},"New_York":{"exemplarCity":"نيويورك"},"Nipigon":{"exemplarCity":"نيبيجون"},"Nome":{"exemplarCity":"نوم"},"Noronha":{"exemplarCity":"نوروناه"},"North_Dakota":{"Beulah":{"exemplarCity":"بيولا، داكوتا الشمالية"},"New_Salem":{"exemplarCity":"نيو ساليم"},"Center":{"exemplarCity":"سنتر"}},"Ojinaga":{"exemplarCity":"أوجيناجا"},"Panama":{"exemplarCity":"بنما"},"Pangnirtung":{"exemplarCity":"بانجينتينج"},"Paramaribo":{"exemplarCity":"باراماريبو"},"Phoenix":{"exemplarCity":"فينكس"},"Port-au-Prince":{"exemplarCity":"بورت أو برنس"},"Port_of_Spain":{"exemplarCity":"بورت أوف سبين"},"Porto_Velho":{"exemplarCity":"بورتو فيلو"},"Puerto_Rico":{"exemplarCity":"بورتوريكو"},"Punta_Arenas":{"exemplarCity":"بونتا أريناز"},"Rainy_River":{"exemplarCity":"راني ريفر"},"Rankin_Inlet":{"exemplarCity":"رانكن انلت"},"Recife":{"exemplarCity":"ريسيف"},"Regina":{"exemplarCity":"ريجينا"},"Resolute":{"exemplarCity":"ريزولوت"},"Rio_Branco":{"exemplarCity":"ريوبرانكو"},"Santa_Isabel":{"exemplarCity":"سانتا إيزابيل"},"Santarem":{"exemplarCity":"سانتاريم"},"Santiago":{"exemplarCity":"سانتياغو"},"Santo_Domingo":{"exemplarCity":"سانتو دومينغو"},"Sao_Paulo":{"exemplarCity":"ساو باولو"},"Scoresbysund":{"exemplarCity":"سكورسبيسند"},"Sitka":{"exemplarCity":"سيتكا"},"St_Barthelemy":{"exemplarCity":"سانت بارتيليمي"},"St_Johns":{"exemplarCity":"سانت جونس"},"St_Kitts":{"exemplarCity":"سانت كيتس"},"St_Lucia":{"exemplarCity":"سانت لوشيا"},"St_Thomas":{"exemplarCity":"سانت توماس"},"St_Vincent":{"exemplarCity":"سانت فنسنت"},"Swift_Current":{"exemplarCity":"سوفت كارنت"},"Tegucigalpa":{"exemplarCity":"تيغوسيغالبا"},"Thule":{"exemplarCity":"ثيل"},"Thunder_Bay":{"exemplarCity":"ثندر باي"},"Tijuana":{"exemplarCity":"تيخوانا"},"Toronto":{"exemplarCity":"تورونتو"},"Tortola":{"exemplarCity":"تورتولا"},"Vancouver":{"exemplarCity":"فانكوفر"},"Whitehorse":{"exemplarCity":"وايت هورس"},"Winnipeg":{"exemplarCity":"وينيبيج"},"Yakutat":{"exemplarCity":"ياكوتات"},"Yellowknife":{"exemplarCity":"يلونيف"}},"Atlantic":{"Azores":{"exemplarCity":"أزورس"},"Bermuda":{"exemplarCity":"برمودا"},"Canary":{"exemplarCity":"كناري"},"Cape_Verde":{"exemplarCity":"الرأس الأخضر"},"Faeroe":{"exemplarCity":"فارو"},"Madeira":{"exemplarCity":"ماديرا"},"Reykjavik":{"exemplarCity":"ريكيافيك"},"South_Georgia":{"exemplarCity":"جورجيا الجنوبية"},"St_Helena":{"exemplarCity":"سانت هيلينا"},"Stanley":{"exemplarCity":"استانلي"}},"Europe":{"Amsterdam":{"exemplarCity":"أمستردام"},"Andorra":{"exemplarCity":"أندورا"},"Astrakhan":{"exemplarCity":"أستراخان"},"Athens":{"exemplarCity":"أثينا"},"Belgrade":{"exemplarCity":"بلغراد"},"Berlin":{"exemplarCity":"برلين"},"Bratislava":{"exemplarCity":"براتيسلافا"},"Brussels":{"exemplarCity":"بروكسل"},"Bucharest":{"exemplarCity":"بوخارست"},"Budapest":{"exemplarCity":"بودابست"},"Busingen":{"exemplarCity":"بوسنغن"},"Chisinau":{"exemplarCity":"تشيسيناو"},"Copenhagen":{"exemplarCity":"كوبنهاغن"},"Dublin":{"long":{"daylight":"توقيت أيرلندا الرسمي"},"exemplarCity":"دبلن"},"Gibraltar":{"exemplarCity":"جبل طارق"},"Guernsey":{"exemplarCity":"غيرنسي"},"Helsinki":{"exemplarCity":"هلسنكي"},"Isle_of_Man":{"exemplarCity":"جزيرة مان"},"Istanbul":{"exemplarCity":"إسطنبول"},"Jersey":{"exemplarCity":"جيرسي"},"Kaliningrad":{"exemplarCity":"كالينجراد"},"Kiev":{"exemplarCity":"كييف"},"Kirov":{"exemplarCity":"كيروف"},"Lisbon":{"exemplarCity":"لشبونة"},"Ljubljana":{"exemplarCity":"ليوبليانا"},"London":{"long":{"daylight":"توقيت بريطانيا الصيفي"},"exemplarCity":"لندن"},"Luxembourg":{"exemplarCity":"لوكسمبورغ"},"Madrid":{"exemplarCity":"مدريد"},"Malta":{"exemplarCity":"مالطة"},"Mariehamn":{"exemplarCity":"ماريهامن"},"Minsk":{"exemplarCity":"مينسك"},"Monaco":{"exemplarCity":"موناكو"},"Moscow":{"exemplarCity":"موسكو"},"Oslo":{"exemplarCity":"أوسلو"},"Paris":{"exemplarCity":"باريس"},"Podgorica":{"exemplarCity":"بودغوريكا"},"Prague":{"exemplarCity":"براغ"},"Riga":{"exemplarCity":"ريغا"},"Rome":{"exemplarCity":"روما"},"Samara":{"exemplarCity":"سمراء"},"San_Marino":{"exemplarCity":"سان مارينو"},"Sarajevo":{"exemplarCity":"سراييفو"},"Saratov":{"exemplarCity":"ساراتوف"},"Simferopol":{"exemplarCity":"سيمفروبول"},"Skopje":{"exemplarCity":"سكوبي"},"Sofia":{"exemplarCity":"صوفيا"},"Stockholm":{"exemplarCity":"ستوكهولم"},"Tallinn":{"exemplarCity":"تالين"},"Tirane":{"exemplarCity":"تيرانا"},"Ulyanovsk":{"exemplarCity":"أوليانوفسك"},"Uzhgorod":{"exemplarCity":"أوزجرود"},"Vaduz":{"exemplarCity":"فادوز"},"Vatican":{"exemplarCity":"الفاتيكان"},"Vienna":{"exemplarCity":"فيينا"},"Vilnius":{"exemplarCity":"فيلنيوس"},"Volgograd":{"exemplarCity":"فولوجراد"},"Warsaw":{"exemplarCity":"وارسو"},"Zagreb":{"exemplarCity":"زغرب"},"Zaporozhye":{"exemplarCity":"زابوروزي"},"Zurich":{"exemplarCity":"زيورخ"}},"Africa":{"Abidjan":{"exemplarCity":"أبيدجان"},"Accra":{"exemplarCity":"أكرا"},"Addis_Ababa":{"exemplarCity":"أديس أبابا"},"Algiers":{"exemplarCity":"الجزائر"},"Asmera":{"exemplarCity":"أسمرة"},"Bamako":{"exemplarCity":"باماكو"},"Bangui":{"exemplarCity":"بانغوي"},"Banjul":{"exemplarCity":"بانجول"},"Bissau":{"exemplarCity":"بيساو"},"Blantyre":{"exemplarCity":"بلانتاير"},"Brazzaville":{"exemplarCity":"برازافيل"},"Bujumbura":{"exemplarCity":"بوجومبورا"},"Cairo":{"exemplarCity":"القاهرة"},"Casablanca":{"exemplarCity":"الدار البيضاء"},"Ceuta":{"exemplarCity":"سيتا"},"Conakry":{"exemplarCity":"كوناكري"},"Dakar":{"exemplarCity":"داكار"},"Dar_es_Salaam":{"exemplarCity":"دار السلام"},"Djibouti":{"exemplarCity":"جيبوتي"},"Douala":{"exemplarCity":"دوالا"},"El_Aaiun":{"exemplarCity":"العيون"},"Freetown":{"exemplarCity":"فري تاون"},"Gaborone":{"exemplarCity":"غابورون"},"Harare":{"exemplarCity":"هراري"},"Johannesburg":{"exemplarCity":"جوهانسبرغ"},"Juba":{"exemplarCity":"جوبا"},"Kampala":{"exemplarCity":"كامبالا"},"Khartoum":{"exemplarCity":"الخرطوم"},"Kigali":{"exemplarCity":"كيغالي"},"Kinshasa":{"exemplarCity":"كينشاسا"},"Lagos":{"exemplarCity":"لاغوس"},"Libreville":{"exemplarCity":"ليبرفيل"},"Lome":{"exemplarCity":"لومي"},"Luanda":{"exemplarCity":"لواندا"},"Lubumbashi":{"exemplarCity":"لومبباشا"},"Lusaka":{"exemplarCity":"لوساكا"},"Malabo":{"exemplarCity":"مالابو"},"Maputo":{"exemplarCity":"مابوتو"},"Maseru":{"exemplarCity":"ماسيرو"},"Mbabane":{"exemplarCity":"مباباني"},"Mogadishu":{"exemplarCity":"مقديشيو"},"Monrovia":{"exemplarCity":"مونروفيا"},"Nairobi":{"exemplarCity":"نيروبي"},"Ndjamena":{"exemplarCity":"نجامينا"},"Niamey":{"exemplarCity":"نيامي"},"Nouakchott":{"exemplarCity":"نواكشوط"},"Ouagadougou":{"exemplarCity":"واغادوغو"},"Porto-Novo":{"exemplarCity":"بورتو نوفو"},"Sao_Tome":{"exemplarCity":"ساو تومي"},"Tripoli":{"exemplarCity":"طرابلس"},"Tunis":{"exemplarCity":"تونس"},"Windhoek":{"exemplarCity":"ويندهوك"}},"Asia":{"Aden":{"exemplarCity":"عدن"},"Almaty":{"exemplarCity":"ألماتي"},"Amman":{"exemplarCity":"عمان"},"Anadyr":{"exemplarCity":"أندير"},"Aqtau":{"exemplarCity":"أكتاو"},"Aqtobe":{"exemplarCity":"أكتوب"},"Ashgabat":{"exemplarCity":"عشق آباد"},"Atyrau":{"exemplarCity":"أتيراو"},"Baghdad":{"exemplarCity":"بغداد"},"Bahrain":{"exemplarCity":"البحرين"},"Baku":{"exemplarCity":"باكو"},"Bangkok":{"exemplarCity":"بانكوك"},"Barnaul":{"exemplarCity":"بارناول"},"Beirut":{"exemplarCity":"بيروت"},"Bishkek":{"exemplarCity":"بشكيك"},"Brunei":{"exemplarCity":"بروناي"},"Calcutta":{"exemplarCity":"كالكتا"},"Chita":{"exemplarCity":"تشيتا"},"Choibalsan":{"exemplarCity":"تشوبالسان"},"Colombo":{"exemplarCity":"كولومبو"},"Damascus":{"exemplarCity":"دمشق"},"Dhaka":{"exemplarCity":"دكا"},"Dili":{"exemplarCity":"ديلي"},"Dubai":{"exemplarCity":"دبي"},"Dushanbe":{"exemplarCity":"دوشانبي"},"Famagusta":{"exemplarCity":"فاماغوستا"},"Gaza":{"exemplarCity":"غزة"},"Hebron":{"exemplarCity":"هيبرون (مدينة الخليل)"},"Hong_Kong":{"exemplarCity":"هونغ كونغ"},"Hovd":{"exemplarCity":"هوفد"},"Irkutsk":{"exemplarCity":"ايركيتسك"},"Jakarta":{"exemplarCity":"جاكرتا"},"Jayapura":{"exemplarCity":"جايابيورا"},"Jerusalem":{"exemplarCity":"القدس"},"Kabul":{"exemplarCity":"كابول"},"Kamchatka":{"exemplarCity":"كامتشاتكا"},"Karachi":{"exemplarCity":"كراتشي"},"Katmandu":{"exemplarCity":"كاتماندو"},"Khandyga":{"exemplarCity":"خانديجا"},"Krasnoyarsk":{"exemplarCity":"كراسنويارسك"},"Kuala_Lumpur":{"exemplarCity":"كوالا لامبور"},"Kuching":{"exemplarCity":"كيشينج"},"Kuwait":{"exemplarCity":"الكويت"},"Macau":{"exemplarCity":"ماكاو"},"Magadan":{"exemplarCity":"مجادن"},"Makassar":{"exemplarCity":"ماكسار"},"Manila":{"exemplarCity":"مانيلا"},"Muscat":{"exemplarCity":"مسقط"},"Nicosia":{"exemplarCity":"نيقوسيا"},"Novokuznetsk":{"exemplarCity":"نوفوكوزنتسك"},"Novosibirsk":{"exemplarCity":"نوفوسبيرسك"},"Omsk":{"exemplarCity":"أومسك"},"Oral":{"exemplarCity":"أورال"},"Phnom_Penh":{"exemplarCity":"بنوم بنه"},"Pontianak":{"exemplarCity":"بونتيانك"},"Pyongyang":{"exemplarCity":"بيونغ يانغ"},"Qatar":{"exemplarCity":"قطر"},"Qyzylorda":{"exemplarCity":"كيزيلوردا"},"Rangoon":{"exemplarCity":"رانغون"},"Riyadh":{"exemplarCity":"الرياض"},"Saigon":{"exemplarCity":"مدينة هو تشي منة"},"Sakhalin":{"exemplarCity":"سكالين"},"Samarkand":{"exemplarCity":"سمرقند"},"Seoul":{"exemplarCity":"سول"},"Shanghai":{"exemplarCity":"شنغهاي"},"Singapore":{"exemplarCity":"سنغافورة"},"Srednekolymsk":{"exemplarCity":"سريدنكوليمسك"},"Taipei":{"exemplarCity":"تايبيه"},"Tashkent":{"exemplarCity":"طشقند"},"Tbilisi":{"exemplarCity":"تبليسي"},"Tehran":{"exemplarCity":"طهران"},"Thimphu":{"exemplarCity":"تيمفو"},"Tokyo":{"exemplarCity":"طوكيو"},"Tomsk":{"exemplarCity":"تومسك"},"Ulaanbaatar":{"exemplarCity":"آلانباتار"},"Urumqi":{"exemplarCity":"أرومكي"},"Ust-Nera":{"exemplarCity":"أوست نيرا"},"Vientiane":{"exemplarCity":"فيانتيان"},"Vladivostok":{"exemplarCity":"فلاديفوستك"},"Yakutsk":{"exemplarCity":"ياكتسك"},"Yekaterinburg":{"exemplarCity":"يكاترنبيرج"},"Yerevan":{"exemplarCity":"يريفان"}},"Indian":{"Antananarivo":{"exemplarCity":"أنتاناناريفو"},"Chagos":{"exemplarCity":"تشاغوس"},"Christmas":{"exemplarCity":"كريسماس"},"Cocos":{"exemplarCity":"كوكوس"},"Comoro":{"exemplarCity":"جزر القمر"},"Kerguelen":{"exemplarCity":"كيرغويلين"},"Mahe":{"exemplarCity":"ماهي"},"Maldives":{"exemplarCity":"المالديف"},"Mauritius":{"exemplarCity":"موريشيوس"},"Mayotte":{"exemplarCity":"مايوت"},"Reunion":{"exemplarCity":"ريونيون"}},"Australia":{"Adelaide":{"exemplarCity":"أديليد"},"Brisbane":{"exemplarCity":"برسيبان"},"Broken_Hill":{"exemplarCity":"بروكن هيل"},"Currie":{"exemplarCity":"كوري"},"Darwin":{"exemplarCity":"دارون"},"Eucla":{"exemplarCity":"أوكلا"},"Hobart":{"exemplarCity":"هوبارت"},"Lindeman":{"exemplarCity":"ليندمان"},"Lord_Howe":{"exemplarCity":"لورد هاو"},"Melbourne":{"exemplarCity":"ميلبورن"},"Perth":{"exemplarCity":"برثا"},"Sydney":{"exemplarCity":"سيدني"}},"Pacific":{"Apia":{"exemplarCity":"أبيا"},"Auckland":{"exemplarCity":"أوكلاند"},"Bougainville":{"exemplarCity":"بوغانفيل"},"Chatham":{"exemplarCity":"تشاثام"},"Easter":{"exemplarCity":"استر"},"Efate":{"exemplarCity":"إيفات"},"Enderbury":{"exemplarCity":"اندربيرج"},"Fakaofo":{"exemplarCity":"فاكاوفو"},"Fiji":{"exemplarCity":"فيجي"},"Funafuti":{"exemplarCity":"فونافوتي"},"Galapagos":{"exemplarCity":"جلاباجوس"},"Gambier":{"exemplarCity":"جامبير"},"Guadalcanal":{"exemplarCity":"غوادالكانال"},"Guam":{"exemplarCity":"غوام"},"Honolulu":{"exemplarCity":"هونولولو"},"Johnston":{"exemplarCity":"جونستون"},"Kiritimati":{"exemplarCity":"كيريتي ماتي"},"Kosrae":{"exemplarCity":"كوسرا"},"Kwajalein":{"exemplarCity":"كواجالين"},"Majuro":{"exemplarCity":"ماجورو"},"Marquesas":{"exemplarCity":"ماركيساس"},"Midway":{"exemplarCity":"ميدواي"},"Nauru":{"exemplarCity":"ناورو"},"Niue":{"exemplarCity":"نيوي"},"Norfolk":{"exemplarCity":"نورفولك"},"Noumea":{"exemplarCity":"نوميا"},"Pago_Pago":{"exemplarCity":"باغو باغو"},"Palau":{"exemplarCity":"بالاو"},"Pitcairn":{"exemplarCity":"بيتكيرن"},"Ponape":{"exemplarCity":"باناب"},"Port_Moresby":{"exemplarCity":"بور مورسبي"},"Rarotonga":{"exemplarCity":"راروتونغا"},"Saipan":{"exemplarCity":"سايبان"},"Tahiti":{"exemplarCity":"تاهيتي"},"Tarawa":{"exemplarCity":"تاراوا"},"Tongatapu":{"exemplarCity":"تونغاتابو"},"Truk":{"exemplarCity":"ترك"},"Wake":{"exemplarCity":"واك"},"Wallis":{"exemplarCity":"واليس"}},"Arctic":{"Longyearbyen":{"exemplarCity":"لونجيربين"}},"Antarctica":{"Casey":{"exemplarCity":"كاساي"},"Davis":{"exemplarCity":"دافيز"},"DumontDUrville":{"exemplarCity":"دي مونت دو روفيل"},"Macquarie":{"exemplarCity":"ماكواري"},"Mawson":{"exemplarCity":"ماوسون"},"McMurdo":{"exemplarCity":"ماك موردو"},"Palmer":{"exemplarCity":"بالمير"},"Rothera":{"exemplarCity":"روثيرا"},"Syowa":{"exemplarCity":"سايووا"},"Troll":{"exemplarCity":"ترول"},"Vostok":{"exemplarCity":"فوستوك"}},"Etc":{"UTC":{"long":{"standard":"التوقيت العالمي المنسق"},"short":{"standard":"UTC"}},"Unknown":{"exemplarCity":"مدينة غير معروفة"}}},"metazone":{"Afghanistan":{"long":{"standard":"توقيت أفغانستان"}},"Africa_Central":{"long":{"standard":"توقيت وسط أفريقيا"}},"Africa_Eastern":{"long":{"standard":"توقيت شرق أفريقيا"}},"Africa_Southern":{"long":{"standard":"توقيت جنوب أفريقيا"}},"Africa_Western":{"long":{"generic":"توقيت غرب أفريقيا","standard":"توقيت غرب أفريقيا الرسمي","daylight":"توقيت غرب أفريقيا الصيفي"}},"Alaska":{"long":{"generic":"توقيت ألاسكا","standard":"التوقيت الرسمي لألاسكا","daylight":"توقيت ألاسكا الصيفي"}},"Amazon":{"long":{"generic":"توقيت الأمازون","standard":"توقيت الأمازون الرسمي","daylight":"توقيت الأمازون الصيفي"}},"America_Central":{"long":{"generic":"التوقيت المركزي لأمريكا الشمالية","standard":"التوقيت الرسمي المركزي لأمريكا الشمالية","daylight":"التوقيت الصيفي المركزي لأمريكا الشمالية"}},"America_Eastern":{"long":{"generic":"التوقيت الشرقي لأمريكا الشمالية","standard":"التوقيت الرسمي الشرقي لأمريكا الشمالية","daylight":"التوقيت الصيفي الشرقي لأمريكا الشمالية"}},"America_Mountain":{"long":{"generic":"التوقيت الجبلي لأمريكا الشمالية","standard":"التوقيت الجبلي الرسمي لأمريكا الشمالية","daylight":"التوقيت الجبلي الصيفي لأمريكا الشمالية"}},"America_Pacific":{"long":{"generic":"توقيت المحيط الهادي","standard":"توقيت المحيط الهادي الرسمي","daylight":"توقيت المحيط الهادي الصيفي"}},"Anadyr":{"long":{"generic":"توقيت أنادير","standard":"توقيت أنادير الرسمي","daylight":"التوقيت الصيفي لأنادير"}},"Apia":{"long":{"generic":"توقيت آبيا","standard":"التوقيت الرسمي لآبيا","daylight":"التوقيت الصيفي لأبيا"}},"Arabian":{"long":{"generic":"التوقيت العربي","standard":"التوقيت العربي الرسمي","daylight":"التوقيت العربي الصيفي"}},"Argentina":{"long":{"generic":"توقيت الأرجنتين","standard":"توقيت الأرجنتين الرسمي","daylight":"توقيت الأرجنتين الصيفي"}},"Argentina_Western":{"long":{"generic":"توقيت غرب الأرجنتين","standard":"توقيت غرب الأرجنتين الرسمي","daylight":"توقيت غرب الأرجنتين الصيفي"}},"Armenia":{"long":{"generic":"توقيت أرمينيا","standard":"توقيت أرمينيا الرسمي","daylight":"توقيت أرمينيا الصيفي"}},"Atlantic":{"long":{"generic":"توقيت الأطلسي","standard":"التوقيت الرسمي الأطلسي","daylight":"التوقيت الصيفي الأطلسي"}},"Australia_Central":{"long":{"generic":"توقيت وسط أستراليا","standard":"توقيت وسط أستراليا الرسمي","daylight":"توقيت وسط أستراليا الصيفي"}},"Australia_CentralWestern":{"long":{"generic":"توقيت غرب وسط أستراليا","standard":"توقيت غرب وسط أستراليا الرسمي","daylight":"توقيت غرب وسط أستراليا الصيفي"}},"Australia_Eastern":{"long":{"generic":"توقيت شرق أستراليا","standard":"توقيت شرق أستراليا الرسمي","daylight":"توقيت شرق أستراليا الصيفي"}},"Australia_Western":{"long":{"generic":"توقيت غرب أستراليا","standard":"توقيت غرب أستراليا الرسمي","daylight":"توقيت غرب أستراليا الصيفي"}},"Azerbaijan":{"long":{"generic":"توقيت أذربيجان","standard":"توقيت أذربيجان الرسمي","daylight":"توقيت أذربيجان الصيفي"}},"Azores":{"long":{"generic":"توقيت أزورس","standard":"توقيت أزورس الرسمي","daylight":"توقيت أزورس الصيفي"}},"Bangladesh":{"long":{"generic":"توقيت بنغلاديش","standard":"توقيت بنغلاديش الرسمي","daylight":"توقيت بنغلاديش الصيفي"}},"Bhutan":{"long":{"standard":"توقيت بوتان"}},"Bolivia":{"long":{"standard":"توقيت بوليفيا"}},"Brasilia":{"long":{"generic":"توقيت برازيليا","standard":"توقيت برازيليا الرسمي","daylight":"توقيت برازيليا الصيفي"}},"Brunei":{"long":{"standard":"توقيت بروناي"}},"Cape_Verde":{"long":{"generic":"توقيت الرأس الأخضر","standard":"توقيت الرأس الأخضر الرسمي","daylight":"توقيت الرأس الأخضر الصيفي"}},"Chamorro":{"long":{"standard":"توقيت تشامورو"}},"Chatham":{"long":{"generic":"توقيت تشاتام","standard":"توقيت تشاتام الرسمي","daylight":"توقيت تشاتام الصيفي"}},"Chile":{"long":{"generic":"توقيت شيلي","standard":"توقيت شيلي الرسمي","daylight":"توقيت شيلي الصيفي"}},"China":{"long":{"generic":"توقيت الصين","standard":"توقيت الصين الرسمي","daylight":"توقيت الصين الصيفي"}},"Choibalsan":{"long":{"generic":"توقيت شويبالسان","standard":"توقيت شويبالسان الرسمي","daylight":"التوقيت الصيفي لشويبالسان"}},"Christmas":{"long":{"standard":"توقيت جزر الكريسماس"}},"Cocos":{"long":{"standard":"توقيت جزر كوكوس"}},"Colombia":{"long":{"generic":"توقيت كولومبيا","standard":"توقيت كولومبيا الرسمي","daylight":"توقيت كولومبيا الصيفي"}},"Cook":{"long":{"generic":"توقيت جزر كووك","standard":"توقيت جزر كووك الرسمي","daylight":"توقيت جزر كووك الصيفي"}},"Cuba":{"long":{"generic":"توقيت كوبا","standard":"توقيت كوبا الرسمي","daylight":"توقيت كوبا الصيفي"}},"Davis":{"long":{"standard":"توقيت دافيز"}},"DumontDUrville":{"long":{"standard":"توقيت دي مونت دو روفيل"}},"East_Timor":{"long":{"standard":"توقيت تيمور الشرقية"}},"Easter":{"long":{"generic":"توقيت جزيرة استر","standard":"توقيت جزيرة استر الرسمي","daylight":"توقيت جزيرة استر الصيفي"}},"Ecuador":{"long":{"standard":"توقيت الإكوادور"}},"Europe_Central":{"long":{"generic":"توقيت وسط أوروبا","standard":"توقيت وسط أوروبا الرسمي","daylight":"توقيت وسط أوروبا الصيفي"}},"Europe_Eastern":{"long":{"generic":"توقيت شرق أوروبا","standard":"توقيت شرق أوروبا الرسمي","daylight":"توقيت شرق أوروبا الصيفي"}},"Europe_Further_Eastern":{"long":{"standard":"التوقيت الأوروبي (أكثر شرقًا)"}},"Europe_Western":{"long":{"generic":"توقيت غرب أوروبا","standard":"توقيت غرب أوروبا الرسمي","daylight":"توقيت غرب أوروبا الصيفي"}},"Falkland":{"long":{"generic":"توقيت جزر فوكلاند","standard":"توقيت جزر فوكلاند الرسمي","daylight":"توقيت جزر فوكلاند الصيفي"}},"Fiji":{"long":{"generic":"توقيت فيجي","standard":"توقيت فيجي الرسمي","daylight":"توقيت فيجي الصيفي"}},"French_Guiana":{"long":{"standard":"توقيت غايانا الفرنسية"}},"French_Southern":{"long":{"standard":"توقيت المقاطعات الفرنسية الجنوبية والأنتارتيكية"}},"Galapagos":{"long":{"standard":"توقيت غلاباغوس"}},"Gambier":{"long":{"standard":"توقيت جامبير"}},"Georgia":{"long":{"generic":"توقيت جورجيا","standard":"توقيت جورجيا الرسمي","daylight":"توقيت جورجيا الصيفي"}},"Gilbert_Islands":{"long":{"standard":"توقيت جزر جيلبرت"}},"GMT":{"long":{"standard":"توقيت غرينتش"}},"Greenland_Eastern":{"long":{"generic":"توقيت شرق غرينلاند","standard":"توقيت شرق غرينلاند الرسمي","daylight":"توقيت شرق غرينلاند الصيفي"}},"Greenland_Western":{"long":{"generic":"توقيت غرب غرينلاند","standard":"توقيت غرب غرينلاند الرسمي","daylight":"توقيت غرب غرينلاند الصيفي"}},"Guam":{"long":{"standard":"توقيت غوام"}},"Gulf":{"long":{"standard":"توقيت الخليج"}},"Guyana":{"long":{"standard":"توقيت غيانا"}},"Hawaii_Aleutian":{"long":{"generic":"توقيت هاواي ألوتيان","standard":"توقيت هاواي ألوتيان الرسمي","daylight":"توقيت هاواي ألوتيان الصيفي"}},"Hong_Kong":{"long":{"generic":"توقيت هونغ كونغ","standard":"توقيت هونغ كونغ الرسمي","daylight":"توقيت هونغ كونغ الصيفي"}},"Hovd":{"long":{"generic":"توقيت هوفد","standard":"توقيت هوفد الرسمي","daylight":"توقيت هوفد الصيفي"}},"India":{"long":{"standard":"توقيت الهند"}},"Indian_Ocean":{"long":{"standard":"توقيت المحيط الهندي"}},"Indochina":{"long":{"standard":"توقيت الهند الصينية"}},"Indonesia_Central":{"long":{"standard":"توقيت وسط إندونيسيا"}},"Indonesia_Eastern":{"long":{"standard":"توقيت شرق إندونيسيا"}},"Indonesia_Western":{"long":{"standard":"توقيت غرب إندونيسيا"}},"Iran":{"long":{"generic":"توقيت إيران","standard":"توقيت إيران الرسمي","daylight":"توقيت إيران الصيفي"}},"Irkutsk":{"long":{"generic":"توقيت إركوتسك","standard":"توقيت إركوتسك الرسمي","daylight":"توقيت إركوتسك الصيفي"}},"Israel":{"long":{"generic":"توقيت إسرائيل","standard":"توقيت إسرائيل الرسمي","daylight":"توقيت إسرائيل الصيفي"}},"Japan":{"long":{"generic":"توقيت اليابان","standard":"توقيت اليابان الرسمي","daylight":"توقيت اليابان الصيفي"}},"Kamchatka":{"long":{"generic":"توقيت كامشاتكا","standard":"توقيت بيتروبافلوفسك-كامتشاتسكي","daylight":"توقيت بيتروبافلوفسك-كامتشاتسكي الصيفي"}},"Kazakhstan_Eastern":{"long":{"standard":"توقيت شرق كازاخستان"}},"Kazakhstan_Western":{"long":{"standard":"توقيت غرب كازاخستان"}},"Korea":{"long":{"generic":"توقيت كوريا","standard":"توقيت كوريا الرسمي","daylight":"توقيت كوريا الصيفي"}},"Kosrae":{"long":{"standard":"توقيت كوسرا"}},"Krasnoyarsk":{"long":{"generic":"توقيت كراسنويارسك","standard":"توقيت كراسنويارسك الرسمي","daylight":"التوقيت الصيفي لكراسنويارسك"}},"Kyrgystan":{"long":{"standard":"توقيت قيرغيزستان"}},"Line_Islands":{"long":{"standard":"توقيت جزر لاين"}},"Lord_Howe":{"long":{"generic":"توقيت لورد هاو","standard":"توقيت لورد هاو الرسمي","daylight":"التوقيت الصيفي للورد هاو"}},"Macquarie":{"long":{"standard":"توقيت ماكواري"}},"Magadan":{"long":{"generic":"توقيت ماغادان","standard":"توقيت ماغادان الرسمي","daylight":"توقيت ماغادان الصيفي"}},"Malaysia":{"long":{"standard":"توقيت ماليزيا"}},"Maldives":{"long":{"standard":"توقيت الـمالديف"}},"Marquesas":{"long":{"standard":"توقيت ماركيساس"}},"Marshall_Islands":{"long":{"standard":"توقيت جزر مارشال"}},"Mauritius":{"long":{"generic":"توقيت موريشيوس","standard":"توقيت موريشيوس الرسمي","daylight":"توقيت موريشيوس الصيفي"}},"Mawson":{"long":{"standard":"توقيت ماوسون"}},"Mexico_Northwest":{"long":{"generic":"توقيت شمال غرب المكسيك","standard":"التوقيت الرسمي لشمال غرب المكسيك","daylight":"التوقيت الصيفي لشمال غرب المكسيك"}},"Mexico_Pacific":{"long":{"generic":"توقيت المحيط الهادي للمكسيك","standard":"توقيت المحيط الهادي الرسمي للمكسيك","daylight":"توقيت المحيط الهادي الصيفي للمكسيك"}},"Mongolia":{"long":{"generic":"توقيت أولان باتور","standard":"توقيت أولان باتور الرسمي","daylight":"توقيت أولان باتور الصيفي"}},"Moscow":{"long":{"generic":"توقيت موسكو","standard":"توقيت موسكو الرسمي","daylight":"توقيت موسكو الصيفي"}},"Myanmar":{"long":{"standard":"توقيت ميانمار"}},"Nauru":{"long":{"standard":"توقيت ناورو"}},"Nepal":{"long":{"standard":"توقيت نيبال"}},"New_Caledonia":{"long":{"generic":"توقيت كاليدونيا الجديدة","standard":"توقيت كاليدونيا الجديدة الرسمي","daylight":"توقيت كاليدونيا الجديدة الصيفي"}},"New_Zealand":{"long":{"generic":"توقيت نيوزيلندا","standard":"توقيت نيوزيلندا الرسمي","daylight":"توقيت نيوزيلندا الصيفي"}},"Newfoundland":{"long":{"generic":"توقيت نيوفاوندلاند","standard":"توقيت نيوفاوندلاند الرسمي","daylight":"توقيت نيوفاوندلاند الصيفي"}},"Niue":{"long":{"standard":"توقيت نيوي"}},"Norfolk":{"long":{"standard":"توقيت جزيرة نورفولك"}},"Noronha":{"long":{"generic":"توقيت فيرناندو دي نورونها","standard":"توقيت فرناندو دي نورونها الرسمي","daylight":"توقيت فرناندو دي نورونها الصيفي"}},"North_Mariana":{"long":{"standard":"توقيت جزر ماريانا الشمالية"}},"Novosibirsk":{"long":{"generic":"توقيت نوفوسيبيرسك","standard":"توقيت نوفوسيبيرسك الرسمي","daylight":"توقيت نوفوسيبيرسك الصيفي"}},"Omsk":{"long":{"generic":"توقيت أومسك","standard":"توقيت أومسك الرسمي","daylight":"توقيت أومسك الصيفي"}},"Pakistan":{"long":{"generic":"توقيت باكستان","standard":"توقيت باكستان الرسمي","daylight":"توقيت باكستان الصيفي"}},"Palau":{"long":{"standard":"توقيت بالاو"}},"Papua_New_Guinea":{"long":{"standard":"توقيت بابوا غينيا الجديدة"}},"Paraguay":{"long":{"generic":"توقيت باراغواي","standard":"توقيت باراغواي الرسمي","daylight":"توقيت باراغواي الصيفي"}},"Peru":{"long":{"generic":"توقيت بيرو","standard":"توقيت بيرو الرسمي","daylight":"توقيت بيرو الصيفي"}},"Philippines":{"long":{"generic":"توقيت الفيلبين","standard":"توقيت الفيلبين الرسمي","daylight":"توقيت الفيلبين الصيفي"}},"Phoenix_Islands":{"long":{"standard":"توقيت جزر فينكس"}},"Pierre_Miquelon":{"long":{"generic":"توقيت سانت بيير وميكولون","standard":"توقيت سانت بيير وميكولون الرسمي","daylight":"توقيت سانت بيير وميكولون الصيفي"}},"Pitcairn":{"long":{"standard":"توقيت بيتكيرن"}},"Ponape":{"long":{"standard":"توقيت بونابي"}},"Pyongyang":{"long":{"standard":"توقيت بيونغ يانغ"}},"Reunion":{"long":{"standard":"توقيت ريونيون"}},"Rothera":{"long":{"standard":"توقيت روثيرا"}},"Sakhalin":{"long":{"generic":"توقيت ساخالين","standard":"توقيت ساخالين الرسمي","daylight":"توقيت ساخالين الصيفي"}},"Samara":{"long":{"generic":"توقيت سامارا","standard":"توقيت سمارا","daylight":"توقيت سمارا الصيفي"}},"Samoa":{"long":{"generic":"توقيت ساموا","standard":"توقيت ساموا الرسمي","daylight":"توقيت ساموا الصيفي"}},"Seychelles":{"long":{"standard":"توقيت سيشل"}},"Singapore":{"long":{"standard":"توقيت سنغافورة"}},"Solomon":{"long":{"standard":"توقيت جزر سليمان"}},"South_Georgia":{"long":{"standard":"توقيت جنوب جورجيا"}},"Suriname":{"long":{"standard":"توقيت سورينام"}},"Syowa":{"long":{"standard":"توقيت سايووا"}},"Tahiti":{"long":{"standard":"توقيت تاهيتي"}},"Taipei":{"long":{"generic":"توقيت تايبيه","standard":"توقيت تايبيه الرسمي","daylight":"توقيت تايبيه الصيفي"}},"Tajikistan":{"long":{"standard":"توقيت طاجكستان"}},"Tokelau":{"long":{"standard":"توقيت توكيلاو"}},"Tonga":{"long":{"generic":"توقيت تونغا","standard":"توقيت تونغا الرسمي","daylight":"توقيت تونغا الصيفي"}},"Truk":{"long":{"standard":"توقيت شوك"}},"Turkmenistan":{"long":{"generic":"توقيت تركمانستان","standard":"توقيت تركمانستان الرسمي","daylight":"توقيت تركمانستان الصيفي"}},"Tuvalu":{"long":{"standard":"توقيت توفالو"}},"Uruguay":{"long":{"generic":"توقيت أوروغواي","standard":"توقيت أوروغواي الرسمي","daylight":"توقيت أوروغواي الصيفي"}},"Uzbekistan":{"long":{"generic":"توقيت أوزبكستان","standard":"توقيت أوزبكستان الرسمي","daylight":"توقيت أوزبكستان الصيفي"}},"Vanuatu":{"long":{"generic":"توقيت فانواتو","standard":"توقيت فانواتو الرسمي","daylight":"توقيت فانواتو الصيفي"}},"Venezuela":{"long":{"standard":"توقيت فنزويلا"}},"Vladivostok":{"long":{"generic":"توقيت فلاديفوستوك","standard":"توقيت فلاديفوستوك الرسمي","daylight":"توقيت فلاديفوستوك الصيفي"}},"Volgograd":{"long":{"generic":"توقيت فولغوغراد","standard":"توقيت فولغوغراد الرسمي","daylight":"توقيت فولغوغراد الصيفي"}},"Vostok":{"long":{"standard":"توقيت فوستوك"}},"Wake":{"long":{"standard":"توقيت جزيرة ويك"}},"Wallis":{"long":{"standard":"توقيت واليس و فوتونا"}},"Yakutsk":{"long":{"generic":"توقيت ياكوتسك","standard":"توقيت ياكوتسك الرسمي","daylight":"توقيت ياكوتسك الصيفي"}},"Yekaterinburg":{"long":{"generic":"توقيت يكاترينبورغ","standard":"توقيت يكاترينبورغ الرسمي","daylight":"توقيت يكاترينبورغ الصيفي"}}}}},"numbers":{"defaultNumberingSystem":"arab","defaultNumberingSystem-alt-latn":"latn","otherNumberingSystems":{"native":"arab"},"minimumGroupingDigits":"1","symbols-numberSystem-arab":{"decimal":"٫","group":"٬","list":"؛","percentSign":"٪؜","plusSign":"؜+","minusSign":"؜-","exponential":"اس","superscriptingExponent":"×","perMille":"؉","infinity":"∞","nan":"ليس رقم","timeSeparator":":"},"symbols-numberSystem-latn":{"decimal":".","group":",","list":";","percentSign":"‎%‎","plusSign":"‎+","minusSign":"‎-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"ليس رقمًا","timeSeparator":":"},"decimalFormats-numberSystem-arab":{"standard":"#,##0.###","long":{"decimalFormat":{"1000-count-zero":"0 ألف","1000-count-one":"0 ألف","1000-count-two":"0 ألف","1000-count-few":"0 آلاف","1000-count-many":"0 ألف","1000-count-other":"0 ألف","10000-count-zero":"00 ألف","10000-count-one":"00 ألف","10000-count-two":"00 ألف","10000-count-few":"00 ألف","10000-count-many":"00 ألف","10000-count-other":"00 ألف","100000-count-zero":"000 ألف","100000-count-one":"000 ألف","100000-count-two":"000 ألف","100000-count-few":"000 ألف","100000-count-many":"000 ألف","100000-count-other":"000 ألف","1000000-count-zero":"0 مليون","1000000-count-one":"0 مليون","1000000-count-two":"0 مليون","1000000-count-few":"0 ملايين","1000000-count-many":"0 مليون","1000000-count-other":"0 مليون","10000000-count-zero":"00 مليون","10000000-count-one":"00 مليون","10000000-count-two":"00 مليون","10000000-count-few":"00 ملايين","10000000-count-many":"00 مليون","10000000-count-other":"00 مليون","100000000-count-zero":"000 مليون","100000000-count-one":"000 مليون","100000000-count-two":"000 مليون","100000000-count-few":"000 مليون","100000000-count-many":"000 مليون","100000000-count-other":"000 مليون","1000000000-count-zero":"0 مليار","1000000000-count-one":"0 مليار","1000000000-count-two":"0 مليار","1000000000-count-few":"0 مليار","1000000000-count-many":"0 مليار","1000000000-count-other":"0 مليار","10000000000-count-zero":"00 مليار","10000000000-count-one":"00 مليار","10000000000-count-two":"00 مليار","10000000000-count-few":"00 مليار","10000000000-count-many":"00 مليار","10000000000-count-other":"00 مليار","100000000000-count-zero":"000 مليار","100000000000-count-one":"000 مليار","100000000000-count-two":"000 مليار","100000000000-count-few":"000 مليار","100000000000-count-many":"000 مليار","100000000000-count-other":"000 مليار","1000000000000-count-zero":"0 ترليون","1000000000000-count-one":"0 ترليون","1000000000000-count-two":"0 ترليون","1000000000000-count-few":"0 ترليون","1000000000000-count-many":"0 ترليون","1000000000000-count-other":"0 ترليون","10000000000000-count-zero":"00 ترليون","10000000000000-count-one":"00 ترليون","10000000000000-count-two":"00 ترليون","10000000000000-count-few":"00 ترليون","10000000000000-count-many":"00 ترليون","10000000000000-count-other":"00 ترليون","100000000000000-count-zero":"000 ترليون","100000000000000-count-one":"000 ترليون","100000000000000-count-two":"000 ترليون","100000000000000-count-few":"000 ترليون","100000000000000-count-many":"000 ترليون","100000000000000-count-other":"000 ترليون"}},"short":{"decimalFormat":{"1000-count-zero":"0 ألف","1000-count-one":"0 ألف","1000-count-two":"0 ألف","1000-count-few":"0 آلاف","1000-count-many":"0 ألف","1000-count-other":"0 ألف","10000-count-zero":"00 ألف","10000-count-one":"00 ألف","10000-count-two":"00 ألف","10000-count-few":"00 ألف","10000-count-many":"00 ألف","10000-count-other":"00 ألف","100000-count-zero":"000 ألف","100000-count-one":"000 ألف","100000-count-two":"000 ألف","100000-count-few":"000 ألف","100000-count-many":"000 ألف","100000-count-other":"000 ألف","1000000-count-zero":"0 مليون","1000000-count-one":"0 مليون","1000000-count-two":"0 مليون","1000000-count-few":"0 مليون","1000000-count-many":"0 مليون","1000000-count-other":"0 مليون","10000000-count-zero":"00 مليون","10000000-count-one":"00 مليون","10000000-count-two":"00 مليون","10000000-count-few":"00 مليون","10000000-count-many":"00 مليون","10000000-count-other":"00 مليون","100000000-count-zero":"000 مليون","100000000-count-one":"000 مليون","100000000-count-two":"000 مليون","100000000-count-few":"000 مليون","100000000-count-many":"000 مليون","100000000-count-other":"000 مليون","1000000000-count-zero":"0 مليار","1000000000-count-one":"0 مليار","1000000000-count-two":"0 مليار","1000000000-count-few":"0 مليار","1000000000-count-many":"0 مليار","1000000000-count-other":"0 مليار","10000000000-count-zero":"00 مليار","10000000000-count-one":"00 مليار","10000000000-count-two":"00 مليار","10000000000-count-few":"00 مليار","10000000000-count-many":"00 مليار","10000000000-count-other":"00 مليار","100000000000-count-zero":"000 مليار","100000000000-count-one":"000 مليار","100000000000-count-two":"000 مليار","100000000000-count-few":"000 مليار","100000000000-count-many":"000 مليار","100000000000-count-other":"000 مليار","1000000000000-count-zero":"0 ترليون","1000000000000-count-one":"0 ترليون","1000000000000-count-two":"0 ترليون","1000000000000-count-few":"0 ترليون","1000000000000-count-many":"0 ترليون","1000000000000-count-other":"0 ترليون","10000000000000-count-zero":"00 ترليون","10000000000000-count-one":"00 ترليون","10000000000000-count-two":"00 ترليون","10000000000000-count-few":"00 ترليون","10000000000000-count-many":"00 ترليون","10000000000000-count-other":"00 ترليون","100000000000000-count-zero":"000 ترليون","100000000000000-count-one":"000 ترليون","100000000000000-count-two":"000 ترليون","100000000000000-count-few":"000 ترليون","100000000000000-count-many":"000 ترليون","100000000000000-count-other":"000 ترليون"}}},"decimalFormats-numberSystem-latn":{"standard":"#,##0.###","long":{"decimalFormat":{"1000-count-zero":"0 ألف","1000-count-one":"0 ألف","1000-count-two":"0 ألف","1000-count-few":"0 آلاف","1000-count-many":"0 ألف","1000-count-other":"0 ألف","10000-count-zero":"00 ألف","10000-count-one":"00 ألف","10000-count-two":"00 ألف","10000-count-few":"00 ألف","10000-count-many":"00 ألف","10000-count-other":"00 ألف","100000-count-zero":"000 ألف","100000-count-one":"000 ألف","100000-count-two":"000 ألف","100000-count-few":"000 ألف","100000-count-many":"000 ألف","100000-count-other":"000 ألف","1000000-count-zero":"0 مليون","1000000-count-one":"0 مليون","1000000-count-two":"0 مليون","1000000-count-few":"0 ملايين","1000000-count-many":"0 مليون","1000000-count-other":"0 مليون","10000000-count-zero":"00 مليون","10000000-count-one":"00 مليون","10000000-count-two":"00 مليون","10000000-count-few":"00 ملايين","10000000-count-many":"00 مليون","10000000-count-other":"00 مليون","100000000-count-zero":"000 مليون","100000000-count-one":"000 مليون","100000000-count-two":"000 مليون","100000000-count-few":"000 مليون","100000000-count-many":"000 مليون","100000000-count-other":"000 مليون","1000000000-count-zero":"0 مليار","1000000000-count-one":"0 مليار","1000000000-count-two":"0 مليار","1000000000-count-few":"0 مليار","1000000000-count-many":"0 مليار","1000000000-count-other":"0 مليار","10000000000-count-zero":"00 مليار","10000000000-count-one":"00 مليار","10000000000-count-two":"00 مليار","10000000000-count-few":"00 مليار","10000000000-count-many":"00 مليار","10000000000-count-other":"00 مليار","100000000000-count-zero":"000 مليار","100000000000-count-one":"000 مليار","100000000000-count-two":"000 مليار","100000000000-count-few":"000 مليار","100000000000-count-many":"000 مليار","100000000000-count-other":"000 مليار","1000000000000-count-zero":"0 ترليون","1000000000000-count-one":"0 ترليون","1000000000000-count-two":"0 ترليون","1000000000000-count-few":"0 ترليون","1000000000000-count-many":"0 ترليون","1000000000000-count-other":"0 ترليون","10000000000000-count-zero":"00 ترليون","10000000000000-count-one":"00 ترليون","10000000000000-count-two":"00 ترليون","10000000000000-count-few":"00 ترليون","10000000000000-count-many":"00 ترليون","10000000000000-count-other":"00 ترليون","100000000000000-count-zero":"000 ترليون","100000000000000-count-one":"000 ترليون","100000000000000-count-two":"000 ترليون","100000000000000-count-few":"000 ترليون","100000000000000-count-many":"000 ترليون","100000000000000-count-other":"000 ترليون"}},"short":{"decimalFormat":{"1000-count-zero":"0 ألف","1000-count-one":"0 ألف","1000-count-two":"0 ألف","1000-count-few":"0 آلاف","1000-count-many":"0 ألف","1000-count-other":"0 ألف","10000-count-zero":"00 ألف","10000-count-one":"00 ألف","10000-count-two":"00 ألف","10000-count-few":"00 ألف","10000-count-many":"00 ألف","10000-count-other":"00 ألف","100000-count-zero":"000 ألف","100000-count-one":"000 ألف","100000-count-two":"000 ألف","100000-count-few":"000 ألف","100000-count-many":"000 ألف","100000-count-other":"000 ألف","1000000-count-zero":"0 مليون","1000000-count-one":"0 مليون","1000000-count-two":"0 مليون","1000000-count-few":"0 مليون","1000000-count-many":"0 مليون","1000000-count-other":"0 مليون","10000000-count-zero":"00 مليون","10000000-count-one":"00 مليون","10000000-count-two":"00 مليون","10000000-count-few":"00 مليون","10000000-count-many":"00 مليون","10000000-count-other":"00 مليون","100000000-count-zero":"000 مليون","100000000-count-one":"000 مليون","100000000-count-two":"000 مليون","100000000-count-few":"000 مليون","100000000-count-many":"000 مليون","100000000-count-other":"000 مليون","1000000000-count-zero":"0 مليار","1000000000-count-one":"0 مليار","1000000000-count-two":"0 مليار","1000000000-count-few":"0 مليار","1000000000-count-many":"0 مليار","1000000000-count-other":"0 مليار","10000000000-count-zero":"00 مليار","10000000000-count-one":"00 مليار","10000000000-count-two":"00 مليار","10000000000-count-few":"00 مليار","10000000000-count-many":"00 مليار","10000000000-count-other":"00 مليار","100000000000-count-zero":"000 مليار","100000000000-count-one":"000 مليار","100000000000-count-two":"000 مليار","100000000000-count-few":"000 مليار","100000000000-count-many":"000 مليار","100000000000-count-other":"000 مليار","1000000000000-count-zero":"0 ترليون","1000000000000-count-one":"0 ترليون","1000000000000-count-two":"0 ترليون","1000000000000-count-few":"0 ترليون","1000000000000-count-many":"0 ترليون","1000000000000-count-other":"0 ترليون","10000000000000-count-zero":"00 ترليون","10000000000000-count-one":"00 ترليون","10000000000000-count-two":"00 ترليون","10000000000000-count-few":"00 ترليون","10000000000000-count-many":"00 ترليون","10000000000000-count-other":"00 ترليون","100000000000000-count-zero":"000 ترليون","100000000000000-count-one":"000 ترليون","100000000000000-count-two":"000 ترليون","100000000000000-count-few":"000 ترليون","100000000000000-count-many":"000 ترليون","100000000000000-count-other":"000 ترليون"}}},"scientificFormats-numberSystem-arab":{"standard":"#E0"},"scientificFormats-numberSystem-latn":{"standard":"#E0"},"percentFormats-numberSystem-arab":{"standard":"#,##0%"},"percentFormats-numberSystem-latn":{"standard":"#,##0%"},"currencyFormats-numberSystem-arab":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"#,##0.00 ¤","accounting":"#,##0.00 ¤","unitPattern-count-zero":"{0} {1}","unitPattern-count-one":"{0} {1}","unitPattern-count-two":"{0} {1}","unitPattern-count-few":"{0} {1}","unitPattern-count-many":"{0} {1}","unitPattern-count-other":"{0} {1}"},"currencyFormats-numberSystem-latn":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"¤ #,##0.00","accounting":"¤#,##0.00;(¤#,##0.00)","short":{"standard":{"1000-count-zero":"¤ 0 ألف","1000-count-one":"¤ 0 ألف","1000-count-two":"¤ 0 ألف","1000-count-few":"¤ 0 ألف","1000-count-many":"¤ 0 ألف","1000-count-other":"¤ 0 ألف","10000-count-zero":"¤ 00 ألف","10000-count-one":"¤ 00 ألف","10000-count-two":"¤ 00 ألف","10000-count-few":"¤ 00 ألف","10000-count-many":"¤ 00 ألف","10000-count-other":"¤ 00 ألف","100000-count-zero":"¤ 000 ألف","100000-count-one":"¤ 000 ألف","100000-count-two":"¤ 000 ألف","100000-count-few":"¤ 000 ألف","100000-count-many":"¤ 000 ألف","100000-count-other":"¤ 000 ألف","1000000-count-zero":"¤ 0 مليون","1000000-count-one":"¤ 0 مليون","1000000-count-two":"¤ 0 مليون","1000000-count-few":"¤ 0 مليون","1000000-count-many":"¤ 0 مليون","1000000-count-other":"¤ 0 مليون","10000000-count-zero":"¤ 00 مليون","10000000-count-one":"¤ 00 مليون","10000000-count-two":"¤ 00 مليون","10000000-count-few":"¤ 00 مليون","10000000-count-many":"¤ 00 مليون","10000000-count-other":"¤ 00 مليون","100000000-count-zero":"¤ 000 مليون","100000000-count-one":"¤ 000 مليون","100000000-count-two":"¤ 000 مليون","100000000-count-few":"¤ 000 مليون","100000000-count-many":"¤ 000 مليون","100000000-count-other":"¤ 000 مليون","1000000000-count-zero":"¤ 0 مليار","1000000000-count-one":"¤ 0 مليار","1000000000-count-two":"¤ 0 مليار","1000000000-count-few":"¤ 0 مليار","1000000000-count-many":"¤ 0 مليار","1000000000-count-other":"¤ 0 مليار","10000000000-count-zero":"¤ 00 مليار","10000000000-count-one":"¤ 00 مليار","10000000000-count-two":"¤ 00 مليار","10000000000-count-few":"¤ 00 مليار","10000000000-count-many":"¤ 00 مليار","10000000000-count-other":"¤ 00 مليار","100000000000-count-zero":"¤ 000 مليار","100000000000-count-one":"¤ 000 مليار","100000000000-count-two":"¤ 000 مليار","100000000000-count-few":"¤ 000 مليار","100000000000-count-many":"¤ 000 مليار","100000000000-count-other":"¤ 000 مليار","1000000000000-count-zero":"¤ 0 ترليون","1000000000000-count-one":"¤ 0 ترليون","1000000000000-count-two":"¤ 0 ترليون","1000000000000-count-few":"¤ 0 ترليون","1000000000000-count-many":"¤ 0 ترليون","1000000000000-count-other":"¤ 0 ترليون","10000000000000-count-zero":"¤ 00 ترليون","10000000000000-count-one":"¤ 00 ترليون","10000000000000-count-two":"¤ 00 ترليون","10000000000000-count-few":"¤ 00 ترليون","10000000000000-count-many":"¤ 00 ترليون","10000000000000-count-other":"¤ 00 ترليون","100000000000000-count-zero":"¤ 000 ترليون","100000000000000-count-one":"¤ 000 ترليون","100000000000000-count-two":"¤ 000 ترليون","100000000000000-count-few":"¤ 000 ترليون","100000000000000-count-many":"¤ 000 ترليون","100000000000000-count-other":"¤ 000 ترليون"}},"unitPattern-count-zero":"{0} {1}","unitPattern-count-one":"{0} {1}","unitPattern-count-two":"{0} {1}","unitPattern-count-few":"{0} {1}","unitPattern-count-many":"{0} {1}","unitPattern-count-other":"{0} {1}"},"miscPatterns-numberSystem-arab":{"atLeast":"+{0}","range":"{0}–{1}"},"miscPatterns-numberSystem-latn":{"atLeast":"+{0}","range":"{0}–{1}"},"minimalPairs":{"pluralMinimalPairs-count-zero":"{0} كتاب","pluralMinimalPairs-count-one":"ولد واحد حضر","pluralMinimalPairs-count-two":"ولدان حضرا","pluralMinimalPairs-count-few":"{0} أولاد حضروا","pluralMinimalPairs-count-many":"{0} ولدًا حضروا","pluralMinimalPairs-count-other":"{0} ولد حضروا","other":"اتجه إلى المنعطف الـ {0} يمينًا."}}},"ja":{"identity":{"version":{"_number":"$Revision: 13920 $","_cldrVersion":"33"},"language":"ja"},"dates":{"calendars":{"gregorian":{"months":{"format":{"abbreviated":{"1":"1月","2":"2月","3":"3月","4":"4月","5":"5月","6":"6月","7":"7月","8":"8月","9":"9月","10":"10月","11":"11月","12":"12月"},"narrow":{"1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","10":"10","11":"11","12":"12"},"wide":{"1":"1月","2":"2月","3":"3月","4":"4月","5":"5月","6":"6月","7":"7月","8":"8月","9":"9月","10":"10月","11":"11月","12":"12月"}},"stand-alone":{"abbreviated":{"1":"1月","2":"2月","3":"3月","4":"4月","5":"5月","6":"6月","7":"7月","8":"8月","9":"9月","10":"10月","11":"11月","12":"12月"},"narrow":{"1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","10":"10","11":"11","12":"12"},"wide":{"1":"1月","2":"2月","3":"3月","4":"4月","5":"5月","6":"6月","7":"7月","8":"8月","9":"9月","10":"10月","11":"11月","12":"12月"}}},"days":{"format":{"abbreviated":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"narrow":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"short":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"wide":{"sun":"日曜日","mon":"月曜日","tue":"火曜日","wed":"水曜日","thu":"木曜日","fri":"金曜日","sat":"土曜日"}},"stand-alone":{"abbreviated":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"narrow":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"short":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"wide":{"sun":"日曜日","mon":"月曜日","tue":"火曜日","wed":"水曜日","thu":"木曜日","fri":"金曜日","sat":"土曜日"}}},"quarters":{"format":{"abbreviated":{"1":"Q1","2":"Q2","3":"Q3","4":"Q4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"第1四半期","2":"第2四半期","3":"第3四半期","4":"第4四半期"}},"stand-alone":{"abbreviated":{"1":"Q1","2":"Q2","3":"Q3","4":"Q4"},"narrow":{"1":"1","2":"2","3":"3","4":"4"},"wide":{"1":"第1四半期","2":"第2四半期","3":"第3四半期","4":"第4四半期"}}},"dayPeriods":{"format":{"abbreviated":{"midnight":"真夜中","am":"午前","noon":"正午","pm":"午後","morning1":"朝","afternoon1":"昼","evening1":"夕方","night1":"夜","night2":"夜中"},"narrow":{"midnight":"真夜中","am":"午前","noon":"正午","pm":"午後","morning1":"朝","afternoon1":"昼","evening1":"夕方","night1":"夜","night2":"夜中"},"wide":{"midnight":"真夜中","am":"午前","noon":"正午","pm":"午後","morning1":"朝","afternoon1":"昼","evening1":"夕方","night1":"夜","night2":"夜中"}},"stand-alone":{"abbreviated":{"midnight":"真夜中","am":"午前","noon":"正午","pm":"午後","morning1":"朝","afternoon1":"昼","evening1":"夕方","night1":"夜","night2":"夜中"},"narrow":{"midnight":"真夜中","am":"午前","noon":"正午","pm":"午後","morning1":"朝","afternoon1":"昼","evening1":"夕方","night1":"夜","night2":"夜中"},"wide":{"midnight":"真夜中","am":"午前","noon":"正午","pm":"午後","morning1":"朝","afternoon1":"昼","evening1":"夕方","night1":"夜","night2":"夜中"}}},"eras":{"eraNames":{"0":"紀元前","1":"西暦","0-alt-variant":"西暦紀元前","1-alt-variant":"西暦紀元"},"eraAbbr":{"0":"紀元前","1":"西暦","0-alt-variant":"西暦紀元前","1-alt-variant":"西暦紀元"},"eraNarrow":{"0":"BC","1":"AD","0-alt-variant":"BCE","1-alt-variant":"CE"}},"dateFormats":{"full":"y年M月d日EEEE","long":"y年M月d日","medium":"y/MM/dd","short":"y/MM/dd"},"timeFormats":{"full":"H時mm分ss秒 zzzz","long":"H:mm:ss z","medium":"H:mm:ss","short":"H:mm"},"dateTimeFormats":{"full":"{1} {0}","long":"{1} {0}","medium":"{1} {0}","short":"{1} {0}","availableFormats":{"Bh":"BK時","Bhm":"BK:mm","Bhms":"BK:mm:ss","d":"d日","E":"ccc","EBhm":"BK:mm (E)","EBhms":"BK:mm:ss (E)","Ed":"d日(E)","EEEEd":"d日EEEE","Ehm":"aK:mm (E)","EHm":"H:mm (E)","Ehms":"aK:mm:ss (E)","EHms":"H:mm:ss (E)","Gy":"Gy年","GyMMM":"Gy年M月","GyMMMd":"Gy年M月d日","GyMMMEd":"Gy年M月d日(E)","GyMMMEEEEd":"Gy年M月d日EEEE","h":"aK時","H":"H時","hm":"aK:mm","Hm":"H:mm","hms":"aK:mm:ss","Hms":"H:mm:ss","hmsv":"aK:mm:ss v","Hmsv":"H:mm:ss v","hmv":"aK:mm v","Hmv":"H:mm v","M":"M月","Md":"M/d","MEd":"M/d(E)","MEEEEd":"M/dEEEE","MMM":"M月","MMMd":"M月d日","MMMEd":"M月d日(E)","MMMEEEEd":"M月d日EEEE","MMMMd":"M月d日","MMMMW-count-other":"M月第W週","ms":"mm:ss","y":"y年","yM":"y/M","yMd":"y/M/d","yMEd":"y/M/d(E)","yMEEEEd":"y/M/dEEEE","yMM":"y/MM","yMMM":"y年M月","yMMMd":"y年M月d日","yMMMEd":"y年M月d日(E)","yMMMEEEEd":"y年M月d日EEEE","yMMMM":"y年M月","yQQQ":"y/QQQ","yQQQQ":"y年QQQQ","yw-count-other":"Y年第w週"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{1} {0}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{1} {0}"},"intervalFormats":{"intervalFormatFallback":"{0}～{1}","d":{"d":"d日～d日"},"h":{"a":"aK時～aK時","h":"aK時～K時"},"H":{"H":"H時～H時"},"hm":{"a":"aK時mm分～aK時mm分","h":"aK時mm分～K時mm分","m":"aK時mm分～K時mm分"},"Hm":{"H":"H時mm分～H時mm分","m":"H時mm分～H時mm分"},"hmv":{"a":"aK時mm分～aK時mm分(v)","h":"aK時mm分～K時mm分(v)","m":"aK時mm分～K時mm分(v)"},"Hmv":{"H":"H時mm分～H時mm分(v)","m":"H時mm分～H時mm分(v)"},"hv":{"a":"aK時～aK時(v)","h":"aK時～K時(v)"},"Hv":{"H":"H時～H時(v)"},"M":{"M":"M月～M月"},"Md":{"d":"MM/dd～MM/dd","M":"MM/dd～MM/dd"},"MEd":{"d":"MM/dd(E)～MM/dd(E)","M":"MM/dd(E)～MM/dd(E)"},"MMM":{"M":"M月～M月"},"MMMd":{"d":"M月d日～d日","M":"M月d日～M月d日"},"MMMEd":{"d":"M月d日(E)～d日(E)","M":"M月d日(E)～M月d日(E)"},"MMMM":{"M":"M月～M月"},"y":{"y":"y年～y年"},"yM":{"M":"y/MM～y/MM","y":"y/MM～y/MM"},"yMd":{"d":"y/MM/dd～y/MM/dd","M":"y/MM/dd～y/MM/dd","y":"y/MM/dd～y/MM/dd"},"yMEd":{"d":"y/MM/dd(E)～y/MM/dd(E)","M":"y/MM/dd(E)～y/MM/dd(E)","y":"y/MM/dd(E)～y/MM/dd(E)"},"yMMM":{"M":"y年M月～M月","y":"y年M月～y年M月"},"yMMMd":{"d":"y年M月d日～d日","M":"y年M月d日～M月d日","y":"y年M月d日～y年M月d日"},"yMMMEd":{"d":"y年M月d日(E)～d日(E)","M":"y年M月d日(E)～M月d日(E)","y":"y年M月d日(E)～y年M月d日(E)"},"yMMMM":{"M":"y年M月～M月","y":"y年M月～y年M月"}}}}},"fields":{"era":{"displayName":"時代"},"era-short":{"displayName":"時代"},"era-narrow":{"displayName":"時代"},"year":{"displayName":"年","relative-type--1":"昨年","relative-type-0":"今年","relative-type-1":"翌年","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 年後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 年前"}},"year-short":{"displayName":"年","relative-type--1":"昨年","relative-type-0":"今年","relative-type-1":"翌年","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 年後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 年前"}},"year-narrow":{"displayName":"年","relative-type--1":"昨年","relative-type-0":"今年","relative-type-1":"翌年","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}年後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}年前"}},"quarter":{"displayName":"四半期","relative-type--1":"前四半期","relative-type-0":"今四半期","relative-type-1":"翌四半期","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 四半期後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 四半期前"}},"quarter-short":{"displayName":"四半期","relative-type--1":"前四半期","relative-type-0":"今四半期","relative-type-1":"翌四半期","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 四半期後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 四半期前"}},"quarter-narrow":{"displayName":"四半期","relative-type--1":"前四半期","relative-type-0":"今四半期","relative-type-1":"翌四半期","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}四半期後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}四半期前"}},"month":{"displayName":"月","relative-type--1":"先月","relative-type-0":"今月","relative-type-1":"翌月","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} か月後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} か月前"}},"month-short":{"displayName":"月","relative-type--1":"先月","relative-type-0":"今月","relative-type-1":"翌月","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} か月後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} か月前"}},"month-narrow":{"displayName":"月","relative-type--1":"先月","relative-type-0":"今月","relative-type-1":"翌月","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}か月後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}か月前"}},"week":{"displayName":"週","relative-type--1":"先週","relative-type-0":"今週","relative-type-1":"翌週","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 週間後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 週間前"},"relativePeriod":"{0} 日の週"},"week-short":{"displayName":"週","relative-type--1":"先週","relative-type-0":"今週","relative-type-1":"翌週","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 週間後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 週間前"},"relativePeriod":"{0} 日の週"},"week-narrow":{"displayName":"週","relative-type--1":"先週","relative-type-0":"今週","relative-type-1":"翌週","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}週間後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}週間前"},"relativePeriod":"{0}日の週"},"weekOfMonth":{"displayName":"月の週番号"},"weekOfMonth-short":{"displayName":"月の週番号"},"weekOfMonth-narrow":{"displayName":"月の週番号"},"day":{"displayName":"日","relative-type--2":"一昨日","relative-type--1":"昨日","relative-type-0":"今日","relative-type-1":"明日","relative-type-2":"明後日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 日後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 日前"}},"day-short":{"displayName":"日","relative-type--2":"一昨日","relative-type--1":"昨日","relative-type-0":"今日","relative-type-1":"明日","relative-type-2":"明後日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 日後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 日前"}},"day-narrow":{"displayName":"日","relative-type--2":"一昨日","relative-type--1":"昨日","relative-type-0":"今日","relative-type-1":"明日","relative-type-2":"明後日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}日後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}日前"}},"dayOfYear":{"displayName":"年の通日"},"dayOfYear-short":{"displayName":"年の通日"},"dayOfYear-narrow":{"displayName":"通日"},"weekday":{"displayName":"曜日"},"weekday-short":{"displayName":"曜日"},"weekday-narrow":{"displayName":"曜日"},"weekdayOfMonth":{"displayName":"月の曜日番号"},"weekdayOfMonth-short":{"displayName":"月の曜日番号"},"weekdayOfMonth-narrow":{"displayName":"月の曜日番号"},"sun":{"relative-type--1":"先週の日曜日","relative-type-0":"今週の日曜日","relative-type-1":"来週の日曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の日曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の日曜日"}},"sun-short":{"relative-type--1":"先週の日曜","relative-type-0":"今週の日曜","relative-type-1":"来週の日曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の日曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の日曜"}},"sun-narrow":{"relative-type--1":"先週の日曜","relative-type-0":"今週の日曜","relative-type-1":"来週の日曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の日曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の日曜"}},"mon":{"relative-type--1":"先週の月曜日","relative-type-0":"今週の月曜日","relative-type-1":"来週の月曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の月曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の月曜日"}},"mon-short":{"relative-type--1":"先週の月曜","relative-type-0":"今週の月曜","relative-type-1":"来週の月曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の月曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の月曜"}},"mon-narrow":{"relative-type--1":"先週の月曜","relative-type-0":"今週の月曜","relative-type-1":"来週の月曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の月曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の月曜"}},"tue":{"relative-type--1":"先週の火曜日","relative-type-0":"今週の火曜日","relative-type-1":"来週の火曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の火曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の火曜日"}},"tue-short":{"relative-type--1":"先週の火曜","relative-type-0":"今週の火曜","relative-type-1":"来週の火曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の火曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の火曜"}},"tue-narrow":{"relative-type--1":"先週の火曜","relative-type-0":"今週の火曜","relative-type-1":"来週の火曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の火曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の火曜"}},"wed":{"relative-type--1":"先週の水曜日","relative-type-0":"今週の水曜日","relative-type-1":"来週の水曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の水曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の水曜日"}},"wed-short":{"relative-type--1":"先週の水曜","relative-type-0":"今週の水曜","relative-type-1":"来週の水曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の水曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の水曜"}},"wed-narrow":{"relative-type--1":"先週の水曜","relative-type-0":"今週の水曜","relative-type-1":"来週の水曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の水曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の水曜"}},"thu":{"relative-type--1":"先週の木曜日","relative-type-0":"今週の木曜日","relative-type-1":"来週の木曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の木曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の木曜日"}},"thu-short":{"relative-type--1":"先週の木曜","relative-type-0":"今週の木曜","relative-type-1":"来週の木曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の木曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の木曜"}},"thu-narrow":{"relative-type--1":"先週の木曜","relative-type-0":"今週の木曜","relative-type-1":"来週の木曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の木曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の木曜"}},"fri":{"relative-type--1":"先週の金曜日","relative-type-0":"今週の金曜日","relative-type-1":"来週の金曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の金曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の金曜日"}},"fri-short":{"relative-type--1":"先週の金曜","relative-type-0":"今週の金曜","relative-type-1":"来週の金曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の金曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の金曜"}},"fri-narrow":{"relative-type--1":"先週の金曜","relative-type-0":"今週の金曜","relative-type-1":"来週の金曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の金曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の金曜"}},"sat":{"relative-type--1":"先週の土曜日","relative-type-0":"今週の土曜日","relative-type-1":"来週の土曜日","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の土曜日"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の土曜日"}},"sat-short":{"relative-type--1":"先週の土曜","relative-type-0":"今週の土曜","relative-type-1":"来週の土曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 個後の土曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 個前の土曜"}},"sat-narrow":{"relative-type--1":"先週の土曜","relative-type-0":"今週の土曜","relative-type-1":"来週の土曜","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}個後の土曜"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}個前の土曜"}},"dayperiod-short":{"displayName":"午前/午後"},"dayperiod":{"displayName":"午前/午後"},"dayperiod-narrow":{"displayName":"午前/午後"},"hour":{"displayName":"時","relative-type-0":"1 時間以内","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 時間後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 時間前"}},"hour-short":{"displayName":"時","relative-type-0":"1 時間以内","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 時間後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 時間前"}},"hour-narrow":{"displayName":"時","relative-type-0":"1 時間以内","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}時間後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}時間前"}},"minute":{"displayName":"分","relative-type-0":"1 分以内","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 分後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 分前"}},"minute-short":{"displayName":"分","relative-type-0":"1 分以内","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 分後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 分前"}},"minute-narrow":{"displayName":"分","relative-type-0":"1 分以内","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}分後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}分前"}},"second":{"displayName":"秒","relative-type-0":"今","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 秒後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 秒前"}},"second-short":{"displayName":"秒","relative-type-0":"今","relativeTime-type-future":{"relativeTimePattern-count-other":"{0} 秒後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0} 秒前"}},"second-narrow":{"displayName":"秒","relative-type-0":"今","relativeTime-type-future":{"relativeTimePattern-count-other":"{0}秒後"},"relativeTime-type-past":{"relativeTimePattern-count-other":"{0}秒前"}},"zone":{"displayName":"タイムゾーン"},"zone-short":{"displayName":"タイムゾーン"},"zone-narrow":{"displayName":"タイムゾーン"}},"timeZoneNames":{"hourFormat":"+HH:mm;-HH:mm","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","regionFormat":"{0}時間","regionFormat-type-daylight":"{0}夏時間","regionFormat-type-standard":"{0}標準時","fallbackFormat":"{1}（{0}）","zone":{"America":{"Adak":{"exemplarCity":"アダック"},"Anchorage":{"exemplarCity":"アンカレッジ"},"Anguilla":{"exemplarCity":"アンギラ"},"Antigua":{"exemplarCity":"アンティグア"},"Araguaina":{"exemplarCity":"アラグァイナ"},"Argentina":{"Rio_Gallegos":{"exemplarCity":"リオガジェゴス"},"San_Juan":{"exemplarCity":"サンファン"},"Ushuaia":{"exemplarCity":"ウシュアイア"},"La_Rioja":{"exemplarCity":"ラリオハ"},"San_Luis":{"exemplarCity":"サンルイス"},"Salta":{"exemplarCity":"サルタ"},"Tucuman":{"exemplarCity":"トゥクマン"}},"Aruba":{"exemplarCity":"アルバ"},"Asuncion":{"exemplarCity":"アスンシオン"},"Bahia":{"exemplarCity":"バイーア"},"Bahia_Banderas":{"exemplarCity":"バイアバンデラ"},"Barbados":{"exemplarCity":"バルバドス"},"Belem":{"exemplarCity":"ベレン"},"Belize":{"exemplarCity":"ベリーズ"},"Blanc-Sablon":{"exemplarCity":"ブラン・サブロン"},"Boa_Vista":{"exemplarCity":"ボアビスタ"},"Bogota":{"exemplarCity":"ボゴタ"},"Boise":{"exemplarCity":"ボイシ"},"Buenos_Aires":{"exemplarCity":"ブエノスアイレス"},"Cambridge_Bay":{"exemplarCity":"ケンブリッジベイ"},"Campo_Grande":{"exemplarCity":"カンポグランデ"},"Cancun":{"exemplarCity":"カンクン"},"Caracas":{"exemplarCity":"カラカス"},"Catamarca":{"exemplarCity":"カタマルカ"},"Cayenne":{"exemplarCity":"カイエンヌ"},"Cayman":{"exemplarCity":"ケイマン"},"Chicago":{"exemplarCity":"シカゴ"},"Chihuahua":{"exemplarCity":"チワワ"},"Coral_Harbour":{"exemplarCity":"アティコカン"},"Cordoba":{"exemplarCity":"コルドバ"},"Costa_Rica":{"exemplarCity":"コスタリカ"},"Creston":{"exemplarCity":"クレストン"},"Cuiaba":{"exemplarCity":"クイアバ"},"Curacao":{"exemplarCity":"キュラソー"},"Danmarkshavn":{"exemplarCity":"デンマークシャウン"},"Dawson":{"exemplarCity":"ドーソン"},"Dawson_Creek":{"exemplarCity":"ドーソンクリーク"},"Denver":{"exemplarCity":"デンバー"},"Detroit":{"exemplarCity":"デトロイト"},"Dominica":{"exemplarCity":"ドミニカ"},"Edmonton":{"exemplarCity":"エドモントン"},"Eirunepe":{"exemplarCity":"エイルネペ"},"El_Salvador":{"exemplarCity":"エルサルバドル"},"Fort_Nelson":{"exemplarCity":"フォートネルソン"},"Fortaleza":{"exemplarCity":"フォルタレザ"},"Glace_Bay":{"exemplarCity":"グレースベイ"},"Godthab":{"exemplarCity":"ヌーク"},"Goose_Bay":{"exemplarCity":"グースベイ"},"Grand_Turk":{"exemplarCity":"グランドターク"},"Grenada":{"exemplarCity":"グレナダ"},"Guadeloupe":{"exemplarCity":"グアドループ"},"Guatemala":{"exemplarCity":"グアテマラ"},"Guayaquil":{"exemplarCity":"グアヤキル"},"Guyana":{"exemplarCity":"ガイアナ"},"Halifax":{"exemplarCity":"ハリファクス"},"Havana":{"exemplarCity":"ハバナ"},"Hermosillo":{"exemplarCity":"エルモシヨ"},"Indiana":{"Vincennes":{"exemplarCity":"インディアナ州ビンセンス"},"Petersburg":{"exemplarCity":"インディアナ州ピーターズバーグ"},"Tell_City":{"exemplarCity":"インディアナ州テルシティ"},"Knox":{"exemplarCity":"インディアナ州ノックス"},"Winamac":{"exemplarCity":"インディアナ州ウィナマック"},"Marengo":{"exemplarCity":"インディアナ州マレンゴ"},"Vevay":{"exemplarCity":"インディアナ州ビベー"}},"Indianapolis":{"exemplarCity":"インディアナポリス"},"Inuvik":{"exemplarCity":"イヌヴィク"},"Iqaluit":{"exemplarCity":"イカルイット"},"Jamaica":{"exemplarCity":"ジャマイカ"},"Jujuy":{"exemplarCity":"フフイ"},"Juneau":{"exemplarCity":"ジュノー"},"Kentucky":{"Monticello":{"exemplarCity":"ケンタッキー州モンティチェロ"}},"Kralendijk":{"exemplarCity":"クラレンダイク"},"La_Paz":{"exemplarCity":"ラパス"},"Lima":{"exemplarCity":"リマ"},"Los_Angeles":{"exemplarCity":"ロサンゼルス"},"Louisville":{"exemplarCity":"ルイビル"},"Lower_Princes":{"exemplarCity":"ローワー・プリンセズ・クウォーター"},"Maceio":{"exemplarCity":"マセイオ"},"Managua":{"exemplarCity":"マナグア"},"Manaus":{"exemplarCity":"マナウス"},"Marigot":{"exemplarCity":"マリゴ"},"Martinique":{"exemplarCity":"マルティニーク"},"Matamoros":{"exemplarCity":"マタモロス"},"Mazatlan":{"exemplarCity":"マサトラン"},"Mendoza":{"exemplarCity":"メンドーサ"},"Menominee":{"exemplarCity":"メノミニー"},"Merida":{"exemplarCity":"メリダ"},"Metlakatla":{"exemplarCity":"メトラカトラ"},"Mexico_City":{"exemplarCity":"メキシコシティー"},"Miquelon":{"exemplarCity":"ミクロン島"},"Moncton":{"exemplarCity":"モンクトン"},"Monterrey":{"exemplarCity":"モンテレイ"},"Montevideo":{"exemplarCity":"モンテビデオ"},"Montserrat":{"exemplarCity":"モントセラト"},"Nassau":{"exemplarCity":"ナッソー"},"New_York":{"exemplarCity":"ニューヨーク"},"Nipigon":{"exemplarCity":"ニピゴン"},"Nome":{"exemplarCity":"ノーム"},"Noronha":{"exemplarCity":"ノローニャ"},"North_Dakota":{"Beulah":{"exemplarCity":"ノースダコタ州ビューラー"},"New_Salem":{"exemplarCity":"ノースダコタ州ニューセーラム"},"Center":{"exemplarCity":"ノースダコタ州センター"}},"Ojinaga":{"exemplarCity":"オヒナガ"},"Panama":{"exemplarCity":"パナマ"},"Pangnirtung":{"exemplarCity":"パンナータング"},"Paramaribo":{"exemplarCity":"パラマリボ"},"Phoenix":{"exemplarCity":"フェニックス"},"Port-au-Prince":{"exemplarCity":"ポルトープランス"},"Port_of_Spain":{"exemplarCity":"ポートオブスペイン"},"Porto_Velho":{"exemplarCity":"ポルトベーリョ"},"Puerto_Rico":{"exemplarCity":"プエルトリコ"},"Punta_Arenas":{"exemplarCity":"プンタアレナス"},"Rainy_River":{"exemplarCity":"レイニーリバー"},"Rankin_Inlet":{"exemplarCity":"ランキンインレット"},"Recife":{"exemplarCity":"レシフェ"},"Regina":{"exemplarCity":"レジャイナ"},"Resolute":{"exemplarCity":"レゾリュート"},"Rio_Branco":{"exemplarCity":"リオブランコ"},"Santa_Isabel":{"exemplarCity":"サンタイサベル"},"Santarem":{"exemplarCity":"サンタレム"},"Santiago":{"exemplarCity":"サンチアゴ"},"Santo_Domingo":{"exemplarCity":"サントドミンゴ"},"Sao_Paulo":{"exemplarCity":"サンパウロ"},"Scoresbysund":{"exemplarCity":"イトコルトルミット"},"Sitka":{"exemplarCity":"シトカ"},"St_Barthelemy":{"exemplarCity":"サン・バルテルミー"},"St_Johns":{"exemplarCity":"セントジョンズ"},"St_Kitts":{"exemplarCity":"セントキッツ"},"St_Lucia":{"exemplarCity":"セントルシア"},"St_Thomas":{"exemplarCity":"セントトーマス"},"St_Vincent":{"exemplarCity":"セントビンセント"},"Swift_Current":{"exemplarCity":"スウィフトカレント"},"Tegucigalpa":{"exemplarCity":"テグシガルパ"},"Thule":{"exemplarCity":"チューレ"},"Thunder_Bay":{"exemplarCity":"サンダーベイ"},"Tijuana":{"exemplarCity":"ティフアナ"},"Toronto":{"exemplarCity":"トロント"},"Tortola":{"exemplarCity":"トルトーラ"},"Vancouver":{"exemplarCity":"バンクーバー"},"Whitehorse":{"exemplarCity":"ホワイトホース"},"Winnipeg":{"exemplarCity":"ウィニペグ"},"Yakutat":{"exemplarCity":"ヤクタット"},"Yellowknife":{"exemplarCity":"イエローナイフ"}},"Atlantic":{"Azores":{"exemplarCity":"アゾレス"},"Bermuda":{"exemplarCity":"バミューダ"},"Canary":{"exemplarCity":"カナリア"},"Cape_Verde":{"exemplarCity":"カーボベルデ"},"Faeroe":{"exemplarCity":"フェロー"},"Madeira":{"exemplarCity":"マデイラ"},"Reykjavik":{"exemplarCity":"レイキャビク"},"South_Georgia":{"exemplarCity":"サウスジョージア"},"St_Helena":{"exemplarCity":"セントヘレナ"},"Stanley":{"exemplarCity":"スタンレー"}},"Europe":{"Amsterdam":{"exemplarCity":"アムステルダム"},"Andorra":{"exemplarCity":"アンドラ"},"Astrakhan":{"exemplarCity":"アストラハン"},"Athens":{"exemplarCity":"アテネ"},"Belgrade":{"exemplarCity":"ベオグラード"},"Berlin":{"exemplarCity":"ベルリン"},"Bratislava":{"exemplarCity":"ブラチスラバ"},"Brussels":{"exemplarCity":"ブリュッセル"},"Bucharest":{"exemplarCity":"ブカレスト"},"Budapest":{"exemplarCity":"ブダペスト"},"Busingen":{"exemplarCity":"ビュージンゲン"},"Chisinau":{"exemplarCity":"キシナウ"},"Copenhagen":{"exemplarCity":"コペンハーゲン"},"Dublin":{"long":{"daylight":"アイルランド標準時"},"exemplarCity":"ダブリン"},"Gibraltar":{"exemplarCity":"ジブラルタル"},"Guernsey":{"exemplarCity":"ガーンジー"},"Helsinki":{"exemplarCity":"ヘルシンキ"},"Isle_of_Man":{"exemplarCity":"マン島"},"Istanbul":{"exemplarCity":"イスタンブール"},"Jersey":{"exemplarCity":"ジャージー"},"Kaliningrad":{"exemplarCity":"カリーニングラード"},"Kiev":{"exemplarCity":"キエフ"},"Kirov":{"exemplarCity":"キーロフ"},"Lisbon":{"exemplarCity":"リスボン"},"Ljubljana":{"exemplarCity":"リュブリャナ"},"London":{"long":{"daylight":"英国夏時間"},"exemplarCity":"ロンドン"},"Luxembourg":{"exemplarCity":"ルクセンブルク"},"Madrid":{"exemplarCity":"マドリード"},"Malta":{"exemplarCity":"マルタ"},"Mariehamn":{"exemplarCity":"マリエハムン"},"Minsk":{"exemplarCity":"ミンスク"},"Monaco":{"exemplarCity":"モナコ"},"Moscow":{"exemplarCity":"モスクワ"},"Oslo":{"exemplarCity":"オスロ"},"Paris":{"exemplarCity":"パリ"},"Podgorica":{"exemplarCity":"ポドゴリツァ"},"Prague":{"exemplarCity":"プラハ"},"Riga":{"exemplarCity":"リガ"},"Rome":{"exemplarCity":"ローマ"},"Samara":{"exemplarCity":"サマラ"},"San_Marino":{"exemplarCity":"サンマリノ"},"Sarajevo":{"exemplarCity":"サラエボ"},"Saratov":{"exemplarCity":"サラトフ"},"Simferopol":{"exemplarCity":"シンフェロポリ"},"Skopje":{"exemplarCity":"スコピエ"},"Sofia":{"exemplarCity":"ソフィア"},"Stockholm":{"exemplarCity":"ストックホルム"},"Tallinn":{"exemplarCity":"タリン"},"Tirane":{"exemplarCity":"ティラナ"},"Ulyanovsk":{"exemplarCity":"ウリヤノフスク"},"Uzhgorod":{"exemplarCity":"ウージュホロド"},"Vaduz":{"exemplarCity":"ファドゥーツ"},"Vatican":{"exemplarCity":"バチカン"},"Vienna":{"exemplarCity":"ウィーン"},"Vilnius":{"exemplarCity":"ヴィリニュス"},"Volgograd":{"exemplarCity":"ボルゴグラード"},"Warsaw":{"exemplarCity":"ワルシャワ"},"Zagreb":{"exemplarCity":"ザグレブ"},"Zaporozhye":{"exemplarCity":"ザポリージャ"},"Zurich":{"exemplarCity":"チューリッヒ"}},"Africa":{"Abidjan":{"exemplarCity":"アビジャン"},"Accra":{"exemplarCity":"アクラ"},"Addis_Ababa":{"exemplarCity":"アジスアベバ"},"Algiers":{"exemplarCity":"アルジェ"},"Asmera":{"exemplarCity":"アスマラ"},"Bamako":{"exemplarCity":"バマコ"},"Bangui":{"exemplarCity":"バンギ"},"Banjul":{"exemplarCity":"バンジュール"},"Bissau":{"exemplarCity":"ビサウ"},"Blantyre":{"exemplarCity":"ブランタイヤ"},"Brazzaville":{"exemplarCity":"ブラザビル"},"Bujumbura":{"exemplarCity":"ブジュンブラ"},"Cairo":{"exemplarCity":"カイロ"},"Casablanca":{"exemplarCity":"カサブランカ"},"Ceuta":{"exemplarCity":"セウタ"},"Conakry":{"exemplarCity":"コナクリ"},"Dakar":{"exemplarCity":"ダカール"},"Dar_es_Salaam":{"exemplarCity":"ダルエスサラーム"},"Djibouti":{"exemplarCity":"ジブチ"},"Douala":{"exemplarCity":"ドゥアラ"},"El_Aaiun":{"exemplarCity":"アイウン"},"Freetown":{"exemplarCity":"フリータウン"},"Gaborone":{"exemplarCity":"ハボローネ"},"Harare":{"exemplarCity":"ハラレ"},"Johannesburg":{"exemplarCity":"ヨハネスブルグ"},"Juba":{"exemplarCity":"ジュバ"},"Kampala":{"exemplarCity":"カンパラ"},"Khartoum":{"exemplarCity":"ハルツーム"},"Kigali":{"exemplarCity":"キガリ"},"Kinshasa":{"exemplarCity":"キンシャサ"},"Lagos":{"exemplarCity":"ラゴス"},"Libreville":{"exemplarCity":"リーブルヴィル"},"Lome":{"exemplarCity":"ロメ"},"Luanda":{"exemplarCity":"ルアンダ"},"Lubumbashi":{"exemplarCity":"ルブンバシ"},"Lusaka":{"exemplarCity":"ルサカ"},"Malabo":{"exemplarCity":"マラボ"},"Maputo":{"exemplarCity":"マプト"},"Maseru":{"exemplarCity":"マセル"},"Mbabane":{"exemplarCity":"ムババーネ"},"Mogadishu":{"exemplarCity":"モガディシオ"},"Monrovia":{"exemplarCity":"モンロビア"},"Nairobi":{"exemplarCity":"ナイロビ"},"Ndjamena":{"exemplarCity":"ンジャメナ"},"Niamey":{"exemplarCity":"ニアメ"},"Nouakchott":{"exemplarCity":"ヌアクショット"},"Ouagadougou":{"exemplarCity":"ワガドゥグー"},"Porto-Novo":{"exemplarCity":"ポルトノボ"},"Sao_Tome":{"exemplarCity":"サントメ"},"Tripoli":{"exemplarCity":"トリポリ"},"Tunis":{"exemplarCity":"チュニス"},"Windhoek":{"exemplarCity":"ウィントフック"}},"Asia":{"Aden":{"exemplarCity":"アデン"},"Almaty":{"exemplarCity":"アルマトイ"},"Amman":{"exemplarCity":"アンマン"},"Anadyr":{"exemplarCity":"アナディリ"},"Aqtau":{"exemplarCity":"アクタウ"},"Aqtobe":{"exemplarCity":"アクトベ"},"Ashgabat":{"exemplarCity":"アシガバード"},"Atyrau":{"exemplarCity":"アティラウ"},"Baghdad":{"exemplarCity":"バグダッド"},"Bahrain":{"exemplarCity":"バーレーン"},"Baku":{"exemplarCity":"バクー"},"Bangkok":{"exemplarCity":"バンコク"},"Barnaul":{"exemplarCity":"バルナウル"},"Beirut":{"exemplarCity":"ベイルート"},"Bishkek":{"exemplarCity":"ビシュケク"},"Brunei":{"exemplarCity":"ブルネイ"},"Calcutta":{"exemplarCity":"コルカタ"},"Chita":{"exemplarCity":"チタ"},"Choibalsan":{"exemplarCity":"チョイバルサン"},"Colombo":{"exemplarCity":"コロンボ"},"Damascus":{"exemplarCity":"ダマスカス"},"Dhaka":{"exemplarCity":"ダッカ"},"Dili":{"exemplarCity":"ディリ"},"Dubai":{"exemplarCity":"ドバイ"},"Dushanbe":{"exemplarCity":"ドゥシャンベ"},"Famagusta":{"exemplarCity":"ファマグスタ"},"Gaza":{"exemplarCity":"ガザ"},"Hebron":{"exemplarCity":"ヘブロン"},"Hong_Kong":{"exemplarCity":"香港"},"Hovd":{"exemplarCity":"ホブド"},"Irkutsk":{"exemplarCity":"イルクーツク"},"Jakarta":{"exemplarCity":"ジャカルタ"},"Jayapura":{"exemplarCity":"ジャヤプラ"},"Jerusalem":{"exemplarCity":"エルサレム"},"Kabul":{"exemplarCity":"カブール"},"Kamchatka":{"exemplarCity":"カムチャッカ"},"Karachi":{"exemplarCity":"カラチ"},"Katmandu":{"exemplarCity":"カトマンズ"},"Khandyga":{"exemplarCity":"ハンドゥイガ"},"Krasnoyarsk":{"exemplarCity":"クラスノヤルスク"},"Kuala_Lumpur":{"exemplarCity":"クアラルンプール"},"Kuching":{"exemplarCity":"クチン"},"Kuwait":{"exemplarCity":"クウェート"},"Macau":{"exemplarCity":"マカオ"},"Magadan":{"exemplarCity":"マガダン"},"Makassar":{"exemplarCity":"マカッサル"},"Manila":{"exemplarCity":"マニラ"},"Muscat":{"exemplarCity":"マスカット"},"Nicosia":{"exemplarCity":"ニコシア"},"Novokuznetsk":{"exemplarCity":"ノヴォクズネツク"},"Novosibirsk":{"exemplarCity":"ノヴォシビルスク"},"Omsk":{"exemplarCity":"オムスク"},"Oral":{"exemplarCity":"オラル"},"Phnom_Penh":{"exemplarCity":"プノンペン"},"Pontianak":{"exemplarCity":"ポンティアナック"},"Pyongyang":{"exemplarCity":"平壌"},"Qatar":{"exemplarCity":"カタール"},"Qyzylorda":{"exemplarCity":"クズロルダ"},"Rangoon":{"exemplarCity":"ヤンゴン"},"Riyadh":{"exemplarCity":"リヤド"},"Saigon":{"exemplarCity":"ホーチミン"},"Sakhalin":{"exemplarCity":"サハリン"},"Samarkand":{"exemplarCity":"サマルカンド"},"Seoul":{"exemplarCity":"ソウル"},"Shanghai":{"exemplarCity":"上海"},"Singapore":{"exemplarCity":"シンガポール"},"Srednekolymsk":{"exemplarCity":"スレドネコリムスク"},"Taipei":{"exemplarCity":"台北"},"Tashkent":{"exemplarCity":"タシケント"},"Tbilisi":{"exemplarCity":"トビリシ"},"Tehran":{"exemplarCity":"テヘラン"},"Thimphu":{"exemplarCity":"ティンプー"},"Tokyo":{"exemplarCity":"東京"},"Tomsk":{"exemplarCity":"トムスク"},"Ulaanbaatar":{"exemplarCity":"ウランバートル"},"Urumqi":{"exemplarCity":"ウルムチ"},"Ust-Nera":{"exemplarCity":"ウスチネラ"},"Vientiane":{"exemplarCity":"ビエンチャン"},"Vladivostok":{"exemplarCity":"ウラジオストク"},"Yakutsk":{"exemplarCity":"ヤクーツク"},"Yekaterinburg":{"exemplarCity":"エカテリンブルグ"},"Yerevan":{"exemplarCity":"エレバン"}},"Indian":{"Antananarivo":{"exemplarCity":"アンタナナリボ"},"Chagos":{"exemplarCity":"チャゴス"},"Christmas":{"exemplarCity":"クリスマス島"},"Cocos":{"exemplarCity":"ココス諸島"},"Comoro":{"exemplarCity":"コモロ"},"Kerguelen":{"exemplarCity":"ケルゲレン諸島"},"Mahe":{"exemplarCity":"マヘ"},"Maldives":{"exemplarCity":"モルディブ"},"Mauritius":{"exemplarCity":"モーリシャス"},"Mayotte":{"exemplarCity":"マヨット"},"Reunion":{"exemplarCity":"レユニオン"}},"Australia":{"Adelaide":{"exemplarCity":"アデレード"},"Brisbane":{"exemplarCity":"ブリスベン"},"Broken_Hill":{"exemplarCity":"ブロークンヒル"},"Currie":{"exemplarCity":"カリー"},"Darwin":{"exemplarCity":"ダーウィン"},"Eucla":{"exemplarCity":"ユークラ"},"Hobart":{"exemplarCity":"ホバート"},"Lindeman":{"exemplarCity":"リンデマン"},"Lord_Howe":{"exemplarCity":"ロードハウ"},"Melbourne":{"exemplarCity":"メルボルン"},"Perth":{"exemplarCity":"パース"},"Sydney":{"exemplarCity":"シドニー"}},"Pacific":{"Apia":{"exemplarCity":"アピア"},"Auckland":{"exemplarCity":"オークランド"},"Bougainville":{"exemplarCity":"ブーゲンビル"},"Chatham":{"exemplarCity":"チャタム"},"Easter":{"exemplarCity":"イースター島"},"Efate":{"exemplarCity":"エフェテ島"},"Enderbury":{"exemplarCity":"エンダーベリー島"},"Fakaofo":{"exemplarCity":"ファカオフォ"},"Fiji":{"exemplarCity":"フィジー"},"Funafuti":{"exemplarCity":"フナフティ"},"Galapagos":{"exemplarCity":"ガラパゴス"},"Gambier":{"exemplarCity":"ガンビエ諸島"},"Guadalcanal":{"exemplarCity":"ガダルカナル"},"Guam":{"exemplarCity":"グアム"},"Honolulu":{"exemplarCity":"ホノルル"},"Johnston":{"exemplarCity":"ジョンストン島"},"Kiritimati":{"exemplarCity":"キリスィマスィ島"},"Kosrae":{"exemplarCity":"コスラエ"},"Kwajalein":{"exemplarCity":"クェゼリン"},"Majuro":{"exemplarCity":"マジュロ"},"Marquesas":{"exemplarCity":"マルキーズ"},"Midway":{"exemplarCity":"ミッドウェー島"},"Nauru":{"exemplarCity":"ナウル"},"Niue":{"exemplarCity":"ニウエ"},"Norfolk":{"exemplarCity":"ノーフォーク島"},"Noumea":{"exemplarCity":"ヌメア"},"Pago_Pago":{"exemplarCity":"パゴパゴ"},"Palau":{"exemplarCity":"パラオ"},"Pitcairn":{"exemplarCity":"ピトケアン諸島"},"Ponape":{"exemplarCity":"ポンペイ島"},"Port_Moresby":{"exemplarCity":"ポートモレスビー"},"Rarotonga":{"exemplarCity":"ラロトンガ"},"Saipan":{"exemplarCity":"サイパン"},"Tahiti":{"exemplarCity":"タヒチ"},"Tarawa":{"exemplarCity":"タラワ"},"Tongatapu":{"exemplarCity":"トンガタプ"},"Truk":{"exemplarCity":"チューク"},"Wake":{"exemplarCity":"ウェーク島"},"Wallis":{"exemplarCity":"ウォリス諸島"}},"Arctic":{"Longyearbyen":{"exemplarCity":"ロングイェールビーン"}},"Antarctica":{"Casey":{"exemplarCity":"ケーシー基地"},"Davis":{"exemplarCity":"デービス基地"},"DumontDUrville":{"exemplarCity":"デュモン・デュルヴィル基地"},"Macquarie":{"exemplarCity":"マッコリー"},"Mawson":{"exemplarCity":"モーソン基地"},"McMurdo":{"exemplarCity":"マクマード基地"},"Palmer":{"exemplarCity":"パーマー基地"},"Rothera":{"exemplarCity":"ロゼラ基地"},"Syowa":{"exemplarCity":"昭和基地"},"Troll":{"exemplarCity":"トロル基地"},"Vostok":{"exemplarCity":"ボストーク基地"}},"Etc":{"UTC":{"long":{"standard":"協定世界時"},"short":{"standard":"UTC"}},"Unknown":{"exemplarCity":"地域不明"}}},"metazone":{"Acre":{"long":{"generic":"アクレ時間","standard":"アクレ標準時","daylight":"アクレ夏時間"}},"Afghanistan":{"long":{"standard":"アフガニスタン時間"}},"Africa_Central":{"long":{"standard":"中央アフリカ時間"}},"Africa_Eastern":{"long":{"standard":"東アフリカ時間"}},"Africa_Southern":{"long":{"standard":"南アフリカ標準時"}},"Africa_Western":{"long":{"generic":"西アフリカ時間","standard":"西アフリカ標準時","daylight":"西アフリカ夏時間"}},"Alaska":{"long":{"generic":"アラスカ時間","standard":"アラスカ標準時","daylight":"アラスカ夏時間"}},"Almaty":{"long":{"generic":"アルトマイ時間","standard":"アルトマイ標準時","daylight":"アルマトイ夏時間"}},"Amazon":{"long":{"generic":"アマゾン時間","standard":"アマゾン標準時","daylight":"アマゾン夏時間"}},"America_Central":{"long":{"generic":"アメリカ中部時間","standard":"アメリカ中部標準時","daylight":"アメリカ中部夏時間"}},"America_Eastern":{"long":{"generic":"アメリカ東部時間","standard":"アメリカ東部標準時","daylight":"アメリカ東部夏時間"}},"America_Mountain":{"long":{"generic":"アメリカ山地時間","standard":"アメリカ山地標準時","daylight":"アメリカ山地夏時間"}},"America_Pacific":{"long":{"generic":"アメリカ太平洋時間","standard":"アメリカ太平洋標準時","daylight":"アメリカ太平洋夏時間"}},"Anadyr":{"long":{"generic":"アナディリ時間","standard":"アナディリ標準時","daylight":"アナディリ夏時間"}},"Apia":{"long":{"generic":"アピア時間","standard":"アピア標準時","daylight":"アピア夏時間"}},"Aqtau":{"long":{"generic":"アクタウ時間","standard":"アクタウ標準時","daylight":"アクタウ夏時間"}},"Aqtobe":{"long":{"generic":"アクトベ時間","standard":"アクトベ標準時","daylight":"アクトベ夏時間"}},"Arabian":{"long":{"generic":"アラビア時間","standard":"アラビア標準時","daylight":"アラビア夏時間"}},"Argentina":{"long":{"generic":"アルゼンチン時間","standard":"アルゼンチン標準時","daylight":"アルゼンチン夏時間"}},"Argentina_Western":{"long":{"generic":"西部アルゼンチン時間","standard":"西部アルゼンチン標準時","daylight":"西部アルゼンチン夏時間"}},"Armenia":{"long":{"generic":"アルメニア時間","standard":"アルメニア標準時","daylight":"アルメニア夏時間"}},"Atlantic":{"long":{"generic":"大西洋時間","standard":"大西洋標準時","daylight":"大西洋夏時間"}},"Australia_Central":{"long":{"generic":"オーストラリア中部時間","standard":"オーストラリア中部標準時","daylight":"オーストラリア中部夏時間"}},"Australia_CentralWestern":{"long":{"generic":"オーストラリア中西部時間","standard":"オーストラリア中西部標準時","daylight":"オーストラリア中西部夏時間"}},"Australia_Eastern":{"long":{"generic":"オーストラリア東部時間","standard":"オーストラリア東部標準時","daylight":"オーストラリア東部夏時間"}},"Australia_Western":{"long":{"generic":"オーストラリア西部時間","standard":"オーストラリア西部標準時","daylight":"オーストラリア西部夏時間"}},"Azerbaijan":{"long":{"generic":"アゼルバイジャン時間","standard":"アゼルバイジャン標準時","daylight":"アゼルバイジャン夏時間"}},"Azores":{"long":{"generic":"アゾレス時間","standard":"アゾレス標準時","daylight":"アゾレス夏時間"}},"Bangladesh":{"long":{"generic":"バングラデシュ時間","standard":"バングラデシュ標準時","daylight":"バングラデシュ夏時間"}},"Bhutan":{"long":{"standard":"ブータン時間"}},"Bolivia":{"long":{"standard":"ボリビア時間"}},"Brasilia":{"long":{"generic":"ブラジリア時間","standard":"ブラジリア標準時","daylight":"ブラジリア夏時間"}},"Brunei":{"long":{"standard":"ブルネイ・ダルサラーム時間"}},"Cape_Verde":{"long":{"generic":"カーボベルデ時間","standard":"カーボベルデ標準時","daylight":"カーボベルデ夏時間"}},"Casey":{"long":{"standard":"ケイシー基地時間"}},"Chamorro":{"long":{"standard":"チャモロ時間"}},"Chatham":{"long":{"generic":"チャタム時間","standard":"チャタム標準時","daylight":"チャタム夏時間"}},"Chile":{"long":{"generic":"チリ時間","standard":"チリ標準時","daylight":"チリ夏時間"}},"China":{"long":{"generic":"中国時間","standard":"中国標準時","daylight":"中国夏時間"}},"Choibalsan":{"long":{"generic":"チョイバルサン時間","standard":"チョイバルサン標準時","daylight":"チョイバルサン夏時間"}},"Christmas":{"long":{"standard":"クリスマス島時間"}},"Cocos":{"long":{"standard":"ココス諸島時間"}},"Colombia":{"long":{"generic":"コロンビア時間","standard":"コロンビア標準時","daylight":"コロンビア夏時間"}},"Cook":{"long":{"generic":"クック諸島時間","standard":"クック諸島標準時","daylight":"クック諸島夏時間"}},"Cuba":{"long":{"generic":"キューバ時間","standard":"キューバ標準時","daylight":"キューバ夏時間"}},"Davis":{"long":{"standard":"デービス基地時間"}},"DumontDUrville":{"long":{"standard":"デュモン・デュルヴィル基地時間"}},"East_Timor":{"long":{"standard":"東ティモール時間"}},"Easter":{"long":{"generic":"イースター島時間","standard":"イースター島標準時","daylight":"イースター島夏時間"}},"Ecuador":{"long":{"standard":"エクアドル時間"}},"Europe_Central":{"long":{"generic":"中央ヨーロッパ時間","standard":"中央ヨーロッパ標準時","daylight":"中央ヨーロッパ夏時間"}},"Europe_Eastern":{"long":{"generic":"東ヨーロッパ時間","standard":"東ヨーロッパ標準時","daylight":"東ヨーロッパ夏時間"}},"Europe_Further_Eastern":{"long":{"standard":"極東ヨーロッパ時間"}},"Europe_Western":{"long":{"generic":"西ヨーロッパ時間","standard":"西ヨーロッパ標準時","daylight":"西ヨーロッパ夏時間"}},"Falkland":{"long":{"generic":"フォークランド諸島時間","standard":"フォークランド諸島標準時","daylight":"フォークランド諸島夏時間"}},"Fiji":{"long":{"generic":"フィジー時間","standard":"フィジー標準時","daylight":"フィジー夏時間"}},"French_Guiana":{"long":{"standard":"仏領ギアナ時間"}},"French_Southern":{"long":{"standard":"仏領南方南極時間"}},"Galapagos":{"long":{"standard":"ガラパゴス時間"}},"Gambier":{"long":{"standard":"ガンビエ諸島時間"}},"Georgia":{"long":{"generic":"ジョージア時間","standard":"ジョージア標準時","daylight":"ジョージア夏時間"}},"Gilbert_Islands":{"long":{"standard":"ギルバート諸島時間"}},"GMT":{"long":{"standard":"グリニッジ標準時"}},"Greenland_Eastern":{"long":{"generic":"グリーンランド東部時間","standard":"グリーンランド東部標準時","daylight":"グリーンランド東部夏時間"}},"Greenland_Western":{"long":{"generic":"グリーンランド西部時間","standard":"グリーンランド西部標準時","daylight":"グリーンランド西部夏時間"}},"Guam":{"long":{"standard":"グアム時間"}},"Gulf":{"long":{"standard":"湾岸標準時"}},"Guyana":{"long":{"standard":"ガイアナ時間"}},"Hawaii_Aleutian":{"long":{"generic":"ハワイ・アリューシャン時間","standard":"ハワイ・アリューシャン標準時","daylight":"ハワイ・アリューシャン夏時間"}},"Hong_Kong":{"long":{"generic":"香港時間","standard":"香港標準時","daylight":"香港夏時間"}},"Hovd":{"long":{"generic":"ホブド時間","standard":"ホブド標準時","daylight":"ホブド夏時間"}},"India":{"long":{"standard":"インド標準時"}},"Indian_Ocean":{"long":{"standard":"インド洋時間"}},"Indochina":{"long":{"standard":"インドシナ時間"}},"Indonesia_Central":{"long":{"standard":"インドネシア中部時間"}},"Indonesia_Eastern":{"long":{"standard":"インドネシア東部時間"}},"Indonesia_Western":{"long":{"standard":"インドネシア西部時間"}},"Iran":{"long":{"generic":"イラン時間","standard":"イラン標準時","daylight":"イラン夏時間"}},"Irkutsk":{"long":{"generic":"イルクーツク時間","standard":"イルクーツク標準時","daylight":"イルクーツク夏時間"}},"Israel":{"long":{"generic":"イスラエル時間","standard":"イスラエル標準時","daylight":"イスラエル夏時間"}},"Japan":{"long":{"generic":"日本時間","standard":"日本標準時","daylight":"日本夏時間"},"short":{"standard":"JST","daylight":"JDT"}},"Kamchatka":{"long":{"generic":"ペトロパブロフスク・カムチャツキー時間","standard":"ペトロパブロフスク・カムチャツキー標準時","daylight":"ペトロパブロフスク・カムチャツキー夏時間"}},"Kazakhstan_Eastern":{"long":{"standard":"東カザフスタン時間"}},"Kazakhstan_Western":{"long":{"standard":"西カザフスタン時間"}},"Korea":{"long":{"generic":"韓国時間","standard":"韓国標準時","daylight":"韓国夏時間"}},"Kosrae":{"long":{"standard":"コスラエ時間"}},"Krasnoyarsk":{"long":{"generic":"クラスノヤルスク時間","standard":"クラスノヤルスク標準時","daylight":"クラスノヤルスク夏時間"}},"Kyrgystan":{"long":{"standard":"キルギス時間"}},"Lanka":{"long":{"standard":"ランカ時間"}},"Line_Islands":{"long":{"standard":"ライン諸島時間"}},"Lord_Howe":{"long":{"generic":"ロードハウ時間","standard":"ロードハウ標準時","daylight":"ロードハウ夏時間"}},"Macau":{"long":{"generic":"マカオ時間","standard":"マカオ標準時","daylight":"マカオ夏時間"}},"Macquarie":{"long":{"standard":"マッコーリー島時間"}},"Magadan":{"long":{"generic":"マガダン時間","standard":"マガダン標準時","daylight":"マガダン夏時間"}},"Malaysia":{"long":{"standard":"マレーシア時間"}},"Maldives":{"long":{"standard":"モルディブ時間"}},"Marquesas":{"long":{"standard":"マルキーズ時間"}},"Marshall_Islands":{"long":{"standard":"マーシャル諸島時間"}},"Mauritius":{"long":{"generic":"モーリシャス時間","standard":"モーリシャス標準時","daylight":"モーリシャス夏時間"}},"Mawson":{"long":{"standard":"モーソン基地時間"}},"Mexico_Northwest":{"long":{"generic":"メキシコ北西部時間","standard":"メキシコ北西部標準時","daylight":"メキシコ北西部夏時間"}},"Mexico_Pacific":{"long":{"generic":"メキシコ太平洋時間","standard":"メキシコ太平洋標準時","daylight":"メキシコ太平洋夏時間"}},"Mongolia":{"long":{"generic":"ウランバートル時間","standard":"ウランバートル標準時","daylight":"ウランバートル夏時間"}},"Moscow":{"long":{"generic":"モスクワ時間","standard":"モスクワ標準時","daylight":"モスクワ夏時間"}},"Myanmar":{"long":{"standard":"ミャンマー時間"}},"Nauru":{"long":{"standard":"ナウル時間"}},"Nepal":{"long":{"standard":"ネパール時間"}},"New_Caledonia":{"long":{"generic":"ニューカレドニア時間","standard":"ニューカレドニア標準時","daylight":"ニューカレドニア夏時間"}},"New_Zealand":{"long":{"generic":"ニュージーランド時間","standard":"ニュージーランド標準時","daylight":"ニュージーランド夏時間"}},"Newfoundland":{"long":{"generic":"ニューファンドランド時間","standard":"ニューファンドランド標準時","daylight":"ニューファンドランド夏時間"}},"Niue":{"long":{"standard":"ニウエ時間"}},"Norfolk":{"long":{"standard":"ノーフォーク島時間"}},"Noronha":{"long":{"generic":"フェルナンド・デ・ノローニャ時間","standard":"フェルナンド・デ・ノローニャ標準時","daylight":"フェルナンド・デ・ノローニャ夏時間"}},"North_Mariana":{"long":{"standard":"北マリアナ諸島時間"}},"Novosibirsk":{"long":{"generic":"ノヴォシビルスク時間","standard":"ノヴォシビルスク標準時","daylight":"ノヴォシビルスク夏時間"}},"Omsk":{"long":{"generic":"オムスク時間","standard":"オムスク標準時","daylight":"オムスク夏時間"}},"Pakistan":{"long":{"generic":"パキスタン時間","standard":"パキスタン標準時","daylight":"パキスタン夏時間"}},"Palau":{"long":{"standard":"パラオ時間"}},"Papua_New_Guinea":{"long":{"standard":"パプアニューギニア時間"}},"Paraguay":{"long":{"generic":"パラグアイ時間","standard":"パラグアイ標準時","daylight":"パラグアイ夏時間"}},"Peru":{"long":{"generic":"ペルー時間","standard":"ペルー標準時","daylight":"ペルー夏時間"}},"Philippines":{"long":{"generic":"フィリピン時間","standard":"フィリピン標準時","daylight":"フィリピン夏時間"}},"Phoenix_Islands":{"long":{"standard":"フェニックス諸島時間"}},"Pierre_Miquelon":{"long":{"generic":"サンピエール・ミクロン時間","standard":"サンピエール・ミクロン標準時","daylight":"サンピエール・ミクロン夏時間"}},"Pitcairn":{"long":{"standard":"ピトケアン時間"}},"Ponape":{"long":{"standard":"ポナペ時間"}},"Pyongyang":{"long":{"standard":"平壌時間"}},"Qyzylorda":{"long":{"generic":"クズロルダ時間","standard":"クズロルダ標準時","daylight":"クズロルダ夏時間"}},"Reunion":{"long":{"standard":"レユニオン時間"}},"Rothera":{"long":{"standard":"ロゼラ基地時間"}},"Sakhalin":{"long":{"generic":"サハリン時間","standard":"サハリン標準時","daylight":"サハリン夏時間"}},"Samara":{"long":{"generic":"サマラ時間","standard":"サマラ標準時","daylight":"サマラ夏時間"}},"Samoa":{"long":{"generic":"サモア時間","standard":"サモア標準時","daylight":"サモア夏時間"}},"Seychelles":{"long":{"standard":"セーシェル時間"}},"Singapore":{"long":{"standard":"シンガポール標準時"}},"Solomon":{"long":{"standard":"ソロモン諸島時間"}},"South_Georgia":{"long":{"standard":"サウスジョージア時間"}},"Suriname":{"long":{"standard":"スリナム時間"}},"Syowa":{"long":{"standard":"昭和基地時間"}},"Tahiti":{"long":{"standard":"タヒチ時間"}},"Taipei":{"long":{"generic":"台北時間","standard":"台北標準時","daylight":"台北夏時間"}},"Tajikistan":{"long":{"standard":"タジキスタン時間"}},"Tokelau":{"long":{"standard":"トケラウ時間"}},"Tonga":{"long":{"generic":"トンガ時間","standard":"トンガ標準時","daylight":"トンガ夏時間"}},"Truk":{"long":{"standard":"チューク時間"}},"Turkmenistan":{"long":{"generic":"トルクメニスタン時間","standard":"トルクメニスタン標準時","daylight":"トルクメニスタン夏時間"}},"Tuvalu":{"long":{"standard":"ツバル時間"}},"Uruguay":{"long":{"generic":"ウルグアイ時間","standard":"ウルグアイ標準時","daylight":"ウルグアイ夏時間"}},"Uzbekistan":{"long":{"generic":"ウズベキスタン時間","standard":"ウズベキスタン標準時","daylight":"ウズベキスタン夏時間"}},"Vanuatu":{"long":{"generic":"バヌアツ時間","standard":"バヌアツ標準時","daylight":"バヌアツ夏時間"}},"Venezuela":{"long":{"standard":"ベネズエラ時間"}},"Vladivostok":{"long":{"generic":"ウラジオストク時間","standard":"ウラジオストク標準時","daylight":"ウラジオストク夏時間"}},"Volgograd":{"long":{"generic":"ボルゴグラード時間","standard":"ボルゴグラード標準時","daylight":"ボルゴグラード夏時間"}},"Vostok":{"long":{"standard":"ボストーク基地時間"}},"Wake":{"long":{"standard":"ウェーク島時間"}},"Wallis":{"long":{"standard":"ウォリス・フツナ時間"}},"Yakutsk":{"long":{"generic":"ヤクーツク時間","standard":"ヤクーツク標準時","daylight":"ヤクーツク夏時間"}},"Yekaterinburg":{"long":{"generic":"エカテリンブルグ時間","standard":"エカテリンブルグ標準時","daylight":"エカテリンブルグ夏時間"}}}}},"numbers":{"defaultNumberingSystem":"latn","otherNumberingSystems":{"native":"latn","traditional":"jpan","finance":"jpanfin"},"minimumGroupingDigits":"1","symbols-numberSystem-latn":{"decimal":".","group":",","list":";","percentSign":"%","plusSign":"+","minusSign":"-","exponential":"E","superscriptingExponent":"×","perMille":"‰","infinity":"∞","nan":"NaN","timeSeparator":":"},"decimalFormats-numberSystem-latn":{"standard":"#,##0.###","long":{"decimalFormat":{"1000-count-other":"0","10000-count-other":"0万","100000-count-other":"00万","1000000-count-other":"000万","10000000-count-other":"0000万","100000000-count-other":"0億","1000000000-count-other":"00億","10000000000-count-other":"000億","100000000000-count-other":"0000億","1000000000000-count-other":"0兆","10000000000000-count-other":"00兆","100000000000000-count-other":"000兆"}},"short":{"decimalFormat":{"1000-count-other":"0","10000-count-other":"0万","100000-count-other":"00万","1000000-count-other":"000万","10000000-count-other":"0000万","100000000-count-other":"0億","1000000000-count-other":"00億","10000000000-count-other":"000億","100000000000-count-other":"0000億","1000000000000-count-other":"0兆","10000000000000-count-other":"00兆","100000000000000-count-other":"000兆"}}},"scientificFormats-numberSystem-latn":{"standard":"#E0"},"percentFormats-numberSystem-latn":{"standard":"#,##0%"},"currencyFormats-numberSystem-latn":{"currencySpacing":{"beforeCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "},"afterCurrency":{"currencyMatch":"[:^S:]","surroundingMatch":"[:digit:]","insertBetween":" "}},"standard":"¤#,##0.00","accounting":"¤#,##0.00;(¤#,##0.00)","short":{"standard":{"1000-count-other":"0","10000-count-other":"¤0万","100000-count-other":"¤00万","1000000-count-other":"¤000万","10000000-count-other":"¤0000万","100000000-count-other":"¤0億","1000000000-count-other":"¤00億","10000000000-count-other":"¤000億","100000000000-count-other":"¤0000億","1000000000000-count-other":"¤0兆","10000000000000-count-other":"¤00兆","100000000000000-count-other":"¤000兆"}},"unitPattern-count-other":"{0}{1}"},"miscPatterns-numberSystem-latn":{"atLeast":"{0} 以上","range":"{0}～{1}"},"minimalPairs":{"pluralMinimalPairs-count-other":"{0}日","other":"{0} 番目の角を右折します。"}}}},"supplemental":{"version":{"_number":"$Revision: 13922 $","_unicodeVersion":"10.0.0","_cldrVersion":"33"},"likelySubtags":{"aa":"aa-Latn-ET","aai":"aai-Latn-ZZ","aak":"aak-Latn-ZZ","aau":"aau-Latn-ZZ","ab":"ab-Cyrl-GE","abi":"abi-Latn-ZZ","abq":"abq-Cyrl-ZZ","abr":"abr-Latn-GH","abt":"abt-Latn-ZZ","aby":"aby-Latn-ZZ","acd":"acd-Latn-ZZ","ace":"ace-Latn-ID","ach":"ach-Latn-UG","ada":"ada-Latn-GH","ade":"ade-Latn-ZZ","adj":"adj-Latn-ZZ","ady":"ady-Cyrl-RU","adz":"adz-Latn-ZZ","ae":"ae-Avst-IR","aeb":"aeb-Arab-TN","aey":"aey-Latn-ZZ","af":"af-Latn-ZA","agc":"agc-Latn-ZZ","agd":"agd-Latn-ZZ","agg":"agg-Latn-ZZ","agm":"agm-Latn-ZZ","ago":"ago-Latn-ZZ","agq":"agq-Latn-CM","aha":"aha-Latn-ZZ","ahl":"ahl-Latn-ZZ","aho":"aho-Ahom-IN","ajg":"ajg-Latn-ZZ","ak":"ak-Latn-GH","akk":"akk-Xsux-IQ","ala":"ala-Latn-ZZ","ali":"ali-Latn-ZZ","aln":"aln-Latn-XK","alt":"alt-Cyrl-RU","am":"am-Ethi-ET","amm":"amm-Latn-ZZ","amn":"amn-Latn-ZZ","amo":"amo-Latn-NG","amp":"amp-Latn-ZZ","anc":"anc-Latn-ZZ","ank":"ank-Latn-ZZ","ann":"ann-Latn-ZZ","any":"any-Latn-ZZ","aoj":"aoj-Latn-ZZ","aom":"aom-Latn-ZZ","aoz":"aoz-Latn-ID","apc":"apc-Arab-ZZ","apd":"apd-Arab-TG","ape":"ape-Latn-ZZ","apr":"apr-Latn-ZZ","aps":"aps-Latn-ZZ","apz":"apz-Latn-ZZ","ar":"ar-Arab-EG","arc":"arc-Armi-IR","arc-Nbat":"arc-Nbat-JO","arc-Palm":"arc-Palm-SY","arh":"arh-Latn-ZZ","arn":"arn-Latn-CL","aro":"aro-Latn-BO","arq":"arq-Arab-DZ","ary":"ary-Arab-MA","arz":"arz-Arab-EG","as":"as-Beng-IN","asa":"asa-Latn-TZ","ase":"ase-Sgnw-US","asg":"asg-Latn-ZZ","aso":"aso-Latn-ZZ","ast":"ast-Latn-ES","ata":"ata-Latn-ZZ","atg":"atg-Latn-ZZ","atj":"atj-Latn-CA","auy":"auy-Latn-ZZ","av":"av-Cyrl-RU","avl":"avl-Arab-ZZ","avn":"avn-Latn-ZZ","avt":"avt-Latn-ZZ","avu":"avu-Latn-ZZ","awa":"awa-Deva-IN","awb":"awb-Latn-ZZ","awo":"awo-Latn-ZZ","awx":"awx-Latn-ZZ","ay":"ay-Latn-BO","ayb":"ayb-Latn-ZZ","az":"az-Latn-AZ","az-Arab":"az-Arab-IR","az-IQ":"az-Arab-IQ","az-IR":"az-Arab-IR","az-RU":"az-Cyrl-RU","ba":"ba-Cyrl-RU","bal":"bal-Arab-PK","ban":"ban-Latn-ID","bap":"bap-Deva-NP","bar":"bar-Latn-AT","bas":"bas-Latn-CM","bav":"bav-Latn-ZZ","bax":"bax-Bamu-CM","bba":"bba-Latn-ZZ","bbb":"bbb-Latn-ZZ","bbc":"bbc-Latn-ID","bbd":"bbd-Latn-ZZ","bbj":"bbj-Latn-CM","bbp":"bbp-Latn-ZZ","bbr":"bbr-Latn-ZZ","bcf":"bcf-Latn-ZZ","bch":"bch-Latn-ZZ","bci":"bci-Latn-CI","bcm":"bcm-Latn-ZZ","bcn":"bcn-Latn-ZZ","bco":"bco-Latn-ZZ","bcq":"bcq-Ethi-ZZ","bcu":"bcu-Latn-ZZ","bdd":"bdd-Latn-ZZ","be":"be-Cyrl-BY","bef":"bef-Latn-ZZ","beh":"beh-Latn-ZZ","bej":"bej-Arab-SD","bem":"bem-Latn-ZM","bet":"bet-Latn-ZZ","bew":"bew-Latn-ID","bex":"bex-Latn-ZZ","bez":"bez-Latn-TZ","bfd":"bfd-Latn-CM","bfq":"bfq-Taml-IN","bft":"bft-Arab-PK","bfy":"bfy-Deva-IN","bg":"bg-Cyrl-BG","bgc":"bgc-Deva-IN","bgn":"bgn-Arab-PK","bgx":"bgx-Grek-TR","bhb":"bhb-Deva-IN","bhg":"bhg-Latn-ZZ","bhi":"bhi-Deva-IN","bhk":"bhk-Latn-PH","bhl":"bhl-Latn-ZZ","bho":"bho-Deva-IN","bhy":"bhy-Latn-ZZ","bi":"bi-Latn-VU","bib":"bib-Latn-ZZ","big":"big-Latn-ZZ","bik":"bik-Latn-PH","bim":"bim-Latn-ZZ","bin":"bin-Latn-NG","bio":"bio-Latn-ZZ","biq":"biq-Latn-ZZ","bjh":"bjh-Latn-ZZ","bji":"bji-Ethi-ZZ","bjj":"bjj-Deva-IN","bjn":"bjn-Latn-ID","bjo":"bjo-Latn-ZZ","bjr":"bjr-Latn-ZZ","bjt":"bjt-Latn-SN","bjz":"bjz-Latn-ZZ","bkc":"bkc-Latn-ZZ","bkm":"bkm-Latn-CM","bkq":"bkq-Latn-ZZ","bku":"bku-Latn-PH","bkv":"bkv-Latn-ZZ","blt":"blt-Tavt-VN","bm":"bm-Latn-ML","bmh":"bmh-Latn-ZZ","bmk":"bmk-Latn-ZZ","bmq":"bmq-Latn-ML","bmu":"bmu-Latn-ZZ","bn":"bn-Beng-BD","bng":"bng-Latn-ZZ","bnm":"bnm-Latn-ZZ","bnp":"bnp-Latn-ZZ","bo":"bo-Tibt-CN","boj":"boj-Latn-ZZ","bom":"bom-Latn-ZZ","bon":"bon-Latn-ZZ","bpy":"bpy-Beng-IN","bqc":"bqc-Latn-ZZ","bqi":"bqi-Arab-IR","bqp":"bqp-Latn-ZZ","bqv":"bqv-Latn-CI","br":"br-Latn-FR","bra":"bra-Deva-IN","brh":"brh-Arab-PK","brx":"brx-Deva-IN","brz":"brz-Latn-ZZ","bs":"bs-Latn-BA","bsj":"bsj-Latn-ZZ","bsq":"bsq-Bass-LR","bss":"bss-Latn-CM","bst":"bst-Ethi-ZZ","bto":"bto-Latn-PH","btt":"btt-Latn-ZZ","btv":"btv-Deva-PK","bua":"bua-Cyrl-RU","buc":"buc-Latn-YT","bud":"bud-Latn-ZZ","bug":"bug-Latn-ID","buk":"buk-Latn-ZZ","bum":"bum-Latn-CM","buo":"buo-Latn-ZZ","bus":"bus-Latn-ZZ","buu":"buu-Latn-ZZ","bvb":"bvb-Latn-GQ","bwd":"bwd-Latn-ZZ","bwr":"bwr-Latn-ZZ","bxh":"bxh-Latn-ZZ","bye":"bye-Latn-ZZ","byn":"byn-Ethi-ER","byr":"byr-Latn-ZZ","bys":"bys-Latn-ZZ","byv":"byv-Latn-CM","byx":"byx-Latn-ZZ","bza":"bza-Latn-ZZ","bze":"bze-Latn-ML","bzf":"bzf-Latn-ZZ","bzh":"bzh-Latn-ZZ","bzw":"bzw-Latn-ZZ","ca":"ca-Latn-ES","can":"can-Latn-ZZ","cbj":"cbj-Latn-ZZ","cch":"cch-Latn-NG","ccp":"ccp-Cakm-BD","ce":"ce-Cyrl-RU","ceb":"ceb-Latn-PH","cfa":"cfa-Latn-ZZ","cgg":"cgg-Latn-UG","ch":"ch-Latn-GU","chk":"chk-Latn-FM","chm":"chm-Cyrl-RU","cho":"cho-Latn-US","chp":"chp-Latn-CA","chr":"chr-Cher-US","cja":"cja-Arab-KH","cjm":"cjm-Cham-VN","cjv":"cjv-Latn-ZZ","ckb":"ckb-Arab-IQ","ckl":"ckl-Latn-ZZ","cko":"cko-Latn-ZZ","cky":"cky-Latn-ZZ","cla":"cla-Latn-ZZ","cme":"cme-Latn-ZZ","cmg":"cmg-Soyo-MN","co":"co-Latn-FR","cop":"cop-Copt-EG","cps":"cps-Latn-PH","cr":"cr-Cans-CA","crh":"crh-Cyrl-UA","crj":"crj-Cans-CA","crk":"crk-Cans-CA","crl":"crl-Cans-CA","crm":"crm-Cans-CA","crs":"crs-Latn-SC","cs":"cs-Latn-CZ","csb":"csb-Latn-PL","csw":"csw-Cans-CA","ctd":"ctd-Pauc-MM","cu":"cu-Cyrl-RU","cu-Glag":"cu-Glag-BG","cv":"cv-Cyrl-RU","cy":"cy-Latn-GB","da":"da-Latn-DK","dad":"dad-Latn-ZZ","daf":"daf-Latn-ZZ","dag":"dag-Latn-ZZ","dah":"dah-Latn-ZZ","dak":"dak-Latn-US","dar":"dar-Cyrl-RU","dav":"dav-Latn-KE","dbd":"dbd-Latn-ZZ","dbq":"dbq-Latn-ZZ","dcc":"dcc-Arab-IN","ddn":"ddn-Latn-ZZ","de":"de-Latn-DE","ded":"ded-Latn-ZZ","den":"den-Latn-CA","dga":"dga-Latn-ZZ","dgh":"dgh-Latn-ZZ","dgi":"dgi-Latn-ZZ","dgl":"dgl-Arab-ZZ","dgr":"dgr-Latn-CA","dgz":"dgz-Latn-ZZ","dia":"dia-Latn-ZZ","dje":"dje-Latn-NE","dnj":"dnj-Latn-CI","dob":"dob-Latn-ZZ","doi":"doi-Arab-IN","dop":"dop-Latn-ZZ","dow":"dow-Latn-ZZ","dri":"dri-Latn-ZZ","drs":"drs-Ethi-ZZ","dsb":"dsb-Latn-DE","dtm":"dtm-Latn-ML","dtp":"dtp-Latn-MY","dts":"dts-Latn-ZZ","dty":"dty-Deva-NP","dua":"dua-Latn-CM","duc":"duc-Latn-ZZ","dud":"dud-Latn-ZZ","dug":"dug-Latn-ZZ","dv":"dv-Thaa-MV","dva":"dva-Latn-ZZ","dww":"dww-Latn-ZZ","dyo":"dyo-Latn-SN","dyu":"dyu-Latn-BF","dz":"dz-Tibt-BT","dzg":"dzg-Latn-ZZ","ebu":"ebu-Latn-KE","ee":"ee-Latn-GH","efi":"efi-Latn-NG","egl":"egl-Latn-IT","egy":"egy-Egyp-EG","eka":"eka-Latn-ZZ","eky":"eky-Kali-MM","el":"el-Grek-GR","ema":"ema-Latn-ZZ","emi":"emi-Latn-ZZ","en":"en-Latn-US","en-Shaw":"en-Shaw-GB","enn":"enn-Latn-ZZ","enq":"enq-Latn-ZZ","eo":"eo-Latn-001","eri":"eri-Latn-ZZ","es":"es-Latn-ES","esu":"esu-Latn-US","et":"et-Latn-EE","etr":"etr-Latn-ZZ","ett":"ett-Ital-IT","etu":"etu-Latn-ZZ","etx":"etx-Latn-ZZ","eu":"eu-Latn-ES","ewo":"ewo-Latn-CM","ext":"ext-Latn-ES","fa":"fa-Arab-IR","faa":"faa-Latn-ZZ","fab":"fab-Latn-ZZ","fag":"fag-Latn-ZZ","fai":"fai-Latn-ZZ","fan":"fan-Latn-GQ","ff":"ff-Latn-SN","ff-Adlm":"ff-Adlm-GN","ffi":"ffi-Latn-ZZ","ffm":"ffm-Latn-ML","fi":"fi-Latn-FI","fia":"fia-Arab-SD","fil":"fil-Latn-PH","fit":"fit-Latn-SE","fj":"fj-Latn-FJ","flr":"flr-Latn-ZZ","fmp":"fmp-Latn-ZZ","fo":"fo-Latn-FO","fod":"fod-Latn-ZZ","fon":"fon-Latn-BJ","for":"for-Latn-ZZ","fpe":"fpe-Latn-ZZ","fqs":"fqs-Latn-ZZ","fr":"fr-Latn-FR","frc":"frc-Latn-US","frp":"frp-Latn-FR","frr":"frr-Latn-DE","frs":"frs-Latn-DE","fub":"fub-Arab-CM","fud":"fud-Latn-WF","fue":"fue-Latn-ZZ","fuf":"fuf-Latn-GN","fuh":"fuh-Latn-ZZ","fuq":"fuq-Latn-NE","fur":"fur-Latn-IT","fuv":"fuv-Latn-NG","fuy":"fuy-Latn-ZZ","fvr":"fvr-Latn-SD","fy":"fy-Latn-NL","ga":"ga-Latn-IE","gaa":"gaa-Latn-GH","gaf":"gaf-Latn-ZZ","gag":"gag-Latn-MD","gah":"gah-Latn-ZZ","gaj":"gaj-Latn-ZZ","gam":"gam-Latn-ZZ","gan":"gan-Hans-CN","gaw":"gaw-Latn-ZZ","gay":"gay-Latn-ID","gba":"gba-Latn-ZZ","gbf":"gbf-Latn-ZZ","gbm":"gbm-Deva-IN","gby":"gby-Latn-ZZ","gbz":"gbz-Arab-IR","gcr":"gcr-Latn-GF","gd":"gd-Latn-GB","gde":"gde-Latn-ZZ","gdn":"gdn-Latn-ZZ","gdr":"gdr-Latn-ZZ","geb":"geb-Latn-ZZ","gej":"gej-Latn-ZZ","gel":"gel-Latn-ZZ","gez":"gez-Ethi-ET","gfk":"gfk-Latn-ZZ","ggn":"ggn-Deva-NP","ghs":"ghs-Latn-ZZ","gil":"gil-Latn-KI","gim":"gim-Latn-ZZ","gjk":"gjk-Arab-PK","gjn":"gjn-Latn-ZZ","gju":"gju-Arab-PK","gkn":"gkn-Latn-ZZ","gkp":"gkp-Latn-ZZ","gl":"gl-Latn-ES","glk":"glk-Arab-IR","gmm":"gmm-Latn-ZZ","gmv":"gmv-Ethi-ZZ","gn":"gn-Latn-PY","gnd":"gnd-Latn-ZZ","gng":"gng-Latn-ZZ","god":"god-Latn-ZZ","gof":"gof-Ethi-ZZ","goi":"goi-Latn-ZZ","gom":"gom-Deva-IN","gon":"gon-Telu-IN","gor":"gor-Latn-ID","gos":"gos-Latn-NL","got":"got-Goth-UA","grb":"grb-Latn-ZZ","grc":"grc-Cprt-CY","grc-Linb":"grc-Linb-GR","grt":"grt-Beng-IN","grw":"grw-Latn-ZZ","gsw":"gsw-Latn-CH","gu":"gu-Gujr-IN","gub":"gub-Latn-BR","guc":"guc-Latn-CO","gud":"gud-Latn-ZZ","gur":"gur-Latn-GH","guw":"guw-Latn-ZZ","gux":"gux-Latn-ZZ","guz":"guz-Latn-KE","gv":"gv-Latn-IM","gvf":"gvf-Latn-ZZ","gvr":"gvr-Deva-NP","gvs":"gvs-Latn-ZZ","gwc":"gwc-Arab-ZZ","gwi":"gwi-Latn-CA","gwt":"gwt-Arab-ZZ","gyi":"gyi-Latn-ZZ","ha":"ha-Latn-NG","ha-CM":"ha-Arab-CM","ha-SD":"ha-Arab-SD","hag":"hag-Latn-ZZ","hak":"hak-Hans-CN","ham":"ham-Latn-ZZ","haw":"haw-Latn-US","haz":"haz-Arab-AF","hbb":"hbb-Latn-ZZ","hdy":"hdy-Ethi-ZZ","he":"he-Hebr-IL","hhy":"hhy-Latn-ZZ","hi":"hi-Deva-IN","hia":"hia-Latn-ZZ","hif":"hif-Latn-FJ","hig":"hig-Latn-ZZ","hih":"hih-Latn-ZZ","hil":"hil-Latn-PH","hla":"hla-Latn-ZZ","hlu":"hlu-Hluw-TR","hmd":"hmd-Plrd-CN","hmt":"hmt-Latn-ZZ","hnd":"hnd-Arab-PK","hne":"hne-Deva-IN","hnj":"hnj-Hmng-LA","hnn":"hnn-Latn-PH","hno":"hno-Arab-PK","ho":"ho-Latn-PG","hoc":"hoc-Deva-IN","hoj":"hoj-Deva-IN","hot":"hot-Latn-ZZ","hr":"hr-Latn-HR","hsb":"hsb-Latn-DE","hsn":"hsn-Hans-CN","ht":"ht-Latn-HT","hu":"hu-Latn-HU","hui":"hui-Latn-ZZ","hy":"hy-Armn-AM","hz":"hz-Latn-NA","ia":"ia-Latn-FR","ian":"ian-Latn-ZZ","iar":"iar-Latn-ZZ","iba":"iba-Latn-MY","ibb":"ibb-Latn-NG","iby":"iby-Latn-ZZ","ica":"ica-Latn-ZZ","ich":"ich-Latn-ZZ","id":"id-Latn-ID","idd":"idd-Latn-ZZ","idi":"idi-Latn-ZZ","idu":"idu-Latn-ZZ","ife":"ife-Latn-TG","ig":"ig-Latn-NG","igb":"igb-Latn-ZZ","ige":"ige-Latn-ZZ","ii":"ii-Yiii-CN","ijj":"ijj-Latn-ZZ","ik":"ik-Latn-US","ikk":"ikk-Latn-ZZ","ikt":"ikt-Latn-CA","ikw":"ikw-Latn-ZZ","ikx":"ikx-Latn-ZZ","ilo":"ilo-Latn-PH","imo":"imo-Latn-ZZ","in":"in-Latn-ID","inh":"inh-Cyrl-RU","io":"io-Latn-001","iou":"iou-Latn-ZZ","iri":"iri-Latn-ZZ","is":"is-Latn-IS","it":"it-Latn-IT","iu":"iu-Cans-CA","iw":"iw-Hebr-IL","iwm":"iwm-Latn-ZZ","iws":"iws-Latn-ZZ","izh":"izh-Latn-RU","izi":"izi-Latn-ZZ","ja":"ja-Jpan-JP","jab":"jab-Latn-ZZ","jam":"jam-Latn-JM","jbo":"jbo-Latn-001","jbu":"jbu-Latn-ZZ","jen":"jen-Latn-ZZ","jgk":"jgk-Latn-ZZ","jgo":"jgo-Latn-CM","ji":"ji-Hebr-UA","jib":"jib-Latn-ZZ","jmc":"jmc-Latn-TZ","jml":"jml-Deva-NP","jra":"jra-Latn-ZZ","jut":"jut-Latn-DK","jv":"jv-Latn-ID","jw":"jw-Latn-ID","ka":"ka-Geor-GE","kaa":"kaa-Cyrl-UZ","kab":"kab-Latn-DZ","kac":"kac-Latn-MM","kad":"kad-Latn-ZZ","kai":"kai-Latn-ZZ","kaj":"kaj-Latn-NG","kam":"kam-Latn-KE","kao":"kao-Latn-ML","kbd":"kbd-Cyrl-RU","kbm":"kbm-Latn-ZZ","kbp":"kbp-Latn-ZZ","kbq":"kbq-Latn-ZZ","kbx":"kbx-Latn-ZZ","kby":"kby-Arab-NE","kcg":"kcg-Latn-NG","kck":"kck-Latn-ZW","kcl":"kcl-Latn-ZZ","kct":"kct-Latn-ZZ","kde":"kde-Latn-TZ","kdh":"kdh-Arab-TG","kdl":"kdl-Latn-ZZ","kdt":"kdt-Thai-TH","kea":"kea-Latn-CV","ken":"ken-Latn-CM","kez":"kez-Latn-ZZ","kfo":"kfo-Latn-CI","kfr":"kfr-Deva-IN","kfy":"kfy-Deva-IN","kg":"kg-Latn-CD","kge":"kge-Latn-ID","kgf":"kgf-Latn-ZZ","kgp":"kgp-Latn-BR","kha":"kha-Latn-IN","khb":"khb-Talu-CN","khn":"khn-Deva-IN","khq":"khq-Latn-ML","khs":"khs-Latn-ZZ","kht":"kht-Mymr-IN","khw":"khw-Arab-PK","khz":"khz-Latn-ZZ","ki":"ki-Latn-KE","kij":"kij-Latn-ZZ","kiu":"kiu-Latn-TR","kiw":"kiw-Latn-ZZ","kj":"kj-Latn-NA","kjd":"kjd-Latn-ZZ","kjg":"kjg-Laoo-LA","kjs":"kjs-Latn-ZZ","kjy":"kjy-Latn-ZZ","kk":"kk-Cyrl-KZ","kk-AF":"kk-Arab-AF","kk-Arab":"kk-Arab-CN","kk-CN":"kk-Arab-CN","kk-IR":"kk-Arab-IR","kk-MN":"kk-Arab-MN","kkc":"kkc-Latn-ZZ","kkj":"kkj-Latn-CM","kl":"kl-Latn-GL","kln":"kln-Latn-KE","klq":"klq-Latn-ZZ","klt":"klt-Latn-ZZ","klx":"klx-Latn-ZZ","km":"km-Khmr-KH","kmb":"kmb-Latn-AO","kmh":"kmh-Latn-ZZ","kmo":"kmo-Latn-ZZ","kms":"kms-Latn-ZZ","kmu":"kmu-Latn-ZZ","kmw":"kmw-Latn-ZZ","kn":"kn-Knda-IN","knf":"knf-Latn-GW","knp":"knp-Latn-ZZ","ko":"ko-Kore-KR","koi":"koi-Cyrl-RU","kok":"kok-Deva-IN","kol":"kol-Latn-ZZ","kos":"kos-Latn-FM","koz":"koz-Latn-ZZ","kpe":"kpe-Latn-LR","kpf":"kpf-Latn-ZZ","kpo":"kpo-Latn-ZZ","kpr":"kpr-Latn-ZZ","kpx":"kpx-Latn-ZZ","kqb":"kqb-Latn-ZZ","kqf":"kqf-Latn-ZZ","kqs":"kqs-Latn-ZZ","kqy":"kqy-Ethi-ZZ","kr":"kr-Latn-ZZ","krc":"krc-Cyrl-RU","kri":"kri-Latn-SL","krj":"krj-Latn-PH","krl":"krl-Latn-RU","krs":"krs-Latn-ZZ","kru":"kru-Deva-IN","ks":"ks-Arab-IN","ksb":"ksb-Latn-TZ","ksd":"ksd-Latn-ZZ","ksf":"ksf-Latn-CM","ksh":"ksh-Latn-DE","ksj":"ksj-Latn-ZZ","ksr":"ksr-Latn-ZZ","ktb":"ktb-Ethi-ZZ","ktm":"ktm-Latn-ZZ","kto":"kto-Latn-ZZ","ku":"ku-Latn-TR","ku-Arab":"ku-Arab-IQ","ku-LB":"ku-Arab-LB","kub":"kub-Latn-ZZ","kud":"kud-Latn-ZZ","kue":"kue-Latn-ZZ","kuj":"kuj-Latn-ZZ","kum":"kum-Cyrl-RU","kun":"kun-Latn-ZZ","kup":"kup-Latn-ZZ","kus":"kus-Latn-ZZ","kv":"kv-Cyrl-RU","kvg":"kvg-Latn-ZZ","kvr":"kvr-Latn-ID","kvx":"kvx-Arab-PK","kw":"kw-Latn-GB","kwj":"kwj-Latn-ZZ","kwo":"kwo-Latn-ZZ","kxa":"kxa-Latn-ZZ","kxc":"kxc-Ethi-ZZ","kxm":"kxm-Thai-TH","kxp":"kxp-Arab-PK","kxw":"kxw-Latn-ZZ","kxz":"kxz-Latn-ZZ","ky":"ky-Cyrl-KG","ky-Arab":"ky-Arab-CN","ky-CN":"ky-Arab-CN","ky-Latn":"ky-Latn-TR","ky-TR":"ky-Latn-TR","kye":"kye-Latn-ZZ","kyx":"kyx-Latn-ZZ","kzr":"kzr-Latn-ZZ","la":"la-Latn-VA","lab":"lab-Lina-GR","lad":"lad-Hebr-IL","lag":"lag-Latn-TZ","lah":"lah-Arab-PK","laj":"laj-Latn-UG","las":"las-Latn-ZZ","lb":"lb-Latn-LU","lbe":"lbe-Cyrl-RU","lbu":"lbu-Latn-ZZ","lbw":"lbw-Latn-ID","lcm":"lcm-Latn-ZZ","lcp":"lcp-Thai-CN","ldb":"ldb-Latn-ZZ","led":"led-Latn-ZZ","lee":"lee-Latn-ZZ","lem":"lem-Latn-ZZ","lep":"lep-Lepc-IN","leq":"leq-Latn-ZZ","leu":"leu-Latn-ZZ","lez":"lez-Cyrl-RU","lg":"lg-Latn-UG","lgg":"lgg-Latn-ZZ","li":"li-Latn-NL","lia":"lia-Latn-ZZ","lid":"lid-Latn-ZZ","lif":"lif-Deva-NP","lif-Limb":"lif-Limb-IN","lig":"lig-Latn-ZZ","lih":"lih-Latn-ZZ","lij":"lij-Latn-IT","lis":"lis-Lisu-CN","ljp":"ljp-Latn-ID","lki":"lki-Arab-IR","lkt":"lkt-Latn-US","lle":"lle-Latn-ZZ","lln":"lln-Latn-ZZ","lmn":"lmn-Telu-IN","lmo":"lmo-Latn-IT","lmp":"lmp-Latn-ZZ","ln":"ln-Latn-CD","lns":"lns-Latn-ZZ","lnu":"lnu-Latn-ZZ","lo":"lo-Laoo-LA","loj":"loj-Latn-ZZ","lok":"lok-Latn-ZZ","lol":"lol-Latn-CD","lor":"lor-Latn-ZZ","los":"los-Latn-ZZ","loz":"loz-Latn-ZM","lrc":"lrc-Arab-IR","lt":"lt-Latn-LT","ltg":"ltg-Latn-LV","lu":"lu-Latn-CD","lua":"lua-Latn-CD","luo":"luo-Latn-KE","luy":"luy-Latn-KE","luz":"luz-Arab-IR","lv":"lv-Latn-LV","lwl":"lwl-Thai-TH","lzh":"lzh-Hans-CN","lzz":"lzz-Latn-TR","mad":"mad-Latn-ID","maf":"maf-Latn-CM","mag":"mag-Deva-IN","mai":"mai-Deva-IN","mak":"mak-Latn-ID","man":"man-Latn-GM","man-GN":"man-Nkoo-GN","man-Nkoo":"man-Nkoo-GN","mas":"mas-Latn-KE","maw":"maw-Latn-ZZ","maz":"maz-Latn-MX","mbh":"mbh-Latn-ZZ","mbo":"mbo-Latn-ZZ","mbq":"mbq-Latn-ZZ","mbu":"mbu-Latn-ZZ","mbw":"mbw-Latn-ZZ","mci":"mci-Latn-ZZ","mcp":"mcp-Latn-ZZ","mcq":"mcq-Latn-ZZ","mcr":"mcr-Latn-ZZ","mcu":"mcu-Latn-ZZ","mda":"mda-Latn-ZZ","mde":"mde-Arab-ZZ","mdf":"mdf-Cyrl-RU","mdh":"mdh-Latn-PH","mdj":"mdj-Latn-ZZ","mdr":"mdr-Latn-ID","mdx":"mdx-Ethi-ZZ","med":"med-Latn-ZZ","mee":"mee-Latn-ZZ","mek":"mek-Latn-ZZ","men":"men-Latn-SL","mer":"mer-Latn-KE","met":"met-Latn-ZZ","meu":"meu-Latn-ZZ","mfa":"mfa-Arab-TH","mfe":"mfe-Latn-MU","mfn":"mfn-Latn-ZZ","mfo":"mfo-Latn-ZZ","mfq":"mfq-Latn-ZZ","mg":"mg-Latn-MG","mgh":"mgh-Latn-MZ","mgl":"mgl-Latn-ZZ","mgo":"mgo-Latn-CM","mgp":"mgp-Deva-NP","mgy":"mgy-Latn-TZ","mh":"mh-Latn-MH","mhi":"mhi-Latn-ZZ","mhl":"mhl-Latn-ZZ","mi":"mi-Latn-NZ","mif":"mif-Latn-ZZ","min":"min-Latn-ID","mis":"mis-Hatr-IQ","miw":"miw-Latn-ZZ","mk":"mk-Cyrl-MK","mki":"mki-Arab-ZZ","mkl":"mkl-Latn-ZZ","mkp":"mkp-Latn-ZZ","mkw":"mkw-Latn-ZZ","ml":"ml-Mlym-IN","mle":"mle-Latn-ZZ","mlp":"mlp-Latn-ZZ","mls":"mls-Latn-SD","mmo":"mmo-Latn-ZZ","mmu":"mmu-Latn-ZZ","mmx":"mmx-Latn-ZZ","mn":"mn-Cyrl-MN","mn-CN":"mn-Mong-CN","mn-Mong":"mn-Mong-CN","mna":"mna-Latn-ZZ","mnf":"mnf-Latn-ZZ","mni":"mni-Beng-IN","mnw":"mnw-Mymr-MM","moa":"moa-Latn-ZZ","moe":"moe-Latn-CA","moh":"moh-Latn-CA","mos":"mos-Latn-BF","mox":"mox-Latn-ZZ","mpp":"mpp-Latn-ZZ","mps":"mps-Latn-ZZ","mpt":"mpt-Latn-ZZ","mpx":"mpx-Latn-ZZ","mql":"mql-Latn-ZZ","mr":"mr-Deva-IN","mrd":"mrd-Deva-NP","mrj":"mrj-Cyrl-RU","mro":"mro-Mroo-BD","ms":"ms-Latn-MY","ms-CC":"ms-Arab-CC","ms-ID":"ms-Arab-ID","mt":"mt-Latn-MT","mtc":"mtc-Latn-ZZ","mtf":"mtf-Latn-ZZ","mti":"mti-Latn-ZZ","mtr":"mtr-Deva-IN","mua":"mua-Latn-CM","mur":"mur-Latn-ZZ","mus":"mus-Latn-US","mva":"mva-Latn-ZZ","mvn":"mvn-Latn-ZZ","mvy":"mvy-Arab-PK","mwk":"mwk-Latn-ML","mwr":"mwr-Deva-IN","mwv":"mwv-Latn-ID","mxc":"mxc-Latn-ZW","mxm":"mxm-Latn-ZZ","my":"my-Mymr-MM","myk":"myk-Latn-ZZ","mym":"mym-Ethi-ZZ","myv":"myv-Cyrl-RU","myw":"myw-Latn-ZZ","myx":"myx-Latn-UG","myz":"myz-Mand-IR","mzk":"mzk-Latn-ZZ","mzm":"mzm-Latn-ZZ","mzn":"mzn-Arab-IR","mzp":"mzp-Latn-ZZ","mzw":"mzw-Latn-ZZ","mzz":"mzz-Latn-ZZ","na":"na-Latn-NR","nac":"nac-Latn-ZZ","naf":"naf-Latn-ZZ","nak":"nak-Latn-ZZ","nan":"nan-Hans-CN","nap":"nap-Latn-IT","naq":"naq-Latn-NA","nas":"nas-Latn-ZZ","nb":"nb-Latn-NO","nca":"nca-Latn-ZZ","nce":"nce-Latn-ZZ","ncf":"ncf-Latn-ZZ","nch":"nch-Latn-MX","nco":"nco-Latn-ZZ","ncu":"ncu-Latn-ZZ","nd":"nd-Latn-ZW","ndc":"ndc-Latn-MZ","nds":"nds-Latn-DE","ne":"ne-Deva-NP","neb":"neb-Latn-ZZ","new":"new-Deva-NP","nex":"nex-Latn-ZZ","nfr":"nfr-Latn-ZZ","ng":"ng-Latn-NA","nga":"nga-Latn-ZZ","ngb":"ngb-Latn-ZZ","ngl":"ngl-Latn-MZ","nhb":"nhb-Latn-ZZ","nhe":"nhe-Latn-MX","nhw":"nhw-Latn-MX","nif":"nif-Latn-ZZ","nii":"nii-Latn-ZZ","nij":"nij-Latn-ID","nin":"nin-Latn-ZZ","niu":"niu-Latn-NU","niy":"niy-Latn-ZZ","niz":"niz-Latn-ZZ","njo":"njo-Latn-IN","nkg":"nkg-Latn-ZZ","nko":"nko-Latn-ZZ","nl":"nl-Latn-NL","nmg":"nmg-Latn-CM","nmz":"nmz-Latn-ZZ","nn":"nn-Latn-NO","nnf":"nnf-Latn-ZZ","nnh":"nnh-Latn-CM","nnk":"nnk-Latn-ZZ","nnm":"nnm-Latn-ZZ","no":"no-Latn-NO","nod":"nod-Lana-TH","noe":"noe-Deva-IN","non":"non-Runr-SE","nop":"nop-Latn-ZZ","nou":"nou-Latn-ZZ","nqo":"nqo-Nkoo-GN","nr":"nr-Latn-ZA","nrb":"nrb-Latn-ZZ","nsk":"nsk-Cans-CA","nsn":"nsn-Latn-ZZ","nso":"nso-Latn-ZA","nss":"nss-Latn-ZZ","ntm":"ntm-Latn-ZZ","ntr":"ntr-Latn-ZZ","nui":"nui-Latn-ZZ","nup":"nup-Latn-ZZ","nus":"nus-Latn-SS","nuv":"nuv-Latn-ZZ","nux":"nux-Latn-ZZ","nv":"nv-Latn-US","nwb":"nwb-Latn-ZZ","nxq":"nxq-Latn-CN","nxr":"nxr-Latn-ZZ","ny":"ny-Latn-MW","nym":"nym-Latn-TZ","nyn":"nyn-Latn-UG","nzi":"nzi-Latn-GH","oc":"oc-Latn-FR","ogc":"ogc-Latn-ZZ","okr":"okr-Latn-ZZ","okv":"okv-Latn-ZZ","om":"om-Latn-ET","ong":"ong-Latn-ZZ","onn":"onn-Latn-ZZ","ons":"ons-Latn-ZZ","opm":"opm-Latn-ZZ","or":"or-Orya-IN","oro":"oro-Latn-ZZ","oru":"oru-Arab-ZZ","os":"os-Cyrl-GE","osa":"osa-Osge-US","ota":"ota-Arab-ZZ","otk":"otk-Orkh-MN","ozm":"ozm-Latn-ZZ","pa":"pa-Guru-IN","pa-Arab":"pa-Arab-PK","pa-PK":"pa-Arab-PK","pag":"pag-Latn-PH","pal":"pal-Phli-IR","pal-Phlp":"pal-Phlp-CN","pam":"pam-Latn-PH","pap":"pap-Latn-AW","pau":"pau-Latn-PW","pbi":"pbi-Latn-ZZ","pcd":"pcd-Latn-FR","pcm":"pcm-Latn-NG","pdc":"pdc-Latn-US","pdt":"pdt-Latn-CA","ped":"ped-Latn-ZZ","peo":"peo-Xpeo-IR","pex":"pex-Latn-ZZ","pfl":"pfl-Latn-DE","phl":"phl-Arab-ZZ","phn":"phn-Phnx-LB","pil":"pil-Latn-ZZ","pip":"pip-Latn-ZZ","pka":"pka-Brah-IN","pko":"pko-Latn-KE","pl":"pl-Latn-PL","pla":"pla-Latn-ZZ","pms":"pms-Latn-IT","png":"png-Latn-ZZ","pnn":"pnn-Latn-ZZ","pnt":"pnt-Grek-GR","pon":"pon-Latn-FM","ppo":"ppo-Latn-ZZ","pra":"pra-Khar-PK","prd":"prd-Arab-IR","prg":"prg-Latn-001","ps":"ps-Arab-AF","pss":"pss-Latn-ZZ","pt":"pt-Latn-BR","ptp":"ptp-Latn-ZZ","puu":"puu-Latn-GA","pwa":"pwa-Latn-ZZ","qu":"qu-Latn-PE","quc":"quc-Latn-GT","qug":"qug-Latn-EC","rai":"rai-Latn-ZZ","raj":"raj-Deva-IN","rao":"rao-Latn-ZZ","rcf":"rcf-Latn-RE","rej":"rej-Latn-ID","rel":"rel-Latn-ZZ","res":"res-Latn-ZZ","rgn":"rgn-Latn-IT","rhg":"rhg-Arab-ZZ","ria":"ria-Latn-IN","rif":"rif-Tfng-MA","rif-NL":"rif-Latn-NL","rjs":"rjs-Deva-NP","rkt":"rkt-Beng-BD","rm":"rm-Latn-CH","rmf":"rmf-Latn-FI","rmo":"rmo-Latn-CH","rmt":"rmt-Arab-IR","rmu":"rmu-Latn-SE","rn":"rn-Latn-BI","rna":"rna-Latn-ZZ","rng":"rng-Latn-MZ","ro":"ro-Latn-RO","rob":"rob-Latn-ID","rof":"rof-Latn-TZ","roo":"roo-Latn-ZZ","rro":"rro-Latn-ZZ","rtm":"rtm-Latn-FJ","ru":"ru-Cyrl-RU","rue":"rue-Cyrl-UA","rug":"rug-Latn-SB","rw":"rw-Latn-RW","rwk":"rwk-Latn-TZ","rwo":"rwo-Latn-ZZ","ryu":"ryu-Kana-JP","sa":"sa-Deva-IN","saf":"saf-Latn-GH","sah":"sah-Cyrl-RU","saq":"saq-Latn-KE","sas":"sas-Latn-ID","sat":"sat-Latn-IN","sav":"sav-Latn-SN","saz":"saz-Saur-IN","sba":"sba-Latn-ZZ","sbe":"sbe-Latn-ZZ","sbp":"sbp-Latn-TZ","sc":"sc-Latn-IT","sck":"sck-Deva-IN","scl":"scl-Arab-ZZ","scn":"scn-Latn-IT","sco":"sco-Latn-GB","scs":"scs-Latn-CA","sd":"sd-Arab-PK","sd-Deva":"sd-Deva-IN","sd-Khoj":"sd-Khoj-IN","sd-Sind":"sd-Sind-IN","sdc":"sdc-Latn-IT","sdh":"sdh-Arab-IR","se":"se-Latn-NO","sef":"sef-Latn-CI","seh":"seh-Latn-MZ","sei":"sei-Latn-MX","ses":"ses-Latn-ML","sg":"sg-Latn-CF","sga":"sga-Ogam-IE","sgs":"sgs-Latn-LT","sgw":"sgw-Ethi-ZZ","sgz":"sgz-Latn-ZZ","shi":"shi-Tfng-MA","shk":"shk-Latn-ZZ","shn":"shn-Mymr-MM","shu":"shu-Arab-ZZ","si":"si-Sinh-LK","sid":"sid-Latn-ET","sig":"sig-Latn-ZZ","sil":"sil-Latn-ZZ","sim":"sim-Latn-ZZ","sjr":"sjr-Latn-ZZ","sk":"sk-Latn-SK","skc":"skc-Latn-ZZ","skr":"skr-Arab-PK","sks":"sks-Latn-ZZ","sl":"sl-Latn-SI","sld":"sld-Latn-ZZ","sli":"sli-Latn-PL","sll":"sll-Latn-ZZ","sly":"sly-Latn-ID","sm":"sm-Latn-WS","sma":"sma-Latn-SE","smj":"smj-Latn-SE","smn":"smn-Latn-FI","smp":"smp-Samr-IL","smq":"smq-Latn-ZZ","sms":"sms-Latn-FI","sn":"sn-Latn-ZW","snc":"snc-Latn-ZZ","snk":"snk-Latn-ML","snp":"snp-Latn-ZZ","snx":"snx-Latn-ZZ","sny":"sny-Latn-ZZ","so":"so-Latn-SO","sok":"sok-Latn-ZZ","soq":"soq-Latn-ZZ","sou":"sou-Thai-TH","soy":"soy-Latn-ZZ","spd":"spd-Latn-ZZ","spl":"spl-Latn-ZZ","sps":"sps-Latn-ZZ","sq":"sq-Latn-AL","sr":"sr-Cyrl-RS","sr-ME":"sr-Latn-ME","sr-RO":"sr-Latn-RO","sr-RU":"sr-Latn-RU","sr-TR":"sr-Latn-TR","srb":"srb-Sora-IN","srn":"srn-Latn-SR","srr":"srr-Latn-SN","srx":"srx-Deva-IN","ss":"ss-Latn-ZA","ssd":"ssd-Latn-ZZ","ssg":"ssg-Latn-ZZ","ssy":"ssy-Latn-ER","st":"st-Latn-ZA","stk":"stk-Latn-ZZ","stq":"stq-Latn-DE","su":"su-Latn-ID","sua":"sua-Latn-ZZ","sue":"sue-Latn-ZZ","suk":"suk-Latn-TZ","sur":"sur-Latn-ZZ","sus":"sus-Latn-GN","sv":"sv-Latn-SE","sw":"sw-Latn-TZ","swb":"swb-Arab-YT","swc":"swc-Latn-CD","swg":"swg-Latn-DE","swp":"swp-Latn-ZZ","swv":"swv-Deva-IN","sxn":"sxn-Latn-ID","sxw":"sxw-Latn-ZZ","syl":"syl-Beng-BD","syr":"syr-Syrc-IQ","szl":"szl-Latn-PL","ta":"ta-Taml-IN","taj":"taj-Deva-NP","tal":"tal-Latn-ZZ","tan":"tan-Latn-ZZ","taq":"taq-Latn-ZZ","tbc":"tbc-Latn-ZZ","tbd":"tbd-Latn-ZZ","tbf":"tbf-Latn-ZZ","tbg":"tbg-Latn-ZZ","tbo":"tbo-Latn-ZZ","tbw":"tbw-Latn-PH","tbz":"tbz-Latn-ZZ","tci":"tci-Latn-ZZ","tcy":"tcy-Knda-IN","tdd":"tdd-Tale-CN","tdg":"tdg-Deva-NP","tdh":"tdh-Deva-NP","te":"te-Telu-IN","ted":"ted-Latn-ZZ","tem":"tem-Latn-SL","teo":"teo-Latn-UG","tet":"tet-Latn-TL","tfi":"tfi-Latn-ZZ","tg":"tg-Cyrl-TJ","tg-Arab":"tg-Arab-PK","tg-PK":"tg-Arab-PK","tgc":"tgc-Latn-ZZ","tgo":"tgo-Latn-ZZ","tgu":"tgu-Latn-ZZ","th":"th-Thai-TH","thl":"thl-Deva-NP","thq":"thq-Deva-NP","thr":"thr-Deva-NP","ti":"ti-Ethi-ET","tif":"tif-Latn-ZZ","tig":"tig-Ethi-ER","tik":"tik-Latn-ZZ","tim":"tim-Latn-ZZ","tio":"tio-Latn-ZZ","tiv":"tiv-Latn-NG","tk":"tk-Latn-TM","tkl":"tkl-Latn-TK","tkr":"tkr-Latn-AZ","tkt":"tkt-Deva-NP","tl":"tl-Latn-PH","tlf":"tlf-Latn-ZZ","tlx":"tlx-Latn-ZZ","tly":"tly-Latn-AZ","tmh":"tmh-Latn-NE","tmy":"tmy-Latn-ZZ","tn":"tn-Latn-ZA","tnh":"tnh-Latn-ZZ","to":"to-Latn-TO","tof":"tof-Latn-ZZ","tog":"tog-Latn-MW","toq":"toq-Latn-ZZ","tpi":"tpi-Latn-PG","tpm":"tpm-Latn-ZZ","tpz":"tpz-Latn-ZZ","tqo":"tqo-Latn-ZZ","tr":"tr-Latn-TR","tru":"tru-Latn-TR","trv":"trv-Latn-TW","trw":"trw-Arab-ZZ","ts":"ts-Latn-ZA","tsd":"tsd-Grek-GR","tsf":"tsf-Deva-NP","tsg":"tsg-Latn-PH","tsj":"tsj-Tibt-BT","tsw":"tsw-Latn-ZZ","tt":"tt-Cyrl-RU","ttd":"ttd-Latn-ZZ","tte":"tte-Latn-ZZ","ttj":"ttj-Latn-UG","ttr":"ttr-Latn-ZZ","tts":"tts-Thai-TH","ttt":"ttt-Latn-AZ","tuh":"tuh-Latn-ZZ","tul":"tul-Latn-ZZ","tum":"tum-Latn-MW","tuq":"tuq-Latn-ZZ","tvd":"tvd-Latn-ZZ","tvl":"tvl-Latn-TV","tvu":"tvu-Latn-ZZ","twh":"twh-Latn-ZZ","twq":"twq-Latn-NE","txg":"txg-Tang-CN","ty":"ty-Latn-PF","tya":"tya-Latn-ZZ","tyv":"tyv-Cyrl-RU","tzm":"tzm-Latn-MA","ubu":"ubu-Latn-ZZ","udm":"udm-Cyrl-RU","ug":"ug-Arab-CN","ug-Cyrl":"ug-Cyrl-KZ","ug-KZ":"ug-Cyrl-KZ","ug-MN":"ug-Cyrl-MN","uga":"uga-Ugar-SY","uk":"uk-Cyrl-UA","uli":"uli-Latn-FM","umb":"umb-Latn-AO","und":"en-Latn-US","und-002":"en-Latn-NG","und-003":"en-Latn-US","und-005":"pt-Latn-BR","und-009":"en-Latn-AU","und-011":"en-Latn-NG","und-013":"es-Latn-MX","und-014":"sw-Latn-TZ","und-015":"ar-Arab-EG","und-017":"sw-Latn-CD","und-018":"en-Latn-ZA","und-019":"en-Latn-US","und-021":"en-Latn-US","und-029":"es-Latn-CU","und-030":"zh-Hans-CN","und-034":"hi-Deva-IN","und-035":"id-Latn-ID","und-039":"it-Latn-IT","und-053":"en-Latn-AU","und-054":"en-Latn-PG","und-057":"en-Latn-GU","und-061":"sm-Latn-WS","und-142":"zh-Hans-CN","und-143":"uz-Latn-UZ","und-145":"ar-Arab-SA","und-150":"ru-Cyrl-RU","und-151":"ru-Cyrl-RU","und-154":"en-Latn-GB","und-155":"de-Latn-DE","und-202":"en-Latn-NG","und-419":"es-Latn-419","und-AD":"ca-Latn-AD","und-Adlm":"ff-Adlm-GN","und-AE":"ar-Arab-AE","und-AF":"fa-Arab-AF","und-Aghb":"lez-Aghb-RU","und-Ahom":"aho-Ahom-IN","und-AL":"sq-Latn-AL","und-AM":"hy-Armn-AM","und-AO":"pt-Latn-AO","und-AQ":"und-Latn-AQ","und-AR":"es-Latn-AR","und-Arab":"ar-Arab-EG","und-Arab-CC":"ms-Arab-CC","und-Arab-CN":"ug-Arab-CN","und-Arab-GB":"ks-Arab-GB","und-Arab-ID":"ms-Arab-ID","und-Arab-IN":"ur-Arab-IN","und-Arab-KH":"cja-Arab-KH","und-Arab-MN":"kk-Arab-MN","und-Arab-MU":"ur-Arab-MU","und-Arab-NG":"ha-Arab-NG","und-Arab-PK":"ur-Arab-PK","und-Arab-TG":"apd-Arab-TG","und-Arab-TH":"mfa-Arab-TH","und-Arab-TJ":"fa-Arab-TJ","und-Arab-TR":"az-Arab-TR","und-Arab-YT":"swb-Arab-YT","und-Armi":"arc-Armi-IR","und-Armn":"hy-Armn-AM","und-AS":"sm-Latn-AS","und-AT":"de-Latn-AT","und-Avst":"ae-Avst-IR","und-AW":"nl-Latn-AW","und-AX":"sv-Latn-AX","und-AZ":"az-Latn-AZ","und-BA":"bs-Latn-BA","und-Bali":"ban-Bali-ID","und-Bamu":"bax-Bamu-CM","und-Bass":"bsq-Bass-LR","und-Batk":"bbc-Batk-ID","und-BD":"bn-Beng-BD","und-BE":"nl-Latn-BE","und-Beng":"bn-Beng-BD","und-BF":"fr-Latn-BF","und-BG":"bg-Cyrl-BG","und-BH":"ar-Arab-BH","und-Bhks":"sa-Bhks-IN","und-BI":"rn-Latn-BI","und-BJ":"fr-Latn-BJ","und-BL":"fr-Latn-BL","und-BN":"ms-Latn-BN","und-BO":"es-Latn-BO","und-Bopo":"zh-Bopo-TW","und-BQ":"pap-Latn-BQ","und-BR":"pt-Latn-BR","und-Brah":"pka-Brah-IN","und-Brai":"fr-Brai-FR","und-BT":"dz-Tibt-BT","und-Bugi":"bug-Bugi-ID","und-Buhd":"bku-Buhd-PH","und-BV":"und-Latn-BV","und-BY":"be-Cyrl-BY","und-Cakm":"ccp-Cakm-BD","und-Cans":"cr-Cans-CA","und-Cari":"xcr-Cari-TR","und-CD":"sw-Latn-CD","und-CF":"fr-Latn-CF","und-CG":"fr-Latn-CG","und-CH":"de-Latn-CH","und-Cham":"cjm-Cham-VN","und-Cher":"chr-Cher-US","und-CI":"fr-Latn-CI","und-CL":"es-Latn-CL","und-CM":"fr-Latn-CM","und-CN":"zh-Hans-CN","und-CO":"es-Latn-CO","und-Copt":"cop-Copt-EG","und-CP":"und-Latn-CP","und-Cprt":"grc-Cprt-CY","und-CR":"es-Latn-CR","und-CU":"es-Latn-CU","und-CV":"pt-Latn-CV","und-CW":"pap-Latn-CW","und-CY":"el-Grek-CY","und-Cyrl":"ru-Cyrl-RU","und-Cyrl-AL":"mk-Cyrl-AL","und-Cyrl-BA":"sr-Cyrl-BA","und-Cyrl-GE":"ab-Cyrl-GE","und-Cyrl-GR":"mk-Cyrl-GR","und-Cyrl-MD":"uk-Cyrl-MD","und-Cyrl-RO":"bg-Cyrl-RO","und-Cyrl-SK":"uk-Cyrl-SK","und-Cyrl-TR":"kbd-Cyrl-TR","und-Cyrl-XK":"sr-Cyrl-XK","und-CZ":"cs-Latn-CZ","und-DE":"de-Latn-DE","und-Deva":"hi-Deva-IN","und-Deva-BT":"ne-Deva-BT","und-Deva-FJ":"hif-Deva-FJ","und-Deva-MU":"bho-Deva-MU","und-Deva-PK":"btv-Deva-PK","und-DJ":"aa-Latn-DJ","und-DK":"da-Latn-DK","und-DO":"es-Latn-DO","und-Dupl":"fr-Dupl-FR","und-DZ":"ar-Arab-DZ","und-EA":"es-Latn-EA","und-EC":"es-Latn-EC","und-EE":"et-Latn-EE","und-EG":"ar-Arab-EG","und-Egyp":"egy-Egyp-EG","und-EH":"ar-Arab-EH","und-Elba":"sq-Elba-AL","und-ER":"ti-Ethi-ER","und-ES":"es-Latn-ES","und-ET":"am-Ethi-ET","und-Ethi":"am-Ethi-ET","und-EU":"en-Latn-GB","und-EZ":"de-Latn-EZ","und-FI":"fi-Latn-FI","und-FO":"fo-Latn-FO","und-FR":"fr-Latn-FR","und-GA":"fr-Latn-GA","und-GE":"ka-Geor-GE","und-Geor":"ka-Geor-GE","und-GF":"fr-Latn-GF","und-GH":"ak-Latn-GH","und-GL":"kl-Latn-GL","und-Glag":"cu-Glag-BG","und-GN":"fr-Latn-GN","und-Gonm":"gon-Gonm-IN","und-Goth":"got-Goth-UA","und-GP":"fr-Latn-GP","und-GQ":"es-Latn-GQ","und-GR":"el-Grek-GR","und-Gran":"sa-Gran-IN","und-Grek":"el-Grek-GR","und-Grek-TR":"bgx-Grek-TR","und-GS":"und-Latn-GS","und-GT":"es-Latn-GT","und-Gujr":"gu-Gujr-IN","und-Guru":"pa-Guru-IN","und-GW":"pt-Latn-GW","und-Hanb":"zh-Hanb-TW","und-Hang":"ko-Hang-KR","und-Hani":"zh-Hani-CN","und-Hano":"hnn-Hano-PH","und-Hans":"zh-Hans-CN","und-Hant":"zh-Hant-TW","und-Hatr":"mis-Hatr-IQ","und-Hebr":"he-Hebr-IL","und-Hebr-CA":"yi-Hebr-CA","und-Hebr-GB":"yi-Hebr-GB","und-Hebr-SE":"yi-Hebr-SE","und-Hebr-UA":"yi-Hebr-UA","und-Hebr-US":"yi-Hebr-US","und-Hira":"ja-Hira-JP","und-HK":"zh-Hant-HK","und-Hluw":"hlu-Hluw-TR","und-HM":"und-Latn-HM","und-Hmng":"hnj-Hmng-LA","und-HN":"es-Latn-HN","und-HR":"hr-Latn-HR","und-HT":"ht-Latn-HT","und-HU":"hu-Latn-HU","und-Hung":"hu-Hung-HU","und-IC":"es-Latn-IC","und-ID":"id-Latn-ID","und-IL":"he-Hebr-IL","und-IN":"hi-Deva-IN","und-IQ":"ar-Arab-IQ","und-IR":"fa-Arab-IR","und-IS":"is-Latn-IS","und-IT":"it-Latn-IT","und-Ital":"ett-Ital-IT","und-Jamo":"ko-Jamo-KR","und-Java":"jv-Java-ID","und-JO":"ar-Arab-JO","und-JP":"ja-Jpan-JP","und-Jpan":"ja-Jpan-JP","und-Kali":"eky-Kali-MM","und-Kana":"ja-Kana-JP","und-KE":"sw-Latn-KE","und-KG":"ky-Cyrl-KG","und-KH":"km-Khmr-KH","und-Khar":"pra-Khar-PK","und-Khmr":"km-Khmr-KH","und-Khoj":"sd-Khoj-IN","und-KM":"ar-Arab-KM","und-Knda":"kn-Knda-IN","und-Kore":"ko-Kore-KR","und-KP":"ko-Kore-KP","und-KR":"ko-Kore-KR","und-Kthi":"bho-Kthi-IN","und-KW":"ar-Arab-KW","und-KZ":"ru-Cyrl-KZ","und-LA":"lo-Laoo-LA","und-Lana":"nod-Lana-TH","und-Laoo":"lo-Laoo-LA","und-Latn-AF":"tk-Latn-AF","und-Latn-AM":"ku-Latn-AM","und-Latn-CN":"za-Latn-CN","und-Latn-CY":"tr-Latn-CY","und-Latn-DZ":"fr-Latn-DZ","und-Latn-ET":"en-Latn-ET","und-Latn-GE":"ku-Latn-GE","und-Latn-IR":"tk-Latn-IR","und-Latn-KM":"fr-Latn-KM","und-Latn-MA":"fr-Latn-MA","und-Latn-MK":"sq-Latn-MK","und-Latn-MM":"kac-Latn-MM","und-Latn-MO":"pt-Latn-MO","und-Latn-MR":"fr-Latn-MR","und-Latn-RU":"krl-Latn-RU","und-Latn-SY":"fr-Latn-SY","und-Latn-TN":"fr-Latn-TN","und-Latn-TW":"trv-Latn-TW","und-Latn-UA":"pl-Latn-UA","und-LB":"ar-Arab-LB","und-Lepc":"lep-Lepc-IN","und-LI":"de-Latn-LI","und-Limb":"lif-Limb-IN","und-Lina":"lab-Lina-GR","und-Linb":"grc-Linb-GR","und-Lisu":"lis-Lisu-CN","und-LK":"si-Sinh-LK","und-LS":"st-Latn-LS","und-LT":"lt-Latn-LT","und-LU":"fr-Latn-LU","und-LV":"lv-Latn-LV","und-LY":"ar-Arab-LY","und-Lyci":"xlc-Lyci-TR","und-Lydi":"xld-Lydi-TR","und-MA":"ar-Arab-MA","und-Mahj":"hi-Mahj-IN","und-Mand":"myz-Mand-IR","und-Mani":"xmn-Mani-CN","und-Marc":"bo-Marc-CN","und-MC":"fr-Latn-MC","und-MD":"ro-Latn-MD","und-ME":"sr-Latn-ME","und-Mend":"men-Mend-SL","und-Merc":"xmr-Merc-SD","und-Mero":"xmr-Mero-SD","und-MF":"fr-Latn-MF","und-MG":"mg-Latn-MG","und-MK":"mk-Cyrl-MK","und-ML":"bm-Latn-ML","und-Mlym":"ml-Mlym-IN","und-MM":"my-Mymr-MM","und-MN":"mn-Cyrl-MN","und-MO":"zh-Hant-MO","und-Modi":"mr-Modi-IN","und-Mong":"mn-Mong-CN","und-MQ":"fr-Latn-MQ","und-MR":"ar-Arab-MR","und-Mroo":"mro-Mroo-BD","und-MT":"mt-Latn-MT","und-Mtei":"mni-Mtei-IN","und-MU":"mfe-Latn-MU","und-Mult":"skr-Mult-PK","und-MV":"dv-Thaa-MV","und-MX":"es-Latn-MX","und-MY":"ms-Latn-MY","und-Mymr":"my-Mymr-MM","und-Mymr-IN":"kht-Mymr-IN","und-Mymr-TH":"mnw-Mymr-TH","und-MZ":"pt-Latn-MZ","und-NA":"af-Latn-NA","und-Narb":"xna-Narb-SA","und-Nbat":"arc-Nbat-JO","und-NC":"fr-Latn-NC","und-NE":"ha-Latn-NE","und-Newa":"new-Newa-NP","und-NI":"es-Latn-NI","und-Nkoo":"man-Nkoo-GN","und-NL":"nl-Latn-NL","und-NO":"nb-Latn-NO","und-NP":"ne-Deva-NP","und-Nshu":"zhx-Nshu-CN","und-Ogam":"sga-Ogam-IE","und-Olck":"sat-Olck-IN","und-OM":"ar-Arab-OM","und-Orkh":"otk-Orkh-MN","und-Orya":"or-Orya-IN","und-Osge":"osa-Osge-US","und-Osma":"so-Osma-SO","und-PA":"es-Latn-PA","und-Palm":"arc-Palm-SY","und-Pauc":"ctd-Pauc-MM","und-PE":"es-Latn-PE","und-Perm":"kv-Perm-RU","und-PF":"fr-Latn-PF","und-PG":"tpi-Latn-PG","und-PH":"fil-Latn-PH","und-Phag":"lzh-Phag-CN","und-Phli":"pal-Phli-IR","und-Phlp":"pal-Phlp-CN","und-Phnx":"phn-Phnx-LB","und-PK":"ur-Arab-PK","und-PL":"pl-Latn-PL","und-Plrd":"hmd-Plrd-CN","und-PM":"fr-Latn-PM","und-PR":"es-Latn-PR","und-Prti":"xpr-Prti-IR","und-PS":"ar-Arab-PS","und-PT":"pt-Latn-PT","und-PW":"pau-Latn-PW","und-PY":"gn-Latn-PY","und-QA":"ar-Arab-QA","und-QO":"en-Latn-DG","und-RE":"fr-Latn-RE","und-Rjng":"rej-Rjng-ID","und-RO":"ro-Latn-RO","und-RS":"sr-Cyrl-RS","und-RU":"ru-Cyrl-RU","und-Runr":"non-Runr-SE","und-RW":"rw-Latn-RW","und-SA":"ar-Arab-SA","und-Samr":"smp-Samr-IL","und-Sarb":"xsa-Sarb-YE","und-Saur":"saz-Saur-IN","und-SC":"fr-Latn-SC","und-SD":"ar-Arab-SD","und-SE":"sv-Latn-SE","und-Sgnw":"ase-Sgnw-US","und-Shaw":"en-Shaw-GB","und-Shrd":"sa-Shrd-IN","und-SI":"sl-Latn-SI","und-Sidd":"sa-Sidd-IN","und-Sind":"sd-Sind-IN","und-Sinh":"si-Sinh-LK","und-SJ":"nb-Latn-SJ","und-SK":"sk-Latn-SK","und-SM":"it-Latn-SM","und-SN":"fr-Latn-SN","und-SO":"so-Latn-SO","und-Sora":"srb-Sora-IN","und-Soyo":"cmg-Soyo-MN","und-SR":"nl-Latn-SR","und-ST":"pt-Latn-ST","und-Sund":"su-Sund-ID","und-SV":"es-Latn-SV","und-SY":"ar-Arab-SY","und-Sylo":"syl-Sylo-BD","und-Syrc":"syr-Syrc-IQ","und-Tagb":"tbw-Tagb-PH","und-Takr":"doi-Takr-IN","und-Tale":"tdd-Tale-CN","und-Talu":"khb-Talu-CN","und-Taml":"ta-Taml-IN","und-Tang":"txg-Tang-CN","und-Tavt":"blt-Tavt-VN","und-TD":"fr-Latn-TD","und-Telu":"te-Telu-IN","und-TF":"fr-Latn-TF","und-Tfng":"zgh-Tfng-MA","und-TG":"fr-Latn-TG","und-Tglg":"fil-Tglg-PH","und-TH":"th-Thai-TH","und-Thaa":"dv-Thaa-MV","und-Thai":"th-Thai-TH","und-Thai-CN":"lcp-Thai-CN","und-Thai-KH":"kdt-Thai-KH","und-Thai-LA":"kdt-Thai-LA","und-Tibt":"bo-Tibt-CN","und-Tirh":"mai-Tirh-IN","und-TJ":"tg-Cyrl-TJ","und-TK":"tkl-Latn-TK","und-TL":"pt-Latn-TL","und-TM":"tk-Latn-TM","und-TN":"ar-Arab-TN","und-TO":"to-Latn-TO","und-TR":"tr-Latn-TR","und-TV":"tvl-Latn-TV","und-TW":"zh-Hant-TW","und-TZ":"sw-Latn-TZ","und-UA":"uk-Cyrl-UA","und-UG":"sw-Latn-UG","und-Ugar":"uga-Ugar-SY","und-UY":"es-Latn-UY","und-UZ":"uz-Latn-UZ","und-VA":"it-Latn-VA","und-Vaii":"vai-Vaii-LR","und-VE":"es-Latn-VE","und-VN":"vi-Latn-VN","und-VU":"bi-Latn-VU","und-Wara":"hoc-Wara-IN","und-WF":"fr-Latn-WF","und-WS":"sm-Latn-WS","und-XK":"sq-Latn-XK","und-Xpeo":"peo-Xpeo-IR","und-Xsux":"akk-Xsux-IQ","und-YE":"ar-Arab-YE","und-Yiii":"ii-Yiii-CN","und-YT":"fr-Latn-YT","und-Zanb":"cmg-Zanb-MN","und-ZW":"sn-Latn-ZW","unr":"unr-Beng-IN","unr-Deva":"unr-Deva-NP","unr-NP":"unr-Deva-NP","unx":"unx-Beng-IN","ur":"ur-Arab-PK","uri":"uri-Latn-ZZ","urt":"urt-Latn-ZZ","urw":"urw-Latn-ZZ","usa":"usa-Latn-ZZ","utr":"utr-Latn-ZZ","uvh":"uvh-Latn-ZZ","uvl":"uvl-Latn-ZZ","uz":"uz-Latn-UZ","uz-AF":"uz-Arab-AF","uz-Arab":"uz-Arab-AF","uz-CN":"uz-Cyrl-CN","vag":"vag-Latn-ZZ","vai":"vai-Vaii-LR","van":"van-Latn-ZZ","ve":"ve-Latn-ZA","vec":"vec-Latn-IT","vep":"vep-Latn-RU","vi":"vi-Latn-VN","vic":"vic-Latn-SX","viv":"viv-Latn-ZZ","vls":"vls-Latn-BE","vmf":"vmf-Latn-DE","vmw":"vmw-Latn-MZ","vo":"vo-Latn-001","vot":"vot-Latn-RU","vro":"vro-Latn-EE","vun":"vun-Latn-TZ","vut":"vut-Latn-ZZ","wa":"wa-Latn-BE","wae":"wae-Latn-CH","waj":"waj-Latn-ZZ","wal":"wal-Ethi-ET","wan":"wan-Latn-ZZ","war":"war-Latn-PH","wbp":"wbp-Latn-AU","wbq":"wbq-Telu-IN","wbr":"wbr-Deva-IN","wci":"wci-Latn-ZZ","wer":"wer-Latn-ZZ","wgi":"wgi-Latn-ZZ","whg":"whg-Latn-ZZ","wib":"wib-Latn-ZZ","wiu":"wiu-Latn-ZZ","wiv":"wiv-Latn-ZZ","wja":"wja-Latn-ZZ","wji":"wji-Latn-ZZ","wls":"wls-Latn-WF","wmo":"wmo-Latn-ZZ","wnc":"wnc-Latn-ZZ","wni":"wni-Arab-KM","wnu":"wnu-Latn-ZZ","wo":"wo-Latn-SN","wob":"wob-Latn-ZZ","wos":"wos-Latn-ZZ","wrs":"wrs-Latn-ZZ","wsk":"wsk-Latn-ZZ","wtm":"wtm-Deva-IN","wuu":"wuu-Hans-CN","wuv":"wuv-Latn-ZZ","wwa":"wwa-Latn-ZZ","xav":"xav-Latn-BR","xbi":"xbi-Latn-ZZ","xcr":"xcr-Cari-TR","xes":"xes-Latn-ZZ","xh":"xh-Latn-ZA","xla":"xla-Latn-ZZ","xlc":"xlc-Lyci-TR","xld":"xld-Lydi-TR","xmf":"xmf-Geor-GE","xmn":"xmn-Mani-CN","xmr":"xmr-Merc-SD","xna":"xna-Narb-SA","xnr":"xnr-Deva-IN","xog":"xog-Latn-UG","xon":"xon-Latn-ZZ","xpr":"xpr-Prti-IR","xrb":"xrb-Latn-ZZ","xsa":"xsa-Sarb-YE","xsi":"xsi-Latn-ZZ","xsm":"xsm-Latn-ZZ","xsr":"xsr-Deva-NP","xwe":"xwe-Latn-ZZ","yam":"yam-Latn-ZZ","yao":"yao-Latn-MZ","yap":"yap-Latn-FM","yas":"yas-Latn-ZZ","yat":"yat-Latn-ZZ","yav":"yav-Latn-CM","yay":"yay-Latn-ZZ","yaz":"yaz-Latn-ZZ","yba":"yba-Latn-ZZ","ybb":"ybb-Latn-CM","yby":"yby-Latn-ZZ","yer":"yer-Latn-ZZ","ygr":"ygr-Latn-ZZ","ygw":"ygw-Latn-ZZ","yi":"yi-Hebr-001","yko":"yko-Latn-ZZ","yle":"yle-Latn-ZZ","ylg":"ylg-Latn-ZZ","yll":"yll-Latn-ZZ","yml":"yml-Latn-ZZ","yo":"yo-Latn-NG","yon":"yon-Latn-ZZ","yrb":"yrb-Latn-ZZ","yre":"yre-Latn-ZZ","yrl":"yrl-Latn-BR","yss":"yss-Latn-ZZ","yua":"yua-Latn-MX","yue":"yue-Hant-HK","yue-CN":"yue-Hans-CN","yue-Hans":"yue-Hans-CN","yuj":"yuj-Latn-ZZ","yut":"yut-Latn-ZZ","yuw":"yuw-Latn-ZZ","za":"za-Latn-CN","zag":"zag-Latn-SD","zdj":"zdj-Arab-KM","zea":"zea-Latn-NL","zgh":"zgh-Tfng-MA","zh":"zh-Hans-CN","zh-AU":"zh-Hant-AU","zh-BN":"zh-Hant-BN","zh-Bopo":"zh-Bopo-TW","zh-GB":"zh-Hant-GB","zh-GF":"zh-Hant-GF","zh-Hanb":"zh-Hanb-TW","zh-Hant":"zh-Hant-TW","zh-HK":"zh-Hant-HK","zh-ID":"zh-Hant-ID","zh-MO":"zh-Hant-MO","zh-MY":"zh-Hant-MY","zh-PA":"zh-Hant-PA","zh-PF":"zh-Hant-PF","zh-PH":"zh-Hant-PH","zh-SR":"zh-Hant-SR","zh-TH":"zh-Hant-TH","zh-TW":"zh-Hant-TW","zh-US":"zh-Hant-US","zh-VN":"zh-Hant-VN","zhx":"zhx-Nshu-CN","zia":"zia-Latn-ZZ","zlm":"zlm-Latn-TG","zmi":"zmi-Latn-MY","zne":"zne-Latn-ZZ","zu":"zu-Latn-ZA","zza":"zza-Latn-TR"},"numberingSystems":{"adlm":{"_digits":"𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙","_type":"numeric"},"ahom":{"_digits":"𑜰𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹","_type":"numeric"},"arab":{"_digits":"٠١٢٣٤٥٦٧٨٩","_type":"numeric"},"arabext":{"_digits":"۰۱۲۳۴۵۶۷۸۹","_type":"numeric"},"armn":{"_rules":"armenian-upper","_type":"algorithmic"},"armnlow":{"_rules":"armenian-lower","_type":"algorithmic"},"bali":{"_digits":"᭐᭑᭒᭓᭔᭕᭖᭗᭘᭙","_type":"numeric"},"beng":{"_digits":"০১২৩৪৫৬৭৮৯","_type":"numeric"},"bhks":{"_digits":"𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙","_type":"numeric"},"brah":{"_digits":"𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯","_type":"numeric"},"cakm":{"_digits":"𑄶𑄷𑄸𑄹𑄺𑄻𑄼𑄽𑄾𑄿","_type":"numeric"},"cham":{"_digits":"꩐꩑꩒꩓꩔꩕꩖꩗꩘꩙","_type":"numeric"},"cyrl":{"_rules":"cyrillic-lower","_type":"algorithmic"},"deva":{"_digits":"०१२३४५६७८९","_type":"numeric"},"ethi":{"_rules":"ethiopic","_type":"algorithmic"},"fullwide":{"_digits":"０１２３４５６７８９","_type":"numeric"},"geor":{"_rules":"georgian","_type":"algorithmic"},"gonm":{"_digits":"𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙","_type":"numeric"},"grek":{"_rules":"greek-upper","_type":"algorithmic"},"greklow":{"_rules":"greek-lower","_type":"algorithmic"},"gujr":{"_digits":"૦૧૨૩૪૫૬૭૮૯","_type":"numeric"},"guru":{"_digits":"੦੧੨੩੪੫੬੭੮੯","_type":"numeric"},"hanidays":{"_rules":"zh/SpelloutRules/spellout-numbering-days","_type":"algorithmic"},"hanidec":{"_digits":"〇一二三四五六七八九","_type":"numeric"},"hans":{"_rules":"zh/SpelloutRules/spellout-cardinal","_type":"algorithmic"},"hansfin":{"_rules":"zh/SpelloutRules/spellout-cardinal-financial","_type":"algorithmic"},"hant":{"_rules":"zh_Hant/SpelloutRules/spellout-cardinal","_type":"algorithmic"},"hantfin":{"_rules":"zh_Hant/SpelloutRules/spellout-cardinal-financial","_type":"algorithmic"},"hebr":{"_rules":"hebrew","_type":"algorithmic"},"hmng":{"_digits":"𖭐𖭑𖭒𖭓𖭔𖭕𖭖𖭗𖭘𖭙","_type":"numeric"},"java":{"_digits":"꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙","_type":"numeric"},"jpan":{"_rules":"ja/SpelloutRules/spellout-cardinal","_type":"algorithmic"},"jpanfin":{"_rules":"ja/SpelloutRules/spellout-cardinal-financial","_type":"algorithmic"},"kali":{"_digits":"꤀꤁꤂꤃꤄꤅꤆꤇꤈꤉","_type":"numeric"},"khmr":{"_digits":"០១២៣៤៥៦៧៨៩","_type":"numeric"},"knda":{"_digits":"೦೧೨೩೪೫೬೭೮೯","_type":"numeric"},"lana":{"_digits":"᪀᪁᪂᪃᪄᪅᪆᪇᪈᪉","_type":"numeric"},"lanatham":{"_digits":"᪐᪑᪒᪓᪔᪕᪖᪗᪘᪙","_type":"numeric"},"laoo":{"_digits":"໐໑໒໓໔໕໖໗໘໙","_type":"numeric"},"latn":{"_digits":"0123456789","_type":"numeric"},"lepc":{"_digits":"᱀᱁᱂᱃᱄᱅᱆᱇᱈᱉","_type":"numeric"},"limb":{"_digits":"᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏","_type":"numeric"},"mathbold":{"_digits":"𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗","_type":"numeric"},"mathdbl":{"_digits":"𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡","_type":"numeric"},"mathmono":{"_digits":"𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿","_type":"numeric"},"mathsanb":{"_digits":"𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵","_type":"numeric"},"mathsans":{"_digits":"𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫","_type":"numeric"},"mlym":{"_digits":"൦൧൨൩൪൫൬൭൮൯","_type":"numeric"},"modi":{"_digits":"𑙐𑙑𑙒𑙓𑙔𑙕𑙖𑙗𑙘𑙙","_type":"numeric"},"mong":{"_digits":"᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙","_type":"numeric"},"mroo":{"_digits":"𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩","_type":"numeric"},"mtei":{"_digits":"꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹","_type":"numeric"},"mymr":{"_digits":"၀၁၂၃၄၅၆၇၈၉","_type":"numeric"},"mymrshan":{"_digits":"႐႑႒႓႔႕႖႗႘႙","_type":"numeric"},"mymrtlng":{"_digits":"꧰꧱꧲꧳꧴꧵꧶꧷꧸꧹","_type":"numeric"},"newa":{"_digits":"𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙","_type":"numeric"},"nkoo":{"_digits":"߀߁߂߃߄߅߆߇߈߉","_type":"numeric"},"olck":{"_digits":"᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙","_type":"numeric"},"orya":{"_digits":"୦୧୨୩୪୫୬୭୮୯","_type":"numeric"},"osma":{"_digits":"𐒠𐒡𐒢𐒣𐒤𐒥𐒦𐒧𐒨𐒩","_type":"numeric"},"roman":{"_rules":"roman-upper","_type":"algorithmic"},"romanlow":{"_rules":"roman-lower","_type":"algorithmic"},"saur":{"_digits":"꣐꣑꣒꣓꣔꣕꣖꣗꣘꣙","_type":"numeric"},"shrd":{"_digits":"𑇐𑇑𑇒𑇓𑇔𑇕𑇖𑇗𑇘𑇙","_type":"numeric"},"sind":{"_digits":"𑋰𑋱𑋲𑋳𑋴𑋵𑋶𑋷𑋸𑋹","_type":"numeric"},"sinh":{"_digits":"෦෧෨෩෪෫෬෭෮෯","_type":"numeric"},"sora":{"_digits":"𑃰𑃱𑃲𑃳𑃴𑃵𑃶𑃷𑃸𑃹","_type":"numeric"},"sund":{"_digits":"᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹","_type":"numeric"},"takr":{"_digits":"𑛀𑛁𑛂𑛃𑛄𑛅𑛆𑛇𑛈𑛉","_type":"numeric"},"talu":{"_digits":"᧐᧑᧒᧓᧔᧕᧖᧗᧘᧙","_type":"numeric"},"taml":{"_rules":"tamil","_type":"algorithmic"},"tamldec":{"_digits":"௦௧௨௩௪௫௬௭௮௯","_type":"numeric"},"telu":{"_digits":"౦౧౨౩౪౫౬౭౮౯","_type":"numeric"},"thai":{"_digits":"๐๑๒๓๔๕๖๗๘๙","_type":"numeric"},"tibt":{"_digits":"༠༡༢༣༤༥༦༧༨༩","_type":"numeric"},"tirh":{"_digits":"𑓐𑓑𑓒𑓓𑓔𑓕𑓖𑓗𑓘𑓙","_type":"numeric"},"vaii":{"_digits":"꘠꘡꘢꘣꘤꘥꘦꘧꘨꘩","_type":"numeric"},"wara":{"_digits":"𑣠𑣡𑣢𑣣𑣤𑣥𑣦𑣧𑣨𑣩","_type":"numeric"}},"plurals-type-ordinal":{"af":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"am":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ar":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"as":{"pluralRule-count-one":"n = 1,5,7,8,9,10 @integer 1, 5, 7~10","pluralRule-count-two":"n = 2,3 @integer 2, 3","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-many":"n = 6 @integer 6","pluralRule-count-other":" @integer 0, 11~25, 100, 1000, 10000, 100000, 1000000, …"},"az":{"pluralRule-count-one":"i % 10 = 1,2,5,7,8 or i % 100 = 20,50,70,80 @integer 1, 2, 5, 7, 8, 11, 12, 15, 17, 18, 20~22, 25, 101, 1001, …","pluralRule-count-few":"i % 10 = 3,4 or i % 1000 = 100,200,300,400,500,600,700,800,900 @integer 3, 4, 13, 14, 23, 24, 33, 34, 43, 44, 53, 54, 63, 64, 73, 74, 100, 1003, …","pluralRule-count-many":"i = 0 or i % 10 = 6 or i % 100 = 40,60,90 @integer 0, 6, 16, 26, 36, 40, 46, 56, 106, 1006, …","pluralRule-count-other":" @integer 9, 10, 19, 29, 30, 39, 49, 59, 69, 79, 109, 1000, 10000, 100000, 1000000, …"},"be":{"pluralRule-count-few":"n % 10 = 2,3 and n % 100 != 12,13 @integer 2, 3, 22, 23, 32, 33, 42, 43, 52, 53, 62, 63, 72, 73, 82, 83, 102, 1002, …","pluralRule-count-other":" @integer 0, 1, 4~17, 100, 1000, 10000, 100000, 1000000, …"},"bg":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"bn":{"pluralRule-count-one":"n = 1,5,7,8,9,10 @integer 1, 5, 7~10","pluralRule-count-two":"n = 2,3 @integer 2, 3","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-many":"n = 6 @integer 6","pluralRule-count-other":" @integer 0, 11~25, 100, 1000, 10000, 100000, 1000000, …"},"bs":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ca":{"pluralRule-count-one":"n = 1,3 @integer 1, 3","pluralRule-count-two":"n = 2 @integer 2","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"},"ce":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"cs":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"cy":{"pluralRule-count-zero":"n = 0,7,8,9 @integer 0, 7~9","pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-two":"n = 2 @integer 2","pluralRule-count-few":"n = 3,4 @integer 3, 4","pluralRule-count-many":"n = 5,6 @integer 5, 6","pluralRule-count-other":" @integer 10~25, 100, 1000, 10000, 100000, 1000000, …"},"da":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"de":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"dsb":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"el":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"en":{"pluralRule-count-one":"n % 10 = 1 and n % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …","pluralRule-count-two":"n % 10 = 2 and n % 100 != 12 @integer 2, 22, 32, 42, 52, 62, 72, 82, 102, 1002, …","pluralRule-count-few":"n % 10 = 3 and n % 100 != 13 @integer 3, 23, 33, 43, 53, 63, 73, 83, 103, 1003, …","pluralRule-count-other":" @integer 0, 4~18, 100, 1000, 10000, 100000, 1000000, …"},"es":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"et":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"eu":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"fa":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"fi":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"fil":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"fr":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"fy":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ga":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"gl":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"gsw":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"gu":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-two":"n = 2,3 @integer 2, 3","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-many":"n = 6 @integer 6","pluralRule-count-other":" @integer 0, 5, 7~20, 100, 1000, 10000, 100000, 1000000, …"},"he":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"hi":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-two":"n = 2,3 @integer 2, 3","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-many":"n = 6 @integer 6","pluralRule-count-other":" @integer 0, 5, 7~20, 100, 1000, 10000, 100000, 1000000, …"},"hr":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"hsb":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"hu":{"pluralRule-count-one":"n = 1,5 @integer 1, 5","pluralRule-count-other":" @integer 0, 2~4, 6~17, 100, 1000, 10000, 100000, 1000000, …"},"hy":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"id":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"in":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"is":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"it":{"pluralRule-count-many":"n = 11,8,80,800 @integer 8, 11, 80, 800","pluralRule-count-other":" @integer 0~7, 9, 10, 12~17, 100, 1000, 10000, 100000, 1000000, …"},"iw":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ja":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ka":{"pluralRule-count-one":"i = 1 @integer 1","pluralRule-count-many":"i = 0 or i % 100 = 2..20,40,60,80 @integer 0, 2~16, 102, 1002, …","pluralRule-count-other":" @integer 21~36, 100, 1000, 10000, 100000, 1000000, …"},"kk":{"pluralRule-count-many":"n % 10 = 6 or n % 10 = 9 or n % 10 = 0 and n != 0 @integer 6, 9, 10, 16, 19, 20, 26, 29, 30, 36, 39, 40, 100, 1000, 10000, 100000, 1000000, …","pluralRule-count-other":" @integer 0~5, 7, 8, 11~15, 17, 18, 21, 101, 1001, …"},"km":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"kn":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ko":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ky":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"lo":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"lt":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"lv":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"mk":{"pluralRule-count-one":"i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …","pluralRule-count-two":"i % 10 = 2 and i % 100 != 12 @integer 2, 22, 32, 42, 52, 62, 72, 82, 102, 1002, …","pluralRule-count-many":"i % 10 = 7,8 and i % 100 != 17,18 @integer 7, 8, 27, 28, 37, 38, 47, 48, 57, 58, 67, 68, 77, 78, 87, 88, 107, 1007, …","pluralRule-count-other":" @integer 0, 3~6, 9~19, 100, 1000, 10000, 100000, 1000000, …"},"ml":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"mn":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"mo":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"mr":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-two":"n = 2,3 @integer 2, 3","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"},"ms":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"my":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"nb":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ne":{"pluralRule-count-one":"n = 1..4 @integer 1~4","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"},"nl":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"or":{"pluralRule-count-one":"n = 1,5,7..9 @integer 1, 5, 7~9","pluralRule-count-two":"n = 2,3 @integer 2, 3","pluralRule-count-few":"n = 4 @integer 4","pluralRule-count-many":"n = 6 @integer 6","pluralRule-count-other":" @integer 0, 10~24, 100, 1000, 10000, 100000, 1000000, …"},"pa":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"pl":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"prg":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ps":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"pt":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ro":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"root":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ru":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"scn":{"pluralRule-count-many":"n = 11,8,80,800 @integer 8, 11, 80, 800","pluralRule-count-other":" @integer 0~7, 9, 10, 12~17, 100, 1000, 10000, 100000, 1000000, …"},"sd":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"sh":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"si":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"sk":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"sl":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"sq":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-many":"n % 10 = 4 and n % 100 != 14 @integer 4, 24, 34, 44, 54, 64, 74, 84, 104, 1004, …","pluralRule-count-other":" @integer 0, 2, 3, 5~17, 100, 1000, 10000, 100000, 1000000, …"},"sr":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"sv":{"pluralRule-count-one":"n % 10 = 1,2 and n % 100 != 11,12 @integer 1, 2, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81, 82, 101, 1001, …","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, …"},"sw":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"ta":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"te":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"th":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"tk":{"pluralRule-count-few":"n % 10 = 6,9 or n = 10 @integer 6, 9, 10, 16, 19, 26, 29, 36, 39, 106, 1006, …","pluralRule-count-other":" @integer 0~5, 7, 8, 11~15, 17, 18, 20, 100, 1000, 10000, 100000, 1000000, …"},"tl":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"tr":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"uk":{"pluralRule-count-few":"n % 10 = 3 and n % 100 != 13 @integer 3, 23, 33, 43, 53, 63, 73, 83, 103, 1003, …","pluralRule-count-other":" @integer 0~2, 4~16, 100, 1000, 10000, 100000, 1000000, …"},"ur":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"uz":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"vi":{"pluralRule-count-one":"n = 1 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …"},"yue":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"zh":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"},"zu":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, …"}},"plurals-type-cardinal":{"af":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ak":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"am":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ar":{"pluralRule-count-zero":"n = 0 @integer 0 @decimal 0.0, 0.00, 0.000, 0.0000","pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-few":"n % 100 = 3..10 @integer 3~10, 103~110, 1003, … @decimal 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 103.0, 1003.0, …","pluralRule-count-many":"n % 100 = 11..99 @integer 11~26, 111, 1011, … @decimal 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 111.0, 1011.0, …","pluralRule-count-other":" @integer 100~102, 200~202, 300~302, 400~402, 500~502, 600, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.1, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ars":{"pluralRule-count-zero":"n = 0 @integer 0 @decimal 0.0, 0.00, 0.000, 0.0000","pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-few":"n % 100 = 3..10 @integer 3~10, 103~110, 1003, … @decimal 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 103.0, 1003.0, …","pluralRule-count-many":"n % 100 = 11..99 @integer 11~26, 111, 1011, … @decimal 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 111.0, 1011.0, …","pluralRule-count-other":" @integer 100~102, 200~202, 300~302, 400~402, 500~502, 600, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.1, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"as":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"asa":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ast":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"az":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"be":{"pluralRule-count-one":"n % 10 = 1 and n % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 1.0, 21.0, 31.0, 41.0, 51.0, 61.0, 71.0, 81.0, 101.0, 1001.0, …","pluralRule-count-few":"n % 10 = 2..4 and n % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 2.0, 3.0, 4.0, 22.0, 23.0, 24.0, 32.0, 33.0, 102.0, 1002.0, …","pluralRule-count-many":"n % 10 = 0 or n % 10 = 5..9 or n % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":"   @decimal 0.1~0.9, 1.1~1.7, 10.1, 100.1, 1000.1, …"},"bem":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bez":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bg":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bh":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bm":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bn":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bo":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"br":{"pluralRule-count-one":"n % 10 = 1 and n % 100 != 11,71,91 @integer 1, 21, 31, 41, 51, 61, 81, 101, 1001, … @decimal 1.0, 21.0, 31.0, 41.0, 51.0, 61.0, 81.0, 101.0, 1001.0, …","pluralRule-count-two":"n % 10 = 2 and n % 100 != 12,72,92 @integer 2, 22, 32, 42, 52, 62, 82, 102, 1002, … @decimal 2.0, 22.0, 32.0, 42.0, 52.0, 62.0, 82.0, 102.0, 1002.0, …","pluralRule-count-few":"n % 10 = 3..4,9 and n % 100 != 10..19,70..79,90..99 @integer 3, 4, 9, 23, 24, 29, 33, 34, 39, 43, 44, 49, 103, 1003, … @decimal 3.0, 4.0, 9.0, 23.0, 24.0, 29.0, 33.0, 34.0, 103.0, 1003.0, …","pluralRule-count-many":"n != 0 and n % 1000000 = 0 @integer 1000000, … @decimal 1000000.0, 1000000.00, 1000000.000, …","pluralRule-count-other":" @integer 0, 5~8, 10~20, 100, 1000, 10000, 100000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, …"},"brx":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"bs":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 0.2~0.4, 1.2~1.4, 2.2~2.4, 3.2~3.4, 4.2~4.4, 5.2, 10.2, 100.2, 1000.2, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.5~1.0, 1.5~2.0, 2.5~2.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ca":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ce":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"cgg":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"chr":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ckb":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"cs":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-few":"i = 2..4 and v = 0 @integer 2~4","pluralRule-count-many":"v != 0   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"},"cy":{"pluralRule-count-zero":"n = 0 @integer 0 @decimal 0.0, 0.00, 0.000, 0.0000","pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-few":"n = 3 @integer 3 @decimal 3.0, 3.00, 3.000, 3.0000","pluralRule-count-many":"n = 6 @integer 6 @decimal 6.0, 6.00, 6.000, 6.0000","pluralRule-count-other":" @integer 4, 5, 7~20, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"da":{"pluralRule-count-one":"n = 1 or t != 0 and i = 0,1 @integer 1 @decimal 0.1~1.6","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 2.0~3.4, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"de":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"dsb":{"pluralRule-count-one":"v = 0 and i % 100 = 1 or f % 100 = 1 @integer 1, 101, 201, 301, 401, 501, 601, 701, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-two":"v = 0 and i % 100 = 2 or f % 100 = 2 @integer 2, 102, 202, 302, 402, 502, 602, 702, 1002, … @decimal 0.2, 1.2, 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 10.2, 100.2, 1000.2, …","pluralRule-count-few":"v = 0 and i % 100 = 3..4 or f % 100 = 3..4 @integer 3, 4, 103, 104, 203, 204, 303, 304, 403, 404, 503, 504, 603, 604, 703, 704, 1003, … @decimal 0.3, 0.4, 1.3, 1.4, 2.3, 2.4, 3.3, 3.4, 4.3, 4.4, 5.3, 5.4, 6.3, 6.4, 7.3, 7.4, 10.3, 100.3, 1000.3, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.5~1.0, 1.5~2.0, 2.5~2.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"dv":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"dz":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ee":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"el":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"en":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"eo":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"es":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"et":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"eu":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"fa":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ff":{"pluralRule-count-one":"i = 0,1 @integer 0, 1 @decimal 0.0~1.5","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 2.0~3.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"fi":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"fil":{"pluralRule-count-one":"v = 0 and i = 1,2,3 or v = 0 and i % 10 != 4,6,9 or v != 0 and f % 10 != 4,6,9 @integer 0~3, 5, 7, 8, 10~13, 15, 17, 18, 20, 21, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.3, 0.5, 0.7, 0.8, 1.0~1.3, 1.5, 1.7, 1.8, 2.0, 2.1, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 4, 6, 9, 14, 16, 19, 24, 26, 104, 1004, … @decimal 0.4, 0.6, 0.9, 1.4, 1.6, 1.9, 2.4, 2.6, 10.4, 100.4, 1000.4, …"},"fo":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"fr":{"pluralRule-count-one":"i = 0,1 @integer 0, 1 @decimal 0.0~1.5","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 2.0~3.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"fur":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"fy":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ga":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-few":"n = 3..6 @integer 3~6 @decimal 3.0, 4.0, 5.0, 6.0, 3.00, 4.00, 5.00, 6.00, 3.000, 4.000, 5.000, 6.000, 3.0000, 4.0000, 5.0000, 6.0000","pluralRule-count-many":"n = 7..10 @integer 7~10 @decimal 7.0, 8.0, 9.0, 10.0, 7.00, 8.00, 9.00, 10.00, 7.000, 8.000, 9.000, 10.000, 7.0000, 8.0000, 9.0000, 10.0000","pluralRule-count-other":" @integer 0, 11~25, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.1, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"gd":{"pluralRule-count-one":"n = 1,11 @integer 1, 11 @decimal 1.0, 11.0, 1.00, 11.00, 1.000, 11.000, 1.0000","pluralRule-count-two":"n = 2,12 @integer 2, 12 @decimal 2.0, 12.0, 2.00, 12.00, 2.000, 12.000, 2.0000","pluralRule-count-few":"n = 3..10,13..19 @integer 3~10, 13~19 @decimal 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 3.00","pluralRule-count-other":" @integer 0, 20~34, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.1, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"gl":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"gsw":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"gu":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"guw":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"gv":{"pluralRule-count-one":"v = 0 and i % 10 = 1 @integer 1, 11, 21, 31, 41, 51, 61, 71, 101, 1001, …","pluralRule-count-two":"v = 0 and i % 10 = 2 @integer 2, 12, 22, 32, 42, 52, 62, 72, 102, 1002, …","pluralRule-count-few":"v = 0 and i % 100 = 0,20,40,60,80 @integer 0, 20, 40, 60, 80, 100, 120, 140, 1000, 10000, 100000, 1000000, …","pluralRule-count-many":"v != 0   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 3~10, 13~19, 23, 103, 1003, …"},"ha":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"haw":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"he":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-two":"i = 2 and v = 0 @integer 2","pluralRule-count-many":"v = 0 and n != 0..10 and n % 10 = 0 @integer 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 10000, 100000, 1000000, …","pluralRule-count-other":" @integer 0, 3~17, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"hi":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"hr":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 0.2~0.4, 1.2~1.4, 2.2~2.4, 3.2~3.4, 4.2~4.4, 5.2, 10.2, 100.2, 1000.2, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.5~1.0, 1.5~2.0, 2.5~2.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"hsb":{"pluralRule-count-one":"v = 0 and i % 100 = 1 or f % 100 = 1 @integer 1, 101, 201, 301, 401, 501, 601, 701, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-two":"v = 0 and i % 100 = 2 or f % 100 = 2 @integer 2, 102, 202, 302, 402, 502, 602, 702, 1002, … @decimal 0.2, 1.2, 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 10.2, 100.2, 1000.2, …","pluralRule-count-few":"v = 0 and i % 100 = 3..4 or f % 100 = 3..4 @integer 3, 4, 103, 104, 203, 204, 303, 304, 403, 404, 503, 504, 603, 604, 703, 704, 1003, … @decimal 0.3, 0.4, 1.3, 1.4, 2.3, 2.4, 3.3, 3.4, 4.3, 4.4, 5.3, 5.4, 6.3, 6.4, 7.3, 7.4, 10.3, 100.3, 1000.3, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.5~1.0, 1.5~2.0, 2.5~2.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"hu":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"hy":{"pluralRule-count-one":"i = 0,1 @integer 0, 1 @decimal 0.0~1.5","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 2.0~3.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"id":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ig":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ii":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"in":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"io":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"is":{"pluralRule-count-one":"t = 0 and i % 10 = 1 and i % 100 != 11 or t != 0 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1~1.6, 10.1, 100.1, 1000.1, …","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"it":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"iu":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"iw":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-two":"i = 2 and v = 0 @integer 2","pluralRule-count-many":"v = 0 and n != 0..10 and n % 10 = 0 @integer 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 10000, 100000, 1000000, …","pluralRule-count-other":" @integer 0, 3~17, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ja":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"jbo":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"jgo":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ji":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"jmc":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"jv":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"jw":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ka":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kab":{"pluralRule-count-one":"i = 0,1 @integer 0, 1 @decimal 0.0~1.5","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 2.0~3.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kaj":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kcg":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kde":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kea":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kk":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kkj":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kl":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"km":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kn":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ko":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ks":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ksb":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ksh":{"pluralRule-count-zero":"n = 0 @integer 0 @decimal 0.0, 0.00, 0.000, 0.0000","pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ku":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"kw":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ky":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lag":{"pluralRule-count-zero":"n = 0 @integer 0 @decimal 0.0, 0.00, 0.000, 0.0000","pluralRule-count-one":"i = 0,1 and n != 0 @integer 1 @decimal 0.1~1.6","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 2.0~3.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lb":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lg":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lkt":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ln":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lo":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lt":{"pluralRule-count-one":"n % 10 = 1 and n % 100 != 11..19 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 1.0, 21.0, 31.0, 41.0, 51.0, 61.0, 71.0, 81.0, 101.0, 1001.0, …","pluralRule-count-few":"n % 10 = 2..9 and n % 100 != 11..19 @integer 2~9, 22~29, 102, 1002, … @decimal 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 22.0, 102.0, 1002.0, …","pluralRule-count-many":"f != 0   @decimal 0.1~0.9, 1.1~1.7, 10.1, 100.1, 1000.1, …","pluralRule-count-other":" @integer 0, 10~20, 30, 40, 50, 60, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"lv":{"pluralRule-count-zero":"n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19 @integer 0, 10~20, 30, 40, 50, 60, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-one":"n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.0, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-other":" @integer 2~9, 22~29, 102, 1002, … @decimal 0.2~0.9, 1.2~1.9, 10.2, 100.2, 1000.2, …"},"mas":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"mg":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"mgo":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"mk":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.2~1.0, 1.2~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ml":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"mn":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"mo":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-few":"v != 0 or n = 0 or n != 1 and n % 100 = 1..19 @integer 0, 2~16, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 20~35, 100, 1000, 10000, 100000, 1000000, …"},"mr":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ms":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"mt":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-few":"n = 0 or n % 100 = 2..10 @integer 0, 2~10, 102~107, 1002, … @decimal 0.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 10.0, 102.0, 1002.0, …","pluralRule-count-many":"n % 100 = 11..19 @integer 11~19, 111~117, 1011, … @decimal 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 111.0, 1011.0, …","pluralRule-count-other":" @integer 20~35, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.1, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"my":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nah":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"naq":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nb":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nd":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ne":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nl":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nn":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nnh":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"no":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nqo":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nr":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nso":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ny":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"nyn":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"om":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"or":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"os":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"pa":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"pap":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"pl":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …","pluralRule-count-many":"v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …","pluralRule-count-other":"   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"prg":{"pluralRule-count-zero":"n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19 @integer 0, 10~20, 30, 40, 50, 60, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-one":"n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.0, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-other":" @integer 2~9, 22~29, 102, 1002, … @decimal 0.2~0.9, 1.2~1.9, 10.2, 100.2, 1000.2, …"},"ps":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"pt":{"pluralRule-count-one":"i = 0..1 @integer 0, 1 @decimal 0.0~1.5","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 2.0~3.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"pt-PT":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"rm":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ro":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-few":"v != 0 or n = 0 or n != 1 and n % 100 = 1..19 @integer 0, 2~16, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 20~35, 100, 1000, 10000, 100000, 1000000, …"},"rof":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"root":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ru":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …","pluralRule-count-many":"v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …","pluralRule-count-other":"   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"rwk":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sah":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"saq":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"scn":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sd":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sdh":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"se":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"seh":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ses":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sg":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sh":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 0.2~0.4, 1.2~1.4, 2.2~2.4, 3.2~3.4, 4.2~4.4, 5.2, 10.2, 100.2, 1000.2, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.5~1.0, 1.5~2.0, 2.5~2.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"shi":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-few":"n = 2..10 @integer 2~10 @decimal 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00","pluralRule-count-other":" @integer 11~26, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~1.9, 2.1~2.7, 10.1, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"si":{"pluralRule-count-one":"n = 0,1 or i = 0 and f = 1 @integer 0, 1 @decimal 0.0, 0.1, 1.0, 0.00, 0.01, 1.00, 0.000, 0.001, 1.000, 0.0000, 0.0001, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.2~0.9, 1.1~1.8, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sk":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-few":"i = 2..4 and v = 0 @integer 2~4","pluralRule-count-many":"v != 0   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"},"sl":{"pluralRule-count-one":"v = 0 and i % 100 = 1 @integer 1, 101, 201, 301, 401, 501, 601, 701, 1001, …","pluralRule-count-two":"v = 0 and i % 100 = 2 @integer 2, 102, 202, 302, 402, 502, 602, 702, 1002, …","pluralRule-count-few":"v = 0 and i % 100 = 3..4 or v != 0 @integer 3, 4, 103, 104, 203, 204, 303, 304, 403, 404, 503, 504, 603, 604, 703, 704, 1003, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"},"sma":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"smi":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"smj":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"smn":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sms":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-two":"n = 2 @integer 2 @decimal 2.0, 2.00, 2.000, 2.0000","pluralRule-count-other":" @integer 0, 3~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sn":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"so":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sq":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sr":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 10.1, 100.1, 1000.1, …","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 0.2~0.4, 1.2~1.4, 2.2~2.4, 3.2~3.4, 4.2~4.4, 5.2, 10.2, 100.2, 1000.2, …","pluralRule-count-other":" @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 0.5~1.0, 1.5~2.0, 2.5~2.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ss":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ssy":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"st":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sv":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"sw":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"syr":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ta":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"te":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"teo":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"th":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ti":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"tig":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"tk":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"tl":{"pluralRule-count-one":"v = 0 and i = 1,2,3 or v = 0 and i % 10 != 4,6,9 or v != 0 and f % 10 != 4,6,9 @integer 0~3, 5, 7, 8, 10~13, 15, 17, 18, 20, 21, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.3, 0.5, 0.7, 0.8, 1.0~1.3, 1.5, 1.7, 1.8, 2.0, 2.1, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …","pluralRule-count-other":" @integer 4, 6, 9, 14, 16, 19, 24, 26, 104, 1004, … @decimal 0.4, 0.6, 0.9, 1.4, 1.6, 1.9, 2.4, 2.6, 10.4, 100.4, 1000.4, …"},"tn":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"to":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"tr":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ts":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"tzm":{"pluralRule-count-one":"n = 0..1 or n = 11..99 @integer 0, 1, 11~24 @decimal 0.0, 1.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0","pluralRule-count-other":" @integer 2~10, 100~106, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ug":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"uk":{"pluralRule-count-one":"v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …","pluralRule-count-few":"v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …","pluralRule-count-many":"v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …","pluralRule-count-other":"   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ur":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"uz":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"ve":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"vi":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"vo":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"vun":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"wa":{"pluralRule-count-one":"n = 0..1 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 0.1~0.9, 1.1~1.7, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"wae":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"wo":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"xh":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"xog":{"pluralRule-count-one":"n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~0.9, 1.1~1.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"yi":{"pluralRule-count-one":"i = 1 and v = 0 @integer 1","pluralRule-count-other":" @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"yo":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"yue":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"zh":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"},"zu":{"pluralRule-count-one":"i = 0 or n = 1 @integer 0, 1 @decimal 0.0~1.0, 0.00~0.04","pluralRule-count-other":" @integer 2~17, 100, 1000, 10000, 100000, 1000000, … @decimal 1.1~2.6, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"}},"timeData":{"AX":{"_allowed":"H","_preferred":"H"},"BQ":{"_allowed":"H","_preferred":"H"},"CP":{"_allowed":"H","_preferred":"H"},"CZ":{"_allowed":"H","_preferred":"H"},"DK":{"_allowed":"H","_preferred":"H"},"FI":{"_allowed":"H","_preferred":"H"},"ID":{"_allowed":"H","_preferred":"H"},"IS":{"_allowed":"H","_preferred":"H"},"ML":{"_allowed":"H","_preferred":"H"},"NE":{"_allowed":"H","_preferred":"H"},"RU":{"_allowed":"H","_preferred":"H"},"SE":{"_allowed":"H","_preferred":"H"},"SJ":{"_allowed":"H","_preferred":"H"},"SK":{"_allowed":"H","_preferred":"H"},"AS":{"_allowed":"h H","_preferred":"h"},"BT":{"_allowed":"h H","_preferred":"h"},"DJ":{"_allowed":"h H","_preferred":"h"},"ER":{"_allowed":"h H","_preferred":"h"},"GH":{"_allowed":"h H","_preferred":"h"},"IN":{"_allowed":"h H","_preferred":"h"},"LS":{"_allowed":"h H","_preferred":"h"},"PG":{"_allowed":"h H","_preferred":"h"},"PW":{"_allowed":"h H","_preferred":"h"},"SO":{"_allowed":"h H","_preferred":"h"},"TO":{"_allowed":"h H","_preferred":"h"},"VU":{"_allowed":"h H","_preferred":"h"},"WS":{"_allowed":"h H","_preferred":"h"},"001":{"_allowed":"H h","_preferred":"H"},"AL":{"_allowed":"h H hB","_preferred":"h"},"fr_CA":{"_allowed":"h H hB","_preferred":"h"},"TD":{"_allowed":"h H hB","_preferred":"h"},"ca_ES":{"_allowed":"H h hB","_preferred":"H"},"CF":{"_allowed":"H h hB","_preferred":"H"},"CM":{"_allowed":"H h hB","_preferred":"H"},"gl_ES":{"_allowed":"H h hB","_preferred":"H"},"LU":{"_allowed":"H h hB","_preferred":"H"},"NP":{"_allowed":"H h hB","_preferred":"H"},"PF":{"_allowed":"H h hB","_preferred":"H"},"SC":{"_allowed":"H h hB","_preferred":"H"},"SN":{"_allowed":"H h hB","_preferred":"H"},"TF":{"_allowed":"H h hB","_preferred":"H"},"CY":{"_allowed":"h H hb hB","_preferred":"h"},"GR":{"_allowed":"h H hb hB","_preferred":"h"},"CO":{"_allowed":"h H hB hb","_preferred":"h"},"DO":{"_allowed":"h H hB hb","_preferred":"h"},"KP":{"_allowed":"h H hB hb","_preferred":"h"},"KR":{"_allowed":"h H hB hb","_preferred":"h"},"NA":{"_allowed":"h H hB hb","_preferred":"h"},"PA":{"_allowed":"h H hB hb","_preferred":"h"},"PR":{"_allowed":"h H hB hb","_preferred":"h"},"VE":{"_allowed":"h H hB hb","_preferred":"h"},"AC":{"_allowed":"H h hb hB","_preferred":"H"},"AI":{"_allowed":"H h hb hB","_preferred":"H"},"BW":{"_allowed":"H h hb hB","_preferred":"H"},"BZ":{"_allowed":"H h hb hB","_preferred":"H"},"CC":{"_allowed":"H h hb hB","_preferred":"H"},"CK":{"_allowed":"H h hb hB","_preferred":"H"},"CX":{"_allowed":"H h hb hB","_preferred":"H"},"DG":{"_allowed":"H h hb hB","_preferred":"H"},"FK":{"_allowed":"H h hb hB","_preferred":"H"},"GB":{"_allowed":"H h hb hB","_preferred":"H"},"GG":{"_allowed":"H h hb hB","_preferred":"H"},"GI":{"_allowed":"H h hb hB","_preferred":"H"},"IE":{"_allowed":"H h hb hB","_preferred":"H"},"IM":{"_allowed":"H h hb hB","_preferred":"H"},"IO":{"_allowed":"H h hb hB","_preferred":"H"},"JE":{"_allowed":"H h hb hB","_preferred":"H"},"LT":{"_allowed":"H h hb hB","_preferred":"H"},"MK":{"_allowed":"H h hb hB","_preferred":"H"},"MN":{"_allowed":"H h hb hB","_preferred":"H"},"MS":{"_allowed":"H h hb hB","_preferred":"H"},"NF":{"_allowed":"H h hb hB","_preferred":"H"},"NG":{"_allowed":"H h hb hB","_preferred":"H"},"NR":{"_allowed":"H h hb hB","_preferred":"H"},"NU":{"_allowed":"H h hb hB","_preferred":"H"},"PN":{"_allowed":"H h hb hB","_preferred":"H"},"SH":{"_allowed":"H h hb hB","_preferred":"H"},"SX":{"_allowed":"H h hb hB","_preferred":"H"},"TA":{"_allowed":"H h hb hB","_preferred":"H"},"ZA":{"_allowed":"H h hb hB","_preferred":"H"},"af_ZA":{"_allowed":"H h hB hb","_preferred":"H"},"KG":{"_allowed":"H h hB hb","_preferred":"H"},"KM":{"_allowed":"H h hB hb","_preferred":"H"},"LK":{"_allowed":"H h hB hb","_preferred":"H"},"MA":{"_allowed":"H h hB hb","_preferred":"H"},"JP":{"_allowed":"H h K","_preferred":"H"},"AD":{"_allowed":"H hB","_preferred":"H"},"AM":{"_allowed":"H hB","_preferred":"H"},"AO":{"_allowed":"H hB","_preferred":"H"},"AT":{"_allowed":"H hB","_preferred":"H"},"AW":{"_allowed":"H hB","_preferred":"H"},"BE":{"_allowed":"H hB","_preferred":"H"},"BF":{"_allowed":"H hB","_preferred":"H"},"BJ":{"_allowed":"H hB","_preferred":"H"},"BL":{"_allowed":"H hB","_preferred":"H"},"BR":{"_allowed":"H hB","_preferred":"H"},"CG":{"_allowed":"H hB","_preferred":"H"},"CI":{"_allowed":"H hB","_preferred":"H"},"CV":{"_allowed":"H hB","_preferred":"H"},"DE":{"_allowed":"H hB","_preferred":"H"},"EE":{"_allowed":"H hB","_preferred":"H"},"FR":{"_allowed":"H hB","_preferred":"H"},"GA":{"_allowed":"H hB","_preferred":"H"},"GF":{"_allowed":"H hB","_preferred":"H"},"GN":{"_allowed":"H hB","_preferred":"H"},"GP":{"_allowed":"H hB","_preferred":"H"},"GW":{"_allowed":"H hB","_preferred":"H"},"HR":{"_allowed":"H hB","_preferred":"H"},"IL":{"_allowed":"H hB","_preferred":"H"},"IT":{"_allowed":"H hB","_preferred":"H"},"KZ":{"_allowed":"H hB","_preferred":"H"},"MC":{"_allowed":"H hB","_preferred":"H"},"MD":{"_allowed":"H hB","_preferred":"H"},"MF":{"_allowed":"H hB","_preferred":"H"},"MQ":{"_allowed":"H hB","_preferred":"H"},"MZ":{"_allowed":"H hB","_preferred":"H"},"NC":{"_allowed":"H hB","_preferred":"H"},"NL":{"_allowed":"H hB","_preferred":"H"},"PM":{"_allowed":"H hB","_preferred":"H"},"PT":{"_allowed":"H hB","_preferred":"H"},"RE":{"_allowed":"H hB","_preferred":"H"},"RO":{"_allowed":"H hB","_preferred":"H"},"SI":{"_allowed":"H hB","_preferred":"H"},"SM":{"_allowed":"H hB","_preferred":"H"},"SR":{"_allowed":"H hB","_preferred":"H"},"ST":{"_allowed":"H hB","_preferred":"H"},"TG":{"_allowed":"H hB","_preferred":"H"},"TR":{"_allowed":"H hB","_preferred":"H"},"WF":{"_allowed":"H hB","_preferred":"H"},"YT":{"_allowed":"H hB","_preferred":"H"},"BD":{"_allowed":"h hB H","_preferred":"h"},"PK":{"_allowed":"h hB H","_preferred":"h"},"AZ":{"_allowed":"H hB h","_preferred":"H"},"BA":{"_allowed":"H hB h","_preferred":"H"},"BG":{"_allowed":"H hB h","_preferred":"H"},"CH":{"_allowed":"H hB h","_preferred":"H"},"GE":{"_allowed":"H hB h","_preferred":"H"},"LI":{"_allowed":"H hB h","_preferred":"H"},"ME":{"_allowed":"H hB h","_preferred":"H"},"RS":{"_allowed":"H hB h","_preferred":"H"},"UA":{"_allowed":"H hB h","_preferred":"H"},"UZ":{"_allowed":"H hB h","_preferred":"H"},"VA":{"_allowed":"H hB h","_preferred":"H"},"XK":{"_allowed":"H hB h","_preferred":"H"},"AG":{"_allowed":"h hb H hB","_preferred":"h"},"AU":{"_allowed":"h hb H hB","_preferred":"h"},"BB":{"_allowed":"h hb H hB","_preferred":"h"},"BM":{"_allowed":"h hb H hB","_preferred":"h"},"BS":{"_allowed":"h hb H hB","_preferred":"h"},"CA":{"_allowed":"h hb H hB","_preferred":"h"},"DM":{"_allowed":"h hb H hB","_preferred":"h"},"FJ":{"_allowed":"h hb H hB","_preferred":"h"},"FM":{"_allowed":"h hb H hB","_preferred":"h"},"GD":{"_allowed":"h hb H hB","_preferred":"h"},"GM":{"_allowed":"h hb H hB","_preferred":"h"},"GU":{"_allowed":"h hb H hB","_preferred":"h"},"GY":{"_allowed":"h hb H hB","_preferred":"h"},"JM":{"_allowed":"h hb H hB","_preferred":"h"},"KI":{"_allowed":"h hb H hB","_preferred":"h"},"KN":{"_allowed":"h hb H hB","_preferred":"h"},"KY":{"_allowed":"h hb H hB","_preferred":"h"},"LC":{"_allowed":"h hb H hB","_preferred":"h"},"LR":{"_allowed":"h hb H hB","_preferred":"h"},"MH":{"_allowed":"h hb H hB","_preferred":"h"},"MP":{"_allowed":"h hb H hB","_preferred":"h"},"MW":{"_allowed":"h hb H hB","_preferred":"h"},"NZ":{"_allowed":"h hb H hB","_preferred":"h"},"SB":{"_allowed":"h hb H hB","_preferred":"h"},"SG":{"_allowed":"h hb H hB","_preferred":"h"},"SL":{"_allowed":"h hb H hB","_preferred":"h"},"SS":{"_allowed":"h hb H hB","_preferred":"h"},"SZ":{"_allowed":"h hb H hB","_preferred":"h"},"TC":{"_allowed":"h hb H hB","_preferred":"h"},"TT":{"_allowed":"h hb H hB","_preferred":"h"},"UM":{"_allowed":"h hb H hB","_preferred":"h"},"US":{"_allowed":"h hb H hB","_preferred":"h"},"VC":{"_allowed":"h hb H hB","_preferred":"h"},"VG":{"_allowed":"h hb H hB","_preferred":"h"},"VI":{"_allowed":"h hb H hB","_preferred":"h"},"ZM":{"_allowed":"h hb H hB","_preferred":"h"},"AR":{"_allowed":"H hB h hb","_preferred":"H"},"BO":{"_allowed":"H hB h hb","_preferred":"H"},"CL":{"_allowed":"H hB h hb","_preferred":"H"},"CR":{"_allowed":"H hB h hb","_preferred":"H"},"CU":{"_allowed":"H hB h hb","_preferred":"H"},"EA":{"_allowed":"H hB h hb","_preferred":"H"},"EC":{"_allowed":"H hB h hb","_preferred":"H"},"ES":{"_allowed":"H hB h hb","_preferred":"H"},"GQ":{"_allowed":"H hB h hb","_preferred":"H"},"GT":{"_allowed":"H hB h hb","_preferred":"H"},"HN":{"_allowed":"H hB h hb","_preferred":"H"},"IC":{"_allowed":"H hB h hb","_preferred":"H"},"MX":{"_allowed":"H hB h hb","_preferred":"H"},"NI":{"_allowed":"H hB h hb","_preferred":"H"},"PE":{"_allowed":"H hB h hb","_preferred":"H"},"SV":{"_allowed":"H hB h hb","_preferred":"H"},"UY":{"_allowed":"H hB h hb","_preferred":"H"},"AE":{"_allowed":"h hB hb H","_preferred":"h"},"BH":{"_allowed":"h hB hb H","_preferred":"h"},"DZ":{"_allowed":"h hB hb H","_preferred":"h"},"EG":{"_allowed":"h hB hb H","_preferred":"h"},"EH":{"_allowed":"h hB hb H","_preferred":"h"},"IQ":{"_allowed":"h hB hb H","_preferred":"h"},"JO":{"_allowed":"h hB hb H","_preferred":"h"},"KW":{"_allowed":"h hB hb H","_preferred":"h"},"LB":{"_allowed":"h hB hb H","_preferred":"h"},"LY":{"_allowed":"h hB hb H","_preferred":"h"},"MR":{"_allowed":"h hB hb H","_preferred":"h"},"OM":{"_allowed":"h hB hb H","_preferred":"h"},"PH":{"_allowed":"h hB hb H","_preferred":"h"},"PS":{"_allowed":"h hB hb H","_preferred":"h"},"QA":{"_allowed":"h hB hb H","_preferred":"h"},"SA":{"_allowed":"h hB hb H","_preferred":"h"},"SD":{"_allowed":"h hB hb H","_preferred":"h"},"SY":{"_allowed":"h hB hb H","_preferred":"h"},"TN":{"_allowed":"h hB hb H","_preferred":"h"},"YE":{"_allowed":"h hB hb H","_preferred":"h"},"AF":{"_allowed":"H hb hB h","_preferred":"H"},"IR":{"_allowed":"H hb hB h","_preferred":"H"},"LA":{"_allowed":"H hb hB h","_preferred":"H"},"LV":{"_allowed":"H hB hb h","_preferred":"H"},"TL":{"_allowed":"H hB hb h","_preferred":"H"},"zu_ZA":{"_allowed":"H hB hb h","_preferred":"H"},"CD":{"_allowed":"hB H","_preferred":"H"},"kn_IN":{"_allowed":"hB h H","_preferred":"h"},"ml_IN":{"_allowed":"hB h H","_preferred":"h"},"te_IN":{"_allowed":"hB h H","_preferred":"h"},"KH":{"_allowed":"hB h H hb","_preferred":"h"},"ta_IN":{"_allowed":"hB h hb H","_preferred":"h"},"BN":{"_allowed":"hb hB H h","_preferred":"h"},"MY":{"_allowed":"hb hB H h","_preferred":"h"},"ET":{"_allowed":"hB hb h H","_preferred":"h"},"gu_IN":{"_allowed":"hB hb h H","_preferred":"h"},"mr_IN":{"_allowed":"hB hb h H","_preferred":"h"},"pa_IN":{"_allowed":"hB hb h H","_preferred":"h"},"KE":{"_allowed":"hB hb h H","_preferred":"H"},"MM":{"_allowed":"hB hb h H","_preferred":"H"},"TZ":{"_allowed":"hB hb h H","_preferred":"H"},"UG":{"_allowed":"hB hb h H","_preferred":"H"},"CN":{"_allowed":"hB hb H h","_preferred":"h"},"HK":{"_allowed":"hB hb H h","_preferred":"h"},"MO":{"_allowed":"hB hb H h","_preferred":"h"},"TW":{"_allowed":"hB hb H h","_preferred":"h"}},"weekData":{"minDays":{"001":"1","AD":"4","AN":"4","AT":"4","AX":"4","BE":"4","BG":"4","CH":"4","CZ":"4","DE":"4","DK":"4","EE":"4","ES":"4","FI":"4","FJ":"4","FO":"4","FR":"4","GB":"4","GF":"4","GG":"4","GI":"4","GP":"4","GR":"4","GU":"1","HU":"4","IE":"4","IM":"4","IS":"4","IT":"4","JE":"4","LI":"4","LT":"4","LU":"4","MC":"4","MQ":"4","NL":"4","NO":"4","PL":"4","PT":"4","RE":"4","RU":"4","SE":"4","SJ":"4","SK":"4","SM":"4","UM":"1","US":"1","VA":"4","VI":"1"},"firstDay":{"001":"mon","AD":"mon","AE":"sat","AF":"sat","AG":"sun","AI":"mon","AL":"mon","AM":"mon","AN":"mon","AR":"sun","AS":"sun","AT":"mon","AU":"sun","AX":"mon","AZ":"mon","BA":"mon","BD":"sun","BE":"mon","BG":"mon","BH":"sat","BM":"mon","BN":"mon","BR":"sun","BS":"sun","BT":"sun","BW":"sun","BY":"mon","BZ":"sun","CA":"sun","CH":"mon","CL":"mon","CM":"mon","CN":"sun","CO":"sun","CR":"mon","CY":"mon","CZ":"mon","DE":"mon","DJ":"sat","DK":"mon","DM":"sun","DO":"sun","DZ":"sat","EC":"mon","EE":"mon","EG":"sat","ES":"mon","ET":"sun","FI":"mon","FJ":"mon","FO":"mon","FR":"mon","GB":"mon","GB-alt-variant":"sun","GE":"mon","GF":"mon","GP":"mon","GR":"mon","GT":"sun","GU":"sun","HK":"sun","HN":"sun","HR":"mon","HU":"mon","ID":"sun","IE":"sun","IL":"sun","IN":"sun","IQ":"sat","IR":"sat","IS":"mon","IT":"mon","JM":"sun","JO":"sat","JP":"sun","KE":"sun","KG":"mon","KH":"sun","KR":"sun","KW":"sat","KZ":"mon","LA":"sun","LB":"mon","LI":"mon","LK":"mon","LT":"mon","LU":"mon","LV":"mon","LY":"sat","MA":"sat","MC":"mon","MD":"mon","ME":"mon","MH":"sun","MK":"mon","MM":"sun","MN":"mon","MO":"sun","MQ":"mon","MT":"sun","MV":"fri","MX":"sun","MY":"mon","MZ":"sun","NI":"sun","NL":"mon","NO":"mon","NP":"sun","NZ":"mon","OM":"sat","PA":"sun","PE":"sun","PH":"sun","PK":"sun","PL":"mon","PR":"sun","PT":"mon","PY":"sun","QA":"sat","RE":"mon","RO":"mon","RS":"mon","RU":"mon","SA":"sun","SD":"sat","SE":"mon","SG":"sun","SI":"mon","SK":"mon","SM":"mon","SV":"sun","SY":"sat","TH":"sun","TJ":"mon","TM":"mon","TN":"sun","TR":"mon","TT":"sun","TW":"sun","UA":"mon","UM":"sun","US":"sun","UY":"mon","UZ":"mon","VA":"mon","VE":"sun","VI":"sun","VN":"mon","WS":"sun","XK":"mon","YE":"sun","ZA":"sun","ZW":"sun"},"weekendStart":{"001":"sat","AE":"fri","AF":"thu","BH":"fri","DZ":"fri","EG":"fri","IL":"fri","IN":"sun","IQ":"fri","IR":"fri","JO":"fri","KW":"fri","LY":"fri","MA":"fri","OM":"fri","QA":"fri","SA":"fri","SD":"fri","SY":"fri","TN":"fri","YE":"fri"},"weekendEnd":{"001":"sun","AE":"sat","AF":"fri","BH":"sat","DZ":"sat","EG":"sat","IL":"sat","IQ":"sat","IR":"fri","JO":"sat","KW":"sat","LY":"sat","MA":"sat","OM":"sat","QA":"sat","SA":"sat","SD":"sat","SY":"sat","TN":"sat","YE":"sat"},"af":{"_ordering":"weekOfDate weekOfInterval weekOfMonth"},"am az bs cs cy da el et hi ky lt mk sk ta th":{"_ordering":"weekOfYear weekOfMonth"},"ar fil gu hu hy id kk ko":{"_ordering":"weekOfMonth"},"be ro ru":{"_ordering":"weekOfInterval weekOfMonth"},"bg de iw pt ur zh":{"_ordering":"weekOfDate weekOfMonth weekOfInterval"},"ca es fr gl":{"_ordering":"weekOfDate"},"en bn ja ka":{"_ordering":"weekOfDate weekOfMonth"},"eu":{"_ordering":"weekOfMonth weekOfDate"},"fa hr it lv pl si sr uk uz":{"_ordering":"weekOfMonth weekOfInterval"},"fi zh-TW":{"_ordering":"weekOfYear weekOfDate weekOfMonth"},"is mn no sv vi":{"_ordering":"weekOfYear weekOfMonth weekOfInterval"},"km mr":{"_ordering":"weekOfMonth weekOfYear"},"kn ml pa":{"_ordering":"weekOfMonth weekOfDate weekOfYear"},"lo sq":{"_ordering":"weekOfMonth weekOfInterval weekOfDate weekOfYear"},"ms tr":{"_ordering":"weekOfMonth weekOfYear weekOfInterval weekOfDate"},"nl":{"_ordering":"weekOfDate weekOfYear weekOfMonth"},"sl":{"_ordering":"weekOfInterval"},"sw te":{"_ordering":"weekOfMonth weekOfInterval weekOfYear"},"und":{"_ordering":"weekOfYear"},"zu":{"_ordering":"weekOfYear weekOfInterval"}}}});
i18n.switchLocale(isUserLocaleSupported ? systemLocale : 'en');


/***/ }),

/***/ "./node_modules/@dojo/widgets/calendar/CalendarCell.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CalendarCellBase */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/meta/Focus.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/calendar.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__);






const ThemedBase = Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["a" /* ThemedMixin */])(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */]);
/* unused harmony export ThemedBase */

let CalendarCellBase = class CalendarCellBase extends ThemedBase {
    _onClick(event) {
        event.stopPropagation();
        const { date, disabled = false, onClick } = this.properties;
        onClick && onClick(date, disabled);
    }
    _onKeyDown(event) {
        event.stopPropagation();
        const { onKeyDown } = this.properties;
        onKeyDown && onKeyDown(event.which, () => { event.preventDefault(); });
    }
    formatDate(date) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('span', [`${date}`]);
    }
    getModifierClasses() {
        const { disabled = false, selected = false, today = false } = this.properties;
        return [
            disabled ? __WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__["inactiveDate"] : null,
            selected ? __WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__["selectedDate"] : null,
            today ? __WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__["todayDate"] : null
        ];
    }
    render() {
        const { callFocus, date, focusable = false, selected = false, onFocusCalled } = this.properties;
        if (callFocus) {
            this.meta(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__["a" /* default */]).set('root');
            onFocusCalled && onFocusCalled();
        }
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('td', {
            key: 'root',
            role: 'gridcell',
            'aria-selected': `${selected}`,
            tabIndex: focusable ? 0 : -1,
            classes: this.theme([__WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__["date"], ...this.getModifierClasses()]),
            onclick: this._onClick,
            onkeydown: this._onKeyDown
        }, [this.formatDate(date)]);
    }
};
CalendarCellBase = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_5__theme_calendar_m_css__)
], CalendarCellBase);

class CalendarCell extends CalendarCellBase {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CalendarCell;



/***/ }),

/***/ "./node_modules/@dojo/widgets/calendar/DatePicker.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Paging; });
/* unused harmony export Controls */
/* unused harmony export DatePickerBase */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/meta/Focus.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dojo_framework_core_uuid__ = __webpack_require__("./node_modules/@dojo/framework/core/uuid.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_util__ = __webpack_require__("./node_modules/@dojo/widgets/common/util.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icon_index__ = __webpack_require__("./node_modules/@dojo/widgets/icon/index.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/common/styles/base.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/calendar.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__);










/**
 * Enum for next/previous buttons
 */
var Paging;
(function (Paging) {
    Paging["next"] = "next";
    Paging["previous"] = "previous";
})(Paging || (Paging = {}));
/**
 * Enum for month or year controls
 */
var Controls;
(function (Controls) {
    Controls["month"] = "month";
    Controls["year"] = "year";
})(Controls || (Controls = {}));
const ThemedBase = Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["a" /* ThemedMixin */])(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */]);
/* unused harmony export ThemedBase */

const BASE_YEAR = 2000;
let DatePickerBase = class DatePickerBase extends ThemedBase {
    constructor() {
        super(...arguments);
        this._idBase = Object(__WEBPACK_IMPORTED_MODULE_5__dojo_framework_core_uuid__["a" /* default */])();
        this._monthPopupOpen = false;
        this._yearPopupOpen = false;
        this._yearPage = 0;
    }
    _closeMonthPopup(event) {
        if (event) {
            event.stopPropagation();
        }
        const { onPopupChange } = this.properties;
        this._monthPopupOpen = false;
        this.meta(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__["a" /* default */]).set('month-button');
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    }
    _closeYearPopup(event) {
        if (event) {
            event.stopPropagation();
        }
        const { onPopupChange } = this.properties;
        this._yearPopupOpen = false;
        this.meta(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__["a" /* default */]).set('year-button');
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    }
    _getMonthInputKey(month) {
        return `${this._idBase}_month_input_${month}`;
    }
    _getPopupState() {
        return this._monthPopupOpen || this._yearPopupOpen;
    }
    _getYearInputKey(year) {
        return `${this._idBase}_year_input_${year}`;
    }
    _getYearRange() {
        const { year, yearRange = 20 } = this.properties;
        const offset = (year - BASE_YEAR) % yearRange - yearRange * this._yearPage;
        if (year >= BASE_YEAR) {
            return { first: year - offset, last: year + yearRange - offset };
        }
        else {
            return { first: year - (yearRange + offset), last: year - offset };
        }
    }
    _onMonthButtonClick(event) {
        event.stopPropagation();
        this._monthPopupOpen ? this._closeMonthPopup() : this._openMonthPopup();
    }
    _onMonthRadioChange(event) {
        event.stopPropagation();
        const { onRequestMonthChange } = this.properties;
        onRequestMonthChange && onRequestMonthChange(parseInt(event.target.value, 10));
    }
    _onPopupKeyDown(event) {
        event.stopPropagation();
        // close popup on escape, or if a value is selected with enter/space
        if (event.which === __WEBPACK_IMPORTED_MODULE_6__common_util__["a" /* Keys */].Escape ||
            event.which === __WEBPACK_IMPORTED_MODULE_6__common_util__["a" /* Keys */].Enter ||
            event.which === __WEBPACK_IMPORTED_MODULE_6__common_util__["a" /* Keys */].Space) {
            event.preventDefault();
            this._monthPopupOpen && this._closeMonthPopup();
            this._yearPopupOpen && this._closeYearPopup();
        }
    }
    _onYearButtonClick(event) {
        event.stopPropagation();
        this._yearPopupOpen ? this._closeYearPopup() : this._openYearPopup();
    }
    _onYearPageDown(event) {
        event.stopPropagation();
        this._yearPage--;
        this._yearPopupOpen && this.invalidate();
    }
    _onYearPageUp(event) {
        event.stopPropagation();
        this._yearPage++;
        this._yearPopupOpen && this.invalidate();
    }
    _onYearRadioChange(event) {
        event.stopPropagation();
        const { onRequestYearChange } = this.properties;
        this._yearPage = 0;
        onRequestYearChange && onRequestYearChange(parseInt(event.target.value, 10));
    }
    _openMonthPopup() {
        const { month, onPopupChange } = this.properties;
        this._monthPopupOpen = true;
        this.meta(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__["a" /* default */]).set(this._getMonthInputKey(month));
        this._yearPopupOpen = false;
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    }
    _openYearPopup() {
        const { year, onPopupChange } = this.properties;
        this._yearPopupOpen = true;
        this.meta(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_meta_Focus__["a" /* default */]).set(this._getYearInputKey(year));
        this._monthPopupOpen = false;
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    }
    renderControlsTrigger(type) {
        const { month, monthNames, year } = this.properties;
        const content = type === Controls.month ? monthNames[month].long : `${year}`;
        const open = type === Controls.month ? this._monthPopupOpen : this._yearPopupOpen;
        const onclick = type === Controls.month ? this._onMonthButtonClick : this._onYearButtonClick;
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('button', {
            key: `${type}-button`,
            'aria-controls': `${this._idBase}_${type}_dialog`,
            'aria-expanded': `${open}`,
            'aria-haspopup': 'true',
            id: `${this._idBase}_${type}_button`,
            classes: this.theme([
                __WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__[`${type}Trigger`],
                open ? __WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__[`${type}TriggerActive`] : null
            ]),
            role: 'menuitem',
            type: 'button',
            onclick
        }, [content]);
    }
    renderMonthLabel(month, year) {
        const { monthNames, renderMonthLabel } = this.properties;
        return renderMonthLabel ? renderMonthLabel(month, year) : `${monthNames[month].long} ${year}`;
    }
    renderMonthRadios() {
        const { month } = this.properties;
        return this.properties.monthNames.map((monthName, i) => Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('label', {
            key: `${this._idBase}_month_radios_${i}`,
            classes: this.theme([__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["monthRadio"], i === month ? __WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["monthRadioChecked"] : null]),
            for: this._getMonthInputKey(i),
            onmouseup: this._closeMonthPopup
        }, [
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('input', {
                checked: i === month,
                classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["monthRadioInput"]),
                id: this._getMonthInputKey(i),
                key: this._getMonthInputKey(i),
                name: `${this._idBase}_month_radios`,
                tabIndex: this._monthPopupOpen ? 0 : -1,
                type: 'radio',
                value: `${i}`,
                onchange: this._onMonthRadioChange
            }),
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('abbr', {
                classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["monthRadioLabel"]),
                title: monthName.long
            }, [monthName.short])
        ]));
    }
    renderPagingButtonContent(type) {
        const { labels } = this.properties;
        const iconType = type === Paging.next ? 'rightIcon' : 'leftIcon';
        const labelText = type === Paging.next ? labels.nextYears : labels.previousYears;
        return [
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_7__icon_index__["a" /* default */], { type: iconType, theme: undefined }),
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('span', { classes: __WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__["visuallyHidden"] }, [labelText])
        ];
    }
    renderYearRadios() {
        const { year } = this.properties;
        const radios = [];
        const yearLimits = this._getYearRange();
        for (let i = yearLimits.first; i < yearLimits.last; i++) {
            radios.push(Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('label', {
                key: `${this._idBase}_year_radios_${i}`,
                classes: this.theme([__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["yearRadio"], i === year ? __WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["yearRadioChecked"] : null]),
                for: this._getYearInputKey(i),
                onmouseup: this._closeYearPopup
            }, [
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('input', {
                    checked: i === year,
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["yearRadioInput"]),
                    id: this._getYearInputKey(i),
                    key: this._getYearInputKey(i),
                    name: `${this._idBase}_year_radios`,
                    tabIndex: this._yearPopupOpen ? 0 : -1,
                    type: 'radio',
                    value: `${i}`,
                    onchange: this._onYearRadioChange
                }),
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('abbr', {
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["yearRadioLabel"])
                }, [`${i}`])
            ]));
        }
        return radios;
    }
    render() {
        const { labelId = `${this._idBase}_label`, labels, month, year } = this.properties;
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', {
            classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["datePicker"])
        }, [
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', {
                classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["topMatter"]),
                role: 'menubar'
            }, [
                // hidden label
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('label', {
                    id: labelId,
                    classes: [__WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__["visuallyHidden"]],
                    'aria-live': 'polite',
                    'aria-atomic': 'false'
                }, [this.renderMonthLabel(month, year)]),
                // month trigger
                this.renderControlsTrigger(Controls.month),
                // year trigger
                this.renderControlsTrigger(Controls.year)
            ]),
            // month grid
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', {
                key: 'month-grid',
                'aria-hidden': `${!this._monthPopupOpen}`,
                'aria-labelledby': `${this._idBase}_month_button`,
                classes: [this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["monthGrid"]), !this._monthPopupOpen ? __WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__["visuallyHidden"] : null],
                id: `${this._idBase}_month_dialog`,
                role: 'dialog'
            }, [
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('fieldset', {
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["monthFields"]),
                    onkeydown: this._onPopupKeyDown
                }, [
                    Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('legend', { classes: __WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__["visuallyHidden"] }, [labels.chooseMonth]),
                    ...this.renderMonthRadios()
                ])
            ]),
            // year grid
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', {
                key: 'year-grid',
                'aria-hidden': `${!this._yearPopupOpen}`,
                'aria-labelledby': `${this._idBase}_year_button`,
                classes: [this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["yearGrid"]), !this._yearPopupOpen ? __WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__["visuallyHidden"] : null],
                id: `${this._idBase}_year_dialog`,
                role: 'dialog'
            }, [
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('fieldset', {
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["yearFields"]),
                    onkeydown: this._onPopupKeyDown
                }, [
                    Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('legend', { classes: [__WEBPACK_IMPORTED_MODULE_8__common_styles_base_m_css__["visuallyHidden"]] }, [labels.chooseYear]),
                    ...this.renderYearRadios()
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', {
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["controls"])
                }, [
                    Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('button', {
                        classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["previous"]),
                        tabIndex: this._yearPopupOpen ? 0 : -1,
                        type: 'button',
                        onclick: this._onYearPageDown
                    }, this.renderPagingButtonContent(Paging.previous)),
                    Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('button', {
                        classes: this.theme(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__["next"]),
                        tabIndex: this._yearPopupOpen ? 0 : -1,
                        type: 'button',
                        onclick: this._onYearPageUp
                    }, this.renderPagingButtonContent(Paging.next))
                ])
            ])
        ]);
    }
};
DatePickerBase = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_9__theme_calendar_m_css__)
], DatePickerBase);

class DatePicker extends DatePickerBase {
}
/* harmony export (immutable) */ __webpack_exports__["b"] = DatePicker;



/***/ }),

/***/ "./node_modules/@dojo/widgets/calendar/index.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CalendarBase */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_I18n__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/I18n.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dojo_framework_core_uuid__ = __webpack_require__("./node_modules/@dojo/framework/core/uuid.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_nls_common__ = __webpack_require__("./node_modules/@dojo/widgets/common/nls/common.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_util__ = __webpack_require__("./node_modules/@dojo/widgets/common/util.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CalendarCell__ = __webpack_require__("./node_modules/@dojo/widgets/calendar/CalendarCell.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__DatePicker__ = __webpack_require__("./node_modules/@dojo/widgets/calendar/DatePicker.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__icon_index__ = __webpack_require__("./node_modules/@dojo/widgets/icon/index.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nls_Calendar__ = __webpack_require__("./node_modules/@dojo/widgets/calendar/nls/Calendar.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/calendar.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_styles_base_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/common/styles/base.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_styles_base_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__common_styles_base_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dojo_framework_widget_core_decorators_customElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs");















const DEFAULT_MONTHS = [
    { short: 'janShort', long: 'january' },
    { short: 'febShort', long: 'february' },
    { short: 'marShort', long: 'march' },
    { short: 'aprShort', long: 'april' },
    { short: 'mayShort', long: 'may' },
    { short: 'junShort', long: 'june' },
    { short: 'julShort', long: 'july' },
    { short: 'augShort', long: 'august' },
    { short: 'sepShort', long: 'september' },
    { short: 'octShort', long: 'october' },
    { short: 'novShort', long: 'november' },
    { short: 'decShort', long: 'december' }
];
const DEFAULT_WEEKDAYS = [
    { short: 'sunShort', long: 'sunday' },
    { short: 'monShort', long: 'monday' },
    { short: 'tueShort', long: 'tuesday' },
    { short: 'wedShort', long: 'wednesday' },
    { short: 'thuShort', long: 'thursday' },
    { short: 'friShort', long: 'friday' },
    { short: 'satShort', long: 'saturday' }
];
const ThemedBase = Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_I18n__["a" /* I18nMixin */])(Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_mixins_Themed__["a" /* ThemedMixin */])(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */]));
/* unused harmony export ThemedBase */

let CalendarBase = class CalendarBase extends ThemedBase {
    constructor() {
        super(...arguments);
        this._callDateFocus = false;
        this._defaultDate = new Date();
        this._focusedDay = 1;
        this._monthLabelId = Object(__WEBPACK_IMPORTED_MODULE_5__dojo_framework_core_uuid__["a" /* default */])();
        this._popupOpen = false;
    }
    _getMonthLength(month, year) {
        const lastDate = new Date(year, month + 1, 0);
        return lastDate.getDate();
    }
    _getMonths(commonMessages) {
        return DEFAULT_MONTHS.map((month) => ({
            short: commonMessages[month.short],
            long: commonMessages[month.long]
        }));
    }
    _getMonthYear() {
        const { month, selectedDate = this._defaultDate, year } = this.properties;
        return {
            month: typeof month === 'number' ? month : selectedDate.getMonth(),
            year: typeof year === 'number' ? year : selectedDate.getFullYear()
        };
    }
    _getWeekdays(commonMessages) {
        return DEFAULT_WEEKDAYS.map((weekday) => ({
            short: commonMessages[weekday.short],
            long: commonMessages[weekday.long]
        }));
    }
    _goToDate(day) {
        const { month, year } = this._getMonthYear();
        const currentMonthLength = this._getMonthLength(month, year);
        const previousMonthLength = this._getMonthLength(month - 1, year);
        if (day < 1) {
            this._onMonthDecrement();
            day += previousMonthLength;
        }
        else if (day > currentMonthLength) {
            this._onMonthIncrement();
            day -= currentMonthLength;
        }
        this._focusedDay = day;
        this._callDateFocus = true;
        this.invalidate();
    }
    _onDateClick(date, disabled) {
        const { onDateSelect } = this.properties;
        let { month, year } = this._getMonthYear();
        if (disabled && date < 15) {
            ({ month, year } = this._onMonthIncrement());
            this._callDateFocus = true;
        }
        else if (disabled && date >= 15) {
            ({ month, year } = this._onMonthDecrement());
            this._callDateFocus = true;
        }
        this._focusedDay = date;
        onDateSelect && onDateSelect(new Date(year, month, date));
    }
    _onDateFocusCalled() {
        this._callDateFocus = false;
    }
    _onDateKeyDown(key, preventDefault) {
        const { month, year } = this._getMonthYear();
        switch (key) {
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].Up:
                preventDefault();
                this._goToDate(this._focusedDay - 7);
                break;
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].Down:
                preventDefault();
                this._goToDate(this._focusedDay + 7);
                break;
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].Left:
                preventDefault();
                this._goToDate(this._focusedDay - 1);
                break;
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].Right:
                preventDefault();
                this._goToDate(this._focusedDay + 1);
                break;
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].PageUp:
                preventDefault();
                this._goToDate(1);
                break;
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].PageDown:
                preventDefault();
                const monthLengh = this._getMonthLength(month, year);
                this._goToDate(monthLengh);
                break;
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].Enter:
            case __WEBPACK_IMPORTED_MODULE_7__common_util__["a" /* Keys */].Space:
                const { onDateSelect } = this.properties;
                onDateSelect && onDateSelect(new Date(year, month, this._focusedDay));
        }
    }
    _onMonthDecrement() {
        const { month, year } = this._getMonthYear();
        const { onMonthChange, onYearChange } = this.properties;
        if (month === 0) {
            onMonthChange && onMonthChange(11);
            onYearChange && onYearChange(year - 1);
            return { month: 11, year: year - 1 };
        }
        onMonthChange && onMonthChange(month - 1);
        return { month: month - 1, year: year };
    }
    _onMonthIncrement() {
        const { month, year } = this._getMonthYear();
        const { onMonthChange, onYearChange } = this.properties;
        if (month === 11) {
            onMonthChange && onMonthChange(0);
            onYearChange && onYearChange(year + 1);
            return { month: 0, year: year + 1 };
        }
        onMonthChange && onMonthChange(month + 1);
        return { month: month + 1, year: year };
    }
    _onMonthPageDown(event) {
        event.stopPropagation();
        this._onMonthDecrement();
    }
    _onMonthPageUp(event) {
        event.stopPropagation();
        this._onMonthIncrement();
    }
    _renderDateGrid(selectedDate) {
        const { month, year } = this._getMonthYear();
        const currentMonthLength = this._getMonthLength(month, year);
        const previousMonthLength = this._getMonthLength(month - 1, year);
        const initialWeekday = new Date(year, month, 1).getDay();
        const todayString = new Date().toDateString();
        let dayIndex = 0;
        let date = initialWeekday > 0 ? previousMonthLength - initialWeekday : 0;
        let isCurrentMonth = initialWeekday > 0 ? false : true;
        let isSelectedDay;
        let weeks = [];
        let days;
        let dateString;
        let i;
        for (let week = 0; week < 6; week++) {
            days = [];
            for (i = 0; i < 7; i++) {
                // find the next date
                // if we've reached the end of the previous month, reset to 1
                if (date > dayIndex && date >= previousMonthLength) {
                    date = 1;
                    isCurrentMonth = true;
                }
                else if (date <= dayIndex && date >= currentMonthLength) {
                    date = 1;
                    isCurrentMonth = false;
                }
                else {
                    date++;
                }
                dayIndex++;
                // set isSelectedDay if the dates match
                dateString = new Date(year, month, date).toDateString();
                if (isCurrentMonth && selectedDate && dateString === selectedDate.toDateString()) {
                    isSelectedDay = true;
                }
                else {
                    isSelectedDay = false;
                }
                const isToday = isCurrentMonth && dateString === todayString;
                days.push(this.renderDateCell(date, week * 7 + i, isSelectedDay, isCurrentMonth, isToday));
            }
            weeks.push(Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('tr', days));
        }
        return weeks;
    }
    renderDateCell(date, index, selected, currentMonth, today) {
        const { theme } = this.properties;
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_8__CalendarCell__["a" /* default */], {
            key: `date-${index}`,
            callFocus: this._callDateFocus && currentMonth && date === this._focusedDay,
            date,
            disabled: !currentMonth,
            focusable: currentMonth && date === this._focusedDay,
            selected,
            theme,
            today,
            onClick: this._onDateClick,
            onFocusCalled: this._onDateFocusCalled,
            onKeyDown: this._onDateKeyDown
        });
    }
    renderDatePicker(commonMessages, labels) {
        const { monthNames = this._getMonths(commonMessages), renderMonthLabel, theme, onMonthChange, onYearChange } = this.properties;
        const { month, year } = this._getMonthYear();
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_9__DatePicker__["b" /* default */], {
            key: 'date-picker',
            labelId: this._monthLabelId,
            labels,
            month,
            monthNames,
            renderMonthLabel,
            theme,
            year,
            onPopupChange: (open) => {
                this._popupOpen = open;
                this.invalidate();
            },
            onRequestMonthChange: (requestMonth) => {
                onMonthChange && onMonthChange(requestMonth);
            },
            onRequestYearChange: (requestYear) => {
                onYearChange && onYearChange(requestYear);
            }
        });
    }
    renderPagingButtonContent(type, labels) {
        const { theme } = this.properties;
        const iconType = type === __WEBPACK_IMPORTED_MODULE_9__DatePicker__["a" /* Paging */].next ? 'rightIcon' : 'leftIcon';
        const labelText = type === __WEBPACK_IMPORTED_MODULE_9__DatePicker__["a" /* Paging */].next ? labels.nextMonth : labels.previousMonth;
        return [
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_10__icon_index__["a" /* default */], { type: iconType, theme: undefined }),
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('span', { classes: [__WEBPACK_IMPORTED_MODULE_13__common_styles_base_m_css__["visuallyHidden"]] }, [labelText])
        ];
    }
    renderWeekdayCell(day) {
        const { renderWeekdayCell } = this.properties;
        return renderWeekdayCell ? renderWeekdayCell(day) : Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('abbr', { title: day.long }, [day.short]);
    }
    render() {
        const { messages: commonMessages } = this.localizeBundle(__WEBPACK_IMPORTED_MODULE_6__common_nls_common__["a" /* default */]);
        const { labels = this.localizeBundle(__WEBPACK_IMPORTED_MODULE_11__nls_Calendar__["a" /* default */]).messages, aria = {}, selectedDate, weekdayNames = this._getWeekdays(commonMessages) } = this.properties;
        // Calendar Weekday array
        const weekdays = [];
        for (const weekday in weekdayNames) {
            weekdays.push(Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('th', {
                role: 'columnheader',
                classes: this.theme(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__["weekday"])
            }, [
                this.renderWeekdayCell(weekdayNames[weekday])
            ]));
        }
        return Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', Object.assign({ classes: this.theme(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__["root"]) }, Object(__WEBPACK_IMPORTED_MODULE_7__common_util__["b" /* formatAriaProperties */])(aria)), [
            // header
            this.renderDatePicker(commonMessages, labels),
            // date table
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('table', {
                cellspacing: '0',
                cellpadding: '0',
                role: 'grid',
                'aria-labelledby': this._monthLabelId,
                classes: [this.theme(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__["dateGrid"]), this._popupOpen ? __WEBPACK_IMPORTED_MODULE_13__common_styles_base_m_css__["visuallyHidden"] : null]
            }, [
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('thead', [
                    Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('tr', weekdays)
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('tbody', this._renderDateGrid(selectedDate))
            ]),
            // controls
            Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('div', {
                classes: [this.theme(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__["controls"]), this._popupOpen ? __WEBPACK_IMPORTED_MODULE_13__common_styles_base_m_css__["visuallyHidden"] : null]
            }, [
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('button', {
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__["previous"]),
                    tabIndex: this._popupOpen ? -1 : 0,
                    type: 'button',
                    onclick: this._onMonthPageDown
                }, this.renderPagingButtonContent(__WEBPACK_IMPORTED_MODULE_9__DatePicker__["a" /* Paging */].previous, labels)),
                Object(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_d__["h" /* v */])('button', {
                    classes: this.theme(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__["next"]),
                    tabIndex: this._popupOpen ? -1 : 0,
                    type: 'button',
                    onclick: this._onMonthPageUp
                }, this.renderPagingButtonContent(__WEBPACK_IMPORTED_MODULE_9__DatePicker__["a" /* Paging */].next, labels))
            ])
        ]);
    }
};
CalendarBase = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_12__theme_calendar_m_css__),
    Object(__WEBPACK_IMPORTED_MODULE_14__dojo_framework_widget_core_decorators_customElement__["b" /* default */])({
        tag: 'dojo-calendar',
        properties: [
            'aria',
            'selectedDate',
            'month',
            'year',
            'renderMonthLabel',
            'renderWeekdayCell',
            'labels',
            'monthNames',
            'weekdayNames',
            'theme'
        ],
        events: ['onDateSelect', 'onMonthChange', 'onYearChange']
    })
], CalendarBase);

class Calendar extends CalendarBase {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Calendar;



/***/ }),

/***/ "./node_modules/@dojo/widgets/calendar/nls/Calendar.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const locales = {};
const messages = {
    chooseMonth: 'Choose Month',
    chooseYear: 'Choose Year',
    previousMonth: 'Previous Month',
    nextMonth: 'Next Month',
    previousYears: 'Earlier years',
    nextYears: 'Later years'
};
/* harmony default export */ __webpack_exports__["a"] = ({ locales, messages });


/***/ }),

/***/ "./node_modules/@dojo/widgets/common/nls/common.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const locales = {};
const messages = {
    sunShort: 'Sun',
    monShort: 'Mon',
    tueShort: 'Tue',
    wedShort: 'Wed',
    thuShort: 'Thu',
    friShort: 'Fri',
    satShort: 'Sat',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    janShort: 'Jan',
    febShort: 'Feb',
    marShort: 'Mar',
    aprShort: 'Apr',
    mayShort: 'May',
    junShort: 'Jun',
    julShort: 'Jul',
    augShort: 'Aug',
    sepShort: 'Sep',
    octShort: 'Oct',
    novShort: 'Nov',
    decShort: 'Dec',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    clear: 'clear',
    close: 'close',
    open: 'open'
};
/* harmony default export */ __webpack_exports__["a"] = ({ locales, messages });


/***/ }),

/***/ "./node_modules/@dojo/widgets/common/styles/base.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/common/styles/base.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/@dojo/widgets/common/styles/base.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"visuallyHidden":"_1AeWeApr","focusable":"_1_qANqXi","hidden":"_3QddUiBU"," _key":"@dojo/widgets/base"};
}));;

/***/ }),

/***/ "./node_modules/@dojo/widgets/common/util.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keys; });
/* harmony export (immutable) */ __webpack_exports__["b"] = formatAriaProperties;
var Keys;
(function (Keys) {
    Keys[Keys["Down"] = 40] = "Down";
    Keys[Keys["End"] = 35] = "End";
    Keys[Keys["Enter"] = 13] = "Enter";
    Keys[Keys["Escape"] = 27] = "Escape";
    Keys[Keys["Home"] = 36] = "Home";
    Keys[Keys["Left"] = 37] = "Left";
    Keys[Keys["PageDown"] = 34] = "PageDown";
    Keys[Keys["PageUp"] = 33] = "PageUp";
    Keys[Keys["Right"] = 39] = "Right";
    Keys[Keys["Space"] = 32] = "Space";
    Keys[Keys["Tab"] = 9] = "Tab";
    Keys[Keys["Up"] = 38] = "Up";
})(Keys || (Keys = {}));
function formatAriaProperties(aria) {
    const formattedAria = Object.keys(aria).reduce((a, key) => {
        a[`aria-${key.toLowerCase()}`] = aria[key];
        return a;
    }, {});
    return formattedAria;
}


/***/ }),

/***/ "./node_modules/@dojo/widgets/enhanced-text-input/index.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__text_input_index__ = __webpack_require__("./node_modules/@dojo/widgets/text-input/index.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/enhanced-text-input.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dojo_framework_widget_core_decorators_customElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs");






let EnhancedTextInput = class EnhancedTextInput extends __WEBPACK_IMPORTED_MODULE_3__text_input_index__["a" /* TextInputBase */] {
    renderAddon(addon, before = false) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_d__["h" /* v */])('span', {
            classes: this.theme([__WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__["addon"], before ? __WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__["addonBefore"] : __WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__["addonAfter"]])
        }, [addon]);
    }
    renderInputWrapper() {
        let { addonAfter = [], addonBefore = [] } = this.properties;
        return Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_d__["h" /* v */])('div', { classes: this.theme(__WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__["inputWrapper"]) }, [
            ...addonBefore.map((addon) => this.renderAddon(addon, true)),
            this.renderInput(),
            ...addonAfter.map((addon) => this.renderAddon(addon))
        ]);
    }
};
EnhancedTextInput = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_4__theme_enhanced_text_input_m_css__),
    Object(__WEBPACK_IMPORTED_MODULE_5__dojo_framework_widget_core_decorators_customElement__["a" /* customElement */])({
        tag: 'dojo-enhanced-text-input',
        properties: [
            'theme',
            'aria',
            'extraClasses',
            'addonAfter',
            'addonBefore',
            'labelAfter',
            'labelHidden',
            'shouldFocus',
            'disabled',
            'invalid',
            'readOnly'
        ],
        attributes: ['widgetId', 'label', 'placeholder', 'controls', 'type', 'minLength', 'maxLength', 'value', 'name'],
        events: [
            'onBlur',
            'onChange',
            'onClick',
            'onFocus',
            'onInput',
            'onKeyDown',
            'onKeyPress',
            'onKeyUp',
            'onMouseDown',
            'onMouseUp',
            'onTouchCancel',
            'onTouchEnd',
            'onTouchStart'
        ]
    })
], EnhancedTextInput);
/* harmony default export */ __webpack_exports__["a"] = (EnhancedTextInput);


/***/ }),

/***/ "./node_modules/@dojo/widgets/icon/index.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IconBase */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_util__ = __webpack_require__("./node_modules/@dojo/widgets/common/util.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/icon.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/common/styles/base.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dojo_framework_widget_core_decorators_customElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs");








const ThemedBase = Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["a" /* ThemedMixin */])(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */]);
/* unused harmony export ThemedBase */

let IconBase = class IconBase extends ThemedBase {
    renderAltText(altText) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('span', { classes: [__WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css__["visuallyHidden"]] }, [altText]);
    }
    render() {
        const { aria = {
            hidden: 'true'
        }, type, altText } = this.properties;
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('span', { classes: this.theme(__WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css__["root"]) }, [
            Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('i', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__common_util__["b" /* formatAriaProperties */])(aria), { classes: this.theme([__WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css__["icon"], __WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css__[type]]) })),
            altText ? this.renderAltText(altText) : null
        ]);
    }
};
IconBase = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_5__theme_icon_m_css__),
    Object(__WEBPACK_IMPORTED_MODULE_7__dojo_framework_widget_core_decorators_customElement__["a" /* customElement */])({
        tag: 'dojo-icon',
        properties: [
            'theme',
            'aria',
            'extraClasses'
        ],
        attributes: ['type', 'altText']
    })
], IconBase);

class Icon extends IconBase {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Icon;



/***/ }),

/***/ "./node_modules/@dojo/widgets/label/index.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LabelBase */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_util__ = __webpack_require__("./node_modules/@dojo/widgets/common/util.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/label.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/common/styles/base.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dojo_framework_widget_core_decorators_customElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs");








const ThemedBase = Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["a" /* ThemedMixin */])(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */]);
/* unused harmony export ThemedBase */

let LabelBase = class LabelBase extends ThemedBase {
    getRootClasses() {
        const { disabled, focused, invalid, readOnly, required, secondary } = this.properties;
        return [
            __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["root"],
            disabled ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["disabled"] : null,
            focused ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["focused"] : null,
            invalid === true ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["invalid"] : null,
            invalid === false ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["valid"] : null,
            readOnly ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["readonly"] : null,
            required ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["required"] : null,
            secondary ? __WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__["secondary"] : null
        ];
    }
    render() {
        const { aria = {}, forId, hidden } = this.properties;
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('label', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__common_util__["b" /* formatAriaProperties */])(aria), { classes: [
                ...this.theme(this.getRootClasses()),
                hidden ? __WEBPACK_IMPORTED_MODULE_6__common_styles_base_m_css__["visuallyHidden"] : null
            ], for: forId }), this.children);
    }
};
LabelBase = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_5__theme_label_m_css__),
    Object(__WEBPACK_IMPORTED_MODULE_7__dojo_framework_widget_core_decorators_customElement__["a" /* customElement */])({
        tag: 'dojo-label',
        properties: ['theme', 'aria', 'extraClasses', 'disabled', 'focused', 'readOnly', 'required', 'invalid', 'hidden', 'secondary'],
        attributes: [],
        events: []
    })
], LabelBase);

class Label extends LabelBase {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Label;



/***/ }),

/***/ "./node_modules/@dojo/widgets/text-input/index.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextInputBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Themed.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_meta_Focus__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/meta/Focus.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__label_index__ = __webpack_require__("./node_modules/@dojo/widgets/label/index.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_util__ = __webpack_require__("./node_modules/@dojo/widgets/common/util.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dojo_framework_core_uuid__ = __webpack_require__("./node_modules/@dojo/framework/core/uuid.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__ = __webpack_require__("./node_modules/@dojo/widgets/theme/text-input.m.css.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dojo_framework_widget_core_decorators_customElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs");










const ThemedBase = Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["a" /* ThemedMixin */])(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */]);
/* unused harmony export ThemedBase */

let TextInputBase = class TextInputBase extends ThemedBase {
    constructor() {
        super();
        this._uuid = Object(__WEBPACK_IMPORTED_MODULE_7__dojo_framework_core_uuid__["a" /* default */])();
    }
    _onBlur(event) {
        this.properties.onBlur && this.properties.onBlur(event.target.value);
    }
    _onChange(event) {
        event.stopPropagation();
        this.properties.onChange && this.properties.onChange(event.target.value);
    }
    _onClick(event) {
        event.stopPropagation();
        this.properties.onClick && this.properties.onClick(event.target.value);
    }
    _onFocus(event) {
        this.properties.onFocus && this.properties.onFocus(event.target.value);
    }
    _onInput(event) {
        event.stopPropagation();
        this.properties.onInput && this.properties.onInput(event.target.value);
    }
    _onKeyDown(event) {
        event.stopPropagation();
        this.properties.onKeyDown && this.properties.onKeyDown(event.which, () => { event.preventDefault(); });
    }
    _onKeyPress(event) {
        event.stopPropagation();
        this.properties.onKeyPress && this.properties.onKeyPress(event.which, () => { event.preventDefault(); });
    }
    _onKeyUp(event) {
        event.stopPropagation();
        this.properties.onKeyUp && this.properties.onKeyUp(event.which, () => { event.preventDefault(); });
    }
    _onMouseDown(event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    }
    _onMouseUp(event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    }
    _onTouchStart(event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    }
    _onTouchEnd(event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    }
    _onTouchCancel(event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    }
    getRootClasses() {
        const { disabled, invalid, readOnly, required } = this.properties;
        const focus = this.meta(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_meta_Focus__["a" /* default */]).get('root');
        return [
            __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["root"],
            disabled ? __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["disabled"] : null,
            focus.containsFocus ? __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["focused"] : null,
            invalid === true ? __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["invalid"] : null,
            invalid === false ? __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["valid"] : null,
            readOnly ? __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["readonly"] : null,
            required ? __WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["required"] : null
        ];
    }
    renderInput() {
        const { aria = {}, disabled, widgetId = this._uuid, invalid, maxLength, minLength, name, placeholder, readOnly, required, type = 'text', value, shouldFocus } = this.properties;
        if (shouldFocus) {
            this.meta(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_meta_Focus__["a" /* default */]).set('input');
        }
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('input', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_6__common_util__["b" /* formatAriaProperties */])(aria), { 'aria-invalid': invalid ? 'true' : null, classes: this.theme(__WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["input"]), disabled, id: widgetId, key: 'input', maxlength: maxLength ? `${maxLength}` : null, minlength: minLength ? `${minLength}` : null, name,
            placeholder,
            readOnly, 'aria-readonly': readOnly ? 'true' : null, required,
            type,
            value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }));
    }
    renderInputWrapper() {
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('div', { classes: this.theme(__WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__["inputWrapper"]) }, [
            this.renderInput()
        ]);
    }
    render() {
        const { disabled, widgetId = this._uuid, invalid, label, labelAfter = false, labelHidden = false, readOnly, required, theme } = this.properties;
        const focus = this.meta(__WEBPACK_IMPORTED_MODULE_4__dojo_framework_widget_core_meta_Focus__["a" /* default */]).get('root');
        const children = [
            label ? Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_5__label_index__["a" /* default */], {
                theme,
                disabled,
                focused: focus.containsFocus,
                invalid,
                readOnly,
                required,
                hidden: labelHidden,
                forId: widgetId
            }, [label]) : null,
            this.renderInputWrapper()
        ];
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children.reverse() : children);
    }
};
TextInputBase = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_mixins_Themed__["c" /* theme */])(__WEBPACK_IMPORTED_MODULE_8__theme_text_input_m_css__),
    Object(__WEBPACK_IMPORTED_MODULE_9__dojo_framework_widget_core_decorators_customElement__["a" /* customElement */])({
        tag: 'dojo-text-input',
        properties: [
            'theme',
            'aria',
            'extraClasses',
            'shouldFocus',
            'disabled',
            'invalid',
            'readOnly',
            'labelAfter',
            'labelHidden'
        ],
        attributes: ['widgetId', 'label', 'placeholder', 'controls', 'type', 'minLength', 'maxLength', 'value', 'name'],
        events: [
            'onBlur',
            'onChange',
            'onClick',
            'onFocus',
            'onInput',
            'onKeyDown',
            'onKeyPress',
            'onKeyUp',
            'onMouseDown',
            'onMouseUp',
            'onTouchCancel',
            'onTouchEnd',
            'onTouchStart'
        ]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
], TextInputBase);

class TextInput extends TextInputBase {
}
/* unused harmony export default */



/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/calendar.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/calendar.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/@dojo/widgets/theme/calendar.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_164erekn","inactiveDate":"_2p566ssr","selectedDate":"_qlq8CmI","todayDate":"_1_fb2J7J","date":"_2B5Zl0DA","dateGrid":"_36NtUWZq","weekday":"_2ihGUDLV","datePicker":"_2Btiolnf","topMatter":"_118Wlxwa","monthTrigger":"_1Dem6xLo","yearTrigger":"_13RXv02M","controls":"VASTEvFe","previous":"_1Q15sBKH","next":"_1BlOOaI1","monthGrid":"_3IAbYven","monthFields":"tcBGTPmZ","yearGrid":"_2vU7DQgM","yearFields":"_1BTWlJj1","monthRadio":"MJVIPE4L","yearRadio":"_2V8QwcEe","monthRadioChecked":"_60w7BVEr","yearRadioChecked":"fw8s0Yge","monthRadioInput":"V3aI8e3z","monthRadioLabel":"_3meMiIHF","yearRadioInput":"JoYvsJnE","yearRadioLabel":"_1-CJ59rL","monthTriggerActive":"rBw1aYnx","yearTriggerActive":"_3w6LrpWv"," _key":"@dojo/widgets/calendar"};
}));;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/enhanced-text-input.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/enhanced-text-input.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/@dojo/widgets/theme/enhanced-text-input.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"addon":"_16JxLgQE","addonAfter":"QxdTEWCX","addonBefore":"_1S4agTV9","input":"jiZlEIcd _11VimoPG","inputWrapper":"_28IJxh5r"," _key":"@dojo/widgets/enhanced-text-input"};
}));;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/icon.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/icon.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/@dojo/widgets/theme/icon.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_2L6Ls-Zy","icon":"_3tF1vZM-","downIcon":"_3GFyIk3G","leftIcon":"_1db8DKc8","rightIcon":"_2a143YET","closeIcon":"w1WZiet2","plusIcon":"_2V_909OC","minusIcon":"_27KOe4gH","checkIcon":"mKil4MCX","upIcon":"Rw4TXrdb","upAltIcon":"b2BPqdCO","downAltIcon":"_3QpkEw-I","searchIcon":"_3MWqsC_b","barsIcon":"_3uXWm-H6","settingsIcon":"_3V--OLwl","alertIcon":"_3YjJOXWh","helpIcon":"_3mL91Z0s","infoIcon":"dZLeo6Sf","phoneIcon":"_1vzkNuNB","editIcon":"_2y3IH3o2","dateIcon":"_1_x6RqtA","linkIcon":"HkV2v3yK","locationIcon":"_24-7y_Lz","secureIcon":"_2cTDxmou","mailIcon":"_12PMYHnq"," _key":"@dojo/widgets/icon"};
}));;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/label.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/label.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/@dojo/widgets/theme/label.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_1Xn7GZjl","readonly":"_79gMw0vX","invalid":"_1HXQXand","valid":"_3TeO85nD","required":"_2a_lwZi8","disabled":"_3gv9ptxH","focused":"_2Qy2nYta","secondary":"_29UpR7Gd"," _key":"@dojo/widgets/label"};
}));;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/text-input.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/text-input.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/@dojo/widgets/theme/text-input.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"input":"_11VimoPG","root":"_1NgZUEE4","inputWrapper":"TxI_qeto","disabled":"xKv_GKpT","focused":"_1_cNY7E8","readonly":"_39faZFMX","required":"_1sSaabHo","invalid":"_3ty-BRNM","valid":"_3A71sBn4"," _key":"@dojo/widgets/text-input"};
}));;

/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.4.8
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-11-26T15:03Z
 */
/*!
 * CLDR JavaScript Library v0.4.8 2016-11-26T15:03Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( root, factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {
		// Node. CommonJS.
		module.exports = factory();
	} else {
		// Global
		root.Cldr = factory();
	}

}( this, function() {


	var arrayIsArray = Array.isArray || function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Array]";
	};




	var pathNormalize = function( path, attributes ) {
		if ( arrayIsArray( path ) ) {
			path = path.join( "/" );
		}
		if ( typeof path !== "string" ) {
			throw new Error( "invalid path \"" + path + "\"" );
		}
		// 1: Ignore leading slash `/`
		// 2: Ignore leading `cldr/`
		path = path
			.replace( /^\// , "" ) /* 1 */
			.replace( /^cldr\// , "" ); /* 2 */

		// Replace {attribute}'s
		path = path.replace( /{[a-zA-Z]+}/g, function( name ) {
			name = name.replace( /^{([^}]*)}$/, "$1" );
			return attributes[ name ];
		});

		return path.split( "/" );
	};




	var arraySome = function( array, callback ) {
		var i, length;
		if ( array.some ) {
			return array.some( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			if ( callback( array[ i ], i, array ) ) {
				return true;
			}
		}
		return false;
	};




	/**
	 * Return the maximized language id as defined in
	 * http://www.unicode.org/reports/tr35/#Likely_Subtags
	 * 1. Canonicalize.
	 * 1.1 Make sure the input locale is in canonical form: uses the right
	 * separator, and has the right casing.
	 * TODO Right casing? What df? It seems languages are lowercase, scripts are
	 * Capitalized, territory is uppercase. I am leaving this as an exercise to
	 * the user.
	 *
	 * 1.2 Replace any deprecated subtags with their canonical values using the
	 * <alias> data in supplemental metadata. Use the first value in the
	 * replacement list, if it exists. Language tag replacements may have multiple
	 * parts, such as "sh" ➞ "sr_Latn" or mo" ➞ "ro_MD". In such a case, the
	 * original script and/or region are retained if there is one. Thus
	 * "sh_Arab_AQ" ➞ "sr_Arab_AQ", not "sr_Latn_AQ".
	 * TODO What <alias> data?
	 *
	 * 1.3 If the tag is grandfathered (see <variable id="$grandfathered"
	 * type="choice"> in the supplemental data), then return it.
	 * TODO grandfathered?
	 *
	 * 1.4 Remove the script code 'Zzzz' and the region code 'ZZ' if they occur.
	 * 1.5 Get the components of the cleaned-up source tag (languages, scripts,
	 * and regions), plus any variants and extensions.
	 * 2. Lookup. Lookup each of the following in order, and stop on the first
	 * match:
	 * 2.1 languages_scripts_regions
	 * 2.2 languages_regions
	 * 2.3 languages_scripts
	 * 2.4 languages
	 * 2.5 und_scripts
	 * 3. Return
	 * 3.1 If there is no match, either return an error value, or the match for
	 * "und" (in APIs where a valid language tag is required).
	 * 3.2 Otherwise there is a match = languagem_scriptm_regionm
	 * 3.3 Let xr = xs if xs is not empty, and xm otherwise.
	 * 3.4 Return the language tag composed of languager _ scriptr _ regionr +
	 * variants + extensions.
	 *
	 * @subtags [Array] normalized language id subtags tuple (see init.js).
	 */
	var coreLikelySubtags = function( Cldr, cldr, subtags, options ) {
		var match, matchFound,
			language = subtags[ 0 ],
			script = subtags[ 1 ],
			sep = Cldr.localeSep,
			territory = subtags[ 2 ],
			variants = subtags.slice( 3, 4 );
		options = options || {};

		// Skip if (language, script, territory) is not empty [3.3]
		if ( language !== "und" && script !== "Zzzz" && territory !== "ZZ" ) {
			return [ language, script, territory ].concat( variants );
		}

		// Skip if no supplemental likelySubtags data is present
		if ( typeof cldr.get( "supplemental/likelySubtags" ) === "undefined" ) {
			return;
		}

		// [2]
		matchFound = arraySome([
			[ language, script, territory ],
			[ language, territory ],
			[ language, script ],
			[ language ],
			[ "und", script ]
		], function( test ) {
			return match = !(/\b(Zzzz|ZZ)\b/).test( test.join( sep ) ) /* [1.4] */ && cldr.get( [ "supplemental/likelySubtags", test.join( sep ) ] );
		});

		// [3]
		if ( matchFound ) {
			// [3.2 .. 3.4]
			match = match.split( sep );
			return [
				language !== "und" ? language : match[ 0 ],
				script !== "Zzzz" ? script : match[ 1 ],
				territory !== "ZZ" ? territory : match[ 2 ]
			].concat( variants );
		} else if ( options.force ) {
			// [3.1.2]
			return cldr.get( "supplemental/likelySubtags/und" ).split( sep );
		} else {
			// [3.1.1]
			return;
		}
	};



	/**
	 * Given a locale, remove any fields that Add Likely Subtags would add.
	 * http://www.unicode.org/reports/tr35/#Likely_Subtags
	 * 1. First get max = AddLikelySubtags(inputLocale). If an error is signaled,
	 * return it.
	 * 2. Remove the variants from max.
	 * 3. Then for trial in {language, language _ region, language _ script}. If
	 * AddLikelySubtags(trial) = max, then return trial + variants.
	 * 4. If you do not get a match, return max + variants.
	 * 
	 * @maxLanguageId [Array] maxLanguageId tuple (see init.js).
	 */
	var coreRemoveLikelySubtags = function( Cldr, cldr, maxLanguageId ) {
		var match, matchFound,
			language = maxLanguageId[ 0 ],
			script = maxLanguageId[ 1 ],
			territory = maxLanguageId[ 2 ],
			variants = maxLanguageId[ 3 ];

		// [3]
		matchFound = arraySome([
			[ [ language, "Zzzz", "ZZ" ], [ language ] ],
			[ [ language, "Zzzz", territory ], [ language, territory ] ],
			[ [ language, script, "ZZ" ], [ language, script ] ]
		], function( test ) {
			var result = coreLikelySubtags( Cldr, cldr, test[ 0 ] );
			match = test[ 1 ];
			return result && result[ 0 ] === maxLanguageId[ 0 ] &&
				result[ 1 ] === maxLanguageId[ 1 ] &&
				result[ 2 ] === maxLanguageId[ 2 ];
		});

		if ( matchFound ) {
			if ( variants ) {
				match.push( variants );
			}
			return match;
		}

		// [4]
		return maxLanguageId;
	};




	/**
	 * subtags( locale )
	 *
	 * @locale [String]
	 */
	var coreSubtags = function( locale ) {
		var aux, unicodeLanguageId,
			subtags = [];

		locale = locale.replace( /_/, "-" );

		// Unicode locale extensions.
		aux = locale.split( "-u-" );
		if ( aux[ 1 ] ) {
			aux[ 1 ] = aux[ 1 ].split( "-t-" );
			locale = aux[ 0 ] + ( aux[ 1 ][ 1 ] ? "-t-" + aux[ 1 ][ 1 ] : "");
			subtags[ 4 /* unicodeLocaleExtensions */ ] = aux[ 1 ][ 0 ];
		}

		// TODO normalize transformed extensions. Currently, skipped.
		// subtags[ x ] = locale.split( "-t-" )[ 1 ];
		unicodeLanguageId = locale.split( "-t-" )[ 0 ];

		// unicode_language_id = "root"
		//   | unicode_language_subtag         
		//     (sep unicode_script_subtag)? 
		//     (sep unicode_region_subtag)?
		//     (sep unicode_variant_subtag)* ;
		//
		// Although unicode_language_subtag = alpha{2,8}, I'm using alpha{2,3}. Because, there's no language on CLDR lengthier than 3.
		aux = unicodeLanguageId.match( /^(([a-z]{2,3})(-([A-Z][a-z]{3}))?(-([A-Z]{2}|[0-9]{3}))?)((-([a-zA-Z0-9]{5,8}|[0-9][a-zA-Z0-9]{3}))*)$|^(root)$/ );
		if ( aux === null ) {
			return [ "und", "Zzzz", "ZZ" ];
		}
		subtags[ 0 /* language */ ] = aux[ 10 ] /* root */ || aux[ 2 ] || "und";
		subtags[ 1 /* script */ ] = aux[ 4 ] || "Zzzz";
		subtags[ 2 /* territory */ ] = aux[ 6 ] || "ZZ";
		if ( aux[ 7 ] && aux[ 7 ].length ) {
			subtags[ 3 /* variant */ ] = aux[ 7 ].slice( 1 ) /* remove leading "-" */;
		}

		// 0: language
		// 1: script
		// 2: territory (aka region)
		// 3: variant
		// 4: unicodeLocaleExtensions
		return subtags;
	};




	var arrayForEach = function( array, callback ) {
		var i, length;
		if ( array.forEach ) {
			return array.forEach( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			callback( array[ i ], i, array );
		}
	};




	/**
	 * bundleLookup( minLanguageId )
	 *
	 * @Cldr [Cldr class]
	 *
	 * @cldr [Cldr instance]
	 *
	 * @minLanguageId [String] requested languageId after applied remove likely subtags.
	 */
	var bundleLookup = function( Cldr, cldr, minLanguageId ) {
		var availableBundleMap = Cldr._availableBundleMap,
			availableBundleMapQueue = Cldr._availableBundleMapQueue;

		if ( availableBundleMapQueue.length ) {
			arrayForEach( availableBundleMapQueue, function( bundle ) {
				var existing, maxBundle, minBundle, subtags;
				subtags = coreSubtags( bundle );
				maxBundle = coreLikelySubtags( Cldr, cldr, subtags );
				minBundle = coreRemoveLikelySubtags( Cldr, cldr, maxBundle );
				minBundle = minBundle.join( Cldr.localeSep );
				existing = availableBundleMapQueue[ minBundle ];
				if ( existing && existing.length < bundle.length ) {
					return;
				}
				availableBundleMap[ minBundle ] = bundle;
			});
			Cldr._availableBundleMapQueue = [];
		}

		return availableBundleMap[ minLanguageId ] || null;
	};




	var objectKeys = function( object ) {
		var i,
			result = [];

		if ( Object.keys ) {
			return Object.keys( object );
		}

		for ( i in object ) {
			result.push( i );
		}

		return result;
	};




	var createError = function( code, attributes ) {
		var error, message;

		message = code + ( attributes && JSON ? ": " + JSON.stringify( attributes ) : "" );
		error = new Error( message );
		error.code = code;

		// extend( error, attributes );
		arrayForEach( objectKeys( attributes ), function( attribute ) {
			error[ attribute ] = attributes[ attribute ];
		});

		return error;
	};




	var validate = function( code, check, attributes ) {
		if ( !check ) {
			throw createError( code, attributes );
		}
	};




	var validatePresence = function( value, name ) {
		validate( "E_MISSING_PARAMETER", typeof value !== "undefined", {
			name: name
		});
	};




	var validateType = function( value, name, check, expected ) {
		validate( "E_INVALID_PAR_TYPE", check, {
			expected: expected,
			name: name,
			value: value
		});
	};




	var validateTypePath = function( value, name ) {
		validateType( value, name, typeof value === "string" || arrayIsArray( value ), "String or Array" );
	};




	/**
	 * Function inspired by jQuery Core, but reduced to our use case.
	 */
	var isPlainObject = function( obj ) {
		return obj !== null && "" + obj === "[object Object]";
	};




	var validateTypePlainObject = function( value, name ) {
		validateType( value, name, typeof value === "undefined" || isPlainObject( value ), "Plain Object" );
	};




	var validateTypeString = function( value, name ) {
		validateType( value, name, typeof value === "string", "a string" );
	};




	// @path: normalized path
	var resourceGet = function( data, path ) {
		var i,
			node = data,
			length = path.length;

		for ( i = 0; i < length - 1; i++ ) {
			node = node[ path[ i ] ];
			if ( !node ) {
				return undefined;
			}
		}
		return node[ path[ i ] ];
	};




	/**
	 * setAvailableBundles( Cldr, json )
	 *
	 * @Cldr [Cldr class]
	 *
	 * @json resolved/unresolved cldr data.
	 *
	 * Set available bundles queue based on passed json CLDR data. Considers a bundle as any String at /main/{bundle}.
	 */
	var coreSetAvailableBundles = function( Cldr, json ) {
		var bundle,
			availableBundleMapQueue = Cldr._availableBundleMapQueue,
			main = resourceGet( json, [ "main" ] );

		if ( main ) {
			for ( bundle in main ) {
				if ( main.hasOwnProperty( bundle ) && bundle !== "root" &&
							availableBundleMapQueue.indexOf( bundle ) === -1 ) {
					availableBundleMapQueue.push( bundle );
				}
			}
		}
	};



	var alwaysArray = function( somethingOrArray ) {
		return arrayIsArray( somethingOrArray ) ?  somethingOrArray : [ somethingOrArray ];
	};


	var jsonMerge = (function() {

	// Returns new deeply merged JSON.
	//
	// Eg.
	// merge( { a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } } )
	// -> { a: { b: 3, c: 2, d: 4 } }
	//
	// @arguments JSON's
	// 
	var merge = function() {
		var destination = {},
			sources = [].slice.call( arguments, 0 );
		arrayForEach( sources, function( source ) {
			var prop;
			for ( prop in source ) {
				if ( prop in destination && typeof destination[ prop ] === "object" && !arrayIsArray( destination[ prop ] ) ) {

					// Merge Objects
					destination[ prop ] = merge( destination[ prop ], source[ prop ] );

				} else {

					// Set new values
					destination[ prop ] = source[ prop ];

				}
			}
		});
		return destination;
	};

	return merge;

}());


	/**
	 * load( Cldr, source, jsons )
	 *
	 * @Cldr [Cldr class]
	 *
	 * @source [Object]
	 *
	 * @jsons [arguments]
	 */
	var coreLoad = function( Cldr, source, jsons ) {
		var i, j, json;

		validatePresence( jsons[ 0 ], "json" );

		// Support arbitrary parameters, e.g., `Cldr.load({...}, {...})`.
		for ( i = 0; i < jsons.length; i++ ) {

			// Support array parameters, e.g., `Cldr.load([{...}, {...}])`.
			json = alwaysArray( jsons[ i ] );

			for ( j = 0; j < json.length; j++ ) {
				validateTypePlainObject( json[ j ], "json" );
				source = jsonMerge( source, json[ j ] );
				coreSetAvailableBundles( Cldr, json[ j ] );
			}
		}

		return source;
	};



	var itemGetResolved = function( Cldr, path, attributes ) {
		// Resolve path
		var normalizedPath = pathNormalize( path, attributes );

		return resourceGet( Cldr._resolved, normalizedPath );
	};




	/**
	 * new Cldr()
	 */
	var Cldr = function( locale ) {
		this.init( locale );
	};

	// Build optimization hack to avoid duplicating functions across modules.
	Cldr._alwaysArray = alwaysArray;
	Cldr._coreLoad = coreLoad;
	Cldr._createError = createError;
	Cldr._itemGetResolved = itemGetResolved;
	Cldr._jsonMerge = jsonMerge;
	Cldr._pathNormalize = pathNormalize;
	Cldr._resourceGet = resourceGet;
	Cldr._validatePresence = validatePresence;
	Cldr._validateType = validateType;
	Cldr._validateTypePath = validateTypePath;
	Cldr._validateTypePlainObject = validateTypePlainObject;

	Cldr._availableBundleMap = {};
	Cldr._availableBundleMapQueue = [];
	Cldr._resolved = {};

	// Allow user to override locale separator "-" (default) | "_". According to http://www.unicode.org/reports/tr35/#Unicode_language_identifier, both "-" and "_" are valid locale separators (eg. "en_GB", "en-GB"). According to http://unicode.org/cldr/trac/ticket/6786 its usage must be consistent throughout the data set.
	Cldr.localeSep = "-";

	/**
	 * Cldr.load( json [, json, ...] )
	 *
	 * @json [JSON] CLDR data or [Array] Array of @json's.
	 *
	 * Load resolved cldr data.
	 */
	Cldr.load = function() {
		Cldr._resolved = coreLoad( Cldr, Cldr._resolved, arguments );
	};

	/**
	 * .init() automatically run on instantiation/construction.
	 */
	Cldr.prototype.init = function( locale ) {
		var attributes, language, maxLanguageId, minLanguageId, script, subtags, territory, unicodeLocaleExtensions, variant,
			sep = Cldr.localeSep,
			unicodeLocaleExtensionsRaw = "";

		validatePresence( locale, "locale" );
		validateTypeString( locale, "locale" );

		subtags = coreSubtags( locale );

		if ( subtags.length === 5 ) {
			unicodeLocaleExtensions = subtags.pop();
			unicodeLocaleExtensionsRaw = sep + "u" + sep + unicodeLocaleExtensions;
			// Remove trailing null when there is unicodeLocaleExtensions but no variants.
			if ( !subtags[ 3 ] ) {
				subtags.pop();
			}
		}
		variant = subtags[ 3 ];

		// Normalize locale code.
		// Get (or deduce) the "triple subtags": language, territory (also aliased as region), and script subtags.
		// Get the variant subtags (calendar, collation, currency, etc).
		// refs:
		// - http://www.unicode.org/reports/tr35/#Field_Definitions
		// - http://www.unicode.org/reports/tr35/#Language_and_Locale_IDs
		// - http://www.unicode.org/reports/tr35/#Unicode_locale_identifier

		// When a locale id does not specify a language, or territory (region), or script, they are obtained by Likely Subtags.
		maxLanguageId = coreLikelySubtags( Cldr, this, subtags, { force: true } ) || subtags;
		language = maxLanguageId[ 0 ];
		script = maxLanguageId[ 1 ];
		territory = maxLanguageId[ 2 ];

		minLanguageId = coreRemoveLikelySubtags( Cldr, this, maxLanguageId ).join( sep );

		// Set attributes
		this.attributes = attributes = {
			bundle: bundleLookup( Cldr, this, minLanguageId ),

			// Unicode Language Id
			minLanguageId: minLanguageId + unicodeLocaleExtensionsRaw,
			maxLanguageId: maxLanguageId.join( sep ) + unicodeLocaleExtensionsRaw,

			// Unicode Language Id Subtabs
			language: language,
			script: script,
			territory: territory,
			region: territory, /* alias */
			variant: variant
		};

		// Unicode locale extensions.
		unicodeLocaleExtensions && ( "-" + unicodeLocaleExtensions ).replace( /-[a-z]{3,8}|(-[a-z]{2})-([a-z]{3,8})/g, function( attribute, key, type ) {

			if ( key ) {

				// Extension is in the `keyword` form.
				attributes[ "u" + key ] = type;
			} else {

				// Extension is in the `attribute` form.
				attributes[ "u" + attribute ] = true;
			}
		});

		this.locale = locale;
	};

	/**
	 * .get()
	 */
	Cldr.prototype.get = function( path ) {

		validatePresence( path, "path" );
		validateTypePath( path, "path" );

		return itemGetResolved( Cldr, path, this.attributes );
	};

	/**
	 * .main()
	 */
	Cldr.prototype.main = function( path ) {
		validatePresence( path, "path" );
		validateTypePath( path, "path" );

		validate( "E_MISSING_BUNDLE", this.attributes.bundle !== null, {
			locale: this.locale
		});

		path = alwaysArray( path );
		return this.get( [ "main/{bundle}" ].concat( path ) );
	};

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr/event.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.4.8
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-11-26T15:03Z
 */
/*!
 * CLDR JavaScript Library v0.4.8 2016-11-26T15:03Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__("./node_modules/cldrjs/dist/cldr.js") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {
		// Node. CommonJS.
		module.exports = factory( require( "../cldr" ) );
	} else {
		// Global
		factory( Cldr );
	}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var pathNormalize = Cldr._pathNormalize,
		validatePresence = Cldr._validatePresence,
		validateType = Cldr._validateType;

/*!
 * EventEmitter v4.2.7 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

var EventEmitter;
/* jshint ignore:start */
EventEmitter = (function () {


	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (evt instanceof RegExp) {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (evt instanceof RegExp) {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	return EventEmitter;
}());
/* jshint ignore:end */



	var validateTypeFunction = function( value, name ) {
		validateType( value, name, typeof value === "undefined" || typeof value === "function", "Function" );
	};




	var superGet, superInit,
		globalEe = new EventEmitter();

	function validateTypeEvent( value, name ) {
		validateType( value, name, typeof value === "string" || value instanceof RegExp, "String or RegExp" );
	}

	function validateThenCall( method, self ) {
		return function( event, listener ) {
			validatePresence( event, "event" );
			validateTypeEvent( event, "event" );

			validatePresence( listener, "listener" );
			validateTypeFunction( listener, "listener" );

			return self[ method ].apply( self, arguments );
		};
	}

	function off( self ) {
		return validateThenCall( "off", self );
	}

	function on( self ) {
		return validateThenCall( "on", self );
	}

	function once( self ) {
		return validateThenCall( "once", self );
	}

	Cldr.off = off( globalEe );
	Cldr.on = on( globalEe );
	Cldr.once = once( globalEe );

	/**
	 * Overload Cldr.prototype.init().
	 */
	superInit = Cldr.prototype.init;
	Cldr.prototype.init = function() {
		var ee;
		this.ee = ee = new EventEmitter();
		this.off = off( ee );
		this.on = on( ee );
		this.once = once( ee );
		superInit.apply( this, arguments );
	};

	/**
	 * getOverload is encapsulated, because of cldr/unresolved. If it's loaded
	 * after cldr/event (and note it overwrites .get), it can trigger this
	 * overload again.
	 */
	function getOverload() {

		/**
		 * Overload Cldr.prototype.get().
		 */
		superGet = Cldr.prototype.get;
		Cldr.prototype.get = function( path ) {
			var value = superGet.apply( this, arguments );
			path = pathNormalize( path, this.attributes ).join( "/" );
			globalEe.trigger( "get", [ path, value ] );
			this.ee.trigger( "get", [ path, value ] );
			return value;
		};
	}

	Cldr._eventInit = getOverload;
	getOverload();

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr/supplemental.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.4.8
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-11-26T15:03Z
 */
/*!
 * CLDR JavaScript Library v0.4.8 2016-11-26T15:03Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__("./node_modules/cldrjs/dist/cldr.js") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {
		// Node. CommonJS.
		module.exports = factory( require( "../cldr" ) );
	} else {
		// Global
		factory( Cldr );
	}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var alwaysArray = Cldr._alwaysArray;



	var supplementalMain = function( cldr ) {

		var prepend, supplemental;
		
		prepend = function( prepend ) {
			return function( path ) {
				path = alwaysArray( path );
				return cldr.get( [ prepend ].concat( path ) );
			};
		};

		supplemental = prepend( "supplemental" );

		// Week Data
		// http://www.unicode.org/reports/tr35/tr35-dates.html#Week_Data
		supplemental.weekData = prepend( "supplemental/weekData" );

		supplemental.weekData.firstDay = function() {
			return cldr.get( "supplemental/weekData/firstDay/{territory}" ) ||
				cldr.get( "supplemental/weekData/firstDay/001" );
		};

		supplemental.weekData.minDays = function() {
			var minDays = cldr.get( "supplemental/weekData/minDays/{territory}" ) ||
				cldr.get( "supplemental/weekData/minDays/001" );
			return parseInt( minDays, 10 );
		};

		// Time Data
		// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
		supplemental.timeData = prepend( "supplemental/timeData" );

		supplemental.timeData.allowed = function() {
			return cldr.get( "supplemental/timeData/{territory}/_allowed" ) ||
				cldr.get( "supplemental/timeData/001/_allowed" );
		};

		supplemental.timeData.preferred = function() {
			return cldr.get( "supplemental/timeData/{territory}/_preferred" ) ||
				cldr.get( "supplemental/timeData/001/_preferred" );
		};

		return supplemental;

	};




	var initSuper = Cldr.prototype.init;

	/**
	 * .init() automatically ran on construction.
	 *
	 * Overload .init().
	 */
	Cldr.prototype.init = function() {
		initSuper.apply( this, arguments );
		this.supplemental = supplementalMain( this );
	};

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr/unresolved.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.4.8
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-11-26T15:03Z
 */
/*!
 * CLDR JavaScript Library v0.4.8 2016-11-26T15:03Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__("./node_modules/cldrjs/dist/cldr.js") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {
		// Node. CommonJS.
		module.exports = factory( require( "../cldr" ) );
	} else {
		// Global
		factory( Cldr );
	}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var coreLoad = Cldr._coreLoad;
	var jsonMerge = Cldr._jsonMerge;
	var pathNormalize = Cldr._pathNormalize;
	var resourceGet = Cldr._resourceGet;
	var validatePresence = Cldr._validatePresence;
	var validateTypePath = Cldr._validateTypePath;



	var bundleParentLookup = function( Cldr, locale ) {
		var normalizedPath, parent;

		if ( locale === "root" ) {
			return;
		}

		// First, try to find parent on supplemental data.
		normalizedPath = pathNormalize( [ "supplemental/parentLocales/parentLocale", locale ] );
		parent = resourceGet( Cldr._resolved, normalizedPath ) || resourceGet( Cldr._raw, normalizedPath );
		if ( parent ) {
			return parent;
		}

		// Or truncate locale.
		parent = locale.substr( 0, locale.lastIndexOf( Cldr.localeSep ) );
		if ( !parent ) {
			return "root";
		}

		return parent;
	};




	// @path: normalized path
	var resourceSet = function( data, path, value ) {
		var i,
			node = data,
			length = path.length;

		for ( i = 0; i < length - 1; i++ ) {
			if ( !node[ path[ i ] ] ) {
				node[ path[ i ] ] = {};
			}
			node = node[ path[ i ] ];
		}
		node[ path[ i ] ] = value;
	};


	var itemLookup = (function() {

	var lookup;

	lookup = function( Cldr, locale, path, attributes, childLocale ) {
		var normalizedPath, parent, value;

		// 1: Finish recursion
		// 2: Avoid infinite loop
		if ( typeof locale === "undefined" /* 1 */ || locale === childLocale /* 2 */ ) {
			return;
		}

		// Resolve path
		normalizedPath = pathNormalize( path, attributes );

		// Check resolved (cached) data first
		// 1: Due to #16, never use the cached resolved non-leaf nodes. It may not
		//    represent its leafs in its entirety.
		value = resourceGet( Cldr._resolved, normalizedPath );
		if ( value && typeof value !== "object" /* 1 */ ) {
			return value;
		}

		// Check raw data
		value = resourceGet( Cldr._raw, normalizedPath );

		if ( !value ) {
			// Or, lookup at parent locale
			parent = bundleParentLookup( Cldr, locale );
			value = lookup( Cldr, parent, path, jsonMerge( attributes, { bundle: parent }), locale );
		}

		if ( value ) {
			// Set resolved (cached)
			resourceSet( Cldr._resolved, normalizedPath, value );
		}

		return value;
	};

	return lookup;

}());


	Cldr._raw = {};

	/**
	 * Cldr.load( json [, json, ...] )
	 *
	 * @json [JSON] CLDR data or [Array] Array of @json's.
	 *
	 * Load resolved or unresolved cldr data.
	 * Overwrite Cldr.load().
	 */
	Cldr.load = function() {
		Cldr._raw = coreLoad( Cldr, Cldr._raw, arguments );
	};

	/**
	 * Overwrite Cldr.prototype.get().
	 */
	Cldr.prototype.get = function( path ) {
		validatePresence( path, "path" );
		validateTypePath( path, "path" );

		// 1: use bundle as locale on item lookup for simplification purposes, because no other extended subtag is used anyway on bundle parent lookup.
		// 2: during init(), this method is called, but bundle is yet not defined. Use "" as a workaround in this very specific scenario.
		return itemLookup( Cldr, this.attributes && this.attributes.bundle /* 1 */ || "" /* 2 */, path, this.attributes );
	};

	// In case cldr/unresolved is loaded after cldr/event, we trigger its overloads again. Because, .get is overwritten in here.
	if ( Cldr._eventInit ) {
		Cldr._eventInit();
	}

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/node_main.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * CLDR JavaScript Library v0.4.8
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-11-26T15:03Z
 */
/*!
 * CLDR JavaScript Library v0.4.8 2016-11-26T15:03Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */

// Cldr
module.exports = __webpack_require__( "./node_modules/cldrjs/dist/cldr.js" );

// Extent Cldr with the following modules
__webpack_require__( "./node_modules/cldrjs/dist/cldr/event.js" );
__webpack_require__( "./node_modules/cldrjs/dist/cldr/supplemental.js" );
__webpack_require__( "./node_modules/cldrjs/dist/cldr/unresolved.js" );


/***/ }),

/***/ "./node_modules/globalize/dist/globalize.js":
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

/**
 * Globalize v1.3.0
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2017-07-03T21:37Z
 */
/*!
 * Globalize v1.3.0 2017-07-03T21:37Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"cldr/event"
		], factory );
	} else if ( true ) {

		// Node, CommonJS
		module.exports = factory( __webpack_require__( "./node_modules/cldrjs/dist/node_main.js" ) );
	} else {

		// Global
		root.Globalize = factory( root.Cldr );
	}
}( this, function( Cldr ) {


/**
 * A toString method that outputs meaningful values for objects or arrays and
 * still performs as fast as a plain string in case variable is string, or as
 * fast as `"" + number` in case variable is a number.
 * Ref: http://jsperf.com/my-stringify
 */
var toString = function( variable ) {
	return typeof variable === "string" ? variable : ( typeof variable === "number" ? "" +
		variable : JSON.stringify( variable ) );
};




/**
 * formatMessage( message, data )
 *
 * @message [String] A message with optional {vars} to be replaced.
 *
 * @data [Array or JSON] Object with replacing-variables content.
 *
 * Return the formatted message. For example:
 *
 * - formatMessage( "{0} second", [ 1 ] ); // 1 second
 *
 * - formatMessage( "{0}/{1}", ["m", "s"] ); // m/s
 *
 * - formatMessage( "{name} <{email}>", {
 *     name: "Foo",
 *     email: "bar@baz.qux"
 *   }); // Foo <bar@baz.qux>
 */
var formatMessage = function( message, data ) {

	// Replace {attribute}'s
	message = message.replace( /{[0-9a-zA-Z-_. ]+}/g, function( name ) {
		name = name.replace( /^{([^}]*)}$/, "$1" );
		return toString( data[ name ] );
	});

	return message;
};




var objectExtend = function() {
	var destination = arguments[ 0 ],
		sources = [].slice.call( arguments, 1 );

	sources.forEach(function( source ) {
		var prop;
		for ( prop in source ) {
			destination[ prop ] = source[ prop ];
		}
	});

	return destination;
};




var createError = function( code, message, attributes ) {
	var error;

	message = code + ( message ? ": " + formatMessage( message, attributes ) : "" );
	error = new Error( message );
	error.code = code;

	objectExtend( error, attributes );

	return error;
};




// Based on http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
var stringHash = function( str ) {
	return [].reduce.call( str, function( hash, i ) {
		var chr = i.charCodeAt( 0 );
		hash = ( ( hash << 5 ) - hash ) + chr;
		return hash | 0;
	}, 0 );
};




var runtimeKey = function( fnName, locale, args, argsStr ) {
	var hash;
	argsStr = argsStr || JSON.stringify( args );
	hash = stringHash( fnName + locale + argsStr );
	return hash > 0 ? "a" + hash : "b" + Math.abs( hash );
};




var functionName = function( fn ) {
	if ( fn.name !== undefined ) {
		return fn.name;
	}

	// fn.name is not supported by IE.
	var matches = /^function\s+([\w\$]+)\s*\(/.exec( fn.toString() );

	if ( matches && matches.length > 0 ) {
		return matches[ 1 ];
	}
};




var runtimeBind = function( args, cldr, fn, runtimeArgs ) {

	var argsStr = JSON.stringify( args ),
		fnName = functionName( fn ),
		locale = cldr.locale;

	// If name of the function is not available, this is most likely due to uglification,
	// which most likely means we are in production, and runtimeBind here is not necessary.
	if ( !fnName ) {
		return fn;
	}

	fn.runtimeKey = runtimeKey( fnName, locale, null, argsStr );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fnName + "(" + argsStr.slice( 1, -1 ) + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};




var validate = function( code, message, check, attributes ) {
	if ( !check ) {
		throw createError( code, message, attributes );
	}
};




var alwaysArray = function( stringOrArray ) {
	return Array.isArray( stringOrArray ) ? stringOrArray : stringOrArray ? [ stringOrArray ] : [];
};




var validateCldr = function( path, value, options ) {
	var skipBoolean;
	options = options || {};

	skipBoolean = alwaysArray( options.skip ).some(function( pathRe ) {
		return pathRe.test( path );
	});

	validate( "E_MISSING_CLDR", "Missing required CLDR content `{path}`.", value || skipBoolean, {
		path: path
	});
};




var validateDefaultLocale = function( value ) {
	validate( "E_DEFAULT_LOCALE_NOT_DEFINED", "Default locale has not been defined.",
		value !== undefined, {} );
};




var validateParameterPresence = function( value, name ) {
	validate( "E_MISSING_PARAMETER", "Missing required parameter `{name}`.",
		value !== undefined, { name: name });
};




/**
 * range( value, name, minimum, maximum )
 *
 * @value [Number].
 *
 * @name [String] name of variable.
 *
 * @minimum [Number]. The lowest valid value, inclusive.
 *
 * @maximum [Number]. The greatest valid value, inclusive.
 */
var validateParameterRange = function( value, name, minimum, maximum ) {
	validate(
		"E_PAR_OUT_OF_RANGE",
		"Parameter `{name}` has value `{value}` out of range [{minimum}, {maximum}].",
		value === undefined || value >= minimum && value <= maximum,
		{
			maximum: maximum,
			minimum: minimum,
			name: name,
			value: value
		}
	);
};




var validateParameterType = function( value, name, check, expected ) {
	validate(
		"E_INVALID_PAR_TYPE",
		"Invalid `{name}` parameter ({value}). {expected} expected.",
		check,
		{
			expected: expected,
			name: name,
			value: value
		}
	);
};




var validateParameterTypeLocale = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "string" || value instanceof Cldr,
		"String or Cldr instance"
	);
};




/**
 * Function inspired by jQuery Core, but reduced to our use case.
 */
var isPlainObject = function( obj ) {
	return obj !== null && "" + obj === "[object Object]";
};




var validateParameterTypePlainObject = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || isPlainObject( value ),
		"Plain Object"
	);
};




var alwaysCldr = function( localeOrCldr ) {
	return localeOrCldr instanceof Cldr ? localeOrCldr : new Cldr( localeOrCldr );
};




// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions
var regexpEscape = function( string ) {
	return string.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" );
};




var stringPad = function( str, count, right ) {
	var length;
	if ( typeof str !== "string" ) {
		str = String( str );
	}
	for ( length = str.length; length < count; length += 1 ) {
		str = ( right ? ( str + "0" ) : ( "0" + str ) );
	}
	return str;
};




function validateLikelySubtags( cldr ) {
	cldr.once( "get", validateCldr );
	cldr.get( "supplemental/likelySubtags" );
}

/**
 * [new] Globalize( locale|cldr )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Create a Globalize instance.
 */
function Globalize( locale ) {
	if ( !( this instanceof Globalize ) ) {
		return new Globalize( locale );
	}

	validateParameterPresence( locale, "locale" );
	validateParameterTypeLocale( locale, "locale" );

	this.cldr = alwaysCldr( locale );

	validateLikelySubtags( this.cldr );
}

/**
 * Globalize.load( json, ... )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function() {

	// validations are delegated to Cldr.load().
	Cldr.load.apply( Cldr, arguments );
};

/**
 * Globalize.locale( [locale|cldr] )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Set default Cldr instance if locale or cldr argument is passed.
 *
 * Return the default Cldr instance.
 */
Globalize.locale = function( locale ) {
	validateParameterTypeLocale( locale, "locale" );

	if ( arguments.length ) {
		this.cldr = alwaysCldr( locale );
		validateLikelySubtags( this.cldr );
	}
	return this.cldr;
};

/**
 * Optimization to avoid duplicating some internal functions across modules.
 */
Globalize._alwaysArray = alwaysArray;
Globalize._createError = createError;
Globalize._formatMessage = formatMessage;
Globalize._isPlainObject = isPlainObject;
Globalize._objectExtend = objectExtend;
Globalize._regexpEscape = regexpEscape;
Globalize._runtimeBind = runtimeBind;
Globalize._stringPad = stringPad;
Globalize._validate = validate;
Globalize._validateCldr = validateCldr;
Globalize._validateDefaultLocale = validateDefaultLocale;
Globalize._validateParameterPresence = validateParameterPresence;
Globalize._validateParameterRange = validateParameterRange;
Globalize._validateParameterTypePlainObject = validateParameterTypePlainObject;
Globalize._validateParameterType = validateParameterType;

return Globalize;




}));



/***/ }),

/***/ "./node_modules/globalize/dist/globalize/message.js":
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

/**
 * Globalize v1.3.0
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2017-07-03T21:37Z
 */
/*!
 * Globalize v1.3.0 2017-07-03T21:37Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"../globalize",
			"cldr/event"
		], factory );
	} else if ( true ) {

		// Node, CommonJS
		module.exports = factory( __webpack_require__( "./node_modules/cldrjs/dist/node_main.js" ), __webpack_require__( "./node_modules/globalize/dist/globalize.js" ) );
	} else {

		// Extend global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var alwaysArray = Globalize._alwaysArray,
	createError = Globalize._createError,
	isPlainObject = Globalize._isPlainObject,
	runtimeBind = Globalize._runtimeBind,
	validateDefaultLocale = Globalize._validateDefaultLocale,
	validate = Globalize._validate,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterType = Globalize._validateParameterType,
	validateParameterTypePlainObject = Globalize._validateParameterTypePlainObject;
var MessageFormat;
/* jshint ignore:start */
MessageFormat = (function() {
MessageFormat._parse = (function() {

  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(st) {
              return { type: 'messageFormatPattern', statements: st };
            },
        peg$c2 = peg$FAILED,
        peg$c3 = "{",
        peg$c4 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c5 = null,
        peg$c6 = ",",
        peg$c7 = { type: "literal", value: ",", description: "\",\"" },
        peg$c8 = "}",
        peg$c9 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c10 = function(argIdx, efmt) {
              var res = {
                type: "messageFormatElement",
                argumentIndex: argIdx
              };
              if (efmt && efmt.length) {
                res.elementFormat = efmt[1];
              } else {
                res.output = true;
              }
              return res;
            },
        peg$c11 = "plural",
        peg$c12 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c13 = function(t, s) {
              return { type: "elementFormat", key: t, val: s };
            },
        peg$c14 = "selectordinal",
        peg$c15 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c16 = "select",
        peg$c17 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c18 = function(t, p) {
              return { type: "elementFormat", key: t, val: p };
            },
        peg$c19 = function(op, pf) {
              return { type: "pluralFormatPattern", pluralForms: pf, offset: op || 0 };
            },
        peg$c20 = "offset",
        peg$c21 = { type: "literal", value: "offset", description: "\"offset\"" },
        peg$c22 = ":",
        peg$c23 = { type: "literal", value: ":", description: "\":\"" },
        peg$c24 = function(d) { return d; },
        peg$c25 = function(k, mfp) {
              return { key: k, val: mfp };
            },
        peg$c26 = function(i) { return i; },
        peg$c27 = "=",
        peg$c28 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c29 = function(pf) { return { type: "selectFormatPattern", pluralForms: pf }; },
        peg$c30 = function(p) { return p; },
        peg$c31 = "#",
        peg$c32 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c33 = function() { return {type: 'octothorpe'}; },
        peg$c34 = function(s) { return { type: "string", val: s.join('') }; },
        peg$c35 = { type: "other", description: "identifier" },
        peg$c36 = /^[0-9a-zA-Z$_]/,
        peg$c37 = { type: "class", value: "[0-9a-zA-Z$_]", description: "[0-9a-zA-Z$_]" },
        peg$c38 = /^[^ \t\n\r,.+={}]/,
        peg$c39 = { type: "class", value: "[^ \\t\\n\\r,.+={}]", description: "[^ \\t\\n\\r,.+={}]" },
        peg$c40 = function(s) { return s; },
        peg$c41 = function(chars) { return chars.join(''); },
        peg$c42 = /^[^{}#\\\0-\x1F \t\n\r]/,
        peg$c43 = { type: "class", value: "[^{}#\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}#\\\\\\0-\\x1F \\t\\n\\r]" },
        peg$c44 = function(x) { return x; },
        peg$c45 = "\\\\",
        peg$c46 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c47 = function() { return "\\"; },
        peg$c48 = "\\#",
        peg$c49 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c50 = function() { return "#"; },
        peg$c51 = "\\{",
        peg$c52 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c53 = function() { return "\u007B"; },
        peg$c54 = "\\}",
        peg$c55 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c56 = function() { return "\u007D"; },
        peg$c57 = "\\u",
        peg$c58 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c59 = function(h1, h2, h3, h4) {
              return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
            },
        peg$c60 = /^[0-9]/,
        peg$c61 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c62 = function(ds) {
            //the number might start with 0 but must not be interpreted as an octal number
            //Hence, the base is passed to parseInt explicitely
            return parseInt((ds.join('')), 10);
          },
        peg$c63 = /^[0-9a-fA-F]/,
        peg$c64 = { type: "class", value: "[0-9a-fA-F]", description: "[0-9a-fA-F]" },
        peg$c65 = { type: "other", description: "whitespace" },
        peg$c66 = function(w) { return w.join(''); },
        peg$c67 = /^[ \t\n\r]/,
        peg$c68 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      if (s2 === peg$FAILED) {
        s2 = peg$parsestring();
        if (s2 === peg$FAILED) {
          s2 = peg$parseoctothorpe();
        }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
        if (s2 === peg$FAILED) {
          s2 = peg$parsestring();
          if (s2 === peg$FAILED) {
            s2 = peg$parseoctothorpe();
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c3;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c6;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c7); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseelementFormat();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c5;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c8;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c9); }
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c10(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c11) {
          s2 = peg$c11;
          peg$currPos += 6;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c6;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c7); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsepluralFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c13(s2, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 13) === peg$c14) {
            s2 = peg$c14;
            peg$currPos += 13;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c15); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s4 = peg$c6;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c7); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsepluralFormatPattern();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c13(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c16) {
              s2 = peg$c16;
              peg$currPos += 6;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s4 = peg$c6;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c7); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parseselectFormatPattern();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c13(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseid();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseargStylePattern();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseargStylePattern();
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c18(s2, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
        }
      }

      return s0;
    }

    function peg$parsepluralFormatPattern() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseoffsetPattern();
      if (s1 === peg$FAILED) {
        s1 = peg$c5;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsepluralForm();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsepluralForm();
          }
        } else {
          s2 = peg$c2;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c19(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseoffsetPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c20) {
          s2 = peg$c20;
          peg$currPos += 6;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c21); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c22;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsedigits();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c24(s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralForm() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepluralKey();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c3;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c8;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c9); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c25(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralKey() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseid();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c26(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
          s1 = peg$c27;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c28); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsedigits();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c24(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      }

      return s0;
    }

    function peg$parseselectFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseselectForm();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseselectForm();
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c29(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseselectForm() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c3;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c8;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c9); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c25(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseargStylePattern() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s2 = peg$c6;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c7); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseid();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c30(s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseoctothorpe() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c31;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c33();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechars();
      if (s2 === peg$FAILED) {
        s2 = peg$parsewhitespace();
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechars();
          if (s2 === peg$FAILED) {
            s2 = peg$parsewhitespace();
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c34(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseid() {
      var s0, s1, s2, s3, s4, s5, s6;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$currPos;
        if (peg$c36.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c37); }
        }
        if (s4 !== peg$FAILED) {
          s5 = [];
          if (peg$c38.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c39); }
          }
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            if (peg$c38.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c39); }
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c2;
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c40(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c41(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (peg$c42.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c44(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c45) {
          s1 = peg$c45;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c47();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c48) {
            s1 = peg$c48;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c49); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c50();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c51) {
              s1 = peg$c51;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c52); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c53();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c54) {
                s1 = peg$c54;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c55); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c56();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c57) {
                  s1 = peg$c57;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c58); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parsehexDigit();
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parsehexDigit();
                    if (s3 !== peg$FAILED) {
                      s4 = peg$parsehexDigit();
                      if (s4 !== peg$FAILED) {
                        s5 = peg$parsehexDigit();
                        if (s5 !== peg$FAILED) {
                          peg$reportedPos = s0;
                          s1 = peg$c59(s2, s3, s4, s5);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c2;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsedigits() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c60.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c60.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c61); }
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c62(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c63.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewhitespace();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewhitespace();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c66(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0;

      if (peg$c67.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
}()).parse;


/** @file messageformat.js - ICU PluralFormat + SelectFormat for JavaScript
 *  @author Alex Sexton - @SlexAxton
 *  @version 0.3.0-1
 *  @copyright 2012-2015 Alex Sexton, Eemeli Aro, and Contributors
 *  @license To use or fork, MIT. To contribute back, Dojo CLA  */


/** Utility function for quoting an Object's key value iff required
 *  @private  */
function propname(key, obj) {
  if (/^[A-Z_$][0-9A-Z_$]*$/i.test(key)) {
    return obj ? obj + '.' + key : key;
  } else {
    var jkey = JSON.stringify(key);
    return obj ? obj + '[' + jkey + ']' : jkey;
  }
};


/** Create a new message formatter
 *
 *  @class
 *  @global
 *  @param {string|string[]} [locale="en"] - The locale to use, with fallbacks
 *  @param {function} [pluralFunc] - Optional custom pluralization function
 *  @param {function[]} [formatters] - Optional custom formatting functions  */
function MessageFormat(locale, pluralFunc, formatters) {
  this.lc = [locale];  
  this.runtime.pluralFuncs = {};
  this.runtime.pluralFuncs[this.lc[0]] = pluralFunc;
  this.runtime.fmt = {};
  if (formatters) for (var f in formatters) {
    this.runtime.fmt[f] = formatters[f];
  }
}




/** Parse an input string to its AST
 *
 *  Precompiled from `lib/messageformat-parser.pegjs` by
 *  {@link http://pegjs.org/ PEG.js}. Included in MessageFormat object
 *  to enable testing.
 *
 *  @private  */



/** Pluralization functions from
 *  {@link http://github.com/eemeli/make-plural.js make-plural}
 *
 *  @memberof MessageFormat
 *  @type Object.<string,function>  */
MessageFormat.plurals = {};


/** Default number formatting functions in the style of ICU's
 *  {@link http://icu-project.org/apiref/icu4j/com/ibm/icu/text/MessageFormat.html simpleArg syntax}
 *  implemented using the
 *  {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl Intl}
 *  object defined by ECMA-402.
 *
 *  **Note**: Intl is not defined in default Node until 0.11.15 / 0.12.0, so
 *  earlier versions require a {@link https://www.npmjs.com/package/intl polyfill}.
 *  Therefore {@link MessageFormat.withIntlSupport} needs to be true for these
 *  functions to be available for inclusion in the output.
 *
 *  @see MessageFormat#setIntlSupport
 *
 *  @namespace
 *  @memberof MessageFormat
 *  @property {function} number - Represent a number as an integer, percent or currency value
 *  @property {function} date - Represent a date as a full/long/default/short string
 *  @property {function} time - Represent a time as a full/long/default/short string
 *
 *  @example
 *  > var MessageFormat = require('messageformat');
 *  > var mf = (new MessageFormat('en')).setIntlSupport(true);
 *  > mf.currency = 'EUR';
 *  > var mfunc = mf.compile("The total is {V,number,currency}.");
 *  > mfunc({V:5.5})
 *  "The total is €5.50."
 *
 *  @example
 *  > var MessageFormat = require('messageformat');
 *  > var mf = new MessageFormat('en', null, {number: MessageFormat.number});
 *  > mf.currency = 'EUR';
 *  > var mfunc = mf.compile("The total is {V,number,currency}.");
 *  > mfunc({V:5.5})
 *  "The total is €5.50."  */
MessageFormat.formatters = {};

/** Enable or disable support for the default formatters, which require the
 *  `Intl` object. Note that this can't be autodetected, as the environment
 *  in which the formatted text is compiled into Javascript functions is not
 *  necessarily the same environment in which they will get executed.
 *
 *  @see MessageFormat.formatters
 *
 *  @memberof MessageFormat
 *  @param {boolean} [enable=true]
 *  @returns {Object} The MessageFormat instance, to allow for chaining
 *  @example
 *  > var Intl = require('intl');
 *  > var MessageFormat = require('messageformat');
 *  > var mf = (new MessageFormat('en')).setIntlSupport(true);
 *  > mf.currency = 'EUR';
 *  > mf.compile("The total is {V,number,currency}.")({V:5.5});
 *  "The total is €5.50."  */



/** A set of utility functions that are called by the compiled Javascript
 *  functions, these are included locally in the output of {@link
 *  MessageFormat#compile compile()}.
 *
 *  @namespace
 *  @memberof MessageFormat  */
MessageFormat.prototype.runtime = {

  /** Utility function for `#` in plural rules
   *
   *  @param {number} value - The value to operate on
   *  @param {number} [offset=0] - An optional offset, set by the surrounding context  */
  number: function(value, offset) {
    if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
    return value - (offset || 0);
  },

  /** Utility function for `{N, plural|selectordinal, ...}`
   *
   *  @param {number} value - The key to use to find a pluralization rule
   *  @param {number} offset - An offset to apply to `value`
   *  @param {function} lcfunc - A locale function from `pluralFuncs`
   *  @param {Object.<string,string>} data - The object from which results are looked up
   *  @param {?boolean} isOrdinal - If true, use ordinal rather than cardinal rules
   *  @returns {string} The result of the pluralization  */
  plural: function(value, offset, lcfunc, data, isOrdinal) {
    if ({}.hasOwnProperty.call(data, value)) return data[value]();
    if (offset) value -= offset;
    var key = lcfunc(value, isOrdinal);
    if (key in data) return data[key]();
    return data.other();
  },

  /** Utility function for `{N, select, ...}`
   *
   *  @param {number} value - The key to use to find a selection
   *  @param {Object.<string,string>} data - The object from which results are looked up
   *  @returns {string} The result of the select statement  */
  select: function(value, data) {
    if ({}.hasOwnProperty.call(data, value)) return data[value]();
    return data.other()
  },

  /** Pluralization functions included in compiled output
   *  @instance
   *  @type Object.<string,function>  */
  pluralFuncs: {},

  /** Custom formatting functions called by `{var, fn[, args]*}` syntax
   *
   *  For examples, see {@link MessageFormat.formatters}
   *
   *  @instance
   *  @see MessageFormat.formatters
   *  @type Object.<string,function>  */
  fmt: {},

  /** Custom stringifier to clean up browser inconsistencies
   *  @instance  */
  toString: function () {
    var _stringify = function(o, level) {
      if (typeof o != 'object') {
        var funcStr = o.toString().replace(/^(function )\w*/, '$1');
        var indent = /([ \t]*)\S.*$/.exec(funcStr);
        return indent ? funcStr.replace(new RegExp('^' + indent[1], 'mg'), '') : funcStr;
      }
      var s = [];
      for (var i in o) if (i != 'toString') {
        if (level == 0) s.push('var ' + i + ' = ' + _stringify(o[i], level + 1) + ';\n');
        else s.push(propname(i) + ': ' + _stringify(o[i], level + 1));
      }
      if (level == 0) return s.join('');
      if (s.length == 0) return '{}';
      var indent = '  '; while (--level) indent += '  ';
      return '{\n' + s.join(',\n').replace(/^/gm, indent) + '\n}';
    };
    return _stringify(this, 0);
  }
};


/** Recursively map an AST to its resulting string
 *
 *  @memberof MessageFormat
 *
 *  @param ast - the Ast node for which the JS code should be generated
 *
 *  @private  */
MessageFormat.prototype._precompile = function(ast, data) {
  data = data || { keys: {}, offset: {} };
  var r = [], i, tmp, args = [];

  switch ( ast.type ) {
    case 'messageFormatPattern':
      for ( i = 0; i < ast.statements.length; ++i ) {
        r.push(this._precompile( ast.statements[i], data ));
      }
      tmp = r.join(' + ') || '""';
      return data.pf_count ? tmp : 'function(d) { return ' + tmp + '; }';

    case 'messageFormatElement':
      data.pf_count = data.pf_count || 0;
      if ( ast.output ) {
        return propname(ast.argumentIndex, 'd');
      }
      else {
        data.keys[data.pf_count] = ast.argumentIndex;
        return this._precompile( ast.elementFormat, data );
      }
      return '';

    case 'elementFormat':
      args = [ propname(data.keys[data.pf_count], 'd') ];
      switch (ast.key) {
        case 'select':
          args.push(this._precompile(ast.val, data));
          return 'select(' + args.join(', ') + ')';
        case 'selectordinal':
          args = args.concat([ 0, propname(this.lc[0], 'pluralFuncs'), this._precompile(ast.val, data), 1 ]);
          return 'plural(' + args.join(', ') + ')';
        case 'plural':
          data.offset[data.pf_count || 0] = ast.val.offset || 0;
          args = args.concat([ data.offset[data.pf_count] || 0, propname(this.lc[0], 'pluralFuncs'), this._precompile(ast.val, data) ]);
          return 'plural(' + args.join(', ') + ')';
        default:
          if (this.withIntlSupport && !(ast.key in this.runtime.fmt) && (ast.key in MessageFormat.formatters)) {
            tmp = MessageFormat.formatters[ast.key];
            this.runtime.fmt[ast.key] = (typeof tmp(this) == 'function') ? tmp(this) : tmp;
          }
          args.push(JSON.stringify(this.lc));
          if (ast.val && ast.val.length) args.push(JSON.stringify(ast.val.length == 1 ? ast.val[0] : ast.val));
          return 'fmt.' + ast.key + '(' + args.join(', ') + ')';
      }

    case 'pluralFormatPattern':
    case 'selectFormatPattern':
      data.pf_count = data.pf_count || 0;
      if (ast.type == 'selectFormatPattern') data.offset[data.pf_count] = 0;
      var needOther = true;
      for (i = 0; i < ast.pluralForms.length; ++i) {
        var key = ast.pluralForms[i].key;
        if (key === 'other') needOther = false;
        var data_copy = JSON.parse(JSON.stringify(data));
        data_copy.pf_count++;
        r.push(propname(key) + ': function() { return ' + this._precompile(ast.pluralForms[i].val, data_copy) + ';}');
      }
      if (needOther) throw new Error("No 'other' form found in " + ast.type + " " + data.pf_count);
      return '{ ' + r.join(', ') + ' }';

    case 'string':
      return JSON.stringify(ast.val || "");

    case 'octothorpe':
      if (!data.pf_count) return '"#"';
      args = [ propname(data.keys[data.pf_count-1], 'd') ];
      if (data.offset[data.pf_count-1]) args.push(data.offset[data.pf_count-1]);
      return 'number(' + args.join(', ') + ')';

    default:
      throw new Error( 'Bad AST type: ' + ast.type );
  }
};

/** Compile messages into an executable function with clean string
 *  representation.
 *
 *  If `messages` is a single string including ICU MessageFormat declarations,
 *  `opt` is ignored and the returned function takes a single Object parameter
 *  `d` representing each of the input's defined variables. The returned
 *  function will be defined in a local scope that includes all the required
 *  runtime variables.
 *
 *  If `messages` is a map of keys to strings, or a map of namespace keys to
 *  such key/string maps, the returned function will fill the specified global
 *  with javascript functions matching the structure of the input. In such use,
 *  the output of `compile()` is expected to be serialized using `.toString()`,
 *  and will include definitions of the runtime functions. If `opt.global` is
 *  null, calling the output function will return the object itself.
 *
 *  Together, the input parameters should match the following patterns:
 *  ```js
 *  messages = "string" || { key0: "string0", key1: "string1", ... } || {
 *    ns0: { key0: "string0", key1: "string1", ...  },
 *    ns1: { key0: "string0", key1: "string1", ...  },
 *    ...
 *  }
 *
 *  opt = null || {
 *    locale: null || {
 *      ns0: "lc0" || [ "lc0", ... ],
 *      ns1: "lc1" || [ "lc1", ... ],
 *      ...
 *    },
 *    global: null || "module.exports" || "exports" || "i18n" || ...
 *  }
 *  ```
 *
 *  @memberof MessageFormat
 *  @param {string|Object}
 *      messages - The input message(s) to be compiled, in ICU MessageFormat
 *  @param {Object} [opt={}] - Options controlling output for non-simple intput
 *  @param {Object} [opt.locale] - The locales to use for the messages, with a
 *      structure matching that of `messages`
 *  @param {string} [opt.global=""] - The global variable that the output
 *      function should use, or a null string for none. "exports" and
 *      "module.exports" are recognised as special cases.
 *  @returns {function} The first match found for the given locale(s)
 *
 *  @example
 * > var MessageFormat = require('messageformat'),
 * ...   mf = new MessageFormat('en'),
 * ...   mfunc0 = mf.compile('A {TYPE} example.');
 * > mfunc0({TYPE:'simple'})
 * 'A simple example.'
 * > mfunc0.toString()
 * 'function (d) { return "A " + d.TYPE + " example."; }'
 *
 *  @example
 * > var msgSet = { a: 'A {TYPE} example.',
 * ...              b: 'This has {COUNT, plural, one{one member} other{# members}}.' },
 * ...   mfuncSet = mf.compile(msgSet);
 * > mfuncSet().a({TYPE:'more complex'})
 * 'A more complex example.'
 * > mfuncSet().b({COUNT:2})
 * 'This has 2 members.'
 *
 * > console.log(mfuncSet.toString())
 * function anonymous() {
 * var number = function (value, offset) {
 *   if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
 *   return value - (offset || 0);
 * };
 * var plural = function (value, offset, lcfunc, data, isOrdinal) {
 *   if ({}.hasOwnProperty.call(data, value)) return data[value]();
 *   if (offset) value -= offset;
 *   var key = lcfunc(value, isOrdinal);
 *   if (key in data) return data[key]();
 *   return data.other();
 * };
 * var select = function (value, data) {
 *   if ({}.hasOwnProperty.call(data, value)) return data[value]();
 *   return data.other()
 * };
 * var pluralFuncs = {
 *   en: function (n, ord) {
 *     var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
 *         n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
 *     if (ord) return (n10 == 1 && n100 != 11) ? 'one'
 *         : (n10 == 2 && n100 != 12) ? 'two'
 *         : (n10 == 3 && n100 != 13) ? 'few'
 *         : 'other';
 *     return (n == 1 && v0) ? 'one' : 'other';
 *   }
 * };
 * var fmt = {};
 *
 * return {
 *   a: function(d) { return "A " + d.TYPE + " example."; },
 *   b: function(d) { return "This has " + plural(d.COUNT, 0, pluralFuncs.en, { one: function() { return "one member";}, other: function() { return number(d.COUNT)+" members";} }) + "."; }
 * }
 * }
 *
 *  @example
 * > mf.runtime.pluralFuncs.fi = MessageFormat.plurals.fi;
 * > var multiSet = { en: { a: 'A {TYPE} example.',
 * ...                      b: 'This is the {COUNT, selectordinal, one{#st} two{#nd} few{#rd} other{#th}} example.' },
 * ...                fi: { a: '{TYPE} esimerkki.',
 * ...                      b: 'Tämä on {COUNT, selectordinal, other{#.}} esimerkki.' } },
 * ...   multiSetLocales = { en: 'en', fi: 'fi' },
 * ...   mfuncSet = mf.compile(multiSet, { locale: multiSetLocales, global: 'i18n' });
 * > mfuncSet(this);
 * > i18n.en.b({COUNT:3})
 * 'This is the 3rd example.'
 * > i18n.fi.b({COUNT:3})
 * 'Tämä on 3. esimerkki.'  */
MessageFormat.prototype.compile = function ( messages, opt ) {
  var r = {}, lc0 = this.lc,
      compileMsg = function(self, msg) {
        try {
          var ast = MessageFormat._parse(msg);
          return self._precompile(ast);
        } catch (e) {
          throw new Error((ast ? 'Precompiler' : 'Parser') + ' error: ' + e.toString());
        }
      },
      stringify = function(r, level) {
        if (!level) level = 0;
        if (typeof r != 'object') return r;
        var o = [], indent = '';
        for (var i = 0; i < level; ++i) indent += '  ';
        for (var k in r) o.push('\n' + indent + '  ' + propname(k) + ': ' + stringify(r[k], level + 1));
        return '{' + o.join(',') + '\n' + indent + '}';
      };

  if (typeof messages == 'string') {
    var f = new Function(
        'number, plural, select, pluralFuncs, fmt',
        'return ' + compileMsg(this, messages));
    return f(this.runtime.number, this.runtime.plural, this.runtime.select,
        this.runtime.pluralFuncs, this.runtime.fmt);
  }

  opt = opt || {};

  for (var ns in messages) {
    if (opt.locale) this.lc = opt.locale[ns] && [].concat(opt.locale[ns]) || lc0;
    if (typeof messages[ns] == 'string') {
      try { r[ns] = compileMsg(this, messages[ns]); }
      catch (e) { e.message = e.message.replace(':', ' with `' + ns + '`:'); throw e; }
    } else {
      r[ns] = {};
      for (var key in messages[ns]) {
        try { r[ns][key] = compileMsg(this, messages[ns][key]); }
        catch (e) { e.message = e.message.replace(':', ' with `' + key + '` in `' + ns + '`:'); throw e; }
      }
    }
  }

  this.lc = lc0;
  var s = this.runtime.toString() + '\n';
  switch (opt.global || '') {
    case 'exports':
      var o = [];
      for (var k in r) o.push(propname(k, 'exports') + ' = ' + stringify(r[k]));
      return new Function(s + o.join(';\n'));
    case 'module.exports':
      return new Function(s + 'module.exports = ' + stringify(r));
    case '':
      return new Function(s + 'return ' + stringify(r));
    default:
      return new Function('G', s + propname(opt.global, 'G') + ' = ' + stringify(r));
  }
};


return MessageFormat;
}());
/* jshint ignore:end */


var createErrorPluralModulePresence = function() {
	return createError( "E_MISSING_PLURAL_MODULE", "Plural module not loaded." );
};




var validateMessageBundle = function( cldr ) {
	validate(
		"E_MISSING_MESSAGE_BUNDLE",
		"Missing message bundle for locale `{locale}`.",
		cldr.attributes.bundle && cldr.get( "globalize-messages/{bundle}" ) !== undefined,
		{
			locale: cldr.locale
		}
	);
};




var validateMessagePresence = function( path, value ) {
	path = path.join( "/" );
	validate( "E_MISSING_MESSAGE", "Missing required message content `{path}`.",
		value !== undefined, { path: path } );
};




var validateMessageType = function( path, value ) {
	path = path.join( "/" );
	validate(
		"E_INVALID_MESSAGE",
		"Invalid message content `{path}`. {expected} expected.",
		typeof value === "string",
		{
			expected: "a string",
			path: path
		}
	);
};




var validateParameterTypeMessageVariables = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || isPlainObject( value ) || Array.isArray( value ),
		"Array or Plain Object"
	);
};




var messageFormatterFn = function( formatter ) {
	return function messageFormatter( variables ) {
		if ( typeof variables === "number" || typeof variables === "string" ) {
			variables = [].slice.call( arguments, 0 );
		}
		validateParameterTypeMessageVariables( variables, "variables" );
		return formatter( variables );
	};
};




var messageFormatterRuntimeBind = function( cldr, messageformatter ) {
	var locale = cldr.locale,
		origToString = messageformatter.toString;

	messageformatter.toString = function() {
		var argNames, argValues, output,
			args = {};

		// Properly adjust SlexAxton/messageformat.js compiled variables with Globalize variables:
		output = origToString.call( messageformatter );

		if ( /number\(/.test( output ) ) {
			args.number = "messageFormat.number";
		}

		if ( /plural\(/.test( output ) ) {
			args.plural = "messageFormat.plural";
		}

		if ( /select\(/.test( output ) ) {
			args.select = "messageFormat.select";
		}

		output.replace( /pluralFuncs(\[([^\]]+)\]|\.([a-zA-Z]+))/, function( match ) {
			args.pluralFuncs = "{" +
				"\"" + locale + "\": Globalize(\"" + locale + "\").pluralGenerator()" +
				"}";
			return match;
		});

		argNames = Object.keys( args ).join( ", " );
		argValues = Object.keys( args ).map(function( key ) {
			return args[ key ];
		}).join( ", " );

		return "(function( " + argNames + " ) {\n" +
			"  return " + output + "\n" +
			"})(" + argValues + ")";
	};

	return messageformatter;
};




var slice = [].slice;

/**
 * .loadMessages( json )
 *
 * @json [JSON]
 *
 * Load translation data.
 */
Globalize.loadMessages = function( json ) {
	var locale,
		customData = {
			"globalize-messages": json,
			"main": {}
		};

	validateParameterPresence( json, "json" );
	validateParameterTypePlainObject( json, "json" );

	// Set available bundles by populating customData main dataset.
	for ( locale in json ) {
		if ( json.hasOwnProperty( locale ) ) {
			customData.main[ locale ] = {};
		}
	}

	Cldr.load( customData );
};

/**
 * .messageFormatter( path )
 *
 * @path [String or Array]
 *
 * Format a message given its path.
 */
Globalize.messageFormatter =
Globalize.prototype.messageFormatter = function( path ) {
	var cldr, formatter, message, pluralGenerator, returnFn,
		args = slice.call( arguments, 0 );

	validateParameterPresence( path, "path" );
	validateParameterType( path, "path", typeof path === "string" || Array.isArray( path ),
		"a String nor an Array" );

	path = alwaysArray( path );
	cldr = this.cldr;

	validateDefaultLocale( cldr );
	validateMessageBundle( cldr );

	message = cldr.get( [ "globalize-messages/{bundle}" ].concat( path ) );
	validateMessagePresence( path, message );

	// If message is an Array, concatenate it.
	if ( Array.isArray( message ) ) {
		message = message.join( " " );
	}
	validateMessageType( path, message );

	// Is plural module present? Yes, use its generator. Nope, use an error generator.
	pluralGenerator = this.plural !== undefined ?
		this.pluralGenerator() :
		createErrorPluralModulePresence;

	formatter = new MessageFormat( cldr.locale, pluralGenerator ).compile( message );

	returnFn = messageFormatterFn( formatter );

	runtimeBind( args, cldr, returnFn,
		[ messageFormatterRuntimeBind( cldr, formatter ), pluralGenerator ] );

	return returnFn;
};

/**
 * .formatMessage( path [, variables] )
 *
 * @path [String or Array]
 *
 * @variables [Number, String, Array or Object]
 *
 * Format a message given its path.
 */
Globalize.formatMessage =
Globalize.prototype.formatMessage = function( path /* , variables */ ) {
	return this.messageFormatter( path ).apply( {}, slice.call( arguments, 1 ) );
};

return Globalize;




}));



/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* harmony export (immutable) */ __webpack_exports__["d"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["b"] = __decorate;
/* unused harmony export __param */
/* harmony export (immutable) */ __webpack_exports__["c"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["a"] = __awaiter;
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/main.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dojo_framework_widget_core_mixins_Projector__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Projector.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widgets_DatePicker__ = __webpack_require__("./src/widgets/DatePicker.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
__webpack_require__("./node_modules/@dojo/webpack-contrib/i18n-plugin/templates/setLocaleData.js");




class App extends __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */] {
    render() {
        return Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["h" /* v */])('div', [
            Object(__WEBPACK_IMPORTED_MODULE_3__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_1__widgets_DatePicker__["a" /* default */], { selectedDate: new Date() })
        ]);
    }
}
const Projector = Object(__WEBPACK_IMPORTED_MODULE_0__dojo_framework_widget_core_mixins_Projector__["a" /* ProjectorMixin */])(App);
const projector = new Projector();
projector.append();


/***/ }),

/***/ "./src/widgets/DatePicker.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DatePicker */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dojo_widgets_calendar__ = __webpack_require__("./node_modules/@dojo/widgets/calendar/index.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dojo_widgets_enhanced_text_input__ = __webpack_require__("./node_modules/@dojo/widgets/enhanced-text-input/index.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dojo_framework_widget_core_decorators_customElement__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/customElement.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__datePicker_m_css__ = __webpack_require__("./src/widgets/datePicker.m.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__datePicker_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__datePicker_m_css__);



// import i18n from '@dojo/framework/i18n/i18n';
// import { formatDate } from '@dojo/framework/i18n/date';




let DatePicker = class DatePicker extends __WEBPACK_IMPORTED_MODULE_2__dojo_framework_widget_core_WidgetBase__["a" /* WidgetBase */] {
    constructor() {
        super(...arguments);
        this.state = {
            month: 1,
            selectedDate: this.properties.selectedDate || new Date(),
            year: 2018,
            visible: false
        };
    }
    render() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["h" /* v */])('div', { classes: __WEBPACK_IMPORTED_MODULE_6__datePicker_m_css__["root"] }, [
            Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_4__dojo_widgets_enhanced_text_input__["a" /* default */], {
                addonAfter: [
                    Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["h" /* v */])('button', {
                        onclick: () => {
                            this.setState({ visible: !this.state.visible });
                        }
                    }, [
                        Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["h" /* v */])('i', {
                            classes: [
                                'fa',
                                this.state.visible ? 'fa-chevron-up' : 'fa-chevron-down'
                            ]
                        })
                    ])
                ],
                label: 'Pick a date',
                value: (this.state.selectedDate || this.properties.selectedDate).toLocaleString()
            }),
            Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["h" /* v */])('section', {
                classes: [this.state.visible ? '' : __WEBPACK_IMPORTED_MODULE_6__datePicker_m_css__["hidden"], __WEBPACK_IMPORTED_MODULE_6__datePicker_m_css__["calendarcontainer"]]
            }, [
                Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["i" /* w */])(__WEBPACK_IMPORTED_MODULE_3__dojo_widgets_calendar__["a" /* default */], {
                    month: this.state.month,
                    selectedDate: this.state.selectedDate,
                    year: this.state.year,
                    onMonthChange: (month) => {
                        this.setState({ month: month });
                    },
                    onYearChange: (year) => {
                        this.setState({ year: year });
                    },
                    onDateSelect: (date) => {
                        this.setState({ selectedDate: date });
                    }
                })
            ])
        ]);
    }
    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.invalidate();
    }
};
DatePicker = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_5__dojo_framework_widget_core_decorators_customElement__["b" /* default */])({
        tag: 'date-picker'
    })
], DatePicker);

/* harmony default export */ __webpack_exports__["a"] = (DatePicker);


/***/ }),

/***/ "./src/widgets/datePicker.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {" _key":"dojo-datepicker-example/datePicker","root":"datePicker-m__root__3Hwzd","hidden":"datePicker-m__hidden__2aODk","calendarcontainer":"datePicker-m__calendarcontainer__2JYRI"};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/@dojo/webpack-contrib/build-time-render/hasBuildTimeRender.js");
__webpack_require__("./src/main.css");
module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
});