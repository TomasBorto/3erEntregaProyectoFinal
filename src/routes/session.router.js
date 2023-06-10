const {Router} =require('express')
const jwt = require('jsonwebtoken')
const {userModel} = require('../models/users.model.js')
const { generateToken, isValidateToken } = require('../utils/jwtoken.js')


const router = Router()

const users = [
    { first_name: 'Tomas', last_name: 'Borto', email: 'borto@gmail.com', password: 'borto123', admin: true},
]


router.get('/', (req,res)=>{
    res.render('login', {})
})

//
router.post('/login',(req, res)=> {
    const {email, password} = req.body

    if(email !== 'borto@gmail.com' || password !== 'borto123'){
        return res.status(401).send({
            status: 'error',
            message: 'Invalid credentials'
        })
    }
    let token = jwt.sign({email, password, role:'user_premium'}, 'CoderS3cR3t@', {expiresIn: '24h'})
    
    res.cookie('coderCookieToken', token, {
        maxAge: 60*60*1000,
        httpOnly: true
    }).status(200).send({
        status: 'success',
        message: 'Loggen in successfully',
        token
    })


   
})

// GET Registro

router.get('/register', (req, res)=>{
    res.render('register')
})

// POST Registro 
router.post('/register', async (req,res)=> {
    try {
        const {username, first_name, last_name, email, password} = req.body
    
        // const exists = await userModel.findOne({email})
        const exists = users.find(user => user.email === email)
    
        if(exists) return res.send({status: 'error', message: 'Ya existe el usuario.'})
    
        // const newUser = {
        //     username,
        //     first_name,
        //     last_name,
        //     email,
        //     password
        // }
        users.push({username, first_name, last_name, email, password})
        
        console.log(users)
        // const resp = await userModel.create(newUser)

        const token = generateToken({
            username,
            email,
            role: 'user'
        })

        console.log(token)
        
        res.status(200).send({
            status: 'success',
            message: 'Usuario creado con éxito',
            token 
        })
    
        // res.status(200).render('login')
        
    } catch (error) {
        console.log(error)
    }

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