import React, { useContext ,useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Nav } from 'react-bootstrap'
import { Context1 } from '../App.js'
import { addItem } from "./../store.js";
import { useDispatch } from "react-redux";

/*
 styled-components 장점
 1. css파일 안 열어도 됨.
 2. 스타일이 다른 js파일로 오염되지 않음. 오염 방지하려면 컴포넌트명.module.css 로 작명.(App.module.css는 App.js파일에만 종속이 됨.)
 3. 페이지 로딩시간 단축 => 뷰페이지에 <style></style>로 넣어줌.
 4. 단점) JS파일 매우 복잡해짐. / 중복 스타일은 컴포넌트간 import 할텐데 css와 다를 바가 없음.
*/

/* 오렌지색 버튼이 필요하면? props 문법 사용
background : ${ props => props.bg };
=> YellowBtn버튼을 사용할 때 bg라는 props를 입력할 수 있다는 뜻. 외부 라이브러리 사용법. / 협업시 css 담당의 숙련도 이슈
*/

/* bg 앞에 $표시가 붙는 이유는 styled-components: it looks like an unknown prop "bg" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props,~~ 경고(네가 만든 스타일 컴포넌트에 넘겨준 bg라는 변수가, 실제 HTML 태그(DOM)에까지 전달되고 있어!) 스타일용으로만 쓰려고 만든 변수가 HTML 버튼 태그의 속성으로 bg="orange"처럼 찍히고 있다는 뜻. 브라우저는 bg라는 표준 HTML 속성을 모르기 때문에 당황해서 경고를 띄움.

Styled-components는 기본적으로 컴포넌트에 들어온 모든 props를 하위 HTML 요소로 전달하려고 함.
bg="orange"라고 하면 실제 브라우저에서 <button bg="orange">라고 적혀있음, React는 이를 잠재적인 버그라고 판단.
*/
let YellowBtn = styled.button`
    background : ${ props => props.$bg };
    color : ${ props => props.$bg == 'blue' ? 'white' : 'black' };
    padding : 10px;
`
// (참고) 기존 스타일 복사 가능
// let NewBtn = styled.button(YellowBtn)`
// `

let Box = styled.div`
    background : grey;
    padding: 20px;
`

// 컴포넌트에 갈고리 다는 법(옛날 코드 방식)
// class Detail2 extends React.Component {
//     componentDidMout() {
//         // 컴포넌트 mount시(로드 시, 장착이 될 때) 여기 코드 실행됨
//     }
//     componentDidUpdate() {
//         // 컴포넌트 update시 여기 코드 실행됨
//     }
//     componentWillUnmount() {
//         // 컴포넌트 unmount시(삭제 시, 필요 없어질 때) 여기 코드 실행됨
//     }
// }

