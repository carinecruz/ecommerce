const logOut = document.getElementById('navSession');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const mobileNo = document.getElementById('mobileNo');
const active = document.getElementById('active');
const admin = document.getElementById('admin');
const activeBtn = document.getElementById('activeBtn');
const adminBtn = document.getElementById('adminBtn');

let params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

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
		//console.log(`hello`)
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/profile/${userId}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(result => {
			
			if (result){
				firstName.innerHTML = result.firstName;
				lastName.innerHTML = result.lastName;
				email.innerHTML = result.email;
				mobileNo.innerHTML = result.mobileNo;
				if (result.isActive == true){
					active.innerHTML = `Yes`;
					activeBtn.innerHTML = `
						<button type="submit" class=" btn btn-danger" id="changeActiveStatus">Deactivate</button>
					`;
				} else {
					active.innerHTML = `No`;
					activeBtn.innerHTML = `
						<button type="submit" class=" btn btn-success" id="changeActiveStatus">Activate</button>
					`
				}

				if (result.isAdmin == true){
					admin.innerHTML = `Yes`;
					adminBtn.innerHTML = `
						<button type="submit" class=" btn btn-danger" id="changeAdminStatus">Demote</button>
					`
				} else {
					admin.innerHTML = `No`;
					adminBtn.innerHTML = `
						<button type="submit" class=" btn btn-success" id="changeAdminStatus">Promote</button>
					`
				}
			}

			//Admin status listener---------------------------------------------------------
			let buttonAdm = document.getElementById('changeAdminStatus');
			buttonAdm.addEventListener('click', (e) => {
				console.log('hello')
				e.preventDefault();
				
				fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/change-user-status/${userId}`, {
					method: "PATCH",
					headers: {
						"Authorization" : `Bearer ${localStorage.getItem('token')}`,
						"Content-Type" : "json/application"
					}
				})
				.then(result => result.json())
				.then(result => {
					
					if (result == true){
						alert(`Administrator status updated.`);
						window.location.replace(`./profile.html?userId=${userId}`);
					} else {
						alert(result.message);
					}
				})
			})


			//Active status listener---------------------------------------------------
			let buttonActive = document.getElementById('changeActiveStatus');
			buttonActive.addEventListener('click', (e) => {
				console.log('here')
				e.preventDefault();
				
				fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/user-access/${userId}`, {
					method: "PATCH",
					headers: {
						"Authorization" : `Bearer ${localStorage.getItem('token')}`,
						"Content-Type" : "json/application"
					}
				})
				.then(result => result.json())
				.then(result => {
					
					if (result == true){
						alert(`Active status updated.`);
						window.location.replace(`./profile.html?userId=${userId}`);
					} else {
						alert(result.message);
					}
				})
			})

		})
	}


} else {
	logOut.innerHTML = `
		<li class="list-unstyled mr-3">
			<a href="./login.html" class="text-white font-weight-bold" id="logInlink">LOG IN</a>
		</li>
	`
}