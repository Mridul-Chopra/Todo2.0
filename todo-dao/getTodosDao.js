/* requiring all the dependencies of the module */
const mysql = require('mysql');
const pool = require('./pool');

/* export as a function */
module.exports = (data)=>{

    let id = data.id; // get id of the user from the data

    return new Promise((resolve,reject)=>{

        pool.getConnection((err,connection)=>{

            let query = "Select * from todo where id = ?";
            connection.query(query,[id],(err,result)=>{
                if(err){
                    console.log(err); // logging the error 
                    connection.release(); //  release the connection 
                    reject(); // reject the promise
                }

                let queryResult = JSON.stringify(result[0]);
                if(typeof queryResult === 'undefined'){
                    resolve('No todos found'); // resolve false if no data found
                }else{
                    resolve(queryResult); // resolve the error
                }        
            });
        });
    });
}