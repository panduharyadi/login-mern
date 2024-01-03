const UserModel = require('../models/UsersModel')

const verifyUser = async(req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Please login to your account"})
    }
    const user = await UserModel.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) {
        return res.status(404).json({
            msg: "User not found!"
        })
    }
    req.userId = user.id
    req.role = user.role
    next()
}

const adminOnly = async(req, res, next) => {
    const user = await UserModel.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) {
        return res.status(404).json({
            msg: "User not found!"
        })
    }
    if(user.role !== 'admin') {
        return res.status(403).json({msg: "Sorry you dont have accsess"})
    }
    next()
}

module.exports = { verifyUser, adminOnly }