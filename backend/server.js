import { sendEmail } from './emailVerify.js';
import express from 'express';
import "dotenv/config";
import { createConnection } from 'mysql2/promise';
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

const hashPassword = (password) => {
    const salt = genSaltSync();
    const hash = hashSync(password.toString(), salt);
    return hash;
}


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
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});




/**
 * Handles user registration by inserting a new user 
 * into the database with hashed password
 */
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO user (email, name, password, is_admin, is_verified) VALUES (?)";
    const hash = hashPassword(req.body.password.toString());
  
    const values = [req.body.email, req.body.name, hash, "no", "no"];
    db.query(sql, [values], (err, result) => {
      

        if (err) {
            return res.json("Error! Email already exists");
        }
        console.log(req.body.password + "\n");
            return res.json(result);
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
app.post('/login/otp', (req, res) => {
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
 * Handles user login by verifying the provided 
 * credentials against those stored in the database
 */
app.post('/login', (req, res) => {
    const sql = "SELECT password FROM user WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
   const hash = comparePassword(req.body.password.toString(), result[0].password.toString());
        if (err) {

            console.error("Error during login query: ", err);
            return res.json("Error");
        }
        if(!hash){
            
            return res.json("Password Incorrect");
        }
        if (result.length > 0) {
          console.log(err);
        
            return res.json("Success");
        } else {
          console.error("Error during login query: ", err);
            return res.json("Failure");
        }
    })
})


app.put('/verify-otp', (req, res) => {
    const sql = "UPDATE user SET is_verified = 'yes' WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error("Error during OTP verification: ", err);
            return res.json("Error! Failed to verify OTP");
        }
        else {
            
            return res.json("Account successfully verified");
        }
    });
});


app.get('/login/:email', async (req, res) => {
    try{
    const [rows] = await parseConnectionUrl.execute("SELECT * FROM user WHERE email = ?",
    [req.params.email]
    );

    if (rows.length === 0) {
        return res.status(404).json({
            status: 404,
            message: "User not found",
            data: null
        });
    }
    res.status(200).json({
        status: 200,
        message: "User retrieved successfully",
        data: rows[0] 
    });

}catch(err){
    res.status(500).json({
        status:500,
        message: err.message,
        data: null
    })
}   });


/**
 * Establishes a connection to the MySQL database 
 * and starts the Express server on port 8081
 */
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    return;
    } 

        console.log('Connected to the database');

        return;
});
    
app.listen(8081, () => {
    console.log('Listening on port 8081');
})

