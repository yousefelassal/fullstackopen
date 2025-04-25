/**
 * Dummy function that logs blogs and returns 1.
 * @param {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} blogs - The blogs to log.
 * @returns {number} - Always returns 1.
 */
const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

/**
 * @param {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} blogs - The blogs to calculate likes for.
 * @returns {number} - The total number of likes in the blogs.
 */
const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  console.log(total);
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
