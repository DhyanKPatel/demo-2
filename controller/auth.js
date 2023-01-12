const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const connection = require('../model/db');
const logger = require('../logger/logger');
const { registrationValidate,loginValidate,verifyEmail,verifyemailValidate,updateprofileValidate,validateResetPassword } = require('../validation/auth');
const  {OTPsend}  = require('../middleware/otp')
const otp = Math.floor((Math.random() * 10000 + 1));
logger.info(otp);

exports.signup = async(req, res) => {
    try{
        
        let { error } = registrationValidate(req.body);
        console.log('error',error);
        if (error) {
           
                var err1 = error.details[0].message;
                return res.status(400).send(err1)
                
                
            }if (!req.file){
            return res.status(400).send('Image is reqired filed')
            }
            else{
                const salt = await bcrypt.genSalt(10);
                console.log(req.body);
                const encryptedPassword = await bcrypt.hash(req.body.Password, salt);
                
                
                    const fname = req.body.fname;
                    const mname = req.body.mname;
                    const lname = req.body.lname;
                    const gender = req.body.gender;
                    const hobby = req.body.hobby;
                    const mobile = req.body.mobile;
                    const Image = req.file;
                    const city = req.body.city;
                    const Email = req.body.Email;
                    const Password = encryptedPassword;
                
                    const sql = `INSERT INTO
                    signup(fname,mname,lname,gender,hobby,mobile,Image,city,Email,Password) VALUES('${fname}','${mname}','${lname}','${gender}','${hobby}','${mobile}','${Image}','${city}','${Email}','${Password}')`;
                    connection.query(sql, (err, result) => {
                        if (err) {
                            logger.error('Error', err);
                        }
                        else {
                            res.status(200).json("Date inserted....")
                        }
                    })
                }
            }
    catch (err) {
        logger.error("err", err);
    }
}   

exports.authUser = async (req, res, next) => {
    console.log(req.body);
    try {
        let { error } = loginValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        else {
            var Email = req.body.Email;
            var Password = req.body.Password;
           
            connection.query(' SELECT * FROM `signup` WHERE Email = ?', [Email], async function (error, results, fields) {
                if (error) {
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                } else {

                    if (results.length > 0) {
                        const comparision = await bcrypt.compare(Password, results[0].Password)

                        console.log(results);
                        console.log(comparision);
                        if (comparision) {
                            res.send({
                                "code": 200,
                                "success": "login sucessfull"
                            })
                        }
                        
                        else {
                            res.send({
                                "code": 204,
                                "success": "Email and password does not match"
                            })
                        }
                    }
                    else {
                        res.send({
                            "code": 206,
                            "success": "Email does not exits"
                        });
                    }
                }
            });
        }
    }
    catch (err) {
        logger.error('Error', err);
    }
}


exports.forgetPassword = async (req, res) => {
    try {
        const { error } = verifyEmail(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const Email = req.body.Email;
            connection.query('SELECT * FROM `signup` WHERE Email = "'+Email+'"', async (error, result) => {
                if (result) {
                    OTPsend(Email,otp);
                    res.status(200).json('OTP send');
                }
                else {
                    res.send('user not found')
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.verifyOtp = async (req, res, next) => {
    try {
        if (otp == req.body.otp) {
            res.send('OTP Verify...');
        }
        else {
            res.send('Invalid Otp....')
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { error } = verifyemailValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const Password = req.body.Password;
            // console.log(Password);
            const salt = await bcrypt.genSalt(10);
            const bcryptpassword = await bcrypt.hash(Password, salt);
            console.log(bcryptpassword);
            connection.query('UPDATE `signup` SET Password = ?', [bcryptpassword], (err, response) => {

                if (response) {
                    res.send('password updated')
                } else {
                    logger.error('Error', err);
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.viewProfile = async (req, res) => {
    const Email = req.user.Email
    console.log("------",Email);
    console.log(Email);
    
    connection.query('SELECT * FROM `signup` WHERE Email=?', [Email], (err, result) => {
        if (result) {
            console.log(result);
            res.send(result);
        } else {
            console.log('Error',err);
            logger.error('Error', err);
        }
    })
}


exports.editProfile = async (req, res) => {
    try {
        const { error } = updateprofileValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }if (!req.file){
            return res.status(400).send('Image is reqired filed')
            } else {
            const fname = req.body.fname;
            const mname = req.body.mname;
            const lname = req.body.lname;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const mobile = req.body.mobile;
            const Image = req.file.filename;
            const city = req.body.city;
            const Email = req.body.Email;
            console.log(req.user.Email);
            connection.query(`UPDATE signup SET fname='${fname}',mname='${mname}',lname='${lname}',gender='${gender}',hobby='${hobby}',mobile='${mobile}',Image='${Image}',city='${city}',Email='${Email}' WHERE Email ='${req.user.Email}'`, function (err, response) {

                if (response) {
                    res.send('Data updated')
                } else {
                    logger.error('Error', err);
                }
            })
        }
    } catch (err) {

        logger.error('Error', err);
    }
}

exports.resetpassword = async (req, res) => {
    const { error } = validateResetPassword(req.body);
    if (error) {
        if (error.details[0].context.key == 'Email') {
            var err1 = error.details[0].message;
            return res.status(400).send(err1)
        }
        if (error.details[0].context.key == 'Password') {
            var err5 = error.details[0].message;
            return res.status(400).send(err5)
        }
        if (error.details[0].context.key == 'ConfirmPassword') {
            var err6 = error.details[0].message;
            return res.status(400).send(err6)
        }

    }
    const { Email, Password } = req.body;
    connection.query('SELECT * FROM signup WHERE email=?', [Email], async (err, result) => {
        if (result.length > 0) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(Password, salt);
            connection.query(`UPDATE signup SET password='${hashPassword}' WHERE email=?`, [Email], async (err, updateResult) => {

                if (updateResult) {
                    res.send('Password Will Be Update')
                }
                else {
                    res.status(400).send('Something Was Wrong')
                }
            })
        }
        else {
            res.status(400).send('User not found')
        }
    })

}

