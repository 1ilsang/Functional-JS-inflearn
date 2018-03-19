var ee = 3;
// console.log(global);
console.log('start', i);
function a() {
    console.log('1',i);
    i = 0;
    console.log('2',i);
}
console.log('ss', a());

console.log('middle', i);
for(var i = 0; i < 5; i++){
    console.log('start for');
    a();
    console.log(i);
    if(ee == 3){
        break;
    }
}
console.log('end', i);