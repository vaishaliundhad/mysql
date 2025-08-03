// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// // Gmail SMTP transporter
// console.log("Sending email from:", process.env.EMAIL_USER);
// console.log("Sending password from:", process.env.EMAIL_PASS);
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, 
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//         rejectUnauthorized: false,
//     },
// });

// export const sendEmail = async({to , subject , html})=>{
//     const mailOptions = {
//         from :`Test <${process.env.EMAIL_USER}>`,
//         to,
//         object,
//         subject,
//         html
//     }
//     try{
//         const info = await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully" , info.response);
//         return info
//     }
//     catch(error){
//         console.log("Error sending email" , error);
//         throw new error("failed to send email")
//     }
// }

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Gmail SMTP transporter
console.log("Sending email from:", process.env.EMAIL_USER);
console.log("Sending password from:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: `Test <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
