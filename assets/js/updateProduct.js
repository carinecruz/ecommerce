//declarations
let logOut = document.getElementById('navSession');
const users = document.getElementById('users');
const orders = document.getElementById('orders');

let params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

let pName = document.getElementById('productName');
let pDesc = document.getElementById('description');
let pPrice = document.getElementById('price');
let pStocks = document.getElementById('stocks');
let pQtySold = document.getElementById('qtySold');
let pStatus = document.getElementById('prodStatus');
let pCategory = document.getElementById('category');
let statusBtn = document.getElementById('statusBtn'); 
let updateProduct = document.getElementById('updateProduct');

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

//populate update page with product values
fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/product/${productId}`, {
	method: "GET",
	headers: {
		"Authorization": `Bearer ${localStorage.getItem('token')}`
	}
})
.then(result => result.json())
.then(result => {
	
	pName.value = result.name;
	pDesc.value = result.description;
	pPrice.value = result.price;
	pStocks.value = result.stockCount;
	pCategory.value = result.category;
	pQtySold.innerHTML = result.quantitySold;
	if (result.isActive == true){
		pStatus.innerHTML = "Offered";
		statusBtn.innerHTML = `<button type="submit" class=" btn btn-danger ml-5" id="changeStatus">Deactivate</button>`;
	} else {
		pStatus.innerHTML = "Not Offered";
		statusBtn.innerHTML = `<button type="submit" class=" btn btn-success ml-5" id="changeStatus">Activate</button>`
	}

	let button = document.getElementById('changeStatus');
	button.addEventListener('click', (e) => {
		e.preventDefault();
		
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/active-status/${productId}`, {
			method: "PATCH",
			headers: {
				"Authorization" : `Bearer ${localStorage.getItem('token')}`,
				"Content-Type" : "json/application"
			}
		})
		.then(result => result.json())
		.then(result => {
			
			if (result == true){
				alert(`Product status updated.`);
				window.location.replace(`./updateProduct.html?productId=${productId}`);
			} else {
				alert(result.message);
			}
		})
	})
})

updateProduct.addEventListener('submit', (e) => {
	
	e.preventDefault();

	fetch(`https://tranquil-refuge-66470.herokuapp.com/api/products/update/${productId}`, {
		method: "PUT",
		headers: {
			"Authorization" : `Bearer ${localStorage.getItem('token')}`,
			"Content-Type" : "application/json"
		},
		body: JSON.stringify({
			name: pName.value,
			description: pDesc.value,
			price: Number(pPrice.value),
			stockCount: pStocks.value,
			category: pCategory.value
		})
	})
	.then(result => result.json())
	.then(result => {
		
		if (result == true){
			alert(`Product successfully updated.`);
		} else {
			alert(result.message);
		}
		
	})
})	

