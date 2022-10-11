const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs:</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
