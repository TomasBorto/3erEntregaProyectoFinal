const { userModel } = require("../../models/users.model")


class UserDaoMongo{
    get = async ({ page, limit, query='' }) =>  {
        // const resp = await userModel.find({}).lean()
        const resp = await userModel.paginate({}, {limit, page, lean:true })
        // console.log(resp)
        return resp
    }

    getById = async (id) => {
        return await userModel.findById({_id: id}) 
    }
    
    
    create = async (newItem) => {
        return await userModel.create(newItem) 
    }

    update = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    }

    delet = async (uid) => {
        // return await userModel.updateOne({_id: uid}, {status: false})
        return await userModel.deleteOne({_id: uid})
    }
       
}


module.exports = UserDaoMongo 
