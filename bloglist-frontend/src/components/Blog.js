const Blog = ({ blog, handleLike, handleDelete, user }) => {
  if (!blog || !user) {
    return null;
  }

  const showDeleteButton = {
    display: user.username === blog.user.username ? "" : "none",
  };

  const deleteButtonStyle = {
    backgroundColor: "#008CBA",
  };

  const updateLikes = () => {
    handleLike(blog);
  };

  const deleteBlog = async () => {
    handleDelete(blog);
  };

  return (
    <div>
      <h1>
        {blog.title} BY {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      {blog.likes} Likes
      <button id="like-button" onClick={updateLikes}>
        Like
      </button>
      <br></br>
      Entered by: {blog.user.name}
      <br></br>
      <div style={showDeleteButton}>
        <button style={deleteButtonStyle} onClick={deleteBlog}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
