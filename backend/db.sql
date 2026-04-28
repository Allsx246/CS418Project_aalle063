CREATE DATABASE login;

Create table user(
    email varchar(255) NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    is_admin varchar(3),
    is_verified varchar(3)
)DEFAULT CHARSET=utf8mb4;

CREATE TABLE email_otp(
    email varchar(255) NOT NULL ,
    otp varchar(10) NOT NULL,
    expires_at DATETIME NOT NULL,
    CONSTRAINT fk_users
    FOREIGN KEY (email)
    REFERENCES user(email)
);

CREATE TABLE course(
    email varchar(255) NOT NULL,
    term varchar(255) NOT NULL,
    gpa varchar(10) NOT NULL,
    advising varchar(255),
    level int,
    name varchar(255),
    CONSTRAINT fk_user
    FOREIGN KEY (email)
    REFERENCES user(email)
);




CREATE TABLE admin(
    status varchar(25),
    message varchar(255)
);


