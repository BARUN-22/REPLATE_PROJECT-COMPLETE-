const Donation = require('../model/Donation');
const nodemailer = require('nodemailer');

exports.handleDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    console.log('✅ Donation saved to MongoDB');

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const mailOptions = {
      from: `"RePlate" <${process.env.EMAIL_USER}>`,
      to: donation.email,
      subject: "Thank You for Your Food Donation!",
      html: `
        <p>Dear ${donation.fullName},</p>
        <p>Thank you for donating food. We will pick it up from:</p>
        <p><strong>${donation.address}</strong></p>
        <p>on <strong>${donation.pickupDate}</strong>.</p>
        <p>Your support helps feed those in need. ❤️</p>
        <p>– The RePlate Team</p>
      `,
    };

   
    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent');

    res.status(200).json({ message: 'Donation submitted and email sent!' });

  } catch (error) {
    console.error('❌ Donation error:', error);
    res.status(500).json({ error: 'Something went wrong while submitting donation' });
  }
};
