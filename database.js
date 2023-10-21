const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'sqlSandbox',
    database: 'sqlsandbox',
}).promise()

async function getAllData() {
    const [rows] = await pool.query("SELECT * FROM sqlsandboxdatabase");
    return rows;
}

async function main() {
    const SQLSandboxDatabase = await getAllData();
    console.log(SQLSandboxDatabase);
}

main().catch((error) => {
    console.error(error);
});