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

// 管理promise队列，让promise按照队列顺序来请求, 每个promise都会有一个默认的timeout
async function promise_queue( pss: Promise<any>[], timeout = 5000 )
{
    for ( let i = 0; i < pss.length; i++ )
    {
        try
        {
            var ret = await Promise.race( [
                pss[i],
                new Promise( function ( resolve, reject )
                {
                    setTimeout( () => reject( new Error( "promise queue timeout err" ) ), timeout )
                } )
            ] )
        }
        catch ( e )
        {
            continue;
        }
        return ret;
    }
    return Promise.reject( "错误的 promise queue 调用" )
}

// 设置promise的超时时间和最短时间
function promise_timeout( ps: Promise<any>, min_time: number | null, max_time: number | null )
{

    let ps_ret: Promise<any> = ps;
    if(typeof min_time === "number")
    {
        ps_ret = Promise.allSettled([ps, new Promise(resolve => setTimeout(resolve, min_time))]);
    }
    if(typeof max_time === "number")
    {
        ps_ret = Promise.race([ps_ret, new Promise((_, reject) => setTimeout(() => reject("timeout error"), max_time))])
    }

    return ps_ret.then(res => {
        // todo 待实现的内容
    });

}



export {}
