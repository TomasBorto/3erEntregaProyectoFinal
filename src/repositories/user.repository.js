// const { UserDto } = require("../dto/user.dto");

const RepositoryGeneric = require("./repositoryGeneric");

class UserRepository extends RepositoryGeneric {
    constructor(dao){
        super(dao)
    }
    
    // métodos particulares de esta clase o redefinir
    
}

module.exports = UserRepository