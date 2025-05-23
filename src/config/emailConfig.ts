import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { contactEmail } from '../templates/contactEmailTemplate';

dotenv.config();

interface EmailParams {
  name: string;
  email: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ name, email, html }: EmailParams) => {
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER, 
    subject: `Nest Message from ${name}`,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email sending failed.');
  }
};

export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
) => {
  const html = contactEmail(name, email, message);
  return sendEmail({ name, email, html });
};
