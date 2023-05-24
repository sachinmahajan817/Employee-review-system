const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/admin');
const isAuthenticated = require('../middlewares/auth');
const ctrl = require('../controllers/admin');

//Admin Router
router.route('/').post(ctrl.makeAdmin);
router.route('/').all([isAuthenticated, adminAuth]).get(ctrl.getData);
router.route('/delete/:id').get(ctrl.deleteEmployee);
router.route('/assign').post(ctrl.assignReview);
router.route('/view/:id').get(ctrl.getEmployeeDetails);


module.exports = router;