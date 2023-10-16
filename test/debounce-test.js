const {debounce} = require("../dist/cjs")

const test_fn = debounce(() => {
	console.log("执行的内容")
}, 2000, true)

test_fn()
test_fn()
