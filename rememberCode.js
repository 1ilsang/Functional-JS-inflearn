var _ = require('partial-js');

// function a() {
//     // var를 붙이면 for문이 제대로 돌고 붙이지 않으면 무한루프가 돈다.
//     var i = 0;
// }
// console.log('start', i);
// for (var i = 0; i < 5; i++) {
//     //여기서 선언한 var i 가 전역으로 간다는 충격적인 사실...
//     a();
//     console.log(i);
// }

var users = [
    { id: 1, name: 'AB', age: 36},
    { id: 2, name: 'AB', age: 33},
    { id: 3, name: 'AB', age: 31},
]
console.log(users.length);
function _filter(users, predi) {
        var new_list = [];
        for (var i = 0; i < users.length; i++) {
            if(predi(users[i])){
                new_list.push(users[i]);
            }
        }
        return new_list;
    }
console.log(
    _filter(users, function(a) {    return a.age >= 30;   })
);

console.log(
    users.filter(function (a) {
        return a.age >= 30;
    })
);
console.clear();

_.go(
    users,
    _.filter(user => user.age >= 30),
    _.pluck('age'),
    _.min,
    console.log
)
var users = [
    { id: 1, name: 'AB', age: 36},
    { id: 2, name: 'AB', age: 33},
    { id: 3, name: 'BB', age: 31},
]
_.go(
    users,
    _.group_by(function (user) {
        return user.name;
    }),
    console.log
)