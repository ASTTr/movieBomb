import nodemailer from "nodemailer";
import user from "@/models/user.model";
import bcrypt from "bcryptjs";

export const mailer = async (email, emailType, userId) => {
  try {
    console.log(userId);
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType == "verify") {
      await user.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    } else if (emailType == "reset") {
      await user.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    const transport = await nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "temporary@gmail.com",
      to: email,
      subject:
        emailType == "verify" ? "Verify Your Email" : "Reset You Password",
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType == "verify" ? "Verify Your Email" : "RESET YOUR PASSWORD"
      }</p>
      <p>copy the below link in you browser</p>
      <span>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</span>
      `,
    };

    const response = await transport.sendMail(mailOptions);
    console.log(response);
  } catch (err) {
    throw new Error(err.message);
  }
};
