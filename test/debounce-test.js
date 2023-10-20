const {debounce} = require("../dist/cjs")

const test_fn = debounce((i) => {
	console.log("执行的内容")
    console.log(i)
}, 1000, "d")


// test_fn(1)
// test_fn(2)
// test_fn(3)

// 3
