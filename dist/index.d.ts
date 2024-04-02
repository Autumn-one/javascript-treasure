/**
 * 防抖函数
 * @param func 要被防抖的函数
 * @param wait 防抖等待时间
 * @param type 防抖方式，有三种 t-d 第一个时间节点节流，后续防抖 i-d 第一次立即执行，后续防抖 d 普通防抖
 * @param cancel_callback 下一次执行的时候可能需要清理的callback，例如取消请求操作
 * */
declare function debounce(func: Function, wait: number, type?: "t-d" | "i-d" | "d", cancel_callback?: Function): Function;
/**
 * 节流函数
 * @param func 要被节流的函数
 * @param wait 节流时间
 * */
declare function throttle(func: Function, wait: number | {
    time: number;
}): Function;

export { debounce, throttle };
