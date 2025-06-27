var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ComponentWithBackReference = /** @class */ (function () {
    function ComponentWithBackReference(dot) {
        this.dot = dot;
    }
    return ComponentWithBackReference;
}());
var Dot = /** @class */ (function () {
    function Dot() {
    }
    Dot.prototype.clone = function () {
        var clone = Object.create(this);
        clone.circularReference = __assign(__assign({}, this.circularReference), { dot: __assign({}, this) });
        return clone;
    };
    return Dot;
}());
function clientCode() {
    var dot1 = new Dot();
    dot1.x = 10;
    dot1.y = 20;
    dot1.circularReference = new ComponentWithBackReference(dot1);
    var dot2 = dot1.clone();
    console.log(dot1.x === dot2.x); // true 
    console.log(dot1.y === dot2.y); // true
    console.log(dot1.circularReference === dot2.circularReference); // false
    console.log(dot1.circularReference.dot === dot2.circularReference.dot); // true
    console.log(dot1.circularReference);
    console.log(dot2.circularReference);
}
clientCode();
