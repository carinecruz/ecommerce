//declarations
let addProduct = document.getElementById('addProduct');
let logOut = document.getElementById('navSession');
const users = document.getElementById('users');
const orders = document.getElementById('orders');

//logout link if user is logged in
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

	if (localStorage.getItem('admin') == "true"){

		users.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./userManagement.html" class="text-white font-weight-bold">USERS</a>
			</li>
			`
		orders.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./orderList.html" class="text-white font-weight-bold">ORDERS</a>
			</li>
			`
		}
}

//create new product listener
addProduct.addEventListener('submit', (e) => {
	e.preventDefault();

	//get values from textboxes
	let prodName = document.getElementById('productName').value;
	let price = document.getElementById('price').value;
	let desc = document.getElementById('description').value;
	let stocks = document.getElementById('stocks').value;
	const category = document.getElementById('category').value;

	//send request to server to add new product
	fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/new-product`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: prodName,
			price: price,
			description: desc,
			stockCount: stocks,
			category: category
		})
	})
	.then(result => result.json())
	.then(result => {
		//console.log(result);
		if (result == true){
			alert(`Product successfully added`);
			window.location.replace(`./main.html`);
		} else {
			alert(result.message);
		}
	})
})



