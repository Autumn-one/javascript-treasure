/**
 * 防抖函数
 * @param func 要被防抖的函数
 * @param wait 防抖等待时间
 * @param immediate 是否立即执行
 * */
function debounce ( func: Function, wait: number, immediate: boolean = true ): Function
{
    let timer_id: number; // 定义定时器id
    let last_call_time = 0; // 最后一次调用的时间记录
    let last_call_type: "immediate" | "timeout" = "timeout"; // 最后一次函数以什么方式触发
    return function ( this: any, ...args: any[] )
    {
        const now = +new Date();
        timer_id && clearTimeout( timer_id );

        const time_diff = now - last_call_time; // 计算时间差
        if ( immediate && last_call_type !== "immediate" && ( time_diff >= wait || last_call_time == 0 ) )
        {
            last_call_time = now;
            last_call_type = "immediate";
            func.apply( this, args );
            return;
        }

        if ( immediate )
        {
            if ( last_call_type === "immediate" && time_diff >= wait )
            {
                timer_id = setTimeout( () =>
                {
                    last_call_time = now;
                    last_call_type = "timeout";
                    func.apply( this, args );
                }, wait );
            }
        }
        else
        {
            timer_id = setTimeout( () =>
            {
                last_call_time = now;
                last_call_type = "timeout";
                func.apply( this, args );
            }, wait );
        }


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
