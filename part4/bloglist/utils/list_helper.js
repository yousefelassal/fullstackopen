const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    const authors = _.map(blogs, 'author')
    const author = _.head(_(authors).countBy().entries().maxBy(_.last))
    const count = _.countBy(authors)[author]
    return {author, count}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}