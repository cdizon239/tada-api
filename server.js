require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.set('port', process.env.PORT || 4000)
const session = require('express-session')
const SESSION_SECRET = process.env.SESSION_SECRET
const todosController = require('./controllers/todosController')
const categoryController = require('./controllers/categoryController')
const sessionsController = require('./controllers/sessionsController')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// allows cross origin requests
app.use(cors({
    origin: ['*'],
    credentials: true,
}))

console.log(process.env.SESSION_SECRET);

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//  session middleware

app.use('/sessions', sessionsController)
app.use('/todo', todosController)
app.use('/category', categoryController)

app.listen(app.get('port'), () => {
    console.log('Yay it\'s working on port', app.get('port'));
})
