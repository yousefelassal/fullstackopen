const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../middleware')

const { Blog } = require('../models')
const { User } = require('../models')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        },
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name', 'id']
    },
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', [tokenExtractor, blogFinder], async (req, res) => {
  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  if (!req.blog) {
    return res.status(404).end()
  }
  await req.blog.destroy()
  res.status(204).json({ message: 'Blog deleted' })
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.update({
        likes: req.blog.likes + 1 
    })
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router