const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/userFormHandling", {

})
.then(() => console.log("Connected"))
.catch((err) => console.error("Error connecting to MongoDB:", err));


let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  age: Number,
});

// Export the model
module.exports = mongoose.model("user", userSchema);
