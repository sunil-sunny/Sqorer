const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");
const Code = require("../../models/code");
const signInValidation = require('../../validations/signIn');
const auth = require("../middleware/auth");
const sendEmail = require('../../config/sendEmail');
const { RESET_PASSWORD_SUBJECT, RESET_PASSWORD_MESSAGE } = require('../../config/constants')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//Logging in with google
router.post('/google', async (req, res) => {
  try {

    const profileObj = req.body;
    const { id } = profileObj;
    const googleId = id;

    let user = await User.findOne({ googleId });

    if (!user) {
      throw new Error('You are not registered with sqorer. Try signing up using Google.')
    } else {
      let token = await user.getAuthToken();
      console.log(token);
      res.status(200).json({ token });
    }
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `${error}` });
  }
});

//Registering with google
router.post('/google/register/:type', async (req, res) => {
  try {

    const profileObj = req.body;
    const { id, given_name, family_name, email, picture } = profileObj;
    const googleId = id;
    const firstname = given_name;
    const lastname = family_name;
    const profile = picture;
    let user = await User.findOne({ googleId });
    var today = new Date();
    console.log(user);
    if (!user) {
      console.log('creating new user');
      const userModel = new User({ googleId, firstname, lastname, email, userType: req.params.type, profile });
      await userModel.save();
      let token = await userModel.getAuthToken();
      console.log(token);
      res.status(200).json({ token });

    } else {
      throw new Error('You are already registered with sqorer. Try signing in using Google.')
    }
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `${error}` });
  }
})


//recovery password process 

// Step 1: Check is the email that will be provided by the is already linked with an account 
//          in case that  it is already linked with an account.
//         We use nodemailer to send a code to the email that he provided us.


router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('sending otp to ' + email);
    const tempUser = await User.findOne({ email });
    if (!tempUser) return res.status(404).json({ success: false, msg: `This ${email} isn't linked with any account yet. Please enter another one.` });

    //check if the user has requested a code before and that is not expired.
    let existCodes = await Code.find({ user: tempUser._id, isExpired: false });

    if (existCodes) {
      existCodes.forEach(async (element) => {
        element.set({ isExpired: true });
        await element.save();
      });
    }

    // a random code
    let code = Math.round(Math.random() * (999999 - 100000) + 100000);
    const user = tempUser._id;
    let newCode = new Code({ user, code });
    await newCode.save();
    const subject = RESET_PASSWORD_SUBJECT;
    const message = RESET_PASSWORD_MESSAGE + code;
    console.log(message)
    sendEmail(email, subject, message);
    code = parseInt(code);
    return res.json({ msg: `Dear ${tempUser.firstname}, please check your mail account, we have send you a code. Please do it before the next 60 minutes.` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: `Server :  ${error}` });
  }
})

// Step 2: Allow user to change his password is the code he will provide is match with the one that he sent to his email

router.put('/change-password', async (req, res) => {
  try {
    let { code, email, password } = req.body;
    const infoUser = await User.findOne({ email });
    if (!infoUser) return res.status(404).json({ msg: "This user is not linked with an account yet." })
    const tempCode = await Code.findOne({ code: code, user: infoUser._id, isExpired: false });
    if (!tempCode) return res.status(404).json({ msg: ` The code you have entered is invalid, try entering valid code` });
    const { createdAt, isExpired, user } = tempCode;
    if (isExpired) return res.status(401).json({ msg: `This ${code} is expired. Please request another code` });

    let actualDate = new Date();
    const minutes = (actualDate - createdAt);
    if (minutes > 600000) {
      tempCode.set({ isExpired: true });
      await tempCode.save();
      return res.status(401).json({ msg: `This ${code} is expired. Please request another code` });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let newUser = await User.findOne({ email });

    tempCode.set({ isExpired: true });
    newUser.set({ password });

    await tempCode.save();
    await newUser.save();
    return res.json({ msg: "Password is changed succesfully" });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: `Server error ${error}` });
  }
})

//Dispatch token to get the id of the user.
router.get("/getUser", auth, async (req, res) => {

  res.send(req.user);
});


//Sign In
router.post("/", async (req, res) => {
  const { isValid, errors } = signInValidation(req.body);
  if (!isValid)
    return res.status(404).json({ errors: errors });
  const { email, password } = req.body;
  try {
    let user = await User.findByCredentials(email, password);
    let token = await user.getAuthToken();
    res.status(200).json({ token })
  } catch (e) {
    console.log(e)
    res.status(400).json({
      msg: e.message
    })
  }
}
);

router.post("/logout", auth, async (req, res) => {

  try {
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save();
    res.status(200).send({
      "success": "true"
    })
  } catch (e) {
    res.status(500).json({ msg: 'unable to logout' });
  }

});


module.exports = router;