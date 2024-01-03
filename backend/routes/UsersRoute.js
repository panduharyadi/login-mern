const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/UsersController')
const { verifyUser, adminOnly } = require('../middleware/AuthUser')
const router = express.Router()

router.get('/users', verifyUser, adminOnly, getUsers)
router.get('/user/:id', verifyUser, adminOnly, getUserById)
router.post('/user/add', verifyUser, adminOnly, createUser)
router.patch('/user/:id', verifyUser, adminOnly, updateUser)
router.delete('/user/:id', verifyUser, adminOnly, deleteUser)

module.exports = router