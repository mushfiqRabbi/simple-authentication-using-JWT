require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  if (req.body.email && req.body.password) {
    (async () => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const matchPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (matchPassword) {
          req.user = await User.findOne({ email: req.body.email }, "_id email");
          console.log(req.user);
          jwt.sign(
            { id: user._id, email: user.email },
            process.env.SERVER_TOKEN_SECRET,
            { expiresIn: 60 * 5 },
            (error, token) => {
              if (!error) {
                console.log(token);
                return res.send(token);
              }
              return res.send(error.message);
            }
          );
        } else {
          return res.send("Invalid email or password !");
        }
      } else {
        return res.send("Invalid email or password !");
      }
    })();
  } else {
    return res.status(401).send("Unauthorized !");
  }
};
