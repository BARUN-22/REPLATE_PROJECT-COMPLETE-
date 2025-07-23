const Community = require('../model/Community');

exports.createPost = async (req, res) => {
  try {
    const { title, description, label } = req.body;
    const post = new Community({ title, description, label });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating community post:', error.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Community.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching community posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, label } = req.body;

    const updated = await Community.findByIdAndUpdate(
      id,
      { title, description, label },
      { new: true }
    );

    res.status(200).json({ message: 'Post updated', updated });
  } catch (error) {
    console.error('Error updating post:', error.message);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Community.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
