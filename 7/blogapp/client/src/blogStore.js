import { paperClasses } from "@mui/material";
import { create } from "zustand";

export const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    createBlog: (blog) => {
      set((state) => (state.blogs = [...state.blogs, blog]));
    },
    addLike: () => {},
    removeBlog: () => {},
    setBlogs: (blogs) => {
      set((state) => (state.blogs = blogs));
    },
  },
}));
