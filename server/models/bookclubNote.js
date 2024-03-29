const mongoose = require("mongoose");

const BookclubNoteSchema = new mongoose.Schema({
  
  bookclub_id: String,
  user_id: String, // id of the perosn that will become a friend
  user_name:String,
  content: String,
  date: Date,

});

// compile model from schema
module.exports = mongoose.model("bookclubnote", BookclubNoteSchema);
