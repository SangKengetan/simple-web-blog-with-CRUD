const Categories = require('../models/categoryModel');
const Post = require('../models/postModel');
const main = require('../app');

//create category
exports.createCategory = async (req, res, next) => {
    const { name, description, createdBy } = req.body;
    try {
        const category = await Categories.create({
            name,
            description,
            createdBy: req.user._id,
        });
        res.status(201).json({
            success: true,
            category
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


//show categories
exports.showCategories = async (req, res, next) => {
    try {
        const categories = await Categories.find().sort({ createdAt: -1 }).populate('createdBy', 'name');
        const ctg = await Post.aggregate([
            {
              $group: {
                _id: "$category", count: { $sum: 1}
              }
            }
          ])
        res.status(201).json({
            success: true,
            categories,
            ctg
        })
    } catch (error) {
        next(error);
    }
}


//show single category
exports.showSingleCategory = async (req, res, next) => {
    try {
        const category = await Categories.findById(req.params.id);
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        next(error);
    }

}


//delete category
exports.deleteCategory = async (req, res, next) => {
    const currentCategory = await Categories.findById(req.params.id);

    try {
        const category = await Categories.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "category deleted"
        })

    } catch (error) {
        next(error);
    }

}


//update user
exports.updateCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const currentCategory = await Categories.findById(req.params.id);

        //build the object data
        const data = {
            name: name || currentCategory.name,
            description: description || currentCategory.description
        }

        const categoryUpdate = await Categories.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            categoryUpdate
        })

    } catch (error) {
        next(error);
    }
}
