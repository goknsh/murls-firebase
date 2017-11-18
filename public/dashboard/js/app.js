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

var clipboard = new Clipboard('#linkcopy');

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
				console.log('ran else')
				var db = firebase.database().ref("urls");
				var child = db.child(editURLOldShortURL);
				  db.child(editURLOldShortURL).update({
				  	l: editURLLongURL
				  });
				child.once('value', function(snapshot) {
				  db.child(editURLNewShortURL).set(snapshot.val());
				  child.remove();
				});
				document.getElementById('editURL').style.display = 'none';
				document.getElementById('editURL-error').style.display = 'none';
				document.getElementById('editURL-error-text').innerText = '';
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
		openModal('error')
		document.getElementById('errorText').innerText = "Short URLs cannot contain '/' or '.' or '#' or '$' '[' or ']' Please fix that and click submit again";
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
				openModal('error')
				document.getElementById('errorText').innerText = "The new Short URL already exists. Please fix that and submit again, or edit the Short URL."
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
				db.child(shortURL).child('d').set({
					[date]: 0
				});
				db.child(shortURL).child('h').set({
					[date]: 0
				});
				db.child(shortURL).child('m').set({
					[date]: 0
				});
				db.child(shortURL).child('le').set({
					le: date
				});
				document.getElementById("add-long-url").value = '';
				document.getElementById("add-short-url").value = '';
			}
		});
	}
}

function viewStats(urlData) {
	var shortURL = urlData.attributes.shorturl.value;
	var longURL = urlData.attributes.longurl.value;
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var responses = JSON.parse(this.responseText);
				var startDate = responses.fe;
				startDate = startDate.split("-")
				startDate = startDate[2] + "-" + startDate[1] + "-" + startDate[0]
				console.log(startDate)
				// console.log(responses.le.le)
				var endDate = responses.le.le;
				endDate = endDate.split("-")
				endDate = endDate[2] + "-" + endDate[1] + "-" + endDate[0]
				var start = new Date(String(startDate));
				var end = new Date(String(endDate));
				var newend = end.setDate(end.getDate() + 1);
				var end = new Date(newend);
				if (responses.p === undefined) {
					openModal('notEnoughData')
					die();
				}
				else {
					var platforms = responses.p;
					platforms = JSON.stringify(platforms)
					platforms = platforms.split(',')
					var numberOfPlatforms = platforms.length;
					var replaceNum;
					window.platformLabels = []
					window.platformNumbers = []
					// console.log(referrer)
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
						referrer[replaceNum] = referrer[replaceNum].split(":")
						console.log(referrer[replaceNum][0])
						// referrer[replaceNum] = ;
						console.log(referrer[replaceNum][0])
						referrerLabels.push(window.atob(referrer[replaceNum][0]))
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
					// console.log("Labels "+countryLabels)
					// console.log("Numbers "+countryNumbers)
					window.labels = []
					window.desktop = []
					window.mobile = []
					window.hits = []
					console.log(start)
					while (start < end) {
						// var responses = JSON.parse(this.responseText); 
						var dateIs = start.getUTCDate() + "-" + (start.getUTCMonth() + 1) + "-" + start.getUTCFullYear()
						labels.push(dateIs);
						console.log(dateIs)
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
					document.getElementById('home-view').style.display = 'none';
					document.getElementById('full-analytics').style.display = 'block';
					document.getElementById('full-analytics').innerHTML = ""
					document.getElementById('full-analytics').innerHTML = '<header class="full-analytics-nav"> <div class="branding"> <a href="#" class="nav-link" onclick="closeStats();"> <clr-icon shape="arrow left" class="arrow"></clr-icon> <span class="title">Data for: <span id="shortURLTop"></span></span> </a> </div></header><div class="charts"><div class="row"> <div class="col-xs"> <div class="card"> <div class="card-header"> Long URL </div> <div class="card-block"> <div class="card-text"><span id="chartsViewLongURL"></span></div> </div> </div> </div></div><div class="row"> <div class="col-xs"> <div class="card"> <div class="card-header"> Short URL </div> <div class="card-block"> <div class="card-text"><span id="chartsViewShortURL"></span></div> </div> </div> </div> <div class="col-xs"> <div class="card"> <div class="card-header"> Total Hits </div> <div class="card-block"> <div class="card-text"><span id="chartsViewTotalHits"></span></div> </div> </div> </div> <div class="col-xs"> <div class="card"> <div class="card-header"> Desktop Hits </div> <div class="card-block"> <div class="card-text"><span id="chartsViewDesktopHits"></span></div> </div> </div> </div> <div class="col-xs"> <div class="card"> <div class="card-header"> Mobile Hits </div> <div class="card-block"> <div class="card-text"><span id="chartsViewMobileHits"></span></div> </div> </div> </div></div><p class="chartHeading">Total Hits, Mobile Hits and Desktop Hits:</p><canvas id="allHits"></canvas><p class="chartHeading">All Platforms:</p><canvas id="platform"></canvas><div class="row"> <div class="col-xs"> <p class="chartHeading">Referrer:</p> <canvas id="referrer"></canvas> </div> <div class="col-xs"> <p class="chartHeading">Countries:</p> <canvas id="countries"></canvas> </div></div></div>'
					document.getElementById('shortURLTop').innerText = shortURL;
					document.getElementById('chartsViewShortURL').innerHTML = '<a target="_blank" href="../'+ shortURL + '">' + shortURL + '</a>';
					document.getElementById('chartsViewLongURL').innerHTML = '<a target="_blank" href="'+ longURL + '">' + longURL + '</a>';
					document.getElementById('chartsViewTotalHits').innerHTML = responses.th;
					document.getElementById('chartsViewDesktopHits').innerHTML = responses.td;
					document.getElementById('chartsViewMobileHits').innerHTML = responses.tm;
					chart();
				}
			}
		};
		xmlhttp.open("GET", "https://" + config.projectId + ".firebaseio.com/urls/" + shortURL + ".json", true);
