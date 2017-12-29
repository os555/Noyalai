var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noyalai', {
    useMongoClient: true,
});

var db = mongoose.connection;

var postSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    price: {
        type: String
    },
    measure: {
        type: String
    },
    productimage: {
        type: String
    }
});

var Product = module.exports = mongoose.model("Product", postSchema);

module.exports.getProductById = function(err, id){
    if(err) throw err;
    var query = {_id: id}
    var result = Product.findOne(query);
    console.log(result);
}

module.exports.createProduct = function(newProduct, callback){
    newProduct.save(callback);
}