

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const Book = require("./models/book");
const Bookcase = require("./models/bookcase");

const Friend = require("./models/friend");

const Bookclub = require("./models/bookclub");
const BookclubNote = require("./models/bookclubNote");
const BookclubComment = require("./models/bookclubComment");
const BookclubMember = require("./models/bookclubMember");
const Review = require("./models/review");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();


//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

/////////////////////

const multer = require('multer');

const Image = require('./models/image');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      // rejects storing a file
      cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/* 
  stores image in uploads folder
  using multer and creates a reference to the 
  file
*/
router.route("/uploadmulter")
  .post(upload.single('imageData'), (req, res, next) => {
      console.log(req.body);
      const newImage = new Image({
          imageName: req.body.imageName,
          imageData: req.file.path
      });

      newImage.save()
          .then((result) => {
              console.log(result);
              res.status(200).json({
                  success: true,
                  document: result
              });
          })
          .catch((err) => next(err));
  });

/*
  upload image in base64 format, thereby,
  directly storing it in mongodb datanase
  along with images uploaded using firebase
  storage
*/    
router.route("/uploadbase")
  .post((req, res, next) => {
      const newImage = new Image({
          imageName: req.body.imageName,
          imageData: req.body.imageData
      });

      newImage.save()
          .then((result) => {
              res.status(200).json({
                  success: true,
                  document: result
              });
          })
          .catch((err) => next(err));
  });

router.get("/images", (req,res) => {
  
  Image.find({}).then((book) => {
    console.log("books for bookcase found", book);
    res.send(book);
  });
})


  











/////////////


////message things

const nodemailer = require("nodemailer"),
  cors = require("cors");
const review = require("./models/review");




var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
}
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully signed into Gmail account");
  }
});

router.post("/send", (req, res) => {
  const { name } = req.body;
  const { message } = req.body;

  var mail = {
    from: name,
    to: "whatwereadwebdeveloper@gmail.com",
    subject: "Feedback From The Blog",
    html: `${message}` + "<br><br>Kindly,<br>" + `${name}`
  };

  console.log("mail", mail)

  console.log("send message");

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      console.log("error");
      res.json({ msg: "err" });
    } else {
      console.log("success");
      res.json({ msg: "suc" });
    }
  });
});


//////////////////////////////////////////////


router.post("/createbook", (req,res) => {

  const newBook = new Book({

    title: req.body.title,
    author:req.body.author,
    user_id:req.body.user_id,
    total_pages: req.body.total_pages,
    completed_pages:req.body.completed_pages,
    remaining_pages: req.body.remaining_pages,
    color: req.body.color,
    bookcase: req.body.bookcase,
    image:req.body.image,
  

  });

  newBook.save().then((book) => 
  
  
  {console.log("i created a book", book);
    res.send(book)

  
  });


});

router.post("/invitefriend", (req, res) => {
  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log(req.user, req.body.friend_id);
    const newFriends = new Friend({
      user_id: req.user,
      friend_id: req.body.friend_id,
      friend_requester_name: req.user.name,
      friend_name: req.body.friend_name,
      accepted: false,
      responded: false,
    });

    newFriends.save().then(
      (selectedCategories) => {
        console.log(selectedCategories);

        res.send(selectedCategories)
      });



  }

});

router.get("/getuserbooks", (req,res)=>{

  let body = {
    user_id: req.user._id

  };

  Book.find(body).then((book) => {
    console.log("books found", book);
    res.send(book);
  }
  
  );

});



router.post("/deletebook", (req,res)=>{

  //deletes a given book from the suers bookcase

  if (!req.user) {
    return res.send("not logged in");
  } else {
    const query = 
    {_id: req.body.book_id};
   
    Book.deleteOne(query).then((book) => 
    
    {console.log(book);
      
      res.send(book);
    
    }
    
    );
  }



  
});



router.post("/deletebookmember", (req,res)=>{

  //deletes a given bookclub member from the suers bookclub
  //all bookclub memebrs have uniqe ids and same person have multiple bookclub memebrships for different clubs


  if (!req.user) {
    return res.send("not logged in");
  } else {
    const query = 
    {_id: req.query._id};
   
    BookclubMember.deleteOne(query).then((book) => res.send(book));
  }



  
});


