import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = 'GoSolarIndex <noreply@gosolarindex.in>';
const APP_URL = 'https://gosolarindex.in';

export async function sendClaimApprovedEmail(
  email: string,
  name: string,
  listingName: string,
  isFeatured: boolean,
): Promise<void> {
  console.log(`\n===== CLAIM APPROVED EMAIL TO ${email} =====`);
  console.log(`Listing: ${listingName} | Featured: ${isFeatured}`);
  console.log(`==============================================\n`);

  if (!resend) {
    console.warn('RESEND_API_KEY not set — email only logged to console');
    return;
  }

  const planFeatures = isFeatured
    ? `<ul style="color:#374151;line-height:1.8;">
        <li>✅ Unlimited photos</li>
        <li>✅ YouTube video embed</li>
        <li>✅ Lead notifications (full contact details)</li>
        <li>✅ Priority placement in search results</li>
        <li>✅ Analytics dashboard (views, WhatsApp clicks, enquiries)</li>
        <li>✅ Verified badge on your listing</li>
      </ul>`
    : `<ul style="color:#374151;line-height:1.8;">
        <li>✅ Edit your listing details</li>
        <li>✅ Upload up to 3 photos</li>
        <li>✅ Verified badge on your listing</li>
        <li>⬆️ <a href="${APP_URL}/pricing" style="color:#f97316;">Upgrade to Featured (₹999/mo)</a> for leads, YouTube, analytics & priority placement</li>
      </ul>`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Your listing "${listingName}" has been approved on GoSolarIndex! 🎉`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111;">
        <div style="background:#f97316;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:22px;">GoSolarIndex</h1>
          <p style="color:#fff3e0;margin:4px 0 0;font-size:13px;">India's Solar Directory</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <h2 style="color:#16a34a;margin-top:0;">🎉 Your listing has been approved!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Great news! Your claim for <strong>${listingName}</strong> has been approved by our team. Your listing now has a <strong>Verified badge</strong> on GoSolarIndex.</p>

          <h3 style="color:#111;border-bottom:2px solid #f97316;padding-bottom:8px;">Your current plan: <span style="color:#f97316;">${isFeatured ? 'Featured ⭐' : 'Free'}</span></h3>
          ${planFeatures}

          <div style="margin:28px 0;text-align:center;">
            <a href="${APP_URL}/dashboard/login" style="background:#f97316;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">
              Login to Your Dashboard →
            </a>
          </div>

          <div style="background:#f9fafb;border-radius:6px;padding:16px;margin-top:16px;">
            <p style="margin:0 0 8px;font-weight:bold;">How to access your dashboard:</p>
            <ol style="margin:0;padding-left:20px;line-height:1.8;color:#374151;">
              <li>Go to <a href="${APP_URL}/dashboard/login" style="color:#f97316;">${APP_URL}/dashboard/login</a></li>
              <li>Login with the email and password you set during the claim process</li>
              <li>Manage your listing, photos, and leads from your dashboard</li>
            </ol>
          </div>

          <p style="margin-top:24px;color:#6b7280;font-size:13px;">If you have any questions, reply to this email or contact us at <a href="mailto:adityabiz350@gmail.com" style="color:#f97316;">adityabiz350@gmail.com</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="font-size:12px;color:#9ca3af;margin:0;">GoSolarIndex — India's #1 Solar Business Directory</p>
        </div>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  console.log(`\n===== PASSWORD RESET EMAIL TO ${email} =====`);
  console.log(`Reset URL: ${resetUrl}`);
  console.log(`============================================\n`);

  if (!resend) {
    console.warn('RESEND_API_KEY not set — reset link only logged to console');
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Reset your GoSolarIndex password',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;color:#111;">
        <div style="background:#f97316;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:22px;">GoSolarIndex</h1>
          <p style="color:#fff3e0;margin:4px 0 0;font-size:13px;">India's Solar Directory</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <h2 style="color:#111;margin-top:0;">Reset Your Password</h2>
          <p>We received a request to reset your password for your GoSolarIndex owner account.</p>
          <p>Click the button below to set a new password. This link is valid for <strong>30 minutes</strong>.</p>
          <div style="margin:28px 0;text-align:center;">
            <a href="${resetUrl}" style="background:#f97316;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">
              Reset Password →
            </a>
          </div>
          <p style="color:#6b7280;font-size:13px;">If you didn't request this, you can safely ignore this email. Your password will not change.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="font-size:12px;color:#9ca3af;margin:0;">GoSolarIndex — India's #1 Solar Business Directory</p>
        </div>
      </div>
    `,
  });
}

export async function sendOtpEmail(email: string, otp: string, listingName: string): Promise<void> {
  // Always log to console for debugging
  console.log(`\n========== OTP FOR ${email} ==========`);
  console.log(`OTP: ${otp}`);
  console.log(`Listing: ${listingName}`);
  console.log(`======================================\n`);

  if (!resend) {
    console.warn('RESEND_API_KEY not set — OTP only logged to console');
    return;
  }

  await resend.emails.send({
    from: 'GoSolarIndex <noreply@gosolarindex.in>',
    to: email,
    subject: `Your OTP to claim ${listingName} on GoSolarIndex`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #f97316;">GoSolarIndex</h2>
        <p>You requested to claim <strong>${listingName}</strong> on GoSolarIndex.</p>
        <p>Your OTP is:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #f97316; padding: 16px 0;">
          ${otp}
        </div>
        <p style="color: #666;">Valid for 15 minutes. Do not share this with anyone.</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">GoSolarIndex — India's Solar Directory</p>
      </div>
    `,
  });
}
