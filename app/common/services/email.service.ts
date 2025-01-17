import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";
import { loadConfig } from "../helper/config.hepler";
import { IAdmin } from "../../admin/admin.dto";
import { IUser } from "../../user/user.dto";

loadConfig();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};

export const resetPasswordEmailTemplate = (token = ""): string => `
<html>
  <body>
    <h3>Welcome to app</h3>
    <p>Click <a href="${process.env.FE_BASE_URL}/reset-password?token=${token}">here</a> to reset your password</p>
  </body>
</html>`;

export const userAdded = (data: IUser): string => `
<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333333;">New User Joined</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: left;">
          <p style="color: #555555; font-size: 16px; line-height: 1.5;">
            A new user has joined your platform. Here are the details:
          </p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${data.first_name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Joined At:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
      
        </td>
      </tr>
    </table>
  </body>
</html>`;


