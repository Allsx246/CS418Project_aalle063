/*import "dotenv/config";
import { createTransport } from "nodemailer";
import {createTransport} from "nodemailer";*/

const express = require('express');
const mysql2 = require('mysql2/promise');
const mysql = require('mysql2');
const cors = require('cors');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const app = express();
app.use(cors({
    origin: 'http://localhost:5174'
}));
app.use(express.json());

const hashPassword = (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password.toString(), salt);
    return hash;
}

/*
// Create a transporter object using SMTP transport
const transport = createTransport({
host: "smtp.gmail.com", // Gmail SMTP server
port: 587, // TLS port for Gmail
secure: false, // Use TLS, not SSL
requireTLS: true, // Force TLS
auth: {
user: process.env.SMTP_EMAIl, // Your Gmail address (from .env)
pass: process.env.SMTP_PASSWORD, // Your Gmail app password (from .env)
},
});

const mailOptions = {
from: process.env.SMTP_EMAIl, // Sender address (must match authenticated user)
to: email, // Recipient email
subject: mailSubject, // Email subject line
html: body, // Email body as HTML
};

// Load environment variables from .env file
import "dotenv/config";
// Import nodemailer's createTransport function
import { createTransport } from "nodemailer";
/**
* Sends an email using SMTP (Gmail in this case)
*
* @param {string} email - Recipient's email address
* @param {string} mailSubject - Subject of the email
* @param {string} body - HTML content of the email
*
export function sendEmail(email, mailSubject, body) {
// Create a transporter object using SMTP transport
const transport = createTransport({
host: "smtp.gmail.com", // Gmail SMTP server
port: 587, // TLS port for Gmail
secure: false, // Use TLS, not SSL
requireTLS: true, // Force TLS
auth: {
user: process.env.SMTP_EMAIl, // Your Gmail address (from .env)
pass: process.env.SMTP_PASSWORD, // Your Gmail app password (from .env)
},
});
// Define email options
const mailOptions = {
from: process.env.SMTP_EMAIl, // Sender address (must match authenticated user)
to: email, // Recipient email
subject: mailSubject, // Email subject line
html: body, // Email body as HTML
};
// Send the email
transport.sendMail(mailOptions, function (err, result) {
if (err) {
console.log("Error in sending email"); // Log failure
} else {
console.log("Email has been sent"); // Log success
}
});
}

// 5) Generate OTP and store in DB (5 min expiry)
 const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
 const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

await connection.execute( ` INSERT INTO email_otp (email, otp, expires_at) VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE
otp = VALUES(otp), expires_at = VALUES(expires_at) `, [u_email, otp, expiresAt] );

// 6) Send OTP via email 
const subject = "Your Login OTP"; 
const body = ` 
<h2>Login Verification</h2>
<p>Your OTP is:</p>
<h1 style="letter-spacing:2px;">${otp}</h1>
<p>This OTP will expire in 5 minutes.</p> `;

sendEmail(u_email, subject, body);*/

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

const db2 = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'login'
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'login'
});


/*
const insertAdmin = async () => {
try{

const [admin] =await db2.query('SELECT COUNT(*) FROM user WHERE is_admin = "yes" and is_verified = "yes"');
const [rows] =await db2.query('SELECT COUNT(*) AS count FROM user');
const rowCount = rows[0].count;
const adminCount = admin[0].count;
const sql1 = "INSERT INTO user (email, name, password, is_verified, is_admin)  VALUES (?)";
const values1 = ['john@example.com', 'John Doe', hashPassword('password123'), "yes", "yes"];

console.log(adminCount);
if (rowCount === 0 || adminCount === 0) {
db.query(sql1, [values1], (err, result) => {        

    if (err) {
        console.error("Error inserting Admin: ", err);
    }
    console.log("Admin inserted: ", result);
});
}
} catch (err) {
    console.error("Error checking user count: ", err);
}

}

*/

/*
const sql = ('SELECT COUNT(*) FROM user WHERE is_admin = "yes" and is_verified = "yes"');
const adminCount = admin[0].count;
const sql1 = "INSERT INTO user (email, name, password, is_verified, is_admin)  VALUES (?)";
const values1 = ['john@example.com', 'John Doe', hashPassword('password123'), "yes", "yes"];

console.log(adminCount);

db.query(sql, [values1], (err, result) => {        

    if (result[0].count === 0) {
        db.query(sql1, [values1], (err, result) =>  {

            if (err) {
                console.error("Error inserting Admin: ", err);
                return;
            }else{
        console.error("Admin inserted: ", err);
        return;

        }
        {
        console.log("Admin already exists, skipping insertion.");
        return;
    }
);
}else{
    console.log("Admin already exists, skipping insertion.");

}});

*/
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO user (email, name, password) VALUES (?)";
    const hash = hashPassword(req.body.password);
   // insertAdmin();
    const values = [req.body.email, req.body.name, hash];
    db.query(sql, [values], (err, result) => {
      

        if (err) {
            return res.json("Error");
        }

            return res.json(result);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT password FROM user WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
   const hash = comparePassword(req.body.password.toString(), result[0].password.toString());
        if (err) {
           // console.error("Error during login query: ", err);
            return res.json("Error");
        }
        if(!hash){
            return res.json("Password Incorrect");
        }
        if (result.length > 0) {
          console.log(err);
            
            return res.json("Success");
        } else {
          
            return res.json("Failure");
        }
    })
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    return;
    } 

        console.log('Connected to the database');
       // insertAdmin();
        return;
});
    
app.listen(8081, () => {
    console.log('Listening on port 8081');
})

