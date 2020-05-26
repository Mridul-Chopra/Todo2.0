/* requring all the dependencies for the module */
const mysql = require('mysql');
const pool = require('./pool');

module.exports = (id,todo)=>{

    return new Promise((resolve,reject)=>{

        pool.getConnection((err,connection)=>{

            if(err){
                console.log(err); // logging the error
                connection.release(); // releasing the connection 
                reject(); // reject the promise
            }

            let query = 'Insert into todo values ?'; // query to execute
            let values = [  [id,todo]  ]; // values for sql query

            connection.query(query,[values],(err)=>{  // executing the query

                if(err){
                    if(err.code === 'ER_DUP_ENTRY'){
                        resolve(); // if duplicate entry resolve true as already entered
                    }else{
                        console.log(err); // logging the error 
                        connection.release(); // release the connection 
                        reject(); // reject the promise 
                    }
                }

                connection.release(); // release the connection 
                resolve(); // resolve to true 
            });
        });
    });
}