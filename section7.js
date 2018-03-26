var _ = require('partial-js');

var users = [
    { id: 101, name: 'ID' },
    { id: 102, name: 'BJ' },
    { id: 103, name: 'PJ' },
    { id: 104, name: 'HA' },
    { id: 105, name: 'JE' },
    { id: 106, name: 'JI' }
];
var posts = [
    { id: 201, body: '내용1', user_id: 101 },
    { id: 202, body: '내용2', user_id: 102 },
    { id: 203, body: '내용3', user_id: 103 },
    { id: 204, body: '내용4', user_id: 102 },
    { id: 205, body: '내용5', user_id: 101 },
];
var comments = [
    { id: 301, body: '댓글1', user_id: 105, post_id: 201 },
    { id: 302, body: '댓글2', user_id: 104, post_id: 201 },
    { id: 303, body: '댓글3', user_id: 104, post_id: 202 },
    { id: 304, body: '댓글4', user_id: 105, post_id: 203 },
    { id: 305, body: '댓글5', user_id: 106, post_id: 203 },
    { id: 306, body: '댓글6', user_id: 106, post_id: 204 },
    { id: 307, body: '댓글7', user_id: 102, post_id: 205 },
    { id: 308, body: '댓글8', user_id: 103, post_id: 204 },
    { id: 309, body: '댓글9', user_id: 103, post_id: 202 },
    { id: 310, body: '댓글10', user_id: 105, post_id: 201 }
];

//1. 특정인의 posts의 모든 comments 거르기
//기본.
// _.go(
//     _.where(posts, { user_id : 101 }),
//     _.pluck('id'),
//     function (post_ids) {
//         return _.filter(comments, function (comment) {
//             return _.contains(post_ids, comment.post_id);
//         });
//     },
//     console.log
// )
//
// //2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
// _.go(
//     _.where(posts, { user_id : 101 }),
//     _.pluck('id'),
//     function (post_ids) {
//         return _.filter(comments, function (comment) {
//             return _.contains(post_ids, comment.post_id);
//         });
//     },
//     _.map(function (comment) {
//         return _.find(users, function (user) {
//             return user.id == comment.user_id;
//         }).name;
//     }),
//     _.uniq,
//     console.log
// )
//공통영역으로 빼기
function posts_by(attr) {
    return _.where(posts, attr);
}
var comments_by_posts = _.pipe(
    _.pluck('id'),
    function (post_ids) {
        return _.filter(comments, function (comment) {
            return _.contains(post_ids, comment.post_id);
        });
    },
);

//1. 특정인의 posts의 모든 comments 거르기
var f1 = _.pipe(posts_by, comments_by_posts);
//
// _.go({user_id: 101},
//     posts_by,
//     comments_by_posts,
//     console.log
// )
console.log(f1({user_id : 101}));

//2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
// _.go(
//     {user_id : 101},
//     posts_by,
//     comments_by_posts,
//     _.map(function (comment) {
//         return _.find(users, function (user) {
//             return user.id == comment.user_id;
//         }).name;
//     }),
//     _.uniq,
//     console.log
// );

var comments_to_user_names = _.map(function (comment) {
            return _.find(users, function (user) {
                return user.id == comment.user_id;
            }).name;
        });

var f2 = _.pipe(
    f1,
    comments_to_user_names,
    _.uniq
);

console.log(f2({user_id:101}));

//3. 특정인의 posts에 comments를 단 친구들 카운트 정보
var f3 = _.pipe(
    f1,
    comments_to_user_names,
    _.count_by
);
console.log(
    f3({user_id:101})
);

//4. 특정인이 comment를 단 posts 거르기
_.go(
    _.where(comments, {user_id:105}),
    _.pluck('post_id'),
    _.uniq,
    function (post_ids) {
        return _.filter(posts, function (post) {
            return _.contains(post_ids, post.id);
        });
    },
    console.log
)

//5. users + posts + comments (index_by와 group_by로 효율 높이기)

//6.


















