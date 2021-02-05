const mongoose = require("mongoose");

const BookcaseSchema = new mongoose.Schema({
  title: String,
  user_id:String,
 
});

// compile model from schema
module.exports = mongoose.model("bookcase", BookcaseSchema);
