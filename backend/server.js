import { sendEmail } from './emailVerify.js';
import express from 'express';
import "dotenv/config";
import { createConnection } from 'mysql2/promise';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import * as fs from 'node:fs';
import helmet from 'helmet';



const app = express();

const hashPassword = (password) => {
    const salt = genSaltSync();
    const hash = hashSync(password.toString(), salt);
    return hash;
}



app.use(express.json());
app.use(cors({
    origin: 'https://project-cs418.web.app'

}));

// app.use(helmet());

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             frameAncestors: ["'self'"], 
//             //prevent framing from other sites
//         },
//     })
// );



/**
* Compares a raw (plain-text) password with a hashed password
*
* @param {string} raw - The plain-text password entered by the user
* @param {string} hashedPassword - The hashed password stored (e.g., in DB)
* @returns {boolean} - True if the passwords match, false otherwise
*/
const comparePassword = (raw, hashedPassword) => {
// Compare the plain-text password to the hash
return compareSync(raw, hashedPassword);

};


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME,
    ssl:{
    ca: fs.readFileSync("./isrgrootx1.pem")
    }
});







/**
 * Handles user registration by inserting a new user 
 * into the database with hashed password
 */
app.post('/signup', async (req, res) => {
    

    
    const sql = "INSERT INTO user (email, name, password, is_admin, is_verified) VALUES (?)";
    const hash = hashPassword(req.body.password.toString());
    const values = [req.body.email, req.body.name, hash, "no", "no"];
   db.query(sql, [values], (err, result) => {
        

        if (err) {

            return res.json("Error! Email already exists");
        }
        console.log(req.body.password + "\n");
            return res.json(result + 'success');
    })

})

// Generate a 6-digit OTP and set an expiration time of 5 minutes
const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

/**
 * Handles user registration by inserting a new user with a 
 * one-time password into the database, which can be used for 
 * email verification
 */
app.post('/login/otp', async (req, res) => {
    const sql = "INSERT INTO email_otp ( email, otp, expires_at) VALUES (?)";
    const values = [req.body.email, otp, expiresAt];
    db.query(sql, [values], (err, result) => {

        if (err) {
            console.error("Error during OTP insertion: ", err);
            return res.json("Error! Failed to generate OTP");
        }
            
        
        console.log(req.body.password + "\n");
            sendEmail(req.body.email, "Your OTP Code", `<p>Your OTP code is: </p><strong><h1 style="letter-spacing: 2px;">${otp}</h1></strong><p>This code will expire in 5 minutes.</p>`);
            console.log("OTP generated and email sent: " + otp);
            return res.json("Success " + otp);
    })
})


/**
 * Handles course advising requests by inserting the provided course plan
 * and related information into the database
 */
app.post('/course-advising', async (req, res) => {
    

    const sql = "INSERT INTO course (email, term, gpa, advising, name, level) VALUES (?)";

    const value=[req.body.email, req.body.lastTerm, req.body.GPA, req.body.advising, req.body.name, JSON.stringify(req.body.level)];
    db.query(sql, [value], (err, result) => {
        if (err) {
            console.error(" Error during course advising insertion: ", err);
            return res.json(" Error! Failed to submit course advising request");
        }
        return res.json("Course advising request successfully submitted.");
    });

});

/**
 * Handles user login by verifying the provided 
 * credentials against those stored in the database
 */
app.post('/login', async (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
   
        if (err || result[0] === undefined || result[0].is_verified === "no" || result[0].is_verified === null) {

            console.log("Error during login query: ", err);
            return res.json("Error");
        }
const hash = comparePassword(req.body.password.toString(), result[0].password.toString());

        if(!hash){
            
            return res.json("Password Incorrect");
        }
        if (result.length > 0) {
        
            return res.json("Success" + (result[0].is_admin === "yes" ? " Admin" : " Student"));
        } else {
        console.error("Error during login query: ", err);
            return res.json("Failure");
        }
    })
})

/**
 * 
 */
app.get('/course-history', async (req, res) => {
    const sql = "SELECT * FROM course WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error("Error fetching course history: ", err);
            return res.json("Error! Failed to fetch course history");
        }
        return res.json(result);
    });
});

/**
 * Verifies a user's email using a one-time password (OTP)
 */
app.put('/verify-otp', async (req, res) => {
    const sql = "UPDATE user SET is_verified = 'yes' WHERE email = ?";

     db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error("Error during OTP verification: ", err);
            return res.json("Error! Failed to verify OTP");
            console.log(err)
        }
        else {
            console.log(err + '2')
            return res.json("Account successfully verified");
        }
    });
});

/** 
 * Handles password reset by updating the user's password in the database
 */
app.post('/password-reset', async (req, res) => {
    const sql = "UPDATE user SET password = ? WHERE email = ?";
    const hash = hashPassword(req.body.password.toString());
    db.query(sql, [hash, req.body.email], (err, result) => {
        if (err ) {

            console.error("Error during password reset: ", err);
            return res.json("Error! Failed to reset password, make sure an account with that email exists");
        }   
        else {
            console.log("Password reset successful for email: " + req.body.email);
            return res.json("Password successfully reset");
        }
    });
});

/**
 * 
 * 
 */
app.put('/profile/update-name', async (req, res) => {
    const sql = "UPDATE user SET name = ? WHERE email = ?";
    db.query(sql, [req.body.name, req.body.email], (err, result) => {
        if (err ) { 
            console.error("Error during name change: ", err);
            console.log("Name change failed for email: " + req.body.email + " Attempted new name: " + req.body.name);
            return res.json("Error! Failed to change name, make sure an account with that email exists");
        }
        else {
            console.log("Name change successful for email: " + req.body.email + " New name: " + req.body.name);
            return res.json("Name successfully changed");
        }
    });
});

app.post('/course/history', async (req, res) =>{
    const sql = "INSERT INT0 "


});




/**
 * Establishes a connection to the MySQL database 
 * and starts the Express server on port 4000
 */

app.listen(4000)

