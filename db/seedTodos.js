// const mongoose = require('./connection')
// const Todo = require('../models/todos')
// const TodoCategory = require('../models/toDoCategories')
// const seedTodoCategory = require('./seedCategories.json')
// const seedTodo = require('./seedTodos.json')

// Todo.deleteMany({})
// .then(() => {
//     return TodoCategory.deleteMany()
// })
// .then(() => {
//     console.log(seedTodoCategory);
//     return TodoCategory.insertMany(seedTodoCategory)
// })
// .then((categories) => {
//     let data =  seedTodo.map((todo) => {
//         todo.category = categories.find((category) => category.category_name === todo.category_name)._id
//         return todo
//     })
//     return Todo.insertMany(data)
// })
// .then((dataSeed) => {
//     console.log(dataSeed);
// })
// .catch((err) => {
//     console.log(err);
// })
// .finally(() => {
//     process.exit()
// })

const mongoose = require('./connection')
const Todo = require('../models/todos')
const TodoCategory = require('../models/toDoCategories')
const seedTodoCategory = require('./seedCategories.json')
const seedTodo = require('./seedTodos.json')

let  load = async () => {
 let dTodos = await Todo.deleteMany({})
 let dCat =  dTodos ? await TodoCategory.deleteMany() : null
 let newCats = dCat ? await TodoCategory.insertMany(seedTodoCategory) : null
 let newTodos = newCats ? (await Todo.insertMany(seedTodo.map((todo) => {
    todo.category = newCats.find((category) => category.category_name === todo.category_name)._id
    return todo
}))) : null 
console.log(newTodos)
}

load()