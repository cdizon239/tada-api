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
    origin: [process.env.APP_FRONTEND],
    credentials: true
}))

//  session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    // cookie: {
    //     secure: false
    // }
}))

const authRequired = (req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        res.status(302).json({
            message: 'You must be logged in to do that',
            status: 302
        })
    }
}

app.use('/sessions', sessionsController)
app.use('/todo', authRequired, todosController)
app.use('/category', authRequired, categoryController)

app.listen(app.get('port'), () => {
    console.log('Yay it\'s working on port', app.get('port'));
})
