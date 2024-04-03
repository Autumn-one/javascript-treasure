/**
 * 管理promise队列，让promise按照队列顺序来请求, 每个promise都会有一个默认的timeout
 * @fnName promise_queue
 * @param pss
 * @param timeout
 */
declare function promise_queue(pss: Promise<any>[], timeout?: number): Promise<any>;
/**
 * 给promise添加最低时长与最大超时时间
 * @fnName promise_timeout
 * @param ps 要操作的promise
 * @param min_time 最小时间如果不设置就设置为null
 * @param max_time 最大的超时时间如果不设置就设置为null
 * @param error_first 是否错误优先，如果错误优先那么出现错误会忽略最小时间
 */
declare function promise_timeout(ps: Promise<any>, min_time?: number | null, max_time?: number | null, error_first?: boolean): Promise<any>;

declare function idle(callback: Function, delay?: number): number;
declare function async_idle(delay?: number): Promise<unknown>;
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
declare function retry(fn: (...args: any[]) => Promise<any>, options?: {
    times: number;
    on_failed: (err: any, count: any) => any;
}): Promise<any>;

export { async_idle, debounce, idle, promise_queue, promise_timeout, retry, throttle };
