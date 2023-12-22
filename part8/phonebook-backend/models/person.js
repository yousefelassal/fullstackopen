import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  phone: {
    type: String,
    minlength: 5
  },
  street: {
    type: String,
    required: true,
    minlength: 5
  },
  city: {
    type: String,
    required: true,
    minlength: 3
  },
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

export default mongoose.model('Person', schema)