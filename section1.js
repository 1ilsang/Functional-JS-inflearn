function add(a, b) {
    return a + b;
}

console.log(add(1,2));
console.log(add(1,2));
console.log(add(1,2));

var c = 10;
function add2(a, b) {
    return a + b + c;
}

console.log(add(1,2));  //13
console.log(add(1,2));  //13
console.log(add(1,2));  //13
c = 20;
console.log(add(1,2));  //23
console.log(add(1,2));  //23
console.log(add(1,2));  //23

var c = 20;
function add3(a, b) {
    c = b;
    return a + b;
}

var obj1 = {val:10};
function add4(obj, b) {
    obj.val += b;
}
console.log(obj1.val);
add(obj1,1);
console.log(obj1.val);

//순수 함수
var obj1 = { val: 10 };
function add5(obj, b) {
    return { val: obj.val + b }
}
console.log(obj1.val); //10
var obj2 = add5(obj1, 20);
console.log(obj1.val); //10
console.log(obj2.val); //30

//============================================================
// 일급 함수
var f1 = function(a) {
    return a * a;
}
console.log(f1(2));;

var f2 = f1;
console.log(f2);

function f3(f) {
    return f();
}
console.log(
    f3(function() {
    return 10;
}));
console.clear();
//===================================================
// add_maker
function add_maker(a) {
    return function(b) { //클로저
        return a + b;
    }
}

var add10 = add_maker(10);
var add5 = add_maker(5);

console.log(add10(20));
console.log(add_maker(10)(20));
console.log(add5(15));

//===================================================
function f4(f1, f2, f3) {
    return f3(f1() + f2());
}

f4(
    function() {    return 2;    },
    function() {    return 1;    },
    function(a) {   return a * a;    }
);