/* requiring all the dependencies for the module */
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

let SECRET_KEY = process.env.SECRET_KEY; // getting the secret key from the environment variables

function extractToken(req,res,next){

    let data = JSON.parse(JSON.stringify(req.body)); // getting all the data from the request body
   
    let bearerHeader = data.authorization; // get the authorization header

    if(typeof bearerHeader != 'undefined'){  // if authorization header is present 

        let bearer = bearerHeader.split(' '); // split the header with spaces
        let bearerToken = bearer[1]; // get token from the split array
        req.token = bearerToken; //  set token in the request parameter
        next(); // call the next middleware
    }else{
        res.sendStatus(403); // send forbidden if failed to send the token
    }
}

function getJwtToken(data){

    return new Promise((resolve,reject)=>{
        jwt.sign(data,SECRET_KEY,(err,token)=>{
            resolve(token); // finally resolve 
        });
    }); 
}


function verifyToken(token){

    return new Promise((resolve,reject)=>{
        // call the jwt verify to verify the token
        jwt.verify(token,SECRET_KEY,(err,authData)=>{
            if(err){
                resolve(false); // if there is error return false
            }else{ 
                resolve(jwtDecode(token)); // return the details in jwt token
            }
        });
    });
}

module.exports ={
    extractToken : extractToken,
    getJwtToken  : getJwtToken,
    verifyToken  : verifyToken
}