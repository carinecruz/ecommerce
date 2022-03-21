// target the elements
const registerForm = document.getElementById('register');

// element.addEventListener("event", () => {})
registerForm.addEventListener("submit", (e) => {
	e.preventDefault()	//prevent from refereshing the browser

	// get the values of the input fields
	const fn = document.getElementById('firstname').value;
	const ln = document.getElementById('lastname').value;
	const email = document.getElementById('email').value;
	const pw = document.getElementById('password').value;
	const cpw = document.getElementById('cpw').value;
	const mn = document.getElementById('mobileNo').value;


	//condition pw should match confirm pw
	if(pw === cpw){

		// send the request to the server
			// fetch(URL, {options})
		fetch(`https://tranquil-refuge-66470.herokuapp.com/api/users/user-registration`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName: fn,
				lastName: ln,
				email: email,
				password: pw,
				mobileNo: mn
			})
		})
		.then( result => result.json())
		.then(result => {
			// console.log(result)	//boolean
			if(result == true){
				alert('User successfully registered!')

				window.location.replace('./login.html')

			} else {
				alert(result.message);
			}
		})

	}
})
