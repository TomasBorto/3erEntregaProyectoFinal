const {Router} =require('express')
const jwt = require('jsonwebtoken')
const {userModel} = require('../models/users.model.js')
const { generateToken, isValidateToken } = require('../utils/jwtoken.js')
const { faker } = require('@faker-js/faker')
const { createHash, isValidPassword } = require('../utils/bcryptPass.js')


const router = Router()

const users = [
    { first_name: 'Tomas', last_name: 'Borto', email: 'borto@gmail.com', password: 'borto123', admin: true},
]


router.get('/', (req,res)=>{
    res.render('login', {})
})

router.post('/login',async (req, res)=> {
    try {
        const { email, password} = req.body    
        // console.log(email, password)
    
        const user = await userModel.findOne({email})

        console.log(user)
        if (!user) return res.status(401).send({status: 'error', error: 'Usuario o contraseña incorrectos'})
        
        const isValidPass = isValidPassword(user, password)

        if (!isValidPass) return res.status(401).send({status: 'error', error: 'Usuario o contraseña incorrectos'})

        console.log('logged in!')

        res.send({status:'success', message: 'Usuario logueado correctamente'})
    } catch (error) {
        req.logger.error(error)
    }
})

// GET Registro

router.get('/register', (req, res)=>{
    res.render('register')
})

// POST Registro 
router.post('/register', async (req,res)=> {
    try {
        const { first_name, last_name, email, password } = req.body

    const exists = await userModel.findOne({email})

    if (exists) return res.status(401).send({status: 'error', message: 'El usuario ya existe'})
    const hashedPassword = createHash(password)


    const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    }
    let result = await userModel.create(user)
    

    res.status(200).json({
        status: 'success',
        message: 'Usuario creado correctamente',
        payload: result
    })
    
        
    } catch (error) {
        console.log(error)
    }

})

router.get('/test/user', (req, res) => {
    let first_name = faker.name.firstName()
    let last_name  = faker.name.lastName()
    let email      = faker.internet.email()
    let password   = faker.internet.password()

    res.send({
        first_name,
        last_name, 
        email, 
        password
    })
})

router.get('/', (req, res)=>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)        
    } else {
        req.session.counter = 1
        res.send('Bienvenido')        
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'Logout error', message:err}) 
        res.send('logou ok')
    })
})

module.exports = router
