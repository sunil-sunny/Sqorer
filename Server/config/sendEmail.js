const nodemailer = require("nodemailer");

const sendEmail = async (receiver, subject, content) => {

    try {
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

        //"PASSWORD RESET REQUEST ✔"
        let info = await transporter.sendMail({
            from: userEmail, // sender address
            to: receiver, // list of receivers
            subject: subject, // Subject line
            text: content // plain text body                
        });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = sendEmail;