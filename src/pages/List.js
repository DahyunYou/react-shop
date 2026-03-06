function List(props) {
	// <div className='col-md-4' key={0}>
	// 	<img src='https://codingapple1.github.io/shop/shoes2.jpg' width='80%'/>
	// 	<h4>{shoes[1].title}</h4>
	// 	<p>{shoes[1].price}</p>
	// </div>
	// console.log(props.shoes[0].url)

	return (		
		// props.shoes.map(function(a, i) {
		// 	return (
		// 		<div className='col-md-4' key={i}>
		// 			<img src={props.shoes.url} width='80%' />
		// 			<h4>{props.shoes.title}</h4>
		// 			<p>{props.shoes.price}</p>
		// 		</div>
		// 	)
		// })
		<div className='col-md-4' >
			{/* <img src={props.shoes.url} width='80%' /> */}
			<img src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width='80%' />
			<h4>{props.shoes.title}</h4>
			<p>{props.shoes.price}</p>
		</div>	
	)
}

export default List;