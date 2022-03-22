const logOut = document.getElementById('navSession');
const orders = document.getElementById('orders');
const cart = document.getElementById('cart');
const orderList = document.getElementById('orderList');
const users = document.getElementById('users');

let list = "";


//logout button if user is logged in
if (localStorage.getItem('token') !== null ){

	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="#" class="text-white font-weight-bold" id="logOutlink">LOG OUT</a>
		</li>
	`

	logOut.addEventListener('click', (e) => {
		localStorage.clear();
		window.location.replace('./login.html');
	})

	//user is admin only

	if (localStorage.getItem('admin') === "true"){
		users.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./userManagement.html" class="text-white font-weight-bold">USERS</a>
			</li>
			`
		
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/orders/all-orders`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(result => {
		
			let count = 1
			if (result){
				result.forEach(order => {

					list += `
						<tr>
							<th scope="row">${count}</th>
							<td>${order.orderedBy}</td>
							<td>&#8369;${order.totalAmount.toFixed(2)}</td>
							<td>${order.paymentStatus}</td>
							<td>${order.orderStatus}</td>
							<td>${order.purchasedOn}</td>`

					if (order.orderFulfilled === undefined){
						list+= `<td>---</td>`
					} else {
						list+= `<td>${order.orderFulfilled}</td>`
					}
							
					list += `<td><a href="./order.html?orderId=${order._id}">Details</a></td></tr>`;
					count++
				})
			orderList.innerHTML = list;
			}
		})
	//USER: retrieve own records only	
	} else {

		// User menus --------------------
		orders.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./orderList.html" class="text-white font-weight-bold">ORDERS</a>
			</li>
		`

		cart.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="#" class="text-white font-weight-bold">CART</a>
			</li>
		`

		//Fetch data ------------------------
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/orders/order-history/${localStorage.getItem('id')}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(result => {
		
			let count = 1
			if (result){
				result.forEach(order => {

					list += `
						<tr>
							<th scope="row">${count}</th>
							<td>${order.orderedBy}</td>
							<td>&#8369;${order.totalAmount.toFixed(2)}</td>
							<td>${order.paymentStatus}</td>
							<td>${order.orderStatus}</td>
							<td>${order.purchasedOn}</td>`;

					if (order.orderFulfilled === undefined){
						list+= `<td>---</td>`
					} else {
						list+= `<td>${order.orderFulfilled}</td>`
					}
							
					list += `<td><a href="./order.html?orderId=${order._id}">Details</a></td></tr>`;
					count++
				})
			orderList.innerHTML = list;
			}
		})
	}


} else {
	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./login.html" class="text-white font-weight-bold" id="logInlink">LOG IN</a>
		</li>
	`
}