import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import User from "./components/User";
import Users from "./components/Users";

// Reducers
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  likeBlog,
  createBlog,
  deleteBlog,
} from "./reducers/blogsReducer";
import { setUser, userLogin, userLogout } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/allUsersReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(userLogin(username, password));
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject));

    dispatch(setNotification(`Added ${blogObject.title}`, 4000));
  };
  const updateBlogs = async () => {
    dispatch(initializeBlogs(blogs));
  };

  const handleLike = async (blogObject) => {
    console.log("voting", blogObject);
    dispatch(likeBlog(blogObject));
  };

  const handleDelete = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)) {
      dispatch(deleteBlog(blogObject._id));
      dispatch(initializeBlogs());
    }
  };

  const blogFormRef = useRef();

  const blogMatch = useMatch("/api/blogs/:id");
  const userMatch = useMatch("/api/users/:id");

  const blog = blogMatch
    ? blogs.find((blog) => blog._id === blogMatch.params.id)
    : null;

  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <div>
      <h1>Notes</h1>
      <Notification />

      {currentUser === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {currentUser.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <Routes>
            <Route
              path="/"
              element={
                <BlogList handleLike={handleLike} handleDelete={handleDelete} />
              }
            />
            <Route
              path="/api/blogs/:id"
              element={<Blog blog={blog} user={currentUser} />}
            />
            <Route path="/api/users/" element={<Users users={users} />} />
            <Route path="/api/users/:id" element={<User user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
