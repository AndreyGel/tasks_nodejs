const express = require('express');
const multer = require("multer");
const router = express.Router();
const { connect } = require('../connect.js')

const upload = multer({ dest: "public/images" });

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('create', { title: 'Создать' });
});

/* POST home page. */
router.post('/', upload.single("filedata"), async function (req, res, next) {
  const title = req.body.title
  const description = req.body.description
  const filePath = req.file ? 'images/' + req.file.filename : null
  connect.query(`INSERT INTO tasks (title, description, file_path) VALUES (${connect.escape(title)}, ${connect.escape(description)}, ${connect.escape(filePath)})`,
    function (err, rows, fields) {
      if (err) throw err
      res.redirect('/');
    })
});





module.exports = router;
