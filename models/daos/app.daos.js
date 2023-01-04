const envConfig = require('../../config')

let ProductsDao;
let CartsDao;

switch (envConfig.DATASOURCE) {
    case 'mongo':
        ProductsDao = require('./products/products.mongo.dao')
        CartsDao = require('./carts/carts.mongo.dao')
        break;
    default:
        throw new Error("Invalid Datasource")
}

module.exports = {
    CartsDao,
    ProductsDao
}