/* require all the dependencies for the module */
const mysql = require('mysql');
const pool = require('./pool');

/* export this as function to be used by other modules */
module.exports = (data)=>{

    let email = data.email;  // get email from the data
    let password = data.password; // get password from the data 

    return new Promise((resolve,reject)=>{

        pool.getConnection((err,connection)=>{  // getting  connection from the connection pool

            if(err){  
                console.log(err);  // log the error in the console
                connection.release(); // release the connection 
                reject(); // reject the promise
            }
            
            let query = "Select * from users where email = ? and password = ?"; // query to be executed
            connection.query(query,[email,password],(err,result)=>{   // executing the sql query
                if(err){
                    console.log(err);          // log the error in console
                    connection.release();      // release the connection to the pool
                    reject();                 // reject the promise
                }

                let queryResult = JSON.stringify(result[0]);  // get the result in correct format 

                if(typeof queryResult === 'undefined'){ // if nothing is found in the database 
                    resolve(false); // resolve false
                }else{
                    resolve(queryResult);  // resolve true
                }

            });
            
        });
    });
}