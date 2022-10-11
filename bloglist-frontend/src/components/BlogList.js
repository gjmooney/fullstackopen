import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/api/blogs/${blog._id}`}>
              {blog.title} BY {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
