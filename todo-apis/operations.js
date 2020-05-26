/*  Requiring all the dependencies for the module */
const bodyParser = require('body-parser');
const jwt = require('../todo-utils/jwtUtils');
const getTodos = require('../todo-dao/getTodosDao');
const addTodo = require('../todo-dao/addTodoDao');
const deleteTodo = require('../todo-dao/deleteTodoDao');

/* body parser ready to use */
const urlEncodedParser = bodyParser.urlencoded({extended:false});

/* export it in the form of function */
module.exports = (app)=>{

    /* post request to handle /getTodos */
    app.post('/getTodos',urlEncodedParser,jwt.extractToken,async (req,res)=>{
        
       let status =  await jwt.verifyToken(req.token); // verify token given by client
       
       if(!status){
            res.sendStatus(403);;  // if wrong details or token present 
       }else{
           let todos = await getTodos(status); // getting the todos
           res.json(todos); // send todos as response to the client
       }  
    });

    /* post request to handle /addTodo */
    app.post('/addTodo',urlEncodedParser,jwt.extractToken , async (req,res)=>{

        let status = await jwt.verifyToken(req.token); // verify the jwt token sent by client

        if(!status){
            res.sendStatus(403); // if invalid token is sent return false
        }else{
            let todo = req.body.todo; // get todo sent by client
            let id = status.id; // get id of the client

            console.log(todo,id);

            await addTodo(id,todo); // add todo to the db
            res.json({success:true}); // send to the client if it 
        }
    });

    app.post('/doneTodo',urlEncodedParser,jwt.extractToken, async (req,res) =>{

        let status = await jwt.verifyToken(req.token); // get the jwt token sent by the client

        if(!status){
            res.sendStatus(403); // if invalid token then send forbidden status
        }else{
            let todo = req.body.todo; //  get todo from the req body
            let id = status.id; // get id of the user

            await deleteTodo(id,todo); // delete the todo
            res.json({success:true}); // send the deletion status
        }
    });
    app.get('/test',(req,res)=>{
        res.render('test');
    });

}