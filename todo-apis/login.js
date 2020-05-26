/* requiring all the dependencies in the module */
const checkLogin = require('../todo-dao/loginDao');
const jwtUtils = require('../todo-utils/jwtUtils');
const bodyParser = require('body-parser');

/* body parser is ready to use */ 
const urlEncodedParser = bodyParser.urlencoded({extended:false});

/*export this function to be used by other modules */
module.exports = (app)=>{
     
    /* handles post request for /login url */
    app.post('/login',urlEncodedParser,async (req,res)=>{

        let data = JSON.parse(JSON.stringify(req.body)); // formatting the data in json format
        console.log(req);
        let status = await checkLogin(data); // calling the dao layer and getting the status
        if(!status){ // if true 
            res.json('Wrong details'); // send on unsuccessful login 
        }else{
            
            let data = JSON.parse(status); // converting the received data in json format
            
            /* getting the user details from the data */
            let firstName = data.first_name;
            let lastName = data.last_name;
            let email = data.email;
            let id = data.id;
            let fullName = firstName +" "+ lastName;

            let payload = {id:id , firstName:firstName , lastName:lastName , email:email}; // preparing payload for jwt token 
            let token = await jwtUtils.getJwtToken(payload); // getting the jwt token

            let clientPayload = {name:fullName , token:token}; //payload to be sent to client
            res.json(clientPayload); // sending response to the client side

        }
    });

}