function buildReservationEmail(reservation) {
  const text = [
    "A new reservation has been made.",
    "",
    `Name: ${reservation.name}`,
    `Phone: ${reservation.phone}`,
    `Date: ${reservation.date}`,
    `Time: ${reservation.time}`,
    `Guests: ${reservation.guests}`,
    `Language: ${reservation.language}`,
    reservation.notes ? `Notes: ${reservation.notes}` : "Notes: -",
    `Created: ${reservation.createdAt}`
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>New reservation</h2>
      <p><strong>Name:</strong> ${reservation.name}</p>
      <p><strong>Phone:</strong> ${reservation.phone}</p>
      <p><strong>Date:</strong> ${reservation.date}</p>
      <p><strong>Time:</strong> ${reservation.time}</p>
      <p><strong>Guests:</strong> ${reservation.guests}</p>
      <p><strong>Language:</strong> ${reservation.language}</p>
      <p><strong>Notes:</strong> ${reservation.notes || "-"}</p>
      <p><strong>Created:</strong> ${reservation.createdAt}</p>
    </div>
  `;

  return { text, html };
}

async function sendReservationEmail(reservation) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESERVATION_EMAIL || "diwanshgiri@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Halesi Reservations <onboarding@resend.dev>";

  if (!apiKey || apiKey === "your_real_key") {
    throw new Error("Add your real RESEND_API_KEY in .env.local and restart the dev server.");
  }

  const { text, html } = buildReservationEmail(reservation);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New reservation from ${reservation.name} for ${reservation.date} at ${reservation.time}`,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error: ${response.status} ${errorText}`);
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const reservation = {
      name: String(payload.name || "").trim(),
      phone: String(payload.phone || "").trim(),
      date: String(payload.date || "").trim(),
      time: String(payload.time || "").trim(),
      guests: String(payload.guests || "2").trim(),
      notes: String(payload.notes || "").trim(),
      language: String(payload.language || "en").trim(),
      createdAt: new Date().toISOString()
    };

    if (!reservation.name || !reservation.phone || !reservation.date || !reservation.time) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    await sendReservationEmail(reservation);
    return Response.json({ ok: true, email: { delivered: true } });
  } catch (error) {
    return Response.json(
      {
        error: "Reservation could not be sent.",
        details: error.message
      },
      { status: 500 }
    );
  }
}
