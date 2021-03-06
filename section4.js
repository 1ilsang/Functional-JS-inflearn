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
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}
function _reduce(list, iter, memo) {
    if(arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function (val) {
        memo = iter(memo, val);
    });
    return memo;
}
function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) {
            return fn(b, a);
        }
    }
}
var  _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

console.log(
    _reduce([1, 2, 3], function (a, b) {
        return a + b;
    })
);
//6
//////////////////////////////////////
console.clear();
function _pipe() {
    var fns = arguments;
    return function (arg) {
        return _reduce(fns, function (arg, fn) {
            return fn(arg);
        }, arg)
    }
}
var f1 = _pipe(
    function(a) { return a + 1; },
    function(a) { return a * 2; }
    ,console.log
    );
console.log('11111',f1(1));
////////////////////////////////////////
var users = [
    { id: 1, name: 'AB', age: 36},
    { id: 2, name: 'CD', age: 22},
    { id: 3, name: 'EF', age: 37},
    { id: 4, name: 'GH', age: 34},
    { id: 5, name: 'IJ', age: 35},
    { id: 6, name: 'KL', age: 36},
    { id: 7, name: 'MN', age: 37},
    { id: 8, name: 'OP', age: 38},
];
function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}
_go(
    3,
    function (a) {return a + 1;},
    function (a) {return a * 2;},
    console.log
);
_go(
    users,
    function (users) {
        return _filter(users, function (user) {
            return user.age >= 30;
        });
    },
    function (users) {
        return _map(users, _get('name'));
    },
    console.log
);
//////////////////////////////////
console.clear();
//6. _each의 외부 다형성 높이기
    //1. _each에 null 넣어도 에러가 나지 않게.
function _each(list, iter) {
    for(var i = 0; i < _get(list)('length'); i++){
        iter(list[i]);
    }
    return list;
}
_each(null, console.log);
    //2. _keys 만들기
console.log(Object.keys({name:'1ilsang', age:33}));
console.log(Object.keys([1, ,2]));  //[0, 2]
console.log(Object.keys(10));       //[]
// console.log(Object.keys(null));     //err!

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}
function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}
console.log(_keys(null));
    //4. _each 외부 다형성 높이기
function _each(list, iter) {
    var keys = _keys(ist);
    for(var i = 0; i < keys.length; i++){
        iter(list[keys[i]]);
    }
    return list;
}
_each({
    13: 'ID',
    29: 'HD',
    30: 'YD'
}, function (name) {
    console.log(name);
});
console.log(_map({
    13:'id',
    20:'hd',
    3:'22'
}, function (name) {
    return name.toLowerCase();
}));
_go({
    1:users[0],
    3:users[2],
    5:users[4]
    },
    // _map(function (user) {
    //     return user.name.toLowerCase();
    // }),
    console.log);

