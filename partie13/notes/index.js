require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

Note.sync()

// we could just write regular SQL queries
// app.get('/api/notes', async (req, res) => {
//   const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
//   res.json(notes)
// })

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
  console.log(req.body)
  try {
    const note = await Note.create(req.body)
    res.json(note)
  } catch(e) {
    res.status(400).json({ error: e.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})