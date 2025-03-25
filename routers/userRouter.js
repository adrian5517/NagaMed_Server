const express = require('express')
const router = express.Router();
const {readById , readUser , createUser , deleteUser , updateUser} = require('../controllers/userController')

// Read all users
router.get('/', readUser);

// Create user
router.post('/', createUser );

// Read user by ID
router.get('/:id', readById );

// Update user by ID
router.put('/:id', updateUser );

// Delete user by ID
router.delete('/:id', deleteUser );

module.exports = router


