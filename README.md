# mytask-CLI 
- add your task using command line interface
- send an email using command line interface

### Walk through 
- Initilize node project `npm init`
- Add required packages `$ yarn add commander inquirer mongoose nodemailer dotenv`
- Add `index.js` which includes all the methods to add your task and send email 
  - Establish a database connection and functionalities to perform CRUD on your task
  - Setup the nodemailer and a function to send an email
- Create a `command.js` file to include the command to execute using cli
- Configure the `package.json` file 
```javascript
"preferGlobal": true,
"bin": "./command.js",
```
- Create a simlink using command `npm link`  
and simply unlink using command `npm unlink`
- After you link you can simply call your app using your application name `mytask`