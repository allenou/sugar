(function() {
    var $ = function(s) {
        return new Sugar(s);
    }
    var Sugar = function(s) {
        //若为空则抛出异常
        this.r = document.querySelector(s || '')
        return this
            // return r.length === 1 ? r : r[0]
    }
    $.fn = Sugar.prototype = {
        on: function(event, fn) {
            this.addEventListener(event, fn)
        },
        show: function() {
            return this;
        }
    };
    if (!window.$)
        window.$ = $
}())