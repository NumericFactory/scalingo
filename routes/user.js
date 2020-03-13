const express = require('express');
const router = express.Router();
// Controller
const userCtrl = require('../controllers/userCtrl');
// Middleware
const authmiddleware = require('../middlewares/auth');

/*
 ROUTES PUBLIC
*/
router.get('/', userCtrl.getUsers);
router.post('/signup', userCtrl.signup);
router.post('/add', userCtrl.add);

router.get('/:id', userCtrl.getUser);
router.patch('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

router.post('/apikeybeds24', userCtrl.addApikeyBeds24)


// api beds24
router.get('/:id/beds24/getProperties', userCtrl.apibeds24GetProperties);


module.exports = router;