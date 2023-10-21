const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

async function getAllData() {
    const [rows] = await pool.query("SELECT * FROM sqlsandboxdatabase");
    return rows;
}

async function getSpecificData(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM sqlsandboxdatabase
    WHERE id = ${id}
    `)
    return rows
}

async function createData(submittedData) {
    const [result] = await pool.query(`
    INSERT INTO sqlsandboxdatabase (submittedData)
    VALUES (?)
    `, [submittedData])
    return result
}

module.exports = {
    getAllData,
    getSpecificData,
    createData
};

