const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

const { emailTask } = require('./../Tasks/functionalities');

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
});

// Get Email Option
const getMailOption = ({to, name, subject, message}) => {
  return {
    from: '"Task CLI" <your-task@taskcli.org.np>',
    to: to,
    subject: subject,
    text: `Hey ${message}`,
    html:
      '<div style="height: 75px; width: 100%; background-color: #2e2e2e; line-height: 75px; color: #fff; text-align: center; margin-bottom: 25px;">' +
      "<h1> Task CLI </h1>" +
      "</div>" +
      '<div style="padding: 0 16px;">' +
      `<span>Hi ${name} 👋</span>` +
      message +
      `<span style='display: block;'>Best regards,</span>` +
      `<span style='display: block;'>${`Task CLI`}</span>` +
      `<span style='display: block;'>${`noreply@taskcli.com`}</span>` +
      '<div style=" width: 100%; margin-top: 10px;">' +
      `<span style='display: block;'>BCT Notes</span>` +
      '<span style="display: block;"><b>Address:</b> Kathmandu, Nepal </span>' +
      `<span style='display: block;'><b>Website:</b> <a href='http://www.aakritsubedi9.com.np'>http://www.aakritsubedi9.com.np</a></span>` +
      "</div>" +
      "</div>" +
      '<div style="height: 30px;width: 100%;background-color: #2e2e2e;color: #fff;padding: 0 16px;margin-top: 25px; line-height:30px;">' +
      '<span style="display: block;">Copyright © Task CLI , All rights reserved.</span>' +
      "<div>",
  };
};

// Send Email
const sendEmail = ({ firstname, lastname, subject, email, message }) => {
  const emailInfo = {
    to: email,
    name: firstname + " " + lastname,
    subject: subject,
    message: message,
  };

  const mailOptions = getMailOption(emailInfo);
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message send successfully", info);
  });
};

const sendMyTask = async (email) => {
  let myTasks = await emailTask();
  let myTasksList = '<ul>';
  myTasksList += myTasks.map(task => `<li>${task.task}</li>`);

  myTasksList += '</ul>';
  const emailInfo = {
    to: email,
    name: email,
    subject: 'All your tasks',
    message: myTasksList
  };

  const mailOptions = getMailOption(emailInfo);
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message send successfully", info);
  });
}

module.exports = {
  sendEmail,
  sendMyTask
};