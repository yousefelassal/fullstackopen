const _ = require('lodash');

/**
 * Dummy function that logs blogs and returns 1.
 * @typedef {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} Blog
 * @param {Blog[]} blogs - The blogs to log.
 * @returns {number} - Always returns 1.
 */
const dummy = (blogs) => {
  console.log(blogs);

  return 1;
};

/**
 * @typedef {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} Blog
 * @param {Blog[]} blogs - The blogs to process.
 * @returns {number} - The total number of likes in the blogs.
 */
const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);

  console.log(total);

  return total;
};

/**
 * @typedef {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} Blog
 * @param {Blog[]} blogs - The blogs to process.
 * @returns {Blog|null} - The blog with the most likes, or null if no blogs are provided.
 * @description Finds the blog with the most likes from an array of blogs.
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((prev, current) => {
    console.log('prev.likes', prev.likes);
    console.log('current.likes', current.likes);

    return prev.likes > current.likes ? prev : current;
  });

  console.log(favorite);

  return favorite;
};

/**
 * @typedef {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} Blog
 * @param {Blog[]} blogs - The blogs to process.
 * @returns {Blog|null} - The blog with the most likes, or null if no blogs are provided.
 * @description Finds the blog with the most likes from an array of blogs.
 */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = _.countBy(blogs, 'author');
  const mostBlogsAuthor = _.maxBy(
    Object.entries(authors),
    ([, count]) => count,
  );

  return {
    author: mostBlogsAuthor[0],
    blogs: mostBlogsAuthor[1],
  };
};

/**
 * @typedef {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} Blog
 * @param {Blog[]} blogs - The blogs to process.
 * @returns {{ author: string; likes: number }|null} - The author with the most likes, or null if no blogs are provided.
 * @description Finds the author with the most likes from an array of blogs.
 */
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = _.groupBy(blogs, 'author');
  const mostLikesAuthor = _.maxBy(Object.entries(authors), ([, blogs]) =>
    blogs.reduce((sum, blog) => sum + blog.likes, 0),
  );

  return {
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1].reduce((sum, blog) => sum + blog.likes, 0),
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
