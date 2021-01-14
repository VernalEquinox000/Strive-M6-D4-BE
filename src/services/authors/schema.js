const { Schema, model } = require("mongoose")


const AuthorSchema = new Schema(
    {
    name: {
        type: String,
        required:true,
        },
    surname: {
        type: String,
        required: true,
    }
    },
{
  timestamps:true
})

    module.exports = model("Author", AuthorSchema)