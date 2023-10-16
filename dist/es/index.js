function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = true; }
    var timer_id;
    var last_call_time = 0;
    var last_call_type = "timeout";
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = +new Date();
        timer_id && clearTimeout(timer_id);
        var time_diff = now - last_call_time;
        if (immediate && last_call_type !== "immediate" && (time_diff >= wait || last_call_time == 0)) {
            last_call_time = now;
            last_call_type = "immediate";
            func.apply(this, args);
            return;
        }
        if (immediate) {
            if (last_call_type === "immediate" && time_diff >= wait) {
                timer_id = setTimeout(function () {
                    last_call_time = now;
                    last_call_type = "timeout";
                    func.apply(_this, args);
                }, wait);
            }
        }
        else {
            timer_id = setTimeout(function () {
                last_call_time = now;
                last_call_type = "timeout";
                func.apply(_this, args);
            }, wait);
        }
    };
}
function throttle(func, wait, immediate) {
}
export { debounce, throttle };
