export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const {
    type,
    name,
    email,
    phone,
    service,
    location,
    message,
    // Influencer-specific fields
    platform,
    handle,
    audience_size,
    intro,
    agreement_request,
  } = body;

  if (!name || !email) {
    return new Response(JSON.stringify({ error: "Name and email are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const isInfluencer = type === "influencer";

  const subject = isInfluencer
    ? `New Influencer Inquiry: ${name}${platform ? ` (${platform})` : ""}`
    : `New Contact: ${name} — ${service || "General Inquiry"}`;

  const html = isInfluencer
    ? `
        <h2>New Influencer Program Application</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Primary Platform</td><td style="padding:8px;border-bottom:1px solid #eee;">${platform || "Not specified"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Handle / Channel</td><td style="padding:8px;border-bottom:1px solid #eee;">${handle || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Audience Size</td><td style="padding:8px;border-bottom:1px solid #eee;">${audience_size || "Not specified"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Wants Agreement Form</td><td style="padding:8px;border-bottom:1px solid #eee;">${agreement_request ? "Yes" : "No"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Introduction</td><td style="padding:8px;">${intro || "No intro provided"}</td></tr>
        </table>
      `
    : `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${service || "Not selected"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Location</td><td style="padding:8px;border-bottom:1px solid #eee;">${location || "Not selected"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;">${message || "No message"}</td></tr>
        </table>
      `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "RevivalMD <noreply@revivalmd.com>",
      to: "frontoffice@arshadmedical.com",
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/.netlify/functions/contact",
};
