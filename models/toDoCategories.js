const mongoose = require('../db/connection');

const todoCategorySchema= new mongoose.Schema({
    category_name: {type: String},
    color: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const TodoCategory = mongoose.model('TodoCategory', todoCategorySchema)

module.exports = TodoCategory