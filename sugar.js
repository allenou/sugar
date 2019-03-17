(function (window, undefined) {
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
        ready: function (fn) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        },
        find: function (selector) {
            var element, i = 0,
                childs,
                allChilds = []
            if (isString(selector)) {
                while ((element = this[i++])) {
                    childs = element.querySelectorAll(selector)
                    allChilds.push(childs)
                }
                return allChilds;
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
            if (isString(name)) {
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
            if (isString(name)) {
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
            return this
        },
        css: function (property, value) {
            var element, i = 0
            while ((element = this[i++])) {
                if (isString(property)) {
                    //HANDLE:$('div').css('width','200px')
                    if (value) {
                        element.style[property] = value
                    } else {
                        //HANDLE:$('div').css('width')
                        return getComputedStyle(element, null).getPropertyValue(property) //IE 9+ 
                    }
                } else {
                    //HANDLE:$('div').css({'width':'200px','height':'200px'})
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
            //HANDLE:$('div').text('Sugar')
            while ((element = this[i++])) {
                if (text === void 0) {
                    //HANDLE:$('div').text()
                    return element.textContent
                }
                element.textContent = '' + text
            }
            return this
        },
        val: function (value) {
            //HANDLE:$('input').val('Sugar')
            if (isString(value)) {
                this[0].value = value
            } else {
                //HANDLE:$('input').val()
                return this[0].value
            }
            return this
        },
        html: function (html) {
            //HANDLE:$('div').html('<h1>Sugar</h1>')
            if (isString(html)) {
                this[0].innerHTML = html
            } else {
                //HANDLE:$('div').html()
                return this[0].textContent
            }
            return this
        },
        append: function (html) {
            //HANDLE:$('div').append('<h1>Sugar</h1>')
            if (isString(html)) {
                var element, i = 0,
                    tmp = document.createElement('div')
                while ((element = this[i++])) {
                    tmp.innerHTML = html
                    if (element.nodeType === 1) {
                        element.appendChild(tmp.firstChild)
                    }
                }
            }
            return this
            //https://davidwalsh.name/convert-html-stings-dom-nodes ->DOMParser|createDocumentFragment|ContextualFragment
            //https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
        },
        on: function (types, selector, fn) {
            //HANDLE:$('ul').on('click')
            if (isString(types)) {
                var element, i = 0
                while ((element = this[i++])) {
                    if (element.nodeType === 1) {
                        //HANDLE:$('ul').on('click',function(){})
                        if (!fn && isFunction(selector)) {
                            fn = selector
                            element.addEventListener(types, fn)
                        }
                        //HANDLE:$('ul').on('click','li',function(){})
                        if (isString(selector) && isFunction(fn)) {
                            var childs = element.querySelectorAll(selector),
                                child,
                                j = 0;
                            while ((child = childs[j++])) {
                                child.addEventListener(types, fn)
                            }
                        }
                    }
                }
            }
            return this
            //http://www.cnblogs.com/ziyunfei/p/5545439.html
        }
    };
    Sugar.fn.init.prototype = Sugar.fn
    // Sugar.extend = Sugar.fn.extend = function () {

    // }
    // Sugar.fn.extend = {
    //     addClass: function (name) {
    //         var element, i = 0
    //         if (isString(name)) {
    //             while ((element = this[i++])) {
    //                 //If the element type is ELEMENT_NODE
    //                 if (element.nodeType === 1) {
    //                     element.className += element.className ? ' ' + name : name
    //                 }
    //             }
    //         }
    //         return this
    //     }
    // }
    window.Sugar = window.$ = Sugar;
}(window))