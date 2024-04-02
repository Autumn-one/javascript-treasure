// 闲时函数
function idle( callback: Function, delay = 1000 )
{
    if ( typeof requestIdleCallback !== "undefined" )
    {
        return requestIdleCallback( <IdleRequestCallback>callback );
    }
    else
    {
        return setTimeout( callback, delay );
    }
}

// 异步闲时函数
function async_idle( delay = 1000 )
{
    return new Promise( resolve =>
    {
        idle( resolve, delay );
    } );
}

/**
 * 管理promise队列，让promise按照队列顺序来请求, 每个promise都会有一个默认的timeout
 * @fnName promise_queue
 * @param pss
 * @param timeout
 */
async function promise_queue( pss: Promise<any>[], timeout = 5000 )
{
    for ( let i = 0; i < pss.length; i++ )
    {
        try
        {
            var ret = await promise_timeout( pss[i], null, timeout )
        }
        catch ( e )
        {
            continue;
        }
        return ret;
    }
    return Promise.reject( "错误的 promise queue 调用" )
}

/**
 * 给promise添加最低时长与最大超时时间
 * @fnName promise_timeout
 * @param ps 要操作的promise
 * @param min_time 最小时间如果不设置就设置为null
 * @param max_time 最大的超时时间如果不设置就设置为null
 * @param error_first 是否错误优先，如果错误优先那么出现错误会忽略最小时间
 */
function promise_timeout( ps: Promise<any>, min_time: number | null = null, max_time: number | null = null, error_first: boolean = false )
{

    let ps_ret: Promise<any> = ps;
    let execute_type: "all" | "allSettled"; // 记录执行的类型
    if ( typeof min_time === "number" )
    {
        if ( error_first )
        {
            ps_ret = Promise.all( [ ps, new Promise( resolve => setTimeout( resolve, min_time ) ) ] );
            execute_type = "all";
        }
        else
        {
            ps_ret = Promise.allSettled( [ ps, new Promise( ( _, reject ) => setTimeout( reject, min_time ) ) ] );
            execute_type = "allSettled";
        }
    }
    if ( typeof max_time === "number" )
    {
        ps_ret = Promise.race( [ ps_ret, new Promise( ( _, reject ) => setTimeout( () => reject( {type: "timeout", msg: "timeout error"} ), max_time ) ) ] )
    }

    return ps_ret.then( res =>
    {
        // todo 待实现的内容
        if ( execute_type === "all" && Array.isArray( res ) )
        {
            return res[0]
        }
        else if ( execute_type === "allSettled" && Array.isArray( res ) )
        {
            return res.find( item => item.status === "fulfilled" )?.value
        }
        return res;
    } );

}


export {
    promise_timeout,
    promise_queue,
    idle,
    async_idle
}
