const express = require("express")

const AuthorModel = require("./schema")

const authorsRouter = express.Router()

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorModel.find()
    res.send(authors)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

authorsRouter.get("/:id", async (req, res, next) => {
  try {
    //req.params.id
    const author = await AuthorModel.findById(req.params.id)
    if (author) {
      res.send(author)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})


authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})



module.exports = authorsRouter
