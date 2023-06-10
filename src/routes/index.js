const { Router } = require('express')

//________________________________________________________________
const usersRouter = require('../routes/users.router.js')
const productsRouter = require('../routes/productos.router.js')
const ordersRouter = require('../routes/orders.router.js')
const viewsRouter = require('../routes/views.router.js')
const cookieRouter = require('../routes/cookie.router.js')
const sessionRouter = require('../routes/session.router.js')
const pruebasRouter = require('../routes/pruebas.router.js')
const { uploader } = require('../utils/multerConfig.js')
const { UserRouter } = require('../routes/users.js')

const router = Router()

router.use('/vista', viewsRouter)

router.use('/api/usuarios',  usersRouter)
router.use('/api/productos', productsRouter)
// order 
router.use('/api/orders', ordersRouter)



router.use('/cookie', cookieRouter)
router.use('/session', sessionRouter)

router.use('/pruebas', pruebasRouter)

const userRouter = new UserRouter()
router.use('/users', userRouter.getRouter())

router.post('/single', uploader.single('myfile') ,(req, res)=>{
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
})

router.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})



module.exports = router