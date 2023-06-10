const { objConfig } = require("../config/config");
const MongoSingleton = require("../utils/MongoSingleton");

let ProductsDaos
let UsersDaos
let CartsDao
let OrderDao
let ContactsDaos

switch ('MONGO') {
    case 'MONGO':
        MongoSingleton.getInstance()
        
        const ProductDaoMongo = require('./mongo/product.mongo.js') 
        ProductsDaos = ProductDaoMongo

        // User
        const UserDaoMongo = require('./mongo/user.mongo.js')
        UsersDaos = UserDaoMongo

        const OrderDaoMongo = require('./mongo/orders.mongo.js')
        OrderDao = OrderDaoMongo

        break;
    case 'MEMORY':
        const ProductDaoMemory = require('./memory/products.memory') 
        ProductsDaos = ProductDaoMemory
        // User
        break;
    case 'FILE':
        // idem en lo anterior
        break;

    default:
        MongoSingleton.getInstance()
        // const ProductDaoMongo = require('./mongo/product.mongo.js') 
        // ProductsDaos = ProductDaoMongo

        break;
}

module.exports = {
    ProductsDaos,
    UsersDaos,
    OrderDao
}