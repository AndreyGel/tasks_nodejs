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
router.get('/', async function (req, res, next) {
  res.render('create', { title: 'Создать' });
});

/* POST home page. */
router.post('/', async function (req, res, next) {
  const title = req.body.title
  const description = req.body.description
  connect.query(`INSERT INTO tasks (title, description) VALUES ('${title}', '${description}')`, function (err, rows, fields) {
    if (err) throw err
    res.redirect('/');
  })
});





module.exports = router;
