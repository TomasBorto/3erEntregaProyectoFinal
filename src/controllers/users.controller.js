const { userService } = require('../service')
const { authSession } = require('../middleware/auth.middleware')
const { authToken } = require('../utils/jwtoken')
const { UserDto } = require('../dto/user.dto')


class UserController{
    getUsers = async (req, res) =>{
        try {
            const { page=1, limit=10 } = req.query
            const { docs, 
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            } = await userService.getUsers({page, limit})
            
            if (!docs) {
                return res.status(400).send('No hay usuarios')            
            }
            res.status(200).send({
                // status: 'success'
                //payload: docs
                users: docs,
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUser = async (request, response) =>{
        const {id} = request.params
        response.status(200).send(id)
    }

    createUser = async (request, response) =>{
        try {
            //mada el  cliente request 
            let {first_name, last_name} = request.body
            if (!first_name || !last_name) {
                return response.status(400).send({ message: 'Che pasar todos los datos'})
            }
            // console.log('user post',user)
            
            let userAgregado = await userService.createUser({first_name, last_name})
            // console.log(userAgregado)
    
            response.status(201).send({ 
                userAgregado,
                message: 'usuario creado' 
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    updateUser = async (request, response) =>{

        const { uid } = request.params
        
    
        //mada el  cliente request 
        let userToReplace = request.body
        if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
            return response.status(400).send({ message: 'Che pasar todos los datos'})
        }
        let result = await userService.updateUser(uid, userToReplace)
        response.status(201).send({ 
            users: result,
            message: 'usuario Modificado' 
        })
    }
    deleteUser = async (req, res)=> {
        const { uid } = req.params
    
        let result = await userService.deletUser(uid)
        
        res.status(200).send({ message:"Usuario borrado", result })
    }
}

module.exports = new UserController