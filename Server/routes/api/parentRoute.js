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
        user.set({ parentEmail });
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