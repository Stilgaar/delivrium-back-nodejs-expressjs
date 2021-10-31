const express = require('express');
const router = express.Router();
const users = require('../controlleurs/users')

// Routes pour la collection USERS

/* GET users listing. */
router.post('/', users.treatForm )

router.get('/', function (req, res, next) {
  res.send('merci') })

router.post('/login', users.treatLogin )

// je l'ai rajouté sur cette route mais ya le
// treatuserId qui doit gener

router.get('/info', users.checkToken)

router.get('/all', users.getUsers)

router.patch('/softban', users.userBan)

router.patch('/admin', users.admin)

module.exports = router;
