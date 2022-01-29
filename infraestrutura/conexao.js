const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'admin',
    database: 'petshop'
})

module.exports = conn