function a() {
    // var를 붙이면 for문이 제대로 돌고 붙이지 않으면 무한루프가 돈다.
    var i = 0;
}
console.log('start', i);
for (var i = 0; i < 5; i++) {
    //여기서 선언한 var i 가 전역으로 간다는 충격적인 사실...
    a();
    console.log(i);
}