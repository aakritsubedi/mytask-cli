const program = require("commander");
const { prompt } = require("inquirer");

const {
  addTask,
  findTask,
  findByStatus,
  updateTask,
  allTask,
  removeTask,
  deleteAllTasks,
} = require("./Tasks/functionalities");

const { sendEmail, sendMyTask } = require("./Email/email");

// Task Questions
const AddTaskQuestions = [
  { type: "input", name: "task", message: "Enter task title..." },
];
const FindTaskQuestions = [
  { type: "input", name: "task", message: "Enter task title to search..." },
];
// Email Questions
const emailQuestions = [
  { type: "input", name: "firstname", message: "Enter receiver firstname" },
  { type: "input", name: "lastname", message: "Enter receiver lastname" },
  { type: "input", name: "subject", message: "Enter email subject" },
  { type: "input", name: "email", message: "Enter receiver email" },
  { type: "input", name: "message", message: "Enter message" },
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

// Send Email
program
  .command("send-email")
  .alias("mail")
  .description("Send an email")
  .action(() => {
    prompt(emailQuestions).then((answers) => sendEmail(answers));
  });

program
  .command("mail-my-task <email>")
  .alias("send-task")
  .description("Send all my task")
  .action((email) => sendMyTask(email));

program.parse(process.argv);
