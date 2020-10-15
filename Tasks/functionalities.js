const mongoose = require("mongoose");

const db = require('./../db-connect');

// Import the user model
const Task = require("./task");

module.exports = {
  // Add task
  addTask: async (task) => {
    const taskInfo = await Task.create(task);

    console.info("New task added \n", taskInfo);

    mongoose.connection.close();
  },
  // Find task using id
  findTask: async ({ task }) => {
    // Make case insensitive
    const search = new RegExp(task, "i");

    const tasks = await Task.find({ task: search });

    console.info('Your task is \n', tasks);
    console.info(`${tasks.length} matches`);

    mongoose.connection.close();
  },
  // Find task by status
  findByStatus: async (status) => {
    const tasks = await Task.find({ isCompleted: status });
    const title = status ? 'completed' : 'in-complete';

    console.info(`Your ${title} tasks are: \n`, tasks);
    console.info(`Total ${title} tasks: ${tasks.length}`);

    mongoose.connection.close();
  },
  // Update the task
  updateTask: async (_id, task) => {
    await Task.updateOne({ _id }, task);

    console.log('Task updated successfully.');

    mongoose.connection.close();
  },
  // List all task
  allTask: async () => {
    myTasks = await Task.find();

    console.info('Your all tasks \n', myTasks);
    console.info(`Total no. of tasks: ${myTasks.length}`);

    mongoose.connection.close();
  },
  // Delete the task
  removeTask: async (_id) => {
    await Task.deleteOne({ _id });

    console.log(`Task with id ${_id} removed.`);

    mongoose.connection.close();
  },
  // Delete all tasks
  deleteAllTasks: async () => {
    await Task.deleteOne();

    console.log('All tasks removed');

    mongoose.connection.close();
  },
  emailTask: async () => {
    myTasks = await Task.find();

    mongoose.connection.close();
    
    return myTasks;
  }
};
