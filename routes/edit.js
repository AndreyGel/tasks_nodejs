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

/* GET */
router.get('/:id', async function (req, res, next) {
  connect.query(`SELECT * FROM tasks WHERE id = ${req.params.id}`, function (err, rows, fields) {
    if (err) throw err
    res.render('edit', { title: 'Редактировать', task: rows[0] });
  })
});

/* POST */
router.post('/:id', async function (req, res, next) {
  const title = req.body.title
  const description = req.body.description
  connect.query(`UPDATE tasks SET title = '${title}', description = '${description}' WHERE id = ${req.params.id}`, function (err, rows, fields) {
    if (err) throw err
    res.redirect(`/`);
  })
});




module.exports = router;
