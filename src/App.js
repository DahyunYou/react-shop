import { lazy, Suspense, useState, createContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bg from './img/test.png';
import data from './data.js' // js 확장자 생략 가능
// import {a, b} from './data' // export 여러개일 경우
import List from './routes/List'
import Test from './routes/Test'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import Detail from './routes/Detail.js'
// import Cart from './routes/Cart.js'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

export let Context1 = createContext() // Context는 state 보관함

const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

function App() {
	let [shoes, setShoes] = useState(data);
	let [clickCount, setClickCount] = useState(0)
	let navigate = useNavigate(); // 페이지 이동을 도와주는 함수 hook(유용한 것들이 들어있는 함수)
	// console.log(shoes[0].price);
	let [stock] = useState([10, 11, 12]) // 10(1번째 상품의 재고), 11(2번째 상품의 재고), 12(3번째 상품의 재고) => Detail, TabContent에서 사용

	/* App 컴포넌트 로드 시 ajax 실행됨 -> 그 결과를 result 변수 안에 담음
	장점
	1. ajax 상태 체크 쉬움
	2. ajax 재요청 자주 해줌(실시간 데이터 업데이트가 쉬워짐)
	3. 실패시 3~4번 재시도 알아서 해줌
	4. 캐싱 알아서 해줌(자료를 받아뒀다가 재활용) -> props전달 필요X
	   let result~ 통째로 다른 컴포넌트에서 재사용 가능. queryKey를 똑같이 쓰면 중복제거하고 하나만 사용
	=> 실시간으로 데이터를 업데이트 해야 하는 사이트의 경우 유용. 서버 측에서 부담이 늘어날 수 있음.
	*/
	let result = useQuery({
		queryKey: ['getName'],
		refetchOnWindowFocus: false, // 다른 창에 갔다가 창으로 복귀 시 ajax 요청 재전송X
		retry: 10, // 실패시 재시도 횟수
		queryFn: () => { 
			//ajax요청
			return axios.get('http://codingapple1.github.io/userdata.json') //return과 중괄호는 함께 생략 가능
			.then(a => a.data)
		}
	})

	console.log(result.data)
	
	/* 개발자 도구 > Local Storage
	1. key : value 형태로 저장 가능
	2. 문자 데이터만 저장 가능, 최대 5MB까지 문자만 저장 가능
	3. 사이트 재접속해도 남아있음.(브라우저 청소하면 삭제됨)

	Session Storage는 브라우저 끄면 저장된 데이터 날아감.
	*/

	// public 폴더 안에 있는 이미지를 사용할 땐 '/logo192.png' 이런 식으로 /(슬래시)부터 시작
	// <img src={process.env.PUBLIC_URL + '/logo192.png'} => 이게 public폴더 이미지 쓰는 권장 방식
	// <img src='https://codingapple1.github.io/shop/shoes1.jpg' width='80%' />
	return (
		<div className="App">
			<Navbar bg="dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
					<Nav className="me-auto">
						{/* navigate(1) 앞으로 한 페이지 이동, navigate(-1) 뒤로 한 페이지 이동, -2는 뒤로 2번 이동 */}
						<Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
						{/* navigate 함수 실행하면 페이지 이동됨 */}
						<Nav.Link onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
						<Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
						<Nav.Link onClick={()=>{ navigate('/test') }}>Test</Nav.Link>
					</Nav>
					<Nav className="ms-auto">
						{/* isPending 로딩 중일 경우 */}
						{ result.isPending && '로딩중' }
						{/* isError 에러났을 경우 */}
						{ result.isError && '에러남' }
						{/* isSuccess 성공했을 경우 */}
						{ result.isSuccess && result.data.name }
					</Nav>
				</Container>
			</Navbar>

			{/* Suspense 로딩중 UI 넣기 가능(lazy로딩) */}
			<Suspense fallback={<div>로딩중임</div>}>
				<Routes>
					<Route path="/" element={
						<>
							<div className='main-bg' style={{ backgroundImage:'url(' + bg + ')' }}></div>

							<div className='container'>
								<button type='button' onClick={
									() => {
										let copy = [...shoes]
										copy.sort(function(a, b) {
											return a.title > b.title ? 1 : -1;
										});
										setShoes(copy);
										// console.log(copy)
									}
								}>정렬</button>
								<div className='row'>
									{/* <div className='col-md-4'>
										<img src='https://codingapple1.github.io/shop/shoes1.jpg' width='80%' />
										<h4>{shoes[0].title}</h4>
										<p>{shoes[0].price}</p>
									</div>
									<div className='col-md-4'>
										<img src='https://codingapple1.github.io/shop/shoes2.jpg' width='80%'/>
										<h4>{shoes[1].title}</h4>
										<p>{shoes[1].price}</p>
									</div>
									<div className='col-md-4'>
										<img src='https://codingapple1.github.io/shop/shoes3.jpg' width='80%'/>
										<h4>{shoes[2].title}</h4>
										<p>{shoes[2].price}</p>
									</div> */}
									{
										shoes.map((a, i)=>{
											return (
												<List shoes={shoes[i]} i={i} key={i} />
											)
										})
									}
									{/* <List shoes={shoes[i]} /> */}
									{/* <List shoes={shoes[0]} i={1} />
									<List shoes={shoes[1]} i={2}/>
									<List shoes={shoes[2]} i={3}/> */}
								</div>
							</div>
							<button onClick={()=>{
								// 로딩 중 UI 띄우기~
								/* ajax 쓰려면 옵션 3개 중 택1
								1. XMLHttpRequest
								2. fetch()
								3. axios	(라이브러리)
								*/
								axios.get('https://codingapple1.github.io/shop/data2.json')
								// .then(작명) 보통 작명란에 result(작명)라고 씀
								.then((result)=>{
									let copy = [...shoes, ...result.data] // 배열에 포장을 뜯어서 넣는 형식
									// copy.unshift(result.data) => 배열에 상자째 넣는 형식
									setShoes(copy)
									// console.log(copy)
									setClickCount(clickCount+1)
									console.log(clickCount+1)

									// 로딩 중 UI 숨기기~
								})
								// ajax 요청 실패할 경우
								.catch(()=>{
									console.log('실패함')
									// 로딩 중 UI 숨기기~
								})

								// 서버로 데이터를 전송하는 post요청
								// axios.post('https://codingapple1.github.io/shop/data2.json', {name: 'kim'})
								// // .then(작명) 보통 작명란에 result(작명)라고 씀
								// .then((result)=>{
								// 	let copy = [...shoes, ...result.data] // 배열에 포장을 뜯어서 넣는 형식
								// 	// copy.unshift(result.data) => 배열에 상자째 넣는 형식
								// 	setShoes(copy)
								// 	// console.log(copy)

								// 	// 로딩 중 UI 숨기기~
								// })
								// ajax 요청 실패할 경우
								// .catch(()=>{
								// 	console.log('실패함')
								// 	// 로딩 중 UI 숨기기~
								// })

								// fetch로 요청할 경우(axios는 json자료를 자동으로 문자로 변환해주기 때문에 변환 필요X)
								// fetch('https://codingapple1.github.io/shop/data3.json')
								// .then((result)=>{
								// 	result.json() // json => array/object 변환 과정 필요
								// })
								// .then(result=>{})

								// 동시에 ajax 요청을 여러개 하려면
								/* axios.get('/url1')
								axios.get('/url2')
								*/
								// Promise.all([axios.get('/url1'), axios.get('url2')])
								// .then((result)=>{
								// 	let copy = [...shoes, ...result.data]
								// })
							}}>더보기</button>
							{/* 1. 더보기 버튼을 2회 누를 땐 7,8,9번 상품을 가져오려면? 힌트: 버튼 누른 횟수 저장
								2. 버튼을 3회 누를 때는 상품이 더 없다고 알려주기.
								3. 버튼 누르면 "로딩 중입니다." 글자 띄우기
							*/}
							{/* 원래는 서버와 문자만 주고 받을 수 있음.
							"{'name' : 'kim'}" 따옴표 쳐 놓으면 문자로 인식해서 array, object도 주고 받기 가능. 이런 식으로 표현한 자료를 json이라고 함.
							*/}
						</>
					} />
					{/* 상품이 많을 때: URL파라미터 써도 됨.
						:id를 URL파라미터라고 함.
						(참고) URL파라미터 만들 때 여러개 가능, 파라미터랑 일반 문자랑 섞어서 써도 됨.
						예) <Route path="/detail/:id/:sd/fsdf/:dfdf" element={<Detail shoes={shoes} />}/>
					*/}
					<Route path="/detail/:id" element={
						
							<Context1.Provider value={{ stock }}>
								<Detail shoes={shoes} /> {/* 여기 안의 모든 컴포넌트는 stock, shoes 사용 가능 */}
							</Context1.Provider>
					}/>
					{/* *(별표)는 모든 것(위에 만들어 놓은 Route 외 모든 것을 의미) */}
					<Route path="*" element={<div>없는 페이지에요</div>}/>

					<Route path="/cart" element={<Cart/>}/>
					<Route path="/test" element={<Test/>}/>

					{/* Nested Routes (태그 안에 태그가 들어감)
						장점1. route 작성이 간단해짐.
						장접2. Nested Routes 접속 시엔 element 2개가 보임.
						장점3. 뒤로가기 버튼 이용 가능, 페이지 이동이 쉬움(UI 스위치 조작 쉬움.)
						4. 여러 유사한 페이지가 필요할 때 씀.(동적인 UI 활용 가능)
					*/}
					<Route path="/about" element={<About />}>
						{/* 아래 두 페이지는 /about/member, /about/location 페이지로 이동한 것과 같음. */}
						<Route path="member" element={<div>멤버임</div>}/>
						<Route path="location" element={<div>위치정보임</div>}/>
					</Route>
					<Route path="/event" element={<Event />}>
						<Route path="one" element={<div>One</div>}/>
						<Route path="two" element={<div>Two</div>}/>
					</Route>
				</Routes>
			</Suspense>

			
		</div>
	);
}
/* 서버
서버에 데이터를 요청할건데
- 서버: 데이터를 요청하면 데이터를 보내주는 프로그램(youtube서버: 동영상을 보내줌, 네이버 웹툰 서버: 웹툰을 보내줌)
- 서버 개발 시 짜는 코드: "누가 A요청하면 A 보내주세요~"
- 규격을 맞춰서 데이터 요청
  1. 방법(GET/POST) - 서버에 요청(GET: 데이터를 서버에서 가져옴 / POST: 내 데이터를 서버에 보냄)
  2. 어떤 자료(URL) - 개발자한테 URL 요청
- GET/POST 요청시 새로고침 됨. ajax 사용해도 새로고침 없이 GET/POST 요청 가능
*/

function About(){
	return (
		<div>
			<h4>회사 정보임</h4>
			{/* Nested Routes 안의 html(요소)을 보여줄 자리 (Outlet 뜻은 '구멍')*/}
			<Outlet></Outlet>
		</div>
	)
}

function Event(){
	return (
		<div>
			<h4>이벤트 페이지</h4>
			<Outlet></Outlet>
		</div>
	)
}
// function List(props) {
// 	// <div className='col-md-4' key={0}>
// 	// 	<img src='https://codingapple1.github.io/shop/shoes2.jpg' width='80%'/>
// 	// 	<h4>{shoes[1].title}</h4>
// 	// 	<p>{shoes[1].price}</p>
// 	// </div>
// 	// console.log(props.shoes[0].url)

// 	return (		
// 		// props.shoes.map(function(a, i) {
// 		// 	return (
// 		// 		<div className='col-md-4' key={i}>
// 		// 			<img src={props.shoes[i].url} width='80%' />
// 		// 			<h4>{props.shoes[i].title}</h4>
// 		// 			<p>{props.shoes[i].price}</p>
// 		// 		</div>
// 		// 	)
// 		// })
// 		<div className='col-md-4' >
// 			<img src={props.shoes.url} width='80%' />
// 			<h4>{props.shoes.title}</h4>
// 			<p>{props.shoes.price}</p>
// 		</div>	
// 	)
// }

/* 
페이지 나누는 법(리액트 사용)
1. 컴포넌트 만들어서 상세 페이지 내용 채움.
2. 누가 /detail 접속하면 그 컴포넌트 보여줌.
*/

/* Single Page Application의 단점
- 컴포넌트 간 state 공유가 어려움.
예) Aboute 컴포넌트에 있던 state는 Card 컴포넌트에서 못 씀.
- App
  - Detail
    - TabContent
	=> 이런 구조에서 App에 있던 shoes state를 TabContent에서 사용하려면 App -> Detail -> TabContent 두 단계를 거쳐 state를 전송해야 함.
- Context API 사용하면 props 전송 없이 state 공유 가능
  - 실무에서는 성능 이슈, 컴포넌트 재활용이 어려워 잘 쓰지 않음.
*/

/* Context API 
셋팅1. createContext()
셋팅2. <Context>로 원하는 컴포넌트 감싸기
셋팅3. value={{ state1, state2, ... }}

state 사용은
1. Context를 import
2. useContext(Context)

Context API 특징
1. state 변경 시(재렌더링 시) 쓸데없는 것까지 재렌더링
=> {stock} 변경 시 stock 안쓰는 것들도 무조건 재렌더링
2. 나중에 컴포넌트 재사용이 어려움.
=> Context API보다는 외부 라이브러리 사용함.
*/

/* 
Tanstack Query(React Query)
- 몇초마다 자동으로 ajax 요청
- ajax 요청 실패시 재시도
- 성공/실패 시 각각 다른 html 보여주기
- ajax 결과 캐싱
 */


export default App;