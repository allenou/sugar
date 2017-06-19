(function () {
    'use strict';
    var $ = function (s) {
        return new Sugar(s);
    }
    var Sugar = function (selector) {
        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this
        }
        if (typeof (selector) == 'string') {
            var nodes = document.querySelectorAll(selector),
                i = 0,
                length
            this.length = nodes.length
            for (; length = nodes.length, i < length; i++) {
                this[i] = nodes[i];
            }
            return this
        }
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj)
    }
    $.fn = Sugar.prototype = {
        ready: function (callback) {
            var document = this
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }
        },
        hide: function () {
            var length = this.length
            while (length--) {
                this[length].style.display = 'none'
            }
            return this
        },
        show: function () {
            var length = this.length
            while (length--) {
                this[length].style.display = 'block'
            }
            return this
        },
        hasClass: function (name) {
            if (this[0].className.indexOf(name) !== -1) {
                return true
            } else {
                return false
            }
        },
        addClass: function (name) {
            var length = this.length,
                element
            if (name && typeof (name) === 'string') {
                while (length--) {
                    element = this[length]
                    //If the element type is ELEMENT_NODE
                    if (element.nodeType === 1) {
                        element.className += element.className ? ' ' + name : name
                    }
                }
                return this
            }
        },
        removeClass: function (name) {
            var length = this.length,
                element, className
            if (name && typeof (name) === 'string') {
                while (length--) {
                    element = this[length]
                    className = element.className
                    //If the element type is ELEMENT_NODE and have class
                    if (element.nodeType === 1 && className) {
                        //If not have class or have only one class
                        if (!name || className.indexOf(' ') === -1) {
                            element.removeAttribute('class')
                        } else {
                            element.className = className.replace(' ' + name, '')
                        }
                    }
                }
                return this
            }
        },
        toggleClass: function (name) {
            if (this.hasClass(name)) {
                this.removeClass(name)
            } else {
                this.addClass(name)
            }
        },
        css: function (property, value) {
            var length = this.length
            while (length--) {
                if (typeof (property) == 'string') {
                    if (value !== undefined) {
                        this[length].style[property] = value
                    } else {
                        return getComputedStyle(this[length], null).getPropertyValue(property) //IE 9+ 
                    }
                } else {
                    var key
                    for (key in property) {
                        this[length].style[key] = property[key]
                    }
                }
            }
            return this
        },
        text: function (text) {
            var length = this.length
            while (length--) {
                if (text) {
                    this[length].textContent = text
                } else {
                    return this[length].textContent
                }
            }
            return this
        },
        val: function (value) {
            if (value) {
                this[0].value = value
            } else {
                return this[0].value
            }
        },
        html: function (html) {
            if (html) {
                this[0].innerHTML = html
            } else {
                return this[0].textContent
            }
        }
    };
    if (!window.$)
        window.$ = $
}())