const mongoose = require('mongoose')

const personschema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('person', personschema)