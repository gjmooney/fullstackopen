import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    //set blogs
    setBlogs(state, action) {
      return action.payload;
    },
    //add blog
    appendBlog(state, action) {
      console.log("appen", action.payload);
      state.push(action.payload);
    },
    //like for blog
    updateLikes(state, action) {
      console.log("like reducer", action.payload);
      const id = action.payload._id;

      return state.map((a) => (a._id !== id ? a : action.payload));
    },
    //delete blog
    removeBlog(state, action) {
      console.log("delete reducer", action);
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateLikes, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    console.log("blog", blog);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    console.log("sds", blog);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.update(blog._id, changedBlog);
    console.log("voting action", changedBlog);
    dispatch(updateLikes(changedBlog));
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    console.log("Deleting", blogId);
    await blogService.remove(blogId);
    dispatch(removeBlog(blogId));
  };
};

export default blogSlice.reducer;
