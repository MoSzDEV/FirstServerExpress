const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    name: String,
    employment: String,
    active: Boolean,
    comment: String,
})

usersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }})

const User = model('User', usersSchema)

module.exports = User