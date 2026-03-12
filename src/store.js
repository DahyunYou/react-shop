import { configureStore, createSlice } from "@reduxjs/toolkit"
import user from './store/userSlice.js'

// Redux store에 state 보관하는 법 => userSlice.js파일로 이동
// let user = createSlice({ // useState() 역할
// 	name : 'user',
// 	initialState : { name : 'kim', age : 20 }, // 문자 하나만 필요해도 일부러 {} object 자료 안에 담기도 함.(수정 편리)
// 	// initialState : { name : 'kim', age : 20 } -> state가 array/object인 경우

// 	/* Redux state 변경하는 법
// 	1. state 수정해주는 함수 만들기
// 	2. 원할 때 그 함수를 실행해달라고 store.js에 요청(만든 함수 export)
// 	3. 만든 함수 import해서 사용
// 	4. dispatch(state변경함수())

// 	복잡하지만 사이즈가 커지면 버그를 방지할 수 있음.
// 	*/
// 	reducers : {
// 		//함수
// 		// 괄호 안은 기존 state를 뜻함
// 		changeName(state){
// 			// return { name : 'park', age : 20 }
// 			// state가 array/object의 경우 직접 수정해도 state가 변경됨.(Immer.js가 자동으로 설치가 되어서 작동 됨.)
// 			state.name = 'park'
// 		},
// 		// 버튼을 눌렀을 때 +1되는 함수
// 		increase(state, action){ // state 변경함수에 파라미터를 넣을 수 있음(비슷한 함수 여러개 필요 없음), state변경함수를 action이라고 함.
// 			state.age += action.payload //payload(뜻: 화물, 소포)를 써야 파라미터에 입력했던 숫자가 a의 자리에 들어옴
// 		},
// 		// changeName(state){
// 		// 	return 'john kim' // 또는 return 'john + state
// 		// },
// 		// 함수 여러개 만들 수 있음.
// 	}
// })

/*
let 작명 = createSlice({
	name : 'state이름',
	initialState : 'state값'
})
*/

let stock = createSlice({ // useState() 역할
	name : 'stock',
	initialState : [10, 11, 12]
})

let cart = createSlice({
	name : 'cart',
	initialState : [
		{id : 0, name : 'White and Black', count : 2},
		{id : 2, name : 'Grey Yordan', count : 1}
	],
	reducers : {
		addCount(state, action){
			// findIndex -> array에서 원하는거 몇번째 있나 찾아주는 함수
			let num = state.findIndex((a)=>{ return a.id == action.payload }) // 파라미터 a는 array안에 있던 하나하나의 데이터, return 뒤에는 어떤 항목을 찾을지 찾을 조건 입력
			// a.id == action.payload -> 일치하면 몇번째에 있는지 남겨줌.
			state[num].count++
		},
		// Detail.js의 주문하기 버튼 누르면 state에 상품 추가
		addItem(state, action) {
			// state.push({id : 1, name : 'Red Knit', count : 1}) // array 뒤에 자료 추가해주는 함수
			state.push(action.payload)
		}
	}
})

// 상품이 기존 state에 추가됨.
// addItem({id : 1, name : 'Red Knit', count : 1})

export let { addCount, addItem } = cart.actions

export default configureStore({
	reducer: {
		// state 등록
		// 작명 : user.reducer(위에서 만든 state)
		user : user.reducer, // 위에서 만든 state
		stock : stock.reducer,
		cart : cart.reducer,
	}
})

/*
셋팅1. stroe.js 파일 생성, 코트 셋팅
셋팅2. index.js 가서 <Provider store={store}> 쓰기

Redux 사용하는 이유
- 컴포넌트 간 state 공유가 편해짐(props 전송이 아예 필요 없어짐)
*/