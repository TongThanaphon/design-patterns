var Product = /** @class */ (function () {
    function Product() {
        this.parts = [];
    }
    Product.prototype.listParts = function () {
        console.log("Product parts: ".concat(this.parts.join(', ')));
    };
    return Product;
}());
var ConcreteBuilder = /** @class */ (function () {
    function ConcreteBuilder() {
        this.reset();
    }
    ConcreteBuilder.prototype.reset = function () {
        this.product = new Product();
    };
    ConcreteBuilder.prototype.partA = function () {
        this.product.parts.push('A');
    };
    ConcreteBuilder.prototype.partB = function () {
        this.product.parts.push('B');
    };
    ConcreteBuilder.prototype.partC = function () {
        this.product.parts.push('C');
    };
    ConcreteBuilder.prototype.build = function () {
        var result = this.product;
        this.reset(); // Reset for next build
        return result;
    };
    return ConcreteBuilder;
}());
var Director = /** @class */ (function () {
    function Director() {
    }
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    Director.prototype.buildMinimalViableProduct = function () {
        this.builder.partA();
    };
    Director.prototype.buildFullFeaturedProduct = function () {
        this.builder.partA();
        this.builder.partB();
        this.builder.partC();
    };
    return Director;
}());
function clientCode(director) {
    var builder = new ConcreteBuilder();
    director.setBuilder(builder);
    director.buildMinimalViableProduct();
    builder.build().listParts();
    director.buildFullFeaturedProduct();
    builder.build().listParts();
}
var director = new Director();
clientCode(director);
