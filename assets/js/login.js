
const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (e) => {

	e.preventDefault() //prevents browser refresh upon clicking the button

	//get the input of user
	let email = document.getElementById('email').value;
	let pw = document.getElementById('password').value;

		//send the request (including user input) to the server
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: pw
			})
		})


		//wait for the server's response (with token)
		.then(result => result.json()) //parse back to js
		.then(result => {
			//console.log(result)

			if (result.message === undefined){
				//once token is received, store it in the local storage

				localStorage.setItem('token', result.token);

				//request for user information & store admin id in the local storage
				let myToken = localStorage.getItem('token');
				fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/my-profile`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${myToken}`
						}
				})
				//wait for server's response
				.then(result => result.json())
				.then(result => {
					//console.log(result)

					//store id & isAdmin to local storage
					localStorage.setItem('id', result._id);
					localStorage.setItem('admin', result.isAdmin);
					localStorage.setItem('firstName', result.firstName);
					localStorage.setItem('lastName', result.lastName);

					alert('Login successfully.');

					window.location.replace('./main.html');

				})
			} else {
				alert(result.message);
			}
		})
	
})