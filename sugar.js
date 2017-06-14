(function () {
    var $ = function (s) {
        return new Sugar(s);
    }
    var Sugar = function (els) {
        var nodes = document.querySelectorAll(els),
            i = 0,
            length
        this.length = nodes.length
        for (; length = nodes.length, i < length; i++) {
            this[i] = nodes[i];
        }
        return this
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj)
    }
    $.fn = Sugar.prototype = {
        hide() {
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
        css: function () {
            var length = this.length,
                args = toArray(arguments),
                attr, value
            while (length--) {
                if (args.length > 1) {
                    attr = args[0]
                    value = args[1]
                    this[length].style[attr] = value
                } else {
                    value = window.getComputedStyle(this[length], null)[args[0]]
                    return value
                }
            }
        },
        text() {
            var length = this.length,
                args = toArray(arguments),
                value
            while (length--) {
                if (args > 0) {
                    this[length].innerHTML = args
                } else {
                    value = this[length].innerHTML
                    return value
                }
            }
        },
        val() {
            var args = toArray(arguments),
                value
            if (args > 0) {
                this[0].value = args
            } else {
                value = this[0].value
                return value
            }
        },
        html() {
            var args = toArray(arguments),
                value
            if (args > 0) {
                this[0].appendChild(args)
            } else {
                value = this[0].childNodes
                return value
            }
        }
    };
    if (!window.$)
        window.$ = $
}())