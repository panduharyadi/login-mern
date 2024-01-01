const UserModel = require('../models/UsersModel')
const argon2 = require('argon2')

const Login = async(req, res) => {
    const user = await UserModel.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!user) {
        return res.status(404).json({
            msg: "User not found!"
        })
    }
    const match = await argon2.verify(user.password, req.body.password)
    if(!match) {
        return res.status(400).json({
            msg: "Wrong password!"
        })
    }
    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const role = user.role
    res.status(200).json({uuid, name, email, role})
}

const Me = async(req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Please login to your account"})
    }
    const user = await UserModel.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) {
        return res.status(404).json({
            msg: "User not found!"
        })
    }
    res.status(200).json(user)
}

const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(400).json({msg: "Cannot Logout!"})
        }
        res.status(200).json({msg: "You're logouted"})
    })
}

module.exports = { Login, Me, Logout }