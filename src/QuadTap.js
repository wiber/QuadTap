var t;
t = () => ( () => {
    var t = {
        d: (e, o) => {
            for (var n in o)
                t.o(o, n) && !t.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: o[n]
                })
        }
        ,
        o: (t, e) => Object.prototype.hasOwnProperty.call(t, e)
    }
      , e = {};
    function o(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , o = document.createElement(t);
        if (e.className && (o.className = e.className),
        e.id && (o.id = e.id),
        e.text && (o.textContent = e.text),
        e.html && (o.innerHTML = e.html),
        e.attributes)
            for (var n in e.attributes)
                o.setAttribute(n, e.attributes[n]);
        if (e.styles)
            for (var i in e.styles)
                o.style[i] = e.styles[i];
        if (e.events)
            for (var a in e.events)
                o.addEventListener(a, e.events[a]);
        return e.children && e.children.forEach((function(t) {
            o.appendChild(t)
        }
        )),
        o
    }
    function n(t, e, o) {
        if (arguments.length > 3 && void 0 !== arguments[3] && arguments[3]) {
            var n = t.parentElement;
            if (n) {
                var i = n.getBoundingClientRect();
                e = i.width * e,
                o = i.height * o
            }
        }
        t.style.left = e + "px",
        t.style.top = o + "px",
        t.style.transform = "translate(-50%, -50%)"
    }
    function i(t) {
        return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        i(t)
    }
    t.d(e, {
        default: () => M
    });
    var a = "quadTap_";
    function r(t, e) {
        try {
            var o = a + t;
            return "object" === i(e) ? localStorage.setItem(o, JSON.stringify(e)) : localStorage.setItem(o, e),
            !0
        } catch (t) {
            return console.error("[QuadTap] Error saving to localStorage:", t),
            !1
        }
    }
    function s(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        try {
            var o = a + t
              , n = localStorage.getItem(o);
            if (null === n)
                return e;
            try {
                return JSON.parse(n)
            } catch (t) {
                return n
            }
        } catch (t) {
            return console.error("[QuadTap] Error retrieving from localStorage:", t),
            e
        }
    }
    function l(t) {
        return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        l(t)
    }
    function d() {
        d = function() {
            return e
        }
        ;
        var t, e = {}, o = Object.prototype, n = o.hasOwnProperty, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", r = i.asyncIterator || "@@asyncIterator", s = i.toStringTag || "@@toStringTag";
        function c(t, e, o, n) {
            return Object.defineProperty(t, e, {
                value: o,
                enumerable: !n,
                configurable: !n,
                writable: !n
            })
        }
        try {
            c({}, "")
        } catch (t) {
            c = function(t, e, o) {
                return t[e] = o
            }
        }
        function u(e, o, n, i) {
            var a = o && o.prototype instanceof g ? o : g
              , r = Object.create(a.prototype);
            return c(r, "_invoke", function(e, o, n) {
                var i = 1;
                return function(a, r) {
                    if (3 === i)
                        throw Error("Generator is already running");
                    if (4 === i) {
                        if ("throw" === a)
                            throw r;
                        return {
                            value: t,
                            done: !0
                        }
                    }
                    for (n.method = a,
                    n.arg = r; ; ) {
                        var s = n.delegate;
                        if (s) {
                            var l = j(s, n);
                            if (l) {
                                if (l === p)
                                    continue;
                                return l
                            }
                        }
                        if ("next" === n.method)
                            n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if (1 === i)
                                throw i = 4,
                                n.arg;
                            n.dispatchException(n.arg)
                        } else
                            "return" === n.method && n.abrupt("return", n.arg);
                        i = 3;
                        var d = h(e, o, n);
                        if ("normal" === d.type) {
                            if (i = n.done ? 4 : 2,
                            d.arg === p)
                                continue;
                            return {
                                value: d.arg,
                                done: n.done
                            }
                        }
                        "throw" === d.type && (i = 4,
                        n.method = "throw",
                        n.arg = d.arg)
                    }
                }
            }(e, n, new T(i || [])), !0),
            r
        }
        function h(t, e, o) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, o)
                }
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                }
            }
        }
        e.wrap = u;
        var p = {};
        function g() {}
        function m() {}
        function f() {}
        var b = {};
        c(b, a, (function() {
            return this
        }
        ));
        var v = Object.getPrototypeOf
          , y = v && v(v(B([])));
        y && y !== o && n.call(y, a) && (b = y);
        var w = f.prototype = g.prototype = Object.create(b);
        function x(t) {
            ["next", "throw", "return"].forEach((function(e) {
                c(t, e, (function(t) {
                    return this._invoke(e, t)
                }
                ))
            }
            ))
        }
        function C(t, e, o) {
            var n = document.createElement("button");
            w(n, b);
            
            // Detect if we're on mobile or small screen
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            var isSmallScreen = window.innerWidth < 768;
            
            // Apply responsive styles for buttons on mobile/small screens
            if (isMobile || isSmallScreen) {
                n.style.width = "26px";
                n.style.height = "26px";
                n.style.margin = "0 2px";
                n.style.fontSize = "13px";
            }
            
            // Fix alignment issues - using a single block of style definitions
            n.style.display = "flex";
            n.style.alignItems = "center";
            n.style.justifyContent = "center";
            n.style.lineHeight = "1";
            n.style.padding = "0"; // Remove any default padding
            n.style.verticalAlign = "middle";
            
            n.textContent = t;
            n.setAttribute("aria-label", e);
            n.addEventListener("mouseenter", (function() {
                w(n, v)
            })),
            n.addEventListener("mouseleave", (function() {
                n.style.backgroundColor = ""
            })),
            n.addEventListener("click", function(e) {
                e.preventDefault();
                o(e);
            }),
            
            // Add touch events for mobile
            n.addEventListener("touchstart", function(e) {
                e.preventDefault(); // Prevent default touch behavior
                w(n, v); // Apply hover style on touch
            }),
            n.addEventListener("touchend", function(e) {
                e.preventDefault(); // Prevent default touch behavior
                n.style.backgroundColor = ""; // Reset style
                o(e); // Call the original handler
            }),
            n.addEventListener("touchcancel", function(e) {
                n.style.backgroundColor = ""; // Reset style on touch cancel
            });
            
            return n;
        }
        function j(t) {
            var n = o.method
              , i = e.i[n];
            if (i === t)
                return o.delegate = null,
                "throw" === n && e.i.return && (o.method = "return",
                o.arg = t,
                j(e, o),
                "throw" === o.method) || "return" !== n && (o.method = "throw",
                o.arg = new TypeError("The iterator does not provide a '" + n + "' method")),
                p;
            var a = h(i, e.i, o.arg);
            if ("throw" === a.type)
                return o.method = "throw",
                o.arg = a.arg,
                o.delegate = null,
                p;
            var r = a.arg;
            return r ? r.done ? (o[e.r] = r.value,
            o.next = e.n,
            "return" !== o.method && (o.method = "next",
            o.arg = t),
            o.delegate = null,
            p) : r : (o.method = "throw",
            o.arg = new TypeError("iterator result is not an object"),
            o.delegate = null,
            p)
        }
        function k(t) {
            this.tryEntries.push(t)
        }
        function S(e) {
            var o = e[4] || {};
            o.type = "normal",
            o.arg = t,
            e[4] = o
        }
        function T(t) {
            this.tryEntries = [[-1]],
            t.forEach(k, this),
            this.reset(!0)
        }
        function B(e) {
            if (null != e) {
                var o = e[a];
                if (o)
                    return o.call(e);
                if ("function" == typeof e.next)
                    return e;
                if (!isNaN(e.length)) {
                    var i = -1
                      , r = function o() {
                        for (; ++i < e.length; )
                            if (n.call(e, i))
                                return o.value = e[i],
                                o.done = !1,
                                o;
                        return o.value = t,
                        o.done = !0,
                        o
                    };
                    return r.next = r
                }
            }
            throw new TypeError(l(e) + " is not iterable")
        }
        return m.prototype = f,
        c(w, "constructor", f),
        c(f, "constructor", m),
        m.displayName = c(f, s, "GeneratorFunction"),
        e.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === m || "GeneratorFunction" === (e.displayName || e.name))
        }
        ,
        e.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, f) : (t.__proto__ = f,
            c(t, s, "GeneratorFunction")),
            t.prototype = Object.create(w),
            t
        }
        ,
        e.awrap = function(t) {
            return {
                __await: t
            }
        }
        ,
        x(C.prototype),
        c(C.prototype, r, (function() {
            return this
        }
        )),
        e.AsyncIterator = C,
        e.async = function(t, o, n, i, a) {
            void 0 === a && (a = Promise);
            var r = new C(u(t, o, n, i),a);
            return e.isGeneratorFunction(o) ? r : r.next().then((function(t) {
                return t.done ? t.value : r.next()
            }
            ))
        }
        ,
        x(w),
        c(w, s, "Generator"),
        c(w, a, (function() {
            return this
        }
        )),
        c(w, "toString", (function() {
            return "[object Generator]"
        }
        )),
        e.keys = function(t) {
            var e = Object(t)
              , o = [];
            for (var n in e)
                o.unshift(n);
            return function t() {
                for (; o.length; )
                    if ((n = o.pop())in e)
                        return t.value = n,
                        t.done = !1,
                        t;
                return t.done = !0,
                t
            }
        }
        ,
        e.values = B,
        T.prototype = {
            constructor: T,
            reset: function(e) {
                if (this.prev = this.next = 0,
                this.sent = this._sent = t,
                this.done = !1,
                this.delegate = null,
                this.method = "next",
                this.arg = t,
                this.tryEntries.forEach(S),
                !e)
                    for (var o in this)
                        "t" === o.charAt(0) && n.call(this, o) && !isNaN(+o.slice(1)) && (this[o] = t)
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0][4];
                if ("throw" === t.type)
                    throw t.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done)
                    throw e;
                var o = this;
                function n(t) {
                    r.type = "throw",
                    r.arg = e,
                    o.next = t
                }
                for (var i = o.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i]
                      , r = a[4]
                      , s = this.prev
                      , l = a[1]
                      , d = a[2];
                    if (-1 === a[0])
                        return n("end"),
                        !1;
                    if (!l && !d)
                        throw Error("try statement without catch or finally");
                    if (null != a[0] && a[0] <= s) {
                        if (s < l)
                            return this.method = "next",
                            this.arg = t,
                            n(l),
                            !0;
                        if (s < d)
                            return n(d),
                            !1
                    }
                }
            },
            abrupt: function(t, e) {
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var n = this.tryEntries[o];
                    if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
                        var i = n;
                        break
                    }
                }
                i && ("break" === t || "continue" === t) && i[0] <= e && e <= i[2] && (i = null);
                var a = i ? i[4] : {};
                return a.type = t,
                a.arg = e,
                i ? (this.method = "next",
                this.next = i[2],
                p) : this.complete(a)
            },
            complete: function(t, e) {
                if ("throw" === t.type)
                    throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg,
                this.method = "return",
                this.next = "end") : "normal" === t.type && e && (this.next = e),
                p
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var o = this.tryEntries[e];
                    if (o[2] === t)
                        return this.complete(o[4], o[3]),
                        S(o),
                        p
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var o = this.tryEntries[e];
                    if (o[0] === t) {
                        var n = o[4];
                        if ("throw" === n.type) {
                            var i = n.arg;
                            S(o)
                        }
                        return i
                    }
                }
                throw Error("illegal catch attempt")
            },
            delegateYield: function(e, o, n) {
                return this.delegate = {
                    i: B(e),
                    r: o,
                    n
                },
                "next" === this.method && (this.arg = t),
                p
            }
        },
        e
    }
    function c(t, e, o, n, i, a, r) {
        try {
            var s = t[a](r)
              , l = s.value
        } catch (t) {
            return void o(t)
        }
        s.done ? e(l) : Promise.resolve(l).then(n, i)
    }
    function u(t) {
        return function() {
            var e = this
              , o = arguments;
            return new Promise((function(n, i) {
                var a = t.apply(e, o);
                function r(t) {
                    c(a, n, i, r, s, "next", t)
                }
                function s(t) {
                    c(a, n, i, r, s, "throw", t)
                }
                r(void 0)
            }
            ))
        }
    }
    function h() {
        return (h = u(d().mark((function t(e) {
            var o, n, i;
            return d().wrap((function(t) {
                for (; ; )
                    switch (t.prev = t.next) {
                    case 0:
                        if (n = e.elements.video,
                        !(i = (null === (o = e.config.videoPlayerApi) || void 0 === o ? void 0 : o.enabled) && e.config.videoPlayerApi.adapter)) {
                            t.next = 7;
                            break
                        }
                        return t.next = 5,
                        i.play();
                    case 5:
                        t.next = 16;
                        break;
                    case 7:
                        if (!n) {
                            t.next = 16;
                            break
                        }
                        return t.prev = 8,
                        t.next = 11,
                        n.play();
                    case 11:
                        t.next = 16;
                        break;
                    case 13:
                        t.prev = 13,
                        t.t0 = t.catch(8),
                        console.error("Error resuming video playback:", t.t0);
                    case 16:
                    case "end":
                        return t.stop()
                    }
            }
            ), t, null, [[8, 13]])
        }
        )))).apply(this, arguments)
    }
    function p() {
        return (p = u(d().mark((function t(e) {
            var o, n, i;
            return d().wrap((function(t) {
                for (; ; )
                    switch (t.prev = t.next) {
                    case 0:
                        if (n = e.elements.video,
                        !(i = (null === (o = e.config.videoPlayerApi) || void 0 === o ? void 0 : o.enabled) && e.config.videoPlayerApi.adapter)) {
                            t.next = 11;
                            break
                        }
                        // QuadTap MOD: Unconditionally pause if adapter exists
                        return t.next = 5,
                        i.pause();
                    case 5:
                        // e.state.wasPlayingBefore = t.sent; // QuadTap MOD: Removed wasPlayingBefore logic
                        // if (!e.state.wasPlayingBefore) {
                        //     t.next = 9;
                        //     break
                        // }
                        // return t.next = 9,
                        // i.pause();
                    // case 9:
                        t.next = 12; // QuadTap MOD: Skip to end after pause
                        break;
                    case 11:
                        // QuadTap MOD: Unconditionally pause if native video element exists
                        n && n.pause();
                        // e.state.wasPlayingBefore = !1; // QuadTap MOD: Removed wasPlayingBefore logic
                    case 12:
                    case "end":
                        return t.stop()
                    }
            }
            ), t)
        }
        )))).apply(this, arguments)
    }
    var g = {
        width: "60%", // Adjusted from 70%
        maxWidth: "350px", // Adjusted from 420px
        height: "auto", 
        padding: "6px 10px", // Slightly reduced padding
        borderRadius: "24px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex", 
        justifyContent: "space-around", // Restored original space-around
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        transition: "opacity 0.3s ease, width 0.3s ease, padding 0.3s ease"
    }
      , m = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
      , f = {
        position: "static",
        top: "",
        left: "",
        transform: "",
        margin: "20px auto"
    }
      , b = {
        width: "30px", // Adjusted from 32px
        height: "30px", // Adjusted from 32px
        margin: "0 3px", // Adjusted from 4px
        borderRadius: "50%",
        border: "none",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "white",
        fontSize: "14px", // Adjusted from 15px
        cursor: "pointer",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.2s ease"
    }
      , v = {
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    }
      , y = {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "14px",
        zIndex: "2000",
        pointerEvents: "none",
        opacity: "0",
        transition: "opacity 0.3s ease"
    };
    function w(t, e) {
        Object.assign(t.style, e)
    }
    function x(t) {
        var e = t.overlay
          , o = t.onPlay
          , n = t.onPause
          , i = t.onRewind
          , a = t.onForward
          , r = t.onShare
          , s = t.onCopyUrl
          , l = t.rewindTime
          , d = void 0 === l ? 30 : l
          , c = t.forwardTime
          , u = void 0 === c ? 30 : c
          , h = t.debug
          , p = void 0 !== h && h
          , b = t.showAllButtons
          , v = void 0 !== b && b
          , y = t.isLightbox
          , x = void 0 !== y && y
          , j = document.createElement("div");
          
        // Apply base styles
        w(j, g);
        w(j, x ? f : m);
        
        // Detect if we're on mobile or small screen
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var isSmallScreen = window.innerWidth < 768;
        
        // Apply responsive styles for mobile/small screens
        if (isMobile || isSmallScreen) {
            // Narrower on mobile but not too narrow
            j.style.width = "65%";
            j.style.maxWidth = "280px";
            j.style.padding = "5px 8px";
        }
        
        if (!x) {
            var T = parseInt(getComputedStyle(e).zIndex) || 1e3;
            j.style.zIndex = (T + 10).toString()
        }
        
        var B = C("⟲" + d, "Rewind " + d + " seconds", i)
          , E = C("▶", "Play/Pause", (function(t) {
            var e = "▶" === E.textContent;
            E.textContent = e ? "❚❚" : "▶",
            e ? o(t) : n(t)
        }
        ))
          , q = C("⟳" + u, "Forward " + u + " seconds", a)
          , P = C("⤴", "Share", (function(t) {
            if (t.stopPropagation(),
            r)
                r(t);
            else {
                var e = window.location.href;
                navigator.share ? navigator.share({
                    title: "Check out this video moment",
                    url: e
                }).catch((function(t) {
                    console.error("Error sharing:", t)
                }
                )) : (k(e),
                S(P, "Link copied!"))
            }
        }
        ))
          , O = C("⧉", "Copy URL", (function(t) {
            t.stopPropagation(),
            s ? s(t) : (k(window.location.href),
            S(O, "Link copied!"))
        }
        ));
        if (j.appendChild(B),
        j.appendChild(E),
        j.appendChild(q),
        (v || x) && (j.appendChild(P),
        j.appendChild(O)),
        
        // Add click event handler to stop propagation
        j.addEventListener("click", (function(t) {
            t.stopPropagation(),
            p && console.log("[QuadTap] Control strip clicked, propagation stopped")
        })),
        
        // Add touch event handlers for mobile
        j.addEventListener("touchstart", function(t) {
            t.stopPropagation();
            j.style.opacity = "1";
            p && console.log("[QuadTap] Control strip touch started, propagation stopped");
        }),
        j.addEventListener("touchend", function(t) {
            t.stopPropagation();
            p && console.log("[QuadTap] Control strip touch ended, propagation stopped");
        }),
        j.addEventListener("touchmove", function(t) {
            t.stopPropagation();
        }),
        
        e.appendChild(j),
        !x) {
            var z, L = function() {
                j.style.opacity = "0.5"
            };
            j.addEventListener("mouseenter", (function() {
                clearTimeout(z),
                j.style.opacity = "1"
            }
            )),
            j.addEventListener("mouseleave", (function() {
                clearTimeout(z),
                z = setTimeout(L, 2e3)
            }
            )),
            j.style.opacity = "1",
            z = setTimeout(L, 2e3)
        }
        return p && (console.log("[QuadTap] Control strip created with positioning:", {
            isLightbox: x,
            className: j.className,
            zIndex: j.style.zIndex
        }),
        x || new ResizeObserver((function() {
            var t = j.getBoundingClientRect()
              , o = e.getBoundingClientRect()
              , n = (t.top - o.top + t.height / 2) / o.height * 100
              , i = (t.left - o.left + t.width / 2) / o.width * 100;
            console.log("[QuadTap] Control strip position after resize:", {
                topPercent: n.toFixed(2) + "%",
                leftPercent: i.toFixed(2) + "%",
                width: t.width,
                height: t.height
            })
        }
        )).observe(e)),
        j
    }
    function C(t, e, o) {
        var n = document.createElement("button");
        w(n, b);
        
        // Detect if we're on mobile or small screen
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var isSmallScreen = window.innerWidth < 768;
        
        // Apply responsive styles for buttons on mobile/small screens
        if (isMobile || isSmallScreen) {
            n.style.width = "26px";
            n.style.height = "26px";
            n.style.margin = "0 2px";
            n.style.fontSize = "13px";
        }
        
        // Fix alignment issues - using a single block of style definitions
        n.style.display = "flex";
        n.style.alignItems = "center";
        n.style.justifyContent = "center";
        n.style.lineHeight = "1";
        n.style.padding = "0"; // Remove any default padding
        n.style.verticalAlign = "middle";
        
        n.textContent = t;
        n.setAttribute("aria-label", e);
        n.addEventListener("mouseenter", (function() {
            w(n, v)
        })),
        n.addEventListener("mouseleave", (function() {
            n.style.backgroundColor = ""
        })),
        n.addEventListener("click", function(e) {
            e.preventDefault();
            o(e);
        }),
        
        // Add touch events for mobile
        n.addEventListener("touchstart", function(e) {
            e.preventDefault(); // Prevent default touch behavior
            w(n, v); // Apply hover style on touch
        }),
        n.addEventListener("touchend", function(e) {
            e.preventDefault(); // Prevent default touch behavior
            n.style.backgroundColor = ""; // Reset style
            o(e); // Call the original handler
        }),
        n.addEventListener("touchcancel", function(e) {
            n.style.backgroundColor = ""; // Reset style on touch cancel
        });
        
        return n;
    }
    function j(t, e) {
        var o = t.querySelector("button:nth-child(2)");
        o && (o.textContent = e ? "❚❚" : "▶")
    }
    function k(t) {
        if (navigator.clipboard && navigator.clipboard.writeText)
            navigator.clipboard.writeText(t).catch((function(t) {
                console.error("Failed to copy text: ", t)
            }
            ));
        else {
            var e = document.createElement("textarea");
            e.value = t,
            e.style.position = "fixed",
            document.body.appendChild(e),
            e.select();
            try {
                document.execCommand("copy")
            } catch (t) {
                console.error("Failed to copy text: ", t)
            }
            document.body.removeChild(e)
        }
    }
    function S(t, e) {
        var o = document.createElement("div");
        w(o, y),
        o.textContent = e;
        var n = t.getBoundingClientRect();
        o.style.top = "".concat(n.top - 30, "px"),
        o.style.left = "".concat(n.left + n.width / 2, "px"),
        o.style.transform = "translateX(-50%)",
        document.body.appendChild(o),
        setTimeout((function() {
            o.style.opacity = "1"
        }
        ), 10),
        setTimeout((function() {
            o.style.opacity = "0",
            setTimeout((function() {
                document.body.removeChild(o)
            }
            ), 300)
        }
        ), 1500)
    }
    function T(t) {
        return T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        T(t)
    }
    function B(t, e) {
        for (var o = 0; o < e.length; o++) {
            var n = e[o];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, E(n.key), n)
        }
    }
    function E(t) {
        var e = function(t) {
            if ("object" != T(t) || !t)
                return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var o = e.call(t, "string");
                if ("object" != T(o))
                    return o;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(t)
        }(t);
        return "symbol" == T(e) ? e : e + ""
    }
    var q = {
        containerId: "main-video-droppable",
        videoSelector: "#main-video",
        autoCancelTimeout: 5e3,
        debug: !0,
        emojis: {
            quadrants: {
                topLeft: "🕊️",
                topRight: "🌟",
                bottomLeft: "🌧️",
                bottomRight: "💥"
            },
            directional: {
                up: "🚀",
                right: "👑",
                down: "⬇️",
                left: "🤫"
            },
            thoughts: {
                topLeft: ["🌸", "🎈", "🌦️", "🛤️"],
                topRight: ["🌈", "✨", "🌤️", "🎆"],
                bottomLeft: ["🍂", "🌙", "☔", "🗿"],
                bottomRight: ["⚖️", "🏆", "⛈️", "💣"]
            }
        },
        videoControls: {
            enabled: !0,
            rewindTime: 30,
            forwardTime: 30
        },
        callbacks: {
            onOverlayActivate: null,
            onThrowDownInitiate: null,
            onThrowDownConfirm: null,
            onThrowDownCancel: null,
            onVideoControl: null
        }
    };
    const P = function() {
        return t = function t() {
            var e, o, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, t),
            this.config = Object.assign({}, q, n),
            n.emojis && (this.config.emojis = Object.assign({}, q.emojis, n.emojis),
            n.emojis.quadrants && (this.config.emojis.quadrants = Object.assign({}, q.emojis.quadrants, n.emojis.quadrants)),
            n.emojis.directional && (this.config.emojis.directional = Object.assign({}, q.emojis.directional, n.emojis.directional)),
            n.emojis.thoughts && (this.config.emojis.thoughts = Object.assign({}, q.emojis.thoughts, n.emojis.thoughts))),
            n.videoControls && (this.config.videoControls = Object.assign({}, q.videoControls, n.videoControls)),
            n.profileBubble ? this.config.profileBubble = Object.assign({}, {
                imageUrl: null,
                fallbackEmoji: "👤",
                size: "60px",
                borderColor: "white",
                borderWidth: "2px",
                backgroundColor: "rgba(0, 0, 0, 0.7)"
            }, n.profileBubble) : this.config.profileBubble = {
                imageUrl: null,
                fallbackEmoji: "👤",
                size: "60px",
                borderColor: "white",
                borderWidth: "2px",
                backgroundColor: "rgba(0, 0, 0, 0.7)"
            },
            n.colors ? (this.config.colors = {
                overlay: {
                    background: "rgba(240, 240, 245, 0.5)",
                    quadrantGradients: {
                        topLeft: "rgba(0, 255, 255, 0.8)",
                        topRight: "rgba(255, 255, 0, 0.8)",
                        bottomLeft: "rgba(0, 255, 0, 0.8)",
                        bottomRight: "rgba(255, 0, 255, 0.8)"
                    }
                },
                lightbox: {
                    background: "rgba(20, 30, 40, 0.95)",
                    text: "white",
                    headerBackground: "rgba(30, 40, 60, 0.8)",
                    buttonPrimary: "#4CAF50",
                    buttonSecondary: "#f44336"
                }
            },
            n.colors.overlay && (this.config.colors.overlay = Object.assign({}, this.config.colors.overlay, n.colors.overlay),
            n.colors.overlay.quadrantGradients && (this.config.colors.overlay.quadrantGradients = Object.assign({}, this.config.colors.overlay.quadrantGradients, n.colors.overlay.quadrantGradients))),
            n.colors.lightbox && (this.config.colors.lightbox = Object.assign({}, this.config.colors.lightbox, n.colors.lightbox))) : this.config.colors = {
                overlay: {
                    background: "rgba(240, 240, 245, 0.5)",
                    quadrantGradients: {
                        topLeft: "rgba(0, 255, 255, 0.8)",
                        topRight: "rgba(255, 255, 0, 0.8)",
                        bottomLeft: "rgba(0, 255, 0, 0.8)",
                        bottomRight: "rgba(255, 0, 255, 0.8)"
                    }
                },
                lightbox: {
                    background: "rgba(20, 30, 40, 0.95)",
                    text: "white",
                    headerBackground: "rgba(30, 40, 60, 0.8)",
                    buttonPrimary: "#4CAF50",
                    buttonSecondary: "#f44336"
                }
            },
            this.state = {
                active: !1,
                profileBubblePosition: {
                    x: 0,
                    y: 0
                },
                currentQuadrant: null,
                autoCancelTimer: null,
                containerDimensions: {
                    width: 0,
                    height: 0
                },
                videoPlaying: !1,
                wasPlayingBefore: !1,
                recording: !1,
                mediaStream: null,
                mediaRecorder: null,
                recordingStartTime: 0,
                recordingIndicator: null,
                swipeDebounceTimer: null, // For debounce timing
                swipeProcessing: !1 // Add this to track active swipe processing
            },
            this.elements = {
                container: null,
                video: null,
                overlay: null,
                profileBubble: null,
                directionalEmojis: {},
                quadrantEmojis: {},
                videoControls: null,
                tooltip: null,
                lightBox: null,
                lightBoxContent: null,
                emojiGrid: null,
                commentBox: null
            },
            this.throttledResize = (e = this.handleResize.bind(this),
            function() {
                o || (e.apply(void 0, arguments),
                o = !0,
                setTimeout((function() {
                    o = !1
                }
                ), 100))
            }
            ),
            this.init()
        }
        ,
        e = [{
            key: "log",
            value: function(t, e) {
                this.config.debug && console.log("[QuadTap] ".concat(t), e || "")
            }
        }, {
            key: "init",
            value: function() {
                this.log("Initializing QuadTap");
                var t = document.getElementById(this.config.containerId);
                t ? (this.elements.container = t,
                function() {
                    if (!document.getElementById("quad-tap-styles")) {
                        var t = document.createElement("style");
                        t.id = "quad-tap-styles",
                        t.textContent = "\n    /* Overlay Container */\n    .overlay-container {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 0.3s ease;\n      z-index: 1000;\n      background-color: rgba(240, 240, 245, 0.5);\n    }\n    \n    .overlay-container.active {\n      opacity: 1;\n      pointer-events: auto;\n    }\n    \n    /* Block pointer events on video when overlay is active */\n    .overlay-container.active + video,\n    .quad-tap-overlay.active + video {\n      pointer-events: none;\n    }\n    \n    /* Quadrants */\n    .quadrant {\n      position: absolute;\n      width: 50%;\n      height: 50%;\n      opacity: 0.8;\n      transition: opacity 0.3s ease;\n    }\n    \n    .quadrant.top-left {\n      top: 0;\n      left: 0;\n      background: linear-gradient(135deg, rgba(0, 255, 255, 0.8), rgba(0, 255, 255, 0));\n    }\n    \n    .quadrant.top-right {\n      top: 0;\n      right: 0;\n      background: linear-gradient(225deg, rgba(255, 255, 0, 0.8), rgba(255, 255, 0, 0));\n    }\n    \n    .quadrant.bottom-left {\n      bottom: 0;\n      left: 0;\n      background: linear-gradient(45deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0));\n    }\n    \n    .quadrant.bottom-right {\n      bottom: 0;\n      right: 0;\n      background: linear-gradient(315deg, rgba(255, 0, 255, 0.8), rgba(255, 0, 255, 0));\n    }\n    \n    /* Profile Bubble */\n    .profile-bubble {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      border-radius: 50%;\n      background-color: rgba(128, 128, 128, 0.8);\n      border: 2px solid white;\n      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer;\n      z-index: 1001;\n      transform: translate(-50%, -50%);\n      transition: transform 0.2s ease, box-shadow 0.2s ease;\n    }\n    \n    .profile-bubble:hover {\n      transform: translate(-50%, -50%) scale(1.1);\n      box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);\n    }\n    \n    /* Light-Box Modal */\n    .td-modal {\n      display: none;\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: rgba(0, 0, 0, 0.7);\n      z-index: 2000;\n      justify-content: center;\n      align-items: center;\n      opacity: 0;\n      transition: opacity 0.3s ease;\n    }\n    \n    .td-modal.active {\n      display: flex;\n      opacity: 1;\n    }\n    \n    .td-modal-content {\n      background-color: white;\n      padding: 20px;\n      border-radius: 10px;\n      width: 95%;\n      max-width: 800px;\n      max-height: 80vh;\n      overflow-y: auto;\n      position: relative;\n      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    }\n    \n    .td-modal-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 20px;\n      padding-bottom: 10px;\n      border-bottom: 1px solid #eee;\n    }\n    \n    .td-modal-header h4 {\n      margin: 0;\n      font-size: 1.5rem;\n      color: #333;\n    }\n    \n    .td-close-btn, .td-pause-play-btn {\n      background: none;\n      border: none;\n      font-size: 1.5rem;\n      cursor: pointer;\n      color: #999;\n      transition: color 0.2s ease;\n    }\n    \n    .td-close-btn {\n      margin-left: 10px;\n    }\n    \n    .td-pause-play-btn {\n      margin-left: auto;\n    }\n    \n    .td-close-btn:hover, .td-pause-play-btn:hover {\n      color: #333;\n    }\n    \n    /* Emoji Grid */\n    .emoji-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      grid-template-rows: 1fr 1fr;\n      gap: 10px;\n      width: 100%;\n    }\n    \n    .emoji-quadrant {\n      padding: 10px;\n      border-radius: 8px;\n    }\n    \n    .emoji-quadrant.top-left {\n      background-color: rgba(0, 255, 255, 0.2);\n    }\n    \n    .emoji-quadrant.top-right {\n      background-color: rgba(255, 255, 0, 0.2);\n    }\n    \n    .emoji-quadrant.bottom-left {\n      background-color: rgba(0, 255, 0, 0.2);\n    }\n    \n    .emoji-quadrant.bottom-right {\n      background-color: rgba(255, 0, 255, 0.2);\n    }\n    \n    .emoji-row {\n      display: flex;\n      justify-content: space-around;\n      margin-bottom: 10px;\n      background-color: transparent;\n    }\n    \n    .emoji-cell {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background-color: transparent;\n    }\n    \n    .thought-emoji {\n      font-size: 2rem;\n      cursor: pointer;\n      padding: 5px;\n      border-radius: 5px;\n      transition: transform 0.2s ease, background-color 0.2s ease;\n    }\n    \n    .thought-emoji:hover {\n      transform: scale(1.2);\n      background-color: rgba(255, 255, 255, 0.5);\n    }\n    \n    .thought-emoji.selected {\n      background-color: rgba(255, 255, 255, 0.8);\n      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n    }\n    \n    /* Tooltip */\n    .tooltip {\n      position: absolute;\n      background-color: rgba(0, 0, 0, 0.7);\n      color: white;\n      padding: 5px 10px;\n      border-radius: 5px;\n      font-size: 0.8rem;\n      pointer-events: none;\n      z-index: 1002;\n      transition: opacity 0.3s ease;\n    }\n    \n    /* Comment Box */\n    .comment-box {\n      margin-top: 20px;\n      width: 100%;\n    }\n    \n    .comment-box textarea {\n      width: 100%;\n      padding: 10px;\n      border: 1px solid #ddd;\n      border-radius: 5px;\n      resize: vertical;\n      min-height: 80px;\n      font-family: inherit;\n    }\n    \n    /* Media Buttons */\n    .media-buttons {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 10px;\n      margin-top: 10px;\n      margin-bottom: 10px;\n    }\n    \n    .media-button {\n      padding: 8px 12px;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-weight: bold;\n      transition: background-color 0.2s ease;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n    \n    .upload-button {\n      background-color: #3498db;\n      color: white;\n    }\n    \n    .upload-button:hover {\n      background-color: #2980b9;\n    }\n    \n    .capture-button {\n      background-color: #e74c3c;\n      color: white;\n    }\n    \n    .capture-button:hover {\n      background-color: #c0392b;\n    }\n    \n    .uploaded-file-name {\n      margin-top: 5px;\n      padding: 5px;\n      background-color: #f1f1f1;\n      border-radius: 3px;\n      font-size: 0.9rem;\n      width: 100%;\n    }\n    \n    .recording-message {\n      margin-top: 5px;\n      padding: 5px;\n      background-color: #f8d7da;\n      color: #721c24;\n      border-radius: 3px;\n      font-size: 0.9rem;\n      width: 100%;\n    }\n    \n    .recording-indicator {\n      animation: pulse 1.5s infinite;\n    }\n    \n    @keyframes pulse {\n      0% { opacity: 1; }\n      50% { opacity: 0.5; }\n      100% { opacity: 1; }\n    }\n    \n    /* Action Buttons */\n    .action-buttons {\n      display: flex;\n      justify-content: flex-end;\n      margin-top: 20px;\n      gap: 10px;\n    }\n    \n    .action-button {\n      padding: 8px 16px;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-weight: bold;\n      transition: background-color 0.2s ease;\n    }\n    \n    .save-button {\n      background-color: #4CAF50;\n      color: white;\n    }\n    \n    .save-button:hover {\n      background-color: #45a049;\n    }\n    \n    .cancel-button {\n      background-color: #f44336;\n      color: white;\n    }\n    \n    .cancel-button:hover {\n      background-color: #d32f2f;\n    }\n  ",
                        document.head.appendChild(t)
                    }
                }(),
                this.createOverlayElements(),
                this.createLightBoxElements(),
                this.bindEventHandlers(),
                this.log("QuadTap initialized successfully")) : this.log("Container not found", this.config.containerId)
            }
        }, {
            key: "createOverlayElements",
            value: function() {
                var t = this
                  , e = o("div", {
                    className: "quad-tap-overlay",
                    styles: {
                        display: "none",
                        backgroundColor: this.config.colors.overlay.background
                    }
                })
                  , n = o("div", {
                    className: "overlay-close-btn",
                    html: "&times;",
                    styles: {
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        cursor: "pointer",
                        zIndex: "1002"
                    },
                    events: {
                        click: function(e) {
                            t.deactivateOverlay(),
                            e.stopPropagation()
                        }
                    }
                })
                  , i = o("div", {
                    className: "quadrant top-left",
                    styles: {
                        background: "radial-gradient(circle at 0% 0%, ".concat(this.config.colors.overlay.quadrantGradients.topLeft, ", transparent 70%)")
                    }
                })
                  , a = o("div", {
                    className: "quadrant top-right",
                    styles: {
                        background: "radial-gradient(circle at 100% 0%, ".concat(this.config.colors.overlay.quadrantGradients.topRight, ", transparent 70%)")
                    }
                })
                  , r = o("div", {
                    className: "quadrant bottom-left",
                    styles: {
                        background: "radial-gradient(circle at 0% 100%, ".concat(this.config.colors.overlay.quadrantGradients.bottomLeft, ", transparent 70%)")
                    }
                })
                  , s = o("div", {
                    className: "quadrant bottom-right",
                    styles: {
                        background: "radial-gradient(circle at 100% 100%, ".concat(this.config.colors.overlay.quadrantGradients.bottomRight, ", transparent 70%)")
                    }
                })
                  , l = {
                    display: "none",
                    width: this.config.profileBubble.size,
                    height: this.config.profileBubble.size,
                    borderColor: this.config.profileBubble.borderColor,
                    borderWidth: this.config.profileBubble.borderWidth,
                    backgroundColor: this.config.profileBubble.backgroundColor,
                    borderStyle: "solid",
                    borderRadius: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    zIndex: "1000"
                };
                this.config.profileBubble.imageUrl && (l.backgroundImage = "url(".concat(this.config.profileBubble.imageUrl, ")"),
                l.backgroundSize = "cover",
                l.backgroundPosition = "center",
                l.fontSize = "0");
                var d = o("div", {
                    className: "profile-bubble",
                    text: this.config.profileBubble.imageUrl ? "" : this.config.profileBubble.fallbackEmoji,
                    styles: l
                })
                  , c = o("div", {
                    className: "directional-emoji up",
                    text: this.config.emojis.directional.up,
                    styles: {
                        display: "none"
                    }
                })
                  , u = o("div", {
                    className: "directional-emoji right",
                    text: this.config.emojis.directional.right,
                    styles: {
                        display: "none"
                    }
                })
                  , h = o("div", {
                    className: "directional-emoji down",
                    text: this.config.emojis.directional.down,
                    styles: {
                        display: "none"
                    }
                })
                  , p = o("div", {
                    className: "directional-emoji left",
                    text: this.config.emojis.directional.left,
                    styles: {
                        display: "none"
                    }
                })
                  , g = o("div", {
                    className: "quadrant-emoji top-left",
                    text: this.config.emojis.quadrants.topLeft,
                    styles: {
                        display: "none"
                    }
                })
                  , m = o("div", {
                    className: "quadrant-emoji top-right",
                    text: this.config.emojis.quadrants.topRight,
                    styles: {
                        display: "none"
                    }
                })
                  , f = o("div", {
                    className: "quadrant-emoji bottom-left",
                    text: this.config.emojis.quadrants.bottomLeft,
                    styles: {
                        display: "none"
                    }
                })
                  , b = o("div", {
                    className: "quadrant-emoji bottom-right",
                    text: this.config.emojis.quadrants.bottomRight,
                    styles: {
                        display: "none"
                    }
                })
                  , v = this.createVideoControls()
                  , y = o("div", {
                    className: "tooltip",
                    text: "Tap elsewhere to cancel",
                    styles: {
                        display: "none"
                    }
                });
                e.appendChild(n),
                e.appendChild(i),
                e.appendChild(a),
                e.appendChild(r),
                e.appendChild(s),
                e.appendChild(c),
                e.appendChild(u),
                e.appendChild(h),
                e.appendChild(p),
                e.appendChild(g),
                e.appendChild(m),
                e.appendChild(f),
                e.appendChild(b),
                e.appendChild(d),
                e.appendChild(v),
                e.appendChild(y),
                this.elements.container.appendChild(e),
                this.elements.overlay = e,
                this.elements.profileBubble = d,
                this.elements.directionalEmojis = {
                    up: c,
                    right: u,
                    down: h,
                    left: p
                },
                this.elements.quadrantEmojis = {
                    topLeft: g,
                    topRight: m,
                    bottomLeft: f,
                    bottomRight: b
                },
                this.elements.videoControls = v,
                this.elements.tooltip = y
            }
        }, {
            key: "createVideoControls",
            value: function() {
                var t = this
                  , e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!this.config.videoControls.enabled)
                    return o("div", {
                        styles: {
                            display: "none"
                        }
                    });
                var n = document.querySelector(this.config.videoSelector)
                  , i = x({
                    overlay: e ? this.elements.lightBoxContent || document.createElement("div") : this.elements.overlay || document.createElement("div"),
                    onPlay: function() {
                        n && n.play()
                    },
                    onPause: function() {
                        n && n.pause()
                    },
                    onRewind: function() {
                        n && (n.currentTime = Math.max(0, n.currentTime - t.config.videoControls.rewindTime))
                    },
                    onForward: function() {
                        n && (n.currentTime = Math.min(n.duration, n.currentTime + t.config.videoControls.forwardTime))
                    },
                    rewindTime: this.config.videoControls.rewindTime,
                    forwardTime: this.config.videoControls.forwardTime,
                    debug: this.config.debug,
                    showAllButtons: !0,
                    isLightbox: e
                });
                return e || (i.style.display = "none"),
                this.elements.videoControlsObj = {
                    element: i,
                    setMode: function(e, o) {
                        !function(t, e, o) {
                            if (t.classList.remove("qt-control-strip--overlay"),
                            t.classList.remove("qt-control-strip--lightbox"),
                            "overlay" === e) {
                                t.classList.add("qt-control-strip--overlay"),
                                t.style.position = "absolute",
                                t.style.bottom = "20px",
                                t.style.left = "50%",
                                t.style.transform = "translateX(-50%)",
                                t.style.zIndex = "1000";
                                var n = o.offsetWidth;
                                t.style.width = "".concat(Math.min(.8 * n, 400), "px"),
                                t.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
                            } else
                                "lightbox" === e && (t.classList.add("qt-control-strip--lightbox"),
                                t.style.position = "static",
                                t.style.bottom = "",
                                t.style.left = "",
                                t.style.transform = "",
                                t.style.zIndex = "",
                                t.style.width = "100%",
                                t.style.boxShadow = "none")
                        }(i, "lightbox" === e, o || t.elements.container)
                    },
                    updateTimeDisplay: function() {},
                    updatePlayPauseButton: function(t) {
                        j(i, t)
                    }
                },
                i
            }
        }, {
            key: "createLightboxControlStrip",
            value: function() {
                var t = this;
                if (!this.config.videoControls.enabled)
                    return o("div", {
                        styles: {
                            display: "none"
                        }
                    });
                var e = o("div", {
                    className: "td-lightbox-controls",
                    styles: {
                        width: "100%",
                        padding: "10px 0",
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        flexDirection: "column"
                    }
                })
                  , n = document.querySelector(this.config.videoSelector)
                  , i = x({
                    overlay: this.elements.lightBoxContent || document.createElement("div"),
                    onPlay: function() {
                        n && n.play()
                    },
                    onPause: function() {
                        n && n.pause()
                    },
                    onRewind: function() {
                        n && (n.currentTime = Math.max(0, n.currentTime - t.config.videoControls.rewindTime))
                    },
                    onForward: function() {
                        n && (n.currentTime = Math.min(n.duration, n.currentTime + t.config.videoControls.forwardTime))
                    },
                    rewindTime: this.config.videoControls.rewindTime,
                    forwardTime: this.config.videoControls.forwardTime,
                    debug: this.config.debug,
                    showAllButtons: !0,
                    isLightbox: !0
                });
                return this.elements.lightboxControlStripObj = {
                    element: i,
                    updateTimeDisplay: function() {},
                    updatePlayPauseButton: function(t) {
                        j(i, t)
                    }
                },
                this.elements.lightboxControlStrip = i,
                e.appendChild(i),
                e
            }
        }, {
            key: "createLightBoxElements",
            value: function() {
                var t = this;
                // Overlay (gray out background)
                var overlay = document.createElement('div');
                overlay.id = 'qt-overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.background = 'rgba(0,0,0,0.7)';
                overlay.style.zIndex = '9999';
                overlay.style.display = 'none';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.pointerEvents = 'auto';
                overlay.style.transition = 'opacity 0.3s ease';
                overlay.style.opacity = '1';

                // Modal (white box)
                var modal = document.createElement('div');
                modal.id = 'qt-modal';
                modal.style.position = 'absolute';
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                modal.style.background = '#fff';
                modal.style.padding = '32px';
                modal.style.borderRadius = '14px';
                modal.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
                modal.style.zIndex = '10000';
                modal.style.maxWidth = '95vw';
                modal.style.maxHeight = '80vh';
                modal.style.overflowY = 'auto';
                modal.style.display = 'flex';
                modal.style.flexDirection = 'column';
                modal.style.alignItems = 'center';
                modal.style.pointerEvents = 'auto';
                modal.style.minWidth = '600px';

                // Create header
                var header = document.createElement('h2');
                header.textContent = 'QuadTap Input';
                header.style.marginBottom = '20px';
                header.style.color = '#333';
                header.style.textAlign = 'center';
                modal.appendChild(header);

                // Create position inputs container
                var positionContainer = document.createElement('div');
                positionContainer.style.display = 'flex';
                positionContainer.style.gap = '20px';
                positionContainer.style.marginBottom = '20px';
                positionContainer.style.alignItems = 'center';

                // X position input
                var xLabel = document.createElement('label');
                xLabel.textContent = 'X%: ';
                xLabel.style.fontWeight = 'bold';
                var xInput = document.createElement('input');
                xInput.type = 'number';
                xInput.min = '0';
                xInput.max = '100';
                xInput.value = '50';
                xInput.style.width = '80px';
                xInput.style.padding = '8px';
                xInput.style.border = '2px solid #ddd';
                xInput.style.borderRadius = '4px';
                xInput.style.fontSize = '16px';
                this.elements.positionInputX = xInput;

                // Y position input
                var yLabel = document.createElement('label');
                yLabel.textContent = 'Y%: ';
                yLabel.style.fontWeight = 'bold';
                var yInput = document.createElement('input');
                yInput.type = 'number';
                yInput.min = '0';
                yInput.max = '100';
                yInput.value = '50';
                yInput.style.width = '80px';
                yInput.style.padding = '8px';
                yInput.style.border = '2px solid #ddd';
                yInput.style.borderRadius = '4px';
                yInput.style.fontSize = '16px';
                this.elements.positionInputY = yInput;

                positionContainer.appendChild(xLabel);
                positionContainer.appendChild(xInput);
                positionContainer.appendChild(yLabel);
                positionContainer.appendChild(yInput);
                modal.appendChild(positionContainer);

                // Create emoji grid
                var emojiGrid = this.createEmojiGrid();
                emojiGrid.style.marginBottom = '20px';
                modal.appendChild(emojiGrid);
                this.elements.emojiGrid = emojiGrid;

                // Create comment box
                var commentBox = document.createElement('div');
                commentBox.style.width = '100%';
                commentBox.style.marginBottom = '20px';
                
                var commentLabel = document.createElement('label');
                commentLabel.textContent = 'Comment:';
                commentLabel.style.display = 'block';
                commentLabel.style.marginBottom = '8px';
                commentLabel.style.fontWeight = 'bold';
                
                var commentTextarea = document.createElement('textarea');
                commentTextarea.rows = 4;
                commentTextarea.style.width = '100%';
                commentTextarea.style.padding = '10px';
                commentTextarea.style.border = '2px solid #ddd';
                commentTextarea.style.borderRadius = '4px';
                commentTextarea.style.fontSize = '14px';
                commentTextarea.style.resize = 'vertical';
                commentTextarea.placeholder = 'Add your comment here...';
                
                commentBox.appendChild(commentLabel);
                commentBox.appendChild(commentTextarea);
                modal.appendChild(commentBox);
                this.elements.commentBox = commentBox;

                // Create media upload section
                var mediaSection = document.createElement('div');
                mediaSection.style.width = '100%';
                mediaSection.style.marginBottom = '20px';
                
                var mediaLabel = document.createElement('label');
                mediaLabel.textContent = 'Media:';
                mediaLabel.style.display = 'block';
                mediaLabel.style.marginBottom = '8px';
                mediaLabel.style.fontWeight = 'bold';
                
                var mediaButtons = document.createElement('div');
                mediaButtons.className = 'media-buttons';
                mediaButtons.style.display = 'flex';
                mediaButtons.style.gap = '10px';
                mediaButtons.style.marginBottom = '10px';
                
                // File upload button
                var uploadButton = document.createElement('button');
                uploadButton.textContent = '📁 Upload File';
                uploadButton.className = 'upload-button';
                uploadButton.style.padding = '8px 12px';
                uploadButton.style.backgroundColor = '#3498db';
                uploadButton.style.color = 'white';
                uploadButton.style.border = 'none';
                uploadButton.style.borderRadius = '4px';
                uploadButton.style.cursor = 'pointer';
                uploadButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    var fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*,video/*';
                    fileInput.style.display = 'none';
                    fileInput.addEventListener('change', function(e) {
                        if (e.target.files && e.target.files[0]) {
                            var file = e.target.files[0];
                            t.log('File uploaded', { name: file.name, size: file.size, type: file.type });
                            // Store file reference
                            r('uploadedFile', file.name);
                            r('uploadedFileType', file.type);
                            // Show uploaded file name
                            var fileName = document.createElement('div');
                            fileName.className = 'uploaded-file-name';
                            fileName.textContent = '📎 ' + file.name;
                            fileName.style.marginTop = '5px';
                            fileName.style.padding = '5px';
                            fileName.style.backgroundColor = '#f1f1f1';
                            fileName.style.borderRadius = '3px';
                            fileName.style.fontSize = '0.9rem';
                            mediaSection.appendChild(fileName);
                        }
                    });
                    document.body.appendChild(fileInput);
                    fileInput.click();
                    document.body.removeChild(fileInput);
                });
                
                // Video capture button
                var captureButton = document.createElement('button');
                captureButton.textContent = '🎥 Record Video';
                captureButton.className = 'capture-button';
                captureButton.style.padding = '8px 12px';
                captureButton.style.backgroundColor = '#e74c3c';
                captureButton.style.color = 'white';
                captureButton.style.border = 'none';
                captureButton.style.borderRadius = '4px';
                captureButton.style.cursor = 'pointer';
                captureButton.addEventListener('click', function(e) {
                    e.preventDefault();
                            if (t.state.recording) {
                        t.stopRecording();
                        captureButton.textContent = '🎥 Record Video';
                    } else {
                        t.startRecording();
                        captureButton.textContent = '⏹️ Stop Recording';
                    }
                });
                
                mediaButtons.appendChild(uploadButton);
                mediaButtons.appendChild(captureButton);
                
                mediaSection.appendChild(mediaLabel);
                mediaSection.appendChild(mediaButtons);
                modal.appendChild(mediaSection);
                this.elements.mediaSection = mediaSection;

                // Create buttons container
                var buttonsContainer = document.createElement('div');
                buttonsContainer.style.display = 'flex';
                buttonsContainer.style.gap = '10px';
                buttonsContainer.style.justifyContent = 'center';

                // Save button
                var saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.style.padding = '10px 20px';
                saveButton.style.backgroundColor = '#4CAF50';
                saveButton.style.color = 'white';
                saveButton.style.border = 'none';
                saveButton.style.borderRadius = '4px';
                saveButton.style.cursor = 'pointer';
                saveButton.style.fontSize = '16px';
                saveButton.addEventListener('click', function() {
                    t.saveThrowDown();
                });

                // Cancel button
                var cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.style.padding = '10px 20px';
                cancelButton.style.backgroundColor = '#f44336';
                cancelButton.style.color = 'white';
                cancelButton.style.border = 'none';
                cancelButton.style.borderRadius = '4px';
                cancelButton.style.cursor = 'pointer';
                cancelButton.style.fontSize = '16px';
                cancelButton.addEventListener('click', function() {
                    t.closeLightBox();
                });

                buttonsContainer.appendChild(saveButton);
                buttonsContainer.appendChild(cancelButton);
                modal.appendChild(buttonsContainer);

                // Make overlay show/hide the modal
                overlay.style.display = 'flex';
                overlay.style.visibility = 'hidden';
                
                // Show overlay when 'active' class is added
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            if (overlay.classList.contains('active')) {
                                overlay.style.visibility = 'visible';
                                overlay.style.display = 'flex';
                            } else {
                                overlay.style.visibility = 'hidden';
                                setTimeout(function() {
                                    if (!overlay.classList.contains('active')) {
                                        overlay.style.display = 'none';
                                    }
                                }, 300);
                        }
                    }
                });
                });
                observer.observe(overlay, { attributes: true });

                // Add modal to overlay, overlay to container (after iframe)
                overlay.appendChild(modal);
                
                // Append to document.body for full-screen overlay, not to container
                document.body.appendChild(overlay);
                
                // Also change positioning to fixed for proper full-screen behavior
                overlay.style.position = 'fixed';
                
                this.elements.lightBox = overlay;
                this.elements.lightBoxContent = modal;
            }
        }, {
            key: "createEmojiGrid",
            value: function() {
                var t = o("div", {
                    className: "emoji-grid",
                    styles: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr 1fr",
                        gap: "10px",
                        width: "100%"
                    }
                })
                  , e = o("div", {
                    className: "emoji-quadrant top-left",
                    styles: {
                        gridRow: "1",
                        gridColumn: "1"
                    }
                })
                  , n = o("div", {
                    className: "emoji-quadrant top-right",
                    styles: {
                        gridRow: "1",
                        gridColumn: "2"
                    }
                })
                  , i = o("div", {
                    className: "emoji-quadrant bottom-left",
                    styles: {
                        gridRow: "2",
                        gridColumn: "1"
                    }
                })
                  , a = o("div", {
                    className: "emoji-quadrant bottom-right",
                    styles: {
                        gridRow: "2",
                        gridColumn: "2"
                    }
                });
                return this.createEmojiTable(e, this.config.emojis.thoughts.topLeft, "top-left"),
                this.createEmojiTable(n, this.config.emojis.thoughts.topRight, "top-right"),
                this.createEmojiTable(i, this.config.emojis.thoughts.bottomLeft, "bottom-left"),
                this.createEmojiTable(a, this.config.emojis.thoughts.bottomRight, "bottom-right"),
                t.appendChild(e),
                t.appendChild(n),
                t.appendChild(i),
                t.appendChild(a),
                t
            }
        }, {
            key: "createEmojiTable",
            value: function(t, e, n) {
                var i = this
                  , a = o("div", {
                    className: "emoji-row"
                })
                  , r = o("div", {
                    className: "emoji-cell"
                });
                if (e[0]) {
                    var s = o("div", {
                        className: "thought-emoji",
                        text: e[0],
                        attributes: {
                            "data-emoji": e[0],
                            "data-quadrant": n,
                            "data-index": 0
                        },
                        events: {
                            click: function(t) {
                                i.selectEmoji(s, e[0], n, 0)
                            }
                        }
                    });
                    r.appendChild(s)
                }
                var l = o("div", {
                    className: "emoji-cell"
                });
                if (e[1]) {
                    var d = o("div", {
                        className: "thought-emoji",
                        text: e[1],
                        attributes: {
                            "data-emoji": e[1],
                            "data-quadrant": n,
                            "data-index": 1
                        },
                        events: {
                            click: function(t) {
                                i.selectEmoji(d, e[1], n, 1)
                            }
                        }
                    });
                    l.appendChild(d)
                }
                a.appendChild(r),
                a.appendChild(l);
                var c = o("div", {
                    className: "emoji-row"
                })
                  , u = o("div", {
                    className: "emoji-cell"
                });
                if (e[2]) {
                    var h = o("div", {
                        className: "thought-emoji",
                        text: e[2],
                        attributes: {
                            "data-emoji": e[2],
                            "data-quadrant": n,
                            "data-index": 2
                        },
                        events: {
                            click: function(t) {
                                i.selectEmoji(h, e[2], n, 2)
                            }
                        }
                    });
                    u.appendChild(h)
                }
                var p = o("div", {
                    className: "emoji-cell"
                });
                if (e[3]) {
                    var g = o("div", {
                        className: "thought-emoji",
                        text: e[3],
                        attributes: {
                            "data-emoji": e[3],
                            "data-quadrant": n,
                            "data-index": 3
                        },
                        events: {
                            click: function(t) {
                                i.selectEmoji(g, e[3], n, 3)
                            }
                        }
                    });
                    p.appendChild(g)
                }
                c.appendChild(u),
                c.appendChild(p),
                t.appendChild(a),
                t.appendChild(c)
            }
        }, {
            key: "extractUrlFromText",
            value: function(t) {
                if (!t)
                    return null;
                var e = t.match(/(https?:\/\/[^\s]+)/g);
                return e && e.length > 0 ? e[0] : null
            }
        }, {
            key: "saveEventToHistory",
            value: function(t) {
                t.timestamp = (new Date).toISOString(),
                t.context = {
                    profileBubblePosition: this.state.profileBubblePosition,
                    currentQuadrant: this.state.currentQuadrant,
                    containerDimensions: this.state.containerDimensions
                };
                var e = [];
                try {
                    var o = localStorage.getItem("quadTapEvents");
                    o && (e = JSON.parse(o))
                } catch (t) {
                    this.log("Error parsing stored events", t)
                }
                e.push(t),
                localStorage.setItem("quadTapEvents", JSON.stringify(e)),
                localStorage.setItem("quadTapCurrentEvent", JSON.stringify(t)),
                this.log("Event saved to history", t)
            }
        }, {
            key: "selectEmoji",
            value: function(t, e, o, n) {
                this.log("Emoji selected", {
                    emoji: e,
                    quadrant: o,
                    index: n
                }),
                this.elements.emojiGrid.querySelectorAll(".thought-emoji").forEach((function(t) {
                    return t.classList.remove("selected")
                }
                )),
                t.classList.add("selected"),
                r("selectedEmoji", e),
                r("selectedQuadrant", o),
                r("selectedIndex", n),
                this.saveEventToHistory({
                    type: "emoji_selected",
                    emoji: e,
                    quadrant: o,
                    index: n
                });
                
                // Add the selected emoji to the comment text box
                var commentTextarea = this.elements.commentBox && this.elements.commentBox.querySelector("textarea");
                if (commentTextarea) {
                    var currentText = commentTextarea.value || "";
                    
                    // Always add the emoji at the beginning, preserving any existing text
                    commentTextarea.value = e + " " + currentText;
                    
                    // Trigger change event to ensure state is updated
                    var event = new Event('input', { bubbles: true });
                    commentTextarea.dispatchEvent(event);
                }
                
                var i = document.querySelector(this.config.videoSelector);
                if (i && (r("videoTime", i.currentTime),
                r("videoId", i.getAttribute("data-video-id") || "unknown")),
                r("positionX", this.state.profileBubblePosition.x),
                r("positionY", this.state.profileBubblePosition.y),
                this.config.callbacks.onThrowDownConfirm) {
                    var a = i ? {
                        currentTime: i.currentTime,
                        videoId: i.getAttribute("data-video-id") || "unknown",
                        duration: i.duration
                    } : null;
                    this.config.callbacks.onThrowDownConfirm(o, this.state.profileBubblePosition.x, this.state.profileBubblePosition.y, a)
                }
            }
        }, {
            key: "saveThrowDown",
            value: function() {
                this.log("Saving throw-down");
                var t = this.elements.commentBox.querySelector("textarea")
                  , e = t ? t.value : ""
                  , o = this.extractUrlFromText(e);
                r("comment", e),
                o && r("extractedUrl", o),
                r("timestamp", Date.now());
                var n = document.querySelector(this.config.videoSelector)
                  , i = {};
                n && (Array.from(n.attributes).filter((function(t) {
                    return t.name.startsWith("data-")
                }
                )).forEach((function(t) {
                    var e = t.name.replace("data-", "");
                    i[e] = t.value
                }
                )),
                i.duration = n.duration || 0,
                i.currentTime = n.currentTime || 0,
                i.paused = n.paused,
                i.muted = n.muted,
                i.volume = n.volume,
                i.playbackRate = n.playbackRate,
                i.videoWidth = n.videoWidth,
                i.videoHeight = n.videoHeight,
                i.src = n.currentSrc || n.src);
                var a = {
                    selectedEmoji: s("selectedEmoji", ""),
                    selectedQuadrant: s("selectedQuadrant", ""),
                    selectedIndex: s("selectedIndex", -1),
                    comment: e,
                    extractedUrl: o || s("extractedUrl", ""),
                    positionX: this.state.profileBubblePosition.x,
                    positionY: this.state.profileBubblePosition.y,
                    quadrant: this.state.currentQuadrant,
                    videoId: s("videoId", n && n.getAttribute("data-video-id") || "unknown"),
                    videoTime: s("videoTime", n ? n.currentTime : 0),
                    videoMetadata: i,
                    containerId: this.config.containerId,
                    containerWidth: this.state.containerDimensions.width,
                    containerHeight: this.state.containerDimensions.height,
                    timestamp: Date.now(),
                    timezoneOffset: (new Date).getTimezoneOffset(),
                    locale: navigator.language || "en-US",
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    url: window.location.href,
                    referrer: document.referrer,
                    title: document.title
                };
                !function(t) {
                    try {
                        for (var e in t)
                            r(e, t[e]);
                        return r("timestamp", Date.now()),
                        !0
                    } catch (t) {
                        return console.error("[QuadTap] Error saving throw-down context:", t),
                        !1
                    }
                }(a),
                this.closeLightBox(),
                this.log("Throw-down saved", a)
            }
        }, {
            key: "bindEventHandlers",
            value: function() {
                var t = this;
                this.elements.video = document.querySelector(this.config.videoSelector);
                
                // Detect mobile devices simply
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
                
                // If on mobile, prevent native fullscreen
                if (isMobile && this.elements.video) {
                    // Prevent native fullscreen on iOS/Safari
                    this.elements.video.addEventListener('webkitbeginfullscreen', function(e) {
                        if (e.preventDefault) e.preventDefault();
                        return false;
                    });
                    
                    // Disable native fullscreen attributes
                    this.elements.video.setAttribute('playsinline', '');
                    this.elements.video.setAttribute('webkit-playsinline', '');
                    
                    // ADDED: Disable native video controls
                    this.elements.video.removeAttribute('controls');
                    // For some players that might override this, try to force it
                    this.elements.video.controls = false;
                    
                    // Find and disable any fullscreen buttons in the video player
                    setTimeout(function() {
                        try {
                            // Find common fullscreen button selectors
                            var fullscreenButtons = document.querySelectorAll(
                                '.vjs-fullscreen-control, .fullscreen-button, [data-fullscreen], .ytp-fullscreen-button'
                            );
                            fullscreenButtons.forEach(function(btn) {
                                // Either hide or disable the button
                                if (btn.style) {
                                    btn.style.display = 'none';
                                }
                                // Add click interceptor
                                btn.addEventListener('click', function(e) {
                                    if (e.preventDefault) e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                });
                            });
                        } catch (err) {
                            t.log("Error disabling fullscreen buttons", err);
                        }
                    }, 500); // Delay to ensure video player is fully initialized
                }
                
                // Long press variables
                var longPressTimer = null;
                var longPressDuration = 300; // milliseconds - reduced from 500 to make it more responsive
                var longPressStartPosition = { x: 0, y: 0 };
                
                // Long press handler - triggered after timeout
                var handleLongPress = function(position) {
                    t.log("Long press detected", position);
                    
                    // Update bubble position based on the long press position
                    var i = position.x / t.state.containerDimensions.width;
                    var a = position.y / t.state.containerDimensions.height;
                    t.state.profileBubblePosition = {
                        x: i,
                        y: a
                    };
                    
                    // Store the quadrant
                    t.state.currentQuadrant = t.getQuadrantFromPosition(position.x, position.y);
                    
                    // Save position in localStorage just like a normal tap would
                    r("positionX", i);
                    r("positionY", a);
                    
                    // Create an event object
                    var longPressEvent = {
                        type: "long_press",
                        positionX: position.x,
                        positionY: position.y,
                        quadrant: t.state.currentQuadrant,
                        containerWidth: t.state.containerDimensions.width,
                        containerHeight: t.state.containerDimensions.height
                    };
                    
                    // Save event to local storage
                    t.saveEventToHistory(longPressEvent);
                    
                    // Display in lightbox directly (skip the overlay)
                    t.openLightBox();
                };
                
                // Add method to get quadrant from position
                this.getQuadrantFromPosition = function(x, y) {
                    var width = this.state.containerDimensions.width;
                    var height = this.state.containerDimensions.height;
                    
                    var quadrant = "";
                    if (y < height / 2) {
                        quadrant += "top-";
                    } else {
                        quadrant += "bottom-";
                    }
                    
                    if (x < width / 2) {
                        quadrant += "left";
                    } else {
                        quadrant += "right";
                    }
                    
                    return quadrant;
                };
                
                // Touch start event for long press detection
                var handleTouchStart = function(e) {
                    if (e.touches && e.touches.length === 1) {
                        var touch = e.touches[0];
                        var rect = t.elements.container.getBoundingClientRect();
                        var x = touch.clientX - rect.left;
                        var y = touch.clientY - rect.top;
                        
                        longPressStartPosition = { x: x, y: y };
                        
                        // Clear any existing timeout
                        if (longPressTimer) clearTimeout(longPressTimer);
                        
                        // Set new timeout for long press
                        longPressTimer = setTimeout(function() {
                            handleLongPress(longPressStartPosition);
                        }, longPressDuration);
                    }
                };
                
                // Touch move event to cancel long press if moved
                var handleTouchMove = function(e) {
                    if (longPressTimer) {
                        // If moving beyond a small threshold, cancel the long press
                        if (e.touches && e.touches.length === 1) {
                            var touch = e.touches[0];
                            var rect = t.elements.container.getBoundingClientRect();
                            var x = touch.clientX - rect.left;
                            var y = touch.clientY - rect.top;
                            
                            // Calculate distance moved
                            var dx = x - longPressStartPosition.x;
                            var dy = y - longPressStartPosition.y;
                            var distance = Math.sqrt(dx * dx + dy * dy);
                            
                            // If moved more than 10 pixels, cancel long press
                            if (distance > 10) {
                                clearTimeout(longPressTimer);
                                longPressTimer = null;
                            }
                        }
                    }
                };
                
                // Touch end/cancel event to clear the long press timer
                var handleTouchEnd = function() {
                    if (longPressTimer) {
                        clearTimeout(longPressTimer);
                        longPressTimer = null;
                    }
                };
                
                // Add touch event listeners for long press detection
                this.elements.container.addEventListener('touchstart', handleTouchStart, { passive: false });
                this.elements.container.addEventListener('touchmove', handleTouchMove, { passive: false });
                this.elements.container.addEventListener('touchend', handleTouchEnd, { passive: false });
                this.elements.container.addEventListener('touchcancel', handleTouchEnd, { passive: false });
                
                var e = function(e) {
                    if (e.preventDefault(),
                    e.stopPropagation(),
                    !e.target.closest(".video-control-button"))
                        if (t.state.active)
                            e.target === t.elements.profileBubble || t.elements.profileBubble.contains(e.target) ? t.openLightBox() : t.deactivateOverlay();
                        else {
                            var o, n, i = t.elements.container.getBoundingClientRect();
                            if ("touchstart" === e.type || "touchend" === e.type) {
                                var a = e.changedTouches[0];
                                o = a.clientX - i.left,
                                n = a.clientY - i.top
                            } else
                                o = e.clientX - i.left,
                                n = e.clientY - i.top;
                            t.activateOverlay(o, n)
                        }
                };
                
                this.elements.container.addEventListener("click", e),
                this.elements.container.addEventListener("touchend", e);
                var o = function(e) {
                    t.state.active && (t.openLightBox(),
                    e.stopPropagation())
                };
                this.elements.profileBubble.addEventListener("click", o),
                this.elements.profileBubble.addEventListener("touchend", function(e) {
                    // Prevent default touch behavior to avoid any issues with touch events
                    e.preventDefault();
                    // Call the original handler
                    o(e);
                });
                var n = function(e) {
                    e.target === t.elements.lightBox && t.closeLightBox()
                };
                this.elements.lightBox.addEventListener("click", n),
                this.elements.lightBox.addEventListener("touchend", n),
                document.addEventListener("keydown", (function(e) {
                    "Escape" === e.key && (t.elements.lightBox.classList.contains("active") ? t.closeLightBox() : t.state.active && t.deactivateOverlay())
                }
                )),
                this.elements.video && (this.elements.video.addEventListener("play", (function() {
                    t.state.videoPlaying = !0
                }
                )),
                this.elements.video.addEventListener("pause", (function() {
                    t.state.videoPlaying = !1
                }
                ))),
                window.addEventListener("resize", this.throttledResize),
                this.updateContainerDimensions()

                // Add swipe detection
                this.addSwipeHandlers();
            }
        }, {
            key: "addSwipeHandlers",
            value: function() {
                var t = this;
                
                // Initialize swipe state
                this.state.swipe = {
                    startX: 0,
                    startY: 0,
                    endX: 0,
                    endY: 0,
                    startTime: 0,
                    onVideo: false,
                    overlayActive: false,
                    threshold: 50, // Min distance to be considered a swipe
                    maxTime: 500 // Max time in ms for a gesture to be considered a swipe
                };
                
                // Common handler for both desktop and mobile
                var handleSwipeStart = function(e) {
                    var clientX, clientY, targetElement;
                    
                    if (e.type.includes('touch')) {
                        clientX = e.touches[0].clientX;
                        clientY = e.touches[0].clientY;
                        targetElement = document.elementFromPoint(clientX, clientY);
                    } else {
                        clientX = e.clientX;
                        clientY = e.clientY;
                        targetElement = e.target;
                    }
                    
                    t.state.swipe.startX = clientX;
                    t.state.swipe.startY = clientY;
                    t.state.swipe.startTime = Date.now();
                    t.state.swipe.onVideo = targetElement === t.elements.video;
                    t.state.swipe.overlayActive = t.state.active;
                    
                    t.log("Swipe start", {
                        x: clientX,
                        y: clientY,
                        onVideo: t.state.swipe.onVideo,
                        overlayActive: t.state.swipe.overlayActive
                    });
                };
                
                var handleSwipeEnd = function(e) {
                    var clientX, clientY;
                    
                    // Skip processing if already handling a swipe
                    if (t.state.swipeProcessing) {
                        t.log("Ignoring swipe end during active processing");
                        return;
                    }
                    
                    // If no start position recorded, this isn't a valid swipe
                    if (t.state.swipe.startX === 0 && t.state.swipe.startY === 0) {
                        return;
                    }
                    
                    if (e.type.includes('touch')) {
                        clientX = e.changedTouches[0].clientX;
                        clientY = e.changedTouches[0].clientY;
                    } else {
                        clientX = e.clientX;
                        clientY = e.clientY;
                    }
                    
                    t.state.swipe.endX = clientX;
                    t.state.swipe.endY = clientY;
                    
                    var deltaX = t.state.swipe.endX - t.state.swipe.startX;
                    var deltaY = t.state.swipe.endY - t.state.swipe.startY;
                    var elapsedTime = Date.now() - t.state.swipe.startTime;
                    
                    // Reset start position to prevent duplicate processing
                    t.state.swipe.startX = 0;
                    t.state.swipe.startY = 0;
                    
                    if (elapsedTime <= t.state.swipe.maxTime) {
                        var swipeDirection = "";
                        var absX = Math.abs(deltaX);
                        var absY = Math.abs(deltaY);
                        
                        // Determine swipe direction if threshold is met
                        if (Math.max(absX, absY) >= t.state.swipe.threshold) {
                            if (absX > absY) {
                                swipeDirection = deltaX > 0 ? "right" : "left";
                            } else {
                                swipeDirection = deltaY > 0 ? "down" : "up";
                            }
                            
                            t.log("Swipe detected", {
                                direction: swipeDirection,
                                onVideo: t.state.swipe.onVideo,
                                overlayActive: t.state.swipe.overlayActive,
                                deltaX: deltaX,
                                deltaY: deltaY,
                                time: elapsedTime
                            });
                            
                            // Handle the swipe by opening lightbox with swipe info
                            t.handleSwipe(swipeDirection);
                        }
                    }
                };
                
                var handleSwipeMove = function(e) {
                    // Optional: track movement for more complex gestures
                    // For now we just prevent default to avoid scrolling
                    if (e.cancelable) e.preventDefault();
                };
                
                // Add mouse events for desktop
                this.elements.container.addEventListener('mousedown', handleSwipeStart);
                document.addEventListener('mouseup', handleSwipeEnd);
                document.addEventListener('mousemove', function(e) {
                    // Only track movement if mouse is down (potential swipe in progress)
                    if (e.buttons === 1) handleSwipeMove(e);
                });
                
                // Add touch events for mobile
                this.elements.container.addEventListener('touchstart', handleSwipeStart, {passive: false});
                this.elements.container.addEventListener('touchend', handleSwipeEnd);
                this.elements.container.addEventListener('touchmove', handleSwipeMove, {passive: false});
            }
        }, {
            key: "handleSwipe",
            value: function(direction) {
                // More aggressive debounce to prevent multiple calls
                if (this.state.swipeProcessing) {
                    this.log("Ignoring swipe during active processing", direction);
                    return; // Exit if a swipe is already being processed
                }
                
                // Set processing flag immediately
                this.state.swipeProcessing = true;
                
                // Clear any existing debounce timer
                if (this.state.swipeDebounceTimer) {
                    clearTimeout(this.state.swipeDebounceTimer);
                }
                
                // Create swipe info text to display in the lightbox
                var swipeInfo = "Swipe: " + direction.toUpperCase() + 
                               "\nOverlay: " + (this.state.swipe.overlayActive ? "ACTIVE" : "INACTIVE") +
                               "\nOn Video: " + (this.state.swipe.onVideo ? "YES" : "NO");
                
                // Store swipe info for the lightbox to access
                this.state.swipeInfo = swipeInfo;
                
                // If lightbox is already open, update the content
                if (this.elements.lightBox && this.elements.lightBox.classList.contains('active')) {
                    this.updateLightboxSwipeInfo(swipeInfo);
                } else {
                    // Open the lightbox which will display swipe info
                    this.openLightBoxWithSwipeInfo(swipeInfo);
                }
                
                // Set debounce timer to reset processing flag
                this.state.swipeDebounceTimer = setTimeout(() => {
                    this.state.swipeProcessing = false;
                    this.state.swipeDebounceTimer = null;
                }, 500); // Longer debounce time: 500ms
            }
        }, {
            key: "updateLightboxSwipeInfo",
            value: function(swipeInfo) {
                // Update existing lightbox with swipe info
                if (this.elements.lightBoxContent) {
                    // Find or create swipe info container
                    var swipeInfoElement = this.elements.lightBoxContent.querySelector('.swipe-info');
                    if (!swipeInfoElement) {
                        swipeInfoElement = document.createElement('div');
                        swipeInfoElement.className = 'swipe-info';
                        swipeInfoElement.style.padding = '10px';
                        swipeInfoElement.style.marginTop = '15px';
                        swipeInfoElement.style.backgroundColor = 'rgba(0,0,0,0.1)';
                        swipeInfoElement.style.borderRadius = '5px';
                        swipeInfoElement.style.fontFamily = 'monospace';
                        swipeInfoElement.style.whiteSpace = 'pre';
                        this.elements.lightBoxContent.appendChild(swipeInfoElement);
                    }
                    
                    swipeInfoElement.textContent = swipeInfo;
                }
            }
        }, {
            key: "openLightBoxWithSwipeInfo",
            value: function(swipeInfo) {
                var t = this;
                
                // First open the normal lightbox
                this.openLightBox();
                
                // Then add or update swipe info
                setTimeout(function() {
                    t.updateLightboxSwipeInfo(swipeInfo);
                }, 100);
            }
        }, {
            key: "handleResize",
            value: function() {
                if (this.state.active) {
                    this.updateContainerDimensions();
                    var t = this.state.containerDimensions.width * this.state.profileBubblePosition.x
                      , e = this.state.containerDimensions.height * this.state.profileBubblePosition.y;
                    n(this.elements.profileBubble, t, e),
                    this.positionDirectionalEmojis(t, e),
                    this.positionQuadrantEmojis(),
                    this.positionVideoControls(),
                    this.positionTooltip()
                }
                
                // If lightbox is active, recalculate its max-height and max-width on resize
                if (this.elements.lightBox && this.elements.lightBox.classList.contains('active') && this.elements.lightBoxContent) {
                    var viewportWidth = window.innerWidth;
                    var viewportHeight = window.innerHeight;
                    
                    // Calculate optimal dimensions based on viewport
                    var maxWidth = Math.min(viewportWidth * 0.95, viewportWidth < 768 ? 600 : 800);
                    var maxHeight = viewportHeight * 0.85;
                    
                    // Apply responsive styles
                    this.elements.lightBoxContent.style.maxWidth = maxWidth + 'px';
                    this.elements.lightBoxContent.style.maxHeight = maxHeight + 'px';
                    
                    // Adjust top bezel and alignment for mobile
                    if (viewportWidth < 768) {
                        this.elements.lightBox.style.paddingTop = '5vh';
                        this.elements.lightBox.style.alignItems = 'flex-start';
                    } else {
                        this.elements.lightBox.style.paddingTop = '0';
                        this.elements.lightBox.style.alignItems = 'center';
                    }
                    
                    if (this.config.debug) {
                        this.log("Window resized, updated lightbox dimensions", {
                            viewport: { width: viewportWidth, height: viewportHeight },
                            lightbox: { maxWidth: maxWidth, maxHeight: maxHeight }
                        });
                    }
                }
            }
        }, {
            key: "updateContainerDimensions",
            value: function() {
                if (this.elements.container) {
                    var t = this.elements.container.getBoundingClientRect();
                    this.state.containerDimensions = {
                        width: t.width,
                        height: t.height
                    }
                }
            }
        }, {
            key: "activateOverlay",
            value: function(t, e) {
                var o = this;
                this.log("Activating overlay", {
                    x: t,
                    y: e
                });
                var i = t / this.state.containerDimensions.width
                  , a = e / this.state.containerDimensions.height;
                this.state.profileBubblePosition = {
                    x: i,
                    y: a
                },
                this.state.currentQuadrant = function(t, e, o) {
                    var n = o.getBoundingClientRect()
                      , i = n.width / 2
                      , a = n.height / 2;
                    return t < i ? e < a ? "top-left" : "bottom-left" : e < a ? "top-right" : "bottom-right"
                }(t, e, this.elements.container),
                this.log("Current quadrant", this.state.currentQuadrant),
                this.elements.overlay.style.display = "block",
                setTimeout((function() {
                    o.elements.overlay.classList.add("active")
                }
                ), 10),
                this.elements.profileBubble.style.display = "flex";
                
                // Apply responsive bubble size
                var bubbleDimensions = this.calculateResponsiveBubbleSize();
                this.elements.profileBubble.style.width = bubbleDimensions.width;
                this.elements.profileBubble.style.height = bubbleDimensions.height;
                
                var r = this.state.containerDimensions.width * this.state.profileBubblePosition.x
                  , s = this.state.containerDimensions.height * this.state.profileBubblePosition.y;
                n(this.elements.profileBubble, r, s),
                this.positionDirectionalEmojis(t, e),
                this.positionQuadrantEmojis(),
                this.positionVideoControls(),
                this.positionTooltip(),
                this.state.active = !0,
                this.config.autoCancelTimeout > 0 && (this.state.autoCancelTimer = setTimeout((function() {
                    o.deactivateOverlay()
                }
                ), this.config.autoCancelTimeout)),
                this.config.callbacks.onOverlayActivate && this.config.callbacks.onOverlayActivate(t, e)
            }
        }, {
            key: "positionDirectionalEmojis",
            value: function(t, e) {
                var o = this.state.containerDimensions
                  , n = o.width
                  , i = o.height
                  , a = e
                  , r = n - t
                  , s = i - e
                  , l = t
                  , d = n / 2
                  , c = .1 * i
                  , u = .9 * n
                  , h = i / 2
                  , p = n / 2
                  , g = .9 * i
                  , m = .1 * n
                  , f = i / 2
                  , b = Math.sqrt(Math.pow(t - d, 2) + Math.pow(e - c, 2))
                  , v = Math.sqrt(Math.pow(t - u, 2) + Math.pow(e - h, 2))
                  , y = Math.sqrt(Math.pow(t - p, 2) + Math.pow(e - g, 2))
                  , w = Math.sqrt(Math.pow(t - m, 2) + Math.pow(e - f, 2))
                  , x = Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2))
                  , C = .8 + Math.max(0, 1.2 * (1 - b / x)) + Math.max(0, .8 * (1 - a / (i / 2)))
                  , j = .8 + Math.max(0, 1.2 * (1 - v / x)) + Math.max(0, .8 * (1 - r / (n / 2)))
                  , k = .8 + Math.max(0, 1.2 * (1 - y / x)) + Math.max(0, .8 * (1 - s / (i / 2)))
                  , S = .8 + Math.max(0, 1.2 * (1 - w / x)) + Math.max(0, .8 * (1 - l / (n / 2)))
                  , T = this.elements.directionalEmojis.up;
                T.style.display = "block",
                T.style.position = "absolute",
                T.style.top = "10%",
                T.style.left = "50%",
                T.style.transform = "translate(-50%, 0) scale(".concat(C, ")"),
                T.style.fontSize = "2rem",
                T.style.opacity = "0.8";
                var B = this.elements.directionalEmojis.right;
                B.style.display = "block",
                B.style.position = "absolute",
                B.style.top = "50%",
                B.style.right = "10%",
                B.style.transform = "translate(0, -50%) scale(".concat(j, ")"),
                B.style.fontSize = "2rem",
                B.style.opacity = "0.8";
                var E = this.elements.directionalEmojis.down;
                E.style.display = "block",
                E.style.position = "absolute",
                E.style.bottom = "10%",
                E.style.left = "50%",
                E.style.transform = "translate(-50%, 0) scale(".concat(k, ")"),
                E.style.fontSize = "2rem",
                E.style.opacity = "0.8";
                var q = this.elements.directionalEmojis.left;
                q.style.display = "block",
                q.style.position = "absolute",
                q.style.top = "50%",
                q.style.left = "10%",
                q.style.transform = "translate(0, -50%) scale(".concat(S, ")"),
                q.style.fontSize = "2rem",
                q.style.opacity = "0.8"
            }
        }, {
            key: "calculateResponsiveEmojiSize",
            value: function() {
                var t, e, o = this.state.containerDimensions, n = o.width, i = o.height;
                
                // Check if we're on a mobile device
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
                
                // Check orientation - true if portrait (height > width)
                var isPortrait = i > n;
                
                // Base emoji size on width rather than the minimum dimension
                // This ensures emojis are properly sized when orientation changes
                var widthBasedSize;
                
                if (n < 200) {
                    widthBasedSize = 0.3; // Very small screens (was 0.4)
                } else if (n < 300) {
                    widthBasedSize = 0.4; // Small screens (was 0.5)
                } else if (n < 400) {
                    widthBasedSize = 0.5; // Medium-small screens (was 0.6)
                } else if (n < 600) {
                    widthBasedSize = 0.6; // Medium screens (was 0.7)
                } else if (n < 800) {
                    widthBasedSize = 0.7; // Medium-large screens (was 0.8)
                } else {
                    widthBasedSize = 0.8; // Large screens (was 0.9)
                }
                
                // Adjust size based on orientation
                if (isPortrait && isMobile) {
                    // In portrait mode on mobile, make emojis smaller relative to width
                    widthBasedSize *= 0.75; // Reduced from 0.85 to 0.75
                }
                
                // Calculate final sizes
                t = widthBasedSize + "rem";
                e = (widthBasedSize * 1.4) + "rem";
                
                // Log sizes if debug is enabled
                if (this.config.debug) {
                    console.log("[QuadTap] Responsive emoji sizes:", {
                        width: n,
                        height: i,
                        isPortrait: isPortrait,
                        isMobile: isMobile,
                        defaultSize: t,
                        enlargedSize: e
                    });
                }
                
                return {
                    defaultSize: t,
                    enlargedSize: e,
                    defaultOpacity: "0.6",
                    enlargedOpacity: "0.8"
                }
            }
        }, {
            key: "calculateResponsiveBubbleSize",
            value: function() {
                // Get container dimensions
                var containerWidth = this.state.containerDimensions.width;
                var containerHeight = this.state.containerDimensions.height;
                
                // Check if we're on a mobile device
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
                
                // Check orientation - true if portrait (height > width)
                var isPortrait = containerHeight > containerWidth;
                
                // Base bubble size on width rather than minimum dimension
                // This ensures consistent sizing when orientation changes
                var bubbleSize;
                
                // Size based on width percentage
                var widthPercentage = isMobile ? 0.12 : 0.10; // 12% of width on mobile, 10% on desktop
                bubbleSize = Math.round(containerWidth * widthPercentage);
                
                // Apply min/max constraints
                bubbleSize = Math.max(30, bubbleSize); // Minimum size
                bubbleSize = Math.min(70, bubbleSize); // Maximum size
                
                // Adjust for portrait orientation on mobile
                if (isPortrait && isMobile) {
                    // In portrait mode, make bubble slightly smaller
                    bubbleSize = Math.floor(bubbleSize * 0.9);
                }
                
                // Log size if debug is enabled
                if (this.config.debug) {
                    console.log("[QuadTap] Responsive bubble size:", {
                        width: containerWidth,
                        height: containerHeight,
                        isPortrait: isPortrait,
                        isMobile: isMobile,
                        bubbleSize: bubbleSize
                    });
                }
                
                return {
                    width: bubbleSize + 'px',
                    height: bubbleSize + 'px'
                };
            }
        }, {
            key: "positionQuadrantEmojis",
            value: function() {
                var t = this.calculateResponsiveEmojiSize()
                  , e = t.defaultSize
                  , o = t.enlargedSize
                  , n = t.defaultOpacity
                  , i = t.enlargedOpacity;
                
                // Check if we're on a mobile device
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
                
                // Use smaller corner spacing on mobile
                var cornerSpacing = isMobile ? "3%" : "4%";
                
                var a = this.elements.quadrantEmojis.topLeft;
                a.style.display = "block",
                a.style.position = "absolute",
                a.style.top = cornerSpacing,
                a.style.left = cornerSpacing,
                a.style.transform = "translate(-50%, -50%)",
                a.style.fontSize = e,
                a.style.opacity = n;
                
                var r = this.elements.quadrantEmojis.topRight;
                r.style.display = "block",
                r.style.position = "absolute",
                r.style.top = cornerSpacing,
                r.style.right = cornerSpacing,
                r.style.transform = "translate(50%, -50%)",
                r.style.fontSize = e,
                r.style.opacity = n;
                
                var s = this.elements.quadrantEmojis.bottomLeft;
                s.style.display = "block",
                s.style.position = "absolute",
                s.style.bottom = cornerSpacing,
                s.style.left = cornerSpacing,
                s.style.transform = "translate(-50%, 50%)",
                s.style.fontSize = e,
                s.style.opacity = n;
                
                var l = this.elements.quadrantEmojis.bottomRight;
                if (l.style.display = "block",
                l.style.position = "absolute",
                l.style.bottom = cornerSpacing,
                l.style.right = cornerSpacing,
                l.style.transform = "translate(50%, 50%)",
                l.style.fontSize = e,
                l.style.opacity = n,
                this.state.currentQuadrant)
                    switch (this.state.currentQuadrant) {
                    case "top-left":
                        a.style.fontSize = o,
                        a.style.opacity = i;
                        break;
                    case "top-right":
                        r.style.fontSize = o,
                        r.style.opacity = i;
                        break;
                    case "bottom-left":
                        s.style.fontSize = o,
                        s.style.opacity = i;
                        break;
                    case "bottom-right":
                        l.style.fontSize = o,
                        l.style.opacity = i
                    }
            }
        }, {
            key: "positionVideoControls",
            value: function() {
                if (this.config.videoControls.enabled) {
                    var t = this.elements.videoControls;
                    t.style.display = "flex",
                    t.style.position = "absolute",
                    t.style.top = "50%",
                    t.style.left = "50%",
                    t.style.transform = "translate(-50%, -50%)",
                    t.style.zIndex = "1001"
                }
            }
        }, {
            key: "positionTooltip",
            value: function() {
                if (this.config.tooltip && !1 !== this.config.tooltip.enabled) {
                    var t = this.elements.tooltip;
                    switch (t.style.display = "block",
                    t.style.position = "absolute",
                    t.style.zIndex = "1001",
                    this.config.tooltip.text && (t.textContent = this.config.tooltip.text),
                    this.config.tooltip.position || "above-controls") {
                    case "above-controls":
                    default:
                        t.style.top = "40%",
                        t.style.left = "50%",
                        t.style.transform = "translate(-50%, -50%)";
                        break;
                    case "below-controls":
                        t.style.top = "60%",
                        t.style.left = "50%",
                        t.style.transform = "translate(-50%, -50%)";
                        break;
                    case "on-bubble":
                        var e = this.elements.profileBubble.getBoundingClientRect()
                          , o = this.elements.overlay.getBoundingClientRect()
                          , n = (e.top - o.top) / o.height * 100;
                        t.style.top = "".concat(n - 10, "%"),
                        t.style.left = "50%",
                        t.style.transform = "translate(-50%, -100%)"
                    }
                    if (this.config.tooltip.style) {
                        var i = this.config.tooltip.style;
                        i.backgroundColor && (t.style.backgroundColor = i.backgroundColor),
                        i.color && (t.style.color = i.color),
                        i.padding && (t.style.padding = i.padding),
                        i.borderRadius && (t.style.borderRadius = i.borderRadius)
                    } else
                        t.style.textAlign = "center",
                        t.style.backgroundColor = "rgba(0, 0, 0, 0.7)",
                        t.style.color = "white",
                        t.style.padding = "8px 12px",
                        t.style.borderRadius = "4px"
                }
            }
        }, {
            key: "controlVideo",
            value: function(t) {
                this.log("Controlling video", t);
                var e = document.querySelector(this.config.videoSelector);
                if (e) {
                    switch (t) {
                    case "rewind":
                        e.currentTime = Math.max(0, e.currentTime - this.config.videoControls.rewindTime);
                        break;
                    case "playpause":
                        e.paused ? e.play() : e.pause();
                        break;
                    case "forward":
                        e.currentTime = Math.min(e.duration, e.currentTime + this.config.videoControls.forwardTime);
                        break;
                    case "share":
                        navigator.share ? navigator.share({
                            title: "Shared Video",
                            text: "Check out this video!",
                            url: window.location.href
                        }).catch((function(t) {
                            console.error("Share failed:", t)
                        }
                        )) : alert("Share feature not supported by your browser")
                    }
                    this.config.callbacks.onVideoControl && this.config.callbacks.onVideoControl(t, e.currentTime)
                } else
                    this.log("Video element not found")
            }
        }, {
            key: "deactivateOverlay",
            value: function() {
                var t = this;
                this.log("Deactivating overlay"),
                this.elements.overlay.classList.remove("active"),
                setTimeout((function() {
                    t.state.active || (t.elements.overlay.style.display = "none",
                    t.elements.profileBubble.style.display = "none",
                    Object.values(t.elements.directionalEmojis).forEach((function(t) {
                        t.style.display = "none"
                    }
                    )),
                    Object.values(t.elements.quadrantEmojis).forEach((function(t) {
                        t.style.display = "none"
                    }
                    )),
                    t.elements.videoControls.style.display = "none",
                    t.elements.tooltip.style.display = "none")
                }
                ), 300),
                this.state.active = !1,
                this.state.autoCancelTimer && (clearTimeout(this.state.autoCancelTimer),
                this.state.autoCancelTimer = null),
                this.config.callbacks.onThrowDownCancel && this.config.callbacks.onThrowDownCancel(this.state.currentQuadrant),
                this.log("Overlay deactivated")
            }
        }, {
            key: "createVideoTimeSlider",
            value: function() {
                return o("div", {
                    styles: {
                        display: "none"
                    }
                })
            }
        }, {
            key: "openLightBox",
            value: function() {
                var t = this;
                this.log("Opening light-box"),
                this.elements.lightBox.classList.add("active"),
                this.state.autoCancelTimer && (clearTimeout(this.state.autoCancelTimer),
                this.state.autoCancelTimer = null);

                // ADDED: Calculate dynamic dimensions for responsive lightbox
                var viewportWidth = window.innerWidth;
                var viewportHeight = window.innerHeight;
                
                // Adjust lightbox content size based on viewport
                if (this.elements.lightBoxContent) {
                    // Apply lighter background
                    this.elements.lightBoxContent.style.backgroundColor = "rgba(240, 240, 245, 0.95)";
                    
                    // Calculate max dimensions - use smaller dimensions on mobile
                    var maxWidth = Math.min(viewportWidth * 0.95, viewportWidth < 768 ? 600 : 800);
                    var maxHeight = viewportHeight * 0.85;
                    
                    // Apply responsive styles
                    this.elements.lightBoxContent.style.maxWidth = maxWidth + 'px';
                    this.elements.lightBoxContent.style.maxHeight = maxHeight + 'px';
                    
                    // Adjust top bezel and alignment for mobile
                    if (viewportWidth < 768) {
                        this.elements.lightBox.style.paddingTop = '5vh';
                        this.elements.lightBox.style.alignItems = 'flex-start';
                    } else {
                        this.elements.lightBox.style.paddingTop = '0';
                        this.elements.lightBox.style.alignItems = 'center';
                    }
                    
                    this.log("Responsive lightbox dimensions set", {
                        viewport: { width: viewportWidth, height: viewportHeight },
                        lightbox: { maxWidth: maxWidth, maxHeight: maxHeight }
                    });
                }
                
                var e = this.config.videoPlayerApi && this.config.videoPlayerApi.enabled && this.config.videoPlayerApi.adapter;
                if (this.state.wasPlayingBefore = !!e && e.isPlaying(),
                !e) {
                    var o = document.querySelector(this.config.videoSelector);
                    this.state.wasPlayingBefore = !!o && !o.paused
                }
                if (this.elements.videoSliderContainer || (this.elements.videoSliderContainer = this.createVideoTimeSlider(),
                this.elements.lightboxControlStrip && this.elements.lightboxControlStrip.parentNode && this.elements.lightboxControlStrip.parentNode.insertBefore(this.elements.videoSliderContainer, this.elements.lightboxControlStrip)),
                this.elements.lightboxControlStripObj && this.config.videoControls.enabled) {
                    this.elements.lightboxControlStrip && (this.elements.lightboxControlStrip.style.display = "flex");
                    var n = document.querySelector(this.config.videoSelector);
                    if (n)
                        try {
                            this.elements.lightboxControlStripObj.updatePlayPauseButton ? this.elements.lightboxControlStripObj.updatePlayPauseButton(!n.paused) : j(this.elements.lightboxControlStrip, !n.paused)
                        } catch (t) {
                            this.log("Error updating play/pause button", t)
                        }
                }
                if (this.updateVideoTimeDisplay(),
                this.videoTimeUpdateInterval = setInterval((function() {
                    t.updateVideoTimeDisplay()
                }
                ), 1e3),
                function(t) {
                    p.apply(this, arguments)
                }(this),
                this.elements.videoControls && this.elements.videoControlsObj)
                    try {
                        this.elements.videoControlsObj.updatePlayPauseButton ? this.elements.videoControlsObj.updatePlayPauseButton(!1) : j(this.elements.videoControls, !1)
                    } catch (t) {
                        this.log("Error updating play/pause button", t)
                    }
                this.config.callbacks.onThrowDownInitiate && this.config.callbacks.onThrowDownInitiate(this.state.currentQuadrant, this.state.profileBubblePosition.x, this.state.profileBubblePosition.y)

                // Update position display if it exists
                if (this.elements.positionInputX && this.elements.positionInputY) {
                    var xPos = this.state.profileBubblePosition.x;
                    var yPos = this.state.profileBubblePosition.y;
                    
                    // If values are not available in state, try to get from localStorage
                    if (typeof xPos !== 'number' || typeof yPos !== 'number') {
                        var storedPos = s('positionX');
                        var storedPosY = s('positionY');
                        if (storedPos !== null) xPos = parseFloat(storedPos);
                        if (storedPosY !== null) yPos = parseFloat(storedPosY);
                    }
                    
                    // Default to 50% if still no valid values
                    if (typeof xPos !== 'number') xPos = 0.5;
                    if (typeof yPos !== 'number') yPos = 0.5;

                    // Calculate percentages, inverting y-value so "up" is positive
                    var xPercent = Math.round(xPos * 100 * 100) / 100;
                    var yPercentUp = Math.round((1 - yPos) * 100 * 100) / 100; // Invert y so up is positive

                    // Update input values if inputs exist
                    if (this.elements.positionInputY) {
                        this.elements.positionInputY.value = yPercentUp.toString();
                    }
                    if (this.elements.positionInputX) {
                        this.elements.positionInputX.value = xPercent.toString();
                    }
                }
            }
        }, {
            key: "closeLightBox",
            value: function() {
                var t = this; // Make sure t is initialized with this
                
                this.log("Closing light-box"),
                this.elements.lightBox.classList.remove("active"),
                this.videoTimeUpdateInterval && (clearInterval(this.videoTimeUpdateInterval),
                this.videoTimeUpdateInterval = null),
                this.elements.videoControlsObj && this.config.videoControls.enabled && (this.elements.videoControls.parentNode && this.elements.videoControls.parentNode.removeChild(this.elements.videoControls),
                this.elements.overlay && (this.elements.overlay.appendChild(this.elements.videoControls),
                this.elements.videoControlsObj.setMode("overlay", this.elements.container),
                this.elements.videoControls.style.display = "none")),
                this.log("Always resuming video on lightbox close"),
                // QuadTap MOD: Video is always played when lightbox closes. Overlay is always deactivated.
                setTimeout((function() {
                    !function(t) { // Call h (play)
                        h.apply(this, arguments)
                    }(t),
                    // Update control strip UI if it exists
                    t.elements.videoControls && t.elements.videoControlsObj && (t.elements.videoControlsObj.updatePlayPauseButton ? t.elements.videoControlsObj.updatePlayPauseButton(!0) : j(t.elements.videoControls, !0))
                }
                ), 100),
                // Clear swipe info when lightbox closes
                this.state.swipeInfo = null,
                this.state.swipeProcessing = false,
                
                // Find and remove any swipe info elements
                this.elements.lightBoxContent && this.elements.lightBoxContent.querySelector('.swipe-info') && (
                    this.elements.lightBoxContent.querySelector('.swipe-info').parentNode.removeChild(
                        this.elements.lightBoxContent.querySelector('.swipe-info')
                    )
                ),
                
                this.deactivateOverlay() // QuadTap MOD: Ensure overlay is deactivated.
            }
        }, {
            key: "updateVideoTimeDisplay",
            value: function() {
                if (this.elements.videoInfoDisplay) {
                    var t = document.querySelector(this.config.videoSelector);
                    if (t) {
                        var e = function(t) {
                            if (isNaN(t) || !isFinite(t))
                                return "0:00";
                            var e = Math.floor(t / 60)
                              , o = Math.floor(t % 60);
                            return "".concat(e, ":").concat(o < 10 ? "0" : "").concat(o)
                        }
                          , o = e(t.currentTime)
                          , n = e(t.duration);
                        if (this.elements.videoInfoDisplay.textContent = "".concat(o, " / ").concat(n),
                        this.elements.currentTimeElement && (this.elements.currentTimeElement.textContent = o),
                        this.elements.durationElement && (this.elements.durationElement.textContent = n),
                        this.elements.videoSlider && t.duration) {
                            var i = t.currentTime / t.duration * 100;
                            this.elements.videoSlider.value = i
                        }
                    }
                }
            }
        }, {
            key: "startRecording",
            value: function() {
                var t = this;
                if (this.log("Starting video recording"),
                this.state.recording = !0,
                !navigator.mediaDevices || !window.MediaRecorder)
                    return this.log("MediaRecorder API not supported"),
                    alert("Video recording is not supported in your browser"),
                    void (this.state.recording = !1);
                navigator.mediaDevices.getUserMedia({
                    video: !0,
                    audio: !0
                }).then((function(e) {
                    t.state.mediaStream = e,
                    t.state.mediaRecorder = new MediaRecorder(e);
                    var o = [];
                    t.state.mediaRecorder.ondataavailable = function(t) {
                        t.data.size > 0 && o.push(t.data)
                    }
                    ,
                    t.state.mediaRecorder.onstop = function() {
                        var e = new Blob(o,{
                            type: "video/webm"
                        });
                        r("recordedVideo", URL.createObjectURL(e)),
                        t.saveEventToHistory({
                            type: "video_recording",
                            size: e.size,
                            duration: Date.now() - t.state.recordingStartTime
                        }),
                        t.state.mediaStream.getTracks().forEach((function(t) {
                            return t.stop()
                        }
                        )),
                        t.state.mediaStream = null,
                        t.state.mediaRecorder = null,
                        t.state.recording = !1
                    }
                    ,
                    t.state.mediaRecorder.start(),
                    t.state.recordingStartTime = Date.now();
                    var n = document.createElement("div");
                    n.className = "recording-indicator",
                    n.textContent = "🔴 Recording...",
                    n.style.position = "absolute",
                    n.style.top = "10px",
                    n.style.right = "10px",
                    n.style.backgroundColor = "rgba(255, 0, 0, 0.7)",
                    n.style.color = "white",
                    n.style.padding = "5px 10px",
                    n.style.borderRadius = "4px",
                    n.style.zIndex = "1002",
                    t.elements.lightBoxContent.appendChild(n),
                    t.state.recordingIndicator = n
                }
                )).catch((function(e) {
                    t.log("Error accessing media devices", e),
                    alert("Could not access camera and microphone"),
                    t.state.recording = !1
                }
                ))
            }
        }, {
            key: "stopRecording",
            value: function() {
                this.log("Stopping video recording"),
                this.state.mediaRecorder && this.state.recording && (this.state.mediaRecorder.stop(),
                this.state.recordingIndicator && this.state.recordingIndicator.parentNode && this.state.recordingIndicator.parentNode.removeChild(this.state.recordingIndicator))
            }
        }, {
            key: "toggleVideoPause",
            value: function() {
                var t = this;
                this.log("Toggling video pause/play state");
                var e = this.config.videoPlayerApi && this.config.videoPlayerApi.enabled && this.config.videoPlayerApi.adapter
                  , o = document.querySelector(this.config.videoSelector);
                if (e)
                    e.isPlaying().then((function(o) {
                        if (o) {
                            e.pause();
                            var n = t.elements.lightBox.querySelector(".td-pause-play-btn");
                            n && (n.textContent = "▶️")
                        } else {
                            e.play();
                            var i = t.elements.lightBox.querySelector(".td-pause-play-btn");
                            i && (i.textContent = "⏸️")
                        }
                    }
                    ));
                else if (o)
                    if (o.paused)
                        o.play().then((function() {
                            var e = t.elements.lightBox.querySelector(".td-pause-play-btn");
                            e && (e.textContent = "⏸️")
                        }
                        )).catch((function(e) {
                            t.log("Error playing video", e)
                        }
                        ));
                    else {
                        o.pause();
                        var n = this.elements.lightBox.querySelector(".td-pause-play-btn");
                        n && (n.textContent = "▶️")
                    }
                this.config.callbacks.onVideoControl && this.config.callbacks.onVideoControl("playpause", o ? o.currentTime : 0)
            }
        }, {
            key: "destroy",
            value: function() {
                this.log("Destroying QuadTap"),
                this.state.autoCancelTimer && clearTimeout(this.state.autoCancelTimer),
                this.state.swipeDebounceTimer && clearTimeout(this.state.swipeDebounceTimer), // Add this line
                this.elements.container && this.elements.container.removeEventListener("click", this.handleContainerClick),
                this.elements.profileBubble && this.elements.profileBubble.removeEventListener("click", this.handleBubbleClick),
                this.elements.lightBox && this.elements.lightBox.removeEventListener("click", this.handleLightBoxClick),
                this.elements.video && (this.elements.video.removeEventListener("play", this.handleVideoPlay),
                this.elements.video.removeEventListener("pause", this.handleVideoPause)),
                window.removeEventListener("resize", this.throttledResize),
                document.removeEventListener("keydown", this.handleKeyDown),
                this.elements.overlay && this.elements.overlay.parentNode && this.elements.overlay.parentNode.removeChild(this.elements.overlay),
                this.elements.lightBox && this.elements.lightBox.parentNode && this.elements.lightBox.parentNode.removeChild(this.elements.lightBox),
                this.state.recording && this.state.mediaRecorder && this.stopRecording(),
                this.state.mediaStream && this.state.mediaStream.getTracks().forEach((function(t) {
                    return t.stop()
                }
                )),
                this.state = {
                    active: !1,
                    profileBubblePosition: {
                        x: 0,
                        y: 0
                    },
                    currentQuadrant: null,
                    autoCancelTimer: null,
                    containerDimensions: {
                        width: 0,
                        height: 0
                    },
                    videoPlaying: !1,
                    recording: !1,
                    mediaStream: null,
                    mediaRecorder: null,
                    recordingStartTime: 0,
                    recordingIndicator: null,
                    swipeDebounceTimer: null,
                    swipeProcessing: !1 // Add this new property
                },
                this.log("QuadTap destroyed")
            }
        }, {
            key: "openLightBoxWithLongPressInfo",
            value: function(longPressEvent) {
                var t = this;
                
                // First open the normal lightbox
                this.openLightBox();
                
                // Create or update content in the lightbox
                if (this.elements.lightBoxContent) {
                    // Create header
                    var header = document.createElement('h2');
                    header.textContent = 'Long Press Detected';
                    header.style.marginBottom = '15px';
                    
                    // Create event info display
                    var longPressInfoElement = document.createElement('div');
                    longPressInfoElement.className = 'long-press-info';
                    longPressInfoElement.style.backgroundColor = '#f5f5f5';
                    longPressInfoElement.style.padding = '15px';
                    longPressInfoElement.style.borderRadius = '5px';
                    longPressInfoElement.style.marginBottom = '15px';
                    longPressInfoElement.style.maxHeight = '200px';
                    longPressInfoElement.style.overflowY = 'auto';
                    
                    // Create formatted info text
                    var infoHTML = '';
                    infoHTML += '<p><strong>Position:</strong> X: ' + Math.round(longPressEvent.positionX) + ', Y: ' + Math.round(longPressEvent.positionY) + '</p>';
                    infoHTML += '<p><strong>Quadrant:</strong> ' + longPressEvent.quadrant + '</p>';
                    infoHTML += '<p><strong>Time:</strong> ' + new Date(longPressEvent.timestamp).toLocaleTimeString() + '</p>';
                    
                    longPressInfoElement.innerHTML = infoHTML;
                    
                    // Create events list section
                    var eventsListHeader = document.createElement('h3');
                    eventsListHeader.textContent = 'Recent Events';
                    eventsListHeader.style.marginTop = '20px';
                    eventsListHeader.style.marginBottom = '10px';
                    
                    var eventsList = document.createElement('div');
                    eventsList.className = 'events-list';
                    eventsList.style.backgroundColor = '#f5f5f5';
                    eventsList.style.padding = '15px';
                    eventsList.style.borderRadius = '5px';
                    eventsList.style.maxHeight = '150px';
                    eventsList.style.overflowY = 'auto';
                    
                    // Get events from localStorage
                    var events = [];
                    try {
                        var storedEvents = localStorage.getItem("quadTapEvents");
                        if (storedEvents) {
                            events = JSON.parse(storedEvents);
                            // Get the last 10 events maximum
                            events = events.slice(-10);
                        }
                    } catch (err) {
                        t.log("Error loading events from localStorage", err);
                    }
                    
                    // Format and display the events
                    if (events.length > 0) {
                        var eventsHTML = '<ul style="list-style-type: none; padding-left: 0;">';
                        events.forEach(function(event) {
                            var eventTime = new Date(event.timestamp).toLocaleTimeString();
                            var eventType = event.type || 'unknown';
                            eventsHTML += '<li style="margin-bottom: 5px; padding: 5px; border-bottom: 1px solid #eee;">';
                            eventsHTML += '<strong>' + eventType + '</strong> (' + eventTime + ')';
                            
                            if (event.positionX !== undefined && event.positionY !== undefined) {
                                eventsHTML += ' - Position: X: ' + Math.round(event.positionX) + ', Y: ' + Math.round(event.positionY);
                            }
                            
                            if (event.quadrant) {
                                eventsHTML += ' [' + event.quadrant + ']';
                            }
                            
                            eventsHTML += '</li>';
                        });
                        eventsHTML += '</ul>';
                        eventsList.innerHTML = eventsHTML;
                    } else {
                        eventsList.innerHTML = '<p>No events recorded yet.</p>';
                    }
                    
                    // Clear existing content
                    this.elements.lightBoxContent.innerHTML = '';
                    
                    // Add all elements to the lightbox
                    this.elements.lightBoxContent.appendChild(header);
                    this.elements.lightBoxContent.appendChild(longPressInfoElement);
                    this.elements.lightBoxContent.appendChild(eventsListHeader);
                    this.elements.lightBoxContent.appendChild(eventsList);
                }
            }
        }, {
            key: "getAllEvents",
            value: function() {
                try {
                    var events = localStorage.getItem("quadTapEvents");
                    if (events) {
                        return JSON.parse(events);
                    }
                    return [];
                } catch (err) {
                    this.log("Error retrieving events from localStorage", err);
                    return [];
                }
            }
        }, {
            key: "getEventsByType",
            value: function(type) {
                try {
                    var allEvents = this.getAllEvents();
                    if (allEvents && allEvents.length) {
                        return allEvents.filter(function(event) {
                            return event.type === type;
                        });
                    }
                    return [];
                } catch (err) {
                    this.log("Error filtering events by type", err);
                    return [];
                }
            }
        }, {
            key: "saveEventToHistory",
            value: function(t) {
                t.timestamp = (new Date).toISOString(),
                t.context = {
                    profileBubblePosition: this.state.profileBubblePosition,
                    currentQuadrant: this.state.currentQuadrant,
                    containerDimensions: this.state.containerDimensions
                };
                var e = [];
                try {
                    var o = localStorage.getItem("quadTapEvents");
                    o && (e = JSON.parse(o))
                } catch (t) {
                    this.log("Error parsing stored events", t)
                }
                
                // Ensure we don't exceed max event limit (1000)
                if (e.length >= 1000) {
                    // Remove the oldest 100 events when we hit the limit
                    e = e.slice(-900);
                }
                
                e.push(t),
                localStorage.setItem("quadTapEvents", JSON.stringify(e)),
                localStorage.setItem("quadTapCurrentEvent", JSON.stringify(t)),
                this.log("Event saved to history", t)
            }
        }],
        e && B(t.prototype, e),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        t;
        var t, e
    }();
    function O(t, e) {
        var o = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            o.push.apply(o, n)
        }
        return o
    }
    function z(t) {
        for (var e = 1; e < arguments.length; e++) {
            var o = null != arguments[e] ? arguments[e] : {};
            e % 2 ? O(Object(o), !0).forEach((function(e) {
                L(t, e, o[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : O(Object(o)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
            }
            ))
        }
        return t
    }
    function L(t, e, o) {
        return (e = N(e))in t ? Object.defineProperty(t, e, {
            value: o,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = o,
        t
    }
    function R(t) {
        return R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        R(t)
    }
    function I(t, e) {
        for (var o = 0; o < e.length; o++) {
            var n = e[o];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, N(n.key), n)
        }
    }
    function N(t) {
        var e = function(t) {
            if ("object" != R(t) || !t)
                return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var o = e.call(t, "string");
                if ("object" != R(o))
                    return o;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(t)
        }(t);
        return "symbol" == R(e) ? e : e + ""
    }
    const D = function() {
        return t = function t() {
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, t),
            this.settings = {
                containerId: "quad-tap-container",
                videoSelector: "video",
                debug: !1,
                autoCancelTimeout: 3e3,
                autoInitialize: !1,
                quadrantEmojis: {
                    topLeft: "🌈",
                    topRight: "🔥",
                    bottomLeft: "💧",
                    bottomRight: "🌪️"
                },
                directionalEmojis: {
                    north: "⬆️",
                    east: "➡️",
                    south: "⬇️",
                    west: "⬅️"
                },
                thoughtEmojis: {
                    topLeft: ["🌈", "🦄", "🌟", "🌻"],
                    topRight: ["🔥", "⚡", "💥", "🌋"],
                    bottomLeft: ["💧", "🌊", "❄️", "☔"],
                    bottomRight: ["🌪️", "🌩️", "⛈️", "🌀"]
                },
                videoControls: {
                    enabled: !0,
                    position: "center",
                    autoHide: !0,
                    autoHideDelay: 2e3,
                    pauseOnLightboxOnly: !0
                },
                tooltip: {
                    enabled: !0,
                    position: "above-controls",
                    text: "Tap elsewhere to cancel",
                    style: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: "4px"
                    }
                },
                swipeNavigation: {
                    enabled: !0,
                    threshold: 50,
                    direction: "vertical"
                },
                northContextBar: {
                    enabled: !0,
                    content: "FROM"
                },
                southContextBar: {
                    enabled: !0,
                    content: "TO"
                },
                coordinateSystem: {
                    type: "percentage",
                    storeMetadata: !0
                },
                emojiSizes: {
                    default: "24px",
                    active: "36px"
                },
                profileBubble: {
                    imageUrl: null,
                    fallbackEmoji: "👤",
                    size: "60px",
                    borderColor: "white",
                    borderWidth: "2px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)"
                },
                colors: {
                    overlay: {
                        background: "rgba(240, 240, 245, 0.5)",
                        quadrantGradients: {
                            topLeft: "rgba(0, 255, 255, 0.8)",
                            topRight: "rgba(255, 255, 0, 0.8)",
                            bottomLeft: "rgba(0, 255, 0, 0.8)",
                            bottomRight: "rgba(255, 0, 255, 0.8)"
                        }
                    },
                    lightbox: {
                        background: "rgba(0, 0, 0, 0.9)",
                        text: "white",
                        headerBackground: "rgba(50, 50, 50, 0.8)",
                        buttonPrimary: "#4CAF50",
                        buttonSecondary: "#f44336"
                    }
                },
                callbacks: {
                    onOverlayActivate: null,
                    onThrowDownInitiate: null,
                    onThrowDownConfirm: null,
                    onThrowDownCancel: null,
                    onVideoControl: null
                },
                videoPlayerApi: {
                    enabled: !1,
                    adapter: null
                }
            }
        }
        ,
        (e = [{
            key: "withContainer",
            value: function(t) {
                return "string" != typeof t && console.warn("[SettingsBuilder] containerId should be a string"),
                this.settings.containerId = t,
                this
            }
        }, {
            key: "withVideoSelector",
            value: function(t) {
                return "string" != typeof t && console.warn("[SettingsBuilder] videoSelector should be a string"),
                this.settings.videoSelector = t,
                this
            }
        }, {
            key: "withDebug",
            value: function(t) {
                return "boolean" != typeof t && console.warn("[SettingsBuilder] debug should be a boolean"),
                this.settings.debug = t,
                this
            }
        }, {
            key: "withAutoCancelTimeout",
            value: function(t) {
                return ("number" != typeof t || t < 0) && console.warn("[SettingsBuilder] autoCancelTimeout should be a positive number"),
                this.settings.autoCancelTimeout = t,
                this
            }
        }, {
            key: "withQuadrantEmojis",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] quadrantEmojis should be an object"),
                this) : (this.settings.quadrantEmojis = z(z({}, this.settings.quadrantEmojis), t),
                this)
            }
        }, {
            key: "withDirectionalEmojis",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] directionalEmojis should be an object"),
                this) : (this.settings.directionalEmojis = z(z({}, this.settings.directionalEmojis), t),
                this)
            }
        }, {
            key: "withThoughtEmojisForQuadrant",
            value: function(t, e) {
                return ["topLeft", "topRight", "bottomLeft", "bottomRight"].includes(t) ? Array.isArray(e) ? (this.settings.thoughtEmojis[t] = e,
                this) : (console.warn("[SettingsBuilder] emojis should be an array"),
                this) : (console.warn("[SettingsBuilder] quadrant should be one of: topLeft, topRight, bottomLeft, bottomRight"),
                this)
            }
        }, {
            key: "withThoughtEmojis",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] thoughtEmojis should be an object"),
                this) : (this.settings.thoughtEmojis = z(z({}, this.settings.thoughtEmojis), t),
                this)
            }
        }, {
            key: "withVideoControls",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] videoControlsConfig should be an object"),
                this) : (this.settings.videoControls = z(z({}, this.settings.videoControls), t),
                this)
            }
        }, {
            key: "withTooltip",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] tooltipConfig should be an object"),
                this) : (t.style && "object" === R(t.style) && (t.style = z(z({}, this.settings.tooltip.style), t.style)),
                this.settings.tooltip = z(z({}, this.settings.tooltip), t),
                this)
            }
        }, {
            key: "withSwipeNavigation",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] swipeConfig should be an object"),
                this) : (this.settings.swipeNavigation = z(z({}, this.settings.swipeNavigation), t),
                this)
            }
        }, {
            key: "withNorthContextBar",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] northConfig should be an object"),
                this) : (this.settings.northContextBar = z(z({}, this.settings.northContextBar), t),
                this)
            }
        }, {
            key: "withSouthContextBar",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] southConfig should be an object"),
                this) : (this.settings.southContextBar = z(z({}, this.settings.southContextBar), t),
                this)
            }
        }, {
            key: "withCoordinateSystem",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] coordinateConfig should be an object"),
                this) : (this.settings.coordinateSystem = z(z({}, this.settings.coordinateSystem), t),
                this)
            }
        }, {
            key: "withAutoInitialize",
            value: function(t) {
                return "boolean" != typeof t && console.warn("[SettingsBuilder] autoInitialize should be a boolean"),
                this.settings.autoInitialize = t,
                this
            }
        }, {
            key: "withProfileBubble",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] bubbleConfig should be an object"),
                this) : (this.settings.profileBubble = z(z({}, this.settings.profileBubble), t),
                this)
            }
        }, {
            key: "withOverlayColors",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] overlayColors should be an object"),
                this) : (t.quadrantGradients && "object" === R(t.quadrantGradients) && (t.quadrantGradients = z(z({}, this.settings.colors.overlay.quadrantGradients), t.quadrantGradients)),
                this.settings.colors.overlay = z(z({}, this.settings.colors.overlay), t),
                this)
            }
        }, {
            key: "withLightboxColors",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] lightboxColors should be an object"),
                this) : (this.settings.colors.lightbox = z(z({}, this.settings.colors.lightbox), t),
                this)
            }
        }, {
            key: "withColors",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] colorConfig should be an object"),
                this) : (t.overlay && "object" === R(t.overlay) && (t.overlay.quadrantGradients && "object" === R(t.overlay.quadrantGradients) && (t.overlay.quadrantGradients = z(z({}, this.settings.colors.overlay.quadrantGradients), t.overlay.quadrantGradients)),
                t.overlay = z(z({}, this.settings.colors.overlay), t.overlay)),
                t.lightbox && "object" === R(t.lightbox) && (t.lightbox = z(z({}, this.settings.colors.lightbox), t.lightbox)),
                this.settings.colors = z(z({}, this.settings.colors), t),
                this)
            }
        }, {
            key: "withEmojiSizes",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] sizeConfig should be an object"),
                this) : (this.settings.emojiSizes = z(z({}, this.settings.emojiSizes), t),
                this)
            }
        }, {
            key: "withVideoPlayerApi",
            value: function(t) {
                return "object" !== R(t) ? (console.warn("[SettingsBuilder] apiConfig should be an object"),
                this) : (this.settings.videoPlayerApi = z(z({}, this.settings.videoPlayerApi), t),
                this)
            }
        }, {
            key: "withVideoPlayerAdapter",
            value: function(t) {
                return t ? (this.settings.videoPlayerApi = z(z({}, this.settings.videoPlayerApi), {}, {
                    enabled: !0,
                    adapter: t
                }),
                this) : (console.warn("[SettingsBuilder] adapter should be a valid VideoPlayerAdapter instance"),
                this)
            }
        }, {
            key: "onOverlayActivate",
            value: function(t) {
                return "function" != typeof t ? (console.warn("[SettingsBuilder] callback should be a function"),
                this) : (this.settings.callbacks.onOverlayActivate = t,
                this)
            }
        }, {
            key: "onThrowDownInitiate",
            value: function(t) {
                return "function" != typeof t ? (console.warn("[SettingsBuilder] callback should be a function"),
                this) : (this.settings.callbacks.onThrowDownInitiate = t,
                this)
            }
        }, {
            key: "onThrowDownConfirm",
            value: function(t) {
                return "function" != typeof t ? (console.warn("[SettingsBuilder] callback should be a function"),
                this) : (this.settings.callbacks.onThrowDownConfirm = t,
                this)
            }
        }, {
            key: "onThrowDownCancel",
            value: function(t) {
                return "function" != typeof t ? (console.warn("[SettingsBuilder] callback should be a function"),
                this) : (this.settings.callbacks.onThrowDownCancel = t,
                this)
            }
        }, {
            key: "onVideoControl",
            value: function(t) {
                return "function" != typeof t ? (console.warn("[SettingsBuilder] callback should be a function"),
                this) : (this.settings.callbacks.onVideoControl = t,
                this)
            }
        }, {
            key: "build",
            value: function() {
                return this.validateSettings(),
                JSON.parse(JSON.stringify(this.settings))
            }
        }, {
            key: "validateSettings",
            value: function() {
                this.settings.containerId || (console.warn('[SettingsBuilder] containerId is required, using default: "quad-tap-container"'),
                this.settings.containerId = "quad-tap-container"),
                this.settings.videoSelector || (console.warn('[SettingsBuilder] videoSelector is required, using default: "video"'),
                this.settings.videoSelector = "video"),
                this.settings.videoControls.enabled && !["center", "bottom-center", "top-center"].includes(this.settings.videoControls.position) && (console.warn("[SettingsBuilder] Invalid video controls position: ".concat(this.settings.videoControls.position, ', using default: "center"')),
                this.settings.videoControls.position = "center"),
                this.settings.tooltip.enabled && !["above-controls", "below-controls", "on-bubble"].includes(this.settings.tooltip.position) && (console.warn("[SettingsBuilder] Invalid tooltip position: ".concat(this.settings.tooltip.position, ', using default: "above-controls"')),
                this.settings.tooltip.position = "above-controls"),
                this.settings.swipeNavigation.enabled && !["vertical", "horizontal"].includes(this.settings.swipeNavigation.direction) && (console.warn("[SettingsBuilder] Invalid swipe direction: ".concat(this.settings.swipeNavigation.direction, ', using default: "vertical"')),
                this.settings.swipeNavigation.direction = "vertical"),
                ["absolute", "normalized", "percentage"].includes(this.settings.coordinateSystem.type) || (console.warn("[SettingsBuilder] Invalid coordinate system type: ".concat(this.settings.coordinateSystem.type, ', using default: "percentage"')),
                this.settings.coordinateSystem.type = "percentage")
            }
        }]) && I(t.prototype, e),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        t;
        var t, e
    }();
    window.quadTapInitialized = !1;
    var A = function() {
        if (window.quadTapInitialized)
            console.log("[QuadTap] Already initialized, skipping auto-initialization");
        else {
            var t = document.querySelectorAll("[data-quad-tap-auto-init]");
            if (0 === t.length) {
                var e = document.getElementById("main-video-droppable");
                if (e)
                    return console.log("[QuadTap] Auto-initializing with default container"),
                    window.quadTap = new P,
                    e.quadTap = window.quadTap,
                    window.quadTapInitialized = !0,
                    window.activateOverlay = function(t, e) {
                        if (window.quadTap) {
                            var o = document.getElementById("main-video-droppable");
                            if (o) {
                                var n = o.getBoundingClientRect()
                                  , i = t || n.width / 2
                                  , a = e || n.height / 2;
                                return window.quadTap.activateOverlay(i, a)
                            }
                        }
                        return !1
                    }
                    ,
                    window.openLightBox = function() {
                        return !!window.quadTap && (window.quadTap.openLightBox(),
                        !0)
                    }
                    ,
                    window.ensureControlStripModuleAvailable = function() {
                        !window.updatePlayPauseButton && j && (window.updatePlayPauseButton = j)
                    }
                    ,
                    void window.ensureControlStripModuleAvailable()
            }
            t.length > 0 && (console.log("[QuadTap] Auto-initializing ".concat(t.length, " containers")),
            t.forEach((function(t) {
                var e = t.id;
                if (e) {
                    var o = t.getAttribute("data-quad-tap-video-selector") || "video"
                      , n = t.getAttribute("data-quad-tap-profile-image")
                      , i = (new D).withContainer(e).withVideoSelector(o).withAutoInitialize(!0);
                    n && i.withProfileBubble({
                        imageUrl: n
                    });
                    var a = t.getAttribute("data-quad-tap-overlay-bg")
                      , r = t.getAttribute("data-quad-tap-lightbox-bg");
                    if (a || r) {
                        var s = {};
                        a && (s.overlay = {
                            background: a
                        }),
                        r && (s.lightbox = {
                            background: r
                        }),
                        i.withColors(s)
                    }
                    var l = new P(i.build());
                    t.quadTap = l,
                    window.quadTap || (window.quadTap = l)
                } else
                    console.warn("[QuadTap] Container must have an ID for auto-initialization")
            }
            )),
            window.quadTapInitialized = !0,
            window.activateOverlay = function(t, e) {
                if (window.quadTap) {
                    var o = document.querySelector("[data-quad-tap-auto-init]") || document.getElementById("main-video-droppable");
                    if (o) {
                        var n = o.getBoundingClientRect()
                          , i = t || n.width / 2
                          , a = e || n.height / 2;
                        return window.quadTap.activateOverlay(i, a)
                    }
                }
                return !1
            }
            ,
            window.openLightBox = function() {
                return !!window.quadTap && (window.quadTap.openLightBox(),
                !0)
            }
            ,
            window.ensureControlStripModuleAvailable = function() {
                !window.updatePlayPauseButton && j && (window.updatePlayPauseButton = j)
            }
            ,
            window.ensureControlStripModuleAvailable())
        }
    };
    "undefined" != typeof document && ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", A) : A(),
    window.addEventListener("load", (function() {
        window.quadTapInitialized || (console.log("[QuadTap] Attempting initialization on window load"),
        A())
    }
    )),
    setTimeout((function() {
        window.quadTapInitialized || (console.log("[QuadTap] Final attempt to initialize QuadTap..."),
        A())
    }
    ), 1e3),
    setTimeout((function() {
        if (!window.quadTapInitialized) {
            console.log("[QuadTap] Forcing initialization...");
            var t = document.querySelectorAll("[data-quad-tap-auto-init]")
              , e = document.getElementById("main-video-droppable");
            if (t.length > 0 || e)
                console.log("[QuadTap] Found container, initializing..."),
                A();
            else {
                console.log("[QuadTap] No container found, creating default container...");
                var o = document.querySelectorAll("video");
                if (o.length > 0) {
                    var n = o[0]
                      , i = n.parentElement
                      , a = document.createElement("div");
                    a.id = "main-video-droppable",
                    a.style.position = "relative",
                    i.replaceChild(a, n),
                    a.appendChild(n),
                    console.log("[QuadTap] Created default container, initializing..."),
                    A()
                }
            }
        }
    }
    ), 2e3));
    const M = P;
    // QuadTap MOD: Attach SettingsBuilder to the main export if needed for external access.
    // And ensure VideoPlayerAdapter and Coordinates are similarly available if they are part of the public API.
    // For now, the primary export is the QuadTap class (M).
    // The original return 'e.default.SettingsBuilder.VideoPlayerAdapter.Coordinates' seemed to be an issue.
    // Let's return the main module object 'e' which contains the default export.
    // Or more simply, return M (P, the QuadTap class) directly as the default export.
    // The UMD wrapper handles assigning t() to module.exports etc.
    // So, what t() returns becomes the module's value.
    // The tests import QuadTap from '../src/QuadTap', expecting QuadTap to be the class P.
    
    // Let's ensure SettingsBuilder is a static property of QuadTap (P/M)
    // And VideoPlayerAdapter and Coordinates are properties of SettingsBuilder, if that's the intended structure.
    // However, VideoPlayerAdapter and Coordinates are not defined as top-level entities in this bundle.
    // They are mocked in tests, implying they might be separate modules in the source.

    // The simplest change to make the test pass without breaking the library's intended structure
    // is to ensure that the path e.default.SettingsBuilder.VideoPlayerAdapter is valid.
    // e.default is P. So we need P.SettingsBuilder.VideoPlayerAdapter.
    // P.SettingsBuilder should be D.
    M.SettingsBuilder = D;

    // VideoPlayerAdapter and Coordinates are not defined in this scope.
    // The error is likely that D (SettingsBuilder) does not have a VideoPlayerAdapter property.
    // Let's assume VideoPlayerAdapter and Coordinates are meant to be attached to SettingsBuilder for export.
    // Since they are not defined here, we can't attach them.
    // The original line `return e.default.SettingsBuilder.VideoPlayerAdapter.Coordinates`
    // suggests that this specific, deeply nested object is the *only* thing this module exports,
    // which is highly unlikely for a library.
    // The UMD wrapper `module.exports = t()` means the result of `t()` is the export.
    // It should be the main QuadTap class `M`.
    // The error might be that `e.default.SettingsBuilder` (i.e. `P.SettingsBuilder`) is undefined
    // when `VideoPlayerAdapter` is accessed on it.

    // Let's try returning M, and ensure M has SettingsBuilder.
    // The test `QuadTap.test.js` imports `SettingsBuilder from '../src/SettingsBuilder';`
    // and `VideoPlayerAdapter from '../src/adapters/VideoPlayerAdapter';`
    // This means they are separate modules in the source, and the bundler might be confused.

    // The error is in src/QuadTap.js itself, not the test.
    // The line `return e.default.SettingsBuilder.VideoPlayerAdapter.Coordinates` is problematic.
    // `e.default` is `P`. `P.SettingsBuilder` needs to be `D`.
    // Then `D.VideoPlayerAdapter.Coordinates` needs to be valid.
    // Since `VideoPlayerAdapter` and `Coordinates` are not defined in this file,
    // this structure cannot be formed here.

    // The most robust fix is to change what the IIFE returns. It should return the main class `M`.
    // Any static properties like SettingsBuilder should be attached to `M`.
    M.SettingsBuilder = D; // Attach SettingsBuilder class D as a static property of QuadTap class M (P)
    
    // The original return value 'e.default.SettingsBuilder.VideoPlayerAdapter.Coordinates'
    // is likely an artifact or misconfiguration of the bundling process.
    // The module should export the QuadTap class primarily.
    return M; // Return the main QuadTap class.
}
)(),
"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("QuadTap", [], t) : "object" == typeof exports ? exports.QuadTap = t() : this.QuadTap = t();
