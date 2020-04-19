const mysql = require('mysql')


const connect = mysql.createConnection({
    host: 'localhost',
    user: 'andrey',
    password: 'andrey13',
    database: 'nodejs'
})

module.exports.connect = connect