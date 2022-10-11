import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

test("renders content", () => {
  const blog = {
    title: "title for test",
    author: "test author",
    url: "none.com",
    likes: 4,
    user: {
      username: "mluukkai",
    },
  };

  render(<Blog blog={blog} user={blog.user} />);

  const element = screen.getAllByText(/title for test/);
  expect(element).toBeDefined;

  //screen.debug();
});

test("clicking the button call event handler once", async () => {
  const blog = {
    title: "title for test",
    author: "test author",
    url: "none.com",
    likes: 4,
    user: {
      username: "mluukkai",
    },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} user={blog.user} handleLike={mockHandler} />);

  const mockUser = userEvent.setup();
  const button = screen.getAllByText(/Like/);

  await mockUser.click(button[1]);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
