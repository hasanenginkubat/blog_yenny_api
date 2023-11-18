const nodemailer = require("nodemailer");
require('dotenv').config();
const { MAIL_USER, MAIL_PASSWORD } = process.env;

const transporter = async (email, subject, text, photo, video) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${MAIL_USER}`,
        pass: `${MAIL_PASSWORD}`
      },
    });

    let htmlContent = `
      <div style="background-color: rgb(217, 176, 255); padding: 20px; text-align: center; border-radius: 15px;">
        <p style="color: white; font-size: 20px; margin: 0;">${text}</p>
    `;

    if (photo) {
      htmlContent += `<img src="${photo}" /><br>`;
    }

    if (video) {
      htmlContent += `<video width="320" height="240" controls>
      <source src="${video}" type="video/mp4">
      <source src="${video}" type="video/webm">
      Your browser does not support the video tag.
    </video>`;
    }

    htmlContent += `</div>`;

    let info = await transporter.sendMail({
      to: email,
      subject: subject,
      html: htmlContent
    });

    console.log("Email enviado:", info.response);
    return info;
  } catch (error) {
    console.error("Ocurrió un error al enviar el correo:", error);
  }
};

module.exports = {
  transporter
};
