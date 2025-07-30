// ✅ src/lib/sendEmail.ts

import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'host' and 'port' for custom SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MyShop" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
