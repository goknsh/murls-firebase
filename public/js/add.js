var config = {
	apiKey: "AIzaSyDpYpF1pSZ1dysDIrf-rWQO0AR_0Mq47Lw",
	authDomain: "knsh-96607.firebaseapp.com",
	databaseURL: "https://knsh-96607.firebaseio.com",
	projectId: "knsh-96607",
	storageBucket: "knsh-96607.appspot.com",
	messagingSenderId: "176340159206"
};
firebase.initializeApp(config);

authState();

function signIn() {
	loader('yes')
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		loader('bye')
		var errorCode = error.code;
		var errorMessage = error.message;
		document.getElementById("error").style.opacity = "1";
		document.getElementById("error").innerText = error.message;
		setTimeout(function () {
			document.getElementById("error").style.opacity = "0";
		}, 5000);
	});
	setTimeout(function() {
		document.getElementById("email").value = "";
		document.getElementById("password").value = "";
	}, 1000);
};

function authState() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			loader('yes')
			document.getElementById("loggedin").style.display = "block";
			document.getElementById("login").style.display = "none";
			loader('bye')
		} else {
			loader('yes')
			document.getElementById("login").style.display = "flex";
			document.getElementById("loggedin").style.display = "none";
			loader('bye')
		}
	});
};

function loader(s) {
	if (s === 'yes') {
		console.log("on")
		document.getElementById("loader").style.display = "flex";
	}
	if (s === 'bye') {
		console.log("off")
		document.getElementById("loader").style.display = "none";
	}
}

function resetPassword() {
	var user = firebase.auth().currentUser;
	user.providerData.forEach(function (profile) {
		var emailAddress = profile.email;
		firebase.auth().sendPasswordResetEmail(emailAddress);
		document.getElementById("info").innerText = "A link to reset your password has been sent to " + emailAddress;
		setTimeout(function () {
			document.getElementById("info").innerText = "";
		}, 5000);
	});
}

function tour() {
	introJs().start();
}

function signOut() {
	loader('yes')
	firebase.auth().signOut()
	loader('bye')
}

function rollDice() {
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 5; i++)
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	var db = firebase.database().ref("urls/" + id);
	db.once("value")
		.then(function (snapshot) {
			var present = snapshot.exists();
			if (present === true) {
				rollDice();
			} else {
				document.getElementById("short-url").value = id;
			}
		});
}

function add() {
	var shortURL = document.getElementById("short-url").value;
	var shortURLhasSlash = shortURL.includes("/")
	var shortURLhasDot = shortURL.includes(".")
	var shortURLhasHash = shortURL.includes("#")
	var shortURLhasDollar = shortURL.includes("$")
	var shortURLhasLeftBrace = shortURL.includes("[")
	var shortURLhasRightBrace = shortURL.includes("]")
	var longURL = document.getElementById("long-url").value;
	if (shortURLhasSlash === true || shortURLhasDot === true || shortURLhasHash === true || shortURLhasDollar === true || shortURLhasLeftBrace === true || shortURLhasRightBrace === true) {
		alert("Currently, Short URLs cannot contain '/' or '.' or '#' or '$' '[' or ']' Please fix that and click submit again")
		die();
	} else {
		var longURL = document.getElementById("long-url").value;
		var shortURL = document.getElementById("short-url").value;
		var db = firebase.database().ref().child("urls");
		db.child(shortURL).set({
			l: longURL,
			h: 0,
			d: 0,
			m: 0,
			s: 2
		});
		document.getElementById("long-url").value = '';
		document.getElementById("short-url").value = '';
	}
}

var app = angular.module("urlEditor", ["firebase"]);
app.controller("urlCtrl", function ($scope, $firebaseArray) {
	var ref = firebase.database().ref().child("urls");
	$scope.urls = $firebaseArray(ref);
});

document.addEventListener("click", function (e) {
	console.log(e.target.classList)
	if (e.target.classList.contains("edit")) {
		var number = Array.from(document.getElementsByClassName("edit")).indexOf(e.target);
		console.log(number)
		var shortURLedit = document.getElementsByClassName("shortURL")[number].value;
		var longURLedit = document.getElementsByClassName("longURL")[number].value;
		window.hits = document.getElementsByClassName("hits")[number].value;
		window.desktop = document.getElementsByClassName("desktop")[number].value;
		window.mobile = document.getElementsByClassName("mobile")[number].value;
		document.getElementById("shortURLold").value = shortURLedit;
		document.getElementById("longURLedit").value = longURLedit;
		document.getElementById("shortURLnew").value = "";
	}
});
document.addEventListener("click", function (e) {
	console.log(e.target.classList)
	if (e.target.classList.contains("stats")) {
		var number = Array.from(document.getElementsByClassName("stats")).indexOf(e.target);
		console.log(number)
	}
});

