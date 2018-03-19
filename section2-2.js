// function _curry(fn) {
//     return function(a) {
//         return function(b) {
//             return fn(a, b);
//         }
//     }
// }

// var add = _curry(function(a, b) {
//     return a+ b;
// });

// var add10 = add(10);

// console.log(add10(5));
// console.log(add(5)(3));

// console.log(add(1, 2)(2));
///////////////////////////////////////////////////
function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) {
            return fn(a, b);
        }
    }
}
// var add = _curry(function(a, b) {
//     return a+ b;
// });
// var add10 = add(10);

// console.log(add10(5));
// console.log(add(5)(3));
// console.log(add(1, 2));
/////////////////////////////////////////////////////////////////////
var sub = _curryr(function(a, b) {
    return a - b;
});
console.log(sub(10,5));
var sub10 = sub(10);
console.log(sub10(3));

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) {
            return fn(b, a);
        }
    }
}
///////////////////////////////////////////////////////////////
//2. _get 만들어 좀 더 간단하게 하기
// function _get(obj, key) {
//     return obj == null ? undefined : obj[key];
// }
// var users = [{name : '1ilsang', value : 5}, {name : '2ilsang', value : 15}];
// var user1 = users[0];
// console.log(user1.name);
// console.log(_get(user1, 'name'));

// // console.log(users[10].name);  //err
// console.log(_get(users[10], 'name')); //undefined

var  _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});
var users = [{name : '1ilsang', value : 5}, {name : '2ilsang', value : 15}];
var user1 = users[0];
console.log(user1.name);
console.log(_get(user1, 'name'));
console.log(_get('name')(user1));

var get_name = _get('name');
console.log(get_name(user1));

function _each(list, iter) {
    for(var i =0; i < list.length; i++){
        iter(list[i]);    
    }
    return list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    return new_list;
}

function _filter(list, predi) {
    var new_list = [];
    _each(list, function(val) {
        if(predi(val)) new_list.push(val);
    });
    return new_list;
}
console.log(
    _map(
        _filter(users, function(a) {    return a.value >= 10;   }),
        function(a) {    return a.name;    }
    )
);
console.log(
    _map(
        _filter(users, function(a) {    return a.value >= 10;   }),
        _get('name')
    )
);
