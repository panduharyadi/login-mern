const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/UsersController')
const router = express.Router()

router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/user/add', createUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router