import { logger } from "./logger";
import type { Booking } from "@workspace/db";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

async function sendEmail(options: EmailOptions): Promise<void> {
  const hasSmtp =
    process.env["SMTP_HOST"] &&
    process.env["SMTP_USER"] &&
    process.env["SMTP_PASS"];

  if (!hasSmtp) {
    logger.info(
      { to: options.to, subject: options.subject },
      "[EMAIL - console fallback]\n" + options.text,
    );
    return;
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env["SMTP_HOST"],
      port: Number(process.env["SMTP_PORT"] ?? 587),
      secure: false,
      auth: {
        user: process.env["SMTP_USER"],
        pass: process.env["SMTP_PASS"],
      },
    });

    await transporter.sendMail({
      from: `Second Life Kids <${process.env["SMTP_USER"]}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    logger.info({ to: options.to, subject: options.subject }, "Email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send email");
  }
}

export async function sendCustomerConfirmation(booking: Booking): Promise<void> {
  const pickupDate = new Date(booking.pickupDate + "T00:00:00").toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const addressLines = [
    booking.addressLine1,
    booking.addressLine2,
    booking.suburb,
    booking.state,
    booking.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  const firstName = booking.customerName.split(" ")[0] ?? booking.customerName;

  const text = `
G'day ${firstName},

Your pickup is confirmed — we'll see you on ${pickupDate}!

Here's everything you need to know:

BOOKING DETAILS
---------------
Booking ID: ${booking.id}
Collection size: ${booking.tierName}
Pickup date: ${pickupDate}
Collection window: 8:30 AM – 5:00 PM
Address: ${addressLines}
${booking.safePlaceInstructions ? `Where to leave items: ${booking.safePlaceInstructions}` : ""}

BEFORE YOUR PICKUP
------------------
- Pack everything into bags or boxes (no need to sort — we do that)
- Keep items clean, dry, and accessible
- Leave them outside by 8:30 AM — you don't need to be home
- Pop any bulky items somewhere easy to grab

CANCELLATION POLICY
-------------------
More than 24 hours before pickup: full refund, no questions asked
Within 24 hours of pickup: no refund — full booking amount is charged

To cancel, visit our website with your Booking ID: ${booking.id}

---

Thank you for choosing Second Life Kids, ${firstName}. Every bag you leave out means something good — clothes, toys, and gear that could have ended up in landfill get sorted, redirected, and given a proper second life with another family who needs them.

We can't wait to collect.

Kind regards,
The Second Life Kids team
secondlifekids.com.au
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:#2d6a4f;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Second Life Kids</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Mornington Peninsula · Casey · Frankston</p>
          </td>
        </tr>

        <!-- Hero message -->
        <tr>
          <td style="padding:40px 40px 24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:28px;">✅</p>
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a2e1a;">You're all booked in, ${firstName}!</h1>
            <p style="margin:0;font-size:16px;color:#4a6741;">Your pickup is confirmed for <strong>${pickupDate}</strong>.</p>
          </td>
        </tr>

        <!-- Booking details card -->
        <tr>
          <td style="padding:0 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;border-radius:10px;padding:24px;">
              <tr><td>
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#2d6a4f;">Your Booking Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#666;width:40%;">Collection size</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a2e1a;font-weight:600;">${booking.tierName}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#666;">Pickup date</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a2e1a;font-weight:600;">${pickupDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#666;">Collection window</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a2e1a;font-weight:600;">8:30 AM – 5:00 PM</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#666;">Address</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a2e1a;font-weight:600;">${addressLines}</td>
                  </tr>
                  ${booking.safePlaceInstructions ? `
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#666;">Leave items at</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a2e1a;font-weight:600;">${booking.safePlaceInstructions}</td>
                  </tr>` : ""}
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#666;">Booking ID</td>
                    <td style="padding:6px 0;font-size:13px;color:#888;font-family:monospace;">${booking.id}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Checklist -->
        <tr>
          <td style="padding:0 40px 24px;">
            <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1a2e1a;">Before your pickup</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                "Pack everything into bags or boxes — no need to sort, we do that",
                "Keep items clean, dry, and accessible",
                "Leave them outside by 8:30 AM — <strong>you don't need to be home</strong>",
                "Got bulky items? Leave them somewhere easy to grab",
              ].map(item => `
              <tr>
                <td style="padding:5px 0;vertical-align:top;width:24px;font-size:14px;color:#2d6a4f;">✓</td>
                <td style="padding:5px 0;font-size:14px;color:#333;">${item}</td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- Brand message -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaf4ee;border-left:4px solid #2d6a4f;border-radius:0 8px 8px 0;padding:16px 20px;">
              <tr><td>
                <p style="margin:0;font-size:14px;color:#2d5a3d;line-height:1.7;">
                  Every bag you leave out means something good. Clothes, toys, and gear that could have ended up in landfill get sorted, redirected, and given a proper second life with another family who needs them. Thank you for being part of that.
                </p>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Cancellation note -->
        <tr>
          <td style="padding:0 40px 32px;">
            <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">
              <strong>Cancellation policy:</strong> Full refund if cancelled more than 24 hours before pickup. No refund for cancellations within 24 hours — the full booking amount is charged. To cancel, visit our website with Booking ID: <code style="background:#f0f0f0;padding:1px 4px;border-radius:3px;">${booking.id}</code>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f4f7f4;padding:24px 40px;text-align:center;border-top:1px solid #e0e8e0;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#2d6a4f;">Second Life Kids</p>
            <p style="margin:0;font-size:13px;color:#888;">Mornington Peninsula, Victoria, Australia</p>
            <p style="margin:8px 0 0;font-size:12px;color:#aaa;">Questions? Reply to this email and we'll get back to you.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  await sendEmail({
    to: booking.email,
    subject: `You're booked in — ${pickupDate} | Second Life Kids`,
    text,
    html,
  });
}

