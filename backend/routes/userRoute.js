const express = require('express');
const router = express.Router();
const { createUser, showUsers, showSingleUser, updateUser, deleteUser } = require('../controllers/usersController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

//user management routes
router.get('/users/show', showUsers);
router.post('/user/create', isAuthenticated, isAdmin, createUser);
router.get('/user/:id', showSingleUser);
router.put('/update/user/:id', isAuthenticated, isAdmin, updateUser);
router.delete('/delete/user/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router;