import ProductModel from "../models/Product.js";

export const create = async (req, res) => {
  const { category, title, price, description, images } = req.body;
  if (!category || !title || !price)
    return res
      .status(400)
      .json({ message: "Tile, price and category are required" });
  try {
    const newProduct = await ProductModel.create({
      category: req.body.category,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images,
    });
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create a product",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products)
      return res.status(204).json({ message: "No products found" });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load products",
    });
  }
};

export const getOne = async (req, res) => {
  if (req.params.id)
    return res.status(400).json({ message: "Product ID is required" });
  try {
    const productId = req.params.id;
    const product = await ProductModel.findOnebyId(productId).exec();

    if (!product) {
      return res.status(404).json({
        message: "Product was not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load the product",
    });
  }
};

export const update = async (req, res) => {
  if (req.params.id)
    return res.status(400).json({ message: "Product ID is required" });
  try {
    const productId = req.params.id;
    const product = await ProductModel.findOnebyId(productId).exec();

    if (!product) {
      return res.status(404).json({
        message: "Product was not found",
      });
    }

    const updateResult = await ProductModel.updateOne(
      {
        _id: productId,
      },
      {
        category: req.body.category,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images,
      }
    );

    if (updateResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to update product",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const remove = async (req, res) => {
  if (req.params.id)
    return res.status(400).json({ message: "Product ID is required" });
  try {
    const productId = req.params.id;
    const product = await ProductModel.findOnebyId(productId).exec();

    if (!product) {
      return res.status(404).json({
        message: "Product was not found",
      });
    }

    const deleteResult = await ProductModel.deleteOne({
      _id: productId,
    });

    if (deleteResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to delete the product",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete the product",
    });
  }
};
