#!/usr/bin/env node
"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = function __commonJS(cb, mod) {
  return function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
  };
};
var __copyProps = function __copyProps(to, from, except, desc) {
  if (from && _typeof(from) === "object" || typeof from === "function") {
    var _iterator = _createForOfIteratorHelper(__getOwnPropNames(from)),
      _step;
    try {
      var _loop = function _loop() {
        var key = _step.value;
        if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: function get() {
            return from[key];
          },
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return to;
};
var __toESM = function __toESM(mod, isNodeMode, target) {
  return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod);
};

// node_modules/lodash.camelcase/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.camelcase/index.js": function node_modulesLodashCamelcaseIndexJs(exports, module2) {
    var INFINITY = 1 / 0;
    var symbolTag = "[object Symbol]";
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
    var rsComboSymbolsRange = "\\u20d0-\\u20f0";
    var rsDingbatRange = "\\u2700-\\u27bf";
    var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
    var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
    var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
    var rsPunctuationRange = "\\u2000-\\u206f";
    var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
    var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsBreak = "[" + rsBreakRange + "]";
    var rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]";
    var rsDigits = "\\d+";
    var rsDingbat = "[" + rsDingbatRange + "]";
    var rsLower = "[" + rsLowerRange + "]";
    var rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsUpper = "[" + rsUpperRange + "]";
    var rsZWJ = "\\u200d";
    var rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")";
    var rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")";
    var rsOptLowerContr = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
    var rsOptUpperContr = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([rsUpper + "?" + rsLower + "+" + rsOptLowerContr + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")", rsUpperMisc + "+" + rsOptUpperContr + "(?=" + [rsBreak, rsUpper + rsLowerMisc, "$"].join("|") + ")", rsUpper + "?" + rsLowerMisc + "+" + rsOptLowerContr, rsUpper + "+" + rsOptUpperContr, rsDigits, rsEmoji].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var deburredLetters = {
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "ss"
    };
    var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global && global.Object === Object && global;
    var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
        length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function basePropertyOf(object) {
      return function (key) {
        return object == null ? void 0 : object[key];
      };
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var Symbol2 = root.Symbol;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseSlice(array, start, end) {
      var index = -1,
        length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    function createCaseFirst(methodName) {
      return function (string) {
        string = toString(string);
        var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
        var chr = strSymbols ? strSymbols[0] : string.charAt(0);
        var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
        return chr[methodName]() + trailing;
      };
    }
    function createCompounder(callback) {
      return function (string) {
        return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
      };
    }
    function isObjectLike(value) {
      return !!value && _typeof(value) == "object";
    }
    function isSymbol(value) {
      return _typeof(value) == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    var camelCase = createCompounder(function (result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
    }
    var upperFirst = createCaseFirst("toUpperCase");
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? void 0 : pattern;
      if (pattern === void 0) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }
    module2.exports = camelCase;
  }
});

// node_modules/command-line-args/dist/index.js
var require_dist = __commonJS({
  "node_modules/command-line-args/dist/index.js": function node_modulesCommandLineArgsDistIndexJs(exports, module2) {
    "use strict";

    function _interopDefault(ex) {
      return ex && _typeof(ex) === "object" && "default" in ex ? ex["default"] : ex;
    }
    var camelCase = _interopDefault(require_lodash());
    function isObject2(input) {
      return _typeof(input) === "object" && input !== null;
    }
    function isArrayLike(input) {
      return isObject2(input) && typeof input.length === "number";
    }
    function arrayify(input) {
      if (Array.isArray(input)) {
        return input;
      }
      if (input === void 0) {
        return [];
      }
      if (isArrayLike(input) || input instanceof Set) {
        return Array.from(input);
      }
      return [input];
    }
    function isObject$1(input) {
      return _typeof(input) === "object" && input !== null;
    }
    function isArrayLike$1(input) {
      return isObject$1(input) && typeof input.length === "number";
    }
    function arrayify$1(input) {
      if (Array.isArray(input)) {
        return input;
      } else {
        if (input === void 0) {
          return [];
        } else if (isArrayLike$1(input)) {
          return Array.prototype.slice.call(input);
        } else {
          return [input];
        }
      }
    }
    function findReplace(array, testFn) {
      var found = [];
      var replaceWiths = arrayify$1(arguments);
      replaceWiths.splice(0, 2);
      arrayify$1(array).forEach(function (value, index) {
        var expanded = [];
        replaceWiths.forEach(function (replaceWith) {
          if (typeof replaceWith === "function") {
            expanded = expanded.concat(replaceWith(value));
          } else {
            expanded.push(replaceWith);
          }
        });
        if (testFn(value)) {
          found.push({
            index: index,
            replaceWithValue: expanded
          });
        }
      });
      found.reverse().forEach(function (item) {
        var spliceArgs = [item.index, 1].concat(item.replaceWithValue);
        array.splice.apply(array, spliceArgs);
      });
      return array;
    }
    var re = {
      "short": /^-([^\d-])$/,
      "long": /^--(\S+)/,
      combinedShort: /^-[^\d-]{2,}$/,
      optEquals: /^(--\S+?)=(.*)/
    };
    var ArgvArray = /*#__PURE__*/function (_Array) {
      _inherits(ArgvArray, _Array);
      var _super = _createSuper(ArgvArray);
      function ArgvArray() {
        _classCallCheck(this, ArgvArray);
        return _super.apply(this, arguments);
      }
      _createClass(ArgvArray, [{
        key: "load",
        value: function load(argv) {
          var _this = this;
          this.clear();
          if (argv && argv !== process.argv) {
            argv = arrayify(argv);
          } else {
            argv = process.argv.slice(0);
            var deleteCount = process.execArgv.some(isExecArg) ? 1 : 2;
            argv.splice(0, deleteCount);
          }
          argv.forEach(function (arg) {
            return _this.push(String(arg));
          });
        }
      }, {
        key: "clear",
        value: function clear() {
          this.length = 0;
        }
      }, {
        key: "expandOptionEqualsNotation",
        value: function expandOptionEqualsNotation() {
          if (this.some(function (arg) {
            return re.optEquals.test(arg);
          })) {
            var expandedArgs = [];
            this.forEach(function (arg) {
              var matches = arg.match(re.optEquals);
              if (matches) {
                expandedArgs.push(matches[1], matches[2]);
              } else {
                expandedArgs.push(arg);
              }
            });
            this.clear();
            this.load(expandedArgs);
          }
        }
      }, {
        key: "expandGetoptNotation",
        value: function expandGetoptNotation() {
          if (this.hasCombinedShortOptions()) {
            findReplace(this, re.combinedShort, expandCombinedShortArg);
          }
        }
      }, {
        key: "hasCombinedShortOptions",
        value: function hasCombinedShortOptions() {
          return this.some(function (arg) {
            return re.combinedShort.test(arg);
          });
        }
      }], [{
        key: "from",
        value: function from(argv) {
          var result = new this();
          result.load(argv);
          return result;
        }
      }]);
      return ArgvArray;
    }( /*#__PURE__*/_wrapNativeSuper(Array));
    function expandCombinedShortArg(arg) {
      arg = arg.slice(1);
      return arg.split("").map(function (letter) {
        return "-" + letter;
      });
    }
    function isOptionEqualsNotation(arg) {
      return re.optEquals.test(arg);
    }
    function isOption(arg) {
      return (re["short"].test(arg) || re["long"].test(arg)) && !re.optEquals.test(arg);
    }
    function isLongOption(arg) {
      return re["long"].test(arg) && !isOptionEqualsNotation(arg);
    }
    function getOptionName(arg) {
      if (re["short"].test(arg)) {
        return arg.match(re["short"])[1];
      } else if (isLongOption(arg)) {
        return arg.match(re["long"])[1];
      } else if (isOptionEqualsNotation(arg)) {
        return arg.match(re.optEquals)[1].replace(/^--/, "");
      } else {
        return null;
      }
    }
    function isValue(arg) {
      return !(isOption(arg) || re.combinedShort.test(arg) || re.optEquals.test(arg));
    }
    function isExecArg(arg) {
      return ["--eval", "-e"].indexOf(arg) > -1 || arg.startsWith("--eval=");
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function isPlainObject(input) {
      return input !== null && _typeof(input) === "object" && input.constructor === Object;
    }
    function isArrayLike$2(input) {
      return isObject$2(input) && typeof input.length === "number";
    }
    function isObject$2(input) {
      return _typeof(input) === "object" && input !== null;
    }
    function isDefined(input) {
      return typeof input !== "undefined";
    }
    function isString(input) {
      return typeof input === "string";
    }
    function isBoolean(input) {
      return typeof input === "boolean";
    }
    function isFunction(input) {
      return typeof input === "function";
    }
    function isClass(input) {
      if (isFunction(input)) {
        return /^class /.test(Function.prototype.toString.call(input));
      } else {
        return false;
      }
    }
    function isPrimitive(input) {
      if (input === null) return true;
      switch (_typeof(input)) {
        case "string":
        case "number":
        case "symbol":
        case "undefined":
        case "boolean":
          return true;
        default:
          return false;
      }
    }
    function isPromise(input) {
      if (input) {
        var isPromise2 = isDefined(Promise) && input instanceof Promise;
        var isThenable = input.then && typeof input.then === "function";
        return !!(isPromise2 || isThenable);
      } else {
        return false;
      }
    }
    function isIterable(input) {
      if (input === null || !isDefined(input)) {
        return false;
      } else {
        return typeof input[Symbol.iterator] === "function" || typeof input[Symbol.asyncIterator] === "function";
      }
    }
    var t = {
      isNumber: isNumber,
      isString: isString,
      isBoolean: isBoolean,
      isPlainObject: isPlainObject,
      isArrayLike: isArrayLike$2,
      isObject: isObject$2,
      isDefined: isDefined,
      isFunction: isFunction,
      isClass: isClass,
      isPrimitive: isPrimitive,
      isPromise: isPromise,
      isIterable: isIterable
    };
    var OptionDefinition = /*#__PURE__*/function () {
      function OptionDefinition(definition) {
        _classCallCheck(this, OptionDefinition);
        this.name = definition.name;
        this.type = definition.type || String;
        this.alias = definition.alias;
        this.multiple = definition.multiple;
        this.lazyMultiple = definition.lazyMultiple;
        this.defaultOption = definition.defaultOption;
        this.defaultValue = definition.defaultValue;
        this.group = definition.group;
        for (var prop in definition) {
          if (!this[prop]) this[prop] = definition[prop];
        }
      }
      _createClass(OptionDefinition, [{
        key: "isBoolean",
        value: function isBoolean() {
          return this.type === Boolean || t.isFunction(this.type) && this.type.name === "Boolean";
        }
      }, {
        key: "isMultiple",
        value: function isMultiple() {
          return this.multiple || this.lazyMultiple;
        }
      }], [{
        key: "create",
        value: function create(def) {
          var result = new this(def);
          return result;
        }
      }]);
      return OptionDefinition;
    }();
    var Definitions = /*#__PURE__*/function (_Array2) {
      _inherits(Definitions, _Array2);
      var _super2 = _createSuper(Definitions);
      function Definitions() {
        _classCallCheck(this, Definitions);
        return _super2.apply(this, arguments);
      }
      _createClass(Definitions, [{
        key: "validate",
        value: function validate(caseInsensitive) {
          var someHaveNoName = this.some(function (def) {
            return !def.name;
          });
          if (someHaveNoName) {
            halt("INVALID_DEFINITIONS", "Invalid option definitions: the `name` property is required on each definition");
          }
          var someDontHaveFunctionType = this.some(function (def) {
            return def.type && typeof def.type !== "function";
          });
          if (someDontHaveFunctionType) {
            halt("INVALID_DEFINITIONS", "Invalid option definitions: the `type` property must be a setter fuction (default: `Boolean`)");
          }
          var invalidOption;
          var numericAlias = this.some(function (def) {
            invalidOption = def;
            return t.isDefined(def.alias) && t.isNumber(def.alias);
          });
          if (numericAlias) {
            halt("INVALID_DEFINITIONS", "Invalid option definition: to avoid ambiguity an alias cannot be numeric [--" + invalidOption.name + " alias is -" + invalidOption.alias + "]");
          }
          var multiCharacterAlias = this.some(function (def) {
            invalidOption = def;
            return t.isDefined(def.alias) && def.alias.length !== 1;
          });
          if (multiCharacterAlias) {
            halt("INVALID_DEFINITIONS", "Invalid option definition: an alias must be a single character");
          }
          var hypenAlias = this.some(function (def) {
            invalidOption = def;
            return def.alias === "-";
          });
          if (hypenAlias) {
            halt("INVALID_DEFINITIONS", 'Invalid option definition: an alias cannot be "-"');
          }
          var duplicateName = hasDuplicates(this.map(function (def) {
            return caseInsensitive ? def.name.toLowerCase() : def.name;
          }));
          if (duplicateName) {
            halt("INVALID_DEFINITIONS", "Two or more option definitions have the same name");
          }
          var duplicateAlias = hasDuplicates(this.map(function (def) {
            return caseInsensitive && t.isDefined(def.alias) ? def.alias.toLowerCase() : def.alias;
          }));
          if (duplicateAlias) {
            halt("INVALID_DEFINITIONS", "Two or more option definitions have the same alias");
          }
          var duplicateDefaultOption = this.filter(function (def) {
            return def.defaultOption === true;
          }).length > 1;
          if (duplicateDefaultOption) {
            halt("INVALID_DEFINITIONS", "Only one option definition can be the defaultOption");
          }
          var defaultBoolean = this.some(function (def) {
            invalidOption = def;
            return def.isBoolean() && def.defaultOption;
          });
          if (defaultBoolean) {
            halt("INVALID_DEFINITIONS", "A boolean option [\"".concat(invalidOption.name, "\"] can not also be the defaultOption."));
          }
        }
      }, {
        key: "get",
        value: function get(arg, caseInsensitive) {
          if (isOption(arg)) {
            if (re["short"].test(arg)) {
              var shortOptionName = getOptionName(arg);
              if (caseInsensitive) {
                var lowercaseShortOptionName = shortOptionName.toLowerCase();
                return this.find(function (def) {
                  return t.isDefined(def.alias) && def.alias.toLowerCase() === lowercaseShortOptionName;
                });
              } else {
                return this.find(function (def) {
                  return def.alias === shortOptionName;
                });
              }
            } else {
              var optionName = getOptionName(arg);
              if (caseInsensitive) {
                var lowercaseOptionName = optionName.toLowerCase();
                return this.find(function (def) {
                  return def.name.toLowerCase() === lowercaseOptionName;
                });
              } else {
                return this.find(function (def) {
                  return def.name === optionName;
                });
              }
            }
          } else {
            return this.find(function (def) {
              return def.name === arg;
            });
          }
        }
      }, {
        key: "getDefault",
        value: function getDefault() {
          return this.find(function (def) {
            return def.defaultOption === true;
          });
        }
      }, {
        key: "isGrouped",
        value: function isGrouped() {
          return this.some(function (def) {
            return def.group;
          });
        }
      }, {
        key: "whereGrouped",
        value: function whereGrouped() {
          return this.filter(containsValidGroup);
        }
      }, {
        key: "whereNotGrouped",
        value: function whereNotGrouped() {
          return this.filter(function (def) {
            return !containsValidGroup(def);
          });
        }
      }, {
        key: "whereDefaultValueSet",
        value: function whereDefaultValueSet() {
          return this.filter(function (def) {
            return t.isDefined(def.defaultValue);
          });
        }
      }], [{
        key: "from",
        value: function from(definitions, caseInsensitive) {
          if (definitions instanceof this) return definitions;
          var result = _get(_getPrototypeOf(Definitions), "from", this).call(this, arrayify(definitions), function (def) {
            return OptionDefinition.create(def);
          });
          result.validate(caseInsensitive);
          return result;
        }
      }]);
      return Definitions;
    }( /*#__PURE__*/_wrapNativeSuper(Array));
    function halt(name, message) {
      var err = new Error(message);
      err.name = name;
      throw err;
    }
    function containsValidGroup(def) {
      return arrayify(def.group).some(function (group) {
        return group;
      });
    }
    function hasDuplicates(array) {
      var items = {};
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (items[value]) {
          return true;
        } else {
          if (t.isDefined(value)) items[value] = true;
        }
      }
    }
    var ArgvParser = /*#__PURE__*/function (_Symbol$iterator) {
      function ArgvParser(definitions, options) {
        _classCallCheck(this, ArgvParser);
        this.options = Object.assign({}, options);
        this.definitions = Definitions.from(definitions, this.options.caseInsensitive);
        this.argv = ArgvArray.from(this.options.argv);
        if (this.argv.hasCombinedShortOptions()) {
          findReplace(this.argv, re.combinedShort.test.bind(re.combinedShort), function (arg) {
            arg = arg.slice(1);
            return arg.split("").map(function (letter) {
              return {
                origArg: "-".concat(arg),
                arg: "-" + letter
              };
            });
          });
        }
      }
      _createClass(ArgvParser, [{
        key: _Symbol$iterator,
        value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
          var definitions, def, value, name, event, singularDefaultSet, unknownFound, origArg, _iterator2, _step2, arg, matches, argInfo;
          return _regeneratorRuntime().wrap(function value$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                definitions = this.definitions;
                singularDefaultSet = false;
                unknownFound = false;
                _iterator2 = _createForOfIteratorHelper(this.argv);
                _context.prev = 4;
                _iterator2.s();
              case 6:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 53;
                  break;
                }
                arg = _step2.value;
                if (t.isPlainObject(arg)) {
                  origArg = arg.origArg;
                  arg = arg.arg;
                }
                if (!(unknownFound && this.options.stopAtFirstUnknown)) {
                  _context.next = 13;
                  break;
                }
                _context.next = 12;
                return {
                  event: "unknown_value",
                  arg: arg,
                  name: "_unknown",
                  value: void 0
                };
              case 12:
                return _context.abrupt("continue", 51);
              case 13:
                if (!isOption(arg)) {
                  _context.next = 19;
                  break;
                }
                def = definitions.get(arg, this.options.caseInsensitive);
                value = void 0;
                if (def) {
                  value = def.isBoolean() ? true : null;
                  event = "set";
                } else {
                  event = "unknown_option";
                }
                _context.next = 38;
                break;
              case 19:
                if (!isOptionEqualsNotation(arg)) {
                  _context.next = 37;
                  break;
                }
                matches = arg.match(re.optEquals);
                def = definitions.get(matches[1], this.options.caseInsensitive);
                if (!def) {
                  _context.next = 34;
                  break;
                }
                if (!def.isBoolean()) {
                  _context.next = 30;
                  break;
                }
                _context.next = 26;
                return {
                  event: "unknown_value",
                  arg: arg,
                  name: "_unknown",
                  value: value,
                  def: def
                };
              case 26:
                event = "set";
                value = true;
                _context.next = 32;
                break;
              case 30:
                event = "set";
                value = matches[2];
              case 32:
                _context.next = 35;
                break;
              case 34:
                event = "unknown_option";
              case 35:
                _context.next = 38;
                break;
              case 37:
                if (isValue(arg)) {
                  if (def) {
                    value = arg;
                    event = "set";
                  } else {
                    def = this.definitions.getDefault();
                    if (def && !singularDefaultSet) {
                      value = arg;
                      event = "set";
                    } else {
                      event = "unknown_value";
                      def = void 0;
                    }
                  }
                }
              case 38:
                name = def ? def.name : "_unknown";
                argInfo = {
                  event: event,
                  arg: arg,
                  name: name,
                  value: value,
                  def: def
                };
                if (origArg) {
                  argInfo.subArg = arg;
                  argInfo.arg = origArg;
                }
                _context.next = 43;
                return argInfo;
              case 43:
                if (name === "_unknown") unknownFound = true;
                if (def && def.defaultOption && !def.isMultiple() && event === "set") singularDefaultSet = true;
                if (def && def.isBoolean()) def = void 0;
                if (def && !def.multiple && t.isDefined(value) && value !== null) {
                  def = void 0;
                }
                value = void 0;
                event = void 0;
                name = void 0;
                origArg = void 0;
              case 51:
                _context.next = 6;
                break;
              case 53:
                _context.next = 58;
                break;
              case 55:
                _context.prev = 55;
                _context.t0 = _context["catch"](4);
                _iterator2.e(_context.t0);
              case 58:
                _context.prev = 58;
                _iterator2.f();
                return _context.finish(58);
              case 61:
              case "end":
                return _context.stop();
            }
          }, value, this, [[4, 55, 58, 61]]);
        })
      }]);
      return ArgvParser;
    }(Symbol.iterator);
    var _value = /* @__PURE__ */new WeakMap();
    var Option = /*#__PURE__*/function () {
      function Option(definition) {
        _classCallCheck(this, Option);
        this.definition = new OptionDefinition(definition);
        this.state = null;
        this.resetToDefault();
      }
      _createClass(Option, [{
        key: "get",
        value: function get() {
          return _value.get(this);
        }
      }, {
        key: "set",
        value: function set(val) {
          this._set(val, "set");
        }
      }, {
        key: "_set",
        value: function _set(val, state) {
          var def = this.definition;
          if (def.isMultiple()) {
            if (val !== null && val !== void 0) {
              var arr = this.get();
              if (this.state === "default") arr.length = 0;
              arr.push(def.type(val));
              this.state = state;
            }
          } else {
            if (!def.isMultiple() && this.state === "set") {
              var err = new Error("Singular option already set [".concat(this.definition.name, "=").concat(this.get(), "]"));
              err.name = "ALREADY_SET";
              err.value = val;
              err.optionName = def.name;
              throw err;
            } else if (val === null || val === void 0) {
              _value.set(this, val);
            } else {
              _value.set(this, def.type(val));
              this.state = state;
            }
          }
        }
      }, {
        key: "resetToDefault",
        value: function resetToDefault() {
          if (t.isDefined(this.definition.defaultValue)) {
            if (this.definition.isMultiple()) {
              _value.set(this, arrayify(this.definition.defaultValue).slice());
            } else {
              _value.set(this, this.definition.defaultValue);
            }
          } else {
            if (this.definition.isMultiple()) {
              _value.set(this, []);
            } else {
              _value.set(this, null);
            }
          }
          this.state = "default";
        }
      }], [{
        key: "create",
        value: function create(definition) {
          definition = new OptionDefinition(definition);
          if (definition.isBoolean()) {
            return FlagOption.create(definition);
          } else {
            return new this(definition);
          }
        }
      }]);
      return Option;
    }();
    var FlagOption = /*#__PURE__*/function (_Option) {
      _inherits(FlagOption, _Option);
      var _super3 = _createSuper(FlagOption);
      function FlagOption() {
        _classCallCheck(this, FlagOption);
        return _super3.apply(this, arguments);
      }
      _createClass(FlagOption, [{
        key: "set",
        value: function set(val) {
          _get(_getPrototypeOf(FlagOption.prototype), "set", this).call(this, true);
        }
      }], [{
        key: "create",
        value: function create(def) {
          return new this(def);
        }
      }]);
      return FlagOption;
    }(Option);
    var Output = /*#__PURE__*/function (_Map) {
      _inherits(Output, _Map);
      var _super4 = _createSuper(Output);
      function Output(definitions) {
        var _this2;
        _classCallCheck(this, Output);
        _this2 = _super4.call(this);
        _this2.definitions = Definitions.from(definitions);
        _this2.set("_unknown", Option.create({
          name: "_unknown",
          multiple: true
        }));
        var _iterator3 = _createForOfIteratorHelper(_this2.definitions.whereDefaultValueSet()),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var def = _step3.value;
            _this2.set(def.name, Option.create(def));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return _this2;
      }
      _createClass(Output, [{
        key: "toObject",
        value: function toObject(options) {
          options = options || {};
          var output = {};
          var _iterator4 = _createForOfIteratorHelper(this),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var item = _step4.value;
              var name = options.camelCase && item[0] !== "_unknown" ? camelCase(item[0]) : item[0];
              var option = item[1];
              if (name === "_unknown" && !option.get().length) continue;
              output[name] = option.get();
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          if (options.skipUnknown) delete output._unknown;
          return output;
        }
      }]);
      return Output;
    }( /*#__PURE__*/_wrapNativeSuper(Map));
    var GroupedOutput = /*#__PURE__*/function (_Output) {
      _inherits(GroupedOutput, _Output);
      var _super5 = _createSuper(GroupedOutput);
      function GroupedOutput() {
        _classCallCheck(this, GroupedOutput);
        return _super5.apply(this, arguments);
      }
      _createClass(GroupedOutput, [{
        key: "toObject",
        value: function toObject(options) {
          var superOutputNoCamel = _get(_getPrototypeOf(GroupedOutput.prototype), "toObject", this).call(this, {
            skipUnknown: options.skipUnknown
          });
          var superOutput = _get(_getPrototypeOf(GroupedOutput.prototype), "toObject", this).call(this, options);
          var unknown = superOutput._unknown;
          delete superOutput._unknown;
          var grouped = {
            _all: superOutput
          };
          if (unknown && unknown.length) grouped._unknown = unknown;
          this.definitions.whereGrouped().forEach(function (def) {
            var name = options.camelCase ? camelCase(def.name) : def.name;
            var outputValue = superOutputNoCamel[def.name];
            var _iterator5 = _createForOfIteratorHelper(arrayify(def.group)),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var groupName = _step5.value;
                grouped[groupName] = grouped[groupName] || {};
                if (t.isDefined(outputValue)) {
                  grouped[groupName][name] = outputValue;
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          });
          this.definitions.whereNotGrouped().forEach(function (def) {
            var name = options.camelCase ? camelCase(def.name) : def.name;
            var outputValue = superOutputNoCamel[def.name];
            if (t.isDefined(outputValue)) {
              if (!grouped._none) grouped._none = {};
              grouped._none[name] = outputValue;
            }
          });
          return grouped;
        }
      }]);
      return GroupedOutput;
    }(Output);
    function commandLineArgs(optionDefinitions, options) {
      options = options || {};
      if (options.stopAtFirstUnknown) options.partial = true;
      optionDefinitions = Definitions.from(optionDefinitions, options.caseInsensitive);
      var parser = new ArgvParser(optionDefinitions, {
        argv: options.argv,
        stopAtFirstUnknown: options.stopAtFirstUnknown,
        caseInsensitive: options.caseInsensitive
      });
      var OutputClass = optionDefinitions.isGrouped() ? GroupedOutput : Output;
      var output = new OutputClass(optionDefinitions);
      var _iterator6 = _createForOfIteratorHelper(parser),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var argInfo = _step6.value;
          var arg = argInfo.subArg || argInfo.arg;
          if (!options.partial) {
            if (argInfo.event === "unknown_value") {
              var err = new Error("Unknown value: ".concat(arg));
              err.name = "UNKNOWN_VALUE";
              err.value = arg;
              throw err;
            } else if (argInfo.event === "unknown_option") {
              var _err = new Error("Unknown option: ".concat(arg));
              _err.name = "UNKNOWN_OPTION";
              _err.optionName = arg;
              throw _err;
            }
          }
          var option = void 0;
          if (output.has(argInfo.name)) {
            option = output.get(argInfo.name);
          } else {
            option = Option.create(argInfo.def);
            output.set(argInfo.name, option);
          }
          if (argInfo.name === "_unknown") {
            option.set(arg);
          } else {
            option.set(argInfo.value);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return output.toObject({
        skipUnknown: !options.partial,
        camelCase: options.camelCase
      });
    }
    module2.exports = commandLineArgs;
  }
});

// node_modules/command-line-usage/node_modules/array-back/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/command-line-usage/node_modules/array-back/dist/index.js": function node_modulesCommandLineUsageNode_modulesArrayBackDistIndexJs(exports, module2) {
    (function (global2, factory) {
      _typeof(exports) === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.arrayBack = factory());
    })(exports, function () {
      "use strict";

      function isObject2(input) {
        return _typeof(input) === "object" && input !== null;
      }
      function isArrayLike(input) {
        return isObject2(input) && typeof input.length === "number";
      }
      function arrayify(input) {
        if (Array.isArray(input)) {
          return input;
        }
        if (input === void 0) {
          return [];
        }
        if (isArrayLike(input) || input instanceof Set) {
          return Array.from(input);
        }
        return [input];
      }
      return arrayify;
    });
  }
});

// node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/escape-string-regexp/index.js": function node_modulesEscapeStringRegexpIndexJs(exports, module2) {
    "use strict";

    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function (str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// node_modules/command-line-usage/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/command-line-usage/node_modules/color-name/index.js": function node_modulesCommandLineUsageNode_modulesColorNameIndexJs(exports, module2) {
    "use strict";

    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/command-line-usage/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/command-line-usage/node_modules/color-convert/conversions.js": function node_modulesCommandLineUsageNode_modulesColorConvertConversionsJs(exports, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (key in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
    }
    var key;
    var convert = module2.exports = {
      rgb: {
        channels: 3,
        labels: "rgb"
      },
      hsl: {
        channels: 3,
        labels: "hsl"
      },
      hsv: {
        channels: 3,
        labels: "hsv"
      },
      hwb: {
        channels: 3,
        labels: "hwb"
      },
      cmyk: {
        channels: 4,
        labels: "cmyk"
      },
      xyz: {
        channels: 3,
        labels: "xyz"
      },
      lab: {
        channels: 3,
        labels: "lab"
      },
      lch: {
        channels: 3,
        labels: "lch"
      },
      hex: {
        channels: 1,
        labels: ["hex"]
      },
      keyword: {
        channels: 1,
        labels: ["keyword"]
      },
      ansi16: {
        channels: 1,
        labels: ["ansi16"]
      },
      ansi256: {
        channels: 1,
        labels: ["ansi256"]
      },
      hcg: {
        channels: 3,
        labels: ["h", "c", "g"]
      },
      apple: {
        channels: 3,
        labels: ["r16", "g16", "b16"]
      },
      gray: {
        channels: 1,
        labels: ["gray"]
      }
    };
    for (model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        channels = convert[model].channels;
        labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", {
          value: channels
        });
        Object.defineProperty(convert[model], "labels", {
          value: labels
        });
      }
    }
    var channels;
    var labels;
    var model;
    convert.rgb.hsl = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h;
      var s;
      var l;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function (rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);
      var diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [h * 360, s * 100, v * 100];
    };
    convert.rgb.hwb = function (rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m;
      var y;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }
    convert.rgb.keyword = function (rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function (keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function (rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function (hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      t1 = 2 * l - t2;
      rgb = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function (hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function (hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function (hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l;
      l = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function (hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i;
      var v;
      var f;
      var n;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      i = Math.floor(6 * h);
      v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      n = wh + f * (v - wh);
      var r;
      var g;
      var b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function (cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function (xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function (xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function (lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function (args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function (args) {
      var color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function (args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function (args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function (args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      var colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map(function (_char) {
          return _char + _char;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r, g), b);
      var min = Math.min(Math.min(r, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma + 4;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function (hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f = 0;
      if (l < 0.5) {
        c = 2 * s * l;
      } else {
        c = 2 * s * (1 - l);
      }
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function (hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function (hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
    };
    convert.hcg.hsv = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c) + 0.5 * c;
      var s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function (hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function (apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function (rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function (args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function (args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function (gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function (gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function (gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function (gray) {
      var val = Math.round(gray[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function (rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/command-line-usage/node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/command-line-usage/node_modules/color-convert/route.js": function node_modulesCommandLineUsageNode_modulesColorConvertRouteJs(exports, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i = 0; i < len; i++) {
          var adjacent = adjacents[i];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function (args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path2 = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path2.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path2;
      return fn;
    }
    module2.exports = function (fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i = 0; i < len; i++) {
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/command-line-usage/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/command-line-usage/node_modules/color-convert/index.js": function node_modulesCommandLineUsageNode_modulesColorConvertIndexJs(exports, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function wrappedFn(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function wrappedFn(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        if (_typeof(result) === "object") {
          for (var len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function (fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", {
        value: conversions[fromModel].channels
      });
      Object.defineProperty(convert[fromModel], "labels", {
        value: conversions[fromModel].labels
      });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function (toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/command-line-usage/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/command-line-usage/node_modules/ansi-styles/index.js": function node_modulesCommandLineUsageNode_modulesAnsiStylesIndexJs(exports, module2) {
    "use strict";

    var colorConvert = require_color_convert();
    var wrapAnsi16 = function wrapAnsi16(fn, offset) {
      return function () {
        var code = fn.apply(colorConvert, arguments);
        return "\x1B[".concat(code + offset, "m");
      };
    };
    var wrapAnsi256 = function wrapAnsi256(fn, offset) {
      return function () {
        var code = fn.apply(colorConvert, arguments);
        return "\x1B[".concat(38 + offset, ";5;").concat(code, "m");
      };
    };
    var wrapAnsi16m = function wrapAnsi16m(fn, offset) {
      return function () {
        var rgb = fn.apply(colorConvert, arguments);
        return "\x1B[".concat(38 + offset, ";2;").concat(rgb[0], ";").concat(rgb[1], ";").concat(rgb[2], "m");
      };
    };
    function assembleStyles() {
      var codes = /* @__PURE__ */new Map();
      var styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          gray: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.grey = styles.color.gray;
      for (var _i2 = 0, _Object$keys = Object.keys(styles); _i2 < _Object$keys.length; _i2++) {
        var groupName = _Object$keys[_i2];
        var group = styles[groupName];
        for (var _i3 = 0, _Object$keys2 = Object.keys(group); _i3 < _Object$keys2.length; _i3++) {
          var styleName = _Object$keys2[_i3];
          var style = group[styleName];
          styles[styleName] = {
            open: "\x1B[".concat(style[0], "m"),
            close: "\x1B[".concat(style[1], "m")
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
      }
      var ansi2ansi = function ansi2ansi(n) {
        return n;
      };
      var rgb2rgb = function rgb2rgb(r, g, b) {
        return [r, g, b];
      };
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 0)
      };
      styles.color.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 0)
      };
      styles.color.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 0)
      };
      styles.bgColor.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 10)
      };
      styles.bgColor.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 10)
      };
      styles.bgColor.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 10)
      };
      for (var _i4 = 0, _Object$keys3 = Object.keys(colorConvert); _i4 < _Object$keys3.length; _i4++) {
        var key = _Object$keys3[_i4];
        if (_typeof(colorConvert[key]) !== "object") {
          continue;
        }
        var suite = colorConvert[key];
        if (key === "ansi16") {
          key = "ansi";
        }
        if ("ansi16" in suite) {
          styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
          styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
          styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
          styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
        }
      }
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/command-line-usage/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/command-line-usage/node_modules/has-flag/index.js": function node_modulesCommandLineUsageNode_modulesHasFlagIndexJs(exports, module2) {
    "use strict";

    module2.exports = function (flag, argv) {
      argv = argv || process.argv;
      var prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      var pos = argv.indexOf(prefix + flag);
      var terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/command-line-usage/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/command-line-usage/node_modules/supports-color/index.js": function node_modulesCommandLineUsageNode_modulesSupportsColorIndexJs(exports, module2) {
    "use strict";

    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      var min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        var osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function (sign) {
          return sign in env;
        }) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        var version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      var level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/command-line-usage/node_modules/chalk/templates.js
var require_templates = __commonJS({
  "node_modules/command-line-usage/node_modules/chalk/templates.js": function node_modulesCommandLineUsageNode_modulesChalkTemplatesJs(exports, module2) {
    "use strict";

    var TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */new Map([["n", "\n"], ["r", "\r"], ["t", "	"], ["b", "\b"], ["f", "\f"], ["v", "\v"], ["0", "\0"], ["\\", "\\"], ["e", "\x1B"], ["a", "\x07"]]);
    function unescape(c) {
      if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, args) {
      var results = [];
      var chunks = args.trim().split(/\s*,\s*/g);
      var matches;
      var _iterator7 = _createForOfIteratorHelper(chunks),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var chunk = _step7.value;
          if (!isNaN(chunk)) {
            results.push(Number(chunk));
          } else if (matches = chunk.match(STRING_REGEX)) {
            results.push(matches[2].replace(ESCAPE_REGEX, function (m, escape, chr) {
              return escape ? unescape(escape) : chr;
            }));
          } else {
            throw new Error("Invalid Chalk template style argument: ".concat(chunk, " (in style '").concat(name, "')"));
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      var results = [];
      var matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        var name = matches[1];
        if (matches[2]) {
          var args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      var enabled = {};
      var _iterator8 = _createForOfIteratorHelper(styles),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var layer = _step8.value;
          var _iterator9 = _createForOfIteratorHelper(layer.styles),
            _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var style = _step9.value;
              enabled[style[0]] = layer.inverse ? null : style.slice(1);
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      var current = chalk;
      for (var _i5 = 0, _Object$keys4 = Object.keys(enabled); _i5 < _Object$keys4.length; _i5++) {
        var styleName = _Object$keys4[_i5];
        if (Array.isArray(enabled[styleName])) {
          if (!(styleName in current)) {
            throw new Error("Unknown Chalk style: ".concat(styleName));
          }
          if (enabled[styleName].length > 0) {
            current = current[styleName].apply(current, enabled[styleName]);
          } else {
            current = current[styleName];
          }
        }
      }
      return current;
    }
    module2.exports = function (chalk, tmp) {
      var styles = [];
      var chunks = [];
      var chunk = [];
      tmp.replace(TEMPLATE_REGEX, function (m, escapeChar, inverse, style, close, chr) {
        if (escapeChar) {
          chunk.push(unescape(escapeChar));
        } else if (style) {
          var str = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
          styles.push({
            inverse: inverse,
            styles: parseStyle(style)
          });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        var errMsg = "Chalk template literal is missing ".concat(styles.length, " closing bracket").concat(styles.length === 1 ? "" : "s", " (`}`)");
        throw new Error(errMsg);
      }
      return chunks.join("");
    };
  }
});

// node_modules/command-line-usage/node_modules/chalk/index.js
var require_chalk = __commonJS({
  "node_modules/command-line-usage/node_modules/chalk/index.js": function node_modulesCommandLineUsageNode_modulesChalkIndexJs(exports, module2) {
    "use strict";

    var escapeStringRegexp = require_escape_string_regexp();
    var ansiStyles = require_ansi_styles();
    var stdoutColor = require_supports_color().stdout;
    var template = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */new Set(["gray"]);
    var styles = /* @__PURE__ */Object.create(null);
    function applyOptions(obj, options) {
      options = options || {};
      var scLevel = stdoutColor ? stdoutColor.level : 0;
      obj.level = options.level === void 0 ? scLevel : options.level;
      obj.enabled = "enabled" in options ? options.enabled : obj.level > 0;
    }
    function Chalk(options) {
      if (!this || !(this instanceof Chalk) || this.template) {
        var chalk = {};
        applyOptions(chalk, options);
        chalk.template = function () {
          var args = [].slice.call(arguments);
          return chalkTag.apply(null, [chalk.template].concat(args));
        };
        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);
        chalk.template.constructor = Chalk;
        return chalk.template;
      }
      applyOptions(this, options);
    }
    if (isSimpleWindowsTerm) {
      ansiStyles.blue.open = "\x1B[94m";
    }
    var _loop2 = function _loop2() {
      var key = _Object$keys5[_i6];
      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
      styles[key] = {
        get: function get() {
          var codes = ansiStyles[key];
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
        }
      };
    };
    for (var _i6 = 0, _Object$keys5 = Object.keys(ansiStyles); _i6 < _Object$keys5.length; _i6++) {
      _loop2();
    }
    styles.visible = {
      get: function get() {
        return build.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), "g");
    var _loop3 = function _loop3() {
      var model = _Object$keys6[_i7];
      if (skipModels.has(model)) {
        return 1; // continue
      }
      styles[model] = {
        get: function get() {
          var level = this.level;
          return function () {
            var open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
            var codes = {
              open: open,
              close: ansiStyles.color.close,
              closeRe: ansiStyles.color.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    };
    for (var _i7 = 0, _Object$keys6 = Object.keys(ansiStyles.color.ansi); _i7 < _Object$keys6.length; _i7++) {
      if (_loop3()) continue;
    }
    ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), "g");
    var _loop4 = function _loop4() {
      var model = _Object$keys7[_i8];
      if (skipModels.has(model)) {
        return 1; // continue
      }
      var bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get: function get() {
          var level = this.level;
          return function () {
            var open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
            var codes = {
              open: open,
              close: ansiStyles.bgColor.close,
              closeRe: ansiStyles.bgColor.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    };
    for (var _i8 = 0, _Object$keys7 = Object.keys(ansiStyles.bgColor.ansi); _i8 < _Object$keys7.length; _i8++) {
      if (_loop4()) continue;
    }
    var proto = Object.defineProperties(function () {}, styles);
    function build(_styles, _empty, key) {
      var builder = function builder() {
        return applyStyle.apply(builder, arguments);
      };
      builder._styles = _styles;
      builder._empty = _empty;
      var self2 = this;
      Object.defineProperty(builder, "level", {
        enumerable: true,
        get: function get() {
          return self2.level;
        },
        set: function set(level) {
          self2.level = level;
        }
      });
      Object.defineProperty(builder, "enabled", {
        enumerable: true,
        get: function get() {
          return self2.enabled;
        },
        set: function set(enabled) {
          self2.enabled = enabled;
        }
      });
      builder.hasGrey = this.hasGrey || key === "gray" || key === "grey";
      builder.__proto__ = proto;
      return builder;
    }
    function applyStyle() {
      var args = arguments;
      var argsLen = args.length;
      var str = String(arguments[0]);
      if (argsLen === 0) {
        return "";
      }
      if (argsLen > 1) {
        for (var a = 1; a < argsLen; a++) {
          str += " " + args[a];
        }
      }
      if (!this.enabled || this.level <= 0 || !str) {
        return this._empty ? "" : str;
      }
      var originalDim = ansiStyles.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles.dim.open = "";
      }
      var _iterator10 = _createForOfIteratorHelper(this._styles.slice().reverse()),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var code = _step10.value;
          str = code.open + str.replace(code.closeRe, code.open) + code.close;
          str = str.replace(/\r?\n/g, "".concat(code.close, "$&").concat(code.open));
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      ansiStyles.dim.open = originalDim;
      return str;
    }
    function chalkTag(chalk, strings) {
      if (!Array.isArray(strings)) {
        return [].slice.call(arguments, 1).join(" ");
      }
      var args = [].slice.call(arguments, 2);
      var parts = [strings.raw[0]];
      for (var i = 1; i < strings.length; i++) {
        parts.push(String(args[i - 1]).replace(/[{}\\]/g, "\\$&"));
        parts.push(String(strings.raw[i]));
      }
      return template(chalk, parts.join(""));
    }
    Object.defineProperties(Chalk.prototype, styles);
    module2.exports = Chalk();
    module2.exports.supportsColor = stdoutColor;
    module2.exports["default"] = module2.exports;
  }
});

// node_modules/command-line-usage/lib/section.js
var require_section = __commonJS({
  "node_modules/command-line-usage/lib/section.js": function node_modulesCommandLineUsageLibSectionJs(exports, module2) {
    var Section = /*#__PURE__*/function () {
      function Section() {
        _classCallCheck(this, Section);
        this.lines = [];
      }
      _createClass(Section, [{
        key: "add",
        value: function add(lines) {
          var _this3 = this;
          if (lines) {
            var arrayify = require_dist2();
            arrayify(lines).forEach(function (line) {
              return _this3.lines.push(line);
            });
          } else {
            this.lines.push("");
          }
        }
      }, {
        key: "toString",
        value: function toString() {
          var os = require("os");
          return this.lines.join(os.EOL);
        }
      }, {
        key: "header",
        value: function header(text) {
          var chalk = require_chalk();
          if (text) {
            this.add(chalk.underline.bold(text));
            this.add();
          }
        }
      }]);
      return Section;
    }();
    module2.exports = Section;
  }
});

// node_modules/deep-extend/lib/deep-extend.js
var require_deep_extend = __commonJS({
  "node_modules/deep-extend/lib/deep-extend.js": function node_modulesDeepExtendLibDeepExtendJs(exports, module2) {
    "use strict";

    function isSpecificValue(val) {
      return val instanceof Buffer || val instanceof Date || val instanceof RegExp ? true : false;
    }
    function cloneSpecificValue(val) {
      if (val instanceof Buffer) {
        var x = Buffer.alloc ? Buffer.alloc(val.length) : new Buffer(val.length);
        val.copy(x);
        return x;
      } else if (val instanceof Date) {
        return new Date(val.getTime());
      } else if (val instanceof RegExp) {
        return new RegExp(val);
      } else {
        throw new Error("Unexpected situation");
      }
    }
    function deepCloneArray(arr) {
      var clone = [];
      arr.forEach(function (item, index) {
        if (_typeof(item) === "object" && item !== null) {
          if (Array.isArray(item)) {
            clone[index] = deepCloneArray(item);
          } else if (isSpecificValue(item)) {
            clone[index] = cloneSpecificValue(item);
          } else {
            clone[index] = deepExtend({}, item);
          }
        } else {
          clone[index] = item;
        }
      });
      return clone;
    }
    function safeGetProperty(object, property) {
      return property === "__proto__" ? void 0 : object[property];
    }
    var deepExtend = module2.exports = function () {
      if (arguments.length < 1 || _typeof(arguments[0]) !== "object") {
        return false;
      }
      if (arguments.length < 2) {
        return arguments[0];
      }
      var target = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var val, src, clone;
      args.forEach(function (obj) {
        if (_typeof(obj) !== "object" || obj === null || Array.isArray(obj)) {
          return;
        }
        Object.keys(obj).forEach(function (key) {
          src = safeGetProperty(target, key);
          val = safeGetProperty(obj, key);
          if (val === target) {
            return;
          } else if (_typeof(val) !== "object" || val === null) {
            target[key] = val;
            return;
          } else if (Array.isArray(val)) {
            target[key] = deepCloneArray(val);
            return;
          } else if (isSpecificValue(val)) {
            target[key] = cloneSpecificValue(val);
            return;
          } else if (_typeof(src) !== "object" || src === null || Array.isArray(src)) {
            target[key] = deepExtend({}, val);
            return;
          } else {
            target[key] = deepExtend(src, val);
            return;
          }
        });
      });
      return target;
    };
  }
});

// node_modules/table-layout/node_modules/array-back/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/table-layout/node_modules/array-back/dist/index.js": function node_modulesTableLayoutNode_modulesArrayBackDistIndexJs(exports, module2) {
    (function (global2, factory) {
      _typeof(exports) === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.arrayBack = factory());
    })(exports, function () {
      "use strict";

      function isObject2(input) {
        return _typeof(input) === "object" && input !== null;
      }
      function isArrayLike(input) {
        return isObject2(input) && typeof input.length === "number";
      }
      function arrayify(input) {
        if (Array.isArray(input)) {
          return input;
        }
        if (input === void 0) {
          return [];
        }
        if (isArrayLike(input) || input instanceof Set) {
          return Array.from(input);
        }
        return [input];
      }
      return arrayify;
    });
  }
});

// node_modules/table-layout/node_modules/typical/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/table-layout/node_modules/typical/dist/index.js": function node_modulesTableLayoutNode_modulesTypicalDistIndexJs(exports, module2) {
    (function (global2, factory) {
      _typeof(exports) === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.typical = {}));
    })(exports, function (exports2) {
      "use strict";

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function isPlainObject(input) {
        return input !== null && _typeof(input) === "object" && input.constructor === Object;
      }
      function isArrayLike(input) {
        return isObject2(input) && typeof input.length === "number";
      }
      function isObject2(input) {
        return _typeof(input) === "object" && input !== null;
      }
      function isDefined(input) {
        return typeof input !== "undefined";
      }
      function isUndefined(input) {
        return !isDefined(input);
      }
      function isNull(input) {
        return input === null;
      }
      function isDefinedValue(input) {
        return isDefined(input) && !isNull(input) && !Number.isNaN(input);
      }
      function isClass(input) {
        if (typeof input === "function") {
          return /^class /.test(Function.prototype.toString.call(input));
        } else {
          return false;
        }
      }
      function isPrimitive(input) {
        if (input === null) return true;
        switch (_typeof(input)) {
          case "string":
          case "number":
          case "symbol":
          case "undefined":
          case "boolean":
            return true;
          default:
            return false;
        }
      }
      function isPromise(input) {
        if (input) {
          var isPromise2 = isDefined(Promise) && input instanceof Promise;
          var isThenable = input.then && typeof input.then === "function";
          return !!(isPromise2 || isThenable);
        } else {
          return false;
        }
      }
      function isIterable(input) {
        if (input === null || !isDefined(input)) {
          return false;
        } else {
          return typeof input[Symbol.iterator] === "function" || typeof input[Symbol.asyncIterator] === "function";
        }
      }
      function isString(input) {
        return typeof input === "string";
      }
      function isFunction(input) {
        return typeof input === "function";
      }
      var index = {
        isNumber: isNumber,
        isPlainObject: isPlainObject,
        isArrayLike: isArrayLike,
        isObject: isObject2,
        isDefined: isDefined,
        isUndefined: isUndefined,
        isNull: isNull,
        isDefinedValue: isDefinedValue,
        isClass: isClass,
        isPrimitive: isPrimitive,
        isPromise: isPromise,
        isIterable: isIterable,
        isString: isString,
        isFunction: isFunction
      };
      exports2["default"] = index;
      exports2.isArrayLike = isArrayLike;
      exports2.isClass = isClass;
      exports2.isDefined = isDefined;
      exports2.isDefinedValue = isDefinedValue;
      exports2.isFunction = isFunction;
      exports2.isIterable = isIterable;
      exports2.isNull = isNull;
      exports2.isNumber = isNumber;
      exports2.isObject = isObject2;
      exports2.isPlainObject = isPlainObject;
      exports2.isPrimitive = isPrimitive;
      exports2.isPromise = isPromise;
      exports2.isString = isString;
      exports2.isUndefined = isUndefined;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  }
});

// node_modules/table-layout/lib/cell.js
var require_cell = __commonJS({
  "node_modules/table-layout/lib/cell.js": function node_modulesTableLayoutLibCellJs(exports, module2) {
    var t = require_dist4();
    var _value = /* @__PURE__ */new WeakMap();
    var _column = /* @__PURE__ */new WeakMap();
    var Cell = /*#__PURE__*/function () {
      function Cell(value, column) {
        _classCallCheck(this, Cell);
        this.value = value;
        _column.set(this, column);
      }
      _createClass(Cell, [{
        key: "value",
        get: function get() {
          var cellValue = _value.get(this);
          if (typeof cellValue === "function") cellValue = cellValue.call(_column.get(this));
          if (cellValue === void 0) {
            cellValue = "";
          } else {
            cellValue = String(cellValue);
          }
          return cellValue;
        },
        set: function set(val) {
          _value.set(this, val);
        }
      }]);
      return Cell;
    }();
    module2.exports = Cell;
  }
});

// node_modules/table-layout/lib/rows.js
var require_rows = __commonJS({
  "node_modules/table-layout/lib/rows.js": function node_modulesTableLayoutLibRowsJs(exports, module2) {
    var arrayify = require_dist3();
    var Cell = require_cell();
    var t = require_dist4();
    var Rows = /*#__PURE__*/function () {
      function Rows(rows, columns) {
        _classCallCheck(this, Rows);
        this.list = [];
        this.load(rows, columns);
      }
      _createClass(Rows, [{
        key: "load",
        value: function load(rows, columns) {
          var _this4 = this;
          arrayify(rows).forEach(function (row) {
            _this4.list.push(new Map(objectToIterable(row, columns)));
          });
        }
      }], [{
        key: "removeEmptyColumns",
        value: function removeEmptyColumns(data) {
          var distinctColumnNames = data.reduce(function (columnNames, row) {
            Object.keys(row).forEach(function (key) {
              if (columnNames.indexOf(key) === -1) columnNames.push(key);
            });
            return columnNames;
          }, []);
          var emptyColumns = distinctColumnNames.filter(function (columnName) {
            var hasValue = data.some(function (row) {
              var value = row[columnName];
              return t.isDefined(value) && typeof value !== "string" || typeof value === "string" && /\S+/.test(value);
            });
            return !hasValue;
          });
          return data.map(function (row) {
            emptyColumns.forEach(function (emptyCol) {
              return delete row[emptyCol];
            });
            return row;
          });
        }
      }]);
      return Rows;
    }();
    function objectToIterable(row, columns) {
      return columns.list.map(function (column) {
        return [column, new Cell(row[column.name], column)];
      });
    }
    module2.exports = Rows;
  }
});

// node_modules/table-layout/lib/padding.js
var require_padding = __commonJS({
  "node_modules/table-layout/lib/padding.js": function node_modulesTableLayoutLibPaddingJs(exports, module2) {
    var Padding = /*#__PURE__*/function () {
      function Padding(padding) {
        _classCallCheck(this, Padding);
        this.left = padding.left;
        this.right = padding.right;
      }
      _createClass(Padding, [{
        key: "length",
        value: function length() {
          return this.left.length + this.right.length;
        }
      }]);
      return Padding;
    }();
    module2.exports = Padding;
  }
});

// node_modules/table-layout/lib/column.js
var require_column = __commonJS({
  "node_modules/table-layout/lib/column.js": function node_modulesTableLayoutLibColumnJs(exports, module2) {
    var t = require_dist4();
    var Padding = require_padding();
    var _padding = /* @__PURE__ */new WeakMap();
    var Column = /*#__PURE__*/function () {
      function Column(column) {
        _classCallCheck(this, Column);
        if (t.isDefined(column.name)) this.name = column.name;
        if (t.isDefined(column.width)) this.width = column.width;
        if (t.isDefined(column.maxWidth)) this.maxWidth = column.maxWidth;
        if (t.isDefined(column.minWidth)) this.minWidth = column.minWidth;
        if (t.isDefined(column.noWrap)) this.noWrap = column.noWrap;
        if (t.isDefined(column["break"])) this["break"] = column["break"];
        if (t.isDefined(column.contentWrappable)) this.contentWrappable = column.contentWrappable;
        if (t.isDefined(column.contentWidth)) this.contentWidth = column.contentWidth;
        if (t.isDefined(column.minContentWidth)) this.minContentWidth = column.minContentWidth;
        this.padding = column.padding || {
          left: " ",
          right: " "
        };
        this.generatedWidth = null;
      }
      _createClass(Column, [{
        key: "padding",
        get: function get() {
          return _padding.get(this);
        },
        set: function set(padding) {
          _padding.set(this, new Padding(padding));
        }
      }, {
        key: "wrappedContentWidth",
        get: function get() {
          return Math.max(this.generatedWidth - this.padding.length(), 0);
        }
      }, {
        key: "isResizable",
        value: function isResizable() {
          return !this.isFixed();
        }
      }, {
        key: "isFixed",
        value: function isFixed() {
          return t.isDefined(this.width) || this.noWrap || !this.contentWrappable;
        }
      }, {
        key: "generateWidth",
        value: function generateWidth() {
          this.generatedWidth = this.width || this.contentWidth + this.padding.length();
        }
      }, {
        key: "generateMinWidth",
        value: function generateMinWidth() {
          this.minWidth = this.minContentWidth + this.padding.length();
        }
      }]);
      return Column;
    }();
    module2.exports = Column;
  }
});

// node_modules/wordwrapjs/node_modules/typical/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/wordwrapjs/node_modules/typical/dist/index.js": function node_modulesWordwrapjsNode_modulesTypicalDistIndexJs(exports, module2) {
    (function (global2, factory) {
      _typeof(exports) === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.typical = {}));
    })(exports, function (exports2) {
      "use strict";

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function isPlainObject(input) {
        return input !== null && _typeof(input) === "object" && input.constructor === Object;
      }
      function isArrayLike(input) {
        return isObject2(input) && typeof input.length === "number";
      }
      function isObject2(input) {
        return _typeof(input) === "object" && input !== null;
      }
      function isDefined(input) {
        return typeof input !== "undefined";
      }
      function isUndefined(input) {
        return !isDefined(input);
      }
      function isNull(input) {
        return input === null;
      }
      function isDefinedValue(input) {
        return isDefined(input) && !isNull(input) && !Number.isNaN(input);
      }
      function isClass(input) {
        if (typeof input === "function") {
          return /^class /.test(Function.prototype.toString.call(input));
        } else {
          return false;
        }
      }
      function isPrimitive(input) {
        if (input === null) return true;
        switch (_typeof(input)) {
          case "string":
          case "number":
          case "symbol":
          case "undefined":
          case "boolean":
            return true;
          default:
            return false;
        }
      }
      function isPromise(input) {
        if (input) {
          var isPromise2 = isDefined(Promise) && input instanceof Promise;
          var isThenable = input.then && typeof input.then === "function";
          return !!(isPromise2 || isThenable);
        } else {
          return false;
        }
      }
      function isIterable(input) {
        if (input === null || !isDefined(input)) {
          return false;
        } else {
          return typeof input[Symbol.iterator] === "function" || typeof input[Symbol.asyncIterator] === "function";
        }
      }
      function isString(input) {
        return typeof input === "string";
      }
      function isFunction(input) {
        return typeof input === "function";
      }
      var index = {
        isNumber: isNumber,
        isPlainObject: isPlainObject,
        isArrayLike: isArrayLike,
        isObject: isObject2,
        isDefined: isDefined,
        isUndefined: isUndefined,
        isNull: isNull,
        isDefinedValue: isDefinedValue,
        isClass: isClass,
        isPrimitive: isPrimitive,
        isPromise: isPromise,
        isIterable: isIterable,
        isString: isString,
        isFunction: isFunction
      };
      exports2["default"] = index;
      exports2.isArrayLike = isArrayLike;
      exports2.isClass = isClass;
      exports2.isDefined = isDefined;
      exports2.isDefinedValue = isDefinedValue;
      exports2.isFunction = isFunction;
      exports2.isIterable = isIterable;
      exports2.isNull = isNull;
      exports2.isNumber = isNumber;
      exports2.isObject = isObject2;
      exports2.isPlainObject = isPlainObject;
      exports2.isPrimitive = isPrimitive;
      exports2.isPromise = isPromise;
      exports2.isString = isString;
      exports2.isUndefined = isUndefined;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  }
});

// node_modules/reduce-flatten/index.js
var require_reduce_flatten = __commonJS({
  "node_modules/reduce-flatten/index.js": function node_modulesReduceFlattenIndexJs(exports, module2) {
    module2.exports = flatten2;
    function flatten2(prev, curr) {
      return prev.concat(curr);
    }
  }
});

// node_modules/wordwrapjs/index.js
var require_wordwrapjs = __commonJS({
  "node_modules/wordwrapjs/index.js": function node_modulesWordwrapjsIndexJs(exports, module2) {
    var os = require("os");
    var t = require_dist5();
    var re = {
      chunk: /[^\s-]+?-\b|\S+|\s+|\r\n?|\n/g,
      ansiEscapeSequence: /\u001b.*?m/g
    };
    var WordWrap = /*#__PURE__*/function () {
      function WordWrap(text, options) {
        _classCallCheck(this, WordWrap);
        options = options || {};
        if (!t.isDefined(text)) text = "";
        this._lines = String(text).split(/\r\n|\n/g);
        this.options = options;
        this.options.width = options.width === void 0 ? 30 : options.width;
      }
      _createClass(WordWrap, [{
        key: "lines",
        value: function lines() {
          var _this5 = this;
          var flatten2 = require_reduce_flatten();
          return this._lines.map(trimLine.bind(this)).map(function (line) {
            return line.match(re.chunk) || ["~~empty~~"];
          }).map(function (lineWords) {
            if (_this5.options["break"]) {
              return lineWords.map(breakWord.bind(_this5));
            } else {
              return lineWords;
            }
          }).map(function (lineWords) {
            return lineWords.reduce(flatten2, []);
          }).map(function (lineWords) {
            return lineWords.reduce(function (lines, word) {
              var currentLine = lines[lines.length - 1];
              if (replaceAnsi(word).length + replaceAnsi(currentLine).length > _this5.options.width) {
                lines.push(word);
              } else {
                lines[lines.length - 1] += word;
              }
              return lines;
            }, [""]);
          }).reduce(flatten2, []).map(trimLine.bind(this)).filter(function (line) {
            return line.trim();
          }).map(function (line) {
            return line.replace("~~empty~~", "");
          });
        }
      }, {
        key: "wrap",
        value: function wrap() {
          return this.lines().join(os.EOL);
        }
      }, {
        key: "toString",
        value: function toString() {
          return this.wrap();
        }
      }], [{
        key: "wrap",
        value: function wrap(text, options) {
          var block = new this(text, options);
          return block.wrap();
        }
      }, {
        key: "lines",
        value: function lines(text, options) {
          var block = new this(text, options);
          return block.lines();
        }
      }, {
        key: "isWrappable",
        value: function isWrappable(text) {
          if (t.isDefined(text)) {
            text = String(text);
            var matches = text.match(re.chunk);
            return matches ? matches.length > 1 : false;
          }
        }
      }, {
        key: "getChunks",
        value: function getChunks(text) {
          return text.match(re.chunk) || [];
        }
      }]);
      return WordWrap;
    }();
    function trimLine(line) {
      return this.options.noTrim ? line : line.trim();
    }
    function replaceAnsi(string) {
      return string.replace(re.ansiEscapeSequence, "");
    }
    function breakWord(word) {
      if (replaceAnsi(word).length > this.options.width) {
        var letters = word.split("");
        var piece;
        var pieces = [];
        while ((piece = letters.splice(0, this.options.width)).length) {
          pieces.push(piece.join(""));
        }
        return pieces;
      } else {
        return word;
      }
    }
    module2.exports = WordWrap;
  }
});

// node_modules/table-layout/lib/ansi.js
var require_ansi = __commonJS({
  "node_modules/table-layout/lib/ansi.js": function node_modulesTableLayoutLibAnsiJs(exports) {
    var ansiEscapeSequence = /\u001b.*?m/g;
    exports.remove = remove;
    exports.has = has;
    function remove(input) {
      return input.replace(ansiEscapeSequence, "");
    }
    function has(input) {
      return ansiEscapeSequence.test(input);
    }
  }
});

// node_modules/table-layout/lib/columns.js
var require_columns = __commonJS({
  "node_modules/table-layout/lib/columns.js": function node_modulesTableLayoutLibColumnsJs(exports, module2) {
    var t = require_dist4();
    var arrayify = require_dist3();
    var Column = require_column();
    var wrap = require_wordwrapjs();
    var Cell = require_cell();
    var ansi = require_ansi();
    var _maxWidth = /* @__PURE__ */new WeakMap();
    var Columns = /*#__PURE__*/function () {
      function Columns(columns) {
        _classCallCheck(this, Columns);
        this.list = [];
        arrayify(columns).forEach(this.add.bind(this));
      }
      _createClass(Columns, [{
        key: "totalWidth",
        value: function totalWidth() {
          return this.list.length ? this.list.map(function (col) {
            return col.generatedWidth;
          }).reduce(function (a, b) {
            return a + b;
          }) : 0;
        }
      }, {
        key: "totalFixedWidth",
        value: function totalFixedWidth() {
          return this.getFixed().map(function (col) {
            return col.generatedWidth;
          }).reduce(function (a, b) {
            return a + b;
          }, 0);
        }
      }, {
        key: "get",
        value: function get(columnName) {
          return this.list.find(function (column) {
            return column.name === columnName;
          });
        }
      }, {
        key: "getResizable",
        value: function getResizable() {
          return this.list.filter(function (column) {
            return column.isResizable();
          });
        }
      }, {
        key: "getFixed",
        value: function getFixed() {
          return this.list.filter(function (column) {
            return column.isFixed();
          });
        }
      }, {
        key: "add",
        value: function add(column) {
          var col = column instanceof Column ? column : new Column(column);
          this.list.push(col);
          return col;
        }
      }, {
        key: "maxWidth",
        set: function set(val) {
          _maxWidth.set(this, val);
        }
      }, {
        key: "autoSize",
        value: function autoSize() {
          var maxWidth = _maxWidth.get(this);
          this.list.forEach(function (column) {
            column.generateWidth();
            column.generateMinWidth();
          });
          this.list.forEach(function (column) {
            if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
              column.generatedWidth = column.maxWidth;
            }
            if (t.isDefined(column.minWidth) && column.generatedWidth < column.minWidth) {
              column.generatedWidth = column.minWidth;
            }
          });
          var width = {
            total: this.totalWidth(),
            view: maxWidth,
            diff: this.totalWidth() - maxWidth,
            totalFixed: this.totalFixedWidth(),
            totalResizable: Math.max(maxWidth - this.totalFixedWidth(), 0)
          };
          if (width.diff > 0) {
            var resizableColumns = this.getResizable();
            resizableColumns.forEach(function (column) {
              column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length);
            });
            var grownColumns = this.list.filter(function (column) {
              return column.generatedWidth > column.contentWidth;
            });
            var shrunkenColumns = this.list.filter(function (column) {
              return column.generatedWidth < column.contentWidth;
            });
            var salvagedSpace = 0;
            grownColumns.forEach(function (column) {
              var currentGeneratedWidth = column.generatedWidth;
              column.generateWidth();
              salvagedSpace += currentGeneratedWidth - column.generatedWidth;
            });
            shrunkenColumns.forEach(function (column) {
              column.generatedWidth += Math.floor(salvagedSpace / shrunkenColumns.length);
            });
          }
          return this;
        }
      }], [{
        key: "getColumns",
        value: function getColumns(rows) {
          var columns = new Columns();
          arrayify(rows).forEach(function (row) {
            for (var columnName in row) {
              var column = columns.get(columnName);
              if (!column) {
                column = columns.add({
                  name: columnName,
                  contentWidth: 0,
                  minContentWidth: 0
                });
              }
              var cell = new Cell(row[columnName], column);
              var cellValue = cell.value;
              if (ansi.has(cellValue)) {
                cellValue = ansi.remove(cellValue);
              }
              if (cellValue.length > column.contentWidth) column.contentWidth = cellValue.length;
              var longestWord = getLongestWord(cellValue);
              if (longestWord > column.minContentWidth) {
                column.minContentWidth = longestWord;
              }
              if (!column.contentWrappable) column.contentWrappable = wrap.isWrappable(cellValue);
            }
          });
          return columns;
        }
      }]);
      return Columns;
    }();
    function getLongestWord(line) {
      var words = wrap.getChunks(line);
      return words.reduce(function (max, word) {
        return Math.max(word.length, max);
      }, 0);
    }
    module2.exports = Columns;
  }
});

// node_modules/table-layout/index.js
var require_table_layout = __commonJS({
  "node_modules/table-layout/index.js": function node_modulesTableLayoutIndexJs(exports, module2) {
    var os = require("os");
    var Table = /*#__PURE__*/function () {
      function Table(data, options) {
        _classCallCheck(this, Table);
        var ttyWidth = process && (process.stdout.columns || process.stderr.columns) || 0;
        if (ttyWidth && os.platform() === "win32") ttyWidth--;
        var defaults = {
          padding: {
            left: " ",
            right: " "
          },
          maxWidth: ttyWidth || 80,
          columns: []
        };
        var extend = require_deep_extend();
        this.options = extend(defaults, options);
        this.load(data);
      }
      _createClass(Table, [{
        key: "load",
        value: function load(data) {
          var _this6 = this;
          var Rows = require_rows();
          var Columns = require_columns();
          var options = this.options;
          if (options.ignoreEmptyColumns) {
            data = Rows.removeEmptyColumns(data);
          }
          this.columns = Columns.getColumns(data);
          this.rows = new Rows(data, this.columns);
          this.columns.maxWidth = options.maxWidth;
          this.columns.list.forEach(function (column) {
            if (options.padding) column.padding = options.padding;
            if (options.noWrap) column.noWrap = options.noWrap;
            if (options["break"]) {
              column["break"] = options["break"];
              column.contentWrappable = true;
            }
          });
          options.columns.forEach(function (optionColumn) {
            var column = _this6.columns.get(optionColumn.name);
            if (column) {
              if (optionColumn.padding) {
                column.padding.left = optionColumn.padding.left;
                column.padding.right = optionColumn.padding.right;
              }
              if (optionColumn.width) column.width = optionColumn.width;
              if (optionColumn.maxWidth) column.maxWidth = optionColumn.maxWidth;
              if (optionColumn.minWidth) column.minWidth = optionColumn.minWidth;
              if (optionColumn.noWrap) column.noWrap = optionColumn.noWrap;
              if (optionColumn["break"]) {
                column["break"] = optionColumn["break"];
                column.contentWrappable = true;
              }
            }
          });
          this.columns.autoSize();
          return this;
        }
      }, {
        key: "getWrapped",
        value: function getWrapped() {
          var _this7 = this;
          var wrap = require_wordwrapjs();
          this.columns.autoSize();
          return this.rows.list.map(function (row) {
            var line = [];
            row.forEach(function (cell, column) {
              if (column.noWrap) {
                line.push(cell.value.split(/\r\n?|\n/));
              } else {
                line.push(wrap.lines(cell.value, {
                  width: column.wrappedContentWidth,
                  "break": column["break"],
                  noTrim: _this7.options.noTrim
                }));
              }
            });
            return line;
          });
        }
      }, {
        key: "getLines",
        value: function getLines() {
          var wrappedLines = this.getWrapped();
          var lines = [];
          wrappedLines.forEach(function (wrapped) {
            var mostLines = getLongestArray(wrapped);
            var _loop5 = function _loop5(i) {
              var line = [];
              wrapped.forEach(function (cell) {
                line.push(cell[i] || "");
              });
              lines.push(line);
            };
            for (var i = 0; i < mostLines; i++) {
              _loop5(i);
            }
          });
          return lines;
        }
      }, {
        key: "renderLines",
        value: function renderLines() {
          var _this8 = this;
          var lines = this.getLines();
          return lines.map(function (line) {
            return line.reduce(function (prev, cell, index) {
              var column = _this8.columns.list[index];
              return prev + padCell(cell, column.padding, column.generatedWidth);
            }, "");
          });
        }
      }, {
        key: "toString",
        value: function toString() {
          return this.renderLines().join(os.EOL) + os.EOL;
        }
      }]);
      return Table;
    }();
    function getLongestArray(arrays) {
      var lengths = arrays.map(function (array) {
        return array.length;
      });
      return Math.max.apply(null, lengths);
    }
    function padCell(cellValue, padding, width) {
      var ansi = require_ansi();
      var ansiLength = cellValue.length - ansi.remove(cellValue).length;
      cellValue = cellValue || "";
      return (padding.left || "") + cellValue.padEnd(width - padding.length() + ansiLength) + (padding.right || "");
    }
    module2.exports = Table;
  }
});

// node_modules/command-line-usage/lib/chalk-format.js
var require_chalk_format = __commonJS({
  "node_modules/command-line-usage/lib/chalk-format.js": function node_modulesCommandLineUsageLibChalkFormatJs(exports, module2) {
    function chalkFormat(str) {
      if (str) {
        str = str.replace(/`/g, "\\`");
        var chalk = require_chalk();
        return chalk(Object.assign([], {
          raw: [str]
        }));
      } else {
        return "";
      }
    }
    module2.exports = chalkFormat;
  }
});

// node_modules/command-line-usage/node_modules/typical/dist/index.js
var require_dist6 = __commonJS({
  "node_modules/command-line-usage/node_modules/typical/dist/index.js": function node_modulesCommandLineUsageNode_modulesTypicalDistIndexJs(exports, module2) {
    (function (global2, factory) {
      _typeof(exports) === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.typical = {}));
    })(exports, function (exports2) {
      "use strict";

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function isPlainObject(input) {
        return input !== null && _typeof(input) === "object" && input.constructor === Object;
      }
      function isArrayLike(input) {
        return isObject2(input) && typeof input.length === "number";
      }
      function isObject2(input) {
        return _typeof(input) === "object" && input !== null;
      }
      function isDefined(input) {
        return typeof input !== "undefined";
      }
      function isUndefined(input) {
        return !isDefined(input);
      }
      function isNull(input) {
        return input === null;
      }
      function isDefinedValue(input) {
        return isDefined(input) && !isNull(input) && !Number.isNaN(input);
      }
      function isClass(input) {
        if (typeof input === "function") {
          return /^class /.test(Function.prototype.toString.call(input));
        } else {
          return false;
        }
      }
      function isPrimitive(input) {
        if (input === null) return true;
        switch (_typeof(input)) {
          case "string":
          case "number":
          case "symbol":
          case "undefined":
          case "boolean":
            return true;
          default:
            return false;
        }
      }
      function isPromise(input) {
        if (input) {
          var isPromise2 = isDefined(Promise) && input instanceof Promise;
          var isThenable = input.then && typeof input.then === "function";
          return !!(isPromise2 || isThenable);
        } else {
          return false;
        }
      }
      function isIterable(input) {
        if (input === null || !isDefined(input)) {
          return false;
        } else {
          return typeof input[Symbol.iterator] === "function" || typeof input[Symbol.asyncIterator] === "function";
        }
      }
      function isString(input) {
        return typeof input === "string";
      }
      function isFunction(input) {
        return typeof input === "function";
      }
      var index = {
        isNumber: isNumber,
        isPlainObject: isPlainObject,
        isArrayLike: isArrayLike,
        isObject: isObject2,
        isDefined: isDefined,
        isUndefined: isUndefined,
        isNull: isNull,
        isDefinedValue: isDefinedValue,
        isClass: isClass,
        isPrimitive: isPrimitive,
        isPromise: isPromise,
        isIterable: isIterable,
        isString: isString,
        isFunction: isFunction
      };
      exports2["default"] = index;
      exports2.isArrayLike = isArrayLike;
      exports2.isClass = isClass;
      exports2.isDefined = isDefined;
      exports2.isDefinedValue = isDefinedValue;
      exports2.isFunction = isFunction;
      exports2.isIterable = isIterable;
      exports2.isNull = isNull;
      exports2.isNumber = isNumber;
      exports2.isObject = isObject2;
      exports2.isPlainObject = isPlainObject;
      exports2.isPrimitive = isPrimitive;
      exports2.isPromise = isPromise;
      exports2.isString = isString;
      exports2.isUndefined = isUndefined;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  }
});

// node_modules/command-line-usage/lib/section/option-list.js
var require_option_list = __commonJS({
  "node_modules/command-line-usage/lib/section/option-list.js": function node_modulesCommandLineUsageLibSectionOptionListJs(exports, module2) {
    var Section = require_section();
    var Table = require_table_layout();
    var chalk = require_chalk_format();
    var t = require_dist6();
    var arrayify = require_dist2();
    var OptionList = /*#__PURE__*/function (_Section) {
      _inherits(OptionList, _Section);
      var _super6 = _createSuper(OptionList);
      function OptionList(data) {
        var _this9;
        _classCallCheck(this, OptionList);
        _this9 = _super6.call(this);
        var definitions = arrayify(data.optionList);
        var hide = arrayify(data.hide);
        var groups = arrayify(data.group);
        if (hide.length) {
          definitions = definitions.filter(function (definition) {
            return hide.indexOf(definition.name) === -1;
          });
        }
        if (data.header) _this9.header(data.header);
        if (groups.length) {
          definitions = definitions.filter(function (def) {
            var noGroupMatch = groups.indexOf("_none") > -1 && !t.isDefined(def.group);
            var groupMatch = intersect(arrayify(def.group), groups);
            if (noGroupMatch || groupMatch) return def;
          });
        }
        var rows = definitions.map(function (def) {
          return {
            option: getOptionNames(def, data.reverseNameOrder),
            description: chalk(def.description)
          };
        });
        var tableOptions = data.tableOptions || {
          padding: {
            left: "  ",
            right: " "
          },
          columns: [{
            name: "option",
            noWrap: true
          }, {
            name: "description",
            maxWidth: 80
          }]
        };
        var table = new Table(rows, tableOptions);
        _this9.add(table.renderLines());
        _this9.add();
        return _this9;
      }
      return _createClass(OptionList);
    }(Section);
    function getOptionNames(definition, reverseNameOrder) {
      var type = definition.type ? definition.type.name.toLowerCase() : "string";
      var multiple = definition.multiple || definition.lazyMultiple ? "[]" : "";
      if (type) {
        type = type === "boolean" ? "" : "{underline ".concat(type).concat(multiple, "}");
      }
      type = chalk(definition.typeLabel || type);
      var result = "";
      if (definition.alias) {
        if (definition.name) {
          if (reverseNameOrder) {
            result = chalk("{bold --".concat(definition.name, "}, {bold -").concat(definition.alias, "} ").concat(type));
          } else {
            result = chalk("{bold -".concat(definition.alias, "}, {bold --").concat(definition.name, "} ").concat(type));
          }
        } else {
          if (reverseNameOrder) {
            result = chalk("{bold -".concat(definition.alias, "} ").concat(type));
          } else {
            result = chalk("{bold -".concat(definition.alias, "} ").concat(type));
          }
        }
      } else {
        result = chalk("{bold --".concat(definition.name, "} ").concat(type));
      }
      return result;
    }
    function intersect(arr1, arr2) {
      return arr1.some(function (item1) {
        return arr2.some(function (item2) {
          return item1 === item2;
        });
      });
    }
    module2.exports = OptionList;
  }
});

// node_modules/command-line-usage/lib/section/content.js
var require_content = __commonJS({
  "node_modules/command-line-usage/lib/section/content.js": function node_modulesCommandLineUsageLibSectionContentJs(exports, module2) {
    var Section = require_section();
    var t = require_dist6();
    var Table = require_table_layout();
    var chalkFormat = require_chalk_format();
    var ContentSection = /*#__PURE__*/function (_Section2) {
      _inherits(ContentSection, _Section2);
      var _super7 = _createSuper(ContentSection);
      function ContentSection(section) {
        var _this10;
        _classCallCheck(this, ContentSection);
        _this10 = _super7.call(this);
        _this10.header(section.header);
        if (section.content) {
          if (section.raw) {
            var arrayify = require_dist2();
            var content = arrayify(section.content).map(function (line) {
              return chalkFormat(line);
            });
            _this10.add(content);
          } else {
            _this10.add(getContentLines(section.content));
          }
          _this10.add();
        }
        return _this10;
      }
      return _createClass(ContentSection);
    }(Section);
    function getContentLines(content) {
      var defaultPadding = {
        left: "  ",
        right: " "
      };
      if (content) {
        if (t.isString(content)) {
          var table = new Table({
            column: chalkFormat(content)
          }, {
            padding: defaultPadding,
            maxWidth: 80
          });
          return table.renderLines();
        } else if (Array.isArray(content) && content.every(t.isString)) {
          var rows = content.map(function (string) {
            return {
              column: chalkFormat(string)
            };
          });
          var _table = new Table(rows, {
            padding: defaultPadding,
            maxWidth: 80
          });
          return _table.renderLines();
        } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
          var _table2 = new Table(content.map(function (row) {
            return ansiFormatRow(row);
          }), {
            padding: defaultPadding
          });
          return _table2.renderLines();
        } else if (t.isPlainObject(content)) {
          if (!content.options || !content.data) {
            throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content));
          }
          var options = Object.assign({
            padding: defaultPadding
          }, content.options);
          if (options.columns) {
            options.columns = options.columns.map(function (column) {
              if (column.nowrap) {
                column.noWrap = column.nowrap;
                delete column.nowrap;
              }
              return column;
            });
          }
          var _table3 = new Table(content.data.map(function (row) {
            return ansiFormatRow(row);
          }), options);
          return _table3.renderLines();
        } else {
          var message = "invalid input - 'content' must be a string, array of strings, or array of plain objects:\n\n".concat(JSON.stringify(content));
          throw new Error(message);
        }
      }
    }
    function ansiFormatRow(row) {
      for (var key in row) {
        row[key] = chalkFormat(row[key]);
      }
      return row;
    }
    module2.exports = ContentSection;
  }
});

// node_modules/command-line-usage/index.js
var require_command_line_usage = __commonJS({
  "node_modules/command-line-usage/index.js": function node_modulesCommandLineUsageIndexJs(exports, module2) {
    function commandLineUsage(sections) {
      var arrayify = require_dist2();
      sections = arrayify(sections);
      if (sections.length) {
        var OptionList = require_option_list();
        var ContentSection = require_content();
        var output = sections.map(function (section) {
          if (section.optionList) {
            return new OptionList(section);
          } else {
            return new ContentSection(section);
          }
        });
        return "\n" + output.join("\n");
      } else {
        return "";
      }
    }
    module2.exports = commandLineUsage;
  }
});

// node_modules/ts-command-line-args/dist/helpers/options.helper.js
var require_options_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/options.helper.js": function node_modulesTsCommandLineArgsDistHelpersOptionsHelperJs(exports) {
    "use strict";

    var __assign = exports && exports.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isBoolean = exports.mapDefinitionDetails = exports.addOptions = exports.generateTableFooter = exports.getOptionFooterSection = exports.getOptionSections = void 0;
    function getOptionSections(options) {
      return options.optionSections || [{
        header: options.optionsHeaderText || "Options",
        headerLevel: options.optionsHeaderLevel || 2
      }];
    }
    exports.getOptionSections = getOptionSections;
    function getOptionFooterSection(optionList, options) {
      var optionsFooter = generateTableFooter(optionList, options);
      if (optionsFooter != null) {
        console.log("Adding footer: " + optionsFooter);
        return [{
          content: optionsFooter
        }];
      }
      return [];
    }
    exports.getOptionFooterSection = getOptionFooterSection;
    function generateTableFooter(optionList, options) {
      if (options.addOptionalDefaultExplanatoryFooter != true || options.displayOptionalAndDefault != true) {
        return void 0;
      }
      var optionalProps = optionList.some(function (option) {
        return option.optional === true;
      });
      var defaultProps = optionList.some(function (option) {
        return option.defaultOption === true;
      });
      if (optionalProps || defaultProps) {
        var footerValues = [optionalProps != null ? "(O) = optional" : void 0, defaultProps != null ? "(D) = default option" : null];
        return footerValues.filter(function (v) {
          return v != null;
        }).join(", ");
      }
      return void 0;
    }
    exports.generateTableFooter = generateTableFooter;
    function addOptions(content, optionList, options) {
      optionList = optionList.map(function (option) {
        return mapDefinitionDetails(option, options);
      });
      return __assign(__assign({}, content), {
        optionList: optionList
      });
    }
    exports.addOptions = addOptions;
    function mapDefinitionDetails(definition, options) {
      definition = mapOptionTypeLabel(definition, options);
      definition = mapOptionDescription(definition, options);
      return definition;
    }
    exports.mapDefinitionDetails = mapDefinitionDetails;
    function mapOptionDescription(definition, options) {
      if (options.prependParamOptionsToDescription !== true || isBoolean(definition)) {
        return definition;
      }
      definition.description = definition.description || "";
      if (definition.defaultOption) {
        definition.description = "Default Option. " + definition.description;
      }
      if (definition.optional === true) {
        definition.description = "Optional. " + definition.description;
      }
      if (definition.defaultValue != null) {
        definition.description = "Defaults to " + JSON.stringify(definition.defaultValue) + ". " + definition.description;
      }
      return definition;
    }
    function mapOptionTypeLabel(definition, options) {
      if (options.displayOptionalAndDefault !== true || isBoolean(definition)) {
        return definition;
      }
      definition.typeLabel = definition.typeLabel || getTypeLabel(definition);
      if (definition.defaultOption) {
        definition.typeLabel = definition.typeLabel + " (D)";
      }
      if (definition.optional === true) {
        definition.typeLabel = definition.typeLabel + " (O)";
      }
      return definition;
    }
    function getTypeLabel(definition) {
      var typeLabel = definition.type ? definition.type.name.toLowerCase() : "string";
      var multiple = definition.multiple || definition.lazyMultiple ? "[]" : "";
      if (typeLabel) {
        typeLabel = typeLabel === "boolean" ? "" : "{underline " + typeLabel + multiple + "}";
      }
      return typeLabel;
    }
    function isBoolean(option) {
      return option.type.name === "Boolean";
    }
    exports.isBoolean = isBoolean;
  }
});

// node_modules/ts-command-line-args/dist/helpers/command-line.helper.js
var require_command_line_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/command-line.helper.js": function node_modulesTsCommandLineArgsDistHelpersCommandLineHelperJs(exports) {
    "use strict";

    var __assign = exports && exports.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArray = exports && exports.__spreadArray || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getBooleanValues = exports.removeBooleanValues = exports.mergeConfig = exports.normaliseConfig = exports.createCommandLineConfig = void 0;
    var options_helper_1 = require_options_helper();
    function createCommandLineConfig(config) {
      return Object.keys(config).map(function (key) {
        var argConfig = config[key];
        var definition = _typeof(argConfig) === "object" ? argConfig : {
          type: argConfig
        };
        return __assign({
          name: key
        }, definition);
      });
    }
    exports.createCommandLineConfig = createCommandLineConfig;
    function normaliseConfig(config) {
      Object.keys(config).forEach(function (key) {
        var argConfig = config[key];
        config[key] = _typeof(argConfig) === "object" ? argConfig : {
          type: argConfig
        };
      });
      return config;
    }
    exports.normaliseConfig = normaliseConfig;
    function mergeConfig(parsedConfig, parsedConfigWithoutDefaults, fileContent, options, jsonPath) {
      var configPath = jsonPath ? parsedConfig[jsonPath] : void 0;
      var configFromFile = resolveConfigFromFile(fileContent, configPath);
      if (configFromFile == null) {
        throw new Error("Could not resolve config object from specified file and path");
      }
      return __assign(__assign(__assign({}, parsedConfig), applyTypeConversion(configFromFile, options)), parsedConfigWithoutDefaults);
    }
    exports.mergeConfig = mergeConfig;
    function resolveConfigFromFile(configfromFile, configPath) {
      if (configPath == null || configPath == "") {
        return configfromFile;
      }
      var paths = configPath.split(".");
      var key = paths.shift();
      if (key == null) {
        return configfromFile;
      }
      var config = configfromFile[key];
      return resolveConfigFromFile(config, paths.join("."));
    }
    function applyTypeConversion(configfromFile, options) {
      var transformedParams = {};
      Object.keys(configfromFile).forEach(function (prop) {
        var key = prop;
        var argumentOptions = options[key];
        if (argumentOptions == null) {
          return;
        }
        var fileValue = configfromFile[key];
        if (argumentOptions.multiple || argumentOptions.lazyMultiple) {
          var fileArrayValue = Array.isArray(fileValue) ? fileValue : [fileValue];
          transformedParams[key] = fileArrayValue.map(function (arrayValue) {
            return convertType(arrayValue, argumentOptions);
          });
        } else {
          transformedParams[key] = convertType(fileValue, argumentOptions);
        }
      });
      return transformedParams;
    }
    function convertType(value, propOptions) {
      if (propOptions.type.name === "Boolean") {
        switch (value) {
          case "true":
            return propOptions.type(true);
          case "false":
            return propOptions.type(false);
        }
      }
      return propOptions.type(value);
    }
    var argNameRegExp = /^-{1,2}(\w+)(=(\w+))?$/;
    var booleanValue = ["1", "0", "true", "false"];
    function removeBooleanValues(args, config) {
      function removeBooleanArgs(argsAndLastValue, arg) {
        var _a = getParamConfig(arg, config),
          argOptions = _a.argOptions,
          argValue = _a.argValue;
        var lastOption = argsAndLastValue.lastOption;
        if (lastOption != null && options_helper_1.isBoolean(lastOption) && booleanValue.some(function (boolValue) {
          return boolValue === arg;
        })) {
          var args_1 = argsAndLastValue.args.concat();
          args_1.pop();
          return {
            args: args_1
          };
        } else if (argOptions != null && options_helper_1.isBoolean(argOptions) && argValue != null) {
          return {
            args: argsAndLastValue.args
          };
        } else {
          return {
            args: __spreadArray(__spreadArray([], argsAndLastValue.args), [arg]),
            lastOption: argOptions
          };
        }
      }
      return args.reduce(removeBooleanArgs, {
        args: []
      }).args;
    }
    exports.removeBooleanValues = removeBooleanValues;
    function getBooleanValues(args, config) {
      function getBooleanValues2(argsAndLastOption, arg) {
        var _a = getParamConfig(arg, config),
          argOptions = _a.argOptions,
          argName = _a.argName,
          argValue = _a.argValue;
        var lastOption = argsAndLastOption.lastOption;
        if (argOptions != null && options_helper_1.isBoolean(argOptions) && argValue != null && argName != null) {
          argsAndLastOption.partial[argName] = convertType(argValue, argOptions);
        } else if (argsAndLastOption.lastName != null && lastOption != null && options_helper_1.isBoolean(lastOption) && booleanValue.some(function (boolValue) {
          return boolValue === arg;
        })) {
          argsAndLastOption.partial[argsAndLastOption.lastName] = convertType(arg, lastOption);
        }
        return {
          partial: argsAndLastOption.partial,
          lastName: argName,
          lastOption: argOptions
        };
      }
      return args.reduce(getBooleanValues2, {
        partial: {}
      }).partial;
    }
    exports.getBooleanValues = getBooleanValues;
    function getParamConfig(arg, config) {
      var regExpResult = argNameRegExp.exec(arg);
      if (regExpResult == null) {
        return {};
      }
      var nameOrAlias = regExpResult[1];
      for (var argName in config) {
        var argConfig = config[argName];
        if (argName === nameOrAlias || argConfig.alias === nameOrAlias) {
          return {
            argOptions: argConfig,
            argName: argName,
            argValue: regExpResult[3]
          };
        }
      }
      return {};
    }
  }
});

// node_modules/ts-command-line-args/dist/write-markdown.constants.js
var require_write_markdown_constants = __commonJS({
  "node_modules/ts-command-line-args/dist/write-markdown.constants.js": function node_modulesTsCommandLineArgsDistWriteMarkdownConstantsJs(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.usageGuideInfo = exports.parseOptions = exports.argumentConfig = exports.footerReplaceBelowMarker = exports.configImportNameDefault = exports.copyCodeAboveDefault = exports.copyCodeBelowDefault = exports.insertCodeAboveDefault = exports.insertCodeBelowDefault = exports.replaceAboveDefault = exports.replaceBelowDefault = void 0;
    exports.replaceBelowDefault = "[//]: ####ts-command-line-args_write-markdown_replaceBelow";
    exports.replaceAboveDefault = "[//]: ####ts-command-line-args_write-markdown_replaceAbove";
    exports.insertCodeBelowDefault = "[//]: # (ts-command-line-args_write-markdown_insertCodeBelow";
    exports.insertCodeAboveDefault = "[//]: # (ts-command-line-args_write-markdown_insertCodeAbove)";
    exports.copyCodeBelowDefault = "// ts-command-line-args_write-markdown_copyCodeBelow";
    exports.copyCodeAboveDefault = "// ts-command-line-args_write-markdown_copyCodeAbove";
    exports.configImportNameDefault = "usageGuideInfo";
    exports.footerReplaceBelowMarker = "[//]: ####ts-command-line-args_generated-by-footer";
    exports.argumentConfig = {
      markdownPath: {
        type: String,
        alias: "m",
        defaultOption: true,
        description: "The file to write to. Without replacement markers the whole file content will be replaced. Path can be absolute or relative."
      },
      replaceBelow: {
        type: String,
        defaultValue: exports.replaceBelowDefault,
        description: "A marker in the file to replace text below.",
        optional: true
      },
      replaceAbove: {
        type: String,
        defaultValue: exports.replaceAboveDefault,
        description: "A marker in the file to replace text above.",
        optional: true
      },
      insertCodeBelow: {
        type: String,
        defaultValue: exports.insertCodeBelowDefault,
        description: "A marker in the file to insert code below. File path to insert must be added at the end of the line and optionally codeComment flag: 'insertToken file=\"path/toFile.md\" codeComment=\"ts\"'",
        optional: true
      },
      insertCodeAbove: {
        type: String,
        defaultValue: exports.insertCodeAboveDefault,
        description: "A marker in the file to insert code above.",
        optional: true
      },
      copyCodeBelow: {
        type: String,
        defaultValue: exports.copyCodeBelowDefault,
        description: "A marker in the file being inserted to say only copy code below this line",
        optional: true
      },
      copyCodeAbove: {
        type: String,
        defaultValue: exports.copyCodeAboveDefault,
        description: "A marker in the file being inserted to say only copy code above this line",
        optional: true
      },
      jsFile: {
        type: String,
        optional: true,
        alias: "j",
        description: "jsFile to 'require' that has an export with the 'UsageGuideConfig' export. Multiple files can be specified.",
        multiple: true
      },
      configImportName: {
        type: String,
        alias: "c",
        defaultValue: [exports.configImportNameDefault],
        description: "Export name of the 'UsageGuideConfig' object. Defaults to '" + exports.configImportNameDefault + "'. Multiple exports can be specified.",
        multiple: true
      },
      verify: {
        type: Boolean,
        alias: "v",
        description: "Verify the markdown file. Does not update the file but returns a non zero exit code if the markdown file is not correct. Useful for a pre-publish script."
      },
      configFile: {
        type: String,
        alias: "f",
        optional: true,
        description: "Optional config file to load config from. package.json can be used if jsonPath specified as well"
      },
      jsonPath: {
        type: String,
        alias: "p",
        optional: true,
        description: "Used in conjunction with 'configFile'. The path within the config file to load the config from. For example: 'configs.writeMarkdown'"
      },
      verifyMessage: {
        type: String,
        optional: true,
        description: "Optional message that is printed when markdown verification fails. Use '\\{fileName\\}' to refer to the file being processed."
      },
      removeDoubleBlankLines: {
        type: Boolean,
        description: "When replacing content removes any more than a single blank line"
      },
      skipFooter: {
        type: Boolean,
        description: "Does not add the 'Markdown Generated by...' footer to the end of the markdown"
      },
      help: {
        type: Boolean,
        alias: "h",
        description: "Show this usage guide."
      }
    };
    exports.parseOptions = {
      helpArg: "help",
      loadFromFileArg: "configFile",
      loadFromFileJsonPathArg: "jsonPath",
      baseCommand: "write-markdown",
      optionsHeaderLevel: 3,
      defaultSectionHeaderLevel: 3,
      optionsHeaderText: "write-markdown cli options",
      headerContentSections: [{
        header: "Markdown Generation",
        headerLevel: 2,
        content: "A markdown version of the usage guide can be generated and inserted into an existing markdown document.\nMarkers in the document describe where the content should be inserted, existing content betweeen the markers is overwritten."
      }, {
        content: "{highlight write-markdown -m README.MD -j usageGuideConstants.js}"
      }],
      footerContentSections: [{
        header: "Default Replacement Markers",
        content: "replaceBelow defaults to:\n{code '" + exports.replaceBelowDefault + "'}\nreplaceAbove defaults to:\n{code '" + exports.replaceAboveDefault + "'}\ninsertCodeBelow defaults to:\n{code '" + exports.insertCodeBelowDefault + "'}\ninsertCodeAbove defaults to:\n{code '" + exports.insertCodeAboveDefault + "'}\ncopyCodeBelow defaults to:\n{code '" + exports.copyCodeBelowDefault + "'}\ncopyCodeAbove defaults to:\n{code '" + exports.copyCodeAboveDefault + "'}"
      }]
    };
    exports.usageGuideInfo = {
      arguments: exports.argumentConfig,
      parseOptions: exports.parseOptions
    };
  }
});

// node_modules/ts-command-line-args/dist/helpers/line-ending.helper.js
var require_line_ending_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/line-ending.helper.js": function node_modulesTsCommandLineArgsDistHelpersLineEndingHelperJs(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.filterDoubleBlankLines = exports.splitContent = exports.findEscapeSequence = exports.getEscapeSequence = exports.lineEndings = void 0;
    var os_1 = require("os");
    exports.lineEndings = ["LF", "CRLF", "CR", "LFCR"];
    var multiCharRegExp = /(\r\n)|(\n\r)/g;
    var singleCharRegExp = /(\r)|(\n)/g;
    function getEscapeSequence(lineEnding) {
      switch (lineEnding) {
        case "CR":
          return "\r";
        case "CRLF":
          return "\r\n";
        case "LF":
          return "\n";
        case "LFCR":
          return "\n\r";
        default:
          return handleNever(lineEnding);
      }
    }
    exports.getEscapeSequence = getEscapeSequence;
    function handleNever(lineEnding) {
      throw new Error("Unknown line ending: '" + lineEnding + "'. Line Ending must be one of " + exports.lineEndings.join(", "));
    }
    function findEscapeSequence(content) {
      var multiCharMatch = multiCharRegExp.exec(content);
      if (multiCharMatch != null) {
        return multiCharMatch[0];
      }
      var singleCharMatch = singleCharRegExp.exec(content);
      if (singleCharMatch != null) {
        return singleCharMatch[0];
      }
      return os_1.EOL;
    }
    exports.findEscapeSequence = findEscapeSequence;
    function splitContent(content) {
      content = content.replace(multiCharRegExp, "\n");
      content = content.replace(singleCharRegExp, "\n");
      return content.split("\n");
    }
    exports.splitContent = splitContent;
    var nonWhitespaceRegExp = /[^ \t]/;
    function filterDoubleBlankLines(line, index, lines) {
      var previousLine = index > 0 ? lines[index - 1] : void 0;
      return nonWhitespaceRegExp.test(line) || previousLine == null || nonWhitespaceRegExp.test(previousLine);
    }
    exports.filterDoubleBlankLines = filterDoubleBlankLines;
  }
});

// node_modules/ts-command-line-args/dist/helpers/add-content.helper.js
var require_add_content_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/add-content.helper.js": function node_modulesTsCommandLineArgsDistHelpersAddContentHelperJs(exports) {
    "use strict";

    var __spreadArray = exports && exports.__spreadArray || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.addCommandLineArgsFooter = exports.addContent = void 0;
    var write_markdown_constants_1 = require_write_markdown_constants();
    var line_ending_helper_1 = require_line_ending_helper();
    function addContent(inputString, content, options) {
      var replaceBelow = options === null || options === void 0 ? void 0 : options.replaceBelow;
      var replaceAbove = options === null || options === void 0 ? void 0 : options.replaceAbove;
      content = Array.isArray(content) ? content : [content];
      var lineBreak = line_ending_helper_1.findEscapeSequence(inputString);
      var lines = line_ending_helper_1.splitContent(inputString);
      var replaceBelowLine = replaceBelow != null ? lines.filter(function (line) {
        return line.indexOf(replaceBelow) === 0;
      })[0] : void 0;
      var replaceBelowIndex = replaceBelowLine != null ? lines.indexOf(replaceBelowLine) : -1;
      var replaceAboveLine = replaceAbove != null ? lines.filter(function (line) {
        return line.indexOf(replaceAbove) === 0;
      })[0] : void 0;
      var replaceAboveIndex = replaceAboveLine != null ? lines.indexOf(replaceAboveLine) : -1;
      if (replaceAboveIndex > -1 && replaceBelowIndex > -1 && replaceAboveIndex < replaceBelowIndex) {
        throw new Error("The replaceAbove marker '" + options.replaceAbove + "' was found before the replaceBelow marker '" + options.replaceBelow + "'. The replaceBelow marked must be before the replaceAbove.");
      }
      var linesBefore = lines.slice(0, replaceBelowIndex + 1);
      var linesAfter = replaceAboveIndex >= 0 ? lines.slice(replaceAboveIndex) : [];
      var contentLines = content.reduce(function (lines2, currentContent) {
        return __spreadArray(__spreadArray([], lines2), line_ending_helper_1.splitContent(currentContent));
      }, new Array());
      var allLines = __spreadArray(__spreadArray(__spreadArray([], linesBefore), contentLines), linesAfter);
      if (options.removeDoubleBlankLines) {
        allLines = allLines.filter(function (line, index, lines2) {
          return line_ending_helper_1.filterDoubleBlankLines(line, index, lines2);
        });
      }
      return allLines.join(lineBreak);
    }
    exports.addContent = addContent;
    function addCommandLineArgsFooter(fileContent) {
      if (fileContent.indexOf(write_markdown_constants_1.footerReplaceBelowMarker) < 0) {
        fileContent = fileContent + "  \n\n" + write_markdown_constants_1.footerReplaceBelowMarker;
      }
      var footerContent = "Markdown Generated by [ts-command-line-args](https://www.npmjs.com/package/ts-command-line-args)";
      return addContent(fileContent, footerContent, {
        replaceBelow: write_markdown_constants_1.footerReplaceBelowMarker,
        removeDoubleBlankLines: false
      });
    }
    exports.addCommandLineArgsFooter = addCommandLineArgsFooter;
  }
});

// node_modules/ts-command-line-args/dist/helpers/string.helper.js
var require_string_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/string.helper.js": function node_modulesTsCommandLineArgsDistHelpersStringHelperJs(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.removeAdditionalFormatting = exports.convertChalkStringToMarkdown = void 0;
    var chalkStringStyleRegExp = /(?<!\\)\{([^}]+?)[ \n\r]([\s\S]+?[^\\])\}/gm;
    var newLineRegExp = /\n/g;
    var highlightModifier = "highlight";
    var codeModifier = "code";
    function convertChalkStringToMarkdown(input) {
      return input.replace(chalkStringStyleRegExp, replaceChalkFormatting).replace(newLineRegExp, "  \n").replace(/\\{/g, "{").replace(/\\}/g, "}");
    }
    exports.convertChalkStringToMarkdown = convertChalkStringToMarkdown;
    function replaceChalkFormatting(_substring) {
      var matches = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        matches[_i - 1] = arguments[_i];
      }
      var modifier = "";
      if (matches[0].indexOf(highlightModifier) >= 0) {
        modifier = "`";
      } else if (matches[0].indexOf(codeModifier) >= 0) {
        var codeOptions = matches[0].split(".");
        modifier = "\n```";
        if (codeOptions[1] != null) {
          return "" + modifier + codeOptions[1] + "\n" + matches[1] + modifier + "\n";
        } else {
          return modifier + "\n" + matches[1] + modifier + "\n";
        }
      } else {
        if (matches[0].indexOf("bold") >= 0) {
          modifier += "**";
        }
        if (matches[0].indexOf("italic") >= 0) {
          modifier += "*";
        }
      }
      return "" + modifier + matches[1] + modifier;
    }
    function removeAdditionalFormatting(input) {
      return input.replace(chalkStringStyleRegExp, removeNonChalkFormatting);
    }
    exports.removeAdditionalFormatting = removeAdditionalFormatting;
    function removeNonChalkFormatting(substring) {
      var matches = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        matches[_i - 1] = arguments[_i];
      }
      var nonChalkFormats = [highlightModifier, codeModifier];
      if (nonChalkFormats.some(function (format) {
        return matches[0].indexOf(format) >= 0;
      })) {
        return matches[1];
      }
      return substring;
    }
  }
});

// node_modules/ts-command-line-args/dist/helpers/markdown.helper.js
var require_markdown_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/markdown.helper.js": function node_modulesTsCommandLineArgsDistHelpersMarkdownHelperJs(exports) {
    "use strict";

    var __spreadArray = exports && exports.__spreadArray || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.loadArgConfig = exports.generateUsageGuides = exports.getType = exports.createOptionRow = exports.createHeading = exports.createOptionsSection = exports.createOptionsSections = exports.createSectionTable = exports.createSectionContent = exports.createSection = exports.createUsageGuide = void 0;
    var path_1 = require("path");
    var command_line_helper_1 = require_command_line_helper();
    var options_helper_1 = require_options_helper();
    var string_helper_1 = require_string_helper();
    function createUsageGuide(config) {
      var options = config.parseOptions || {};
      var headerSections = options.headerContentSections || [];
      var footerSections = options.footerContentSections || [];
      return __spreadArray(__spreadArray(__spreadArray([], headerSections.filter(filterMarkdownSections).map(function (section) {
        return createSection(section, config);
      })), createOptionsSections(config.arguments, options)), footerSections.filter(filterMarkdownSections).map(function (section) {
        return createSection(section, config);
      })).join("\n");
    }
    exports.createUsageGuide = createUsageGuide;
    function filterMarkdownSections(section) {
      return section.includeIn == null || section.includeIn === "both" || section.includeIn === "markdown";
    }
    function createSection(section, config) {
      var _a;
      return "\n" + createHeading(section, ((_a = config.parseOptions) === null || _a === void 0 ? void 0 : _a.defaultSectionHeaderLevel) || 1) + "\n" + createSectionContent(section) + "\n";
    }
    exports.createSection = createSection;
    function createSectionContent(section) {
      if (typeof section.content === "string") {
        return string_helper_1.convertChalkStringToMarkdown(section.content);
      }
      if (Array.isArray(section.content)) {
        if (section.content.every(function (content) {
          return typeof content === "string";
        })) {
          return section.content.map(string_helper_1.convertChalkStringToMarkdown).join("\n");
        } else if (section.content.every(function (content) {
          return _typeof(content) === "object";
        })) {
          return createSectionTable(section.content);
        }
      }
      return "";
    }
    exports.createSectionContent = createSectionContent;
    function createSectionTable(rows) {
      if (rows.length === 0) {
        return "";
      }
      var cellKeys = Object.keys(rows[0]);
      return "\n|" + cellKeys.map(function (key) {
        return " " + key + " ";
      }).join("|") + "|\n|" + cellKeys.map(function () {
        return "-";
      }).join("|") + "|\n" + rows.map(function (row) {
        return "| " + cellKeys.map(function (key) {
          return string_helper_1.convertChalkStringToMarkdown(row[key]);
        }).join(" | ") + " |";
      }).join("\n");
    }
    exports.createSectionTable = createSectionTable;
    function createOptionsSections(cliArguments, options) {
      var normalisedConfig = command_line_helper_1.normaliseConfig(cliArguments);
      var optionList = command_line_helper_1.createCommandLineConfig(normalisedConfig);
      if (optionList.length === 0) {
        return [];
      }
      return options_helper_1.getOptionSections(options).map(function (section) {
        return createOptionsSection(optionList, section, options);
      });
    }
    exports.createOptionsSections = createOptionsSections;
    function createOptionsSection(optionList, content, options) {
      optionList = optionList.filter(function (option) {
        return filterOptions(option, content.group);
      });
      var anyAlias = optionList.some(function (option) {
        return option.alias != null;
      });
      var anyDescription = optionList.some(function (option) {
        return option.description != null;
      });
      var footer = options_helper_1.generateTableFooter(optionList, options);
      return "\n" + createHeading(content, 2) + "\n| Argument |" + (anyAlias ? " Alias |" : "") + " Type |" + (anyDescription ? " Description |" : "") + "\n|-|" + (anyAlias ? "-|" : "") + "-|" + (anyDescription ? "-|" : "") + "\n" + optionList.map(function (option) {
        return options_helper_1.mapDefinitionDetails(option, options);
      }).map(function (option) {
        return createOptionRow(option, anyAlias, anyDescription);
      }).join("\n") + "\n" + (footer != null ? footer + "\n" : "");
    }
    exports.createOptionsSection = createOptionsSection;
    function filterOptions(option, groups) {
      return groups == null || typeof groups === "string" && (groups === option.group || groups === "_none" && option.group == null) || Array.isArray(groups) && (groups.some(function (group) {
        return group === option.group;
      }) || groups.some(function (group) {
        return group === "_none";
      }) && option.group == null);
    }
    function createHeading(section, defaultLevel) {
      if (section.header == null) {
        return "";
      }
      var headingLevel = Array.from({
        length: section.headerLevel || defaultLevel
      }).map(function () {
        return "#";
      }).join("");
      return headingLevel + " " + section.header + "\n";
    }
    exports.createHeading = createHeading;
    function createOptionRow(option, includeAlias, includeDescription) {
      if (includeAlias === void 0) {
        includeAlias = true;
      }
      if (includeDescription === void 0) {
        includeDescription = true;
      }
      var alias = includeAlias ? " " + (option.alias == null ? "" : "**" + option.alias + "** ") + "|" : "";
      var description = includeDescription ? " " + (option.description == null ? "" : string_helper_1.convertChalkStringToMarkdown(option.description) + " ") + "|" : "";
      return "| **" + option.name + "** |" + alias + " " + getType(option) + "|" + description;
    }
    exports.createOptionRow = createOptionRow;
    function getType(option) {
      if (option.typeLabel) {
        return string_helper_1.convertChalkStringToMarkdown(option.typeLabel) + " ";
      }
      var type = option.type ? option.type.name.toLowerCase() : "string";
      var multiple = option.multiple || option.lazyMultiple ? "[]" : "";
      return "" + type + multiple + " ";
    }
    exports.getType = getType;
    function generateUsageGuides(args) {
      if (args.jsFile == null) {
        console.log("No jsFile defined for usage guide generation. See 'write-markdown -h' for details on generating usage guides.");
        return void 0;
      }
      function mapJsImports(imports, jsFile) {
        return __spreadArray(__spreadArray([], imports), args.configImportName.map(function (importName) {
          return {
            jsFile: jsFile,
            importName: importName
          };
        }));
      }
      return args.jsFile.reduce(mapJsImports, new Array()).map(function (_a) {
        var jsFile = _a.jsFile,
          importName = _a.importName;
        return loadArgConfig(jsFile, importName);
      }).filter(isDefined).map(createUsageGuide);
    }
    exports.generateUsageGuides = generateUsageGuides;
    function loadArgConfig(jsFile, importName) {
      var jsPath = path_1.join(process.cwd(), jsFile);
      var jsExports = require(jsPath);
      var argConfig = jsExports[importName];
      if (argConfig == null) {
        console.warn("Could not import ArgumentConfig named '" + importName + "' from jsFile '" + jsFile + "'");
        return void 0;
      }
      return argConfig;
    }
    exports.loadArgConfig = loadArgConfig;
    function isDefined(value) {
      return value != null;
    }
  }
});

// node_modules/ts-command-line-args/dist/helpers/visitor.js
var require_visitor = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/visitor.js": function node_modulesTsCommandLineArgsDistHelpersVisitorJs(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.visit = void 0;
    function visit(value, callback) {
      if (Array.isArray(value)) {
        value.forEach(function (_, index) {
          return visitKey(index, value, callback);
        });
      } else {
        Object.keys(value).forEach(function (key) {
          return visitKey(key, value, callback);
        });
      }
      return value;
    }
    exports.visit = visit;
    function visitKey(key, parent, callback) {
      var keyValue = parent[key];
      parent[key] = callback(keyValue, key, parent);
      if (_typeof(keyValue) === "object") {
        visit(keyValue, callback);
      }
    }
  }
});

// node_modules/color-name/index.js
var require_color_name2 = __commonJS({
  "node_modules/color-name/index.js": function node_modulesColorNameIndexJs(exports, module2) {
    "use strict";

    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/color-convert/conversions.js
var require_conversions2 = __commonJS({
  "node_modules/color-convert/conversions.js": function node_modulesColorConvertConversionsJs(exports, module2) {
    var cssKeywords = require_color_name2();
    var reverseKeywords = {};
    for (var _i9 = 0, _Object$keys8 = Object.keys(cssKeywords); _i9 < _Object$keys8.length; _i9++) {
      var key = _Object$keys8[_i9];
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: {
        channels: 3,
        labels: "rgb"
      },
      hsl: {
        channels: 3,
        labels: "hsl"
      },
      hsv: {
        channels: 3,
        labels: "hsv"
      },
      hwb: {
        channels: 3,
        labels: "hwb"
      },
      cmyk: {
        channels: 4,
        labels: "cmyk"
      },
      xyz: {
        channels: 3,
        labels: "xyz"
      },
      lab: {
        channels: 3,
        labels: "lab"
      },
      lch: {
        channels: 3,
        labels: "lch"
      },
      hex: {
        channels: 1,
        labels: ["hex"]
      },
      keyword: {
        channels: 1,
        labels: ["keyword"]
      },
      ansi16: {
        channels: 1,
        labels: ["ansi16"]
      },
      ansi256: {
        channels: 1,
        labels: ["ansi256"]
      },
      hcg: {
        channels: 3,
        labels: ["h", "c", "g"]
      },
      apple: {
        channels: 3,
        labels: ["r16", "g16", "b16"]
      },
      gray: {
        channels: 1,
        labels: ["gray"]
      }
    };
    module2.exports = convert;
    for (var _i10 = 0, _Object$keys9 = Object.keys(convert); _i10 < _Object$keys9.length; _i10++) {
      var model = _Object$keys9[_i10];
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      var _convert$model = convert[model],
        channels = _convert$model.channels,
        labels = _convert$model.labels;
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", {
        value: channels
      });
      Object.defineProperty(convert[model], "labels", {
        value: labels
      });
    }
    convert.rgb.hsl = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h;
      var s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      var l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function (rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);
      var diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [h * 360, s * 100, v * 100];
    };
    convert.rgb.hwb = function (rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var k = Math.min(1 - r, 1 - g, 1 - b);
      var c = (1 - r - k) / (1 - k) || 0;
      var m = (1 - g - k) / (1 - k) || 0;
      var y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }
    convert.rgb.keyword = function (rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var _i11 = 0, _Object$keys10 = Object.keys(cssKeywords); _i11 < _Object$keys10.length; _i11++) {
        var keyword = _Object$keys10[_i11];
        var value = cssKeywords[keyword];
        var distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function (keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function (rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      var l = 116 * y - 16;
      var a = 500 * (x - y);
      var b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function (hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t2;
      var t3;
      var val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      var t1 = 2 * l - t2;
      var rgb = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function (hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      var v = (l + s) / 2;
      var sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function (hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function (hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var sl;
      var l;
      l = (2 - s) * v;
      var lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function (hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      var i = Math.floor(6 * h);
      var v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      var n = wh + f * (v - wh);
      var r;
      var g;
      var b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function (cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r = 1 - Math.min(1, c * (1 - k) + k);
      var g = 1 - Math.min(1, m * (1 - k) + k);
      var b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function (xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function (xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      var l = 116 * y - 16;
      var a = 500 * (x - y);
      var b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var h;
      var hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      var c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function (lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var hr = h / 360 * 2 * Math.PI;
      var a = c * Math.cos(hr);
      var b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function (args) {
      var saturation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var _args2 = _slicedToArray(args, 3),
        r = _args2[0],
        g = _args2[1],
        b = _args2[2];
      var value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function (args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function (args) {
      var color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function (args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function (args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function (args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      var colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map(function (_char2) {
          return _char2 + _char2;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r, g), b);
      var min = Math.min(Math.min(r, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function (hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      var f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function (hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function (hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
    };
    convert.hcg.hsv = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c) + 0.5 * c;
      var s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function (hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function (apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function (rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function (args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function (args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function (gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function (gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function (gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function (gray) {
      var val = Math.round(gray[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function (rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route2 = __commonJS({
  "node_modules/color-convert/route.js": function node_modulesColorConvertRouteJs(exports, module2) {
    var conversions = require_conversions2();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i = 0; i < len; i++) {
          var adjacent = adjacents[i];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function (args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path2 = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path2.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path2;
      return fn;
    }
    module2.exports = function (fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i = 0; i < len; i++) {
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert2 = __commonJS({
  "node_modules/color-convert/index.js": function node_modulesColorConvertIndexJs(exports, module2) {
    var conversions = require_conversions2();
    var route = require_route2();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function wrappedFn() {
        for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function wrappedFn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        var result = fn(args);
        if (_typeof(result) === "object") {
          for (var len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function (fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", {
        value: conversions[fromModel].channels
      });
      Object.defineProperty(convert[fromModel], "labels", {
        value: conversions[fromModel].labels
      });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function (toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles2 = __commonJS({
  "node_modules/ansi-styles/index.js": function node_modulesAnsiStylesIndexJs(exports, module2) {
    "use strict";

    var wrapAnsi16 = function wrapAnsi16(fn, offset) {
      return function () {
        var code = fn.apply(void 0, arguments);
        return "\x1B[".concat(code + offset, "m");
      };
    };
    var wrapAnsi256 = function wrapAnsi256(fn, offset) {
      return function () {
        var code = fn.apply(void 0, arguments);
        return "\x1B[".concat(38 + offset, ";5;").concat(code, "m");
      };
    };
    var wrapAnsi16m = function wrapAnsi16m(fn, offset) {
      return function () {
        var rgb = fn.apply(void 0, arguments);
        return "\x1B[".concat(38 + offset, ";2;").concat(rgb[0], ";").concat(rgb[1], ";").concat(rgb[2], "m");
      };
    };
    var ansi2ansi = function ansi2ansi(n) {
      return n;
    };
    var rgb2rgb = function rgb2rgb(r, g, b) {
      return [r, g, b];
    };
    var setLazyProperty = function setLazyProperty(object, property, _get2) {
      Object.defineProperty(object, property, {
        get: function get() {
          var value = _get2();
          Object.defineProperty(object, property, {
            value: value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = function makeDynamicStyles(wrap, targetSpace, identity, isBackground) {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert2();
      }
      var offset = isBackground ? 10 : 0;
      var styles = {};
      for (var _i12 = 0, _Object$entries = Object.entries(colorConvert); _i12 < _Object$entries.length; _i12++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i12], 2),
          sourceSpace = _Object$entries$_i[0],
          suite = _Object$entries$_i[1];
        var name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (_typeof(suite) === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      var codes = /* @__PURE__ */new Map();
      var styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (var _i13 = 0, _Object$entries2 = Object.entries(styles); _i13 < _Object$entries2.length; _i13++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i13], 2),
          groupName = _Object$entries2$_i[0],
          group = _Object$entries2$_i[1];
        for (var _i14 = 0, _Object$entries3 = Object.entries(group); _i14 < _Object$entries3.length; _i14++) {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i14], 2),
            styleName = _Object$entries3$_i[0],
            style = _Object$entries3$_i[1];
          styles[styleName] = {
            open: "\x1B[".concat(style[0], "m"),
            close: "\x1B[".concat(style[1], "m")
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", function () {
        return makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false);
      });
      setLazyProperty(styles.color, "ansi256", function () {
        return makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false);
      });
      setLazyProperty(styles.color, "ansi16m", function () {
        return makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false);
      });
      setLazyProperty(styles.bgColor, "ansi", function () {
        return makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true);
      });
      setLazyProperty(styles.bgColor, "ansi256", function () {
        return makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true);
      });
      setLazyProperty(styles.bgColor, "ansi16m", function () {
        return makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true);
      });
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/has-flag/index.js
var require_has_flag2 = __commonJS({
  "node_modules/has-flag/index.js": function node_modulesHasFlagIndexJs(exports, module2) {
    "use strict";

    module2.exports = function (flag) {
      var argv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.argv;
      var prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      var position = argv.indexOf(prefix + flag);
      var terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/chalk/node_modules/supports-color/index.js
var require_supports_color2 = __commonJS({
  "node_modules/chalk/node_modules/supports-color/index.js": function node_modulesChalkNode_modulesSupportsColorIndexJs(exports, module2) {
    "use strict";

    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag2();
    var _process = process,
      env = _process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      var min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        var osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some(function (sign) {
          return sign in env;
        }) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        var version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      var level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/chalk/source/util.js
var require_util = __commonJS({
  "node_modules/chalk/source/util.js": function node_modulesChalkSourceUtilJs(exports, module2) {
    "use strict";

    var stringReplaceAll = function stringReplaceAll(string, substring, replacer) {
      var index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      var substringLength = substring.length;
      var endIndex = 0;
      var returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var stringEncaseCRLFWithFirstIndex = function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
      var endIndex = 0;
      var returnValue = "";
      do {
        var gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    module2.exports = {
      stringReplaceAll: stringReplaceAll,
      stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex
    };
  }
});

// node_modules/chalk/source/templates.js
var require_templates2 = __commonJS({
  "node_modules/chalk/source/templates.js": function node_modulesChalkSourceTemplatesJs(exports, module2) {
    "use strict";

    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */new Map([["n", "\n"], ["r", "\r"], ["t", "	"], ["b", "\b"], ["f", "\f"], ["v", "\v"], ["0", "\0"], ["\\", "\\"], ["e", "\x1B"], ["a", "\x07"]]);
    function unescape(c) {
      var u = c[0] === "u";
      var bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      var results = [];
      var chunks = arguments_.trim().split(/\s*,\s*/g);
      var matches;
      var _iterator11 = _createForOfIteratorHelper(chunks),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var chunk = _step11.value;
          var number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if (matches = chunk.match(STRING_REGEX)) {
            results.push(matches[2].replace(ESCAPE_REGEX, function (m, escape, character) {
              return escape ? unescape(escape) : character;
            }));
          } else {
            throw new Error("Invalid Chalk template style argument: ".concat(chunk, " (in style '").concat(name, "')"));
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      var results = [];
      var matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        var name = matches[1];
        if (matches[2]) {
          var args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      var enabled = {};
      var _iterator12 = _createForOfIteratorHelper(styles),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var layer = _step12.value;
          var _iterator13 = _createForOfIteratorHelper(layer.styles),
            _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var style = _step13.value;
              enabled[style[0]] = layer.inverse ? null : style.slice(1);
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      var current = chalk;
      for (var _i15 = 0, _Object$entries4 = Object.entries(enabled); _i15 < _Object$entries4.length; _i15++) {
        var _current;
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i15], 2),
          styleName = _Object$entries4$_i[0],
          styles2 = _Object$entries4$_i[1];
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error("Unknown Chalk style: ".concat(styleName));
        }
        current = styles2.length > 0 ? (_current = current)[styleName].apply(_current, _toConsumableArray(styles2)) : current[styleName];
      }
      return current;
    }
    module2.exports = function (chalk, temporary) {
      var styles = [];
      var chunks = [];
      var chunk = [];
      temporary.replace(TEMPLATE_REGEX, function (m, escapeCharacter, inverse, style, close, character) {
        if (escapeCharacter) {
          chunk.push(unescape(escapeCharacter));
        } else if (style) {
          var string = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
          styles.push({
            inverse: inverse,
            styles: parseStyle(style)
          });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        var errMessage = "Chalk template literal is missing ".concat(styles.length, " closing bracket").concat(styles.length === 1 ? "" : "s", " (`}`)");
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  }
});

// node_modules/chalk/source/index.js
var require_source = __commonJS({
  "node_modules/chalk/source/index.js": function node_modulesChalkSourceIndexJs(exports, module2) {
    "use strict";

    var ansiStyles = require_ansi_styles2();
    var _require_supports_col = require_supports_color2(),
      stdoutColor = _require_supports_col.stdout,
      stderrColor = _require_supports_col.stderr;
    var _require_util = require_util(),
      stringReplaceAll = _require_util.stringReplaceAll,
      stringEncaseCRLFWithFirstIndex = _require_util.stringEncaseCRLFWithFirstIndex;
    var isArray = Array.isArray;
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var styles = /* @__PURE__ */Object.create(null);
    var applyOptions = function applyOptions(object) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      var colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    var ChalkClass = /*#__PURE__*/_createClass(function ChalkClass(options) {
      _classCallCheck(this, ChalkClass);
      return chalkFactory(options);
    });
    var chalkFactory = function chalkFactory(options) {
      var chalk2 = {};
      applyOptions(chalk2, options);
      chalk2.template = function () {
        for (var _len3 = arguments.length, arguments_ = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          arguments_[_key4] = arguments[_key4];
        }
        return chalkTag.apply(void 0, [chalk2.template].concat(arguments_));
      };
      Object.setPrototypeOf(chalk2, Chalk.prototype);
      Object.setPrototypeOf(chalk2.template, chalk2);
      chalk2.template.constructor = function () {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk2.template.Instance = ChalkClass;
      return chalk2.template;
    };
    function Chalk(options) {
      return chalkFactory(options);
    }
    var _loop6 = function _loop6() {
      var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i16], 2),
        styleName = _Object$entries5$_i[0],
        style = _Object$entries5$_i[1];
      styles[styleName] = {
        get: function get() {
          var builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, {
            value: builder
          });
          return builder;
        }
      };
    };
    for (var _i16 = 0, _Object$entries5 = Object.entries(ansiStyles); _i16 < _Object$entries5.length; _i16++) {
      _loop6();
    }
    styles.visible = {
      get: function get() {
        var builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", {
          value: builder
        });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    var _loop7 = function _loop7() {
      var model = _usedModels[_i17];
      styles[model] = {
        get: function get() {
          var level = this.level;
          return function () {
            var _ansiStyles$color$lev;
            var styler = createStyler((_ansiStyles$color$lev = ansiStyles.color[levelMapping[level]])[model].apply(_ansiStyles$color$lev, arguments), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    };
    for (var _i17 = 0, _usedModels = usedModels; _i17 < _usedModels.length; _i17++) {
      _loop7();
    }
    var _loop8 = function _loop8() {
      var model = _usedModels2[_i18];
      var bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get: function get() {
          var level = this.level;
          return function () {
            var _ansiStyles$bgColor$l;
            var styler = createStyler((_ansiStyles$bgColor$l = ansiStyles.bgColor[levelMapping[level]])[model].apply(_ansiStyles$bgColor$l, arguments), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    };
    for (var _i18 = 0, _usedModels2 = usedModels; _i18 < _usedModels2.length; _i18++) {
      _loop8();
    }
    var proto = Object.defineProperties(function () {}, _objectSpread(_objectSpread({}, styles), {}, {
      level: {
        enumerable: true,
        get: function get() {
          return this._generator.level;
        },
        set: function set(level) {
          this._generator.level = level;
        }
      }
    }));
    var createStyler = function createStyler(open, close, parent) {
      var openAll;
      var closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open: open,
        close: close,
        openAll: openAll,
        closeAll: closeAll,
        parent: parent
      };
    };
    var createBuilder = function createBuilder(self2, _styler, _isEmpty) {
      var builder = function builder() {
        for (var _len4 = arguments.length, arguments_ = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
          arguments_[_key5] = arguments[_key5];
        }
        if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag.apply(void 0, [builder].concat(arguments_)));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self2;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    var applyStyle = function applyStyle(self2, string) {
      if (self2.level <= 0 || !string) {
        return self2._isEmpty ? "" : string;
      }
      var styler = self2._styler;
      if (styler === void 0) {
        return string;
      }
      var _styler2 = styler,
        openAll = _styler2.openAll,
        closeAll = _styler2.closeAll;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      var lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    var template;
    var chalkTag = function chalkTag(chalk2) {
      for (var _len5 = arguments.length, strings = new Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
        strings[_key6 - 1] = arguments[_key6];
      }
      var firstString = strings[0];
      if (!isArray(firstString) || !isArray(firstString.raw)) {
        return strings.join(" ");
      }
      var arguments_ = strings.slice(1);
      var parts = [firstString.raw[0]];
      for (var i = 1; i < firstString.length; i++) {
        parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
      }
      if (template === void 0) {
        template = require_templates2();
      }
      return template(chalk2, parts.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    var chalk = Chalk();
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk({
      level: stderrColor ? stderrColor.level : 0
    });
    chalk.stderr.supportsColor = stderrColor;
    module2.exports = chalk;
  }
});

// node_modules/ts-command-line-args/dist/helpers/insert-code.helper.js
var require_insert_code_helper = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/insert-code.helper.js": function node_modulesTsCommandLineArgsDistHelpersInsertCodeHelperJs(exports) {
    "use strict";

    var __assign = exports && exports.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    var __spreadArray = exports && exports.__spreadArray || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
      return to;
    };
    var __importDefault = exports && exports.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.insertCode = void 0;
    var line_ending_helper_1 = require_line_ending_helper();
    var path_1 = require("path");
    var util_1 = require("util");
    var fs_1 = require("fs");
    var chalk_1 = __importDefault(require_source());
    var asyncReadFile = util_1.promisify(fs_1.readFile);
    var asyncWriteFile = util_1.promisify(fs_1.writeFile);
    function insertCode(input, partialOptions) {
      return __awaiter(this, void 0, void 0, function () {
        var options, fileDetails, filePath, content, lineBreak, lines, modifiedContent;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              options = __assign({
                removeDoubleBlankLines: false
              }, partialOptions);
              if (!(typeof input === "string")) return [3, 2];
              filePath = path_1.resolve(input);
              console.log("Loading existing file from '" + chalk_1["default"].blue(filePath) + "'");
              _a = {
                filePath: filePath
              };
              return [4, asyncReadFile(filePath)];
            case 1:
              fileDetails = (_a.fileContent = _b.sent().toString(), _a);
              return [3, 3];
            case 2:
              fileDetails = input;
              _b.label = 3;
            case 3:
              content = fileDetails.fileContent;
              lineBreak = line_ending_helper_1.findEscapeSequence(content);
              lines = line_ending_helper_1.splitContent(content);
              return [4, insertCodeImpl(fileDetails.filePath, lines, options, 0)];
            case 4:
              lines = _b.sent();
              if (options.removeDoubleBlankLines) {
                lines = lines.filter(function (line, index, lines2) {
                  return line_ending_helper_1.filterDoubleBlankLines(line, index, lines2);
                });
              }
              modifiedContent = lines.join(lineBreak);
              if (!(typeof input === "string")) return [3, 6];
              console.log("Saving modified content to '" + chalk_1["default"].blue(fileDetails.filePath) + "'");
              return [4, asyncWriteFile(fileDetails.filePath, modifiedContent)];
            case 5:
              _b.sent();
              _b.label = 6;
            case 6:
              return [2, modifiedContent];
          }
        });
      });
    }
    exports.insertCode = insertCode;
    function insertCodeImpl(filePath, lines, options, startLine) {
      return __awaiter(this, void 0, void 0, function () {
        var insertCodeBelow, insertCodeAbove, insertCodeBelowResult, insertCodeAboveResult, linesFromFile, linesBefore, linesAfter;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              insertCodeBelow = options === null || options === void 0 ? void 0 : options.insertCodeBelow;
              insertCodeAbove = options === null || options === void 0 ? void 0 : options.insertCodeAbove;
              if (insertCodeBelow == null) {
                return [2, Promise.resolve(lines)];
              }
              insertCodeBelowResult = insertCodeBelow != null ? findIndex(lines, function (line) {
                return line.indexOf(insertCodeBelow) === 0;
              }, startLine) : void 0;
              if (insertCodeBelowResult == null) {
                return [2, Promise.resolve(lines)];
              }
              insertCodeAboveResult = insertCodeAbove != null ? findIndex(lines, function (line) {
                return line.indexOf(insertCodeAbove) === 0;
              }, insertCodeBelowResult.lineIndex) : void 0;
              return [4, loadLines(filePath, options, insertCodeBelowResult)];
            case 1:
              linesFromFile = _a.sent();
              linesBefore = lines.slice(0, insertCodeBelowResult.lineIndex + 1);
              linesAfter = insertCodeAboveResult != null ? lines.slice(insertCodeAboveResult.lineIndex) : [];
              lines = __spreadArray(__spreadArray(__spreadArray([], linesBefore), linesFromFile), linesAfter);
              return [2, insertCodeAboveResult == null ? lines : insertCodeImpl(filePath, lines, options, insertCodeAboveResult.lineIndex)];
          }
        });
      });
    }
    var fileRegExp = /file="([^"]+)"/;
    var codeCommentRegExp = /codeComment(="([^"]+)")?/;
    var snippetRegExp = /snippetName="([^"]+)"/;
    function loadLines(targetFilePath, options, result) {
      var _a;
      return __awaiter(this, void 0, void 0, function () {
        var partialPathResult, codeCommentResult, snippetResult, partialPath, filePath, fileBuffer, contentLines, copyBelowMarker, copyAboveMarker, copyBelowIndex, copyAboveIndex;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              partialPathResult = fileRegExp.exec(result.line);
              if (partialPathResult == null) {
                throw new Error("insert code token (" + options.insertCodeBelow + ') found in file but file path not specified (file="relativePath/from/markdown/toFile.whatever")');
              }
              codeCommentResult = codeCommentRegExp.exec(result.line);
              snippetResult = snippetRegExp.exec(result.line);
              partialPath = partialPathResult[1];
              filePath = path_1.isAbsolute(partialPath) ? partialPath : path_1.join(path_1.dirname(targetFilePath), partialPathResult[1]);
              console.log("Inserting code from '" + chalk_1["default"].blue(filePath) + "' into '" + chalk_1["default"].blue(targetFilePath) + "'");
              return [4, asyncReadFile(filePath)];
            case 1:
              fileBuffer = _b.sent();
              contentLines = line_ending_helper_1.splitContent(fileBuffer.toString());
              copyBelowMarker = options.copyCodeBelow;
              copyAboveMarker = options.copyCodeAbove;
              copyBelowIndex = copyBelowMarker != null ? contentLines.findIndex(findLine(copyBelowMarker, snippetResult === null || snippetResult === void 0 ? void 0 : snippetResult[1])) : -1;
              copyAboveIndex = copyAboveMarker != null ? contentLines.findIndex(function (line, index) {
                return line.indexOf(copyAboveMarker) === 0 && index > copyBelowIndex;
              }) : -1;
              if (snippetResult != null && copyBelowIndex < 0) {
                throw new Error("The copyCodeBelow marker '" + options.copyCodeBelow + "' was not found with the requested snippet: '" + snippetResult[1] + "'");
              }
              contentLines = contentLines.slice(copyBelowIndex + 1, copyAboveIndex > 0 ? copyAboveIndex : void 0);
              if (codeCommentResult != null) {
                contentLines = __spreadArray(__spreadArray(["```" + ((_a = codeCommentResult[2]) !== null && _a !== void 0 ? _a : "")], contentLines), ["```"]);
              }
              return [2, contentLines];
          }
        });
      });
    }
    function findLine(copyBelowMarker, snippetName) {
      return function (line) {
        return line.indexOf(copyBelowMarker) === 0 && (snippetName == null || line.indexOf(snippetName) > 0);
      };
    }
    function findIndex(lines, predicate, startLine) {
      for (var lineIndex = startLine; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        if (predicate(line)) {
          return {
            lineIndex: lineIndex,
            line: line
          };
        }
      }
      return void 0;
    }
  }
});

// node_modules/ts-command-line-args/dist/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/ts-command-line-args/dist/helpers/index.js": function node_modulesTsCommandLineArgsDistHelpersIndexJs(exports) {
    "use strict";

    var __createBinding = exports && exports.__createBinding || (Object.create ? function (o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, {
        enumerable: true,
        get: function get() {
          return m[k];
        }
      });
    } : function (o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function (m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_command_line_helper(), exports);
    __exportStar(require_add_content_helper(), exports);
    __exportStar(require_markdown_helper(), exports);
    __exportStar(require_visitor(), exports);
    __exportStar(require_line_ending_helper(), exports);
    __exportStar(require_options_helper(), exports);
    __exportStar(require_string_helper(), exports);
    __exportStar(require_insert_code_helper(), exports);
  }
});

// node_modules/ts-command-line-args/dist/parse.js
var require_parse = __commonJS({
  "node_modules/ts-command-line-args/dist/parse.js": function node_modulesTsCommandLineArgsDistParseJs(exports) {
    "use strict";

    var __assign = exports && exports.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function (s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };
    var __spreadArray = exports && exports.__spreadArray || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
      return to;
    };
    var __importDefault = exports && exports.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parse = void 0;
    var command_line_args_1 = __importDefault(require_dist());
    var command_line_usage_1 = __importDefault(require_command_line_usage());
    var helpers_1 = require_helpers();
    var options_helper_1 = require_options_helper();
    var string_helper_1 = require_string_helper();
    var fs_1 = require("fs");
    var path_1 = require("path");
    function parse2(config, options, exitProcess, addCommandLineResults) {
      if (options === void 0) {
        options = {};
      }
      if (exitProcess === void 0) {
        exitProcess = true;
      }
      options = options || {};
      var argsWithBooleanValues = options.argv || process.argv.slice(2);
      var logger = options.logger || console;
      var normalisedConfig = helpers_1.normaliseConfig(config);
      options.argv = helpers_1.removeBooleanValues(argsWithBooleanValues, normalisedConfig);
      var optionList = helpers_1.createCommandLineConfig(normalisedConfig);
      var parsedArgs = command_line_args_1["default"](optionList, options);
      if (parsedArgs["_all"] != null) {
        var unknown = parsedArgs["_unknown"];
        parsedArgs = parsedArgs["_all"];
        if (unknown) {
          parsedArgs["_unknown"] = unknown;
        }
      }
      var booleanValues = helpers_1.getBooleanValues(argsWithBooleanValues, normalisedConfig);
      parsedArgs = __assign(__assign({}, parsedArgs), booleanValues);
      if (options.loadFromFileArg != null && parsedArgs[options.loadFromFileArg] != null) {
        var configFromFile = JSON.parse(fs_1.readFileSync(path_1.resolve(parsedArgs[options.loadFromFileArg])).toString());
        var parsedArgsWithoutDefaults = command_line_args_1["default"](optionList.map(function (_a) {
          var defaultValue = _a.defaultValue,
            option = __rest(_a, ["defaultValue"]);
          return __assign({}, option);
        }), options);
        parsedArgs = helpers_1.mergeConfig(parsedArgs, __assign(__assign({}, parsedArgsWithoutDefaults), booleanValues), configFromFile, normalisedConfig, options.loadFromFileJsonPathArg);
      }
      var missingArgs = listMissingArgs(optionList, parsedArgs);
      if (options.helpArg != null && parsedArgs[options.helpArg]) {
        printHelpGuide(options, optionList, logger);
        if (exitProcess) {
          return process.exit(resolveExitCode(options, "usageGuide", parsedArgs, missingArgs));
        }
      } else if (missingArgs.length > 0) {
        if (options.showHelpWhenArgsMissing) {
          var missingArgsHeader = typeof options.helpWhenArgMissingHeader === "function" ? options.helpWhenArgMissingHeader(missingArgs) : options.helpWhenArgMissingHeader;
          var additionalHeaderSections = missingArgsHeader != null ? [missingArgsHeader] : [];
          printHelpGuide(options, optionList, logger, additionalHeaderSections);
        } else if (options.hideMissingArgMessages !== true) {
          printMissingArgErrors(missingArgs, logger, options.baseCommand);
          printUsageGuideMessage(__assign(__assign({}, options), {
            logger: logger
          }), options.helpArg != null ? optionList.filter(function (option) {
            return option.name === options.helpArg;
          })[0] : void 0);
        }
      }
      var _commandLineResults = {
        missingArgs: missingArgs,
        printHelp: function printHelp() {
          return printHelpGuide(options, optionList, logger);
        }
      };
      if (missingArgs.length > 0 && exitProcess) {
        process.exit(resolveExitCode(options, "missingArgs", parsedArgs, missingArgs));
      } else {
        if (addCommandLineResults) {
          parsedArgs = __assign(__assign({}, parsedArgs), {
            _commandLineResults: _commandLineResults
          });
        }
        return parsedArgs;
      }
    }
    exports.parse = parse2;
    function resolveExitCode(options, reason, passedArgs, missingArgs) {
      switch (_typeof(options.processExitCode)) {
        case "number":
          return options.processExitCode;
        case "function":
          return options.processExitCode(reason, passedArgs, missingArgs);
        default:
          return 0;
      }
    }
    function printHelpGuide(options, optionList, logger, additionalHeaderSections) {
      var _a, _b;
      if (additionalHeaderSections === void 0) {
        additionalHeaderSections = [];
      }
      var sections = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], additionalHeaderSections), ((_a = options.headerContentSections) === null || _a === void 0 ? void 0 : _a.filter(filterCliSections)) || []), options_helper_1.getOptionSections(options).map(function (option) {
        return options_helper_1.addOptions(option, optionList, options);
      })), options_helper_1.getOptionFooterSection(optionList, options)), ((_b = options.footerContentSections) === null || _b === void 0 ? void 0 : _b.filter(filterCliSections)) || []);
      helpers_1.visit(sections, function (value) {
        switch (_typeof(value)) {
          case "string":
            return string_helper_1.removeAdditionalFormatting(value);
          default:
            return value;
        }
      });
      var usageGuide = command_line_usage_1["default"](sections);
      logger.log(usageGuide);
    }
    function filterCliSections(section) {
      return section.includeIn == null || section.includeIn === "both" || section.includeIn === "cli";
    }
    function printMissingArgErrors(missingArgs, logger, baseCommand) {
      baseCommand = baseCommand ? baseCommand + " " : "";
      missingArgs.forEach(function (config) {
        var aliasMessage = config.alias != null ? " or '" + baseCommand + "-" + config.alias + " passedValue'" : "";
        var runCommand = baseCommand !== "" ? "running '" + baseCommand + "--" + config.name + "=passedValue'" + aliasMessage : "passing '--" + config.name + "=passedValue'" + aliasMessage + " in command line arguments";
        logger.error("Required parameter '" + config.name + "' was not passed. Please provide a value by " + runCommand);
      });
    }
    function printUsageGuideMessage(options, helpParam) {
      if (helpParam != null) {
        var helpArg = helpParam.alias != null ? "-" + helpParam.alias : "--" + helpParam.name;
        var command = options.baseCommand != null ? "run '" + options.baseCommand + " " + helpArg + "'" : "pass '" + helpArg + "'";
        options.logger.log("To view the help guide " + command);
      }
    }
    function listMissingArgs(commandLineConfig, parsedArgs) {
      return commandLineConfig.filter(function (config) {
        return config.optional == null && parsedArgs[config.name] == null;
      }).filter(function (config) {
        if (config.type.name === "Boolean") {
          parsedArgs[config.name] = false;
          return false;
        }
        return true;
      });
    }
  }
});

// node_modules/ts-command-line-args/dist/contracts.js
var require_contracts = __commonJS({
  "node_modules/ts-command-line-args/dist/contracts.js": function node_modulesTsCommandLineArgsDistContractsJs(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// node_modules/ts-command-line-args/dist/index.js
var require_dist7 = __commonJS({
  "node_modules/ts-command-line-args/dist/index.js": function node_modulesTsCommandLineArgsDistIndexJs(exports) {
    "use strict";

    var __createBinding = exports && exports.__createBinding || (Object.create ? function (o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, {
        enumerable: true,
        get: function get() {
          return m[k];
        }
      });
    } : function (o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function (m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_parse(), exports);
    __exportStar(require_contracts(), exports);
    __exportStar(require_helpers(), exports);
  }
});

// node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "node_modules/yaml/dist/nodes/identity.js": function node_modulesYamlDistNodesIdentityJs(exports) {
    "use strict";

    var ALIAS = Symbol["for"]("yaml.alias");
    var DOC = Symbol["for"]("yaml.document");
    var MAP = Symbol["for"]("yaml.map");
    var PAIR = Symbol["for"]("yaml.pair");
    var SCALAR = Symbol["for"]("yaml.scalar");
    var SEQ = Symbol["for"]("yaml.seq");
    var NODE_TYPE = Symbol["for"]("yaml.node.type");
    var isAlias = function isAlias(node) {
      return !!node && _typeof(node) === "object" && node[NODE_TYPE] === ALIAS;
    };
    var isDocument = function isDocument(node) {
      return !!node && _typeof(node) === "object" && node[NODE_TYPE] === DOC;
    };
    var isMap = function isMap(node) {
      return !!node && _typeof(node) === "object" && node[NODE_TYPE] === MAP;
    };
    var isPair = function isPair(node) {
      return !!node && _typeof(node) === "object" && node[NODE_TYPE] === PAIR;
    };
    var isScalar = function isScalar(node) {
      return !!node && _typeof(node) === "object" && node[NODE_TYPE] === SCALAR;
    };
    var isSeq = function isSeq(node) {
      return !!node && _typeof(node) === "object" && node[NODE_TYPE] === SEQ;
    };
    function isCollection(node) {
      if (node && _typeof(node) === "object") switch (node[NODE_TYPE]) {
        case MAP:
        case SEQ:
          return true;
      }
      return false;
    }
    function isNode(node) {
      if (node && _typeof(node) === "object") switch (node[NODE_TYPE]) {
        case ALIAS:
        case MAP:
        case SCALAR:
        case SEQ:
          return true;
      }
      return false;
    }
    var hasAnchor = function hasAnchor(node) {
      return (isScalar(node) || isCollection(node)) && !!node.anchor;
    };
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});

// node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/yaml/dist/visit.js": function node_modulesYamlDistVisitJs(exports) {
    "use strict";

    var identity = require_identity();
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove node");
    function visit(node, visitor) {
      var visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        var cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE) node.contents = null;
      } else visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path2) {
      var ctrl = callVisitor(key, node, visitor, path2);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visit_(key, ctrl, visitor, path2);
      }
      if (_typeof(ctrl) !== "symbol") {
        if (identity.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (var i = 0; i < node.items.length; ++i) {
            var ci = visit_(i, node.items[i], visitor, path2);
            if (typeof ci === "number") i = ci - 1;else if (ci === BREAK) return BREAK;else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          var ck = visit_("key", node.key, visitor, path2);
          if (ck === BREAK) return BREAK;else if (ck === REMOVE) node.key = null;
          var cv = visit_("value", node.value, visitor, path2);
          if (cv === BREAK) return BREAK;else if (cv === REMOVE) node.value = null;
        }
      }
      return ctrl;
    }
    function visitAsync(_x, _x2) {
      return _visitAsync.apply(this, arguments);
    }
    function _visitAsync() {
      _visitAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, visitor) {
        var visitor_, cd;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              visitor_ = initVisitor(visitor);
              if (!identity.isDocument(node)) {
                _context2.next = 8;
                break;
              }
              _context2.next = 4;
              return visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
            case 4:
              cd = _context2.sent;
              if (cd === REMOVE) node.contents = null;
              _context2.next = 10;
              break;
            case 8:
              _context2.next = 10;
              return visitAsync_(null, node, visitor_, Object.freeze([]));
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee);
      }));
      return _visitAsync.apply(this, arguments);
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    function visitAsync_(_x3, _x4, _x5, _x6) {
      return _visitAsync_.apply(this, arguments);
    }
    function _visitAsync_() {
      _visitAsync_ = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(key, node, visitor, path2) {
        var ctrl, i, ci, ck, cv;
        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return callVisitor(key, node, visitor, path2);
            case 2:
              ctrl = _context3.sent;
              if (!(identity.isNode(ctrl) || identity.isPair(ctrl))) {
                _context3.next = 6;
                break;
              }
              replaceNode(key, path2, ctrl);
              return _context3.abrupt("return", visitAsync_(key, ctrl, visitor, path2));
            case 6:
              if (!(_typeof(ctrl) !== "symbol")) {
                _context3.next = 46;
                break;
              }
              if (!identity.isCollection(node)) {
                _context3.next = 28;
                break;
              }
              path2 = Object.freeze(path2.concat(node));
              i = 0;
            case 10:
              if (!(i < node.items.length)) {
                _context3.next = 26;
                break;
              }
              _context3.next = 13;
              return visitAsync_(i, node.items[i], visitor, path2);
            case 13:
              ci = _context3.sent;
              if (!(typeof ci === "number")) {
                _context3.next = 18;
                break;
              }
              i = ci - 1;
              _context3.next = 23;
              break;
            case 18:
              if (!(ci === BREAK)) {
                _context3.next = 22;
                break;
              }
              return _context3.abrupt("return", BREAK);
            case 22:
              if (ci === REMOVE) {
                node.items.splice(i, 1);
                i -= 1;
              }
            case 23:
              ++i;
              _context3.next = 10;
              break;
            case 26:
              _context3.next = 46;
              break;
            case 28:
              if (!identity.isPair(node)) {
                _context3.next = 46;
                break;
              }
              path2 = Object.freeze(path2.concat(node));
              _context3.next = 32;
              return visitAsync_("key", node.key, visitor, path2);
            case 32:
              ck = _context3.sent;
              if (!(ck === BREAK)) {
                _context3.next = 37;
                break;
              }
              return _context3.abrupt("return", BREAK);
            case 37:
              if (ck === REMOVE) node.key = null;
            case 38:
              _context3.next = 40;
              return visitAsync_("value", node.value, visitor, path2);
            case 40:
              cv = _context3.sent;
              if (!(cv === BREAK)) {
                _context3.next = 45;
                break;
              }
              return _context3.abrupt("return", BREAK);
            case 45:
              if (cv === REMOVE) node.value = null;
            case 46:
              return _context3.abrupt("return", ctrl);
            case 47:
            case "end":
              return _context3.stop();
          }
        }, _callee2);
      }));
      return _visitAsync_.apply(this, arguments);
    }
    function initVisitor(visitor) {
      if (_typeof(visitor) === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path2) {
      var _visitor$Map, _visitor$Seq, _visitor$Pair, _visitor$Scalar, _visitor$Alias;
      if (typeof visitor === "function") return visitor(key, node, path2);
      if (identity.isMap(node)) return (_visitor$Map = visitor.Map) === null || _visitor$Map === void 0 ? void 0 : _visitor$Map.call(visitor, key, node, path2);
      if (identity.isSeq(node)) return (_visitor$Seq = visitor.Seq) === null || _visitor$Seq === void 0 ? void 0 : _visitor$Seq.call(visitor, key, node, path2);
      if (identity.isPair(node)) return (_visitor$Pair = visitor.Pair) === null || _visitor$Pair === void 0 ? void 0 : _visitor$Pair.call(visitor, key, node, path2);
      if (identity.isScalar(node)) return (_visitor$Scalar = visitor.Scalar) === null || _visitor$Scalar === void 0 ? void 0 : _visitor$Scalar.call(visitor, key, node, path2);
      if (identity.isAlias(node)) return (_visitor$Alias = visitor.Alias) === null || _visitor$Alias === void 0 ? void 0 : _visitor$Alias.call(visitor, key, node, path2);
      return void 0;
    }
    function replaceNode(key, path2, node) {
      var parent = path2[path2.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key") parent.key = node;else parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        var pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error("Cannot replace node with ".concat(pt, " parent"));
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});

// node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/yaml/dist/doc/directives.js": function node_modulesYamlDistDocDirectivesJs(exports) {
    "use strict";

    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = function escapeTagName(tn) {
      return tn.replace(/[!,[\]{}]/g, function (ch) {
        return escapeChars[ch];
      });
    };
    var Directives = /*#__PURE__*/function () {
      function Directives(yaml2, tags) {
        _classCallCheck(this, Directives);
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, Directives.defaultYaml, yaml2);
        this.tags = Object.assign({}, Directives.defaultTags, tags);
      }
      _createClass(Directives, [{
        key: "clone",
        value: function clone() {
          var copy = new Directives(this.yaml, this.tags);
          copy.docStart = this.docStart;
          return copy;
        }
      }, {
        key: "atDocument",
        value: function atDocument() {
          var res = new Directives(this.yaml, this.tags);
          switch (this.yaml.version) {
            case "1.1":
              this.atNextDocument = true;
              break;
            case "1.2":
              this.atNextDocument = false;
              this.yaml = {
                explicit: Directives.defaultYaml.explicit,
                version: "1.2"
              };
              this.tags = Object.assign({}, Directives.defaultTags);
              break;
          }
          return res;
        }
      }, {
        key: "add",
        value: function add(line, onError) {
          if (this.atNextDocument) {
            this.yaml = {
              explicit: Directives.defaultYaml.explicit,
              version: "1.1"
            };
            this.tags = Object.assign({}, Directives.defaultTags);
            this.atNextDocument = false;
          }
          var parts = line.trim().split(/[ \t]+/);
          var name = parts.shift();
          switch (name) {
            case "%TAG":
              {
                if (parts.length !== 2) {
                  onError(0, "%TAG directive should contain exactly two parts");
                  if (parts.length < 2) return false;
                }
                var _parts = _slicedToArray(parts, 2),
                  handle = _parts[0],
                  prefix = _parts[1];
                this.tags[handle] = prefix;
                return true;
              }
            case "%YAML":
              {
                this.yaml.explicit = true;
                if (parts.length !== 1) {
                  onError(0, "%YAML directive should contain exactly one part");
                  return false;
                }
                var _parts2 = _slicedToArray(parts, 1),
                  version = _parts2[0];
                if (version === "1.1" || version === "1.2") {
                  this.yaml.version = version;
                  return true;
                } else {
                  var isValid = /^\d+\.\d+$/.test(version);
                  onError(6, "Unsupported YAML version ".concat(version), isValid);
                  return false;
                }
              }
            default:
              onError(0, "Unknown directive ".concat(name), true);
              return false;
          }
        }
      }, {
        key: "tagName",
        value: function tagName(source, onError) {
          if (source === "!") return "!";
          if (source[0] !== "!") {
            onError("Not a valid tag: ".concat(source));
            return null;
          }
          if (source[1] === "<") {
            var verbatim = source.slice(2, -1);
            if (verbatim === "!" || verbatim === "!!") {
              onError("Verbatim tags aren't resolved, so ".concat(source, " is invalid."));
              return null;
            }
            if (source[source.length - 1] !== ">") onError("Verbatim tags must end with a >");
            return verbatim;
          }
          var _source$match = source.match(/^(.*!)([^!]*)$/),
            _source$match2 = _slicedToArray(_source$match, 3),
            handle = _source$match2[1],
            suffix = _source$match2[2];
          if (!suffix) onError("The ".concat(source, " tag has no suffix"));
          var prefix = this.tags[handle];
          if (prefix) return prefix + decodeURIComponent(suffix);
          if (handle === "!") return source;
          onError("Could not resolve tag: ".concat(source));
          return null;
        }
      }, {
        key: "tagString",
        value: function tagString(tag) {
          for (var _i19 = 0, _Object$entries6 = Object.entries(this.tags); _i19 < _Object$entries6.length; _i19++) {
            var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i19], 2),
              handle = _Object$entries6$_i[0],
              prefix = _Object$entries6$_i[1];
            if (tag.startsWith(prefix)) return handle + escapeTagName(tag.substring(prefix.length));
          }
          return tag[0] === "!" ? tag : "!<".concat(tag, ">");
        }
      }, {
        key: "toString",
        value: function toString(doc) {
          var lines = this.yaml.explicit ? ["%YAML ".concat(this.yaml.version || "1.2")] : [];
          var tagEntries = Object.entries(this.tags);
          var tagNames;
          if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
            var tags = {};
            visit.visit(doc.contents, function (_key, node) {
              if (identity.isNode(node) && node.tag) tags[node.tag] = true;
            });
            tagNames = Object.keys(tags);
          } else tagNames = [];
          var _loop9 = function _loop9() {
            var _tagEntries$_i = _slicedToArray(_tagEntries[_i20], 2),
              handle = _tagEntries$_i[0],
              prefix = _tagEntries$_i[1];
            if (handle === "!!" && prefix === "tag:yaml.org,2002:") return 1; // continue
            if (!doc || tagNames.some(function (tn) {
              return tn.startsWith(prefix);
            })) lines.push("%TAG ".concat(handle, " ").concat(prefix));
          };
          for (var _i20 = 0, _tagEntries = tagEntries; _i20 < _tagEntries.length; _i20++) {
            if (_loop9()) continue;
          }
          return lines.join("\n");
        }
      }]);
      return Directives;
    }();
    Directives.defaultYaml = {
      explicit: false,
      version: "1.2"
    };
    Directives.defaultTags = {
      "!!": "tag:yaml.org,2002:"
    };
    exports.Directives = Directives;
  }
});

// node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/yaml/dist/doc/anchors.js": function node_modulesYamlDistDocAnchorsJs(exports) {
    "use strict";

    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        var sa = JSON.stringify(anchor);
        var msg = "Anchor must not contain whitespace or control characters: ".concat(sa);
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      var anchors = /* @__PURE__ */new Set();
      visit.visit(root, {
        Value: function Value(_key, node) {
          if (node.anchor) anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (var i = 1; true; ++i) {
        var name = "".concat(prefix).concat(i);
        if (!exclude.has(name)) return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      var aliasObjects = [];
      var sourceObjects = /* @__PURE__ */new Map();
      var prevAnchors = null;
      return {
        onAnchor: function onAnchor(source) {
          aliasObjects.push(source);
          if (!prevAnchors) prevAnchors = anchorNames(doc);
          var anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        setAnchors: function setAnchors() {
          for (var _i21 = 0, _aliasObjects = aliasObjects; _i21 < _aliasObjects.length; _i21++) {
            var source = _aliasObjects[_i21];
            var ref = sourceObjects.get(source);
            if (_typeof(ref) === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              var error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects: sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/yaml/dist/doc/applyReviver.js": function node_modulesYamlDistDocApplyReviverJs(exports) {
    "use strict";

    function applyReviver(reviver, obj, key, val) {
      if (val && _typeof(val) === "object") {
        if (Array.isArray(val)) {
          for (var i = 0, len = val.length; i < len; ++i) {
            var v0 = val[i];
            var v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0) delete val[i];else if (v1 !== v0) val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (var _i22 = 0, _Array$from = Array.from(val.keys()); _i22 < _Array$from.length; _i22++) {
            var k = _Array$from[_i22];
            var _v = val.get(k);
            var _v2 = applyReviver(reviver, val, k, _v);
            if (_v2 === void 0) val["delete"](k);else if (_v2 !== _v) val.set(k, _v2);
          }
        } else if (val instanceof Set) {
          for (var _i23 = 0, _Array$from2 = Array.from(val); _i23 < _Array$from2.length; _i23++) {
            var _v3 = _Array$from2[_i23];
            var _v4 = applyReviver(reviver, val, _v3, _v3);
            if (_v4 === void 0) val["delete"](_v3);else if (_v4 !== _v3) {
              val["delete"](_v3);
              val.add(_v4);
            }
          }
        } else {
          for (var _i24 = 0, _Object$entries7 = Object.entries(val); _i24 < _Object$entries7.length; _i24++) {
            var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i24], 2),
              _k = _Object$entries7$_i[0],
              _v5 = _Object$entries7$_i[1];
            var _v6 = applyReviver(reviver, val, _k, _v5);
            if (_v6 === void 0) delete val[_k];else if (_v6 !== _v5) val[_k] = _v6;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/yaml/dist/nodes/toJS.js": function node_modulesYamlDistNodesToJSJs(exports) {
    "use strict";

    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value)) return value.map(function (v, i) {
        return toJS(v, String(i), ctx);
      });
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value)) return value.toJSON(arg, ctx);
        var data = {
          aliasCount: 0,
          count: 1,
          res: void 0
        };
        ctx.anchors.set(value, data);
        ctx.onCreate = function (res2) {
          data.res = res2;
          delete ctx.onCreate;
        };
        var res = value.toJSON(arg, ctx);
        if (ctx.onCreate) ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !(ctx !== null && ctx !== void 0 && ctx.keep)) return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});

// node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/yaml/dist/nodes/Node.js": function node_modulesYamlDistNodesNodeJs(exports) {
    "use strict";

    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var _toJS = require_toJS();
    var NodeBase = /*#__PURE__*/function () {
      function NodeBase(type) {
        _classCallCheck(this, NodeBase);
        Object.defineProperty(this, identity.NODE_TYPE, {
          value: type
        });
      }
      _createClass(NodeBase, [{
        key: "clone",
        value: function clone() {
          var copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
          if (this.range) copy.range = this.range.slice();
          return copy;
        }
      }, {
        key: "toJS",
        value: function toJS(doc) {
          var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            mapAsMap = _ref.mapAsMap,
            maxAliasCount = _ref.maxAliasCount,
            onAnchor = _ref.onAnchor,
            reviver = _ref.reviver;
          if (!identity.isDocument(doc)) throw new TypeError("A document argument is required");
          var ctx = {
            anchors: /* @__PURE__ */new Map(),
            doc: doc,
            keep: true,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
          };
          var res = _toJS.toJS(this, "", ctx);
          if (typeof onAnchor === "function") {
            var _iterator14 = _createForOfIteratorHelper(ctx.anchors.values()),
              _step14;
            try {
              for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                var _step14$value = _step14.value,
                  count = _step14$value.count,
                  res2 = _step14$value.res;
                onAnchor(res2, count);
              }
            } catch (err) {
              _iterator14.e(err);
            } finally {
              _iterator14.f();
            }
          }
          return typeof reviver === "function" ? applyReviver.applyReviver(reviver, {
            "": res
          }, "", res) : res;
        }
      }]);
      return NodeBase;
    }();
    exports.NodeBase = NodeBase;
  }
});

// node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/yaml/dist/nodes/Alias.js": function node_modulesYamlDistNodesAliasJs(exports) {
    "use strict";

    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = /*#__PURE__*/function (_Node$NodeBase) {
      _inherits(Alias, _Node$NodeBase);
      var _super8 = _createSuper(Alias);
      function Alias(source) {
        var _this11;
        _classCallCheck(this, Alias);
        _this11 = _super8.call(this, identity.ALIAS);
        _this11.source = source;
        Object.defineProperty(_assertThisInitialized(_this11), "tag", {
          set: function set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
        return _this11;
      }
      _createClass(Alias, [{
        key: "resolve",
        value: function resolve(doc) {
          var _this12 = this;
          var found = void 0;
          visit.visit(doc, {
            Node: function Node(_key, node) {
              if (node === _this12) return visit.visit.BREAK;
              if (node.anchor === _this12.source) found = node;
            }
          });
          return found;
        }
      }, {
        key: "toJSON",
        value: function toJSON(_arg, ctx) {
          if (!ctx) return {
            source: this.source
          };
          var anchors2 = ctx.anchors,
            doc = ctx.doc,
            maxAliasCount = ctx.maxAliasCount;
          var source = this.resolve(doc);
          if (!source) {
            var msg = "Unresolved alias (the anchor must be set before the alias): ".concat(this.source);
            throw new ReferenceError(msg);
          }
          var data = anchors2.get(source);
          if (!data) {
            toJS.toJS(source, null, ctx);
            data = anchors2.get(source);
          }
          if (!data || data.res === void 0) {
            var _msg = "This should not happen: Alias anchor was not resolved?";
            throw new ReferenceError(_msg);
          }
          if (maxAliasCount >= 0) {
            data.count += 1;
            if (data.aliasCount === 0) data.aliasCount = getAliasCount(doc, source, anchors2);
            if (data.count * data.aliasCount > maxAliasCount) {
              var _msg2 = "Excessive alias count indicates a resource exhaustion attack";
              throw new ReferenceError(_msg2);
            }
          }
          return data.res;
        }
      }, {
        key: "toString",
        value: function toString(ctx, _onComment, _onChompKeep) {
          var src = "*".concat(this.source);
          if (ctx) {
            anchors.anchorIsValid(this.source);
            if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
              var msg = "Unresolved alias (the anchor must be set before the alias): ".concat(this.source);
              throw new Error(msg);
            }
            if (ctx.implicitKey) return "".concat(src, " ");
          }
          return src;
        }
      }]);
      return Alias;
    }(Node.NodeBase);
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        var source = node.resolve(doc);
        var anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        var count = 0;
        var _iterator15 = _createForOfIteratorHelper(node.items),
          _step15;
        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var item = _step15.value;
            var c = getAliasCount(doc, item, anchors2);
            if (c > count) count = c;
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }
        return count;
      } else if (identity.isPair(node)) {
        var kc = getAliasCount(doc, node.key, anchors2);
        var vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/yaml/dist/nodes/Scalar.js": function node_modulesYamlDistNodesScalarJs(exports) {
    "use strict";

    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = function isScalarValue(value) {
      return !value || typeof value !== "function" && _typeof(value) !== "object";
    };
    var Scalar = /*#__PURE__*/function (_Node$NodeBase2) {
      _inherits(Scalar, _Node$NodeBase2);
      var _super9 = _createSuper(Scalar);
      function Scalar(value) {
        var _this13;
        _classCallCheck(this, Scalar);
        _this13 = _super9.call(this, identity.SCALAR);
        _this13.value = value;
        return _this13;
      }
      _createClass(Scalar, [{
        key: "toJSON",
        value: function toJSON(arg, ctx) {
          return ctx !== null && ctx !== void 0 && ctx.keep ? this.value : toJS.toJS(this.value, arg, ctx);
        }
      }, {
        key: "toString",
        value: function toString() {
          return String(this.value);
        }
      }]);
      return Scalar;
    }(Node.NodeBase);
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/yaml/dist/doc/createNode.js": function node_modulesYamlDistDocCreateNodeJs(exports) {
    "use strict";

    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        var _match$find;
        var match = tags.filter(function (t) {
          return t.tag === tagName;
        });
        var tagObj = (_match$find = match.find(function (t) {
          return !t.format;
        })) !== null && _match$find !== void 0 ? _match$find : match[0];
        if (!tagObj) throw new Error("Tag ".concat(tagName, " not found"));
        return tagObj;
      }
      return tags.find(function (t) {
        var _t$identify;
        return ((_t$identify = t.identify) === null || _t$identify === void 0 ? void 0 : _t$identify.call(t, value)) && !t.format;
      });
    }
    function createNode(value, tagName, ctx) {
      var _tagName, _tagObj, _tagObj2;
      if (identity.isDocument(value)) value = value.contents;
      if (identity.isNode(value)) return value;
      if (identity.isPair(value)) {
        var _ctx$schema$identity$, _ctx$schema$identity$2;
        var map = (_ctx$schema$identity$ = (_ctx$schema$identity$2 = ctx.schema[identity.MAP]).createNode) === null || _ctx$schema$identity$ === void 0 ? void 0 : _ctx$schema$identity$.call(_ctx$schema$identity$2, ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      var aliasDuplicateObjects = ctx.aliasDuplicateObjects,
        onAnchor = ctx.onAnchor,
        onTagObj = ctx.onTagObj,
        schema = ctx.schema,
        sourceObjects = ctx.sourceObjects;
      var ref = void 0;
      if (aliasDuplicateObjects && value && _typeof(value) === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          if (!ref.anchor) ref.anchor = onAnchor(value);
          return new Alias.Alias(ref.anchor);
        } else {
          ref = {
            anchor: null,
            node: null
          };
          sourceObjects.set(value, ref);
        }
      }
      if ((_tagName = tagName) !== null && _tagName !== void 0 && _tagName.startsWith("!!")) tagName = defaultTagPrefix + tagName.slice(2);
      var tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || _typeof(value) !== "object") {
          var node2 = new Scalar.Scalar(value);
          if (ref) ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      var node = (_tagObj = tagObj) !== null && _tagObj !== void 0 && _tagObj.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof ((_tagObj2 = tagObj) === null || _tagObj2 === void 0 || (_tagObj2 = _tagObj2.nodeClass) === null || _tagObj2 === void 0 ? void 0 : _tagObj2.from) === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName) node.tag = tagName;else if (!tagObj["default"]) node.tag = tagObj.tag;
      if (ref) ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/yaml/dist/nodes/Collection.js": function node_modulesYamlDistNodesCollectionJs(exports) {
    "use strict";

    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path2, value) {
      var v = value;
      for (var i = path2.length - 1; i >= 0; --i) {
        var k = path2[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          var a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: function onAnchor() {
          throw new Error("This should not happen, please report a bug.");
        },
        schema: schema,
        sourceObjects: /* @__PURE__ */new Map()
      });
    }
    var isEmptyPath = function isEmptyPath(path2) {
      return path2 == null || _typeof(path2) === "object" && !!path2[Symbol.iterator]().next().done;
    };
    var Collection = /*#__PURE__*/function (_Node$NodeBase3) {
      _inherits(Collection, _Node$NodeBase3);
      var _super10 = _createSuper(Collection);
      function Collection(type, schema) {
        var _this14;
        _classCallCheck(this, Collection);
        _this14 = _super10.call(this, type);
        Object.defineProperty(_assertThisInitialized(_this14), "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
        return _this14;
      }
      _createClass(Collection, [{
        key: "clone",
        value: function clone(schema) {
          var copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
          if (schema) copy.schema = schema;
          copy.items = copy.items.map(function (it) {
            return identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it;
          });
          if (this.range) copy.range = this.range.slice();
          return copy;
        }
      }, {
        key: "addIn",
        value: function addIn(path2, value) {
          if (isEmptyPath(path2)) this.add(value);else {
            var _path = _toArray(path2),
              key = _path[0],
              rest = _path.slice(1);
            var node = this.get(key, true);
            if (identity.isCollection(node)) node.addIn(rest, value);else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));else throw new Error("Expected YAML collection at ".concat(key, ". Remaining path: ").concat(rest));
          }
        }
      }, {
        key: "deleteIn",
        value: function deleteIn(path2) {
          var _path2 = _toArray(path2),
            key = _path2[0],
            rest = _path2.slice(1);
          if (rest.length === 0) return this["delete"](key);
          var node = this.get(key, true);
          if (identity.isCollection(node)) return node.deleteIn(rest);else throw new Error("Expected YAML collection at ".concat(key, ". Remaining path: ").concat(rest));
        }
      }, {
        key: "getIn",
        value: function getIn(path2, keepScalar) {
          var _path3 = _toArray(path2),
            key = _path3[0],
            rest = _path3.slice(1);
          var node = this.get(key, true);
          if (rest.length === 0) return !keepScalar && identity.isScalar(node) ? node.value : node;else return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
        }
      }, {
        key: "hasAllNullValues",
        value: function hasAllNullValues(allowScalar) {
          return this.items.every(function (node) {
            if (!identity.isPair(node)) return false;
            var n = node.value;
            return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
          });
        }
      }, {
        key: "hasIn",
        value: function hasIn(path2) {
          var _path4 = _toArray(path2),
            key = _path4[0],
            rest = _path4.slice(1);
          if (rest.length === 0) return this.has(key);
          var node = this.get(key, true);
          return identity.isCollection(node) ? node.hasIn(rest) : false;
        }
      }, {
        key: "setIn",
        value: function setIn(path2, value) {
          var _path5 = _toArray(path2),
            key = _path5[0],
            rest = _path5.slice(1);
          if (rest.length === 0) {
            this.set(key, value);
          } else {
            var node = this.get(key, true);
            if (identity.isCollection(node)) node.setIn(rest, value);else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));else throw new Error("Expected YAML collection at ".concat(key, ". Remaining path: ").concat(rest));
          }
        }
      }]);
      return Collection;
    }(Node.NodeBase);
    Collection.maxFlowStringSingleLineLength = 60;
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyComment.js": function node_modulesYamlDistStringifyStringifyCommentJs(exports) {
    "use strict";

    var stringifyComment = function stringifyComment(str) {
      return str.replace(/^(?!$)(?: $)?/gm, "#");
    };
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment)) return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = function lineComment(str, indent, comment) {
      return str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    };
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/yaml/dist/stringify/foldFlowLines.js": function node_modulesYamlDistStringifyFoldFlowLinesJs(exports) {
    "use strict";

    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "flow";
      var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        indentAtStart = _ref2.indentAtStart,
        _ref2$lineWidth = _ref2.lineWidth,
        lineWidth = _ref2$lineWidth === void 0 ? 80 : _ref2$lineWidth,
        _ref2$minContentWidth = _ref2.minContentWidth,
        minContentWidth = _ref2$minContentWidth === void 0 ? 20 : _ref2$minContentWidth,
        onFold = _ref2.onFold,
        onOverflow = _ref2.onOverflow;
      if (!lineWidth || lineWidth < 0) return text;
      var endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep) return text;
      var folds = [];
      var escapedFolds = {};
      var end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0);else end = lineWidth - indentAtStart;
      }
      var split = void 0;
      var prev = void 0;
      var overflow = false;
      var i = -1;
      var escStart = -1;
      var escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i);
        if (i !== -1) end = i + endStep;
      }
      for (var ch; ch = text[i += 1];) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK) i = consumeMoreIndentedLines(text, i);
          end = i + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            var next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	") split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              var j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j]) return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow) onOverflow();
      if (folds.length === 0) return text;
      if (onFold) onFold();
      var res = text.slice(0, folds[0]);
      for (var i2 = 0; i2 < folds.length; ++i2) {
        var fold = folds[i2];
        var end2 = folds[i2 + 1] || text.length;
        if (fold === 0) res = "\n".concat(indent).concat(text.slice(0, end2));else {
          if (mode === FOLD_QUOTED && escapedFolds[fold]) res += "".concat(text[fold], "\\");
          res += "\n".concat(indent).concat(text.slice(fold + 1, end2));
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i) {
      var ch = text[i + 1];
      while (ch === " " || ch === "	") {
        do {
          ch = text[i += 1];
        } while (ch && ch !== "\n");
        ch = text[i + 1];
      }
      return i;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyString.js": function node_modulesYamlDistStringifyStringifyStringJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = function getFoldOptions(ctx, isBlock) {
      return {
        indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
        lineWidth: ctx.options.lineWidth,
        minContentWidth: ctx.options.minContentWidth
      };
    };
    var containsDocumentMarker = function containsDocumentMarker(str) {
      return /^(%|---|\.\.\.)/m.test(str);
    };
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0) return false;
      var limit = lineWidth - indentLength;
      var strLen = str.length;
      if (strLen <= limit) return false;
      for (var i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit) return true;
          start = i + 1;
          if (strLen - start <= limit) return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      var json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON) return json;
      var implicitKey = ctx.implicitKey;
      var minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      var indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      var str = "";
      var start = 0;
      for (var i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\") switch (json[i + 1]) {
          case "u":
            {
              str += json.slice(start, i);
              var code = json.substr(i + 2, 4);
              switch (code) {
                case "0000":
                  str += "\\0";
                  break;
                case "0007":
                  str += "\\a";
                  break;
                case "000b":
                  str += "\\v";
                  break;
                case "001b":
                  str += "\\e";
                  break;
                case "0085":
                  str += "\\N";
                  break;
                case "00a0":
                  str += "\\_";
                  break;
                case "2028":
                  str += "\\L";
                  break;
                case "2029":
                  str += "\\P";
                  break;
                default:
                  if (code.substr(0, 2) === "00") str += "\\x" + code.substr(2);else str += json.substr(i, 6);
              }
              i += 5;
              start = i + 1;
            }
            break;
          case "n":
            if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
              i += 1;
            } else {
              str += json.slice(start, i) + "\n\n";
              while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                str += "\n";
                i += 2;
              }
              str += indent;
              if (json[i + 2] === " ") str += "\\";
              i += 1;
              start = i + 1;
            }
            break;
          default:
            i += 1;
        }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value)) return doubleQuotedString(value, ctx);
      var indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      var res = "'" + value.replace(/'/g, "''").replace(/\n+/g, "$&\n".concat(indent)) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      var singleQuote = ctx.options.singleQuote;
      var qs;
      if (singleQuote === false) qs = doubleQuotedString;else {
        var hasDouble = value.includes('"');
        var hasSingle = value.includes("'");
        if (hasDouble && !hasSingle) qs = singleQuotedString;else if (hasSingle && !hasDouble) qs = doubleQuotedString;else qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch (_unused) {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString(_ref3, ctx, onComment, onChompKeep) {
      var comment = _ref3.comment,
        type = _ref3.type,
        value = _ref3.value;
      var _ctx$options = ctx.options,
        blockQuote = _ctx$options.blockQuote,
        commentString = _ctx$options.commentString,
        lineWidth = _ctx$options.lineWidth;
      if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return quotedString(value, ctx);
      }
      var indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      var literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value) return literal ? "|\n" : ">\n";
      var chomp;
      var endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        var ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ") break;
      }
      var end = value.substring(endStart);
      var endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep) onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n") end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, "$&".concat(indent));
      }
      var startWithSpace = false;
      var startEnd;
      var startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        var _ch = value[startEnd];
        if (_ch === " ") startWithSpace = true;else if (_ch === "\n") startNlPos = startEnd;else break;
      }
      var start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, "$&".concat(indent));
      }
      var indentSize = indent ? "2" : "1";
      var header = (literal ? "|" : ">") + (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment) onComment();
      }
      if (literal) {
        value = value.replace(/\n+/g, "$&".concat(indent));
        return "".concat(header, "\n").concat(indent).concat(start).concat(value).concat(end);
      }
      value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, "$&".concat(indent));
      var body = foldFlowLines.foldFlowLines("".concat(start).concat(value).concat(end), indent, foldFlowLines.FOLD_BLOCK, getFoldOptions(ctx, true));
      return "".concat(header, "\n").concat(indent).concat(body);
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      var type = item.type,
        value = item.value;
      var actualString = ctx.actualString,
        implicitKey = ctx.implicitKey,
        indent = ctx.indent,
        indentStep = ctx.indentStep,
        inFlow = ctx.inFlow;
      if (implicitKey && /[\n[\]{},]/.test(value) || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      var str = value.replace(/\n+/g, "$&\n".concat(indent));
      if (actualString) {
        var test = function test(tag) {
          var _tag$test;
          return tag["default"] && tag.tag !== "tag:yaml.org,2002:str" && ((_tag$test = tag.test) === null || _tag$test === void 0 ? void 0 : _tag$test.test(str));
        };
        var _ctx$doc$schema = ctx.doc.schema,
          compat = _ctx$doc$schema.compat,
          tags = _ctx$doc$schema.tags;
        if (tags.some(test) || compat !== null && compat !== void 0 && compat.some(test)) return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      var implicitKey = ctx.implicitKey,
        inFlow = ctx.inFlow;
      var ss = typeof item.value === "string" ? item : Object.assign({}, item, {
        value: String(item.value)
      });
      var type = item.type;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/(?:[\0-\x08\x0B-\x1F\x7F-\x9F]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/.test(ss.value)) type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      var _stringify = function _stringify(_type) {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      var res = _stringify(type);
      if (res === null) {
        var _ctx$options2 = ctx.options,
          defaultKeyType = _ctx$options2.defaultKeyType,
          defaultStringType = _ctx$options2.defaultStringType;
        var t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null) throw new Error("Unsupported default string type ".concat(t));
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/yaml/dist/stringify/stringify.js": function node_modulesYamlDistStringifyStringifyJs(exports) {
    "use strict";

    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      var opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      var inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */new Set(),
        doc: doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow: inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        var _match$find2;
        var match = tags.filter(function (t) {
          return t.tag === item.tag;
        });
        if (match.length > 0) return (_match$find2 = match.find(function (t) {
          return t.format === item.format;
        })) !== null && _match$find2 !== void 0 ? _match$find2 : match[0];
      }
      var tagObj = void 0;
      var obj;
      if (identity.isScalar(item)) {
        var _match$find3;
        obj = item.value;
        var _match = tags.filter(function (t) {
          var _t$identify2;
          return (_t$identify2 = t.identify) === null || _t$identify2 === void 0 ? void 0 : _t$identify2.call(t, obj);
        });
        tagObj = (_match$find3 = _match.find(function (t) {
          return t.format === item.format;
        })) !== null && _match$find3 !== void 0 ? _match$find3 : _match.find(function (t) {
          return !t.format;
        });
      } else {
        obj = item;
        tagObj = tags.find(function (t) {
          return t.nodeClass && obj instanceof t.nodeClass;
        });
      }
      if (!tagObj) {
        var _obj$constructor$name, _obj;
        var name = (_obj$constructor$name = (_obj = obj) === null || _obj === void 0 || (_obj = _obj.constructor) === null || _obj === void 0 ? void 0 : _obj.name) !== null && _obj$constructor$name !== void 0 ? _obj$constructor$name : _typeof(obj);
        throw new Error("Tag not resolved for ".concat(name, " value"));
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, _ref4) {
      var anchors$1 = _ref4.anchors,
        doc = _ref4.doc;
      if (!doc.directives) return "";
      var props = [];
      var anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push("&".concat(anchor));
      }
      var tag = node.tag ? node.tag : tagObj["default"] ? null : tagObj.tag;
      if (tag) props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      var _ctx$indentAtStart;
      if (identity.isPair(item)) return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        var _ctx$resolvedAliases;
        if (ctx.doc.directives) return item.toString(ctx);
        if ((_ctx$resolvedAliases = ctx.resolvedAliases) !== null && _ctx$resolvedAliases !== void 0 && _ctx$resolvedAliases.has(item)) {
          throw new TypeError("Cannot stringify circular structure without alias nodes");
        } else {
          if (ctx.resolvedAliases) ctx.resolvedAliases.add(item);else ctx.resolvedAliases = /* @__PURE__ */new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      var tagObj = void 0;
      var node = identity.isNode(item) ? item : ctx.doc.createNode(item, {
        onTagObj: function onTagObj(o) {
          return tagObj = o;
        }
      });
      if (!tagObj) tagObj = getTagObject(ctx.doc.schema.tags, node);
      var props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0) ctx.indentAtStart = ((_ctx$indentAtStart = ctx.indentAtStart) !== null && _ctx$indentAtStart !== void 0 ? _ctx$indentAtStart : 0) + props.length + 1;
      var str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props) return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? "".concat(props, " ").concat(str) : "".concat(props, "\n").concat(ctx.indent).concat(str);
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyPair.js": function node_modulesYamlDistStringifyStringifyPairJs(exports) {
    "use strict";

    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair(_ref5, ctx, onComment, onChompKeep) {
      var key = _ref5.key,
        value = _ref5.value;
      var _ctx = ctx,
        allNullValues = _ctx.allNullValues,
        doc = _ctx.doc,
        indent = _ctx.indent,
        indentStep = _ctx.indentStep,
        _ctx$options3 = _ctx.options,
        commentString = _ctx$options3.commentString,
        indentSeq = _ctx$options3.indentSeq,
        simpleKeys = _ctx$options3.simpleKeys;
      var keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key)) {
          var msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      var explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : _typeof(key) === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      var keyCommentDone = false;
      var chompKeep = false;
      var str = stringify.stringify(key, ctx, function () {
        return keyCommentDone = true;
      }, function () {
        return chompKeep = true;
      });
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys) throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment) onComment();
          return str === "" ? "?" : explicitKey ? "? ".concat(str) : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = "? ".concat(str);
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep) onChompKeep();
        return str;
      }
      if (keyCommentDone) keyComment = null;
      if (explicitKey) {
        if (keyComment) str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = "? ".concat(str, "\n").concat(indent, ":");
      } else {
        str = "".concat(str, ":");
        if (keyComment) str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      var vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && _typeof(value) === "object") value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value)) ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      var valueCommentDone = false;
      var valueStr = stringify.stringify(value, ctx, function () {
        return valueCommentDone = true;
      }, function () {
        return chompKeep = true;
      });
      var ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          var cs = commentString(vcb);
          ws += "\n".concat(stringifyComment.indentComment(cs, ctx.indent));
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n") ws = "\n\n";
        } else {
          ws += "\n".concat(ctx.indent);
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        var _ref6, _ctx$inFlow;
        var vs0 = valueStr[0];
        var nl0 = valueStr.indexOf("\n");
        var hasNewline = nl0 !== -1;
        var flow = (_ref6 = (_ctx$inFlow = ctx.inFlow) !== null && _ctx$inFlow !== void 0 ? _ctx$inFlow : value.flow) !== null && _ref6 !== void 0 ? _ref6 : value.items.length === 0;
        if (hasNewline || !flow) {
          var hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            var sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0) hasPropsLine = true;
          }
          if (!hasPropsLine) ws = "\n".concat(ctx.indent);
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment) onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/yaml/dist/log.js": function node_modulesYamlDistLogJs(exports) {
    "use strict";

    function debug(logLevel) {
      var _console;
      for (var _len6 = arguments.length, messages = new Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
        messages[_key7 - 1] = arguments[_key7];
      }
      if (logLevel === "debug") (_console = console).log.apply(_console, messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof process !== "undefined" && process.emitWarning) process.emitWarning(warning);else console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/yaml/dist/nodes/addPairToJSMap.js": function node_modulesYamlDistNodesAddPairToJSMapJs(exports) {
    "use strict";

    var log = require_log();
    var stringify = require_stringify();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var MERGE_KEY = "<<";
    function addPairToJSMap(ctx, map, _ref7) {
      var key = _ref7.key,
        value = _ref7.value;
      if (ctx !== null && ctx !== void 0 && ctx.doc.schema.merge && isMergeKey(key)) {
        value = identity.isAlias(value) ? value.resolve(ctx.doc) : value;
        if (identity.isSeq(value)) {
          var _iterator16 = _createForOfIteratorHelper(value.items),
            _step16;
          try {
            for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
              var it = _step16.value;
              mergeToJSMap(ctx, map, it);
            }
          } catch (err) {
            _iterator16.e(err);
          } finally {
            _iterator16.f();
          }
        } else if (Array.isArray(value)) {
          var _iterator17 = _createForOfIteratorHelper(value),
            _step17;
          try {
            for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
              var _it = _step17.value;
              mergeToJSMap(ctx, map, _it);
            }
          } catch (err) {
            _iterator17.e(err);
          } finally {
            _iterator17.f();
          }
        } else mergeToJSMap(ctx, map, value);
      } else {
        var jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          var stringKey = stringifyKey(key, jsKey, ctx);
          var jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map) Object.defineProperty(map, stringKey, {
            value: jsValue,
            writable: true,
            enumerable: true,
            configurable: true
          });else map[stringKey] = jsValue;
        }
      }
      return map;
    }
    var isMergeKey = function isMergeKey(key) {
      return key === MERGE_KEY || identity.isScalar(key) && key.value === MERGE_KEY && (!key.type || key.type === Scalar.Scalar.PLAIN);
    };
    function mergeToJSMap(ctx, map, value) {
      var source = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
      if (!identity.isMap(source)) throw new Error("Merge sources must be maps or map aliases");
      var srcMap = source.toJSON(null, ctx, Map);
      var _iterator18 = _createForOfIteratorHelper(srcMap),
        _step18;
      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var _step18$value = _slicedToArray(_step18.value, 2),
            key = _step18$value[0],
            value2 = _step18$value[1];
          if (map instanceof Map) {
            if (!map.has(key)) map.set(key, value2);
          } else if (map instanceof Set) {
            map.add(key);
          } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
            Object.defineProperty(map, key, {
              value: value2,
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null) return "";
      if (_typeof(jsKey) !== "object") return String(jsKey);
      if (identity.isNode(key) && ctx && ctx.doc) {
        var strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */new Set();
        var _iterator19 = _createForOfIteratorHelper(ctx.anchors.keys()),
          _step19;
        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var node = _step19.value;
            strCtx.anchors.add(node.anchor);
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        var strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          var jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40) jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, "Keys with collection values will be stringified due to JS Object restrictions: ".concat(jsonStr, ". Set mapAsMap: true to use object keys."));
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/yaml/dist/nodes/Pair.js": function node_modulesYamlDistNodesPairJs(exports) {
    "use strict";

    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      var k = createNode.createNode(key, void 0, ctx);
      var v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = /*#__PURE__*/function () {
      function Pair(key) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        _classCallCheck(this, Pair);
        Object.defineProperty(this, identity.NODE_TYPE, {
          value: identity.PAIR
        });
        this.key = key;
        this.value = value;
      }
      _createClass(Pair, [{
        key: "clone",
        value: function clone(schema) {
          var key = this.key,
            value = this.value;
          if (identity.isNode(key)) key = key.clone(schema);
          if (identity.isNode(value)) value = value.clone(schema);
          return new Pair(key, value);
        }
      }, {
        key: "toJSON",
        value: function toJSON(_, ctx) {
          var pair = ctx !== null && ctx !== void 0 && ctx.mapAsMap ? /* @__PURE__ */new Map() : {};
          return addPairToJSMap.addPairToJSMap(ctx, pair, this);
        }
      }, {
        key: "toString",
        value: function toString(ctx, onComment, onChompKeep) {
          return ctx !== null && ctx !== void 0 && ctx.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
        }
      }]);
      return Pair;
    }();
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyCollection.js": function node_modulesYamlDistStringifyStringifyCollectionJs(exports) {
    "use strict";

    var Collection = require_Collection();
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      var _ctx$inFlow2;
      var flow = (_ctx$inFlow2 = ctx.inFlow) !== null && _ctx$inFlow2 !== void 0 ? _ctx$inFlow2 : collection.flow;
      var stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection(_ref8, ctx, _ref9) {
      var comment = _ref8.comment,
        items = _ref8.items;
      var blockItemPrefix = _ref9.blockItemPrefix,
        flowChars = _ref9.flowChars,
        itemIndent = _ref9.itemIndent,
        onChompKeep = _ref9.onChompKeep,
        onComment = _ref9.onComment;
      var indent = ctx.indent,
        commentString = ctx.options.commentString;
      var itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        type: null
      });
      var chompKeep = false;
      var lines = [];
      var _loop10 = function _loop10() {
        var item = items[i];
        var comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore) lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment) comment2 = item.comment;
        } else if (identity.isPair(item)) {
          var ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore) lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        var str2 = stringify.stringify(item, itemCtx, function () {
          return comment2 = null;
        }, function () {
          return chompKeep = true;
        });
        if (comment2) str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2) chompKeep = false;
        lines.push(blockItemPrefix + str2);
      };
      for (var i = 0; i < items.length; ++i) {
        _loop10();
      }
      var str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (var _i25 = 1; _i25 < lines.length; ++_i25) {
          var line = lines[_i25];
          str += line ? "\n".concat(indent).concat(line) : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment) onComment();
      } else if (chompKeep && onChompKeep) onChompKeep();
      return str;
    }
    function stringifyFlowCollection(_ref10, ctx, _ref11) {
      var comment = _ref10.comment,
        items = _ref10.items;
      var flowChars = _ref11.flowChars,
        itemIndent = _ref11.itemIndent,
        onComment = _ref11.onComment;
      var indent = ctx.indent,
        indentStep = ctx.indentStep,
        fcPadding = ctx.flowCollectionPadding,
        commentString = ctx.options.commentString;
      itemIndent += indentStep;
      var itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      var reqNewline = false;
      var linesAtValue = 0;
      var lines = [];
      var _loop11 = function _loop11() {
        var item = items[i];
        var comment2 = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore) lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment) comment2 = item.comment;
        } else if (identity.isPair(item)) {
          var ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore) lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment) reqNewline = true;
          }
          var iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment) comment2 = iv.comment;
            if (iv.commentBefore) reqNewline = true;
          } else if (item.value == null && ik && ik.comment) {
            comment2 = ik.comment;
          }
        }
        if (comment2) reqNewline = true;
        var str2 = stringify.stringify(item, itemCtx, function () {
          return comment2 = null;
        });
        if (i < items.length - 1) str2 += ",";
        if (comment2) str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (!reqNewline && (lines.length > linesAtValue || str2.includes("\n"))) reqNewline = true;
        lines.push(str2);
        linesAtValue = lines.length;
      };
      for (var i = 0; i < items.length; ++i) {
        _loop11();
      }
      var str;
      var start = flowChars.start,
        end = flowChars.end;
      if (lines.length === 0) {
        str = start + end;
      } else {
        if (!reqNewline) {
          var len = lines.reduce(function (sum, line) {
            return sum + line.length + 2;
          }, 2);
          reqNewline = len > Collection.Collection.maxFlowStringSingleLineLength;
        }
        if (reqNewline) {
          str = start;
          var _iterator20 = _createForOfIteratorHelper(lines),
            _step20;
          try {
            for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
              var line = _step20.value;
              str += line ? "\n".concat(indentStep).concat(indent).concat(line) : "\n";
            }
          } catch (err) {
            _iterator20.e(err);
          } finally {
            _iterator20.f();
          }
          str += "\n".concat(indent).concat(end);
        } else {
          str = "".concat(start).concat(fcPadding).concat(lines.join(" ")).concat(fcPadding).concat(end);
        }
      }
      if (comment) {
        str += stringifyComment.lineComment(str, indent, commentString(comment));
        if (onComment) onComment();
      }
      return str;
    }
    function addCommentBefore(_ref12, lines, comment, chompKeep) {
      var indent = _ref12.indent,
        commentString = _ref12.options.commentString;
      if (comment && chompKeep) comment = comment.replace(/^\n+/, "");
      if (comment) {
        var ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLMap.js": function node_modulesYamlDistNodesYAMLMapJs(exports) {
    "use strict";

    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      var k = identity.isScalar(key) ? key.value : key;
      var _iterator21 = _createForOfIteratorHelper(items),
        _step21;
      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var it = _step21.value;
          if (identity.isPair(it)) {
            if (it.key === key || it.key === k) return it;
            if (identity.isScalar(it.key) && it.key.value === k) return it;
          }
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
      return void 0;
    }
    var YAMLMap = /*#__PURE__*/function (_Collection$Collectio) {
      _inherits(YAMLMap, _Collection$Collectio);
      var _super11 = _createSuper(YAMLMap);
      function YAMLMap(schema) {
        var _this15;
        _classCallCheck(this, YAMLMap);
        _this15 = _super11.call(this, identity.MAP, schema);
        _this15.items = [];
        return _this15;
      }
      _createClass(YAMLMap, [{
        key: "add",
        value: function add(pair, overwrite) {
          var _this$schema;
          var _pair;
          if (identity.isPair(pair)) _pair = pair;else if (!pair || _typeof(pair) !== "object" || !("key" in pair)) {
            _pair = new Pair.Pair(pair, pair === null || pair === void 0 ? void 0 : pair.value);
          } else _pair = new Pair.Pair(pair.key, pair.value);
          var prev = findPair(this.items, _pair.key);
          var sortEntries = (_this$schema = this.schema) === null || _this$schema === void 0 ? void 0 : _this$schema.sortMapEntries;
          if (prev) {
            if (!overwrite) throw new Error("Key ".concat(_pair.key, " already set"));
            if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value)) prev.value.value = _pair.value;else prev.value = _pair.value;
          } else if (sortEntries) {
            var i = this.items.findIndex(function (item) {
              return sortEntries(_pair, item) < 0;
            });
            if (i === -1) this.items.push(_pair);else this.items.splice(i, 0, _pair);
          } else {
            this.items.push(_pair);
          }
        }
      }, {
        key: "delete",
        value: function _delete(key) {
          var it = findPair(this.items, key);
          if (!it) return false;
          var del = this.items.splice(this.items.indexOf(it), 1);
          return del.length > 0;
        }
      }, {
        key: "get",
        value: function get(key, keepScalar) {
          var _ref13;
          var it = findPair(this.items, key);
          var node = it === null || it === void 0 ? void 0 : it.value;
          return (_ref13 = !keepScalar && identity.isScalar(node) ? node.value : node) !== null && _ref13 !== void 0 ? _ref13 : void 0;
        }
      }, {
        key: "has",
        value: function has(key) {
          return !!findPair(this.items, key);
        }
      }, {
        key: "set",
        value: function set(key, value) {
          this.add(new Pair.Pair(key, value), true);
        }
      }, {
        key: "toJSON",
        value: function toJSON(_, ctx, Type) {
          var map = Type ? new Type() : ctx !== null && ctx !== void 0 && ctx.mapAsMap ? /* @__PURE__ */new Map() : {};
          if (ctx !== null && ctx !== void 0 && ctx.onCreate) ctx.onCreate(map);
          var _iterator22 = _createForOfIteratorHelper(this.items),
            _step22;
          try {
            for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
              var item = _step22.value;
              addPairToJSMap.addPairToJSMap(ctx, map, item);
            }
          } catch (err) {
            _iterator22.e(err);
          } finally {
            _iterator22.f();
          }
          return map;
        }
      }, {
        key: "toString",
        value: function toString(ctx, onComment, onChompKeep) {
          if (!ctx) return JSON.stringify(this);
          var _iterator23 = _createForOfIteratorHelper(this.items),
            _step23;
          try {
            for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
              var item = _step23.value;
              if (!identity.isPair(item)) throw new Error("Map items must all be pairs; found ".concat(JSON.stringify(item), " instead"));
            }
          } catch (err) {
            _iterator23.e(err);
          } finally {
            _iterator23.f();
          }
          if (!ctx.allNullValues && this.hasAllNullValues(false)) ctx = Object.assign({}, ctx, {
            allNullValues: true
          });
          return stringifyCollection.stringifyCollection(this, ctx, {
            blockItemPrefix: "",
            flowChars: {
              start: "{",
              end: "}"
            },
            itemIndent: ctx.indent || "",
            onChompKeep: onChompKeep,
            onComment: onComment
          });
        }
      }], [{
        key: "tagName",
        get: function get() {
          return "tag:yaml.org,2002:map";
        }
      }, {
        key: "from",
        value: function from(schema, obj, ctx) {
          var keepUndefined = ctx.keepUndefined,
            replacer = ctx.replacer;
          var map = new this(schema);
          var add = function add(key, value) {
            if (typeof replacer === "function") value = replacer.call(obj, key, value);else if (Array.isArray(replacer) && !replacer.includes(key)) return;
            if (value !== void 0 || keepUndefined) map.items.push(Pair.createPair(key, value, ctx));
          };
          if (obj instanceof Map) {
            var _iterator24 = _createForOfIteratorHelper(obj),
              _step24;
            try {
              for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                var _step24$value = _slicedToArray(_step24.value, 2),
                  key = _step24$value[0],
                  value = _step24$value[1];
                add(key, value);
              }
            } catch (err) {
              _iterator24.e(err);
            } finally {
              _iterator24.f();
            }
          } else if (obj && _typeof(obj) === "object") {
            for (var _i26 = 0, _Object$keys11 = Object.keys(obj); _i26 < _Object$keys11.length; _i26++) {
              var _key8 = _Object$keys11[_i26];
              add(_key8, obj[_key8]);
            }
          }
          if (typeof schema.sortMapEntries === "function") {
            map.items.sort(schema.sortMapEntries);
          }
          return map;
        }
      }]);
      return YAMLMap;
    }(Collection.Collection);
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});

// node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/yaml/dist/schema/common/map.js": function node_modulesYamlDistSchemaCommonMapJs(exports) {
    "use strict";

    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      "default": true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve: function resolve(map2, onError) {
        if (!identity.isMap(map2)) onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: function createNode(schema, obj, ctx) {
        return YAMLMap.YAMLMap.from(schema, obj, ctx);
      }
    };
    exports.map = map;
  }
});

// node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLSeq.js": function node_modulesYamlDistNodesYAMLSeqJs(exports) {
    "use strict";

    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = /*#__PURE__*/function (_Collection$Collectio2) {
      _inherits(YAMLSeq, _Collection$Collectio2);
      var _super12 = _createSuper(YAMLSeq);
      function YAMLSeq(schema) {
        var _this16;
        _classCallCheck(this, YAMLSeq);
        _this16 = _super12.call(this, identity.SEQ, schema);
        _this16.items = [];
        return _this16;
      }
      _createClass(YAMLSeq, [{
        key: "add",
        value: function add(value) {
          this.items.push(value);
        }
      }, {
        key: "delete",
        value: function _delete(key) {
          var idx = asItemIndex(key);
          if (typeof idx !== "number") return false;
          var del = this.items.splice(idx, 1);
          return del.length > 0;
        }
      }, {
        key: "get",
        value: function get(key, keepScalar) {
          var idx = asItemIndex(key);
          if (typeof idx !== "number") return void 0;
          var it = this.items[idx];
          return !keepScalar && identity.isScalar(it) ? it.value : it;
        }
      }, {
        key: "has",
        value: function has(key) {
          var idx = asItemIndex(key);
          return typeof idx === "number" && idx < this.items.length;
        }
      }, {
        key: "set",
        value: function set(key, value) {
          var idx = asItemIndex(key);
          if (typeof idx !== "number") throw new Error("Expected a valid index, not ".concat(key, "."));
          var prev = this.items[idx];
          if (identity.isScalar(prev) && Scalar.isScalarValue(value)) prev.value = value;else this.items[idx] = value;
        }
      }, {
        key: "toJSON",
        value: function toJSON(_, ctx) {
          var seq = [];
          if (ctx !== null && ctx !== void 0 && ctx.onCreate) ctx.onCreate(seq);
          var i = 0;
          var _iterator25 = _createForOfIteratorHelper(this.items),
            _step25;
          try {
            for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
              var item = _step25.value;
              seq.push(toJS.toJS(item, String(i++), ctx));
            }
          } catch (err) {
            _iterator25.e(err);
          } finally {
            _iterator25.f();
          }
          return seq;
        }
      }, {
        key: "toString",
        value: function toString(ctx, onComment, onChompKeep) {
          if (!ctx) return JSON.stringify(this);
          return stringifyCollection.stringifyCollection(this, ctx, {
            blockItemPrefix: "- ",
            flowChars: {
              start: "[",
              end: "]"
            },
            itemIndent: (ctx.indent || "") + "  ",
            onChompKeep: onChompKeep,
            onComment: onComment
          });
        }
      }], [{
        key: "tagName",
        get: function get() {
          return "tag:yaml.org,2002:seq";
        }
      }, {
        key: "from",
        value: function from(schema, obj, ctx) {
          var replacer = ctx.replacer;
          var seq = new this(schema);
          if (obj && Symbol.iterator in Object(obj)) {
            var i = 0;
            var _iterator26 = _createForOfIteratorHelper(obj),
              _step26;
            try {
              for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                var it = _step26.value;
                if (typeof replacer === "function") {
                  var key = obj instanceof Set ? it : String(i++);
                  it = replacer.call(obj, key, it);
                }
                seq.items.push(createNode.createNode(it, void 0, ctx));
              }
            } catch (err) {
              _iterator26.e(err);
            } finally {
              _iterator26.f();
            }
          }
          return seq;
        }
      }]);
      return YAMLSeq;
    }(Collection.Collection);
    function asItemIndex(key) {
      var idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string") idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/yaml/dist/schema/common/seq.js": function node_modulesYamlDistSchemaCommonSeqJs(exports) {
    "use strict";

    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      "default": true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve: function resolve(seq2, onError) {
        if (!identity.isSeq(seq2)) onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: function createNode(schema, obj, ctx) {
        return YAMLSeq.YAMLSeq.from(schema, obj, ctx);
      }
    };
    exports.seq = seq;
  }
});

// node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/yaml/dist/schema/common/string.js": function node_modulesYamlDistSchemaCommonStringJs(exports) {
    "use strict";

    var stringifyString = require_stringifyString();
    var string = {
      identify: function identify(value) {
        return typeof value === "string";
      },
      "default": true,
      tag: "tag:yaml.org,2002:str",
      resolve: function resolve(str) {
        return str;
      },
      stringify: function stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({
          actualString: true
        }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});

// node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/yaml/dist/schema/common/null.js": function node_modulesYamlDistSchemaCommonNullJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var nullTag = {
      identify: function identify(value) {
        return value == null;
      },
      createNode: function createNode() {
        return new Scalar.Scalar(null);
      },
      "default": true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: function resolve() {
        return new Scalar.Scalar(null);
      },
      stringify: function stringify(_ref14, ctx) {
        var source = _ref14.source;
        return typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr;
      }
    };
    exports.nullTag = nullTag;
  }
});

// node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/yaml/dist/schema/core/bool.js": function node_modulesYamlDistSchemaCoreBoolJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var boolTag = {
      identify: function identify(value) {
        return typeof value === "boolean";
      },
      "default": true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: function resolve(str) {
        return new Scalar.Scalar(str[0] === "t" || str[0] === "T");
      },
      stringify: function stringify(_ref15, ctx) {
        var source = _ref15.source,
          value = _ref15.value;
        if (source && boolTag.test.test(source)) {
          var sv = source[0] === "t" || source[0] === "T";
          if (value === sv) return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyNumber.js": function node_modulesYamlDistStringifyStringifyNumberJs(exports) {
    "use strict";

    function stringifyNumber(_ref16) {
      var format = _ref16.format,
        minFractionDigits = _ref16.minFractionDigits,
        tag = _ref16.tag,
        value = _ref16.value;
      if (typeof value === "bigint") return String(value);
      var num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num)) return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      var n = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        var i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        var d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0) n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/yaml/dist/schema/core/float.js": function node_modulesYamlDistSchemaCoreFloatJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
      resolve: function resolve(str) {
        return str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: function resolve(str) {
        return parseFloat(str);
      },
      stringify: function stringify(node) {
        var num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var _float = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve: function resolve(str) {
        var node = new Scalar.Scalar(parseFloat(str));
        var dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0") node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports["float"] = _float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/yaml/dist/schema/core/int.js": function node_modulesYamlDistSchemaCoreIntJs(exports) {
    "use strict";

    var stringifyNumber = require_stringifyNumber();
    var intIdentify = function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    };
    var intResolve = function intResolve(str, offset, radix, _ref17) {
      var intAsBigInt = _ref17.intAsBigInt;
      return intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    };
    function intStringify(node, radix, prefix) {
      var value = node.value;
      if (intIdentify(value) && value >= 0) return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: function identify(value) {
        return intIdentify(value) && value >= 0;
      },
      "default": true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 2, 8, opt);
      },
      stringify: function stringify(node) {
        return intStringify(node, 8, "0o");
      }
    };
    var _int = {
      identify: intIdentify,
      "default": true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 0, 10, opt);
      },
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: function identify(value) {
        return intIdentify(value) && value >= 0;
      },
      "default": true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 2, 16, opt);
      },
      stringify: function stringify(node) {
        return intStringify(node, 16, "0x");
      }
    };
    exports["int"] = _int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/yaml/dist/schema/core/schema.js": function node_modulesYamlDistSchemaCoreSchemaJs(exports) {
    "use strict";

    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var _float2 = require_float();
    var _int2 = require_int();
    var schema = [map.map, seq.seq, string.string, _null.nullTag, bool.boolTag, _int2.intOct, _int2["int"], _int2.intHex, _float2.floatNaN, _float2.floatExp, _float2["float"]];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/yaml/dist/schema/json/schema.js": function node_modulesYamlDistSchemaJsonSchemaJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = function stringifyJSON(_ref18) {
      var value = _ref18.value;
      return JSON.stringify(value);
    };
    var jsonScalars = [{
      identify: function identify(value) {
        return typeof value === "string";
      },
      "default": true,
      tag: "tag:yaml.org,2002:str",
      resolve: function resolve(str) {
        return str;
      },
      stringify: stringifyJSON
    }, {
      identify: function identify(value) {
        return value == null;
      },
      createNode: function createNode() {
        return new Scalar.Scalar(null);
      },
      "default": true,
      tag: "tag:yaml.org,2002:null",
      test: /^null$/,
      resolve: function resolve() {
        return null;
      },
      stringify: stringifyJSON
    }, {
      identify: function identify(value) {
        return typeof value === "boolean";
      },
      "default": true,
      tag: "tag:yaml.org,2002:bool",
      test: /^true|false$/,
      resolve: function resolve(str) {
        return str === "true";
      },
      stringify: stringifyJSON
    }, {
      identify: intIdentify,
      "default": true,
      tag: "tag:yaml.org,2002:int",
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: function resolve(str, _onError, _ref19) {
        var intAsBigInt = _ref19.intAsBigInt;
        return intAsBigInt ? BigInt(str) : parseInt(str, 10);
      },
      stringify: function stringify(_ref20) {
        var value = _ref20.value;
        return intIdentify(value) ? value.toString() : JSON.stringify(value);
      }
    }, {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: function resolve(str) {
        return parseFloat(str);
      },
      stringify: stringifyJSON
    }];
    var jsonError = {
      "default": true,
      tag: "",
      test: /^/,
      resolve: function resolve(str, onError) {
        onError("Unresolved plain scalar ".concat(JSON.stringify(str)));
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/binary.js": function node_modulesYamlDistSchemaYaml11BinaryJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: function identify(value) {
        return value instanceof Uint8Array;
      },
      "default": false,
      tag: "tag:yaml.org,2002:binary",
      resolve: function resolve(src, onError) {
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          var str = atob(src.replace(/[\n\r]/g, ""));
          var buffer = new Uint8Array(str.length);
          for (var i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify: function stringify(_ref21, ctx, onComment, onChompKeep) {
        var comment = _ref21.comment,
          type = _ref21.type,
          value = _ref21.value;
        var buf = value;
        var str;
        if (typeof Buffer === "function") {
          str = buf instanceof Buffer ? buf.toString("base64") : Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          var s = "";
          for (var i = 0; i < buf.length; ++i) s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type) type = Scalar.Scalar.BLOCK_LITERAL;
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          var lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          var n = Math.ceil(str.length / lineWidth);
          var lines = new Array(n);
          for (var _i27 = 0, o = 0; _i27 < n; ++_i27, o += lineWidth) {
            lines[_i27] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({
          comment: comment,
          type: type,
          value: str
        }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/pairs.js": function node_modulesYamlDistSchemaYaml11PairsJs(exports) {
    "use strict";

    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (var i = 0; i < seq.items.length; ++i) {
          var item = seq.items[i];
          if (identity.isPair(item)) continue;else if (identity.isMap(item)) {
            if (item.items.length > 1) onError("Each pair must have its own sequence indicator");
            var pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore) pair.key.commentBefore = pair.key.commentBefore ? "".concat(item.commentBefore, "\n").concat(pair.key.commentBefore) : item.commentBefore;
            if (item.comment) {
              var _pair$value;
              var cn = (_pair$value = pair.value) !== null && _pair$value !== void 0 ? _pair$value : pair.key;
              cn.comment = cn.comment ? "".concat(item.comment, "\n").concat(cn.comment) : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      var replacer = ctx.replacer;
      var pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      var i = 0;
      if (iterable && Symbol.iterator in Object(iterable)) {
        var _iterator27 = _createForOfIteratorHelper(iterable),
          _step27;
        try {
          for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
            var it = _step27.value;
            if (typeof replacer === "function") it = replacer.call(iterable, String(i++), it);
            var key = void 0,
              value = void 0;
            if (Array.isArray(it)) {
              if (it.length === 2) {
                key = it[0];
                value = it[1];
              } else throw new TypeError("Expected [key, value] tuple: ".concat(it));
            } else if (it && it instanceof Object) {
              var keys = Object.keys(it);
              if (keys.length === 1) {
                key = keys[0];
                value = it[key];
              } else throw new TypeError("Expected { key: value } tuple: ".concat(it));
            } else {
              key = it;
            }
            pairs2.items.push(Pair.createPair(key, value, ctx));
          }
        } catch (err) {
          _iterator27.e(err);
        } finally {
          _iterator27.f();
        }
      }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      "default": false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/omap.js": function node_modulesYamlDistSchemaYaml11OmapJs(exports) {
    "use strict";

    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = /*#__PURE__*/function (_YAMLSeq$YAMLSeq) {
      _inherits(YAMLOMap, _YAMLSeq$YAMLSeq);
      var _super13 = _createSuper(YAMLOMap);
      function YAMLOMap() {
        var _this17;
        _classCallCheck(this, YAMLOMap);
        _this17 = _super13.call(this);
        _this17.add = YAMLMap.YAMLMap.prototype.add.bind(_assertThisInitialized(_this17));
        _this17["delete"] = YAMLMap.YAMLMap.prototype["delete"].bind(_assertThisInitialized(_this17));
        _this17.get = YAMLMap.YAMLMap.prototype.get.bind(_assertThisInitialized(_this17));
        _this17.has = YAMLMap.YAMLMap.prototype.has.bind(_assertThisInitialized(_this17));
        _this17.set = YAMLMap.YAMLMap.prototype.set.bind(_assertThisInitialized(_this17));
        _this17.tag = YAMLOMap.tag;
        return _this17;
      }
      _createClass(YAMLOMap, [{
        key: "toJSON",
        value: function toJSON(_, ctx) {
          if (!ctx) return _get(_getPrototypeOf(YAMLOMap.prototype), "toJSON", this).call(this, _);
          var map = /* @__PURE__ */new Map();
          if (ctx !== null && ctx !== void 0 && ctx.onCreate) ctx.onCreate(map);
          var _iterator28 = _createForOfIteratorHelper(this.items),
            _step28;
          try {
            for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
              var pair = _step28.value;
              var key = void 0,
                value = void 0;
              if (identity.isPair(pair)) {
                key = toJS.toJS(pair.key, "", ctx);
                value = toJS.toJS(pair.value, key, ctx);
              } else {
                key = toJS.toJS(pair, "", ctx);
              }
              if (map.has(key)) throw new Error("Ordered maps must not include duplicate keys");
              map.set(key, value);
            }
          } catch (err) {
            _iterator28.e(err);
          } finally {
            _iterator28.f();
          }
          return map;
        }
      }], [{
        key: "from",
        value: function from(schema, iterable, ctx) {
          var pairs$1 = pairs.createPairs(schema, iterable, ctx);
          var omap2 = new this();
          omap2.items = pairs$1.items;
          return omap2;
        }
      }]);
      return YAMLOMap;
    }(YAMLSeq.YAMLSeq);
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: function identify(value) {
        return value instanceof Map;
      },
      nodeClass: YAMLOMap,
      "default": false,
      tag: "tag:yaml.org,2002:omap",
      resolve: function resolve(seq, onError) {
        var pairs$1 = pairs.resolvePairs(seq, onError);
        var seenKeys = [];
        var _iterator29 = _createForOfIteratorHelper(pairs$1.items),
          _step29;
        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            var key = _step29.value.key;
            if (identity.isScalar(key)) {
              if (seenKeys.includes(key.value)) {
                onError("Ordered maps must not include duplicate keys: ".concat(key.value));
              } else {
                seenKeys.push(key.value);
              }
            }
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: function createNode(schema, iterable, ctx) {
        return YAMLOMap.from(schema, iterable, ctx);
      }
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/bool.js": function node_modulesYamlDistSchemaYaml11BoolJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    function boolStringify(_ref22, ctx) {
      var value = _ref22.value,
        source = _ref22.source;
      var boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source)) return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: function identify(value) {
        return value === true;
      },
      "default": true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: function resolve() {
        return new Scalar.Scalar(true);
      },
      stringify: boolStringify
    };
    var falseTag = {
      identify: function identify(value) {
        return value === false;
      },
      "default": true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: function resolve() {
        return new Scalar.Scalar(false);
      },
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/float.js": function node_modulesYamlDistSchemaYaml11FloatJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
      resolve: function resolve(str) {
        return str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: function resolve(str) {
        return parseFloat(str.replace(/_/g, ""));
      },
      stringify: function stringify(node) {
        var num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var _float3 = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve: function resolve(str) {
        var node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        var dot = str.indexOf(".");
        if (dot !== -1) {
          var f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0") node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports["float"] = _float3;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/int.js": function node_modulesYamlDistSchemaYaml11IntJs(exports) {
    "use strict";

    var stringifyNumber = require_stringifyNumber();
    var intIdentify = function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    };
    function intResolve(str, offset, radix, _ref23) {
      var intAsBigInt = _ref23.intAsBigInt;
      var sign = str[0];
      if (sign === "-" || sign === "+") offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = "0b".concat(str);
            break;
          case 8:
            str = "0o".concat(str);
            break;
          case 16:
            str = "0x".concat(str);
            break;
        }
        var n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      var n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      var value = node.value;
      if (intIdentify(value)) {
        var str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      "default": true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 2, 2, opt);
      },
      stringify: function stringify(node) {
        return intStringify(node, 2, "0b");
      }
    };
    var intOct = {
      identify: intIdentify,
      "default": true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 1, 8, opt);
      },
      stringify: function stringify(node) {
        return intStringify(node, 8, "0");
      }
    };
    var _int3 = {
      identify: intIdentify,
      "default": true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 0, 10, opt);
      },
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      "default": true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: function resolve(str, _onError, opt) {
        return intResolve(str, 2, 16, opt);
      },
      stringify: function stringify(node) {
        return intStringify(node, 16, "0x");
      }
    };
    exports["int"] = _int3;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/set.js": function node_modulesYamlDistSchemaYaml11SetJs(exports) {
    "use strict";

    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = /*#__PURE__*/function (_YAMLMap$YAMLMap) {
      _inherits(YAMLSet, _YAMLMap$YAMLMap);
      var _super14 = _createSuper(YAMLSet);
      function YAMLSet(schema) {
        var _this18;
        _classCallCheck(this, YAMLSet);
        _this18 = _super14.call(this, schema);
        _this18.tag = YAMLSet.tag;
        return _this18;
      }
      _createClass(YAMLSet, [{
        key: "add",
        value: function add(key) {
          var pair;
          if (identity.isPair(key)) pair = key;else if (key && _typeof(key) === "object" && "key" in key && "value" in key && key.value === null) pair = new Pair.Pair(key.key, null);else pair = new Pair.Pair(key, null);
          var prev = YAMLMap.findPair(this.items, pair.key);
          if (!prev) this.items.push(pair);
        }
      }, {
        key: "get",
        value: function get(key, keepPair) {
          var pair = YAMLMap.findPair(this.items, key);
          return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
        }
      }, {
        key: "set",
        value: function set(key, value) {
          if (typeof value !== "boolean") throw new Error("Expected boolean value for set(key, value) in a YAML set, not ".concat(_typeof(value)));
          var prev = YAMLMap.findPair(this.items, key);
          if (prev && !value) {
            this.items.splice(this.items.indexOf(prev), 1);
          } else if (!prev && value) {
            this.items.push(new Pair.Pair(key));
          }
        }
      }, {
        key: "toJSON",
        value: function toJSON(_, ctx) {
          return _get(_getPrototypeOf(YAMLSet.prototype), "toJSON", this).call(this, _, ctx, Set);
        }
      }, {
        key: "toString",
        value: function toString(ctx, onComment, onChompKeep) {
          if (!ctx) return JSON.stringify(this);
          if (this.hasAllNullValues(true)) return _get(_getPrototypeOf(YAMLSet.prototype), "toString", this).call(this, Object.assign({}, ctx, {
            allNullValues: true
          }), onComment, onChompKeep);else throw new Error("Set items must all have null values");
        }
      }], [{
        key: "from",
        value: function from(schema, iterable, ctx) {
          var replacer = ctx.replacer;
          var set2 = new this(schema);
          if (iterable && Symbol.iterator in Object(iterable)) {
            var _iterator30 = _createForOfIteratorHelper(iterable),
              _step30;
            try {
              for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
                var value = _step30.value;
                if (typeof replacer === "function") value = replacer.call(iterable, value, value);
                set2.items.push(Pair.createPair(value, null, ctx));
              }
            } catch (err) {
              _iterator30.e(err);
            } finally {
              _iterator30.f();
            }
          }
          return set2;
        }
      }]);
      return YAMLSet;
    }(YAMLMap.YAMLMap);
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: function identify(value) {
        return value instanceof Set;
      },
      nodeClass: YAMLSet,
      "default": false,
      tag: "tag:yaml.org,2002:set",
      createNode: function createNode(schema, iterable, ctx) {
        return YAMLSet.from(schema, iterable, ctx);
      },
      resolve: function resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true)) return Object.assign(new YAMLSet(), map);else onError("Set items must all have null values");
        } else onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/timestamp.js": function node_modulesYamlDistSchemaYaml11TimestampJs(exports) {
    "use strict";

    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      var sign = str[0];
      var parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      var num = function num(n) {
        return asBigInt ? BigInt(n) : Number(n);
      };
      var res = parts.replace(/_/g, "").split(":").reduce(function (res2, p) {
        return res2 * num(60) + num(p);
      }, num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      var value = node.value;
      var num = function num(n) {
        return n;
      };
      if (typeof value === "bigint") num = function num(n) {
        return BigInt(n);
      };else if (isNaN(value) || !isFinite(value)) return stringifyNumber.stringifyNumber(node);
      var sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      var _60 = num(60);
      var parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map(function (n) {
        return String(n).padStart(2, "0");
      }).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: function identify(value) {
        return typeof value === "bigint" || Number.isInteger(value);
      },
      "default": true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: function resolve(str, _onError, _ref24) {
        var intAsBigInt = _ref24.intAsBigInt;
        return parseSexagesimal(str, intAsBigInt);
      },
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: function identify(value) {
        return typeof value === "number";
      },
      "default": true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: function resolve(str) {
        return parseSexagesimal(str, false);
      },
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: function identify(value) {
        return value instanceof Date;
      },
      "default": true,
      tag: "tag:yaml.org,2002:timestamp",
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve: function resolve(str) {
        var match = str.match(timestamp.test);
        if (!match) throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        var _match$map = match.map(Number),
          _match$map2 = _slicedToArray(_match$map, 7),
          year = _match$map2[1],
          month = _match$map2[2],
          day = _match$map2[3],
          hour = _match$map2[4],
          minute = _match$map2[5],
          second = _match$map2[6];
        var millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        var date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        var tz = match[8];
        if (tz && tz !== "Z") {
          var d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30) d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: function stringify(_ref25) {
        var value = _ref25.value;
        return value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "");
      }
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/schema.js": function node_modulesYamlDistSchemaYaml11SchemaJs(exports) {
    "use strict";

    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var _float4 = require_float2();
    var _int4 = require_int2();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [map.map, seq.seq, string.string, _null.nullTag, bool.trueTag, bool.falseTag, _int4.intBin, _int4.intOct, _int4["int"], _int4.intHex, _float4.floatNaN, _float4.floatExp, _float4["float"], binary.binary, omap.omap, pairs.pairs, set.set, timestamp.intTime, timestamp.floatTime, timestamp.timestamp];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/yaml/dist/schema/tags.js": function node_modulesYamlDistSchemaTagsJs(exports) {
    "use strict";

    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var _float5 = require_float();
    var _int5 = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */new Map([["core", schema.schema], ["failsafe", [map.map, seq.seq, string.string]], ["json", schema$1.schema], ["yaml11", schema$2.schema], ["yaml-1.1", schema$2.schema]]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      "float": _float5["float"],
      floatExp: _float5.floatExp,
      floatNaN: _float5.floatNaN,
      floatTime: timestamp.floatTime,
      "int": _int5["int"],
      intHex: _int5.intHex,
      intOct: _int5.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      "null": _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName) {
      var tags = schemas.get(schemaName);
      if (!tags) {
        if (Array.isArray(customTags)) tags = [];else {
          var keys = Array.from(schemas.keys()).filter(function (key) {
            return key !== "yaml11";
          }).map(function (key) {
            return JSON.stringify(key);
          }).join(", ");
          throw new Error("Unknown schema \"".concat(schemaName, "\"; use one of ").concat(keys, " or define customTags array"));
        }
      }
      if (Array.isArray(customTags)) {
        var _iterator31 = _createForOfIteratorHelper(customTags),
          _step31;
        try {
          for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
            var tag = _step31.value;
            tags = tags.concat(tag);
          }
        } catch (err) {
          _iterator31.e(err);
        } finally {
          _iterator31.f();
        }
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      return tags.map(function (tag) {
        if (typeof tag !== "string") return tag;
        var tagObj = tagsByName[tag];
        if (tagObj) return tagObj;
        var keys = Object.keys(tagsByName).map(function (key) {
          return JSON.stringify(key);
        }).join(", ");
        throw new Error("Unknown custom tag \"".concat(tag, "\"; use one of ").concat(keys));
      });
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/yaml/dist/schema/Schema.js": function node_modulesYamlDistSchemaSchemaJs(exports) {
    "use strict";

    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = function sortMapEntriesByKey(a, b) {
      return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    };
    var Schema = /*#__PURE__*/function () {
      function Schema(_ref26) {
        var compat = _ref26.compat,
          customTags = _ref26.customTags,
          merge2 = _ref26.merge,
          resolveKnownTags = _ref26.resolveKnownTags,
          schema = _ref26.schema,
          sortMapEntries = _ref26.sortMapEntries,
          toStringDefaults = _ref26.toStringDefaults;
        _classCallCheck(this, Schema);
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.merge = !!merge2;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name);
        this.toStringOptions = toStringDefaults !== null && toStringDefaults !== void 0 ? toStringDefaults : null;
        Object.defineProperty(this, identity.MAP, {
          value: map.map
        });
        Object.defineProperty(this, identity.SCALAR, {
          value: string.string
        });
        Object.defineProperty(this, identity.SEQ, {
          value: seq.seq
        });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      _createClass(Schema, [{
        key: "clone",
        value: function clone() {
          var copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
          copy.tags = this.tags.slice();
          return copy;
        }
      }]);
      return Schema;
    }();
    exports.Schema = Schema;
  }
});

// node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyDocument.js": function node_modulesYamlDistStringifyStringifyDocumentJs(exports) {
    "use strict";

    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      var _doc$directives;
      var lines = [];
      var hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        var dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart) hasDirectives = true;
      }
      if (hasDirectives) lines.push("---");
      var ctx = stringify.createStringifyContext(doc, options);
      var commentString = ctx.options.commentString;
      if (doc.commentBefore) {
        if (lines.length !== 1) lines.unshift("");
        var cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      var chompKeep = false;
      var contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives) lines.push("");
          if (doc.contents.commentBefore) {
            var _cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(_cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        var onChompKeep = contentComment ? void 0 : function () {
          return chompKeep = true;
        };
        var body = stringify.stringify(doc.contents, ctx, function () {
          return contentComment = null;
        }, onChompKeep);
        if (contentComment) body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = "--- ".concat(body);
        } else lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if ((_doc$directives = doc.directives) !== null && _doc$directives !== void 0 && _doc$directives.docEnd) {
        if (doc.comment) {
          var _cs2 = commentString(doc.comment);
          if (_cs2.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(_cs2, ""));
          } else {
            lines.push("... ".concat(_cs2));
          }
        } else {
          lines.push("...");
        }
      } else {
        var dc = doc.comment;
        if (dc && chompKeep) dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "") lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/yaml/dist/doc/Document.js": function node_modulesYamlDistDocDocumentJs(exports) {
    "use strict";

    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var _toJS2 = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var _createNode = require_createNode();
    var directives = require_directives();
    var Document = /*#__PURE__*/function () {
      function Document(value, replacer, options) {
        var _options;
        _classCallCheck(this, Document);
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, {
          value: identity.DOC
        });
        var _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        var opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        var version = opt.version;
        if ((_options = options) !== null && _options !== void 0 && _options._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit) version = this.directives.yaml.version;
        } else this.directives = new directives.Directives({
          version: version
        });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      _createClass(Document, [{
        key: "clone",
        value: function clone() {
          var copy = Object.create(Document.prototype, _defineProperty({}, identity.NODE_TYPE, {
            value: identity.DOC
          }));
          copy.commentBefore = this.commentBefore;
          copy.comment = this.comment;
          copy.errors = this.errors.slice();
          copy.warnings = this.warnings.slice();
          copy.options = Object.assign({}, this.options);
          if (this.directives) copy.directives = this.directives.clone();
          copy.schema = this.schema.clone();
          copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
          if (this.range) copy.range = this.range.slice();
          return copy;
        }
      }, {
        key: "add",
        value: function add(value) {
          if (assertCollection(this.contents)) this.contents.add(value);
        }
      }, {
        key: "addIn",
        value: function addIn(path2, value) {
          if (assertCollection(this.contents)) this.contents.addIn(path2, value);
        }
      }, {
        key: "createAlias",
        value: function createAlias(node, name) {
          if (!node.anchor) {
            var prev = anchors.anchorNames(this);
            node.anchor = !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
          }
          return new Alias.Alias(node.anchor);
        }
      }, {
        key: "createNode",
        value: function createNode(value, replacer, options) {
          var _options2;
          var _replacer = void 0;
          if (typeof replacer === "function") {
            value = replacer.call({
              "": value
            }, "", value);
            _replacer = replacer;
          } else if (Array.isArray(replacer)) {
            var keyToStr = function keyToStr(v) {
              return typeof v === "number" || v instanceof String || v instanceof Number;
            };
            var asStr = replacer.filter(keyToStr).map(String);
            if (asStr.length > 0) replacer = replacer.concat(asStr);
            _replacer = replacer;
          } else if (options === void 0 && replacer) {
            options = replacer;
            replacer = void 0;
          }
          var _ref27 = (_options2 = options) !== null && _options2 !== void 0 ? _options2 : {},
            aliasDuplicateObjects = _ref27.aliasDuplicateObjects,
            anchorPrefix = _ref27.anchorPrefix,
            flow = _ref27.flow,
            keepUndefined = _ref27.keepUndefined,
            onTagObj = _ref27.onTagObj,
            tag = _ref27.tag;
          var _anchors$createNodeAn = anchors.createNodeAnchors(this, anchorPrefix || "a"),
            onAnchor = _anchors$createNodeAn.onAnchor,
            setAnchors = _anchors$createNodeAn.setAnchors,
            sourceObjects = _anchors$createNodeAn.sourceObjects;
          var ctx = {
            aliasDuplicateObjects: aliasDuplicateObjects !== null && aliasDuplicateObjects !== void 0 ? aliasDuplicateObjects : true,
            keepUndefined: keepUndefined !== null && keepUndefined !== void 0 ? keepUndefined : false,
            onAnchor: onAnchor,
            onTagObj: onTagObj,
            replacer: _replacer,
            schema: this.schema,
            sourceObjects: sourceObjects
          };
          var node = _createNode.createNode(value, tag, ctx);
          if (flow && identity.isCollection(node)) node.flow = true;
          setAnchors();
          return node;
        }
      }, {
        key: "createPair",
        value: function createPair(key, value) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var k = this.createNode(key, null, options);
          var v = this.createNode(value, null, options);
          return new Pair.Pair(k, v);
        }
      }, {
        key: "delete",
        value: function _delete(key) {
          return assertCollection(this.contents) ? this.contents["delete"](key) : false;
        }
      }, {
        key: "deleteIn",
        value: function deleteIn(path2) {
          if (Collection.isEmptyPath(path2)) {
            if (this.contents == null) return false;
            this.contents = null;
            return true;
          }
          return assertCollection(this.contents) ? this.contents.deleteIn(path2) : false;
        }
      }, {
        key: "get",
        value: function get(key, keepScalar) {
          return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
        }
      }, {
        key: "getIn",
        value: function getIn(path2, keepScalar) {
          if (Collection.isEmptyPath(path2)) return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
          return identity.isCollection(this.contents) ? this.contents.getIn(path2, keepScalar) : void 0;
        }
      }, {
        key: "has",
        value: function has(key) {
          return identity.isCollection(this.contents) ? this.contents.has(key) : false;
        }
      }, {
        key: "hasIn",
        value: function hasIn(path2) {
          if (Collection.isEmptyPath(path2)) return this.contents !== void 0;
          return identity.isCollection(this.contents) ? this.contents.hasIn(path2) : false;
        }
      }, {
        key: "set",
        value: function set(key, value) {
          if (this.contents == null) {
            this.contents = Collection.collectionFromPath(this.schema, [key], value);
          } else if (assertCollection(this.contents)) {
            this.contents.set(key, value);
          }
        }
      }, {
        key: "setIn",
        value: function setIn(path2, value) {
          if (Collection.isEmptyPath(path2)) {
            this.contents = value;
          } else if (this.contents == null) {
            this.contents = Collection.collectionFromPath(this.schema, Array.from(path2), value);
          } else if (assertCollection(this.contents)) {
            this.contents.setIn(path2, value);
          }
        }
      }, {
        key: "setSchema",
        value: function setSchema(version) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (typeof version === "number") version = String(version);
          var opt;
          switch (version) {
            case "1.1":
              if (this.directives) this.directives.yaml.version = "1.1";else this.directives = new directives.Directives({
                version: "1.1"
              });
              opt = {
                merge: true,
                resolveKnownTags: false,
                schema: "yaml-1.1"
              };
              break;
            case "1.2":
            case "next":
              if (this.directives) this.directives.yaml.version = version;else this.directives = new directives.Directives({
                version: version
              });
              opt = {
                merge: false,
                resolveKnownTags: true,
                schema: "core"
              };
              break;
            case null:
              if (this.directives) delete this.directives;
              opt = null;
              break;
            default:
              {
                var sv = JSON.stringify(version);
                throw new Error("Expected '1.1', '1.2' or null as first argument, but found: ".concat(sv));
              }
          }
          if (options.schema instanceof Object) this.schema = options.schema;else if (opt) this.schema = new Schema.Schema(Object.assign(opt, options));else throw new Error("With a null YAML version, the { schema: Schema } option is required");
        }
      }, {
        key: "toJS",
        value: function toJS() {
          var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            json = _ref28.json,
            jsonArg = _ref28.jsonArg,
            mapAsMap = _ref28.mapAsMap,
            maxAliasCount = _ref28.maxAliasCount,
            onAnchor = _ref28.onAnchor,
            reviver = _ref28.reviver;
          var ctx = {
            anchors: /* @__PURE__ */new Map(),
            doc: this,
            keep: !json,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
          };
          var res = _toJS2.toJS(this.contents, jsonArg !== null && jsonArg !== void 0 ? jsonArg : "", ctx);
          if (typeof onAnchor === "function") {
            var _iterator32 = _createForOfIteratorHelper(ctx.anchors.values()),
              _step32;
            try {
              for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
                var _step32$value = _step32.value,
                  count = _step32$value.count,
                  res2 = _step32$value.res;
                onAnchor(res2, count);
              }
            } catch (err) {
              _iterator32.e(err);
            } finally {
              _iterator32.f();
            }
          }
          return typeof reviver === "function" ? applyReviver.applyReviver(reviver, {
            "": res
          }, "", res) : res;
        }
      }, {
        key: "toJSON",
        value: function toJSON(jsonArg, onAnchor) {
          return this.toJS({
            json: true,
            jsonArg: jsonArg,
            mapAsMap: false,
            onAnchor: onAnchor
          });
        }
      }, {
        key: "toString",
        value: function toString() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          if (this.errors.length > 0) throw new Error("Document with errors cannot be stringified");
          if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
            var s = JSON.stringify(options.indent);
            throw new Error("\"indent\" option must be a positive integer, not ".concat(s));
          }
          return stringifyDocument.stringifyDocument(this, options);
        }
      }]);
      return Document;
    }();
    function assertCollection(contents) {
      if (identity.isCollection(contents)) return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "node_modules/yaml/dist/errors.js": function node_modulesYamlDistErrorsJs(exports) {
    "use strict";

    var YAMLError = /*#__PURE__*/function (_Error) {
      _inherits(YAMLError, _Error);
      var _super15 = _createSuper(YAMLError);
      function YAMLError(name, pos, code, message) {
        var _this19;
        _classCallCheck(this, YAMLError);
        _this19 = _super15.call(this);
        _this19.name = name;
        _this19.code = code;
        _this19.message = message;
        _this19.pos = pos;
        return _this19;
      }
      return _createClass(YAMLError);
    }( /*#__PURE__*/_wrapNativeSuper(Error));
    var YAMLParseError = /*#__PURE__*/function (_YAMLError) {
      _inherits(YAMLParseError, _YAMLError);
      var _super16 = _createSuper(YAMLParseError);
      function YAMLParseError(pos, code, message) {
        _classCallCheck(this, YAMLParseError);
        return _super16.call(this, "YAMLParseError", pos, code, message);
      }
      return _createClass(YAMLParseError);
    }(YAMLError);
    var YAMLWarning = /*#__PURE__*/function (_YAMLError2) {
      _inherits(YAMLWarning, _YAMLError2);
      var _super17 = _createSuper(YAMLWarning);
      function YAMLWarning(pos, code, message) {
        _classCallCheck(this, YAMLWarning);
        return _super17.call(this, "YAMLWarning", pos, code, message);
      }
      return _createClass(YAMLWarning);
    }(YAMLError);
    var prettifyError = function prettifyError(src, lc) {
      return function (error) {
        if (error.pos[0] === -1) return;
        error.linePos = error.pos.map(function (pos) {
          return lc.linePos(pos);
        });
        var _error$linePos$ = error.linePos[0],
          line = _error$linePos$.line,
          col = _error$linePos$.col;
        error.message += " at line ".concat(line, ", column ").concat(col);
        var ci = col - 1;
        var lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
        if (ci >= 60 && lineStr.length > 80) {
          var trimStart = Math.min(ci - 39, lineStr.length - 79);
          lineStr = "\u2026" + lineStr.substring(trimStart);
          ci -= trimStart - 1;
        }
        if (lineStr.length > 80) lineStr = lineStr.substring(0, 79) + "\u2026";
        if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
          var prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
          if (prev.length > 80) prev = prev.substring(0, 79) + "\u2026\n";
          lineStr = prev + lineStr;
        }
        if (/[^ ]/.test(lineStr)) {
          var count = 1;
          var end = error.linePos[1];
          if (end && end.line === line && end.col > col) {
            count = Math.max(1, Math.min(end.col - col, 80 - ci));
          }
          var pointer = " ".repeat(ci) + "^".repeat(count);
          error.message += ":\n\n".concat(lineStr, "\n").concat(pointer, "\n");
        }
      };
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/yaml/dist/compose/resolve-props.js": function node_modulesYamlDistComposeResolvePropsJs(exports) {
    "use strict";

    function resolveProps(tokens, _ref29) {
      var _start;
      var flow = _ref29.flow,
        indicator = _ref29.indicator,
        next = _ref29.next,
        offset = _ref29.offset,
        onError = _ref29.onError,
        startOnNewline = _ref29.startOnNewline;
      var spaceBefore = false;
      var atNewline = startOnNewline;
      var hasSpace = startOnNewline;
      var comment = "";
      var commentSep = "";
      var hasNewline = false;
      var hasNewlineAfterProp = false;
      var reqSpace = false;
      var anchor = null;
      var tag = null;
      var comma = null;
      var found = null;
      var start = null;
      var _iterator33 = _createForOfIteratorHelper(tokens),
        _step33;
      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var token = _step33.value;
          if (reqSpace) {
            if (token.type !== "space" && token.type !== "newline" && token.type !== "comma") onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
            reqSpace = false;
          }
          switch (token.type) {
            case "space":
              if (!flow && atNewline && indicator !== "doc-start" && token.source[0] === "	") onError(token, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
              hasSpace = true;
              break;
            case "comment":
              {
                if (!hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
                var cb = token.source.substring(1) || " ";
                if (!comment) comment = cb;else comment += commentSep + cb;
                commentSep = "";
                atNewline = false;
                break;
              }
            case "newline":
              if (atNewline) {
                if (comment) comment += token.source;else spaceBefore = true;
              } else commentSep += token.source;
              atNewline = true;
              hasNewline = true;
              if (anchor || tag) hasNewlineAfterProp = true;
              hasSpace = true;
              break;
            case "anchor":
              if (anchor) onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
              if (token.source.endsWith(":")) onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
              anchor = token;
              if (start === null) start = token.offset;
              atNewline = false;
              hasSpace = false;
              reqSpace = true;
              break;
            case "tag":
              {
                if (tag) onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
                tag = token;
                if (start === null) start = token.offset;
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
              }
            case indicator:
              if (anchor || tag) onError(token, "BAD_PROP_ORDER", "Anchors and tags must be after the ".concat(token.source, " indicator"));
              if (found) onError(token, "UNEXPECTED_TOKEN", "Unexpected ".concat(token.source, " in ").concat(flow !== null && flow !== void 0 ? flow : "collection"));
              found = token;
              atNewline = false;
              hasSpace = false;
              break;
            case "comma":
              if (flow) {
                if (comma) onError(token, "UNEXPECTED_TOKEN", "Unexpected , in ".concat(flow));
                comma = token;
                atNewline = false;
                hasSpace = false;
                break;
              }
            default:
              onError(token, "UNEXPECTED_TOKEN", "Unexpected ".concat(token.type, " token"));
              atNewline = false;
              hasSpace = false;
          }
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
      }
      var last = tokens[tokens.length - 1];
      var end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      return {
        comma: comma,
        found: found,
        spaceBefore: spaceBefore,
        comment: comment,
        hasNewline: hasNewline,
        hasNewlineAfterProp: hasNewlineAfterProp,
        anchor: anchor,
        tag: tag,
        end: end,
        start: (_start = start) !== null && _start !== void 0 ? _start : end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/yaml/dist/compose/util-contains-newline.js": function node_modulesYamlDistComposeUtilContainsNewlineJs(exports) {
    "use strict";

    function containsNewline(key) {
      if (!key) return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n")) return true;
          if (key.end) {
            var _iterator34 = _createForOfIteratorHelper(key.end),
              _step34;
            try {
              for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
                var st = _step34.value;
                if (st.type === "newline") return true;
              }
            } catch (err) {
              _iterator34.e(err);
            } finally {
              _iterator34.f();
            }
          }
          return false;
        case "flow-collection":
          var _iterator35 = _createForOfIteratorHelper(key.items),
            _step35;
          try {
            for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
              var it = _step35.value;
              var _iterator36 = _createForOfIteratorHelper(it.start),
                _step36;
              try {
                for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
                  var _st2 = _step36.value;
                  if (_st2.type === "newline") return true;
                }
              } catch (err) {
                _iterator36.e(err);
              } finally {
                _iterator36.f();
              }
              if (it.sep) {
                var _iterator37 = _createForOfIteratorHelper(it.sep),
                  _step37;
                try {
                  for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
                    var _st = _step37.value;
                    if (_st.type === "newline") return true;
                  }
                } catch (err) {
                  _iterator37.e(err);
                } finally {
                  _iterator37.f();
                }
              }
              if (containsNewline(it.key) || containsNewline(it.value)) return true;
            }
          } catch (err) {
            _iterator35.e(err);
          } finally {
            _iterator35.f();
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/yaml/dist/compose/util-flow-indent-check.js": function node_modulesYamlDistComposeUtilFlowIndentCheckJs(exports) {
    "use strict";

    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if ((fc === null || fc === void 0 ? void 0 : fc.type) === "flow-collection") {
        var end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          var msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/yaml/dist/compose/util-map-includes.js": function node_modulesYamlDistComposeUtilMapIncludesJs(exports) {
    "use strict";

    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      var uniqueKeys = ctx.options.uniqueKeys;
      if (uniqueKeys === false) return false;
      var isEqual = typeof uniqueKeys === "function" ? uniqueKeys : function (a, b) {
        return a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value && !(a.value === "<<" && ctx.schema.merge);
      };
      return items.some(function (pair) {
        return isEqual(pair.key, search);
      });
    }
    exports.mapIncludes = mapIncludes;
  }
});

// node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-map.js": function node_modulesYamlDistComposeResolveBlockMapJs(exports) {
    "use strict";

    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap(_ref30, ctx, bm, onError, tag) {
      var _tag$nodeClass, _commentEnd;
      var composeNode = _ref30.composeNode,
        composeEmptyNode = _ref30.composeEmptyNode;
      var NodeClass = (_tag$nodeClass = tag === null || tag === void 0 ? void 0 : tag.nodeClass) !== null && _tag$nodeClass !== void 0 ? _tag$nodeClass : YAMLMap.YAMLMap;
      var map = new NodeClass(ctx.schema);
      if (ctx.atRoot) ctx.atRoot = false;
      var offset = bm.offset;
      var commentEnd = null;
      var _iterator38 = _createForOfIteratorHelper(bm.items),
        _step38;
      try {
        for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
          var _keyProps$found;
          var collItem = _step38.value;
          var start = collItem.start,
            key = collItem.key,
            sep = collItem.sep,
            value = collItem.value;
          var keyProps = resolveProps.resolveProps(start, {
            indicator: "explicit-key-ind",
            next: key !== null && key !== void 0 ? key : sep === null || sep === void 0 ? void 0 : sep[0],
            offset: offset,
            onError: onError,
            startOnNewline: true
          });
          var implicitKey = !keyProps.found;
          if (implicitKey) {
            if (key) {
              if (key.type === "block-seq") onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");else if ("indent" in key && key.indent !== bm.indent) onError(offset, "BAD_INDENT", startColMsg);
            }
            if (!keyProps.anchor && !keyProps.tag && !sep) {
              commentEnd = keyProps.end;
              if (keyProps.comment) {
                if (map.comment) map.comment += "\n" + keyProps.comment;else map.comment = keyProps.comment;
              }
              continue;
            }
            if (keyProps.hasNewlineAfterProp || utilContainsNewline.containsNewline(key)) {
              onError(key !== null && key !== void 0 ? key : start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
            }
          } else if (((_keyProps$found = keyProps.found) === null || _keyProps$found === void 0 ? void 0 : _keyProps$found.indent) !== bm.indent) {
            onError(offset, "BAD_INDENT", startColMsg);
          }
          var keyStart = keyProps.end;
          var keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
          if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
          if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode)) onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
          var valueProps = resolveProps.resolveProps(sep !== null && sep !== void 0 ? sep : [], {
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError: onError,
            startOnNewline: !key || key.type === "block-scalar"
          });
          offset = valueProps.end;
          if (valueProps.found) {
            if (implicitKey) {
              if ((value === null || value === void 0 ? void 0 : value.type) === "block-map" && !valueProps.hasNewline) onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
              if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024) onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
            }
            var valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
            if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
            offset = valueNode.range[2];
            var pair = new Pair.Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
            map.items.push(pair);
          } else {
            if (implicitKey) onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
            if (valueProps.comment) {
              if (keyNode.comment) keyNode.comment += "\n" + valueProps.comment;else keyNode.comment = valueProps.comment;
            }
            var _pair2 = new Pair.Pair(keyNode);
            if (ctx.options.keepSourceTokens) _pair2.srcToken = collItem;
            map.items.push(_pair2);
          }
        }
      } catch (err) {
        _iterator38.e(err);
      } finally {
        _iterator38.f();
      }
      if (commentEnd && commentEnd < offset) onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, (_commentEnd = commentEnd) !== null && _commentEnd !== void 0 ? _commentEnd : offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-seq.js": function node_modulesYamlDistComposeResolveBlockSeqJs(exports) {
    "use strict";

    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq(_ref31, ctx, bs, onError, tag) {
      var _tag$nodeClass2, _commentEnd2;
      var composeNode = _ref31.composeNode,
        composeEmptyNode = _ref31.composeEmptyNode;
      var NodeClass = (_tag$nodeClass2 = tag === null || tag === void 0 ? void 0 : tag.nodeClass) !== null && _tag$nodeClass2 !== void 0 ? _tag$nodeClass2 : YAMLSeq.YAMLSeq;
      var seq = new NodeClass(ctx.schema);
      if (ctx.atRoot) ctx.atRoot = false;
      var offset = bs.offset;
      var commentEnd = null;
      var _iterator39 = _createForOfIteratorHelper(bs.items),
        _step39;
      try {
        for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
          var _step39$value = _step39.value,
            start = _step39$value.start,
            value = _step39$value.value;
          var props = resolveProps.resolveProps(start, {
            indicator: "seq-item-ind",
            next: value,
            offset: offset,
            onError: onError,
            startOnNewline: true
          });
          if (!props.found) {
            if (props.anchor || props.tag || value) {
              if (value && value.type === "block-seq") onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");else onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
            } else {
              commentEnd = props.end;
              if (props.comment) seq.comment = props.comment;
              continue;
            }
          }
          var node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
          if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
          offset = node.range[2];
          seq.items.push(node);
        }
      } catch (err) {
        _iterator39.e(err);
      } finally {
        _iterator39.f();
      }
      seq.range = [bs.offset, offset, (_commentEnd2 = commentEnd) !== null && _commentEnd2 !== void 0 ? _commentEnd2 : offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/yaml/dist/compose/resolve-end.js": function node_modulesYamlDistComposeResolveEndJs(exports) {
    "use strict";

    function resolveEnd(end, offset, reqSpace, onError) {
      var comment = "";
      if (end) {
        var hasSpace = false;
        var sep = "";
        var _iterator40 = _createForOfIteratorHelper(end),
          _step40;
        try {
          for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
            var token = _step40.value;
            var source = token.source,
              type = token.type;
            switch (type) {
              case "space":
                hasSpace = true;
                break;
              case "comment":
                {
                  if (reqSpace && !hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
                  var cb = source.substring(1) || " ";
                  if (!comment) comment = cb;else comment += sep + cb;
                  sep = "";
                  break;
                }
              case "newline":
                if (comment) sep += source;
                hasSpace = true;
                break;
              default:
                onError(token, "UNEXPECTED_TOKEN", "Unexpected ".concat(type, " at node end"));
            }
            offset += source.length;
          }
        } catch (err) {
          _iterator40.e(err);
        } finally {
          _iterator40.f();
        }
      }
      return {
        comment: comment,
        offset: offset
      };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-collection.js": function node_modulesYamlDistComposeResolveFlowCollectionJs(exports) {
    "use strict";

    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = function isBlock(token) {
      return token && (token.type === "block-map" || token.type === "block-seq");
    };
    function resolveFlowCollection(_ref32, ctx, fc, onError, tag) {
      var _tag$nodeClass3;
      var composeNode = _ref32.composeNode,
        composeEmptyNode = _ref32.composeEmptyNode;
      var isMap = fc.start.source === "{";
      var fcName = isMap ? "flow map" : "flow sequence";
      var NodeClass = (_tag$nodeClass3 = tag === null || tag === void 0 ? void 0 : tag.nodeClass) !== null && _tag$nodeClass3 !== void 0 ? _tag$nodeClass3 : isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq;
      var coll = new NodeClass(ctx.schema);
      coll.flow = true;
      var atRoot = ctx.atRoot;
      if (atRoot) ctx.atRoot = false;
      var offset = fc.offset + fc.start.source.length;
      for (var i = 0; i < fc.items.length; ++i) {
        var collItem = fc.items[i];
        var start = collItem.start,
          key = collItem.key,
          sep = collItem.sep,
          value = collItem.value;
        var props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key !== null && key !== void 0 ? key : sep === null || sep === void 0 ? void 0 : sep[0],
          offset: offset,
          onError: onError,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma) onError(props.comma, "UNEXPECTED_TOKEN", "Unexpected , in ".concat(fcName));else if (i < fc.items.length - 1) onError(props.start, "UNEXPECTED_TOKEN", "Unexpected empty item in ".concat(fcName));
            if (props.comment) {
              if (coll.comment) coll.comment += "\n" + props.comment;else coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key)) onError(key, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
        }
        if (i === 0) {
          if (props.comma) onError(props.comma, "UNEXPECTED_TOKEN", "Unexpected , in ".concat(fcName));
        } else {
          if (!props.comma) onError(props.start, "MISSING_CHAR", "Missing , between ".concat(fcName, " items"));
          if (props.comment) {
            var prevItemComment = "";
            var _iterator41 = _createForOfIteratorHelper(start),
              _step41;
            try {
              loop: for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
                var st = _step41.value;
                switch (st.type) {
                  case "comma":
                  case "space":
                    break;
                  case "comment":
                    prevItemComment = st.source.substring(1);
                    break loop;
                  default:
                    break loop;
                }
              }
            } catch (err) {
              _iterator41.e(err);
            } finally {
              _iterator41.f();
            }
            if (prevItemComment) {
              var _prev$value;
              var prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev)) prev = (_prev$value = prev.value) !== null && _prev$value !== void 0 ? _prev$value : prev.key;
              if (prev.comment) prev.comment += "\n" + prevItemComment;else prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          var valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          var keyStart = props.end;
          var keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key)) onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          var valueProps = resolveProps.resolveProps(sep !== null && sep !== void 0 ? sep : [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError: onError,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep) {
                var _iterator42 = _createForOfIteratorHelper(sep),
                  _step42;
                try {
                  for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
                    var _st3 = _step42.value;
                    if (_st3 === valueProps.found) break;
                    if (_st3.type === "newline") {
                      onError(_st3, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                      break;
                    }
                  }
                } catch (err) {
                  _iterator42.e(err);
                } finally {
                  _iterator42.f();
                }
              }
              if (props.start < valueProps.found.offset - 1024) onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source && value.source[0] === ":") onError(value, "MISSING_CHAR", "Missing space after : in ".concat(fcName));else onError(valueProps.start, "MISSING_CHAR", "Missing , or : between ".concat(fcName, " items"));
          }
          var _valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (_valueNode) {
            if (isBlock(value)) onError(_valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment) keyNode.comment += "\n" + valueProps.comment;else keyNode.comment = valueProps.comment;
          }
          var pair = new Pair.Pair(keyNode, _valueNode);
          if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
          if (isMap) {
            var map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode)) onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            var _map = new YAMLMap.YAMLMap(ctx.schema);
            _map.flow = true;
            _map.items.push(pair);
            coll.items.push(_map);
          }
          offset = _valueNode ? _valueNode.range[2] : valueProps.end;
        }
      }
      var expectedEnd = isMap ? "}" : "]";
      var _fc$end = _toArray(fc.end),
        ce = _fc$end[0],
        ee = _fc$end.slice(1);
      var cePos = offset;
      if (ce && ce.source === expectedEnd) cePos = ce.offset + ce.source.length;else {
        var name = fcName[0].toUpperCase() + fcName.substring(1);
        var msg = atRoot ? "".concat(name, " must end with a ").concat(expectedEnd) : "".concat(name, " in block collection must be sufficiently indented and end with a ").concat(expectedEnd);
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1) ee.unshift(ce);
      }
      if (ee.length > 0) {
        var end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment) coll.comment += "\n" + end.comment;else coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/yaml/dist/compose/compose-collection.js": function node_modulesYamlDistComposeComposeCollectionJs(exports) {
    "use strict";

    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      var coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      var Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName) coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, tagToken, onError) {
      var _tag$resolve, _tag$resolve2, _tag, _tag2;
      var tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, function (msg) {
        return onError(tagToken, "TAG_RESOLVE_FAILED", msg);
      });
      var expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq" || !expType) {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      var tag = ctx.schema.tags.find(function (t) {
        return t.tag === tagName && t.collection === expType;
      });
      if (!tag) {
        var kt = ctx.schema.knownTags[tagName];
        if (kt && kt.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, {
            "default": false
          }));
          tag = kt;
        } else {
          if (kt !== null && kt !== void 0 && kt.collection) {
            onError(tagToken, "BAD_COLLECTION_TYPE", "".concat(kt.tag, " used for ").concat(expType, " collection, but expects ").concat(kt.collection), true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", "Unresolved tag: ".concat(tagName), true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      var coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      var res = (_tag$resolve = (_tag$resolve2 = (_tag = tag).resolve) === null || _tag$resolve2 === void 0 ? void 0 : _tag$resolve2.call(_tag, coll, function (msg) {
        return onError(tagToken, "TAG_RESOLVE_FAILED", msg);
      }, ctx.options)) !== null && _tag$resolve !== void 0 ? _tag$resolve : coll;
      var node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if ((_tag2 = tag) !== null && _tag2 !== void 0 && _tag2.format) node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-scalar.js": function node_modulesYamlDistComposeResolveBlockScalarJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    function resolveBlockScalar(scalar, strict, onError) {
      var start = scalar.offset;
      var header = parseBlockScalarHeader(scalar, strict, onError);
      if (!header) return {
        value: "",
        type: null,
        comment: "",
        range: [start, start, start]
      };
      var type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      var lines = scalar.source ? splitLines(scalar.source) : [];
      var chompStart = lines.length;
      for (var i = lines.length - 1; i >= 0; --i) {
        var content = lines[i][1];
        if (content === "" || content === "\r") chompStart = i;else break;
      }
      if (chompStart === 0) {
        var value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        var end2 = start + header.length;
        if (scalar.source) end2 += scalar.source.length;
        return {
          value: value2,
          type: type,
          comment: header.comment,
          range: [start, end2, end2]
        };
      }
      var trimIndent = scalar.indent + header.indent;
      var offset = scalar.offset + header.length;
      var contentStart = 0;
      for (var _i28 = 0; _i28 < chompStart; ++_i28) {
        var _lines$_i = _slicedToArray(lines[_i28], 2),
          indent = _lines$_i[0],
          _content = _lines$_i[1];
        if (_content === "" || _content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent) trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            var message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0) trimIndent = indent.length;
          contentStart = _i28;
          break;
        }
        offset += indent.length + _content.length + 1;
      }
      for (var _i29 = lines.length - 1; _i29 >= chompStart; --_i29) {
        if (lines[_i29][0].length > trimIndent) chompStart = _i29 + 1;
      }
      var value = "";
      var sep = "";
      var prevMoreIndented = false;
      for (var _i30 = 0; _i30 < contentStart; ++_i30) value += lines[_i30][0].slice(trimIndent) + "\n";
      for (var _i31 = contentStart; _i31 < chompStart; ++_i31) {
        var _lines$_i2 = _slicedToArray(lines[_i31], 2),
          _indent = _lines$_i2[0],
          _content2 = _lines$_i2[1];
        offset += _indent.length + _content2.length + 1;
        var crlf = _content2[_content2.length - 1] === "\r";
        if (crlf) _content2 = _content2.slice(0, -1);
        if (_content2 && _indent.length < trimIndent) {
          var src = header.indent ? "explicit indentation indicator" : "first line";
          var _message = "Block scalar lines must not be less indented than their ".concat(src);
          onError(offset - _content2.length - (crlf ? 2 : 1), "BAD_INDENT", _message);
          _indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + _indent.slice(trimIndent) + _content2;
          sep = "\n";
        } else if (_indent.length > trimIndent || _content2[0] === "	") {
          if (sep === " ") sep = "\n";else if (!prevMoreIndented && sep === "\n") sep = "\n\n";
          value += sep + _indent.slice(trimIndent) + _content2;
          sep = "\n";
          prevMoreIndented = true;
        } else if (_content2 === "") {
          if (sep === "\n") value += "\n";else sep = "\n";
        } else {
          value += sep + _content2;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (var _i32 = chompStart; _i32 < lines.length; ++_i32) value += "\n" + lines[_i32][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n") value += "\n";
          break;
        default:
          value += "\n";
      }
      var end = start + header.length + scalar.source.length;
      return {
        value: value,
        type: type,
        comment: header.comment,
        range: [start, end, end]
      };
    }
    function parseBlockScalarHeader(_ref33, strict, onError) {
      var offset = _ref33.offset,
        props = _ref33.props;
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      var source = props[0].source;
      var mode = source[0];
      var indent = 0;
      var chomp = "";
      var error = -1;
      for (var i = 1; i < source.length; ++i) {
        var ch = source[i];
        if (!chomp && (ch === "-" || ch === "+")) chomp = ch;else {
          var n = Number(ch);
          if (!indent && n) indent = n;else if (error === -1) error = offset + i;
        }
      }
      if (error !== -1) onError(error, "UNEXPECTED_TOKEN", "Block scalar header includes extra characters: ".concat(source));
      var hasSpace = false;
      var comment = "";
      var length = source.length;
      for (var _i33 = 1; _i33 < props.length; ++_i33) {
        var token = props[_i33];
        switch (token.type) {
          case "space":
            hasSpace = true;
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              var message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          default:
            {
              var _message2 = "Unexpected token in block scalar header: ".concat(token.type);
              onError(token, "UNEXPECTED_TOKEN", _message2);
              var ts = token.source;
              if (ts && typeof ts === "string") length += ts.length;
            }
        }
      }
      return {
        mode: mode,
        indent: indent,
        chomp: chomp,
        comment: comment,
        length: length
      };
    }
    function splitLines(source) {
      var split = source.split(/\n( *)/);
      var first = split[0];
      var m = first.match(/^( *)/);
      var line0 = m !== null && m !== void 0 && m[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      var lines = [line0];
      for (var i = 1; i < split.length; i += 2) lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-scalar.js": function node_modulesYamlDistComposeResolveFlowScalarJs(exports) {
    "use strict";

    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      var offset = scalar.offset,
        type = scalar.type,
        source = scalar.source,
        end = scalar.end;
      var _type;
      var value;
      var _onError = function _onError(rel, code, msg) {
        return onError(offset + rel, code, msg);
      };
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        default:
          onError(scalar, "UNEXPECTED_TOKEN", "Expected a flow scalar value, but found: ".concat(type));
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      var valueEnd = offset + source.length;
      var re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value: value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      var badChar = "";
      switch (source[0]) {
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">":
          {
            badChar = "block scalar indicator ".concat(source[0]);
            break;
          }
        case "@":
        case "`":
          {
            badChar = "reserved character ".concat(source[0]);
            break;
          }
      }
      if (badChar) onError(0, "BAD_SCALAR_START", "Plain value cannot start with ".concat(badChar));
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1) onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      var _match$, _match2;
      var first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch (_) {
        first = new RegExp("([\\s\\S]*?)[ \\t]*\\r?\\n", "y");
        line = new RegExp("[ \\t]*([\\s\\S]*?)[ \\t]*\\r?\\n", "y");
      }
      var match = first.exec(source);
      if (!match) return source;
      var res = match[1];
      var sep = " ";
      var pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n") res += sep;else sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      var last = new RegExp("[ \\t]*([\\s\\S]*)", "y");
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + ((_match$ = (_match2 = match) === null || _match2 === void 0 ? void 0 : _match2[1]) !== null && _match$ !== void 0 ? _match$ : "");
    }
    function doubleQuotedValue(source, onError) {
      var res = "";
      for (var i = 1; i < source.length - 1; ++i) {
        var ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n") continue;
        if (ch === "\n") {
          var _foldNewline = foldNewline(source, i),
            fold = _foldNewline.fold,
            offset = _foldNewline.offset;
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          var next = source[++i];
          var cc = escapeCodes[next];
          if (cc) res += cc;else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	") next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	") next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            var length = {
              x: 2,
              u: 4,
              U: 8
            }[next];
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            var raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", "Invalid escape sequence ".concat(raw));
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          var wsStart = i;
          var _next2 = source[i + 1];
          while (_next2 === " " || _next2 === "	") _next2 = source[++i + 1];
          if (_next2 !== "\n" && !(_next2 === "\r" && source[i + 2] === "\n")) res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1) onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      var fold = "";
      var ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n") break;
        if (ch === "\n") fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold) fold = " ";
      return {
        fold: fold,
        offset: offset
      };
    }
    var escapeCodes = {
      "0": "\0",
      a: "\x07",
      b: "\b",
      e: "\x1B",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	",
      v: "\v",
      N: "\x85",
      _: "\xA0",
      L: "\u2028",
      P: "\u2029",
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      var cc = source.substr(offset, length);
      var ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      var code = ok ? parseInt(cc, 16) : NaN;
      if (isNaN(code)) {
        var raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", "Invalid escape sequence ".concat(raw));
        return raw;
      }
      return String.fromCodePoint(code);
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/yaml/dist/compose/compose-scalar.js": function node_modulesYamlDistComposeComposeScalarJs(exports) {
    "use strict";

    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      var _ref34 = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(token, ctx.options.strict, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError),
        value = _ref34.value,
        type = _ref34.type,
        comment = _ref34.comment,
        range = _ref34.range;
      var tagName = tagToken ? ctx.directives.tagName(tagToken.source, function (msg) {
        return onError(tagToken, "TAG_RESOLVE_FAILED", msg);
      }) : null;
      var tag = tagToken && tagName ? findScalarTagByName(ctx.schema, value, tagName, tagToken, onError) : token.type === "scalar" ? findScalarTagByTest(ctx, value, token, onError) : ctx.schema[identity.SCALAR];
      var scalar;
      try {
        var res = tag.resolve(value, function (msg) {
          return onError(tagToken !== null && tagToken !== void 0 ? tagToken : token, "TAG_RESOLVE_FAILED", msg);
        }, ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        var msg = error instanceof Error ? error.message : String(error);
        onError(tagToken !== null && tagToken !== void 0 ? tagToken : token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type) scalar.type = type;
      if (tagName) scalar.tag = tagName;
      if (tag.format) scalar.format = tag.format;
      if (comment) scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!") return schema[identity.SCALAR];
      var matchWithTest = [];
      var _iterator43 = _createForOfIteratorHelper(schema.tags),
        _step43;
      try {
        for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
          var _tag3 = _step43.value;
          if (!_tag3.collection && _tag3.tag === tagName) {
            if (_tag3["default"] && _tag3.test) matchWithTest.push(_tag3);else return _tag3;
          }
        }
      } catch (err) {
        _iterator43.e(err);
      } finally {
        _iterator43.f();
      }
      for (var _i34 = 0, _matchWithTest = matchWithTest; _i34 < _matchWithTest.length; _i34++) {
        var _tag$test2;
        var tag = _matchWithTest[_i34];
        if ((_tag$test2 = tag.test) !== null && _tag$test2 !== void 0 && _tag$test2.test(value)) return tag;
      }
      var kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, {
          "default": false,
          test: void 0
        }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", "Unresolved tag: ".concat(tagName), tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest(_ref35, value, token, onError) {
      var directives = _ref35.directives,
        schema = _ref35.schema;
      var tag = schema.tags.find(function (tag2) {
        var _tag2$test;
        return tag2["default"] && ((_tag2$test = tag2.test) === null || _tag2$test === void 0 ? void 0 : _tag2$test.test(value));
      }) || schema[identity.SCALAR];
      if (schema.compat) {
        var _schema$compat$find;
        var compat = (_schema$compat$find = schema.compat.find(function (tag2) {
          var _tag2$test2;
          return tag2["default"] && ((_tag2$test2 = tag2.test) === null || _tag2$test2 === void 0 ? void 0 : _tag2$test2.test(value));
        })) !== null && _schema$compat$find !== void 0 ? _schema$compat$find : schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          var ts = directives.tagString(tag.tag);
          var cs = directives.tagString(compat.tag);
          var msg = "Value may be parsed as either ".concat(ts, " or ").concat(cs);
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/yaml/dist/compose/util-empty-scalar-position.js": function node_modulesYamlDistComposeUtilEmptyScalarPositionJs(exports) {
    "use strict";

    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        if (pos === null) pos = before.length;
        for (var i = pos - 1; i >= 0; --i) {
          var st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (((_st4 = st) === null || _st4 === void 0 ? void 0 : _st4.type) === "space") {
            var _st4;
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/yaml/dist/compose/compose-node.js": function node_modulesYamlDistComposeComposeNodeJs(exports) {
    "use strict";

    var Alias = require_Alias();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = {
      composeNode: composeNode,
      composeEmptyNode: composeEmptyNode
    };
    function composeNode(ctx, token, props, onError) {
      var spaceBefore = props.spaceBefore,
        comment = props.comment,
        anchor = props.anchor,
        tag = props.tag;
      var node;
      var isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag) onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor) node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          node = composeCollection.composeCollection(CN, ctx, token, tag, onError);
          if (anchor) node.anchor = anchor.source.substring(1);
          break;
        default:
          {
            var message = token.type === "error" ? token.message : "Unsupported token (type: ".concat(token.type, ")");
            onError(token, "UNEXPECTED_TOKEN", message);
            node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
            isSrcToken = false;
          }
      }
      if (anchor && node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (spaceBefore) node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "") node.comment = comment;else node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken) node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, _ref36, onError) {
      var spaceBefore = _ref36.spaceBefore,
        comment = _ref36.comment,
        anchor = _ref36.anchor,
        tag = _ref36.tag,
        end = _ref36.end;
      var token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      var node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore) node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias(_ref37, _ref38, onError) {
      var options = _ref37.options;
      var offset = _ref38.offset,
        source = _ref38.source,
        end = _ref38.end;
      var alias = new Alias.Alias(source.substring(1));
      if (alias.source === "") onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":")) onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      var valueEnd = offset + source.length;
      var re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment) alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/yaml/dist/compose/compose-doc.js": function node_modulesYamlDistComposeComposeDocJs(exports) {
    "use strict";

    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, _ref39, onError) {
      var offset = _ref39.offset,
        start = _ref39.start,
        value = _ref39.value,
        end = _ref39.end;
      var opts = Object.assign({
        _directives: directives
      }, options);
      var doc = new Document.Document(void 0, opts);
      var ctx = {
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      var props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value !== null && value !== void 0 ? value : end === null || end === void 0 ? void 0 : end[0],
        offset: offset,
        onError: onError,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline) onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      var contentEnd = doc.contents.range[2];
      var re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment) doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/yaml/dist/compose/composer.js": function node_modulesYamlDistComposeComposerJs(exports) {
    "use strict";

    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number") return [src, src + 1];
      if (Array.isArray(src)) return src.length === 2 ? src : [src[0], src[1]];
      var offset = src.offset,
        source = src.source;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      var _prelude;
      var comment = "";
      var atComment = false;
      var afterEmptyLine = false;
      for (var i = 0; i < prelude.length; ++i) {
        var source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (((_prelude = prelude[i + 1]) === null || _prelude === void 0 ? void 0 : _prelude[0]) !== "#") i += 1;
            atComment = false;
            break;
          default:
            if (!atComment) afterEmptyLine = true;
            atComment = false;
        }
      }
      return {
        comment: comment,
        afterEmptyLine: afterEmptyLine
      };
    }
    var Composer = /*#__PURE__*/function () {
      function Composer() {
        var _this20 = this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, Composer);
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = function (source, code, message, warning) {
          var pos = getErrorPos(source);
          if (warning) _this20.warnings.push(new errors.YAMLWarning(pos, code, message));else _this20.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({
          version: options.version || "1.2"
        });
        this.options = options;
      }
      _createClass(Composer, [{
        key: "decorate",
        value: function decorate(doc, afterDoc) {
          var _parsePrelude = parsePrelude(this.prelude),
            comment = _parsePrelude.comment,
            afterEmptyLine = _parsePrelude.afterEmptyLine;
          if (comment) {
            var dc = doc.contents;
            if (afterDoc) {
              doc.comment = doc.comment ? "".concat(doc.comment, "\n").concat(comment) : comment;
            } else if (afterEmptyLine || doc.directives.docStart || !dc) {
              doc.commentBefore = comment;
            } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
              var it = dc.items[0];
              if (identity.isPair(it)) it = it.key;
              var cb = it.commentBefore;
              it.commentBefore = cb ? "".concat(comment, "\n").concat(cb) : comment;
            } else {
              var _cb = dc.commentBefore;
              dc.commentBefore = _cb ? "".concat(comment, "\n").concat(_cb) : comment;
            }
          }
          if (afterDoc) {
            Array.prototype.push.apply(doc.errors, this.errors);
            Array.prototype.push.apply(doc.warnings, this.warnings);
          } else {
            doc.errors = this.errors;
            doc.warnings = this.warnings;
          }
          this.prelude = [];
          this.errors = [];
          this.warnings = [];
        }
      }, {
        key: "streamInfo",
        value: function streamInfo() {
          return {
            comment: parsePrelude(this.prelude).comment,
            directives: this.directives,
            errors: this.errors,
            warnings: this.warnings
          };
        }
      }, {
        key: "compose",
        value: function compose(tokens) {
          var _this21 = this;
          var forceDoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var endOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          return /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _iterator44, _step44, token;
            return _regeneratorRuntime().wrap(function _callee3$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _iterator44 = _createForOfIteratorHelper(tokens);
                  _context4.prev = 1;
                  _iterator44.s();
                case 3:
                  if ((_step44 = _iterator44.n()).done) {
                    _context4.next = 8;
                    break;
                  }
                  token = _step44.value;
                  return _context4.delegateYield(_this21.next(token), "t0", 6);
                case 6:
                  _context4.next = 3;
                  break;
                case 8:
                  _context4.next = 13;
                  break;
                case 10:
                  _context4.prev = 10;
                  _context4.t1 = _context4["catch"](1);
                  _iterator44.e(_context4.t1);
                case 13:
                  _context4.prev = 13;
                  _iterator44.f();
                  return _context4.finish(13);
                case 16:
                  return _context4.delegateYield(_this21.end(forceDoc, endOffset), "t2", 17);
                case 17:
                case "end":
                  return _context4.stop();
              }
            }, _callee3, null, [[1, 10, 13, 16]]);
          })();
        }
      }, {
        key: "next",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function next(token) {
          var _this22 = this;
          var doc, msg, error, _msg3, end, dc;
          return _regeneratorRuntime().wrap(function next$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                if (process.env.LOG_STREAM) console.dir(token, {
                  depth: null
                });
                _context5.t0 = token.type;
                _context5.next = _context5.t0 === "directive" ? 4 : _context5.t0 === "document" ? 8 : _context5.t0 === "byte-order-mark" ? 17 : _context5.t0 === "space" ? 17 : _context5.t0 === "comment" ? 18 : _context5.t0 === "newline" ? 18 : _context5.t0 === "error" ? 20 : _context5.t0 === "doc-end" ? 24 : 34;
                break;
              case 4:
                this.directives.add(token.source, function (offset, message, warning) {
                  var pos = getErrorPos(token);
                  pos[0] += offset;
                  _this22.onError(pos, "BAD_DIRECTIVE", message, warning);
                });
                this.prelude.push(token.source);
                this.atDirectives = true;
                return _context5.abrupt("break", 35);
              case 8:
                doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
                if (this.atDirectives && !doc.directives.docStart) this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
                this.decorate(doc, false);
                if (!this.doc) {
                  _context5.next = 14;
                  break;
                }
                _context5.next = 14;
                return this.doc;
              case 14:
                this.doc = doc;
                this.atDirectives = false;
                return _context5.abrupt("break", 35);
              case 17:
                return _context5.abrupt("break", 35);
              case 18:
                this.prelude.push(token.source);
                return _context5.abrupt("break", 35);
              case 20:
                msg = token.source ? "".concat(token.message, ": ").concat(JSON.stringify(token.source)) : token.message;
                error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
                if (this.atDirectives || !this.doc) this.errors.push(error);else this.doc.errors.push(error);
                return _context5.abrupt("break", 35);
              case 24:
                if (this.doc) {
                  _context5.next = 28;
                  break;
                }
                _msg3 = "Unexpected doc-end without preceding document";
                this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", _msg3));
                return _context5.abrupt("break", 35);
              case 28:
                this.doc.directives.docEnd = true;
                end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
                this.decorate(this.doc, true);
                if (end.comment) {
                  dc = this.doc.comment;
                  this.doc.comment = dc ? "".concat(dc, "\n").concat(end.comment) : end.comment;
                }
                this.doc.range[2] = end.offset;
                return _context5.abrupt("break", 35);
              case 34:
                this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", "Unsupported token ".concat(token.type)));
              case 35:
              case "end":
                return _context5.stop();
            }
          }, next, this);
        })
      }, {
        key: "end",
        value: function end() {
          var _this23 = this;
          var forceDoc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var endOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          return /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var opts, doc;
            return _regeneratorRuntime().wrap(function _callee4$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (!_this23.doc) {
                    _context6.next = 7;
                    break;
                  }
                  _this23.decorate(_this23.doc, true);
                  _context6.next = 4;
                  return _this23.doc;
                case 4:
                  _this23.doc = null;
                  _context6.next = 15;
                  break;
                case 7:
                  if (!forceDoc) {
                    _context6.next = 15;
                    break;
                  }
                  opts = Object.assign({
                    _directives: _this23.directives
                  }, _this23.options);
                  doc = new Document.Document(void 0, opts);
                  if (_this23.atDirectives) _this23.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
                  doc.range = [0, endOffset, endOffset];
                  _this23.decorate(doc, false);
                  _context6.next = 15;
                  return doc;
                case 15:
                case "end":
                  return _context6.stop();
              }
            }, _callee4);
          })();
        }
      }]);
      return Composer;
    }();
    exports.Composer = Composer;
  }
});

// node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/yaml/dist/parse/cst-scalar.js": function node_modulesYamlDistParseCstScalarJs(exports) {
    "use strict";

    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token) {
      var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var onError = arguments.length > 2 ? arguments[2] : undefined;
      if (token) {
        var _onError = function _onError(pos, code, message) {
          var offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError) onError(offset, code, message);else throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar(token, strict, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      var _context$end;
      var _context$implicitKey = context.implicitKey,
        implicitKey = _context$implicitKey === void 0 ? false : _context$implicitKey,
        indent = context.indent,
        _context$inFlow = context.inFlow,
        inFlow = _context$inFlow === void 0 ? false : _context$inFlow,
        _context$offset = context.offset,
        offset = _context$offset === void 0 ? -1 : _context$offset,
        _context$type = context.type,
        type = _context$type === void 0 ? "PLAIN" : _context$type;
      var source = stringifyString.stringifyString({
        type: type,
        value: value
      }, {
        implicitKey: implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow: inFlow,
        options: {
          blockQuote: true,
          lineWidth: -1
        }
      });
      var end = (_context$end = context.end) !== null && _context$end !== void 0 ? _context$end : [{
        type: "newline",
        offset: -1,
        indent: indent,
        source: "\n"
      }];
      switch (source[0]) {
        case "|":
        case ">":
          {
            var he = source.indexOf("\n");
            var head = source.substring(0, he);
            var body = source.substring(he + 1) + "\n";
            var props = [{
              type: "block-scalar-header",
              offset: offset,
              indent: indent,
              source: head
            }];
            if (!addEndtoBlockProps(props, end)) props.push({
              type: "newline",
              offset: -1,
              indent: indent,
              source: "\n"
            });
            return {
              type: "block-scalar",
              offset: offset,
              indent: indent,
              props: props,
              source: body
            };
          }
        case '"':
          return {
            type: "double-quoted-scalar",
            offset: offset,
            indent: indent,
            source: source,
            end: end
          };
        case "'":
          return {
            type: "single-quoted-scalar",
            offset: offset,
            indent: indent,
            source: source,
            end: end
          };
        default:
          return {
            type: "scalar",
            offset: offset,
            indent: indent,
            source: source,
            end: end
          };
      }
    }
    function setScalarValue(token, value) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _context$afterKey = context.afterKey,
        afterKey = _context$afterKey === void 0 ? false : _context$afterKey,
        _context$implicitKey2 = context.implicitKey,
        implicitKey = _context$implicitKey2 === void 0 ? false : _context$implicitKey2,
        _context$inFlow2 = context.inFlow,
        inFlow = _context$inFlow2 === void 0 ? false : _context$inFlow2,
        type = context.type;
      var indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number") indent += 2;
      if (!type) switch (token.type) {
        case "single-quoted-scalar":
          type = "QUOTE_SINGLE";
          break;
        case "double-quoted-scalar":
          type = "QUOTE_DOUBLE";
          break;
        case "block-scalar":
          {
            var header = token.props[0];
            if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
        default:
          type = "PLAIN";
      }
      var source = stringifyString.stringifyString({
        type: type,
        value: value
      }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow: inFlow,
        options: {
          blockQuote: true,
          lineWidth: -1
        }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      var he = source.indexOf("\n");
      var head = source.substring(0, he);
      var body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        var header = token.props[0];
        if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        var offset = token.offset;
        var indent = "indent" in token ? token.indent : -1;
        var props = [{
          type: "block-scalar-header",
          offset: offset,
          indent: indent,
          source: head
        }];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0)) props.push({
          type: "newline",
          offset: -1,
          indent: indent,
          source: "\n"
        });
        for (var _i35 = 0, _Object$keys12 = Object.keys(token); _i35 < _Object$keys12.length; _i35++) {
          var key = _Object$keys12[_i35];
          if (key !== "type" && key !== "offset") delete token[key];
        }
        Object.assign(token, {
          type: "block-scalar",
          indent: indent,
          props: props,
          source: body
        });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end) {
        var _iterator45 = _createForOfIteratorHelper(end),
          _step45;
        try {
          for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
            var st = _step45.value;
            switch (st.type) {
              case "space":
              case "comment":
                props.push(st);
                break;
              case "newline":
                props.push(st);
                return true;
            }
          }
        } catch (err) {
          _iterator45.e(err);
        } finally {
          _iterator45.f();
        }
      }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar":
          {
            var end = token.props.slice(1);
            var oa = source.length;
            if (token.props[0].type === "block-scalar-header") oa -= token.props[0].source.length;
            var _iterator46 = _createForOfIteratorHelper(end),
              _step46;
            try {
              for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
                var tok = _step46.value;
                tok.offset += oa;
              }
            } catch (err) {
              _iterator46.e(err);
            } finally {
              _iterator46.f();
            }
            delete token.props;
            Object.assign(token, {
              type: type,
              source: source,
              end: end
            });
            break;
          }
        case "block-map":
        case "block-seq":
          {
            var offset = token.offset + source.length;
            var nl = {
              type: "newline",
              offset: offset,
              indent: token.indent,
              source: "\n"
            };
            delete token.items;
            Object.assign(token, {
              type: type,
              source: source,
              end: [nl]
            });
            break;
          }
        default:
          {
            var indent = "indent" in token ? token.indent : -1;
            var _end = "end" in token && Array.isArray(token.end) ? token.end.filter(function (st) {
              return st.type === "space" || st.type === "comment" || st.type === "newline";
            }) : [];
            for (var _i36 = 0, _Object$keys13 = Object.keys(token); _i36 < _Object$keys13.length; _i36++) {
              var key = _Object$keys13[_i36];
              if (key !== "type" && key !== "offset") delete token[key];
            }
            Object.assign(token, {
              type: type,
              indent: indent,
              source: source,
              end: _end
            });
          }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/yaml/dist/parse/cst-stringify.js": function node_modulesYamlDistParseCstStringifyJs(exports) {
    "use strict";

    var stringify = function stringify(cst) {
      return "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    };
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar":
          {
            var res = "";
            var _iterator47 = _createForOfIteratorHelper(token.props),
              _step47;
            try {
              for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
                var tok = _step47.value;
                res += stringifyToken(tok);
              }
            } catch (err) {
              _iterator47.e(err);
            } finally {
              _iterator47.f();
            }
            return res + token.source;
          }
        case "block-map":
        case "block-seq":
          {
            var _res = "";
            var _iterator48 = _createForOfIteratorHelper(token.items),
              _step48;
            try {
              for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
                var item = _step48.value;
                _res += stringifyItem(item);
              }
            } catch (err) {
              _iterator48.e(err);
            } finally {
              _iterator48.f();
            }
            return _res;
          }
        case "flow-collection":
          {
            var _res2 = token.start.source;
            var _iterator49 = _createForOfIteratorHelper(token.items),
              _step49;
            try {
              for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
                var _item = _step49.value;
                _res2 += stringifyItem(_item);
              }
            } catch (err) {
              _iterator49.e(err);
            } finally {
              _iterator49.f();
            }
            var _iterator50 = _createForOfIteratorHelper(token.end),
              _step50;
            try {
              for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
                var st = _step50.value;
                _res2 += st.source;
              }
            } catch (err) {
              _iterator50.e(err);
            } finally {
              _iterator50.f();
            }
            return _res2;
          }
        case "document":
          {
            var _res3 = stringifyItem(token);
            if (token.end) {
              var _iterator51 = _createForOfIteratorHelper(token.end),
                _step51;
              try {
                for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
                  var _st5 = _step51.value;
                  _res3 += _st5.source;
                }
              } catch (err) {
                _iterator51.e(err);
              } finally {
                _iterator51.f();
              }
            }
            return _res3;
          }
        default:
          {
            var _res4 = token.source;
            if ("end" in token && token.end) {
              var _iterator52 = _createForOfIteratorHelper(token.end),
                _step52;
              try {
                for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
                  var _st6 = _step52.value;
                  _res4 += _st6.source;
                }
              } catch (err) {
                _iterator52.e(err);
              } finally {
                _iterator52.f();
              }
            }
            return _res4;
          }
      }
    }
    function stringifyItem(_ref40) {
      var start = _ref40.start,
        key = _ref40.key,
        sep = _ref40.sep,
        value = _ref40.value;
      var res = "";
      var _iterator53 = _createForOfIteratorHelper(start),
        _step53;
      try {
        for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
          var _st7 = _step53.value;
          res += _st7.source;
        }
      } catch (err) {
        _iterator53.e(err);
      } finally {
        _iterator53.f();
      }
      if (key) res += stringifyToken(key);
      if (sep) {
        var _iterator54 = _createForOfIteratorHelper(sep),
          _step54;
        try {
          for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
            var st = _step54.value;
            res += st.source;
          }
        } catch (err) {
          _iterator54.e(err);
        } finally {
          _iterator54.f();
        }
      }
      if (value) res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/yaml/dist/parse/cst-visit.js": function node_modulesYamlDistParseCstVisitJs(exports) {
    "use strict";

    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document") cst = {
        start: cst.start,
        value: cst.value
      };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = function (cst, path2) {
      var item = cst;
      var _iterator55 = _createForOfIteratorHelper(path2),
        _step55;
      try {
        for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
          var _item2;
          var _step55$value = _slicedToArray(_step55.value, 2),
            field = _step55$value[0],
            index = _step55$value[1];
          var tok = (_item2 = item) === null || _item2 === void 0 ? void 0 : _item2[field];
          if (tok && "items" in tok) {
            item = tok.items[index];
          } else return void 0;
        }
      } catch (err) {
        _iterator55.e(err);
      } finally {
        _iterator55.f();
      }
      return item;
    };
    visit.parentCollection = function (cst, path2) {
      var parent = visit.itemAtPath(cst, path2.slice(0, -1));
      var field = path2[path2.length - 1][0];
      var coll = parent === null || parent === void 0 ? void 0 : parent[field];
      if (coll && "items" in coll) return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path2, item, visitor) {
      var ctrl = visitor(item, path2);
      if (_typeof(ctrl) === "symbol") return ctrl;
      for (var _i37 = 0, _arr = ["key", "value"]; _i37 < _arr.length; _i37++) {
        var field = _arr[_i37];
        var token = item[field];
        if (token && "items" in token) {
          for (var i = 0; i < token.items.length; ++i) {
            var ci = _visit(Object.freeze(path2.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number") i = ci - 1;else if (ci === BREAK) return BREAK;else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key") ctrl = ctrl(item, path2);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path2) : ctrl;
    }
    exports.visit = visit;
  }
});

// node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/yaml/dist/parse/cst.js": function node_modulesYamlDistParseCstJs(exports) {
    "use strict";

    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = function isCollection(token) {
      return !!token && "items" in token;
    };
    var isScalar = function isScalar(token) {
      return !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    };
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/yaml/dist/parse/lexer.js": function node_modulesYamlDistParseLexerJs(exports) {
    "use strict";

    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = "0123456789ABCDEFabcdef".split("");
    var tagChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split("");
    var invalidFlowScalarChars = ",[]{}".split("");
    var invalidAnchorChars = " ,[]{}\n\r	".split("");
    var isNotAnchorChar = function isNotAnchorChar(ch) {
      return !ch || invalidAnchorChars.includes(ch);
    };
    var Lexer = /*#__PURE__*/function () {
      function Lexer() {
        _classCallCheck(this, Lexer);
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      _createClass(Lexer, [{
        key: "lex",
        value: function lex(source) {
          var _this24 = this;
          var incomplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_this24$next) {
            var next;
            return _regeneratorRuntime().wrap(function _callee5$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  if (source) {
                    _this24.buffer = _this24.buffer ? _this24.buffer + source : source;
                    _this24.lineEndPos = null;
                  }
                  _this24.atEnd = !incomplete;
                  next = (_this24$next = _this24.next) !== null && _this24$next !== void 0 ? _this24$next : "stream";
                case 3:
                  if (!(next && (incomplete || _this24.hasChars(1)))) {
                    _context7.next = 8;
                    break;
                  }
                  return _context7.delegateYield(_this24.parseNext(next), "t0", 5);
                case 5:
                  next = _context7.t0;
                  _context7.next = 3;
                  break;
                case 8:
                case "end":
                  return _context7.stop();
              }
            }, _callee5);
          })();
        }
      }, {
        key: "atLineEnd",
        value: function atLineEnd() {
          var i = this.pos;
          var ch = this.buffer[i];
          while (ch === " " || ch === "	") ch = this.buffer[++i];
          if (!ch || ch === "#" || ch === "\n") return true;
          if (ch === "\r") return this.buffer[i + 1] === "\n";
          return false;
        }
      }, {
        key: "charAt",
        value: function charAt(n) {
          return this.buffer[this.pos + n];
        }
      }, {
        key: "continueScalar",
        value: function continueScalar(offset) {
          var ch = this.buffer[offset];
          if (this.indentNext > 0) {
            var indent = 0;
            while (ch === " ") ch = this.buffer[++indent + offset];
            if (ch === "\r") {
              var _next3 = this.buffer[indent + offset + 1];
              if (_next3 === "\n" || !_next3 && !this.atEnd) return offset + indent + 1;
            }
            return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
          }
          if (ch === "-" || ch === ".") {
            var dt = this.buffer.substr(offset, 3);
            if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3])) return -1;
          }
          return offset;
        }
      }, {
        key: "getLine",
        value: function getLine() {
          var end = this.lineEndPos;
          if (typeof end !== "number" || end !== -1 && end < this.pos) {
            end = this.buffer.indexOf("\n", this.pos);
            this.lineEndPos = end;
          }
          if (end === -1) return this.atEnd ? this.buffer.substring(this.pos) : null;
          if (this.buffer[end - 1] === "\r") end -= 1;
          return this.buffer.substring(this.pos, end);
        }
      }, {
        key: "hasChars",
        value: function hasChars(n) {
          return this.pos + n <= this.buffer.length;
        }
      }, {
        key: "setNext",
        value: function setNext(state) {
          this.buffer = this.buffer.substring(this.pos);
          this.pos = 0;
          this.lineEndPos = null;
          this.next = state;
          return null;
        }
      }, {
        key: "peek",
        value: function peek(n) {
          return this.buffer.substr(this.pos, n);
        }
      }, {
        key: "parseNext",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseNext(next) {
          return _regeneratorRuntime().wrap(function parseNext$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = next;
                _context8.next = _context8.t0 === "stream" ? 3 : _context8.t0 === "line-start" ? 5 : _context8.t0 === "block-start" ? 7 : _context8.t0 === "doc" ? 9 : _context8.t0 === "flow" ? 11 : _context8.t0 === "quoted-scalar" ? 13 : _context8.t0 === "block-scalar" ? 15 : _context8.t0 === "plain-scalar" ? 17 : 19;
                break;
              case 3:
                return _context8.delegateYield(this.parseStream(), "t1", 4);
              case 4:
                return _context8.abrupt("return", _context8.t1);
              case 5:
                return _context8.delegateYield(this.parseLineStart(), "t2", 6);
              case 6:
                return _context8.abrupt("return", _context8.t2);
              case 7:
                return _context8.delegateYield(this.parseBlockStart(), "t3", 8);
              case 8:
                return _context8.abrupt("return", _context8.t3);
              case 9:
                return _context8.delegateYield(this.parseDocument(), "t4", 10);
              case 10:
                return _context8.abrupt("return", _context8.t4);
              case 11:
                return _context8.delegateYield(this.parseFlowCollection(), "t5", 12);
              case 12:
                return _context8.abrupt("return", _context8.t5);
              case 13:
                return _context8.delegateYield(this.parseQuotedScalar(), "t6", 14);
              case 14:
                return _context8.abrupt("return", _context8.t6);
              case 15:
                return _context8.delegateYield(this.parseBlockScalar(), "t7", 16);
              case 16:
                return _context8.abrupt("return", _context8.t7);
              case 17:
                return _context8.delegateYield(this.parsePlainScalar(), "t8", 18);
              case 18:
                return _context8.abrupt("return", _context8.t8);
              case 19:
              case "end":
                return _context8.stop();
            }
          }, parseNext, this);
        })
      }, {
        key: "parseStream",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseStream() {
          var line, dirEnd, cs, ch, _ch2, n, sp;
          return _regeneratorRuntime().wrap(function parseStream$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                line = this.getLine();
                if (!(line === null)) {
                  _context9.next = 3;
                  break;
                }
                return _context9.abrupt("return", this.setNext("stream"));
              case 3:
                if (!(line[0] === cst.BOM)) {
                  _context9.next = 6;
                  break;
                }
                return _context9.delegateYield(this.pushCount(1), "t0", 5);
              case 5:
                line = line.substring(1);
              case 6:
                if (!(line[0] === "%")) {
                  _context9.next = 27;
                  break;
                }
                dirEnd = line.length;
                cs = line.indexOf("#");
                if (cs !== -1) {
                  ch = line[cs - 1];
                  if (ch === " " || ch === "	") dirEnd = cs - 1;
                }
              case 10:
                if (!true) {
                  _context9.next = 19;
                  break;
                }
                _ch2 = line[dirEnd - 1];
                if (!(_ch2 === " " || _ch2 === "	")) {
                  _context9.next = 16;
                  break;
                }
                dirEnd -= 1;
                _context9.next = 17;
                break;
              case 16:
                return _context9.abrupt("break", 19);
              case 17:
                _context9.next = 10;
                break;
              case 19:
                return _context9.delegateYield(this.pushCount(dirEnd), "t1", 20);
              case 20:
                _context9.t2 = _context9.t1;
                return _context9.delegateYield(this.pushSpaces(true), "t3", 22);
              case 22:
                _context9.t4 = _context9.t3;
                n = _context9.t2 + _context9.t4;
                return _context9.delegateYield(this.pushCount(line.length - n), "t5", 25);
              case 25:
                this.pushNewline();
                return _context9.abrupt("return", "stream");
              case 27:
                if (!this.atLineEnd()) {
                  _context9.next = 33;
                  break;
                }
                return _context9.delegateYield(this.pushSpaces(true), "t6", 29);
              case 29:
                sp = _context9.t6;
                return _context9.delegateYield(this.pushCount(line.length - sp), "t7", 31);
              case 31:
                return _context9.delegateYield(this.pushNewline(), "t8", 32);
              case 32:
                return _context9.abrupt("return", "stream");
              case 33:
                _context9.next = 35;
                return cst.DOCUMENT;
              case 35:
                return _context9.delegateYield(this.parseLineStart(), "t9", 36);
              case 36:
                return _context9.abrupt("return", _context9.t9);
              case 37:
              case "end":
                return _context9.stop();
            }
          }, parseStream, this);
        })
      }, {
        key: "parseLineStart",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseLineStart() {
          var ch, s;
          return _regeneratorRuntime().wrap(function parseLineStart$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                ch = this.charAt(0);
                if (!(!ch && !this.atEnd)) {
                  _context10.next = 3;
                  break;
                }
                return _context10.abrupt("return", this.setNext("line-start"));
              case 3:
                if (!(ch === "-" || ch === ".")) {
                  _context10.next = 17;
                  break;
                }
                if (!(!this.atEnd && !this.hasChars(4))) {
                  _context10.next = 6;
                  break;
                }
                return _context10.abrupt("return", this.setNext("line-start"));
              case 6:
                s = this.peek(3);
                if (!(s === "---" && isEmpty(this.charAt(3)))) {
                  _context10.next = 14;
                  break;
                }
                return _context10.delegateYield(this.pushCount(3), "t0", 9);
              case 9:
                this.indentValue = 0;
                this.indentNext = 0;
                return _context10.abrupt("return", "doc");
              case 14:
                if (!(s === "..." && isEmpty(this.charAt(3)))) {
                  _context10.next = 17;
                  break;
                }
                return _context10.delegateYield(this.pushCount(3), "t1", 16);
              case 16:
                return _context10.abrupt("return", "stream");
              case 17:
                return _context10.delegateYield(this.pushSpaces(false), "t2", 18);
              case 18:
                this.indentValue = _context10.t2;
                if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1))) this.indentNext = this.indentValue;
                return _context10.delegateYield(this.parseBlockStart(), "t3", 21);
              case 21:
                return _context10.abrupt("return", _context10.t3);
              case 22:
              case "end":
                return _context10.stop();
            }
          }, parseLineStart, this);
        })
      }, {
        key: "parseBlockStart",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseBlockStart() {
          var _this$peek, _this$peek2, ch0, ch1, n;
          return _regeneratorRuntime().wrap(function parseBlockStart$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                _this$peek = this.peek(2), _this$peek2 = _slicedToArray(_this$peek, 2), ch0 = _this$peek2[0], ch1 = _this$peek2[1];
                if (!(!ch1 && !this.atEnd)) {
                  _context11.next = 3;
                  break;
                }
                return _context11.abrupt("return", this.setNext("block-start"));
              case 3:
                if (!((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1))) {
                  _context11.next = 13;
                  break;
                }
                return _context11.delegateYield(this.pushCount(1), "t0", 5);
              case 5:
                _context11.t1 = _context11.t0;
                return _context11.delegateYield(this.pushSpaces(true), "t2", 7);
              case 7:
                _context11.t3 = _context11.t2;
                n = _context11.t1 + _context11.t3;
                this.indentNext = this.indentValue + 1;
                this.indentValue += n;
                return _context11.delegateYield(this.parseBlockStart(), "t4", 12);
              case 12:
                return _context11.abrupt("return", _context11.t4);
              case 13:
                return _context11.abrupt("return", "doc");
              case 14:
              case "end":
                return _context11.stop();
            }
          }, parseBlockStart, this);
        })
      }, {
        key: "parseDocument",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseDocument() {
          var line, n;
          return _regeneratorRuntime().wrap(function parseDocument$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.delegateYield(this.pushSpaces(true), "t0", 1);
              case 1:
                line = this.getLine();
                if (!(line === null)) {
                  _context12.next = 4;
                  break;
                }
                return _context12.abrupt("return", this.setNext("doc"));
              case 4:
                return _context12.delegateYield(this.pushIndicators(), "t1", 5);
              case 5:
                n = _context12.t1;
                _context12.t2 = line[n];
                _context12.next = _context12.t2 === "#" ? 9 : _context12.t2 === void 0 ? 10 : _context12.t2 === "{" ? 13 : _context12.t2 === "[" ? 13 : _context12.t2 === "}" ? 17 : _context12.t2 === "]" ? 17 : _context12.t2 === "*" ? 19 : _context12.t2 === '"' ? 21 : _context12.t2 === "'" ? 21 : _context12.t2 === "|" ? 23 : _context12.t2 === ">" ? 23 : 33;
                break;
              case 9:
                return _context12.delegateYield(this.pushCount(line.length - n), "t3", 10);
              case 10:
                return _context12.delegateYield(this.pushNewline(), "t4", 11);
              case 11:
                return _context12.delegateYield(this.parseLineStart(), "t5", 12);
              case 12:
                return _context12.abrupt("return", _context12.t5);
              case 13:
                return _context12.delegateYield(this.pushCount(1), "t6", 14);
              case 14:
                this.flowKey = false;
                this.flowLevel = 1;
                return _context12.abrupt("return", "flow");
              case 17:
                return _context12.delegateYield(this.pushCount(1), "t7", 18);
              case 18:
                return _context12.abrupt("return", "doc");
              case 19:
                return _context12.delegateYield(this.pushUntil(isNotAnchorChar), "t8", 20);
              case 20:
                return _context12.abrupt("return", "doc");
              case 21:
                return _context12.delegateYield(this.parseQuotedScalar(), "t9", 22);
              case 22:
                return _context12.abrupt("return", _context12.t9);
              case 23:
                _context12.t10 = n;
                return _context12.delegateYield(this.parseBlockScalarHeader(), "t11", 25);
              case 25:
                n = _context12.t10 += _context12.t11;
                _context12.t12 = n;
                return _context12.delegateYield(this.pushSpaces(true), "t13", 28);
              case 28:
                n = _context12.t12 += _context12.t13;
                return _context12.delegateYield(this.pushCount(line.length - n), "t14", 30);
              case 30:
                return _context12.delegateYield(this.pushNewline(), "t15", 31);
              case 31:
                return _context12.delegateYield(this.parseBlockScalar(), "t16", 32);
              case 32:
                return _context12.abrupt("return", _context12.t16);
              case 33:
                return _context12.delegateYield(this.parsePlainScalar(), "t17", 34);
              case 34:
                return _context12.abrupt("return", _context12.t17);
              case 35:
              case "end":
                return _context12.stop();
            }
          }, parseDocument, this);
        })
      }, {
        key: "parseFlowCollection",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseFlowCollection() {
          var nl, sp, indent, line, atFlowEndMarker, n, _next4;
          return _regeneratorRuntime().wrap(function parseFlowCollection$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
              case 0:
                indent = -1;
              case 1:
                return _context13.delegateYield(this.pushNewline(), "t0", 2);
              case 2:
                nl = _context13.t0;
                if (!(nl > 0)) {
                  _context13.next = 9;
                  break;
                }
                return _context13.delegateYield(this.pushSpaces(false), "t1", 5);
              case 5:
                sp = _context13.t1;
                this.indentValue = indent = sp;
                _context13.next = 10;
                break;
              case 9:
                sp = 0;
              case 10:
                _context13.t2 = sp;
                return _context13.delegateYield(this.pushSpaces(true), "t3", 12);
              case 12:
                sp = _context13.t2 += _context13.t3;
              case 13:
                if (nl + sp > 0) {
                  _context13.next = 1;
                  break;
                }
              case 14:
                line = this.getLine();
                if (!(line === null)) {
                  _context13.next = 17;
                  break;
                }
                return _context13.abrupt("return", this.setNext("flow"));
              case 17:
                if (!(indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3]))) {
                  _context13.next = 25;
                  break;
                }
                atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
                if (atFlowEndMarker) {
                  _context13.next = 25;
                  break;
                }
                this.flowLevel = 0;
                _context13.next = 23;
                return cst.FLOW_END;
              case 23:
                return _context13.delegateYield(this.parseLineStart(), "t4", 24);
              case 24:
                return _context13.abrupt("return", _context13.t4);
              case 25:
                n = 0;
              case 26:
                if (!(line[n] === ",")) {
                  _context13.next = 36;
                  break;
                }
                _context13.t5 = n;
                return _context13.delegateYield(this.pushCount(1), "t6", 29);
              case 29:
                n = _context13.t5 += _context13.t6;
                _context13.t7 = n;
                return _context13.delegateYield(this.pushSpaces(true), "t8", 32);
              case 32:
                n = _context13.t7 += _context13.t8;
                this.flowKey = false;
                _context13.next = 26;
                break;
              case 36:
                _context13.t9 = n;
                return _context13.delegateYield(this.pushIndicators(), "t10", 38);
              case 38:
                n = _context13.t9 += _context13.t10;
                _context13.t11 = line[n];
                _context13.next = _context13.t11 === void 0 ? 42 : _context13.t11 === "#" ? 43 : _context13.t11 === "{" ? 45 : _context13.t11 === "[" ? 45 : _context13.t11 === "}" ? 49 : _context13.t11 === "]" ? 49 : _context13.t11 === "*" ? 53 : _context13.t11 === '"' ? 55 : _context13.t11 === "'" ? 55 : _context13.t11 === ":" ? 58 : 64;
                break;
              case 42:
                return _context13.abrupt("return", "flow");
              case 43:
                return _context13.delegateYield(this.pushCount(line.length - n), "t12", 44);
              case 44:
                return _context13.abrupt("return", "flow");
              case 45:
                return _context13.delegateYield(this.pushCount(1), "t13", 46);
              case 46:
                this.flowKey = false;
                this.flowLevel += 1;
                return _context13.abrupt("return", "flow");
              case 49:
                return _context13.delegateYield(this.pushCount(1), "t14", 50);
              case 50:
                this.flowKey = true;
                this.flowLevel -= 1;
                return _context13.abrupt("return", this.flowLevel ? "flow" : "doc");
              case 53:
                return _context13.delegateYield(this.pushUntil(isNotAnchorChar), "t15", 54);
              case 54:
                return _context13.abrupt("return", "flow");
              case 55:
                this.flowKey = true;
                return _context13.delegateYield(this.parseQuotedScalar(), "t16", 57);
              case 57:
                return _context13.abrupt("return", _context13.t16);
              case 58:
                _next4 = this.charAt(1);
                if (!(this.flowKey || isEmpty(_next4) || _next4 === ",")) {
                  _context13.next = 64;
                  break;
                }
                this.flowKey = false;
                return _context13.delegateYield(this.pushCount(1), "t17", 62);
              case 62:
                return _context13.delegateYield(this.pushSpaces(true), "t18", 63);
              case 63:
                return _context13.abrupt("return", "flow");
              case 64:
                this.flowKey = false;
                return _context13.delegateYield(this.parsePlainScalar(), "t19", 66);
              case 66:
                return _context13.abrupt("return", _context13.t19);
              case 67:
              case "end":
                return _context13.stop();
            }
          }, parseFlowCollection, this);
        })
      }, {
        key: "parseQuotedScalar",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseQuotedScalar() {
          var quote, end, n, qb, nl, cs;
          return _regeneratorRuntime().wrap(function parseQuotedScalar$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
              case 0:
                quote = this.charAt(0);
                end = this.buffer.indexOf(quote, this.pos + 1);
                if (!(quote === "'")) {
                  _context14.next = 6;
                  break;
                }
                while (end !== -1 && this.buffer[end + 1] === "'") end = this.buffer.indexOf("'", end + 2);
                _context14.next = 14;
                break;
              case 6:
                if (!(end !== -1)) {
                  _context14.next = 14;
                  break;
                }
                n = 0;
                while (this.buffer[end - 1 - n] === "\\") n += 1;
                if (!(n % 2 === 0)) {
                  _context14.next = 11;
                  break;
                }
                return _context14.abrupt("break", 14);
              case 11:
                end = this.buffer.indexOf('"', end + 1);
                _context14.next = 6;
                break;
              case 14:
                qb = this.buffer.substring(0, end);
                nl = qb.indexOf("\n", this.pos);
                if (!(nl !== -1)) {
                  _context14.next = 25;
                  break;
                }
              case 17:
                if (!(nl !== -1)) {
                  _context14.next = 24;
                  break;
                }
                cs = this.continueScalar(nl + 1);
                if (!(cs === -1)) {
                  _context14.next = 21;
                  break;
                }
                return _context14.abrupt("break", 24);
              case 21:
                nl = qb.indexOf("\n", cs);
                _context14.next = 17;
                break;
              case 24:
                if (nl !== -1) {
                  end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
                }
              case 25:
                if (!(end === -1)) {
                  _context14.next = 29;
                  break;
                }
                if (this.atEnd) {
                  _context14.next = 28;
                  break;
                }
                return _context14.abrupt("return", this.setNext("quoted-scalar"));
              case 28:
                end = this.buffer.length;
              case 29:
                return _context14.delegateYield(this.pushToIndex(end + 1, false), "t0", 30);
              case 30:
                return _context14.abrupt("return", this.flowLevel ? "flow" : "doc");
              case 31:
              case "end":
                return _context14.stop();
            }
          }, parseQuotedScalar, this);
        })
      }, {
        key: "parseBlockScalarHeader",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseBlockScalarHeader() {
          var i, ch;
          return _regeneratorRuntime().wrap(function parseBlockScalarHeader$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
              case 0:
                this.blockScalarIndent = -1;
                this.blockScalarKeep = false;
                i = this.pos;
              case 3:
                if (!true) {
                  _context15.next = 17;
                  break;
                }
                ch = this.buffer[++i];
                if (!(ch === "+")) {
                  _context15.next = 9;
                  break;
                }
                this.blockScalarKeep = true;
                _context15.next = 15;
                break;
              case 9:
                if (!(ch > "0" && ch <= "9")) {
                  _context15.next = 13;
                  break;
                }
                this.blockScalarIndent = Number(ch) - 1;
                _context15.next = 15;
                break;
              case 13:
                if (!(ch !== "-")) {
                  _context15.next = 15;
                  break;
                }
                return _context15.abrupt("break", 17);
              case 15:
                _context15.next = 3;
                break;
              case 17:
                return _context15.delegateYield(this.pushUntil(function (ch) {
                  return isEmpty(ch) || ch === "#";
                }), "t0", 18);
              case 18:
                return _context15.abrupt("return", _context15.t0);
              case 19:
              case "end":
                return _context15.stop();
            }
          }, parseBlockScalarHeader, this);
        })
      }, {
        key: "parseBlockScalar",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parseBlockScalar() {
          var nl, indent, ch, i, _next5, cs, _i38, ch2, lastChar;
          return _regeneratorRuntime().wrap(function parseBlockScalar$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
              case 0:
                nl = this.pos - 1;
                indent = 0;
                i = this.pos;
              case 3:
                if (!(ch = this.buffer[i])) {
                  _context16.next = 21;
                  break;
                }
                _context16.t0 = ch;
                _context16.next = _context16.t0 === " " ? 7 : _context16.t0 === "\n" ? 9 : _context16.t0 === "\r" ? 12 : 17;
                break;
              case 7:
                indent += 1;
                return _context16.abrupt("break", 18);
              case 9:
                nl = i;
                indent = 0;
                return _context16.abrupt("break", 18);
              case 12:
                _next5 = this.buffer[i + 1];
                if (!(!_next5 && !this.atEnd)) {
                  _context16.next = 15;
                  break;
                }
                return _context16.abrupt("return", this.setNext("block-scalar"));
              case 15:
                if (!(_next5 === "\n")) {
                  _context16.next = 17;
                  break;
                }
                return _context16.abrupt("break", 18);
              case 17:
                return _context16.abrupt("break", 21);
              case 18:
                ++i;
                _context16.next = 3;
                break;
              case 21:
                if (!(!ch && !this.atEnd)) {
                  _context16.next = 23;
                  break;
                }
                return _context16.abrupt("return", this.setNext("block-scalar"));
              case 23:
                if (!(indent >= this.indentNext)) {
                  _context16.next = 34;
                  break;
                }
                if (this.blockScalarIndent === -1) this.indentNext = indent;else this.indentNext += this.blockScalarIndent;
              case 25:
                cs = this.continueScalar(nl + 1);
                if (!(cs === -1)) {
                  _context16.next = 28;
                  break;
                }
                return _context16.abrupt("break", 30);
              case 28:
                nl = this.buffer.indexOf("\n", cs);
              case 29:
                if (nl !== -1) {
                  _context16.next = 25;
                  break;
                }
              case 30:
                if (!(nl === -1)) {
                  _context16.next = 34;
                  break;
                }
                if (this.atEnd) {
                  _context16.next = 33;
                  break;
                }
                return _context16.abrupt("return", this.setNext("block-scalar"));
              case 33:
                nl = this.buffer.length;
              case 34:
                if (this.blockScalarKeep) {
                  _context16.next = 46;
                  break;
                }
              case 35:
                _i38 = nl - 1;
                ch2 = this.buffer[_i38];
                if (ch2 === "\r") ch2 = this.buffer[--_i38];
                lastChar = _i38;
                while (ch2 === " " || ch2 === "	") ch2 = this.buffer[--_i38];
                if (!(ch2 === "\n" && _i38 >= this.pos && _i38 + 1 + indent > lastChar)) {
                  _context16.next = 44;
                  break;
                }
                nl = _i38;
                _context16.next = 45;
                break;
              case 44:
                return _context16.abrupt("break", 46);
              case 45:
                if (true) {
                  _context16.next = 35;
                  break;
                }
              case 46:
                _context16.next = 48;
                return cst.SCALAR;
              case 48:
                return _context16.delegateYield(this.pushToIndex(nl + 1, true), "t1", 49);
              case 49:
                return _context16.delegateYield(this.parseLineStart(), "t2", 50);
              case 50:
                return _context16.abrupt("return", _context16.t2);
              case 51:
              case "end":
                return _context16.stop();
            }
          }, parseBlockScalar, this);
        })
      }, {
        key: "parsePlainScalar",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function parsePlainScalar() {
          var inFlow, end, i, ch, _next6, _next7, cs;
          return _regeneratorRuntime().wrap(function parsePlainScalar$(_context17) {
            while (1) switch (_context17.prev = _context17.next) {
              case 0:
                inFlow = this.flowLevel > 0;
                end = this.pos - 1;
                i = this.pos - 1;
              case 3:
                if (!(ch = this.buffer[++i])) {
                  _context17.next = 28;
                  break;
                }
                if (!(ch === ":")) {
                  _context17.next = 11;
                  break;
                }
                _next6 = this.buffer[i + 1];
                if (!(isEmpty(_next6) || inFlow && _next6 === ",")) {
                  _context17.next = 8;
                  break;
                }
                return _context17.abrupt("break", 28);
              case 8:
                end = i;
                _context17.next = 26;
                break;
              case 11:
                if (!isEmpty(ch)) {
                  _context17.next = 23;
                  break;
                }
                _next7 = this.buffer[i + 1];
                if (ch === "\r") {
                  if (_next7 === "\n") {
                    i += 1;
                    ch = "\n";
                    _next7 = this.buffer[i + 1];
                  } else end = i;
                }
                if (!(_next7 === "#" || inFlow && invalidFlowScalarChars.includes(_next7))) {
                  _context17.next = 16;
                  break;
                }
                return _context17.abrupt("break", 28);
              case 16:
                if (!(ch === "\n")) {
                  _context17.next = 21;
                  break;
                }
                cs = this.continueScalar(i + 1);
                if (!(cs === -1)) {
                  _context17.next = 20;
                  break;
                }
                return _context17.abrupt("break", 28);
              case 20:
                i = Math.max(i, cs - 2);
              case 21:
                _context17.next = 26;
                break;
              case 23:
                if (!(inFlow && invalidFlowScalarChars.includes(ch))) {
                  _context17.next = 25;
                  break;
                }
                return _context17.abrupt("break", 28);
              case 25:
                end = i;
              case 26:
                _context17.next = 3;
                break;
              case 28:
                if (!(!ch && !this.atEnd)) {
                  _context17.next = 30;
                  break;
                }
                return _context17.abrupt("return", this.setNext("plain-scalar"));
              case 30:
                _context17.next = 32;
                return cst.SCALAR;
              case 32:
                return _context17.delegateYield(this.pushToIndex(end + 1, true), "t0", 33);
              case 33:
                return _context17.abrupt("return", inFlow ? "flow" : "doc");
              case 34:
              case "end":
                return _context17.stop();
            }
          }, parsePlainScalar, this);
        })
      }, {
        key: "pushCount",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushCount(n) {
          return _regeneratorRuntime().wrap(function pushCount$(_context18) {
            while (1) switch (_context18.prev = _context18.next) {
              case 0:
                if (!(n > 0)) {
                  _context18.next = 5;
                  break;
                }
                _context18.next = 3;
                return this.buffer.substr(this.pos, n);
              case 3:
                this.pos += n;
                return _context18.abrupt("return", n);
              case 5:
                return _context18.abrupt("return", 0);
              case 6:
              case "end":
                return _context18.stop();
            }
          }, pushCount, this);
        })
      }, {
        key: "pushToIndex",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushToIndex(i, allowEmpty) {
          var s;
          return _regeneratorRuntime().wrap(function pushToIndex$(_context19) {
            while (1) switch (_context19.prev = _context19.next) {
              case 0:
                s = this.buffer.slice(this.pos, i);
                if (!s) {
                  _context19.next = 8;
                  break;
                }
                _context19.next = 4;
                return s;
              case 4:
                this.pos += s.length;
                return _context19.abrupt("return", s.length);
              case 8:
                if (!allowEmpty) {
                  _context19.next = 11;
                  break;
                }
                _context19.next = 11;
                return "";
              case 11:
                return _context19.abrupt("return", 0);
              case 12:
              case "end":
                return _context19.stop();
            }
          }, pushToIndex, this);
        })
      }, {
        key: "pushIndicators",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushIndicators() {
          var inFlow, ch1;
          return _regeneratorRuntime().wrap(function pushIndicators$(_context20) {
            while (1) switch (_context20.prev = _context20.next) {
              case 0:
                _context20.t0 = this.charAt(0);
                _context20.next = _context20.t0 === "!" ? 3 : _context20.t0 === "&" ? 11 : _context20.t0 === "-" ? 19 : _context20.t0 === "?" ? 19 : _context20.t0 === ":" ? 19 : 31;
                break;
              case 3:
                return _context20.delegateYield(this.pushTag(), "t1", 4);
              case 4:
                _context20.t2 = _context20.t1;
                return _context20.delegateYield(this.pushSpaces(true), "t3", 6);
              case 6:
                _context20.t4 = _context20.t3;
                _context20.t5 = _context20.t2 + _context20.t4;
                return _context20.delegateYield(this.pushIndicators(), "t6", 9);
              case 9:
                _context20.t7 = _context20.t6;
                return _context20.abrupt("return", _context20.t5 + _context20.t7);
              case 11:
                return _context20.delegateYield(this.pushUntil(isNotAnchorChar), "t8", 12);
              case 12:
                _context20.t9 = _context20.t8;
                return _context20.delegateYield(this.pushSpaces(true), "t10", 14);
              case 14:
                _context20.t11 = _context20.t10;
                _context20.t12 = _context20.t9 + _context20.t11;
                return _context20.delegateYield(this.pushIndicators(), "t13", 17);
              case 17:
                _context20.t14 = _context20.t13;
                return _context20.abrupt("return", _context20.t12 + _context20.t14);
              case 19:
                inFlow = this.flowLevel > 0;
                ch1 = this.charAt(1);
                if (!(isEmpty(ch1) || inFlow && invalidFlowScalarChars.includes(ch1))) {
                  _context20.next = 31;
                  break;
                }
                if (!inFlow) this.indentNext = this.indentValue + 1;else if (this.flowKey) this.flowKey = false;
                return _context20.delegateYield(this.pushCount(1), "t15", 24);
              case 24:
                _context20.t16 = _context20.t15;
                return _context20.delegateYield(this.pushSpaces(true), "t17", 26);
              case 26:
                _context20.t18 = _context20.t17;
                _context20.t19 = _context20.t16 + _context20.t18;
                return _context20.delegateYield(this.pushIndicators(), "t20", 29);
              case 29:
                _context20.t21 = _context20.t20;
                return _context20.abrupt("return", _context20.t19 + _context20.t21);
              case 31:
                return _context20.abrupt("return", 0);
              case 32:
              case "end":
                return _context20.stop();
            }
          }, pushIndicators, this);
        })
      }, {
        key: "pushTag",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushTag() {
          var i, ch, _i39, _ch3;
          return _regeneratorRuntime().wrap(function pushTag$(_context21) {
            while (1) switch (_context21.prev = _context21.next) {
              case 0:
                if (!(this.charAt(1) === "<")) {
                  _context21.next = 8;
                  break;
                }
                i = this.pos + 2;
                ch = this.buffer[i];
                while (!isEmpty(ch) && ch !== ">") ch = this.buffer[++i];
                return _context21.delegateYield(this.pushToIndex(ch === ">" ? i + 1 : i, false), "t0", 5);
              case 5:
                return _context21.abrupt("return", _context21.t0);
              case 8:
                _i39 = this.pos + 1;
                _ch3 = this.buffer[_i39];
              case 10:
                if (!_ch3) {
                  _context21.next = 22;
                  break;
                }
                if (!tagChars.includes(_ch3)) {
                  _context21.next = 15;
                  break;
                }
                _ch3 = this.buffer[++_i39];
                _context21.next = 20;
                break;
              case 15:
                if (!(_ch3 === "%" && hexDigits.includes(this.buffer[_i39 + 1]) && hexDigits.includes(this.buffer[_i39 + 2]))) {
                  _context21.next = 19;
                  break;
                }
                _ch3 = this.buffer[_i39 += 3];
                _context21.next = 20;
                break;
              case 19:
                return _context21.abrupt("break", 22);
              case 20:
                _context21.next = 10;
                break;
              case 22:
                return _context21.delegateYield(this.pushToIndex(_i39, false), "t1", 23);
              case 23:
                return _context21.abrupt("return", _context21.t1);
              case 24:
              case "end":
                return _context21.stop();
            }
          }, pushTag, this);
        })
      }, {
        key: "pushNewline",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushNewline() {
          var ch;
          return _regeneratorRuntime().wrap(function pushNewline$(_context22) {
            while (1) switch (_context22.prev = _context22.next) {
              case 0:
                ch = this.buffer[this.pos];
                if (!(ch === "\n")) {
                  _context22.next = 6;
                  break;
                }
                return _context22.delegateYield(this.pushCount(1), "t0", 3);
              case 3:
                return _context22.abrupt("return", _context22.t0);
              case 6:
                if (!(ch === "\r" && this.charAt(1) === "\n")) {
                  _context22.next = 11;
                  break;
                }
                return _context22.delegateYield(this.pushCount(2), "t1", 8);
              case 8:
                return _context22.abrupt("return", _context22.t1);
              case 11:
                return _context22.abrupt("return", 0);
              case 12:
              case "end":
                return _context22.stop();
            }
          }, pushNewline, this);
        })
      }, {
        key: "pushSpaces",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushSpaces(allowTabs) {
          var i, ch, n;
          return _regeneratorRuntime().wrap(function pushSpaces$(_context23) {
            while (1) switch (_context23.prev = _context23.next) {
              case 0:
                i = this.pos - 1;
                do {
                  ch = this.buffer[++i];
                } while (ch === " " || allowTabs && ch === "	");
                n = i - this.pos;
                if (!(n > 0)) {
                  _context23.next = 7;
                  break;
                }
                _context23.next = 6;
                return this.buffer.substr(this.pos, n);
              case 6:
                this.pos = i;
              case 7:
                return _context23.abrupt("return", n);
              case 8:
              case "end":
                return _context23.stop();
            }
          }, pushSpaces, this);
        })
      }, {
        key: "pushUntil",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pushUntil(test) {
          var i, ch;
          return _regeneratorRuntime().wrap(function pushUntil$(_context24) {
            while (1) switch (_context24.prev = _context24.next) {
              case 0:
                i = this.pos;
                ch = this.buffer[i];
                while (!test(ch)) ch = this.buffer[++i];
                return _context24.delegateYield(this.pushToIndex(i, false), "t0", 4);
              case 4:
                return _context24.abrupt("return", _context24.t0);
              case 5:
              case "end":
                return _context24.stop();
            }
          }, pushUntil, this);
        })
      }]);
      return Lexer;
    }();
    exports.Lexer = Lexer;
  }
});

// node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/yaml/dist/parse/line-counter.js": function node_modulesYamlDistParseLineCounterJs(exports) {
    "use strict";

    var LineCounter = /*#__PURE__*/_createClass(function LineCounter() {
      var _this25 = this;
      _classCallCheck(this, LineCounter);
      this.lineStarts = [];
      this.addNewLine = function (offset) {
        return _this25.lineStarts.push(offset);
      };
      this.linePos = function (offset) {
        var low = 0;
        var high = _this25.lineStarts.length;
        while (low < high) {
          var mid = low + high >> 1;
          if (_this25.lineStarts[mid] < offset) low = mid + 1;else high = mid;
        }
        if (_this25.lineStarts[low] === offset) return {
          line: low + 1,
          col: 1
        };
        if (low === 0) return {
          line: 0,
          col: offset
        };
        var start = _this25.lineStarts[low - 1];
        return {
          line: low,
          col: offset - start + 1
        };
      };
    });
    exports.LineCounter = LineCounter;
  }
});

// node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/yaml/dist/parse/parser.js": function node_modulesYamlDistParseParserJs(exports) {
    "use strict";

    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (var i = 0; i < list.length; ++i) if (list[i].type === type) return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (var i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token === null || token === void 0 ? void 0 : token.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map":
          {
            var _it$sep;
            var it = parent.items[parent.items.length - 1];
            return (_it$sep = it.sep) !== null && _it$sep !== void 0 ? _it$sep : it.start;
          }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0) return [];
      var i = prev.length;
      loop: while (--i >= 0) {
        switch (prev[i].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (((_prev$i = prev[++i]) === null || _prev$i === void 0 ? void 0 : _prev$i.type) === "space") {
        var _prev$i;
      }
      return prev.splice(i, prev.length);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        var _iterator56 = _createForOfIteratorHelper(fc.items),
          _step56;
        try {
          for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
            var it = _step56.value;
            if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
              if (it.key) it.value = it.key;
              delete it.key;
              if (isFlowToken(it.value)) {
                if (it.value.end) Array.prototype.push.apply(it.value.end, it.sep);else it.value.end = it.sep;
              } else Array.prototype.push.apply(it.start, it.sep);
              delete it.sep;
            }
          }
        } catch (err) {
          _iterator56.e(err);
        } finally {
          _iterator56.f();
        }
      }
    }
    var Parser = /*#__PURE__*/function () {
      function Parser(onNewLine) {
        _classCallCheck(this, Parser);
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      _createClass(Parser, [{
        key: "parse",
        value: function parse(source) {
          var _this26 = this;
          var incomplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var _iterator57, _step57, lexeme;
            return _regeneratorRuntime().wrap(function _callee6$(_context25) {
              while (1) switch (_context25.prev = _context25.next) {
                case 0:
                  if (_this26.onNewLine && _this26.offset === 0) _this26.onNewLine(0);
                  _iterator57 = _createForOfIteratorHelper(_this26.lexer.lex(source, incomplete));
                  _context25.prev = 2;
                  _iterator57.s();
                case 4:
                  if ((_step57 = _iterator57.n()).done) {
                    _context25.next = 9;
                    break;
                  }
                  lexeme = _step57.value;
                  return _context25.delegateYield(_this26.next(lexeme), "t0", 7);
                case 7:
                  _context25.next = 4;
                  break;
                case 9:
                  _context25.next = 14;
                  break;
                case 11:
                  _context25.prev = 11;
                  _context25.t1 = _context25["catch"](2);
                  _iterator57.e(_context25.t1);
                case 14:
                  _context25.prev = 14;
                  _iterator57.f();
                  return _context25.finish(14);
                case 17:
                  if (incomplete) {
                    _context25.next = 19;
                    break;
                  }
                  return _context25.delegateYield(_this26.end(), "t2", 19);
                case 19:
                case "end":
                  return _context25.stop();
              }
            }, _callee6, null, [[2, 11, 14, 17]]);
          })();
        }
      }, {
        key: "next",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function next(source) {
          var type, message;
          return _regeneratorRuntime().wrap(function next$(_context26) {
            while (1) switch (_context26.prev = _context26.next) {
              case 0:
                this.source = source;
                if (process.env.LOG_TOKENS) console.log("|", cst.prettyToken(source));
                if (!this.atScalar) {
                  _context26.next = 7;
                  break;
                }
                this.atScalar = false;
                return _context26.delegateYield(this.step(), "t0", 5);
              case 5:
                this.offset += source.length;
                return _context26.abrupt("return");
              case 7:
                type = cst.tokenType(source);
                if (type) {
                  _context26.next = 14;
                  break;
                }
                message = "Not a YAML token: ".concat(source);
                return _context26.delegateYield(this.pop({
                  type: "error",
                  offset: this.offset,
                  message: message,
                  source: source
                }), "t1", 11);
              case 11:
                this.offset += source.length;
                _context26.next = 36;
                break;
              case 14:
                if (!(type === "scalar")) {
                  _context26.next = 20;
                  break;
                }
                this.atNewLine = false;
                this.atScalar = true;
                this.type = "scalar";
                _context26.next = 36;
                break;
              case 20:
                this.type = type;
                return _context26.delegateYield(this.step(), "t2", 22);
              case 22:
                _context26.t3 = type;
                _context26.next = _context26.t3 === "newline" ? 25 : _context26.t3 === "space" ? 29 : _context26.t3 === "explicit-key-ind" ? 31 : _context26.t3 === "map-value-ind" ? 31 : _context26.t3 === "seq-item-ind" ? 31 : _context26.t3 === "doc-mode" ? 33 : _context26.t3 === "flow-error-end" ? 33 : 34;
                break;
              case 25:
                this.atNewLine = true;
                this.indent = 0;
                if (this.onNewLine) this.onNewLine(this.offset + source.length);
                return _context26.abrupt("break", 35);
              case 29:
                if (this.atNewLine && source[0] === " ") this.indent += source.length;
                return _context26.abrupt("break", 35);
              case 31:
                if (this.atNewLine) this.indent += source.length;
                return _context26.abrupt("break", 35);
              case 33:
                return _context26.abrupt("return");
              case 34:
                this.atNewLine = false;
              case 35:
                this.offset += source.length;
              case 36:
              case "end":
                return _context26.stop();
            }
          }, next, this);
        })
      }, {
        key: "end",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function end() {
          return _regeneratorRuntime().wrap(function end$(_context27) {
            while (1) switch (_context27.prev = _context27.next) {
              case 0:
                if (!(this.stack.length > 0)) {
                  _context27.next = 4;
                  break;
                }
                return _context27.delegateYield(this.pop(), "t0", 2);
              case 2:
                _context27.next = 0;
                break;
              case 4:
              case "end":
                return _context27.stop();
            }
          }, end, this);
        })
      }, {
        key: "sourceToken",
        get: function get() {
          var st = {
            type: this.type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
          };
          return st;
        }
      }, {
        key: "step",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function step() {
          var top;
          return _regeneratorRuntime().wrap(function step$(_context28) {
            while (1) switch (_context28.prev = _context28.next) {
              case 0:
                top = this.peek(1);
                if (!(this.type === "doc-end" && (!top || top.type !== "doc-end"))) {
                  _context28.next = 8;
                  break;
                }
              case 2:
                if (!(this.stack.length > 0)) {
                  _context28.next = 6;
                  break;
                }
                return _context28.delegateYield(this.pop(), "t0", 4);
              case 4:
                _context28.next = 2;
                break;
              case 6:
                this.stack.push({
                  type: "doc-end",
                  offset: this.offset,
                  source: this.source
                });
                return _context28.abrupt("return");
              case 8:
                if (top) {
                  _context28.next = 11;
                  break;
                }
                return _context28.delegateYield(this.stream(), "t1", 10);
              case 10:
                return _context28.abrupt("return", _context28.t1);
              case 11:
                _context28.t2 = top.type;
                _context28.next = _context28.t2 === "document" ? 14 : _context28.t2 === "alias" ? 16 : _context28.t2 === "scalar" ? 16 : _context28.t2 === "single-quoted-scalar" ? 16 : _context28.t2 === "double-quoted-scalar" ? 16 : _context28.t2 === "block-scalar" ? 18 : _context28.t2 === "block-map" ? 20 : _context28.t2 === "block-seq" ? 22 : _context28.t2 === "flow-collection" ? 24 : _context28.t2 === "doc-end" ? 26 : 28;
                break;
              case 14:
                return _context28.delegateYield(this.document(top), "t3", 15);
              case 15:
                return _context28.abrupt("return", _context28.t3);
              case 16:
                return _context28.delegateYield(this.scalar(top), "t4", 17);
              case 17:
                return _context28.abrupt("return", _context28.t4);
              case 18:
                return _context28.delegateYield(this.blockScalar(top), "t5", 19);
              case 19:
                return _context28.abrupt("return", _context28.t5);
              case 20:
                return _context28.delegateYield(this.blockMap(top), "t6", 21);
              case 21:
                return _context28.abrupt("return", _context28.t6);
              case 22:
                return _context28.delegateYield(this.blockSequence(top), "t7", 23);
              case 23:
                return _context28.abrupt("return", _context28.t7);
              case 24:
                return _context28.delegateYield(this.flowCollection(top), "t8", 25);
              case 25:
                return _context28.abrupt("return", _context28.t8);
              case 26:
                return _context28.delegateYield(this.documentEnd(top), "t9", 27);
              case 27:
                return _context28.abrupt("return", _context28.t9);
              case 28:
                return _context28.delegateYield(this.pop(), "t10", 29);
              case 29:
              case "end":
                return _context28.stop();
            }
          }, step, this);
        })
      }, {
        key: "peek",
        value: function peek(n) {
          return this.stack[this.stack.length - n];
        }
      }, {
        key: "pop",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function pop(error) {
          var token, message, top, it, _it2, _it3, last;
          return _regeneratorRuntime().wrap(function pop$(_context29) {
            while (1) switch (_context29.prev = _context29.next) {
              case 0:
                token = error !== null && error !== void 0 ? error : this.stack.pop();
                if (token) {
                  _context29.next = 7;
                  break;
                }
                message = "Tried to pop an empty stack";
                _context29.next = 5;
                return {
                  type: "error",
                  offset: this.offset,
                  source: "",
                  message: message
                };
              case 5:
                _context29.next = 46;
                break;
              case 7:
                if (!(this.stack.length === 0)) {
                  _context29.next = 12;
                  break;
                }
                _context29.next = 10;
                return token;
              case 10:
                _context29.next = 46;
                break;
              case 12:
                top = this.peek(1);
                if (token.type === "block-scalar") {
                  token.indent = "indent" in top ? top.indent : 0;
                } else if (token.type === "flow-collection" && top.type === "document") {
                  token.indent = 0;
                }
                if (token.type === "flow-collection") fixFlowSeqItems(token);
                _context29.t0 = top.type;
                _context29.next = _context29.t0 === "document" ? 18 : _context29.t0 === "block-scalar" ? 20 : _context29.t0 === "block-map" ? 22 : _context29.t0 === "block-seq" ? 37 : _context29.t0 === "flow-collection" ? 40 : 43;
                break;
              case 18:
                top.value = token;
                return _context29.abrupt("break", 45);
              case 20:
                top.props.push(token);
                return _context29.abrupt("break", 45);
              case 22:
                it = top.items[top.items.length - 1];
                if (!it.value) {
                  _context29.next = 29;
                  break;
                }
                top.items.push({
                  start: [],
                  key: token,
                  sep: []
                });
                this.onKeyLine = true;
                return _context29.abrupt("return");
              case 29:
                if (!it.sep) {
                  _context29.next = 33;
                  break;
                }
                it.value = token;
                _context29.next = 36;
                break;
              case 33:
                Object.assign(it, {
                  key: token,
                  sep: []
                });
                this.onKeyLine = !includesToken(it.start, "explicit-key-ind");
                return _context29.abrupt("return");
              case 36:
                return _context29.abrupt("break", 45);
              case 37:
                _it2 = top.items[top.items.length - 1];
                if (_it2.value) top.items.push({
                  start: [],
                  value: token
                });else _it2.value = token;
                return _context29.abrupt("break", 45);
              case 40:
                _it3 = top.items[top.items.length - 1];
                if (!_it3 || _it3.value) top.items.push({
                  start: [],
                  key: token,
                  sep: []
                });else if (_it3.sep) _it3.value = token;else Object.assign(_it3, {
                  key: token,
                  sep: []
                });
                return _context29.abrupt("return");
              case 43:
                return _context29.delegateYield(this.pop(), "t1", 44);
              case 44:
                return _context29.delegateYield(this.pop(token), "t2", 45);
              case 45:
                if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
                  last = token.items[token.items.length - 1];
                  if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every(function (st) {
                    return st.type !== "comment" || st.indent < token.indent;
                  }))) {
                    if (top.type === "document") top.end = last.start;else top.items.push({
                      start: last.start
                    });
                    token.items.splice(-1, 1);
                  }
                }
              case 46:
              case "end":
                return _context29.stop();
            }
          }, pop, this);
        })
      }, {
        key: "stream",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function stream() {
          var doc;
          return _regeneratorRuntime().wrap(function stream$(_context30) {
            while (1) switch (_context30.prev = _context30.next) {
              case 0:
                _context30.t0 = this.type;
                _context30.next = _context30.t0 === "directive-line" ? 3 : _context30.t0 === "byte-order-mark" ? 6 : _context30.t0 === "space" ? 6 : _context30.t0 === "comment" ? 6 : _context30.t0 === "newline" ? 6 : _context30.t0 === "doc-mode" ? 9 : _context30.t0 === "doc-start" ? 9 : 13;
                break;
              case 3:
                _context30.next = 5;
                return {
                  type: "directive",
                  offset: this.offset,
                  source: this.source
                };
              case 5:
                return _context30.abrupt("return");
              case 6:
                _context30.next = 8;
                return this.sourceToken;
              case 8:
                return _context30.abrupt("return");
              case 9:
                doc = {
                  type: "document",
                  offset: this.offset,
                  start: []
                };
                if (this.type === "doc-start") doc.start.push(this.sourceToken);
                this.stack.push(doc);
                return _context30.abrupt("return");
              case 13:
                _context30.next = 15;
                return {
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected ".concat(this.type, " token in YAML stream"),
                  source: this.source
                };
              case 15:
              case "end":
                return _context30.stop();
            }
          }, stream, this);
        })
      }, {
        key: "document",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function document(doc) {
          var bv;
          return _regeneratorRuntime().wrap(function document$(_context31) {
            while (1) switch (_context31.prev = _context31.next) {
              case 0:
                if (!doc.value) {
                  _context31.next = 3;
                  break;
                }
                return _context31.delegateYield(this.lineEnd(doc), "t0", 2);
              case 2:
                return _context31.abrupt("return", _context31.t0);
              case 3:
                _context31.t1 = this.type;
                _context31.next = _context31.t1 === "doc-start" ? 6 : _context31.t1 === "anchor" ? 13 : _context31.t1 === "tag" ? 13 : _context31.t1 === "space" ? 13 : _context31.t1 === "comment" ? 13 : _context31.t1 === "newline" ? 13 : 15;
                break;
              case 6:
                if (!(findNonEmptyIndex(doc.start) !== -1)) {
                  _context31.next = 11;
                  break;
                }
                return _context31.delegateYield(this.pop(), "t2", 8);
              case 8:
                return _context31.delegateYield(this.step(), "t3", 9);
              case 9:
                _context31.next = 12;
                break;
              case 11:
                doc.start.push(this.sourceToken);
              case 12:
                return _context31.abrupt("return");
              case 13:
                doc.start.push(this.sourceToken);
                return _context31.abrupt("return");
              case 15:
                bv = this.startBlockValue(doc);
                if (!bv) {
                  _context31.next = 20;
                  break;
                }
                this.stack.push(bv);
                _context31.next = 22;
                break;
              case 20:
                _context31.next = 22;
                return {
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected ".concat(this.type, " token in YAML document"),
                  source: this.source
                };
              case 22:
              case "end":
                return _context31.stop();
            }
          }, document, this);
        })
      }, {
        key: "scalar",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function scalar(_scalar) {
          var prev, start, sep, map;
          return _regeneratorRuntime().wrap(function scalar$(_context32) {
            while (1) switch (_context32.prev = _context32.next) {
              case 0:
                if (!(this.type === "map-value-ind")) {
                  _context32.next = 9;
                  break;
                }
                prev = getPrevProps(this.peek(2));
                start = getFirstKeyStartProps(prev);
                if (_scalar.end) {
                  sep = _scalar.end;
                  sep.push(this.sourceToken);
                  delete _scalar.end;
                } else sep = [this.sourceToken];
                map = {
                  type: "block-map",
                  offset: _scalar.offset,
                  indent: _scalar.indent,
                  items: [{
                    start: start,
                    key: _scalar,
                    sep: sep
                  }]
                };
                this.onKeyLine = true;
                this.stack[this.stack.length - 1] = map;
                _context32.next = 10;
                break;
              case 9:
                return _context32.delegateYield(this.lineEnd(_scalar), "t0", 10);
              case 10:
              case "end":
                return _context32.stop();
            }
          }, scalar, this);
        })
      }, {
        key: "blockScalar",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function blockScalar(scalar) {
          var nl;
          return _regeneratorRuntime().wrap(function blockScalar$(_context33) {
            while (1) switch (_context33.prev = _context33.next) {
              case 0:
                _context33.t0 = this.type;
                _context33.next = _context33.t0 === "space" ? 3 : _context33.t0 === "comment" ? 3 : _context33.t0 === "newline" ? 3 : _context33.t0 === "scalar" ? 5 : 11;
                break;
              case 3:
                scalar.props.push(this.sourceToken);
                return _context33.abrupt("return");
              case 5:
                scalar.source = this.source;
                this.atNewLine = true;
                this.indent = 0;
                if (this.onNewLine) {
                  nl = this.source.indexOf("\n") + 1;
                  while (nl !== 0) {
                    this.onNewLine(this.offset + nl);
                    nl = this.source.indexOf("\n", nl) + 1;
                  }
                }
                return _context33.delegateYield(this.pop(), "t1", 10);
              case 10:
                return _context33.abrupt("break", 13);
              case 11:
                return _context33.delegateYield(this.pop(), "t2", 12);
              case 12:
                return _context33.delegateYield(this.step(), "t3", 13);
              case 13:
              case "end":
                return _context33.stop();
            }
          }, blockScalar, this);
        })
      }, {
        key: "blockMap",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function blockMap(map) {
          var it, _end2, last, _prev$value2, prev, _end3, atNextItem, start, nl, i, st, start2, _start2, key, sep, fs2, bv;
          return _regeneratorRuntime().wrap(function blockMap$(_context34) {
            while (1) switch (_context34.prev = _context34.next) {
              case 0:
                it = map.items[map.items.length - 1];
                _context34.t0 = this.type;
                _context34.next = _context34.t0 === "newline" ? 4 : _context34.t0 === "space" ? 7 : _context34.t0 === "comment" ? 7 : 25;
                break;
              case 4:
                this.onKeyLine = false;
                if (it.value) {
                  _end2 = "end" in it.value ? it.value.end : void 0;
                  last = Array.isArray(_end2) ? _end2[_end2.length - 1] : void 0;
                  if ((last === null || last === void 0 ? void 0 : last.type) === "comment") _end2 === null || _end2 === void 0 || _end2.push(this.sourceToken);else map.items.push({
                    start: [this.sourceToken]
                  });
                } else if (it.sep) {
                  it.sep.push(this.sourceToken);
                } else {
                  it.start.push(this.sourceToken);
                }
                return _context34.abrupt("return");
              case 7:
                if (!it.value) {
                  _context34.next = 11;
                  break;
                }
                map.items.push({
                  start: [this.sourceToken]
                });
                _context34.next = 24;
                break;
              case 11:
                if (!it.sep) {
                  _context34.next = 15;
                  break;
                }
                it.sep.push(this.sourceToken);
                _context34.next = 24;
                break;
              case 15:
                if (!this.atIndentedComment(it.start, map.indent)) {
                  _context34.next = 23;
                  break;
                }
                prev = map.items[map.items.length - 2];
                _end3 = prev === null || prev === void 0 || (_prev$value2 = prev.value) === null || _prev$value2 === void 0 ? void 0 : _prev$value2.end;
                if (!Array.isArray(_end3)) {
                  _context34.next = 23;
                  break;
                }
                Array.prototype.push.apply(_end3, it.start);
                _end3.push(this.sourceToken);
                map.items.pop();
                return _context34.abrupt("return");
              case 23:
                it.start.push(this.sourceToken);
              case 24:
                return _context34.abrupt("return");
              case 25:
                if (!(this.indent >= map.indent)) {
                  _context34.next = 65;
                  break;
                }
                atNextItem = !this.onKeyLine && this.indent === map.indent && it.sep;
                start = [];
                if (!(atNextItem && it.sep && !it.value)) {
                  _context34.next = 46;
                  break;
                }
                nl = [];
                i = 0;
              case 31:
                if (!(i < it.sep.length)) {
                  _context34.next = 45;
                  break;
                }
                st = it.sep[i];
                _context34.t1 = st.type;
                _context34.next = _context34.t1 === "newline" ? 36 : _context34.t1 === "space" ? 38 : _context34.t1 === "comment" ? 39 : 41;
                break;
              case 36:
                nl.push(i);
                return _context34.abrupt("break", 42);
              case 38:
                return _context34.abrupt("break", 42);
              case 39:
                if (st.indent > map.indent) nl.length = 0;
                return _context34.abrupt("break", 42);
              case 41:
                nl.length = 0;
              case 42:
                ++i;
                _context34.next = 31;
                break;
              case 45:
                if (nl.length >= 2) start = it.sep.splice(nl[1]);
              case 46:
                _context34.t2 = this.type;
                _context34.next = _context34.t2 === "anchor" ? 49 : _context34.t2 === "tag" ? 49 : _context34.t2 === "explicit-key-ind" ? 51 : _context34.t2 === "map-value-ind" ? 54 : _context34.t2 === "alias" ? 57 : _context34.t2 === "scalar" ? 57 : _context34.t2 === "single-quoted-scalar" ? 57 : _context34.t2 === "double-quoted-scalar" ? 57 : 60;
                break;
              case 49:
                if (atNextItem || it.value) {
                  start.push(this.sourceToken);
                  map.items.push({
                    start: start
                  });
                  this.onKeyLine = true;
                } else if (it.sep) {
                  it.sep.push(this.sourceToken);
                } else {
                  it.start.push(this.sourceToken);
                }
                return _context34.abrupt("return");
              case 51:
                if (!it.sep && !includesToken(it.start, "explicit-key-ind")) {
                  it.start.push(this.sourceToken);
                } else if (atNextItem || it.value) {
                  start.push(this.sourceToken);
                  map.items.push({
                    start: start
                  });
                } else {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{
                      start: [this.sourceToken]
                    }]
                  });
                }
                this.onKeyLine = true;
                return _context34.abrupt("return");
              case 54:
                if (includesToken(it.start, "explicit-key-ind")) {
                  if (!it.sep) {
                    if (includesToken(it.start, "newline")) {
                      Object.assign(it, {
                        key: null,
                        sep: [this.sourceToken]
                      });
                    } else {
                      start2 = getFirstKeyStartProps(it.start);
                      this.stack.push({
                        type: "block-map",
                        offset: this.offset,
                        indent: this.indent,
                        items: [{
                          start: start2,
                          key: null,
                          sep: [this.sourceToken]
                        }]
                      });
                    }
                  } else if (it.value) {
                    map.items.push({
                      start: [],
                      key: null,
                      sep: [this.sourceToken]
                    });
                  } else if (includesToken(it.sep, "map-value-ind")) {
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{
                        start: start,
                        key: null,
                        sep: [this.sourceToken]
                      }]
                    });
                  } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                    _start2 = getFirstKeyStartProps(it.start);
                    key = it.key;
                    sep = it.sep;
                    sep.push(this.sourceToken);
                    delete it.key, delete it.sep;
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{
                        start: _start2,
                        key: key,
                        sep: sep
                      }]
                    });
                  } else if (start.length > 0) {
                    it.sep = it.sep.concat(start, this.sourceToken);
                  } else {
                    it.sep.push(this.sourceToken);
                  }
                } else {
                  if (!it.sep) {
                    Object.assign(it, {
                      key: null,
                      sep: [this.sourceToken]
                    });
                  } else if (it.value || atNextItem) {
                    map.items.push({
                      start: start,
                      key: null,
                      sep: [this.sourceToken]
                    });
                  } else if (includesToken(it.sep, "map-value-ind")) {
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{
                        start: [],
                        key: null,
                        sep: [this.sourceToken]
                      }]
                    });
                  } else {
                    it.sep.push(this.sourceToken);
                  }
                }
                this.onKeyLine = true;
                return _context34.abrupt("return");
              case 57:
                fs2 = this.flowScalar(this.type);
                if (atNextItem || it.value) {
                  map.items.push({
                    start: start,
                    key: fs2,
                    sep: []
                  });
                  this.onKeyLine = true;
                } else if (it.sep) {
                  this.stack.push(fs2);
                } else {
                  Object.assign(it, {
                    key: fs2,
                    sep: []
                  });
                  this.onKeyLine = true;
                }
                return _context34.abrupt("return");
              case 60:
                bv = this.startBlockValue(map);
                if (!bv) {
                  _context34.next = 65;
                  break;
                }
                if (atNextItem && bv.type !== "block-seq" && includesToken(it.start, "explicit-key-ind")) {
                  map.items.push({
                    start: start
                  });
                }
                this.stack.push(bv);
                return _context34.abrupt("return");
              case 65:
                return _context34.delegateYield(this.pop(), "t3", 66);
              case 66:
                return _context34.delegateYield(this.step(), "t4", 67);
              case 67:
              case "end":
                return _context34.stop();
            }
          }, blockMap, this);
        })
      }, {
        key: "blockSequence",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function blockSequence(seq) {
          var it, _end4, last, _prev$value3, prev, _end5, bv;
          return _regeneratorRuntime().wrap(function blockSequence$(_context35) {
            while (1) switch (_context35.prev = _context35.next) {
              case 0:
                it = seq.items[seq.items.length - 1];
                _context35.t0 = this.type;
                _context35.next = _context35.t0 === "newline" ? 4 : _context35.t0 === "space" ? 6 : _context35.t0 === "comment" ? 6 : _context35.t0 === "anchor" ? 20 : _context35.t0 === "tag" ? 20 : _context35.t0 === "seq-item-ind" ? 24 : 28;
                break;
              case 4:
                if (it.value) {
                  _end4 = "end" in it.value ? it.value.end : void 0;
                  last = Array.isArray(_end4) ? _end4[_end4.length - 1] : void 0;
                  if ((last === null || last === void 0 ? void 0 : last.type) === "comment") _end4 === null || _end4 === void 0 || _end4.push(this.sourceToken);else seq.items.push({
                    start: [this.sourceToken]
                  });
                } else it.start.push(this.sourceToken);
                return _context35.abrupt("return");
              case 6:
                if (!it.value) {
                  _context35.next = 10;
                  break;
                }
                seq.items.push({
                  start: [this.sourceToken]
                });
                _context35.next = 19;
                break;
              case 10:
                if (!this.atIndentedComment(it.start, seq.indent)) {
                  _context35.next = 18;
                  break;
                }
                prev = seq.items[seq.items.length - 2];
                _end5 = prev === null || prev === void 0 || (_prev$value3 = prev.value) === null || _prev$value3 === void 0 ? void 0 : _prev$value3.end;
                if (!Array.isArray(_end5)) {
                  _context35.next = 18;
                  break;
                }
                Array.prototype.push.apply(_end5, it.start);
                _end5.push(this.sourceToken);
                seq.items.pop();
                return _context35.abrupt("return");
              case 18:
                it.start.push(this.sourceToken);
              case 19:
                return _context35.abrupt("return");
              case 20:
                if (!(it.value || this.indent <= seq.indent)) {
                  _context35.next = 22;
                  break;
                }
                return _context35.abrupt("break", 28);
              case 22:
                it.start.push(this.sourceToken);
                return _context35.abrupt("return");
              case 24:
                if (!(this.indent !== seq.indent)) {
                  _context35.next = 26;
                  break;
                }
                return _context35.abrupt("break", 28);
              case 26:
                if (it.value || includesToken(it.start, "seq-item-ind")) seq.items.push({
                  start: [this.sourceToken]
                });else it.start.push(this.sourceToken);
                return _context35.abrupt("return");
              case 28:
                if (!(this.indent > seq.indent)) {
                  _context35.next = 33;
                  break;
                }
                bv = this.startBlockValue(seq);
                if (!bv) {
                  _context35.next = 33;
                  break;
                }
                this.stack.push(bv);
                return _context35.abrupt("return");
              case 33:
                return _context35.delegateYield(this.pop(), "t1", 34);
              case 34:
                return _context35.delegateYield(this.step(), "t2", 35);
              case 35:
              case "end":
                return _context35.stop();
            }
          }, blockSequence, this);
        })
      }, {
        key: "flowCollection",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function flowCollection(fc) {
          var it, top, fs2, bv, parent, prev, start, sep, map;
          return _regeneratorRuntime().wrap(function flowCollection$(_context36) {
            while (1) switch (_context36.prev = _context36.next) {
              case 0:
                it = fc.items[fc.items.length - 1];
                if (!(this.type === "flow-error-end")) {
                  _context36.next = 7;
                  break;
                }
              case 2:
                return _context36.delegateYield(this.pop(), "t0", 3);
              case 3:
                top = this.peek(1);
              case 4:
                if (top && top.type === "flow-collection") {
                  _context36.next = 2;
                  break;
                }
              case 5:
                _context36.next = 49;
                break;
              case 7:
                if (!(fc.end.length === 0)) {
                  _context36.next = 31;
                  break;
                }
                _context36.t1 = this.type;
                _context36.next = _context36.t1 === "comma" ? 11 : _context36.t1 === "explicit-key-ind" ? 11 : _context36.t1 === "map-value-ind" ? 13 : _context36.t1 === "space" ? 15 : _context36.t1 === "comment" ? 15 : _context36.t1 === "newline" ? 15 : _context36.t1 === "anchor" ? 15 : _context36.t1 === "tag" ? 15 : _context36.t1 === "alias" ? 17 : _context36.t1 === "scalar" ? 17 : _context36.t1 === "single-quoted-scalar" ? 17 : _context36.t1 === "double-quoted-scalar" ? 17 : _context36.t1 === "flow-map-end" ? 20 : _context36.t1 === "flow-seq-end" ? 20 : 22;
                break;
              case 11:
                if (!it || it.sep) fc.items.push({
                  start: [this.sourceToken]
                });else it.start.push(this.sourceToken);
                return _context36.abrupt("return");
              case 13:
                if (!it || it.value) fc.items.push({
                  start: [],
                  key: null,
                  sep: [this.sourceToken]
                });else if (it.sep) it.sep.push(this.sourceToken);else Object.assign(it, {
                  key: null,
                  sep: [this.sourceToken]
                });
                return _context36.abrupt("return");
              case 15:
                if (!it || it.value) fc.items.push({
                  start: [this.sourceToken]
                });else if (it.sep) it.sep.push(this.sourceToken);else it.start.push(this.sourceToken);
                return _context36.abrupt("return");
              case 17:
                fs2 = this.flowScalar(this.type);
                if (!it || it.value) fc.items.push({
                  start: [],
                  key: fs2,
                  sep: []
                });else if (it.sep) this.stack.push(fs2);else Object.assign(it, {
                  key: fs2,
                  sep: []
                });
                return _context36.abrupt("return");
              case 20:
                fc.end.push(this.sourceToken);
                return _context36.abrupt("return");
              case 22:
                bv = this.startBlockValue(fc);
                if (!bv) {
                  _context36.next = 27;
                  break;
                }
                this.stack.push(bv);
                _context36.next = 29;
                break;
              case 27:
                return _context36.delegateYield(this.pop(), "t2", 28);
              case 28:
                return _context36.delegateYield(this.step(), "t3", 29);
              case 29:
                _context36.next = 49;
                break;
              case 31:
                parent = this.peek(2);
                if (!(parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep))) {
                  _context36.next = 37;
                  break;
                }
                return _context36.delegateYield(this.pop(), "t4", 34);
              case 34:
                return _context36.delegateYield(this.step(), "t5", 35);
              case 35:
                _context36.next = 49;
                break;
              case 37:
                if (!(this.type === "map-value-ind" && parent.type !== "flow-collection")) {
                  _context36.next = 48;
                  break;
                }
                prev = getPrevProps(parent);
                start = getFirstKeyStartProps(prev);
                fixFlowSeqItems(fc);
                sep = fc.end.splice(1, fc.end.length);
                sep.push(this.sourceToken);
                map = {
                  type: "block-map",
                  offset: fc.offset,
                  indent: fc.indent,
                  items: [{
                    start: start,
                    key: fc,
                    sep: sep
                  }]
                };
                this.onKeyLine = true;
                this.stack[this.stack.length - 1] = map;
                _context36.next = 49;
                break;
              case 48:
                return _context36.delegateYield(this.lineEnd(fc), "t6", 49);
              case 49:
              case "end":
                return _context36.stop();
            }
          }, flowCollection, this);
        })
      }, {
        key: "flowScalar",
        value: function flowScalar(type) {
          if (this.onNewLine) {
            var nl = this.source.indexOf("\n") + 1;
            while (nl !== 0) {
              this.onNewLine(this.offset + nl);
              nl = this.source.indexOf("\n", nl) + 1;
            }
          }
          return {
            type: type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
          };
        }
      }, {
        key: "startBlockValue",
        value: function startBlockValue(parent) {
          switch (this.type) {
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar":
              return this.flowScalar(this.type);
            case "block-scalar-header":
              return {
                type: "block-scalar",
                offset: this.offset,
                indent: this.indent,
                props: [this.sourceToken],
                source: ""
              };
            case "flow-map-start":
            case "flow-seq-start":
              return {
                type: "flow-collection",
                offset: this.offset,
                indent: this.indent,
                start: this.sourceToken,
                items: [],
                end: []
              };
            case "seq-item-ind":
              return {
                type: "block-seq",
                offset: this.offset,
                indent: this.indent,
                items: [{
                  start: [this.sourceToken]
                }]
              };
            case "explicit-key-ind":
              {
                this.onKeyLine = true;
                var prev = getPrevProps(parent);
                var start = getFirstKeyStartProps(prev);
                start.push(this.sourceToken);
                return {
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{
                    start: start
                  }]
                };
              }
            case "map-value-ind":
              {
                this.onKeyLine = true;
                var _prev = getPrevProps(parent);
                var _start3 = getFirstKeyStartProps(_prev);
                return {
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{
                    start: _start3,
                    key: null,
                    sep: [this.sourceToken]
                  }]
                };
              }
          }
          return null;
        }
      }, {
        key: "atIndentedComment",
        value: function atIndentedComment(start, indent) {
          if (this.type !== "comment") return false;
          if (this.indent <= indent) return false;
          return start.every(function (st) {
            return st.type === "newline" || st.type === "space";
          });
        }
      }, {
        key: "documentEnd",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function documentEnd(docEnd) {
          return _regeneratorRuntime().wrap(function documentEnd$(_context37) {
            while (1) switch (_context37.prev = _context37.next) {
              case 0:
                if (!(this.type !== "doc-mode")) {
                  _context37.next = 4;
                  break;
                }
                if (docEnd.end) docEnd.end.push(this.sourceToken);else docEnd.end = [this.sourceToken];
                if (!(this.type === "newline")) {
                  _context37.next = 4;
                  break;
                }
                return _context37.delegateYield(this.pop(), "t0", 4);
              case 4:
              case "end":
                return _context37.stop();
            }
          }, documentEnd, this);
        })
      }, {
        key: "lineEnd",
        value: /*#__PURE__*/_regeneratorRuntime().mark(function lineEnd(token) {
          return _regeneratorRuntime().wrap(function lineEnd$(_context38) {
            while (1) switch (_context38.prev = _context38.next) {
              case 0:
                _context38.t0 = this.type;
                _context38.next = _context38.t0 === "comma" ? 3 : _context38.t0 === "doc-start" ? 3 : _context38.t0 === "doc-end" ? 3 : _context38.t0 === "flow-seq-end" ? 3 : _context38.t0 === "flow-map-end" ? 3 : _context38.t0 === "map-value-ind" ? 3 : _context38.t0 === "newline" ? 6 : _context38.t0 === "space" ? 7 : _context38.t0 === "comment" ? 7 : 7;
                break;
              case 3:
                return _context38.delegateYield(this.pop(), "t1", 4);
              case 4:
                return _context38.delegateYield(this.step(), "t2", 5);
              case 5:
                return _context38.abrupt("break", 10);
              case 6:
                this.onKeyLine = false;
              case 7:
                if (token.end) token.end.push(this.sourceToken);else token.end = [this.sourceToken];
                if (!(this.type === "newline")) {
                  _context38.next = 10;
                  break;
                }
                return _context38.delegateYield(this.pop(), "t3", 10);
              case 10:
              case "end":
                return _context38.stop();
            }
          }, lineEnd, this);
        })
      }]);
      return Parser;
    }();
    exports.Parser = Parser;
  }
});

// node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/yaml/dist/public-api.js": function node_modulesYamlDistPublicApiJs(exports) {
    "use strict";

    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      var prettyErrors = options.prettyErrors !== false;
      var lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return {
        lineCounter: lineCounter$1,
        prettyErrors: prettyErrors
      };
    }
    function parseAllDocuments(source) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _parseOptions = parseOptions(options),
        lineCounter2 = _parseOptions.lineCounter,
        prettyErrors = _parseOptions.prettyErrors;
      var parser$1 = new parser.Parser(lineCounter2 === null || lineCounter2 === void 0 ? void 0 : lineCounter2.addNewLine);
      var composer$1 = new composer.Composer(options);
      var docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2) {
        var _iterator58 = _createForOfIteratorHelper(docs),
          _step58;
        try {
          for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
            var doc = _step58.value;
            doc.errors.forEach(errors.prettifyError(source, lineCounter2));
            doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
          }
        } catch (err) {
          _iterator58.e(err);
        } finally {
          _iterator58.f();
        }
      }
      if (docs.length > 0) return docs;
      return Object.assign([], {
        empty: true
      }, composer$1.streamInfo());
    }
    function parseDocument(source) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _parseOptions2 = parseOptions(options),
        lineCounter2 = _parseOptions2.lineCounter,
        prettyErrors = _parseOptions2.prettyErrors;
      var parser$1 = new parser.Parser(lineCounter2 === null || lineCounter2 === void 0 ? void 0 : lineCounter2.addNewLine);
      var composer$1 = new composer.Composer(options);
      var doc = null;
      var _iterator59 = _createForOfIteratorHelper(composer$1.compose(parser$1.parse(source), true, source.length)),
        _step59;
      try {
        for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
          var _doc = _step59.value;
          if (!doc) doc = _doc;else if (doc.options.logLevel !== "silent") {
            doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
            break;
          }
        }
      } catch (err) {
        _iterator59.e(err);
      } finally {
        _iterator59.f();
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse2(src, reviver, options) {
      var _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && _typeof(reviver) === "object") {
        options = reviver;
      }
      var doc = parseDocument(src, options);
      if (!doc) return null;
      doc.warnings.forEach(function (warning) {
        return log.warn(doc.options.logLevel, warning);
      });
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent") throw doc.errors[0];else doc.errors = [];
      }
      return doc.toJS(Object.assign({
        reviver: _reviver
      }, options));
    }
    function stringify(value, replacer, options) {
      var _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string") options = options.length;
      if (typeof options === "number") {
        var indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? {
          indent: 8
        } : {
          indent: indent
        };
      }
      if (value === void 0) {
        var _ref42, _options3;
        var _ref41 = (_ref42 = (_options3 = options) !== null && _options3 !== void 0 ? _options3 : replacer) !== null && _ref42 !== void 0 ? _ref42 : {},
          keepUndefined = _ref41.keepUndefined;
        if (!keepUndefined) return void 0;
      }
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse2;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/index.js
var require_dist8 = __commonJS({
  "node_modules/yaml/dist/index.js": function node_modulesYamlDistIndexJs(exports) {
    "use strict";

    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity.isAlias;
    exports.isCollection = identity.isCollection;
    exports.isDocument = identity.isDocument;
    exports.isMap = identity.isMap;
    exports.isNode = identity.isNode;
    exports.isPair = identity.isPair;
    exports.isScalar = identity.isScalar;
    exports.isSeq = identity.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});

// src/argparser.ts
var import_ts_command_line_args = __toESM(require_dist7(), 1);
var ArgParser = /*#__PURE__*/_createClass(function ArgParser() {
  _classCallCheck(this, ArgParser);
  console.debug("argv", process.argv);
  this.args = (0, import_ts_command_line_args.parse)({
    "absolute-input-openapi-def-path": {
      type: String,
      alias: "i",
      description: "Input OpenAPI def YAML path with $includes keyword."
    },
    "absolute-output-openapi-def-path": {
      type: String,
      alias: "o",
      description: "Output OpenAPI def YAML path with $included YAML from other files."
    },
    help: {
      type: Boolean,
      optional: true,
      alias: "h",
      description: "Prints this usage guide"
    }
  }, {
    helpArg: "help",
    headerContentSections: [{
      header: "Usage",
      content: "npx openapi-includer-cli --absolute-input-openapi-def-path=./src/test/api.yaml --absolute-output-openapi-def-path=/path/to/_api.yaml"
    }]
  });
  console.debug("args", this.args);
});
var argparser = new ArgParser();

// src/OpenAPIYAMLFileGenerator.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_yaml = __toESM(require_dist8(), 1);

// node_modules/flat/index.js
function isBuffer(obj) {
  return obj && obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function keyIdentity(key) {
  return key;
}
function flatten(target, opts) {
  opts = opts || {};
  var delimiter = opts.delimiter || ".";
  var maxDepth = opts.maxDepth;
  var transformKey = opts.transformKey || keyIdentity;
  var output = {};
  function step(object, prev, currentDepth) {
    currentDepth = currentDepth || 1;
    Object.keys(object).forEach(function (key) {
      var value = object[key];
      var isarray = opts.safe && Array.isArray(value);
      var type = Object.prototype.toString.call(value);
      var isbuffer = isBuffer(value);
      var isobject = type === "[object Object]" || type === "[object Array]";
      var newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);
      if (!isarray && !isbuffer && isobject && Object.keys(value).length && (!opts.maxDepth || currentDepth < maxDepth)) {
        return step(value, newKey, currentDepth + 1);
      }
      output[newKey] = value;
    });
  }
  step(target);
  return output;
}
function unflatten(target, opts) {
  opts = opts || {};
  var delimiter = opts.delimiter || ".";
  var overwrite = opts.overwrite || false;
  var transformKey = opts.transformKey || keyIdentity;
  var result = {};
  var isbuffer = isBuffer(target);
  if (isbuffer || Object.prototype.toString.call(target) !== "[object Object]") {
    return target;
  }
  function getkey(key) {
    var parsedKey = Number(key);
    return isNaN(parsedKey) || key.indexOf(".") !== -1 || opts.object ? key : parsedKey;
  }
  function addKeys(keyPrefix, recipient, target2) {
    return Object.keys(target2).reduce(function (result2, key) {
      result2[keyPrefix + delimiter + key] = target2[key];
      return result2;
    }, recipient);
  }
  function isEmpty(val) {
    var type = Object.prototype.toString.call(val);
    var isArray = type === "[object Array]";
    var isObject2 = type === "[object Object]";
    if (!val) {
      return true;
    } else if (isArray) {
      return !val.length;
    } else if (isObject2) {
      return !Object.keys(val).length;
    }
  }
  target = Object.keys(target).reduce(function (result2, key) {
    var type = Object.prototype.toString.call(target[key]);
    var isObject2 = type === "[object Object]" || type === "[object Array]";
    if (!isObject2 || isEmpty(target[key])) {
      result2[key] = target[key];
      return result2;
    } else {
      return addKeys(key, result2, flatten(target[key], opts));
    }
  }, {});
  Object.keys(target).forEach(function (key) {
    var split = key.split(delimiter).map(transformKey);
    var key1 = getkey(split.shift());
    var key2 = getkey(split[0]);
    var recipient = result;
    var keyPath = key1;
    while (key2 !== void 0) {
      if (key1 === "__proto__") {
        return;
      }
      keyPath = "".concat(keyPath, ".").concat(key2);
      var type = Object.prototype.toString.call(recipient[key1]);
      var isobject = type === "[object Object]" || type === "[object Array]";
      if (!overwrite && !isobject && typeof recipient[key1] !== "undefined") {
        return;
      }
      if (overwrite && !isobject || !overwrite && recipient[key1] == null) {
        if (typeof key2 === "number" && !opts.object) {
          if (key2 > 0) {
            var isArray = true;
            for (var i = 0; i < key2; i++) {
              var aKey = keyPath.replace(key2.toString(), i.toString());
              if (!target[aKey]) {
                isArray = false;
                break;
              }
            }
            isArray ? recipient[key1] = [] : recipient[key1] = {};
          } else {
            recipient[key1] = [];
          }
        } else {
          recipient[key1] = {};
        }
      }
      recipient = recipient[key1];
      if (split.length > 0) {
        key1 = getkey(split.shift());
        key2 = getkey(split[0]);
      }
    }
    recipient[key1] = unflatten(target[key], opts);
  });
  return result;
}

// node_modules/ts-deepmerge/esm/index.js
var isObject = function isObject(obj) {
  if (_typeof(obj) === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      var prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  return false;
};
var merge = function merge() {
  for (var _len7 = arguments.length, objects = new Array(_len7), _key9 = 0; _key9 < _len7; _key9++) {
    objects[_key9] = arguments[_key9];
  }
  return objects.reduce(function (result, current) {
    if (Array.isArray(current)) {
      throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
    }
    Object.keys(current).forEach(function (key) {
      if (["__proto__", "constructor", "prototype"].includes(key)) {
        return;
      }
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = merge.options.mergeArrays ? merge.options.uniqueArrayItems ? Array.from(new Set(result[key].concat(current[key]))) : [].concat(_toConsumableArray(result[key]), _toConsumableArray(current[key])) : current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key] === void 0 ? merge.options.allowUndefinedOverrides ? current[key] : result[key] : current[key];
      }
    });
    return result;
  }, {});
};
var defaultOptions = {
  allowUndefinedOverrides: true,
  mergeArrays: true,
  uniqueArrayItems: true
};
merge.options = defaultOptions;
merge.withOptions = function (options) {
  merge.options = Object.assign(Object.assign({}, defaultOptions), options);
  for (var _len8 = arguments.length, objects = new Array(_len8 > 1 ? _len8 - 1 : 0), _key10 = 1; _key10 < _len8; _key10++) {
    objects[_key10 - 1] = arguments[_key10];
  }
  var result = merge.apply(void 0, objects);
  merge.options = defaultOptions;
  return result;
};
var esm_default = merge;

// src/OpenAPIYAMLFileGenerator.ts
var OpenAPIYAMLFileGenerator = /*#__PURE__*/function () {
  function OpenAPIYAMLFileGenerator(absoluteInputPath, absoluteOutputPath) {
    var _this27 = this;
    _classCallCheck(this, OpenAPIYAMLFileGenerator);
    console.debug(absoluteInputPath, absoluteOutputPath);
    if (!import_path["default"].isAbsolute(absoluteInputPath)) {
      throw Error("".concat(absoluteInputPath, " is not absolute."));
    }
    if (!import_path["default"].isAbsolute(absoluteOutputPath)) {
      throw Error("".concat(absoluteOutputPath, " is not absolute."));
    }
    this.basePath = import_path["default"].dirname(absoluteInputPath);
    console.debug("basePath", this.basePath);
    var inputFile = import_fs["default"].readFileSync(absoluteInputPath, "utf8");
    var inputYAML = import_yaml["default"].parse(inputFile);
    var flattenedYAML = flatten(inputYAML);
    console.debug("flattenedYAML", JSON.stringify(flattenedYAML, null, 2));
    var modifiedFlattenedYAML = JSON.parse(JSON.stringify(flattenedYAML));
    Object.keys(modifiedFlattenedYAML).forEach(function (key) {
      if (key.includes("$includes")) {
        var returnedYAML = _this27._tryResolveInclude(modifiedFlattenedYAML[key], {
          parentFile: absoluteInputPath,
          key: key
        });
        var newKey = key.split(".$includes")[0];
        delete modifiedFlattenedYAML[key];
        if (modifiedFlattenedYAML[newKey]) {
          modifiedFlattenedYAML[newKey] = esm_default(modifiedFlattenedYAML[newKey], returnedYAML);
        } else {
          modifiedFlattenedYAML[newKey] = returnedYAML;
        }
        console.debug("Deleting ".concat(key, " and upserting yaml to ").concat(newKey), JSON.stringify(returnedYAML, null, 2));
      }
    });
    import_fs["default"].writeFileSync(absoluteOutputPath, import_yaml["default"].stringify(unflatten(modifiedFlattenedYAML)));
  }
  _createClass(OpenAPIYAMLFileGenerator, [{
    key: "_tryResolveInclude",
    value: function _tryResolveInclude($include, args) {
      var _this28 = this;
      console.debug("_tryResolveInclude", $include, "parentFile", args === null || args === void 0 ? void 0 : args.parentFile, "key", args === null || args === void 0 ? void 0 : args.key);
      var includePath = import_path["default"].basename($include);
      if (!import_path["default"].isAbsolute($include)) {
        if ($include.startsWith("./")) {
          includePath = $include.replace("./", "");
        } else if ($include.startsWith(".")) {
          includePath = $include.replace(".", "");
        }
      }
      var absolutePathToInclude = "".concat(this.basePath, "/").concat(includePath);
      var inputFile = import_fs["default"].readFileSync(absolutePathToInclude, "utf8");
      var inputYAML = import_yaml["default"].parse(inputFile);
      var flattenedYAML = flatten(inputYAML);
      console.debug("flattenedYAML", JSON.stringify(flattenedYAML, null, 2));
      var modifiedFlattenedYAML = JSON.parse(JSON.stringify(flattenedYAML));
      Object.keys(flattenedYAML).forEach(function (key) {
        if (key.includes("$includes")) {
          var returnedYAML = _this28._tryResolveInclude(flattenedYAML[key], {
            parentFile: absolutePathToInclude,
            key: key
          });
          var newKey = key.split(".$includes")[0];
          delete modifiedFlattenedYAML[key];
          if (modifiedFlattenedYAML[newKey]) {
            modifiedFlattenedYAML[newKey] = esm_default(modifiedFlattenedYAML[newKey], returnedYAML);
          } else {
            modifiedFlattenedYAML[newKey] = returnedYAML;
          }
          console.debug("Deleting ".concat(key, " and upserting yaml to ").concat(newKey), JSON.stringify(returnedYAML, null, 2));
        }
      });
      return unflatten(modifiedFlattenedYAML);
    }
  }]);
  return OpenAPIYAMLFileGenerator;
}();

// src/index.ts
new OpenAPIYAMLFileGenerator(argparser.args["absolute-input-openapi-def-path"], argparser.args["absolute-output-openapi-def-path"]);