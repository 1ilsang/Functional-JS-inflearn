var _ = require('partial-js');

function square(a) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(a * a);
        }, 500);
    });
}
//Promise를 반환한다.
//console.log(square(10));
// console.log(1);
// square(10).then(function(res) {
//     console.log(2);
//     console.log(res);
// });
// console.log(3);

//then 연결

// console.log(1);
// square(10).then(function(res) {
//     console.log(2);
//     return res;
// }).then(function(res) {
//     console.log(3);
//     console.log(res);
// })

// console.log(1);
// square(10)
//     .then(square)
//     .then(square)
//     .then(console.log);

// _.go(
//     square(10),
//     square,
//     square,
//     console.log
// )

//square 함수 즉시 평가로 변경
// function square(a) {
//     return a * a;
// }
// square(10)
//     .then(square)
//     .then(square)
//     .then(console.log);
//
// _.go(
//     square(10),
//     square,
//     square,
//     console.log
// )

//
// //promise 비동기 제어가 힘든 예시
var list = [2, 3, 4];
//이 배열을 square 함수를 통과한 새로운 배열로 만드는 로직
new Promise(function(resolve) {
    (function recur(res) {
        // console.log(res);
        if (list.length == res.length) return resolve(res);
        square(list[res.length]).then(function(val) {
            res.push(val);
            recur(res);
        });
    })([]);
}).then(console.log);

//위는 명령형 프로그래밍 방법이다. 위와 동일한 함수형 프로그래밍을 해보자.
_.go(
    list,
    _.map(square),
    _.map(square),
    _.map(square),
    console.log
);