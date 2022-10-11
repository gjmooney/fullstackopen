import { useState } from "react";
import { useDispatch } from "react-redux";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const createBlog = async (event) => {
    event.preventDefault();

    addBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
        <div>
          title:{" "}
          <input
            id="title-input"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          <p></p>
          author:{" "}
          <input
            id="author-input"
            value={author}
            onChange={handleAuthorChange}
          />
          <p></p>
          url: <input id="url-input" value={url} onChange={handleUrlChange} />
          <p></p>
        </div>
        <div>
          <button id="submit-button" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