xmlhttp.send();
}

function closeStats() {
	document.getElementById('home-view').style.display = 'block'
	document.getElementById('full-analytics').style.display = 'none'
	document.getElementById('get-a-tour').disabled = false;
}

function chart() {
	document.getElementById('get-a-tour').disabled = true;
	Chart.defaults.global.defaultFontFamily = "Metropolis"
	var hitsChart = document.getElementById('allHits').getContext('2d');
	window.hitsChartItself = new Chart(hitsChart, {
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
					data: desktop
				}
			],
		},

		// Configuration options go here
		options: {
			elements: {
				line: {
					tension: 0, // disables bezier curves
				}
			},
		    scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true
		            },
		            scaleLabel: {
        				display: true,
    					labelString: 'Number of Hits'
    				}
		        }],
		        xAxes: [{
		            ticks: {
		                beginAtZero: true
		            },
		            scaleLabel: {
        				display: true,
    					labelString: 'Date in UTC (dd-mm-yyyy)'
    				}
		        }]
		    }
		}
	});
	var platformBar = document.getElementById('platform').getContext('2d');
	window.platformBarItself = new Chart(platformBar, {
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
			},
			scaleLabel: {
		        yAxes: [{
		            labelString: 'Number of Hits'
		        }]
			},
		    scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true
		            },
		            scaleLabel: {
        				display: true,
    					labelString: 'Number of Hits'
    				}
		        }],
		        xAxes: [{
		            ticks: {
		                beginAtZero: true
		            },
		            scaleLabel: {
        				display: true,
    					labelString: 'Type of Device'
    				}
		        }]
		    }
		}
	});

	var referrerPie = document.getElementById('referrer').getContext('2d');
	window.referrerPieItself = new Chart(referrerPie, {
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
	window.countriesPieItself = new Chart(countriesPie, {
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

function checkForUpdates() {
	var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var responses = JSON.parse(this.responseText);
          if (responses.available === "v1-beta") {
          	openModal('updates');
          	document.getElementById('updatesText').innerText = "No updates are available"
          }
          else {
          	openModal('updates');
          	document.getElementById('updatesText').innerHTML = "An update is available!<br>Your current version is 'v1-beta' and the latest available version is '" + responses.available + "'";
          	document.getElementsByClassName('updatesButton')[0].innerText = "Get Update";
          	document.getElementById('updatesLink').href = responses.link;
          }
        }
      };
      xmlhttp.open("GET", "https://updates.murls.ga/firebase/index.json", true);
      xmlhttp.send();
}

var count = 0
function openDropdown(type) {
	document.getElementById(type).className += ' open';
	count += 1;
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
	}}, 1300);
}

