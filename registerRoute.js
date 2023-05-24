const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/register.js');

//Register Route
router.get('/', ctrl.getData);
router.post('/', ctrl.postData);
module.exports = router;