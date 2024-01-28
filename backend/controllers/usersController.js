const Users = require('../models/userModel');

//create user
exports.createUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await Users.create({
            name,
            email,
            password,
            role
        });
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


//show users
exports.showUsers = async (req, res, next) => {
    try {
        const users = await Users.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            users
        })
    } catch (error) {
        next(error);
    }
}


//show single user
exports.showSingleUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }

}


//delete user
exports.deleteUser = async (req, res, next) => {
    const currentUser = await Users.findById(req.params.id);

    try {
        const user = await Users.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })

    } catch (error) {
        next(error);
    }

}


//update user
exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const currentUser = await Users.findById(req.params.id);

        //build the object data
        const data = {
            name: name || currentUser.name,
            email: email || currentUser.email,
            password: password || currentUser.password,
            role: role || currentUser.role,
        }

        const userUpdate = await Users.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            userUpdate
        })

    } catch (error) {
        next(error);
    }
}
