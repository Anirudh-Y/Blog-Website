import Post from "../model/post.js";

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();

    return res.status(200).json("Post saved successfully");
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getAllPosts = async (req, res) => {
  let category = req.query.category;
  try {
    let posts = {};
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    if (!posts) {
      return res.status(401).json({ error: "Something wrong" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    return res.status(200).json(post);

  } catch (error) {
    return res.status(500).json({msg: error});
  }
}

export const updatePost = async (req,res) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id);

    if(!post){
      return res.status(404).json({msg: 'Post not found'})
    }

    await Post.findByIdAndUpdate(id, {$set: req.body})

    return res.status(200).json({msg: 'Post updated successfully'});

  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
}

export const deletePost = async (req,res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if(!post){
      return res.status(404).json({msg: 'Post not found'})
    }
    await post.delete();

    res.status(200).json({msg: 'Post successfully deleted'});
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}