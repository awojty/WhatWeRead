const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  book_title: String,
  book_author: String,
  book_id:String,
  user_id: String,
  user_name: String,
  stars: Number,
  content: String,

  
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
