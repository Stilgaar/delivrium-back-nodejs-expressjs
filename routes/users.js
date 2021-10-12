var express = require('express');
var router = express.Router();
const users = require('../controlleurs/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', users.treatForm, function (req, res, next) {
  res.send('ok')
})

router.get('/users', function (req, res, next) {
  res.send('merci')
})

module.exports = router;
