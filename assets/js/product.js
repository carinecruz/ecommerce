const logOut = document.getElementById('navSession');
const prodDetails = document.getElementById('productDetails');
const orders = document.getElementById('orders');
const cartLink = document.getElementById('cart');

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

		cartLink.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./cart.html" class="text-white font-weight-bold">CART</a>
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

		prodDetails.innerHTML = `
			<p class="mb-2"><h3>${result.name}</h3></p>
			<p class="mb-4">${result.category}</p>
			<p class="mb-2">&#8369; ${result.price}</p>
			<p class="mb-5">${result.description}</p></p>
		`

		let addCart = document.getElementById('addCart');
		let prodQty = document.getElementById('prodQty');

		addCart.addEventListener('click', (e) => {
			e.preventDefault();

			if (prodQty.value == ""){
				prodQty.value = 1;
			}

			let order = {
				productId: productId,
				productName: result.name,
				productQty: prodQty.value,
				productPrice: result.price,
				subTotal: result.price * prodQty.value
			};

			if ( localStorage.getItem('orders') !== null){
				let cart = JSON.parse(localStorage.getItem('orders'));

				if (cart.some(item=>item.productId == order.productId)){
					alert(`Product already in cart.`)
				} else {
					cart.push(order);
					localStorage.setItem('orders', JSON.stringify(cart));
					alert('Order added to cart.');
				}
			//add to local storage if not exists
			} else {
				
				let orderArr = [];
				orderArr.push(order);
				localStorage.setItem('orders', JSON.stringify(orderArr));
				alert('Order added to cart.');
			}

		})

	})