function saveEdit() {
	var shortOld = document.getElementById("shortURLold").value;
	var shortNew = document.getElementById("shortURLnew").value;
	var longEdited = document.getElementById("longURLedit").value;
	var shortURLhasSlash = shortNew.includes("/")
	var shortURLhasDot = shortNew.includes(".")
	var shortURLhasHash = shortNew.includes("#")
	var shortURLhasDollar = shortNew.includes("$")
	var shortURLhasLeftBrace = shortNew.includes("[")
	var shortURLhasRightBrace = shortNew.includes("]")
	if (shortOld === shortNew) {
		var db = firebase.database().ref().child("urls");
		hits = Number(hits);
		desktop = Number(desktop);
		mobile = Number(mobile);
		db.child(shortNew).set({
			l: longEdited,
			h: hits,
			d: desktop,
			m: mobile,
			s: 2
		});
	}
	if (shortOld !== shortNew) {
		if (shortURLhasSlash === true || shortURLhasDot === true || shortURLhasHash === true || shortURLhasDollar === true || shortURLhasLeftBrace === true || shortURLhasRightBrace === true) {
			alert("Currently, Short URLs cannot contain '/' or '.' or '#' or '$' '[' or ']' Please fix that and click submit again")
		}
		var dbCheck = firebase.database().ref("urls/" + shortNew);
		dbCheck.once("value")
		.then(function (snapshot) {
			window.presentEdit = snapshot.exists();
			if (presentEdit === true) {
				alert("The new Short URL already exists. Please fix that and submit again.")
			}
			else {
				var db = firebase.database().ref().child("urls");
				hits = Number(hits);
				desktop = Number(desktop);
				mobile = Number(mobile);
				db.child(shortOld).remove()
				db.child(shortNew).set({
					l: longEdited,
					h: hits,
					d: desktop,
					m: mobile,
					s: 2
				});
			}
		})
	}
}

function pswrdDivChange(x) {
	if (x === "focus") {
		document.getElementById("password-div").style.borderBottom = "1px solid #FA8BFF"
	} if (x === "blur") {
		document.getElementById("password-div").style.borderBottom = "1px solid #a0a0a0"
	}
}

function forgotPassword(d) {
	if (d === "start") {
		loader('yes')
		document.getElementById("loginForm").style.display = "none";
		document.getElementById("forgotSubmit").style.display = "block";
		loader('bye')
	}
	if (d === "resetForm") {
		loader('yes')
		document.getElementById("loginForm").style.display = "block";
		document.getElementById("forgotSubmit").style.display = "none";
		loader('bye')
	}
	if (d === "reset") {
		loader('yes')
		var emailAddress = document.getElementById("emailForgot").value;
		var emailAddress2 = document.getElementById("emailForgot2").value;
		if (emailAddress !== emailAddress2) {
			document.getElementById("sent").innerText = "Both emails do not match. Please resubmit the form after correcting the mistake."
			document.getElementById("sent").style.opacity = "1"
			setTimeout(function() {
				document.getElementById("sent").style.opacity = "0"
			}, 5000);
		}
		if (emailAddress = emailAddress2) {
			firebase.auth().sendPasswordResetEmail(emailAddress).catch(function (error) {
				var errorMessage = error.message;
				document.getElementById("sent").innerText = errorMessage;
				document.getElementById("sent").style.opacity = "1"
				setTimeout(function() {
					document.getElementById("sent").style.opacity = "0"
				}, 5000);
			});
			document.getElementById("sent").innerText = "An email was sent to " + emailAddress + " containing a password reset link."
			document.getElementById("sent").style.opacity = "1"
			setTimeout(function() {
				document.getElementById("sent").style.opacity = "0"
			}, 5000);
		}
		loader('bye')
	}
}

function showStats(e) {
		if (e.target.classList.contains("edit")) {
			var number = Array.from(document.getElementsByClassName("edit")).indexOf(e.target);
			var shortURLedit = document.getElementsByClassName("shortURL")[number].value;
			var longURLedit = document.getElementsByClassName("longURL")[number].value;
			window.hits = document.getElementsByClassName("hits")[number].value;
			window.desktop = document.getElementsByClassName("desktop")[number].value;
			window.mobile = document.getElementsByClassName("mobile")[number].value;
			document.getElementById("shortURLold").value = shortURLedit;
			document.getElementById("longURLedit").value = longURLedit;
			document.getElementById("shortURLnew").value = "";
		}
}