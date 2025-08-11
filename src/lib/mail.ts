import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // or SMTP config for your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"ShopSmart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Verify your email</h1>
      <p>Please click the link below to verify your account:</p>
      <a href="${verificationUrl}" target="_blank">Verify Email</a>
    `
  });
}
