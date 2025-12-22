const hasText = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0;

const isValidPhone = (value: string) =>
  value.replace(/\D/g, "").length >= 10;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  const { name, phone, details } = payload as Record<string, unknown>;

  if (!hasText(name) || !hasText(phone) || !hasText(details)) {
    return Response.json(
      { error: "Name, phone, and details are required." },
      { status: 400 },
    );
  }

  if (!isValidPhone(String(phone))) {
    return Response.json(
      { error: "Please provide a valid phone number." },
      { status: 400 },
    );
  }

  if (String(details).trim().length < 10) {
    return Response.json(
      { error: "Please add a few more details about the request." },
      { status: 400 },
    );
  }

  // Replace with real CRM or email integration later.
  console.info("Lead capture:", {
    name,
    phone,
    details,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
