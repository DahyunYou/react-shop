import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, increase } from './../store/userSlice.js'
import { addCount } from './../store.js'

function Cart(){

	// store에 있던 state를 가져와 주는 함수
	let data = useSelector((state) => {return state}) // Redux store의 state 꺼내는 법
	// console.log(data.cart[0].name)

	let dispatch = useDispatch() // store.js한테 요청을 보내주는 함수

	/* ((state) => {return state}) 여기에서 state는 store 안에 있던 모든 state
	((state) => {return state.user}) 라고 쓰면 state 항목 중에 user라는 항목만 가져옴

	((state) => {return state.stock})와 ((state) => state.stock)은 같은 것. 중괄호와 return은 생략 가능
	*/
	return (
		<div>
			{data.user.name} {data.user.age} 의 장바구니
			<button onClick={()=>{ dispatch(increase(100)) }}>버튼</button>

			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						{/* <th>{cartDate[0].name}</th> */}
						<th>수량</th>
						<th>변경하기</th>
					</tr>
				</thead>
				<tbody>
					{
						data.cart.map((item, i)=>(
							<tr key={i}>
								<td>{data.cart[i].id}</td>
								<td>{data.cart[i].name}</td>
								<td>{data.cart[i].count}</td>
								<td>
									<button onClick={()=>{
										dispatch(addCount(data.cart[i].id))
									}}>+</button>
								</td>
							</tr>
						))

						
					}
					{/* <tr>
						<td>1</td>
						<td>안녕</td>
						<td>안녕</td>
						<td>
							<button onClick={()=>{
								// 버튼을 눌렀을 때 john kim으로 변경하려면?
								// dispatch(changeName())
							}}>+</button>
						</td>
					</tr> */}
				</tbody>
			</Table> 
		</div>
	)
}

export default Cart

/* Redux 사용하면 컴포넌트들이 props 없이 state 공유 가능
redux store.js 안에 state1, state2, ... 보관
사이즈가 큰 프로젝트를 하는 회사들의 경우 Redux 사용

- 간단한 코드같은 경우 Redux보다 props 쓰는게 쉬움.
- 특정 컴포넌트 안에서만 사용할 경우 굳이 store에 저장했다가 뺄 필요 없이 그냥 useState() 써도 됨.
*/