const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const signUpValidation = require("../../validations/signUp");
const auth = require("../middleware/auth");
const TeacherStudent = require('../../models/teacher-student');


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
router.put('/', auth, async (req, res) => {
  try {
    const user = req.user;
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

  const { isValid, errors } = signUpValidation(req.body);
  if (!isValid)
    return res.status(404).json({ errors: errors });
  let { firstname, lastname, email, password, userType, profile } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.json({ msg: "Email is already registered" });
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    let lastLogin = new Date();
    const isOnline = true;
    const userModel = new User({ firstname, lastname, email, password: hashedPassword, userType, lastLogin, isOnline, profile });
    await userModel.save();
    const user = await User.findByCredentials(email, password);
    const token = await user.getAuthToken();
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).json({ msg: e.message })
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
