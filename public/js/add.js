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
	setTimeout(function () {
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
		var dbCheck = firebase.database().ref("urls/" + shortURL);
		dbCheck.once("value")
			.then(function (snapshot) {
				window.present = snapshot.exists();
				if (present === true) {
					alert("The new Short URL already exists. Please fix that and submit again, or edit the Short URL.")
				} else {
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
					document.getElementById("long-url").value = '';
					document.getElementById("short-url").value = '';
				}
			});
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
		console.log("edit")
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
	if (e.target.classList.contains("stats")) {
		// loader('yes')
		var number = Array.from(document.getElementsByClassName("stats")).indexOf(e.target);
		var shortURLdata = document.getElementsByClassName("shortURLdata")
		var shortURL = document.getElementsByClassName("shortURL")[number].value;
		for (var i = 0; i < shortURLdata.length; i++) {
			shortURLdata[i].innerText = shortURL;
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var responses = JSON.parse(this.responseText);
				var startDate = responses.fe;
				startDate = startDate.replace(/-/g, "/")
				startDate = startDate.split("/")
				startDate = startDate[1] + "/" + startDate[0] + "/" + startDate[2]
				var endDate = responses.le.le;
				endDate = endDate.replace(/-/g, "/")
				endDate = endDate.split("/")
				endDate = endDate[1] + "/" + endDate[0] + "/" + endDate[2]
				var start = new Date('"' + startDate + '"');
				var end = new Date('"' + endDate + '"');
				var newend = end.setDate(end.getDate() + 1);
				var end = new Date(newend);
				var platforms = responses.p;
				platforms = JSON.stringify(platforms)
				platforms = platforms.split(',')
				var numberOfPlatforms = platforms.length;
				var replaceNum;
				window.platformLabels = []
				window.platformNumbers = []
				console.log(referrer)
				for (replaceNum = 0; replaceNum < numberOfPlatforms; replaceNum++) {
					platforms[replaceNum] = platforms[replaceNum].replace(/{"/g, "")
					platforms[replaceNum] = platforms[replaceNum].replace(/"/g, '')
					platforms[replaceNum] = platforms[replaceNum].replace(/}/g, '')
					platforms[replaceNum] = platforms[replaceNum].split(":")
					platformLabels.push(platforms[replaceNum][0])
					platformNumbers.push(platforms[replaceNum][1])
				}
				var referrer = JSON.stringify(responses.r);
				referrer = referrer.split(',')
				var numberOfReferrers = referrer.length;
				window.referrerLabels = []
				window.referrerNumbers = []
				for (replaceNum = 0; replaceNum < numberOfReferrers; replaceNum++) {
					referrer[replaceNum] = referrer[replaceNum].replace(/{"/g, "")
					referrer[replaceNum] = referrer[replaceNum].replace(/"/g, '')
					referrer[replaceNum] = referrer[replaceNum].replace(/}/g, '')
					referrer[replaceNum] = referrer[replaceNum].replace(/&/g, '.')
					referrer[replaceNum] = referrer[replaceNum].replace(/u/g, 'Unknown')
					referrer[replaceNum] = referrer[replaceNum].split(":")
					referrerLabels.push(referrer[replaceNum][0])
					referrerNumbers.push(referrer[replaceNum][1])
				}
				var countries = JSON.stringify(responses.c);
				countries = countries.split(',')
				var numberOfCountries = countries.length;
				window.countryLabels = []
				window.countryNumbers = []
				for (replaceNum = 0; replaceNum < numberOfCountries; replaceNum++) {
					countries[replaceNum] = countries[replaceNum].replace(/{"/g, "")
					countries[replaceNum] = countries[replaceNum].replace(/"/g, '')
					countries[replaceNum] = countries[replaceNum].replace(/}/g, '')
					countries[replaceNum] = countries[replaceNum].replace(/&/g, '.')
					countries[replaceNum] = countries[replaceNum].replace(/u/g, 'Unknown')
					countries[replaceNum] = countries[replaceNum].split(":")
					countryLabels.push(countries[replaceNum][0])
					countryNumbers.push(countries[replaceNum][1])
				}
				console.log("Labels "+countryLabels)
				console.log("Numbers "+countryNumbers)
				window.labels = []
				window.desktop = []
				window.mobile = []
				window.hits = []
				while (start < end) {
					var responses = JSON.parse(this.responseText);
					var dateIs = start.getUTCDate() + "-" + (start.getUTCMonth() + 1) + "-" + start.getUTCFullYear()
					labels.push(dateIs);
					var dateIs = start.getUTCDate() + "-" + (start.getUTCMonth() + 1) + "-" + start.getUTCFullYear()
					var oneHit = responses.h[dateIs];
					var oneDesktopHit = responses.d[dateIs]
					var oneMobileHit = responses.m[dateIs]
					if (oneHit === undefined) {
						hits.push(0)
					} else {
						hits.push(oneHit)
					}
					if (oneDesktopHit === undefined) {
						desktop.push(0)
					} else {
						desktop.push(oneDesktopHit)
					}
					if (oneMobileHit === undefined) {
						mobile.push(0)
					} else {
						mobile.push(oneMobileHit)
					}
					var newDate = start.setDate(start.getDate() + 1);
					start = new Date(newDate);
				}
				console.log(hits)
				chart();
			}
		};
		xmlhttp.open("GET", "https://" + config.projectId + ".firebaseio.com/urls/" + shortURL + ".json", true);
		xmlhttp.send();
	}
});

function chart() {
	var hitsChart = document.getElementById('allHits').getContext('2d');
	new Chart(hitsChart, {
		type: 'line',

		data: {
			labels: labels,
			datasets: [{
					label: "All Hits",
					backgroundColor: 'rgba(255, 99, 132, 0.1)',
					borderColor: 'rgb(255, 99, 132)',
					data: hits
				},
				{
					label: "Mobile Hits",
					backgroundColor: 'rgba(255, 227, 44, 0.1)',
					borderColor: 'rgb(255, 227, 44)',
					data: mobile
				},
				{
					label: "Desktop Hits",
					backgroundColor: 'rgba(42, 245, 152, 0.1)',
					borderColor: 'rgb(42, 245, 152)',
					data: desktop,
				}
			],
		},

		// Configuration options go here
		options: {
			elements: {
				line: {
					tension: 0, // disables bezier curves
				}
			}
		}
	});
	var platformBar = document.getElementById('platform').getContext('2d');
	new Chart(platformBar, {
		type: 'bar',
		data: {
			labels: platformLabels,
			datasets: [{
				label: "Hits on Platform",
				backgroundColor: ["#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FFE32C"],
				data: platformNumbers
			}]
		},
		options: {
			legend: {
				display: false
			}
		}
	});

	var referrerPie = document.getElementById('referrer').getContext('2d');
	new Chart(referrerPie, {
		type: 'pie',
		data: {
			labels: referrerLabels,
			datasets: [{
				backgroundColor: ["#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085"],
				data: referrerNumbers
			}]
		}
		// options: options
	});
	var countriesPie = document.getElementById('countries').getContext('2d');
	new Chart(countriesPie, {
		type: 'pie',
		data: {
			labels: countryLabels,
			datasets: [{
				backgroundColor: ["#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085", "#ff6384", "#ffe32c", "#2af598", "#6284FF", "#FF0000", "#FAACA8", "#21D4FD", "#B721FF", "#08AEEA", "#2AF598", "#2B86C5", "#F7CE68", "#16A085"],
				data: countryNumbers
			}]
		}
		// options: options
	});
}

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
				} else {
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
	}
	if (x === "blur") {
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
			setTimeout(function () {
				document.getElementById("sent").style.opacity = "0"
			}, 5000);
		}
		if (emailAddress = emailAddress2) {
			firebase.auth().sendPasswordResetEmail(emailAddress).catch(function (error) {
				var errorMessage = error.message;
				document.getElementById("sent").innerText = errorMessage;
				document.getElementById("sent").style.opacity = "1"
				setTimeout(function () {
					document.getElementById("sent").style.opacity = "0"
				}, 5000);
			});
			document.getElementById("sent").innerText = "An email was sent to " + emailAddress + " containing a password reset link."
			document.getElementById("sent").style.opacity = "1"
			setTimeout(function () {
				document.getElementById("sent").style.opacity = "0"
			}, 5000);
		}
		loader('bye')
	}
}