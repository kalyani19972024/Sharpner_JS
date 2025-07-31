
const User = require('../models/User');
const Sib = require('sib-api-v3-sdk');
const  sequelize  = require('../utils/db');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: 'If the email exists, a mail has been sent' });
    }

    // Initialize Sendinblue
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = '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'; // replace with actual key

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = { email: 'kalyani.brm@gmail.com', name: 'Kalyani Sahu' }; // your sender email
    const receivers = [{ email }];

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Reset Password',
      textContent: `Hi, click this link to reset your password: https://example.com/reset-password`,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending mail:', error);
    res.status(500).json({ error: 'Could not send email' });
  }
};
