const express = require("express")
const cors = require("cors")
//const { join } = require("join")
const listEndPoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const articlesRouter = require("./services/articles")
const authorsRouter = require("./services/authors")


const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT



//const staticFolderPath = join(__dirname, "../public")
//server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/articles", articlesRouter)
server.use("/authors", authorsRouter)

// ERROR HANDLERS MIDDLEWARES
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndPoints(server))

mongoose.connect(process.env.MONGO_CONNECTION)
    .then(server.listen(port, () => {
    console.log("Server running on port", port)
    }))
.catch(err => console.log(err))