import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

UserSchema.pre("save", async function (next) {
  // BEFORE saving the user in db, hash the password
  const newUser = this
  const plainPW = newUser.password

  if (newUser.isModified("password")) {
    // only if user is modifying the password we are going to use CPU cycles to calculate the hash
    newUser.password = await bcrypt.hash(plainPW, 10)
  }
  next()
})

UserSchema.methods.toJSON = function () {
  // this is executed automatically EVERY TIME express does a res.send

  const userDocument = this
  const userObject = userDocument.toObject()
  delete userObject.password // THIS IS NOT GOING TO AFFECT THE DATABASES
  delete userObject.__v

  return userObject
}

export default model("User", UserSchema)
