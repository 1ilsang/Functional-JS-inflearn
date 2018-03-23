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

_.go(
    _.filter(posts, function (posts) {
        return posts.user_id == 101;
    }),
    function (posts) {
        return _.filter(comments, function (comment) {
            return
        })
    }
)

//2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기

//3. 특정인의 posts에 comments를 단 친구들 카운트 정보

//4. 특정인이 comment를 단 posts 거르기

//5. users + posts + comments (index_by와 group_by로 효율 높이기)

//6.