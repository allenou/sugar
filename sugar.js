(function () {
    var $ = function (s) {
        return new Sugar(s);
    }
    var Sugar = function (els) {
        if (typeof (els) == 'string') {
            var nodes = document.querySelectorAll(els),
                i = 0,
                length
            this.length = nodes.length
            for (; length = nodes.length, i < length; i++) {
                this[i] = nodes[i];
            }
            return this
        } else {

        }
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj)
    }
    $.fn = Sugar.prototype = {
        ready: function (callback) {
            window.addEventListener('onreadystatechange', callback)
        },
        hide: function () {
            var length = this.length
            while (length--) {
                this[length].style.display = 'none'
            }
        },
        show: function () {
            var length = this.length
            while (length--) {
                this[length].style.display = 'block'
            }
        },
        css: function (property, value) {
            var length = this.length
            while (length--) {
                if (typeof (property) == 'string') {
                    if (value !== undefined) {
                        this[length].style[property] = value
                    } else {
                        return window.getComputedStyle(this[length], null)[property]
                    }
                } else {
                    var key
                    for (key in property) {
                        this[length].style[key] = property[key]
                    }
                }
            }
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