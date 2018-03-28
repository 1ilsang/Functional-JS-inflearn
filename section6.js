var _ = require('partial-js');
//지연 평가를 시작 시키고 유지 시키는(이어 가는) 함수
    //1. map
var i = 0;
_.go(
    _.range(100),
    _.map(function (val) {
        ++i
        return val * val;
    }),
    _.filter(function (val) {
        ++i;
        return val % 2;
    }),
    _.take(5),
    console.log
);
console.log(i);

var i = 0;-
_.go(
    _.range(100),
    L.map(function (val) {
        ++i
        return val * val;
    }),
    L.filter(function (val) {
        ++i;
        return val % 2;
    }),
    L.take(5),
    console.log
);
console.log(i);
    //2. filter, reject

//끝을 내는 함수
    //1. take
    //2. some, every, find
console.clear();
var i = 0;
_.go(
    _.range(100),
    L.map(function (val) {
        ++i
        return val * val;
    }),
    L.filter(function (val) {
        ++i;
        return val % 2;
    }),
    L.some(function (val) {
        return val > 100;
    }),
    console.log
);

