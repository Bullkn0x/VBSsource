/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./guest-api/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./guest-api/index.ts":
/*!****************************!*\
  !*** ./guest-api/index.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_1__);


(function () {
    global.eval = function () {
        throw new Error('Eval is disabled for security');
    };
    var requests = {};
    var ready;
    var readyPromise = new Promise(function (resolve) {
        ready = resolve;
    });
    electron__WEBPACK_IMPORTED_MODULE_0___default.a.ipcRenderer.on('guestApiCallback', function (event, response) {
        var _a;
        if (!requests[response.requestId])
            return;
        (_a = requests[response.requestId].callbacks)[response.callbackId].apply(_a, response.args);
    });
    electron__WEBPACK_IMPORTED_MODULE_0___default.a.ipcRenderer.on('guestApiResponse', function (event, response) {
        if (!requests[response.id])
            return;
        if (response.error) {
            requests[response.id].reject(response.result);
        }
        else {
            requests[response.id].resolve(response.result);
        }
        if (Object.keys(requests[response.id].callbacks).length === 0) {
            delete requests[response.id];
        }
    });
    electron__WEBPACK_IMPORTED_MODULE_0___default.a.ipcRenderer.on('guestApiReady', function () { return ready(); });
    var mainWindowContents = electron__WEBPACK_IMPORTED_MODULE_0___default.a.remote.webContents.fromId(electron__WEBPACK_IMPORTED_MODULE_0___default.a.ipcRenderer.sendSync('getMainWindowWebContentsId'));
    var webContentsId = electron__WEBPACK_IMPORTED_MODULE_0___default.a.remote.getCurrentWebContents().id;
    function getProxy(path) {
        if (path === void 0) { path = []; }
        return new Proxy(function () { }, {
            get: function (target, key) {
                if (key === 'apiReady') {
                    return readyPromise;
                }
                return getProxy(path.concat([key.toString()]));
            },
            apply: function (target, thisArg, args) {
                var requestId = uuid_v4__WEBPACK_IMPORTED_MODULE_1___default()();
                requests[requestId] = {
                    resolve: null,
                    reject: null,
                    callbacks: {}
                };
                var promise = new Promise(function (resolve, reject) {
                    requests[requestId].resolve = resolve;
                    requests[requestId].reject = reject;
                });
                var mappedArgs = args.map(function (arg) {
                    if (typeof arg === 'function') {
                        var callbackId = uuid_v4__WEBPACK_IMPORTED_MODULE_1___default()();
                        requests[requestId].callbacks[callbackId] = arg;
                        return {
                            __guestApiCallback: true,
                            id: callbackId
                        };
                    }
                    return arg;
                });
                var apiRequest = {
                    id: requestId,
                    webContentsId: webContentsId,
                    methodPath: path,
                    args: mappedArgs
                };
                mainWindowContents.send('guestApiRequest', apiRequest);
                return promise;
            }
        });
    }
    global['streamlabsOBS'] = getProxy();
})();


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/rng.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is prett straight-forward - we use the crypto API.

var rb = __webpack_require__(/*! crypto */ "crypto").randomBytes;

function rng() {
  return rb(16);
};

module.exports = rng;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=guest-api.js.map