ClarityIcons.add({"murls-logo": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><defs><style>.cls-1{fill:#eaeaea;opacity:0.2;}.cls-2{fill:#fff;opacity:0.9;}</style></defs><title>White Transparent</title><rect class="cls-1" width="450" height="450" rx="100" ry="100"/><path class="cls-2" d="M364.16,244.18c-5.42,15-10.1,17.74-13.8,17.74a6,6,0,0,1-3.35-1,6.24,6.24,0,0,1-2.49-3.81l12.15-48.89,10-38.44h-28l-18.11,74.38c-.67,1.13-8.77,14.49-21.12,14.3-1.59,0-6.82-.11-10.63-3.83-2.47-2.41-3.93-5.76-4.15-11.2-.16-3.89,7.09-30.4,8.94-37.83,1.46-5.87,2.65-10.71,3.29-13.33,2.17-8.85,4-16.37,5.36-22.07H274.66l-4.47,17.91c-3.68,14.75-3.66,14.59-4.38,17.58-1.74,7.2-2.15,9.22-3.51,14.33-1.74,6.56-2.14,7.25-3,10.84a87.16,87.16,0,0,0-2.56,13.93c-5.4,14.91-10.07,17.61-13.75,17.61s-5.67-2.46-5.67-7.39a32.69,32.69,0,0,1,1.23-7.64l7.88-28.32a62.45,62.45,0,0,0,2.71-18c0-21.19-12.81-32.24-28.33-32.24-14.18,0-28.6,12.48-36.15,25.91-.89-6.07-3.43-14.77-10.9-20.46a27.65,27.65,0,0,0-16.94-5.45c-14.53,0-29.32,13.11-36.7,26.91L125.53,171H83.4l-5.91,21.81H97.2L85,241.71,75,280.15h28l16.08-64.36a82.2,82.2,0,0,1,15.35-20c2-1.87,4.38-3.84,7.81-4.28,5.83-.76,10.24,3.45,10.63,3.83,3.84,3.73,4.05,8.76,4.15,11.2a20.63,20.63,0,0,1-1.58,8.74c-3,11.79-5.51,21.65-7.36,29.08-1.46,5.87-2.65,10.71-3.29,13.33-2.17,8.85-4,16.37-5.36,22.07h27.59l.17-.69h.11l.41-2.09,3.77-15.13c3.68-14.75,3.66-14.59,4.38-17.58,1.74-7.2,2.15-9.22,3.51-14.33,1.74-6.56,2.14-7.25,3-10.84.32-1.28.66-2.7,1-4.2,1.3-3.68,5.51-14.15,14.14-20.16a16.24,16.24,0,0,1,8.7-3.25,14.66,14.66,0,0,1,10.63,3.83c2.67,2.59,4.15,6.41,4.15,11.2a29.55,29.55,0,0,1-1.23,8.87l-8.13,29.07A43.7,43.7,0,0,0,210,256.74c0,13.8,8.13,23.9,25.13,23.9,10,0,18.68-4.47,25.17-14.64a26.18,26.18,0,0,0,7.7,9.64c6.26,4.77,13.19,5.25,16.94,5.45,14.32.76,26.44-6.65,34.38-13.33a30.77,30.77,0,0,0,4.08,5.44c4.15,4.36,10.49,7,19.11,7,14.54,0,26.11-9.36,32.52-31.78Z"/></svg>'});