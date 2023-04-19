const bcrypt = require("bcrypt");
const User = require("../models/userModel");

module.exports = (req, res) => {
  if (req.body.email && req.body.password) {
    (async () => {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      return res.send(user);
    })();
  } else {
    return res.send("email and password is required !");
  }
};
