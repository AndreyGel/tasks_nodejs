const express = require('express');
const router = express.Router();
const { connect } = require('../connect.js')

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

/* GET */
router.get('/:id', async function (req, res, next) {
  connect.query(`SELECT * FROM tasks WHERE id = ${connect.escape(req.params.id)}`, function (err, rows, fields) {
    if (err) throw err
    if (rows == false) {
      res.redirect('/')
    } else {
      res.render('edit', { title: 'Редактировать', task: rows[0] });
    }
  })
});

/* POST */
router.post('/:id', async function (req, res, next) {
  const title = req.body.title
  const description = req.body.description
  connect.query(`UPDATE tasks SET title = '${connect.format(title)}', description = '${connect.format(description)}' WHERE id = ${connect.format(req.params.id)}`, function (err, rows, fields) {
    if (err) throw err
    res.redirect(`/`);
  })
});




module.exports = router;
