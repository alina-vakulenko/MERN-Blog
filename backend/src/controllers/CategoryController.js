import CategoryModel from "../models/Category.js";

export const create = async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ message: "Category name is required" });

  try {
    const newCategory = await CategoryModel.create({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
    });
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create a category",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories)
      return res.status(204).json({ message: "No categories found" });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load categories",
    });
  }
};

export const getOne = async (req, res) => {
  if (!req.params.slug)
    return res.status(400).json({ message: "Category slug is required" });

  try {
    const categorySlug = req.params.slug;
    const category = await CategoryModel.findOne({ slug: categorySlug }).exec();

    if (!category) {
      return res.status(404).json({
        message: "Category was not found",
      });
    }

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to find the category",
    });
  }
};

export const update = async (req, res) => {
  if (!req.params.slug)
    return res.status(400).json({ message: "Category slug is required" });
  try {
    const categorySlug = req.params.slug;
    const category = await CategoryModel.findOne({ slug: categorySlug }).exec();

    if (!category) {
      return res.status(404).json({
        message: "Category was not found",
      });
    }

    const updateResult = await CategoryModel.updateOne(
      {
        slug: categorySlug,
      },
      {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
      }
    );

    if (updateResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to update category",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update category",
    });
  }
};

export const remove = async (req, res) => {
  if (!req.params.slug)
    return res.status(400).json({ message: "Category slug is required" });
  try {
    const categorySlug = req.params.slug;
    const category = await CategoryModel.findOne({ slug: categorySlug }).exec();

    if (!category) {
      return res.status(404).json({
        message: "Category was not found",
      });
    }

    const deleteResult = await CategoryModel.deleteOne({
      slug: categorySlug,
    });

    if (deleteResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to delete the category",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete the category",
    });
  }
};
