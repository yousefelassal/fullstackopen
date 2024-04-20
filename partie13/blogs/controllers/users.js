const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User } = require('../models')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
        username,
        name,
        passwordHash
    })

    res.json(user)
  } catch(error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ Error: 'Username already exists' })
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ Error: error.errors.map(e => e.message)})
    }
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        await user.update({
            username: req.body.username
        })
    } catch(error){
        return res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash'] }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router