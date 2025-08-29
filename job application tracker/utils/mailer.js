// utils/mailer.js
const SibApiV3Sdk = require("@sendinblue/client");

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY
);

async function sendEmail(to, subject, text, html = null) {
  try {
    const response = await client.sendTransacEmail({
      sender: { email: process.env.EMAIL_USER, name: "Job Tracker" }, // must be verified sender in Sendinblue
      to: [{ email: to }], // ✅ dynamic recipient
      subject,
      textContent: text,
      htmlContent: html || `<p>${text}</p>`,
    });

    console.log("📧 Email sent successfully:", response.messageId || response);
  } catch (err) {
    console.error("❌ Sendinblue error:", err.response?.body || err.message);
  }
}

module.exports = sendEmail;
