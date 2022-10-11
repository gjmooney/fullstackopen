import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "../components/BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);

  const input = screen.getByPlaceholderText("Enter a title");
  const sendButton = screen.getByText("create");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("testing a form...");
});
