const express = require('express');
const router = express.Router();
const Todo = require('../models/todos')
const TodoCategory = require('../models/toDoCategories')

//  Get all todos and populate category
router.get('/', (req, res) => {
  Todo.find({})
  .populate("category")
  .exec((err, todos) => {
    if (err) {
        res.status(400).json({error: err.message})
    }
    res.status(200).json(todos)
})
})


// Get all categories
router.get('/categories', (req, res) => {
    TodoCategory.find({})
    .exec((err, todoCategories) => {
      if (err) {
          res.status(400).json({error: err.message})
      }
      res.status(200).json(todoCategories)
  })
  })



//  post a new todo
router.post('/', (req, res) => {
    TodoCategory.findOne({category_name: req.body.category_name}, (err, category) => {
        
        let createTodo = {
            ...req.body,
            category: category?._id
        }
        
        Todo.create(createTodo, (err, createdTodo) => {
            if(err) {
                res.status(400).json({error: err.message})
            }
            res.status(200).json(createdTodo)
        })
    })

})


// get info for single todo
router.get('/:todoId', (req, res) => {
    Todo.findById(req.params.todoId)
    .populate("category")
    .exec((err, todo) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(todo)
    })
})

// update info for single todo
router.put('/:todoId', (req, res) => {
    TodoCategory.findOne({category_name: req.body.category_name}, (err, category) => {
        
        let updateTodo = {
            ...req.body,
            category: category?._id
        }

        Todo.findByIdAndUpdate(req.params.todoId, updateTodo, (err, updatedTodo) => {
            if(err) {
                res.status(400).json({error: err.message})
            }
            res.status(200).json(updatedTodo)
        })
    })

})

router.patch('/:todoId', (req, res) => {
    console.log('I was hit!!! patch me!', req.body);
    Todo.findByIdAndUpdate(req.params.todoId, req.body, {new:true},(err, updatedTodo) => {
        if(err) {
            res.status(400).json({error: err.message})
        }
        console.log(updatedTodo);
        res.status(200).json(updatedTodo)
    })

})

router.delete('/:todoId', (req, res) => {
    console.log('delete todo');
    Todo.findByIdAndDelete(req.params.todoId, (err, deletedTodo) => {
        if(err) {
            res.status(400).json({error: err.massage})
        }
        res.status(200).json(deletedTodo)
    })
})


module.exports = router;