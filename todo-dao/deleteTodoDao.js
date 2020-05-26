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

            let query = 'Delete from todo where id = ? and todo = ?'; // query to execute
            let values = [id,todo]; // values for sql query

            connection.query(query,values,(err)=>{  // executing the query

                if(err){
                    console.log(err); // logging the error 
                    connection.release(); // release the connection 
                    reject(); // reject the promise 
                }

                connection.release(); // release the connection 
                resolve(); // resolve the promise
            });
        });
    });
}