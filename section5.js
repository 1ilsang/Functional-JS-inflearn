var users = [
    {id: 1, name: 'AB', age: 36},
    {id: 2, name: 'CD', age: 22},
    {id: 3, name: 'EF', age: 37},
    {id: 4, name: 'GH', age: 34},
    {id: 5, name: 'IJ', age: 35},
    {id: 6, name: 'KL', age: 36},
    {id: 7, name: 'MN', age: 37},
    {id: 8, name: 'OP', age: 18}
];

function _curry(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {
            return fn(a, b);
        };
    };
}

function _curryr(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {
            return fn(b, a);
        };
    };
}

var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

function _filter(list, predi) {
    var new_list = [];
    _each(list, function (val) {
        if (predi(val)) new_list.push(val);
    });
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function (val, key) {
        new_list.push(mapper(val, key));
    });
    return new_list;
}

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

var _length = _get('length');

function _each(list, iter) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        iter(list[keys[i]], keys[i]);
    }
    return list;
}

var _map = _curryr(_map),
    _each = _curryr(_each),
    _filter = _curryr(_filter);

var _pairs = _map(function (val, key) {
    return [key, val];
});

var slice = Array.prototype.slice;

function _rest(list, num) {
    return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function (val) {
        memo = iter(memo, val);
    });
    return memo;
}

function _pipe() {
    var fns = arguments; //함수들을 arg배열로 받는다.
    return function (arg) { //pipe의 실행 결과는 함수다. 나중에 실행될 함수를 리턴
        //arg는 인자로 받는 녀석. -> f(1) 등
        return _reduce(fns, function (arg, fn) {
            return fn(arg);
        }, arg); //받은 인자를 reduce의 시작값으로 설정
    };
}

function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}


var _values = _map(_identity);

function _identity(val) {
    return val;
}

var _pluck = _curryr(function (data, key) {
    return _map(data, _get(key));
});

function _negate(func) {
    return function (val) {
        return !func(val);
    };
}

var _reject = _curryr(function (data, predi) {
    return _filter(data, _negate(predi));
});

var _compact = _filter(_identity);

var _find = _curryr(function (list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]];
        if (predi(val)) return val;
    }
});

var _find_index = _curryr(function (list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        if (predi(list[keys[i]])) return i;
    }
    return -1;
});

function _some(data, predi) {
    return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
    return _find_index(data, _negate(predi || _identity)) == -1;
}


function _push(obj, key, val) {
    (obj[key] = obj[key] || []).push(val);
    return obj;
}

var _group_by = _curryr(function (data, iter) {
    return _reduce(data, function (grouped, val) {
        return _push(grouped, iter(val), val);
    }, {});
});


var _inc = function (count, key) {
    count[key] ? count[key]++ : count[key] = 1;
    return count;
};

var _count_by = _curryr(function (data, iter) {
    return _reduce(data, function (count, val) {
        return _inc(count, iter(val));
    }, {});
});

var _head = function (list) {
    return list[0];
};

// function _is_object(obj) {
//     return typeof obj == 'object' && !!obj;
// }
// function _keys(obj) {
//     return _is_object(obj) ? Object.keys(obj) : [];
// }
//
// //컬렉션 중심 프로그래밍의 유형별 함수 만들기
//
// //1. 수집하기 - map
//
console.log(
    _map(users, function (user) {
        return user.name;
    })
);

function _identity(val) {
    return val;
}

var _values = _map(_identity);
//
// console.log(users[0]);
// console.log(_keys(users[0]));
console.log(_values(users[0]));
// console.log(_map(_identity)(users[0]));

// //////////////////////////////////////////////
function _pluck(data, key) {
    return _map(data, _get(key));
}

console.log(_pluck(users, 'age'));
//////////////////////////////////////////////

//2. 거르기 - filter
console.log(
    _filter(
        users, function (user) {
            return user.age > 30;
        }
    )
);

function _negate(func) {
    return function (val) {
        return !func(val);
    };
}

