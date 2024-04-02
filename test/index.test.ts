import { expect, test, vi } from "vitest"
import { promise_timeout } from "../src/promise_tools";


test( "promise_timeout-最小等待时间1000", async function ()
{
    const start = +new Date();
    const ret = await promise_timeout(
        new Promise( ( resolve, reject ) =>
        {
            setTimeout( () => resolve( 66 ), 100 )
        } ),
        1000
    )
    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha > 1000 && cha < 1200 )
    expect( ret ).toBe( 66 )
} );

test( "promise_timeout-最大等待时间1000", async function ()
{
    const start = +new Date();
    let ret;
    try
    {
        ret = await promise_timeout(
            new Promise( ( resolve, reject ) =>
            {
                setTimeout( () => resolve( 66 ), 1200 )
            } ),
            null,
            1000
        )
    }
    catch ( e )
    {
        ret = e;
    }

    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha > 1000 && cha < 1200 )
    expect( ret.type ).toBe( "timeout" )
} )






