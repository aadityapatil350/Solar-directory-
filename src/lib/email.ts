export async function sendOtpEmail(email: string, otp: string, listingName: string): Promise<void> {
  // Log to console always (for local dev / when SMTP not configured)
  console.log(`\n========== OTP FOR ${email} ==========`);
  console.log(`OTP: ${otp}`);
  console.log(`Listing: ${listingName}`);
  console.log(`======================================\n`);

  // TODO: add nodemailer/resend integration here when SMTP env vars are configured
  // Example with Resend:
  // if (process.env.RESEND_API_KEY) {
  //   const { Resend } = await import('resend');
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: 'GoSolarIndex <noreply@gosolarindex.in>',
  //     to: email,
  //     subject: `Your OTP to claim ${listingName} on GoSolarIndex`,
  //     html: `<p>Your OTP is: <strong>${otp}</strong>. Valid for 15 minutes.</p>`,
  //   });
  // }
}
