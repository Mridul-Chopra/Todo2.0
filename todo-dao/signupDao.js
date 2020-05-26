const mysql = require('mysql');
const pool = require('./pool');



module.exports = (data)=>{

    let email = data.email;
    let password = data.password;
    let first_name = data.first_name;
    let last_name= data.last_name;

    return new Promise((resolve,reject)=>{
                
        pool.getConnection((err,connection)=>{

            let status = "Sign up successful"; // status of the signup action
            if(err){
                throw err;
                connection.release(); // release the connection to the pool
                reject(); // reject if error
            }

            let query = 'Insert into users (email,first_name,last_name,password) values ?';
            let values = [ [email,first_name,last_name,password] ]; // values for the sql query

            connection.query(query,[values],(err)=>{ // executing the sql query
                if(err){
                    if(err.code === 'ER_DUP_ENTRY' ){
                        status =  "Email already in use. Please try with another one"; // update the status
                    }else{
                        throw err;
                        connection.release();  // release connection to the pool
                        reject(); // reject the promise because of error
                    }
                }

                connection.release(); // release connection to the pool
                resolve(status); // resolve the status for the sign up 
            });
            
        });
    });
}






