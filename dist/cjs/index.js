"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = void 0;
function debounce(func, wait, type, cancel_callback) {
    if (type === void 0) { type = "d"; }
    var timer_id;
    var last_call_time = 0;
    var last_call_type = "timeout";
    var immediate = true;
    var immediate_timer;
    var immediate_debounce = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (immediate) {
            immediate = false;
            immediate_timer = setTimeout(function () { return (immediate = true); }, wait);
            cancel_callback && cancel_callback();
            func.apply(this, args);
            return;
        }
        timer_id && clearTimeout(timer_id);
        immediate_timer && clearTimeout(immediate_timer);
        cancel_callback && cancel_callback();
        timer_id = setTimeout(function () {
            immediate_timer = setTimeout(function () { return (immediate = true); }, wait);
            func.apply(_this, args);
        }, wait);
    };
    var throttle_debounce = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = +new Date();
        timer_id && clearTimeout(timer_id);
        var time_diff = now - last_call_time;
        if (last_call_type !== "immediate" && (time_diff >= wait || last_call_time == 0)) {
            last_call_time = now;
            last_call_type = "immediate";
            cancel_callback && cancel_callback();
            func.apply(this, args);
            return;
        }
        if (last_call_type === "immediate" && time_diff >= wait) {
            cancel_callback && cancel_callback();
            timer_id = setTimeout(function () {
                last_call_time = now;
                last_call_type = "timeout";
                func.apply(_this, args);
            }, wait);
        }
    };
    var d_debounce = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timer_id && clearTimeout(timer_id);
        cancel_callback && cancel_callback();
        timer_id = setTimeout(function () {
            func.apply(_this, args);
        }, wait);
    };
    return type === "i-d" ? immediate_debounce : type === "t-d" ? throttle_debounce : d_debounce;
}
exports.debounce = debounce;
function throttle(func, wait, immediate) {
}
exports.throttle = throttle;