function _reject(data, predi) {
    return _filter(data, _negate(predi));
}

console.log(
    _reject(users, function (user) {
        return user.age > 30;
    })
);
// 1. reject는 filter를 거꾸로 한 것이라 보면 된다.
// 2. compact는 트루 값만 걸러 넘긴다.

var _compact = _filter(_identity);

console.log(
    _compact([1, 2, 0, false, true, {}])
);
/////////////////////////////////////////////
//3. 찾아내기 - find
//  1. find 만들기
function _find(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]];
        if (predi(val)) return val;
    }
}

console.log(
    _find(users, function (user) {
        return user.age < 30;
    })
);

//  2. find_index
function _find_index(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        if (predi(list[keys[i]])) return i;
    }
    return -1;
}

console.log(
    _find_index(users, function (user) {
        return user.id == 7;
    })
);

_go(users,
    _find(function (user) {
        return user.id == 6;
    }),
    _get('name'),
    console.log);


//  3. some
function _some(data, predi) {
    return _find_index(data, predi) != -1;
}

_some([1, 2, 5, 10, 20], function (val) {
    return val > 10;
});

//  4. every
function _every(data, predi) {
    return _find_index(data, _negate(predi)) == -1;
}

_every([1, 2, 5, 10, 20], function (val) {
    return val > 10;
});

//4. 접기 - reduce
//  1. min, max, min_by, max_by
function _min(data) {
    return _reduce(data, function (a, b) {
        return a < b ? a : b;
    });
}

function _max(data) {
    return _reduce(data, function (a, b) {
        return a > b ? a : b;
    });
}

function _min_by(data, iter) {
    return _reduce(data, function (a, b) {
        return iter(a) < iter(b) ? a : b;
    });
}

function _max_by(data, iter) {
    return _reduce(data, function (a, b) {
        return iter(a) < iter(b) ? a : b;
    });
}

var _min_by = _curryr(_min_by);
var _max_by = _curryr(_max_by);

console.log(
    _min_by([1, 2, 4, 10, 5, -4], Math.abs)
);
console.log(
    _max_by(users, function (user) {
        return user.age;
    })
);

_go(users,
    _filter(user => user.age >= 30),
    _min_by(_get('age')),
    _get('name'),
    console.log
)
;
console.clear();

//  2. group_by, push
// var users2 = {
//     36 : {id: 1, name: 'AB', age: 36},
//     ...
// }
function _push(obj, key, val) {
    (obj[key] = obj[key] || []).push(val);
    return obj;
}
var _group_by = _curryr(function (data, iter) {
    return _reduce(data, function (grouped, val) {
        return _push(grouped, iter(val), val);
    }, {});
});
_go(users,
    _group_by(function (user) {
        return user.age;
    }),
    console.log);
console.log('///');
_go(users,
    _group_by(function (user) {
        return user.age - user.age % 10;
    }),
    console.log);
_go(users,
    _group_by(function (user) {
        return user.name;
    }),
    console.log);

var _head = function (list) {
    return list[0];
}
_go(users,
    _group_by(_pipe(_get('name'), _head)),
    console.log);

//  3. count_by, inc
var _count_by = _curryr(function (data, iter) {
    return _reduce(data, function (count, val) {
        return _inc(count, iter(val));
    }, {});
});

console.log(
    _count_by(users, function (user) {
        return user.age - user.age % 10;
    })
);

var _inc = function (count, key) {
    count[key] ? count[key]++ : count[key] = 1;
    return count;
}

_go(users,
    _count_by(function (user) {
        return user.age - user.age % 10;
    }),
    _map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
    list => '<ul>' + list.join('') + '</ul>',
    console.log);

_go(users,
    _reject(function (user) {
        return user.age < 20;
    }),
    _count_by(function (user) {
        return user.age - user.age % 10;
    }),
    _map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
    list => '<ul>' + list.join('') + '</ul>',
    console.log);














