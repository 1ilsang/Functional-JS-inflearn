var _ = require('partial-js');

var products = [
    {
        is_selected: true, // <--- 장바구니에서 체크 박스 선택
        name: "반팔티",
        price: 10000, // <--- 기본 가격
        sizes: [ // <---- 장바구니에 담은 동일 상품의 사이즈 별 수량과 가격
            { name: "L", quantity: 2, price: 0 },
            { name: "XL", quantity: 3, price: 0 },
            { name: "2XL", quantity: 2, price: 2000 }, // <-- 옵션의 추가 가격
        ]
    },
    {
        is_selected: true,
        name: "후드티",
        price: 21000,
        sizes: [
            { name: "L", quantity: 3, price: -1000 },
            { name: "2XL", quantity: 1, price: 2000 },
        ]
    },
    {
        is_selected: false,
        name: "맨투맨",
        price: 16000,
        sizes: [
            { name: "L", quantity: 4, price: 0 }
        ]
    }
];
//1. 모든 수량
// _.go(products,
//     //첫 번째 reduce에서 product 만큼 돌게 된다.
//     _.reduce(function (tq, product) {
//         //아래의 reduce에서 product.sizes만큼 돌게 된다.
//         //데이터가 중첩형이므로 reduce도 중첩형으로 뽑아주는 것.
//         return _.reduce(product.sizes, function (tq, size) {
//             return tq + size.quantity;
//         }, tq)//이전에 계산된 tq를 그대로 넘겨주는 것.
//     }, 0),
//     console.log
// )
//재활용
var total_quantity = _.reduce(function (tq, product) {
    return _.reduce(product.sizes, function (tq, size) {
        return tq + size.quantity;
    }, tq);
}, 0);

_.go(products,
    total_quantity,
    console.log
);

//2. 선택 된 총 수량 (is_selected가 true인 값만 선택)
_.go(
    products,
    _.filter(function (product) {
        return product.is_selected;
    }),
    // _.filter(_get('is_selected')),
    total_quantity,
    console.log
)

//3. 모든 가격 출력
_.go(
    products,
    _.reduce(function (tp, product) {
        return _.reduce(product.sizes, function (tp, size) {
            return tp + (product.price + size.price) * size.quantity;
        }, tp)
    }, 0),
    console.log
)

var total_price = _.reduce(function (tp, product) {
    return _.reduce(product.sizes, function (tp, size) {
        return tp + (product.price + size.price) * size.quantity;
    }, tp)
}, 0);

//4. 선택 된 총 가격
_.go(
    products,
    _.filter(function (product) {
        return product.is_selected;
    }),
    total_price,
    console.log
)


// var total_quantity = _.reduce(function(tq, product) {
//     return _.reduce(product.sizes, function(tq, size) {
//         return tq + size.quantity;
//     }, tq);
// }, 0);
// _.go(products,
//     total_quantity,
//     console.log);
// //2. 선택 된 총 수량
// _.go(products,
//     _.filter(_get('is_selected')),
//     total_quantity,
//     console.log);
// //3. 모든 가격
// var total_price = _.reduce(function(tp, product) {
//     return _.reduce(product.sizes, function(tp, size) {
//         return tp + (product.price + size.price) * size.quantity;
//     }, tp);
// }, 0);
// _.go(products,
//     total_price,
//     console.log);
// //4. 선택 된 총 가격
// _.go(products,
//     _.filter(_get('is_selected')),
//     total_price,
//     console.log);
