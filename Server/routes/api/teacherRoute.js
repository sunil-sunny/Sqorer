const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const auth = require("../middleware/auth");
const TeacherStudent = require('../../models/teacher-student');

//get students under teacher
router.get('/getStudents', auth, async (req, res) => {
    try {
        const groupId = req.params.id;
        let team = await TeacherStudent.findOne({ teacherId: req.user._id });
        let emailMembers = team.students;
        let members = [];
        for (var i = 0; i < emailMembers.length; i++) {
            console.log(emailMembers[i].email);
            const user = await User.findOne({ email: emailMembers[i].email });
            members.push(user);
        }

        res.send(members);

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)

    }
});


//Add student to Teacher profile
router.post('/addStudent', auth, async (req, res) => {
    try {
        const studentEmail = req.body.studentEmail;
        let teacher = await TeacherStudent.findOne({ teacherId: req.user._id });
        if (teacher) {
            teacher.addStudent(studentEmail);
            return res.status(200).json({ msg: "Student has been added" });
        } else {
            let newTeacher = new TeacherStudent({ teacherId: req.user._id });
            await newTeacher.save();
            newTeacher.addStudent(studentEmail);
            return res.status(200).json({ msg: "Student has been added" });
        }

    } catch (error) {
        console.log(`${error}`);
        return res
            .status(500)
            .json({ msg: `Server error ${error}` });
    }
})



module.exports = router;

