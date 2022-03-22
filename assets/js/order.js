const logOut = document.getElementById('navSession');
const orderDetails = document.getElementById('orderDetails');
const users = document.getElementById('users');
const orders = document.getElementById('orders');

let params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");


//if user is logged in only
if (localStorage.getItem('token') !== null ){

	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="#" class="text-white font-weight-bold" id="logOutlink">LOG OUT</a>
		</li>
	`

	orders.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./orderList.html" class="text-white font-weight-bold">ORDERS</a>
		</li>
		`

	logOut.addEventListener('click', (e) => {
		localStorage.clear();
		window.location.replace('./login.html');
	})

	fetch(`https://tranquil-refuge-66470.herokuapp.com/api/orders/order/${orderId}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(result => result.json())
	.then(result => {
		let order = `
			<tr>
				<td colspan="2"><center><h4>Order Details</h4></center></td>
			</tr>
			<tr>
				<td><strong>Ordered By:</strong></td>
				<td><a href="./profile.html?userId=${result.orderedById}">${result.orderedBy}</a></td>
			</tr>
			<tr>
				<td><strong>Order Status:</strong></td>
				<td>${result.orderStatus}</td>
			</tr>
			<tr>
				<td><strong>Payment Status:</strong></td>
				<td>${result.paymentStatus}</td>
			</tr>
			<tr>
				<td><strong>Order Complete Date:</strong></td>`

		if (result.orderFulfilled === undefined){
			order += `<td>---</td></tr>`
		} else {
			order += `<td>${result.orderFulfilled}</td></tr>`
		}

		order += `<tr><td colspan="2"><center><h5>Items:</h5></center></td></tr>`
				   
		result.orderItems.forEach(product => {
			order += `<tr><td><strong>Product Name:</strong></td>`
			if(localStorage.getItem('admin') == "false"){
				order+=	`<td><a href="./product.html?productId=${product._id}">${product.productName}</a></td>`
			} else {
				order+=	`<td><a href="./updateProduct.html?productId=${product.productId}">${product.productName}</a></td>`
			} 
			order+= `</tr>
			<tr>
				<td><strong>Quantity:</strong></td>
				<td>${product.productQty}</td>
			</tr>
			<tr>
				<td><strong>Price:</strong></td>
				<td>${product.productPrice}</td>
			</tr>
			<tr>
				<td><strong>Subtotal:</strong></td>
				<td>${product.subTotal}</td>
			</tr>
			<tr>
				<td colspan="2"></td>
			</tr>
			`
		} )

		order += `
			<tr>
				<td colspan="2"><center><h5>Totals</h5></center></td>
			</tr>
			<tr>
				<td><strong>Total Amount</strong></td>
				<td>${result.totalAmount}</td>
			</tr>`
		
	orderDetails.innerHTML = order;
	})

	if (localStorage.getItem('admin') == "true"){
		users.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./userManagement.html" class="text-white font-weight-bold">USERS</a>
			</li>
			`
	}

} else {
	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./login.html" class="text-white font-weight-bold" id="logInlink">LOG IN</a>
		</li>
	`
}