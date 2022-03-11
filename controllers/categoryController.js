const express = require('express')
const router = express.Router()
const Todo = require('../models/todos')
const TodoCategory = require('../models/toDoCategories')

router.get('/', (req, res) => {
    TodoCategory.find({}, (err, categories) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(categories)
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    TodoCategory.create(req.body, (err, createdCategory) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(createdCategory)
    })
})

router.get('/:categoryId', (req, res) => {
    TodoCategory.findById(req.params.categoryId, (err, category) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(category)
    })
})

router.put('/:categoryId', (req, res) => {
    TodoCategory.findByIdAndUpdate(req.params.categoryId, req.body, (err, updatedCategory) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(updatedCategory)
    })
})

router.delete('/:categoryId', (req, res) => {
    Todo.deleteMany({category: req.params.categoryId}, (err, deletedTodos) => {
        console.log(deletedTodos);
        TodoCategory.findByIdAndDelete(req.params.categoryId, (err, deletedCategory) => {
            if (err) {
                res.status(400).json({error: err.message})
            }
            res.status(200).json(deletedCategory)
        })
    })
})

module.exports = router;