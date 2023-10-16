/**
 * 防抖函数
 * @param func 要被防抖的函数
 * @param wait 防抖等待时间
 * @param immediate 是否立即执行
 * */
function debounce ( func: Function, wait: number, immediate: boolean = true ): Function
{
    let timer_id = null; // 定义定时器id
    let last_call_time = 0; // 最后一次调用的时间记录
    return function ( ...args: any[] )
    {
        const now = +new Date();
        timer_id && clearTimeout( timer_id );

        if ( immediate && ( now - last_call_time >= wait || last_call_time == 0 ) )
        {
            last_call_time = now;
            func.apply( this, args );
        }

        timer_id = setTimeout( () =>
        {
            last_call_time = now;
            func.apply( this, args );
        }, wait );
    };
}

/**
 * 节流函数
 * @param func 要被节流的函数
 * @param wait 节流时间
 * @param immediate 是否第一时间执行
 * */
function throttle ( func, wait, immediate )
{

}


export {
    debounce,
    throttle
};
