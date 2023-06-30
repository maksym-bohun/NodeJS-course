// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calculator1 = new C();
console.log(calculator1.add(2, 10));

// exports
// const calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 13));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
