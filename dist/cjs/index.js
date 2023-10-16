"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = void 0;
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = true; }
    var timer_id = null;
    var last_call_time = 0;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = +new Date();
        timer_id && clearTimeout(timer_id);
        if (immediate && (now - last_call_time >= wait || last_call_time == 0)) {
            last_call_time = now;
            func.apply(this, args);
        }
        timer_id = setTimeout(function () {
            last_call_time = now;
            func.apply(_this, args);
        }, wait);
    };
}
exports.debounce = debounce;
function throttle(func, wait, immediate) {
}
exports.throttle = throttle;
