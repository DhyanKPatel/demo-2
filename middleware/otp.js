// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     secure: false, //true
//     port: 25, //465
//     auth: {
//         user: process.env.USER,
//         pass: process.env.PASS
//     }
// });

// const OTPsend = (Email, otp) => {
//     let mailDetail = {
//         from: process.env.USER,
//         to: Email,
//         subject: "OTP for new Password",
//         html: "<h3>Please click on given link to reset yout password </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
//     }

//     transporter.sendMail(mailDetail, function(error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }
// module.exports = OTPsend;

const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({ 
    service: 'Gmail',
    secure: false,//true
    port: 25,//465
    auth: {
        // user: "prajapatiravi.shivinfotech@gmail.com",
        // pass: "iciciflwcnsfhdfg"
        user : "dhyan.shivinfotech@gmail.com",
        pass : "mqzdfbarnwezdaeo"
    }, tls: {
        rejectUnauthorized: false
    }
});

const OTPsend = (email,otp) => { 
    console.log("email");
    let mailDetail = {
        to: email,
        subject: "OTP for new Password",
        html: "<h3>OTP for new password is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
    }
    console.log('html',mailDetail);


    let mailSending = transport.sendMail(mailDetail,  (error, res) => {
        if (error) throw error;
        else {
            logger.info("email has been sent");
        }
    })
    return mailSending;
};

module.exports = {
    OTPsend
}