const { Router } = require('express')
const { productsModel } = require('../models/products.model')

const { ProductsDaos } = require('../daos/factory')
// import { Router } from 'express'



const router = Router()
const productDaoMongo = new ProductsDaos()


router.use((req, res, next)=>{
    console.log('Time: ', Date())
    next()
})

// GET api/productos /  (trae todos los productos)
router.get('/', async (request, response) =>{
    const products = await productDaoMongo.get()

    response.status(200).send({
        status: 'success',
        products
    })
})

// GET api/productos /
router.post('/', (request, response) =>{
    const {name, price} = request.body
    response.status(200).send({name, price})
})

module.exports = router
// export default router

