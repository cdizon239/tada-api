require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.set('port', process.env.PORT || 4000)
const todosController = require('./controllers/todosController')
const categoryController = require('./controllers/categoryController')

// allows cross origin requests
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/todo', todosController)
app.use('/category', categoryController)

app.listen(app.get('port'), () => {
    console.log('Yay it\'s working on port', app.get('port'));
})
