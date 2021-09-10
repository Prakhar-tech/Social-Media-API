const Post = require("../models/post");

exports.create = async (req, res) => {
  const user = req.user;

  const newPost = new Post(req.body);
  newPost.createdBy = user._id;
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy")
      .populate({
        path: "comments",
        populate: {
          path: "sentBy",
          model: "User",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "liked",
          model: "User",
        },
      });
    if (posts.length == 0) {
      return res.status(400).send("No Post");
    }

    res.send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.update = async (req, res) => {
  const user = req.user;
  const message = req.body.message;

  try {
    const post = await Post.findById(req.params.id);
    if (JSON.stringify(post.createdBy) === JSON.stringify(user._id)) {
      post.message = message;
      if (req.body.comment) {
        const comment = req.body.comment;
        post.comments.push({
          sentBy: user._id,
          comment: comment,
          liked: user._id,
        });
      }
      post.save();
      res.status(200).json({
        message: "Comment Have Been Posten",
        post,
      });
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a post

exports.del = async (req, res) => {
  const user = req.user;

  try {
    const post = await Post.findById(req.params.id);
    console.log(post.createdBy);
    console.log(user._id);

    if (JSON.stringify(post.createdBy) === JSON.stringify(user._id)) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
