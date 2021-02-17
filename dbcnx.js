const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    port: process.env.BD_PORT,
    database: 'ulearnet_reim_pruebas'
})

module.exports= {pool}
