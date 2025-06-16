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
 * 防抖函数
 * @param func 要被防抖的函数
 * @param wait 防抖等待时间
 * @param type 防抖方式，有三种 t-d 第一个时间节点节流，后续防抖 i-d 第一次立即执行，后续防抖 d 普通防抖
 * @param cancel_callback 下一次执行的时候可能需要清理的callback，例如取消请求操作
 * */
function debounce( func: Function, wait: number, type: "t-d" | "i-d" | "d" = "d", cancel_callback?: Function ): Function
{
    let timer_id: ReturnType<typeof setTimeout>; // 定义定时器id
    let last_call_time = 0; // 最后一次调用的时间记录
    let last_call_type: "immediate" | "timeout" = "timeout"; // 最后一次函数以什么方式触发
    let immediate = true; // 在 type=i-d的时候用于表示是否要第一次立即执行
    let immediate_timer: ReturnType<typeof setTimeout>; // 是否立即执行的timer

    // type = i-d
    const immediate_debounce = function ( this: any, ...args: any[] )
    {
        if ( immediate )
        {
            immediate = false; // 执行完成之后立即置为false
            immediate_timer = setTimeout( () => ( immediate = true ), wait );
            cancel_callback && cancel_callback();
            func.apply( this, args );
            return;
        }

        timer_id && clearTimeout( timer_id );
        immediate_timer && clearTimeout( immediate_timer );
        cancel_callback && cancel_callback();
        timer_id = setTimeout( () =>
        {
            immediate_timer = setTimeout( () => ( immediate = true ), wait );
            func.apply( this, args );
        }, wait );
    };


    // type = t-d
    const throttle_debounce = function ( this: any, ...args: any[] )
    {
        const now = +new Date();
        timer_id && clearTimeout( timer_id );
        const time_diff = now - last_call_time; // 计算时间差
        if ( last_call_type !== "immediate" && ( time_diff >= wait || last_call_time == 0 ) )
        {
            last_call_time = now;
            last_call_type = "immediate";
            cancel_callback && cancel_callback();
            func.apply( this, args );
            return;
        }

        if ( last_call_type === "immediate" && time_diff >= wait )
        {
            cancel_callback && cancel_callback();
            timer_id = setTimeout( () =>
            {
                last_call_time = now;
                last_call_type = "timeout";
                func.apply( this, args );
            }, wait );
        }
    };

    // type = d
    const d_debounce = function ( this: any, ...args: any[] )
    {
        timer_id && clearTimeout( timer_id );
        cancel_callback && cancel_callback();
        timer_id = setTimeout( () =>
        {
            func.apply( this, args );
        }, wait );
    };
    return type === "i-d" ? immediate_debounce : type === "t-d" ? throttle_debounce : d_debounce;
}

function is_object(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * 节流函数
 * @param func 要被节流的函数
 * @param wait 节流时间
 * */
function throttle( func: Function, wait: number | { time: number } ): Function
{
    let last_call_time = 0;
    return function ( this: any, ...args: any[] )
    {
        const now = +new Date();
        let delay_time: number;
        if ( typeof wait === "number" )
        {
            delay_time = wait;
        }
        else
        {
            delay_time = wait.time;
            args.push( wait );
        }
        if ( now - last_call_time >= delay_time || last_call_time === 0 )
        {
            func.apply( this, args );
            last_call_time = now;
        }
    };
}


// 重试函数 todo 该函数缺少重试中断逻辑
async function retry( fn: ( ...args: any[] ) => Promise<any>, options?: { times: number, on_failed: ( err, count ) => any } )
{
    let count = 0;
    const times = options?.times ?? 1;
    const on_failed = options?.on_failed;
    while ( count < times )
    {
        try
        {
            var ret = await fn();
        }
        catch ( e )
        {
            count++;
            on_failed?.(e,count);
            continue;

        }
        break;
    }

    return ret;
}


function deep_equal( object1, object2 )
{
    if ( object1 === null || object2 === null )
    {
        return object1 === object2;
    }
    const keys1 = Object.keys( object1 );
    const keys2 = Object.keys( object2 );


    const keys = Array.from( new Set( [ ...keys1, ...keys2 ] ) );

    for ( const key of keys )
    {
        const val1 = object1[key];
        const val2 = object2[key];
        const are_objects = is_object( val1 ) && is_object( val2 );
        if ( [ '', undefined ].includes( val1 ) && [ '', undefined ].includes( val2 ) )
        {
            continue;
        }
        if (
            are_objects && !deep_equal( val1, val2 )
            || !are_objects && val1 !== val2
        )
        {
            return false;
        }
    }

    return true;
}

function pascal_to_kebab( str: string ): string
{
    return str
        .replace( /([A-Z])/g, '-$1' )
        .toLowerCase()
        .replace( /^-/, '' );
}

export {
    throttle,
    debounce,
    idle,
    async_idle,
    retry,
    deep_equal,
    is_object,
    pascal_to_kebab
}
