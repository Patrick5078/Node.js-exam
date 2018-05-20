const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const sendMail = async(req,res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pbbdev15',
            pass: 'EEsama15'
        }
    });

    const mailOptions = {
        from: 'pbbdev15@gmail.com',
        to: 'brix.bjerg@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail
