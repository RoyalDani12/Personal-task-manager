
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // transporter  which service you use yahoo gmail outlook
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
      // the email sent from  to whom title of the email
  const mailOptions = {
    from: `"DaniRoyal Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    // Using the 'html' property allows for buttons and styling
    html: options.html,
    // 'text' is a fallback for simple email apps
    text: options.message, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${options.email}  please check you email and reset your password`);
  } catch (error) {
    console.error("Nodemailer Error:", error.message);
    throw error;
  }
};

export default sendEmail;