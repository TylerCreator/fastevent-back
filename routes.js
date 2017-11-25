var express = require('express');
var router = express.Router();
var fs = require('fs');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send(' home page');
});

router.get('/file', (req, res) => {
  fs.readFile('test.png', (err, data) => {
    res.type('png');
    res.send(data);
  });
});

module.exports = router;