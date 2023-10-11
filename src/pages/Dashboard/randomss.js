let obj = { value: "Hot", func: (param) => {console.log(param)} }

obj.value
obj.func("test")

let obj1 = [
    {value: 1},
    {value: 2},
    {value: 3}
]

obj1 = [...obj1, { value: 2, string: "Test" }]
console.log(obj1)