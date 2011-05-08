// VERSION: 1.8 LAST UPDATE: 9.03.2011
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */
(function(g) {
    for (var d,j = document.getElementsByTagName("head")[0].style,h = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "),e = 0; e < h.length; e++)j[h[e]] !== void 0 && (d = h[e]);
    var i = "v" == "\v";
    jQuery.fn.extend({ImageRotate:function(a) {
        if (!this.Wilq32 || !this.Wilq32.PhotoEffect)return a = g.extend(!0, {}, a),(new Wilq32.PhotoEffect(this.get(0), a))._rootObj
    },rotate:function(a) {
        if (!(this.length === 0 || typeof a == "undefined")) {
            typeof a == "number" && (a = {angle:a});
            for (var c =
                    [],b = 0,d = this.length; b < d; b++) {
                var f = this.get(b);
                typeof f.Wilq32 == "undefined" ? c.push(g(g(f).ImageRotate(a))) : f.Wilq32.PhotoEffect._handleRotation(a)
            }
            return c
        }
    }});
    Wilq32 = window.Wilq32 || {};
    Wilq32.PhotoEffect = function() {
        return d ? function(a, c) {
            a.Wilq32 = {PhotoEffect:this};
            this._img = this._rootObj = this._eventObj = a;
            this._handleRotation(c)
        } : function(a, c) {
            this._img = a;
            this._rootObj = document.createElement("span");
            this._rootObj.style.display = "inline-block";
            this._rootObj.Wilq32 = {PhotoEffect:this};
            a.parentNode.insertBefore(this._rootObj,
                    a);
            if (a.complete)this._Loader(c); else {
                var b = this;
                jQuery(this._img).bind("load", function() {
                    b._Loader(c)
                })
            }
        }
    }();
    Wilq32.PhotoEffect.prototype = {_setupParameters:function(a) {
        this._parameters = this._parameters || {};
        if (typeof this._angle !== "number")this._angle = 0;
        if (typeof a.angle === "number")this._angle = a.angle;
        this._parameters.animateTo = typeof a.animateTo === "number" ? a.animateTo : this._angle;
        this._parameters.easing = a.easing || this._parameters.easing || function(a, b, d, f, e) {
            return-f * ((b = b / e - 1) * b * b * b - 1) + d
        };
        this._parameters.duration =
                a.duration || this._parameters.duration || 1E3;
        this._parameters.callback = a.callback || this._parameters.callback || function() {
        };
        a.bind && a.bind != this._parameters.bind && this._BindEvents(a.bind)
    },_handleRotation:function(a) {
        this._setupParameters(a);
        this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()
    },_BindEvents:function(a) {
        if (a && this._eventObj) {
            if (this._parameters.bind) {
                var c = this._parameters.bind,b;
                for (b in c)c.hasOwnProperty(b) && jQuery(this._eventObj).unbind(b, c[b])
            }
            this._parameters.bind =
                    a;
            for (b in a)a.hasOwnProperty(b) && jQuery(this._eventObj).bind(b, a[b])
        }
    },_Loader:function() {
        return i ? function(a) {
            var c = this._img.width,b = this._img.height;
            this._img.parentNode.removeChild(this._img);
            this._vimage = this.createVMLNode("image");
            this._vimage.src = this._img.src;
            this._vimage.style.height = b + "px";
            this._vimage.style.width = c + "px";
            this._vimage.style.position = "absolute";
            this._vimage.style.top = "0px";
            this._vimage.style.left = "0px";
            this._container = this.createVMLNode("group");
            this._container.style.width =
                    c;
            this._container.style.height = b;
            this._container.style.position = "absolute";
            this._container.setAttribute("coordsize", c - 1 + "," + (b - 1));
            this._container.appendChild(this._vimage);
            this._rootObj.appendChild(this._container);
            this._rootObj.style.position = "relative";
            this._rootObj.style.width = c + "px";
            this._rootObj.style.height = b + "px";
            this._rootObj.setAttribute("id", this._img.getAttribute("id"));
            this._rootObj.className = this._img.className;
            this._eventObj = this._rootObj;
            this._handleRotation(a)
        } : function(a) {
            this._rootObj.setAttribute("id",
                    this._img.getAttribute("id"));
            this._rootObj.className = this._img.className;
            this._width = this._img.width;
            this._height = this._img.height;
            this._widthHalf = this._width / 2;
            this._heightHalf = this._height / 2;
            var c = Math.sqrt(this._height * this._height + this._width * this._width);
            this._widthAdd = c - this._width;
            this._heightAdd = c - this._height;
            this._widthAddHalf = this._widthAdd / 2;
            this._heightAddHalf = this._heightAdd / 2;
            this._img.parentNode.removeChild(this._img);
            this._aspectW = (parseInt(this._img.style.width, 10) || this._width) /
                    this._img.width;
            this._aspectH = (parseInt(this._img.style.height, 10) || this._height) / this._img.height;
            this._canvas = document.createElement("canvas");
            this._canvas.setAttribute("width", this._width);
            this._canvas.style.position = "relative";
            this._canvas.style.left = -this._widthAddHalf + "px";
            this._canvas.style.top = -this._heightAddHalf + "px";
            this._canvas.Wilq32 = this._rootObj.Wilq32;
            this._rootObj.appendChild(this._canvas);
            this._rootObj.style.width = this._width + "px";
            this._rootObj.style.height = this._height + "px";
            this._eventObj =
                    this._canvas;
            this._cnv = this._canvas.getContext("2d");
            this._handleRotation(a)
        }
    }(),_animateStart:function() {
        this._timer && clearTimeout(this._timer);
        this._animateStartTime = +new Date;
        this._animateStartAngle = this._angle;
        this._animate()
    },_animate:function() {
        var a = +new Date,c = a - this._animateStartTime > this._parameters.duration;
        if (c && !this._parameters.animatedGif)clearTimeout(this._timer); else {
            (this._canvas || this._vimage || this._img) && this._rotate(~~(this._parameters.easing(0, a - this._animateStartTime, this._animateStartAngle,
                    this._parameters.animateTo - this._animateStartAngle, this._parameters.duration) * 10) / 10);
            var b = this;
            this._timer = setTimeout(function() {
                b._animate.call(b)
            }, 10)
        }
        if (this._parameters.callback && c)this._angle = this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj)
    },_rotate:function() {
        var a = Math.PI / 180;
        return i ? function(a) {
            this._angle = a;
            this._container.style.rotation = a % 360 + "deg"
        } : d ? function(a) {
            this._angle = a;
            this._img.style[d] = "rotate(" + a % 360 + "deg)"
        } : function(c) {
            this._angle =
                    c;
            c = c % 360 * a;
            this._canvas.width = this._width + this._widthAdd;
            this._canvas.height = this._height + this._heightAdd;
            this._cnv.translate(this._widthAddHalf, this._heightAddHalf);
            this._cnv.translate(this._widthHalf, this._heightHalf);
            this._cnv.rotate(c);
            this._cnv.translate(-this._widthHalf, -this._heightHalf);
            this._cnv.scale(this._aspectW, this._aspectH);
            this._cnv.drawImage(this._img, 0, 0)
        }
    }()};
    if (i)Wilq32.PhotoEffect.prototype.createVMLNode = function() {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return!document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),function(a) {
                return document.createElement("<rvml:" + a + ' class="rvml">')
            }
        } catch(a) {
            return function(a) {
                return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }()
})(jQuery);
