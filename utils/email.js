const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
require("dotenv").config();

const { gmailContent, eventCreationEmailContent, citizenJoinEventEmailContent } = require('./emailTemplate.js'); // Assuming you have email templates
const secret_key = process.env.JWT_SECRET;

 const generateVerificationToken = (email) => {
    return jwt.sign({ email: email }, secret_key, { expiresIn: '1d' })
}

 const sendVerificationEmail = async (recipientEmail, verificationToken, username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailContent = gmailContent(verificationToken, username);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Email Verification',
            html: emailContent
        })

        console.log("Verification email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}

// When a citizen joins an event
 const citizenJoinEventEmail = async (recipientEmail, eventDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailContent = citizenJoinEventEmailContent(eventDetails); // Replace with the actual content

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'You have joined an Event',
            html: emailContent
        })

        console.log("Citizen join event email has been sent",recipientEmail);

    } catch (error) {
        console.error('Error sending citizen join event email:', error);
    }
}

// When an organizer creates an event
 const organizerEventMail = async (recipientEmail, eventDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailContent = eventCreationEmailContent(eventDetails); // Replace with the actual content

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Event Creation',
            html: emailContent
        })

        console.log("Event creation email has been sent");

    } catch (error) {
        console.error('Error sending event creation email:', error);
    }
}

module.exports = { sendVerificationEmail, generateVerificationToken, citizenJoinEventEmail, organizerEventMail };
