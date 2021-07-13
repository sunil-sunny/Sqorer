const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const auth = require("../middleware/auth");


//add students to parent profile
router.post('/addStudent', auth, async (req, res) => {
    try {
        const parentEmail = req.user.email;
        const studentEmail = req.body.studentEmail;
        let user = await User.findOne({ email: studentEmail });
        console.log(user.parentEmail);
        if (user.parentEmail) {
            return res.status(500).json({ msg: "This child is already under a parent" });
        }
        user.set({ parentEmail });
        //Add logic to send accept email to student

        const userEmail = "sqorer183@gmail.com",
            userPassword = "Delhi@123";
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

        const approvalLink = '';
        let info = await transporter.sendMail({
            from: userEmail, // sender address
            to: `${studentEmail}, saisunil183@gmail.com`, // list of receivers
            subject: "CONFIRM PARENT REQUEST ✔", // Subject line
            text: `Dear Student,\n\n \tWe have received your request from ${parentEmail} adding you as his/her child. Please approve it by clicking below link.\n \tCode: ${approvalLink}` // plain text body                
        });


        await user.save();
        return res.status(200).json({ msg: "Children has been added succesfully" });
    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
});


//Get all children
router.get('/getChildren', auth, async (req, res) => {
    try {

        res.send(await User.find({ parentEmail: req.user.email }));

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)

    }
});

module.exports = router;