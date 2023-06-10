const { productsModel } = require("../../models/products.model")

class ProductDaoMongo { // ProductoManager
    async get(){
        return await productsModel.find({})
    }

}

module.exports = ProductDaoMongo