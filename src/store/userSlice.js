import { createSlice } from "@reduxjs/toolkit"
// store/userSlice.js 여기에 slice 보관

// Redux store에 state 보관하는 법
let user = createSlice({ // useState() 역할
	name : 'user',
	initialState : { name : 'kim', age : 20 }, // 문자 하나만 필요해도 일부러 {} object 자료 안에 담기도 함.(수정 편리)
	// initialState : { name : 'kim', age : 20 } -> state가 array/object인 경우

	/* Redux state 변경하는 법
	1. state 수정해주는 함수 만들기
	2. 원할 때 그 함수를 실행해달라고 store.js에 요청(만든 함수 export)
	3. 만든 함수 import해서 사용
	4. dispatch(state변경함수())

	복잡하지만 사이즈가 커지면 버그를 방지할 수 있음.
	*/
	reducers : {
		//함수
		// 괄호 안은 기존 state를 뜻함
		changeName(state){
			// return { name : 'park', age : 20 }
			// state가 array/object의 경우 직접 수정해도 state가 변경됨.(Immer.js가 자동으로 설치가 되어서 작동 됨.)
			state.name = 'park'
		},
		// 버튼을 눌렀을 때 +1되는 함수
		increase(state, action){ // state 변경함수에 파라미터를 넣을 수 있음(비슷한 함수 여러개 필요 없음), state변경함수를 action이라고 함.
			state.age += action.payload //payload(뜻: 화물, 소포)를 써야 파라미터에 입력했던 숫자가 a의 자리에 들어옴
		},
		// changeName(state){
		// 	return 'john kim' // 또는 return 'john + state
		// },
		// 함수 여러개 만들 수 있음.
	}
})

// 위에 있던 함수들(state 변경함수들)이 object 자료형으로 남음
export let { changeName, increase } = user.actions // 오른쪽 자료를 변수로 빼는 문법

export default user