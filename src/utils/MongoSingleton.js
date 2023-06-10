const {connect} = require('mongoose')

class MongoSingleton{
    static #instance
    constructor(){
        connect('mongodb://localhost:27017/comision39730',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    static getInstance(){
        if(this.#instance){
            // primera vez entra acá 
            console.log('Ta está conectada')
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log('connected')

        return this.#instance
    }
}

module.exports =  MongoSingleton