router.post("/reviewbook", (req,res)=>{

  //add a review to a given book 
  if (!req.user) {
    res.send("not logged in");
  } else {

  let newReview = new Review({

    book_title: req.body.book_title,
    book_author: req.body.book_author,
    book_id: req.body.book_id,
    user_id: req.user._id,
    user_name: req.user.name,
    stars: req.body.stars,
    content: req.body.content,


  });

  newReview.save().then((review) => 
  {
    console.log("new review", review);
    res.send(review);

  
  });


}


});

router.get("/getareview", (req,res)=>{

  let body = {
    book_id:req.query.book_id

  }

  Review.findOne(body).then((review)=>{
    res.send(review);
  })
})

router.get("/getbook", (req,res)=>{
  let body={
    user_id:req.user._id,
    _id:req.query.book_id,
  };

  console.log("query to find books", body)

  Book.findOne(body).then((book) => {
    console.log("book  found", book);
    res.send(book);
  });

})

router.get("/getbooksforbookcase",(req,res)=>{

  let body={
    user_id:req.query.user_id,
    bookcase:req.query.title
  };

  console.log("query to find books", body)

  Book.find(body).then((book) => {
    console.log("books for bookcase found", book);
    res.send(book);
  });

});


router.get("/bookinfo", (req,res) => {

  let body = {
    _id: req.query._id

  };

  Book.findOne(body).then((book) => {
    console.log("books found", book);
    res.send(book);
  });

});

router.get("/getuserbookcases", (req,res)=>{
  //get a list of bookcases that a user owns

  let body = {
    user_id: req.user._id

  };

  Bookcase.find(body).then((bookcase) => {
    console.log("bookcase found", bookcase);
    res.send(bookcase);
  });
})

router.post("/createbookcase", (req,res) => {

  const newBookcase = new Bookcase({

    title: req.body.title,
    
    user_id:req.body.user_id,



  });

  newBookcase.save().then((bookcase) => 
  {
    console.log("new bookcase", bookcase);
    res.send(bookcase)

  
  });

});


//returns a specific user from the name
router.get("/user", (req,res) => {}  );


//returns all the users - all except the logged in user
router.get("/users", (req,res) => {

  let body = {
    _id: { $not: { $eq: req.user._id } }

  };

  User.find(body).then((user) => {
    console.log("users found", user);
    res.send(user);
  });


}  );

//responds to the bokclub invitation
router.post("/respondfriend", (req, res) => {
  if (!req.user) {
    res.send("not logged in");
  } else {
    const query = {
      _id: req.body._id,

      user_id: req.body.user_id, // id of the person who sent the invitation
      friend_id: req.user._id, // id of the perosn who responded

    };
    Friend.findOne(query).then(
      (friend) => {
        friend.accepted = req.body.accepted;
        friend.responded = true;
        console.log("console log posted");

        friend.save().then((savedGoal) => {
          console.log(savedGoal);




          res.send(savedGoal);

        })
      });

  }
});

router.post("/respondbookclubinvite", (req, res) => {
  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log(req.body);

    const accept = req.body.accepted;

    const query = {
      _id: req.body._id,

      // user_id: req.body.user_id, // id of the person who sent the invitation
      // friend_id: req.user._id, // id of the perosn who responded
      responded:false

    };
    BookclubMember.findOne(query).then(
      (friend) => {
        friend.accepted = accept;
        friend.responded = true;
        console.log("console log posted");

        friend.save().then((savedGoal) => {
          console.log(savedGoal);
          res.send(savedGoal);

        })
      });

  }
});



router.post("/makebookclub", (req,res)=>{
  //creates a new bookclub
  if (!req.user) {
    res.send("not logged in");
  } else {

    
    const newBookclub = new Bookclub({
      bookclub_owner_id: req.body.user_id, //id of the person that added the friend
      bookclub_title: req.body.title,
      book_id: req.body.book_id,
      book_title: req.body.book_title, // id of the perosn that will become a friend
      imageName: req.body.imageName,
      imageData: req.body.imageData,
      description: req.body.description,
      allow_adding_friends:true,
      image:req.body.image
    
    });

    newBookclub.save().then(
      (bookclub) => {
        console.log(bookclub);

        res.send(bookclub)
      });



  }

});


