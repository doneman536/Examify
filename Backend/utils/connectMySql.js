import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Kaif786786@',
    database : 'Examify',
    waitForConnections: true
});

export default pool;