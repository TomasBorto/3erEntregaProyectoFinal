// const express = require('express')
const express = require('express')
const cors = require('cors')
const appRouter = require('./routes')
// const { uploader } = require('./utils.js')
// handlebars_______________________________________________________________
const handlebars = require('express-handlebars')
const { uploader } = require('./utils/multerConfig.js')
// socket io _______________________________________________________________
const { Server } = require('socket.io')
const { objConfig } = require('./config/config.js')


// _________________________________ cookies _________________________________
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')

const fileStorege = FileStore(session)
const {create} = require('connect-mongo')

// passport
const { initializePassport } = require('./passport-jwt/passport.config.js')
const passport = require('passport')
const { initSocket } = require('./utils/initSocker')


// socket io _______________________________________________________________
// test singleton
objConfig.dbConection() //crea la instancia 



// pedir token
const app = express()


const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser('CoderS3cR3t@'))
app.use(cors()) // llamamos a cors


app.use('/virtual' ,express.static(__dirname+'/public'))

// handlebars_______________________________________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// handlebars_______________________________________________________________

initializePassport()
app.use(passport.initialize())


app.use(appRouter)

const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto: ${PORT}`)
})

// instanciando un socket server
const io = new Server(httpServer)


initSocket(io)

