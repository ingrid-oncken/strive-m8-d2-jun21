import express from "express"
import UserSchema from "./schema.js"

const usersRouter = express.Router()

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserSchema(req.body)
    const { _id } = await newUser.save()
    res.send({ _id })
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserSchema.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
