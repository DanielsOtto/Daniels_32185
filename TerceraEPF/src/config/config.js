import dotenv from 'dotenv';
dotenv.config();


export const PORT = process.env.PORT;
export const MODO = process.env.MODO;
// MongoDB
export const CNX_STR = process.env.CNX_STR;
export const CNX_sessions = process.env.CNX_sessions;
export const DB_NAME = process.env.DB_NAME;

//HASH
export const SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;


// EMAILS
export const NODEMAILER_CONFIG = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
};

//SESSION  SECRET CODE
export const SESSION_CODE = process.env.SESSION_SECRET