
"use strict";

(function (window) {

    let elExp = /\w+/,
        valExp = /<[^>]+>/g,
        //events = {},
        document = window.document,
        LGZZK = function (selector) {
            return new LGZZK.fn.init(selector);
        };

    LGZZK.fn = LGZZK.prototype = {

        constructor: LGZZK,

        init: function (selector) {

            let selectorType = typeof selector;
            // HANDLE: (""), (null), (undefined), (false)
            this.length = 0;
            if (!selector) {
                return this;
            }
            selector = selectorType !== "string" ? selector : selector.trim();
            if (selectorType === "string") {
                if (selector.match(valExp)) {
                    this[0] = document.createElement(elExp.exec(selector));
                    this[0].innerHTML = selector;
                    this[0] = this[0].children[0];
                    this.length = 1;
                } else {
                    addElem(this, document.querySelectorAll(selector));
                }
            } else {
                switch (LGZZK.toRawType(selector)) {
                    case LGZZK:
                    case Array:
                    case NodeList:
                    case HTMLCollection: {
                        addElem(this, selector);
                        break;
                    }
                    case HTMLElement:
                    case SVGPathElement: {
                        this[0] = selector;
                        this.length = 1;
                        break;
                    }
                    case Function: {
                        if (document.readyState !== "complete") {
                            document.addEventListener("DOMContentLoaded", complete(selector));
                        }
                    }
                }
            }
            return this;
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(this.length - 1);
        },
        eq: function (i) {
            return new LGZZK.fn.init(this[i]);
        },
        attr: function (key, val) {
            if (!key && !val) return;
            if (!val) {
                if (typeof key === "object") {
                    LGZZK.each(this, function (i) {
                        for (let i in key) {
                            this.setAttribute(i, key[i])
                        }
                    });
                }
                if (typeof key === "string") {
                    return this[0].getAttribute(key);
                }
            } else {
                LGZZK.each(this, function () {
                    this.setAttribute(key, val);
                })
            }
            return this;
        },
        css: function (key, val) {
            if (!key && !val) return;
            if (!val) {
                if (typeof key === "object") {
                    LGZZK.each(this, function (i) {
                        for (let i in key) {
                            this.style[i] = key[i];
                        }
                    });
                }
                if (typeof key === "string") {
                    return this[0].style[key];
                }
            } else {
                LGZZK.each(this, function () {
                    this.style[key] = val;
                });
            }
            return this;
        },
        text: function (value) {
            if (arguments.length === 0) {
                let str = "";
                LGZZK.each(this, function () {
                    str += this.innerText;
                });
                return str;
            } else {
                LGZZK.each(this, function () {
                    this.innerText = value;
                });
            }
            return this;
        },
        html: function (value) {
            if (arguments.length === 0) {
                let str = "";
                LGZZK.each(this, function () {
                    str += this.innerHTML;
                });
                return str;
            } else {
                LGZZK.each(this, function () {
                    this.innerHTML = value;
                });
            }
            return this;
        },
        val: function (value) {
            if (arguments.length === 0) {
                return this[0].value;
            } else {
                this[0].value = value;
            }
            return this;
        },
        each: function (callback) {
            LGZZK.each(this, callback);
            return this;
        },
        click: function (callback) {
            addEvent("click", callback, this);
            return this;
        },
        dblclick: function (callback) {
            addEvent("dblclick", callback, this);
            return this;
        },
        mouseenter: function (callback) {
            addEvent("mouseenter", callback, this);
            return this;
        },
        mouseleave: function (callback) {
            addEvent("mouseleave", callback, this);
            return this;
        },
        hover: function (callback1, callback2) {
            this.mouseenter(callback1);
            this.mouseleave(callback2);
            return this;
        },
        focus: function (callback) {
            addEvent("focus", callback, this);
            return this;
        },
        blur: function (callback) {
            addEvent("blur", callback, this);
            return this;
        },
        addClass: function (value) {
            let cls = value.split(" ");
            LGZZK.each(this, function () {
                for (let i of cls) {
                    this.classList.add(i);
                }
            });
            return this;
        },
        removeClass: function (value) {
            let cls = value.split(" ");
            LGZZK.each(this, function () {
                for (let i of cls) {
                    this.classList.remove(i);
                }
            });
            return this;
        },
        children: function () {
            let elems = [];
            LGZZK.each(this, function () {
                for (let i of this.children) {
                    elems.push(i);
                }
            })
            return new LGZZK.fn.init(elems);
        },
        append: function (value) {
            let val = LGZZK(value);
            LGZZK.each(this, function () {
                for (let i = 0; i < val.length; i++) {
                    this.appendChild(val[i]);
                }
            });
            return this;
        },
        remove: function () {
            LGZZK.each(this, function () {
                this.parentNode.removeChild(this);
            });
            return this;
        },
        empty: function () {
            LGZZK.each(this, function () {
                this.innerHTML = "";
            });
            return this;
        }
    }

    function complete(callback) {
        document.removeEventListener("DOMContentLoaded", complete);
        callback();
    }

    function addElem(obj, elem) {
        LGZZK.each(elem, function (i) {
            obj[i] = this;
        });
        obj.length = elem.length;
    }

    function addEvent(selector, callback, that) {
        LGZZK.each(that, function () {
            this.addEventListener(selector, callback);
        })
    }

    LGZZK.each = function (obj, callback) {
        if (LGZZK.toRawType(obj) === LGZZK) {
            for (let i = 0; i < obj.length; i++) {
                callback.call(obj[i], i, obj[i]);
            }
        } else {
            for (let i in obj) {
                callback.call(obj[i], i, obj[i]);
            }
        }
    }
    LGZZK.isType = function (obj, type) {
        return obj instanceof type;
    }
    LGZZK.toRawType = function (obj) {
        let types = [LGZZK, Function, Array, NodeList, HTMLElement, SVGPathElement, HTMLCollection];
        for (let i of types) {
            if (obj instanceof i) return i;
        }
    }
    LGZZK.ajax = function (options) {
        let xhr,
            res,
            type = options.type.toLowerCase(),
            dataType = options.dataType.toLowerCase();

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    if (dataType === "text") {
                        res = xhr.responseText;
                    } else if (dataType === "xml") {
                        res = XMLDocument.parse(xhr.responseXML);
                    } else {
                        res = JSON.parse(xhr.responseText);
                    }
                    options.success(res);
                } else {
                    options.error();
                }
            }
        }
        xhr.open(type, options.url, true);
        if (type === "post") {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(options.data);
        } else {
            xhr.send();
        }
    }
    LGZZK.HTTPS = function () {
        if (location.protocol === "http:") {
            location.protocol = "https:";
        }
    }
    LGZZK.loadImg = function (url) {
        let hide = document.createElement("div");
        for (var i = 0; i < url.length; i++) {
            let img = document.createElement("img");
            img.src = url[i].url;
            hide.appendChild(img);
        }
        document.body.appendChild(hide);
        // document.body.removeChild(hide);
    }
    LGZZK.random = function (a, b) {
        return Math.floor(Math.random() * (b + 1) + a);
    }

    LGZZK.prototype.init.prototype = LGZZK.prototype;
    window.Z = window.LGZZK = LGZZK;

})(this);