const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");

/**
 * Get all blogs in database
 */
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

/**
 * Get specific blog
 */
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

/**
 * Create new blog
 */
blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  //const user = request.user;
  console.log("user", user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

/**
 * Update existing blog
 */
blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes, user } = request.body;
  const userJson = user.toJSON;

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, userJson },
    { new: true }
  );

  response.json(blog);
});

/**
 * Delete a blog
 */
blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(request.params.id);
  console.log("user", user.id.toString());
  console.log("blog", blog.user.toString());

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).send({ error: "not your blog" });
  }
  await Blog.findByIdAndRemove(blog.id);
  response.status(204).end();
});

module.exports = blogsRouter;
