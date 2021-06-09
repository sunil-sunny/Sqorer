const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../../models/user");
const signUpValidation = require("../../validations/signUp");



//Change user password
router.put('/change-password/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ msg: `We can't find any user, Please sign out<br>Then sign in..<br>Sorry for this issue.` });

    let { password, newPassword } = req.body;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({
      msg: "Password doesn't match with your actual password." +
        "\nSo we're not able to finish the procees."
    });

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(newPassword, salt);

    user.set({ password });
    //  await user.save();
    console.log(user)
    return res.json(user);
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `Server error ${error}` });
  }
})

//Add more information for user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ msg: `We can't find any user, Please sign out<br>Then sign in..<br>Sorry for this issue.` });
    user.set(req.body);
    await user.save();
    console.log(req.body);
    return res.json(user);
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `Server error ${error}` });
  }
})


//Fetch all users in the database
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `Server error ${error}` });
  }
})


//Sign up
router.post("/", async (req, res) => {
  try {
    const { isValid, errors } = signUpValidation(req.body);
    console.log(errors);
    if (!isValid)
      return res.status(404).json({ errors: errors });
    let { firstname, lastname, email, password, userType } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res.json({ msg: "Email is already registered" });

    user = await User.findOne({ email });

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let lastLogin = new Date();
    const isOnline = true;

    user = new User({ firstname, lastname, email, password, userType, lastLogin, isOnline });

    await user.save();

    // Creating  payload
    const payload = {
      id: user.id,
    };

    //return token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err)
          return res.json({
            msg: `Error, can't create a new token ${err}`,
          });
        return res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(`${error}`);
    return res.json({ msg: `Server error ${error}` });
  }
});

router.post('/google', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `Server error ${error}` });
  }
})
module.exports = router;
