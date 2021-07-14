const express = require("express");
const router = express.Router();
const Team = require("../../models/team");
const User = require("../../models/user");
const auth = require("../middleware/auth");
const nodemailer = require('nodemailer')

//Allow user to add member in his team
router.post('/addMembers', auth, async (req, res) => {
    try {

        const { teamId, members } = req.body;
        const team = await Team.findOne({ _id: teamId });
        console.log(members);
        for (let i = 0; i < members.length; i++) {
            console.log(members[i]);
            const teamMembers = team.members;
            let isExits = false;
            for (let j = 0; j < teamMembers.length; j++) {
                if (members[i] === teamMembers[j].email) {
                    isExits = true;
                    break;
                }
            }
            if (!isExits) {
                await team.addMember(members[i]);
            }
        }

        return res.status(200).json({ msg: "Students has been added" });
    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})

//remove users from team
router.put('/removeMembers', auth, async (req, res) => {

    try {
        const { teamId, member } = req.body;
        const team = await Team.findOne({ _id: teamId });
        team.members = team.members.filter((email) => {
            return email.email !== member
        })
        await team.save();
        res.status(200).json({ msg: 'Student has been removed' });
    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})

//Allow user to add member in his team
router.put('/:id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ msg: `We can't find any correspondance, Please sign out then sign in` });

        const team = await Team.findOne({ owner: req.params.id });
        if (!user)
            return res.status(404).json({ msg: `We can't find any correspondance, Please create a team before` });

        const { members } = req.body;

        members.map(item => {
            team.members.push(item);
        })

        await team.save();
        return res.json(team);
    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})

//Create Team
router.post('/createTeam', auth, async (req, res) => {
    try {
        const { name, avatar, members } = req.body;
        const teacherId = req.user._id;
        let team = new Team({ name, avatar, teacherId, members });
        await team.save();

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
        members.forEach(async (element) => {

            console.log('------' + element.email)
            let info = await transporter.sendMail({
                from: userEmail, // sender address
                to: `${element.email}, saisunil183@gmail.com`, // list of receivers
                subject: "PASSWORD RESET REQUEST ✔", // Subject line
                text: `Dear user,\n\n \tWe have received your request to reset your password. Please copy the code below.\n \tCode: ${code}` // plain text body                
            });
        });

        return res.json(team);
    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})



router.get('/getStudentTeams', auth, async (req, res) => {

    try {

        const userType = 'Student';
        let student = await User.findOne({ userType, _id: req.user._id });
        let teams = await Team.find({});
        let userTeams = [];
        let email = student.email;

        for (var j = 0; j < teams.length; j++) {

            let ownerId = teams[j].teacherId;
            if (ownerId === student._id) {
                userTeams.push(team[j]);
            } else {
                let members = teams[j].members;

                for (let k = 0; k < members.length; k++) {
                    if (members[k].email === email) {
                        userTeams.push(teams[j]);
                        break;
                    }
                }
            }

        }

        res.status(200).json(userTeams);

    } catch (e) {
        console.log(e);
    }

})



router.get('/getAllStudentsWithTeams', auth, async (req, res) => {

    try {
        const teacherId = req.user._id;
        const userType = 'Student';
        let students = await User.find({ userType });
        let teams = await Team.find({ teacherId });
        let response = []
        for (var i = 0; i < students.length; i++) {
            let userTeams = [];
            let email = students[i].email;

            for (var j = 0; j < teams.length; j++) {
                let members = teams[j].members;

                for (let k = 0; k < members.length; k++) {
                    if (members[k].email === email) {
                        userTeams.push(teams[j]);
                        break;
                    }
                }
            }
            const body = {
                "student": students[i],
                "teams": userTeams
            }

            response.push(body);
        }
        res.status(200).json(response);

    } catch (e) {
        console.log(e);
    }

})

//get all teams under teacher
router.get('/getAllTeams/all', auth, async (req, res) => {
    try {

        const userId = req.user._id;
        await Team.find({ teacherId: userId }).exec(function (err, teams) {
            res.send(teams);
        });;

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})

//get team members
router.get('/getTeamMembers/:id', auth, async (req, res) => {
    try {
        const groupId = req.params.id;
        console.log(groupId);
        let team = await Team.findOne({ _id: groupId });
        let emailMembers = team.members;
        let members = [];
        for (var i = 0; i < emailMembers.length; i++) {
            const user = await User.findOne({ email: emailMembers[i].email });
            members.push(user);
        }

        res.send(members);

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})

module.exports = router;