
const { 
    UsersDaos,
    OrderDao
} = require('../daos/factory.js')

const UserRepository  = require('../repositories/user.repository.js')
const OrderRepository = require('../repositories/orders.repository.js')

const userService  = new UserRepository(new UsersDaos())
const orderService = new OrderRepository(new OrderDao())


module.exports = {
    userService,
    orderService
    // productService
}

