const UserModel = require('../models/UsersModel')
const argon2 = require('argon2');
const { use } = require('../routes/UsersRoute');

const getUsers = async (req, res) => {
    try {
        const response = await UserModel.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getUserById = async(req, res) => {
    try {
        const response = await UserModel.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        if(!response) {
            return res.status(404).json({msg: "User not found"})
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createUser = async(req, res) => {
    const {name, email, password, confPassword, role} = req.body

    if(password !== confPassword) {
        return res.status(400).json({msg: "Please correct your password, Password must tobe same"})
    }
    const hashPassword = await argon2.hash(password)
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({msg: "Register Success"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const updateUser = async(req, res) => {
    const user = await UserModel.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) {
        return res.status(404).json({msg: "User not found!"})
    }
    const { name, email, password, confPassword, role } = req.body
    let hashPassword
    if(password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)
    }
    if(password !== confPassword) {
        return res.status(400).json({msg: "Please correct your password, Password must tobe same"})
    }
    try {
        await UserModel.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "User updated!"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const deleteUser = async(req, res) => {
    const user = await UserModel.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) {
        return res.status(404).json({msg: "User not found!"})
    }
    try {
        await UserModel.destroy({
            where: {
                uuid: user.uuid
            }
        })
        res.status(200).json({msg: "User deleted!"})
    } catch (error) {
        console.error("eror nih", error)
        res.status(400).json({msg: error.message})
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser }