const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const ctrl = require('../controllers/review');
const router = express.Router();

//Review Router
router.route('/').all(isAuthenticated).post(ctrl.postData);
router.route('/').get(ctrl.getData);
module.exports = router;