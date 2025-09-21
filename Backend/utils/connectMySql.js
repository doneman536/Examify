import mysql from "mysql2";

const pool1 = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Kaif786786@',
    database : 'Examify',
    waitForConnections: true
});

export default pool1.promise();