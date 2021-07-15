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
        console.log(members + ' adding');
        let studentsEligible = true;
        let isExits = false;
        for (let i = 0; i < members.length; i++) {
            console.log(members[i]);
            let student = await User.findOne({ email: members[i] })
            console.log(student)
            if (!student) {
                console.log('a student is not eligible')
                studentsEligible = false;
                break;
            } else {
                const teamMembers = team.members;
                for (let j = 0; j < teamMembers.length; j++) {
                    if (members[i] === teamMembers[j].email) {
                        isExits = true;
                        break;
                    }
                }

            }
        }
        console.log(isExits);
        console.log(studentsEligible);
        const userEmail = "sqorer183@gmail.com",
            userPassword = "Delhi@123";
        if (!isExits && studentsEligible) {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: `${userEmail}`, // email of the app
                    pass: `${userPassword}`, // password of the app
                },
            });

            for (let i = 0; i < members.length; i++) {
                console.log('sending email to' + members[i])
                let info = await transporter.sendMail({
                    from: userEmail, // sender address
                    to: members[i], // list of receivers
                    subject: "TEAM JOINING REQUEST ✔", // Subject line
                    text: `Dear user,\n\n \t You have been invite to be part of a new team. Please click the link below to accept or decline.
                        \n \t link : ` // plain text body                
                });
                await team.addMember(members[i]);
            }

            return res.status(200).json({
                msg: "A confimation email is sent to student. " +
                    "They will be a part of team once they accepts the request"
            });
        } else {
            console.log('throwing errors')
            throw new Error('One of the students are not registered with sqorer');
        }

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `${error}` });
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
        console.log('creation started')
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

        let isExits = true;
        for (let i = 0; i < members.length; i++) {
            console.log(members[i].email);
            let student = await User.findOne({ email: members[i].email });
            if (!student) {
                isExits = false;
            }
        }

        if (isExits) {
            members.forEach(async (element) => {
                console.log('sending email to ' + element.email)
                let info = await transporter.sendMail({
                    from: userEmail, // sender address
                    to: `${element.email}`, // list of receivers
                    subject: "TEAM JOINING REQUEST ✔", // Subject line
                    text: `Dear user,\n\n \t You have been invite to be part of ${name}. Please click the link below to accept or decline.
                        \n \t link : ` // plain text body                
                });
            });
            let team = new Team({ name, avatar, teacherId, members });
            console.log('confimed team is ' + team)
            await team.save();
            return res.json(team);
        } else {
            throw new Error('One of the students are not registered with sqorer');
        }

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `${error}` });
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

router.post('/acceptStudent', async (req, res) => {

})

module.exports = router;7