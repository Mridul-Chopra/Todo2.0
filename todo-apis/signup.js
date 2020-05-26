/*
    Require all the dependencies for the module
 */
const bodyParser = require('body-parser');
const signup = require('../todo-dao/signupDao');

/* Body parser is ready to use */
const urlEncodedParser = bodyParser.urlencoded({extended:false});

/* export the following as a function */
module.exports = (app)=>{
    
    /* handles post request for /signup url */
    app.post('/signup',urlEncodedParser , async (req,res)=>{

        let data = JSON.parse(JSON.stringify(req.body)); // convert the data into proper json format
        
        let status = await signup(data); // get status from dao for signup
        res.json({status:status}); // send status as response to the client in json format
    });
}