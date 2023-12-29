declare function debounce(func: Function, wait: number, type?: "t-d" | "i-d" | "d", cancel_callback?: Function): Function;
declare function throttle(func: Function, wait: number | {
    time: number;
}): Function;
export { debounce, throttle };
