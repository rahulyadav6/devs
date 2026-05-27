
// function callAfter1s(cb: () =>void){
//     setTimeout(cb,1000);
// }

// callAfter1s(function(){
//     console.log("hi there");
// });

interface User{
    name: string;
    age: number;
};
function isLegal(user: User){
    if(user.age > 18){
        return true;
    }else{
        return false;
    }
}
function greet(user: User){
    console.log("hi there " + user.name);
    
}
const user1: User = {
    name:"Rahul",
    age:20,
}
console.log(isLegal(user1));
greet(user1)