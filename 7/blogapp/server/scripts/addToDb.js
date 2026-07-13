require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");

const [, , type, ...args] = process.argv;

const usage = () => {
  console.log("Usage:");
  console.log("  node scripts/addToDb.js user <username> <name> <password>");
  console.log(
    "  node scripts/addToDb.js blog <title> <author> <url> <likes> <username>",
  );
  process.exit(1);
};

if (!type) usage();

const addUser = async ([username, name, password]) => {
  if (!username || !name || !password) usage();

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();
  console.log(`Added user ${savedUser.username}`);
};

const addBlog = async ([title, author, url, likesString, username]) => {
  if (!title || !author || !url || !likesString || !username) usage();

  const likes = Number(likesString);
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  console.log(`Added blog ${savedBlog.title}`);
};

const run = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  if (type === "user") {
    await addUser(args);
  } else if (type === "blog") {
    await addBlog(args);
  } else {
    usage();
  }

  await mongoose.connection.close();
};

run().catch((error) => {
  console.error(error.message);
  mongoose.connection.close();
  process.exit(1);
});
