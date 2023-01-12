const mysql = require('mysql');

const connection  = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'demo-2'
})

connection.connect((err)=>{
    if (err) {
        console.log("database not connected");
    } else {
        console.log("Database Connected....");
    }
})

module.exports = connection;