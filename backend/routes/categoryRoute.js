const express = require('express');
const router = express.Router();
const { createCategory, showCategories, showSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

//category management routes
router.get('/categories/show', showCategories);
router.post('/category/create', isAuthenticated, isAdmin, createCategory);
router.get('/category/:id', showSingleCategory);
router.put('/update/category/:id', isAuthenticated, isAdmin, updateCategory);
router.delete('/delete/category/:id', isAuthenticated, isAdmin, deleteCategory);

module.exports = router;