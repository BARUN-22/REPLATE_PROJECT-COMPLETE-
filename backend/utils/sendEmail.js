const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendConfirmationEmail = async (donationData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"RePlate" <${process.env.EMAIL_USER}>`,
    to: donationData.email,
    subject: "Thank You for Your Donation!",
    html: `
      <h2>Hi ${donationData.name},</h2>
      <p>Thank you for donating food through RePlate. We truly appreciate your support!</p>
      <p><strong>Donation Details:</strong></p>
      <ul>
        <li>Pickup Date: ${donationData.pickupDate}</li>
        <li>Phone: ${donationData.phone}</li>
        <li>Address: ${donationData.address}</li>
      </ul>
      <p>We will contact you soon for pickup coordination.</p>
      <br/>
      <p>With gratitude,<br/>RePlate Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationEmail;
