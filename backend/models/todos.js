var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  owner: {
    id: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    },
    username: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Todo = (module.exports = mongoose.model("Todo", todoSchema));
