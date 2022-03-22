const logOut = document.getElementById('navSession');
const orderDetails = document.getElementById('orderDetails');
const empty = document.getElementById('empty');
const orders = document.getElementById('orders');
const checkout = document.getElementById('checkout')

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

	let cart = JSON.parse(localStorage.getItem('orders'));
	let order ="";
	let total = 0;

	cart.forEach(product =>{
		total += product.subTotal;
		order += `
			<tr>
				<td><strong>Product Name:</strong></td>
				<td><a href="./product.html?productId=${product._id}">${product.productName}</a></td>
			</tr>
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
	})

	order += `
		<tr>
			<td colspan="2"><center><h5>Totals</h5></center></td>
		</tr>
		<tr>
			<td><strong>Total Amount</strong></td>
			<td>${total}</td>
		</tr>`

	orderDetails.innerHTML = order;

	//Event listener for empty cart-----------------------------
	empty.addEventListener('click', (e) => {
		localStorage.removeItem('orders');
		alert('Cart is empty');
	})

	//Event listener for checkout -------------------------------
	checkout.addEventListener('click', (e) => {
		e.preventDefault();
		
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/orders/create-order`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				totalAmount: total,
				orderItems: cart
			})
		})
		//.then(result => console.log(result))
		.then(result => result.json())
		.then(result => {
			if(result){
				localStorage.removeItem('orders');
				alert('Items successfully checked out.')
				window.location.replace(`./order.html?orderId=${result._id}`);
			} else {
				alert(result.message)
			}
		})

	})

} else {
	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./login.html" class="text-white font-weight-bold" id="logInlink">LOG IN</a>
		</li>
	`
}