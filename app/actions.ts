"use server";

import { Resend } from "resend";

export type AuditState =
  | { status: "idle" }
  | { status: "error"; message: string; values: Record<string, string> }
  | { status: "sent" };

const TO = "firstpinlocal@gmail.com";
// No verified domain yet, so send from Resend's shared test address.
const FROM = "Firstpin <onboarding@resend.dev>";

const SEND_FAILED =
  "Your request didn't go through on our end. Try again in a minute, or email us at firstpinlocal@gmail.com.";

const FIELDS = [
  ["name", "Name"],
  ["company", "Company name"],
  ["city", "City / state"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["notes", "Questions"],
] as const;

type Values = Record<(typeof FIELDS)[number][0], string>;

export async function requestAudit(
  _prev: AuditState,
  formData: FormData,
): Promise<AuditState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();
  const values = Object.fromEntries(FIELDS.map(([key]) => [key, field(key)])) as Values;

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[audit-request] RESEND_API_KEY is not set");
    return { status: "error", message: SEND_FAILED, values };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: values.email,
      subject: `New audit request: ${values.company} (${values.city})`,
      text: FIELDS.map(([key, label]) => `${label}: ${values[key] || "-"}`).join("\n"),
      html: renderHtml(values),
    });
    if (error) {
      console.error("[audit-request] Resend error", error);
      return { status: "error", message: SEND_FAILED, values };
    }
  } catch (err) {
    console.error("[audit-request] send threw", err);
    return { status: "error", message: SEND_FAILED, values };
  }

  return { status: "sent" };
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderHtml(values: Values) {
  const rows = FIELDS.map(
    ([key, label]) => `
      <tr>
        <td style="padding:10px 16px 10px 0;border-bottom:1px solid #e2ded5;font-weight:700;color:#1B2A41;vertical-align:top;white-space:nowrap">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e2ded5;color:#2B2B2B;white-space:pre-wrap">${values[key] ? escapeHtml(values[key]) : "-"}</td>
      </tr>`,
  ).join("");

  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;max-width:560px">
  <h2 style="margin:0 0 4px;color:#1B2A41">New free audit request</h2>
  <p style="margin:0 0 16px;color:#555">Submitted on firstpinlocal.com. Reply to this email to answer them directly.</p>
  <table style="border-collapse:collapse;width:100%">${rows}</table>
</div>`;
}
