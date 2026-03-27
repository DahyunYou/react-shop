import { useState, useTransition, useDeferredValue } from "react";

let a = new Array(10000).fill(0)

function Test() {
	let [name, setName] = useState("");
	// startTransition은 함수, isPending은 startTransition이 처리 중일 때 true로 변함.
	let [isPending, startTransition] = useTransition()
	let state = useDeferredValue(name) //(state)가 변동사항이 생기면 늦게 처리해줌.
	return (
		<div className="test">
			{/* 타이핑을 할 때마다 setName(e.target.value) 이게 지연의 원인 */}
			<input onChange={(e)=>{
				startTransition(()=>{
					setName(e.target.value) 
				})
			}}/>
			{
				isPending ? '로딩중' :
				a.map(()=>{
					return <div>{state}</div>
				})
			}
		</div>
	)
}


export default Test;

/* 
1. batch 기능
state1변경()
state2변경()
state3변경()
-> 최신 리액트 18버전 이후부터는 state변경 재렌더링이 연달아 여러번 있으면 맨 마지막 state변경만 재렌더링 실행 1회 진행함.
-> 리액트 17버전에서는 ajax, setTimeout 내부라면 모든 state변경 재렌더링 실행.(리액트 18버전 이후부터는 X)

2. useTransition으로 느린 컴포넌트 성능 향상 가능(카드 빚 돌려막기 식)
- startTransition으로 문제의 state변경 감싸기.
- 동작 원리: 브라우저는 한번의 하나만 실행할 수 있는데, 브라우저가 할 일 1. a를 <input>에 보여주기, 2. <div>X10000개 만들기 => 이런걸 동시에 하려니까 버벅임.
startTransitiond 안에 있는 코드의 시작을 다른 중요한 작업들을 먼저 하고 뒤로 늦춰 줌.

3. useDeferredValue 써도 느린 컴포넌트 성능 향상 가능
*/