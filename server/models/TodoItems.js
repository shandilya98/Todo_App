const mongoose = require("mongoose");
// create  Item Schema
const TodoItemSchema = new mongoose.Schema(
   { item: {
      type: String,
      required : true
    }

})
//export this schema
module.exports = mongoose.model('Todo', TodoItemSchema);