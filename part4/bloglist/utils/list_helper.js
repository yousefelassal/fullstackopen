const dummy = (blogs) => 1


const totalLikes = (blogs) => {
    const reducer = (sum, item) =>
    sum + item.likes
    
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        if (item.likes > max.likes) {
            return item
        }
        return max
    }

    return blogs.reduce(reducer, blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}