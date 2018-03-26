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
//초기
// var comments2 = _.map(comments, function (comment) {
//     return _.extend({
//         user: _.find(users, function (user) {
//             return user.id == comment.user_id;
//         })
//     }, comment);
// });
// console.log(comments2);

//index_by의 경우 1:1 쌍으로 묶어준다.
var users2 = _.index_by(users, 'id');
// console.log(users2);
function find_user_by_id(user_id) {
    return users2[user_id];
}
var comments2 = _.map(comments, function (comment) {
    return _.extend({
        user: find_user_by_id(comment.user_id)
    }, comment);
});
// console.log(comments2);

console.clear();
console.log('////////////////////');
////
//posts에 users와 commets를 달아주자.
var comments2 = _.go(
    comments,
    _.map(function (comment) {
        return _.extend({
            user:find_user_by_id(comment.user_id)
        }, comment);
    }),
    _.group_by('post_id')
);
// console.log(comments2);
// var posts2 = _.map(posts, function (post) {
//     return _.extend({
//         comments: comments2[post.id],
//         user: find_user_by_id(post.user_id)
//     }, post);
// });
var posts2 = _.go(
    posts,
    _.map(function (post) {
        return _.extend({
            comments: comments2[post.id] || [],
            user : find_user_by_id(post.user_id)
        }, post);
    }),
    _.group_by('user_id')
);
console.log(posts2);
// var users3 = _.map(users2, function (user) {
//     return _.extend({
//         posts: _.filter(posts2, function (post) {
//             return post.user_id == user.id;
//         })
//     }, user);
//     //기본값을 직접 변경할 경우 재귀가 생긴다.
//     // user.posts = _.filter(posts2, function (post) {
//     //     return post.user_id == user.id;
//     // })
//     //따라서 extend로 해주어야 한다.
// });
var users3 = _.map(users2, function (user) {
    return _.extend({
        posts: posts2[user.id] || []
    }, user);
});
console.log(users3);
// console.log('dd', users3[0].posts[0].comments[0].user);

//5.1 특정인의 posts의 모든 comments 거르기
var user = users3[0]; //특정인
_.go(user.posts,  //해당 특정인의 모든 글
    _.pluck('comments'),  //그중 comments를
    _.flatten,          //단조롭게 해준다.(중첩 배열 제거)
    console.log
)
console.log(
    _.deep_pluck(user, 'posts.comments'),
);

//5.2 특정인의 posts에 comments를 단 친구의 이름들 뽑기
_.go(
    user.posts,
    _.pluck('comments'),
    _.flatten,
    _.pluck('user'),
    _.pluck('name'),
    _.uniq,
    console.log
)

_.go(
    user,
    _.deep_pluck('posts.comments.user.name'),
    _.uniq,
    console.log
)

//5.3 특정인의 posts에 comments를 단 친구들 카운트 정보
_.go(
    user,
    _.deep_pluck('posts.comments.user.name'),
    _.uniq,
    _.count_by,
    console.log
)

// //5.4 특정인이 comments를 단 posts 거르기
// var posts3 = _.group_by(posts2, 'user_id');
//
// console.log(posts3);
// console.log(
//     _.filter(
//         posts3, function (post) {
//             return _.find(post.comments, function (comment) {
//                 return comment.user_id == 105;
//             });
//         }
//     )
// );








