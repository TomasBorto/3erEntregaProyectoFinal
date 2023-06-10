const { Router } = require('express')
const {getUsers, getUser, createUser, updateUser, deleteUser}= require('../controllers/users.controller')

const router = Router()



// get http://localhost:8080/api/usuarios
router.get('/', getUsers)

// get http://localhost:8080/api/usuarios /id
router.get('/:id', getUser)

// POST http://localhost:8080/api/usuarios /
router.post('/', createUser)

// PUT http://localhost:8080/api/usuarios /:userId
router.put('/:uid', updateUser)

// DELETE http://localhost:8080/api/usuarios /:userId
router.delete('/:uid', deleteUser)

module.exports = router




