import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create a post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({ path: "user", select: ["name"] })
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const filter = { _id: postId };
    const update = { $inc: { viewsCount: 1 } };
    const post = await PostModel.findOneAndUpdate(filter, update, {
      new: true,
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Failed to load the post",
      });
    });

    if (!post) {
      return res.status(404).json({
        message: "Post was not found",
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load the post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOne({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: "Post was not found",
      });
    }

    if (req.userId !== post.user._id.valueOf()) {
      return res.status(403).json({
        message: "Only author can remove a post",
      });
    }

    const deleteResult = await PostModel.deleteOne({
      _id: postId,
    });

    if (deleteResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to remove the post",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove the post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOne({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: "Post was not found",
      });
    }

    if (req.userId !== post.user._id.valueOf()) {
      return res.status(403).json({
        message: "Only author can edit a post",
      });
    }

    const updateResult = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    if (updateResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to edit the post",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to edit the post",
    });
  }
};
