function stats() {
	if ("?stats=yes" === location.search) {
		var t = new XMLHttpRequest;
		t.onreadystatechange = function () {
			if (4 == this.readyState && 200 == this.status) {
				var t = JSON.parse(this.responseText);
				currentURL = currentURL.replace(/\//g, ""), document.getElementById("info").innerText = 'Stats for "' + currentURL + '"', document.getElementById("hits").innerText = "Hits: " + t.h, document.getElementById("desktop").innerText = "Desktop: " + t.d, document.getElementById("mobile").innerText = "Mobile: " + t.m, document.getElementById("long").innerText = "Long URL: " + t.l, document.getElementById("info-2").innerText = "To see more stats, please login"
			}
		}, t.open("GET", "https://" + projectid + ".firebaseio.com/urls" + currentURL + ".json", !0), t.send()
	} else get()
}

function get() {
	var t = new XMLHttpRequest;
	t.onreadystatechange = function () {
		if (4 == this.readyState && 200 == this.status) {
			var t = JSON.parse(this.responseText);
			2 === t.s ? (window.longURL = t.l, hits(), referrer(), platform(), ip(), document.getElementById("info").innerText = found) : document.getElementById("info").innerText = error
		} else document.getElementById("info").innerText = error
	}, t.open("GET", "https://" + projectid + ".firebaseio.com/urls" + currentURL + ".json", !0), t.send()
}

function hits() {
	firebase.database().ref("urls" + currentURL + "/h").transaction(function (t) {
		return (t || 0) + 1
	}), /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|Pixel|IEMobile|Windows Phone|Kindle|Silk|Mobile|Firefox OS|Opera Mini/i.test(navigator.userAgent) ? firebase.database().ref("urls" + currentURL + "/m").transaction(function (t) {
		return (t || 0) + 1
	}) : firebase.database().ref("urls" + currentURL + "/d").transaction(function (t) {
		return (t || 0) + 1
	})
}

function referrer() {
	var t = document.referrer;
	"" === t ? firebase.database().ref("urls" + currentURL + "/r/u").transaction(function (t) {
		return (t || 0) + 1
	}) : (t = (t = (t = (t = t.replace(/\./g, "-")).replace(/https:\/\//g, "")).replace(/http:\/\//g, "")).split("/")[0], firebase.database().ref("urls" + currentURL + "/r/" + t).transaction(function (t) {
		return (t || 0) + 1
	}))
}

function platform() {
	var t = navigator.platform;
	"" === t ? firebase.database().ref("urls" + currentURL + "/p/u").transaction(function (t) {
		return (t || 0) + 1
	}) : firebase.database().ref("urls" + currentURL + "/p/" + t).transaction(function (t) {
		return (t || 0) + 1
	})
}

function ip() {
	var t = new XMLHttpRequest;
	t.onreadystatechange = function () {
		if (4 == this.readyState && 200 == this.status) {
			var t = (t = JSON.parse(this.responseText)).countryCode;
			firebase.database().ref("urls" + currentURL + "/c/" + t).transaction(function (t) {
				return (t || 0) + 1
			})
		}
		setTimeout(function () {
			document.location = longURL
		}, 1e3)
	}, t.open("GET", "https://extreme-ip-lookup.com/json/", !0), t.send()
}
var firebase = function () {
	var t = void 0 === t ? self : t;
	return function (e) {
		function n(t) {
			if (i[t]) return i[t].exports;
			var r = i[t] = {
				i: t,
				l: !1,
				exports: {}
			};
			return e[t].call(r.exports, r, r.exports, n), r.l = !0, r.exports
		}
		var r = t.webpackJsonpFirebase;
		t.webpackJsonpFirebase = function (t, i, s) {
			for (var a, u, c, h = 0, l = []; h < t.length; h++) u = t[h], o[u] && l.push(o[u][0]), o[u] = 0;
			for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
			for (r && r(t, i, s); l.length;) l.shift()();
			if (s)
				for (h = 0; h < s.length; h++) c = n(n.s = s[h]);
			return c
		};
		var i = {},
			o = {
				3: 0
			};
		return n.e = function (t) {
			function e() {
				a.onerror = a.onload = null, clearTimeout(u);
				var e = o[t];
				0 !== e && (e && e[1](Error("Loading chunk " + t + " failed.")), o[t] = void 0)
			}
			var r = o[t];
			if (0 === r) return new Promise(function (t) {
				t()
			});
			if (r) return r[2];
			var i = new Promise(function (e, n) {
				r = o[t] = [e, n]
			});
			r[2] = i;
			var s = document.getElementsByTagName("head")[0],
				a = document.createElement("script");
			a.type = "text/javascript", a.charset = "utf-8", a.async = !0, a.timeout = 12e4, n.nc && a.setAttribute("nonce", n.nc), a.src = n.p + "" + t + ".js";
			var u = setTimeout(e, 12e4);
			return a.onerror = a.onload = e, s.appendChild(a), i
		}, n.m = e, n.c = i, n.d = function (t, e, r) {
			n.o(t, e) || Object.defineProperty(t, e, {
				configurable: !1,
				enumerable: !0,
				get: r
			})
		}, n.n = function (t) {
			var e = t && t.t ? function () {
				return t.default
			} : function () {
				return t
			};
			return n.d(e, "a", e), e
		}, n.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}, n.p = "", n.oe = function (t) {
			throw console.error(t), t
		}, n(n.s = 5)
	}([, , , , function (t, e, n) {
		"use strict";
		n.d(e, "b", function () {
			return r
		}), n.d(e, "a", function () {
			return i
		}), n.d(e, "c", function () {
			return o
		});
		var r = n(14).a.Promise || n(20),
			i = function () {
				function t() {
					var t = this;
					this.resolve = null, this.reject = null, this.promise = new r(function (e, n) {
						t.resolve = e, t.reject = n
					})
				}
				return t.prototype.wrapCallback = function (t) {
					var e = this;
					return function (n, r) {
						n ? e.reject(n) : e.resolve(r), "function" == typeof t && (o(e.promise), 1 === t.length ? t(n) : t(n, r))
					}
				}, t
			}(),
			o = function (t) {
				t.catch(function () {})
			}
	}, function (t, e, n) {
		"use strict";

		function r() {
			function t(t) {
				return t = t || h, c(p, t) || i("no-app", {
					name: t
				}), p[t]
			}

			function e() {
				return Object.keys(p).map(function (t) {
					return p[t]
				})
			}

			function n(t, e) {
				Object.keys(d).forEach(function (n) {
					var r = l(t, n);
					null !== r && v[r] && v[r](e, t)
				})
			}

			function l(t, e) {
				if ("serverAuth" === e) return null;
				var n = e;
				return t.options, n
			}
			var p = {},
				d = {},
				v = {},
				y = {
					t: !0,
					initializeApp: function (t, e) {
						void 0 === e ? e = h : "string" == typeof e && "" !== e || i("bad-app-name", {
							name: e + ""
						}), c(p, e) && i("duplicate-app", {
							name: e
						});
						var r = new f(t, e, y);
						return p[e] = r, n(r, "create"), r
					},
					app: t,
					apps: null,
					Promise: a.b,
					SDK_VERSION: "4.2.0",
					INTERNAL: {
						registerService: function (n, r, o, s, a) {
							d[n] && i("duplicate-service", {
								name: n
							}), d[n] = r, s && (v[n] = s, e().forEach(function (t) {
								s("create", t)
							}));
							var c = function (e) {
								return void 0 === e && (e = t()), "function" != typeof e[n] && i("invalid-app-argument", {
									name: n
								}), e[n]()
							};
							return void 0 !== o && Object(u.b)(c, o), y[n] = c, f.prototype[n] = function () {
								for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
								return this.r.bind(this, n).apply(this, a ? t : [])
							}, c
						},
						createFirebaseNamespace: r,
						extendNamespace: function (t) {
							Object(u.b)(y, t)
						},
						createSubscribe: o.a,
						ErrorFactory: s.a,
						removeApp: function (t) {
							n(p[t], "delete"), delete p[t]
						},
						factories: d,
						useAsService: l,
						Promise: a.b,
						deepExtend: u.b
					}
				};
			return Object(u.c)(y, "default", y), Object.defineProperty(y, "apps", {
				get: e
			}), Object(u.c)(t, "App", f), y
		}

		function i(t, e) {
			throw d.create(t, e)
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var o = n(13),
			s = n(10),
			a = n(4),
			u = n(17),
			c = function (t, e) {
				return Object.prototype.hasOwnProperty.call(t, e)
			},
			h = "[DEFAULT]",
			l = [],
			f = function () {
				function t(t, e, n) {
					this.u = n, this.f = !1, this.h = {}, this.v = e, this.y = Object(u.a)(t), this.INTERNAL = {
						getUid: function () {
							return null
						},
						getToken: function () {
							return a.b.resolve(null)
						},
						addAuthTokenListener: function (t) {
							l.push(t), setTimeout(function () {
								return t(null)
							}, 0)
						},
						removeAuthTokenListener: function (t) {
							l = l.filter(function (e) {
								return e !== t
							})
						}
					}
				}
				return Object.defineProperty(t.prototype, "name", {
					get: function () {
						return this._(), this.v
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "options", {
					get: function () {
						return this._(), this.y
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.delete = function () {
					var t = this;
					return new a.b(function (e) {
						t._(), e()
					}).then(function () {
						t.u.INTERNAL.removeApp(t.v);
						var e = [];
						return Object.keys(t.h).forEach(function (n) {
							Object.keys(t.h[n]).forEach(function (r) {
								e.push(t.h[n][r])
							})
						}), a.b.all(e.map(function (t) {
							return t.INTERNAL.delete()
						}))
					}).then(function () {
						t.f = !0, t.h = {}
					})
				}, t.prototype.r = function (t, e) {
					if (void 0 === e && (e = h), this._(), this.h[t] || (this.h[t] = {}), !this.h[t][e]) {
						var n = e !== h ? e : void 0,
							r = this.u.INTERNAL.factories[t](this, this.extendApp.bind(this), n);
						this.h[t][e] = r
					}
					return this.h[t][e]
				}, t.prototype.extendApp = function (t) {
					var e = this;
					Object(u.b)(this, t), t.INTERNAL && t.INTERNAL.addAuthTokenListener && (l.forEach(function (t) {
						e.INTERNAL.addAuthTokenListener(t)
					}), l = [])
				}, t.prototype._ = function () {
					this.f && i("app-deleted", {
						name: this.v
					})
				}, t
			}();
		f.prototype.name && f.prototype.options || f.prototype.delete || console.log("dc");
		var p = {
				"no-app": "No Firebase App '{$name}' has been created - call Firebase App.initializeApp()",
				"bad-app-name": "Illegal App name: '{$name}",
				"duplicate-app": "Firebase App named '{$name}' already exists",
				"app-deleted": "Firebase App named '{$name}' already deleted",
				"duplicate-service": "Firebase service named '{$name}' already registered",
				"sa-not-supported": "Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain",
				"invalid-app-argument": "firebase.{$name}() takes either no argument or a Firebase App instance."
			},
			d = new s.a("app", "Firebase", p),
			v = n(19),
			y = (n.n(v), r());
		e.default = y
	}, , , , , function (t, e, n) {
		"use strict";
		n.d(e, "a", function () {
			return s
		});
		var r = "FirebaseError",
			i = Error.captureStackTrace,
			o = function () {
				return function (t, e) {
					if (this.code = t, this.message = e, i) i(this, s.prototype.create);
					else {
						var n = Error.apply(this, arguments);
						this.name = r, Object.defineProperty(this, "stack", {
							get: function () {
								return n.stack
							}
						})
					}
				}
			}();
		o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o.prototype.name = r;
		var s = function () {
			function t(t, e, n) {
				this.service = t, this.serviceName = e, this.errors = n, this.pattern = /\{\$([^}]+)}/g
			}
			return t.prototype.create = function (t, e) {
				void 0 === e && (e = {});
				var n, r = this.errors[t],
					i = this.service + "/" + t;
				n = void 0 === r ? "Error" : r.replace(this.pattern, function (t, n) {
					var r = e[n];
					return void 0 !== r ? "" + r : "<" + n + "?>"
				}), n = this.serviceName + ": " + n + " (" + i + ").";
				var s = new o(i, n);
				for (var a in e) e.hasOwnProperty(a) && "_" !== a.slice(-1) && (s[a] = e[a]);
				return s
			}, t
		}()
	}, , , function (t, e, n) {
		"use strict";

		function r(t, e) {
			if ("object" !== (void 0 === t ? "undefined" : s(t)) || null === t) return !1;
			for (var n = 0, r = e; n < r.length; n++) {
				var i = r[n];
				if (i in t && "function" == typeof t[i]) return !0
			}
			return !1
		}

		function i() {}
		e.a = function (t, e) {
			var n = new a(t, e);
			return n.subscribe.bind(n)
		};
		var o = n(4),
			s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			a = function () {
				function t(t, e) {
					var n = this;
					this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = o.b.resolve(), this.finalized = !1, this.onNoObservers = e, this.task.then(function () {
						t(n)
					}).catch(function (t) {
						n.error(t)
					})
				}
				return t.prototype.next = function (t) {
					this.forEachObserver(function (e) {
						e.next(t)
					})
				}, t.prototype.error = function (t) {
					this.forEachObserver(function (e) {
						e.error(t)
					}), this.close(t)
				}, t.prototype.complete = function () {
					this.forEachObserver(function (t) {
						t.complete()
					}), this.close()
				}, t.prototype.subscribe = function (t, e, n) {
					var o, s = this;
					if (void 0 === t && void 0 === e && void 0 === n) throw Error("Missing Observer.");
					void 0 === (o = r(t, ["next", "error", "complete"]) ? t : {
						next: t,
						error: e,
						complete: n
					}).next && (o.next = i), void 0 === o.error && (o.error = i), void 0 === o.complete && (o.complete = i);
					var a = this.unsubscribeOne.bind(this, this.observers.length);
					return this.finalized && this.task.then(function () {
						try {
							s.finalError ? o.error(s.finalError) : o.complete()
						} catch (t) {}
					}), this.observers.push(o), a
				}, t.prototype.unsubscribeOne = function (t) {
					void 0 !== this.observers && void 0 !== this.observers[t] && (delete this.observers[t], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
				}, t.prototype.forEachObserver = function (t) {
					if (!this.finalized)
						for (var e = 0; e < this.observers.length; e++) this.sendOne(e, t)
				}, t.prototype.sendOne = function (t, e) {
					var n = this;
					this.task.then(function () {
						if (void 0 !== n.observers && void 0 !== n.observers[t]) try {
							e(n.observers[t])
						} catch (t) {
							"undefined" != typeof console && console.error && console.error(t)
						}
					})
				}, t.prototype.close = function (t) {
					var e = this;
					this.finalized || (this.finalized = !0, void 0 !== t && (this.finalError = t), this.task.then(function () {
						e.observers = void 0, e.onNoObservers = void 0
					}))
				}, t
			}()
	}, function (t, e, n) {
		"use strict";
		(function (t) {
			n.d(e, "a", function () {
				return i
			});
			var r;
			if (void 0 !== t) r = t;
			else if ("undefined" != typeof self) r = self;
			else try {
				r = Function("return this")()
			} catch (t) {
				throw Error("polyfill failed because global object is unavailable in this environment")
			}
			var i = r
		}).call(e, n(15))
	}, function (e, n) {
		var r;
		r = function () {
			return this
		}();
		try {
			r = r || Function("return this")() || (0, eval)("this")
		} catch (e) {
			"object" == typeof t && (r = t)
		}
		e.exports = r
	}, function (t, e) {
		function n() {
			throw Error("setTimeout has not been defined")
		}

		function r() {
			throw Error("clearTimeout has not been defined")
		}

		function i(t) {
			if (h === setTimeout) return setTimeout(t, 0);
			if ((h === n || !h) && setTimeout) return h = setTimeout, setTimeout(t, 0);
			try {
				return h(t, 0)
			} catch (e) {
				try {
					return h.call(null, t, 0)
				} catch (e) {
					return h.call(this, t, 0)
				}
			}
		}

		function o(t) {
			if (l === clearTimeout) return clearTimeout(t);
			if ((l === r || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);
			try {
				return l(t)
			} catch (e) {
				try {
					return l.call(null, t)
				} catch (e) {
					return l.call(this, t)
				}
			}
		}

		function s() {
			v && p && (v = !1, p.length ? d = p.concat(d) : y = -1, d.length && a())
		}

		function a() {
			if (!v) {
				var t = i(s);
				v = !0;
				for (var e = d.length; e;) {
					for (p = d, d = []; ++y < e;) p && p[y].run();
					y = -1, e = d.length
				}
				p = null, v = !1, o(t)
			}
		}

		function u(t, e) {
			this.fun = t, this.array = e
		}

		function c() {}
		var h, l, f = t.exports = {};
		! function () {
			try {
				h = "function" == typeof setTimeout ? setTimeout : n
			} catch (t) {
				h = n
			}
			try {
				l = "function" == typeof clearTimeout ? clearTimeout : r
			} catch (t) {
				l = r
			}
		}();
		var p, d = [],
			v = !1,
			y = -1;
		f.nextTick = function (t) {
			var e = Array(arguments.length - 1);
			if (arguments.length > 1)
				for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
			d.push(new u(t, e)), 1 !== d.length || v || i(a)
		}, u.prototype.run = function () {
			this.fun.apply(null, this.array)
		}, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = c, f.addListener = c, f.once = c, f.off = c, f.removeListener = c, f.removeAllListeners = c, f.emit = c, f.prependListener = c, f.prependOnceListener = c, f.listeners = function (t) {
			return []
		}, f.binding = function (t) {
			throw Error("process.binding is not supported")
		}, f.cwd = function () {
			return "/"
		}, f.chdir = function (t) {
			throw Error("process.chdir is not supported")
		}, f.umask = function () {
			return 0
		}
	}, function (t, e, n) {
		"use strict";

		function r(t, e) {
			if (!(e instanceof Object)) return e;
			switch (e.constructor) {
				case Date:
					var n = e;
					return new Date(n.getTime());
				case Object:
					void 0 === t && (t = {});
					break;
				case Array:
					t = [];
					break;
				default:
					return e
			}
			for (var i in e) e.hasOwnProperty(i) && (t[i] = r(t[i], e[i]));
			return t
		}
		e.a = function (t) {
			return r(void 0, t)
		}, e.b = r, e.c = function (t, e, n) {
			t[e] = n
		}
	}, , function (t, e) {
		Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
			value: function (t) {
				if (null == this) throw new TypeError('"this" is null or not defined');
				var e = Object(this),
					n = e.length >>> 0;
				if ("function" != typeof t) throw new TypeError("predicate must be a function");
				for (var r = arguments[1], i = 0; i < n;) {
					var o = e[i];
					if (t.call(r, o, i, e)) return i;
					i++
				}
				return -1
			}
		}), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
			value: function (t) {
				if (null == this) throw new TypeError('"this" is null or not defined');
				var e = Object(this),
					n = e.length >>> 0;
				if ("function" != typeof t) throw new TypeError("predicate must be a function");
				for (var r = arguments[1], i = 0; i < n;) {
					var o = e[i];
					if (t.call(r, o, i, e)) return o;
					i++
				}
			}
		})
	}, function (t, e, n) {
		(function (e) {
			! function (n) {
				function r() {}

				function i(t, e) {
					return function () {
						t.apply(e, arguments)
					}
				}

				function o(t) {
					if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
					if ("function" != typeof t) throw new TypeError("not a function");
					this.g = 0, this.T = !1, this.w = void 0, this.O = [], l(t, this)
				}

				function s(t, e) {
					for (; 3 === t.g;) t = t.w;
					0 !== t.g ? (t.T = !0, o.j(function () {
						var n = 1 === t.g ? e.onFulfilled : e.onRejected;
						if (null !== n) {
							var r;
							try {
								r = n(t.w)
							} catch (t) {
								return void u(e.promise, t)
							}
							a(e.promise, r)
						} else(1 === t.g ? a : u)(e.promise, t.w)
					})) : t.O.push(e)
				}

				function a(t, e) {
					try {
						if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
						if (e && ("object" == typeof e || "function" == typeof e)) {
							var n = e.then;
							if (e instanceof o) return t.g = 3, t.w = e, void c(t);
							if ("function" == typeof n) return void l(i(n, e), t)
						}
						t.g = 1, t.w = e, c(t)
					} catch (e) {
						u(t, e)
					}
				}

				function u(t, e) {
					t.g = 2, t.w = e, c(t)
				}

				function c(t) {
					2 === t.g && 0 === t.O.length && o.j(function () {
						t.T || o.A(t.w)
					});
					for (var e = 0, n = t.O.length; e < n; e++) s(t, t.O[e]);
					t.O = null
				}

				function h(t, e, n) {
					this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
				}

				function l(t, e) {
					var n = !1;
					try {
						t(function (t) {
							n || (n = !0, a(e, t))
						}, function (t) {
							n || (n = !0, u(e, t))
						})
					} catch (t) {
						if (n) return;
						n = !0, u(e, t)
					}
				}
				var f = setTimeout;
				o.prototype.catch = function (t) {
					return this.then(null, t)
				}, o.prototype.then = function (t, e) {
					var n = new this.constructor(r);
					return s(this, new h(t, e, n)), n
				}, o.all = function (t) {
					var e = Array.prototype.slice.call(t);
					return new o(function (t, n) {
						function r(o, s) {
							try {
								if (s && ("object" == typeof s || "function" == typeof s)) {
									var a = s.then;
									if ("function" == typeof a) return void a.call(s, function (t) {
										r(o, t)
									}, n)
								}
								e[o] = s, 0 == --i && t(e)
							} catch (t) {
								n(t)
							}
						}
						if (0 === e.length) return t([]);
						for (var i = e.length, o = 0; o < e.length; o++) r(o, e[o])
					})
				}, o.resolve = function (t) {
					return t && "object" == typeof t && t.constructor === o ? t : new o(function (e) {
						e(t)
					})
				}, o.reject = function (t) {
					return new o(function (e, n) {
						n(t)
					})
				}, o.race = function (t) {
					return new o(function (e, n) {
						for (var r = 0, i = t.length; r < i; r++) t[r].then(e, n)
					})
				}, o.j = "function" == typeof e && function (t) {
					e(t)
				} || function (t) {
					f(t, 0)
				}, o.A = function (t) {
					"undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
				}, o.k = function (t) {
					o.j = t
				}, o.I = function (t) {
					o.A = t
				}, void 0 !== t && t.exports ? t.exports = o : n.Promise || (n.Promise = o)
			}(this)
		}).call(e, n(21).setImmediate)
	}, function (e, n, r) {
		function i(t, e) {
			this.F = t, this.N = e
		}
		var o = Function.prototype.apply;
		n.setTimeout = function () {
			return new i(o.call(setTimeout, t, arguments), clearTimeout)
		}, n.setInterval = function () {
			return new i(o.call(setInterval, t, arguments), clearInterval)
		}, n.clearTimeout = n.clearInterval = function (t) {
			t && t.close()
		}, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
			this.N.call(t, this.F)
		}, n.enroll = function (t, e) {
			clearTimeout(t.x), t.P = e
		}, n.unenroll = function (t) {
			clearTimeout(t.x), t.P = -1
		}, n.L = n.active = function (t) {
			clearTimeout(t.x);
			var e = t.P;
			e >= 0 && (t.x = setTimeout(function () {
				t.S && t.S()
			}, e))
		}, r(22), n.setImmediate = setImmediate, n.clearImmediate = clearImmediate
	}, function (t, e, n) {
		(function (t, e) {
			! function (t, n) {
				"use strict";

				function r(t) {
					delete u[t]
				}

				function i(t) {
					var e = t.callback,
						r = t.args;
					switch (r.length) {
						case 0:
							e();
							break;
						case 1:
							e(r[0]);
							break;
						case 2:
							e(r[0], r[1]);
							break;
						case 3:
							e(r[0], r[1], r[2]);
							break;
						default:
							e.apply(n, r)
					}
				}

				function o(t) {
					if (c) setTimeout(o, 0, t);
					else {
						var e = u[t];
						if (e) {
							c = !0;
							try {
								i(e)
							} finally {
								r(t), c = !1
							}
						}
					}
				}
				if (!t.setImmediate) {
					var s, a = 1,
						u = {},
						c = !1,
						h = t.document,
						l = Object.getPrototypeOf && Object.getPrototypeOf(t);
					l = l && l.setTimeout ? l : t, "[object process]" === {}.toString.call(t.process) ? s = function (t) {
						e.nextTick(function () {
							o(t)
						})
					} : function () {
						if (t.postMessage && !t.importScripts) {
							var e = !0,
								n = t.onmessage;
							return t.onmessage = function () {
								e = !1
							}, t.postMessage("", "*"), t.onmessage = n, e
						}
					}() ? function () {
						var e = "setImmediate$" + Math.random() + "$",
							n = function (n) {
								n.source === t && "string" == typeof n.data && 0 === n.data.indexOf(e) && o(+n.data.slice(e.length))
							};
						t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), s = function (n) {
							t.postMessage(e + n, "*")
						}
					}() : t.MessageChannel ? function () {
						var t = new MessageChannel;
						t.port1.onmessage = function (t) {
							o(t.data)
						}, s = function (e) {
							t.port2.postMessage(e)
						}
					}() : h && "onreadystatechange" in h.createElement("script") ? function () {
						var t = h.documentElement;
						s = function (e) {
							var n = h.createElement("script");
							n.onreadystatechange = function () {
								o(e), n.onreadystatechange = null, t.removeChild(n), n = null
							}, t.appendChild(n)
						}
					}() : s = function (t) {
						setTimeout(o, 0, t)
					}, l.setImmediate = function (t) {
						"function" != typeof t && (t = Function("" + t));
						for (var e = Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
						var r = {
							callback: t,
							args: e
						};
						return u[a] = r, s(a), a++
					}, l.clearImmediate = r
				}
			}("undefined" == typeof self ? void 0 === t ? this : t : self)
		}).call(e, n(15), n(16))
	}])
}().default;
(function () {
	var t, e = e || {},
		n = this,
		r = function (t) {
			return void 0 !== t
		},
		i = function (t) {
			return "string" == typeof t
		},
		o = function (t) {
			return "boolean" == typeof t
		},
		s = function (t) {
			return "number" == typeof t
		},
		a = function () {},
		u = function (t) {
			var e = typeof t;
			if ("object" == e) {
				if (!t) return "null";
				if (t instanceof Array) return "array";
				if (t instanceof Object) return e;
				var n = Object.prototype.toString.call(t);
				if ("[object Window]" == n) return "object";
				if ("[object Array]" == n || "number" == typeof t.length && void 0 !== t.splice && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("splice")) return "array";
				if ("[object Function]" == n || void 0 !== t.call && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("call")) return "function"
			} else if ("function" == e && void 0 === t.call) return "object";
			return e
		},
		c = function (t) {
			return null === t
		},
		h = function (t) {
			return "array" == u(t)
		},
		l = function (t) {
			var e = u(t);
			return "array" == e || "object" == e && "number" == typeof t.length
		},
		f = function (t) {
			return "function" == u(t)
		},
		p = function (t) {
			var e = typeof t;
			return "object" == e && null != t || "function" == e
		},
		d = function (t, e, n) {
			return t.call.apply(t.bind, arguments)
		},
		v = function (t, e, n) {
			if (!t) throw Error();
			if (2 < arguments.length) {
				var r = Array.prototype.slice.call(arguments, 2);
				return function () {
					var n = Array.prototype.slice.call(arguments);
					return Array.prototype.unshift.apply(n, r), t.apply(e, n)
				}
			}
			return function () {
				return t.apply(e, arguments)
			}
		},
		y = function (t, e, n) {
			return (y = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? d : v).apply(null, arguments)
		},
		g = function (t, e) {
			var n = Array.prototype.slice.call(arguments, 1);
			return function () {
				var e = n.slice();
				return e.push.apply(e, arguments), t.apply(this, e)
			}
		},
		m = Date.now || function () {
			return +new Date
		},
		b = function (t, e) {
			function n() {}
			n.prototype = e.prototype, t.Sc = e.prototype, t.prototype = new n, t.prototype.constructor = t, t.Cg = function (t, n, r) {
				for (var i = Array(arguments.length - 2), o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
				return e.prototype[n].apply(t, i)
			}
		},
		w = function (t) {
			if (Error.captureStackTrace) Error.captureStackTrace(this, w);
			else {
				var e = Error().stack;
				e && (this.stack = e)
			}
			t && (this.message = String(t))
		};
	b(w, Error), w.prototype.name = "CustomError";
	var E = function (t, e) {
			for (var n = t.split("%s"), r = "", i = Array.prototype.slice.call(arguments, 1); i.length && 1 < n.length;) r += n.shift() + i.shift();
			return r + n.join("%s")
		},
		O = String.prototype.trim ? function (t) {
			return t.trim()
		} : function (t) {
			return t.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
		},
		I = function (t) {
			return k.test(t) ? (-1 != t.indexOf("&") && (t = t.replace(T, "&amp;")), -1 != t.indexOf("<") && (t = t.replace(C, "&lt;")), -1 != t.indexOf(">") && (t = t.replace(S, "&gt;")), -1 != t.indexOf('"') && (t = t.replace(A, "&quot;")), -1 != t.indexOf("'") && (t = t.replace(N, "&#39;")), -1 != t.indexOf("\0") && (t = t.replace(R, "&#0;")), t) : t
		},
		T = /&/g,
		C = /</g,
		S = />/g,
		A = /"/g,
		N = /'/g,
		R = /\x00/g,
		k = /[\x00&<>"']/,
		P = function (t, e) {
			return -1 != t.indexOf(e)
		},
		_ = function (t, e) {
			return t < e ? -1 : t > e ? 1 : 0
		},
		D = function (t, e) {
			e.unshift(t), w.call(this, E.apply(null, e)), e.shift()
		};
	b(D, w), D.prototype.name = "AssertionError";
	var j = function (t, e, n, r) {
			var i = "Assertion failed";
			if (n) {
				i += ": " + n;
				var o = r
			} else t && (i += ": " + t, o = e);
			throw new D("" + i, o || [])
		},
		L = function (t, e, n) {
			return t || j("", null, e, Array.prototype.slice.call(arguments, 2)), t
		},
		x = function (t, e) {
			throw new D("Failure" + (t ? ": " + t : ""), Array.prototype.slice.call(arguments, 1))
		},
		U = function (t, e, n) {
			return s(t) || j("Expected number but got %s: %s.", [u(t), t], e, Array.prototype.slice.call(arguments, 2)), t
		},
		F = function (t, e, n) {
			i(t) || j("Expected string but got %s: %s.", [u(t), t], e, Array.prototype.slice.call(arguments, 2))
		},
		M = function (t, e, n) {
			f(t) || j("Expected function but got %s: %s.", [u(t), t], e, Array.prototype.slice.call(arguments, 2))
		},
		V = function () {
			this.Rc = "", this.$e = B
		};
	V.prototype.mb = !0, V.prototype.kb = function () {
		return this.Rc
	}, V.prototype.toString = function () {
		return "Const{" + this.Rc + "}"
	};
	var W = function (t) {
			return t instanceof V && t.constructor === V && t.$e === B ? t.Rc : (x("expected object of type Const, got '" + t + "'"), "type_error:Const")
		},
		B = {},
		X = function (t) {
			var e = new V;
			return e.Rc = t, e
		};
	X("");
	var H = function () {
		this.Kc = "", this.af = $
	};
	H.prototype.mb = !0, H.prototype.kb = function () {
		return this.Kc
	}, H.prototype.toString = function () {
		return "TrustedResourceUrl{" + this.Kc + "}"
	};
	var q, K = function (t) {
			return t instanceof H && t.constructor === H && t.af === $ ? t.Kc : (x("expected object of type TrustedResourceUrl, got '" + t + "' of type " + u(t)), "type_error:TrustedResourceUrl")
		},
		z = function (t, e) {
			return t = G(t, e), e = new H, e.Kc = t, e
		},
		G = function (t, e) {
			var n = W(t);
			if (!Y.test(n)) throw Error("Invalid TrustedResourceUrl format: " + n);
			return n.replace(Q, function (t, r) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) throw Error('Found marker, "' + r + '", in format string, "' + n + '", but no valid label mapping found in args: ' + JSON.stringify(e));
				return t = e[r], t instanceof V ? W(t) : encodeURIComponent(String(t))
			})
		},
		Q = /%{(\w+)}/g,
		Y = /^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank(#|$)/i,
		$ = {},
		J = Array.prototype.indexOf ? function (t, e, n) {
			return L(null != t.length), Array.prototype.indexOf.call(t, e, n)
		} : function (t, e, n) {
			if (n = null == n ? 0 : 0 > n ? Math.max(0, t.length + n) : n, i(t)) return i(e) && 1 == e.length ? t.indexOf(e, n) : -1;
			for (; n < t.length; n++)
				if (n in t && t[n] === e) return n;
			return -1
		},
		Z = Array.prototype.forEach ? function (t, e, n) {
			L(null != t.length), Array.prototype.forEach.call(t, e, n)
		} : function (t, e, n) {
			for (var r = t.length, o = i(t) ? t.split("") : t, s = 0; s < r; s++) s in o && e.call(n, o[s], s, t)
		},
		tt = function (t, e) {
			for (var n = i(t) ? t.split("") : t, r = t.length - 1; 0 <= r; --r) r in n && e.call(void 0, n[r], r, t)
		},
		et = Array.prototype.map ? function (t, e, n) {
			return L(null != t.length), Array.prototype.map.call(t, e, n)
		} : function (t, e, n) {
			for (var r = t.length, o = Array(r), s = i(t) ? t.split("") : t, a = 0; a < r; a++) a in s && (o[a] = e.call(n, s[a], a, t));
			return o
		},
		nt = Array.prototype.some ? function (t, e, n) {
			return L(null != t.length), Array.prototype.some.call(t, e, n)
		} : function (t, e, n) {
			for (var r = t.length, o = i(t) ? t.split("") : t, s = 0; s < r; s++)
				if (s in o && e.call(n, o[s], s, t)) return !0;
			return !1
		},
		rt = function (t) {
			t: {
				for (var e = Gr, n = t.length, r = i(t) ? t.split("") : t, o = 0; o < n; o++)
					if (o in r && e.call(void 0, r[o], o, t)) {
						e = o;
						break t
					}
				e = -1
			}
			return 0 > e ? null : i(t) ? t.charAt(e) : t[e]
		},
		it = function (t, e) {
			return 0 <= J(t, e)
		},
		ot = function (t, e) {
			var n;
			return (n = 0 <= (e = J(t, e))) && st(t, e), n
		},
		st = function (t, e) {
			return L(null != t.length), 1 == Array.prototype.splice.call(t, e, 1).length
		},
		at = function (t, e) {
			var n = 0;
			tt(t, function (r, i) {
				e.call(void 0, r, i, t) && st(t, i) && n++
			})
		},
		ut = function (t) {
			return Array.prototype.concat.apply([], arguments)
		},
		ct = function (t) {
			var e = t.length;
			if (0 < e) {
				for (var n = Array(e), r = 0; r < e; r++) n[r] = t[r];
				return n
			}
			return []
		},
		ht = function (t) {
			return et(t, function (t) {
				return t = t.toString(16), 1 < t.length ? t : "0" + t
			}).join("")
		};
	t: {
		var lt = n.navigator;
		if (lt) {
			var ft = lt.userAgent;
			if (ft) {
				q = ft;
				break t
			}
		}
		q = ""
	}
	var pt = function (t) {
			return P(q, t)
		},
		dt = function (t, e) {
			for (var n in t) e.call(void 0, t[n], n, t)
		},
		vt = function (t, e) {
			for (var n in t)
				if (e.call(void 0, t[n], n, t)) return !0;
			return !1
		},
		yt = function (t) {
			var e, n = [],
				r = 0;
			for (e in t) n[r++] = t[e];
			return n
		},
		gt = function (t) {
			var e, n = [],
				r = 0;
			for (e in t) n[r++] = e;
			return n
		},
		mt = function (t) {
			for (var e in t) return !1;
			return !0
		},
		bt = function (t, e) {
			for (var n in t)
				if (!(n in e) || t[n] !== e[n]) return !1;
			for (n in e)
				if (!(n in t)) return !1;
			return !0
		},
		wt = function (t) {
			var e, n = {};
			for (e in t) n[e] = t[e];
			return n
		},
		Et = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
		Ot = function (t, e) {
			for (var n, r, i = 1; i < arguments.length; i++) {
				r = arguments[i];
				for (n in r) t[n] = r[n];
				for (var o = 0; o < Et.length; o++) n = Et[o], Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
			}
		},
		It = function (t) {
			return It[" "](t), t
		};
	It[" "] = a;
	var Tt, Ct = function (t, e) {
			var n = Ft;
			return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : n[t] = e(t)
		},
		St = pt("Opera"),
		At = pt("Trident") || pt("MSIE"),
		Nt = pt("Edge"),
		Rt = Nt || At,
		kt = pt("Gecko") && !(P(q.toLowerCase(), "webkit") && !pt("Edge")) && !(pt("Trident") || pt("MSIE")) && !pt("Edge"),
		Pt = P(q.toLowerCase(), "webkit") && !pt("Edge"),
		_t = function () {
			var t = n.document;
			return t ? t.documentMode : void 0
		};
	t: {
		var Dt = "",
			jt = function () {
				var t = q;
				return kt ? /rv\:([^\);]+)(\)|;)/.exec(t) : Nt ? /Edge\/([\d\.]+)/.exec(t) : At ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t) : Pt ? /WebKit\/(\S+)/.exec(t) : St ? /(?:Version)[ \/]?(\S+)/.exec(t) : void 0
			}();
		if (jt && (Dt = jt ? jt[1] : ""), At) {
			var Lt = _t();
			if (null != Lt && Lt > parseFloat(Dt)) {
				Tt = String(Lt);
				break t
			}
		}
		Tt = Dt
	}
	var xt, Ut = Tt,
		Ft = {},
		Mt = function (t) {
			return Ct(t, function () {
				for (var e = 0, n = O(String(Ut)).split("."), r = O(String(t)).split("."), i = Math.max(n.length, r.length), o = 0; 0 == e && o < i; o++) {
					var s = n[o] || "",
						a = r[o] || "";
					do {
						if (s = /(\d*)(\D*)(.*)/.exec(s) || ["", "", "", ""], a = /(\d*)(\D*)(.*)/.exec(a) || ["", "", "", ""], 0 == s[0].length && 0 == a[0].length) break;
						e = _(0 == s[1].length ? 0 : parseInt(s[1], 10), 0 == a[1].length ? 0 : parseInt(a[1], 10)) || _(0 == s[2].length, 0 == a[2].length) || _(s[2], a[2]), s = s[3], a = a[3]
					} while (0 == e)
				}
				return 0 <= e
			})
		},
		Vt = n.document;
	xt = Vt && At ? _t() || ("CSS1Compat" == Vt.compatMode ? parseInt(Ut, 10) : 5) : void 0;
	var Wt, Bt = null,
		Xt = null,
		Ht = function (t) {
			var e = "";
			return qt(t, function (t) {
				e += String.fromCharCode(t)
			}), e
		},
		qt = function (t, e) {
			function n(e) {
				for (; r < t.length;) {
					var n = t.charAt(r++),
						i = Xt[n];
					if (null != i) return i;
					if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n)
				}
				return e
			}
			Kt();
			for (var r = 0;;) {
				var i = n(-1),
					o = n(0),
					s = n(64),
					a = n(64);
				if (64 === a && -1 === i) break;
				e(i << 2 | o >> 4), 64 != s && (e(o << 4 & 240 | s >> 2), 64 != a && e(s << 6 & 192 | a))
			}
		},
		Kt = function () {
			if (!Bt) {
				Bt = {}, Xt = {};
				for (var t = 0; 65 > t; t++) Bt[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(t), Xt[Bt[t]] = t, 62 <= t && (Xt["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(t)] = t)
			}
		},
		zt = function (t, e) {
			this.Ia = 64, this.oc = n.Uint8Array ? new Uint8Array(this.Ia) : Array(this.Ia), this.Vc = this.nb = 0, this.l = [], this.Sf = t, this.we = e, this.tg = n.Int32Array ? new Int32Array(64) : Array(64), r(Wt) || (Wt = n.Int32Array ? new Int32Array(Jt) : Jt), this.reset()
		};
	b(zt, function () {
		this.Ia = -1
	});
	for (var Gt = [], Qt = 0; 63 > Qt; Qt++) Gt[Qt] = 0;
	var Yt = ut(128, Gt);
	zt.prototype.reset = function () {
		this.Vc = this.nb = 0, this.l = n.Int32Array ? new Int32Array(this.we) : ct(this.we)
	};
	var $t = function (t) {
		var e = t.oc;
		L(e.length == t.Ia);
		for (var n = t.tg, r = 0, i = 0; i < e.length;) n[r++] = e[i] << 24 | e[i + 1] << 16 | e[i + 2] << 8 | e[i + 3], i = 4 * r;
		for (e = 16; 64 > e; e++) {
			r = 0 | n[e - 15], i = ((i = 0 | n[e - 2]) >>> 17 | i << 15) ^ (i >>> 19 | i << 13) ^ i >>> 10;
			var o = (0 | n[e - 16]) + ((r >>> 7 | r << 25) ^ (r >>> 18 | r << 14) ^ r >>> 3) | 0,
				s = (0 | n[e - 7]) + i | 0;
			n[e] = o + s | 0
		}
		r = 0 | t.l[0], i = 0 | t.l[1];
		var a = 0 | t.l[2],
			u = 0 | t.l[3],
			c = 0 | t.l[4],
			h = 0 | t.l[5],
			l = 0 | t.l[6];
		for (o = 0 | t.l[7], e = 0; 64 > e; e++) {
			var f = ((r >>> 2 | r << 30) ^ (r >>> 13 | r << 19) ^ (r >>> 22 | r << 10)) + (r & i ^ r & a ^ i & a) | 0;
			s = (o = o + ((c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7)) | 0) + ((s = (s = c & h ^ ~c & l) + (0 | Wt[e]) | 0) + (0 | n[e]) | 0) | 0, o = l, l = h, h = c, c = u + s | 0, u = a, a = i, i = r, r = s + f | 0
		}
		t.l[0] = t.l[0] + r | 0, t.l[1] = t.l[1] + i | 0, t.l[2] = t.l[2] + a | 0, t.l[3] = t.l[3] + u | 0, t.l[4] = t.l[4] + c | 0, t.l[5] = t.l[5] + h | 0, t.l[6] = t.l[6] + l | 0, t.l[7] = t.l[7] + o | 0
	};
	zt.prototype.update = function (t, e) {
		r(e) || (e = t.length);
		var n = 0,
			o = this.nb;
		if (i(t))
			for (; n < e;) this.oc[o++] = t.charCodeAt(n++), o == this.Ia && ($t(this), o = 0);
		else {
			if (!l(t)) throw Error("message must be string or array");
			for (; n < e;) {
				var s = t[n++];
				if (!("number" == typeof s && 0 <= s && 255 >= s && s == (0 | s))) throw Error("message must be a byte array");
				this.oc[o++] = s, o == this.Ia && ($t(this), o = 0)
			}
		}
		this.nb = o, this.Vc += e
	}, zt.prototype.digest = function () {
		var t = [],
			e = 8 * this.Vc;
		56 > this.nb ? this.update(Yt, 56 - this.nb) : this.update(Yt, this.Ia - (this.nb - 56));
		for (var n = 63; 56 <= n; n--) this.oc[n] = 255 & e, e /= 256;
		for ($t(this), n = e = 0; n < this.Sf; n++)
			for (var r = 24; 0 <= r; r -= 8) t[e++] = this.l[n] >> r & 255;
		return t
	};
	var Jt = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
		Zt = function () {
			zt.call(this, 8, te)
		};
	b(Zt, zt);
	var te = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
		ee = function () {
			this.Ka = this.Ka, this.Hc = this.Hc
		};
	ee.prototype.Ka = !1, ee.prototype.isDisposed = function () {
		return this.Ka
	}, ee.prototype.ib = function () {
		if (this.Hc)
			for (; this.Hc.length;) this.Hc.shift()()
	};
	var ne = !At || 9 <= Number(xt),
		re = At && !Mt("9");
	!Pt || Mt("528"), kt && Mt("1.9b") || At && Mt("8") || St && Mt("9.5") || Pt && Mt("528"), kt && !Mt("8") || At && Mt("9");
	var ie = function () {
			if (!n.addEventListener || !Object.defineProperty) return !1;
			var t = !1,
				e = Object.defineProperty({}, "passive", {
					get: function () {
						t = !0
					}
				});
			return n.addEventListener("test", a, e), n.removeEventListener("test", a, e), t
		}(),
		oe = function (t, e) {
			this.type = t, this.currentTarget = this.target = e, this.defaultPrevented = this.Ua = !1, this.Je = !0
		};
	oe.prototype.stopPropagation = function () {
		this.Ua = !0
	}, oe.prototype.preventDefault = function () {
		this.defaultPrevented = !0, this.Je = !1
	};
	var se = function (t, e) {
		oe.call(this, t ? t.type : ""), this.relatedTarget = this.currentTarget = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0, this.key = "", this.charCode = this.keyCode = 0, this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.fa = this.state = null, t && this.init(t, e)
	};
	b(se, oe), se.prototype.init = function (t, e) {
		var n = this.type = t.type,
			r = t.changedTouches ? t.changedTouches[0] : null;
		if (this.target = t.target || t.srcElement, this.currentTarget = e, e = t.relatedTarget) {
			if (kt) {
				t: {
					try {
						It(e.nodeName);
						var i = !0;
						break t
					} catch (t) {}
					i = !1
				}
				i || (e = null)
			}
		} else "mouseover" == n ? e = t.fromElement : "mouseout" == n && (e = t.toElement);
		this.relatedTarget = e, null === r ? (this.offsetX = Pt || void 0 !== t.offsetX ? t.offsetX : t.layerX, this.offsetY = Pt || void 0 !== t.offsetY ? t.offsetY : t.layerY, this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX, this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY, this.screenX = t.screenX || 0, this.screenY = t.screenY || 0) : (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0), this.button = t.button, this.keyCode = t.keyCode || 0, this.key = t.key || "", this.charCode = t.charCode || ("keypress" == n ? t.keyCode : 0), this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.shiftKey = t.shiftKey, this.metaKey = t.metaKey, this.state = t.state, this.fa = t, t.defaultPrevented && this.preventDefault()
	}, se.prototype.stopPropagation = function () {
		se.Sc.stopPropagation.call(this), this.fa.stopPropagation ? this.fa.stopPropagation() : this.fa.cancelBubble = !0
	}, se.prototype.preventDefault = function () {
		se.Sc.preventDefault.call(this);
		var t = this.fa;
		if (t.preventDefault) t.preventDefault();
		else if (t.returnValue = !1, re) try {
			(t.ctrlKey || 112 <= t.keyCode && 123 >= t.keyCode) && (t.keyCode = -1)
		} catch (t) {}
	}, se.prototype.wf = function () {
		return this.fa
	};
	var ae = "closure_listenable_" + (1e6 * Math.random() | 0),
		ue = 0,
		ce = function (t, e, n, r, i) {
			this.listener = t, this.Lc = null, this.src = e, this.type = n, this.capture = !!r, this.uc = i, this.key = ++ue, this.yb = this.nc = !1
		},
		he = function (t) {
			t.yb = !0, t.listener = null, t.Lc = null, t.src = null, t.uc = null
		},
		le = function (t) {
			this.src = t, this.J = {}, this.hc = 0
		};
	le.prototype.add = function (t, e, n, r, i) {
		var o = t.toString();
		(t = this.J[o]) || (t = this.J[o] = [], this.hc++);
		var s = pe(t, e, r, i);
		return -1 < s ? (e = t[s], n || (e.nc = !1)) : (e = new ce(e, this.src, o, !!r, i), e.nc = n, t.push(e)), e
	}, le.prototype.remove = function (t, e, n, r) {
		if (!((t = t.toString()) in this.J)) return !1;
		var i = this.J[t];
		return -1 < (e = pe(i, e, n, r)) && (he(i[e]), st(i, e), 0 == i.length && (delete this.J[t], this.hc--), !0)
	};
	var fe = function (t, e) {
		var n = e.type;
		n in t.J && ot(t.J[n], e) && (he(e), 0 == t.J[n].length && (delete t.J[n], t.hc--))
	};
	le.prototype.od = function (t, e, n, r) {
		var i = -1;
		return (t = this.J[t.toString()]) && (i = pe(t, e, n, r)), -1 < i ? t[i] : null
	}, le.prototype.hasListener = function (t, e) {
		var n = r(t),
			i = n ? t.toString() : "",
			o = r(e);
		return vt(this.J, function (t) {
			for (var r = 0; r < t.length; ++r)
				if (!(n && t[r].type != i || o && t[r].capture != e)) return !0;
			return !1
		})
	};
	var pe = function (t, e, n, r) {
			for (var i = 0; i < t.length; ++i) {
				var o = t[i];
				if (!o.yb && o.listener == e && o.capture == !!n && o.uc == r) return i
			}
			return -1
		},
		de = "closure_lm_" + (1e6 * Math.random() | 0),
		ve = {},
		ye = 0,
		ge = function (t, e, n, r, i) {
			if (r && r.once) we(t, e, n, r, i);
			else if (h(e))
				for (var o = 0; o < e.length; o++) ge(t, e[o], n, r, i);
			else n = Re(n), t && t[ae] ? t.listen(e, n, p(r) ? !!r.capture : !!r, i) : me(t, e, n, !1, r, i)
		},
		me = function (t, e, n, r, i, o) {
			if (!e) throw Error("Invalid event type");
			var s = p(i) ? !!i.capture : !!i,
				a = Ae(t);
			if (a || (t[de] = a = new le(t)), !(n = a.add(e, n, r, s, o)).Lc) {
				if (r = be(), n.Lc = r, r.src = t, r.listener = n, t.addEventListener) ie || (i = s), void 0 === i && (i = !1), t.addEventListener(e.toString(), r, i);
				else {
					if (!t.attachEvent) throw Error("addEventListener and attachEvent are unavailable.");
					t.attachEvent(Ie(e.toString()), r)
				}
				ye++
			}
		},
		be = function () {
			var t = Se,
				e = ne ? function (n) {
					return t.call(e.src, e.listener, n)
				} : function (n) {
					if (!(n = t.call(e.src, e.listener, n))) return n
				};
			return e
		},
		we = function (t, e, n, r, i) {
			if (h(e))
				for (var o = 0; o < e.length; o++) we(t, e[o], n, r, i);
			else n = Re(n), t && t[ae] ? Sr(t, e, n, p(r) ? !!r.capture : !!r, i) : me(t, e, n, !0, r, i)
		},
		Ee = function (t, e, n, r, i) {
			if (h(e))
				for (var o = 0; o < e.length; o++) Ee(t, e[o], n, r, i);
			else r = p(r) ? !!r.capture : !!r, n = Re(n), t && t[ae] ? t.ea.remove(String(e), n, r, i) : t && (t = Ae(t)) && (e = t.od(e, n, r, i)) && Oe(e)
		},
		Oe = function (t) {
			if (!s(t) && t && !t.yb) {
				var e = t.src;
				if (e && e[ae]) fe(e.ea, t);
				else {
					var n = t.type,
						r = t.Lc;
					e.removeEventListener ? e.removeEventListener(n, r, t.capture) : e.detachEvent && e.detachEvent(Ie(n), r), ye--, (n = Ae(e)) ? (fe(n, t), 0 == n.hc && (n.src = null, e[de] = null)) : he(t)
				}
			}
		},
		Ie = function (t) {
			return t in ve ? ve[t] : ve[t] = "on" + t
		},
		Te = function (t, e, n, r) {
			var i = !0;
			if ((t = Ae(t)) && (e = t.J[e.toString()]))
				for (e = e.concat(), t = 0; t < e.length; t++) {
					var o = e[t];
					o && o.capture == n && !o.yb && (o = Ce(o, r), i = i && !1 !== o)
				}
			return i
		},
		Ce = function (t, e) {
			var n = t.listener,
				r = t.uc || t.src;
			return t.nc && Oe(t), n.call(r, e)
		},
		Se = function (t, e) {
			if (t.yb) return !0;
			if (!ne) {
				if (!e) t: {
					e = ["window", "event"];
					for (var r, i = n; r = e.shift();) {
						if (null == i[r]) {
							e = null;
							break t
						}
						i = i[r]
					}
					e = i
				}
				if (r = e, e = new se(r, this), i = !0, !(0 > r.keyCode || void 0 != r.returnValue)) {
					t: {
						var o = !1;
						if (0 == r.keyCode) try {
							r.keyCode = -1;
							break t
						} catch (t) {
							o = !0
						}(o || void 0 == r.returnValue) && (r.returnValue = !0)
					}
					for (r = [], o = e.currentTarget; o; o = o.parentNode) r.push(o);o = t.type;
					for (var s = r.length - 1; !e.Ua && 0 <= s; s--) e.currentTarget = r[s],
					t = Te(r[s], o, !0, e),
					i = i && t;
					for (s = 0; !e.Ua && s < r.length; s++) e.currentTarget = r[s],
					t = Te(r[s], o, !1, e),
					i = i && t
				}
				return i
			}
			return Ce(t, new se(e, this))
		},
		Ae = function (t) {
			return t = t[de], t instanceof le ? t : null
		},
		Ne = "__closure_events_fn_" + (1e9 * Math.random() >>> 0),
		Re = function (t) {
			return L(t, "Listener can not be null."), f(t) ? t : (L(t.handleEvent, "An object listener must have handleEvent method."), t[Ne] || (t[Ne] = function (e) {
				return t.handleEvent(e)
			}), t[Ne])
		},
		ke = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/,
		Pe = function () {
			this.wa = "", this.Ze = Le
		};
	Pe.prototype.mb = !0, Pe.prototype.kb = function () {
		return this.wa
	}, Pe.prototype.toString = function () {
		return "SafeUrl{" + this.wa + "}"
	};
	var _e = function (t) {
			return t instanceof Pe && t.constructor === Pe && t.Ze === Le ? t.wa : (x("expected object of type SafeUrl, got '" + t + "' of type " + u(t)), "type_error:SafeUrl")
		},
		De = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
		je = function (t) {
			return t instanceof Pe ? t : (t = t.mb ? t.kb() : String(t), De.test(t) || (t = "about:invalid#zClosurez"), xe(t))
		},
		Le = {},
		xe = function (t) {
			var e = new Pe;
			return e.wa = t, e
		};
	xe("about:blank");
	var Ue = function (t) {
			var e = [];
			return Me(new Fe, t, e), e.join("")
		},
		Fe = function () {
			this.Mc = void 0
		},
		Me = function (t, e, n) {
			if (null == e) n.push("null");
			else {
				if ("object" == typeof e) {
					if (h(e)) {
						var r = e;
						e = r.length, n.push("[");
						for (var i = "", o = 0; o < e; o++) n.push(i), i = r[o], Me(t, t.Mc ? t.Mc.call(r, String(o), i) : i, n), i = ",";
						return void n.push("]")
					}
					if (!(e instanceof String || e instanceof Number || e instanceof Boolean)) {
						n.push("{"), o = "";
						for (r in e) Object.prototype.hasOwnProperty.call(e, r) && "function" != typeof (i = e[r]) && (n.push(o), Be(r, n), n.push(":"), Me(t, t.Mc ? t.Mc.call(e, r, i) : i, n), o = ",");
						return void n.push("}")
					}
					e = e.valueOf()
				}
				switch (typeof e) {
					case "string":
						Be(e, n);
						break;
					case "number":
						n.push(isFinite(e) && !isNaN(e) ? String(e) : "null");
						break;
					case "boolean":
						n.push(String(e));
						break;
					case "function":
						n.push("null");
						break;
					default:
						throw Error("Unknown type: " + typeof e)
				}
			}
		},
		Ve = {
			'"': '\\"',
			"\\": "\\\\",
			"/": "\\/",
			"\b": "\\b",
			"\f": "\\f",
			"\n": "\\n",
			"\r": "\\r",
			"\t": "\\t",
			"\v": "\\u000b"
		},
		We = /\uffff/.test("￿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
		Be = function (t, e) {
			e.push('"', t.replace(We, function (t) {
				var e = Ve[t];
				return e || (e = "\\u" + (65536 | t.charCodeAt(0)).toString(16).substr(1), Ve[t] = e), e
			}), '"')
		},
		Xe = function () {};
	Xe.prototype.be = null;
	var He, qe = function (t) {
			return t.be || (t.be = t.wd())
		},
		Ke = function () {};
	b(Ke, Xe), Ke.prototype.pc = function () {
		var t = ze(this);
		return t ? new ActiveXObject(t) : new XMLHttpRequest
	}, Ke.prototype.wd = function () {
		var t = {};
		return ze(this) && (t[0] = !0, t[1] = !0), t
	};
	var ze = function (t) {
		if (!t.ve && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
			for (var e = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], n = 0; n < e.length; n++) {
				var r = e[n];
				try {
					return new ActiveXObject(r), t.ve = r
				} catch (t) {}
			}
			throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed")
		}
		return t.ve
	};
	He = new Ke;
	var Ge = function () {};
	b(Ge, Xe), Ge.prototype.pc = function () {
		var t = new XMLHttpRequest;
		if ("withCredentials" in t) return t;
		if ("undefined" != typeof XDomainRequest) return new Qe;
		throw Error("Unsupported browser")
	}, Ge.prototype.wd = function () {
		return {}
	};
	var Qe = function () {
		this.na = new XDomainRequest, this.readyState = 0, this.onreadystatechange = null, this.responseText = "", this.status = -1, this.statusText = this.responseXML = null, this.na.onload = y(this.zf, this), this.na.onerror = y(this.qe, this), this.na.onprogress = y(this.Af, this), this.na.ontimeout = y(this.Bf, this)
	};
	(t = Qe.prototype).open = function (t, e, n) {
		if (null != n && !n) throw Error("Only async requests are supported.");
		this.na.open(t, e)
	}, t.send = function (t) {
		if (t) {
			if ("string" != typeof t) throw Error("Only string data is supported");
			this.na.send(t)
		} else this.na.send()
	}, t.abort = function () {
		this.na.abort()
	}, t.setRequestHeader = function () {}, t.getResponseHeader = function (t) {
		return "content-type" == t.toLowerCase() ? this.na.contentType : ""
	}, t.zf = function () {
		this.status = 200, this.responseText = this.na.responseText, Ye(this, 4)
	}, t.qe = function () {
		this.status = 500, this.responseText = "", Ye(this, 4)
	}, t.Bf = function () {
		this.qe()
	}, t.Af = function () {
		this.status = 200, Ye(this, 1)
	};
	var Ye = function (t, e) {
		t.readyState = e, t.onreadystatechange && t.onreadystatechange()
	};
	Qe.prototype.getAllResponseHeaders = function () {
		return "content-type: " + this.na.contentType
	};
	var $e = function (t, e, n) {
		this.Of = n, this.kf = t, this.cg = e, this.Gc = 0, this.vc = null
	};
	$e.prototype.get = function () {
		if (0 < this.Gc) {
			this.Gc--;
			var t = this.vc;
			this.vc = t.next, t.next = null
		} else t = this.kf();
		return t
	}, $e.prototype.put = function (t) {
		this.cg(t), this.Gc < this.Of && (this.Gc++, t.next = this.vc, this.vc = t)
	};
	var Je, Ze = function (t) {
			n.setTimeout(function () {
				throw t
			}, 0)
		},
		tn = function () {
			var t = n.MessageChannel;
			if (void 0 === t && "undefined" != typeof window && window.postMessage && window.addEventListener && !pt("Presto") && (t = function () {
					var t = document.createElement("IFRAME");
					t.style.display = "none", t.src = "", document.documentElement.appendChild(t);
					var e = t.contentWindow;
					(t = e.document).open(), t.write(""), t.close();
					var n = "callImmediate" + Math.random(),
						r = "file:" == e.location.protocol ? "*" : e.location.protocol + "//" + e.location.host;
					t = y(function (t) {
						"*" != r && t.origin != r || t.data != n || this.port1.onmessage()
					}, this), e.addEventListener("message", t, !1), this.port1 = {}, this.port2 = {
						postMessage: function () {
							e.postMessage(n, r)
						}
					}
				}), void 0 !== t && !pt("Trident") && !pt("MSIE")) {
				var e = new t,
					i = {},
					o = i;
				return e.port1.onmessage = function () {
						if (r(i.next)) {
							var t = (i = i.next).fe;
							i.fe = null, t()
						}
					},
					function (t) {
						o.next = {
							fe: t
						}, o = o.next, e.port2.postMessage(0)
					}
			}
			return "undefined" != typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (t) {
				var e = document.createElement("SCRIPT");
				e.onreadystatechange = function () {
					e.onreadystatechange = null, e.parentNode.removeChild(e), e = null, t(), t = null
				}, document.documentElement.appendChild(e)
			} : function (t) {
				n.setTimeout(t, 0)
			}
		},
		en = function () {
			this.$c = this.eb = null
		},
		nn = new $e(function () {
			return new rn
		}, function (t) {
			t.reset()
		}, 100);
	en.prototype.add = function (t, e) {
		var n = nn.get();
		n.set(t, e), this.$c ? this.$c.next = n : (L(!this.eb), this.eb = n), this.$c = n
	}, en.prototype.remove = function () {
		var t = null;
		return this.eb && (t = this.eb, this.eb = this.eb.next, this.eb || (this.$c = null), t.next = null), t
	};
	var rn = function () {
		this.next = this.scope = this.nd = null
	};
	rn.prototype.set = function (t, e) {
		this.nd = t, this.scope = e, this.next = null
	}, rn.prototype.reset = function () {
		this.next = this.scope = this.nd = null
	};
	var on, sn = function (t, e) {
			on || an(), un || (on(), un = !0), cn.add(t, e)
		},
		an = function () {
			if (-1 != String(n.Promise).indexOf("[native code]")) {
				var t = n.Promise.resolve(void 0);
				on = function () {
					t.then(hn)
				}
			} else on = function () {
				var t = hn;
				!f(n.setImmediate) || n.Window && n.Window.prototype && !pt("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (Je || (Je = tn()), Je(t)) : n.setImmediate(t)
			}
		},
		un = !1,
		cn = new en,
		hn = function () {
			for (var t; t = cn.remove();) {
				try {
					t.nd.call(t.scope)
				} catch (t) {
					Ze(t)
				}
				nn.put(t)
			}
			un = !1
		},
		ln = function (t) {
			return p(t) ? t.constructor.displayName || t.constructor.name || Object.prototype.toString.call(t) : void 0 === t ? "undefined" : null === t ? "null" : typeof t
		},
		fn = function (t) {
			return (t = t && t.ownerDocument) && (t.defaultView || t.parentWindow) || window
		},
		pn = !At || 9 <= Number(xt);
	!kt && !At || At && 9 <= Number(xt) || kt && Mt("1.9.1"), At && Mt("9");
	var dn = function () {
		this.wa = "", this.Ye = yn
	};
	dn.prototype.mb = !0, dn.prototype.kb = function () {
		return this.wa
	}, dn.prototype.toString = function () {
		return "SafeHtml{" + this.wa + "}"
	};
	var vn = function (t) {
			return t instanceof dn && t.constructor === dn && t.Ye === yn ? t.wa : (x("expected object of type SafeHtml, got '" + t + "' of type " + u(t)), "type_error:SafeHtml")
		},
		yn = {};
	dn.prototype.If = function (t) {
		return this.wa = t, this
	};
	var gn = function (t, e) {
			var n = fn(t);
			void 0 !== n.HTMLScriptElement && void 0 !== n.Element && L(t && (t instanceof n.HTMLScriptElement || !(t instanceof n.Element)), "Argument is not a HTMLScriptElement (or a non-Element mock); got: %s", ln(t)), t.src = K(e)
		},
		mn = function (t) {
			var e = document;
			return i(t) ? e.getElementById(t) : t
		},
		bn = function (t, e) {
			dt(e, function (e, n) {
				e && e.mb && (e = e.kb()), "style" == n ? t.style.cssText = e : "class" == n ? t.className = e : "for" == n ? t.htmlFor = e : wn.hasOwnProperty(n) ? t.setAttribute(wn[n], e) : 0 == n.lastIndexOf("aria-", 0) || 0 == n.lastIndexOf("data-", 0) ? t.setAttribute(n, e) : t[n] = e
			})
		},
		wn = {
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			colspan: "colSpan",
			frameborder: "frameBorder",
			height: "height",
			maxlength: "maxLength",
			nonce: "nonce",
			role: "role",
			rowspan: "rowSpan",
			type: "type",
			usemap: "useMap",
			valign: "vAlign",
			width: "width"
		},
		En = function (t, e, n) {
			var r = arguments,
				o = document,
				s = String(r[0]),
				a = r[1];
			if (!pn && a && (a.name || a.type)) {
				if (s = ["<", s], a.name && s.push(' name="', I(a.name), '"'), a.type) {
					s.push(' type="', I(a.type), '"');
					var u = {};
					Ot(u, a), delete u.type, a = u
				}
				s.push(">"), s = s.join("")
			}
			return s = o.createElement(s), a && (i(a) ? s.className = a : h(a) ? s.className = a.join(" ") : bn(s, a)), 2 < r.length && On(o, s, r), s
		},
		On = function (t, e, n) {
			function r(n) {
				n && e.appendChild(i(n) ? t.createTextNode(n) : n)
			}
			for (var o = 2; o < n.length; o++) {
				var s = n[o];
				!l(s) || p(s) && 0 < s.nodeType ? r(s) : Z(In(s) ? ct(s) : s, r)
			}
		},
		In = function (t) {
			if (t && "number" == typeof t.length) {
				if (p(t)) return "function" == typeof t.item || "string" == typeof t.item;
				if (f(t)) return "function" == typeof t.item
			}
			return !1
		},
		Tn = function (t) {
			t.prototype.then = t.prototype.then, t.prototype.$goog_Thenable = !0
		},
		Cn = function (t) {
			if (!t) return !1;
			try {
				return !!t.$goog_Thenable
			} catch (t) {
				return !1
			}
		},
		Sn = function (t, e) {
			if (this.Z = 0, this.ya = void 0, this.hb = this.ta = this.w = null, this.tc = this.md = !1, t != a) try {
				var n = this;
				t.call(e, function (t) {
					Mn(n, 2, t)
				}, function (t) {
					if (!(t instanceof Gn)) try {
						if (t instanceof Error) throw t;
						throw Error("Promise rejected.")
					} catch (t) {}
					Mn(n, 3, t)
				})
			} catch (t) {
				Mn(this, 3, t)
			}
		},
		An = function () {
			this.next = this.context = this.pb = this.Sa = this.child = null, this.Db = !1
		};
	An.prototype.reset = function () {
		this.context = this.pb = this.Sa = this.child = null, this.Db = !1
	};
	var Nn = new $e(function () {
			return new An
		}, function (t) {
			t.reset()
		}, 100),
		Rn = function (t, e, n) {
			var r = Nn.get();
			return r.Sa = t, r.pb = e, r.context = n, r
		},
		kn = function (t) {
			if (t instanceof Sn) return t;
			var e = new Sn(a);
			return Mn(e, 2, t), e
		},
		Pn = function (t) {
			return new Sn(function (e, n) {
				n(t)
			})
		},
		_n = function (t, e, n) {
			Vn(t, e, n, null) || sn(g(e, t))
		},
		Dn = function (t) {
			return new Sn(function (e, n) {
				var r = t.length,
					i = [];
				if (r)
					for (var o, s = 0; s < t.length; s++) o = t[s], _n(o, g(function (t, n) {
						r--, i[t] = n, 0 == r && e(i)
					}, s), function (t) {
						n(t)
					});
				else e(i)
			})
		},
		jn = function (t) {
			return new Sn(function (e) {
				var n = t.length,
					r = [];
				if (n)
					for (var i, o = function (t, i, o) {
							n--, r[t] = i ? {
								uf: !0,
								value: o
							} : {
								uf: !1,
								reason: o
							}, 0 == n && e(r)
						}, s = 0; s < t.length; s++) i = t[s], _n(i, g(o, s, !0), g(o, s, !1));
				else e(r)
			})
		};
	Sn.prototype.then = function (t, e, n) {
		return null != t && M(t, "opt_onFulfilled should be a function."), null != e && M(e, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), Fn(this, f(t) ? t : null, f(e) ? e : null, n)
	}, Tn(Sn);
	var Ln = function (t, e) {
		return e = Rn(e, e, void 0), e.Db = !0, Un(t, e), t
	};
	Sn.prototype.f = function (t, e) {
		return Fn(this, null, t, e)
	}, Sn.prototype.cancel = function (t) {
		0 == this.Z && sn(function () {
			var e = new Gn(t);
			xn(this, e)
		}, this)
	};
	var xn = function (t, e) {
			if (0 == t.Z)
				if (t.w) {
					var n = t.w;
					if (n.ta) {
						for (var r = 0, i = null, o = null, s = n.ta; s && (s.Db || (r++, s.child == t && (i = s), !(i && 1 < r))); s = s.next) i || (o = s);
						i && (0 == n.Z && 1 == r ? xn(n, e) : (o ? (r = o, L(n.ta), L(null != r), r.next == n.hb && (n.hb = r), r.next = r.next.next) : Xn(n), Hn(n, i, 3, e)))
					}
					t.w = null
				} else Mn(t, 3, e)
		},
		Un = function (t, e) {
			t.ta || 2 != t.Z && 3 != t.Z || Bn(t), L(null != e.Sa), t.hb ? t.hb.next = e : t.ta = e, t.hb = e
		},
		Fn = function (t, e, n, i) {
			var o = Rn(null, null, null);
			return o.child = new Sn(function (t, s) {
				o.Sa = e ? function (n) {
					try {
						var r = e.call(i, n);
						t(r)
					} catch (t) {
						s(t)
					}
				} : t, o.pb = n ? function (e) {
					try {
						var o = n.call(i, e);
						!r(o) && e instanceof Gn ? s(e) : t(o)
					} catch (t) {
						s(t)
					}
				} : s
			}), o.child.w = t, Un(t, o), o.child
		};
	Sn.prototype.qg = function (t) {
		L(1 == this.Z), this.Z = 0, Mn(this, 2, t)
	}, Sn.prototype.rg = function (t) {
		L(1 == this.Z), this.Z = 0, Mn(this, 3, t)
	};
	var Mn = function (t, e, n) {
			0 == t.Z && (t === n && (e = 3, n = new TypeError("Promise cannot resolve to itself")), t.Z = 1, Vn(n, t.qg, t.rg, t) || (t.ya = n, t.Z = e, t.w = null, Bn(t), 3 != e || n instanceof Gn || Kn(t, n)))
		},
		Vn = function (t, e, n, r) {
			if (t instanceof Sn) return null != e && M(e, "opt_onFulfilled should be a function."), null != n && M(n, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), Un(t, Rn(e || a, n || null, r)), !0;
			if (Cn(t)) return t.then(e, n, r), !0;
			if (p(t)) try {
				var i = t.then;
				if (f(i)) return Wn(t, i, e, n, r), !0
			} catch (t) {
				return n.call(r, t), !0
			}
			return !1
		},
		Wn = function (t, e, n, r, i) {
			var o = !1,
				s = function (t) {
					o || (o = !0, r.call(i, t))
				};
			try {
				e.call(t, function (t) {
					o || (o = !0, n.call(i, t))
				}, s)
			} catch (t) {
				s(t)
			}
		},
		Bn = function (t) {
			t.md || (t.md = !0, sn(t.qf, t))
		},
		Xn = function (t) {
			var e = null;
			return t.ta && (e = t.ta, t.ta = e.next, e.next = null), t.ta || (t.hb = null), null != e && L(null != e.Sa), e
		};
	Sn.prototype.qf = function () {
		for (var t; t = Xn(this);) Hn(this, t, this.Z, this.ya);
		this.md = !1
	};
	var Hn = function (t, e, n, r) {
			if (3 == n && e.pb && !e.Db)
				for (; t && t.tc; t = t.w) t.tc = !1;
			if (e.child) e.child.w = null, qn(e, n, r);
			else try {
				e.Db ? e.Sa.call(e.context) : qn(e, n, r)
			} catch (t) {
				zn.call(null, t)
			}
			Nn.put(e)
		},
		qn = function (t, e, n) {
			2 == e ? t.Sa.call(t.context, n) : t.pb && t.pb.call(t.context, n)
		},
		Kn = function (t, e) {
			t.tc = !0, sn(function () {
				t.tc && zn.call(null, e)
			})
		},
		zn = Ze,
		Gn = function (t) {
			w.call(this, t)
		};
	b(Gn, w), Gn.prototype.name = "cancel";
	var Qn = function (t, e) {
		this.Oc = [], this.De = t, this.je = e || null, this.Lb = this.jb = !1, this.ya = void 0, this.Ud = this.$d = this.dd = !1, this.Wc = 0, this.w = null, this.ed = 0
	};
	Qn.prototype.cancel = function (t) {
		if (this.jb) this.ya instanceof Qn && this.ya.cancel();
		else {
			if (this.w) {
				var e = this.w;
				delete this.w, t ? e.cancel(t) : 0 >= --e.ed && e.cancel()
			}
			this.De ? this.De.call(this.je, this) : this.Ud = !0, this.jb || Jn(this, new or)
		}
	}, Qn.prototype.he = function (t, e) {
		this.dd = !1, Yn(this, t, e)
	};
	var Yn = function (t, e, n) {
			t.jb = !0, t.ya = n, t.Lb = !e, rr(t)
		},
		$n = function (t) {
			if (t.jb) {
				if (!t.Ud) throw new ir;
				t.Ud = !1
			}
		};
	Qn.prototype.callback = function (t) {
		$n(this), Zn(t), Yn(this, !0, t)
	};
	var Jn = function (t, e) {
			$n(t), Zn(e), Yn(t, !1, e)
		},
		Zn = function (t) {
			L(!(t instanceof Qn), "An execution sequence may not be initiated with a blocking Deferred.")
		},
		tr = function (t, e) {
			er(t, null, e, void 0)
		},
		er = function (t, e, n, r) {
			L(!t.$d, "Blocking Deferreds can not be re-used"), t.Oc.push([e, n, r]), t.jb && rr(t)
		};
	Qn.prototype.then = function (t, e, n) {
		var r, i, o = new Sn(function (t, e) {
			r = t, i = e
		});
		return er(this, r, function (t) {
			t instanceof or ? o.cancel() : i(t)
		}), o.then(t, e, n)
	}, Tn(Qn);
	var nr = function (t) {
			return nt(t.Oc, function (t) {
				return f(t[1])
			})
		},
		rr = function (t) {
			if (t.Wc && t.jb && nr(t)) {
				var e = t.Wc,
					i = ar[e];
				i && (n.clearTimeout(i.Mb), delete ar[e]), t.Wc = 0
			}
			t.w && (t.w.ed--, delete t.w), e = t.ya;
			for (var o = i = !1; t.Oc.length && !t.dd;) {
				var s = t.Oc.shift(),
					a = s[0],
					u = s[1];
				if (s = s[2], a = t.Lb ? u : a) try {
					var c = a.call(s || t.je, e);
					r(c) && (t.Lb = t.Lb && (c == e || c instanceof Error), t.ya = e = c), (Cn(e) || "function" == typeof n.Promise && e instanceof n.Promise) && (o = !0, t.dd = !0)
				} catch (n) {
					e = n, t.Lb = !0, nr(t) || (i = !0)
				}
			}
			t.ya = e, o && (c = y(t.he, t, !0), o = y(t.he, t, !1), e instanceof Qn ? (er(e, c, o), e.$d = !0) : e.then(c, o)), i && (e = new sr(e), ar[e.Mb] = e, t.Wc = e.Mb)
		},
		ir = function () {
			w.call(this)
		};
	b(ir, w), ir.prototype.message = "Deferred has already fired", ir.prototype.name = "AlreadyCalledError";
	var or = function () {
		w.call(this)
	};
	b(or, w), or.prototype.message = "Deferred was canceled", or.prototype.name = "CanceledError";
	var sr = function (t) {
		this.Mb = n.setTimeout(y(this.pg, this), 0), this.$ = t
	};
	sr.prototype.pg = function () {
		throw L(ar[this.Mb], "Cannot throw an error that is not scheduled."), delete ar[this.Mb], this.$
	};
	var ar = {},
		ur = function (t) {
			var e = {},
				n = e.document || document,
				r = K(t),
				i = document.createElement("SCRIPT"),
				o = {
					Ke: i,
					gc: void 0
				},
				s = new Qn(hr, o),
				a = null,
				u = null != e.timeout ? e.timeout : 5e3;
			return 0 < u && (a = window.setTimeout(function () {
				lr(i, !0), Jn(s, new fr(1, "Timeout reached for loading script " + r))
			}, u), o.gc = a), i.onload = i.onreadystatechange = function () {
				i.readyState && "loaded" != i.readyState && "complete" != i.readyState || (lr(i, e.Dg || !1, a), s.callback(null))
			}, i.onerror = function () {
				lr(i, !0, a), Jn(s, new fr(0, "Error while loading script " + r))
			}, o = e.attributes || {}, Ot(o, {
				type: "text/javascript",
				charset: "UTF-8"
			}), bn(i, o), gn(i, t), cr(n).appendChild(i), s
		},
		cr = function (t) {
			var e;
			return (e = (t || document).getElementsByTagName("HEAD")) && 0 != e.length ? e[0] : t.documentElement
		},
		hr = function () {
			if (this && this.Ke) {
				var t = this.Ke;
				t && "SCRIPT" == t.tagName && lr(t, !0, this.gc)
			}
		},
		lr = function (t, e, r) {
			null != r && n.clearTimeout(r), t.onload = a, t.onerror = a, t.onreadystatechange = a, e && window.setTimeout(function () {
				t && t.parentNode && t.parentNode.removeChild(t)
			}, 0)
		},
		fr = function (t, e) {
			var n = "Jsloader error (code #" + t + ")";
			e && (n += ": " + e), w.call(this, n), this.code = t
		};
	b(fr, w);
	var pr = function (t, e, n, r, i) {
		this.reset(t, e, n, r, i)
	};
	pr.prototype.le = null;
	var dr = 0;
	pr.prototype.reset = function (t, e, n, r, i) {
		"number" == typeof i || dr++, r || m(), this.Rb = t, this.Rf = e, delete this.le
	}, pr.prototype.Me = function (t) {
		this.Rb = t
	};
	var vr = function (t) {
			this.Be = t, this.re = this.gd = this.Rb = this.w = null
		},
		yr = function (t, e) {
			this.name = t, this.value = e
		};
	yr.prototype.toString = function () {
		return this.name
	};
	var gr = new yr("SEVERE", 1e3),
		mr = new yr("INFO", 800),
		br = new yr("CONFIG", 700),
		wr = new yr("FINE", 500);
	vr.prototype.getName = function () {
		return this.Be
	}, vr.prototype.getParent = function () {
		return this.w
	}, vr.prototype.Me = function (t) {
		this.Rb = t
	};
	var Er = function (t) {
		return t.Rb ? t.Rb : t.w ? Er(t.w) : (x("Root logger has no level set."), null)
	};
	vr.prototype.log = function (t, e, r) {
		if (t.value >= Er(this).value)
			for (f(e) && (e = e()), t = new pr(t, String(e), this.Be), r && (t.le = r), r = "log:" + t.Rf, (e = n.console) && e.timeStamp && e.timeStamp(r), (e = n.msWriteProfilerMark) && e(r), r = this; r;) {
				var i = r,
					o = t;
				if (i.re)
					for (var s = 0; e = i.re[s]; s++) e(o);
				r = r.getParent()
			}
	}, vr.prototype.info = function (t, e) {
		this.log(mr, t, e)
	}, vr.prototype.config = function (t, e) {
		this.log(br, t, e)
	};
	var Or = {},
		Ir = null,
		Tr = function (t) {
			Ir || (Ir = new vr(""), Or[""] = Ir, Ir.Me(br));
			var e;
			if (!(e = Or[t])) {
				e = new vr(t);
				var n = t.lastIndexOf("."),
					r = t.substr(n + 1);
				(n = Tr(t.substr(0, n))).gd || (n.gd = {}), n.gd[r] = e, e.w = n, Or[t] = e
			}
			return e
		},
		Cr = function () {
			ee.call(this), this.ea = new le(this), this.cf = this, this.Ed = null
		};
	b(Cr, ee), Cr.prototype[ae] = !0, (t = Cr.prototype).addEventListener = function (t, e, n, r) {
		ge(this, t, e, n, r)
	}, t.removeEventListener = function (t, e, n, r) {
		Ee(this, t, e, n, r)
	}, t.dispatchEvent = function (t) {
		Nr(this);
		var e = this.Ed;
		if (e)
			for (var n = [], r = 1; e; e = e.Ed) n.push(e), L(1e3 > ++r, "infinite loop");
		if (e = this.cf, r = t.type || t, i(t)) t = new oe(t, e);
		else if (t instanceof oe) t.target = t.target || e;
		else {
			var o = t;
			t = new oe(r, e), Ot(t, o)
		}
		if (o = !0, n)
			for (var s = n.length - 1; !t.Ua && 0 <= s; s--) {
				var a = t.currentTarget = n[s];
				o = Ar(a, r, !0, t) && o
			}
		if (t.Ua || (a = t.currentTarget = e, o = Ar(a, r, !0, t) && o, t.Ua || (o = Ar(a, r, !1, t) && o)), n)
			for (s = 0; !t.Ua && s < n.length; s++) a = t.currentTarget = n[s], o = Ar(a, r, !1, t) && o;
		return o
	}, t.ib = function () {
		if (Cr.Sc.ib.call(this), this.ea) {
			var t, e = this.ea,
				n = 0;
			for (t in e.J) {
				for (var r = e.J[t], i = 0; i < r.length; i++) ++n, he(r[i]);
				delete e.J[t], e.hc--
			}
		}
		this.Ed = null
	}, t.listen = function (t, e, n, r) {
		return Nr(this), this.ea.add(String(t), e, !1, n, r)
	};
	var Sr = function (t, e, n, r, i) {
			t.ea.add(String(e), n, !0, r, i)
		},
		Ar = function (t, e, n, r) {
			if (!(e = t.ea.J[String(e)])) return !0;
			e = e.concat();
			for (var i = !0, o = 0; o < e.length; ++o) {
				var s = e[o];
				if (s && !s.yb && s.capture == n) {
					var a = s.listener,
						u = s.uc || s.src;
					s.nc && fe(t.ea, s), i = !1 !== a.call(u, r) && i
				}
			}
			return i && 0 != r.Je
		};
	Cr.prototype.od = function (t, e, n, r) {
		return this.ea.od(String(t), e, n, r)
	}, Cr.prototype.hasListener = function (t, e) {
		return this.ea.hasListener(r(t) ? String(t) : void 0, e)
	};
	var Nr = function (t) {
			L(t.ea, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
		},
		Rr = "StopIteration" in n ? n.StopIteration : {
			message: "StopIteration",
			stack: ""
		},
		kr = function () {};
	kr.prototype.next = function () {
		throw Rr
	}, kr.prototype.bf = function () {
		return this
	};
	var Pr = function (t, e) {
			t && t.log(wr, e, void 0)
		},
		_r = function (t, e) {
			this.ia = {}, this.A = [], this.cb = this.s = 0;
			var n = arguments.length;
			if (1 < n) {
				if (n % 2) throw Error("Uneven number of arguments");
				for (var r = 0; r < n; r += 2) this.set(arguments[r], arguments[r + 1])
			} else t && this.addAll(t)
		};
	(t = _r.prototype).ga = function () {
		Dr(this);
		for (var t = [], e = 0; e < this.A.length; e++) t.push(this.ia[this.A[e]]);
		return t
	}, t.ua = function () {
		return Dr(this), this.A.concat()
	}, t.Fb = function (t) {
		return jr(this.ia, t)
	}, t.clear = function () {
		this.ia = {}, this.cb = this.s = this.A.length = 0
	}, t.remove = function (t) {
		return !!jr(this.ia, t) && (delete this.ia[t], this.s--, this.cb++, this.A.length > 2 * this.s && Dr(this), !0)
	};
	var Dr = function (t) {
		var e, n;
		if (t.s != t.A.length) {
			for (e = n = 0; n < t.A.length;) {
				var r = t.A[n];
				jr(t.ia, r) && (t.A[e++] = r), n++
			}
			t.A.length = e
		}
		if (t.s != t.A.length) {
			var i = {};
			for (e = n = 0; n < t.A.length;) r = t.A[n], jr(i, r) || (t.A[e++] = r, i[r] = 1), n++;
			t.A.length = e
		}
	};
	(t = _r.prototype).get = function (t, e) {
		return jr(this.ia, t) ? this.ia[t] : e
	}, t.set = function (t, e) {
		jr(this.ia, t) || (this.s++, this.A.push(t), this.cb++), this.ia[t] = e
	}, t.addAll = function (t) {
		if (t instanceof _r) {
			var e = t.ua();
			t = t.ga()
		} else e = gt(t), t = yt(t);
		for (var n = 0; n < e.length; n++) this.set(e[n], t[n])
	}, t.forEach = function (t, e) {
		for (var n = this.ua(), r = 0; r < n.length; r++) {
			var i = n[r],
				o = this.get(i);
			t.call(e, o, i, this)
		}
	}, t.clone = function () {
		return new _r(this)
	}, t.bf = function (t) {
		Dr(this);
		var e = 0,
			n = this.cb,
			r = this,
			i = new kr;
		return i.next = function () {
			if (n != r.cb) throw Error("The map has changed since the iterator was created");
			if (e >= r.A.length) throw Rr;
			var i = r.A[e++];
			return t ? i : r.ia[i]
		}, i
	};
	var jr = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		},
		Lr = function (t) {
			if (t.ga && "function" == typeof t.ga) return t.ga();
			if (i(t)) return t.split("");
			if (l(t)) {
				for (var e = [], n = t.length, r = 0; r < n; r++) e.push(t[r]);
				return e
			}
			return yt(t)
		},
		xr = function (t) {
			if (t.ua && "function" == typeof t.ua) return t.ua();
			if (!t.ga || "function" != typeof t.ga) {
				if (l(t) || i(t)) {
					var e = [];
					t = t.length;
					for (var n = 0; n < t; n++) e.push(n);
					return e
				}
				return gt(t)
			}
		},
		Ur = function (t, e, n) {
			if (t.forEach && "function" == typeof t.forEach) t.forEach(e, n);
			else if (l(t) || i(t)) Z(t, e, n);
			else
				for (var r = xr(t), o = Lr(t), s = o.length, a = 0; a < s; a++) e.call(n, o[a], r && r[a], t)
		},
		Fr = function (t, e, r) {
			if (f(t)) r && (t = y(t, r));
			else {
				if (!t || "function" != typeof t.handleEvent) throw Error("Invalid listener argument");
				t = y(t.handleEvent, t)
			}
			return 2147483647 < Number(e) ? -1 : n.setTimeout(t, e || 0)
		},
		Mr = function (t) {
			var e = null;
			return new Sn(function (n, r) {
				-1 == (e = Fr(function () {
					n(void 0)
				}, t)) && r(Error("Failed to schedule timer."))
			}).f(function (t) {
				throw n.clearTimeout(e), t
			})
		},
		Vr = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
		Wr = function (t, e) {
			if (t) {
				t = t.split("&");
				for (var n = 0; n < t.length; n++) {
					var r = t[n].indexOf("="),
						i = null;
					if (0 <= r) {
						var o = t[n].substring(0, r);
						i = t[n].substring(r + 1)
					} else o = t[n];
					e(o, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "")
				}
			}
		},
		Br = function (t) {
			Cr.call(this), this.headers = new _r, this.bd = t || null, this.Aa = !1, this.ad = this.b = null, this.Qb = this.Ae = this.Dc = "", this.Oa = this.td = this.yc = this.ld = !1, this.zb = 0, this.Tc = null, this.Nc = "", this.Xc = this.Yf = this.Xe = !1
		};
	b(Br, Cr);
	var Xr = Br.prototype,
		Hr = Tr("goog.net.XhrIo");
	Xr.O = Hr;
	var qr = /^https?$/i,
		Kr = ["POST", "PUT"];
	Br.prototype.send = function (t, e, r, i) {
		if (this.b) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Dc + "; newUri=" + t);
		e = e ? e.toUpperCase() : "GET", this.Dc = t, this.Qb = "", this.Ae = e, this.ld = !1, this.Aa = !0, this.b = this.bd ? this.bd.pc() : He.pc(), this.ad = qe(this.bd ? this.bd : He), this.b.onreadystatechange = y(this.Ge, this), this.Yf && "onprogress" in this.b && (this.b.onprogress = y(function (t) {
			this.Fe(t, !0)
		}, this), this.b.upload && (this.b.upload.onprogress = y(this.Fe, this)));
		try {
			Pr(this.O, ri(this, "Opening Xhr")), this.td = !0, this.b.open(e, String(t), !0), this.td = !1
		} catch (t) {
			return Pr(this.O, ri(this, "Error opening Xhr: " + t.message)), void this.$(5, t)
		}
		t = r || "";
		var o = this.headers.clone();
		i && Ur(i, function (t, e) {
			o.set(e, t)
		}), i = rt(o.ua()), r = n.FormData && t instanceof n.FormData, !it(Kr, e) || i || r || o.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"), o.forEach(function (t, e) {
			this.b.setRequestHeader(e, t)
		}, this), this.Nc && (this.b.responseType = this.Nc), "withCredentials" in this.b && this.b.withCredentials !== this.Xe && (this.b.withCredentials = this.Xe);
		try {
			Zr(this), 0 < this.zb && (this.Xc = zr(this.b), Pr(this.O, ri(this, "Will abort after " + this.zb + "ms if incomplete, xhr2 " + this.Xc)), this.Xc ? (this.b.timeout = this.zb, this.b.ontimeout = y(this.gc, this)) : this.Tc = Fr(this.gc, this.zb, this)), Pr(this.O, ri(this, "Sending request")), this.yc = !0, this.b.send(t), this.yc = !1
		} catch (t) {
			Pr(this.O, ri(this, "Send error: " + t.message)), this.$(5, t)
		}
	};
	var zr = function (t) {
			return At && Mt(9) && s(t.timeout) && r(t.ontimeout)
		},
		Gr = function (t) {
			return "content-type" == t.toLowerCase()
		};
	Br.prototype.gc = function () {
		void 0 !== e && this.b && (this.Qb = "Timed out after " + this.zb + "ms, aborting", Pr(this.O, ri(this, this.Qb)), this.dispatchEvent("timeout"), this.abort(8))
	}, Br.prototype.$ = function (t, e) {
		this.Aa = !1, this.b && (this.Oa = !0, this.b.abort(), this.Oa = !1), this.Qb = e, Qr(this), Jr(this)
	};
	var Qr = function (t) {
		t.ld || (t.ld = !0, t.dispatchEvent("complete"), t.dispatchEvent("error"))
	};
	Br.prototype.abort = function () {
		this.b && this.Aa && (Pr(this.O, ri(this, "Aborting")), this.Aa = !1, this.Oa = !0, this.b.abort(), this.Oa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Jr(this))
	}, Br.prototype.ib = function () {
		this.b && (this.Aa && (this.Aa = !1, this.Oa = !0, this.b.abort(), this.Oa = !1), Jr(this, !0)), Br.Sc.ib.call(this)
	}, Br.prototype.Ge = function () {
		this.isDisposed() || (this.td || this.yc || this.Oa ? Yr(this) : this.Uf())
	}, Br.prototype.Uf = function () {
		Yr(this)
	};
	var Yr = function (t) {
		if (t.Aa && void 0 !== e)
			if (t.ad[1] && 4 == ti(t) && 2 == ei(t)) Pr(t.O, ri(t, "Local request error detected and ignored"));
			else if (t.yc && 4 == ti(t)) Fr(t.Ge, 0, t);
		else if (t.dispatchEvent("readystatechange"), 4 == ti(t)) {
			Pr(t.O, ri(t, "Request complete")), t.Aa = !1;
			try {
				var r = ei(t);
				t: switch (r) {
					case 200:
					case 201:
					case 202:
					case 204:
					case 206:
					case 304:
					case 1223:
						var i = !0;
						break t;
					default:
						i = !1
				}
				var o;
				if (!(o = i)) {
					var s;
					if (s = 0 === r) {
						var a = String(t.Dc).match(Vr)[1] || null;
						if (!a && n.self && n.self.location) {
							var u = n.self.location.protocol;
							a = u.substr(0, u.length - 1)
						}
						s = !qr.test(a ? a.toLowerCase() : "")
					}
					o = s
				}
				if (o) t.dispatchEvent("complete"), t.dispatchEvent("success");
				else {
					try {
						var c = 2 < ti(t) ? t.b.statusText : ""
					} catch (e) {
						Pr(t.O, "Can not get status: " + e.message), c = ""
					}
					t.Qb = c + " [" + ei(t) + "]", Qr(t)
				}
			} finally {
				Jr(t)
			}
		}
	};
	Br.prototype.Fe = function (t, e) {
		L("progress" === t.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress."), this.dispatchEvent($r(t, "progress")), this.dispatchEvent($r(t, e ? "downloadprogress" : "uploadprogress"))
	};
	var $r = function (t, e) {
			return {
				type: e,
				lengthComputable: t.lengthComputable,
				loaded: t.loaded,
				total: t.total
			}
		},
		Jr = function (t, e) {
			if (t.b) {
				Zr(t);
				var n = t.b,
					r = t.ad[0] ? a : null;
				t.b = null, t.ad = null, e || t.dispatchEvent("ready");
				try {
					n.onreadystatechange = r
				} catch (e) {
					(t = t.O) && t.log(gr, "Problem encountered resetting onreadystatechange: " + e.message, void 0)
				}
			}
		},
		Zr = function (t) {
			t.b && t.Xc && (t.b.ontimeout = null), s(t.Tc) && (n.clearTimeout(t.Tc), t.Tc = null)
		},
		ti = function (t) {
			return t.b ? t.b.readyState : 0
		},
		ei = function (t) {
			try {
				return 2 < ti(t) ? t.b.status : -1
			} catch (t) {
				return -1
			}
		},
		ni = function (t) {
			try {
				return t.b ? t.b.responseText : ""
			} catch (e) {
				return Pr(t.O, "Can not get responseText: " + e.message), ""
			}
		};
	Br.prototype.getResponse = function () {
		try {
			if (!this.b) return null;
			if ("response" in this.b) return this.b.response;
			switch (this.Nc) {
				case "":
				case "text":
					return this.b.responseText;
				case "arraybuffer":
					if ("mozResponseArrayBuffer" in this.b) return this.b.mozResponseArrayBuffer
			}
			var t = this.O;
			return t && t.log(gr, "Response type " + this.Nc + " is not supported on this browser", void 0), null
		} catch (t) {
			return Pr(this.O, "Can not get response: " + t.message), null
		}
	}, Br.prototype.getResponseHeader = function (t) {
		if (this.b && 4 == ti(this)) return t = this.b.getResponseHeader(t), null === t ? void 0 : t
	}, Br.prototype.getAllResponseHeaders = function () {
		return this.b && 4 == ti(this) ? this.b.getAllResponseHeaders() : ""
	};
	var ri = function (t, e) {
			return e + " [" + t.Ae + " " + t.Dc + " " + ei(t) + "]"
		},
		ii = function (t, e) {
			if (this.oa = this.ab = this.pa = "", this.rb = null, this.Na = this.Da = "", this.ba = this.Mf = !1, t instanceof ii) {
				this.ba = r(e) ? e : t.ba, oi(this, t.pa);
				var n = t.ab;
				fi(this), this.ab = n, si(this, t.oa), ai(this, t.rb), ui(this, t.Da), ci(this, t.ca.clone()), t = t.Na, fi(this), this.Na = t
			} else t && (n = String(t).match(Vr)) ? (this.ba = !!e, oi(this, n[1] || "", !0), t = n[2] || "", fi(this), this.ab = vi(t), si(this, n[3] || "", !0), ai(this, n[4]), ui(this, n[5] || "", !0), ci(this, n[6] || "", !0), t = n[7] || "", fi(this), this.Na = vi(t)) : (this.ba = !!e, this.ca = new Ii(null, 0, this.ba))
		};
	ii.prototype.toString = function () {
		var t = [],
			e = this.pa;
		e && t.push(yi(e, mi, !0), ":");
		var n = this.oa;
		return (n || "file" == e) && (t.push("//"), (e = this.ab) && t.push(yi(e, mi, !0), "@"), t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.rb) && t.push(":", String(n))), (n = this.Da) && (this.oa && "/" != n.charAt(0) && t.push("/"), t.push(yi(n, "/" == n.charAt(0) ? wi : bi, !0))), (n = this.ca.toString()) && t.push("?", n), (n = this.Na) && t.push("#", yi(n, Oi)), t.join("")
	}, ii.prototype.resolve = function (t) {
		var e = this.clone(),
			n = !!t.pa;
		if (n ? oi(e, t.pa) : n = !!t.ab, n) {
			var r = t.ab;
			fi(e), e.ab = r
		} else n = !!t.oa;
		if (n ? si(e, t.oa) : n = null != t.rb, r = t.Da, n) ai(e, t.rb);
		else if (n = !!t.Da) {
			if ("/" != r.charAt(0))
				if (this.oa && !this.Da) r = "/" + r;
				else {
					var i = e.Da.lastIndexOf("/"); - 1 != i && (r = e.Da.substr(0, i + 1) + r)
				}
			if (".." == (i = r) || "." == i) r = "";
			else if (P(i, "./") || P(i, "/.")) {
				r = 0 == i.lastIndexOf("/", 0), i = i.split("/");
				for (var o = [], s = 0; s < i.length;) {
					var a = i[s++];
					"." == a ? r && s == i.length && o.push("") : ".." == a ? ((1 < o.length || 1 == o.length && "" != o[0]) && o.pop(), r && s == i.length && o.push("")) : (o.push(a), r = !0)
				}
				r = o.join("/")
			} else r = i
		}
		return n ? ui(e, r) : n = "" !== t.ca.toString(), n ? ci(e, t.ca.clone()) : n = !!t.Na, n && (t = t.Na, fi(e), e.Na = t), e
	}, ii.prototype.clone = function () {
		return new ii(this)
	};
	var oi = function (t, e, n) {
			fi(t), t.pa = n ? vi(e, !0) : e, t.pa && (t.pa = t.pa.replace(/:$/, ""))
		},
		si = function (t, e, n) {
			fi(t), t.oa = n ? vi(e, !0) : e
		},
		ai = function (t, e) {
			if (fi(t), e) {
				if (e = Number(e), isNaN(e) || 0 > e) throw Error("Bad port number " + e);
				t.rb = e
			} else t.rb = null
		},
		ui = function (t, e, n) {
			fi(t), t.Da = n ? vi(e, !0) : e
		},
		ci = function (t, e, n) {
			fi(t), e instanceof Ii ? (t.ca = e, t.ca.Rd(t.ba)) : (n || (e = yi(e, Ei)), t.ca = new Ii(e, 0, t.ba))
		},
		hi = function (t, e, n) {
			fi(t), t.ca.set(e, n)
		},
		li = function (t, e) {
			return t.ca.get(e)
		};
	ii.prototype.removeParameter = function (t) {
		return fi(this), this.ca.remove(t), this
	};
	var fi = function (t) {
		if (t.Mf) throw Error("Tried to modify a read-only Uri")
	};
	ii.prototype.Rd = function (t) {
		return this.ba = t, this.ca && this.ca.Rd(t), this
	};
	var pi = function (t) {
			return t instanceof ii ? t.clone() : new ii(t, void 0)
		},
		di = function (t, e) {
			var n = new ii(null, void 0);
			return oi(n, "https"), t && si(n, t), e && ui(n, e), n
		},
		vi = function (t, e) {
			return t ? e ? decodeURI(t.replace(/%25/g, "%2525")) : decodeURIComponent(t) : ""
		},
		yi = function (t, e, n) {
			return i(t) ? (t = encodeURI(t).replace(e, gi), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), t) : null
		},
		gi = function (t) {
			return "%" + ((t = t.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & t).toString(16)
		},
		mi = /[#\/\?@]/g,
		bi = /[\#\?:]/g,
		wi = /[\#\?]/g,
		Ei = /[\#\?@]/g,
		Oi = /#/g,
		Ii = function (t, e, n) {
			this.s = this.m = null, this.T = t || null, this.ba = !!n
		},
		Ti = function (t) {
			t.m || (t.m = new _r, t.s = 0, t.T && Wr(t.T, function (e, n) {
				t.add(decodeURIComponent(e.replace(/\+/g, " ")), n)
			}))
		},
		Ci = function (t) {
			var e = xr(t);
			if (void 0 === e) throw Error("Keys are undefined");
			var n = new Ii(null, 0, void 0);
			t = Lr(t);
			for (var r = 0; r < e.length; r++) {
				var i = e[r],
					o = t[r];
				h(o) ? Si(n, i, o) : n.add(i, o)
			}
			return n
		};
	(t = Ii.prototype).add = function (t, e) {
		Ti(this), this.T = null, t = this.aa(t);
		var n = this.m.get(t);
		return n || this.m.set(t, n = []), n.push(e), this.s = U(this.s) + 1, this
	}, t.remove = function (t) {
		return Ti(this), t = this.aa(t), !!this.m.Fb(t) && (this.T = null, this.s = U(this.s) - this.m.get(t).length, this.m.remove(t))
	}, t.clear = function () {
		this.m = this.T = null, this.s = 0
	}, t.Fb = function (t) {
		return Ti(this), t = this.aa(t), this.m.Fb(t)
	}, t.forEach = function (t, e) {
		Ti(this), this.m.forEach(function (n, r) {
			Z(n, function (n) {
				t.call(e, n, r, this)
			}, this)
		}, this)
	}, t.ua = function () {
		Ti(this);
		for (var t = this.m.ga(), e = this.m.ua(), n = [], r = 0; r < e.length; r++)
			for (var i = t[r], o = 0; o < i.length; o++) n.push(e[r]);
		return n
	}, t.ga = function (t) {
		Ti(this);
		var e = [];
		if (i(t)) this.Fb(t) && (e = ut(e, this.m.get(this.aa(t))));
		else {
			t = this.m.ga();
			for (var n = 0; n < t.length; n++) e = ut(e, t[n])
		}
		return e
	}, t.set = function (t, e) {
		return Ti(this), this.T = null, t = this.aa(t), this.Fb(t) && (this.s = U(this.s) - this.m.get(t).length), this.m.set(t, [e]), this.s = U(this.s) + 1, this
	}, t.get = function (t, e) {
		return t = t ? this.ga(t) : [], 0 < t.length ? String(t[0]) : e
	};
	var Si = function (t, e, n) {
		t.remove(e), 0 < n.length && (t.T = null, t.m.set(t.aa(e), ct(n)), t.s = U(t.s) + n.length)
	};
	(t = Ii.prototype).toString = function () {
		if (this.T) return this.T;
		if (!this.m) return "";
		for (var t = [], e = this.m.ua(), n = 0; n < e.length; n++) {
			var r = e[n],
				i = encodeURIComponent(String(r));
			r = this.ga(r);
			for (var o = 0; o < r.length; o++) {
				var s = i;
				"" !== r[o] && (s += "=" + encodeURIComponent(String(r[o]))), t.push(s)
			}
		}
		return this.T = t.join("&")
	}, t.clone = function () {
		var t = new Ii;
		return t.T = this.T, this.m && (t.m = this.m.clone(), t.s = this.s), t
	}, t.aa = function (t) {
		return t = String(t), this.ba && (t = t.toLowerCase()), t
	}, t.Rd = function (t) {
		t && !this.ba && (Ti(this), this.T = null, this.m.forEach(function (t, e) {
			var n = e.toLowerCase();
			e != n && (this.remove(e), Si(this, n, t))
		}, this)), this.ba = t
	}, t.extend = function (t) {
		for (var e = 0; e < arguments.length; e++) Ur(arguments[e], function (t, e) {
			this.add(e, t)
		}, this)
	};
	var Ai = function () {
			var t = qi();
			return At && !!xt && 11 == xt || /Edge\/\d+/.test(t)
		},
		Ni = function () {
			return n.window && n.window.location.href || ""
		},
		Ri = function (t, e) {
			e = e || n.window;
			var r = "about:blank";
			t && (r = _e(je(t))), e.location.href = r
		},
		ki = function (t, e) {
			var n, r = [];
			for (n in t) n in e ? typeof t[n] != typeof e[n] ? r.push(n) : h(t[n]) ? bt(t[n], e[n]) || r.push(n) : "object" == typeof t[n] && null != t[n] && null != e[n] ? 0 < ki(t[n], e[n]).length && r.push(n) : t[n] !== e[n] && r.push(n) : r.push(n);
			for (n in e) n in t || r.push(n);
			return r
		},
		Pi = function () {
			var t = qi();
			return !((t = "Chrome" != Xi(t) ? null : (t = t.match(/\sChrome\/(\d+)/i)) && 2 == t.length ? parseInt(t[1], 10) : null) && 30 > t || At && xt && !(9 < xt))
		},
		_i = function (t) {
			return !!((t = (t || qi()).toLowerCase()).match(/android/) || t.match(/webos/) || t.match(/iphone|ipad|ipod/) || t.match(/blackberry/) || t.match(/windows phone/) || t.match(/iemobile/))
		},
		Di = function (t) {
			t = t || n.window;
			try {
				t.close()
			} catch (t) {}
		},
		ji = function (t, e, n) {
			var r = Math.floor(1e9 * Math.random()).toString();
			e = e || 500, n = n || 600;
			var i = (window.screen.availHeight - n) / 2,
				o = (window.screen.availWidth - e) / 2;
			e = {
				width: e,
				height: n,
				top: 0 < i ? i : 0,
				left: 0 < o ? o : 0,
				location: !0,
				resizable: !0,
				statusbar: !0,
				toolbar: !1
			}, n = qi().toLowerCase(), r && (e.target = r, P(n, "crios/") && (e.target = "_blank")), "Firefox" == Xi(qi()) && (t = t || "http://localhost", e.scrollbars = !0), n = t || "", (r = e) || (r = {}), t = window, e = n instanceof Pe ? n : je(void 0 !== n.href ? n.href : String(n)), n = r.target || n.target, i = [];
			for (s in r) switch (s) {
				case "width":
				case "height":
				case "top":
				case "left":
					i.push(s + "=" + r[s]);
					break;
				case "target":
				case "noreferrer":
					break;
				default:
					i.push(s + "=" + (r[s] ? 1 : 0))
			}
			var s = i.join(",");
			if ((pt("iPhone") && !pt("iPod") && !pt("iPad") || pt("iPad") || pt("iPod")) && t.navigator && t.navigator.standalone && n && "_self" != n ? (s = t.document.createElement("A"), void 0 !== (i = fn(s)).HTMLAnchorElement && void 0 !== i.Location && void 0 !== i.Element && L(s && (s instanceof i.HTMLAnchorElement || !(s instanceof i.Location || s instanceof i.Element)), "Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s", ln(s)), e instanceof Pe || e instanceof Pe || (e = e.mb ? e.kb() : String(e), L(De.test(e)) || (e = "about:invalid#zClosurez"), e = xe(e)), s.href = _e(e), s.setAttribute("target", n), r.noreferrer && s.setAttribute("rel", "noreferrer"), (r = document.createEvent("MouseEvent")).initMouseEvent("click", !0, !0, t, 1), s.dispatchEvent(r), s = {}) : r.noreferrer ? (s = t.open("", n, s), r = _e(e), s && (Rt && P(r, ";") && (r = "'" + r.replace(/'/g, "%27") + "'"), s.opener = null, t = X("b/12014412, meta tag with sanitized URL"), r = '<META HTTP-EQUIV="refresh" content="0; url=' + I(r) + '">', F(W(t), "must provide justification"), L(!/^[\s\xa0]*$/.test(W(t)), "must provide non-empty justification"), s.document.write(vn((new dn).If(r))), s.document.close())) : s = t.open(_e(e), n, s), s) try {
				s.focus()
			} catch (t) {}
			return s
		},
		Li = function (t) {
			return new Sn(function (e) {
				var n = function () {
					Mr(2e3).then(function () {
						if (t && !t.closed) return n();
						e()
					})
				};
				return n()
			})
		},
		xi = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
		Ui = function () {
			var t = null;
			return new Sn(function (e) {
				"complete" == n.document.readyState ? e() : (t = function () {
					e()
				}, we(window, "load", t))
			}).f(function (e) {
				throw Ee(window, "load", t), e
			})
		},
		Fi = function () {
			return Mi(void 0) ? Ui().then(function () {
				return new Sn(function (t, e) {
					var r = n.document,
						i = setTimeout(function () {
							e(Error("Cordova framework is not ready."))
						}, 1e3);
					r.addEventListener("deviceready", function () {
						clearTimeout(i), t()
					}, !1)
				})
			}) : Pn(Error("Cordova must run in an Android or iOS file scheme."))
		},
		Mi = function (t) {
			return t = t || qi(), !("file:" !== Yi() || !t.toLowerCase().match(/iphone|ipad|ipod|android/))
		},
		Vi = function () {
			var t = n.window;
			try {
				return !(!t || t == t.top)
			} catch (t) {
				return !1
			}
		},
		Wi = function () {
			return firebase.INTERNAL.hasOwnProperty("reactNative") ? "ReactNative" : firebase.INTERNAL.hasOwnProperty("node") ? "Node" : "Browser"
		},
		Bi = function () {
			var t = Wi();
			return "ReactNative" === t || "Node" === t
		},
		Xi = function (t) {
			var e = t.toLowerCase();
			return P(e, "opera/") || P(e, "opr/") || P(e, "opios/") ? "Opera" : P(e, "iemobile") ? "IEMobile" : P(e, "msie") || P(e, "trident/") ? "IE" : P(e, "edge/") ? "Edge" : P(e, "firefox/") ? "Firefox" : P(e, "silk/") ? "Silk" : P(e, "blackberry") ? "Blackberry" : P(e, "webos") ? "Webos" : !P(e, "safari/") || P(e, "chrome/") || P(e, "crios/") || P(e, "android") ? !P(e, "chrome/") && !P(e, "crios/") || P(e, "edge/") ? P(e, "android") ? "Android" : (t = t.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/)) && 2 == t.length ? t[1] : "Other" : "Chrome" : "Safari"
		},
		Hi = function (t) {
			var e = Wi();
			return ("Browser" === e ? Xi(qi()) : e) + "/JsCore/" + t
		},
		qi = function () {
			return n.navigator && n.navigator.userAgent || ""
		},
		Ki = function (t, e) {
			t = t.split("."), e = e || n;
			for (var r = 0; r < t.length && "object" == typeof e && null != e; r++) e = e[t[r]];
			return r != t.length && (e = void 0), e
		},
		zi = function () {
			try {
				var t = n.localStorage,
					e = eo();
				if (t) return t.setItem(e, "1"), t.removeItem(e), !Ai() || !!n.indexedDB
			} catch (t) {}
			return !1
		},
		Gi = function () {
			return (Qi() || "chrome-extension:" === Yi() || Mi()) && !Bi() && zi()
		},
		Qi = function () {
			return "http:" === Yi() || "https:" === Yi()
		},
		Yi = function () {
			return n.location && n.location.protocol || null
		},
		$i = function (t) {
			return t = t || qi(), !_i(t) && "Firefox" != Xi(t)
		},
		Ji = function (t) {
			return void 0 === t ? null : Ue(t)
		},
		Zi = function (t) {
			var e, n = {};
			for (e in t) t.hasOwnProperty(e) && null !== t[e] && void 0 !== t[e] && (n[e] = t[e]);
			return n
		},
		to = function (t) {
			if (null !== t) return JSON.parse(t)
		},
		eo = function (t) {
			return t || "" + Math.floor(1e9 * Math.random()).toString()
		},
		no = function (t) {
			return t = t || qi(), "Safari" != Xi(t) && !t.toLowerCase().match(/iphone|ipad|ipod/)
		},
		ro = function () {
			var t = n.___jsl;
			if (t && t.H)
				for (var e in t.H)
					if (t.H[e].r = t.H[e].r || [], t.H[e].L = t.H[e].L || [], t.H[e].r = t.H[e].L.concat(), t.CP)
						for (var r = 0; r < t.CP.length; r++) t.CP[r] = null
		},
		io = function () {
			var t = n.navigator;
			return !t || "boolean" != typeof t.onLine || !Qi() && "chrome-extension:" !== Yi() && void 0 === t.connection || t.onLine
		},
		oo = function (t, e, n, r) {
			if (t > e) throw Error("Short delay should be less than long delay!");
			this.lg = t, this.Qf = e, t = n || qi(), r = r || Wi(), this.Lf = _i(t) || "ReactNative" === r
		};
	oo.prototype.get = function () {
		return this.Lf ? this.Qf : this.lg
	};
	var so, ao = function () {
			var t = n.document;
			return !t || void 0 === t.visibilityState || "visible" == t.visibilityState
		},
		uo = function () {
			var t = n.document,
				e = null;
			return ao() || !t ? kn() : new Sn(function (n) {
				e = function () {
					ao() && (t.removeEventListener("visibilitychange", e, !1), n())
				}, t.addEventListener("visibilitychange", e, !1)
			}).f(function (n) {
				throw t.removeEventListener("visibilitychange", e, !1), n
			})
		},
		co = {};
	try {
		var ho = {};
		Object.defineProperty(ho, "abcd", {
			configurable: !0,
			enumerable: !0,
			value: 1
		}), Object.defineProperty(ho, "abcd", {
			configurable: !0,
			enumerable: !0,
			value: 2
		}), so = 2 == ho.abcd
	} catch (t) {
		so = !1
	}
	var lo = function (t, e, n) {
			so ? Object.defineProperty(t, e, {
				configurable: !0,
				enumerable: !0,
				value: n
			}) : t[e] = n
		},
		fo = function (t, e) {
			if (e)
				for (var n in e) e.hasOwnProperty(n) && lo(t, n, e[n])
		},
		po = function (t) {
			var e = {};
			return fo(e, t), e
		},
		vo = function (t) {
			var e, n = {};
			for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
			return n
		},
		yo = function (t, e) {
			if (!e || !e.length) return !0;
			if (!t) return !1;
			for (var n = 0; n < e.length; n++) {
				var r = t[e[n]];
				if (void 0 === r || null === r || "" === r) return !1
			}
			return !0
		},
		go = function (t) {
			var e = t;
			if ("object" == typeof t && null != t) {
				e = "length" in t ? [] : {};
				for (var n in t) lo(e, n, go(t[n]))
			}
			return e
		},
		mo = "oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),
		bo = ["client_id", "response_type", "scope", "redirect_uri", "state"],
		wo = {
			wg: {
				Cc: "locale",
				Vb: 500,
				Ub: 600,
				providerId: "facebook.com",
				Nd: bo
			},
			xg: {
				Cc: null,
				Vb: 500,
				Ub: 620,
				providerId: "github.com",
				Nd: bo
			},
			yg: {
				Cc: "hl",
				Vb: 515,
				Ub: 680,
				providerId: "google.com",
				Nd: bo
			},
			Bg: {
				Cc: "lang",
				Vb: 485,
				Ub: 705,
				providerId: "twitter.com",
				Nd: mo
			}
		},
		Eo = function (t) {
			for (var e in wo)
				if (wo[e].providerId == t) return wo[e];
			return null
		},
		Oo = function (t, e) {
			this.code = "auth/" + t, this.message = e || To[t] || ""
		};
	b(Oo, Error), Oo.prototype.I = function () {
		return {
			code: this.code,
			message: this.message
		}
	}, Oo.prototype.toJSON = function () {
		return this.I()
	};
	var Io = function (t) {
			var e = t && t.code;
			return e ? new Oo(e.substring(5), t.message) : null
		},
		To = {
			"argument-error": "",
			"app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
			"app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
			"captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
			"code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
			"cordova-not-ready": "Cordova framework is not ready.",
			"cors-unsupported": "This browser is not supported.",
			"credential-already-in-use": "This credential is already associated with a different user account.",
			"custom-token-mismatch": "The custom token corresponds to a different audience.",
			"requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
			"dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
			"email-already-in-use": "The email address is already in use by another account.",
			"expired-action-code": "The action code has expired. ",
			"cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
			"internal-error": "An internal error has occurred.",
			"invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
			"invalid-app-id": "The mobile app identifier is not registed for the current project.",
			"invalid-user-token": "The user's credential is no longer valid. The user must sign in again.",
			"invalid-auth-event": "An internal error has occurred.",
			"invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
			"invalid-continue-uri": "The continue URL provided in the request is invalid.",
			"invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
			"invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
			"invalid-email": "The email address is badly formatted.",
			"invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
			"invalid-credential": "The supplied auth credential is malformed or has expired.",
			"invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
			"invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
			"invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
			"unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
			"invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
			"wrong-password": "The password is invalid or the user does not have a password.",
			"invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
			"invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
			"invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
			"invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
			"missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
			"auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
			"missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
			"missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
			"missing-continue-uri": "A continue URL must be provided in the request.",
			"missing-iframe-start": "An internal error has occurred.",
			"missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
			"missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
			"missing-verification-id": "The phone auth credential was created with an empty verification ID.",
			"app-deleted": "This instance of FirebaseApp has been deleted.",
			"account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
			"network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
			"no-auth-event": "An internal error has occurred.",
			"no-such-provider": "User was not linked to an account with the given provider.",
			"operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
			"operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
			"popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
			"popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
			"provider-already-linked": "User can only be linked to one identity for the given provider.",
			"quota-exceeded": "The SMS quota for this project has been exceeded.",
			"redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
			"redirect-operation-pending": "A redirect sign-in operation is already pending.",
			timeout: "The operation has timed out.",
			"user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
			"too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
			"unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
			"unsupported-persistence-type": "The current environment does not support the specified persistence type.",
			"user-cancelled": "User did not grant your application the permissions it requested.",
			"user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
			"user-disabled": "The user account has been disabled by an administrator.",
			"user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
			"user-signed-out": "",
			"weak-password": "The password must be 6 characters long or more.",
			"web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
		},
		Co = function (t, e, n, r, i) {
			if (this.la = t, this.U = e || null, this.Ab = n || null, this.Qd = r || null, this.$ = i || null, !this.Ab && !this.$) throw new Oo("invalid-auth-event");
			if (this.Ab && this.$) throw new Oo("invalid-auth-event");
			if (this.Ab && !this.Qd) throw new Oo("invalid-auth-event")
		};
	Co.prototype.sc = function () {
		return this.Qd
	}, Co.prototype.getError = function () {
		return this.$
	}, Co.prototype.I = function () {
		return {
			type: this.la,
			eventId: this.U,
			urlResponse: this.Ab,
			sessionId: this.Qd,
			error: this.$ && this.$.I()
		}
	};
	var So = function (t) {
			return t = t || {}, t.type ? new Co(t.type, t.eventId, t.urlResponse, t.sessionId, t.error && Io(t.error)) : null
		},
		Ao = function (t) {
			var e = "unauthorized-domain",
				n = void 0,
				r = pi(t);
			t = r.oa, "chrome-extension" == (r = r.pa) ? n = E("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", t) : "http" == r || "https" == r ? n = E("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", t) : e = "operation-not-supported-in-this-environment", Oo.call(this, e, n)
		};
	b(Ao, Oo);
	var No = function (t) {
		this.Pf = t.sub, m(), this.Ib = t.email || null, this.Zf = t.provider_id || null, this.ef = !!t.is_anonymous || "anonymous" == this.Zf
	};
	No.prototype.getEmail = function () {
		return this.Ib
	}, No.prototype.isAnonymous = function () {
		return this.ef
	};
	var Ro = function (t, e) {
			return t.then(function (t) {
				if (t.idToken) {
					t: {
						var n = t.idToken.split(".");
						if (3 == n.length) {
							for (var r = (4 - (n = n[1]).length % 4) % 4, i = 0; i < r; i++) n += ".";
							try {
								var o = JSON.parse(Ht(n));
								if (o.sub && o.iss && o.aud && o.exp) {
									var s = new No(o);
									break t
								}
							} catch (t) {}
						}
						s = null
					}
					if (!s || e != s.Pf) throw new Oo("user-mismatch");
					return t
				}
				throw new Oo("user-mismatch")
			}).f(function (t) {
				throw t && t.code && "auth/user-not-found" == t.code ? new Oo("user-mismatch") : t
			})
		},
		ko = function (t, e) {
			if (e.idToken || e.accessToken) e.idToken && lo(this, "idToken", e.idToken), e.accessToken && lo(this, "accessToken", e.accessToken);
			else {
				if (!e.oauthToken || !e.oauthTokenSecret) throw new Oo("internal-error", "failed to construct a credential");
				lo(this, "accessToken", e.oauthToken), lo(this, "secret", e.oauthTokenSecret)
			}
			lo(this, "providerId", t)
		};
	ko.prototype.Kb = function (t) {
		return Os(t, Po(this))
	}, ko.prototype.Ec = function (t, e) {
		var n = Po(this);
		return n.idToken = e, Is(t, n)
	}, ko.prototype.Ad = function (t, e) {
		var n = Po(this);
		return Ro(Ts(t, n), e)
	};
	var Po = function (t) {
		var e = {};
		return t.idToken && (e.id_token = t.idToken), t.accessToken && (e.access_token = t.accessToken), t.secret && (e.oauth_token_secret = t.secret), e.providerId = t.providerId, {
			postBody: Ci(e).toString(),
			requestUri: "http://localhost"
		}
	};
	ko.prototype.I = function () {
		var t = {
			providerId: this.providerId
		};
		return this.idToken && (t.oauthIdToken = this.idToken), this.accessToken && (t.oauthAccessToken = this.accessToken), this.secret && (t.oauthTokenSecret = this.secret), t
	};
	var _o = function (t, e) {
		this.bg = e || [], fo(this, {
			providerId: t,
			isOAuthProvider: !0
		}), this.ie = {}, this.yd = (Eo(t) || {}).Cc || null, this.kd = null
	};
	_o.prototype.setCustomParameters = function (t) {
		return this.ie = wt(t), this
	};
	var Do = function (t) {
		_o.call(this, t, bo), this.Od = []
	};
	b(Do, _o), Do.prototype.addScope = function (t) {
		return it(this.Od, t) || this.Od.push(t), this
	}, Do.prototype.pe = function () {
		return ct(this.Od)
	}, Do.prototype.credential = function (t, e) {
		if (!t && !e) throw new Oo("argument-error", "credential failed: must provide the ID token and/or the access token.");
		return new ko(this.providerId, {
			idToken: t || null,
			accessToken: e || null
		})
	};
	var jo = function () {
		Do.call(this, "facebook.com")
	};
	b(jo, Do), lo(jo, "PROVIDER_ID", "facebook.com");
	var Lo = function (t) {
			if (!t) throw new Oo("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
			var e = t;
			return p(t) && (e = t.accessToken), (new jo).credential(null, e)
		},
		xo = function () {
			Do.call(this, "github.com")
		};
	b(xo, Do), lo(xo, "PROVIDER_ID", "github.com");
	var Uo = function (t) {
			if (!t) throw new Oo("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
			var e = t;
			return p(t) && (e = t.accessToken), (new xo).credential(null, e)
		},
		Fo = function () {
			Do.call(this, "google.com"), this.addScope("profile")
		};
	b(Fo, Do), lo(Fo, "PROVIDER_ID", "google.com");
	var Mo = function (t, e) {
			var n = t;
			return p(t) && (n = t.idToken, e = t.accessToken), (new Fo).credential(n, e)
		},
		Vo = function () {
			_o.call(this, "twitter.com", mo)
		};
	b(Vo, _o), lo(Vo, "PROVIDER_ID", "twitter.com");
	var Wo = function (t, e) {
			var n = t;
			if (p(n) || (n = {
					oauthToken: t,
					oauthTokenSecret: e
				}), !n.oauthToken || !n.oauthTokenSecret) throw new Oo("argument-error", "credential failed: expected 2 arguments (the OAuth access token and secret).");
			return new ko("twitter.com", n)
		},
		Bo = function (t, e) {
			this.Ib = t, this.Fd = e, lo(this, "providerId", "password")
		};
	Bo.prototype.Kb = function (t) {
		return Ys(t, Ks, {
			email: this.Ib,
			password: this.Fd
		})
	}, Bo.prototype.Ec = function (t, e) {
		return Ys(t, Vs, {
			idToken: e,
			email: this.Ib,
			password: this.Fd
		})
	}, Bo.prototype.Ad = function (t, e) {
		return Ro(this.Kb(t), e)
	}, Bo.prototype.I = function () {
		return {
			email: this.Ib,
			password: this.Fd
		}
	};
	var Xo = function () {
		fo(this, {
			providerId: "password",
			isOAuthProvider: !1
		})
	};
	fo(Xo, {
		PROVIDER_ID: "password"
	});
	var Ho = function (t) {
		if (!(t.verificationId && t.Yc || t.fc && t.phoneNumber)) throw new Oo("internal-error");
		this.P = t, lo(this, "providerId", "phone")
	};
	Ho.prototype.Kb = function (t) {
		return t.verifyPhoneNumber(qo(this))
	}, Ho.prototype.Ec = function (t, e) {
		var n = qo(this);
		return n.idToken = e, Ys(t, Gs, n)
	}, Ho.prototype.Ad = function (t, e) {
		var n = qo(this);
		return n.operation = "REAUTH", t = Ys(t, Qs, n), Ro(t, e)
	}, Ho.prototype.I = function () {
		var t = {
			providerId: "phone"
		};
		return this.P.verificationId && (t.verificationId = this.P.verificationId), this.P.Yc && (t.verificationCode = this.P.Yc), this.P.fc && (t.temporaryProof = this.P.fc), this.P.phoneNumber && (t.phoneNumber = this.P.phoneNumber), t
	};
	var qo = function (t) {
			return t.P.fc && t.P.phoneNumber ? {
				temporaryProof: t.P.fc,
				phoneNumber: t.P.phoneNumber
			} : {
				sessionInfo: t.P.verificationId,
				code: t.P.Yc
			}
		},
		Ko = function (t) {
			try {
				this.gf = t || firebase.auth()
			} catch (t) {
				throw new Oo("argument-error", "Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().")
			}
			fo(this, {
				providerId: "phone",
				isOAuthProvider: !1
			})
		};
	Ko.prototype.verifyPhoneNumber = function (t, e) {
		var n = this.gf.g;
		return kn(e.verify()).then(function (r) {
			if (!i(r)) throw new Oo("argument-error", "An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");
			switch (e.type) {
				case "recaptcha":
					return Ys(n, Fs, {
						phoneNumber: t,
						recaptchaToken: r
					});
				default:
					throw new Oo("argument-error", 'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.')
			}
		})
	};
	var zo = function (t, e) {
		if (!t) throw new Oo("missing-verification-id");
		if (!e) throw new Oo("missing-verification-code");
		return new Ho({
			verificationId: t,
			Yc: e
		})
	};
	fo(Ko, {
		PROVIDER_ID: "phone"
	});
	var Go = function (t) {
			if (t.temporaryProof && t.phoneNumber) return new Ho({
				fc: t.temporaryProof,
				phoneNumber: t.phoneNumber
			});
			var e = t && t.providerId;
			if (!e || "password" === e) return null;
			var n = t && t.oauthAccessToken,
				r = t && t.oauthTokenSecret;
			t = t && t.oauthIdToken;
			try {
				switch (e) {
					case "google.com":
						return Mo(t, n);
					case "facebook.com":
						return Lo(n);
					case "github.com":
						return Uo(n);
					case "twitter.com":
						return Wo(n, r);
					default:
						return new Do(e).credential(t, n)
				}
			} catch (t) {
				return null
			}
		},
		Qo = function (t) {
			if (!t.isOAuthProvider) throw new Oo("invalid-oauth-provider")
		},
		Yo = function (t, e, n) {
			Oo.call(this, t, n), (t = e || {}).email && lo(this, "email", t.email), t.phoneNumber && lo(this, "phoneNumber", t.phoneNumber), t.credential && lo(this, "credential", t.credential)
		};
	b(Yo, Oo), Yo.prototype.I = function () {
		var t = {
			code: this.code,
			message: this.message
		};
		this.email && (t.email = this.email), this.phoneNumber && (t.phoneNumber = this.phoneNumber);
		var e = this.credential && this.credential.I();
		return e && Ot(t, e), t
	}, Yo.prototype.toJSON = function () {
		return this.I()
	};
	var $o = function (t) {
			if (t.code) {
				var e = t.code || "";
				0 == e.indexOf("auth/") && (e = e.substring(5));
				var n = {
					credential: Go(t)
				};
				if (t.email) n.email = t.email;
				else {
					if (!t.phoneNumber) return new Oo(e, t.message || void 0);
					n.phoneNumber = t.phoneNumber
				}
				return new Yo(e, n, t.message)
			}
			return null
		},
		Jo = function (t) {
			this.vg = t
		};
	b(Jo, Xe), Jo.prototype.pc = function () {
		return new this.vg
	}, Jo.prototype.wd = function () {
		return {}
	};
	var Zo, ts = function (t, e, r) {
			var i = "Node" == Wi();
			if (!(i = n.XMLHttpRequest || i && firebase.INTERNAL.node && firebase.INTERNAL.node.XMLHttpRequest)) throw new Oo("internal-error", "The XMLHttpRequest compatibility library was not found.");
			this.o = t, t = e || {}, this.hg = t.secureTokenEndpoint || "https://securetoken.googleapis.com/v1/token", this.ig = t.secureTokenTimeout || es, this.Le = wt(t.secureTokenHeaders || ns), this.sf = t.firebaseEndpoint || "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", this.tf = t.firebaseTimeout || rs, this.qc = wt(t.firebaseHeaders || is), r && (this.qc["X-Client-Version"] = r, this.Le["X-Client-Version"] = r), this.jf = new Ge, this.ug = new Jo(i)
		},
		es = new oo(3e4, 6e4),
		ns = {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		rs = new oo(3e4, 6e4),
		is = {
			"Content-Type": "application/json"
		},
		os = function (t, e) {
			e ? t.qc.firebase_locale = e : delete t.qc.firebase_locale
		},
		ss = function (t, e, n, r, i, o, s) {
			io() ? (Pi() ? t = y(t.kg, t) : (Zo || (Zo = new Sn(function (t, e) {
				cs(t, e)
			})), t = y(t.jg, t)), t(e, n, r, i, o, s)) : n && n(null)
		};
	ts.prototype.kg = function (t, e, n, r, i, o) {
		var s = "Node" == Wi(),
			a = Bi() ? s ? new Br(this.ug) : new Br : new Br(this.jf);
		if (o) {
			a.zb = Math.max(0, o);
			var u = setTimeout(function () {
				a.dispatchEvent("timeout")
			}, o)
		}
		a.listen("complete", function () {
			u && clearTimeout(u);
			var t = null;
			try {
				t = JSON.parse(ni(this)) || null
			} catch (e) {
				t = null
			}
			e && e(t)
		}), Sr(a, "ready", function () {
			u && clearTimeout(u), this.Ka || (this.Ka = !0, this.ib())
		}), Sr(a, "timeout", function () {
			u && clearTimeout(u), this.Ka || (this.Ka = !0, this.ib()), e && e(null)
		}), a.send(t, n, r, i)
	};
	var as = X("https://apis.google.com/js/client.js?onload=%{onload}"),
		us = "__fcb" + Math.floor(1e6 * Math.random()).toString(),
		cs = function (t, e) {
			if (((window.gapi || {}).client || {}).request) t();
			else {
				n[us] = function () {
					((window.gapi || {}).client || {}).request ? t() : e(Error("CORS_UNSUPPORTED"))
				};
				var r = z(as, {
					onload: us
				});
				tr(ur(r), function () {
					e(Error("CORS_UNSUPPORTED"))
				})
			}
		};
	ts.prototype.jg = function (t, e, n, r, i) {
		var o = this;
		Zo.then(function () {
			window.gapi.client.setApiKey(o.o);
			var s = window.gapi.auth.getToken();
			window.gapi.auth.setToken(null), window.gapi.client.request({
				path: t,
				method: n,
				body: r,
				headers: i,
				authType: "none",
				callback: function (t) {
					window.gapi.auth.setToken(s), e && e(t)
				}
			})
		}).f(function (t) {
			e && e({
				error: {
					message: t && t.message || "CORS_UNSUPPORTED"
				}
			})
		})
	};
	var hs = function (t, e) {
			return new Sn(function (n, r) {
				"refresh_token" == e.grant_type && e.refresh_token || "authorization_code" == e.grant_type && e.code ? ss(t, t.hg + "?key=" + encodeURIComponent(t.o), function (t) {
					t ? t.error ? r($s(t)) : t.access_token && t.refresh_token ? n(t) : r(new Oo("internal-error")) : r(new Oo("network-request-failed"))
				}, "POST", Ci(e).toString(), t.Le, t.ig.get()) : r(new Oo("internal-error"))
			})
		},
		ls = function (t, e, n, r, i, o) {
			var s = pi(t.sf + e);
			hi(s, "key", t.o), o && hi(s, "cb", m().toString());
			var a = "GET" == n;
			if (a)
				for (var u in r) r.hasOwnProperty(u) && hi(s, u, r[u]);
			return new Sn(function (e, o) {
				ss(t, s.toString(), function (t) {
					t ? t.error ? o($s(t, i || {})) : e(t) : o(new Oo("network-request-failed"))
				}, n, a ? void 0 : Ue(Zi(r)), t.qc, t.tf.get())
			})
		},
		fs = function (t) {
			if (!ke.test(t.email)) throw new Oo("invalid-email")
		},
		ps = function (t) {
			"email" in t && fs(t)
		},
		ds = function (t, e) {
			return Ys(t, Rs, {
				identifier: e,
				continueUri: Qi() ? Ni() : "http://localhost"
			}).then(function (t) {
				return t.allProviders || []
			})
		},
		vs = function (t) {
			return Ys(t, Ls, {}).then(function (t) {
				return t.authorizedDomains || []
			})
		},
		ys = function (t) {
			if (!t.idToken) throw new Oo("internal-error")
		},
		gs = function (t) {
			if (t.phoneNumber || t.temporaryProof) {
				if (!t.phoneNumber || !t.temporaryProof) throw new Oo("internal-error")
			} else {
				if (!t.sessionInfo) throw new Oo("missing-verification-id");
				if (!t.code) throw new Oo("missing-verification-code")
			}
		};
	ts.prototype.signInAnonymously = function () {
		return Ys(this, Ws, {})
	}, ts.prototype.updateEmail = function (t, e) {
		return Ys(this, Ms, {
			idToken: t,
			email: e
		})
	}, ts.prototype.updatePassword = function (t, e) {
		return Ys(this, Vs, {
			idToken: t,
			password: e
		})
	};
	var ms = {
		displayName: "DISPLAY_NAME",
		photoUrl: "PHOTO_URL"
	};
	ts.prototype.updateProfile = function (t, e) {
		var n = {
				idToken: t
			},
			r = [];
		return dt(ms, function (t, i) {
			var o = e[i];
			null === o ? r.push(t) : i in e && (n[i] = o)
		}), r.length && (n.deleteAttribute = r), Ys(this, Ms, n)
	}, ts.prototype.sendPasswordResetEmail = function (t, e) {
		return t = {
			requestType: "PASSWORD_RESET",
			email: t
		}, Ot(t, e), Ys(this, js, t)
	}, ts.prototype.sendEmailVerification = function (t, e) {
		return t = {
			requestType: "VERIFY_EMAIL",
			idToken: t
		}, Ot(t, e), Ys(this, Ds, t)
	}, ts.prototype.verifyPhoneNumber = function (t) {
		return Ys(this, zs, t)
	};
	var bs = function (t, e, n) {
			return Ys(t, Ps, {
				idToken: e,
				deleteProvider: n
			})
		},
		ws = function (t) {
			if (!t.requestUri || !t.sessionId && !t.postBody) throw new Oo("internal-error")
		},
		Es = function (t) {
			var e = null;
			if (t.needConfirmation ? (t.code = "account-exists-with-different-credential", e = $o(t)) : "FEDERATED_USER_ID_ALREADY_LINKED" == t.errorMessage ? (t.code = "credential-already-in-use", e = $o(t)) : "EMAIL_EXISTS" == t.errorMessage && (t.code = "email-already-in-use", e = $o(t)), e) throw e;
			if (!t.idToken) throw new Oo("internal-error")
		},
		Os = function (t, e) {
			return e.returnIdpCredential = !0, Ys(t, Bs, e)
		},
		Is = function (t, e) {
			return e.returnIdpCredential = !0, Ys(t, Hs, e)
		},
		Ts = function (t, e) {
			return e.returnIdpCredential = !0, e.autoCreate = !1, Ys(t, Xs, e)
		},
		Cs = function (t) {
			if (!t.oobCode) throw new Oo("invalid-action-code")
		};
	ts.prototype.confirmPasswordReset = function (t, e) {
		return Ys(this, Us, {
			oobCode: t,
			newPassword: e
		})
	}, ts.prototype.checkActionCode = function (t) {
		return Ys(this, As, {
			oobCode: t
		})
	}, ts.prototype.applyActionCode = function (t) {
		return Ys(this, Ss, {
			oobCode: t
		})
	};
	var Ss = {
			endpoint: "setAccountInfo",
			F: Cs,
			$a: "email"
		},
		As = {
			endpoint: "resetPassword",
			F: Cs,
			Y: function (t) {
				if (!t.email || !t.requestType) throw new Oo("internal-error")
			}
		},
		Ns = {
			endpoint: "signupNewUser",
			F: function (t) {
				if (fs(t), !t.password) throw new Oo("weak-password")
			},
			Y: ys,
			za: !0
		},
		Rs = {
			endpoint: "createAuthUri"
		},
		ks = {
			endpoint: "deleteAccount",
			Ya: ["idToken"]
		},
		Ps = {
			endpoint: "setAccountInfo",
			Ya: ["idToken", "deleteProvider"],
			F: function (t) {
				if (!h(t.deleteProvider)) throw new Oo("internal-error")
			}
		},
		_s = {
			endpoint: "getAccountInfo"
		},
		Ds = {
			endpoint: "getOobConfirmationCode",
			Ya: ["idToken", "requestType"],
			F: function (t) {
				if ("VERIFY_EMAIL" != t.requestType) throw new Oo("internal-error")
			},
			$a: "email"
		},
		js = {
			endpoint: "getOobConfirmationCode",
			Ya: ["requestType"],
			F: function (t) {
				if ("PASSWORD_RESET" != t.requestType) throw new Oo("internal-error");
				fs(t)
			},
			$a: "email"
		},
		Ls = {
			ae: !0,
			endpoint: "getProjectConfig",
			ue: "GET"
		},
		xs = {
			ae: !0,
			endpoint: "getRecaptchaParam",
			ue: "GET",
			Y: function (t) {
				if (!t.recaptchaSiteKey) throw new Oo("internal-error")
			}
		},
		Us = {
			endpoint: "resetPassword",
			F: Cs,
			$a: "email"
		},
		Fs = {
			endpoint: "sendVerificationCode",
			Ya: ["phoneNumber", "recaptchaToken"],
			$a: "sessionInfo"
		},
		Ms = {
			endpoint: "setAccountInfo",
			Ya: ["idToken"],
			F: ps,
			za: !0
		},
		Vs = {
			endpoint: "setAccountInfo",
			Ya: ["idToken"],
			F: function (t) {
				if (ps(t), !t.password) throw new Oo("weak-password")
			},
			Y: ys,
			za: !0
		},
		Ws = {
			endpoint: "signupNewUser",
			Y: ys,
			za: !0
		},
		Bs = {
			endpoint: "verifyAssertion",
			F: ws,
			Y: Es,
			za: !0
		},
		Xs = {
			endpoint: "verifyAssertion",
			F: ws,
			Y: function (t) {
				if (t.errorMessage && "USER_NOT_FOUND" == t.errorMessage) throw new Oo("user-not-found");
				if (!t.idToken) throw new Oo("internal-error")
			},
			za: !0
		},
		Hs = {
			endpoint: "verifyAssertion",
			F: function (t) {
				if (ws(t), !t.idToken) throw new Oo("internal-error")
			},
			Y: Es,
			za: !0
		},
		qs = {
			endpoint: "verifyCustomToken",
			F: function (t) {
				if (!t.token) throw new Oo("invalid-custom-token")
			},
			Y: ys,
			za: !0
		},
		Ks = {
			endpoint: "verifyPassword",
			F: function (t) {
				if (fs(t), !t.password) throw new Oo("wrong-password")
			},
			Y: ys,
			za: !0
		},
		zs = {
			endpoint: "verifyPhoneNumber",
			F: gs,
			Y: ys
		},
		Gs = {
			endpoint: "verifyPhoneNumber",
			F: function (t) {
				if (!t.idToken) throw new Oo("internal-error");
				gs(t)
			},
			Y: function (t) {
				if (t.temporaryProof) throw t.code = "credential-already-in-use", $o(t);
				ys(t)
			}
		},
		Qs = {
			mf: {
				USER_NOT_FOUND: "user-not-found"
			},
			endpoint: "verifyPhoneNumber",
			F: gs,
			Y: ys
		},
		Ys = function (t, e, n) {
			if (!yo(n, e.Ya)) return Pn(new Oo("internal-error"));
			var r, i = e.ue || "POST";
			return kn(n).then(e.F).then(function () {
				return e.za && (n.returnSecureToken = !0), ls(t, e.endpoint, i, n, e.mf, e.ae || !1)
			}).then(function (t) {
				return r = t
			}).then(e.Y).then(function () {
				if (!e.$a) return r;
				if (!(e.$a in r)) throw new Oo("internal-error");
				return r[e.$a]
			})
		},
		$s = function (t, e) {
			var n = (t.error && t.error.errors && t.error.errors[0] || {}).reason || "",
				r = {
					keyInvalid: "invalid-api-key",
					ipRefererBlocked: "app-not-authorized"
				};
			if (n = r[n] ? new Oo(r[n]) : null) return n;
			n = t.error && t.error.message || "", Ot(r = {
				INVALID_CUSTOM_TOKEN: "invalid-custom-token",
				CREDENTIAL_MISMATCH: "custom-token-mismatch",
				MISSING_CUSTOM_TOKEN: "internal-error",
				INVALID_IDENTIFIER: "invalid-email",
				MISSING_CONTINUE_URI: "internal-error",
				INVALID_EMAIL: "invalid-email",
				INVALID_PASSWORD: "wrong-password",
				USER_DISABLED: "user-disabled",
				MISSING_PASSWORD: "internal-error",
				EMAIL_EXISTS: "email-already-in-use",
				PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
				INVALID_IDP_RESPONSE: "invalid-credential",
				FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
				INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
				INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
				INVALID_SENDER: "invalid-sender",
				EMAIL_NOT_FOUND: "user-not-found",
				EXPIRED_OOB_CODE: "expired-action-code",
				INVALID_OOB_CODE: "invalid-action-code",
				MISSING_OOB_CODE: "internal-error",
				CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
				INVALID_ID_TOKEN: "invalid-user-token",
				TOKEN_EXPIRED: "user-token-expired",
				USER_NOT_FOUND: "user-token-expired",
				CORS_UNSUPPORTED: "cors-unsupported",
				DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
				INVALID_APP_ID: "invalid-app-id",
				TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
				WEAK_PASSWORD: "weak-password",
				OPERATION_NOT_ALLOWED: "operation-not-allowed",
				USER_CANCELLED: "user-cancelled",
				CAPTCHA_CHECK_FAILED: "captcha-check-failed",
				INVALID_APP_CREDENTIAL: "invalid-app-credential",
				INVALID_CODE: "invalid-verification-code",
				INVALID_PHONE_NUMBER: "invalid-phone-number",
				INVALID_SESSION_INFO: "invalid-verification-id",
				INVALID_TEMPORARY_PROOF: "invalid-credential",
				MISSING_APP_CREDENTIAL: "missing-app-credential",
				MISSING_CODE: "missing-verification-code",
				MISSING_PHONE_NUMBER: "missing-phone-number",
				MISSING_SESSION_INFO: "missing-verification-id",
				QUOTA_EXCEEDED: "quota-exceeded",
				SESSION_EXPIRED: "code-expired",
				INVALID_CONTINUE_URI: "invalid-continue-uri",
				MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
				MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
				UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri"
			}, e || {}), e = (e = n.match(/^[^\s]+\s*:\s*(.*)$/)) && 1 < e.length ? e[1] : void 0;
			for (var i in r)
				if (0 === n.indexOf(i)) return new Oo(r[i], e);
			return !e && t && (e = Ji(t)), new Oo("internal-error", e)
		},
		Js = function (t) {
			this.D = t
		};
	Js.prototype.value = function () {
		return this.D
	}, Js.prototype.Ne = function (t) {
		return this.D.style = t, this
	}, Js.prototype.getStyle = function () {
		return this.D.style
	};
	var Zs = function (t) {
		this.D = t || {}
	};
	(t = Zs.prototype).value = function () {
		return this.D
	}, t.getUrl = function () {
		return this.D.url
	}, t.Ne = function (t) {
		return this.D.style = t, this
	}, t.getStyle = function () {
		return this.D.style
	}, t.getId = function () {
		return this.D.id
	}, t.getContext = function () {
		return this.D.context
	};
	var ta = function (t) {
			this.sg = t, this.xc = null, this.Cd = na(this)
		},
		ea = function (t) {
			var e = new Zs;
			return e.D.where = document.body, e.D.url = t.sg, e.D.messageHandlersFilter = Ki("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"), e.D.attributes = e.D.attributes || {}, new Js(e.D.attributes).Ne({
				position: "absolute",
				top: "-100px",
				width: "1px",
				height: "1px"
			}), e.D.dontclear = !0, e
		},
		na = function (t) {
			return ua().then(function () {
				return new Sn(function (e, n) {
					Ki("gapi.iframes.getContext")().open(ea(t).value(), function (r) {
						t.xc = r, t.xc.restyle({
							setHideOnLeave: !1
						});
						var i = setTimeout(function () {
								n(Error("Network Error"))
							}, sa.get()),
							o = function () {
								clearTimeout(i), e()
							};
						r.ping(o).then(o, function () {
							n(Error("Network Error"))
						})
					})
				})
			})
		};
	ta.prototype.sendMessage = function (t) {
		var e = this;
		return this.Cd.then(function () {
			return new Sn(function (n) {
				e.xc.send(t.type, t, n, Ki("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))
			})
		})
	};
	var ra = function (t, e) {
			t.Cd.then(function () {
				t.xc.register("authEvent", e, Ki("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))
			})
		},
		ia = X("https://apis.google.com/js/api.js?onload=%{onload}"),
		oa = new oo(3e4, 6e4),
		sa = new oo(5e3, 15e3),
		aa = null,
		ua = function () {
			return aa || (aa = new Sn(function (t, e) {
				if (io()) {
					var r = function () {
						ro(), Ki("gapi.load")("gapi.iframes", {
							callback: t,
							ontimeout: function () {
								ro(), e(Error("Network Error"))
							},
							timeout: oa.get()
						})
					};
					if (Ki("gapi.iframes.Iframe")) t();
					else if (Ki("gapi.load")) r();
					else {
						var i = "__iframefcb" + Math.floor(1e6 * Math.random()).toString();
						n[i] = function () {
							Ki("gapi.load") ? r() : e(Error("Network Error"))
						}, i = z(ia, {
							onload: i
						}), kn(ur(i)).f(function () {
							e(Error("Network Error"))
						})
					}
				} else e(Error("Network Error"))
			}).f(function (t) {
				throw aa = null, t
			}))
		},
		ca = function (t, e, n) {
			this.C = t, this.o = e, this.u = n, this.bb = null, this.ic = di(this.C, "/__/auth/iframe"), hi(this.ic, "apiKey", this.o), hi(this.ic, "appName", this.u)
		};
	ca.prototype.Td = function (t) {
		return this.bb = t, this
	}, ca.prototype.toString = function () {
		return this.bb ? hi(this.ic, "v", this.bb) : this.ic.removeParameter("v"), this.ic.toString()
	};
	var ha = function (t, e, n, r, i) {
		this.C = t, this.o = e, this.u = n, this.ff = r, this.bb = this.U = this.Md = null, this.tb = i
	};
	ha.prototype.Td = function (t) {
		return this.bb = t, this
	}, ha.prototype.toString = function () {
		var t = di(this.C, "/__/auth/handler");
		if (hi(t, "apiKey", this.o), hi(t, "appName", this.u), hi(t, "authType", this.ff), this.tb.isOAuthProvider) {
			var e = this.tb;
			try {
				var n = firebase.app(this.u).auth().ha
			} catch (t) {
				n = null
			}
			e.kd = n, hi(t, "providerId", this.tb.providerId), e = this.tb, n = Zi(e.ie);
			for (var r in n) n[r] = n[r].toString();
			r = e.bg, n = wt(n);
			for (var i = 0; i < r.length; i++) {
				var o = r[i];
				o in n && delete n[o]
			}
			e.yd && e.kd && !n[e.yd] && (n[e.yd] = e.kd), mt(n) || hi(t, "customParameters", Ji(n))
		}
		if ("function" == typeof this.tb.pe && (e = this.tb.pe()).length && hi(t, "scopes", e.join(",")), this.Md ? hi(t, "redirectUrl", this.Md) : t.removeParameter("redirectUrl"), this.U ? hi(t, "eventId", this.U) : t.removeParameter("eventId"), this.bb ? hi(t, "v", this.bb) : t.removeParameter("v"), this.kc)
			for (var s in this.kc) this.kc.hasOwnProperty(s) && !li(t, s) && hi(t, s, this.kc[s]);
		return t.toString()
	};
	var la = function (t, e, n, r) {
			this.C = t, this.o = e, this.u = n, this.vf = (this.Ja = r || null) ? Hi(this.Ja) : null, r = this.Ja, this.Ef = new ca(t, e, n).Td(r).toString(), this.sa = [], this.g = new ts(e, null, this.vf), this.zc = this.va = null
		},
		fa = function (t) {
			var e = Ni();
			return vs(t).then(function (t) {
				t: {
					var n = pi(e),
						r = n.pa;n = n.oa;
					for (var i = 0; i < t.length; i++) {
						var o = t[i],
							s = n,
							a = r;
						if (0 == o.indexOf("chrome-extension://") ? s = pi(o).oa == s && "chrome-extension" == a : "http" != a && "https" != a ? s = !1 : xi.test(o) ? s = s == o : (o = o.split(".").join("\\."), s = new RegExp("^(.+\\." + o + "|" + o + ")$", "i").test(s)), s) {
							t = !0;
							break t
						}
					}
					t = !1
				}
				if (!t) throw new Ao(Ni())
			})
		};
	(t = la.prototype).Ob = function () {
		if (this.zc) return this.zc;
		var t = this;
		return this.zc = Ui().then(function () {
			t.wc = new ta(t.Ef), da(t)
		})
	}, t.cc = function (t, e, n) {
		var r = new Oo("popup-closed-by-user"),
			i = new Oo("web-storage-unsupported"),
			o = this,
			s = !1;
		return this.Pa().then(function () {
			va(o).then(function (n) {
				n || (t && Di(t), e(i), s = !0)
			})
		}).f(function () {}).then(function () {
			if (!s) return Li(t)
		}).then(function () {
			if (!s) return Mr(n).then(function () {
				e(r)
			})
		})
	}, t.Oe = function () {
		var t = qi();
		return !$i(t) && !no(t)
	}, t.se = function () {
		return !1
	}, t.Wb = function (t, e, n, r, i, o, s) {
		if (!t) return Pn(new Oo("popup-blocked"));
		if (s && !$i()) return this.Pa().f(function (e) {
			Di(t), i(e)
		}), r(), kn();
		this.va || (this.va = fa(this.g));
		var a = this;
		return this.va.then(function () {
			var e = a.Pa().f(function (e) {
				throw Di(t), i(e), e
			});
			return r(), e
		}).then(function () {
			if (Qo(n), !s) {
				var r = pa(a.C, a.o, a.u, e, n, null, o, a.Ja);
				Ri(r, t)
			}
		}).f(function (t) {
			throw "auth/network-request-failed" == t.code && (a.va = null), t
		})
	}, t.Xb = function (t, e, n) {
		this.va || (this.va = fa(this.g));
		var r = this;
		return this.va.then(function () {
			Qo(e);
			var i = pa(r.C, r.o, r.u, t, e, Ni(), n, r.Ja);
			Ri(i)
		}).f(function (t) {
			throw "auth/network-request-failed" == t.code && (r.va = null), t
		})
	}, t.Pa = function () {
		var t = this;
		return this.Ob().then(function () {
			return t.wc.Cd
		}).f(function () {
			throw t.va = null, new Oo("network-request-failed")
		})
	}, t.Se = function () {
		return !0
	};
	var pa = function (t, e, n, r, i, o, s, a, u) {
			return t = new ha(t, e, n, r, i), t.Md = o, t.U = s, o = t.Td(a), o.kc = wt(u || null), o.toString()
		},
		da = function (t) {
			if (!t.wc) throw Error("IfcHandler must be initialized!");
			ra(t.wc, function (e) {
				var n = {};
				if (e && e.authEvent) {
					var r = !1;
					for (e = So(e.authEvent), n = 0; n < t.sa.length; n++) r = t.sa[n](e) || r;
					return n = {}, n.status = r ? "ACK" : "ERROR", kn(n)
				}
				return n.status = "ERROR", kn(n)
			})
		},
		va = function (t) {
			var e = {
				type: "webStorageSupport"
			};
			return t.Ob().then(function () {
				return t.wc.sendMessage(e)
			}).then(function (t) {
				if (t && t.length && void 0 !== t[0].webStorageSupport) return t[0].webStorageSupport;
				throw Error()
			})
		};
	la.prototype.fb = function (t) {
		this.sa.push(t)
	}, la.prototype.$b = function (t) {
		at(this.sa, function (e) {
			return e == t
		})
	};
	var ya = function (t, e, r) {
		if (lo(this, "type", "recaptcha"), this.Zc = this.Eb = null, this.Gb = !1, this.ge = t, this.Ca = e || {
				theme: "light",
				type: "image"
			}, this.K = [], this.Ca.sitekey) throw new Oo("argument-error", "sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");
		if (this.Ac = "invisible" === this.Ca.size, !mn(t) || !this.Ac && mn(t).hasChildNodes()) throw new Oo("argument-error", "reCAPTCHA container is either not found or already contains inner elements!");
		try {
			this.i = r || firebase.app()
		} catch (t) {
			throw new Oo("argument-error", "No firebase.app.App instance is currently initialized.")
		}
		if (!this.i.options || !this.i.options.apiKey) throw new Oo("invalid-api-key");
		t = firebase.SDK_VERSION ? Hi(firebase.SDK_VERSION) : null, this.g = new ts(this.i.options && this.i.options.apiKey, null, t);
		var i = this;
		this.Uc = [];
		var o = this.Ca.callback;
		this.Ca.callback = function (t) {
			if (i.Hb(t), "function" == typeof o) o(t);
			else if ("string" == typeof o) {
				var e = Ki(o, n);
				"function" == typeof e && e(t)
			}
		};
		var s = this.Ca["expired-callback"];
		this.Ca["expired-callback"] = function () {
			if (i.Hb(null), "function" == typeof s) s();
			else if ("string" == typeof s) {
				var t = Ki(s, n);
				"function" == typeof t && t()
			}
		}
	};
	ya.prototype.Hb = function (t) {
		for (var e = 0; e < this.Uc.length; e++) try {
			this.Uc[e](t)
		} catch (t) {}
	};
	var ga = function (t, e) {
		at(t.Uc, function (t) {
			return t == e
		})
	};
	ya.prototype.c = function (t) {
		var e = this;
		return this.K.push(t), Ln(t, function () {
			ot(e.K, t)
		}), t
	}, ya.prototype.Pb = function () {
		var t = this;
		return this.Eb ? this.Eb : this.Eb = this.c(kn().then(function () {
			if (Qi()) return Ui();
			throw new Oo("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.")
		}).then(function () {
			try {
				var e = t.i.auth().ha
			} catch (t) {
				e = null
			}
			return Ea(Ia(), e)
		}).then(function () {
			return Ys(t.g, xs, {})
		}).then(function (e) {
			t.Ca.sitekey = e.recaptchaSiteKey
		}).f(function (e) {
			throw t.Eb = null, e
		}))
	}, ya.prototype.render = function () {
		ma(this);
		var t = this;
		return this.c(this.Pb().then(function () {
			if (null === t.Zc) {
				var e = t.ge;
				if (!t.Ac) {
					var n = mn(e);
					e = En("DIV"), n.appendChild(e)
				}
				t.Zc = grecaptcha.render(e, t.Ca)
			}
			return t.Zc
		}))
	}, ya.prototype.verify = function () {
		ma(this);
		var t = this;
		return this.c(this.render().then(function (e) {
			return new Sn(function (n) {
				var r = grecaptcha.getResponse(e);
				if (r) n(r);
				else {
					var i = function (e) {
						e && (ga(t, i), n(e))
					};
					t.Uc.push(i), t.Ac && grecaptcha.execute(t.Zc)
				}
			})
		}))
	};
	var ma = function (t) {
		if (t.Gb) throw new Oo("internal-error", "RecaptchaVerifier instance has been destroyed.")
	};
	ya.prototype.clear = function () {
		ma(this), this.Gb = !0, Ia().hd--;
		for (var t = 0; t < this.K.length; t++) this.K[t].cancel("RecaptchaVerifier instance has been destroyed.");
		if (!this.Ac) {
			t = mn(this.ge);
			for (var e; e = t.firstChild;) t.removeChild(e)
		}
	};
	var ba = X("https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit&hl=%{hl}"),
		wa = function () {
			this.hd = n.grecaptcha ? 1 / 0 : 0, this.te = null, this.fd = "__rcb" + Math.floor(1e6 * Math.random()).toString()
		},
		Ea = function (t, e) {
			return new Sn(function (r, i) {
				if (io())
					if (!n.grecaptcha || e !== t.te && !t.hd) {
						n[t.fd] = function () {
							if (n.grecaptcha) {
								t.te = e;
								var o = n.grecaptcha.render;
								n.grecaptcha.render = function (e, n) {
									return e = o(e, n), t.hd++, e
								}, r()
							} else i(new Oo("internal-error"));
							delete n[t.fd]
						};
						var o = z(ba, {
							onload: t.fd,
							hl: e || ""
						});
						kn(ur(o)).f(function () {
							i(new Oo("internal-error", "Unable to load external reCAPTCHA dependencies!"))
						})
					} else r();
				else i(new Oo("network-request-failed"))
			})
		},
		Oa = null,
		Ia = function () {
			return Oa || (Oa = new wa), Oa
		},
		Ta = function (t) {
			if (this.G = t || firebase.INTERNAL.reactNative && firebase.INTERNAL.reactNative.AsyncStorage, !this.G) throw new Oo("internal-error", "The React Native compatibility library was not found.")
		};
	(t = Ta.prototype).get = function (t) {
		return kn(this.G.getItem(t)).then(function (t) {
			return t && to(t)
		})
	}, t.set = function (t, e) {
		return kn(this.G.setItem(t, Ji(e)))
	}, t.remove = function (t) {
		return kn(this.G.removeItem(t))
	}, t.gb = function () {}, t.Xa = function () {};
	var Ca = function () {
		this.G = {}
	};
	(t = Ca.prototype).get = function (t) {
		return kn(this.G[t])
	}, t.set = function (t, e) {
		return this.G[t] = e, kn()
	}, t.remove = function (t) {
		return delete this.G[t], kn()
	}, t.gb = function () {}, t.Xa = function () {};
	var Sa = function () {
			if (!Aa()) {
				if ("Node" == Wi()) throw new Oo("internal-error", "The LocalStorage compatibility library was not found.");
				throw new Oo("web-storage-unsupported")
			}
			this.G = n.localStorage || firebase.INTERNAL.node.localStorage
		},
		Aa = function () {
			var t = "Node" == Wi();
			if (!(t = n.localStorage || t && firebase.INTERNAL.node && firebase.INTERNAL.node.localStorage)) return !1;
			try {
				return t.setItem("__sak", "1"), t.removeItem("__sak"), !0
			} catch (t) {
				return !1
			}
		};
	(t = Sa.prototype).get = function (t) {
		var e = this;
		return kn().then(function () {
			var n = e.G.getItem(t);
			return to(n)
		})
	}, t.set = function (t, e) {
		var n = this;
		return kn().then(function () {
			var r = Ji(e);
			null === r ? n.remove(t) : n.G.setItem(t, r)
		})
	}, t.remove = function (t) {
		var e = this;
		return kn().then(function () {
			e.G.removeItem(t)
		})
	}, t.gb = function (t) {
		n.window && ge(n.window, "storage", t)
	}, t.Xa = function (t) {
		n.window && Ee(n.window, "storage", t)
	};
	var Na = function () {
		this.G = {}
	};
	(t = Na.prototype).get = function () {
		return kn(null)
	}, t.set = function () {
		return kn()
	}, t.remove = function () {
		return kn()
	}, t.gb = function () {}, t.Xa = function () {};
	var Ra = function () {
			if (!ka()) {
				if ("Node" == Wi()) throw new Oo("internal-error", "The SessionStorage compatibility library was not found.");
				throw new Oo("web-storage-unsupported")
			}
			this.G = n.sessionStorage || firebase.INTERNAL.node.sessionStorage
		},
		ka = function () {
			var t = "Node" == Wi();
			if (!(t = n.sessionStorage || t && firebase.INTERNAL.node && firebase.INTERNAL.node.sessionStorage)) return !1;
			try {
				return t.setItem("__sak", "1"), t.removeItem("__sak"), !0
			} catch (t) {
				return !1
			}
		};
	(t = Ra.prototype).get = function (t) {
		var e = this;
		return kn().then(function () {
			var n = e.G.getItem(t);
			return to(n)
		})
	}, t.set = function (t, e) {
		var n = this;
		return kn().then(function () {
			var r = Ji(e);
			null === r ? n.remove(t) : n.G.setItem(t, r)
		})
	}, t.remove = function (t) {
		var e = this;
		return kn().then(function () {
			e.G.removeItem(t)
		})
	}, t.gb = function () {}, t.Xa = function () {};
	var Pa, _a = function (t, e, r, i, o, s) {
			if (!window.indexedDB) throw new Oo("web-storage-unsupported");
			this.nf = t, this.Bd = e, this.jd = r, this.We = i, this.cb = o, this.W = {}, this.dc = [], this.Sb = 0, this.Gf = s || n.indexedDB
		},
		Da = function (t) {
			return new Sn(function (e, n) {
				var r = t.Gf.open(t.nf, t.cb);
				r.onerror = function (t) {
					n(Error(t.target.errorCode))
				}, r.onupgradeneeded = function (e) {
					e = e.target.result;
					try {
						e.createObjectStore(t.Bd, {
							keyPath: t.jd
						})
					} catch (t) {
						n(t)
					}
				}, r.onsuccess = function (t) {
					e(t.target.result)
				}
			})
		},
		ja = function (t) {
			return t.xe || (t.xe = Da(t)), t.xe
		},
		La = function (t, e) {
			return e.objectStore(t.Bd)
		},
		xa = function (t, e, n) {
			return e.transaction([t.Bd], n ? "readwrite" : "readonly")
		},
		Ua = function (t) {
			return new Sn(function (e, n) {
				t.onsuccess = function (t) {
					t && t.target ? e(t.target.result) : e()
				}, t.onerror = function (t) {
					n(Error(t.target.errorCode))
				}
			})
		};
	(t = _a.prototype).set = function (t, e) {
		var n, r = !1,
			i = this;
		return Ln(ja(this).then(function (e) {
			return n = e, e = La(i, xa(i, n, !0)), Ua(e.get(t))
		}).then(function (o) {
			var s = La(i, xa(i, n, !0));
			return o ? (o.value = e, Ua(s.put(o))) : (i.Sb++, r = !0, o = {}, o[i.jd] = t, o[i.We] = e, Ua(s.add(o)))
		}).then(function () {
			i.W[t] = e
		}), function () {
			r && i.Sb--
		})
	}, t.get = function (t) {
		var e = this;
		return ja(this).then(function (n) {
			return Ua(La(e, xa(e, n, !1)).get(t))
		}).then(function (t) {
			return t && t.value
		})
	}, t.remove = function (t) {
		var e = !1,
			n = this;
		return Ln(ja(this).then(function (r) {
			return e = !0, n.Sb++, Ua(La(n, xa(n, r, !0)).delete(t))
		}).then(function () {
			delete n.W[t]
		}), function () {
			e && n.Sb--
		})
	}, t.og = function () {
		var t = this;
		return ja(this).then(function (e) {
			var n = La(t, xa(t, e, !1));
			return n.getAll ? Ua(n.getAll()) : new Sn(function (t, e) {
				var r = [],
					i = n.openCursor();
				i.onsuccess = function (e) {
					(e = e.target.result) ? (r.push(e.value), e.continue()) : t(r)
				}, i.onerror = function (t) {
					e(Error(t.target.errorCode))
				}
			})
		}).then(function (e) {
			var n = {},
				r = [];
			if (0 == t.Sb) {
				for (r = 0; r < e.length; r++) n[e[r][t.jd]] = e[r][t.We];
				r = ki(t.W, n), t.W = n
			}
			return r
		})
	}, t.gb = function (t) {
		0 == this.dc.length && this.Vd(), this.dc.push(t)
	}, t.Xa = function (t) {
		at(this.dc, function (e) {
			return e == t
		}), 0 == this.dc.length && this.Qc()
	}, t.Vd = function () {
		var t = this;
		this.Qc();
		var e = function () {
			return t.Hd = Mr(800).then(y(t.og, t)).then(function (e) {
				0 < e.length && Z(t.dc, function (t) {
					t(e)
				})
			}).then(e).f(function (t) {
				"STOP_EVENT" != t.message && e()
			}), t.Hd
		};
		e()
	}, t.Qc = function () {
		this.Hd && this.Hd.cancel("STOP_EVENT")
	};
	var Fa, Ma = function () {
			this.ke = {
				Browser: Va,
				Node: Wa,
				ReactNative: Ba
			}[Wi()]
		},
		Va = {
			B: Sa,
			Xd: Ra
		},
		Wa = {
			B: Sa,
			Xd: Ra
		},
		Ba = {
			B: Ta,
			Xd: Na
		},
		Xa = function (t) {
			this.vd(t)
		};
	Xa.prototype.vd = function (t) {
		var e = t.url;
		if (void 0 === e) throw new Oo("missing-continue-uri");
		if ("string" != typeof e || "string" == typeof e && !e.length) throw new Oo("invalid-continue-uri");
		this.hf = e, this.Zd = this.lc = null, this.ye = !1;
		var n = t.android;
		if (n && "object" == typeof n) {
			e = n.packageName;
			var r = n.installApp;
			if (n = n.minimumVersion, "string" == typeof e && e.length) {
				if (this.lc = e, void 0 !== r && "boolean" != typeof r) throw new Oo("argument-error", "installApp property must be a boolean when specified.");
				if (this.ye = !!r, void 0 !== n && ("string" != typeof n || "string" == typeof n && !n.length)) throw new Oo("argument-error", "minimumVersion property must be a non empty string when specified.");
				this.Zd = n || null
			} else {
				if (void 0 !== e) throw new Oo("argument-error", "packageName property must be a non empty string when specified.");
				if (void 0 !== r || void 0 !== n) throw new Oo("missing-android-pkg-name")
			}
		} else if (void 0 !== n) throw new Oo("argument-error", "android property must be a non null object when specified.");
		if (this.sd = null, (e = t.iOS) && "object" == typeof e) {
			if ("string" == typeof (e = e.bundleId) && e.length) this.sd = e;
			else if (void 0 !== e) throw new Oo("argument-error", "bundleId property must be a non empty string when specified.")
		} else if (void 0 !== e) throw new Oo("argument-error", "iOS property must be a non null object when specified.");
		if (void 0 !== (t = t.handleCodeInApp) && "boolean" != typeof t) throw new Oo("argument-error", "handleCodeInApp property must be a boolean when specified.");
		if ((this.ee = !!t) && !this.sd && !this.lc) throw new Oo("argument-error", "handleCodeInApp property can't be true when no mobile application is provided.")
	};
	var Ha = function (t) {
			var e = {};
			e.continueUrl = t.hf, e.canHandleCodeInApp = t.ee, (e.androidPackageName = t.lc) && (e.androidMinimumVersion = t.Zd, e.androidInstallApp = t.ye), e.iOSBundleId = t.sd;
			for (var n in e) null === e[n] && delete e[n];
			return e
		},
		qa = function (t, e) {
			this.lf = e, lo(this, "verificationId", t)
		};
	qa.prototype.confirm = function (t) {
		return t = zo(this.verificationId, t), this.lf(t)
	};
	var Ka = function (t, e, n, r) {
			return new Ko(t).verifyPhoneNumber(e, n).then(function (t) {
				return new qa(t, r)
			})
		},
		za = function (t) {
			var e = {},
				n = t.email,
				r = t.newEmail;
			if (t = t.requestType, !n || !t) throw Error("Invalid provider user info!");
			e.fromEmail = r || null, e.email = n, lo(this, "operation", t), lo(this, "data", go(e))
		},
		Ga = function (t, e, n, r, i, o) {
			if (this.Wf = t, this.dg = e, this.yf = n, this.Fc = r, this.Yd = i, this.eg = !!o, this.qb = null, this.Qa = this.Fc, this.Yd < this.Fc) throw Error("Proactive refresh lower bound greater than upper bound!")
		};
	Ga.prototype.start = function () {
		this.Qa = this.Fc, Ya(this, !0)
	};
	var Qa = function (t, e) {
			return e ? (t.Qa = t.Fc, t.yf()) : (e = t.Qa, t.Qa *= 2, t.Qa > t.Yd && (t.Qa = t.Yd), e)
		},
		Ya = function (t, e) {
			t.stop(), t.qb = Mr(Qa(t, e)).then(function () {
				return t.eg ? kn() : uo()
			}).then(function () {
				return t.Wf()
			}).then(function () {
				Ya(t, !0)
			}).f(function (e) {
				t.dg(e) && Ya(t, !1)
			})
		};
	Ga.prototype.stop = function () {
		this.qb && (this.qb.cancel(), this.qb = null)
	};
	var $a = function (t) {
			var e = {};
			e["facebook.com"] = Za, e["google.com"] = eu, e["github.com"] = tu, e["twitter.com"] = nu;
			var n = t && t.providerId;
			return n ? e[n] ? new e[n](t) : new Ja(t) : null
		},
		Ja = function (t) {
			var e = to(t.rawUserInfo || "{}");
			if (!(t = t.providerId)) throw Error("Invalid additional user info!");
			lo(this, "profile", go(e || {})), lo(this, "providerId", t)
		},
		Za = function (t) {
			if (Ja.call(this, t), "facebook.com" != this.providerId) throw Error("Invalid provider id!")
		};
	b(Za, Ja);
	var tu = function (t) {
		if (Ja.call(this, t), "github.com" != this.providerId) throw Error("Invalid provider id!");
		lo(this, "username", this.profile && this.profile.login || null)
	};
	b(tu, Ja);
	var eu = function (t) {
		if (Ja.call(this, t), "google.com" != this.providerId) throw Error("Invalid provider id!")
	};
	b(eu, Ja);
	var nu = function (t) {
		if (Ja.call(this, t), "twitter.com" != this.providerId) throw Error("Invalid provider id!");
		lo(this, "username", t.screenName || null)
	};
	b(nu, Ja);
	var ru, iu = {
			zg: "local",
			NONE: "none",
			Ag: "session"
		},
		ou = function (t) {
			var e = new Oo("invalid-persistence-type"),
				n = new Oo("unsupported-persistence-type");
			t: {
				for (r in iu)
					if (iu[r] == t) {
						var r = !0;
						break t
					}
				r = !1
			}
			if (!r || "string" != typeof t) throw e;
			switch (Wi()) {
				case "ReactNative":
					if ("session" === t) throw n;
					break;
				case "Node":
					if ("none" !== t) throw n;
					break;
				default:
					if (!zi() && "none" !== t) throw n
			}
		},
		su = function (t, e, n, r) {
			this.Ce = t, this.Pd = e, this.fg = n, this.ac = r, this.V = {}, Fa || (Fa = new Ma), t = Fa;
			try {
				if (Ai()) {
					Pa || (Pa = new _a("firebaseLocalStorageDb", "firebaseLocalStorage", "fbase_key", "value", 1));
					var i = Pa
				} else i = new t.ke.B;
				this.He = i
			} catch (t) {
				this.He = new Ca, this.ac = !0
			}
			try {
				this.Re = new t.ke.Xd
			} catch (t) {
				this.Re = new Ca
			}
			this.Ff = new Ca, this.Wd = y(this.Pe, this), this.W = {}
		},
		au = function () {
			return ru || (ru = new su("firebase", ":", !(no(qi()) || !Vi()), $i())), ru
		},
		uu = function (t, e) {
			switch (e) {
				case "session":
					return t.Re;
				case "none":
					return t.Ff;
				default:
					return t.He
			}
		};
	(t = su.prototype).aa = function (t, e) {
		return this.Ce + this.Pd + t.name + (e ? this.Pd + e : "")
	}, t.get = function (t, e) {
		return uu(this, t.B).get(this.aa(t, e))
	}, t.remove = function (t, e) {
		return e = this.aa(t, e), "local" != t.B || this.ac || (this.W[e] = null), uu(this, t.B).remove(e)
	}, t.set = function (t, e, n) {
		var r = this.aa(t, n),
			i = this,
			o = uu(this, t.B);
		return o.set(r, e).then(function () {
			return o.get(r)
		}).then(function (e) {
			"local" != t.B || this.ac || (i.W[r] = e)
		})
	}, t.addListener = function (t, e, r) {
		t = this.aa(t, e), this.ac || (this.W[t] = n.localStorage.getItem(t)), mt(this.V) && this.Vd(), this.V[t] || (this.V[t] = []), this.V[t].push(r)
	}, t.removeListener = function (t, e, n) {
		t = this.aa(t, e), this.V[t] && (at(this.V[t], function (t) {
			return t == n
		}), 0 == this.V[t].length && delete this.V[t]), mt(this.V) && this.Qc()
	}, t.Vd = function () {
		uu(this, "local").gb(this.Wd), this.ac || Ai() || cu(this)
	};
	var cu = function (t) {
			hu(t), t.zd = setInterval(function () {
				for (var e in t.V) {
					var r = n.localStorage.getItem(e),
						i = t.W[e];
					r != i && (t.W[e] = r, r = new se({
						type: "storage",
						key: e,
						target: window,
						oldValue: i,
						newValue: r,
						Gd: !0
					}), t.Pe(r))
				}
			}, 1e3)
		},
		hu = function (t) {
			t.zd && (clearInterval(t.zd), t.zd = null)
		};
	su.prototype.Qc = function () {
		uu(this, "local").Xa(this.Wd), hu(this)
	}, su.prototype.Pe = function (t) {
		if (t && t.wf) {
			var e = t.fa.key;
			if (0 == e.indexOf(this.Ce + this.Pd) && this.V[e]) {
				if (void 0 !== t.fa.Gd ? uu(this, "local").Xa(this.Wd) : hu(this), this.fg) {
					var r = n.localStorage.getItem(e),
						i = t.fa.newValue;
					if (i !== r) null !== i ? n.localStorage.setItem(e, i) : n.localStorage.removeItem(e);
					else if (this.W[e] === i && void 0 === t.fa.Gd) return
				}
				void 0 === t.fa.Gd && this.W[e] === n.localStorage.getItem(e) || (this.W[e] = n.localStorage.getItem(e), this.ce(e))
			}
		} else Z(t, y(this.ce, this))
	}, su.prototype.ce = function (t) {
		this.V[t] && Z(this.V[t], function (t) {
			t()
		})
	};
	var lu = function (t, e) {
			this.j = t, this.h = e || au()
		},
		fu = {
			name: "authEvent",
			B: "local"
		},
		pu = function (t) {
			return t.h.get(fu, t.j).then(function (t) {
				return So(t)
			})
		};
	lu.prototype.fb = function (t) {
		this.h.addListener(fu, this.j, t)
	}, lu.prototype.$b = function (t) {
		this.h.removeListener(fu, this.j, t)
	};
	var du = function (t) {
			this.h = t || au()
		},
		vu = {
			name: "sessionId",
			B: "session"
		};
	du.prototype.sc = function (t) {
		return this.h.get(vu, t)
	};
	var yu = function (t, e, n, r, i, o) {
			this.C = t, this.o = e, this.u = n, this.Ja = r || null, this.Qe = e + ":" + n, this.gg = new du, this.oe = new lu(this.Qe), this.ud = null, this.sa = [], this.Kf = i || 500, this.$f = o || 2e3, this.Nb = this.Ic = null
		},
		gu = function (t) {
			return new Oo("invalid-cordova-configuration", t)
		};
	yu.prototype.Pa = function () {
		return this.Pb ? this.Pb : this.Pb = Fi().then(function () {
			if ("function" != typeof Ki("universalLinks.subscribe", n)) throw gu("cordova-universal-links-plugin is not installed");
			if (void 0 === Ki("BuildInfo.packageName", n)) throw gu("cordova-plugin-buildinfo is not installed");
			if ("function" != typeof Ki("cordova.plugins.browsertab.openUrl", n)) throw gu("cordova-plugin-browsertab is not installed");
			if ("function" != typeof Ki("cordova.InAppBrowser.open", n)) throw gu("cordova-plugin-inappbrowser is not installed")
		}, function () {
			throw new Oo("cordova-not-ready")
		})
	};
	var mu = function () {
			for (var t = 20, e = []; 0 < t;) e.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), t--;
			return e.join("")
		},
		bu = function (t) {
			var e = new Zt;
			return e.update(t), ht(e.digest())
		};
	(t = yu.prototype).cc = function (t, e) {
		return e(new Oo("operation-not-supported-in-this-environment")), kn()
	}, t.Wb = function () {
		return Pn(new Oo("operation-not-supported-in-this-environment"))
	}, t.Se = function () {
		return !1
	}, t.Oe = function () {
		return !0
	}, t.se = function () {
		return !0
	}, t.Xb = function (t, e, r) {
		if (this.Ic) return Pn(new Oo("redirect-operation-pending"));
		var i = this,
			o = n.document,
			s = null,
			a = null,
			u = null,
			c = null;
		return this.Ic = Ln(kn().then(function () {
			return Qo(e), Eu(i)
		}).then(function () {
			return wu(i, t, e, r)
		}).then(function () {
			return new Sn(function (t, e) {
				a = function () {
					var e = Ki("cordova.plugins.browsertab.close", n);
					return t(), "function" == typeof e && e(), i.Nb && "function" == typeof i.Nb.close && (i.Nb.close(), i.Nb = null), !1
				}, i.fb(a), u = function () {
					s || (s = Mr(i.$f).then(function () {
						e(new Oo("redirect-cancelled-by-user"))
					}))
				}, c = function () {
					ao() && u()
				}, o.addEventListener("resume", u, !1), qi().toLowerCase().match(/android/) || o.addEventListener("visibilitychange", c, !1)
			}).f(function (t) {
				return Ou(i).then(function () {
					throw t
				})
			})
		}), function () {
			u && o.removeEventListener("resume", u, !1), c && o.removeEventListener("visibilitychange", c, !1), s && s.cancel(), a && i.$b(a), i.Ic = null
		})
	};
	var wu = function (t, e, r, i) {
		var o = mu(),
			s = new Co(e, i, null, o, new Oo("no-auth-event")),
			a = Ki("BuildInfo.packageName", n);
		if ("string" != typeof a) throw new Oo("invalid-cordova-configuration");
		var u = Ki("BuildInfo.displayName", n),
			c = {};
		if (qi().toLowerCase().match(/iphone|ipad|ipod/)) c.ibi = a;
		else {
			if (!qi().toLowerCase().match(/android/)) return Pn(new Oo("operation-not-supported-in-this-environment"));
			c.apn = a
		}
		u && (c.appDisplayName = u), o = bu(o), c.sessionId = o;
		var h = pa(t.C, t.o, t.u, e, r, null, i, t.Ja, c);
		return t.Pa().then(function () {
			var e = t.Qe;
			return t.gg.h.set(fu, s.I(), e)
		}).then(function () {
			var e = Ki("cordova.plugins.browsertab.isAvailable", n);
			if ("function" != typeof e) throw new Oo("invalid-cordova-configuration");
			var r = null;
			e(function (e) {
				if (e) {
					if ("function" != typeof (r = Ki("cordova.plugins.browsertab.openUrl", n))) throw new Oo("invalid-cordova-configuration");
					r(h)
				} else {
					if ("function" != typeof (r = Ki("cordova.InAppBrowser.open", n))) throw new Oo("invalid-cordova-configuration");
					e = r;
					var i = qi();
					i = !(!i.match(/(iPad|iPhone|iPod).*OS 7_\d/i) && !i.match(/(iPad|iPhone|iPod).*OS 8_\d/i)), t.Nb = e(h, i ? "_blank" : "_system", "location=yes")
				}
			})
		})
	};
	yu.prototype.Hb = function (t) {
		for (var e = 0; e < this.sa.length; e++) try {
			this.sa[e](t)
		} catch (t) {}
	};
	var Eu = function (t) {
			return t.ud || (t.ud = t.Pa().then(function () {
				return new Sn(function (e) {
					var n = function (r) {
						return e(r), t.$b(n), !1
					};
					t.fb(n), Iu(t)
				})
			})), t.ud
		},
		Ou = function (t) {
			var e = null;
			return pu(t.oe).then(function (n) {
				return e = n, (n = t.oe).h.remove(fu, n.j)
			}).then(function () {
				return e
			})
		},
		Iu = function (t) {
			var e = Ki("universalLinks.subscribe", n);
			if ("function" != typeof e) throw new Oo("invalid-cordova-configuration");
			var r = new Co("unknown", null, null, null, new Oo("no-auth-event")),
				i = !1,
				o = Mr(t.Kf).then(function () {
					return Ou(t).then(function () {
						i || t.Hb(r)
					})
				}),
				s = function (e) {
					i = !0, o && o.cancel(), Ou(t).then(function (n) {
						var i = r;
						if (n && e && e.url) {
							i = null;
							var o = e.url,
								s = pi(o),
								a = li(s, "link"),
								u = li(pi(a), "link");
							s = li(s, "deep_link_id"), -1 != (o = li(pi(s), "link") || s || u || a || o).indexOf("/__/auth/callback") && (i = pi(o), i = to(li(i, "firebaseError") || null), i = (i = "object" == typeof i ? Io(i) : null) ? new Co(n.la, n.U, null, null, i) : new Co(n.la, n.U, o, n.sc())), i = i || r
						}
						t.Hb(i)
					})
				},
				a = n.handleOpenURL;
			n.handleOpenURL = function (t) {
				if (0 == t.toLowerCase().indexOf(Ki("BuildInfo.packageName", n).toLowerCase() + "://") && s({
						url: t
					}), "function" == typeof a) try {
					a(t)
				} catch (t) {
					console.error(t)
				}
			}, e(null, s)
		};
	yu.prototype.fb = function (t) {
		this.sa.push(t), Eu(this).f(function (e) {
			"auth/invalid-cordova-configuration" === e.code && (e = new Co("unknown", null, null, null, new Oo("no-auth-event")), t(e))
		})
	}, yu.prototype.$b = function (t) {
		at(this.sa, function (e) {
			return e == t
		})
	};
	var Tu = function (t) {
			this.j = t, this.h = au()
		},
		Cu = {
			name: "pendingRedirect",
			B: "session"
		},
		Su = function (t) {
			return t.h.set(Cu, "pending", t.j)
		},
		Au = function (t) {
			return t.h.remove(Cu, t.j)
		},
		Nu = function (t) {
			return t.h.get(Cu, t.j).then(function (t) {
				return "pending" == t
			})
		},
		Ru = function (t, e, n) {
			this.C = t, this.o = e, this.u = n, this.ec = [], this.ob = !1, this.cd = y(this.qd, this), this.Va = new Uu(this), this.Id = new Xu(this), this.Tb = new Tu(this.o + ":" + this.u), this.Fa = {}, this.Fa.unknown = this.Va, this.Fa.signInViaRedirect = this.Va, this.Fa.linkViaRedirect = this.Va, this.Fa.reauthViaRedirect = this.Va, this.Fa.signInViaPopup = this.Id, this.Fa.linkViaPopup = this.Id, this.Fa.reauthViaPopup = this.Id, this.X = ku(this.C, this.o, this.u)
		},
		ku = function (t, e, n) {
			var r = firebase.SDK_VERSION || null;
			return Mi() ? new yu(t, e, n, r) : new la(t, e, n, r)
		};
	Ru.prototype.reset = function () {
		this.ob = !1, this.X.$b(this.cd), this.X = ku(this.C, this.o, this.u)
	}, Ru.prototype.Ob = function () {
		var t = this;
		this.ob || (this.ob = !0, this.X.fb(this.cd));
		var e = this.X;
		return this.X.Pa().f(function (n) {
			throw t.X == e && t.reset(), n
		})
	};
	var Pu = function (t) {
		t.X.Oe() && t.Ob().f(function (e) {
			var n = new Co("unknown", null, null, null, new Oo("operation-not-supported-in-this-environment"));
			ju(e) && t.qd(n)
		}), t.X.se() || Fu(t.Va)
	};
	Ru.prototype.subscribe = function (t) {
		if (it(this.ec, t) || this.ec.push(t), !this.ob) {
			var e = this;
			Nu(this.Tb).then(function (t) {
				t ? Au(e.Tb).then(function () {
					e.Ob().f(function (t) {
						var n = new Co("unknown", null, null, null, new Oo("operation-not-supported-in-this-environment"));
						ju(t) && e.qd(n)
					})
				}) : Pu(e)
			}).f(function () {
				Pu(e)
			})
		}
	}, Ru.prototype.unsubscribe = function (t) {
		at(this.ec, function (e) {
			return e == t
		})
	}, Ru.prototype.qd = function (t) {
		if (!t) throw new Oo("invalid-auth-event");
		for (var e = !1, n = 0; n < this.ec.length; n++) {
			var r = this.ec[n];
			if (r.de(t.la, t.U)) {
				(e = this.Fa[t.la]) && e.Ie(t, r), e = !0;
				break
			}
		}
		return Fu(this.Va), e
	};
	var _u = new oo(2e3, 1e4),
		Du = new oo(3e4, 6e4);
	Ru.prototype.getRedirectResult = function () {
		return this.Va.getRedirectResult()
	}, Ru.prototype.Wb = function (t, e, n, r, i) {
		var o = this;
		return this.X.Wb(t, e, n, function () {
			o.ob || (o.ob = !0, o.X.fb(o.cd))
		}, function () {
			o.reset()
		}, r, i)
	};
	var ju = function (t) {
		return !(!t || "auth/cordova-not-ready" != t.code)
	};
	Ru.prototype.Xb = function (t, e, n) {
		var r, i = this;
		return Su(this.Tb).then(function () {
			return i.X.Xb(t, e, n).f(function (t) {
				if (ju(t)) throw new Oo("operation-not-supported-in-this-environment");
				return r = t, Au(i.Tb).then(function () {
					throw r
				})
			}).then(function () {
				return i.X.Se() ? new Sn(function () {}) : Au(i.Tb).then(function () {
					return i.getRedirectResult()
				}).then(function () {}).f(function () {})
			})
		})
	}, Ru.prototype.cc = function (t, e, n, r) {
		return this.X.cc(n, function (n) {
			t.Za(e, null, n, r)
		}, _u.get())
	};
	var Lu = {},
		xu = function (t, e, n) {
			var r = e + ":" + n;
			return Lu[r] || (Lu[r] = new Ru(t, e, n)), Lu[r]
		},
		Uu = function (t) {
			this.h = t, this.xb = null, this.Zb = [], this.Yb = [], this.ub = null, this.Ld = !1
		};
	Uu.prototype.reset = function () {
		this.xb = null, this.ub && (this.ub.cancel(), this.ub = null)
	}, Uu.prototype.Ie = function (t, e) {
		if (!t) return Pn(new Oo("invalid-auth-event"));
		this.reset(), this.Ld = !0;
		var n = t.la,
			r = t.U,
			i = t.getError() && "auth/web-storage-unsupported" == t.getError().code,
			o = t.getError() && "auth/operation-not-supported-in-this-environment" == t.getError().code;
		return "unknown" != n || i || o ? t = t.$ ? this.Jd(t, e) : e.Jb(n, r) ? this.Kd(t, e) : Pn(new Oo("invalid-auth-event")) : (Wu(this, !1, null, null), t = kn()), t
	};
	var Fu = function (t) {
		t.Ld || (t.Ld = !0, Wu(t, !1, null, null))
	};
	Uu.prototype.Jd = function (t) {
		return Wu(this, !0, null, t.getError()), kn()
	}, Uu.prototype.Kd = function (t, e) {
		var n = this;
		e = e.Jb(t.la, t.U);
		var r = t.Ab,
			i = t.sc(),
			o = !!t.la.match(/Redirect$/);
		return e(r, i).then(function (t) {
			Wu(n, o, t, null)
		}).f(function (t) {
			Wu(n, o, null, t)
		})
	};
	var Mu = function (t, e) {
			if (t.xb = function () {
					return Pn(e)
				}, t.Yb.length)
				for (var n = 0; n < t.Yb.length; n++) t.Yb[n](e)
		},
		Vu = function (t, e) {
			if (t.xb = function () {
					return kn(e)
				}, t.Zb.length)
				for (var n = 0; n < t.Zb.length; n++) t.Zb[n](e)
		},
		Wu = function (t, e, n, r) {
			e ? r ? Mu(t, r) : Vu(t, n) : Vu(t, {
				user: null
			}), t.Zb = [], t.Yb = []
		};
	Uu.prototype.getRedirectResult = function () {
		var t = this;
		return new Sn(function (e, n) {
			t.xb ? t.xb().then(e, n) : (t.Zb.push(e), t.Yb.push(n), Bu(t))
		})
	};
	var Bu = function (t) {
			var e = new Oo("timeout");
			t.ub && t.ub.cancel(), t.ub = Mr(Du.get()).then(function () {
				t.xb || Wu(t, !0, null, e)
			})
		},
		Xu = function (t) {
			this.h = t
		};
	Xu.prototype.Ie = function (t, e) {
		if (!t) return Pn(new Oo("invalid-auth-event"));
		var n = t.la,
			r = t.U;
		return t.$ ? this.Jd(t, e) : e.Jb(n, r) ? this.Kd(t, e) : Pn(new Oo("invalid-auth-event"))
	}, Xu.prototype.Jd = function (t, e) {
		return e.Za(t.la, null, t.getError(), t.U), kn()
	}, Xu.prototype.Kd = function (t, e) {
		var n = t.U,
			r = t.la,
			i = e.Jb(r, n),
			o = t.Ab;
		return t = t.sc(), i(o, t).then(function (t) {
			e.Za(r, t, null, n)
		}).f(function (t) {
			e.Za(r, null, t, n)
		})
	};
	var Hu = function (t) {
		this.g = t, this.Ga = this.da = null, this.La = 0
	};
	Hu.prototype.I = function () {
		return {
			apiKey: this.g.o,
			refreshToken: this.da,
			accessToken: this.Ga,
			expirationTime: this.La
		}
	};
	var qu = function (t, e) {
			var n = e.idToken,
				r = e.refreshToken;
			e = Ku(e.expiresIn), t.Ga = n, t.La = e, t.da = r
		},
		Ku = function (t) {
			return m() + 1e3 * parseInt(t, 10)
		},
		zu = function (t, e) {
			return hs(t.g, e).then(function (e) {
				return t.Ga = e.access_token, t.La = Ku(e.expires_in), t.da = e.refresh_token, {
					accessToken: t.Ga,
					expirationTime: t.La,
					refreshToken: t.da
				}
			}).f(function (e) {
				throw "auth/user-token-expired" == e.code && (t.da = null), e
			})
		};
	Hu.prototype.getToken = function (t) {
		return t = !!t, this.Ga && !this.da ? Pn(new Oo("user-token-expired")) : t || !this.Ga || m() > this.La - 3e4 ? this.da ? zu(this, {
			grant_type: "refresh_token",
			refresh_token: this.da
		}) : kn(null) : kn({
			accessToken: this.Ga,
			expirationTime: this.La,
			refreshToken: this.da
		})
	};
	var Gu = function (t, e, n, r, i, o) {
			fo(this, {
				uid: t,
				displayName: r || null,
				photoURL: i || null,
				email: n || null,
				phoneNumber: o || null,
				providerId: e
			})
		},
		Qu = function (t, e) {
			oe.call(this, t);
			for (var n in e) this[n] = e[n]
		};
	b(Qu, oe);
	var Yu = function (t, e, n) {
		this.K = [], this.o = t.apiKey, this.u = t.appName, this.C = t.authDomain || null, t = firebase.SDK_VERSION ? Hi(firebase.SDK_VERSION) : null, this.g = new ts(this.o, null, t), this.qa = new Hu(this.g), nc(this, e.idToken), qu(this.qa, e), lo(this, "refreshToken", this.qa.da), sc(this, n || {}), Cr.call(this), this.Jc = !1, this.C && Gi() && (this.v = xu(this.C, this.o, this.u)), this.Pc = [], this.ra = null, this.sb = Zu(this), this.Cb = y(this.rd, this);
		var r = this;
		this.ha = null, this.Ee = function (t) {
			r.bc(t.Nf)
		}, this.xd = null
	};
	b(Yu, Cr), Yu.prototype.bc = function (t) {
		this.ha = t, os(this.g, t)
	};
	var $u = function (t, e) {
		t.xd && Ee(t.xd, "languageCodeChanged", t.Ee), (t.xd = e) && ge(e, "languageCodeChanged", t.Ee)
	};
	Yu.prototype.rd = function () {
		this.sb.qb && (this.sb.stop(), this.sb.start())
	};
	var Ju = function (t) {
			try {
				return firebase.app(t.u).auth()
			} catch (e) {
				throw new Oo("internal-error", "No firebase.auth.Auth instance is available for the Firebase App '" + t.u + "'!")
			}
		},
		Zu = function (t) {
			return new Ga(function () {
				return t.getIdToken(!0)
			}, function (t) {
				return !(!t || "auth/network-request-failed" != t.code)
			}, function () {
				var e = t.qa.La - m() - 3e5;
				return 0 < e ? e : 0
			}, 3e4, 96e4, !1)
		},
		tc = function (t) {
			t.Gb || t.sb.qb || (t.sb.start(), Ee(t, "tokenChanged", t.Cb), ge(t, "tokenChanged", t.Cb))
		},
		ec = function (t) {
			Ee(t, "tokenChanged", t.Cb), t.sb.stop()
		},
		nc = function (t, e) {
			t.ze = e, lo(t, "_lat", e)
		},
		rc = function (t, e) {
			at(t.Pc, function (t) {
				return t == e
			})
		},
		ic = function (t) {
			for (var e = [], n = 0; n < t.Pc.length; n++) e.push(t.Pc[n](t));
			return jn(e).then(function () {
				return t
			})
		},
		oc = function (t) {
			t.v && !t.Jc && (t.Jc = !0, t.v.subscribe(t))
		},
		sc = function (t, e) {
			fo(t, {
				uid: e.uid,
				displayName: e.displayName || null,
				photoURL: e.photoURL || null,
				email: e.email || null,
				emailVerified: e.emailVerified || !1,
				phoneNumber: e.phoneNumber || null,
				isAnonymous: e.isAnonymous || !1,
				providerData: []
			})
		};
	lo(Yu.prototype, "providerId", "firebase");
	var ac = function () {},
		uc = function (t) {
			return kn().then(function () {
				if (t.Gb) throw new Oo("app-deleted")
			})
		},
		cc = function (t) {
			return et(t.providerData, function (t) {
				return t.providerId
			})
		},
		hc = function (t, e) {
			e && (lc(t, e.providerId), t.providerData.push(e))
		},
		lc = function (t, e) {
			at(t.providerData, function (t) {
				return t.providerId == e
			})
		},
		fc = function (t, e, n) {
			("uid" != e || n) && t.hasOwnProperty(e) && lo(t, e, n)
		};
	Yu.prototype.copy = function (t) {
		var e = this;
		e != t && (fo(this, {
			uid: t.uid,
			displayName: t.displayName,
			photoURL: t.photoURL,
			email: t.email,
			emailVerified: t.emailVerified,
			phoneNumber: t.phoneNumber,
			isAnonymous: t.isAnonymous,
			providerData: []
		}), Z(t.providerData, function (t) {
			hc(e, t)
		}), this.qa = t.qa, lo(this, "refreshToken", this.qa.da))
	}, Yu.prototype.reload = function () {
		var t = this;
		return this.c(uc(this).then(function () {
			return pc(t).then(function () {
				return ic(t)
			}).then(ac)
		}))
	};
	var pc = function (t) {
		return t.getIdToken().then(function (e) {
			var n = t.isAnonymous;
			return vc(t, e).then(function () {
				return n || fc(t, "isAnonymous", !1), e
			})
		})
	};
	Yu.prototype.getIdToken = function (t) {
		var e = this;
		return this.c(uc(this).then(function () {
			return e.qa.getToken(t)
		}).then(function (t) {
			if (!t) throw new Oo("internal-error");
			return t.accessToken != e.ze && (nc(e, t.accessToken), e.Ra()), fc(e, "refreshToken", t.refreshToken), t.accessToken
		}))
	}, Yu.prototype.getToken = function (t) {
		return co["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."] || (co["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."] = !0, "undefined" != typeof console && "function" == typeof console.warn && console.warn("firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead.")), this.getIdToken(t)
	};
	var dc = function (t, e) {
		e.idToken && t.ze != e.idToken && (qu(t.qa, e), t.Ra(), nc(t, e.idToken), fc(t, "refreshToken", t.qa.da))
	};
	Yu.prototype.Ra = function () {
		this.dispatchEvent(new Qu("tokenChanged"))
	};
	var vc = function (t, e) {
		return Ys(t.g, _s, {
			idToken: e
		}).then(y(t.Xf, t))
	};
	Yu.prototype.Xf = function (t) {
		if (!(t = t.users) || !t.length) throw new Oo("internal-error");
		t = t[0], sc(this, {
			uid: t.localId,
			displayName: t.displayName,
			photoURL: t.photoUrl,
			email: t.email,
			emailVerified: !!t.emailVerified,
			phoneNumber: t.phoneNumber
		});
		for (var e = yc(t), n = 0; n < e.length; n++) hc(this, e[n]);
		fc(this, "isAnonymous", !(this.email && t.passwordHash || this.providerData && this.providerData.length))
	};
	var yc = function (t) {
		return (t = t.providerUserInfo) && t.length ? et(t, function (t) {
			return new Gu(t.rawId, t.providerId, t.email, t.displayName, t.photoUrl, t.phoneNumber)
		}) : []
	};
	Yu.prototype.reauthenticateAndRetrieveDataWithCredential = function (t) {
		var e = this,
			n = null;
		return this.c(t.Ad(this.g, this.uid).then(function (t) {
			return dc(e, t), n = mc(e, t, "reauthenticate"), e.ra = null, e.reload()
		}).then(function () {
			return n
		}), !0)
	}, Yu.prototype.reauthenticateWithCredential = function (t) {
		return this.reauthenticateAndRetrieveDataWithCredential(t).then(function () {})
	};
	var gc = function (t, e) {
		return pc(t).then(function () {
			if (it(cc(t), e)) return ic(t).then(function () {
				throw new Oo("provider-already-linked")
			})
		})
	};
	Yu.prototype.linkAndRetrieveDataWithCredential = function (t) {
		var e = this,
			n = null;
		return this.c(gc(this, t.providerId).then(function () {
			return e.getIdToken()
		}).then(function (n) {
			return t.Ec(e.g, n)
		}).then(function (t) {
			return n = mc(e, t, "link"), bc(e, t)
		}).then(function () {
			return n
		}))
	}, Yu.prototype.linkWithCredential = function (t) {
		return this.linkAndRetrieveDataWithCredential(t).then(function (t) {
			return t.user
		})
	}, Yu.prototype.linkWithPhoneNumber = function (t, e) {
		var n = this;
		return this.c(gc(this, "phone").then(function () {
			return Ka(Ju(n), t, e, y(n.linkAndRetrieveDataWithCredential, n))
		}))
	}, Yu.prototype.reauthenticateWithPhoneNumber = function (t, e) {
		var n = this;
		return this.c(kn().then(function () {
			return Ka(Ju(n), t, e, y(n.reauthenticateAndRetrieveDataWithCredential, n))
		}), !0)
	};
	var mc = function (t, e, n) {
			var r = Go(e);
			return e = $a(e), po({
				user: t,
				credential: r,
				additionalUserInfo: e,
				operationType: n
			})
		},
		bc = function (t, e) {
			return dc(t, e), t.reload().then(function () {
				return t
			})
		};
	(t = Yu.prototype).updateEmail = function (t) {
		var e = this;
		return this.c(this.getIdToken().then(function (n) {
			return e.g.updateEmail(n, t)
		}).then(function (t) {
			return dc(e, t), e.reload()
		}))
	}, t.updatePhoneNumber = function (t) {
		var e = this;
		return this.c(this.getIdToken().then(function (n) {
			return t.Ec(e.g, n)
		}).then(function (t) {
			return dc(e, t), e.reload()
		}))
	}, t.updatePassword = function (t) {
		var e = this;
		return this.c(this.getIdToken().then(function (n) {
			return e.g.updatePassword(n, t)
		}).then(function (t) {
			return dc(e, t), e.reload()
		}))
	}, t.updateProfile = function (t) {
		if (void 0 === t.displayName && void 0 === t.photoURL) return uc(this);
		var e = this;
		return this.c(this.getIdToken().then(function (n) {
			return e.g.updateProfile(n, {
				displayName: t.displayName,
				photoUrl: t.photoURL
			})
		}).then(function (t) {
			return dc(e, t), fc(e, "displayName", t.displayName || null), fc(e, "photoURL", t.photoUrl || null), Z(e.providerData, function (t) {
				"password" === t.providerId && (lo(t, "displayName", e.displayName), lo(t, "photoURL", e.photoURL))
			}), ic(e)
		}).then(ac))
	}, t.unlink = function (t) {
		var e = this;
		return this.c(pc(this).then(function (n) {
			return it(cc(e), t) ? bs(e.g, n, [t]).then(function (t) {
				var n = {};
				return Z(t.providerUserInfo || [], function (t) {
					n[t.providerId] = !0
				}), Z(cc(e), function (t) {
					n[t] || lc(e, t)
				}), n[Ko.PROVIDER_ID] || lo(e, "phoneNumber", null), ic(e)
			}) : ic(e).then(function () {
				throw new Oo("no-such-provider")
			})
		}))
	}, t.delete = function () {
		var t = this;
		return this.c(this.getIdToken().then(function (e) {
			return Ys(t.g, ks, {
				idToken: e
			})
		}).then(function () {
			t.dispatchEvent(new Qu("userDeleted"))
		})).then(function () {
			for (var e = 0; e < t.K.length; e++) t.K[e].cancel("app-deleted");
			$u(t, null), t.K = [], t.Gb = !0, ec(t), lo(t, "refreshToken", null), t.v && t.v.unsubscribe(t)
		})
	}, t.de = function (t, e) {
		return !!("linkViaPopup" == t && (this.ka || null) == e && this.ja || "reauthViaPopup" == t && (this.ka || null) == e && this.ja || "linkViaRedirect" == t && (this.Ea || null) == e || "reauthViaRedirect" == t && (this.Ea || null) == e)
	}, t.Za = function (t, e, n, r) {
		"linkViaPopup" != t && "reauthViaPopup" != t || r != (this.ka || null) || (n && this.Ta ? this.Ta(n) : e && !n && this.ja && this.ja(e), this.M && (this.M.cancel(), this.M = null), delete this.ja, delete this.Ta)
	}, t.Jb = function (t, e) {
		return "linkViaPopup" == t && e == (this.ka || null) ? y(this.me, this) : "reauthViaPopup" == t && e == (this.ka || null) ? y(this.ne, this) : "linkViaRedirect" == t && (this.Ea || null) == e ? y(this.me, this) : "reauthViaRedirect" == t && (this.Ea || null) == e ? y(this.ne, this) : null
	}, t.rc = function () {
		return eo(this.uid + ":::")
	}, t.linkWithPopup = function (t) {
		var e = this;
		return wc(this, "linkViaPopup", t, function () {
			return gc(e, t.providerId).then(function () {
				return ic(e)
			})
		}, !1)
	}, t.reauthenticateWithPopup = function (t) {
		return wc(this, "reauthViaPopup", t, function () {
			return kn()
		}, !0)
	};
	var wc = function (t, e, n, r, i) {
		if (!Gi()) return Pn(new Oo("operation-not-supported-in-this-environment"));
		if (t.ra && !i) return Pn(t.ra);
		var o = Eo(n.providerId),
			s = t.rc(),
			a = null;
		(!$i() || Vi()) && t.C && n.isOAuthProvider && (a = pa(t.C, t.o, t.u, e, n, null, s, firebase.SDK_VERSION || null));
		var u = ji(a, o && o.Vb, o && o.Ub);
		return r = r().then(function () {
			if (Oc(t), !i) return t.getIdToken().then(function () {})
		}).then(function () {
			return t.v.Wb(u, e, n, s, !!a)
		}).then(function () {
			return new Sn(function (n, r) {
				t.Za(e, null, new Oo("cancelled-popup-request"), t.ka || null), t.ja = n, t.Ta = r, t.ka = s, t.M = t.v.cc(t, e, u, s)
			})
		}).then(function (t) {
			return u && Di(u), t ? po(t) : null
		}).f(function (t) {
			throw u && Di(u), t
		}), t.c(r, i)
	};
	Yu.prototype.linkWithRedirect = function (t) {
		var e = this;
		return Ec(this, "linkViaRedirect", t, function () {
			return gc(e, t.providerId)
		}, !1)
	}, Yu.prototype.reauthenticateWithRedirect = function (t) {
		return Ec(this, "reauthViaRedirect", t, function () {
			return kn()
		}, !0)
	};
	var Ec = function (t, e, n, r, i) {
			if (!Gi()) return Pn(new Oo("operation-not-supported-in-this-environment"));
			if (t.ra && !i) return Pn(t.ra);
			var o = null,
				s = t.rc();
			return r = r().then(function () {
				if (Oc(t), !i) return t.getIdToken().then(function () {})
			}).then(function () {
				return t.Ea = s, ic(t)
			}).then(function (e) {
				return t.Wa && (e = t.Wa, e = e.h.set(Ac, t.I(), e.j)), e
			}).then(function () {
				return t.v.Xb(e, n, s)
			}).f(function (e) {
				if (o = e, t.Wa) return Nc(t.Wa);
				throw o
			}).then(function () {
				if (o) throw o
			}), t.c(r, i)
		},
		Oc = function (t) {
			if (!t.v || !t.Jc) {
				if (t.v && !t.Jc) throw new Oo("internal-error");
				throw new Oo("auth-domain-config-required")
			}
		};
	Yu.prototype.me = function (t, e) {
		var n = this;
		this.M && (this.M.cancel(), this.M = null);
		var r = null,
			i = this.getIdToken().then(function (r) {
				return Is(n.g, {
					requestUri: t,
					sessionId: e,
					idToken: r
				})
			}).then(function (t) {
				return r = mc(n, t, "link"), bc(n, t)
			}).then(function () {
				return r
			});
		return this.c(i)
	}, Yu.prototype.ne = function (t, e) {
		var n = this;
		this.M && (this.M.cancel(), this.M = null);
		var r = null,
			i = kn().then(function () {
				return Ro(Ts(n.g, {
					requestUri: t,
					sessionId: e
				}), n.uid)
			}).then(function (t) {
				return r = mc(n, t, "reauthenticate"), dc(n, t), n.ra = null, n.reload()
			}).then(function () {
				return r
			});
		return this.c(i, !0)
	}, Yu.prototype.sendEmailVerification = function (t) {
		var e = this,
			n = null;
		return this.c(this.getIdToken().then(function (e) {
			return n = e, void 0 === t || mt(t) ? {} : Ha(new Xa(t))
		}).then(function (t) {
			return e.g.sendEmailVerification(n, t)
		}).then(function (t) {
			if (e.email != t) return e.reload()
		}).then(function () {}))
	}, Yu.prototype.c = function (t, e) {
		var n = this,
			r = Ic(this, t, e);
		return this.K.push(r), Ln(r, function () {
			ot(n.K, r)
		}), r
	};
	var Ic = function (t, e, n) {
		return t.ra && !n ? (e.cancel(), Pn(t.ra)) : e.f(function (e) {
			throw !e || "auth/user-disabled" != e.code && "auth/user-token-expired" != e.code || (t.ra || t.dispatchEvent(new Qu("userInvalidated")), t.ra = e), e
		})
	};
	Yu.prototype.toJSON = function () {
		return this.I()
	}, Yu.prototype.I = function () {
		var t = {
			uid: this.uid,
			displayName: this.displayName,
			photoURL: this.photoURL,
			email: this.email,
			emailVerified: this.emailVerified,
			phoneNumber: this.phoneNumber,
			isAnonymous: this.isAnonymous,
			providerData: [],
			apiKey: this.o,
			appName: this.u,
			authDomain: this.C,
			stsTokenManager: this.qa.I(),
			redirectEventId: this.Ea || null
		};
		return Z(this.providerData, function (e) {
			t.providerData.push(vo(e))
		}), t
	};
	var Tc = function (t) {
			if (!t.apiKey) return null;
			var e = {
					apiKey: t.apiKey,
					authDomain: t.authDomain,
					appName: t.appName
				},
				n = {};
			if (!(t.stsTokenManager && t.stsTokenManager.accessToken && t.stsTokenManager.expirationTime)) return null;
			n.idToken = t.stsTokenManager.accessToken, n.refreshToken = t.stsTokenManager.refreshToken || null, n.expiresIn = (t.stsTokenManager.expirationTime - m()) / 1e3;
			var r = new Yu(e, n, t);
			return t.providerData && Z(t.providerData, function (t) {
				t && hc(r, po(t))
			}), t.redirectEventId && (r.Ea = t.redirectEventId), r
		},
		Cc = function (t, e, n) {
			var r = new Yu(t, e);
			return n && (r.Wa = n), r.reload().then(function () {
				return r
			})
		},
		Sc = function (t) {
			this.j = t, this.h = au()
		},
		Ac = {
			name: "redirectUser",
			B: "session"
		},
		Nc = function (t) {
			return t.h.remove(Ac, t.j)
		},
		Rc = function (t, e) {
			return t.h.get(Ac, t.j).then(function (t) {
				return t && e && (t.authDomain = e), Tc(t || {})
			})
		},
		kc = function (t, e) {
			this.j = t, this.h = e || au(), this.N = null, this.Dd = this.vd(), this.h.addListener(Dc("local"), this.j, y(this.mg, this))
		};
	kc.prototype.mg = function () {
		var t = this,
			e = Dc("local");
		Fc(this, function () {
			return kn().then(function () {
				return t.N && "local" != t.N.B ? t.h.get(e, t.j) : null
			}).then(function (n) {
				if (n) return Pc(t, "local").then(function () {
					t.N = e
				})
			})
		})
	};
	var Pc = function (t, e) {
		var n, r = [];
		for (n in iu) iu[n] !== e && r.push(t.h.remove(Dc(iu[n]), t.j));
		return r.push(t.h.remove(_c, t.j)), Dn(r)
	};
	kc.prototype.vd = function () {
		var t = this,
			e = Dc("local"),
			n = Dc("session"),
			r = Dc("none");
		return this.h.get(n, this.j).then(function (i) {
			return i ? n : t.h.get(r, t.j).then(function (n) {
				return n ? r : t.h.get(e, t.j).then(function (n) {
					return n ? e : t.h.get(_c, t.j).then(function (t) {
						return t ? Dc(t) : e
					})
				})
			})
		}).then(function (e) {
			return t.N = e, Pc(t, e.B)
		}).f(function () {
			t.N || (t.N = e)
		})
	};
	var _c = {
			name: "persistence",
			B: "session"
		},
		Dc = function (t) {
			return {
				name: "authUser",
				B: t
			}
		};
	kc.prototype.Sd = function (t) {
		var e = null,
			n = this;
		return ou(t), Fc(this, function () {
			return t != n.N.B ? n.h.get(n.N, n.j).then(function (r) {
				return e = r, Pc(n, t)
			}).then(function () {
				if (n.N = Dc(t), e) return n.h.set(n.N, e, n.j)
			}) : kn()
		})
	};
	var jc = function (t) {
			return Fc(t, function () {
				return t.h.set(_c, t.N.B, t.j)
			})
		},
		Lc = function (t, e) {
			return Fc(t, function () {
				return t.h.set(t.N, e.I(), t.j)
			})
		},
		xc = function (t) {
			return Fc(t, function () {
				return t.h.remove(t.N, t.j)
			})
		},
		Uc = function (t, e) {
			return Fc(t, function () {
				return t.h.get(t.N, t.j).then(function (t) {
					return t && e && (t.authDomain = e), Tc(t || {})
				})
			})
		},
		Fc = function (t, e) {
			return t.Dd = t.Dd.then(e, e), t.Dd
		},
		Mc = function (t) {
			if (this.Ba = !1, lo(this, "app", t), !this.i().options || !this.i().options.apiKey) throw new Oo("invalid-api-key");
			t = firebase.SDK_VERSION ? Hi(firebase.SDK_VERSION) : null, this.g = new ts(this.i().options && this.i().options.apiKey, null, t), this.K = [], this.Ha = [], this.Bb = [], this.Tf = firebase.INTERNAL.createSubscribe(y(this.Hf, this)), this.jc = void 0, this.Vf = firebase.INTERNAL.createSubscribe(y(this.Jf, this)), qc(this, null), t = this.i().options.apiKey;
			var e = this.i().name;
			this.ma = new kc(t + ":" + e), t = this.i().options.apiKey, e = this.i().name, this.vb = new Sc(t + ":" + e), this.mc = this.c(zc(this)), this.xa = this.c(Gc(this)), this.Bc = !1, this.pd = y(this.ng, this), this.Ve = y(this.lb, this), this.Cb = y(this.rd, this), this.Te = y(this.Cf, this), this.Ue = y(this.Df, this), Xc(this), this.INTERNAL = {}, this.INTERNAL.delete = y(this.delete, this), this.Ma = 0, Cr.call(this), Wc(this)
		};
	b(Mc, Cr);
	var Vc = function (t) {
		oe.call(this, "languageCodeChanged"), this.Nf = t
	};
	b(Vc, oe), Mc.prototype.Sd = function (t) {
		return t = this.ma.Sd(t), this.c(t)
	}, Mc.prototype.bc = function (t) {
		this.ha === t || this.Ba || (this.ha = t, os(this.g, this.ha), this.dispatchEvent(new Vc(this.ha)))
	};
	var Wc = function (t) {
		Object.defineProperty(t, "lc", {
			get: function () {
				return this.ha
			},
			set: function (t) {
				this.bc(t)
			},
			enumerable: !1
		}), t.ha = null
	};
	Mc.prototype.toJSON = function () {
		return {
			apiKey: this.i().options.apiKey,
			authDomain: this.i().options.authDomain,
			appName: this.i().name,
			currentUser: Yc(this) && Yc(this).I()
		}
	};
	var Bc = function (t) {
			return t.pf || Pn(new Oo("auth-domain-config-required"))
		},
		Xc = function (t) {
			var e = t.i().options.authDomain,
				n = t.i().options.apiKey;
			e && Gi() && (t.pf = t.mc.then(function () {
				if (!t.Ba) {
					if (t.v = xu(e, n, t.i().name), t.v.subscribe(t), Yc(t) && oc(Yc(t)), t.wb) {
						oc(t.wb);
						var r = t.wb;
						r.bc(t.ha), $u(r, t), t.wb = null
					}
					return t.v
				}
			}))
		};
	(t = Mc.prototype).de = function (t, e) {
		switch (t) {
			case "unknown":
			case "signInViaRedirect":
				return !0;
			case "signInViaPopup":
				return this.ka == e && !!this.ja;
			default:
				return !1
		}
	}, t.Za = function (t, e, n, r) {
		"signInViaPopup" == t && this.ka == r && (n && this.Ta ? this.Ta(n) : e && !n && this.ja && this.ja(e), this.M && (this.M.cancel(), this.M = null), delete this.ja, delete this.Ta)
	}, t.Jb = function (t, e) {
		return "signInViaRedirect" == t || "signInViaPopup" == t && this.ka == e && this.ja ? y(this.rf, this) : null
	}, t.rf = function (t, e) {
		var n = this;
		t = {
			requestUri: t,
			sessionId: e
		}, this.M && (this.M.cancel(), this.M = null);
		var r = null,
			i = null,
			o = Os(n.g, t).then(function (t) {
				return r = Go(t), i = $a(t), t
			});
		return t = n.mc.then(function () {
			return o
		}).then(function (t) {
			return Hc(n, t)
		}).then(function () {
			return po({
				user: Yc(n),
				credential: r,
				additionalUserInfo: i,
				operationType: "signIn"
			})
		}), this.c(t)
	}, t.rc = function () {
		return eo()
	}, t.signInWithPopup = function (t) {
		if (!Gi()) return Pn(new Oo("operation-not-supported-in-this-environment"));
		var e = this,
			n = Eo(t.providerId),
			r = this.rc(),
			i = null;
		(!$i() || Vi()) && this.i().options.authDomain && t.isOAuthProvider && (i = pa(this.i().options.authDomain, this.i().options.apiKey, this.i().name, "signInViaPopup", t, null, r, firebase.SDK_VERSION || null));
		var o = ji(i, n && n.Vb, n && n.Ub);
		return n = Bc(this).then(function (e) {
			return e.Wb(o, "signInViaPopup", t, r, !!i)
		}).then(function () {
			return new Sn(function (t, n) {
				e.Za("signInViaPopup", null, new Oo("cancelled-popup-request"), e.ka), e.ja = t, e.Ta = n, e.ka = r, e.M = e.v.cc(e, "signInViaPopup", o, r)
			})
		}).then(function (t) {
			return o && Di(o), t ? po(t) : null
		}).f(function (t) {
			throw o && Di(o), t
		}), this.c(n)
	}, t.signInWithRedirect = function (t) {
		if (!Gi()) return Pn(new Oo("operation-not-supported-in-this-environment"));
		var e = this,
			n = Bc(this).then(function () {
				return jc(e.ma)
			}).then(function () {
				return e.v.Xb("signInViaRedirect", t)
			});
		return this.c(n)
	}, t.getRedirectResult = function () {
		if (!Gi()) return Pn(new Oo("operation-not-supported-in-this-environment"));
		var t = this,
			e = Bc(this).then(function () {
				return t.v.getRedirectResult()
			}).then(function (t) {
				return t ? po(t) : null
			});
		return this.c(e)
	};
	var Hc = function (t, e) {
			var n = {};
			return n.apiKey = t.i().options.apiKey, n.authDomain = t.i().options.authDomain, n.appName = t.i().name, t.mc.then(function () {
				return Cc(n, e, t.vb)
			}).then(function (e) {
				return Yc(t) && e.uid == Yc(t).uid ? (Yc(t).copy(e), t.lb(e)) : (qc(t, e), oc(e), t.lb(e))
			}).then(function () {
				t.Ra()
			})
		},
		qc = function (t, e) {
			Yc(t) && (rc(Yc(t), t.Ve), Ee(Yc(t), "tokenChanged", t.Cb), Ee(Yc(t), "userDeleted", t.Te), Ee(Yc(t), "userInvalidated", t.Ue), ec(Yc(t))), e && (e.Pc.push(t.Ve), ge(e, "tokenChanged", t.Cb), ge(e, "userDeleted", t.Te), ge(e, "userInvalidated", t.Ue), 0 < t.Ma && tc(e)), lo(t, "currentUser", e), e && (e.bc(t.ha), $u(e, t))
		};
	Mc.prototype.signOut = function () {
		var t = this,
			e = this.xa.then(function () {
				return Yc(t) ? (qc(t, null), xc(t.ma).then(function () {
					t.Ra()
				})) : kn()
			});
		return this.c(e)
	};
	var Kc = function (t) {
			var e = t.i().options.authDomain;
			return e = Rc(t.vb, e).then(function (e) {
				return (t.wb = e) && (e.Wa = t.vb), Nc(t.vb)
			}), t.c(e)
		},
		zc = function (t) {
			var e = t.i().options.authDomain,
				n = Kc(t).then(function () {
					return Uc(t.ma, e)
				}).then(function (e) {
					return e ? (e.Wa = t.vb, t.wb && (t.wb.Ea || null) == (e.Ea || null) ? e : e.reload().then(function () {
						return Lc(t.ma, e).then(function () {
							return e
						})
					}).f(function (n) {
						return "auth/network-request-failed" == n.code ? e : xc(t.ma)
					})) : null
				}).then(function (e) {
					qc(t, e || null)
				});
			return t.c(n)
		},
		Gc = function (t) {
			return t.mc.then(function () {
				return t.getRedirectResult()
			}).f(function () {}).then(function () {
				if (!t.Ba) return t.pd()
			}).f(function () {}).then(function () {
				if (!t.Ba) {
					t.Bc = !0;
					var e = t.ma;
					e.h.addListener(Dc("local"), e.j, t.pd)
				}
			})
		};
	(t = Mc.prototype).ng = function () {
		var t = this,
			e = this.i().options.authDomain;
		return Uc(this.ma, e).then(function (e) {
			if (!t.Ba) {
				var n;
				if (n = Yc(t) && e) {
					n = Yc(t).uid;
					var r = e.uid;
					n = void 0 !== n && null !== n && "" !== n && void 0 !== r && null !== r && "" !== r && n == r
				}
				if (n) return Yc(t).copy(e), Yc(t).getIdToken();
				(Yc(t) || e) && (qc(t, e), e && (oc(e), e.Wa = t.vb), t.v && t.v.subscribe(t), t.Ra())
			}
		})
	}, t.lb = function (t) {
		return Lc(this.ma, t)
	}, t.rd = function () {
		this.Ra(), this.lb(Yc(this))
	}, t.Cf = function () {
		this.signOut()
	}, t.Df = function () {
		this.signOut()
	};
	var Qc = function (t, e) {
		var n = null,
			r = null;
		return t.c(e.then(function (e) {
			return n = Go(e), r = $a(e), Hc(t, e)
		}).then(function () {
			return po({
				user: Yc(t),
				credential: n,
				additionalUserInfo: r,
				operationType: "signIn"
			})
		}))
	};
	(t = Mc.prototype).Hf = function (t) {
		var e = this;
		this.addAuthTokenListener(function () {
			t.next(Yc(e))
		})
	}, t.Jf = function (t) {
		var e = this;
		Jc(this, function () {
			t.next(Yc(e))
		})
	}, t.onIdTokenChanged = function (t, e, n) {
		var r = this;
		return this.Bc && firebase.Promise.resolve().then(function () {
			f(t) ? t(Yc(r)) : f(t.next) && t.next(Yc(r))
		}), this.Tf(t, e, n)
	}, t.onAuthStateChanged = function (t, e, n) {
		var r = this;
		return this.Bc && firebase.Promise.resolve().then(function () {
			r.jc = r.getUid(), f(t) ? t(Yc(r)) : f(t.next) && t.next(Yc(r))
		}), this.Vf(t, e, n)
	}, t.xf = function (t) {
		var e = this,
			n = this.xa.then(function () {
				return Yc(e) ? Yc(e).getIdToken(t).then(function (t) {
					return {
						accessToken: t
					}
				}) : null
			});
		return this.c(n)
	}, t.signInWithCustomToken = function (t) {
		var e = this;
		return this.xa.then(function () {
			return Qc(e, Ys(e.g, qs, {
				token: t
			}))
		}).then(function (t) {
			return t = t.user, fc(t, "isAnonymous", !1), e.lb(t)
		}).then(function () {
			return Yc(e)
		})
	}, t.signInWithEmailAndPassword = function (t, e) {
		var n = this;
		return this.xa.then(function () {
			return Qc(n, Ys(n.g, Ks, {
				email: t,
				password: e
			}))
		}).then(function (t) {
			return t.user
		})
	}, t.createUserWithEmailAndPassword = function (t, e) {
		var n = this;
		return this.xa.then(function () {
			return Qc(n, Ys(n.g, Ns, {
				email: t,
				password: e
			}))
		}).then(function (t) {
			return t.user
		})
	}, t.signInWithCredential = function (t) {
		return this.signInAndRetrieveDataWithCredential(t).then(function (t) {
			return t.user
		})
	}, t.signInAndRetrieveDataWithCredential = function (t) {
		var e = this;
		return this.xa.then(function () {
			return Qc(e, t.Kb(e.g))
		})
	}, t.signInAnonymously = function () {
		var t = this;
		return this.xa.then(function () {
			var e = Yc(t);
			return e && e.isAnonymous ? e : Qc(t, t.g.signInAnonymously()).then(function (e) {
				return e = e.user, fc(e, "isAnonymous", !0), t.lb(e)
			}).then(function () {
				return Yc(t)
			})
		})
	}, t.i = function () {
		return this.app
	};
	var Yc = function (t) {
		return t.currentUser
	};
	Mc.prototype.getUid = function () {
		return Yc(this) && Yc(this).uid || null
	};
	var $c = function (t) {
		return Yc(t) && Yc(t)._lat || null
	};
	(t = Mc.prototype).Ra = function () {
		if (this.Bc) {
			for (var t = 0; t < this.Ha.length; t++) this.Ha[t] && this.Ha[t]($c(this));
			if (this.jc !== this.getUid() && this.Bb.length)
				for (this.jc = this.getUid(), t = 0; t < this.Bb.length; t++) this.Bb[t] && this.Bb[t]($c(this))
		}
	}, t.df = function (t) {
		this.addAuthTokenListener(t), 0 < ++this.Ma && Yc(this) && tc(Yc(this))
	}, t.ag = function (t) {
		var e = this;
		Z(this.Ha, function (n) {
			n == t && e.Ma--
		}), 0 > this.Ma && (this.Ma = 0), 0 == this.Ma && Yc(this) && ec(Yc(this)), this.removeAuthTokenListener(t)
	}, t.addAuthTokenListener = function (t) {
		var e = this;
		this.Ha.push(t), this.c(this.xa.then(function () {
			e.Ba || it(e.Ha, t) && t($c(e))
		}))
	}, t.removeAuthTokenListener = function (t) {
		at(this.Ha, function (e) {
			return e == t
		})
	};
	var Jc = function (t, e) {
		t.Bb.push(e), t.c(t.xa.then(function () {
			!t.Ba && it(t.Bb, e) && t.jc !== t.getUid() && (t.jc = t.getUid(), e($c(t)))
		}))
	};
	(t = Mc.prototype).delete = function () {
		this.Ba = !0;
		for (var t = 0; t < this.K.length; t++) this.K[t].cancel("app-deleted");
		return this.K = [], this.ma && (t = this.ma).h.removeListener(Dc("local"), t.j, this.pd), this.v && this.v.unsubscribe(this), firebase.Promise.resolve()
	}, t.c = function (t) {
		var e = this;
		return this.K.push(t), Ln(t, function () {
			ot(e.K, t)
		}), t
	}, t.fetchProvidersForEmail = function (t) {
		return this.c(ds(this.g, t))
	}, t.verifyPasswordResetCode = function (t) {
		return this.checkActionCode(t).then(function (t) {
			return t.data.email
		})
	}, t.confirmPasswordReset = function (t, e) {
		return this.c(this.g.confirmPasswordReset(t, e).then(function () {}))
	}, t.checkActionCode = function (t) {
		return this.c(this.g.checkActionCode(t).then(function (t) {
			return new za(t)
		}))
	}, t.applyActionCode = function (t) {
		return this.c(this.g.applyActionCode(t).then(function () {}))
	}, t.sendPasswordResetEmail = function (t, e) {
		var n = this;
		return this.c(kn().then(function () {
			return void 0 === e || mt(e) ? {} : Ha(new Xa(e))
		}).then(function (e) {
			return n.g.sendPasswordResetEmail(t, e)
		}).then(function () {}))
	}, t.signInWithPhoneNumber = function (t, e) {
		return this.c(Ka(this, t, e, y(this.signInAndRetrieveDataWithCredential, this)))
	};
	var Zc = "First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),
		th = function (t, e) {
			return {
				name: t || "",
				R: "a valid string",
				optional: !!e,
				S: i
			}
		},
		eh = function () {
			return {
				name: "opt_forceRefresh",
				R: "a boolean",
				optional: !0,
				S: o
			}
		},
		nh = function (t, e) {
			return {
				name: t || "",
				R: "a valid object",
				optional: !!e,
				S: p
			}
		},
		rh = function (t, e) {
			return {
				name: t || "",
				R: "a function",
				optional: !!e,
				S: f
			}
		},
		ih = function (t, e) {
			return {
				name: t || "",
				R: "null",
				optional: !!e,
				S: c
			}
		},
		oh = function () {
			return {
				name: "",
				R: "an HTML element",
				optional: !1,
				S: function (t) {
					return !!(t && t instanceof Element)
				}
			}
		},
		sh = function () {
			return {
				name: "auth",
				R: "an instance of Firebase Auth",
				optional: !0,
				S: function (t) {
					return !!(t && t instanceof Mc)
				}
			}
		},
		ah = function () {
			return {
				name: "app",
				R: "an instance of Firebase App",
				optional: !0,
				S: function (t) {
					return !!(t && t instanceof firebase.app.App)
				}
			}
		},
		uh = function (t) {
			return {
				name: t ? t + "Credential" : "credential",
				R: t ? "a valid " + t + " credential" : "a valid credential",
				optional: !1,
				S: function (e) {
					if (!e) return !1;
					var n = !t || e.providerId === t;
					return !(!e.Kb || !n)
				}
			}
		},
		ch = function () {
			return {
				name: "authProvider",
				R: "a valid Auth provider",
				optional: !1,
				S: function (t) {
					return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
				}
			}
		},
		hh = function () {
			return {
				name: "applicationVerifier",
				R: "an implementation of firebase.auth.ApplicationVerifier",
				optional: !1,
				S: function (t) {
					return !!(t && i(t.type) && f(t.verify))
				}
			}
		},
		lh = function (t, e, n, r) {
			return {
				name: n || "",
				R: t.R + " or " + e.R,
				optional: !!r,
				S: function (n) {
					return t.S(n) || e.S(n)
				}
			}
		},
		fh = function (t, e) {
			for (var n in e) {
				var r = e[n].name;
				t[r] = dh(r, t[n], e[n].a)
			}
		},
		ph = function (t, e, n, r) {
			t[e] = dh(e, n, r)
		},
		dh = function (t, e, n) {
			if (!n) return e;
			var r = vh(t);
			t = function () {
				var t = Array.prototype.slice.call(arguments);
				t: {
					for (var i = Array.prototype.slice.call(t), o = 0, s = !1, a = 0; a < n.length; a++)
						if (n[a].optional) s = !0;
						else {
							if (s) throw new Oo("internal-error", "Argument validator encountered a required argument after an optional argument.");
							o++
						}
					if (s = n.length, i.length < o || s < i.length) i = "Expected " + (o == s ? 1 == o ? "1 argument" : o + " arguments" : o + "-" + s + " arguments") + " but got " + i.length + ".";
					else {
						for (o = 0; o < i.length; o++)
							if (s = n[o].optional && void 0 === i[o], !n[o].S(i[o]) && !s) {
								if (i = n[o], 0 > o || o >= Zc.length) throw new Oo("internal-error", "Argument validator received an unsupported number of arguments.");
								i = Zc[o] + " argument " + (i.name ? '"' + i.name + '" ' : "") + "must be " + i.R + ".";
								break t
							}
						i = null
					}
				}
				if (i) throw new Oo("argument-error", r + " failed: " + i);
				return e.apply(this, t)
			};
			for (var i in e) t[i] = e[i];
			for (i in e.prototype) t.prototype[i] = e.prototype[i];
			return t
		},
		vh = function (t) {
			return (t = t.split("."))[t.length - 1]
		};
	fh(Mc.prototype, {
			applyActionCode: {
				name: "applyActionCode",
				a: [th("code")]
			},
			checkActionCode: {
				name: "checkActionCode",
				a: [th("code")]
			},
			confirmPasswordReset: {
				name: "confirmPasswordReset",
				a: [th("code"), th("newPassword")]
			},
			createUserWithEmailAndPassword: {
				name: "createUserWithEmailAndPassword",
				a: [th("email"), th("password")]
			},
			fetchProvidersForEmail: {
				name: "fetchProvidersForEmail",
				a: [th("email")]
			},
			getRedirectResult: {
				name: "getRedirectResult",
				a: []
			},
			onAuthStateChanged: {
				name: "onAuthStateChanged",
				a: [lh(nh(), rh(), "nextOrObserver"), rh("opt_error", !0), rh("opt_completed", !0)]
			},
			onIdTokenChanged: {
				name: "onIdTokenChanged",
				a: [lh(nh(), rh(), "nextOrObserver"), rh("opt_error", !0), rh("opt_completed", !0)]
			},
			sendPasswordResetEmail: {
				name: "sendPasswordResetEmail",
				a: [th("email"), lh(nh("opt_actionCodeSettings", !0), ih(null, !0), "opt_actionCodeSettings", !0)]
			},
			Sd: {
				name: "setPersistence",
				a: [th("persistence")]
			},
			signInAndRetrieveDataWithCredential: {
				name: "signInAndRetrieveDataWithCredential",
				a: [uh()]
			},
			signInAnonymously: {
				name: "signInAnonymously",
				a: []
			},
			signInWithCredential: {
				name: "signInWithCredential",
				a: [uh()]
			},
			signInWithCustomToken: {
				name: "signInWithCustomToken",
				a: [th("token")]
			},
			signInWithEmailAndPassword: {
				name: "signInWithEmailAndPassword",
				a: [th("email"), th("password")]
			},
			signInWithPhoneNumber: {
				name: "signInWithPhoneNumber",
				a: [th("phoneNumber"), hh()]
			},
			signInWithPopup: {
				name: "signInWithPopup",
				a: [ch()]
			},
			signInWithRedirect: {
				name: "signInWithRedirect",
				a: [ch()]
			},
			signOut: {
				name: "signOut",
				a: []
			},
			toJSON: {
				name: "toJSON",
				a: [th(null, !0)]
			},
			verifyPasswordResetCode: {
				name: "verifyPasswordResetCode",
				a: [th("code")]
			}
		}), (Mc.Persistence = iu).LOCAL = "local", Mc.Persistence.SESSION = "session", Mc.Persistence.NONE = "none", fh(Yu.prototype, {
			delete: {
				name: "delete",
				a: []
			},
			getIdToken: {
				name: "getIdToken",
				a: [eh()]
			},
			getToken: {
				name: "getToken",
				a: [eh()]
			},
			linkAndRetrieveDataWithCredential: {
				name: "linkAndRetrieveDataWithCredential",
				a: [uh()]
			},
			linkWithCredential: {
				name: "linkWithCredential",
				a: [uh()]
			},
			linkWithPhoneNumber: {
				name: "linkWithPhoneNumber",
				a: [th("phoneNumber"), hh()]
			},
			linkWithPopup: {
				name: "linkWithPopup",
				a: [ch()]
			},
			linkWithRedirect: {
				name: "linkWithRedirect",
				a: [ch()]
			},
			reauthenticateAndRetrieveDataWithCredential: {
				name: "reauthenticateAndRetrieveDataWithCredential",
				a: [uh()]
			},
			reauthenticateWithCredential: {
				name: "reauthenticateWithCredential",
				a: [uh()]
			},
			reauthenticateWithPhoneNumber: {
				name: "reauthenticateWithPhoneNumber",
				a: [th("phoneNumber"), hh()]
			},
			reauthenticateWithPopup: {
				name: "reauthenticateWithPopup",
				a: [ch()]
			},
			reauthenticateWithRedirect: {
				name: "reauthenticateWithRedirect",
				a: [ch()]
			},
			reload: {
				name: "reload",
				a: []
			},
			sendEmailVerification: {
				name: "sendEmailVerification",
				a: [lh(nh("opt_actionCodeSettings", !0), ih(null, !0), "opt_actionCodeSettings", !0)]
			},
			toJSON: {
				name: "toJSON",
				a: [th(null, !0)]
			},
			unlink: {
				name: "unlink",
				a: [th("provider")]
			},
			updateEmail: {
				name: "updateEmail",
				a: [th("email")]
			},
			updatePassword: {
				name: "updatePassword",
				a: [th("password")]
			},
			updatePhoneNumber: {
				name: "updatePhoneNumber",
				a: [uh("phone")]
			},
			updateProfile: {
				name: "updateProfile",
				a: [nh("profile")]
			}
		}), fh(Sn.prototype, {
			f: {
				name: "catch"
			},
			then: {
				name: "then"
			}
		}), fh(qa.prototype, {
			confirm: {
				name: "confirm",
				a: [th("verificationCode")]
			}
		}), ph(Xo, "credential", function (t, e) {
			return new Bo(t, e)
		}, [th("email"), th("password")]), fh(jo.prototype, {
			addScope: {
				name: "addScope",
				a: [th("scope")]
			},
			setCustomParameters: {
				name: "setCustomParameters",
				a: [nh("customOAuthParameters")]
			}
		}), ph(jo, "credential", Lo, [lh(th(), nh(), "token")]), fh(xo.prototype, {
			addScope: {
				name: "addScope",
				a: [th("scope")]
			},
			setCustomParameters: {
				name: "setCustomParameters",
				a: [nh("customOAuthParameters")]
			}
		}), ph(xo, "credential", Uo, [lh(th(), nh(), "token")]), fh(Fo.prototype, {
			addScope: {
				name: "addScope",
				a: [th("scope")]
			},
			setCustomParameters: {
				name: "setCustomParameters",
				a: [nh("customOAuthParameters")]
			}
		}), ph(Fo, "credential", Mo, [lh(th(), lh(nh(), ih()), "idToken"), lh(th(), ih(), "accessToken", !0)]), fh(Vo.prototype, {
			setCustomParameters: {
				name: "setCustomParameters",
				a: [nh("customOAuthParameters")]
			}
		}), ph(Vo, "credential", Wo, [lh(th(), nh(), "token"), th("secret", !0)]), fh(Do.prototype, {
			addScope: {
				name: "addScope",
				a: [th("scope")]
			},
			credential: {
				name: "credential",
				a: [lh(th(), ih(), "idToken", !0), lh(th(), ih(), "accessToken", !0)]
			},
			setCustomParameters: {
				name: "setCustomParameters",
				a: [nh("customOAuthParameters")]
			}
		}), ph(Ko, "credential", zo, [th("verificationId"), th("verificationCode")]), fh(Ko.prototype, {
			verifyPhoneNumber: {
				name: "verifyPhoneNumber",
				a: [th("phoneNumber"), hh()]
			}
		}), fh(Oo.prototype, {
			toJSON: {
				name: "toJSON",
				a: [th(null, !0)]
			}
		}), fh(Yo.prototype, {
			toJSON: {
				name: "toJSON",
				a: [th(null, !0)]
			}
		}), fh(Ao.prototype, {
			toJSON: {
				name: "toJSON",
				a: [th(null, !0)]
			}
		}), fh(ya.prototype, {
			clear: {
				name: "clear",
				a: []
			},
			render: {
				name: "render",
				a: []
			},
			verify: {
				name: "verify",
				a: []
			}
		}),
		function () {
			if (void 0 === firebase || !firebase.INTERNAL || !firebase.INTERNAL.registerService) throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");
			var t = {
				Auth: Mc,
				Error: Oo
			};
			ph(t, "EmailAuthProvider", Xo, []), ph(t, "FacebookAuthProvider", jo, []), ph(t, "GithubAuthProvider", xo, []), ph(t, "GoogleAuthProvider", Fo, []), ph(t, "TwitterAuthProvider", Vo, []), ph(t, "OAuthProvider", Do, [th("providerId")]), ph(t, "PhoneAuthProvider", Ko, [sh()]), ph(t, "RecaptchaVerifier", ya, [lh(th(), oh(), "recaptchaContainer"), nh("recaptchaParameters", !0), ah()]), firebase.INTERNAL.registerService("auth", function (t, e) {
				return t = new Mc(t), e({
					INTERNAL: {
						getUid: y(t.getUid, t),
						getToken: y(t.xf, t),
						addAuthTokenListener: y(t.df, t),
						removeAuthTokenListener: y(t.ag, t)
					}
				}), t
			}, t, function (t, e) {
				if ("create" === t) try {
					e.auth()
				} catch (t) {}
			}), firebase.INTERNAL.extendNamespace({
				User: Yu
			})
		}()
}).call(this);
try {
	webpackJsonpFirebase([0], [function (t, e, n) {
		"use strict";
		n.d(e, "a", function () {
			return i
		}), n.d(e, "b", function () {
			return o
		});
		var r = n(7),
			i = function (t, e) {
				if (!t) throw o(e)
			},
			o = function (t) {
				return Error("Firebase Database (" + r.a.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + t)
			}
	}, function (t, e, n) {
		"use strict";
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var r = function (t) {
				for (var e = [], n = 0, r = 0; r < t.length; r++) {
					for (var i = t.charCodeAt(r); i > 255;) e[n++] = 255 & i, i >>= 8;
					e[n++] = i
				}
				return e
			},
			i = function (t) {
				if (t.length < 8192) return String.fromCharCode.apply(null, t);
				for (var e = "", n = 0; n < t.length; n += 8192) {
					var r = t.slice(n, n + 8192);
					e += String.fromCharCode.apply(null, r)
				}
				return e
			},
			o = {
				_: null,
				O: null,
				S: null,
				T: null,
				ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
				get ENCODED_VALS() {
					return this.ENCODED_VALS_BASE + "+/="
				},
				get ENCODED_VALS_WEBSAFE() {
					return this.ENCODED_VALS_BASE + "-_."
				},
				HAS_NATIVE_SUPPORT: "function" == typeof n(14).a.atob,
				encodeByteArray: function (t, e) {
					if (!Array.isArray(t)) throw Error("encodeByteArray takes an array as a parameter");
					this.N();
					for (var n = e ? this.S : this._, r = [], i = 0; i < t.length; i += 3) {
						var o = t[i],
							s = i + 1 < t.length,
							a = s ? t[i + 1] : 0,
							u = i + 2 < t.length,
							c = u ? t[i + 2] : 0,
							h = o >> 2,
							l = (3 & o) << 4 | a >> 4,
							f = (15 & a) << 2 | c >> 6,
							p = 63 & c;
						u || (p = 64, s || (f = 64)), r.push(n[h], n[l], n[f], n[p])
					}
					return r.join("")
				},
				encodeString: function (t, e) {
					return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(r(t), e)
				},
				decodeString: function (t, e) {
					return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : i(this.decodeStringToByteArray(t, e))
				},
				decodeStringToByteArray: function (t, e) {
					this.N();
					for (var n = e ? this.T : this.O, r = [], i = 0; i < t.length;) {
						var o = n[t.charAt(i++)],
							s = i < t.length ? n[t.charAt(i)] : 0,
							a = ++i < t.length ? n[t.charAt(i)] : 64,
							u = ++i < t.length ? n[t.charAt(i)] : 64;
						if (++i, null == o || null == s || null == a || null == u) throw Error();
						var c = o << 2 | s >> 4;
						if (r.push(c), 64 != a) {
							var h = s << 4 & 240 | a >> 2;
							if (r.push(h), 64 != u) {
								var l = a << 6 & 192 | u;
								r.push(l)
							}
						}
					}
					return r
				},
				N: function () {
					if (!this._) {
						this._ = {}, this.O = {}, this.S = {}, this.T = {};
						for (var t = 0; t < this.ENCODED_VALS.length; t++) this._[t] = this.ENCODED_VALS.charAt(t), this.O[this._[t]] = t, this.S[t] = this.ENCODED_VALS_WEBSAFE.charAt(t), this.T[this.S[t]] = t, t >= this.ENCODED_VALS_BASE.length && (this.O[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t, this.T[this.ENCODED_VALS.charAt(t)] = t)
					}
				}
			},
			s = function () {
				return function () {
					this.blockSize = -1
				}
			}(),
			a = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			u = function (t) {
				function e() {
					var e = t.call(this) || this;
					e.P = [], e.R = [], e.D = [], e.F = [], e.L = 0, e.M = 0, e.blockSize = 64, e.F[0] = 128;
					for (var n = 1; n < e.blockSize; ++n) e.F[n] = 0;
					return e.reset(), e
				}
				return a(e, t), e.prototype.reset = function () {
					this.P[0] = 1732584193, this.P[1] = 4023233417, this.P[2] = 2562383102, this.P[3] = 271733878, this.P[4] = 3285377520, this.L = 0, this.M = 0
				}, e.prototype.W = function (t, e) {
					e || (e = 0);
					var n = this.D;
					if ("string" == typeof t)
						for (h = 0; h < 16; h++) n[h] = t.charCodeAt(e) << 24 | t.charCodeAt(e + 1) << 16 | t.charCodeAt(e + 2) << 8 | t.charCodeAt(e + 3), e += 4;
					else
						for (h = 0; h < 16; h++) n[h] = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3], e += 4;
					for (h = 16; h < 80; h++) {
						l = n[h - 3] ^ n[h - 8] ^ n[h - 14] ^ n[h - 16];
						n[h] = 4294967295 & (l << 1 | l >>> 31)
					}
					for (var r, i, o = this.P[0], s = this.P[1], a = this.P[2], u = this.P[3], c = this.P[4], h = 0; h < 80; h++) {
						h < 40 ? h < 20 ? (r = u ^ s & (a ^ u), i = 1518500249) : (r = s ^ a ^ u, i = 1859775393) : h < 60 ? (r = s & a | u & (s | a), i = 2400959708) : (r = s ^ a ^ u, i = 3395469782);
						var l = (o << 5 | o >>> 27) + r + c + i + n[h] & 4294967295;
						c = u, u = a, a = 4294967295 & (s << 30 | s >>> 2), s = o, o = l
					}
					this.P[0] = this.P[0] + o & 4294967295, this.P[1] = this.P[1] + s & 4294967295, this.P[2] = this.P[2] + a & 4294967295, this.P[3] = this.P[3] + u & 4294967295, this.P[4] = this.P[4] + c & 4294967295
				}, e.prototype.update = function (t, e) {
					if (null != t) {
						void 0 === e && (e = t.length);
						for (var n = e - this.blockSize, r = 0, i = this.R, o = this.L; r < e;) {
							if (0 == o)
								for (; r <= n;) this.W(t, r), r += this.blockSize;
							if ("string" == typeof t) {
								for (; r < e;)
									if (i[o] = t.charCodeAt(r), ++o, ++r, o == this.blockSize) {
										this.W(i), o = 0;
										break
									}
							} else
								for (; r < e;)
									if (i[o] = t[r], ++o, ++r, o == this.blockSize) {
										this.W(i), o = 0;
										break
									}
						}
						this.L = o, this.M += e
					}
				}, e.prototype.digest = function () {
					var t = [],
						e = 8 * this.M;
					this.L < 56 ? this.update(this.F, 56 - this.L) : this.update(this.F, this.blockSize - (this.L - 56));
					for (r = this.blockSize - 1; r >= 56; r--) this.R[r] = 255 & e, e /= 256;
					this.W(this.R);
					for (var n = 0, r = 0; r < 5; r++)
						for (var i = 24; i >= 0; i -= 8) t[n] = this.P[r] >> i & 255, ++n;
					return t
				}, e
			}(s);
		n.d(e, "a", function () {
			return y
		}), n.d(e, "f", function () {
			return g
		}), n.d(e, "e", function () {
			return m
		}), n.d(e, "y", function () {
			return b
		}), n.d(e, "u", function () {
			return E
		}), n.d(e, "j", function () {
			return I
		}), n.d(e, "s", function () {
			return T
		}), n.d(e, "t", function () {
			return C
		}), n.d(e, "k", function () {
			return S
		}), n.d(e, "o", function () {
			return A
		}), n.d(e, "B", function () {
			return N
		}), n.d(e, "C", function () {
			return R
		}), n.d(e, "q", function () {
			return k
		}), n.d(e, "n", function () {
			return P
		}), n.d(e, "c", function () {
			return _
		}), n.d(e, "b", function () {
			return D
		}), n.d(e, "v", function () {
			return j
		}), n.d(e, "A", function () {
			return L
		}), n.d(e, "w", function () {
			return x
		}), n.d(e, "d", function () {
			return U
		}), n.d(e, "z", function () {
			return F
		}), n.d(e, "i", function () {
			return M
		}), n.d(e, "h", function () {
			return V
		}), n.d(e, "p", function () {
			return W
		}), n.d(e, "r", function () {
			return B
		}), n.d(e, "l", function () {
			return X
		}), n.d(e, "m", function () {
			return K
		}), n.d(e, "g", function () {
			return z
		}), n.d(e, "x", function () {
			return G
		});
		var c = n(0),
			h = n(2),
			l = n(11),
			f = n(3),
			p = n(8),
			d = n(6),
			v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			y = function () {
				var t = 1;
				return function () {
					return t++
				}
			}(),
			g = function (t) {
				var e = Object(l.b)(t);
				return o.encodeByteArray(e, !0)
			},
			m = function (t) {
				try {
					return o.decodeString(t, !0)
				} catch (t) {
					T("base64Decode failed: ", t)
				}
				return null
			},
			b = function (t) {
				var e = Object(l.b)(t),
					n = new u;
				n.update(e);
				var r = n.digest();
				return o.encodeByteArray(r)
			},
			w = function t() {
				for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
				for (var r = "", i = 0; i < e.length; i++) Array.isArray(e[i]) || e[i] && "object" === v(e[i]) && "number" == typeof e[i].length ? r += t.apply(null, e[i]) : "object" === v(e[i]) ? r += Object(f.b)(e[i]) : r += e[i], r += " ";
				return r
			},
			E = null,
			O = !0,
			I = function (t, e) {
				Object(c.a)(!e || !0 === t || !1 === t, "Can't turn on custom loggers persistently."), !0 === t ? ("undefined" != typeof console && ("function" == typeof console.log ? E = console.log.bind(console) : "object" === v(console.log) && (E = function (t) {
					console.log(t)
				})), e && p.b.set("logging_enabled", !0)) : "function" == typeof t ? E = t : (E = null, p.b.remove("logging_enabled"))
			},
			T = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				if (!0 === O && (O = !1, null === E && !0 === p.b.get("logging_enabled") && I(!0)), E) {
					var n = w.apply(null, t);
					E(n)
				}
			},
			C = function (t) {
				return function () {
					for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
					T.apply(void 0, [t].concat(e))
				}
			},
			S = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				if ("undefined" != typeof console) {
					var n = "FIREBASE INTERNAL ERROR: " + w.apply(void 0, t);
					void 0 !== console.error ? console.error(n) : console.log(n)
				}
			},
			A = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				var n = w.apply(void 0, t);
				throw Error("FIREBASE FATAL ERROR: " + n)
			},
			N = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				if ("undefined" != typeof console) {
					var n = "FIREBASE WARNING: " + w.apply(void 0, t);
					void 0 !== console.warn ? console.warn(n) : console.log(n)
				}
			},
			R = function () {
				"undefined" != typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && N("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")
			},
			k = function (t) {
				return "number" == typeof t && (t != t || t == Number.POSITIVE_INFINITY || t == Number.NEGATIVE_INFINITY)
			},
			P = function (t) {
				if (Object(d.b)() || "complete" === document.readyState) t();
				else {
					var e = !1,
						n = function n() {
							document.body ? e || (e = !0, t()) : setTimeout(n, Math.floor(10))
						};
					document.addEventListener ? (document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function () {
						"complete" === document.readyState && n()
					}), window.attachEvent("onload", n))
				}
			},
			_ = "[MIN_NAME]",
			D = "[MAX_NAME]",
			j = function (t, e) {
				if (t === e) return 0;
				if (t === _ || e === D) return -1;
				if (e === _ || t === D) return 1;
				var n = q(t),
					r = q(e);
				return null !== n ? null !== r ? n - r == 0 ? t.length - e.length : n - r : -1 : null !== r ? 1 : t < e ? -1 : 1
			},
			L = function (t, e) {
				return t === e ? 0 : t < e ? -1 : 1
			},
			x = function (t, e) {
				if (e && t in e) return e[t];
				throw Error("Missing required key (" + t + ") in object: " + Object(f.b)(e))
			},
			U = function t(e) {
				if ("object" !== (void 0 === e ? "undefined" : v(e)) || null === e) return Object(f.b)(e);
				var n = [];
				for (var r in e) n.push(r);
				n.sort();
				for (var i = "{", o = 0; o < n.length; o++) 0 !== o && (i += ","), i += Object(f.b)(n[o]), i += ":", i += t(e[n[o]]);
				return i += "}"
			},
			F = function (t, e) {
				var n = t.length;
				if (n <= e) return [t];
				for (var r = [], i = 0; i < n; i += e) i + e > n ? r.push(t.substring(i, n)) : r.push(t.substring(i, i + e));
				return r
			},
			M = function (t, e) {
				if (Array.isArray(t))
					for (var n = 0; n < t.length; ++n) e(n, t[n]);
				else Object(h.f)(t, function (t, n) {
					return e(n, t)
				})
			},
			V = function (t) {
				Object(c.a)(!k(t), "Invalid JSON number");
				var e, n, r, i, o, s, a;
				for (0 === t ? (n = 0, r = 0, e = 1 / t == -1 / 0 ? 1 : 0) : (e = t < 0, t = Math.abs(t), t >= Math.pow(2, -1022) ? (i = Math.min(Math.floor(Math.log(t) / Math.LN2), 1023), n = i + 1023, r = Math.round(t * Math.pow(2, 52 - i) - Math.pow(2, 52))) : (n = 0, r = Math.round(t / Math.pow(2, -1074)))), s = [], o = 52; o; o -= 1) s.push(r % 2 ? 1 : 0), r = Math.floor(r / 2);
				for (o = 11; o; o -= 1) s.push(n % 2 ? 1 : 0), n = Math.floor(n / 2);
				s.push(e ? 1 : 0), s.reverse(), a = s.join("");
				var u = "";
				for (o = 0; o < 64; o += 8) {
					var h = parseInt(a.substr(o, 8), 2).toString(16);
					1 === h.length && (h = "0" + h), u += h
				}
				return u.toLowerCase()
			},
			W = function () {
				return !("object" !== ("undefined" == typeof window ? "undefined" : v(window)) || !window.chrome || !window.chrome.extension || /^chrome/.test(window.location.href))
			},
			B = function () {
				return "object" === ("undefined" == typeof Windows ? "undefined" : v(Windows)) && "object" === v(Windows.UI)
			},
			X = function (t, e) {
				var n = "Unknown Error";
				"too_big" === t ? n = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == t ? n = "Client doesn't have permission to access the desired data." : "unavailable" == t && (n = "The service is unavailable");
				var r = Error(t + " at " + e.path + ": " + n);
				return r.code = t.toUpperCase(), r
			},
			H = RegExp("^-?\\d{1,10}$"),
			q = function (t) {
				if (H.test(t)) {
					var e = +t;
					if (e >= -2147483648 && e <= 2147483647) return e
				}
				return null
			},
			K = function (t) {
				try {
					t()
				} catch (t) {
					setTimeout(function () {
						var e = t.stack || "";
						throw N("Exception was thrown by user callback.", e), t
					}, Math.floor(0))
				}
			},
			z = function () {
				return ("object" === ("undefined" == typeof window ? "undefined" : v(window)) && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0
			},
			G = function (t, e) {
				var n = setTimeout(t, e);
				return "object" === (void 0 === n ? "undefined" : v(n)) && n.unref && n.unref(), n
			}
	}, function (t, e, n) {
		"use strict";
		n.d(e, "b", function () {
			return r
		}), n.d(e, "l", function () {
			return i
		}), n.d(e, "f", function () {
			return o
		}), n.d(e, "a", function () {
			return a
		}), n.d(e, "j", function () {
			return u
		}), n.d(e, "h", function () {
			return c
		}), n.d(e, "k", function () {
			return h
		}), n.d(e, "d", function () {
			return l
		}), n.d(e, "e", function () {
			return f
		}), n.d(e, "g", function () {
			return p
		}), n.d(e, "i", function () {
			return d
		}), n.d(e, "c", function () {
			return v
		});
		var r = ("function" == typeof Symbol && Symbol.iterator, function (t, e) {
				return Object.prototype.hasOwnProperty.call(t, e)
			}),
			i = function (t, e) {
				if (Object.prototype.hasOwnProperty.call(t, e)) return t[e]
			},
			o = function (t, e) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n])
			},
			s = function (t, e) {
				return o(e, function (e, n) {
					t[e] = n
				}), t
			},
			a = function (t) {
				return s({}, t)
			},
			u = function (t) {
				for (var e in t) return !1;
				return !0
			},
			c = function (t) {
				var e = 0;
				for (var n in t) e++;
				return e
			},
			h = function (t, e, n) {
				var r = {};
				for (var i in t) r[i] = e.call(n, t[i], i, t);
				return r
			},
			l = function (t, e, n) {
				for (var r in t)
					if (e.call(n, t[r], r, t)) return r
			},
			f = function (t, e, n) {
				var r = l(t, e, n);
				return r && t[r]
			},
			p = function (t) {
				for (var e in t) return e
			},
			d = function (t) {
				var e = [],
					n = 0;
				for (var r in t) e[n++] = t[r];
				return e
			},
			v = function (t, e) {
				for (var n in t)
					if (Object.prototype.hasOwnProperty.call(t, n) && !e(n, t[n])) return !1;
				return !0
			}
	}, function (t, e, n) {
		"use strict";
		n.d(e, "a", function () {
			return r
		}), n.d(e, "b", function () {
			return i
		});
		var r = function (t) {
				return JSON.parse(t)
			},
			i = function (t) {
				return JSON.stringify(t)
			}
	}, , , function (t, e, n) {
		"use strict";
		n.d(e, "a", function () {
			return s
		}), n.d(e, "c", function () {
			return a
		}), n.d(e, "b", function () {
			return u
		});
		var r = n(7),
			i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			o = function () {
				return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
			},
			s = function () {
				return "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(o())
			},
			a = function () {
				return "object" === ("undefined" == typeof navigator ? "undefined" : i(navigator)) && "ReactNative" === navigator.product
			},
			u = function () {
				return !0 === r.a.NODE_CLIENT || !0 === r.a.NODE_ADMIN
			}
	}, function (t, e, n) {
		"use strict";
		n.d(e, "a", function () {
			return r
		});
		var r = {
			NODE_CLIENT: !1,
			NODE_ADMIN: !1,
			SDK_VERSION: "4.2.0"
		}
	}, function (t, e, n) {
		"use strict";
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var r = n(3),
			i = function () {
				function t(t) {
					this.Q = t, this.U = "firebase:"
				}
				return t.prototype.set = function (t, e) {
					null == e ? this.Q.removeItem(this.V(t)) : this.Q.setItem(this.V(t), Object(r.b)(e))
				}, t.prototype.get = function (t) {
					var e = this.Q.getItem(this.V(t));
					return null == e ? null : Object(r.a)(e)
				}, t.prototype.remove = function (t) {
					this.Q.removeItem(this.V(t))
				}, t.prototype.V = function (t) {
					return this.U + t
				}, t.prototype.toString = function () {
					return "" + this.Q
				}, t
			}(),
			o = n(2),
			s = function () {
				function t() {
					this.H = {}, this.isInMemoryStorage = !0
				}
				return t.prototype.set = function (t, e) {
					null == e ? delete this.H[t] : this.H[t] = e
				}, t.prototype.get = function (t) {
					return Object(o.b)(this.H, t) ? this.H[t] : null
				}, t.prototype.remove = function (t) {
					delete this.H[t]
				}, t
			}();
		n.d(e, "a", function () {
			return u
		}), n.d(e, "b", function () {
			return c
		});
		var a = function (t) {
				try {
					if ("undefined" != typeof window && void 0 !== window[t]) {
						var e = window[t];
						return e.setItem("firebase:sentinel", "cache"), e.removeItem("firebase:sentinel"), new i(e)
					}
				} catch (t) {}
				return new s
			},
			u = a("localStorage"),
			c = a("sessionStorage")
	}, function (t, e, n) {
		"use strict";
		n.d(e, "e", function () {
			return r
		}), n.d(e, "h", function () {
			return i
		}), n.d(e, "g", function () {
			return o
		}), n.d(e, "f", function () {
			return s
		}), n.d(e, "b", function () {
			return a
		}), n.d(e, "a", function () {
			return u
		}), n.d(e, "c", function () {
			return c
		}), n.d(e, "i", function () {
			return h
		}), n.d(e, "d", function () {
			return l
		});
		var r = "5",
			i = "v",
			o = "s",
			s = "r",
			a = "f",
			u = "firebaseio.com",
			c = "ls",
			h = "websocket",
			l = "long_polling"
	}, , function (t, e, n) {
		"use strict";
		n.d(e, "b", function () {
			return i
		}), n.d(e, "a", function () {
			return o
		});
		var r = n(0),
			i = function (t) {
				for (var e = [], n = 0, i = 0; i < t.length; i++) {
					var o = t.charCodeAt(i);
					if (o >= 55296 && o <= 56319) {
						var s = o - 55296;
						i++, Object(r.a)(i < t.length, "Surrogate pair missing trail surrogate."), o = 65536 + (s << 10) + (t.charCodeAt(i) - 56320)
					}
					o < 128 ? e[n++] = o : o < 2048 ? (e[n++] = o >> 6 | 192, e[n++] = 63 & o | 128) : o < 65536 ? (e[n++] = o >> 12 | 224, e[n++] = o >> 6 & 63 | 128, e[n++] = 63 & o | 128) : (e[n++] = o >> 18 | 240, e[n++] = o >> 12 & 63 | 128, e[n++] = o >> 6 & 63 | 128, e[n++] = 63 & o | 128)
				}
				return e
			},
			o = function (t) {
				for (var e = 0, n = 0; n < t.length; n++) {
					var r = t.charCodeAt(n);
					r < 128 ? e++ : r < 2048 ? e += 2 : r >= 55296 && r <= 56319 ? (e += 4, n++) : e += 3
				}
				return e
			}
	}, function (t, e, n) {
		"use strict";
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var r = n(17),
			i = n(2),
			o = function () {
				function t() {
					this.K = {}
				}
				return t.prototype.incrementCounter = function (t, e) {
					void 0 === e && (e = 1), Object(i.b)(this.K, t) || (this.K[t] = 0), this.K[t] += e
				}, t.prototype.get = function () {
					return Object(r.a)(this.K)
				}, t
			}();
		n.d(e, "a", function () {
			return s
		});
		var s = function () {
			function t() {}
			return t.getCollection = function (t) {
				var e = "" + t;
				return this.Y[e] || (this.Y[e] = new o), this.Y[e]
			}, t.getOrCreateReporter = function (t, e) {
				var n = "" + t;
				return this.G[n] || (this.G[n] = e()), this.G[n]
			}, t.Y = {}, t.G = {}, t
		}()
	}, , , , , , function (t, e, n) {
		"use strict";
		(function (t) {
			n.d(e, "a", function () {
				return p
			});
			var r = n(5),
				i = n(0),
				o = n(1),
				s = n(12),
				a = n(9),
				u = n(7),
				c = n(8),
				h = n(3),
				l = n(6),
				f = null;
			"undefined" != typeof MozWebSocket ? f = MozWebSocket : "undefined" != typeof WebSocket && (f = WebSocket);
			var p = function () {
				function e(t, n, r, i) {
					this.connId = t, this.keepaliveTimer = null, this.frames = null, this.totalFrames = 0, this.bytesSent = 0, this.bytesReceived = 0, this.X = Object(o.t)(this.connId), this.$ = s.a.getCollection(n), this.connURL = e.J(n, r, i)
				}
				return e.J = function (t, e, n) {
					var r = {};
					return r[a.h] = a.e, !Object(l.b)() && "undefined" != typeof location && location.href && -1 !== location.href.indexOf(a.a) && (r[a.f] = a.b), e && (r[a.g] = e), n && (r[a.c] = n), t.connectionURL(a.i, r)
				}, e.prototype.open = function (e, n) {
					var i = this;
					this.onDisconnect = n, this.onMessage = e, this.X("Websocket connecting to " + this.connURL), this.Z = !1, c.a.set("previous_websocket_failure", !0);
					try {
						if (Object(l.b)()) {
							var o = u.a.NODE_ADMIN ? "AdminNode" : "Node",
								s = {
									headers: {
										"User-Agent": "Firebase/" + a.e + "/" + r.default.SDK_VERSION + "/" + t.platform + "/" + o
									}
								},
								h = t.env,
								p = 0 == this.connURL.indexOf("wss://") ? h.HTTPS_PROXY || h.https_proxy : h.HTTP_PROXY || h.http_proxy;
							p && (s.proxy = {
								origin: p
							}), this.mySock = new f(this.connURL, [], s)
						} else this.mySock = new f(this.connURL)
					} catch (t) {
						this.X("Error instantiating WebSocket.");
						var d = t.message || t.data;
						return d && this.X(d), void this.tt()
					}
					this.mySock.onopen = function () {
						i.X("Websocket connected."), i.Z = !0
					}, this.mySock.onclose = function () {
						i.X("Websocket connection was disconnected."), i.mySock = null, i.tt()
					}, this.mySock.onmessage = function (t) {
						i.handleIncomingFrame(t)
					}, this.mySock.onerror = function (t) {
						i.X("WebSocket error.  Closing connection.");
						var e = t.message || t.data;
						e && i.X(e), i.tt()
					}
				}, e.prototype.start = function () {}, e.forceDisallow = function () {
					e.et = !0
				}, e.isAvailable = function () {
					var t = !1;
					if ("undefined" != typeof navigator && navigator.userAgent) {
						var n = /Android ([0-9]{0,}\.[0-9]{0,})/,
							r = navigator.userAgent.match(n);
						r && r.length > 1 && parseFloat(r[1]) < 4.4 && (t = !0)
					}
					return !t && null !== f && !e.et
				}, e.previouslyFailed = function () {
					return c.a.isInMemoryStorage || !0 === c.a.get("previous_websocket_failure")
				}, e.prototype.markConnectionHealthy = function () {
					c.a.remove("previous_websocket_failure")
				}, e.prototype.nt = function (t) {
					if (this.frames.push(t), this.frames.length == this.totalFrames) {
						var e = this.frames.join("");
						this.frames = null;
						var n = Object(h.a)(e);
						this.onMessage(n)
					}
				}, e.prototype.rt = function (t) {
					this.totalFrames = t, this.frames = []
				}, e.prototype.it = function (t) {
					if (Object(i.a)(null === this.frames, "We already have a frame buffer"), t.length <= 6) {
						var e = +t;
						if (!isNaN(e)) return this.rt(e), null
					}
					return this.rt(1), t
				}, e.prototype.handleIncomingFrame = function (t) {
					if (null !== this.mySock) {
						var e = t.data;
						if (this.bytesReceived += e.length, this.$.incrementCounter("bytes_received", e.length), this.resetKeepAlive(), null !== this.frames) this.nt(e);
						else {
							var n = this.it(e);
							null !== n && this.nt(n)
						}
					}
				}, e.prototype.send = function (t) {
					this.resetKeepAlive();
					var e = Object(h.b)(t);
					this.bytesSent += e.length, this.$.incrementCounter("bytes_sent", e.length);
					var n = Object(o.z)(e, 16384);
					n.length > 1 && this.ot(n.length + "");
					for (var r = 0; r < n.length; r++) this.ot(n[r])
				}, e.prototype.st = function () {
					this.ut = !0, this.keepaliveTimer && (clearInterval(this.keepaliveTimer), this.keepaliveTimer = null), this.mySock && (this.mySock.close(), this.mySock = null)
				}, e.prototype.tt = function () {
					this.ut || (this.X("WebSocket is closing itself"), this.st(), this.onDisconnect && (this.onDisconnect(this.Z), this.onDisconnect = null))
				}, e.prototype.close = function () {
					this.ut || (this.X("WebSocket is being closed"), this.st())
				}, e.prototype.resetKeepAlive = function () {
					var t = this;
					clearInterval(this.keepaliveTimer), this.keepaliveTimer = setInterval(function () {
						t.mySock && t.ot("0"), t.resetKeepAlive()
					}, Math.floor(45e3))
				}, e.prototype.ot = function (t) {
					try {
						this.mySock.send(t)
					} catch (t) {
						this.X("Exception thrown from WebSocket.send():", t.message || t.data, "Closing connection."), setTimeout(this.tt.bind(this), 0)
					}
				}, e.responsesRequiredToBeHealthy = 2, e.healthyTimeout = 3e4, e
			}()
		}).call(e, n(16))
	}, , , , , , , function (t, e, n) {
		"use strict";

		function r(t) {
			for (var e = "", n = t.split("/"), r = 0; r < n.length; r++)
				if (n[r].length > 0) {
					var i = n[r];
					try {
						i = decodeURIComponent(i.replace(/\+/g, " "))
					} catch (t) {}
					e += "/" + i
				}
			return e
		}

		function i(t, e, n) {
			var r = "";
			switch (e) {
				case 1:
					r = n ? "first" : "First";
					break;
				case 2:
					r = n ? "second" : "Second";
					break;
				case 3:
					r = n ? "third" : "Third";
					break;
				case 4:
					r = n ? "fourth" : "Fourth";
					break;
				default:
					throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?")
			}
			var i = t + " failed: ";
			return i += r + " argument "
		}

		function o(t, e) {
			return Object(Ft.v)(t.name, e.name)
		}

		function s(t, e) {
			return Object(Ft.v)(t, e)
		}

		function a(t, e) {
			if (void 0 === e && (e = null), null === t) return Bt.EMPTY_NODE;
			if ("object" === (void 0 === t ? "undefined" : Kt(t)) && ".priority" in t && (e = t[".priority"]), Object(qt.a)(null === e || "string" == typeof e || "number" == typeof e || "object" === (void 0 === e ? "undefined" : Kt(e)) && ".sv" in e, "Invalid priority type found: " + (void 0 === e ? "undefined" : Kt(e))), "object" === (void 0 === t ? "undefined" : Kt(t)) && ".value" in t && null !== t[".value"] && (t = t[".value"]), "object" !== (void 0 === t ? "undefined" : Kt(t)) || ".sv" in t) return new It(t, a(e));
			if (t instanceof Array || !zt) {
				var n = Bt.EMPTY_NODE,
					r = t;
				return Object(Ht.f)(r, function (t, e) {
					if (Object(Ht.b)(r, t) && "." !== t.substring(0, 1)) {
						var i = a(e);
						!i.isLeafNode() && i.isEmpty() || (n = n.updateImmediateChild(t, i))
					}
				}), n.updatePriority(a(e))
			}
			var i = [],
				u = !1,
				c = t;
			if (Object(Ht.f)(c, function (t, e) {
					if ("string" != typeof t || "." !== t.substring(0, 1)) {
						var n = a(c[t]);
						n.isEmpty() || (u = u || !n.getPriority().isEmpty(), i.push(new st(t, n)))
					}
				}), 0 == i.length) return Bt.EMPTY_NODE;
			var h = Dt(i, o, function (t) {
				return t.name
			}, s);
			if (u) {
				var l = Dt(i, St.getCompare());
				return new Bt(h, a(e), new Ut({
					".priority": l
				}, {
					".priority": St
				}))
			}
			return new Bt(h, a(e), Ut.Default)
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var u, c, h, l, f, p, d, v = n(1),
			y = n(11),
			g = function () {
				function t(t, e) {
					if (void 0 === e) {
						this.ct = t.split("/");
						for (var n = 0, r = 0; r < this.ct.length; r++) this.ct[r].length > 0 && (this.ct[n] = this.ct[r], n++);
						this.ct.length = n, this.ht = 0
					} else this.ct = t, this.ht = e
				}
				return Object.defineProperty(t, "Empty", {
					get: function () {
						return new t("")
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getFront = function () {
					return this.ht >= this.ct.length ? null : this.ct[this.ht]
				}, t.prototype.getLength = function () {
					return this.ct.length - this.ht
				}, t.prototype.popFront = function () {
					var e = this.ht;
					return e < this.ct.length && e++, new t(this.ct, e)
				}, t.prototype.getBack = function () {
					return this.ht < this.ct.length ? this.ct[this.ct.length - 1] : null
				}, t.prototype.toString = function () {
					for (var t = "", e = this.ht; e < this.ct.length; e++) "" !== this.ct[e] && (t += "/" + this.ct[e]);
					return t || "/"
				}, t.prototype.toUrlEncodedString = function () {
					for (var t = "", e = this.ht; e < this.ct.length; e++) "" !== this.ct[e] && (t += "/" + encodeURIComponent(this.ct[e] + ""));
					return t || "/"
				}, t.prototype.slice = function (t) {
					return void 0 === t && (t = 0), this.ct.slice(this.ht + t)
				}, t.prototype.parent = function () {
					if (this.ht >= this.ct.length) return null;
					for (var e = [], n = this.ht; n < this.ct.length - 1; n++) e.push(this.ct[n]);
					return new t(e, 0)
				}, t.prototype.child = function (e) {
					for (var n = [], r = this.ht; r < this.ct.length; r++) n.push(this.ct[r]);
					if (e instanceof t)
						for (r = e.ht; r < e.ct.length; r++) n.push(e.ct[r]);
					else
						for (var i = e.split("/"), r = 0; r < i.length; r++) i[r].length > 0 && n.push(i[r]);
					return new t(n, 0)
				}, t.prototype.isEmpty = function () {
					return this.ht >= this.ct.length
				}, t.relativePath = function (e, n) {
					var r = e.getFront(),
						i = n.getFront();
					if (null === r) return n;
					if (r === i) return t.relativePath(e.popFront(), n.popFront());
					throw Error("INTERNAL ERROR: innerPath (" + n + ") is not within outerPath (" + e + ")")
				}, t.comparePaths = function (t, e) {
					for (var n = t.slice(), r = e.slice(), i = 0; i < n.length && i < r.length; i++) {
						var o = Object(v.v)(n[i], r[i]);
						if (0 !== o) return o
					}
					return n.length === r.length ? 0 : n.length < r.length ? -1 : 1
				}, t.prototype.equals = function (t) {
					if (this.getLength() !== t.getLength()) return !1;
					for (var e = this.ht, n = t.ht; e <= this.ct.length; e++, n++)
						if (this.ct[e] !== t.ct[n]) return !1;
					return !0
				}, t.prototype.contains = function (t) {
					var e = this.ht,
						n = t.ht;
					if (this.getLength() > t.getLength()) return !1;
					for (; e < this.ct.length;) {
						if (this.ct[e] !== t.ct[n]) return !1;
						++e, ++n
					}
					return !0
				}, t
			}(),
			m = function () {
				function t(t, e) {
					this.lt = e, this.pt = t.slice(), this.dt = Math.max(1, this.pt.length);
					for (var n = 0; n < this.pt.length; n++) this.dt += Object(y.a)(this.pt[n]);
					this.ft()
				}
				return Object.defineProperty(t, "MAX_PATH_DEPTH", {
					get: function () {
						return 32
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t, "MAX_PATH_LENGTH_BYTES", {
					get: function () {
						return 768
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.push = function (t) {
					this.pt.length > 0 && (this.dt += 1), this.pt.push(t), this.dt += Object(y.a)(t), this.ft()
				}, t.prototype.pop = function () {
					var t = this.pt.pop();
					this.dt -= Object(y.a)(t), this.pt.length > 0 && (this.dt -= 1)
				}, t.prototype.ft = function () {
					if (this.dt > t.MAX_PATH_LENGTH_BYTES) throw Error(this.lt + "has a key path longer than " + t.MAX_PATH_LENGTH_BYTES + " bytes (" + this.dt + ").");
					if (this.pt.length > t.MAX_PATH_DEPTH) throw Error(this.lt + "path specified exceeds the maximum depth that can be written (" + t.MAX_PATH_DEPTH + ") or object contains a cycle " + this.toErrorString())
				}, t.prototype.toErrorString = function () {
					return 0 == this.pt.length ? "" : "in property '" + this.pt.join(".") + "'"
				}, t
			}(),
			b = n(0),
			w = n(2),
			E = n(8),
			O = n(9),
			I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			T = function () {
				function t(t, e, n, r, i) {
					void 0 === i && (i = ""), this.secure = e, this.namespace = n, this.webSocketOnly = r, this.persistenceKey = i, this.host = t.toLowerCase(), this.domain = this.host.substr(this.host.indexOf(".") + 1), this.internalHost = E.a.get("host:" + t) || this.host
				}
				return t.prototype.needsQueryParam = function () {
					return this.host !== this.internalHost
				}, t.prototype.isCacheableHost = function () {
					return "s-" === this.internalHost.substr(0, 2)
				}, t.prototype.isDemoHost = function () {
					return "firebaseio-demo.com" === this.domain
				}, t.prototype.isCustomHost = function () {
					return "firebaseio.com" !== this.domain && "firebaseio-demo.com" !== this.domain
				}, t.prototype.updateHost = function (t) {
					t !== this.internalHost && (this.internalHost = t, this.isCacheableHost() && E.a.set("host:" + this.host, this.internalHost))
				}, t.prototype.connectionURL = function (t, e) {
					Object(b.a)("string" == typeof t, "typeof type must == string"), Object(b.a)("object" === (void 0 === e ? "undefined" : I(e)), "typeof params must == object");
					var n;
					if (t === O.i) n = (this.secure ? "wss://" : "ws://") + this.internalHost + "/.ws?";
					else {
						if (t !== O.d) throw Error("Unknown connection type: " + t);
						n = (this.secure ? "https://" : "http://") + this.internalHost + "/.lp?"
					}
					this.needsQueryParam() && (e.ns = this.namespace);
					var r = [];
					return Object(w.f)(e, function (t, e) {
						r.push(t + "=" + e)
					}), n + r.join("&")
				}, t.prototype.toString = function () {
					var t = this.toURLString();
					return this.persistenceKey && (t += "<" + this.persistenceKey + ">"), t
				}, t.prototype.toURLString = function () {
					return (this.secure ? "https://" : "http://") + this.host
				}, t
			}(),
			C = n(1),
			S = function (t) {
				var e = A(t),
					n = e.subdomain;
				"firebase" === e.domain && Object(C.o)(e.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"), n && "undefined" != n || Object(C.o)("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"), e.secure || Object(C.C)();
				var r = "ws" === e.scheme || "wss" === e.scheme;
				return {
					repoInfo: new T(e.host, e.secure, n, r),
					path: new g(e.pathString)
				}
			},
			A = function (t) {
				var e = "",
					n = "",
					i = "",
					o = "",
					s = !0,
					a = "https",
					u = 443;
				if ("string" == typeof t) {
					var c = t.indexOf("//");
					c >= 0 && (a = t.substring(0, c - 1), t = t.substring(c + 2));
					var h = t.indexOf("/"); - 1 === h && (h = t.length), e = t.substring(0, h), o = r(t.substring(h));
					var l = e.split(".");
					3 === l.length ? (n = l[1], i = l[0].toLowerCase()) : 2 === l.length && (n = l[0]), (c = e.indexOf(":")) >= 0 && (s = "https" === a || "wss" === a, u = parseInt(e.substring(c + 1), 10))
				}
				return {
					host: e,
					port: u,
					domain: n,
					subdomain: i,
					secure: s,
					scheme: a,
					pathString: o
				}
			},
			N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			R = function (t, e, n, r) {
				var i;
				if (r < e ? i = "at least " + e : r > n && (i = 0 === n ? "none" : "no more than " + n), i) {
					var o = t + " failed: Was called with " + r + (1 === r ? " argument." : " arguments.") + " Expects " + i + ".";
					throw Error(o)
				}
			},
			k = function (t, e, n, r) {
				if ((!r || n) && "function" != typeof n) throw Error(i(t, e, r) + "must be a valid function.")
			},
			P = function (t, e, n, r) {
				if ((!r || n) && ("object" !== (void 0 === n ? "undefined" : N(n)) || null === n)) throw Error(i(t, e, r) + "must be a valid context object.")
			},
			_ = n(2),
			D = n(1),
			j = n(11),
			L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			x = /[\[\].#$\/\u0000-\u001F\u007F]/,
			U = /[\[\].#$\u0000-\u001F\u007F]/,
			F = function (t) {
				return "string" == typeof t && 0 !== t.length && !x.test(t)
			},
			M = function (t) {
				return "string" == typeof t && 0 !== t.length && !U.test(t)
			},
			V = function (t) {
				return t && (t = t.replace(/^\/*\.info(\/|$)/, "/")), M(t)
			},
			W = function (t) {
				return null === t || "string" == typeof t || "number" == typeof t && !Object(D.q)(t) || t && "object" === (void 0 === t ? "undefined" : L(t)) && Object(_.b)(t, ".sv")
			},
			B = function (t, e, n, r, o) {
				o && void 0 === n || X(i(t, e, o), n, r)
			},
			X = function t(e, n, r) {
				var i = r instanceof g ? new m(r, e) : r;
				if (void 0 === n) throw Error(e + "contains undefined " + i.toErrorString());
				if ("function" == typeof n) throw Error(e + "contains a function " + i.toErrorString() + " with contents = " + n);
				if (Object(D.q)(n)) throw Error(e + "contains " + n + " " + i.toErrorString());
				if ("string" == typeof n && n.length > 10485760 / 3 && Object(j.a)(n) > 10485760) throw Error(e + "contains a string greater than 10485760 utf8 bytes " + i.toErrorString() + " ('" + n.substring(0, 50) + "...')");
				if (n && "object" === (void 0 === n ? "undefined" : L(n))) {
					var o = !1,
						s = !1;
					if (Object(_.f)(n, function (n, r) {
							if (".value" === n) o = !0;
							else if (".priority" !== n && ".sv" !== n && (s = !0, !F(n))) throw Error(e + " contains an invalid key (" + n + ") " + i.toErrorString() + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
							i.push(n), t(e, r, i), i.pop()
						}), o && s) throw Error(e + ' contains ".value" child ' + i.toErrorString() + " in addition to actual children.")
				}
			},
			H = function (t, e) {
				var n, r;
				for (n = 0; n < e.length; n++)
					for (var i = (r = e[n]).slice(), o = 0; o < i.length; o++)
						if (".priority" === i[o] && o === i.length - 1);
						else if (!F(i[o])) throw Error(t + "contains an invalid key (" + i[o] + ") in path " + r + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
				e.sort(g.comparePaths);
				var s = null;
				for (n = 0; n < e.length; n++) {
					if (r = e[n], null !== s && s.contains(r)) throw Error(t + "contains a path " + s + " that is ancestor of another path " + r);
					s = r
				}
			},
			q = function (t, e, n, r, o) {
				if (!o || void 0 !== n) {
					var s = i(t, e, o);
					if (!n || "object" !== (void 0 === n ? "undefined" : L(n)) || Array.isArray(n)) throw Error(s + " must be an object containing the children to replace.");
					var a = [];
					Object(_.f)(n, function (t, e) {
						var n = new g(t);
						if (X(s, e, r.child(n)), ".priority" === n.getBack() && !W(e)) throw Error(s + "contains an invalid value for '" + n + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
						a.push(n)
					}), H(s, a)
				}
			},
			K = function (t, e, n, r) {
				if (!r || void 0 !== n) {
					if (Object(D.q)(n)) throw Error(i(t, e, r) + "is " + n + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
					if (!W(n)) throw Error(i(t, e, r) + "must be a valid Firebase priority (a string, finite number, server value, or null).")
				}
			},
			z = function (t, e, n, r) {
				if (!r || void 0 !== n) switch (n) {
					case "value":
					case "child_added":
					case "child_removed":
					case "child_changed":
					case "child_moved":
						break;
					default:
						throw Error(i(t, e, r) + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')
				}
			},
			G = function (t, e, n, r) {
				if (!(r && void 0 === n || F(n))) throw Error(i(t, e, r) + 'was an invalid key = "' + n + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')
			},
			Q = function (t, e, n, r) {
				if (!(r && void 0 === n || M(n))) throw Error(i(t, e, r) + 'was an invalid path = "' + n + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')
			},
			Y = function (t, e, n, r) {
				n && (n = n.replace(/^\/*\.info(\/|$)/, "/")), Q(t, e, n, r)
			},
			$ = function (t, e) {
				if (".info" === e.getFront()) throw Error(t + " failed = Can't modify data under /.info/")
			},
			J = function (t, e, n) {
				var r = "" + n.path;
				if ("string" != typeof n.repoInfo.host || 0 === n.repoInfo.host.length || !F(n.repoInfo.namespace) || 0 !== r.length && !V(r)) throw Error(i(t, e, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')
			},
			Z = function (t, e, n, r) {
				if ((!r || void 0 !== n) && "boolean" != typeof n) throw Error(i(t, e, r) + "must be a boolean.")
			},
			tt = n(1),
			et = n(4),
			nt = function () {
				function t(t, e) {
					this._t = t, this.yt = e
				}
				return t.prototype.cancel = function (t) {
					R("OnDisconnect.cancel", 0, 1, arguments.length), k("OnDisconnect.cancel", 1, t, !0);
					var e = new et.a;
					return this._t.onDisconnectCancel(this.yt, e.wrapCallback(t)), e.promise
				}, t.prototype.remove = function (t) {
					R("OnDisconnect.remove", 0, 1, arguments.length), $("OnDisconnect.remove", this.yt), k("OnDisconnect.remove", 1, t, !0);
					var e = new et.a;
					return this._t.onDisconnectSet(this.yt, null, e.wrapCallback(t)), e.promise
				}, t.prototype.set = function (t, e) {
					R("OnDisconnect.set", 1, 2, arguments.length), $("OnDisconnect.set", this.yt), B("OnDisconnect.set", 1, t, this.yt, !1), k("OnDisconnect.set", 2, e, !0);
					var n = new et.a;
					return this._t.onDisconnectSet(this.yt, t, n.wrapCallback(e)), n.promise
				}, t.prototype.setWithPriority = function (t, e, n) {
					R("OnDisconnect.setWithPriority", 2, 3, arguments.length), $("OnDisconnect.setWithPriority", this.yt), B("OnDisconnect.setWithPriority", 1, t, this.yt, !1), K("OnDisconnect.setWithPriority", 2, e, !1), k("OnDisconnect.setWithPriority", 3, n, !0);
					var r = new et.a;
					return this._t.onDisconnectSetWithPriority(this.yt, t, e, r.wrapCallback(n)), r.promise
				}, t.prototype.update = function (t, e) {
					if (R("OnDisconnect.update", 1, 2, arguments.length), $("OnDisconnect.update", this.yt), Array.isArray(t)) {
						for (var n = {}, r = 0; r < t.length; ++r) n["" + r] = t[r];
						t = n, Object(tt.B)("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
					}
					q("OnDisconnect.update", 1, t, this.yt, !1), k("OnDisconnect.update", 2, e, !0);
					var i = new et.a;
					return this._t.onDisconnectUpdate(this.yt, t, i.wrapCallback(e)), i.promise
				}, t
			}(),
			rt = function () {
				function t(t, e) {
					this.committed = t, this.snapshot = e
				}
				return t.prototype.toJSON = function () {
					return R("TransactionResult.toJSON", 0, 1, arguments.length), {
						committed: this.committed,
						snapshot: this.snapshot.toJSON()
					}
				}, t
			}(),
			it = n(0),
			ot = function () {
				var t = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
					e = 0,
					n = [];
				return function (r) {
					var i = r === e;
					e = r;
					var o, s = Array(8);
					for (o = 7; o >= 0; o--) s[o] = t.charAt(r % 64), r = Math.floor(r / 64);
					Object(it.a)(0 === r, "Cannot push at time == 0");
					var a = s.join("");
					if (i) {
						for (o = 11; o >= 0 && 63 === n[o]; o--) n[o] = 0;
						n[o]++
					} else
						for (o = 0; o < 12; o++) n[o] = Math.floor(64 * Math.random());
					for (o = 0; o < 12; o++) a += t.charAt(n[o]);
					return Object(it.a)(20 === a.length, "nextPushId: Length should be 20."), a
				}
			}(),
			st = function () {
				function t(t, e) {
					this.name = t, this.node = e
				}
				return t.Wrap = function (e, n) {
					return new t(e, n)
				}, t
			}(),
			at = n(1),
			ut = function () {
				function t() {}
				return t.prototype.getCompare = function () {
					return this.compare.bind(this)
				}, t.prototype.indexedValueChanged = function (t, e) {
					var n = new st(at.c, t),
						r = new st(at.c, e);
					return 0 !== this.compare(n, r)
				}, t.prototype.minPost = function () {
					return st.MIN
				}, t
			}(),
			ct = n(1),
			ht = n(0),
			lt = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			ft = function (t) {
				function e() {
					return null !== t && t.apply(this, arguments) || this
				}
				return lt(e, t), Object.defineProperty(e, "__EMPTY_NODE", {
					get: function () {
						return u
					},
					set: function (t) {
						u = t
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.compare = function (t, e) {
					return Object(ct.v)(t.name, e.name)
				}, e.prototype.isDefinedOn = function (t) {
					throw Object(ht.b)("KeyIndex.isDefinedOn not expected to be called.")
				}, e.prototype.indexedValueChanged = function (t, e) {
					return !1
				}, e.prototype.minPost = function () {
					return st.MIN
				}, e.prototype.maxPost = function () {
					return new st(ct.b, u)
				}, e.prototype.makePost = function (t, e) {
					return Object(ht.a)("string" == typeof t, "KeyIndex indexValue must always be a string."), new st(t, u)
				}, e.prototype.toString = function () {
					return ".key"
				}, e
			}(ut),
			pt = new ft,
			dt = n(0),
			vt = n(1),
			yt = n(2),
			gt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			mt = function (t) {
				return "number" == typeof t ? "number:" + Object(vt.h)(t) : "string:" + t
			},
			bt = function (t) {
				if (t.isLeafNode()) {
					var e = t.val();
					Object(dt.a)("string" == typeof e || "number" == typeof e || "object" === (void 0 === e ? "undefined" : gt(e)) && Object(yt.b)(e, ".sv"), "Priority must be a string or number.")
				} else Object(dt.a)(t === c || t.isEmpty(), "priority of unexpected type.");
				Object(dt.a)(t === c || t.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.")
			},
			wt = n(0),
			Et = n(1),
			Ot = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			It = function () {
				function t(e, n) {
					void 0 === n && (n = t.vt.EMPTY_NODE), this.gt = e, this.mt = n, this.bt = null, Object(wt.a)(void 0 !== this.gt && null !== this.gt, "LeafNode shouldn't be created with null/undefined value."), bt(this.mt)
				}
				return Object.defineProperty(t, "__childrenNodeConstructor", {
					get: function () {
						return h
					},
					set: function (t) {
						h = t
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.isLeafNode = function () {
					return !0
				}, t.prototype.getPriority = function () {
					return this.mt
				}, t.prototype.updatePriority = function (e) {
					return new t(this.gt, e)
				}, t.prototype.getImmediateChild = function (e) {
					return ".priority" === e ? this.mt : t.vt.EMPTY_NODE
				}, t.prototype.getChild = function (e) {
					return e.isEmpty() ? this : ".priority" === e.getFront() ? this.mt : t.vt.EMPTY_NODE
				}, t.prototype.hasChild = function () {
					return !1
				}, t.prototype.getPredecessorChildName = function (t, e) {
					return null
				}, t.prototype.updateImmediateChild = function (e, n) {
					return ".priority" === e ? this.updatePriority(n) : n.isEmpty() && ".priority" !== e ? this : t.vt.EMPTY_NODE.updateImmediateChild(e, n).updatePriority(this.mt)
				}, t.prototype.updateChild = function (e, n) {
					var r = e.getFront();
					return null === r ? n : n.isEmpty() && ".priority" !== r ? this : (Object(wt.a)(".priority" !== r || 1 === e.getLength(), ".priority must be the last token in a path"), this.updateImmediateChild(r, t.vt.EMPTY_NODE.updateChild(e.popFront(), n)))
				}, t.prototype.isEmpty = function () {
					return !1
				}, t.prototype.numChildren = function () {
					return 0
				}, t.prototype.forEachChild = function (t, e) {
					return !1
				}, t.prototype.val = function (t) {
					return t && !this.getPriority().isEmpty() ? {
						".value": this.getValue(),
						".priority": this.getPriority().val()
					} : this.getValue()
				}, t.prototype.hash = function () {
					if (null === this.bt) {
						var t = "";
						this.mt.isEmpty() || (t += "priority:" + mt(this.mt.val()) + ":");
						var e = Ot(this.gt);
						t += e + ":", t += "number" === e ? Object(Et.h)(this.gt) : this.gt, this.bt = Object(Et.y)(t)
					}
					return this.bt
				}, t.prototype.getValue = function () {
					return this.gt
				}, t.prototype.compareTo = function (e) {
					return e === t.vt.EMPTY_NODE ? 1 : e instanceof t.vt ? -1 : (Object(wt.a)(e.isLeafNode(), "Unknown node type"), this.Ct(e))
				}, t.prototype.Ct = function (e) {
					var n = Ot(e.gt),
						r = Ot(this.gt),
						i = t.VALUE_TYPE_ORDER.indexOf(n),
						o = t.VALUE_TYPE_ORDER.indexOf(r);
					return Object(wt.a)(i >= 0, "Unknown leaf type: " + n), Object(wt.a)(o >= 0, "Unknown leaf type: " + r), i === o ? "object" === r ? 0 : this.gt < e.gt ? -1 : this.gt === e.gt ? 0 : 1 : o - i
				}, t.prototype.withIndex = function () {
					return this
				}, t.prototype.isIndexed = function () {
					return !0
				}, t.prototype.equals = function (t) {
					if (t === this) return !0;
					if (t.isLeafNode()) {
						var e = t;
						return this.gt === e.gt && this.mt.equals(e.mt)
					}
					return !1
				}, t.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"], t
			}(),
			Tt = n(1),
			Ct = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			St = new(function (t) {
				function e() {
					return null !== t && t.apply(this, arguments) || this
				}
				return Ct(e, t), e.prototype.compare = function (t, e) {
					var n = t.node.getPriority(),
						r = e.node.getPriority(),
						i = n.compareTo(r);
					return 0 === i ? Object(Tt.v)(t.name, e.name) : i
				}, e.prototype.isDefinedOn = function (t) {
					return !t.getPriority().isEmpty()
				}, e.prototype.indexedValueChanged = function (t, e) {
					return !t.getPriority().equals(e.getPriority())
				}, e.prototype.minPost = function () {
					return st.MIN
				}, e.prototype.maxPost = function () {
					return new st(Tt.b, new It("[PRIORITY-POST]", f))
				}, e.prototype.makePost = function (t, e) {
					var n = l(t);
					return new st(e, new It("[PRIORITY-POST]", n))
				}, e.prototype.toString = function () {
					return ".priority"
				}, e
			}(ut)),
			At = function () {
				function t(t, e, n, r, i) {
					void 0 === i && (i = null), this.Et = r, this.wt = i, this.Ot = [];
					for (var o = 1; !t.isEmpty();)
						if (t = t, o = e ? n(t.key, e) : 1, r && (o *= -1), o < 0) t = this.Et ? t.left : t.right;
						else {
							if (0 === o) {
								this.Ot.push(t);
								break
							}
							this.Ot.push(t), t = this.Et ? t.right : t.left
						}
				}
				return t.prototype.getNext = function () {
					if (0 === this.Ot.length) return null;
					var t, e = this.Ot.pop();
					if (t = this.wt ? this.wt(e.key, e.value) : {
							key: e.key,
							value: e.value
						}, this.Et)
						for (e = e.left; !e.isEmpty();) this.Ot.push(e), e = e.right;
					else
						for (e = e.right; !e.isEmpty();) this.Ot.push(e), e = e.left;
					return t
				}, t.prototype.hasNext = function () {
					return this.Ot.length > 0
				}, t.prototype.peek = function () {
					if (0 === this.Ot.length) return null;
					var t = this.Ot[this.Ot.length - 1];
					return this.wt ? this.wt(t.key, t.value) : {
						key: t.key,
						value: t.value
					}
				}, t
			}(),
			Nt = function () {
				function t(e, n, r, i, o) {
					this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : kt.EMPTY_NODE, this.right = null != o ? o : kt.EMPTY_NODE
				}
				return t.prototype.copy = function (e, n, r, i, o) {
					return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right)
				}, t.prototype.count = function () {
					return this.left.count() + 1 + this.right.count()
				}, t.prototype.isEmpty = function () {
					return !1
				}, t.prototype.inorderTraversal = function (t) {
					return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t)
				}, t.prototype.reverseTraversal = function (t) {
					return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
				}, t.prototype.St = function () {
					return this.left.isEmpty() ? this : this.left.St()
				}, t.prototype.minKey = function () {
					return this.St().key
				}, t.prototype.maxKey = function () {
					return this.right.isEmpty() ? this.key : this.right.maxKey()
				}, t.prototype.insert = function (t, e, n) {
					var r, i;
					return i = this, r = n(t, i.key), (i = r < 0 ? i.copy(null, null, null, i.left.insert(t, e, n), null) : 0 === r ? i.copy(null, e, null, null, null) : i.copy(null, null, null, null, i.right.insert(t, e, n))).Tt()
				}, t.prototype.Nt = function () {
					if (this.left.isEmpty()) return kt.EMPTY_NODE;
					var t = this;
					return t.left.It() || t.left.left.It() || (t = t.Pt()), (t = t.copy(null, null, null, t.left.Nt(), null)).Tt()
				}, t.prototype.remove = function (t, e) {
					var n, r;
					if (n = this, e(t, n.key) < 0) n.left.isEmpty() || n.left.It() || n.left.left.It() || (n = n.Pt()), n = n.copy(null, null, null, n.left.remove(t, e), null);
					else {
						if (n.left.It() && (n = n.Rt()), n.right.isEmpty() || n.right.It() || n.right.left.It() || (n = n.Dt()), 0 === e(t, n.key)) {
							if (n.right.isEmpty()) return kt.EMPTY_NODE;
							r = n.right.St(), n = n.copy(r.key, r.value, null, null, n.right.Nt())
						}
						n = n.copy(null, null, null, null, n.right.remove(t, e))
					}
					return n.Tt()
				}, t.prototype.It = function () {
					return this.color
				}, t.prototype.Tt = function () {
					var t = this;
					return t.right.It() && !t.left.It() && (t = t.jt()), t.left.It() && t.left.left.It() && (t = t.Rt()), t.left.It() && t.right.It() && (t = t.xt()), t
				}, t.prototype.Pt = function () {
					var t = this.xt();
					return t.right.left.It() && (t = t.copy(null, null, null, null, t.right.Rt()), t = t.jt(), t = t.xt()), t
				}, t.prototype.Dt = function () {
					var t = this.xt();
					return t.left.left.It() && (t = t.Rt(), t = t.xt()), t
				}, t.prototype.jt = function () {
					var e = this.copy(null, null, t.RED, null, this.right.left);
					return this.right.copy(null, null, this.color, e, null)
				}, t.prototype.Rt = function () {
					var e = this.copy(null, null, t.RED, this.left.right, null);
					return this.left.copy(null, null, this.color, null, e)
				}, t.prototype.xt = function () {
					var t = this.left.copy(null, null, !this.left.color, null, null),
						e = this.right.copy(null, null, !this.right.color, null, null);
					return this.copy(null, null, !this.color, t, e)
				}, t.prototype.kt = function () {
					var t = this.Ft();
					return Math.pow(2, t) <= this.count() + 1
				}, t.prototype.Ft = function () {
					var t;
					if (this.It() && this.left.It()) throw Error("Red node has red child(" + this.key + "," + this.value + ")");
					if (this.right.It()) throw Error("Right child of (" + this.key + "," + this.value + ") is red");
					if ((t = this.left.Ft()) !== this.right.Ft()) throw Error("Black depths differ");
					return t + (this.It() ? 0 : 1)
				}, t.RED = !0, t.BLACK = !1, t
			}(),
			Rt = function () {
				function t() {}
				return t.prototype.copy = function (t, e, n, r, i) {
					return this
				}, t.prototype.insert = function (t, e, n) {
					return new Nt(t, e, null)
				}, t.prototype.remove = function (t, e) {
					return this
				}, t.prototype.count = function () {
					return 0
				}, t.prototype.isEmpty = function () {
					return !0
				}, t.prototype.inorderTraversal = function (t) {
					return !1
				}, t.prototype.reverseTraversal = function (t) {
					return !1
				}, t.prototype.minKey = function () {
					return null
				}, t.prototype.maxKey = function () {
					return null
				}, t.prototype.Ft = function () {
					return 0
				}, t.prototype.It = function () {
					return !1
				}, t
			}(),
			kt = function () {
				function t(e, n) {
					void 0 === n && (n = t.EMPTY_NODE), this.At = e, this.Lt = n
				}
				return t.prototype.insert = function (e, n) {
					return new t(this.At, this.Lt.insert(e, n, this.At).copy(null, null, Nt.BLACK, null, null))
				}, t.prototype.remove = function (e) {
					return new t(this.At, this.Lt.remove(e, this.At).copy(null, null, Nt.BLACK, null, null))
				}, t.prototype.get = function (t) {
					for (var e, n = this.Lt; !n.isEmpty();) {
						if (0 === (e = this.At(t, n.key))) return n.value;
						e < 0 ? n = n.left : e > 0 && (n = n.right)
					}
					return null
				}, t.prototype.getPredecessorKey = function (t) {
					for (var e, n = this.Lt, r = null; !n.isEmpty();) {
						if (0 === (e = this.At(t, n.key))) {
							if (n.left.isEmpty()) return r ? r.key : null;
							for (n = n.left; !n.right.isEmpty();) n = n.right;
							return n.key
						}
						e < 0 ? n = n.left : e > 0 && (r = n, n = n.right)
					}
					throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?")
				}, t.prototype.isEmpty = function () {
					return this.Lt.isEmpty()
				}, t.prototype.count = function () {
					return this.Lt.count()
				}, t.prototype.minKey = function () {
					return this.Lt.minKey()
				}, t.prototype.maxKey = function () {
					return this.Lt.maxKey()
				}, t.prototype.inorderTraversal = function (t) {
					return this.Lt.inorderTraversal(t)
				}, t.prototype.reverseTraversal = function (t) {
					return this.Lt.reverseTraversal(t)
				}, t.prototype.getIterator = function (t) {
					return new At(this.Lt, null, this.At, !1, t)
				}, t.prototype.getIteratorFrom = function (t, e) {
					return new At(this.Lt, t, this.At, !1, e)
				}, t.prototype.getReverseIteratorFrom = function (t, e) {
					return new At(this.Lt, t, this.At, !0, e)
				}, t.prototype.getReverseIterator = function (t) {
					return new At(this.Lt, null, this.At, !0, t)
				}, t.EMPTY_NODE = new Rt, t
			}(),
			Pt = Math.log(2),
			_t = function () {
				function t(t) {
					this.count = function (t) {
						return parseInt(Math.log(t) / Pt, 10)
					}(t + 1), this.Mt = this.count - 1;
					var e = function (t) {
						return parseInt(Array(t + 1).join("1"), 2)
					}(this.count);
					this.Wt = t + 1 & e
				}
				return t.prototype.nextBitIsOne = function () {
					var t = !(this.Wt & 1 << this.Mt);
					return this.Mt--, t
				}, t
			}(),
			Dt = function (t, e, n, r) {
				t.sort(e);
				var i = function e(r, i) {
						var o, s, a = i - r;
						if (0 == a) return null;
						if (1 == a) return o = t[r], s = n ? n(o) : o, new Nt(s, o.node, Nt.BLACK, null, null);
						var u = parseInt(a / 2, 10) + r,
							c = e(r, u),
							h = e(u + 1, i);
						return o = t[u], s = n ? n(o) : o, new Nt(s, o.node, Nt.BLACK, c, h)
					},
					o = function (e) {
						for (var r = null, o = null, s = t.length, a = function (e, r) {
								var o = s - e,
									a = s;
								s -= e;
								var c = i(o + 1, a),
									h = t[o],
									l = n ? n(h) : h;
								u(new Nt(l, h.node, r, null, c))
							}, u = function (t) {
								r ? (r.left = t, r = t) : (o = t, r = t)
							}, c = 0; c < e.count; ++c) {
							var h = e.nextBitIsOne(),
								l = Math.pow(2, e.count - (c + 1));
							h ? a(l, Nt.BLACK) : (a(l, Nt.BLACK), a(l, Nt.RED))
						}
						return o
					}(new _t(t.length));
				return new kt(r || e, o)
			},
			jt = n(0),
			Lt = n(2),
			xt = {},
			Ut = function () {
				function t(t, e) {
					this.qt = t, this.Qt = e
				}
				return Object.defineProperty(t, "Default", {
					get: function () {
						return Object(jt.a)(xt && St, "ChildrenNode.ts has not been loaded"), p = p || new t({
							".priority": xt
						}, {
							".priority": St
						})
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.get = function (t) {
					var e = Object(Lt.l)(this.qt, t);
					if (!e) throw Error("No index defined for " + t);
					return e === xt ? null : e
				}, t.prototype.hasIndex = function (t) {
					return Object(Lt.b)(this.Qt, "" + t)
				}, t.prototype.addIndex = function (e, n) {
					Object(jt.a)(e !== pt, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
					for (var r = [], i = !1, o = n.getIterator(st.Wrap), s = o.getNext(); s;) i = i || e.isDefinedOn(s.node), r.push(s), s = o.getNext();
					var a;
					a = i ? Dt(r, e.getCompare()) : xt;
					var u = "" + e,
						c = Object(Lt.a)(this.Qt);
					c[u] = e;
					var h = Object(Lt.a)(this.qt);
					return h[u] = a, new t(h, c)
				}, t.prototype.addToIndexes = function (e, n) {
					var r = this;
					return new t(Object(Lt.k)(this.qt, function (t, i) {
						var o = Object(Lt.l)(r.Qt, i);
						if (Object(jt.a)(o, "Missing index implementation for " + i), t === xt) {
							if (o.isDefinedOn(e.node)) {
								for (var s = [], a = n.getIterator(st.Wrap), u = a.getNext(); u;) u.name != e.name && s.push(u), u = a.getNext();
								return s.push(e), Dt(s, o.getCompare())
							}
							return xt
						}
						var c = n.get(e.name),
							h = t;
						return c && (h = h.remove(new st(e.name, c))), h.insert(e, e.node)
					}), this.Qt)
				}, t.prototype.removeFromIndexes = function (e, n) {
					return new t(Object(Lt.k)(this.qt, function (t) {
						if (t === xt) return t;
						var r = n.get(e.name);
						return r ? t.remove(new st(e.name, r)) : t
					}), this.Qt)
				}, t
			}(),
			Ft = n(1),
			Mt = n(0),
			Vt = n(1),
			Wt = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			Bt = function () {
				function t(t, e, n) {
					this.Ut = t, this.mt = e, this.Vt = n, this.bt = null, this.mt && bt(this.mt), this.Ut.isEmpty() && Object(Mt.a)(!this.mt || this.mt.isEmpty(), "An empty node cannot have a priority")
				}
				return Object.defineProperty(t, "EMPTY_NODE", {
					get: function () {
						return d || (d = new t(new kt(s), null, Ut.Default))
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.isLeafNode = function () {
					return !1
				}, t.prototype.getPriority = function () {
					return this.mt || d
				}, t.prototype.updatePriority = function (e) {
					return this.Ut.isEmpty() ? this : new t(this.Ut, e, this.Vt)
				}, t.prototype.getImmediateChild = function (t) {
					if (".priority" === t) return this.getPriority();
					var e = this.Ut.get(t);
					return null === e ? d : e
				}, t.prototype.getChild = function (t) {
					var e = t.getFront();
					return null === e ? this : this.getImmediateChild(e).getChild(t.popFront())
				}, t.prototype.hasChild = function (t) {
					return null !== this.Ut.get(t)
				}, t.prototype.updateImmediateChild = function (e, n) {
					if (Object(Mt.a)(n, "We should always be passing snapshot nodes"), ".priority" === e) return this.updatePriority(n);
					var r = new st(e, n),
						i = void 0,
						o = void 0,
						s = void 0;
					return n.isEmpty() ? (i = this.Ut.remove(e), o = this.Vt.removeFromIndexes(r, this.Ut)) : (i = this.Ut.insert(e, n), o = this.Vt.addToIndexes(r, this.Ut)), s = i.isEmpty() ? d : this.mt, new t(i, s, o)
				}, t.prototype.updateChild = function (t, e) {
					var n = t.getFront();
					if (null === n) return e;
					Object(Mt.a)(".priority" !== t.getFront() || 1 === t.getLength(), ".priority must be the last token in a path");
					var r = this.getImmediateChild(n).updateChild(t.popFront(), e);
					return this.updateImmediateChild(n, r)
				}, t.prototype.isEmpty = function () {
					return this.Ut.isEmpty()
				}, t.prototype.numChildren = function () {
					return this.Ut.count()
				}, t.prototype.val = function (e) {
					if (this.isEmpty()) return null;
					var n = {},
						r = 0,
						i = 0,
						o = !0;
					if (this.forEachChild(St, function (s, a) {
							n[s] = a.val(e), r++, o && t.Bt.test(s) ? i = Math.max(i, +s) : o = !1
						}), !e && o && i < 2 * r) {
						var s = [];
						for (var a in n) s[a] = n[a];
						return s
					}
					return e && !this.getPriority().isEmpty() && (n[".priority"] = this.getPriority().val()), n
				}, t.prototype.hash = function () {
					if (null === this.bt) {
						var t = "";
						this.getPriority().isEmpty() || (t += "priority:" + mt(this.getPriority().val()) + ":"), this.forEachChild(St, function (e, n) {
							var r = n.hash();
							"" !== r && (t += ":" + e + ":" + r)
						}), this.bt = "" === t ? "" : Object(Vt.y)(t)
					}
					return this.bt
				}, t.prototype.getPredecessorChildName = function (t, e, n) {
					var r = this.Ht(n);
					if (r) {
						var i = r.getPredecessorKey(new st(t, e));
						return i ? i.name : null
					}
					return this.Ut.getPredecessorKey(t)
				}, t.prototype.getFirstChildName = function (t) {
					var e = this.Ht(t);
					if (e) {
						var n = e.minKey();
						return n && n.name
					}
					return this.Ut.minKey()
				}, t.prototype.getFirstChild = function (t) {
					var e = this.getFirstChildName(t);
					return e ? new st(e, this.Ut.get(e)) : null
				}, t.prototype.getLastChildName = function (t) {
					var e = this.Ht(t);
					if (e) {
						var n = e.maxKey();
						return n && n.name
					}
					return this.Ut.maxKey()
				}, t.prototype.getLastChild = function (t) {
					var e = this.getLastChildName(t);
					return e ? new st(e, this.Ut.get(e)) : null
				}, t.prototype.forEachChild = function (t, e) {
					var n = this.Ht(t);
					return n ? n.inorderTraversal(function (t) {
						return e(t.name, t.node)
					}) : this.Ut.inorderTraversal(e)
				}, t.prototype.getIterator = function (t) {
					return this.getIteratorFrom(t.minPost(), t)
				}, t.prototype.getIteratorFrom = function (t, e) {
					var n = this.Ht(e);
					if (n) return n.getIteratorFrom(t, function (t) {
						return t
					});
					for (var r = this.Ut.getIteratorFrom(t.name, st.Wrap), i = r.peek(); null != i && e.compare(i, t) < 0;) r.getNext(), i = r.peek();
					return r
				}, t.prototype.getReverseIterator = function (t) {
					return this.getReverseIteratorFrom(t.maxPost(), t)
				}, t.prototype.getReverseIteratorFrom = function (t, e) {
					var n = this.Ht(e);
					if (n) return n.getReverseIteratorFrom(t, function (t) {
						return t
					});
					for (var r = this.Ut.getReverseIteratorFrom(t.name, st.Wrap), i = r.peek(); null != i && e.compare(i, t) > 0;) r.getNext(), i = r.peek();
					return r
				}, t.prototype.compareTo = function (t) {
					return this.isEmpty() ? t.isEmpty() ? 0 : -1 : t.isLeafNode() || t.isEmpty() ? 1 : t === Xt ? -1 : 0
				}, t.prototype.withIndex = function (e) {
					if (e === pt || this.Vt.hasIndex(e)) return this;
					var n = this.Vt.addIndex(e, this.Ut);
					return new t(this.Ut, this.mt, n)
				}, t.prototype.isIndexed = function (t) {
					return t === pt || this.Vt.hasIndex(t)
				}, t.prototype.equals = function (t) {
					if (t === this) return !0;
					if (t.isLeafNode()) return !1;
					var e = t;
					if (this.getPriority().equals(e.getPriority())) {
						if (this.Ut.count() === e.Ut.count()) {
							for (var n = this.getIterator(St), r = e.getIterator(St), i = n.getNext(), o = r.getNext(); i && o;) {
								if (i.name !== o.name || !i.node.equals(o.node)) return !1;
								i = n.getNext(), o = r.getNext()
							}
							return null === i && null === o
						}
						return !1
					}
					return !1
				}, t.prototype.Ht = function (t) {
					return t === pt ? null : this.Vt.get("" + t)
				}, t.Bt = /^(0|[1-9]\d*)$/, t
			}(),
			Xt = new(function (t) {
				function e() {
					return t.call(this, new kt(s), Bt.EMPTY_NODE, Ut.Default) || this
				}
				return Wt(e, t), e.prototype.compareTo = function (t) {
					return t === this ? 0 : 1
				}, e.prototype.equals = function (t) {
					return t === this
				}, e.prototype.getPriority = function () {
					return this
				}, e.prototype.getImmediateChild = function (t) {
					return Bt.EMPTY_NODE
				}, e.prototype.isEmpty = function () {
					return !1
				}, e
			}(Bt));
		Object.defineProperties(st, {
			MIN: {
				value: new st(Vt.c, Bt.EMPTY_NODE)
			},
			MAX: {
				value: new st(Vt.b, Xt)
			}
		}), ft.Kt = Bt.EMPTY_NODE, It.vt = Bt, c = Xt, f = Xt;
		var Ht = n(2),
			qt = n(0),
			Kt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			zt = !0;
		l = a;
		var Gt, Qt, Yt = n(1),
			$t = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			Jt = new(function (t) {
				function e() {
					return null !== t && t.apply(this, arguments) || this
				}
				return $t(e, t), e.prototype.compare = function (t, e) {
					var n = t.node.compareTo(e.node);
					return 0 === n ? Object(Yt.v)(t.name, e.name) : n
				}, e.prototype.isDefinedOn = function (t) {
					return !0
				}, e.prototype.indexedValueChanged = function (t, e) {
					return !t.equals(e)
				}, e.prototype.minPost = function () {
					return st.MIN
				}, e.prototype.maxPost = function () {
					return st.MAX
				}, e.prototype.makePost = function (t, e) {
					var n = a(t);
					return new st(e, n)
				}, e.prototype.toString = function () {
					return ".value"
				}, e
			}(ut)),
			Zt = n(0),
			te = n(1),
			ee = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			ne = function (t) {
				function e(e) {
					var n = t.call(this) || this;
					return n.Yt = e, Object(Zt.a)(!e.isEmpty() && ".priority" !== e.getFront(), "Can't create PathIndex with empty path or .priority key"), n
				}
				return ee(e, t), e.prototype.extractChild = function (t) {
					return t.getChild(this.Yt)
				}, e.prototype.isDefinedOn = function (t) {
					return !t.getChild(this.Yt).isEmpty()
				}, e.prototype.compare = function (t, e) {
					var n = this.extractChild(t.node),
						r = this.extractChild(e.node),
						i = n.compareTo(r);
					return 0 === i ? Object(te.v)(t.name, e.name) : i
				}, e.prototype.makePost = function (t, e) {
					var n = a(t),
						r = Bt.EMPTY_NODE.updateChild(this.Yt, n);
					return new st(e, r)
				}, e.prototype.maxPost = function () {
					var t = Bt.EMPTY_NODE.updateChild(this.Yt, Xt);
					return new st(te.b, t)
				}, e.prototype.toString = function () {
					return this.Yt.slice().join("/")
				}, e
			}(ut),
			re = function () {
				function t(t, e, n) {
					this.zt = t, this.Gt = e, this.Xt = n
				}
				return t.prototype.val = function () {
					return R("DataSnapshot.val", 0, 0, arguments.length), this.zt.val()
				}, t.prototype.exportVal = function () {
					return R("DataSnapshot.exportVal", 0, 0, arguments.length), this.zt.val(!0)
				}, t.prototype.toJSON = function () {
					return R("DataSnapshot.toJSON", 0, 1, arguments.length), this.exportVal()
				}, t.prototype.exists = function () {
					return R("DataSnapshot.exists", 0, 0, arguments.length), !this.zt.isEmpty()
				}, t.prototype.child = function (e) {
					R("DataSnapshot.child", 0, 1, arguments.length), Q("DataSnapshot.child", 1, e += "", !1);
					var n = new g(e),
						r = this.Gt.child(n);
					return new t(this.zt.getChild(n), r, St)
				}, t.prototype.hasChild = function (t) {
					R("DataSnapshot.hasChild", 1, 1, arguments.length), Q("DataSnapshot.hasChild", 1, t, !1);
					var e = new g(t);
					return !this.zt.getChild(e).isEmpty()
				}, t.prototype.getPriority = function () {
					return R("DataSnapshot.getPriority", 0, 0, arguments.length), this.zt.getPriority().val()
				}, t.prototype.forEach = function (e) {
					var n = this;
					return R("DataSnapshot.forEach", 1, 1, arguments.length), k("DataSnapshot.forEach", 1, e, !1), !this.zt.isLeafNode() && !!this.zt.forEachChild(this.Xt, function (r, i) {
						return e(new t(i, n.Gt.child(r), St))
					})
				}, t.prototype.hasChildren = function () {
					return R("DataSnapshot.hasChildren", 0, 0, arguments.length), !this.zt.isLeafNode() && !this.zt.isEmpty()
				}, Object.defineProperty(t.prototype, "key", {
					get: function () {
						return this.Gt.getKey()
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.numChildren = function () {
					return R("DataSnapshot.numChildren", 0, 0, arguments.length), this.zt.numChildren()
				}, t.prototype.getRef = function () {
					return R("DataSnapshot.ref", 0, 0, arguments.length), this.Gt
				}, Object.defineProperty(t.prototype, "ref", {
					get: function () {
						return this.getRef()
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(),
			ie = n(3),
			oe = function () {
				function t(t, e, n, r) {
					this.eventType = t, this.eventRegistration = e, this.snapshot = n, this.prevName = r
				}
				return t.prototype.getPath = function () {
					var t = this.snapshot.getRef();
					return "value" === this.eventType ? t.path : t.getParent().path
				}, t.prototype.getEventType = function () {
					return this.eventType
				}, t.prototype.getEventRunner = function () {
					return this.eventRegistration.getEventRunner(this)
				}, t.prototype.toString = function () {
					return this.getPath() + ":" + this.eventType + ":" + Object(ie.b)(this.snapshot.exportVal())
				}, t
			}(),
			se = function () {
				function t(t, e, n) {
					this.eventRegistration = t, this.error = e, this.path = n
				}
				return t.prototype.getPath = function () {
					return this.path
				}, t.prototype.getEventType = function () {
					return "cancel"
				}, t.prototype.getEventRunner = function () {
					return this.eventRegistration.getEventRunner(this)
				}, t.prototype.toString = function () {
					return this.path + ":cancel"
				}, t
			}(),
			ae = n(2),
			ue = n(0),
			ce = function () {
				function t(t, e, n) {
					this.$t = t, this.Jt = e, this.Zt = n
				}
				return t.prototype.respondsTo = function (t) {
					return "value" === t
				}, t.prototype.createEvent = function (t, e) {
					var n = e.getQueryParams().getIndex();
					return new oe("value", this, new re(t.snapshotNode, e.getRef(), n))
				}, t.prototype.getEventRunner = function (t) {
					var e = this.Zt;
					if ("cancel" === t.getEventType()) {
						Object(ue.a)(this.Jt, "Raising a cancel event on a listener with no cancel callback");
						var n = this.Jt;
						return function () {
							n.call(e, t.error)
						}
					}
					var r = this.$t;
					return function () {
						r.call(e, t.snapshot)
					}
				}, t.prototype.createCancelEvent = function (t, e) {
					return this.Jt ? new se(this, t, e) : null
				}, t.prototype.matches = function (e) {
					return e instanceof t && (!e.$t || !this.$t || e.$t === this.$t && e.Zt === this.Zt)
				}, t.prototype.hasAnyCallback = function () {
					return null !== this.$t
				}, t
			}(),
			he = function () {
				function t(t, e, n) {
					this.te = t, this.Jt = e, this.Zt = n
				}
				return t.prototype.respondsTo = function (t) {
					var e = "children_added" === t ? "child_added" : t;
					return e = "children_removed" === e ? "child_removed" : e, Object(ae.b)(this.te, e)
				}, t.prototype.createCancelEvent = function (t, e) {
					return this.Jt ? new se(this, t, e) : null
				}, t.prototype.createEvent = function (t, e) {
					Object(ue.a)(null != t.childName, "Child events should have a childName.");
					var n = e.getRef().child(t.childName),
						r = e.getQueryParams().getIndex();
					return new oe(t.type, this, new re(t.snapshotNode, n, r), t.prevName)
				}, t.prototype.getEventRunner = function (t) {
					var e = this.Zt;
					if ("cancel" === t.getEventType()) {
						Object(ue.a)(this.Jt, "Raising a cancel event on a listener with no cancel callback");
						var n = this.Jt;
						return function () {
							n.call(e, t.error)
						}
					}
					var r = this.te[t.eventType];
					return function () {
						r.call(e, t.snapshot, t.prevName)
					}
				}, t.prototype.matches = function (e) {
					if (e instanceof t) {
						if (!this.te || !e.te) return !0;
						if (this.Zt === e.Zt) {
							var n = Object(ae.h)(e.te);
							if (n === Object(ae.h)(this.te)) {
								if (1 === n) {
									var r = Object(ae.g)(e.te),
										i = Object(ae.g)(this.te);
									return !(i !== r || e.te[r] && this.te[i] && e.te[r] !== this.te[i])
								}
								return Object(ae.c)(this.te, function (t, n) {
									return e.te[t] === n
								})
							}
						}
					}
					return !1
				}, t.prototype.hasAnyCallback = function () {
					return null !== this.te
				}, t
			}(),
			le = n(0),
			fe = n(1),
			pe = n(4),
			de = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			ve = function () {
				function t(t, e, n, r) {
					this.repo = t, this.path = e, this.ee = n, this.ne = r
				}
				return Object.defineProperty(t, "__referenceConstructor", {
					get: function () {
						return Object(le.a)(Gt, "Reference.ts has not been loaded"), Gt
					},
					set: function (t) {
						Gt = t
					},
					enumerable: !0,
					configurable: !0
				}), t.re = function (t) {
					var e = null,
						n = null;
					if (t.hasStart() && (e = t.getIndexStartValue()), t.hasEnd() && (n = t.getIndexEndValue()), t.getIndex() === pt) {
						var r = "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",
							i = "Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.";
						if (t.hasStart()) {
							if (t.getIndexStartName() != fe.c) throw Error(r);
							if ("string" != typeof e) throw Error(i)
						}
						if (t.hasEnd()) {
							if (t.getIndexEndName() != fe.b) throw Error(r);
							if ("string" != typeof n) throw Error(i)
						}
					} else if (t.getIndex() === St) {
						if (null != e && !W(e) || null != n && !W(n)) throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).")
					} else if (Object(le.a)(t.getIndex() instanceof ne || t.getIndex() === Jt, "unknown index type."), null != e && "object" === (void 0 === e ? "undefined" : de(e)) || null != n && "object" === (void 0 === n ? "undefined" : de(n))) throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.")
				}, t.ie = function (t) {
					if (t.hasStart() && t.hasEnd() && t.hasLimit() && !t.hasAnchoredLimit()) throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.")
				}, t.prototype.oe = function (t) {
					if (!0 === this.ne) throw Error(t + ": You can't combine multiple orderBy calls.")
				}, t.prototype.getQueryParams = function () {
					return this.ee
				}, t.prototype.getRef = function () {
					return R("Query.ref", 0, 0, arguments.length), new t.se(this.repo, this.path)
				}, t.prototype.on = function (e, n, r, i) {
					R("Query.on", 2, 4, arguments.length), z("Query.on", 1, e, !1), k("Query.on", 2, n, !1);
					var o = t.ae("Query.on", r, i);
					if ("value" === e) this.onValueEvent(n, o.cancel, o.context);
					else {
						var s = {};
						s[e] = n, this.onChildEvent(s, o.cancel, o.context)
					}
					return n
				}, t.prototype.onValueEvent = function (t, e, n) {
					var r = new ce(t, e || null, n || null);
					this.repo.addEventCallbackForQuery(this, r)
				}, t.prototype.onChildEvent = function (t, e, n) {
					var r = new he(t, e, n);
					this.repo.addEventCallbackForQuery(this, r)
				}, t.prototype.off = function (t, e, n) {
					R("Query.off", 0, 3, arguments.length), z("Query.off", 1, t, !0), k("Query.off", 2, e, !0), P("Query.off", 3, n, !0);
					var r = null,
						i = null;
					"value" === t ? r = new ce(e || null, null, n || null) : t && (e && (i = {}, i[t] = e), r = new he(i, null, n || null)), this.repo.removeEventCallbackForQuery(this, r)
				}, t.prototype.once = function (e, n, r, i) {
					var o = this;
					R("Query.once", 1, 4, arguments.length), z("Query.once", 1, e, !1), k("Query.once", 2, n, !0);
					var s = t.ae("Query.once", r, i),
						a = !0,
						u = new pe.a;
					Object(pe.c)(u.promise);
					var c = function t(r) {
						a && (a = !1, o.off(e, t), n && n.bind(s.context)(r), u.resolve(r))
					};
					return this.on(e, c, function (t) {
						o.off(e, c), s.cancel && s.cancel.bind(s.context)(t), u.reject(t)
					}), u.promise
				}, t.prototype.limitToFirst = function (e) {
					if (R("Query.limitToFirst", 1, 1, arguments.length), "number" != typeof e || Math.floor(e) !== e || e <= 0) throw Error("Query.limitToFirst: First argument must be a positive integer.");
					if (this.ee.hasLimit()) throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
					return new t(this.repo, this.path, this.ee.limitToFirst(e), this.ne)
				}, t.prototype.limitToLast = function (e) {
					if (R("Query.limitToLast", 1, 1, arguments.length), "number" != typeof e || Math.floor(e) !== e || e <= 0) throw Error("Query.limitToLast: First argument must be a positive integer.");
					if (this.ee.hasLimit()) throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
					return new t(this.repo, this.path, this.ee.limitToLast(e), this.ne)
				}, t.prototype.orderByChild = function (e) {
					if (R("Query.orderByChild", 1, 1, arguments.length), "$key" === e) throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
					if ("$priority" === e) throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
					if ("$value" === e) throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
					Q("Query.orderByChild", 1, e, !1), this.oe("Query.orderByChild");
					var n = new g(e);
					if (n.isEmpty()) throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
					var r = new ne(n),
						i = this.ee.orderBy(r);
					return t.re(i), new t(this.repo, this.path, i, !0)
				}, t.prototype.orderByKey = function () {
					R("Query.orderByKey", 0, 0, arguments.length), this.oe("Query.orderByKey");
					var e = this.ee.orderBy(pt);
					return t.re(e), new t(this.repo, this.path, e, !0)
				}, t.prototype.orderByPriority = function () {
					R("Query.orderByPriority", 0, 0, arguments.length), this.oe("Query.orderByPriority");
					var e = this.ee.orderBy(St);
					return t.re(e), new t(this.repo, this.path, e, !0)
				}, t.prototype.orderByValue = function () {
					R("Query.orderByValue", 0, 0, arguments.length), this.oe("Query.orderByValue");
					var e = this.ee.orderBy(Jt);
					return t.re(e), new t(this.repo, this.path, e, !0)
				}, t.prototype.startAt = function (e, n) {
					void 0 === e && (e = null), R("Query.startAt", 0, 2, arguments.length), B("Query.startAt", 1, e, this.path, !0), G("Query.startAt", 2, n, !0);
					var r = this.ee.startAt(e, n);
					if (t.ie(r), t.re(r), this.ee.hasStart()) throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
					return void 0 === e && (e = null, n = null), new t(this.repo, this.path, r, this.ne)
				}, t.prototype.endAt = function (e, n) {
					void 0 === e && (e = null), R("Query.endAt", 0, 2, arguments.length), B("Query.endAt", 1, e, this.path, !0), G("Query.endAt", 2, n, !0);
					var r = this.ee.endAt(e, n);
					if (t.ie(r), t.re(r), this.ee.hasEnd()) throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
					return new t(this.repo, this.path, r, this.ne)
				}, t.prototype.equalTo = function (t, e) {
					if (R("Query.equalTo", 1, 2, arguments.length), B("Query.equalTo", 1, t, this.path, !1), G("Query.equalTo", 2, e, !0), this.ee.hasStart()) throw Error("Query.equalTo: Starting point was already set (by another call to startAt or equalTo).");
					if (this.ee.hasEnd()) throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
					return this.startAt(t, e).endAt(t, e)
				}, t.prototype.toString = function () {
					return R("Query.toString", 0, 0, arguments.length), "" + this.repo + this.path.toUrlEncodedString()
				}, t.prototype.toJSON = function () {
					return R("Query.toJSON", 0, 1, arguments.length), "" + this
				}, t.prototype.queryObject = function () {
					return this.ee.getQueryObject()
				}, t.prototype.queryIdentifier = function () {
					var t = this.queryObject(),
						e = Object(fe.d)(t);
					return "{}" === e ? "default" : e
				}, t.prototype.isEqual = function (e) {
					if (R("Query.isEqual", 1, 1, arguments.length), !(e instanceof t)) throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");
					var n = this.repo === e.repo,
						r = this.path.equals(e.path),
						i = this.queryIdentifier() === e.queryIdentifier();
					return n && r && i
				}, t.ae = function (t, e, n) {
					var r = {
						cancel: null,
						context: null
					};
					if (e && n) r.cancel = e, k(t, 3, r.cancel, !0), r.context = n, P(t, 4, r.context, !0);
					else if (e)
						if ("object" === (void 0 === e ? "undefined" : de(e)) && null !== e) r.context = e;
						else {
							if ("function" != typeof e) throw Error(i(t, 3, !0) + " must either be a cancel callback or a context object.");
							r.cancel = e
						}
					return r
				}, Object.defineProperty(t.prototype, "ref", {
					get: function () {
						return this.getRef()
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(),
			ye = n(2),
			ge = function () {
				function t() {
					this.set = {}
				}
				return t.prototype.add = function (t, e) {
					this.set[t] = null === e || e
				}, t.prototype.contains = function (t) {
					return Object(ye.b)(this.set, t)
				}, t.prototype.get = function (t) {
					return this.contains(t) ? this.set[t] : void 0
				}, t.prototype.remove = function (t) {
					delete this.set[t]
				}, t.prototype.clear = function () {
					this.set = {}
				}, t.prototype.isEmpty = function () {
					return Object(ye.j)(this.set)
				}, t.prototype.count = function () {
					return Object(ye.h)(this.set)
				}, t.prototype.each = function (t) {
					Object(ye.f)(this.set, function (e, n) {
						return t(e, n)
					})
				}, t.prototype.keys = function () {
					var t = [];
					return Object(ye.f)(this.set, function (e) {
						t.push(e)
					}), t
				}, t
			}(),
			me = function () {
				function t() {
					this.gt = null, this.Ut = null
				}
				return t.prototype.find = function (t) {
					if (null != this.gt) return this.gt.getChild(t);
					if (t.isEmpty() || null == this.Ut) return null;
					var e = t.getFront();
					return t = t.popFront(), this.Ut.contains(e) ? this.Ut.get(e).find(t) : null
				}, t.prototype.remember = function (e, n) {
					if (e.isEmpty()) this.gt = n, this.Ut = null;
					else if (null !== this.gt) this.gt = this.gt.updateChild(e, n);
					else {
						null == this.Ut && (this.Ut = new ge);
						var r = e.getFront();
						this.Ut.contains(r) || this.Ut.add(r, new t);
						var i = this.Ut.get(r);
						e = e.popFront(), i.remember(e, n)
					}
				}, t.prototype.forget = function (t) {
					if (t.isEmpty()) return this.gt = null, this.Ut = null, !0;
					if (null !== this.gt) {
						if (this.gt.isLeafNode()) return !1;
						var e = this.gt;
						this.gt = null;
						var n = this;
						return e.forEachChild(St, function (t, e) {
							n.remember(new g(t), e)
						}), this.forget(t)
					}
					if (null !== this.Ut) {
						var r = t.getFront();
						return t = t.popFront(), this.Ut.contains(r) && this.Ut.get(r).forget(t) && this.Ut.remove(r), !!this.Ut.isEmpty() && (this.Ut = null, !0)
					}
					return !0
				}, t.prototype.forEachTree = function (t, e) {
					null !== this.gt ? e(t, this.gt) : this.forEachChild(function (n, r) {
						var i = new g(t + "/" + n);
						r.forEachTree(i, e)
					})
				}, t.prototype.forEachChild = function (t) {
					null !== this.Ut && this.Ut.each(function (e, n) {
						t(e, n)
					})
				}, t
			}(),
			be = n(0),
			we = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			Ee = function (t) {
				return t = t || {}, t.timestamp = t.timestamp || (new Date).getTime(), t
			},
			Oe = function (t, e) {
				return t && "object" === (void 0 === t ? "undefined" : we(t)) ? (Object(be.a)(".sv" in t, "Unexpected leaf node or priority contents"), e[t[".sv"]]) : t
			},
			Ie = function (t, e) {
				var n = new me;
				return t.forEachTree(new g(""), function (t, r) {
					n.remember(t, Te(r, e))
				}), n
			},
			Te = function t(e, n) {
				var r, i = e.getPriority().val(),
					o = Oe(i, n);
				if (e.isLeafNode()) {
					var s = e,
						u = Oe(s.getValue(), n);
					return u !== s.getValue() || o !== s.getPriority().val() ? new It(u, a(o)) : e
				}
				var c = e;
				return r = c, o !== c.getPriority().val() && (r = r.updatePriority(new It(o))), c.forEachChild(St, function (e, i) {
					var o = t(i, n);
					o !== i && (r = r.updateImmediateChild(e, o))
				}), r
			},
			Ce = n(0);
		! function (t) {
			t[t.OVERWRITE = 0] = "OVERWRITE", t[t.MERGE = 1] = "MERGE", t[t.ACK_USER_WRITE = 2] = "ACK_USER_WRITE", t[t.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE"
		}(Qt || (Qt = {}));
		var Se, Ae, Ne = function () {
				function t(t, e, n, r) {
					this.fromUser = t, this.fromServer = e, this.queryId = n, this.tagged = r, Object(Ce.a)(!r || e, "Tagged queries must be from server.")
				}
				return t.User = new t(!0, !1, null, !1), t.Server = new t(!1, !0, null, !1), t.forServerTaggedQuery = function (e) {
					return new t(!1, !0, e, !0)
				}, t
			}(),
			Re = n(0),
			ke = function () {
				function t(t, e, n) {
					this.path = t, this.affectedTree = e, this.revert = n, this.type = Qt.ACK_USER_WRITE, this.source = Ne.User
				}
				return t.prototype.operationForChild = function (e) {
					if (this.path.isEmpty()) {
						if (null != this.affectedTree.value) return Object(Re.a)(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
						var n = this.affectedTree.subtree(new g(e));
						return new t(g.Empty, n, this.revert)
					}
					return Object(Re.a)(this.path.getFront() === e, "operationForChild called for unrelated child."), new t(this.path.popFront(), this.affectedTree, this.revert)
				}, t
			}(),
			Pe = n(1),
			_e = n(2),
			De = function () {
				return Se || (Se = new kt(Pe.A)), Se
			},
			je = function () {
				function t(t, e) {
					void 0 === e && (e = De()), this.value = t, this.children = e
				}
				return t.fromObject = function (e) {
					var n = t.Empty;
					return Object(_e.f)(e, function (t, e) {
						n = n.set(new g(t), e)
					}), n
				}, t.prototype.isEmpty = function () {
					return null === this.value && this.children.isEmpty()
				}, t.prototype.findRootMostMatchingPathAndValue = function (t, e) {
					if (null != this.value && e(this.value)) return {
						path: g.Empty,
						value: this.value
					};
					if (t.isEmpty()) return null;
					var n = t.getFront(),
						r = this.children.get(n);
					if (null !== r) {
						var i = r.findRootMostMatchingPathAndValue(t.popFront(), e);
						return null != i ? {
							path: new g(n).child(i.path),
							value: i.value
						} : null
					}
					return null
				}, t.prototype.findRootMostValueAndPath = function (t) {
					return this.findRootMostMatchingPathAndValue(t, function () {
						return !0
					})
				}, t.prototype.subtree = function (e) {
					if (e.isEmpty()) return this;
					var n = e.getFront(),
						r = this.children.get(n);
					return null !== r ? r.subtree(e.popFront()) : t.Empty
				}, t.prototype.set = function (e, n) {
					if (e.isEmpty()) return new t(n, this.children);
					var r = e.getFront(),
						i = (this.children.get(r) || t.Empty).set(e.popFront(), n),
						o = this.children.insert(r, i);
					return new t(this.value, o)
				}, t.prototype.remove = function (e) {
					if (e.isEmpty()) return this.children.isEmpty() ? t.Empty : new t(null, this.children);
					var n = e.getFront(),
						r = this.children.get(n);
					if (r) {
						var i = r.remove(e.popFront()),
							o = void 0;
						return o = i.isEmpty() ? this.children.remove(n) : this.children.insert(n, i), null === this.value && o.isEmpty() ? t.Empty : new t(this.value, o)
					}
					return this
				}, t.prototype.get = function (t) {
					if (t.isEmpty()) return this.value;
					var e = t.getFront(),
						n = this.children.get(e);
					return n ? n.get(t.popFront()) : null
				}, t.prototype.setTree = function (e, n) {
					if (e.isEmpty()) return n;
					var r = e.getFront(),
						i = (this.children.get(r) || t.Empty).setTree(e.popFront(), n),
						o = void 0;
					return o = i.isEmpty() ? this.children.remove(r) : this.children.insert(r, i), new t(this.value, o)
				}, t.prototype.fold = function (t) {
					return this.ue(g.Empty, t)
				}, t.prototype.ue = function (t, e) {
					var n = {};
					return this.children.inorderTraversal(function (r, i) {
						n[r] = i.ue(t.child(r), e)
					}), e(t, this.value, n)
				}, t.prototype.findOnPath = function (t, e) {
					return this.ce(t, g.Empty, e)
				}, t.prototype.ce = function (t, e, n) {
					var r = !!this.value && n(e, this.value);
					if (r) return r;
					if (t.isEmpty()) return null;
					var i = t.getFront(),
						o = this.children.get(i);
					return o ? o.ce(t.popFront(), e.child(i), n) : null
				}, t.prototype.foreachOnPath = function (t, e) {
					return this.he(t, g.Empty, e)
				}, t.prototype.he = function (e, n, r) {
					if (e.isEmpty()) return this;
					this.value && r(n, this.value);
					var i = e.getFront(),
						o = this.children.get(i);
					return o ? o.he(e.popFront(), n.child(i), r) : t.Empty
				}, t.prototype.foreach = function (t) {
					this.le(g.Empty, t)
				}, t.prototype.le = function (t, e) {
					this.children.inorderTraversal(function (n, r) {
						r.le(t.child(n), e)
					}), this.value && e(t, this.value)
				}, t.prototype.foreachChild = function (t) {
					this.children.inorderTraversal(function (e, n) {
						n.value && t(e, n.value)
					})
				}, t.Empty = new t(null), t
			}(),
			Le = function () {
				function t(t, e) {
					this.source = t, this.path = e, this.type = Qt.LISTEN_COMPLETE
				}
				return t.prototype.operationForChild = function (e) {
					return this.path.isEmpty() ? new t(this.source, g.Empty) : new t(this.source, this.path.popFront())
				}, t
			}(),
			xe = function () {
				function t(t, e, n) {
					this.source = t, this.path = e, this.snap = n, this.type = Qt.OVERWRITE
				}
				return t.prototype.operationForChild = function (e) {
					return this.path.isEmpty() ? new t(this.source, g.Empty, this.snap.getImmediateChild(e)) : new t(this.source, this.path.popFront(), this.snap)
				}, t
			}(),
			Ue = n(0),
			Fe = function () {
				function t(t, e, n) {
					this.source = t, this.path = e, this.children = n, this.type = Qt.MERGE
				}
				return t.prototype.operationForChild = function (e) {
					if (this.path.isEmpty()) {
						var n = this.children.subtree(new g(e));
						return n.isEmpty() ? null : n.value ? new xe(this.source, g.Empty, n.value) : new t(this.source, g.Empty, n)
					}
					return Object(Ue.a)(this.path.getFront() === e, "Can't get a merge for a child not on the path of the operation"), new t(this.source, this.path.popFront(), this.children)
				}, t.prototype.toString = function () {
					return "Operation(" + this.path + ": " + this.source + " merge: " + this.children + ")"
				}, t
			}(),
			Me = function () {
				function t(t, e, n) {
					this.zt = t, this.pe = e, this.de = n
				}
				return t.prototype.isFullyInitialized = function () {
					return this.pe
				}, t.prototype.isFiltered = function () {
					return this.de
				}, t.prototype.isCompleteForPath = function (t) {
					if (t.isEmpty()) return this.isFullyInitialized() && !this.de;
					var e = t.getFront();
					return this.isCompleteForChild(e)
				}, t.prototype.isCompleteForChild = function (t) {
					return this.isFullyInitialized() && !this.de || this.zt.hasChild(t)
				}, t.prototype.getNode = function () {
					return this.zt
				}, t
			}(),
			Ve = function () {
				function t(t, e) {
					this.fe = t, this._e = e
				}
				return t.prototype.updateEventSnap = function (e, n, r) {
					return new t(new Me(e, n, r), this._e)
				}, t.prototype.updateServerSnap = function (e, n, r) {
					return new t(this.fe, new Me(e, n, r))
				}, t.prototype.getEventCache = function () {
					return this.fe
				}, t.prototype.getCompleteEventSnap = function () {
					return this.fe.isFullyInitialized() ? this.fe.getNode() : null
				}, t.prototype.getServerCache = function () {
					return this._e
				}, t.prototype.getCompleteServerSnap = function () {
					return this._e.isFullyInitialized() ? this._e.getNode() : null
				}, t.Empty = new t(new Me(Bt.EMPTY_NODE, !1, !1), new Me(Bt.EMPTY_NODE, !1, !1)), t
			}(),
			We = function () {
				function t(t, e, n, r, i) {
					this.type = t, this.snapshotNode = e, this.childName = n, this.oldSnap = r, this.prevName = i
				}
				return t.valueChange = function (e) {
					return new t(t.VALUE, e)
				}, t.childAddedChange = function (e, n) {
					return new t(t.CHILD_ADDED, n, e)
				}, t.childRemovedChange = function (e, n) {
					return new t(t.CHILD_REMOVED, n, e)
				}, t.childChangedChange = function (e, n, r) {
					return new t(t.CHILD_CHANGED, n, e, r)
				}, t.childMovedChange = function (e, n) {
					return new t(t.CHILD_MOVED, n, e)
				}, t.CHILD_ADDED = "child_added", t.CHILD_REMOVED = "child_removed", t.CHILD_CHANGED = "child_changed", t.CHILD_MOVED = "child_moved", t.VALUE = "value", t
			}(),
			Be = n(0),
			Xe = function () {
				function t(t) {
					this.Xt = t
				}
				return t.prototype.updateChild = function (t, e, n, r, i, o) {
					Object(Be.a)(t.isIndexed(this.Xt), "A node must be indexed if only a child is updated");
					var s = t.getImmediateChild(e);
					return s.getChild(r).equals(n.getChild(r)) && s.isEmpty() == n.isEmpty() ? t : (null != o && (n.isEmpty() ? t.hasChild(e) ? o.trackChildChange(We.childRemovedChange(e, s)) : Object(Be.a)(t.isLeafNode(), "A child remove without an old child only makes sense on a leaf node") : s.isEmpty() ? o.trackChildChange(We.childAddedChange(e, n)) : o.trackChildChange(We.childChangedChange(e, n, s))), t.isLeafNode() && n.isEmpty() ? t : t.updateImmediateChild(e, n).withIndex(this.Xt))
				}, t.prototype.updateFullNode = function (t, e, n) {
					return null != n && (t.isLeafNode() || t.forEachChild(St, function (t, r) {
						e.hasChild(t) || n.trackChildChange(We.childRemovedChange(t, r))
					}), e.isLeafNode() || e.forEachChild(St, function (e, r) {
						if (t.hasChild(e)) {
							var i = t.getImmediateChild(e);
							i.equals(r) || n.trackChildChange(We.childChangedChange(e, r, i))
						} else n.trackChildChange(We.childAddedChange(e, r))
					})), e.withIndex(this.Xt)
				}, t.prototype.updatePriority = function (t, e) {
					return t.isEmpty() ? Bt.EMPTY_NODE : t.updatePriority(e)
				}, t.prototype.filtersNodes = function () {
					return !1
				}, t.prototype.getIndexedFilter = function () {
					return this
				}, t.prototype.getIndex = function () {
					return this.Xt
				}, t
			}(),
			He = n(2),
			qe = n(0),
			Ke = function () {
				function t() {
					this.ye = {}
				}
				return t.prototype.trackChildChange = function (t) {
					var e = t.type,
						n = t.childName;
					Object(qe.a)(e == We.CHILD_ADDED || e == We.CHILD_CHANGED || e == We.CHILD_REMOVED, "Only child changes supported for tracking"), Object(qe.a)(".priority" !== n, "Only non-priority child changes can be tracked.");
					var r = Object(He.l)(this.ye, n);
					if (r) {
						var i = r.type;
						if (e == We.CHILD_ADDED && i == We.CHILD_REMOVED) this.ye[n] = We.childChangedChange(n, t.snapshotNode, r.snapshotNode);
						else if (e == We.CHILD_REMOVED && i == We.CHILD_ADDED) delete this.ye[n];
						else if (e == We.CHILD_REMOVED && i == We.CHILD_CHANGED) this.ye[n] = We.childRemovedChange(n, r.oldSnap);
						else if (e == We.CHILD_CHANGED && i == We.CHILD_ADDED) this.ye[n] = We.childAddedChange(n, t.snapshotNode);
						else {
							if (e != We.CHILD_CHANGED || i != We.CHILD_CHANGED) throw Object(qe.b)("Illegal combination of changes: " + t + " occurred after " + r);
							this.ye[n] = We.childChangedChange(n, t.snapshotNode, r.oldSnap)
						}
					} else this.ye[n] = t
				}, t.prototype.getChanges = function () {
					return Object(He.i)(this.ye)
				}, t
			}(),
			ze = new(function () {
				function t() {}
				return t.prototype.getCompleteChild = function (t) {
					return null
				}, t.prototype.getChildAfterChild = function (t, e, n) {
					return null
				}, t
			}()),
			Ge = function () {
				function t(t, e, n) {
					void 0 === n && (n = null), this.ve = t, this.ge = e, this.me = n
				}
				return t.prototype.getCompleteChild = function (t) {
					var e = this.ge.getEventCache();
					if (e.isCompleteForChild(t)) return e.getNode().getImmediateChild(t);
					var n = null != this.me ? new Me(this.me, !0, !1) : this.ge.getServerCache();
					return this.ve.calcCompleteChild(t, n)
				}, t.prototype.getChildAfterChild = function (t, e, n) {
					var r = null != this.me ? this.me : this.ge.getCompleteServerSnap(),
						i = this.ve.calcIndexedSlice(r, e, 1, n, t);
					return 0 === i.length ? null : i[0]
				}, t
			}(),
			Qe = n(0),
			Ye = function () {
				return function (t, e) {
					this.viewCache = t, this.changes = e
				}
			}(),
			$e = function () {
				function t(t) {
					this.be = t
				}
				return t.prototype.assertIndexed = function (t) {
					Object(Qe.a)(t.getEventCache().getNode().isIndexed(this.be.getIndex()), "Event snap not indexed"), Object(Qe.a)(t.getServerCache().getNode().isIndexed(this.be.getIndex()), "Server snap not indexed")
				}, t.prototype.applyOperation = function (e, n, r, i) {
					var o, s, a = new Ke;
					if (n.type === Qt.OVERWRITE) {
						var u = n;
						u.source.fromUser ? o = this.Ce(e, u.path, u.snap, r, i, a) : (Object(Qe.a)(u.source.fromServer, "Unknown source."), s = u.source.tagged || e.getServerCache().isFiltered() && !u.path.isEmpty(), o = this.Ee(e, u.path, u.snap, r, i, s, a))
					} else if (n.type === Qt.MERGE) {
						var c = n;
						c.source.fromUser ? o = this.we(e, c.path, c.children, r, i, a) : (Object(Qe.a)(c.source.fromServer, "Unknown source."), s = c.source.tagged || e.getServerCache().isFiltered(), o = this.Oe(e, c.path, c.children, r, i, s, a))
					} else if (n.type === Qt.ACK_USER_WRITE) {
						var h = n;
						o = h.revert ? this.Se(e, h.path, r, i, a) : this.Te(e, h.path, h.affectedTree, r, i, a)
					} else {
						if (n.type !== Qt.LISTEN_COMPLETE) throw Object(Qe.b)("Unknown operation type: " + n.type);
						o = this.Ne(e, n.path, r, a)
					}
					var l = a.getChanges();
					return t.Ie(e, o, l), new Ye(o, l)
				}, t.Ie = function (t, e, n) {
					var r = e.getEventCache();
					if (r.isFullyInitialized()) {
						var i = r.getNode().isLeafNode() || r.getNode().isEmpty(),
							o = t.getCompleteEventSnap();
						(n.length > 0 || !t.getEventCache().isFullyInitialized() || i && !r.getNode().equals(o) || !r.getNode().getPriority().equals(o.getPriority())) && n.push(We.valueChange(e.getCompleteEventSnap()))
					}
				}, t.prototype.Pe = function (t, e, n, r, i) {
					var o = t.getEventCache();
					if (null != n.shadowingWrite(e)) return t;
					var s = void 0,
						a = void 0;
					if (e.isEmpty())
						if (Object(Qe.a)(t.getServerCache().isFullyInitialized(), "If change path is empty, we must have complete server data"), t.getServerCache().isFiltered()) {
							var u = t.getCompleteServerSnap(),
								c = u instanceof Bt ? u : Bt.EMPTY_NODE,
								h = n.calcCompleteEventChildren(c);
							s = this.be.updateFullNode(t.getEventCache().getNode(), h, i)
						} else {
							var l = n.calcCompleteEventCache(t.getCompleteServerSnap());
							s = this.be.updateFullNode(t.getEventCache().getNode(), l, i)
						}
					else {
						var f = e.getFront();
						if (".priority" == f) {
							Object(Qe.a)(1 == e.getLength(), "Can't have a priority with additional path components");
							var p = o.getNode();
							a = t.getServerCache().getNode();
							var d = n.calcEventCacheAfterServerOverwrite(e, p, a);
							s = null != d ? this.be.updatePriority(p, d) : o.getNode()
						} else {
							var v = e.popFront(),
								y = void 0;
							if (o.isCompleteForChild(f)) {
								a = t.getServerCache().getNode();
								var g = n.calcEventCacheAfterServerOverwrite(e, o.getNode(), a);
								y = null != g ? o.getNode().getImmediateChild(f).updateChild(v, g) : o.getNode().getImmediateChild(f)
							} else y = n.calcCompleteChild(f, t.getServerCache());
							s = null != y ? this.be.updateChild(o.getNode(), f, y, v, r, i) : o.getNode()
						}
					}
					return t.updateEventSnap(s, o.isFullyInitialized() || e.isEmpty(), this.be.filtersNodes())
				}, t.prototype.Ee = function (t, e, n, r, i, o, s) {
					var a, u = t.getServerCache(),
						c = o ? this.be : this.be.getIndexedFilter();
					if (e.isEmpty()) a = c.updateFullNode(u.getNode(), n, null);
					else if (c.filtersNodes() && !u.isFiltered()) {
						var h = u.getNode().updateChild(e, n);
						a = c.updateFullNode(u.getNode(), h, null)
					} else {
						var l = e.getFront();
						if (!u.isCompleteForPath(e) && e.getLength() > 1) return t;
						var f = e.popFront(),
							p = u.getNode().getImmediateChild(l).updateChild(f, n);
						a = ".priority" == l ? c.updatePriority(u.getNode(), p) : c.updateChild(u.getNode(), l, p, f, ze, null)
					}
					var d = t.updateServerSnap(a, u.isFullyInitialized() || e.isEmpty(), c.filtersNodes()),
						v = new Ge(r, d, i);
					return this.Pe(d, e, r, v, s)
				}, t.prototype.Ce = function (t, e, n, r, i, o) {
					var s, a, u = t.getEventCache(),
						c = new Ge(r, t, i);
					if (e.isEmpty()) a = this.be.updateFullNode(t.getEventCache().getNode(), n, o), s = t.updateEventSnap(a, !0, this.be.filtersNodes());
					else {
						var h = e.getFront();
						if (".priority" === h) a = this.be.updatePriority(t.getEventCache().getNode(), n), s = t.updateEventSnap(a, u.isFullyInitialized(), u.isFiltered());
						else {
							var l = e.popFront(),
								f = u.getNode().getImmediateChild(h),
								p = void 0;
							if (l.isEmpty()) p = n;
							else {
								var d = c.getCompleteChild(h);
								p = null != d ? ".priority" === l.getBack() && d.getChild(l.parent()).isEmpty() ? d : d.updateChild(l, n) : Bt.EMPTY_NODE
							}
							if (f.equals(p)) s = t;
							else {
								var v = this.be.updateChild(u.getNode(), h, p, l, c, o);
								s = t.updateEventSnap(v, u.isFullyInitialized(), this.be.filtersNodes())
							}
						}
					}
					return s
				}, t.Re = function (t, e) {
					return t.getEventCache().isCompleteForChild(e)
				}, t.prototype.we = function (e, n, r, i, o, s) {
					var a = this,
						u = e;
					return r.foreach(function (r, c) {
						var h = n.child(r);
						t.Re(e, h.getFront()) && (u = a.Ce(u, h, c, i, o, s))
					}), r.foreach(function (r, c) {
						var h = n.child(r);
						t.Re(e, h.getFront()) || (u = a.Ce(u, h, c, i, o, s))
					}), u
				}, t.prototype.De = function (t, e) {
					return e.foreach(function (e, n) {
						t = t.updateChild(e, n)
					}), t
				}, t.prototype.Oe = function (t, e, n, r, i, o, s) {
					var a = this;
					if (t.getServerCache().getNode().isEmpty() && !t.getServerCache().isFullyInitialized()) return t;
					var u, c = t;
					u = e.isEmpty() ? n : je.Empty.setTree(e, n);
					var h = t.getServerCache().getNode();
					return u.children.inorderTraversal(function (e, n) {
						if (h.hasChild(e)) {
							var u = t.getServerCache().getNode().getImmediateChild(e),
								l = a.De(u, n);
							c = a.Ee(c, new g(e), l, r, i, o, s)
						}
					}), u.children.inorderTraversal(function (e, n) {
						var u = !t.getServerCache().isCompleteForChild(e) && null == n.value;
						if (!h.hasChild(e) && !u) {
							var l = t.getServerCache().getNode().getImmediateChild(e),
								f = a.De(l, n);
							c = a.Ee(c, new g(e), f, r, i, o, s)
						}
					}), c
				}, t.prototype.Te = function (t, e, n, r, i, o) {
					if (null != r.shadowingWrite(e)) return t;
					var s = t.getServerCache().isFiltered(),
						a = t.getServerCache();
					if (null != n.value) {
						if (e.isEmpty() && a.isFullyInitialized() || a.isCompleteForPath(e)) return this.Ee(t, e, a.getNode().getChild(e), r, i, s, o);
						if (e.isEmpty()) {
							var u = je.Empty;
							return a.getNode().forEachChild(pt, function (t, e) {
								u = u.set(new g(t), e)
							}), this.Oe(t, e, u, r, i, s, o)
						}
						return t
					}
					var c = je.Empty;
					return n.foreach(function (t, n) {
						var r = e.child(t);
						a.isCompleteForPath(r) && (c = c.set(t, a.getNode().getChild(r)))
					}), this.Oe(t, e, c, r, i, s, o)
				}, t.prototype.Ne = function (t, e, n, r) {
					var i = t.getServerCache(),
						o = t.updateServerSnap(i.getNode(), i.isFullyInitialized() || e.isEmpty(), i.isFiltered());
					return this.Pe(o, e, n, ze, r)
				}, t.prototype.Se = function (t, e, n, r, i) {
					var o;
					if (null != n.shadowingWrite(e)) return t;
					var s = new Ge(n, t, r),
						a = t.getEventCache().getNode(),
						u = void 0;
					if (e.isEmpty() || ".priority" === e.getFront()) {
						var c = void 0;
						if (t.getServerCache().isFullyInitialized()) c = n.calcCompleteEventCache(t.getCompleteServerSnap());
						else {
							var h = t.getServerCache().getNode();
							Object(Qe.a)(h instanceof Bt, "serverChildren would be complete if leaf node"), c = n.calcCompleteEventChildren(h)
						}
						c = c, u = this.be.updateFullNode(a, c, i)
					} else {
						var l = e.getFront(),
							f = n.calcCompleteChild(l, t.getServerCache());
						null == f && t.getServerCache().isCompleteForChild(l) && (f = a.getImmediateChild(l)), (u = null != f ? this.be.updateChild(a, l, f, e.popFront(), s, i) : t.getEventCache().getNode().hasChild(l) ? this.be.updateChild(a, l, Bt.EMPTY_NODE, e.popFront(), s, i) : a).isEmpty() && t.getServerCache().isFullyInitialized() && (o = n.calcCompleteEventCache(t.getCompleteServerSnap())).isLeafNode() && (u = this.be.updateFullNode(u, o, i))
					}
					return o = t.getServerCache().isFullyInitialized() || null != n.shadowingWrite(g.Empty), t.updateEventSnap(u, o, this.be.filtersNodes())
				}, t
			}(),
			Je = n(0),
			Ze = function () {
				function t(t) {
					this.je = t, this.Xt = this.je.getQueryParams().getIndex()
				}
				return t.prototype.generateEventsForChanges = function (t, e, n) {
					var r = this,
						i = [],
						o = [];
					return t.forEach(function (t) {
						t.type === We.CHILD_CHANGED && r.Xt.indexedValueChanged(t.oldSnap, t.snapshotNode) && o.push(We.childMovedChange(t.childName, t.snapshotNode))
					}), this.xe(i, We.CHILD_REMOVED, t, n, e), this.xe(i, We.CHILD_ADDED, t, n, e), this.xe(i, We.CHILD_MOVED, o, n, e), this.xe(i, We.CHILD_CHANGED, t, n, e), this.xe(i, We.VALUE, t, n, e), i
				}, t.prototype.xe = function (t, e, n, r, i) {
					var o = this,
						s = n.filter(function (t) {
							return t.type === e
						});
					s.sort(this.ke.bind(this)), s.forEach(function (e) {
						var n = o.Fe(e, i);
						r.forEach(function (r) {
							r.respondsTo(e.type) && t.push(r.createEvent(n, o.je))
						})
					})
				}, t.prototype.Fe = function (t, e) {
					return "value" === t.type || "child_removed" === t.type ? t : (t.prevName = e.getPredecessorChildName(t.childName, t.snapshotNode, this.Xt), t)
				}, t.prototype.ke = function (t, e) {
					if (null == t.childName || null == e.childName) throw Object(Je.b)("Should only compare child_ events.");
					var n = new st(t.childName, t.snapshotNode),
						r = new st(e.childName, e.snapshotNode);
					return this.Xt.compare(n, r)
				}, t
			}(),
			tn = n(0),
			en = function () {
				function t(t, e) {
					this.je = t, this.Ae = [];
					var n = this.je.getQueryParams(),
						r = new Xe(n.getIndex()),
						i = n.getNodeFilter();
					this.Le = new $e(i);
					var o = e.getServerCache(),
						s = e.getEventCache(),
						a = r.updateFullNode(Bt.EMPTY_NODE, o.getNode(), null),
						u = i.updateFullNode(Bt.EMPTY_NODE, s.getNode(), null),
						c = new Me(a, o.isFullyInitialized(), r.filtersNodes()),
						h = new Me(u, s.isFullyInitialized(), i.filtersNodes());
					this.ge = new Ve(h, c), this.Me = new Ze(this.je)
				}
				return t.prototype.getQuery = function () {
					return this.je
				}, t.prototype.getServerCache = function () {
					return this.ge.getServerCache().getNode()
				}, t.prototype.getCompleteServerCache = function (t) {
					var e = this.ge.getCompleteServerSnap();
					return e && (this.je.getQueryParams().loadsAllData() || !t.isEmpty() && !e.getImmediateChild(t.getFront()).isEmpty()) ? e.getChild(t) : null
				}, t.prototype.isEmpty = function () {
					return 0 === this.Ae.length
				}, t.prototype.addEventRegistration = function (t) {
					this.Ae.push(t)
				}, t.prototype.removeEventRegistration = function (t, e) {
					var n = [];
					if (e) {
						Object(tn.a)(null == t, "A cancel should cancel all event registrations.");
						var r = this.je.path;
						this.Ae.forEach(function (t) {
							e = e;
							var i = t.createCancelEvent(e, r);
							i && n.push(i)
						})
					}
					if (t) {
						for (var i = [], o = 0; o < this.Ae.length; ++o) {
							var s = this.Ae[o];
							if (s.matches(t)) {
								if (t.hasAnyCallback()) {
									i = i.concat(this.Ae.slice(o + 1));
									break
								}
							} else i.push(s)
						}
						this.Ae = i
					} else this.Ae = [];
					return n
				}, t.prototype.applyOperation = function (t, e, n) {
					t.type === Qt.MERGE && null !== t.source.queryId && (Object(tn.a)(this.ge.getCompleteServerSnap(), "We should always have a full cache before handling merges"), Object(tn.a)(this.ge.getCompleteEventSnap(), "Missing event cache, even though we have a server cache"));
					var r = this.ge,
						i = this.Le.applyOperation(r, t, e, n);
					return this.Le.assertIndexed(i.viewCache), Object(tn.a)(i.viewCache.getServerCache().isFullyInitialized() || !r.getServerCache().isFullyInitialized(), "Once a server snap is complete, it should never go back"), this.ge = i.viewCache, this.We(i.changes, i.viewCache.getEventCache().getNode(), null)
				}, t.prototype.getInitialEvents = function (t) {
					var e = this.ge.getEventCache(),
						n = [];
					return e.getNode().isLeafNode() || e.getNode().forEachChild(St, function (t, e) {
						n.push(We.childAddedChange(t, e))
					}), e.isFullyInitialized() && n.push(We.valueChange(e.getNode())), this.We(n, e.getNode(), t)
				}, t.prototype.We = function (t, e, n) {
					var r = n ? [n] : this.Ae;
					return this.Me.generateEventsForChanges(t, e, r)
				}, t
			}(),
			nn = n(0),
			rn = n(2),
			on = function () {
				function t() {
					this.qe = {}
				}
				return Object.defineProperty(t, "__referenceConstructor", {
					get: function () {
						return Object(nn.a)(Ae, "Reference.ts has not been loaded"), Ae
					},
					set: function (t) {
						Object(nn.a)(!Ae, "__referenceConstructor has already been defined"), Ae = t
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.isEmpty = function () {
					return Object(rn.j)(this.qe)
				}, t.prototype.applyOperation = function (t, e, n) {
					var r = t.source.queryId;
					if (null !== r) {
						var i = Object(rn.l)(this.qe, r);
						return Object(nn.a)(null != i, "SyncTree gave us an op for an invalid query."), i.applyOperation(t, e, n)
					}
					var o = [];
					return Object(rn.f)(this.qe, function (r, i) {
						o = o.concat(i.applyOperation(t, e, n))
					}), o
				}, t.prototype.addEventRegistration = function (t, e, n, r, i) {
					var o = t.queryIdentifier(),
						s = Object(rn.l)(this.qe, o);
					if (!s) {
						var a = n.calcCompleteEventCache(i ? r : null),
							u = !1;
						a ? u = !0 : r instanceof Bt ? (a = n.calcCompleteEventChildren(r), u = !1) : (a = Bt.EMPTY_NODE, u = !1);
						var c = new Ve(new Me(a, u, !1), new Me(r, i, !1));
						s = new en(t, c), this.qe[o] = s
					}
					return s.addEventRegistration(e), s.getInitialEvents(e)
				}, t.prototype.removeEventRegistration = function (e, n, r) {
					var i = e.queryIdentifier(),
						o = [],
						s = [],
						a = this.hasCompleteView();
					if ("default" === i) {
						var u = this;
						Object(rn.f)(this.qe, function (t, e) {
							s = s.concat(e.removeEventRegistration(n, r)), e.isEmpty() && (delete u.qe[t], e.getQuery().getQueryParams().loadsAllData() || o.push(e.getQuery()))
						})
					} else {
						var c = Object(rn.l)(this.qe, i);
						c && (s = s.concat(c.removeEventRegistration(n, r)), c.isEmpty() && (delete this.qe[i], c.getQuery().getQueryParams().loadsAllData() || o.push(c.getQuery())))
					}
					return a && !this.hasCompleteView() && o.push(new t.se(e.repo, e.path)), {
						removed: o,
						events: s
					}
				}, t.prototype.getQueryViews = function () {
					var t = this;
					return Object.keys(this.qe).map(function (e) {
						return t.qe[e]
					}).filter(function (t) {
						return !t.getQuery().getQueryParams().loadsAllData()
					})
				}, t.prototype.getCompleteServerCache = function (t) {
					var e = null;
					return Object(rn.f)(this.qe, function (n, r) {
						e = e || r.getCompleteServerCache(t)
					}), e
				}, t.prototype.viewForQuery = function (t) {
					if (t.getQueryParams().loadsAllData()) return this.getCompleteView();
					var e = t.queryIdentifier();
					return Object(rn.l)(this.qe, e)
				}, t.prototype.viewExistsForQuery = function (t) {
					return null != this.viewForQuery(t)
				}, t.prototype.hasCompleteView = function () {
					return null != this.getCompleteView()
				}, t.prototype.getCompleteView = function () {
					return Object(rn.e)(this.qe, function (t) {
						return t.getQuery().getQueryParams().loadsAllData()
					}) || null
				}, t
			}(),
			sn = n(2),
			an = n(0),
			un = function () {
				function t(t) {
					this.Qe = t
				}
				return t.prototype.addWrite = function (e, n) {
					if (e.isEmpty()) return new t(new je(n));
					var r = this.Qe.findRootMostValueAndPath(e);
					if (null != r) {
						var i = r.path,
							o = r.value,
							s = g.relativePath(i, e);
						return o = o.updateChild(s, n), new t(this.Qe.set(i, o))
					}
					var a = new je(n);
					return new t(this.Qe.setTree(e, a))
				}, t.prototype.addWrites = function (t, e) {
					var n = this;
					return Object(sn.f)(e, function (e, r) {
						n = n.addWrite(t.child(e), r)
					}), n
				}, t.prototype.removeWrite = function (e) {
					return e.isEmpty() ? t.Empty : new t(this.Qe.setTree(e, je.Empty))
				}, t.prototype.hasCompleteWrite = function (t) {
					return null != this.getCompleteNode(t)
				}, t.prototype.getCompleteNode = function (t) {
					var e = this.Qe.findRootMostValueAndPath(t);
					return null != e ? this.Qe.get(e.path).getChild(g.relativePath(e.path, t)) : null
				}, t.prototype.getCompleteChildren = function () {
					var t = [],
						e = this.Qe.value;
					return null != e ? e.isLeafNode() || e.forEachChild(St, function (e, n) {
						t.push(new st(e, n))
					}) : this.Qe.children.inorderTraversal(function (e, n) {
						null != n.value && t.push(new st(e, n.value))
					}), t
				}, t.prototype.childCompoundWrite = function (e) {
					if (e.isEmpty()) return this;
					var n = this.getCompleteNode(e);
					return new t(null != n ? new je(n) : this.Qe.subtree(e))
				}, t.prototype.isEmpty = function () {
					return this.Qe.isEmpty()
				}, t.prototype.apply = function (e) {
					return t.Ue(g.Empty, this.Qe, e)
				}, t.Empty = new t(new je(null)), t.Ue = function (e, n, r) {
					if (null != n.value) return r.updateChild(e, n.value);
					var i = null;
					return n.children.inorderTraversal(function (n, o) {
						".priority" === n ? (Object(an.a)(null !== o.value, "Priority writes must always be leaf nodes"), i = o.value) : r = t.Ue(e.child(n), o, r)
					}), r.getChild(e).isEmpty() || null === i || (r = r.updateChild(e.child(".priority"), i)), r
				}, t
			}(),
			cn = n(2),
			hn = n(0),
			ln = function () {
				function t() {
					this.Ve = un.Empty, this.Be = [], this.He = -1
				}
				return t.prototype.childWrites = function (t) {
					return new fn(t, this)
				}, t.prototype.addOverwrite = function (t, e, n, r) {
					Object(hn.a)(n > this.He, "Stacking an older write on top of newer ones"), void 0 === r && (r = !0), this.Be.push({
						path: t,
						snap: e,
						writeId: n,
						visible: r
					}), r && (this.Ve = this.Ve.addWrite(t, e)), this.He = n
				}, t.prototype.addMerge = function (t, e, n) {
					Object(hn.a)(n > this.He, "Stacking an older merge on top of newer ones"), this.Be.push({
						path: t,
						children: e,
						writeId: n,
						visible: !0
					}), this.Ve = this.Ve.addWrites(t, e), this.He = n
				}, t.prototype.getWrite = function (t) {
					for (var e = 0; e < this.Be.length; e++) {
						var n = this.Be[e];
						if (n.writeId === t) return n
					}
					return null
				}, t.prototype.removeWrite = function (t) {
					var e = this,
						n = this.Be.findIndex(function (e) {
							return e.writeId === t
						});
					Object(hn.a)(n >= 0, "removeWrite called with nonexistent writeId.");
					var r = this.Be[n];
					this.Be.splice(n, 1);
					for (var i = r.visible, o = !1, s = this.Be.length - 1; i && s >= 0;) {
						var a = this.Be[s];
						a.visible && (s >= n && this.Ke(a, r.path) ? i = !1 : r.path.contains(a.path) && (o = !0)), s--
					}
					if (i) {
						if (o) return this.Ye(), !0;
						if (r.snap) this.Ve = this.Ve.removeWrite(r.path);
						else {
							var u = r.children;
							Object(cn.f)(u, function (t) {
								e.Ve = e.Ve.removeWrite(r.path.child(t))
							})
						}
						return !0
					}
					return !1
				}, t.prototype.getCompleteWriteData = function (t) {
					return this.Ve.getCompleteNode(t)
				}, t.prototype.calcCompleteEventCache = function (e, n, r, i) {
					if (r || i) {
						var o = this.Ve.childCompoundWrite(e);
						if (!i && o.isEmpty()) return n;
						if (i || null != n || o.hasCompleteWrite(g.Empty)) {
							var s = t.ze(this.Be, function (t) {
									return (t.visible || i) && (!r || !~r.indexOf(t.writeId)) && (t.path.contains(e) || e.contains(t.path))
								}, e),
								a = n || Bt.EMPTY_NODE;
							return s.apply(a)
						}
						return null
					}
					var u = this.Ve.getCompleteNode(e);
					if (null != u) return u;
					var c = this.Ve.childCompoundWrite(e);
					if (c.isEmpty()) return n;
					if (null != n || c.hasCompleteWrite(g.Empty)) {
						a = n || Bt.EMPTY_NODE;
						return c.apply(a)
					}
					return null
				}, t.prototype.calcCompleteEventChildren = function (t, e) {
					var n = Bt.EMPTY_NODE,
						r = this.Ve.getCompleteNode(t);
					if (r) return r.isLeafNode() || r.forEachChild(St, function (t, e) {
						n = n.updateImmediateChild(t, e)
					}), n;
					if (e) {
						var i = this.Ve.childCompoundWrite(t);
						return e.forEachChild(St, function (t, e) {
							var r = i.childCompoundWrite(new g(t)).apply(e);
							n = n.updateImmediateChild(t, r)
						}), i.getCompleteChildren().forEach(function (t) {
							n = n.updateImmediateChild(t.name, t.node)
						}), n
					}
					return this.Ve.childCompoundWrite(t).getCompleteChildren().forEach(function (t) {
						n = n.updateImmediateChild(t.name, t.node)
					}), n
				}, t.prototype.calcEventCacheAfterServerOverwrite = function (t, e, n, r) {
					Object(hn.a)(n || r, "Either existingEventSnap or existingServerSnap must exist");
					var i = t.child(e);
					if (this.Ve.hasCompleteWrite(i)) return null;
					var o = this.Ve.childCompoundWrite(i);
					return o.isEmpty() ? r.getChild(e) : o.apply(r.getChild(e))
				}, t.prototype.calcCompleteChild = function (t, e, n) {
					var r = t.child(e),
						i = this.Ve.getCompleteNode(r);
					return null != i ? i : n.isCompleteForChild(e) ? this.Ve.childCompoundWrite(r).apply(n.getNode().getImmediateChild(e)) : null
				}, t.prototype.shadowingWrite = function (t) {
					return this.Ve.getCompleteNode(t)
				}, t.prototype.calcIndexedSlice = function (t, e, n, r, i, o) {
					var s, a = this.Ve.childCompoundWrite(t),
						u = a.getCompleteNode(g.Empty);
					if (null != u) s = u;
					else {
						if (null == e) return [];
						s = a.apply(e)
					}
					if ((s = s.withIndex(o)).isEmpty() || s.isLeafNode()) return [];
					for (var c = [], h = o.getCompare(), l = i ? s.getReverseIteratorFrom(n, o) : s.getIteratorFrom(n, o), f = l.getNext(); f && c.length < r;) 0 !== h(f, n) && c.push(f), f = l.getNext();
					return c
				}, t.prototype.Ke = function (t, e) {
					return t.snap ? t.path.contains(e) : !!Object(cn.d)(t.children, function (n, r) {
						return t.path.child(r).contains(e)
					})
				}, t.prototype.Ye = function () {
					this.Ve = t.ze(this.Be, t.Ge, g.Empty), this.Be.length > 0 ? this.He = this.Be[this.Be.length - 1].writeId : this.He = -1
				}, t.Ge = function (t) {
					return t.visible
				}, t.ze = function (t, e, n) {
					for (var r = un.Empty, i = 0; i < t.length; ++i) {
						var o = t[i];
						if (e(o)) {
							var s = o.path,
								a = void 0;
							if (o.snap) n.contains(s) ? (a = g.relativePath(n, s), r = r.addWrite(a, o.snap)) : s.contains(n) && (a = g.relativePath(s, n), r = r.addWrite(g.Empty, o.snap.getChild(a)));
							else {
								if (!o.children) throw Object(hn.b)("WriteRecord should have .snap or .children");
								if (n.contains(s)) a = g.relativePath(n, s), r = r.addWrites(a, o.children);
								else if (s.contains(n))
									if ((a = g.relativePath(s, n)).isEmpty()) r = r.addWrites(g.Empty, o.children);
									else {
										var u = Object(cn.l)(o.children, a.getFront());
										if (u) {
											var c = u.getChild(a.popFront());
											r = r.addWrite(g.Empty, c)
										}
									}
							}
						}
					}
					return r
				}, t
			}(),
			fn = function () {
				function t(t, e) {
					this.Xe = t, this.Qe = e
				}
				return t.prototype.calcCompleteEventCache = function (t, e, n) {
					return this.Qe.calcCompleteEventCache(this.Xe, t, e, n)
				}, t.prototype.calcCompleteEventChildren = function (t) {
					return this.Qe.calcCompleteEventChildren(this.Xe, t)
				}, t.prototype.calcEventCacheAfterServerOverwrite = function (t, e, n) {
					return this.Qe.calcEventCacheAfterServerOverwrite(this.Xe, t, e, n)
				}, t.prototype.shadowingWrite = function (t) {
					return this.Qe.shadowingWrite(this.Xe.child(t))
				}, t.prototype.calcIndexedSlice = function (t, e, n, r, i) {
					return this.Qe.calcIndexedSlice(this.Xe, t, e, n, r, i)
				}, t.prototype.calcCompleteChild = function (t, e) {
					return this.Qe.calcCompleteChild(this.Xe, t, e)
				}, t.prototype.child = function (e) {
					return new t(this.Xe.child(e), this.Qe)
				}, t
			}(),
			pn = n(0),
			dn = n(1),
			vn = n(2),
			yn = function () {
				function t(t) {
					this.$e = t, this.Je = je.Empty, this.Ze = new ln, this.tn = {}, this.en = {}
				}
				return t.prototype.applyUserOverwrite = function (t, e, n, r) {
					return this.Ze.addOverwrite(t, e, n, r), r ? this.nn(new xe(Ne.User, t, e)) : []
				}, t.prototype.applyUserMerge = function (t, e, n) {
					this.Ze.addMerge(t, e, n);
					var r = je.fromObject(e);
					return this.nn(new Fe(Ne.User, t, r))
				}, t.prototype.ackUserWrite = function (t, e) {
					void 0 === e && (e = !1);
					var n = this.Ze.getWrite(t);
					if (this.Ze.removeWrite(t)) {
						var r = je.Empty;
						return null != n.snap ? r = r.set(g.Empty, !0) : Object(vn.f)(n.children, function (t, e) {
							r = r.set(new g(t), e)
						}), this.nn(new ke(n.path, r, e))
					}
					return []
				}, t.prototype.applyServerOverwrite = function (t, e) {
					return this.nn(new xe(Ne.Server, t, e))
				}, t.prototype.applyServerMerge = function (t, e) {
					var n = je.fromObject(e);
					return this.nn(new Fe(Ne.Server, t, n))
				}, t.prototype.applyListenComplete = function (t) {
					return this.nn(new Le(Ne.Server, t))
				}, t.prototype.applyTaggedQueryOverwrite = function (e, n, r) {
					var i = this.rn(r);
					if (null != i) {
						var o = t.in(i),
							s = o.path,
							a = o.queryId,
							u = g.relativePath(s, e),
							c = new xe(Ne.forServerTaggedQuery(a), u, n);
						return this.sn(s, c)
					}
					return []
				}, t.prototype.applyTaggedQueryMerge = function (e, n, r) {
					var i = this.rn(r);
					if (i) {
						var o = t.in(i),
							s = o.path,
							a = o.queryId,
							u = g.relativePath(s, e),
							c = je.fromObject(n),
							h = new Fe(Ne.forServerTaggedQuery(a), u, c);
						return this.sn(s, h)
					}
					return []
				}, t.prototype.applyTaggedListenComplete = function (e, n) {
					var r = this.rn(n);
					if (r) {
						var i = t.in(r),
							o = i.path,
							s = i.queryId,
							a = g.relativePath(o, e),
							u = new Le(Ne.forServerTaggedQuery(s), a);
						return this.sn(o, u)
					}
					return []
				}, t.prototype.addEventRegistration = function (e, n) {
					var r = e.path,
						i = null,
						o = !1;
					this.Je.foreachOnPath(r, function (t, e) {
						var n = g.relativePath(t, r);
						i = i || e.getCompleteServerCache(n), o = o || e.hasCompleteView()
					});
					var s = this.Je.get(r);
					s ? (o = o || s.hasCompleteView(), i = i || s.getCompleteServerCache(g.Empty)) : (s = new on, this.Je = this.Je.set(r, s));
					var a;
					null != i ? a = !0 : (a = !1, i = Bt.EMPTY_NODE, this.Je.subtree(r).foreachChild(function (t, e) {
						var n = e.getCompleteServerCache(g.Empty);
						n && (i = i.updateImmediateChild(t, n))
					}));
					var u = s.viewExistsForQuery(e);
					if (!u && !e.getQueryParams().loadsAllData()) {
						var c = t.an(e);
						Object(pn.a)(!(c in this.en), "View does not exist, but we have a tag");
						var h = t.un();
						this.en[c] = h, this.tn["_" + h] = c
					}
					var l = this.Ze.childWrites(r),
						f = s.addEventRegistration(e, n, l, i, a);
					if (!u && !o) {
						var p = s.viewForQuery(e);
						f = f.concat(this.cn(e, p))
					}
					return f
				}, t.prototype.removeEventRegistration = function (e, n, r) {
					var i = this,
						o = e.path,
						s = this.Je.get(o),
						a = [];
					if (s && ("default" === e.queryIdentifier() || s.viewExistsForQuery(e))) {
						var u = s.removeEventRegistration(e, n, r);
						s.isEmpty() && (this.Je = this.Je.remove(o));
						var c = u.removed;
						a = u.events;
						var h = -1 !== c.findIndex(function (t) {
								return t.getQueryParams().loadsAllData()
							}),
							l = this.Je.findOnPath(o, function (t, e) {
								return e.hasCompleteView()
							});
						if (h && !l) {
							var f = this.Je.subtree(o);
							if (!f.isEmpty())
								for (var p = this.hn(f), d = 0; d < p.length; ++d) {
									var v = p[d],
										y = v.getQuery(),
										g = this.ln(v);
									this.$e.startListening(t.pn(y), this.dn(y), g.hashFn, g.onComplete)
								}
						}!l && c.length > 0 && !r && (h ? this.$e.stopListening(t.pn(e), null) : c.forEach(function (e) {
							var n = i.en[t.an(e)];
							i.$e.stopListening(t.pn(e), n)
						})), this.fn(c)
					}
					return a
				}, t.prototype.calcCompleteEventCache = function (t, e) {
					var n = this.Ze,
						r = this.Je.findOnPath(t, function (e, n) {
							var r = g.relativePath(e, t),
								i = n.getCompleteServerCache(r);
							if (i) return i
						});
					return n.calcCompleteEventCache(t, r, e, !0)
				}, t.prototype.hn = function (t) {
					return t.fold(function (t, e, n) {
						if (e && e.hasCompleteView()) return [e.getCompleteView()];
						var r = [];
						return e && (r = e.getQueryViews()), Object(vn.f)(n, function (t, e) {
							r = r.concat(e)
						}), r
					})
				}, t.prototype.fn = function (e) {
					for (var n = 0; n < e.length; ++n) {
						var r = e[n];
						if (!r.getQueryParams().loadsAllData()) {
							var i = t.an(r),
								o = this.en[i];
							delete this.en[i], delete this.tn["_" + o]
						}
					}
				}, t.pn = function (t) {
					return t.getQueryParams().loadsAllData() && !t.getQueryParams().isDefault() ? t.getRef() : t
				}, t.prototype.cn = function (e, n) {
					var r = e.path,
						i = this.dn(e),
						o = this.ln(n),
						s = this.$e.startListening(t.pn(e), i, o.hashFn, o.onComplete),
						a = this.Je.subtree(r);
					if (i) Object(pn.a)(!a.value.hasCompleteView(), "If we're adding a query, it shouldn't be shadowed");
					else
						for (var u = a.fold(function (t, e, n) {
								if (!t.isEmpty() && e && e.hasCompleteView()) return [e.getCompleteView().getQuery()];
								var r = [];
								return e && (r = r.concat(e.getQueryViews().map(function (t) {
									return t.getQuery()
								}))), Object(vn.f)(n, function (t, e) {
									r = r.concat(e)
								}), r
							}), c = 0; c < u.length; ++c) {
							var h = u[c];
							this.$e.stopListening(t.pn(h), this.dn(h))
						}
					return s
				}, t.prototype.ln = function (t) {
					var e = this,
						n = t.getQuery(),
						r = this.dn(n);
					return {
						hashFn: function () {
							return (t.getServerCache() || Bt.EMPTY_NODE).hash()
						},
						onComplete: function (t) {
							if ("ok" === t) return r ? e.applyTaggedListenComplete(n.path, r) : e.applyListenComplete(n.path);
							var i = Object(dn.l)(t, n);
							return e.removeEventRegistration(n, null, i)
						}
					}
				}, t.an = function (t) {
					return t.path + "$" + t.queryIdentifier()
				}, t.in = function (t) {
					var e = t.indexOf("$");
					return Object(pn.a)(-1 !== e && e < t.length - 1, "Bad queryKey."), {
						queryId: t.substr(e + 1),
						path: new g(t.substr(0, e))
					}
				}, t.prototype.rn = function (t) {
					return this.tn["_" + t]
				}, t.prototype.dn = function (e) {
					var n = t.an(e);
					return Object(vn.l)(this.en, n)
				}, t.un = function () {
					return t._n++
				}, t.prototype.sn = function (t, e) {
					var n = this.Je.get(t);
					Object(pn.a)(n, "Missing sync point for query tag that we're tracking");
					var r = this.Ze.childWrites(t);
					return n.applyOperation(e, r, null)
				}, t.prototype.nn = function (t) {
					return this.yn(t, this.Je, null, this.Ze.childWrites(g.Empty))
				}, t.prototype.yn = function (t, e, n, r) {
					if (t.path.isEmpty()) return this.vn(t, e, n, r);
					var i = e.get(g.Empty);
					null == n && null != i && (n = i.getCompleteServerCache(g.Empty));
					var o = [],
						s = t.path.getFront(),
						a = t.operationForChild(s),
						u = e.children.get(s);
					if (u && a) {
						var c = n ? n.getImmediateChild(s) : null,
							h = r.child(s);
						o = o.concat(this.yn(a, u, c, h))
					}
					return i && (o = o.concat(i.applyOperation(t, r, n))), o
				}, t.prototype.vn = function (t, e, n, r) {
					var i = this,
						o = e.get(g.Empty);
					null == n && null != o && (n = o.getCompleteServerCache(g.Empty));
					var s = [];
					return e.children.inorderTraversal(function (e, o) {
						var a = n ? n.getImmediateChild(e) : null,
							u = r.child(e),
							c = t.operationForChild(e);
						c && (s = s.concat(i.vn(c, o, a, u)))
					}), o && (s = s.concat(o.applyOperation(t, r, n))), s
				}, t._n = 1, t
			}(),
			gn = function () {
				function t() {
					this.gn = Bt.EMPTY_NODE
				}
				return t.prototype.getNode = function (t) {
					return this.gn.getChild(t)
				}, t.prototype.updateSnapshot = function (t, e) {
					this.gn = this.gn.updateChild(t, e)
				}, t
			}(),
			mn = n(1),
			bn = function () {
				function t(t) {
					this.mn = t
				}
				return t.prototype.getToken = function (t) {
					return this.mn.INTERNAL.getToken(t).then(null, function (t) {
						return t && "auth/token-not-initialized" === t.code ? (Object(mn.s)("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(t)
					})
				}, t.prototype.addTokenChangeListener = function (t) {
					this.mn.INTERNAL.addAuthTokenListener(t)
				}, t.prototype.removeTokenChangeListener = function (t) {
					this.mn.INTERNAL.removeAuthTokenListener(t)
				}, t.prototype.notifyForInvalidToken = function () {
					var t = 'Provided authentication credentials for the app named "' + this.mn.name + '" are invalid. This usually indicates your app was not initialized correctly. ';
					"credential" in this.mn.options ? t += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.mn.options ? t += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : t += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.', Object(mn.B)(t)
				}, t
			}(),
			wn = n(2),
			En = function () {
				function t(t) {
					this.bn = t, this.Cn = null
				}
				return t.prototype.get = function () {
					var t = this.bn.get(),
						e = Object(wn.a)(t);
					return this.Cn && Object(wn.f)(this.Cn, function (t, n) {
						e[t] = e[t] - n
					}), this.Cn = t, e
				}, t
			}(),
			On = n(2),
			In = n(1),
			Tn = 1e4,
			Cn = 3e4,
			Sn = function () {
				function t(t, e) {
					this.En = e, this.wn = {}, this.On = new En(t);
					var n = Tn + (Cn - Tn) * Math.random();
					Object(In.x)(this.Sn.bind(this), Math.floor(n))
				}
				return t.prototype.includeStat = function (t) {
					this.wn[t] = !0
				}, t.prototype.Sn = function () {
					var t = this,
						e = this.On.get(),
						n = {},
						r = !1;
					Object(On.f)(e, function (e, i) {
						i > 0 && Object(On.b)(t.wn, e) && (n[e] = i, r = !0)
					}), r && this.En.reportStats(n), Object(In.x)(this.Sn.bind(this), Math.floor(2 * Math.random() * 3e5))
				}, t
			}(),
			An = n(1),
			Nn = function () {
				function t() {
					this.Tn = [], this.Nn = 0
				}
				return t.prototype.queueEvents = function (t) {
					for (var e = null, n = 0; n < t.length; n++) {
						var r = t[n],
							i = r.getPath();
						null === e || i.equals(e.getPath()) || (this.Tn.push(e), e = null), null === e && (e = new Rn(i)), e.add(r)
					}
					e && this.Tn.push(e)
				}, t.prototype.raiseEventsAtPath = function (t, e) {
					this.queueEvents(e), this.In(function (e) {
						return e.equals(t)
					})
				}, t.prototype.raiseEventsForChangedPath = function (t, e) {
					this.queueEvents(e), this.In(function (e) {
						return e.contains(t) || t.contains(e)
					})
				}, t.prototype.In = function (t) {
					this.Nn++;
					for (var e = !0, n = 0; n < this.Tn.length; n++) {
						var r = this.Tn[n];
						r && (t(r.getPath()) ? (this.Tn[n].raise(), this.Tn[n] = null) : e = !1)
					}
					e && (this.Tn = []), this.Nn--
				}, t
			}(),
			Rn = function () {
				function t(t) {
					this.yt = t, this.Pn = []
				}
				return t.prototype.add = function (t) {
					this.Pn.push(t)
				}, t.prototype.raise = function () {
					for (var t = 0; t < this.Pn.length; t++) {
						var e = this.Pn[t];
						if (null !== e) {
							this.Pn[t] = null;
							var n = e.getEventRunner();
							An.u && Object(An.s)("event: " + e), Object(An.m)(n)
						}
					}
				}, t.prototype.getPath = function () {
					return this.yt
				}, t
			}(),
			kn = n(0),
			Pn = function () {
				function t(t) {
					this.Rn = t, this.Dn = {}, Object(kn.a)(Array.isArray(t) && t.length > 0, "Requires a non-empty array")
				}
				return t.prototype.trigger = function (t) {
					for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
					if (Array.isArray(this.Dn[t]))
						for (var r = this.Dn[t].slice(), i = 0; i < r.length; i++) r[i].callback.apply(r[i].context, e)
				}, t.prototype.on = function (t, e, n) {
					this.jn(t), this.Dn[t] = this.Dn[t] || [], this.Dn[t].push({
						callback: e,
						context: n
					});
					var r = this.getInitialEvent(t);
					r && e.apply(n, r)
				}, t.prototype.off = function (t, e, n) {
					this.jn(t);
					for (var r = this.Dn[t] || [], i = 0; i < r.length; i++)
						if (r[i].callback === e && (!n || n === r[i].context)) return void r.splice(i, 1)
				}, t.prototype.jn = function (t) {
					Object(kn.a)(this.Rn.find(function (e) {
						return e === t
					}), "Unknown event: " + t)
				}, t
			}(),
			_n = n(0),
			Dn = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			jn = function (t) {
				function e() {
					var e, n, r = t.call(this, ["visible"]) || this;
					return "undefined" != typeof document && void 0 !== document.addEventListener && (void 0 !== document.hidden ? (n = "visibilitychange", e = "hidden") : void 0 !== document.mozHidden ? (n = "mozvisibilitychange", e = "mozHidden") : void 0 !== document.msHidden ? (n = "msvisibilitychange", e = "msHidden") : void 0 !== document.webkitHidden && (n = "webkitvisibilitychange", e = "webkitHidden")), r.xn = !0, n && document.addEventListener(n, function () {
						var t = !document[e];
						t !== r.xn && (r.xn = t, r.trigger("visible", t))
					}, !1), r
				}
				return Dn(e, t), e.getInstance = function () {
					return new e
				}, e.prototype.getInitialEvent = function (t) {
					return Object(_n.a)("visible" === t, "Unknown event type: " + t), [this.xn]
				}, e
			}(Pn),
			Ln = n(0),
			xn = n(6),
			Un = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			Fn = function (t) {
				function e() {
					var e = t.call(this, ["online"]) || this;
					return e.kn = !0, "undefined" == typeof window || void 0 === window.addEventListener || Object(xn.a)() || (window.addEventListener("online", function () {
						e.kn || (e.kn = !0, e.trigger("online", !0))
					}, !1), window.addEventListener("offline", function () {
						e.kn && (e.kn = !1, e.trigger("online", !1))
					}, !1)), e
				}
				return Un(e, t), e.getInstance = function () {
					return new e
				}, e.prototype.getInitialEvent = function (t) {
					return Object(Ln.a)("online" === t, "Unknown event type: " + t), [this.kn]
				}, e.prototype.currentlyOnline = function () {
					return this.kn
				}, e
			}(Pn),
			Mn = n(1),
			Vn = n(3),
			Wn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			Bn = function (t) {
				var e = {},
					n = {},
					r = {},
					i = "";
				try {
					var o = t.split(".");
					e = Object(Vn.a)(Object(Mn.e)(o[0]) || ""), n = Object(Vn.a)(Object(Mn.e)(o[1]) || ""), i = o[2], r = n.d || {}, delete n.d
				} catch (t) {}
				return {
					header: e,
					claims: n,
					data: r,
					signature: i
				}
			},
			Xn = function (t) {
				var e = Bn(t),
					n = e.claims;
				return !!e.signature && !!n && "object" === (void 0 === n ? "undefined" : Wn(n)) && n.hasOwnProperty("iat")
			},
			Hn = function (t) {
				var e = Bn(t).claims;
				return "object" === (void 0 === e ? "undefined" : Wn(e)) && !0 === e.admin
			},
			qn = n(1),
			Kn = function () {
				function t(t) {
					this.Fn = t, this.pendingResponses = [], this.currentResponseNum = 0, this.closeAfterResponse = -1, this.onClose = null
				}
				return t.prototype.closeAfter = function (t, e) {
					this.closeAfterResponse = t, this.onClose = e, this.closeAfterResponse < this.currentResponseNum && (this.onClose(), this.onClose = null)
				}, t.prototype.handleResponse = function (t, e) {
					var n = this;
					this.pendingResponses[t] = e;
					for (var r = this; this.pendingResponses[this.currentResponseNum] && "break" !== function () {
							var t = r.pendingResponses[r.currentResponseNum];
							delete r.pendingResponses[r.currentResponseNum];
							for (var e = 0; e < t.length; ++e) ! function (e) {
								t[e] && Object(qn.m)(function () {
									n.Fn(t[e])
								})
							}(e);
							if (r.currentResponseNum === r.closeAfterResponse) return r.onClose && (r.onClose(), r.onClose = null), "break";
							r.currentResponseNum++
						}(););
				}, t
			}(),
			zn = n(1),
			Gn = n(12),
			Qn = n(9),
			Yn = n(3),
			$n = n(6),
			Jn = "pLPCommand",
			Zn = "pRTLPCB",
			tr = function () {
				function t(t, e, n, r) {
					this.connId = t, this.repoInfo = e, this.transportSessionId = n, this.lastSessionId = r, this.bytesSent = 0, this.bytesReceived = 0, this.Z = !1, this.X = Object(zn.t)(t), this.$ = Gn.a.getCollection(e), this.urlFn = function (t) {
						return e.connectionURL(Qn.d, t)
					}
				}
				return t.prototype.open = function (t, e) {
					var n = this;
					this.curSegmentNum = 0, this.An = e, this.myPacketOrderer = new Kn(t), this.ut = !1, this.Ln = setTimeout(function () {
						n.X("Timed out trying to connect."), n.tt(), n.Ln = null
					}, Math.floor(3e4)), Object(zn.n)(function () {
						if (!n.ut) {
							n.scriptTagHolder = new er(function () {
								for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
								var r = t[0],
									i = t[1],
									o = t[2];
								if (t[3], t[4], n.Mn(t), n.scriptTagHolder)
									if (n.Ln && (clearTimeout(n.Ln), n.Ln = null), n.Z = !0, "start" == r) n.id = i, n.password = o;
									else {
										if ("close" !== r) throw Error("Unrecognized command received: " + r);
										i ? (n.scriptTagHolder.sendNewPolls = !1, n.myPacketOrderer.closeAfter(i, function () {
											n.tt()
										})) : n.tt()
									}
							}, function () {
								for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
								var r = t[0],
									i = t[1];
								n.Mn(t), n.myPacketOrderer.handleResponse(r, i)
							}, function () {
								n.tt()
							}, n.urlFn);
							var t = {};
							t.start = "t", t.ser = Math.floor(1e8 * Math.random()), n.scriptTagHolder.uniqueCallbackIdentifier && (t.cb = n.scriptTagHolder.uniqueCallbackIdentifier), t[Qn.h] = Qn.e, n.transportSessionId && (t[Qn.g] = n.transportSessionId), n.lastSessionId && (t[Qn.c] = n.lastSessionId), !Object($n.b)() && "undefined" != typeof location && location.href && -1 !== location.href.indexOf(Qn.a) && (t[Qn.f] = Qn.b);
							var e = n.urlFn(t);
							n.X("Connecting via long-poll to " + e), n.scriptTagHolder.addTag(e, function () {})
						}
					})
				}, t.prototype.start = function () {
					this.scriptTagHolder.startLongPoll(this.id, this.password), this.addDisconnectPingFrame(this.id, this.password)
				}, t.forceAllow = function () {
					t.Wn = !0
				}, t.forceDisallow = function () {
					t.et = !0
				}, t.isAvailable = function () {
					return t.Wn || !t.et && "undefined" != typeof document && null != document.createElement && !Object(zn.p)() && !Object(zn.r)() && !Object($n.b)()
				}, t.prototype.markConnectionHealthy = function () {}, t.prototype.st = function () {
					this.ut = !0, this.scriptTagHolder && (this.scriptTagHolder.close(), this.scriptTagHolder = null), this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame), this.myDisconnFrame = null), this.Ln && (clearTimeout(this.Ln), this.Ln = null)
				}, t.prototype.tt = function () {
					this.ut || (this.X("Longpoll is closing itself"), this.st(), this.An && (this.An(this.Z), this.An = null))
				}, t.prototype.close = function () {
					this.ut || (this.X("Longpoll is being closed."), this.st())
				}, t.prototype.send = function (t) {
					var e = Object(Yn.b)(t);
					this.bytesSent += e.length, this.$.incrementCounter("bytes_sent", e.length);
					for (var n = Object(zn.f)(e), r = Object(zn.z)(n, 1840), i = 0; i < r.length; i++) this.scriptTagHolder.enqueueSegment(this.curSegmentNum, r.length, r[i]), this.curSegmentNum++
				}, t.prototype.addDisconnectPingFrame = function (t, e) {
					if (!Object($n.b)()) {
						this.myDisconnFrame = document.createElement("iframe");
						var n = {};
						n.dframe = "t", n.id = t, n.pw = e, this.myDisconnFrame.src = this.urlFn(n), this.myDisconnFrame.style.display = "none", document.body.appendChild(this.myDisconnFrame)
					}
				}, t.prototype.Mn = function (t) {
					var e = Object(Yn.b)(t).length;
					this.bytesReceived += e, this.$.incrementCounter("bytes_received", e)
				}, t
			}(),
			er = function () {
				function t(e, n, r, i) {
					if (this.onDisconnect = r, this.urlFn = i, this.outstandingRequests = new ge, this.pendingSegs = [], this.currentSerial = Math.floor(1e8 * Math.random()), this.sendNewPolls = !0, Object($n.b)()) this.commandCB = e, this.onMessageCB = n;
					else {
						this.uniqueCallbackIdentifier = Object(zn.a)(), window[Jn + this.uniqueCallbackIdentifier] = e, window[Zn + this.uniqueCallbackIdentifier] = n, this.myIFrame = t.qn();
						var o = "";
						this.myIFrame.src && "javascript:" === this.myIFrame.src.substr(0, 11) && (o = '<script>document.domain="' + document.domain + '";<\/script>');
						var s = "<html><body>" + o + "</body></html>";
						try {
							this.myIFrame.doc.open(), this.myIFrame.doc.write(s), this.myIFrame.doc.close()
						} catch (t) {
							Object(zn.s)("frame writing exception"), t.stack && Object(zn.s)(t.stack), Object(zn.s)(t)
						}
					}
				}
				return t.qn = function () {
					var t = document.createElement("iframe");
					if (t.style.display = "none", !document.body) throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
					document.body.appendChild(t);
					try {
						t.contentWindow.document || Object(zn.s)("No IE domain setting required")
					} catch (n) {
						var e = document.domain;
						t.src = "javascript:void((function(){document.open();document.domain='" + e + "';document.close();})())"
					}
					return t.contentDocument ? t.doc = t.contentDocument : t.contentWindow ? t.doc = t.contentWindow.document : t.document && (t.doc = t.document), t
				}, t.prototype.close = function () {
					var e = this;
					if (this.alive = !1, this.myIFrame && (this.myIFrame.doc.body.innerHTML = "", setTimeout(function () {
							null !== e.myIFrame && (document.body.removeChild(e.myIFrame), e.myIFrame = null)
						}, Math.floor(0))), Object($n.b)() && this.myID) {
						var n = {};
						n.disconn = "t", n.id = this.myID, n.pw = this.myPW;
						var r = this.urlFn(n);
						t.nodeRestRequest(r)
					}
					var i = this.onDisconnect;
					i && (this.onDisconnect = null, i())
				}, t.prototype.startLongPoll = function (t, e) {
					for (this.myID = t, this.myPW = e, this.alive = !0; this.Qn(););
				}, t.prototype.Qn = function () {
					if (this.alive && this.sendNewPolls && this.outstandingRequests.count() < (this.pendingSegs.length > 0 ? 2 : 1)) {
						this.currentSerial++;
						var t = {};
						t.id = this.myID, t.pw = this.myPW, t.ser = this.currentSerial;
						for (var e = this.urlFn(t), n = "", r = 0; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + 30 + n.length <= 1870;) {
							var i = this.pendingSegs.shift();
							n = n + "&seg" + r + "=" + i.seg + "&ts" + r + "=" + i.ts + "&d" + r + "=" + i.d, r++
						}
						return e += n, this.Un(e, this.currentSerial), !0
					}
					return !1
				}, t.prototype.enqueueSegment = function (t, e, n) {
					this.pendingSegs.push({
						seg: t,
						ts: e,
						d: n
					}), this.alive && this.Qn()
				}, t.prototype.Un = function (t, e) {
					var n = this;
					this.outstandingRequests.add(e, 1);
					var r = function () {
							n.outstandingRequests.remove(e), n.Qn()
						},
						i = setTimeout(r, Math.floor(25e3));
					this.addTag(t, function () {
						clearTimeout(i), r()
					})
				}, t.prototype.addTag = function (t, e) {
					var n = this;
					Object($n.b)() ? this.doNodeLongPoll(t, e) : setTimeout(function () {
						try {
							if (!n.sendNewPolls) return;
							var r = n.myIFrame.doc.createElement("script");
							r.type = "text/javascript", r.async = !0, r.src = t, r.onload = r.onreadystatechange = function () {
								var t = r.readyState;
								t && "loaded" !== t && "complete" !== t || (r.onload = r.onreadystatechange = null, r.parentNode && r.parentNode.removeChild(r), e())
							}, r.onerror = function () {
								Object(zn.s)("Long-poll script failed to load: " + t), n.sendNewPolls = !1, n.close()
							}, n.myIFrame.doc.body.appendChild(r)
						} catch (t) {}
					}, Math.floor(1))
				}, t
			}(),
			nr = n(18),
			rr = n(1),
			ir = function () {
				function t(t) {
					this.Vn(t)
				}
				return Object.defineProperty(t, "ALL_TRANSPORTS", {
					get: function () {
						return [tr, nr.a]
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.Vn = function (e) {
					var n = nr.a && nr.a.isAvailable(),
						r = n && !nr.a.previouslyFailed();
					if (e.webSocketOnly && (n || Object(rr.B)("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), r = !0), r) this.Bn = [nr.a];
					else {
						var i = this.Bn = [];
						Object(rr.i)(t.ALL_TRANSPORTS, function (t, e) {
							e && e.isAvailable() && i.push(e)
						})
					}
				}, t.prototype.initialTransport = function () {
					if (this.Bn.length > 0) return this.Bn[0];
					throw Error("No transports available")
				}, t.prototype.upgradeTransport = function () {
					return this.Bn.length > 1 ? this.Bn[1] : null
				}, t
			}(),
			or = n(1),
			sr = n(8),
			ar = n(9),
			ur = function () {
				function t(t, e, n, r, i, o, s) {
					this.id = t, this.Hn = e, this.Fn = n, this.Kn = r, this.An = i, this.Yn = o, this.lastSessionId = s, this.connectionCount = 0, this.pendingDataMessages = [], this.zn = 0, this.X = Object(or.t)("c:" + this.id + ":"), this.Gn = new ir(e), this.X("Connection created"), this.Xn()
				}
				return t.prototype.Xn = function () {
					var t = this,
						e = this.Gn.initialTransport();
					this.$n = new e(this.Jn(), this.Hn, void 0, this.lastSessionId), this.Zn = e.responsesRequiredToBeHealthy || 0;
					var n = this.tr(this.$n),
						r = this.er(this.$n);
					this.nr = this.$n, this.rr = this.$n, this.ir = null, this.or = !1, setTimeout(function () {
						t.$n && t.$n.open(n, r)
					}, Math.floor(0));
					var i = e.healthyTimeout || 0;
					i > 0 && (this.sr = Object(or.x)(function () {
						t.sr = null, t.or || (t.$n && t.$n.bytesReceived > 102400 ? (t.X("Connection exceeded healthy timeout but has received " + t.$n.bytesReceived + " bytes.  Marking connection healthy."), t.or = !0, t.$n.markConnectionHealthy()) : t.$n && t.$n.bytesSent > 10240 ? t.X("Connection exceeded healthy timeout but has sent " + t.$n.bytesSent + " bytes.  Leaving connection alive.") : (t.X("Closing unhealthy connection after timeout."), t.close()))
					}, Math.floor(i)))
				}, t.prototype.Jn = function () {
					return "c:" + this.id + ":" + this.connectionCount++
				}, t.prototype.er = function (t) {
					var e = this;
					return function (n) {
						t === e.$n ? e.ar(n) : t === e.ir ? (e.X("Secondary connection lost."), e.ur()) : e.X("closing an old connection")
					}
				}, t.prototype.tr = function (t) {
					var e = this;
					return function (n) {
						2 != e.zn && (t === e.rr ? e.cr(n) : t === e.ir ? e.hr(n) : e.X("message on old connection"))
					}
				}, t.prototype.sendRequest = function (t) {
					var e = {
						t: "d",
						d: t
					};
					this.lr(e)
				}, t.prototype.tryCleanupConnection = function () {
					this.nr === this.ir && this.rr === this.ir && (this.X("cleaning up and promoting a connection: " + this.ir.connId), this.$n = this.ir, this.ir = null)
				}, t.prototype.pr = function (t) {
					if ("t" in t) {
						var e = t.t;
						"a" === e ? this.dr() : "r" === e ? (this.X("Got a reset on secondary, closing it"), this.ir.close(), this.nr !== this.ir && this.rr !== this.ir || this.close()) : "o" === e && (this.X("got pong on secondary."), this.fr--, this.dr())
					}
				}, t.prototype.hr = function (t) {
					var e = Object(or.w)("t", t),
						n = Object(or.w)("d", t);
					if ("c" == e) this.pr(n);
					else {
						if ("d" != e) throw Error("Unknown protocol layer: " + e);
						this.pendingDataMessages.push(n)
					}
				}, t.prototype.dr = function () {
					this.fr <= 0 ? (this.X("Secondary connection is healthy."), this.or = !0, this.ir.markConnectionHealthy(), this._r()) : (this.X("sending ping on secondary."), this.ir.send({
						t: "c",
						d: {
							t: "p",
							d: {}
						}
					}))
				}, t.prototype._r = function () {
					this.ir.start(), this.X("sending client ack on secondary"), this.ir.send({
						t: "c",
						d: {
							t: "a",
							d: {}
						}
					}), this.X("Ending transmission on primary"), this.$n.send({
						t: "c",
						d: {
							t: "n",
							d: {}
						}
					}), this.nr = this.ir, this.tryCleanupConnection()
				}, t.prototype.cr = function (t) {
					var e = Object(or.w)("t", t),
						n = Object(or.w)("d", t);
					"c" == e ? this.yr(n) : "d" == e && this.vr(n)
				}, t.prototype.vr = function (t) {
					this.gr(), this.Fn(t)
				}, t.prototype.gr = function () {
					this.or || --this.Zn <= 0 && (this.X("Primary connection is healthy."), this.or = !0, this.$n.markConnectionHealthy())
				}, t.prototype.yr = function (t) {
					var e = Object(or.w)("t", t);
					if ("d" in t) {
						var n = t.d;
						if ("h" === e) this.mr(n);
						else if ("n" === e) {
							this.X("recvd end transmission on primary"), this.rr = this.ir;
							for (var r = 0; r < this.pendingDataMessages.length; ++r) this.vr(this.pendingDataMessages[r]);
							this.pendingDataMessages = [], this.tryCleanupConnection()
						} else "s" === e ? this.br(n) : "r" === e ? this.Cr(n) : "e" === e ? Object(or.k)("Server Error: " + n) : "o" === e ? (this.X("got pong on primary."), this.gr(), this.Er()) : Object(or.k)("Unknown control packet command: " + e)
					}
				}, t.prototype.mr = function (t) {
					var e = t.ts,
						n = t.v,
						r = t.h;
					this.sessionId = t.s, this.Hn.updateHost(r), 0 == this.zn && (this.$n.start(), this.wr(this.$n, e), ar.e !== n && Object(or.B)("Protocol version mismatch detected"), this.Or())
				}, t.prototype.Or = function () {
					var t = this.Gn.upgradeTransport();
					t && this.Sr(t)
				}, t.prototype.Sr = function (t) {
					var e = this;
					this.ir = new t(this.Jn(), this.Hn, this.sessionId), this.fr = t.responsesRequiredToBeHealthy || 0;
					var n = this.tr(this.ir),
						r = this.er(this.ir);
					this.ir.open(n, r), Object(or.x)(function () {
						e.ir && (e.X("Timed out trying to upgrade."), e.ir.close())
					}, Math.floor(6e4))
				}, t.prototype.Cr = function (t) {
					this.X("Reset packet received.  New host: " + t), this.Hn.updateHost(t), 1 === this.zn ? this.close() : (this.Tr(), this.Xn())
				}, t.prototype.wr = function (t, e) {
					var n = this;
					this.X("Realtime connection established."), this.$n = t, this.zn = 1, this.Kn && (this.Kn(e, this.sessionId), this.Kn = null), 0 === this.Zn ? (this.X("Primary connection is healthy."), this.or = !0) : Object(or.x)(function () {
						n.Er()
					}, Math.floor(5e3))
				}, t.prototype.Er = function () {
					this.or || 1 !== this.zn || (this.X("sending ping on primary."), this.lr({
						t: "c",
						d: {
							t: "p",
							d: {}
						}
					}))
				}, t.prototype.ur = function () {
					var t = this.ir;
					this.ir = null, this.nr !== t && this.rr !== t || this.close()
				}, t.prototype.ar = function (t) {
					this.$n = null, t || 0 !== this.zn ? 1 === this.zn && this.X("Realtime connection lost.") : (this.X("Realtime connection failed."), this.Hn.isCacheableHost() && (sr.a.remove("host:" + this.Hn.host), this.Hn.internalHost = this.Hn.host)), this.close()
				}, t.prototype.br = function (t) {
					this.X("Connection shutdown command received. Shutting down..."), this.Yn && (this.Yn(t), this.Yn = null), this.An = null, this.close()
				}, t.prototype.lr = function (t) {
					if (1 !== this.zn) throw "Connection is not connected";
					this.nr.send(t)
				}, t.prototype.close = function () {
					2 !== this.zn && (this.X("Closing realtime connection."), this.zn = 2, this.Tr(), this.An && (this.An(), this.An = null))
				}, t.prototype.Tr = function () {
					this.X("Shutting down all connections"), this.$n && (this.$n.close(), this.$n = null), this.ir && (this.ir.close(), this.ir = null), this.sr && (clearTimeout(this.sr), this.sr = null)
				}, t
			}(),
			cr = function () {
				function t() {}
				return t.prototype.put = function (t, e, n, r) {}, t.prototype.merge = function (t, e, n, r) {}, t.prototype.refreshAuthToken = function (t) {}, t.prototype.onDisconnectPut = function (t, e, n) {}, t.prototype.onDisconnectMerge = function (t, e, n) {}, t.prototype.onDisconnectCancel = function (t, e) {}, t.prototype.reportStats = function (t) {}, t
			}(),
			hr = n(5),
			lr = n(2),
			fr = n(3),
			pr = n(0),
			dr = n(1),
			vr = n(7),
			yr = n(6),
			gr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			mr = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			br = 1e3,
			wr = 3e5,
			Er = function (t) {
				function e(n, r, i, o, s, a) {
					var u = t.call(this) || this;
					if (u.Hn = n, u.Nr = r, u.Ir = i, u.Pr = o, u.Rr = s, u.Dr = a, u.id = e.jr++, u.X = Object(dr.t)("p:" + u.id + ":"), u.xr = {}, u.kr = {}, u.Fr = [], u.Ar = 0, u.Lr = [], u.Mr = !1, u.Wr = br, u.qr = wr, u.Qr = null, u.lastSessionId = null, u.Ur = null, u.xn = !1, u.Vr = {}, u.Br = 0, u.Hr = null, u.Kr = null, u.Yr = !1, u.zr = 0, u.Gr = !0, u.Xr = null, u.$r = null, a && !Object(yr.b)()) throw Error("Auth override specified in options, but not supported on non Node.js platforms");
					return u.Jr(0), jn.getInstance().on("visible", u.Zr, u), -1 === n.host.indexOf("fblocal") && Fn.getInstance().on("online", u.ti, u), u
				}
				return mr(e, t), e.prototype.sendRequest = function (t, e, n) {
					var r = ++this.Br,
						i = {
							r: r,
							a: t,
							b: e
						};
					this.X(Object(fr.b)(i)), Object(pr.a)(this.Mr, "sendRequest call when we're not connected not allowed."), this.Hr.sendRequest(i), n && (this.Vr[r] = n)
				}, e.prototype.listen = function (t, e, n, r) {
					var i = t.queryIdentifier(),
						o = "" + t.path;
					this.X("Listen called for " + o + " " + i), this.kr[o] = this.kr[o] || {}, Object(pr.a)(t.getQueryParams().isDefault() || !t.getQueryParams().loadsAllData(), "listen() called for non-default but complete query"), Object(pr.a)(!this.kr[o][i], "listen() called twice for same path/queryId.");
					var s = {
						onComplete: r,
						hashFn: e,
						query: t,
						tag: n
					};
					this.kr[o][i] = s, this.Mr && this.ei(s)
				}, e.prototype.ei = function (t) {
					var n = this,
						r = t.query,
						i = "" + r.path,
						o = r.queryIdentifier();
					this.X("Listen on " + i + " for " + o);
					var s = {
						p: i
					};
					t.tag && (s.q = r.queryObject(), s.t = t.tag), s.h = t.hashFn(), this.sendRequest("q", s, function (s) {
						var a = s.d,
							u = s.s;
						e.ni(a, r), (n.kr[i] && n.kr[i][o]) === t && (n.X("listen response", s), "ok" !== u && n.ri(i, o), t.onComplete && t.onComplete(u, a))
					})
				}, e.ni = function (t, e) {
					if (t && "object" === (void 0 === t ? "undefined" : gr(t)) && Object(lr.b)(t, "w")) {
						var n = Object(lr.l)(t, "w");
						if (Array.isArray(n) && ~n.indexOf("no_index")) {
							var r = '".indexOn": "' + e.getQueryParams().getIndex() + '"',
								i = "" + e.path;
							Object(dr.B)("Using an unspecified index. Consider adding " + r + " at " + i + " to your security rules for better performance")
						}
					}
				}, e.prototype.refreshAuthToken = function (t) {
					this.Kr = t, this.X("Auth token refreshed"), this.Kr ? this.tryAuth() : this.Mr && this.sendRequest("unauth", {}, function () {}), this.ii(t)
				}, e.prototype.ii = function (t) {
					(t && 40 === t.length || Hn(t)) && (this.X("Admin auth credential detected.  Reducing max reconnect time."), this.qr = 3e4)
				}, e.prototype.tryAuth = function () {
					var t = this;
					if (this.Mr && this.Kr) {
						var e = this.Kr,
							n = Xn(e) ? "auth" : "gauth",
							r = {
								cred: e
							};
						null === this.Dr ? r.noauth = !0 : "object" === gr(this.Dr) && (r.authvar = this.Dr), this.sendRequest(n, r, function (n) {
							var r = n.s,
								i = n.d || "error";
							t.Kr === e && ("ok" === r ? t.zr = 0 : t.oi(r, i))
						})
					}
				}, e.prototype.unlisten = function (t, e) {
					var n = "" + t.path,
						r = t.queryIdentifier();
					this.X("Unlisten called for " + n + " " + r), Object(pr.a)(t.getQueryParams().isDefault() || !t.getQueryParams().loadsAllData(), "unlisten() called for non-default but complete query"), this.ri(n, r) && this.Mr && this.si(n, r, t.queryObject(), e)
				}, e.prototype.si = function (t, e, n, r) {
					this.X("Unlisten on " + t + " for " + e);
					var i = {
						p: t
					};
					r && (i.q = n, i.t = r), this.sendRequest("n", i)
				}, e.prototype.onDisconnectPut = function (t, e, n) {
					this.Mr ? this.ai("o", t, e, n) : this.Lr.push({
						pathString: t,
						action: "o",
						data: e,
						onComplete: n
					})
				}, e.prototype.onDisconnectMerge = function (t, e, n) {
					this.Mr ? this.ai("om", t, e, n) : this.Lr.push({
						pathString: t,
						action: "om",
						data: e,
						onComplete: n
					})
				}, e.prototype.onDisconnectCancel = function (t, e) {
					this.Mr ? this.ai("oc", t, null, e) : this.Lr.push({
						pathString: t,
						action: "oc",
						data: null,
						onComplete: e
					})
				}, e.prototype.ai = function (t, e, n, r) {
					var i = {
						p: e,
						d: n
					};
					this.X("onDisconnect " + t, i), this.sendRequest(t, i, function (t) {
						r && setTimeout(function () {
							r(t.s, t.d)
						}, Math.floor(0))
					})
				}, e.prototype.put = function (t, e, n, r) {
					this.putInternal("p", t, e, n, r)
				}, e.prototype.merge = function (t, e, n, r) {
					this.putInternal("m", t, e, n, r)
				}, e.prototype.putInternal = function (t, e, n, r, i) {
					var o = {
						p: e,
						d: n
					};
					void 0 !== i && (o.h = i), this.Fr.push({
						action: t,
						request: o,
						onComplete: r
					}), this.Ar++;
					var s = this.Fr.length - 1;
					this.Mr ? this.ui(s) : this.X("Buffering put: " + e)
				}, e.prototype.ui = function (t) {
					var e = this,
						n = this.Fr[t].action,
						r = this.Fr[t].request,
						i = this.Fr[t].onComplete;
					this.Fr[t].queued = this.Mr, this.sendRequest(n, r, function (r) {
						e.X(n + " response", r), delete e.Fr[t], 0 === --e.Ar && (e.Fr = []), i && i(r.s, r.d)
					})
				}, e.prototype.reportStats = function (t) {
					var e = this;
					if (this.Mr) {
						var n = {
							c: t
						};
						this.X("reportStats", n), this.sendRequest("s", n, function (t) {
							if ("ok" !== t.s) {
								var n = t.d;
								e.X("reportStats", "Error sending stats: " + n)
							}
						})
					}
				}, e.prototype.vr = function (t) {
					if ("r" in t) {
						this.X("from server: " + Object(fr.b)(t));
						var e = t.r,
							n = this.Vr[e];
						n && (delete this.Vr[e], n(t.b))
					} else {
						if ("error" in t) throw "A server-side error has occurred: " + t.error;
						"a" in t && this.ci(t.a, t.b)
					}
				}, e.prototype.ci = function (t, e) {
					this.X("handleServerMessage", t, e), "d" === t ? this.Nr(e.p, e.d, !1, e.t) : "m" === t ? this.Nr(e.p, e.d, !0, e.t) : "c" === t ? this.hi(e.p, e.q) : "ac" === t ? this.oi(e.s, e.d) : "sd" === t ? this.li(e) : Object(dr.k)("Unrecognized action received from server: " + Object(fr.b)(t) + "\nAre you using the latest client?")
				}, e.prototype.Kn = function (t, e) {
					this.X("connection ready"), this.Mr = !0, this.$r = (new Date).getTime(), this.pi(t), this.lastSessionId = e, this.Gr && this.di(), this.fi(), this.Gr = !1, this.Ir(!0)
				}, e.prototype.Jr = function (t) {
					var e = this;
					Object(pr.a)(!this.Hr, "Scheduling a connect when we're already connected/ing?"), this.Ur && clearTimeout(this.Ur), this.Ur = setTimeout(function () {
						e.Ur = null, e._i()
					}, Math.floor(t))
				}, e.prototype.Zr = function (t) {
					t && !this.xn && this.Wr === this.qr && (this.X("Window became visible.  Reducing delay."), this.Wr = br, this.Hr || this.Jr(0)), this.xn = t
				}, e.prototype.ti = function (t) {
					t ? (this.X("Browser went online."), this.Wr = br, this.Hr || this.Jr(0)) : (this.X("Browser went offline.  Killing connection."), this.Hr && this.Hr.close())
				}, e.prototype.yi = function () {
					if (this.X("data client disconnected"), this.Mr = !1, this.Hr = null, this.vi(), this.Vr = {}, this.gi()) {
						this.xn ? this.$r && ((new Date).getTime() - this.$r > 3e4 && (this.Wr = br), this.$r = null) : (this.X("Window isn't visible.  Delaying reconnect."), this.Wr = this.qr, this.Xr = (new Date).getTime());
						var t = (new Date).getTime() - this.Xr,
							e = Math.max(0, this.Wr - t);
						e = Math.random() * e, this.X("Trying to reconnect in " + e + "ms"), this.Jr(e), this.Wr = Math.min(this.qr, 1.3 * this.Wr)
					}
					this.Ir(!1)
				}, e.prototype._i = function () {
					if (this.gi()) {
						this.X("Making a connection attempt"), this.Xr = (new Date).getTime(), this.$r = null;
						var t = this.vr.bind(this),
							n = this.Kn.bind(this),
							r = this.yi.bind(this),
							i = this.id + ":" + e.mi++,
							o = this,
							s = this.lastSessionId,
							a = !1,
							u = null,
							c = function () {
								u ? u.close() : (a = !0, r())
							};
						this.Hr = {
							close: c,
							sendRequest: function (t) {
								Object(pr.a)(u, "sendRequest call when we're not connected not allowed."), u.sendRequest(t)
							}
						};
						var h = this.Yr;
						this.Yr = !1, this.Rr.getToken(h).then(function (e) {
							a ? Object(dr.s)("getToken() completed but was canceled") : (Object(dr.s)("getToken() completed. Creating connection."), o.Kr = e && e.accessToken, u = new ur(i, o.Hn, t, n, r, function (t) {
								Object(dr.B)(t + " (" + o.Hn + ")"), o.interrupt("server_kill")
							}, s))
						}).then(null, function (t) {
							o.X("Failed to get token: " + t), a || (vr.a.NODE_ADMIN && Object(dr.B)(t), c())
						})
					}
				}, e.prototype.interrupt = function (t) {
					Object(dr.s)("Interrupting connection for reason: " + t), this.xr[t] = !0, this.Hr ? this.Hr.close() : (this.Ur && (clearTimeout(this.Ur), this.Ur = null), this.Mr && this.yi())
				}, e.prototype.resume = function (t) {
					Object(dr.s)("Resuming connection for reason: " + t), delete this.xr[t], Object(lr.j)(this.xr) && (this.Wr = br, this.Hr || this.Jr(0))
				}, e.prototype.pi = function (t) {
					var e = t - (new Date).getTime();
					this.Pr({
						serverTimeOffset: e
					})
				}, e.prototype.vi = function () {
					for (var t = 0; t < this.Fr.length; t++) {
						var e = this.Fr[t];
						e && "h" in e.request && e.queued && (e.onComplete && e.onComplete("disconnect"), delete this.Fr[t], this.Ar--)
					}
					0 === this.Ar && (this.Fr = [])
				}, e.prototype.hi = function (t, e) {
					var n;
					n = e ? e.map(function (t) {
						return Object(dr.d)(t)
					}).join("$") : "default";
					var r = this.ri(t, n);
					r && r.onComplete && r.onComplete("permission_denied")
				}, e.prototype.ri = function (t, e) {
					var n, r = "" + new g(t);
					return void 0 !== this.kr[r] ? (n = this.kr[r][e], delete this.kr[r][e], 0 === Object(lr.h)(this.kr[r]) && delete this.kr[r]) : n = void 0, n
				}, e.prototype.oi = function (t, e) {
					Object(dr.s)("Auth token revoked: " + t + "/" + e), this.Kr = null, this.Yr = !0, this.Hr.close(), "invalid_token" !== t && "permission_denied" !== t || ++this.zr >= 3 && (this.Wr = 3e4, this.Rr.notifyForInvalidToken())
				}, e.prototype.li = function (t) {
					this.Qr ? this.Qr(t) : "msg" in t && "undefined" != typeof console && console.log("FIREBASE: " + t.msg.replace("\n", "\nFIREBASE: "))
				}, e.prototype.fi = function () {
					var t = this;
					this.tryAuth(), Object(lr.f)(this.kr, function (e, n) {
						Object(lr.f)(n, function (e, n) {
							t.ei(n)
						})
					});
					for (var e = 0; e < this.Fr.length; e++) this.Fr[e] && this.ui(e);
					for (; this.Lr.length;) {
						var n = this.Lr.shift();
						this.ai(n.action, n.pathString, n.data, n.onComplete)
					}
				}, e.prototype.di = function () {
					var t = {},
						e = "js";
					vr.a.NODE_ADMIN ? e = "admin_node" : vr.a.NODE_CLIENT && (e = "node"), t["sdk." + e + "." + hr.default.SDK_VERSION.replace(/\./g, "-")] = 1, Object(yr.a)() ? t["framework.cordova"] = 1 : Object(yr.c)() && (t["framework.reactnative"] = 1), this.reportStats(t)
				}, e.prototype.gi = function () {
					var t = Fn.getInstance().currentlyOnline();
					return Object(lr.j)(this.xr) && t
				}, e.jr = 0, e.mi = 0, e
			}(cr),
			Or = n(2),
			Ir = function (t) {
				var e = [];
				return Object(Or.f)(t, function (t, n) {
					Array.isArray(n) ? n.forEach(function (n) {
						e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n))
					}) : e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n))
				}), e.length ? "&" + e.join("&") : ""
			},
			Tr = n(0),
			Cr = n(1),
			Sr = n(3),
			Ar = n(2),
			Nr = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			Rr = function (t) {
				function e(e, n, r) {
					var i = t.call(this) || this;
					return i.Hn = e, i.Nr = n, i.Rr = r, i.X = Object(Cr.t)("p:rest:"), i.kr = {}, i
				}
				return Nr(e, t), e.prototype.reportStats = function (t) {
					throw Error("Method not implemented.")
				}, e.bi = function (t, e) {
					return void 0 !== e ? "tag$" + e : (Object(Tr.a)(t.getQueryParams().isDefault(), "should have a tag if it's not a default query."), "" + t.path)
				}, e.prototype.listen = function (t, n, r, i) {
					var o = this,
						s = "" + t.path;
					this.X("Listen called for " + s + " " + t.queryIdentifier());
					var a = e.bi(t, r),
						u = {};
					this.kr[a] = u;
					var c = t.getQueryParams().toRestQueryStringParameters();
					this.Ci(s + ".json", c, function (t, e) {
						var n = e;
						if (404 === t && (n = null, t = null), null === t && o.Nr(s, n, !1, r), Object(Ar.l)(o.kr, a) === u) {
							i(t ? 401 == t ? "permission_denied" : "rest_error:" + t : "ok", null)
						}
					})
				}, e.prototype.unlisten = function (t, n) {
					var r = e.bi(t, n);
					delete this.kr[r]
				}, e.prototype.refreshAuthToken = function (t) {}, e.prototype.Ci = function (t, e, n) {
					var r = this;
					void 0 === e && (e = {}), e.format = "export", this.Rr.getToken(!1).then(function (i) {
						var o = i && i.accessToken;
						o && (e.auth = o);
						var s = (r.Hn.secure ? "https://" : "http://") + r.Hn.host + t + "?" + Ir(e);
						r.X("Sending REST request for " + s);
						var a = new XMLHttpRequest;
						a.onreadystatechange = function () {
							if (n && 4 === a.readyState) {
								r.X("REST Response for " + s + " received. status:", a.status, "response:", a.responseText);
								var t = null;
								if (a.status >= 200 && a.status < 300) {
									try {
										t = Object(Sr.a)(a.responseText)
									} catch (t) {
										Object(Cr.B)("Failed to parse JSON response for " + s + ": " + a.responseText)
									}
									n(null, t)
								} else 401 !== a.status && 404 !== a.status && Object(Cr.B)("Got unsuccessful REST response for " + s + " Status: " + a.status), n(a.status);
								n = null
							}
						}, a.open("GET", s, !0), a.send()
					})
				}, e
			}(cr),
			kr = n(3),
			Pr = n(1),
			_r = n(2),
			Dr = n(12),
			jr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			Lr = function () {
				function t(t, e, n) {
					var r = this;
					this.Hn = t, this.app = n, this.dataUpdateCount = 0, this.On = null, this.Ei = new Nn, this.wi = 1, this.Oi = null, this.An = new me, this.Si = null;
					var i = new bn(n);
					if (this.$ = Dr.a.getCollection(t), e || Object(Pr.g)()) this.En = new Rr(this.Hn, this.Nr.bind(this), i), setTimeout(this.Ir.bind(this, !0), 0);
					else {
						var o = n.options.databaseAuthVariableOverride;
						if (void 0 !== o && null !== o) {
							if ("object" !== (void 0 === o ? "undefined" : jr(o))) throw Error("Only objects are supported for option databaseAuthVariableOverride");
							try {
								Object(kr.b)(o)
							} catch (t) {
								throw Error("Invalid authOverride provided: " + t)
							}
						}
						this.Si = new Er(this.Hn, this.Nr.bind(this), this.Ir.bind(this), this.Pr.bind(this), i, o), this.En = this.Si
					}
					i.addTokenChangeListener(function (t) {
						r.En.refreshAuthToken(t)
					}), this.Ti = Dr.a.getOrCreateReporter(t, function () {
						return new Sn(r.$, r.En)
					}), this.Ni(), this.Ii = new gn, this.Pi = new yn({
						startListening: function (t, e, n, i) {
							var o = [],
								s = r.Ii.getNode(t.path);
							return s.isEmpty() || (o = r.Pi.applyServerOverwrite(t.path, s), setTimeout(function () {
								i("ok")
							}, 0)), o
						},
						stopListening: function () {}
					}), this.Ri("connected", !1), this.Di = new yn({
						startListening: function (t, e, n, i) {
							return r.En.listen(t, n, e, function (e, n) {
								var o = i(e, n);
								r.Ei.raiseEventsForChangedPath(t.path, o)
							}), []
						},
						stopListening: function (t, e) {
							r.En.unlisten(t, e)
						}
					})
				}
				return t.prototype.toString = function () {
					return (this.Hn.secure ? "https://" : "http://") + this.Hn.host
				}, t.prototype.name = function () {
					return this.Hn.namespace
				}, t.prototype.serverTime = function () {
					var t = this.Ii.getNode(new g(".info/serverTimeOffset")).val() || 0;
					return (new Date).getTime() + t
				}, t.prototype.generateServerValues = function () {
					return Ee({
						timestamp: this.serverTime()
					})
				}, t.prototype.Nr = function (t, e, n, r) {
					this.dataUpdateCount++;
					var i = new g(t);
					e = this.Oi ? this.Oi(t, e) : e;
					var o = [];
					if (r)
						if (n) {
							var s = Object(_r.k)(e, function (t) {
								return a(t)
							});
							o = this.Di.applyTaggedQueryMerge(i, s, r)
						} else {
							var u = a(e);
							o = this.Di.applyTaggedQueryOverwrite(i, u, r)
						}
					else if (n) {
						var c = Object(_r.k)(e, function (t) {
							return a(t)
						});
						o = this.Di.applyServerMerge(i, c)
					} else {
						var h = a(e);
						o = this.Di.applyServerOverwrite(i, h)
					}
					var l = i;
					o.length > 0 && (l = this.ji(i)), this.Ei.raiseEventsForChangedPath(l, o)
				}, t.prototype.xi = function (t) {
					this.Oi = t
				}, t.prototype.Ir = function (t) {
					this.Ri("connected", t), !1 === t && this.ki()
				}, t.prototype.Pr = function (t) {
					var e = this;
					Object(Pr.i)(t, function (t, n) {
						e.Ri(n, t)
					})
				}, t.prototype.Ri = function (t, e) {
					var n = new g("/.info/" + t),
						r = a(e);
					this.Ii.updateSnapshot(n, r);
					var i = this.Pi.applyServerOverwrite(n, r);
					this.Ei.raiseEventsForChangedPath(n, i)
				}, t.prototype.Fi = function () {
					return this.wi++
				}, t.prototype.setWithPriority = function (t, e, n, r) {
					var i = this;
					this.X("set", {
						path: "" + t,
						value: e,
						priority: n
					});
					var o = this.generateServerValues(),
						s = a(e, n),
						u = Te(s, o),
						c = this.Fi(),
						h = this.Di.applyUserOverwrite(t, u, c, !0);
					this.Ei.queueEvents(h), this.En.put("" + t, s.val(!0), function (e, n) {
						var o = "ok" === e;
						o || Object(Pr.B)("set at " + t + " failed: " + e);
						var s = i.Di.ackUserWrite(c, !o);
						i.Ei.raiseEventsForChangedPath(t, s), i.callOnCompleteCallback(r, e, n)
					});
					var l = this.Ai(t);
					this.ji(l), this.Ei.raiseEventsForChangedPath(l, [])
				}, t.prototype.update = function (t, e, n) {
					var r = this;
					this.X("update", {
						path: "" + t,
						value: e
					});
					var i = !0,
						o = this.generateServerValues(),
						s = {};
					if (Object(_r.f)(e, function (t, e) {
							i = !1;
							var n = a(e);
							s[t] = Te(n, o)
						}), i) Object(Pr.s)("update() called with empty data.  Don't do anything."), this.callOnCompleteCallback(n, "ok");
					else {
						var u = this.Fi(),
							c = this.Di.applyUserMerge(t, s, u);
						this.Ei.queueEvents(c), this.En.merge("" + t, e, function (e, i) {
							var o = "ok" === e;
							o || Object(Pr.B)("update at " + t + " failed: " + e);
							var s = r.Di.ackUserWrite(u, !o),
								a = s.length > 0 ? r.ji(t) : t;
							r.Ei.raiseEventsForChangedPath(a, s), r.callOnCompleteCallback(n, e, i)
						}), Object(_r.f)(e, function (e) {
							var n = r.Ai(t.child(e));
							r.ji(n)
						}), this.Ei.raiseEventsForChangedPath(t, [])
					}
				}, t.prototype.ki = function () {
					var t = this;
					this.X("onDisconnectEvents");
					var e = this.generateServerValues(),
						n = [];
					Ie(this.An, e).forEachTree(g.Empty, function (e, r) {
						n = n.concat(t.Di.applyServerOverwrite(e, r));
						var i = t.Ai(e);
						t.ji(i)
					}), this.An = new me, this.Ei.raiseEventsForChangedPath(g.Empty, n)
				}, t.prototype.onDisconnectCancel = function (t, e) {
					var n = this;
					this.En.onDisconnectCancel("" + t, function (r, i) {
						"ok" === r && n.An.forget(t), n.callOnCompleteCallback(e, r, i)
					})
				}, t.prototype.onDisconnectSet = function (t, e, n) {
					var r = this,
						i = a(e);
					this.En.onDisconnectPut("" + t, i.val(!0), function (e, o) {
						"ok" === e && r.An.remember(t, i), r.callOnCompleteCallback(n, e, o)
					})
				}, t.prototype.onDisconnectSetWithPriority = function (t, e, n, r) {
					var i = this,
						o = a(e, n);
					this.En.onDisconnectPut("" + t, o.val(!0), function (e, n) {
						"ok" === e && i.An.remember(t, o), i.callOnCompleteCallback(r, e, n)
					})
				}, t.prototype.onDisconnectUpdate = function (t, e, n) {
					var r = this;
					if (Object(_r.j)(e)) return Object(Pr.s)("onDisconnect().update() called with empty data.  Don't do anything."), void this.callOnCompleteCallback(n, "ok");
					this.En.onDisconnectMerge("" + t, e, function (i, o) {
						"ok" === i && Object(_r.f)(e, function (e, n) {
							var i = a(n);
							r.An.remember(t.child(e), i)
						}), r.callOnCompleteCallback(n, i, o)
					})
				}, t.prototype.addEventCallbackForQuery = function (t, e) {
					var n;
					n = ".info" === t.path.getFront() ? this.Pi.addEventRegistration(t, e) : this.Di.addEventRegistration(t, e), this.Ei.raiseEventsAtPath(t.path, n)
				}, t.prototype.removeEventCallbackForQuery = function (t, e) {
					var n;
					n = ".info" === t.path.getFront() ? this.Pi.removeEventRegistration(t, e) : this.Di.removeEventRegistration(t, e), this.Ei.raiseEventsAtPath(t.path, n)
				}, t.prototype.interrupt = function () {
					this.Si && this.Si.interrupt("repo_interrupt")
				}, t.prototype.resume = function () {
					this.Si && this.Si.resume("repo_interrupt")
				}, t.prototype.stats = function (t) {
					if (void 0 === t && (t = !1), "undefined" != typeof console) {
						var e;
						t ? (this.On || (this.On = new En(this.$)), e = this.On.get()) : e = this.$.get();
						var n = Object.keys(e).reduce(function (t, e) {
							return Math.max(e.length, t)
						}, 0);
						Object(_r.f)(e, function (t, e) {
							for (var r = t.length; r < n + 2; r++) t += " ";
							console.log(t + e)
						})
					}
				}, t.prototype.statsIncrementCounter = function (t) {
					this.$.incrementCounter(t), this.Ti.includeStat(t)
				}, t.prototype.X = function () {
					for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
					var n = "";
					this.Si && (n = this.Si.id + ":"), Pr.s.apply(void 0, [n].concat(t))
				}, t.prototype.callOnCompleteCallback = function (t, e, n) {
					t && Object(Pr.m)(function () {
						if ("ok" == e) t(null);
						else {
							var r = (e || "error").toUpperCase(),
								i = r;
							n && (i += ": " + n);
							var o = Error(i);
							o.code = r, t(o)
						}
					})
				}, Object.defineProperty(t.prototype, "database", {
					get: function () {
						return this.Li || (this.Li = new ui(this))
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(),
			xr = function () {
				function t(e) {
					this.Mi = new Xe(e.getIndex()), this.Xt = e.getIndex(), this.Wi = t.qi(e), this.Qi = t.Ui(e)
				}
				return t.prototype.getStartPost = function () {
					return this.Wi
				}, t.prototype.getEndPost = function () {
					return this.Qi
				}, t.prototype.matches = function (t) {
					return this.Xt.compare(this.getStartPost(), t) <= 0 && this.Xt.compare(t, this.getEndPost()) <= 0
				}, t.prototype.updateChild = function (t, e, n, r, i, o) {
					return this.matches(new st(e, n)) || (n = Bt.EMPTY_NODE), this.Mi.updateChild(t, e, n, r, i, o)
				}, t.prototype.updateFullNode = function (t, e, n) {
					e.isLeafNode() && (e = Bt.EMPTY_NODE);
					var r = e.withIndex(this.Xt);
					r = r.updatePriority(Bt.EMPTY_NODE);
					var i = this;
					return e.forEachChild(St, function (t, e) {
						i.matches(new st(t, e)) || (r = r.updateImmediateChild(t, Bt.EMPTY_NODE))
					}), this.Mi.updateFullNode(t, r, n)
				}, t.prototype.updatePriority = function (t, e) {
					return t
				}, t.prototype.filtersNodes = function () {
					return !0
				}, t.prototype.getIndexedFilter = function () {
					return this.Mi
				}, t.prototype.getIndex = function () {
					return this.Xt
				}, t.qi = function (t) {
					if (t.hasStart()) {
						var e = t.getIndexStartName();
						return t.getIndex().makePost(t.getIndexStartValue(), e)
					}
					return t.getIndex().minPost()
				}, t.Ui = function (t) {
					if (t.hasEnd()) {
						var e = t.getIndexEndName();
						return t.getIndex().makePost(t.getIndexEndValue(), e)
					}
					return t.getIndex().maxPost()
				}, t
			}(),
			Ur = n(0),
			Fr = function () {
				function t(t) {
					this.Vi = new xr(t), this.Xt = t.getIndex(), this.Bi = t.getLimit(), this.Hi = !t.isViewFromLeft()
				}
				return t.prototype.updateChild = function (t, e, n, r, i, o) {
					return this.Vi.matches(new st(e, n)) || (n = Bt.EMPTY_NODE), t.getImmediateChild(e).equals(n) ? t : t.numChildren() < this.Bi ? this.Vi.getIndexedFilter().updateChild(t, e, n, r, i, o) : this.Ki(t, e, n, i, o)
				}, t.prototype.updateFullNode = function (t, e, n) {
					var r;
					if (e.isLeafNode() || e.isEmpty()) r = Bt.EMPTY_NODE.withIndex(this.Xt);
					else if (2 * this.Bi < e.numChildren() && e.isIndexed(this.Xt)) {
						r = Bt.EMPTY_NODE.withIndex(this.Xt);
						a = void 0;
						a = this.Hi ? e.getReverseIteratorFrom(this.Vi.getEndPost(), this.Xt) : e.getIteratorFrom(this.Vi.getStartPost(), this.Xt);
						for (c = 0; a.hasNext() && c < this.Bi;) {
							l = a.getNext();
							if (!(this.Hi ? this.Xt.compare(this.Vi.getStartPost(), l) <= 0 : this.Xt.compare(l, this.Vi.getEndPost()) <= 0)) break;
							r = r.updateImmediateChild(l.name, l.node), c++
						}
					} else {
						r = (r = e.withIndex(this.Xt)).updatePriority(Bt.EMPTY_NODE);
						var i = void 0,
							o = void 0,
							s = void 0,
							a = void 0;
						if (this.Hi) {
							a = r.getReverseIterator(this.Xt), i = this.Vi.getEndPost(), o = this.Vi.getStartPost();
							var u = this.Xt.getCompare();
							s = function (t, e) {
								return u(e, t)
							}
						} else a = r.getIterator(this.Xt), i = this.Vi.getStartPost(), o = this.Vi.getEndPost(), s = this.Xt.getCompare();
						for (var c = 0, h = !1; a.hasNext();) {
							var l = a.getNext();
							!h && s(i, l) <= 0 && (h = !0), h && c < this.Bi && s(l, o) <= 0 ? c++ : r = r.updateImmediateChild(l.name, Bt.EMPTY_NODE)
						}
					}
					return this.Vi.getIndexedFilter().updateFullNode(t, r, n)
				}, t.prototype.updatePriority = function (t, e) {
					return t
				}, t.prototype.filtersNodes = function () {
					return !0
				}, t.prototype.getIndexedFilter = function () {
					return this.Vi.getIndexedFilter()
				}, t.prototype.getIndex = function () {
					return this.Xt
				}, t.prototype.Ki = function (t, e, n, r, i) {
					var o;
					if (this.Hi) {
						var s = this.Xt.getCompare();
						o = function (t, e) {
							return s(e, t)
						}
					} else o = this.Xt.getCompare();
					var a = t;
					Object(Ur.a)(a.numChildren() == this.Bi, "");
					var u = new st(e, n),
						c = this.Hi ? a.getFirstChild(this.Xt) : a.getLastChild(this.Xt),
						h = this.Vi.matches(u);
					if (a.hasChild(e)) {
						for (var l = a.getImmediateChild(e), f = r.getChildAfterChild(this.Xt, c, this.Hi); null != f && (f.name == e || a.hasChild(f.name));) f = r.getChildAfterChild(this.Xt, f, this.Hi);
						var p = null == f ? 1 : o(f, u);
						if (h && !n.isEmpty() && p >= 0) return null != i && i.trackChildChange(We.childChangedChange(e, n, l)), a.updateImmediateChild(e, n);
						null != i && i.trackChildChange(We.childRemovedChange(e, l));
						var d = a.updateImmediateChild(e, Bt.EMPTY_NODE);
						return null != f && this.Vi.matches(f) ? (null != i && i.trackChildChange(We.childAddedChange(f.name, f.node)), d.updateImmediateChild(f.name, f.node)) : d
					}
					return n.isEmpty() ? t : h && o(c, u) >= 0 ? (null != i && (i.trackChildChange(We.childRemovedChange(c.name, c.node)), i.trackChildChange(We.childAddedChange(e, n))), a.updateImmediateChild(e, n).updateImmediateChild(c.name, Bt.EMPTY_NODE)) : t
				}, t
			}(),
			Mr = n(0),
			Vr = n(1),
			Wr = n(3),
			Br = function () {
				function t() {
					this.Yi = !1, this.zi = !1, this.Gi = !1, this.Xi = !1, this.$i = !1, this.Bi = 0, this.Ji = "", this.Zi = null, this.to = "", this.eo = null, this.no = "", this.Xt = St
				}
				return t.prototype.hasStart = function () {
					return this.zi
				}, t.prototype.isViewFromLeft = function () {
					return "" === this.Ji ? this.zi : this.Ji === t.ro.VIEW_FROM_LEFT
				}, t.prototype.getIndexStartValue = function () {
					return Object(Mr.a)(this.zi, "Only valid if start has been set"), this.Zi
				}, t.prototype.getIndexStartName = function () {
					return Object(Mr.a)(this.zi, "Only valid if start has been set"), this.Gi ? this.to : Vr.c
				}, t.prototype.hasEnd = function () {
					return this.Xi
				}, t.prototype.getIndexEndValue = function () {
					return Object(Mr.a)(this.Xi, "Only valid if end has been set"), this.eo
				}, t.prototype.getIndexEndName = function () {
					return Object(Mr.a)(this.Xi, "Only valid if end has been set"), this.$i ? this.no : Vr.b
				}, t.prototype.hasLimit = function () {
					return this.Yi
				}, t.prototype.hasAnchoredLimit = function () {
					return this.Yi && "" !== this.Ji
				}, t.prototype.getLimit = function () {
					return Object(Mr.a)(this.Yi, "Only valid if limit has been set"), this.Bi
				}, t.prototype.getIndex = function () {
					return this.Xt
				}, t.prototype.io = function () {
					var e = new t;
					return e.Yi = this.Yi, e.Bi = this.Bi, e.zi = this.zi, e.Zi = this.Zi, e.Gi = this.Gi, e.to = this.to, e.Xi = this.Xi, e.eo = this.eo, e.$i = this.$i, e.no = this.no, e.Xt = this.Xt, e.Ji = this.Ji, e
				}, t.prototype.limit = function (t) {
					var e = this.io();
					return e.Yi = !0, e.Bi = t, e.Ji = "", e
				}, t.prototype.limitToFirst = function (e) {
					var n = this.io();
					return n.Yi = !0, n.Bi = e, n.Ji = t.ro.VIEW_FROM_LEFT, n
				}, t.prototype.limitToLast = function (e) {
					var n = this.io();
					return n.Yi = !0, n.Bi = e, n.Ji = t.ro.VIEW_FROM_RIGHT, n
				}, t.prototype.startAt = function (t, e) {
					var n = this.io();
					return n.zi = !0, void 0 === t && (t = null), n.Zi = t, null != e ? (n.Gi = !0, n.to = e) : (n.Gi = !1, n.to = ""), n
				}, t.prototype.endAt = function (t, e) {
					var n = this.io();
					return n.Xi = !0, void 0 === t && (t = null), n.eo = t, void 0 !== e ? (n.$i = !0, n.no = e) : (n.$i = !1, n.no = ""), n
				}, t.prototype.orderBy = function (t) {
					var e = this.io();
					return e.Xt = t, e
				}, t.prototype.getQueryObject = function () {
					var e = t.ro,
						n = {};
					if (this.zi && (n[e.INDEX_START_VALUE] = this.Zi, this.Gi && (n[e.INDEX_START_NAME] = this.to)), this.Xi && (n[e.INDEX_END_VALUE] = this.eo, this.$i && (n[e.INDEX_END_NAME] = this.no)), this.Yi) {
						n[e.LIMIT] = this.Bi;
						var r = this.Ji;
						"" === r && (r = this.isViewFromLeft() ? e.VIEW_FROM_LEFT : e.VIEW_FROM_RIGHT), n[e.VIEW_FROM] = r
					}
					return this.Xt !== St && (n[e.INDEX] = "" + this.Xt), n
				}, t.prototype.loadsAllData = function () {
					return !(this.zi || this.Xi || this.Yi)
				}, t.prototype.isDefault = function () {
					return this.loadsAllData() && this.Xt == St
				}, t.prototype.getNodeFilter = function () {
					return this.loadsAllData() ? new Xe(this.getIndex()) : this.hasLimit() ? new Fr(this) : new xr(this)
				}, t.prototype.toRestQueryStringParameters = function () {
					var e = t.oo,
						n = {};
					if (this.isDefault()) return n;
					var r;
					return this.Xt === St ? r = e.PRIORITY_INDEX : this.Xt === Jt ? r = e.VALUE_INDEX : this.Xt === pt ? r = e.KEY_INDEX : (Object(Mr.a)(this.Xt instanceof ne, "Unrecognized index type!"), r = "" + this.Xt), n[e.ORDER_BY] = Object(Wr.b)(r), this.zi && (n[e.START_AT] = Object(Wr.b)(this.Zi), this.Gi && (n[e.START_AT] += "," + Object(Wr.b)(this.to))), this.Xi && (n[e.END_AT] = Object(Wr.b)(this.eo), this.$i && (n[e.END_AT] += "," + Object(Wr.b)(this.no))), this.Yi && (this.isViewFromLeft() ? n[e.LIMIT_TO_FIRST] = this.Bi : n[e.LIMIT_TO_LAST] = this.Bi), n
				}, t.ro = {
					INDEX_START_VALUE: "sp",
					INDEX_START_NAME: "sn",
					INDEX_END_VALUE: "ep",
					INDEX_END_NAME: "en",
					LIMIT: "l",
					VIEW_FROM: "vf",
					VIEW_FROM_LEFT: "l",
					VIEW_FROM_RIGHT: "r",
					INDEX: "i"
				}, t.oo = {
					ORDER_BY: "orderBy",
					PRIORITY_INDEX: "$priority",
					VALUE_INDEX: "$value",
					KEY_INDEX: "$key",
					START_AT: "startAt",
					END_AT: "endAt",
					LIMIT_TO_FIRST: "limitToFirst",
					LIMIT_TO_LAST: "limitToLast"
				}, t.DEFAULT = new t, t
			}(),
			Xr = n(1),
			Hr = n(4),
			qr = this && this.I || function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
				};
				return function (e, n) {
					function r() {
						this.constructor = e
					}
					t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			Kr = function (t) {
				function e(e, n) {
					if (!(e instanceof Lr)) throw Error("new Reference() no longer supported - use app.database().");
					return t.call(this, e, n, Br.DEFAULT, !1) || this
				}
				return qr(e, t), e.prototype.getKey = function () {
					return R("Reference.key", 0, 0, arguments.length), this.path.isEmpty() ? null : this.path.getBack()
				}, e.prototype.child = function (t) {
					return R("Reference.child", 1, 1, arguments.length), "number" == typeof t ? t += "" : t instanceof g || (null === this.path.getFront() ? Y("Reference.child", 1, t, !1) : Q("Reference.child", 1, t, !1)), new e(this.repo, this.path.child(t))
				}, e.prototype.getParent = function () {
					R("Reference.parent", 0, 0, arguments.length);
					var t = this.path.parent();
					return null === t ? null : new e(this.repo, t)
				}, e.prototype.getRoot = function () {
					R("Reference.root", 0, 0, arguments.length);
					for (var t = this; null !== t.getParent();) t = t.getParent();
					return t
				}, e.prototype.databaseProp = function () {
					return this.repo.database
				}, e.prototype.set = function (t, e) {
					R("Reference.set", 1, 2, arguments.length), $("Reference.set", this.path), B("Reference.set", 1, t, this.path, !1), k("Reference.set", 2, e, !0);
					var n = new Hr.a;
					return this.repo.setWithPriority(this.path, t, null, n.wrapCallback(e)), n.promise
				}, e.prototype.update = function (t, e) {
					if (R("Reference.update", 1, 2, arguments.length), $("Reference.update", this.path), Array.isArray(t)) {
						for (var n = {}, r = 0; r < t.length; ++r) n["" + r] = t[r];
						t = n, Object(Xr.B)("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
					}
					q("Reference.update", 1, t, this.path, !1), k("Reference.update", 2, e, !0);
					var i = new Hr.a;
					return this.repo.update(this.path, t, i.wrapCallback(e)), i.promise
				}, e.prototype.setWithPriority = function (t, e, n) {
					if (R("Reference.setWithPriority", 2, 3, arguments.length), $("Reference.setWithPriority", this.path), B("Reference.setWithPriority", 1, t, this.path, !1), K("Reference.setWithPriority", 2, e, !1), k("Reference.setWithPriority", 3, n, !0), ".length" === this.getKey() || ".keys" === this.getKey()) throw "Reference.setWithPriority failed: " + this.getKey() + " is a read-only object.";
					var r = new Hr.a;
					return this.repo.setWithPriority(this.path, t, e, r.wrapCallback(n)), r.promise
				}, e.prototype.remove = function (t) {
					return R("Reference.remove", 0, 1, arguments.length), $("Reference.remove", this.path), k("Reference.remove", 1, t, !0), this.set(null, t)
				}, e.prototype.transaction = function (t, e, n) {
					if (R("Reference.transaction", 1, 3, arguments.length), $("Reference.transaction", this.path), k("Reference.transaction", 1, t, !1), k("Reference.transaction", 2, e, !0), Z("Reference.transaction", 3, n, !0), ".length" === this.getKey() || ".keys" === this.getKey()) throw "Reference.transaction failed: " + this.getKey() + " is a read-only object.";
					void 0 === n && (n = !0);
					var r = new Hr.a;
					"function" == typeof e && Object(Hr.c)(r.promise);
					return this.repo.startTransaction(this.path, t, function (t, n, i) {
						t ? r.reject(t) : r.resolve(new rt(n, i)), "function" == typeof e && e(t, n, i)
					}, n), r.promise
				}, e.prototype.setPriority = function (t, e) {
					R("Reference.setPriority", 1, 2, arguments.length), $("Reference.setPriority", this.path), K("Reference.setPriority", 1, t, !1), k("Reference.setPriority", 2, e, !0);
					var n = new Hr.a;
					return this.repo.setWithPriority(this.path.child(".priority"), t, null, n.wrapCallback(e)), n.promise
				}, e.prototype.push = function (t, e) {
					R("Reference.push", 0, 2, arguments.length), $("Reference.push", this.path), B("Reference.push", 1, t, this.path, !0), k("Reference.push", 2, e, !0);
					var n, r = this.repo.serverTime(),
						i = ot(r),
						o = this.child(i),
						s = this.child(i);
					return n = null != t ? o.set(t, e).then(function () {
						return s
					}) : Hr.b.resolve(s), o.then = n.then.bind(n), o.catch = n.then.bind(n, void 0), "function" == typeof e && Object(Hr.c)(n), o
				}, e.prototype.onDisconnect = function () {
					return $("Reference.onDisconnect", this.path), new nt(this.repo, this.path)
				}, Object.defineProperty(e.prototype, "database", {
					get: function () {
						return this.databaseProp()
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "key", {
					get: function () {
						return this.getKey()
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "parent", {
					get: function () {
						return this.getParent()
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "root", {
					get: function () {
						return this.getRoot()
					},
					enumerable: !0,
					configurable: !0
				}), e
			}(ve);
		ve.se = Kr, on.se = Kr;
		var zr, Gr = n(0),
			Qr = n(2),
			Yr = function () {
				return function () {
					this.children = {}, this.childCount = 0, this.value = null
				}
			}(),
			$r = function () {
				function t(t, e, n) {
					void 0 === t && (t = ""), void 0 === e && (e = null), void 0 === n && (n = new Yr), this.so = t, this.ao = e, this.zt = n
				}
				return t.prototype.subTree = function (e) {
					for (var n, r = e instanceof g ? e : new g(e), i = this; null !== (n = r.getFront());) i = new t(n, i, Object(Qr.l)(i.zt.children, n) || new Yr), r = r.popFront();
					return i
				}, t.prototype.getValue = function () {
					return this.zt.value
				}, t.prototype.setValue = function (t) {
					Object(Gr.a)(void 0 !== t, "Cannot set value to undefined"), this.zt.value = t, this.uo()
				}, t.prototype.clear = function () {
					this.zt.value = null, this.zt.children = {}, this.zt.childCount = 0, this.uo()
				}, t.prototype.hasChildren = function () {
					return this.zt.childCount > 0
				}, t.prototype.isEmpty = function () {
					return null === this.getValue() && !this.hasChildren()
				}, t.prototype.forEachChild = function (e) {
					var n = this;
					Object(Qr.f)(this.zt.children, function (r, i) {
						e(new t(r, n, i))
					})
				}, t.prototype.forEachDescendant = function (t, e, n) {
					e && !n && t(this), this.forEachChild(function (e) {
						e.forEachDescendant(t, !0, n)
					}), e && n && t(this)
				}, t.prototype.forEachAncestor = function (t, e) {
					for (var n = e ? this : this.parent(); null !== n;) {
						if (t(n)) return !0;
						n = n.parent()
					}
					return !1
				}, t.prototype.forEachImmediateDescendantWithValue = function (t) {
					this.forEachChild(function (e) {
						null !== e.getValue() ? t(e) : e.forEachImmediateDescendantWithValue(t)
					})
				}, t.prototype.path = function () {
					return new g(null === this.ao ? this.so : this.ao.path() + "/" + this.so)
				}, t.prototype.name = function () {
					return this.so
				}, t.prototype.parent = function () {
					return this.ao
				}, t.prototype.uo = function () {
					null !== this.ao && this.ao.co(this.so, this)
				}, t.prototype.co = function (t, e) {
					var n = e.isEmpty(),
						r = Object(Qr.b)(this.zt.children, t);
					n && r ? (delete this.zt.children[t], this.zt.childCount--, this.uo()) : n || r || (this.zt.children[t] = e.zt, this.zt.childCount++, this.uo())
				}, t
			}(),
			Jr = n(0),
			Zr = n(1),
			ti = n(2),
			ei = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			};
		! function (t) {
			t[t.RUN = 0] = "RUN", t[t.SENT = 1] = "SENT", t[t.COMPLETED = 2] = "COMPLETED", t[t.SENT_NEEDS_ABORT = 3] = "SENT_NEEDS_ABORT", t[t.NEEDS_ABORT = 4] = "NEEDS_ABORT"
		}(zr || (zr = {})), Lr.ho = 25, Lr.prototype.Ni = function () {
			this.lo = new $r
		}, Lr.prototype.startTransaction = function (t, e, n, r) {
			this.X("transaction on " + t);
			var i = function () {},
				o = new Kr(this, t);
			o.on("value", i);
			var s = {
					path: t,
					update: e,
					onComplete: n,
					status: null,
					order: Object(Zr.a)(),
					applyLocally: r,
					retryCount: 0,
					unwatcher: function () {
						o.off("value", i)
					},
					abortReason: null,
					currentWriteId: null,
					currentInputSnapshot: null,
					currentOutputSnapshotRaw: null,
					currentOutputSnapshotResolved: null
				},
				u = this.po(t);
			s.currentInputSnapshot = u;
			var c = s.update(u.val());
			if (void 0 === c) {
				if (s.unwatcher(), s.currentOutputSnapshotRaw = null, s.currentOutputSnapshotResolved = null, s.onComplete) {
					var h = new re(s.currentInputSnapshot, new Kr(this, s.path), St);
					s.onComplete(null, !1, h)
				}
			} else {
				X("transaction failed: Data returned ", c, s.path), s.status = zr.RUN;
				var l = this.lo.subTree(t),
					f = l.getValue() || [];
				f.push(s), l.setValue(f);
				var p = void 0;
				"object" === (void 0 === c ? "undefined" : ei(c)) && null !== c && Object(ti.b)(c, ".priority") ? (p = Object(ti.l)(c, ".priority"), Object(Jr.a)(W(p), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) : p = (this.Di.calcCompleteEventCache(t) || Bt.EMPTY_NODE).getPriority().val(), p = p;
				var d = this.generateServerValues(),
					v = a(c, p),
					y = Te(v, d);
				s.currentOutputSnapshotRaw = v, s.currentOutputSnapshotResolved = y, s.currentWriteId = this.Fi();
				var g = this.Di.applyUserOverwrite(t, y, s.currentWriteId, s.applyLocally);
				this.Ei.raiseEventsForChangedPath(t, g), this.do()
			}
		}, Lr.prototype.po = function (t, e) {
			return this.Di.calcCompleteEventCache(t, e) || Bt.EMPTY_NODE
		}, Lr.prototype.do = function (t) {
			var e = this;
			if (void 0 === t && (t = this.lo), t || this.fo(t), null !== t.getValue()) {
				var n = this._o(t);
				Object(Jr.a)(n.length > 0, "Sending zero length transaction queue"), n.every(function (t) {
					return t.status === zr.RUN
				}) && this.yo(t.path(), n)
			} else t.hasChildren() && t.forEachChild(function (t) {
				e.do(t)
			})
		}, Lr.prototype.yo = function (t, e) {
			for (var n = this, r = e.map(function (t) {
					return t.currentWriteId
				}), i = this.po(t, r), o = i, s = i.hash(), a = 0; a < e.length; a++) {
				var u = e[a];
				Object(Jr.a)(u.status === zr.RUN, "tryToSendTransactionQueue_: items in queue should all be run."), u.status = zr.SENT, u.retryCount++;
				var c = g.relativePath(t, u.path);
				o = o.updateChild(c, u.currentOutputSnapshotRaw)
			}
			var h = o.val(!0),
				l = t;
			this.En.put("" + l, h, function (r) {
				n.X("transaction put response", {
					path: "" + l,
					status: r
				});
				var i = [];
				if ("ok" === r) {
					for (var o = [], s = 0; s < e.length; s++) {
						if (e[s].status = zr.COMPLETED, i = i.concat(n.Di.ackUserWrite(e[s].currentWriteId)), e[s].onComplete) {
							var a = e[s].currentOutputSnapshotResolved,
								u = new Kr(n, e[s].path),
								c = new re(a, u, St);
							o.push(e[s].onComplete.bind(null, null, !0, c))
						}
						e[s].unwatcher()
					}
					n.fo(n.lo.subTree(t)), n.do(), n.Ei.raiseEventsForChangedPath(t, i);
					for (s = 0; s < o.length; s++) Object(Zr.m)(o[s])
				} else {
					if ("datastale" === r)
						for (s = 0; s < e.length; s++) e[s].status === zr.SENT_NEEDS_ABORT ? e[s].status = zr.NEEDS_ABORT : e[s].status = zr.RUN;
					else {
						Object(Zr.B)("transaction at " + l + " failed: " + r);
						for (s = 0; s < e.length; s++) e[s].status = zr.NEEDS_ABORT, e[s].abortReason = r
					}
					n.ji(t)
				}
			}, s)
		}, Lr.prototype.ji = function (t) {
			var e = this.vo(t),
				n = e.path(),
				r = this._o(e);
			return this.go(r, n), n
		}, Lr.prototype.go = function (t, e) {
			if (0 !== t.length) {
				for (var n = [], r = [], i = t.filter(function (t) {
						return t.status === zr.RUN
					}).map(function (t) {
						return t.currentWriteId
					}), o = 0; o < t.length; o++) {
					var s = t[o],
						u = g.relativePath(e, s.path),
						c = !1,
						h = void 0;
					if (Object(Jr.a)(null !== u, "rerunTransactionsUnderNode_: relativePath should not be null."), s.status === zr.NEEDS_ABORT) c = !0, h = s.abortReason, r = r.concat(this.Di.ackUserWrite(s.currentWriteId, !0));
					else if (s.status === zr.RUN)
						if (s.retryCount >= Lr.ho) c = !0, h = "maxretry", r = r.concat(this.Di.ackUserWrite(s.currentWriteId, !0));
						else {
							var l = this.po(s.path, i);
							s.currentInputSnapshot = l;
							var f = t[o].update(l.val());
							if (void 0 !== f) {
								X("transaction failed: Data returned ", f, s.path);
								var p = a(f);
								"object" === (void 0 === f ? "undefined" : ei(f)) && null != f && Object(ti.b)(f, ".priority") || (p = p.updatePriority(l.getPriority()));
								var d = s.currentWriteId,
									v = this.generateServerValues(),
									y = Te(p, v);
								s.currentOutputSnapshotRaw = p, s.currentOutputSnapshotResolved = y, s.currentWriteId = this.Fi(), i.splice(i.indexOf(d), 1), r = (r = r.concat(this.Di.applyUserOverwrite(s.path, y, s.currentWriteId, s.applyLocally))).concat(this.Di.ackUserWrite(d, !0))
							} else c = !0, h = "nodata", r = r.concat(this.Di.ackUserWrite(s.currentWriteId, !0))
						}
					if (this.Ei.raiseEventsForChangedPath(e, r), r = [], c && (t[o].status = zr.COMPLETED, function (t) {
							setTimeout(t, Math.floor(0))
						}(t[o].unwatcher), t[o].onComplete))
						if ("nodata" === h) {
							var m = new Kr(this, t[o].path),
								b = t[o].currentInputSnapshot,
								w = new re(b, m, St);
							n.push(t[o].onComplete.bind(null, null, !1, w))
						} else n.push(t[o].onComplete.bind(null, Error(h), !1, null))
				}
				this.fo(this.lo);
				for (o = 0; o < n.length; o++) Object(Zr.m)(n[o]);
				this.do()
			}
		}, Lr.prototype.vo = function (t) {
			for (var e, n = this.lo; null !== (e = t.getFront()) && null === n.getValue();) n = n.subTree(e), t = t.popFront();
			return n
		}, Lr.prototype._o = function (t) {
			var e = [];
			return this.mo(t, e), e.sort(function (t, e) {
				return t.order - e.order
			}), e
		}, Lr.prototype.mo = function (t, e) {
			var n = this,
				r = t.getValue();
			if (null !== r)
				for (var i = 0; i < r.length; i++) e.push(r[i]);
			t.forEachChild(function (t) {
				n.mo(t, e)
			})
		}, Lr.prototype.fo = function (t) {
			var e = this,
				n = t.getValue();
			if (n) {
				for (var r = 0, i = 0; i < n.length; i++) n[i].status !== zr.COMPLETED && (n[r] = n[i], r++);
				n.length = r, t.setValue(n.length > 0 ? n : null)
			}
			t.forEachChild(function (t) {
				e.fo(t)
			})
		}, Lr.prototype.Ai = function (t) {
			var e = this,
				n = this.vo(t).path(),
				r = this.lo.subTree(t);
			return r.forEachAncestor(function (t) {
				e.bo(t)
			}), this.bo(r), r.forEachDescendant(function (t) {
				e.bo(t)
			}), n
		}, Lr.prototype.bo = function (t) {
			var e = t.getValue();
			if (null !== e) {
				for (var n = [], r = [], i = -1, o = 0; o < e.length; o++) e[o].status === zr.SENT_NEEDS_ABORT || (e[o].status === zr.SENT ? (Object(Jr.a)(i === o - 1, "All SENT items should be at beginning of queue."), i = o, e[o].status = zr.SENT_NEEDS_ABORT, e[o].abortReason = "set") : (Object(Jr.a)(e[o].status === zr.RUN, "Unexpected transaction status in abort"), e[o].unwatcher(), r = r.concat(this.Di.ackUserWrite(e[o].currentWriteId, !0)), e[o].onComplete && n.push(e[o].onComplete.bind(null, Error("set"), !1, null)))); - 1 === i ? t.setValue(null) : e.length = i + 1, this.Ei.raiseEventsForChangedPath(t.path(), r);
				for (o = 0; o < n.length; o++) Object(Zr.m)(n[o])
			}
		};
		var ni, ri = n(2),
			ii = n(1),
			oi = function () {
				function t() {
					this.Co = {}, this.Eo = !1
				}
				return t.getInstance = function () {
					return ni || (ni = new t), ni
				}, t.prototype.interrupt = function () {
					for (var t in this.Co) this.Co[t].interrupt()
				}, t.prototype.resume = function () {
					for (var t in this.Co) this.Co[t].resume()
				}, t.prototype.databaseFromApp = function (t) {
					var e = t.options.databaseURL;
					void 0 === e && Object(ii.o)("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");
					var n = S(e),
						r = n.repoInfo;
					return J("Invalid Firebase Database URL", 1, n), n.path.isEmpty() || Object(ii.o)("Database URL must point to the root of a Firebase Database (not including a child path)."), this.createRepo(r, t).database
				}, t.prototype.deleteRepo = function (t) {
					Object(ri.l)(this.Co, t.app.name) !== t && Object(ii.o)("Database " + t.app.name + " has already been deleted."), t.interrupt(), delete this.Co[t.app.name]
				}, t.prototype.createRepo = function (t, e) {
					var n = Object(ri.l)(this.Co, e.name);
					return n && Object(ii.o)("FIREBASE INTERNAL ERROR: Database initialized multiple times."), n = new Lr(t, this.Eo, e), this.Co[e.name] = n, n
				}, t.prototype.forceRestClient = function (t) {
					this.Eo = t
				}, t
			}(),
			si = n(1),
			ai = n(4),
			ui = function () {
				function t(t) {
					this._t = t, t instanceof Lr || Object(si.o)("Don't call new Database() directly - please use firebase.database()."), this.Lt = new Kr(t, g.Empty), this.INTERNAL = new ci(this)
				}
				return Object.defineProperty(t.prototype, "app", {
					get: function () {
						return this._t.app
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.ref = function (t) {
					return this.wo("ref"), R("database.ref", 0, 1, arguments.length), void 0 !== t ? this.Lt.child(t) : this.Lt
				}, t.prototype.refFromURL = function (t) {
					var e = "database.refFromURL";
					this.wo(e), R(e, 1, 1, arguments.length);
					var n = S(t);
					J(e, 1, n);
					var r = n.repoInfo;
					return r.host !== this._t.Hn.host && Object(si.o)(e + ": Host name does not match the current database: (found " + r.host + " but expected " + this._t.Hn.host + ")"), this.ref("" + n.path)
				}, t.prototype.wo = function (t) {
					null === this._t && Object(si.o)("Cannot call " + t + " on a deleted database.")
				}, t.prototype.goOffline = function () {
					R("database.goOffline", 0, 0, arguments.length), this.wo("goOffline"), this._t.interrupt()
				}, t.prototype.goOnline = function () {
					R("database.goOnline", 0, 0, arguments.length), this.wo("goOnline"), this._t.resume()
				}, t.ServerValue = {
					TIMESTAMP: {
						".sv": "timestamp"
					}
				}, t
			}(),
			ci = function () {
				function t(t) {
					this.database = t
				}
				return t.prototype.delete = function () {
					return this.database.wo("delete"), oi.getInstance().deleteRepo(this.database._t), this.database._t = null, this.database.Lt = null, this.database.INTERNAL = null, this.database = null, ai.b.resolve()
				}, t
			}(),
			hi = {};
		n.d(hi, "forceLongPolling", function () {
			return fi
		}), n.d(hi, "forceWebSockets", function () {
			return pi
		}), n.d(hi, "isWebSocketsAvailable", function () {
			return di
		}), n.d(hi, "setSecurityDebugCallback", function () {
			return vi
		}), n.d(hi, "stats", function () {
			return yi
		}), n.d(hi, "statsIncrementCounter", function () {
			return gi
		}), n.d(hi, "dataUpdateCount", function () {
			return mi
		}), n.d(hi, "interceptServerData", function () {
			return bi
		});
		var li = n(18),
			fi = function () {
				li.a.forceDisallow(), tr.forceAllow()
			},
			pi = function () {
				tr.forceDisallow()
			},
			di = function () {
				return li.a.isAvailable()
			},
			vi = function (t, e) {
				t.repo.Si.Qr = e
			},
			yi = function (t, e) {
				t.repo.stats(e)
			},
			gi = function (t, e) {
				t.repo.statsIncrementCounter(e)
			},
			mi = function (t) {
				return t.repo.dataUpdateCount
			},
			bi = function (t, e) {
				return t.repo.xi(e)
			},
			wi = {};
		n.d(wi, "DataConnection", function () {
			return Ei
		}), n.d(wi, "RealTimeConnection", function () {
			return Oi
		}), n.d(wi, "hijackHash", function () {
			return Ii
		}), n.d(wi, "ConnectionTarget", function () {
			return Ti
		}), n.d(wi, "queryIdentifier", function () {
			return Ci
		}), n.d(wi, "listens", function () {
			return Si
		}), n.d(wi, "forceRestClient", function () {
			return Ai
		});
		var Ei = Er;
		Er.prototype.simpleListen = function (t, e) {
			this.sendRequest("q", {
				p: t
			}, e)
		}, Er.prototype.echo = function (t, e) {
			this.sendRequest("echo", {
				d: t
			}, e)
		};
		var Oi = ur,
			Ii = function (t) {
				var e = Er.prototype.put;
				return Er.prototype.put = function (n, r, i, o) {
						void 0 !== o && (o = t()), e.call(this, n, r, i, o)
					},
					function () {
						Er.prototype.put = e
					}
			},
			Ti = T,
			Ci = function (t) {
				return t.queryIdentifier()
			},
			Si = function (t) {
				return t.repo.Si.kr
			},
			Ai = function (t) {
				oi.getInstance().forceRestClient(t)
			};
		(function (t) {
			function r(e) {
				var n = e.INTERNAL.registerService("database", function (t) {
					return oi.getInstance().databaseFromApp(t)
				}, {
					Reference: Kr,
					Query: ve,
					Database: ui,
					enableLogging: o.j,
					INTERNAL: hi,
					ServerValue: ui.ServerValue,
					TEST_ACCESS: wi
				});
				Object(s.b)() && (t.exports = n)
			}
			e.registerDatabase = r;
			var i = n(5),
				o = n(1),
				s = n(6);
			r(i.default)
		}).call(e, n(26)(t))
	}, function (t, e) {
		t.exports = function (t) {
			if (!t.webpackPolyfill) {
				var e = Object.create(t);
				e.children || (e.children = []), Object.defineProperty(e, "loaded", {
					enumerable: !0,
					get: function () {
						return e.l
					}
				}), Object.defineProperty(e, "id", {
					enumerable: !0,
					get: function () {
						return e.i
					}
				}), Object.defineProperty(e, "exports", {
					enumerable: !0
				}), e.webpackPolyfill = 1
			}
			return e
		}
	}], [25])
} catch (t) {
	throw Error("Cannot instantiate firebase-database.js - be sure to load firebase-app.js first.")
}
try {
	webpackJsonpFirebase([2], {
		24: function (t, e, n) {
			"use strict";

			function r(t) {
				var e = new Uint8Array(t);
				return window.btoa(String.fromCharCode.apply(null, e))
			}

			function i(t) {
				var e = {
					Messaging: O
				};
				t.INTERNAL.registerService("messaging", function (t) {
					return self && "ServiceWorkerGlobalScope" in self ? new C(t) : new O(t)
				}, e)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var o, s = {
					AVAILABLE_IN_WINDOW: "only-available-in-window",
					AVAILABLE_IN_SW: "only-available-in-sw",
					SHOULD_BE_INHERITED: "should-be-overriden",
					BAD_SENDER_ID: "bad-sender-id",
					INCORRECT_GCM_SENDER_ID: "incorrect-gcm-sender-id",
					PERMISSION_DEFAULT: "permission-default",
					PERMISSION_BLOCKED: "permission-blocked",
					UNSUPPORTED_BROWSER: "unsupported-browser",
					NOTIFICATIONS_BLOCKED: "notifications-blocked",
					FAILED_DEFAULT_REGISTRATION: "failed-serviceworker-registration",
					SW_REGISTRATION_EXPECTED: "sw-registration-expected",
					GET_SUBSCRIPTION_FAILED: "get-subscription-failed",
					INVALID_SAVED_TOKEN: "invalid-saved-token",
					SW_REG_REDUNDANT: "sw-reg-redundant",
					TOKEN_SUBSCRIBE_FAILED: "token-subscribe-failed",
					TOKEN_SUBSCRIBE_NO_TOKEN: "token-subscribe-no-token",
					TOKEN_SUBSCRIBE_NO_PUSH_SET: "token-subscribe-no-push-set",
					USE_SW_BEFORE_GET_TOKEN: "use-sw-before-get-token",
					INVALID_DELETE_TOKEN: "invalid-delete-token",
					DELETE_TOKEN_NOT_FOUND: "delete-token-not-found",
					DELETE_SCOPE_NOT_FOUND: "delete-scope-not-found",
					BG_HANDLER_FUNCTION_EXPECTED: "bg-handler-function-expected",
					NO_WINDOW_CLIENT_TO_MSG: "no-window-client-to-msg",
					UNABLE_TO_RESUBSCRIBE: "unable-to-resubscribe",
					NO_FCM_TOKEN_FOR_RESUBSCRIBE: "no-fcm-token-for-resubscribe",
					FAILED_TO_DELETE_TOKEN: "failed-to-delete-token",
					NO_SW_IN_REG: "no-sw-in-reg",
					BAD_SCOPE: "bad-scope",
					BAD_VAPID_KEY: "bad-vapid-key",
					BAD_SUBSCRIPTION: "bad-subscription",
					BAD_TOKEN: "bad-token",
					BAD_PUSH_SET: "bad-push-set",
					FAILED_DELETE_VAPID_KEY: "failed-delete-vapid-key"
				},
				a = {
					codes: s,
					map: (o = {}, o[s.AVAILABLE_IN_WINDOW] = "This method is available in a Window context.", o[s.AVAILABLE_IN_SW] = "This method is available in a service worker context.", o["should-be-overriden"] = "This method should be overriden by extended classes.", o["bad-sender-id"] = "Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().", o["permission-default"] = "The required permissions were not granted and dismissed instead.", o["permission-blocked"] = "The required permissions were not granted and blocked instead.", o["unsupported-browser"] = "This browser doesn't support the API's required to use the firebase SDK.", o["notifications-blocked"] = "Notifications have been blocked.", o[s.FAILED_DEFAULT_REGISTRATION] = "We are unable to register the default service worker. {$browserErrorMessage}", o["sw-registration-expected"] = "A service worker registration was the expected input.", o["get-subscription-failed"] = "There was an error when trying to get any existing Push Subscriptions.", o["invalid-saved-token"] = "Unable to access details of the saved token.", o["sw-reg-redundant"] = "The service worker being used for push was made redundant.", o["token-subscribe-failed"] = "A problem occured while subscribing the user to FCM: {$message}", o["token-subscribe-no-token"] = "FCM returned no token when subscribing the user to push.", o["token-subscribe-no-push-set"] = "FCM returned an invalid response when getting an FCM token.", o["use-sw-before-get-token"] = "You must call useServiceWorker() before calling getToken() to ensure your service worker is used.", o["invalid-delete-token"] = "You must pass a valid token into deleteToken(), i.e. the token from getToken().", o["delete-token-not-found"] = "The deletion attempt for token could not be performed as the token was not found.", o["delete-scope-not-found"] = "The deletion attempt for service worker scope could not be performed as the scope was not found.", o["bg-handler-function-expected"] = "The input to setBackgroundMessageHandler() must be a function.", o["no-window-client-to-msg"] = "An attempt was made to message a non-existant window client.", o["unable-to-resubscribe"] = "There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}", o["no-fcm-token-for-resubscribe"] = "Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.", o["failed-to-delete-token"] = "Unable to delete the currently saved token.", o["no-sw-in-reg"] = "Even though the service worker registration was successful, there was a problem accessing the service worker itself.", o["incorrect-gcm-sender-id"] = "Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.", o["bad-scope"] = "The service worker scope must be a string with at least one character.", o["bad-vapid-key"] = "The public VAPID key must be a string with at least one character.", o["bad-subscription"] = "The subscription must be a valid PushSubscription.", o["bad-token"] = "The FCM Token used for storage / lookup was not a valid token string.", o["bad-push-set"] = "The FCM push set used for storage / lookup was not not a valid push set string.", o["failed-delete-vapid-key"] = "The VAPID key could not be deleted.", o)
				},
				u = function (t) {
					return r(t).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
				},
				c = [4, 51, 148, 247, 223, 161, 235, 177, 220, 3, 162, 94, 21, 113, 219, 72, 211, 46, 237, 237, 178, 52, 219, 183, 71, 58, 12, 143, 196, 204, 225, 111, 60, 140, 132, 223, 171, 182, 102, 62, 242, 12, 212, 139, 254, 227, 249, 118, 47, 20, 28, 99, 8, 106, 111, 45, 177, 26, 149, 176, 206, 55, 192, 156, 110],
				h = {
					ENDPOINT: "https://fcm.googleapis.com",
					APPLICATION_SERVER_KEY: c,
					SUBSCRIPTION_OPTIONS: {
						userVisibleOnly: !0,
						applicationServerKey: new Uint8Array(c)
					}
				},
				l = n(10),
				f = "fcm_token_object_Store",
				p = function () {
					function t() {
						this.e = new l.a("messaging", "Messaging", a.map), this.t = null
					}
					return t.prototype.r = function () {
						return this.t ? this.t : (this.t = new Promise(function (t, e) {
							var n = indexedDB.open("fcm_token_details_db", 1);
							n.onerror = function (t) {
								e(t.target.error)
							}, n.onsuccess = function (e) {
								t(e.target.result)
							}, n.onupgradeneeded = function (t) {
								var e = t.target.result.createObjectStore(f, {
									keyPath: "swScope"
								});
								e.createIndex("fcmSenderId", "fcmSenderId", {
									unique: !1
								}), e.createIndex("fcmToken", "fcmToken", {
									unique: !0
								})
							}
						}), this.t)
					}, t.prototype.closeDatabase = function () {
						var t = this;
						return this.t ? this.t.then(function (e) {
							e.close(), t.t = null
						}) : Promise.resolve()
					}, t.prototype.getTokenDetailsFromToken = function (t) {
						return this.r().then(function (e) {
							return new Promise(function (n, r) {
								var i = e.transaction([f]).objectStore(f).index("fcmToken").get(t);
								i.onerror = function (t) {
									r(t.target.error)
								}, i.onsuccess = function (t) {
									n(t.target.result)
								}
							})
						})
					}, t.prototype.n = function (t) {
						return this.r().then(function (e) {
							return new Promise(function (n, r) {
								var i = e.transaction([f]).objectStore(f).get(t);
								i.onerror = function (t) {
									r(t.target.error)
								}, i.onsuccess = function (t) {
									n(t.target.result)
								}
							})
						})
					}, t.prototype.o = function (t) {
						return this.r().then(function (e) {
							return new Promise(function (n, r) {
								var i = [],
									o = e.transaction([f]).objectStore(f).openCursor();
								o.onerror = function (t) {
									r(t.target.error)
								}, o.onsuccess = function (e) {
									var r = e.target.result;
									r ? (r.value.fcmSenderId === t && i.push(r.value), r.continue()) : n(i)
								}
							})
						})
					}, t.prototype.subscribeToFCM = function (t, e, n) {
						var r = this,
							i = u(e.getKey("p256dh")),
							o = u(e.getKey("auth")),
							s = "authorized_entity=" + t + "&endpoint=" + e.endpoint + "&encryption_key=" + i + "&encryption_auth=" + o;
						n && (s += "&pushSet=" + n);
						var c = new Headers;
						c.append("Content-Type", "application/x-www-form-urlencoded");
						var l = {
							method: "POST",
							headers: c,
							body: s
						};
						return fetch(h.ENDPOINT + "/fcm/connect/subscribe", l).then(function (t) {
							return t.json()
						}).then(function (t) {
							var e = t;
							if (e.error) {
								var n = e.error.message;
								throw r.e.create(a.codes.TOKEN_SUBSCRIBE_FAILED, {
									message: n
								})
							}
							if (!e.token) throw r.e.create(a.codes.TOKEN_SUBSCRIBE_NO_TOKEN);
							if (!e.pushSet) throw r.e.create(a.codes.TOKEN_SUBSCRIBE_NO_PUSH_SET);
							return {
								token: e.token,
								pushSet: e.pushSet
							}
						})
					}, t.prototype.i = function (t, e) {
						return t.endpoint === e.endpoint && u(t.getKey("auth")) === e.auth && u(t.getKey("p256dh")) === e.p256dh
					}, t.prototype.s = function (t, e, n, r, i) {
						var o = {
							swScope: e.scope,
							endpoint: n.endpoint,
							auth: u(n.getKey("auth")),
							p256dh: u(n.getKey("p256dh")),
							fcmToken: r,
							fcmPushSet: i,
							fcmSenderId: t
						};
						return this.r().then(function (t) {
							return new Promise(function (e, n) {
								var r = t.transaction([f], "readwrite").objectStore(f).put(o);
								r.onerror = function (t) {
									n(t.target.error)
								}, r.onsuccess = function (t) {
									e()
								}
							})
						})
					}, t.prototype.getSavedToken = function (t, e) {
						var n = this;
						return e instanceof ServiceWorkerRegistration ? "string" != typeof t || 0 === t.length ? Promise.reject(this.e.create(a.codes.BAD_SENDER_ID)) : this.o(t).then(function (n) {
							if (0 !== n.length) {
								var r = n.findIndex(function (n) {
									return e.scope === n.swScope && t === n.fcmSenderId
								});
								if (-1 !== r) return n[r]
							}
						}).then(function (t) {
							if (t) return e.pushManager.getSubscription().catch(function (t) {
								throw n.e.create(a.codes.GET_SUBSCRIPTION_FAILED)
							}).then(function (e) {
								if (e && n.i(e, t)) return t.fcmToken
							})
						}) : Promise.reject(this.e.create(a.codes.SW_REGISTRATION_EXPECTED))
					}, t.prototype.createToken = function (t, e) {
						var n = this;
						if ("string" != typeof t || 0 === t.length) return Promise.reject(this.e.create(a.codes.BAD_SENDER_ID));
						if (!(e instanceof ServiceWorkerRegistration)) return Promise.reject(this.e.create(a.codes.SW_REGISTRATION_EXPECTED));
						var r, i;
						return e.pushManager.getSubscription().then(function (t) {
							return t || e.pushManager.subscribe(h.SUBSCRIPTION_OPTIONS)
						}).then(function (e) {
							return r = e, n.subscribeToFCM(t, r)
						}).then(function (o) {
							return i = o, n.s(t, e, r, i.token, i.pushSet)
						}).then(function () {
							return i.token
						})
					}, t.prototype.deleteToken = function (t) {
						var e = this;
						return "string" != typeof t || 0 === t.length ? Promise.reject(this.e.create(a.codes.INVALID_DELETE_TOKEN)) : this.getTokenDetailsFromToken(t).then(function (t) {
							if (!t) throw e.e.create(a.codes.DELETE_TOKEN_NOT_FOUND);
							return e.r().then(function (n) {
								return new Promise(function (r, i) {
									var o = n.transaction([f], "readwrite").objectStore(f).delete(t.swScope);
									o.onerror = function (t) {
										i(t.target.error)
									}, o.onsuccess = function (n) {
										0 !== n.target.result ? r(t) : i(e.e.create(a.codes.FAILED_TO_DELETE_TOKEN))
									}
								})
							})
						})
					}, t
				}(),
				d = n(10),
				v = "messagingSenderId",
				y = function () {
					function t(t) {
						var e = this;
						if (this.e = new d.a("messaging", "Messaging", a.map), !t.options[v] || "string" != typeof t.options[v]) throw this.e.create(a.codes.BAD_SENDER_ID);
						this.c = t.options[v], this.u = new p, this.app = t, this.INTERNAL = {}, this.INTERNAL.delete = function () {
							return e.delete
						}
					}
					return t.prototype.getToken = function () {
						var t = this,
							e = this._();
						return "granted" !== e ? "denied" === e ? Promise.reject(this.e.create(a.codes.NOTIFICATIONS_BLOCKED)) : Promise.resolve(null) : this.f().then(function (e) {
							return t.u.getSavedToken(t.c, e).then(function (n) {
								return n || t.u.createToken(t.c, e)
							})
						})
					}, t.prototype.deleteToken = function (t) {
						var e = this;
						return this.u.deleteToken(t).then(function () {
							return e.f().then(function (t) {
								if (t) return t.pushManager.getSubscription()
							}).then(function (t) {
								if (t) return t.unsubscribe()
							})
						})
					}, t.prototype.f = function () {
						throw this.e.create(a.codes.SHOULD_BE_INHERITED)
					}, t.prototype.requestPermission = function () {
						throw this.e.create(a.codes.AVAILABLE_IN_WINDOW)
					}, t.prototype.useServiceWorker = function (t) {
						throw this.e.create(a.codes.AVAILABLE_IN_WINDOW)
					}, t.prototype.onMessage = function (t, e, n) {
						throw this.e.create(a.codes.AVAILABLE_IN_WINDOW)
					}, t.prototype.onTokenRefresh = function (t, e, n) {
						throw this.e.create(a.codes.AVAILABLE_IN_WINDOW)
					}, t.prototype.setBackgroundMessageHandler = function (t) {
						throw this.e.create(a.codes.AVAILABLE_IN_SW)
					}, t.prototype.delete = function () {
						this.u.closeDatabase()
					}, t.prototype._ = function () {
						return Notification.permission
					}, t.prototype.getTokenManager = function () {
						return this.u
					}, t
				}(),
				g = {
					TYPE_OF_MSG: "firebase-messaging-msg-type",
					DATA: "firebase-messaging-msg-data"
				},
				m = {
					PARAMS: g,
					TYPES_OF_MSG: {
						PUSH_MSG_RECEIVED: "push-msg-received",
						NOTIFICATION_CLICKED: "notification-clicked"
					},
					createNewMsg: function (t, e) {
						return n = {}, n[g.TYPE_OF_MSG] = t, n[g.DATA] = e, n;
						var n
					}
				},
				b = {
					path: "/firebase-messaging-sw.js",
					scope: "/firebase-cloud-messaging-push-scope"
				},
				w = n(13),
				E = this && this.d || function () {
					var t = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function (t, e) {
						t.__proto__ = e
					} || function (t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
					};
					return function (e, n) {
						function r() {
							this.constructor = e
						}
						t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
					}
				}(),
				O = function (t) {
					function e(e) {
						var n = t.call(this, e) || this;
						return n.h, n.p, n.l = null, n.g = Object(w.a)(function (t) {
							n.l = t
						}), n.S = null, n.T = Object(w.a)(function (t) {
							n.S = t
						}), n.b(), n
					}
					return E(e, t), e.prototype.getToken = function () {
						var e = this;
						return this.m() ? this.v().then(function () {
							return t.prototype.getToken.call(e)
						}) : Promise.reject(this.e.create(a.codes.UNSUPPORTED_BROWSER))
					}, e.prototype.v = function () {
						var t = this;
						if (this.p) return this.p;
						var e = document.querySelector('link[rel="manifest"]');
						return this.p = e ? fetch(e.href).then(function (t) {
							return t.json()
						}).catch(function () {
							return Promise.resolve()
						}).then(function (e) {
							if (e && e.gcm_sender_id && "103953800507" !== e.gcm_sender_id) throw t.e.create(a.codes.INCORRECT_GCM_SENDER_ID)
						}) : Promise.resolve(), this.p
					}, e.prototype.requestPermission = function () {
						var t = this;
						return "granted" === Notification.permission ? Promise.resolve() : new Promise(function (e, n) {
							var r = function (r) {
									return "granted" === r ? e() : n("denied" === r ? t.e.create(a.codes.PERMISSION_BLOCKED) : t.e.create(a.codes.PERMISSION_DEFAULT))
								},
								i = Notification.requestPermission(function (t) {
									i || r(t)
								});
							i && i.then(r)
						})
					}, e.prototype.useServiceWorker = function (t) {
						if (!(t instanceof ServiceWorkerRegistration)) throw this.e.create(a.codes.SW_REGISTRATION_EXPECTED);
						if (void 0 !== this.h) throw this.e.create(a.codes.USE_SW_BEFORE_GET_TOKEN);
						this.h = t
					}, e.prototype.onMessage = function (t, e, n) {
						return this.g(t, e, n)
					}, e.prototype.onTokenRefresh = function (t, e, n) {
						return this.T(t, e, n)
					}, e.prototype.I = function (t) {
						var e = this,
							n = t.installing || t.waiting || t.active;
						return new Promise(function (r, i) {
							if (n)
								if ("activated" !== n.state)
									if ("redundant" !== n.state) {
										n.addEventListener("statechange", function o() {
											if ("activated" === n.state) r(t);
											else {
												if ("redundant" !== n.state) return;
												i(e.e.create(a.codes.SW_REG_REDUNDANT))
											}
											n.removeEventListener("statechange", o)
										})
									} else i(e.e.create(a.codes.SW_REG_REDUNDANT));
							else r(t);
							else i(e.e.create(a.codes.NO_SW_IN_REG))
						})
					}, e.prototype.f = function () {
						var t = this;
						return this.h ? this.I(this.h) : (this.h = null, navigator.serviceWorker.register("/firebase-messaging-sw.js", {
							scope: b.scope
						}).catch(function (e) {
							throw t.e.create(a.codes.FAILED_DEFAULT_REGISTRATION, {
								browserErrorMessage: e.message
							})
						}).then(function (e) {
							return t.I(e).then(function () {
								return t.h = e, e.update(), e
							})
						}))
					}, e.prototype.b = function () {
						var t = this;
						"serviceWorker" in navigator && navigator.serviceWorker.addEventListener("message", function (e) {
							if (e.data && e.data[m.PARAMS.TYPE_OF_MSG]) {
								var n = e.data;
								switch (n[m.PARAMS.TYPE_OF_MSG]) {
									case m.TYPES_OF_MSG.PUSH_MSG_RECEIVED:
									case m.TYPES_OF_MSG.NOTIFICATION_CLICKED:
										var r = n[m.PARAMS.DATA];
										t.l.next(r)
								}
							}
						}, !1)
					}, e.prototype.m = function () {
						return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window && "fetch" in window && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey")
					}, e
				}(y),
				I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				},
				T = this && this.d || function () {
					var t = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function (t, e) {
						t.__proto__ = e
					} || function (t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
					};
					return function (e, n) {
						function r() {
							this.constructor = e
						}
						t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
					}
				}(),
				C = function (t) {
					function e(e) {
						var n = t.call(this, e) || this;
						return self.addEventListener("push", function (t) {
							return n.y(t)
						}, !1), self.addEventListener("pushsubscriptionchange", function (t) {
							return n.N(t)
						}, !1), self.addEventListener("notificationclick", function (t) {
							return n.w(t)
						}, !1), n.k = null, n
					}
					return T(e, t), e.prototype.y = function (t) {
						var e, n = this;
						try {
							e = t.data.json()
						} catch (t) {
							return
						}
						var r = this.O().then(function (t) {
							if (t) {
								if (e.notification || n.k) return n.D(e)
							} else {
								var r = n.A(e);
								if (r) {
									var i = r.title || "";
									return self.registration.showNotification(i, r)
								}
								if (n.k) return n.k(e)
							}
						});
						t.waitUntil(r)
					}, e.prototype.N = function (t) {
						var e = this,
							n = this.getToken().then(function (t) {
								if (!t) throw e.e.create(a.codes.NO_FCM_TOKEN_FOR_RESUBSCRIBE);
								var n = null,
									r = e.getTokenManager();
								return r.getTokenDetailsFromToken(t).then(function (t) {
									if (!(n = t)) throw e.e.create(a.codes.INVALID_SAVED_TOKEN);
									return self.registration.pushManager.subscribe(h.SUBSCRIPTION_OPTIONS)
								}).then(function (t) {
									return r.subscribeToFCM(n.fcmSenderId, t, n.fcmPushSet)
								}).catch(function (t) {
									return r.deleteToken(n.fcmToken).then(function () {
										throw e.e.create(a.codes.UNABLE_TO_RESUBSCRIBE, {
											message: t
										})
									})
								})
							});
						t.waitUntil(n)
					}, e.prototype.w = function (t) {
						var e = this;
						if (t.notification && t.notification.data && t.notification.data.FCM_MSG) {
							t.stopImmediatePropagation(), t.notification.close();
							var n = t.notification.data.FCM_MSG,
								r = n.notification.click_action;
							if (r) {
								var i = this.P(r).then(function (t) {
									return t || self.clients.openWindow(r)
								}).then(function (t) {
									if (t) {
										n.notification, delete n.notification;
										var r = m.createNewMsg(m.TYPES_OF_MSG.NOTIFICATION_CLICKED, n);
										return e.R(t, r)
									}
								});
								t.waitUntil(i)
							}
						}
					}, e.prototype.A = function (t) {
						if (t && "object" === I(t.notification)) {
							var e = Object.assign({}, t.notification);
							return e.data = (n = {}, n.FCM_MSG = t, n), e;
							var n
						}
					}, e.prototype.setBackgroundMessageHandler = function (t) {
						if (t && "function" != typeof t) throw this.e.create(a.codes.BG_HANDLER_FUNCTION_EXPECTED);
						this.k = t
					}, e.prototype.P = function (t) {
						var e = new URL(t).href;
						return self.clients.matchAll({
							type: "window",
							includeUncontrolled: !0
						}).then(function (t) {
							for (var n = null, r = 0; r < t.length; r++)
								if (new URL(t[r].url).href === e) {
									n = t[r];
									break
								}
							if (n) return n.focus(), n
						})
					}, e.prototype.R = function (t, e) {
						var n = this;
						return new Promise(function (r, i) {
							if (!t) return i(n.e.create(a.codes.NO_WINDOW_CLIENT_TO_MSG));
							t.postMessage(e), r()
						})
					}, e.prototype.O = function () {
						return self.clients.matchAll({
							type: "window",
							includeUncontrolled: !0
						}).then(function (t) {
							return t.some(function (t) {
								return "visible" === t.visibilityState
							})
						})
					}, e.prototype.D = function (t) {
						var e = this;
						return self.clients.matchAll({
							type: "window",
							includeUncontrolled: !0
						}).then(function (n) {
							var r = m.createNewMsg(m.TYPES_OF_MSG.PUSH_MSG_RECEIVED, t);
							return Promise.all(n.map(function (t) {
								return e.R(t, r)
							}))
						})
					}, e.prototype.f = function () {
						return Promise.resolve(self.registration)
					}, e
				}(y);
			e.registerMessaging = i, i(n(5).default)
		}
	}, [24])
} catch (t) {
	throw Error("Cannot instantiate firebase-messaging.js - be sure to load firebase-app.js first.")
}
try {
	webpackJsonpFirebase([1], {
		23: function (t, e, n) {
			"use strict";

			function r(t) {
				return "storage/" + t
			}

			function i() {
				return new Zt(te.UNKNOWN, "An unknown error occurred, please check the error payload for server response.")
			}

			function o(t) {
				return new Zt(te.OBJECT_NOT_FOUND, "Object '" + t + "' does not exist.")
			}

			function s(t) {
				return new Zt(te.QUOTA_EXCEEDED, "Quota for bucket '" + t + "' exceeded, please view quota on https://firebase.google.com/pricing/.")
			}

			function a() {
				return new Zt(te.UNAUTHENTICATED, "User is not authenticated, please authenticate using Firebase Authentication and try again.")
			}

			function u(t) {
				return new Zt(te.UNAUTHORIZED, "User does not have permission to access '" + t + "'.")
			}

			function c() {
				return new Zt(te.RETRY_LIMIT_EXCEEDED, "Max retry time for operation exceeded, please try again.")
			}

			function h() {
				return new Zt(te.CANCELED, "User canceled the upload/download.")
			}

			function l(t) {
				return new Zt(te.INVALID_URL, "Invalid URL '" + t + "'.")
			}

			function f(t) {
				return new Zt(te.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + t + "'.")
			}

			function p() {
				return new Zt(te.CANNOT_SLICE_BLOB, "Cannot slice blob for upload. Please retry the upload.")
			}

			function d() {
				return new Zt(te.SERVER_FILE_WRONG_SIZE, "Server recorded incorrect upload file size, please retry the upload.")
			}

			function v() {
				return new Zt(te.NO_DOWNLOAD_URL, "The given file does not have any download URLs.")
			}

			function y(t, e, n) {
				return new Zt(te.INVALID_ARGUMENT, "Invalid argument in `" + e + "` at index " + t + ": " + n)
			}

			function g(t, e, n, r) {
				var i, o;
				return t === e ? (i = t, o = 1 === t ? "argument" : "arguments") : (i = "between " + t + " and " + e, o = "arguments"), new Zt(te.INVALID_ARGUMENT_COUNT, "Invalid argument count in `" + n + "`: Expected " + i + " " + o + ", received " + r + ".")
			}

			function m() {
				return new Zt(te.APP_DELETED, "The Firebase app was deleted.")
			}

			function b(t) {
				return new Zt(te.INVALID_ROOT_OPERATION, "The operation '" + t + "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")
			}

			function w(t, e) {
				return new Zt(te.INVALID_FORMAT, "String does not match format '" + t + "': " + e)
			}

			function E(t) {
				throw new Zt(te.INTERNAL_ERROR, "Internal error: " + t)
			}

			function O(t) {
				switch (t) {
					case ee.RAW:
					case ee.BASE64:
					case ee.BASE64URL:
					case ee.DATA_URL:
						return;
					default:
						throw "Expected one of the event types: [" + ee.RAW + ", " + ee.BASE64 + ", " + ee.BASE64URL + ", " + ee.DATA_URL + "]."
				}
			}

			function I(t, e) {
				switch (t) {
					case ee.RAW:
						return new ne(T(e));
					case ee.BASE64:
					case ee.BASE64URL:
						return new ne(S(t, e));
					case ee.DATA_URL:
						return new ne(A(e), N(e))
				}
				throw i()
			}

			function T(t) {
				for (var e = [], n = 0; n < t.length; n++) {
					var r = t.charCodeAt(n);
					r <= 127 ? e.push(r) : r <= 2047 ? e.push(192 | r >> 6, 128 | 63 & r) : 55296 == (64512 & r) ? n < t.length - 1 && 56320 == (64512 & t.charCodeAt(n + 1)) ? (r = 65536 | (1023 & r) << 10 | 1023 & t.charCodeAt(++n), e.push(240 | r >> 18, 128 | r >> 12 & 63, 128 | r >> 6 & 63, 128 | 63 & r)) : e.push(239, 191, 189) : 56320 == (64512 & r) ? e.push(239, 191, 189) : e.push(224 | r >> 12, 128 | r >> 6 & 63, 128 | 63 & r)
				}
				return new Uint8Array(e)
			}

			function C(t) {
				var e;
				try {
					e = decodeURIComponent(t)
				} catch (t) {
					throw w(ee.DATA_URL, "Malformed data URL.")
				}
				return T(e)
			}

			function S(t, e) {
				switch (t) {
					case ee.BASE64:
						var n = -1 !== e.indexOf("-"),
							r = -1 !== e.indexOf("_");
						if (n || r) throw w(t, "Invalid character '" + (s = n ? "-" : "_") + "' found: is it base64url encoded?");
						break;
					case ee.BASE64URL:
						var i = -1 !== e.indexOf("+"),
							o = -1 !== e.indexOf("/");
						if (i || o) {
							var s = i ? "+" : "/";
							throw w(t, "Invalid character '" + s + "' found: is it base64 encoded?")
						}
						e = e.replace(/-/g, "+").replace(/_/g, "/")
				}
				var a;
				try {
					a = atob(e)
				} catch (e) {
					throw w(t, "Invalid character found")
				}
				for (var u = new Uint8Array(a.length), c = 0; c < a.length; c++) u[c] = a.charCodeAt(c);
				return u
			}

			function A(t) {
				var e = new re(t);
				return e.base64 ? S(ee.BASE64, e.rest) : C(e.rest)
			}

			function N(t) {
				return new re(t).contentType
			}

			function R(t, e) {
				return !!(t.length >= e.length) && t.substring(t.length - e.length) === e
			}

			function k(t) {
				switch (t) {
					case oe.RUNNING:
					case oe.PAUSING:
					case oe.CANCELING:
						return se.RUNNING;
					case oe.PAUSED:
						return se.PAUSED;
					case oe.SUCCESS:
						return se.SUCCESS;
					case oe.CANCELED:
						return se.CANCELED;
					case oe.ERROR:
					default:
						return se.ERROR
				}
			}

			function P(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e)
			}

			function _(t, e) {
				for (var n in t) P(t, n) && e(n, t[n])
			}

			function D(t) {
				if (null == t) return {};
				var e = {};
				return _(t, function (t, n) {
					e[t] = n
				}), e
			}

			function j(t) {
				return new ae.b(t)
			}

			function L(t) {
				return ae.b.resolve(t)
			}

			function x(t) {
				return ae.b.reject(t)
			}

			function U(t) {
				return null != t
			}

			function F(t) {
				return void 0 !== t
			}

			function M(t) {
				return "function" == typeof t
			}

			function V(t) {
				return "object" === (void 0 === t ? "undefined" : ue(t))
			}

			function W(t) {
				return V(t) && null !== t
			}

			function B(t) {
				return V(t) && !Array.isArray(t)
			}

			function X(t) {
				return "string" == typeof t || t instanceof String
			}

			function H(t) {
				return "number" == typeof t || t instanceof Number
			}

			function q(t) {
				return K() && t instanceof Blob
			}

			function K() {
				return "undefined" != typeof Blob
			}

			function z(t) {
				var e;
				try {
					e = JSON.parse(t)
				} catch (t) {
					return null
				}
				return B(e) ? e : null
			}

			function G(t) {
				if (0 == t.length) return null;
				var e = t.lastIndexOf("/");
				return -1 === e ? "" : t.slice(0, e)
			}

			function Q(t, e) {
				var n = e.split("/").filter(function (t) {
					return t.length > 0
				}).join("/");
				return 0 === t.length ? n : t + "/" + n
			}

			function Y(t) {
				var e = t.lastIndexOf("/", t.length - 2);
				return -1 === e ? t : t.slice(e + 1)
			}

			function $(t) {
				return Kt + Gt + t
			}

			function J(t) {
				return zt + Gt + t
			}

			function Z(t) {
				return Kt + Qt + t
			}

			function tt(t) {
				var e = encodeURIComponent,
					n = "?";
				return _(t, function (t, r) {
					var i = e(t) + "=" + e(r);
					n = n + i + "&"
				}), n = n.slice(0, -1)
			}

			function et(t, e) {
				return e
			}

			function nt(t) {
				return !X(t) || t.length < 2 ? t : (t = t, Y(t))
			}

			function rt() {
				if (pe) return pe;
				var t = [];
				t.push(new fe("bucket")), t.push(new fe("generation")), t.push(new fe("metageneration")), t.push(new fe("name", "fullPath", !0));
				var e = new fe("name");
				e.xform = function (t, e) {
					return nt(e)
				}, t.push(e);
				var n = new fe("size");
				return n.xform = function (t, e) {
					return U(e) ? +e : e
				}, t.push(n), t.push(new fe("timeCreated")), t.push(new fe("updated")), t.push(new fe("md5Hash", null, !0)), t.push(new fe("cacheControl", null, !0)), t.push(new fe("contentDisposition", null, !0)), t.push(new fe("contentEncoding", null, !0)), t.push(new fe("contentLanguage", null, !0)), t.push(new fe("contentType", null, !0)), t.push(new fe("metadata", "customMetadata", !0)), t.push(new fe("downloadTokens", "downloadURLs", !1, function (t, e) {
					if (!(X(e) && e.length > 0)) return [];
					var n = encodeURIComponent;
					return e.split(",").map(function (e) {
						var r = t.bucket,
							i = t.fullPath;
						return J("/b/" + n(r) + "/o/" + n(i)) + tt({
							alt: "media",
							token: e
						})
					})
				})), pe = t
			}

			function it(t, e) {
				Object.defineProperty(t, "ref", {
					get: function () {
						var n = t.bucket,
							r = t.fullPath,
							i = new le(n, r);
						return e.makeStorageReference(i)
					}
				})
			}

			function ot(t, e, n) {
				var r = {};
				r.type = "file";
				for (var i = n.length, o = 0; o < i; o++) {
					var s = n[o];
					r[s.local] = s.xform(r, e[s.server])
				}
				return it(r, t), r
			}

			function st(t, e, n) {
				var r = z(e);
				return null === r ? null : ot(t, r, n)
			}

			function at(t, e) {
				for (var n = {}, r = e.length, i = 0; i < r; i++) {
					var o = e[i];
					o.writable && (n[o.server] = t[o.local])
				}
				return JSON.stringify(n)
			}

			function ut(t) {
				if (!t || !V(t)) throw "Expected Metadata object.";
				for (var e in t) {
					var n = t[e];
					if ("customMetadata" === e) {
						if (!V(n)) throw "Expected object for 'customMetadata' mapping."
					} else if (W(n)) throw "Mapping for '" + e + "' cannot be an object."
				}
			}

			function ct(t, e, n) {
				for (var r = e.length, i = e.length, o = 0; o < e.length; o++)
					if (e[o].optional) {
						r = o;
						break
					}
				if (!(r <= n.length && n.length <= i)) throw g(r, i, t, n.length);
				for (o = 0; o < n.length; o++) try {
					e[o].validator(n[o])
				} catch (e) {
					throw e instanceof Error ? y(o, t, e.message) : y(o, t, e)
				}
			}

			function ht(t, e) {
				return function (n) {
					t(n), e(n)
				}
			}

			function lt(t, e) {
				function n(t) {
					if (!X(t)) throw "Expected string."
				}
				var r;
				return r = t ? ht(n, t) : n, new de(r, e)
			}

			function ft() {
				return new de(function (t) {
					if (!(t instanceof Uint8Array || t instanceof ArrayBuffer || K() && t instanceof Blob)) throw "Expected Blob or File."
				})
			}

			function pt(t) {
				return new de(ut, t)
			}

			function dt() {
				return new de(function (t) {
					if (!(H(t) && t >= 0)) throw "Expected a number 0 or greater."
				})
			}

			function vt(t, e) {
				return new de(function (e) {
					if (!(null === e || U(e) && e instanceof Object)) throw "Expected an Object.";
					void 0 !== t && null !== t && t(e)
				}, e)
			}

			function yt(t) {
				return new de(function (t) {
					if (null !== t && !M(t)) throw "Expected a Function."
				}, t)
			}

			function gt() {
				return "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : void 0
			}

			function mt() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				var n = gt();
				if (void 0 !== n) {
					for (var r = new n, i = 0; i < t.length; i++) r.append(t[i]);
					return r.getBlob()
				}
				if (K()) return new Blob(t);
				throw Error("This browser doesn't seem to support creating Blobs")
			}

			function bt(t, e, n) {
				return t.webkitSlice ? t.webkitSlice(e, n) : t.mozSlice ? t.mozSlice(e, n) : t.slice ? t.slice(e, n) : null
			}

			function wt(t, e) {
				return -1 !== t.indexOf(e)
			}

			function Et(t) {
				return Array.prototype.slice.call(t)
			}

			function Ot(t, e) {
				var n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
			}

			function It(t) {
				if (!t) throw i()
			}

			function Tt(t, e) {
				return function (n, r) {
					var i = st(t, r, e);
					return It(null !== i), i
				}
			}

			function Ct(t) {
				return function (e, n) {
					var r;
					return (r = 401 === e.getStatus() ? a() : 402 === e.getStatus() ? s(t.bucket) : 403 === e.getStatus() ? u(t.path) : n).setServerResponseProp(n.serverResponseProp()), r
				}
			}

			function St(t) {
				var e = Ct(t);
				return function (n, r) {
					var i = e(n, r);
					return 404 === n.getStatus() && (i = o(t.path)), i.setServerResponseProp(r.serverResponseProp()), i
				}
			}

			function At(t, e, n) {
				var r = $(e.fullServerUrl()),
					i = t.maxOperationRetryTime(),
					o = new ye(r, "GET", Tt(t, n), i);
				return o.errorHandler = St(e), o
			}

			function Nt(t, e, n, r) {
				var i = $(e.fullServerUrl()),
					o = at(n, r),
					s = {
						"Content-Type": "application/json; charset=utf-8"
					},
					a = t.maxOperationRetryTime(),
					u = new ye(i, "PATCH", Tt(t, r), a);
				return u.headers = s, u.body = o, u.errorHandler = St(e), u
			}

			function Rt(t, e) {
				var n = $(e.fullServerUrl()),
					r = t.maxOperationRetryTime(),
					i = new ye(n, "DELETE", function (t, e) {}, r);
				return i.successCodes = [200, 204], i.errorHandler = St(e), i
			}

			function kt(t, e) {
				return t && t.contentType || e && e.type() || "application/octet-stream"
			}

			function Pt(t, e, n) {
				var r = D(n);
				return r.fullPath = t.path, r.size = e.size(), r.contentType || (r.contentType = kt(null, e)), r
			}

			function _t(t, e, n, r, i) {
				var o = e.bucketOnlyServerUrl(),
					s = {
						"X-Goog-Upload-Protocol": "multipart"
					},
					a = function () {
						for (var t = "", e = 0; e < 2; e++) t += ("" + Math.random()).slice(2);
						return t
					}();
				s["Content-Type"] = "multipart/related; boundary=" + a;
				var u = Pt(e, r, i),
					c = "--" + a + "\r\nContent-Type: application/json; charset=utf-8\r\n\r\n" + at(u, n) + "\r\n--" + a + "\r\nContent-Type: " + u.contentType + "\r\n\r\n",
					h = "\r\n--" + a + "--",
					l = ve.getBlob(c, r, h);
				if (null === l) throw p();
				var f = {
						name: u.fullPath
					},
					d = Z(o),
					v = t.maxUploadRetryTime(),
					y = new ye(d, "POST", Tt(t, n), v);
				return y.urlParams = f, y.headers = s, y.body = l.uploadData(), y.errorHandler = Ct(e), y
			}

			function Dt(t, e) {
				var n;
				try {
					n = t.getResponseHeader("X-Goog-Upload-Status")
				} catch (t) {
					It(!1)
				}
				return It(wt(e || ["active"], n)), n
			}

			function jt(t, e, n, r, i) {
				var o = e.bucketOnlyServerUrl(),
					s = Pt(e, r, i),
					a = {
						name: s.fullPath
					},
					u = Z(o),
					c = {
						"X-Goog-Upload-Protocol": "resumable",
						"X-Goog-Upload-Command": "start",
						"X-Goog-Upload-Header-Content-Length": r.size(),
						"X-Goog-Upload-Header-Content-Type": s.contentType,
						"Content-Type": "application/json; charset=utf-8"
					},
					h = at(s, n),
					l = t.maxUploadRetryTime(),
					f = new ye(u, "POST", function (t, e) {
						Dt(t);
						var n;
						try {
							n = t.getResponseHeader("X-Goog-Upload-URL")
						} catch (t) {
							It(!1)
						}
						return It(X(n)), n
					}, l);
				return f.urlParams = a, f.headers = c, f.body = h, f.errorHandler = Ct(e), f
			}

			function Lt(t, e, n, r) {
				var i = {
						"X-Goog-Upload-Command": "query"
					},
					o = t.maxUploadRetryTime(),
					s = new ye(n, "POST", function (t, e) {
						var n, i = Dt(t, ["active", "final"]);
						try {
							n = t.getResponseHeader("X-Goog-Upload-Size-Received")
						} catch (t) {
							It(!1)
						}
						var o = parseInt(n, 10);
						return It(!isNaN(o)), new ge(o, r.size(), "final" === i)
					}, o);
				return s.headers = i, s.errorHandler = Ct(e), s
			}

			function xt(t, e, n, r, i, o, s, a) {
				var u = new ge(0, 0);
				if (s ? (u.current = s.current, u.total = s.total) : (u.current = 0, u.total = r.size()), r.size() !== u.total) throw d();
				var c = u.total - u.current,
					h = c;
				i > 0 && (h = Math.min(h, i));
				var l = u.current,
					f = l + h,
					v = {
						"X-Goog-Upload-Command": h === c ? "upload, finalize" : "upload",
						"X-Goog-Upload-Offset": u.current
					},
					y = r.slice(l, f);
				if (null === y) throw p();
				var g = e.maxUploadRetryTime(),
					m = new ye(n, "POST", function (t, n) {
						var i, s = Dt(t, ["active", "final"]),
							a = u.current + h,
							c = r.size();
						return i = "final" === s ? Tt(e, o)(t, n) : null, new ge(a, c, "final" === s, i)
					}, g);
				return m.headers = v, m.body = y.uploadData(), m.progressCallback = a || null, m.errorHandler = Ct(t), m
			}

			function Ut(t) {
				return function () {
					for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
					L(!0).then(function () {
						t.apply(null, e)
					})
				}
			}

			function Ft(t, e, n) {
				function r() {
					return 2 === l
				}

				function i() {
					f || (f = !0, e.apply(null, arguments))
				}

				function o(e) {
					c = setTimeout(function () {
						c = null, t(s, r())
					}, e)
				}

				function s(t) {
					for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
					if (!f) {
						if (t) return void i.apply(null, arguments);
						if (r() || h) return void i.apply(null, arguments);
						u < 64 && (u *= 2);
						var s;
						1 === l ? (l = 2, s = 0) : s = 1e3 * (u + Math.random()), o(s)
					}
				}

				function a(t) {
					p || (p = !0, f || (null !== c ? (t || (l = 2), clearTimeout(c), o(0)) : t || (l = 1)))
				}
				var u = 1,
					c = null,
					h = !1,
					l = 0,
					f = !1,
					p = !1;
				return o(0), setTimeout(function () {
					h = !0, a(!0)
				}, n), a
			}

			function Mt(t) {
				t(!1)
			}

			function Vt(t, e) {
				null !== e && e.length > 0 && (t.Authorization = "Firebase " + e)
			}

			function Wt(t) {
				var e = void 0 !== firebase ? firebase.SDK_VERSION : "AppManager";
				t["X-Firebase-Storage-Version"] = "webjs/" + e
			}

			function Bt(t, e, n) {
				var r = tt(t.urlParams),
					i = t.url + r,
					o = D(t.headers);
				return Vt(o, e), Wt(o), new Ce(i, t.method, o, t.body, t.successCodes, t.additionalRetryCodes, t.handler, t.errorHandler, t.timeout, t.progressCallback, n)
			}

			function Xt(t, e, n) {
				return new Ae(t, new he, n)
			}

			function Ht(t) {
				var e = {
					TaskState: se,
					TaskEvent: ie,
					StringFormat: ee,
					Storage: Ae,
					Reference: Ee
				};
				t.INTERNAL.registerService(Re, Xt, e, void 0, !0)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var qt, Kt = "https://firebasestorage.googleapis.com",
				zt = "https://firebasestorage.googleapis.com",
				Gt = "/v0",
				Qt = "/v0",
				Yt = 12e4,
				$t = 6e4,
				Jt = -9007199254740991,
				Zt = function () {
					function t(t, e) {
						this.t = r(t), this.e = "Firebase Storage: " + e, this.n = null, this.r = "FirebaseError"
					}
					return t.prototype.codeProp = function () {
						return this.code
					}, t.prototype.codeEquals = function (t) {
						return r(t) === this.codeProp()
					}, t.prototype.serverResponseProp = function () {
						return this.n
					}, t.prototype.setServerResponseProp = function (t) {
						this.n = t
					}, Object.defineProperty(t.prototype, "name", {
						get: function () {
							return this.r
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "code", {
						get: function () {
							return this.t
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "message", {
						get: function () {
							return this.e
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "serverResponse", {
						get: function () {
							return this.n
						},
						enumerable: !0,
						configurable: !0
					}), t
				}(),
				te = {
					UNKNOWN: "unknown",
					OBJECT_NOT_FOUND: "object-not-found",
					BUCKET_NOT_FOUND: "bucket-not-found",
					PROJECT_NOT_FOUND: "project-not-found",
					QUOTA_EXCEEDED: "quota-exceeded",
					UNAUTHENTICATED: "unauthenticated",
					UNAUTHORIZED: "unauthorized",
					RETRY_LIMIT_EXCEEDED: "retry-limit-exceeded",
					INVALID_CHECKSUM: "invalid-checksum",
					CANCELED: "canceled",
					INVALID_EVENT_NAME: "invalid-event-name",
					INVALID_URL: "invalid-url",
					INVALID_DEFAULT_BUCKET: "invalid-default-bucket",
					NO_DEFAULT_BUCKET: "no-default-bucket",
					CANNOT_SLICE_BLOB: "cannot-slice-blob",
					SERVER_FILE_WRONG_SIZE: "server-file-wrong-size",
					NO_DOWNLOAD_URL: "no-download-url",
					INVALID_ARGUMENT: "invalid-argument",
					INVALID_ARGUMENT_COUNT: "invalid-argument-count",
					APP_DELETED: "app-deleted",
					INVALID_ROOT_OPERATION: "invalid-root-operation",
					INVALID_FORMAT: "invalid-format",
					INTERNAL_ERROR: "internal-error"
				},
				ee = {
					RAW: "raw",
					BASE64: "base64",
					BASE64URL: "base64url",
					DATA_URL: "data_url"
				},
				ne = function () {
					return function (t, e) {
						this.data = t, this.contentType = e || null
					}
				}(),
				re = function () {
					return function (t) {
						this.base64 = !1, this.contentType = null;
						var e = t.match(/^data:([^,]+)?,/);
						if (null === e) throw w(ee.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
						var n = e[1] || null;
						null != n && (this.base64 = R(n, ";base64"), this.contentType = this.base64 ? n.substring(0, n.length - 7) : n), this.rest = t.substring(t.indexOf(",") + 1)
					}
				}(),
				ie = {
					STATE_CHANGED: "state_changed"
				},
				oe = {
					RUNNING: "running",
					PAUSING: "pausing",
					PAUSED: "paused",
					SUCCESS: "success",
					CANCELING: "canceling",
					CANCELED: "canceled",
					ERROR: "error"
				},
				se = {
					RUNNING: "running",
					PAUSED: "paused",
					SUCCESS: "success",
					CANCELED: "canceled",
					ERROR: "error"
				},
				ae = n(4),
				ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				};
			! function (t) {
				t[t.NO_ERROR = 0] = "NO_ERROR", t[t.NETWORK_ERROR = 1] = "NETWORK_ERROR", t[t.ABORT = 2] = "ABORT"
			}(qt || (qt = {}));
			var ce = function () {
					function t() {
						var t = this;
						this.o = !1, this.i = new XMLHttpRequest, this.a = qt.NO_ERROR, this.u = j(function (e, n) {
							t.i.addEventListener("abort", function (n) {
								t.a = qt.ABORT, e(t)
							}), t.i.addEventListener("error", function (n) {
								t.a = qt.NETWORK_ERROR, e(t)
							}), t.i.addEventListener("load", function (n) {
								e(t)
							})
						})
					}
					return t.prototype.send = function (t, e, n, r) {
						var i = this;
						if (this.o) throw E("cannot .send() more than once");
						return this.o = !0, this.i.open(e, t, !0), U(r) && _(r, function (t, e) {
							i.i.setRequestHeader(t, "" + e)
						}), U(n) ? this.i.send(n) : this.i.send(), this.u
					}, t.prototype.getErrorCode = function () {
						if (!this.o) throw E("cannot .getErrorCode() before sending");
						return this.a
					}, t.prototype.getStatus = function () {
						if (!this.o) throw E("cannot .getStatus() before sending");
						try {
							return this.i.status
						} catch (t) {
							return -1
						}
					}, t.prototype.getResponseText = function () {
						if (!this.o) throw E("cannot .getResponseText() before sending");
						return this.i.responseText
					}, t.prototype.abort = function () {
						this.i.abort()
					}, t.prototype.getResponseHeader = function (t) {
						return this.i.getResponseHeader(t)
					}, t.prototype.addUploadProgressListener = function (t) {
						U(this.i.upload) && this.i.upload.addEventListener("progress", t)
					}, t.prototype.removeUploadProgressListener = function (t) {
						U(this.i.upload) && this.i.upload.removeEventListener("progress", t)
					}, t
				}(),
				he = function () {
					function t() {}
					return t.prototype.createXhrIo = function () {
						return new ce
					}, t
				}(),
				le = function () {
					function t(t, e) {
						this.bucket = t, this.s = e
					}
					return Object.defineProperty(t.prototype, "path", {
						get: function () {
							return this.s
						},
						enumerable: !0,
						configurable: !0
					}), t.prototype.fullServerUrl = function () {
						var t = encodeURIComponent;
						return "/b/" + t(this.bucket) + "/o/" + t(this.path)
					}, t.prototype.bucketOnlyServerUrl = function () {
						return "/b/" + encodeURIComponent(this.bucket) + "/o"
					}, t.makeFromBucketSpec = function (e) {
						var n;
						try {
							n = t.makeFromUrl(e)
						} catch (n) {
							return new t(e, "")
						}
						if ("" === n.path) return n;
						throw f(e)
					}, t.makeFromUrl = function (e) {
						for (var n = null, r = [{
								regex: RegExp("^gs://([A-Za-z0-9.\\-]+)(/(.*))?$", "i"),
								indices: {
									bucket: 1,
									path: 3
								},
								postModify: function (t) {
									"/" === t.path.charAt(t.path.length - 1) && (t.s = t.s.slice(0, -1))
								}
							}, {
								regex: RegExp("^https?://firebasestorage\\.googleapis\\.com/v[A-Za-z0-9_]+/b/([A-Za-z0-9.\\-]+)/o(/([^?#]*).*)?$", "i"),
								indices: {
									bucket: 1,
									path: 3
								},
								postModify: function (t) {
									t.s = decodeURIComponent(t.path)
								}
							}], i = 0; i < r.length; i++) {
							var o = r[i],
								s = o.regex.exec(e);
							if (s) {
								var a = s[o.indices.bucket],
									u = s[o.indices.path];
								u || (u = ""), n = new t(a, u), o.postModify(n);
								break
							}
						}
						if (null == n) throw l(e);
						return n
					}, t
				}(),
				fe = function () {
					return function (t, e, n, r) {
						this.server = t, this.local = e || t, this.writable = !!n, this.xform = r || et
					}
				}(),
				pe = null,
				de = function () {
					return function (t, e) {
						var n = this;
						this.validator = function (e) {
							n.optional && !F(e) || t(e)
						}, this.optional = !!e
					}
				}(),
				ve = function () {
					function t(t, e) {
						var n = 0,
							r = "";
						q(t) ? (this.c = t, n = t.size, r = t.type) : t instanceof ArrayBuffer ? (e ? this.c = new Uint8Array(t) : (this.c = new Uint8Array(t.byteLength), this.c.set(new Uint8Array(t))), n = this.c.length) : t instanceof Uint8Array && (e ? this.c = t : (this.c = new Uint8Array(t.length), this.c.set(t)), n = t.length), this.l = n, this.p = r
					}
					return t.prototype.size = function () {
						return this.l
					}, t.prototype.type = function () {
						return this.p
					}, t.prototype.slice = function (e, n) {
						if (q(this.c)) {
							var r = bt(this.c, e, n);
							return null === r ? null : new t(r)
						}
						return new t(new Uint8Array(this.c.buffer, e, n - e), !0)
					}, t.getBlob = function () {
						for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
						if (K()) {
							var r = e.map(function (e) {
								return e instanceof t ? e.c : e
							});
							return new t(mt.apply(null, r))
						}
						var i = e.map(function (t) {
								return X(t) ? I(ee.RAW, t).data : t.c
							}),
							o = 0;
						i.forEach(function (t) {
							o += t.byteLength
						});
						var s = new Uint8Array(o),
							a = 0;
						return i.forEach(function (t) {
							for (var e = 0; e < t.length; e++) s[a++] = t[e]
						}), new t(s, !0)
					}, t.prototype.uploadData = function () {
						return this.c
					}, t
				}(),
				ye = function () {
					return function (t, e, n, r) {
						this.url = t, this.method = e, this.handler = n, this.timeout = r, this.urlParams = {}, this.headers = {}, this.body = null, this.errorHandler = null, this.progressCallback = null, this.successCodes = [200], this.additionalRetryCodes = []
					}
				}(),
				ge = function () {
					return function (t, e, n, r) {
						this.current = t, this.total = e, this.finalized = !!n, this.metadata = r || null
					}
				}(),
				me = function () {
					return function (t, e, n) {
						if (M(t) || U(e) || U(n)) this.next = t, this.error = e || null, this.complete = n || null;
						else {
							var r = t;
							this.next = r.next || null, this.error = r.error || null, this.complete = r.complete || null
						}
					}
				}(),
				be = function () {
					function t(t, e, n, r, i, o) {
						this.bytesTransferred = t, this.totalBytes = e, this.state = n, this.metadata = r, this.task = i, this.ref = o
					}
					return Object.defineProperty(t.prototype, "downloadURL", {
						get: function () {
							if (null !== this.metadata) {
								var t = this.metadata.downloadURLs;
								return null != t && null != t[0] ? t[0] : null
							}
							return null
						},
						enumerable: !0,
						configurable: !0
					}), t
				}(),
				we = function () {
					function t(t, e, n, r, i, o) {
						void 0 === o && (o = null);
						var s = this;
						this.h = 0, this.f = !1, this.d = !1, this._ = [], this.v = null, this.m = null, this.y = null, this.g = 1, this.R = null, this.w = null, this.U = t, this.T = e, this.A = n, this.N = i, this.O = o, this.C = r, this.S = this.k(this.N), this.I = oe.RUNNING, this.L = function (t) {
							s.y = null, s.g = 1, t.codeEquals(te.CANCELED) ? (s.f = !0, s.x()) : (s.v = t, s.P(oe.ERROR))
						}, this.D = function (t) {
							s.y = null, t.codeEquals(te.CANCELED) ? s.x() : (s.v = t, s.P(oe.ERROR))
						}, this.M = j(function (t, e) {
							s.R = t, s.w = e, s.W()
						}), this.M.then(null, function () {})
					}
					return t.prototype.B = function () {
						var t = this,
							e = this.h;
						return function (n, r) {
							t.G(e + n)
						}
					}, t.prototype.k = function (t) {
						return t.size() > 262144
					}, t.prototype.W = function () {
						this.I === oe.RUNNING && null === this.y && (this.S ? null === this.m ? this.j() : this.f ? this.q() : this.d ? this.F() : this.H() : this.z())
					}, t.prototype.X = function (t) {
						var e = this;
						this.T.getAuthToken().then(function (n) {
							switch (e.I) {
								case oe.RUNNING:
									t(n);
									break;
								case oe.CANCELING:
									e.P(oe.CANCELED);
									break;
								case oe.PAUSING:
									e.P(oe.PAUSED)
							}
						})
					}, t.prototype.j = function () {
						var t = this;
						this.X(function (e) {
							var n = jt(t.T, t.A, t.C, t.N, t.O),
								r = t.T.makeRequest(n, e);
							t.y = r, r.getPromise().then(function (e) {
								t.y = null, t.m = e, t.f = !1, t.x()
							}, t.L)
						})
					}, t.prototype.q = function () {
						var t = this,
							e = this.m;
						this.X(function (n) {
							var r = Lt(t.T, t.A, e, t.N),
								i = t.T.makeRequest(r, n);
							t.y = i, i.getPromise().then(function (e) {
								e = e, t.y = null, t.G(e.current), t.f = !1, e.finalized && (t.d = !0), t.x()
							}, t.L)
						})
					}, t.prototype.H = function () {
						var t = this,
							e = 262144 * this.g,
							n = new ge(this.h, this.N.size()),
							r = this.m;
						this.X(function (i) {
							var o;
							try {
								o = xt(t.A, t.T, r, t.N, e, t.C, n, t.B())
							} catch (e) {
								return t.v = e, void t.P(oe.ERROR)
							}
							var s = t.T.makeRequest(o, i);
							t.y = s, s.getPromise().then(function (e) {
								t.V(), t.y = null, t.G(e.current), e.finalized ? (t.O = e.metadata, t.P(oe.SUCCESS)) : t.x()
							}, t.L)
						})
					}, t.prototype.V = function () {
						262144 * this.g < 33554432 && (this.g *= 2)
					}, t.prototype.F = function () {
						var t = this;
						this.X(function (e) {
							var n = At(t.T, t.A, t.C),
								r = t.T.makeRequest(n, e);
							t.y = r, r.getPromise().then(function (e) {
								t.y = null, t.O = e, t.P(oe.SUCCESS)
							}, t.D)
						})
					}, t.prototype.z = function () {
						var t = this;
						this.X(function (e) {
							var n = _t(t.T, t.A, t.C, t.N, t.O),
								r = t.T.makeRequest(n, e);
							t.y = r, r.getPromise().then(function (e) {
								t.y = null, t.O = e, t.G(t.N.size()), t.P(oe.SUCCESS)
							}, t.L)
						})
					}, t.prototype.G = function (t) {
						var e = this.h;
						this.h = t, this.h !== e && this.K()
					}, t.prototype.P = function (t) {
						if (this.I !== t) switch (t) {
							case oe.CANCELING:
							case oe.PAUSING:
								this.I = t, null !== this.y && this.y.cancel();
								break;
							case oe.RUNNING:
								var e = this.I === oe.PAUSED;
								this.I = t, e && (this.K(), this.W());
								break;
							case oe.PAUSED:
								this.I = t, this.K();
								break;
							case oe.CANCELED:
								this.v = h(), this.I = t, this.K();
								break;
							case oe.ERROR:
							case oe.SUCCESS:
								this.I = t, this.K()
						}
					}, t.prototype.x = function () {
						switch (this.I) {
							case oe.PAUSING:
								this.P(oe.PAUSED);
								break;
							case oe.CANCELING:
								this.P(oe.CANCELED);
								break;
							case oe.RUNNING:
								this.W()
						}
					}, Object.defineProperty(t.prototype, "snapshot", {
						get: function () {
							var t = k(this.I);
							return new be(this.h, this.N.size(), t, this.O, this, this.U)
						},
						enumerable: !0,
						configurable: !0
					}), t.prototype.on = function (t, e, n, r) {
						function i(t) {
							try {
								return void a(t)
							} catch (t) {}
							try {
								if (u(t), !(F(t.next) || F(t.error) || F(t.complete))) throw "";
								return
							} catch (t) {
								throw s
							}
						}

						function o(t) {
							return function (e, n, i) {
								null !== t && ct("on", t, arguments);
								var o = new me(e, n, r);
								return c.Z(o),
									function () {
										c.J(o)
									}
							}
						}
						void 0 === e && (e = void 0), void 0 === n && (n = void 0), void 0 === r && (r = void 0);
						var s = "Expected a function or an Object with one of `next`, `error`, `complete` properties.",
							a = yt(!0).validator,
							u = vt(null, !0).validator;
						ct("on", [lt(function (e) {
							if (t !== ie.STATE_CHANGED) throw "Expected one of the event types: [" + ie.STATE_CHANGED + "]."
						}), vt(i, !0), yt(!0), yt(!0)], arguments);
						var c = this,
							h = [vt(function (t) {
								if (null === t) throw s;
								i(t)
							}), yt(!0), yt(!0)];
						return F(e) || F(n) || F(r) ? o(null)(e, n, r) : o(h)
					}, t.prototype.then = function (t, e) {
						return this.M.then(t, e)
					}, t.prototype.catch = function (t) {
						return this.then(null, t)
					}, t.prototype.Z = function (t) {
						this._.push(t), this.Q(t)
					}, t.prototype.J = function (t) {
						Ot(this._, t)
					}, t.prototype.K = function () {
						var t = this;
						this.Y(), Et(this._).forEach(function (e) {
							t.Q(e)
						})
					}, t.prototype.Y = function () {
						if (null !== this.R) {
							var t = !0;
							switch (k(this.I)) {
								case se.SUCCESS:
									Ut(this.R.bind(null, this.snapshot))();
									break;
								case se.CANCELED:
								case se.ERROR:
									Ut(this.w.bind(null, this.v))();
									break;
								default:
									t = !1
							}
							t && (this.R = null, this.w = null)
						}
					}, t.prototype.Q = function (t) {
						switch (k(this.I)) {
							case se.RUNNING:
							case se.PAUSED:
								null !== t.next && Ut(t.next.bind(t, this.snapshot))();
								break;
							case se.SUCCESS:
								null !== t.complete && Ut(t.complete.bind(t))();
								break;
							case se.CANCELED:
							case se.ERROR:
								null !== t.error && Ut(t.error.bind(t, this.v))();
								break;
							default:
								null !== t.error && Ut(t.error.bind(t, this.v))()
						}
					}, t.prototype.resume = function () {
						ct("resume", [], arguments);
						var t = this.I === oe.PAUSED || this.I === oe.PAUSING;
						return t && this.P(oe.RUNNING), t
					}, t.prototype.pause = function () {
						ct("pause", [], arguments);
						var t = this.I === oe.RUNNING;
						return t && this.P(oe.PAUSING), t
					}, t.prototype.cancel = function () {
						ct("cancel", [], arguments);
						var t = this.I === oe.RUNNING || this.I === oe.PAUSING;
						return t && this.P(oe.CANCELING), t
					}, t
				}(),
				Ee = function () {
					function t(t, e) {
						this.authWrapper = t, this.location = e instanceof le ? e : le.makeFromUrl(e)
					}
					return t.prototype.toString = function () {
						return ct("toString", [], arguments), "gs://" + this.location.bucket + "/" + this.location.path
					}, t.prototype.newRef = function (e, n) {
						return new t(e, n)
					}, t.prototype.mappings = function () {
						return rt()
					}, t.prototype.child = function (t) {
						ct("child", [lt()], arguments);
						var e = Q(this.location.path, t),
							n = new le(this.location.bucket, e);
						return this.newRef(this.authWrapper, n)
					}, Object.defineProperty(t.prototype, "parent", {
						get: function () {
							var t = G(this.location.path);
							if (null === t) return null;
							var e = new le(this.location.bucket, t);
							return this.newRef(this.authWrapper, e)
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "root", {
						get: function () {
							var t = new le(this.location.bucket, "");
							return this.newRef(this.authWrapper, t)
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "bucket", {
						get: function () {
							return this.location.bucket
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "fullPath", {
						get: function () {
							return this.location.path
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "name", {
						get: function () {
							return Y(this.location.path)
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "storage", {
						get: function () {
							return this.authWrapper.service()
						},
						enumerable: !0,
						configurable: !0
					}), t.prototype.put = function (t, e) {
						return void 0 === e && (e = null), ct("put", [ft(), pt(!0)], arguments), this.$("put"), new we(this, this.authWrapper, this.location, this.mappings(), new ve(t), e)
					}, t.prototype.putString = function (t, e, n) {
						void 0 === e && (e = ee.RAW), ct("putString", [lt(), lt(O, !0), pt(!0)], arguments), this.$("putString");
						var r = I(e, t),
							i = D(n);
						return !U(i.contentType) && U(r.contentType) && (i.contentType = r.contentType), new we(this, this.authWrapper, this.location, this.mappings(), new ve(r.data, !0), i)
					}, t.prototype.delete = function () {
						ct("delete", [], arguments), this.$("delete");
						var t = this;
						return this.authWrapper.getAuthToken().then(function (e) {
							var n = Rt(t.authWrapper, t.location);
							return t.authWrapper.makeRequest(n, e).getPromise()
						})
					}, t.prototype.getMetadata = function () {
						ct("getMetadata", [], arguments), this.$("getMetadata");
						var t = this;
						return this.authWrapper.getAuthToken().then(function (e) {
							var n = At(t.authWrapper, t.location, t.mappings());
							return t.authWrapper.makeRequest(n, e).getPromise()
						})
					}, t.prototype.updateMetadata = function (t) {
						ct("updateMetadata", [pt()], arguments), this.$("updateMetadata");
						var e = this;
						return this.authWrapper.getAuthToken().then(function (n) {
							var r = Nt(e.authWrapper, e.location, t, e.mappings());
							return e.authWrapper.makeRequest(r, n).getPromise()
						})
					}, t.prototype.getDownloadURL = function () {
						return ct("getDownloadURL", [], arguments), this.$("getDownloadURL"), this.getMetadata().then(function (t) {
							var e = t.downloadURLs[0];
							if (U(e)) return e;
							throw v()
						})
					}, t.prototype.$ = function (t) {
						if ("" === this.location.path) throw b(t)
					}, t
				}(),
				Oe = function () {
					function t(t) {
						this.M = x(t)
					}
					return t.prototype.getPromise = function () {
						return this.M
					}, t.prototype.cancel = function (t) {
						void 0 === t && (t = !1)
					}, t
				}(),
				Ie = function () {
					function t() {
						this.tt = {}, this.et = Jt
					}
					return t.prototype.addRequest = function (t) {
						function e() {
							delete r.tt[n]
						}
						var n = this.et;
						this.et++, this.tt[n] = t;
						var r = this;
						t.getPromise().then(e, e)
					}, t.prototype.clear = function () {
						_(this.tt, function (t, e) {
							e && e.cancel(!0)
						}), this.tt = {}
					}, t
				}(),
				Te = function () {
					function t(e, n, r, i, o) {
						if (this.nt = null, this.rt = !1, this.ot = e, null !== this.ot) {
							var s = this.ot.options;
							U(s) && (this.nt = t.it(s))
						}
						this.ut = n, this.st = r, this.ct = o, this.lt = i, this.pt = Yt, this.ht = $t, this.ft = new Ie
					}
					return t.it = function (t) {
						var e = t.storageBucket || null;
						return null == e ? null : le.makeFromBucketSpec(e).bucket
					}, t.prototype.getAuthToken = function () {
						return null !== this.ot && U(this.ot.INTERNAL) && U(this.ot.INTERNAL.getToken) ? this.ot.INTERNAL.getToken().then(function (t) {
							return null !== t ? t.accessToken : null
						}, function (t) {
							return null
						}) : L(null)
					}, t.prototype.bucket = function () {
						if (this.rt) throw m();
						return this.nt
					}, t.prototype.service = function () {
						return this.lt
					}, t.prototype.makeStorageReference = function (t) {
						return this.ut(this, t)
					}, t.prototype.makeRequest = function (t, e) {
						if (this.rt) return new Oe(m());
						var n = this.st(t, e, this.ct);
						return this.ft.addRequest(n), n
					}, t.prototype.deleteApp = function () {
						this.rt = !0, this.ot = null, this.ft.clear()
					}, t.prototype.maxUploadRetryTime = function () {
						return this.ht
					}, t.prototype.setMaxUploadRetryTime = function (t) {
						this.ht = t
					}, t.prototype.maxOperationRetryTime = function () {
						return this.pt
					}, t.prototype.setMaxOperationRetryTime = function (t) {
						this.pt = t
					}, t
				}(),
				Ce = function () {
					function t(t, e, n, r, i, o, s, a, u, c, h) {
						this.dt = null, this._t = null, this.R = null, this.w = null, this.vt = !1, this.bt = !1, this.mt = t, this.yt = e, this.gt = n, this.Rt = r, this.Et = i.slice(), this.wt = o.slice(), this.Ut = s, this.Tt = a, this.At = c, this.Nt = u, this.ct = h;
						var l = this;
						this.M = j(function (t, e) {
							l.R = t, l.w = e, l.W()
						})
					}
					return t.prototype.W = function () {
						function t(t, n) {
							var r = e.R,
								o = e.w,
								s = n.xhr;
							if (n.wasSuccessCode) try {
									var a = e.Ut(s, s.getResponseText());
									F(a) ? r(a) : r()
								} catch (t) {
									o(t)
								} else if (null !== s)(u = i()).setServerResponseProp(s.getResponseText()), o(e.Tt ? e.Tt(s, u) : u);
								else if (n.canceled) {
								u = e.bt ? m() : h();
								o(u)
							} else {
								var u = c();
								o(u)
							}
						}
						var e = this;
						this.vt ? t(!1, new Se(!1, null, !0)) : this._t = Ft(function (t, n) {
							function r(t) {
								var n = t.loaded,
									r = t.lengthComputable ? t.total : -1;
								null !== e.At && e.At(n, r)
							}
							if (n) t(!1, new Se(!1, null, !0));
							else {
								var i = e.ct.createXhrIo();
								e.dt = i, null !== e.At && i.addUploadProgressListener(r), i.send(e.mt, e.yt, e.Rt, e.gt).then(function (n) {
									null !== e.At && n.removeUploadProgressListener(r), e.dt = null;
									var i = (n = n).getErrorCode() === qt.NO_ERROR,
										o = n.getStatus();
									if (i && !e.Ot(o)) {
										var s = wt(e.Et, o);
										t(!0, new Se(s, n))
									} else {
										var a = n.getErrorCode() === qt.ABORT;
										t(!1, new Se(!1, null, a))
									}
								})
							}
						}, t, this.Nt)
					}, t.prototype.getPromise = function () {
						return this.M
					}, t.prototype.cancel = function (t) {
						this.vt = !0, this.bt = t || !1, null !== this._t && Mt(this._t), null !== this.dt && this.dt.abort()
					}, t.prototype.Ot = function (t) {
						var e = t >= 500 && t < 600,
							n = wt([408, 429], t),
							r = wt(this.wt, t);
						return e || n || r
					}, t
				}(),
				Se = function () {
					return function (t, e, n) {
						this.wasSuccessCode = t, this.xhr = e, this.canceled = !!n
					}
				}(),
				Ae = function () {
					function t(t, e, n) {
						if (this.nt = null, this.T = new Te(t, function (t, e) {
								return new Ee(t, e)
							}, Bt, this, e), this.ot = t, null != n) this.nt = le.makeFromBucketSpec(n);
						else {
							var r = this.T.bucket();
							null != r && (this.nt = new le(r, ""))
						}
						this.Ct = new Ne(this)
					}
					return t.prototype.ref = function (t) {
						if (ct("ref", [lt(function (t) {
								if (/^[A-Za-z]+:\/\//.test(t)) throw "Expected child path but got a URL, use refFromURL instead."
							}, !0)], arguments), null == this.nt) throw Error("No Storage Bucket defined in Firebase Options.");
						var e = new Ee(this.T, this.nt);
						return null != t ? e.child(t) : e
					}, t.prototype.refFromURL = function (t) {
						return ct("refFromURL", [lt(function (t) {
							if (!/^[A-Za-z]+:\/\//.test(t)) throw "Expected full URL but got a child path, use ref instead.";
							try {
								le.makeFromUrl(t)
							} catch (t) {
								throw "Expected valid full URL but got an invalid one."
							}
						}, !1)], arguments), new Ee(this.T, t)
					}, Object.defineProperty(t.prototype, "maxUploadRetryTime", {
						get: function () {
							return this.T.maxUploadRetryTime()
						},
						enumerable: !0,
						configurable: !0
					}), t.prototype.setMaxUploadRetryTime = function (t) {
						ct("setMaxUploadRetryTime", [dt()], arguments), this.T.setMaxUploadRetryTime(t)
					}, Object.defineProperty(t.prototype, "maxOperationRetryTime", {
						get: function () {
							return this.T.maxOperationRetryTime()
						},
						enumerable: !0,
						configurable: !0
					}), t.prototype.setMaxOperationRetryTime = function (t) {
						ct("setMaxOperationRetryTime", [dt()], arguments), this.T.setMaxOperationRetryTime(t)
					}, Object.defineProperty(t.prototype, "app", {
						get: function () {
							return this.ot
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "INTERNAL", {
						get: function () {
							return this.Ct
						},
						enumerable: !0,
						configurable: !0
					}), t
				}(),
				Ne = function () {
					function t(t) {
						this.lt = t
					}
					return t.prototype.delete = function () {
						return this.lt.T.deleteApp(), L(void 0)
					}, t
				}();
			e.registerStorage = Ht;
			var Re = "storage";
			Ht(n(5).default)
		}
	}, [23])
} catch (t) {
	throw Error("Cannot instantiate firebase-storage.js - be sure to load firebase-app.js first.")
}
var config = {
	apiKey: "AIzaSyDpYpF1pSZ1dysDIrf-rWQO0AR_0Mq47Lw",
	authDomain: "knsh-96607.firebaseapp.com",
	databaseURL: "https://knsh-96607.firebaseio.com",
	projectId: "knsh-96607",
	storageBucket: "knsh-96607.appspot.com",
	messagingSenderId: "176340159206"
};
firebase.initializeApp(config), window.projectid = config.projectId, window.error = "Unknown Shortened URL", window.found = "Found! Redirecting...", window.currentURL = window.location.pathname, document.readyState = stats();