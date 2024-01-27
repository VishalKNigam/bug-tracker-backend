const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
},{
    versionKey:false
})

const Users = mongoose.model("user",userSchema)

module.exports={Users}
