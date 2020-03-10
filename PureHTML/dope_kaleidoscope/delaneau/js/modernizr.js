!function(e, n, t) {
    function o(e, n) {
        return typeof e === n
    }
    function s() {
        var e, n, t, s, i, a, r;
        for (var l in c)
            if (c.hasOwnProperty(l)) {
                if (e = [],
                    n = c[l],
                n.name && (e.push(n.name.toLowerCase()),
                n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++)
                        e.push(n.options.aliases[t].toLowerCase());
                for (s = o(n.fn, "function") ? n.fn() : n.fn,
                         i = 0; i < e.length; i++)
                    a = e[i],
                        r = a.split("."),
                        1 === r.length ? u[r[0]] = s : (!u[r[0]] || u[r[0]]instanceof Boolean || (u[r[0]] = new Boolean(u[r[0]])),
                            u[r[0]][r[1]] = s),
                        d.push((s ? "" : "no-") + r.join("-"))
            }
    }
    function i(e) {
        var n = p.className
            , t = u._config.classPrefix || "";
        if (h && (n = n.baseVal),
            u._config.enableJSClass) {
            var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(o, "$1" + t + "js$2")
        }
        u._config.enableClasses && (n += " " + t + e.join(" " + t),
            h ? p.className.baseVal = n : p.className = n)
    }
    function a() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : h ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }
    function r() {
        var e = n.body;
        return e || (e = a(h ? "svg" : "body"),
            e.fake = !0),
            e
    }
    function l(e, t, o, s) {
        var i, l, d, c, f = "modernizr", u = a("div"), h = r();
        if (parseInt(o, 10))
            for (; o--; )
                d = a("div"),
                    d.id = s ? s[o] : f + (o + 1),
                    u.appendChild(d);
        return i = a("style"),
            i.type = "text/css",
            i.id = "s" + f,
            (h.fake ? h : u).appendChild(i),
            h.appendChild(u),
            i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)),
            u.id = f,
        h.fake && (h.style.background = "",
            h.style.overflow = "hidden",
            c = p.style.overflow,
            p.style.overflow = "hidden",
            p.appendChild(h)),
            l = t(u, e),
            h.fake ? (h.parentNode.removeChild(h),
                p.style.overflow = c,
                p.offsetHeight) : u.parentNode.removeChild(u),
            !!l
    }
    var d = []
        , c = []
        , f = {
        _version: "3.3.1",
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        _q: [],
        on: function(e, n) {
            var t = this;
            setTimeout(function() {
                n(t[e])
            }, 0)
        },
        addTest: function(e, n, t) {
            c.push({
                name: e,
                fn: n,
                options: t
            })
        },
        addAsyncTest: function(e) {
            c.push({
                name: null,
                fn: e
            })
        }
    }
        , u = function() {};
    u.prototype = f,
        u = new u,
        u.addTest("devicemotion", "DeviceMotionEvent"in e),
        u.addTest("deviceorientation", "DeviceOrientationEvent"in e);
    var p = n.documentElement
        , h = "svg" === p.nodeName.toLowerCase()
        , v = f.testStyles = l;
    v("#modernizr { height: 50vh; }", function(n) {
        var t = parseInt(e.innerHeight / 2, 10)
            , o = parseInt((e.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle).height, 10);
        u.addTest("cssvhunit", o == t)
    }),
        v("#modernizr { width: 50vw; }", function(n) {
            var t = parseInt(e.innerWidth / 2, 10)
                , o = parseInt((e.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle).width, 10);
            u.addTest("cssvwunit", o == t)
        });
    var m = f._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
    f._prefixes = m,
        u.addTest("touchevents", function() {
            var t;
            if ("ontouchstart"in e || e.DocumentTouch && n instanceof DocumentTouch)
                t = !0;
            else {
                var o = ["@media (", m.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                v(o, function(e) {
                    t = 9 === e.offsetTop
                })
            }
            return t
        }),
        s(),
        i(d),
        delete f.addTest,
        delete f.addAsyncTest;
    for (var g = 0; g < u._q.length; g++)
        u._q[g]();
    e.Modernizr = u
}(window, document);
