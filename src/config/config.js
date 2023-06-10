const { connect } = require("mongoose")
const { productsModel } = require("../models/products.model")
const { cartModel } = require("../daos/mongo/models/carts.model")
const MongoSingleton = require("../utils/MongoSingleton")
require('dotenv').config()


let url = `mongodb://localhost:27017/comision39750`

const objConfig = {
    persistence: process.env.PERSISTENCE,
    dbConection: async () =>  MongoSingleton.getInstance(),
    url: `mongodb+srv://tomas:Coder12345@clustercoder.hpfuzfq.mongodb.net/?retryWrites=true&w=majority`  
}

module.exports = {
    objConfig
}