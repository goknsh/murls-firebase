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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	if (location.pathname === '/dashboard/login.html') {
  		location.pathname = '/dashboard/'
  	}
	var user = firebase.auth().currentUser;
	user.providerData.forEach(function (profile) {
		document.getElementById('userEmail').innerText = profile.email
	});
  } else {
  	if (location.pathname === '/dashboard/') {
    	location.pathname = '/dashboard/login.html'
  	}
  }
});

var app = angular.module("urlEditor", ["firebase"]);
app.controller("urlCtrl", function ($scope, $firebaseArray) {
	var ref = firebase.database().ref().child("urls");
	$scope.urls = $firebaseArray(ref);
	loader('inlineTableLoader','off');
});

function logIn() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		var errorMessage = error.message;
		document.getElementById("error").style.opacity = "1";
		document.getElementById("error").innerText = error.message;
		setTimeout(function () {
			document.getElementById("error").style.opacity = "0";
		}, 5000);
	});
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

function openEditURLModal(urlData) {
	var editURLOldShortURL = urlData.attributes.shorturl.value;
	var editURLLongURL = urlData.attributes.longurl.value;
	openModal('editURL')
	document.getElementById('editing-current-short-url').value = editURLOldShortURL;
	document.getElementById('editing-new-short-url').value = editURLOldShortURL;
	document.getElementById('editing-long-url').value = editURLLongURL;
}

function editURL() {
	var editURLOldShortURL = document.getElementById('editing-current-short-url').value;
	var editURLNewShortURL = document.getElementById('editing-new-short-url').value;
	var editURLLongURL = document.getElementById('editing-long-url').value;
	var shortURLhasSlash = editURLNewShortURL.includes("/");
	var shortURLhasDot = editURLNewShortURL.includes(".");
	var shortURLhasHash = editURLNewShortURL.includes("#");
	var shortURLhasDollar = editURLNewShortURL.includes("$");
	var shortURLhasLeftBrace = editURLNewShortURL.includes("[");
	var shortURLhasRightBrace = editURLNewShortURL.includes("]");
	if (editURLNewShortURL === "" || shortURLhasSlash === true || shortURLhasDot === true || shortURLhasHash === true || shortURLhasDollar === true || shortURLhasLeftBrace === true || shortURLhasRightBrace === true) {
		document.getElementById('editURL-error').style.display = 'block';
		document.getElementById('editURL-error-text').innerText = "Short URLs cannot contain '/' or '.' or '#' or '$' '[' or ']' or be empty. Please fix that and click \"Confirm Edits\" again";
		die();
	}
	else {
		var db = firebase.database().ref("urls/" + editURLNewShortURL);
		db.once("value").then(function (snapshot) {
			var present = snapshot.exists();
			if (editURLOldShortURL === editURLNewShortURL) {
				document.getElementById('editURL-error').style.display = 'none';
				document.getElementById('editURL-error-text').innerText = '';
				var db = firebase.database().ref("urls");
					db.child(editURLOldShortURL).update({
						l: editURLLongURL
					});
				document.getElementById('editURL').style.display = 'none';
				die();
			}
			if (present === true) {
				document.getElementById('editURL-error').style.display = 'block';
				document.getElementById('editURL-error-text').innerText = 'The Short URL ' + editURLNewShortURL + ' already exists, please fix and click "Confirm Edits" again';
				die();
			}
			else {
				document.getElementById('editURL-error').style.display = 'none';
				document.getElementById('editURL-error-text').innerText = '';
				var db = firebase.database().ref("urls");
				var child = db.child(editURLOldShortURL);
				child.once('value', function(snapshot) {
				  db.child(editURLNewShortURL).set(snapshot.val());
				  child.remove();
				});
				document.getElementById('editURL').style.display = 'none';
				die();
			}
		});
	}
}

function deleteURL(urlData) {
	var shortURL = urlData.attributes.shorturl.value;
	var urlInDB = firebase.database().ref("urls/" + shortURL);
	urlInDB.remove().catch(function (error) {
		openModal('error');
		document.getElementById('errorText').innerText = error.message;
	});
}

function addURL() {
	var shortURL = document.getElementById('add-short-url').value;
	var longURL = document.getElementById('add-long-url').value;
	var shortURLhasSlash = shortURL.includes("/");
	var shortURLhasDot = shortURL.includes(".");
	var shortURLhasHash = shortURL.includes("#");
	var shortURLhasDollar = shortURL.includes("$");
	var shortURLhasLeftBrace = shortURL.includes("[");
	var shortURLhasRightBrace = shortURL.includes("]");
	if (shortURLhasSlash === true || shortURLhasDot === true || shortURLhasHash === true || shortURLhasDollar === true || shortURLhasLeftBrace === true || shortURLhasRightBrace === true) {
		alert("Short URLs cannot contain '/' or '.' or '#' or '$' '[' or ']' Please fix that and click submit again")
		die();
	}
	if (shortURL === '') {
		var id = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 5; i++)
		id += possible.charAt(Math.floor(Math.random() * possible.length));
		var db = firebase.database().ref("urls/" + id);
		db.once("value").then(function (snapshot) {
			var present = snapshot.exists();
			if (present === true) {
				addURL();
			}
			else {
				document.getElementById("add-short-url").value = id;
				addURL();
			}
		});
	}
	else {
		var dbCheck = firebase.database().ref("urls/" + shortURL);
		dbCheck.once("value").then(function (snapshot) {
			var present = snapshot.exists();
			if (present === true) {
				alert("The new Short URL already exists. Please fix that and submit again, or edit the Short URL.")
			}
			else {
				var dt = new Date();
				var m = String(dt.getUTCMonth() + 1);
				var d = String(dt.getUTCDate());
				var y = String(dt.getFullYear());
				var date = String(d + "-" + m + "-" + y);
				var db = firebase.database().ref().child("urls");
				db.child(shortURL).set({
					l: longURL,
					td: 0,
					tm: 0,
					th: 0,
					s: 2,
					fe: date
				});
				document.getElementById("add-long-url").value = '';
				document.getElementById("add-short-url").value = '';
			}
		});
	}
}

var count = 0
function openDropdown(type) {
	document.getElementById(type).className += ' open';
	count += 1;
	console.log(count % 2)
	if (count % 2 === 0) {
		closeDropdown(type)
	}
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

function loader(type,status) {
	setTimeout(function(){
		if (status === 'off') {
			document.getElementById(type).style.display = 'none';
		}
		if (status === 'on') {
			document.getElementById(type).style.display = 'static';
	}}, 1000);
}