export async function sendCancellationApprovedEmail(booking: Booking, refunded: boolean): Promise<void> {
  const pickupDate = new Date(booking.pickupDate + "T00:00:00").toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const firstName = booking.customerName.split(" ")[0] ?? booking.customerName;

  const refundLine = refunded
    ? "A full refund has been processed to your original payment method. Please allow 5–10 business days for it to appear."
    : "As this cancellation was requested within 24 hours of your pickup, a booking fee applies and no refund will be issued.";

  const text = `
G'day ${firstName},

Your cancellation request for your pickup on ${pickupDate} has been approved.

${refundLine}

Booking ID: ${booking.id}

If you need to book again in the future, you're always welcome back.

Kind regards,
The Second Life Kids team
secondlifekids.com.au
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:#2d6a4f;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Second Life Kids</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Mornington Peninsula · Casey · Frankston</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:28px;">✅</p>
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a2e1a;">Cancellation confirmed, ${firstName}</h1>
            <p style="margin:0;font-size:16px;color:#4a6741;">Your booking for <strong>${pickupDate}</strong> has been cancelled.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;border-radius:10px;padding:24px;">
              <tr><td>
                <p style="margin:0 0 12px;font-size:15px;color:#333;">${refundLine}</p>
                <p style="margin:0;font-size:13px;color:#888;">Booking ID: <code style="background:#f0f0f0;padding:1px 4px;border-radius:3px;">${booking.id}</code></p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;">
            <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
              If you need to book again in the future, you're always welcome back at <a href="https://secondlifekids.zero2seventeen.com" style="color:#2d6a4f;">secondlifekids.com.au</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f4f7f4;padding:24px 40px;text-align:center;border-top:1px solid #e0e8e0;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#2d6a4f;">Second Life Kids</p>
            <p style="margin:0;font-size:13px;color:#888;">Mornington Peninsula, Victoria, Australia</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  await sendEmail({
    to: booking.email,
    subject: `Cancellation confirmed — ${pickupDate} | Second Life Kids`,
    text,
    html,
  });
}

export async function sendCancellationRejectedEmail(booking: Booking): Promise<void> {
  const pickupDate = new Date(booking.pickupDate + "T00:00:00").toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const firstName = booking.customerName.split(" ")[0] ?? booking.customerName;

  const text = `
G'day ${firstName},

We've reviewed your cancellation request for your pickup on ${pickupDate}.

Unfortunately we're unable to approve this cancellation request. Your booking remains confirmed and your pickup is scheduled as planned.

If you have any questions, please reply to this email and we'll get back to you.

Booking ID: ${booking.id}

Kind regards,
The Second Life Kids team
secondlifekids.com.au
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:#2d6a4f;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Second Life Kids</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Mornington Peninsula · Casey · Frankston</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:28px;">📋</p>
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a2e1a;">Cancellation request update, ${firstName}</h1>
            <p style="margin:0;font-size:16px;color:#4a6741;">Regarding your pickup on <strong>${pickupDate}</strong>.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;border-radius:10px;padding:24px;">
              <tr><td>
                <p style="margin:0 0 12px;font-size:15px;color:#333;">
                  Unfortunately we're unable to approve this cancellation request. Your booking remains confirmed and your pickup is scheduled as planned.
                </p>
                <p style="margin:0 0 12px;font-size:14px;color:#555;">
                  If you have any questions, please reply to this email and we'll get back to you as soon as possible.
                </p>
                <p style="margin:0;font-size:13px;color:#888;">Booking ID: <code style="background:#f0f0f0;padding:1px 4px;border-radius:3px;">${booking.id}</code></p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f4f7f4;padding:24px 40px;text-align:center;border-top:1px solid #e0e8e0;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#2d6a4f;">Second Life Kids</p>
            <p style="margin:0;font-size:13px;color:#888;">Mornington Peninsula, Victoria, Australia</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  await sendEmail({
    to: booking.email,
    subject: `Cancellation request update — ${pickupDate} | Second Life Kids`,
    text,
    html,
  });
}