function Detail(props) {
	// 보관함 해체해줌
	let {stock} = useContext(Context1) // destructuring 문법

    let [count, setCount] = useState(0);
    let [alerts, setAlerts] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0) // 0이면 0번째 탭 내용이 보이는 상태, 1이면 1번째 탭 내용이 보임, 2이면 2번째 탭 내용이 보임.
    let [load, setLoad] = useState('')

	let dispatch = useDispatch()

    useEffect(()=>{
        let b = setTimeout(()=>{ setLoad('end') }, 100)
        return ()=>{
            clearTimeout(b)
            setLoad('')
        }
    }, [])

    useEffect(() => {
        // mount, update시 여기 코드 실행됨
        // console.log('안녕') -> 두번 실행되는데(디버깅을 위해서) 제거하려면 index.js에서 <React.StrictMode>를 없애기

        /* 서버로 데이터 요청하는 코드를 이 자리에 많이 씀.
        서버로 데이터 요청하는 코드(2초 소요)가 데이터를 가져오는 도중에 재렌더링이 되어버리면 안에 있는 코드를 무한으로 실행함. 데이터를 요청하기 전에 또 요청X10000000 => 버그 많아짐 => return () => {기존 데이트 요청은 제거해주세요~~}
        순서는 1. return코드 먼저 실행 후 2. useEffect 안의 코드 실행.
        */
        const timer = setInterval(() => {
            setAlerts(false);
        }, 2000);        
        // console.log(2)
        // useEffect가 실행되기 전에 실행됨.
        return () => {
            // 기존 코드 제거(clean up function)
            // mount시 실행 안됨, unmount시 실행됨
            // console.log(1)
            clearTimeout(timer)
        };
        /* []는 useEffect 실행조건 넣을 수 있는 곳(dependency), []안에 있는 변수가 변할 때마다 uesEffect안의 코드를 실행함. []안에 변수가 없으면 uesEffect 안의 코드를 실행하지 않음.
        컴포넌트 mount시 1회만 실행하고 싶으면 []안을 비워두기.
        */
    }, [])

    useEffect(() => {
        if(isNaN(num) == true) {
            alert('그러지 마세요')
        }
        // setNum('');
    }, [num]);

    /* 유저가 url파라미터에 입력한 값 가져옴.(현재url의 파라미터 정보들이 남음.) 
    useParams()는 객체를 반환함.
    */
    let {id} = useParams();
    // 정렬 후에도 상세페이지 주소 고정
    props.shoes.find((x) => {
        return x.id === id;
    })
    // console.log(id);

    /* 
        1. 재렌더링마다 코드 실행하고 싶다. => useEffect(()=>{})
        2. mount시 1회 코드 실행하고 싶다. => useEffect(()=>{}, [])
        3. unmount시 1회 코드 실행하고 싶다. =>
            useEffect(()=>{
                return()=>{
                }
            }, [])
        4. useEffect 실행 전에 뭔가 실행하려면 언제나 return()=>{}
        5. 특정 state 변경시에만 실행하려면 [state명] (dependency)
     */

    //console.log('안녕') // 여기에 써도 똑같이 작동함.
    /* useEffect를 쓰는 이유 => useEffect 안에 있는 코드는 html 렌더링이 다 되고 나서 실행이 됨.
    스크립트는 위에서 부터 차례대로 읽기 때문에 useEffect안에 쓰는게 효율적임.
    시간이 오래 걸리는 코드는 useEffect 안에 쓰는게 좋음.
    uesEffect 안에 적는 코드들은
    - 어려운 연산
    - 서버에서 데이터 가져오는 작업
    - 타이머 장착하는 것
    - 함수의 핵심기능(렌더링 기능)과 상관 없는 부가기능
    */

    /* 데이터는 한 곳에 잘 보관하기. 컴포넌트마다 쓰게 되면 나중에 수정하기 힘들어짐. */

    return (
        <div className={`container start ${load}`}>
            {/* <Box> */}
                <YellowBtn $bg="orange">버튼</YellowBtn>
                <YellowBtn $bg="blue">버튼</YellowBtn>
            {/* </Box> */}
            {/* <div className={`alert alert-warning ${alert ? "" : "end"}`}>
                2초 이내 구매시 할인
            </div> */}
            {
                alerts == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null
            }

			{stock}
            {count}
            <button onClick={()=>{ setCount(count+1) }}>버튼</button>
            <div className="row">
                <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                {
                    num == false ? <div className="alert alert-warning">그러지 마세요. 숫자만 입력 가능합니다.</div> : null
                }
                {/* <div className={`alert alert-warning ${num ? "" : "warning"}`}>그러지 마세요. 숫자만 입력 가능합니다.</div> */}
                <div className="col-md-6">
                    <input type="text" onChange={
                        (e) => {
                            setNum(e.target.value) //e.target.value는 지금 이 이벤트가 발생한 바로 그 입력창(input)에 적혀 있는 글자들 target이 되는 요소의 value값
                        }
                    }></input>
                    {/* {props.shoes[현재url에 입력한 숫자]} */}
                    {/* url파라미터에 이상한 값을 입력하면?
                        조건문으로 if(id라는 변수가 이상하면) {상품이 없다는 UI를 보여주세요}
                        
                        (응용)
                        정렬 후엔 /detail/0 접속 시 Grey Yordan 상품이 보임.(정렬된 상태에서 가장 첫번째 상품)
                        => 이렇게 뒤죽박죽일 경우 /detail/0 접속 시 0번째 상품 말고 상품id가 0인걸 보여주면 좋을듯.
                    */}
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className="btn btn-danger" onClick={()=>{
						dispatch(addItem({
							id: props.shoes[id].id,
							name: props.shoes[id].title,
							count: 1
						}))
					}}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent shoes={props.shoes} tab={tab} />
            {
                /* state가 0이면 내용 0 보이기, state가 1이면 내용1 보이기, state가 2면 내용2 보이기 */
                // 삼항 연산자는 연속해서 쓸 수 없음
                // tab == 0 ? <div>내용0</div> : null
            }
            {/* <div>내용0</div>
            <div>내용1</div>
            <div>내용2</div> */}
        </div>
    )
}


/* props 등록하기 귀찮으면 props전달한 이름을 적으면 됨.
    function TabContent({tab, num, ..})
*/
function TabContent({tab}){
    let [fade, setFade] = useState('')
	let {stock} = useContext(Context1)
    // tab state가 변할 때 end 클래스 부착
    /* 리액트의 automatic batching 기능
    state변경하는 함수들이 근처에 있다면 하나로 합쳐서 최종적으로 한번만 state변경을 해줌.
    state변경이 일어나고 마지막에 딱 한번만 재렌더링을 해줌.
    재렌더링X -> state변경함수()
    재렌더링X -> state변경함수()
    재렌더링X -> state변경함수()
    재렌더링O -> state변경함수()
    */
    useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 100)
        // setFade('end') // 순서 2
        return ()=>{
            clearTimeout(a)
            setFade('') // 순서 1
        }
    }, [tab])
    // return을 꼭 써야 작동
    // 방법1.
    // if(props.tab == 0){
    //     return <div>내용0</div>
    // } else if (props.tab == 1){
    //     return <div>내용1</div>
    // } else if (props.tab == 2){
    //     return <div>내용2</div>
    // }

    // 방법2.
    /*  let fruits = ['사과', '바나나', '포도'];
        console.log(fruits[0]); -> '사과'

        console.log( ['사과', '바나나', '포도'][1] ); // 변수에 담지 않고 직접 대괄호를 붙여도 똑같이 작동함. -> '바나나'
    */
    return ( <div className={`start ${fade}`}>
        { [<div>{stock}</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div> )
}

export default Detail;