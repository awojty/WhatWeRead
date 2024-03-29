const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");


const CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return {user: existingUser, isNewUser: false};

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
    });

    newUser.save();
    return {user: newUser, isNewUser: true};
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    //userObj is now {user: userModel, isNewUser: boolean}
    .then((userObj) => {
      // persist user in the session
      req.session.user = userObj.user;
      res.send(userObj);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
