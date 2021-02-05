const mongoose = require("mongoose");

//comment under a certian note on the bookclub
const BookclubCommentSchema = new mongoose.Schema({
  note_id: String,
  user_id: String, // id of the perosn that commented under the note
  user_name:String,
  content: String,
  note:String,
  date:Date,

});

// compile model from schema
module.exports = mongoose.model("bookclubcomment", BookclubCommentSchema);
