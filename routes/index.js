const express = require('express');
const router = express.Router();
const { connect } = require('../connect.js')

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

/* GET home page. */
router.get('/', async function (req, res, next) {
  connect.query('SELECT * FROM tasks', function (err, rows, fields) {
    if (err) throw err
    res.render('index', { title: 'Главная', tasks: rows });
  })
});


module.exports = router;
