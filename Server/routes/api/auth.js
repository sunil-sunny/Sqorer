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


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


router.post('/google', async (req, res) => {
  try {

    const profileObj = req.body;

    let user = await User.findOne({ googleId: profileObj.googleId });


    if (!user) {
      const googleId = profileObj.googleId, password = profileObj.id, email = profileObj.email, firstname = profileObj.givenName, lastname = profileObj.familyName;
      user = new User({ googleId, firstname, lastname, email, password });
      await user.save();
    }

    const payload = {
      id: user.id,
    };

    console.log(user.id);

    //return token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err)
          return res.status(500).json({
            msg: `Error, can't create a new token ${err}`,
          });
        console.log(token);
        return res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `Server error ${error}` });
  }
})


//recovery password process 

// Step 1: Check is the email that will be provided by the is already linked with an account 
//          in case that  it is already linked with an account.
//         We use nodemailer to send a code to the email that he provided us.


router.get('/check-email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const tempUser = await User.findOne({ email });
    if (!tempUser) return res.status(404).json({ success: false, msg: `This ${email} isn't linked with any account yet. Please enter another one.` });
    let tempCode = await Code.findOne({ user: tempUser._id, status: false });
    if (tempCode) {
      tempCode.set({ status: true });
      await tempCode.save();
    }

    // a random code
    let code = Math.round(Math.random() * (999999 - 100000) + 100000);
    const user = tempUser._id;
    let newCode = new Code({ user, code });
    await newCode.save();

    //check if the user has requested a code before and that is not expired.
    const existCode = await Code.findOne({ user, isExpired: true });
    if (existCode) {
      existCode.set({ isExpired: true });
      await existCode.save();
    }


    //get my email and password 

    const userEmail = process.env.EMAIL,
      userPassword = process.env.PASSWORD;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${userEmail}`, // email of the app
        pass: `${userPassword}`, // password of the app
      },
    });

    let info = await transporter.sendMail({
      from: '"Math Online Game 👻" <support@mathgame.com>', // sender address
      to: `${email}, fjvm.cj@gmail.com`, // list of receivers
      subject: "PASSWORD RESET REQUEST ✔", // Subject line
      text: `Dear user,\n\n \tWe have received your request to reset your password. Please copy the code below.\n \tCode: ${code}` // plain text body                
    });

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
    if (!tempCode) return res.status(404).json({ msg: ` Dear user an error is occured` });
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
router.put("/", async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token)
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const user = await User.findById(decoded.id)
      .select("-password")
    res.json(user);
  } catch (error) {
    // console.log(error);
    return res.json({
      msg: `Server error fething user from database ${error}`,
    });
  }
});

//Sign In
router.post("/", async (req, res) => {
  const { isValid, errors } = signInValidation(req.body);
  if (!isValid)
    return res.status(404).json({ errors: errors });
  const { email, password } = req.body;
  console.log(`Trying to login as ${email}`);
  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ msg: `This email doesn't exist in our database` });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch)
      return res.json({ msg: "Invalid Credentials, Please try again" });
    const payload = {
      id: user.id,
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(`${error}`);
    return res
      .status(500)
      .json({ msg: `Server error` });
  }
}
);

module.exports = router;