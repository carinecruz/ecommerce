const isAdmin = localStorage.getItem('admin');
const greeting = document.getElementById('greeting');
const logOut = document.getElementById('navSession');
const orders = document.getElementById('orders');
const cart = document.getElementById('cart');
const activeProducts = document.getElementById('activeProducts');
const adLabel = document.getElementById('adminLabel');
const inactiveProducts = document.getElementById('inactiveProducts');

let productList = "";


if (localStorage.getItem('token') !== null ){
	
	greeting.innerHTML = `Welcome, ${localStorage.getItem('firstName')}!`;

	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="#" class="text-white font-weight-bold" id="logOutlink">LOG OUT</a>
		</li>
	`

	logOut.addEventListener('click', (e) => {
		localStorage.clear();
		window.location.replace('./login.html');
	})
} else {
	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./login.html" class="text-white font-weight-bold" id="logInlink">LOG IN</a>
		</li>
	`
}

// --------- Retrieve List of Active Products ------------
// non-admin
if (isAdmin !== "true"){

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

	fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(result => result.json())
	.then(result => {
		//console.log(result)
		result.forEach(product => {
			productList += `
				<div class="col-12 col-md-4 my-2 my-2">
					<div class="card" style="width: 18rem">
						<div class="card-body text-center">
							<img src="../images/product1.jpg" alt="${product.name}" class="img-fluid">
							<p class="card-title font-weight-bold">${product.name}</p>
							<p class="card-text">&#8369; ${product.price.toFixed(2)}</p>
							<a class="btn btn-dark" href="./product.html?productId=${product._id}">Learn more</a>
						</div>
					</div>
				</div>
			`
		})

		//console.log(activeProducts);

		activeProducts.innerHTML = productList;
	})


// --------- Retrieve List of ALL Products ------------
} else {

	let adminDash = document.getElementById('adminDashboard')
	adminDash.innerHTML = `
		<a class="btn btn-dark" href="./userManagement.html">Users</a>
		<a class="btn btn-dark" href="./orderList.html">Orders</a>
		<a class="btn btn-info" href="./newProduct.html">Add new product</a>
	`

	fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/all-products`, {
	//fetch(`http://localhost:3008/api/products/all-products`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(result => result.json())
	.then(result => {
		
		let inactiveProdList = ""
		result.forEach(product => {
			if (product.isActive == true){
				productList += `
					<div class="col-12 col-md-4 my-2 my-2">
						<div class="card" style="width: 18rem">
							<div class="card-body text-center">
								<img src="../images/product1.jpg" alt="${product.name}" class="img-fluid">
								<p class="card-title font-weight-bold">${product.name}</p>
								<p class="card-text">&#8369; ${product.price.toFixed(2)}</p>
								<p class="card-text">${product.quantitySold} pieces sold</p>
								<a class="btn btn-dark" href="./updateProduct.html?productId=${product._id}">Update product</a>
							</div>
						</div>
					</div>
				`
				// <button class="btn btn-danger mt-1" name="active" value="${product._id}">Remove product</button> 

			} else if (product.isActive == false){
				inactiveProdList += `
					<div class="col-12 col-md-4 my-2 my-2">
						<div class="card" style="width: 18rem">
							<div class="card-body text-center">
								<img src="../images/product1.jpg" alt="${product.name}" class="img-fluid">
								<p class="card-title font-weight-bold">${product.name}</p>
								<p class="card-text">&#8369; ${product.price.toFixed(2)}</p>
								<p class="card-text">${product.quantitySold} pieces sold</p>
								<a class="btn btn-dark" href="./updateProduct.html?productId=${product._id}">Update product</a>
							</div>
						</div>
					</div>
				`
				//<button class="btn btn-success mt-1" name="inactive" value="${product._id}">Display product</button> 

			}
		})

		activeProducts.innerHTML = productList;
		adLabel.innerHTML = `<center><h3 class="text-center">Browse inactive products</h3></center>`
		inactiveProducts.innerHTML = inactiveProdList;

		// listener for archive/unarchive products ----------------------
		// let removeProduct = document.getElementsByName('active');
		// console.log(removeProduct);

		// removeProduct.addEventListener('click', (e) => {
		// 	alert(removeProduct.value)
		//})

	})

}

