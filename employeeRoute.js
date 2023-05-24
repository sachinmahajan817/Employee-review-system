const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const ctrl = require('../controllers/employee');
const notAdmin = require('../middlewares/notAdmin');
const router = express.Router();

//Employee Router
router.route('/').all([isAuthenticated, notAdmin]).get(ctrl.getData);

module.exports = router;