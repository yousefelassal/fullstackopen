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

/**
 * @param {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} blogs - The blogs to find the favorite blog for.
 * @returns {{ _id: string; title: string; author: string; url: string; likes: number; __V: number }} - The blog with the most likes.
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
