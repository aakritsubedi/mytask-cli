const mongoose = require('mongoose');

// Schema for my task
const myTaskSchema = mongoose.Schema({
  task: { type: String },
  isCompleted: { type: Boolean } 
});

module.exports = mongoose.model('my-task', myTaskSchema);