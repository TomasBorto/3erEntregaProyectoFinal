const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'CoderS3cR3t@'

const generateToken = (user) => {

    return jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'})
}



const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).send({status: 'error', error: 'Not Authenticated'})

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (err, credential) => {
        if(err) return res.status(403).send({status: 'error', error: 'Not Autorizado'})

        req.user = credential.user
        next()
    })
}

module.exports = {
    generateToken,    
    authToken
}