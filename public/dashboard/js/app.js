var config = {
	apiKey: "AIzaSyBRg_Ecb-F5jkGFof32ZrIRyG6YcxlKoj4",
	authDomain: "murlsfire.firebaseapp.com",
	databaseURL: "https://murlsfire.firebaseio.com",
	projectId: "murlsfire",
	storageBucket: "murlsfire.appspot.com",
	messagingSenderId: "976393061586"
};
firebase.initializeApp(config);

window.projectid = config.projectId;

authState();

function authState() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			if (window.location.pathname === '/dashboard/login.html') {
				window.location.pathname = '../dashboard/'
			}
			var user = firebase.auth().currentUser;
			user.providerData.forEach(function (profile) {
				document.getElementById("userEmail").innerText = profile.email;
			});
		} else {
			if (window.location.pathname === '/dashboard/') {
				window.location.pathname = '../dashboard/login.html'
			}
		}
	});
};

function logIn() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(error.message)
		document.getElementById("error").style.opacity = "1";
		document.getElementById("error").innerText = error.message;
		setTimeout(function () {
			document.getElementById("error").style.opacity = "0";
		}, 5000);
	});
	authState();
}

function logOut() {
	firebase.auth().signOut();
	authState();
}

function resetPassword() {
	var user = firebase.auth().currentUser;
	user.providerData.forEach(function (profile) {
		var emailAddress = profile.email;
		firebase.auth().sendPasswordResetEmail(emailAddress).catch(function (error) {
			openModal('resetPassword')
			document.getElementById("resetPasswordText").innerText = error.message + " Please refresh and try again.";
		});
		openModal('resetPassword')
		document.getElementById("resetPasswordText").innerText = "A link to reset your password has been sent to " + emailAddress;
	});
	closeDropdown('accountSettings')
}

function openDropdown(type) {
	document.getElementById(type).className += ' open';
}

function closeDropdown(type) {
	document.getElementById(type).classList.remove('open');
}

function openModal(type) {
	document.getElementById(type).style.display = 'block';
}

function closeModal(type) {
	type = type.replace(/Close/g, '');
	document.getElementById(type).style.display = 'none';
}