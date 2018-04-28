const _ = require('lodash');

document.write(`${foo.toString()} currify this func : ${_.curry(foo).toString}`);



function foo(a,b,c) {
    return a + b + c;
};