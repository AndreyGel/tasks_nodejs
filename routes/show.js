const express = require('express');
const router = express.Router();
const mysql = require('mysql')


const connect = mysql.createConnection({
  host: 'localhost',
  user: 'andrey',
  password: 'andrey13',
  database: 'nodejs'
})

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

/* GET home page. */
router.get('/:id', async function (req, res, next) {
  connect.query(`SELECT * FROM tasks WHERE id = ${req.params.id}`, function (err, rows, fields) {
    if (err) throw err
    res.render('show', { title: 'Задача', task: rows[0] });
  })
});





module.exports = router;
