/*
    Require all the dependencies for the app
*/
const express = require('express'); 
const env = require('dotenv');

/*
    configuring the environment variables
 */
env.config(); // configuring the environement
const app = express(); // start using the express

/*
    requiring all the apis in the app
*/
const signup = require('./todo-apis/signup');
const login = require('./todo-apis/login');
const operations = require('./todo-apis/operations');

/*
Getting the apis ready
*/
signup(app);
login(app);
operations(app);

app.listen(5000, ()=>console.log('App Started at port 5000')); // listening to port 5000

app.set('view engine','ejs');