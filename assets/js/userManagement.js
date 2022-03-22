const logOut = document.getElementById('navSession');
const userList = document.getElementById('userList');
const orders = document.getElementById('orders');

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
		orders.innerHTML = `
			<li class="list-unstyled mr-3">
				<a href="./orderList.html" class="text-white font-weight-bold">ORDERS</a>
			</li>
			`
			
		//console.log(`hello`)
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/all-users`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(result => {
			//console.log(result);
			let count = 1
			if (result){
				result.forEach(user => {
					// list += `
					// 	<p class="d-block"><a href="./profile.html?userId=${user._id}" class="d-inline-block">${user.firstName} ${user.lastName}</a></p>
					// `

					list += `
						<tr>
							<th scope="row">${count}</th>
							<td>${user.firstName}</td>
							<td>${user.lastName}</td>
							<td>${user.email}</td>
							<td>${user.mobileNo}</td>`
					if (user.isAdmin == true){
						list += `<td>Yes</td>`
					} else {
						list += `<td>No</td>`
					}

					if (user.isActive == true){
						list += `<td>Yes</td>`
					} else {
						list += `<td>No</td>`
					}

					list += `
						<td><a href="./profile.html?userId=${user._id}">Details</a></td>
					</tr>`;

					count++
				})
			userList.innerHTML = list;
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