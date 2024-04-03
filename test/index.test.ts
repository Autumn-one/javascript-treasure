import { expect, test, vi } from "vitest"
import { promise_timeout } from "../src/promise_tools";


test( "promise_timeout-最小等待时间300", async function ()
{
    const start = +new Date();
    const ret = await promise_timeout(
        new Promise( ( resolve, reject ) =>
        {
            setTimeout( () => resolve( 66 ), 100 )
        } ),
        300
    )
    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha >= 300 && cha < 400 )
    expect( ret ).toBe( 66 )
} );

test( "promise_timeout-最大等待时间300", async function ()
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
            300
        )
    }
    catch ( e )
    {
        ret = e;
    }

    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha > 300 && cha < 400 )
    expect( ret.type ).toBe( "timeout" )
} )


test( "promise_timeout-最小等待200最大超时300小于200", async function ()
{
    const start = +new Date();
    let ret = await promise_timeout(
        new Promise( ( resolve, reject ) =>
        {
            setTimeout( () => resolve( 66 ), 100 )
        } ),
        200,
        300
    )
    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha >= 200 && cha < 300 )
    expect( ret ).toBe( 66 )
} )

test( "promise_timeout-最小等待200最大超时300大于300", async function ()
{
    const start = +new Date();
    let ret;
    try
    {
        ret = await promise_timeout(
            new Promise( ( resolve, reject ) =>
            {
                setTimeout( () => resolve( 66 ), 360 )
            } ),
            200,
            300
        )
    }
    catch ( e )
    {
        ret = e;
    }

    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha >= 300 && cha < 400 )
    expect( ret.type ).toBe( "timeout" )
} )


test( "promise_timeout-错误优先", async function ()
{
    const start = +new Date();
    let ret;
    try
    {
        ret = await promise_timeout(
            new Promise( ( resolve, reject ) =>
            {
                setTimeout( () => reject( 66 ), 100 )
            } ),
            200,
            300,
            true
        )
    }
    catch ( e )
    {
        ret = e;
    }

    const end = +new Date();
    const cha = end - start;
    expect( true ).toBe( cha >= 100 && cha < 200 )
    expect( ret ).toBe( 66 )
} )





