const mongoose = require("mongoose");

const TeacherStudentSchema = mongoose.Schema({
    teacherId: {
        type: String
    },
    students: [{
        email: {
            type: String,
            required: true
        }
    }
    ]
});

TeacherStudentSchema.methods.addStudent = async function (email) {
    const teacherStudent = this;
    teacherStudent.students = teacherStudent.students.concat({ email });
    await teacherStudent.save();
    return email;
}

module.exports = TeacherStudent = mongoose.model("teacher-student", TeacherStudentSchema);