const program = require("commander");
const { prompt } = require("inquirer");

const {
  addTask,
  findTask,
  findByStatus,
  updateTask,
  allTask,
  removeTask,
  deleteAllTasks
} = require("./Tasks/functionalities");

// Task Questions
const AddTaskQuestions = [
  { type: "input", name: "task", message: "Enter task title..." },
];
const FindTaskQuestions = [
  { type: "input", name: "task", message: "Enter task title to search..." },
];

program.version("1.0.0").description("CLI todo application");

// Task CRUD
program
  .command("add-task")
  .alias("add")
  .description("Add a task")
  .action(() => {
    prompt(AddTaskQuestions).then((answers) => {
      const myTask = {
        task: answers.task,
        isCompleted: false,
      };

      addTask(myTask);
    });
  });

program
  .command("find-task")
  .alias("find")
  .description("Find task by title")
  .action(() => {
    prompt(FindTaskQuestions).then((answers) => findTask(answers));
  });

program
  .command("find-by-status <status>")
  .alias("f-status")
  .description("List the tasks by status")
  .action((status) => findByStatus(status));

program
  .command("update-task <_id>")
  .alias("update")
  .description("Update a task")
  .action((_id) => {
    prompt(AddTaskQuestions).then((answers) => updateTask(_id, answers));
  });

program
  .command("list-all")
  .alias("list")
  .description("List all the tasks")
  .action(() => allTask());

program
  .command("remove-task <_id>")
  .alias("remove")
  .description("Remove a task")
  .action((_id) => removeTask(_id));

program
  .command("delete-all")
  .alias("delete")
  .description("Delete all task")
  .action(() => deleteAllTasks());
program.parse(process.argv);
