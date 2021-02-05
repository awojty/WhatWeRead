const mongoose = require("mongoose");

const BookclubMemberSchema = new mongoose.Schema({
  bookclub_owner_id: String, //id of the person that added the friend
  bookclub_owner_name:String,
  member_name:String,
  member_id:String,
  bookclub_title: String,
  bookclub_id:String,
  responded:Boolean,
  accepted:Boolean,

});

// compile model from schema
module.exports = mongoose.model("bookclubmember", BookclubMemberSchema);
