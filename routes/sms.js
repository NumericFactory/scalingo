const express = require('express');
const router = express.Router();
// Controller
const smsCtrl = require('../controllers/smsCtrl');
// Middleware
const authmiddleware = require('../middlewares/auth');

/*
 ROUTES PUBLIC
*/
router.post('/', smsCtrl.send);


module.exports = router;