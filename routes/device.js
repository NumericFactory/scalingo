const express = require('express');
const router = express.Router();
// Controller
const deviceCtrl = require('../controllers/deviceCtrl');
// Middleware
const authmiddleware = require('../middlewares/auth');

/*
 ROUTES PUBLIC
*/
router.get('/welock/purchased', deviceCtrl.wl_getPurchasedDevices);
router.get('/welock/activate', deviceCtrl.wl_getActivatedDevices);
router.get('/welock/activate/:deviceId', deviceCtrl.wl_activateDevice);
router.post('/welock/generateCode', deviceCtrl.wl_generateAccessCode);

module.exports = router;