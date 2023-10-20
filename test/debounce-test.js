const {debounce} = require("../dist/cjs")

const test_fn = debounce((i) => {
	console.log("执行的内容")
    console.log(i)
}, 1000, "i-d")


// test_fn(1)
// test_fn(2)
// test_fn(3)

// for(let i=0;i<5;i++){
//     setTimeout(()=> {
//         test_fn(i);
//     },i*500)
// }
