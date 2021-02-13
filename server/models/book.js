const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author:String,
  user_id: String,
  total_pages:Number,
  completed_pages:Number,
  remaining_pages:Number,
  color:String,
  bookcase:String,
  start_date:Date,
  image:String,

  
});

// compile model from schema
module.exports = mongoose.model("book", BookSchema);
