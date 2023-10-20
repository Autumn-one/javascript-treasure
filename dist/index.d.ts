declare function debounce(func: Function, wait: number, type?: "t-d" | "i-d" | "d", cancel_callback?: Function): Function;
declare function throttle(func: any, wait: any, immediate: any): void;
export { debounce, throttle };
