"use server";

export type AuditState =
  | { status: "idle" }
  | { status: "error"; message: string; values: Record<string, string> }
  | { status: "sent" };

export async function requestAudit(
  _prev: AuditState,
  formData: FormData,
): Promise<AuditState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();
  const values = {
    name: field("name"),
    company: field("company"),
    city: field("city"),
    email: field("email"),
    phone: field("phone"),
    notes: field("notes"),
  };

  const missing = (["name", "company", "city", "email"] as const).filter((k) => !values[k]);
  if (missing.length) {
    return {
      status: "error",
      message: "A few fields are empty. We need your name, company, city and email to build the audit.",
      values,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return {
      status: "error",
      message: "That email looks incomplete. Check it so we can send your audit.",
      values,
    };
  }

  // TODO: deliver the request (email, CRM, sheet). Until then it only lands in the server logs.
  console.log("[audit-request]", values);

  return { status: "sent" };
}
