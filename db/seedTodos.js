const mongoose = require('./connection')
const Todo = require('../models/todos')
const TodoCategory = require('../models/toDoCategories')
const seedTodoCategory = require('./seedCategories.json')
const seedTodo = require('./seedTodos.json')

Todo.deleteMany({})
.then(() => {
    return TodoCategory.deleteMany()
})
.then(() => {
    console.log(seedTodoCategory);
    return TodoCategory.insertMany(seedTodoCategory)
})
.then((categories) => {
    let data =  seedTodo.map((todo) => {
        todo.category = categories.find((category) => category.category_name === todo.category_name)._id
        return todo
    })
    return Todo.insertMany(data)
})
.then((dataSeed) => {
    console.log(dataSeed);
})
.catch((err) => {
    console.log(err);
})
.finally(() => {
    process.exit()
})