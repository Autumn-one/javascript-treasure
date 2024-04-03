import { promise_timeout } from "../src/promise_tools";

const ps = promise_timeout(
    new Promise( ( resolve, reject ) =>
    {
        setTimeout(() => {
            resolve(111)
        }, 100)
    } ),
    2000,
    1000,
    true
)


ps.then(res => {
    console.log("结束了, 值为：")
    console.log(res)
}, rej => {
    console.log("错误了")
    console.log(rej)
})