router.get("/getfriendstoinviteclub", (req,res) => {
  let body ={
    $and: [
      { $or: [{ friend_id: { $eq: req.user._id } }, { friend_requester_id: { $eq: req.user._id } }] },

    ]


  }
})


//get bookclubs you created
router.get("/getbookclubs", (req,res)=>{
  //creates a new bookclub
  if (!req.user) {
    res.send("not logged in");
  } else {

    let body = {
      bookclub_owner_id:req.user._id
    }

    console.log("userId", body);

    Bookclub.find(body).then((bookclub)=>{

      console.log("get bookclubs", bookclub);

      res.send(bookclub);

    })



  }

});


router.get("/getbookclubsyoubelong", (req,res)=>{
  //get bookclubs you belong to but not an owner
  if (!req.user) {
    res.send("not logged in");
  } else {

    let body = {
      member_id:req.user._id,
      accepted:true,
      responded:true,
    }

    console.log("userId", body);

    BookclubMember.find(body).then((bookclub)=>{

      console.log("get bookclubs", bookclub);

      res.send(bookclub);

    })



  }

});


router.get("/getbookclub", (req,res)=>{
  //get a specific bookclub using its object id 
  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log(req.query);

    let body = {
      _id:req.query._id
    }

    console.log("userId", body);

    Bookclub.findOne(body).then((bookclub)=>{

      console.log("get bookclubs", bookclub);

      res.send(bookclub);

    })



  }

});

router.post("/addnote", (req,res)=>{
  //creates a new not in a given bookclub
  if (!req.user) {
    res.send("not logged in");
  } else {

    let date = new Date();

    
    const newBookclubNote = new BookclubNote({
      
      bookclub_id: req.body.bookclub_id,
      user_id: req.user._id, // id of the perosn that will become a friend
      user_name: req.user.name,
      content: req.body.content,
      date:date,    
    });

    newBookclubNote.save().then(
      (bookclubNote) => {
        console.log(bookclubNote);

        res.send(bookclubNote)
      });



  }


});

router.post("/testing", (req,res)=>{

  console.log("blob");
  res.send("blb");
});



router.get("/getnotes", (req,res)=>{

  let body = {
    bookclub_id:req.query.bookclub_id,
  }

  BookclubNote.find(body).then((notes)=>{

    console.log("get notes", notes);

    console.log(notes);

    res.send(notes);
    })
  
  
  });


router.get("/getcomments", (req,res)=>{

    let body = {
     
      note_id: req.query.note_id,
    }
  
    BookclubComment.find(body).then((notes)=>{
  
      console.log("get comments", notes);
  
      console.log(notes);
  
      res.send(notes);
      })
    
    
    });
  



router.post("/addbookclubcomment", (req,res)=>{
  //creates comment under a given node in a bookclub
  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log("reqbody", req.body);
    let date = new Date();

    
    const newBookclubComment = new BookclubComment({
      note_id: req.body.note_id,
      user_id: req.user._id, // id of the perosn that created a comment
      user_name: req.user.name,
      content: req.body.content,  //text of the comment  
      note: req.body.note_id,
      date:date,
    });

    console.log("c", newBookclubComment);
    

    newBookclubComment.save().then(
      (bookclubComment) => {
        console.log("new comment", bookclubComment);

        res.send(bookclubComment)
      });



  }


});



router.post("/invitetobookclub", (req,res)=>{
  //invites a freind to a bookclub

  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log(req.user, req.body.friend_id);
    const newbookclubMember = new BookclubMember({
      bookclub_owner_id: req.user._id, //id of the person that added the friend
      bookclub_owner_name: req.user.name,
      member_name: req.body.member_name, //friend to be added
      member_id: req.body.member_id,
      bookclub_id: req.body.bookclub_id,
      accepted: false,
      responded: false,
    });

    newbookclubMember.save().then(
      (bookclubmember) => {
        console.log(bookclubmember);

        res.send(bookclubmember)
      });



  }
})

