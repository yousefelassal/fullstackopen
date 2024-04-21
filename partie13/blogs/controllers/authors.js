const router = require('express').Router()
const { Blog } = require('../models')
const { fn, col, literal } = require('sequelize')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: ['author',
        [fn('COUNT', col('author')), 'articles'],
        [fn('SUM', col('likes')), 'likes']],
        group: ['author'],
        order: literal('articles DESC')
    })
    res.json(blogs)
})

module.exports = router