export async function sendAdminQuoteNotification(quote: {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  suburb: string;
  postcode: string;
  description: string;
  preferredDate?: string | null;
  createdAt: Date;
}): Promise<void> {
  const notificationEmail =
    process.env["NOTIFICATION_EMAIL"] ?? process.env["SMTP_USER"];

  if (!notificationEmail) {
    logger.info({ quoteId: quote.id }, "No NOTIFICATION_EMAIL set, skipping quote notification");
    return;
  }

  const text = `
New quote request received!

Customer: ${quote.customerName}
Email: ${quote.email}
Phone: ${quote.phone}
Suburb: ${quote.suburb}
Postcode: ${quote.postcode}
${quote.preferredDate ? `Preferred date: ${quote.preferredDate}` : ""}

What they need collected:
${quote.description}

Quote ID: ${quote.id}
Submitted: ${new Date(quote.createdAt).toLocaleString("en-AU")}

Reply directly to ${quote.email} to follow up.
`;

  await sendEmail({
    to: notificationEmail,
    subject: `New Quote Request — ${quote.customerName} — ${quote.suburb}`,
    text,
  });
}

export async function sendAdminNotification(booking: Booking): Promise<void> {
  const notificationEmail =
    process.env["NOTIFICATION_EMAIL"] ?? process.env["SMTP_USER"];

  if (!notificationEmail) {
    logger.info(
      { bookingId: booking.id },
      "No NOTIFICATION_EMAIL set, skipping admin notification",
    );
    return;
  }

  const pickupDate = new Date(booking.pickupDate + "T00:00:00").toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const text = `
New paid booking — $${(booking.priceCents / 100).toFixed(2)} AUD

Customer: ${booking.customerName}
Email: ${booking.email}
Phone: ${booking.phone}
Address: ${booking.addressLine1}${booking.addressLine2 ? ", " + booking.addressLine2 : ""}, ${booking.suburb}, ${booking.state} ${booking.postcode}
Pickup date: ${pickupDate}
Tier: ${booking.tierName}
Price: $${(booking.priceCents / 100).toFixed(2)} AUD
${booking.safePlaceInstructions ? `Safe place: ${booking.safePlaceInstructions}` : ""}
${booking.itemNotes ? `Item notes: ${booking.itemNotes}` : ""}

Stripe session: ${booking.stripeSessionId ?? "N/A"}
Booking ID: ${booking.id}
`;

  await sendEmail({
    to: notificationEmail,
    subject: `💰 New Booking — ${booking.customerName} — ${pickupDate}`,
    text,
  });
}
