var express = require('express');
var router = express.Router();
const users = require('../controlleurs/users')


/* GET users listing. */

router.post('/', users.treatForm )


router.get('/', function (req, res, next) {
  res.send('merci')
  console.log("coucou c'est nous")
})

router.get('/login', users.treatLogin )
{console.log("ca marche login")}

router.get('/id', users.treatUserId )
{console.log("ca marche pour Id")}

module.exports = router;
