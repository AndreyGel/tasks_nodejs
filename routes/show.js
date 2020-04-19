const express = require('express');
const router = express.Router();
const { connect } = require('../connect.js')

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

/* GET home page. */
router.get('/:id', async function (req, res, next) {
  connect.query(`SELECT * FROM tasks WHERE id = ${connect.escape(req.params.id)}`, function (err, rows, fields) {
    if (err) throw err
    res.render('show', { title: 'Задача', task: rows[0] });
  })
});





module.exports = router;