//view all freind reques that a person received
router.get("/viewfriendrequests", (req, res) => {
  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log(req.name);

    let body = {

      friend_id: req.user._id, //we want to find allre quest that a pesron viewing theirtprofiel has received
      responded: false,

    };

    
    console.log("body sent to see invites", body);
    Friend.find(body).then((user) => {
      console.log("get invitations");

      console.log(user);

      res.send(user);
    }
    );

  }
});


router.get("/viewbookclubrequests", (req, res) => {
  if (!req.user) {
    res.send("not logged in");
  } else {

    console.log(req.name);

    let body = {

      member_id: req.user._id, //we want to find allre quest that a pesron viewing theirtprofiel has received
      responded: false,

    };

    
    console.log("body sent to see invites", body);
    BookclubMember.find(body).then((user) => {
      console.log("get invitations for bookclub");

      console.log(user);

      res.send(user);
    }
    );

  }
});

// verify if a given person you passed as a reque//get a list of lal your freinds and get a list of all your club memebrs: friends- club emmers = you can invite 

router.get("/getbookclubmembers", (req, res) => {

  let body = {
    bookclub_id:req.query.bookclub_id,
    accepted:true, 
    responded:true
  };

  console.log(req.body);
  console.log(req.query);

  console.log("body to get members", body);

  BookclubMember.find(body).then((members)=>{
    res.send(members);

  })


}
);

//get ppl you were invited to the bookclub but have not responded yet 
router.get("/getpeopleinvitedtobookclub", (req, res) => {

  let body = {
    bookclub_id:req.body.bookclub_id,
    responded:false,
  };

  BookclubMember.find(body).then((members)=>{
    res.send(members);

  })





});




router.get("/caninvite", (req, res) => {
  console.log("CANINVITE", req.query.friend_id);

  let body = {
    $and: [
      { $or: [{ user_id: { $eq: req.user._id } }, { friend_id: { $eq: req.user._id } }] },
      { $or: [{ user_id: { $eq: req.query.friend_id } }, { friend_id: { $eq: req.query.friend_id } }] }

    ]
  };

  console.log("body of can invite", body);
  Friend.find(body).then((friends) => {

    console.log("can invite", friends);

    if (!friends.length) {
      res.send({ response: true });
    } else {
      if (friends[0].accepted === true) {
        console.log("FREIDNS");
        res.send({ response: "friend" });

      } else {

        console.log(friends[0].user_id);
        console.log(friends[0].accepted);
        console.log(friends);

        res.send({ response: false });
      }

    };
  })
});


router.post("/updateprogress", (req,res)=>{

  let q = {
    _id: req.body.book_id,
    user_id: req.user._id,


  };

  Book.findOne(q).then(
    (book) => {
      console.log("this is a book", book);

     book.completed_pages = req.body.completed_pages;
    book.remaining_pages = req.body.remaining_pages;

      book.save().then((book) => res.send(book));
    });

  
})


router.post("/movebookcase", (req,res)=>{

  let q = {
    _id: req.body.book_id,
    user_id: req.user._id,


  };

  Book.findOne(q).then(
    (book) => {
      console.log("this is a book", book);

     book.bookcase = req.body.bookcase;
    

      book.save().then((book) => res.send(book));
    });



  
  
})

//view all freinds that a person has (they can be either a frind of sb or they request freindship)
router.get("/viewfriends", (req, res) => {
  if (!req.user) {
    res.send("not logged in");
  } else {


    let body = {
      $and: [
        { $or: [{ friend_id: req.user._id }, { user_id: req.user._id }] },
        { $and: [{ accepted: true }, { responded: true }] }

      ]
    };

    //console.log("find users")
    Friend.find(body).then((friend) => {

      //console.log("BEFORE")

      //console.log(friend);


      //console.log("AFTER")
      //console.log(friend);


      res.send(friend)


    }


    );

  }
});



router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
