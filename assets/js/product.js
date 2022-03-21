const logOut = document.getElementById('navSession');
const prodDetails = document.getElementById('productDetails');
const orders = document.getElementById('orders');
const cart = document.getElementById('cart');

let params = new URLSearchParams(window.location.search);
const productId = params.get("productId");


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

	if (localStorage.getItem('admin') == "false"){
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
	}
} else {
	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./login.html" class="text-white font-weight-bold" id="logInlink">LOG IN</a>
		</li>
	`
}

//------ retrieve product-------------
	fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/product/${productId}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(result => result.json())
	.then(result => {
		//pconsole.log(result)

		prodDetails.innerHTML = `
			<p class="mb-2"><strong>Product Name:</strong> ${result.name}</p>
			<p class="mb-4"><strong>Price:</strong> &#8369; ${result.price}</p>
			<p class="mb-5"><strong>Description:</strong> ${result.description}</p></p>
			<label><strong>Quantity:</strong> <input type="number" id="prodQty" required placeholder="1" class="w-25" min="1">
			<div class="mt-5">
				<button type="submit" class="btn btn-danger">Add to cart</button>
				<button type="submit" class="btn btn-dark">View cart</button>
				<a class="btn btn-dark" href="./main.html">Back to list</a>
			</div>
		`
	})