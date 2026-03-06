let data = [
    {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000,
        url : "https://codingapple1.github.io/shop/shoes1.jpg"
    },

    {
        id : 1,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000,
        url : "https://codingapple1.github.io/shop/shoes3.jpg"
    },

    {
        id : 2,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000,
        url : "https://codingapple1.github.io/shop/shoes2.jpg"
    },    
]

export default data; // export하려면 export default 변수명
// export {a, b} // export 여러개 하려면 export{변수1, 변수2}
// 함수도 export 가능
// 대괄호[] 안에 array 자료가 있는 것.
// 중괄호{} object 자료형
/* 
let a = ['kim', 20]
let b = { name : 'kim', age : 20 } => 중괄호일때는 왼쪽에 이름을 써줘야 함(자료이름)=>object 자료형
object 자료형에서 자료를 꺼내 쓰는 방법 : b.name => 결과값 kim
 */