

const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');


router.post('/user', usercontroller.addUser);
router.get('/all',usercontroller.getUsers);
router.delete('/:id',usercontroller.deleteUser);

module.exports = router;
