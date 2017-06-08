(function() {
    var $ = function(s) {
        return new Sugar(s);
    }
    var Sugar = function(els) {
        var nodes = document.querySelectorAll(els),
            i = 0,
            length
        this.length = nodes.length
        for (; length = nodes.length, i < length; i++) {
            this[i] = nodes[i];
        }
        return this
    }
    $.fn = Sugar.prototype = {
        hide() {
            var length = this.length
            while (length--) {
                this[length].style.display = 'none'
            }
            return this;
        },
        show: function() {
            var length = this.length
            while (length--) {
                this[length].style.display = 'block'
            }
            return this;
        },
        css: function(...args) {
            var length = this.length,
                argCount = arguments.length,
                value, attr
            while (length--) {
                if (argCount > 1) {
                    attr = args[0]
                    value = args[1]
                    this[length].style[attr] = value
                    return this
                } else {
                    value = window.getComputedStyle(this[length], null)[args]
                    return value
                }
            }
        },
        text(...args) {
            var length = this.length,
                argCount = arguments.length,
                value
            while (length--) {
                if (argCount > 0) {
                    this[length].innerHTML = args
                    return this
                } else {
                    value = this[length].innerHTML
                    return value
                }
            }
        },
        val(...args) {
            var argCount = arguments.length,
                value
            if (argCount > 0) {
                this[0].value = args
                return this
            } else {
                value = this[0].value
                return value
            }
        },
        html(...args) {
            var argCount = arguments.length,
                value
            if (argCount > 0) {
                this[0].appendChild(args)
                return this
            } else {
                value = this[0].childNodes
                return value
            }
        }
    };
    if (!window.$)
        window.$ = $
}())