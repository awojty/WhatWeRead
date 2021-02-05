const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  user_id: String, //id of the person that added the friend
  friend_requester_name: String,
  friend_name: String,
  friend_id: String, // id of the perosn that will become a friend
  accepted: Boolean,
  responded: Boolean,

});

// compile model from schema
module.exports = mongoose.model("friend", FriendSchema);
