(function () {
    'use strict';

    var Sugar = function (selector, context) {
        return new Sugar.fn.init(selector, context);
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj)
    }

    function isFunction(obj) {
        return typeof (obj) === 'function'
    }

    function isString(obj) {
        return typeof (obj) === 'string'
    }
    Sugar.fn = {
        init: function (selector, context) {
            // HANDLE: $(""), $(null), $(undefined), $(false) ||$(DOMElement)
            if (!selector || selector.nodeType) {
                return this
            }
            if (isString(selector)) {
                var nodes = document.querySelectorAll(selector),
                    i = 0,
                    length
                this.length = nodes.length
                for (; length = nodes.length, i < length; i++) {
                    this[i] = nodes[i];
                }
                return this
                // HANDLE: $(function)
            } else if (isFunction(selector)) {
                this.ready(selector)
            }
        },
        ready: function (callback) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }
        },
        hide: function () {
            var element, i = 0
            while ((element = this[i++])) {
                element.style.display = 'none'
            }
            return this
        },
        show: function () {
            var element, i = 0
            while ((element = this[i++])) {
                element.style.display = 'block'
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
            var element, i = 0
            if (name && isString(name)) {
                while ((element = this[i++])) {
                    //If the element type is ELEMENT_NODE
                    if (element.nodeType === 1) {
                        element.className += element.className ? ' ' + name : name
                    }
                }
            }
            return this
        },
        removeClass: function (name) {
            var element, i = 0,
                className
            if (name && isString(name)) {
                while ((element = this[i++])) {
                    className = element.className
                    //If the element type is ELEMENT_NODE and have class
                    if (element.nodeType === 1) {
                        //If not have class or have only one class
                        if (!className || className.indexOf(' ') === -1) {
                            element.removeAttribute('class')
                        } else {
                            element.className = className.replace(' ' + name, '')
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function (name) {
            if (this.hasClass(name)) {
                this.removeClass(name)
            } else {
                this.addClass(name)
            }
        },
        css: function (property, value) {
            var element, i = 0
            while ((element = this[i++])) {
                if (isString(property)) {
                    if (value !== undefined) {
                        element.style[property] = value
                    } else {
                        return getComputedStyle(element, null).getPropertyValue(property) //IE 9+ 
                    }
                } else {
                    var key
                    for (key in property) {
                        element.style[key] = property[key]
                    }
                }
            }
            return this
        },
        text: function (text) {
            var element, i = 0
            while ((element = this[i++])) {
                if (text) {
                    element.textContent = text
                } else {
                    return element.textContent
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
        },
        append: function (html) {
            if (!html) {
                return this
            }
            var element, i = 0,
                tmp = document.createElement('div')
            while ((element = this[i++])) {
                tmp.innerHTML = html
                if (element.nodeType === 1) {
                    element.appendChild(tmp.firstChild)
                }
            }
            //https://davidwalsh.name/convert-html-stings-dom-nodes ->DOMParser|createDocumentFragment|ContextualFragment
            //https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
        }
    };
    Sugar.fn.init.prototype = Sugar.fn
    window.Sugar = window.$ = Sugar;
}(window))