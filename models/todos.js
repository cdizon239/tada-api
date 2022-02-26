const mongoose = require('../db/connection');

const todoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    due_date: Date,
    task_done: Boolean,
    category: {type: mongoose.Schema.Types.ObjectId,
        ref: "TodoCategory"
    },
    owner: {type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;