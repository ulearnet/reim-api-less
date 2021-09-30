const mysql = require('mysql');

const pool2 = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    port: process.env.BD_PORT,
    database: 'ulearnet_reim_pilotaje',
    connectionLimit: 1,
    idleTimeout:1
})

const pool = require('serverless-mysql')({
    config: {
        host     : process.env.BD_HOST,
        database: 'ulearnet_reim_pilotaje',
        user     : process.env.BD_USER,
        password : process.env.BD_PASSWORD,
        port: process.env.BD_PORT,
    }
})

module.exports= {pool}
