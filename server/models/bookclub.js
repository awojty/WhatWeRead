const mongoose = require("mongoose");

const BookclubSchema = new mongoose.Schema({
  bookclub_owner_id: String, //id of the person that added the friend
  bookclub_title: String,
  type:String, //book or topic as a sstring lowercase
  book_author: String,
  book_id: String,
  image:String,
  description:String,
  book_title: String, // id of the perosn that will become a friend
  allow_adding_friends: Boolean, //true if you allow club members to add peopl to the club ( the added ppl dont have to be your friends but need to be friends of the invitator)
  imageName: {
    type: String,
    default: "none",
    required: true
},
imageData: {
    type: String,
    required: true
}

});

// compile model from schema
module.exports = mongoose.model("bookclub", BookclubSchema);
