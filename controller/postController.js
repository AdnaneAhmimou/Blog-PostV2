const post = require("../model/Post");
const fs = require("fs").promises;

const path = require("path");
const postPath = path.join(__dirname, "../database/posts.json");

const getPost = async () => {
  try {
    const data = await fs.readFile(postPath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading posts data:", err);
    return [];
  }
};

// const createPost = async (req, res) => {
//     try {
//         const data = await fs.readFile(postPath);
//         const posts = JSON.parse(data);
//         const newPost = new post(
//             req.body.title,
//             req.body.content,
//             req.body.author
//         );
//         posts.push(newPost);
//         await fs.writeFile(postPath, JSON.stringify(posts));
//         res.status(201).json(newPost);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

const createPost = async (req, res) => {
  try {
    const data = await fs.readFile(postPath);
    const posts = JSON.parse(data);
    const currentUser = req.session.user;
    const newPost = new post(currentUser.id, req.body.title, req.body.content);
    posts.push(newPost);
    await fs.writeFile(postPath, JSON.stringify(posts));
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await getPost();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatedPost = async (req, res) => {
  try {
    const data = await fs.readFile(postPath);
    let posts = JSON.parse(data);
    const postId = req.params.id;
    const updatedPost = req.body;

    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
      posts[postIndex] = { ...posts[postIndex], ...updatedPost };
      await fs.writeFile(postPath, JSON.stringify(posts));
      res.status(200).json(posts[postIndex]);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    let data = await fs.readFile(postPath);
    const posts = JSON.parse(data);
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      await fs.writeFile(postPath, JSON.stringify(posts));
      res.status(200).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const posts = await getPost();
    const post = posts.find((post) => post.id === postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPost,
  createPost,
  getAllPosts,
  updatedPost,
  deletePost,
  getPostById,
};
