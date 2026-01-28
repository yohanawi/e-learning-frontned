"use server";

import { API_URL } from "@/lib/api";

type SubscribeState = {
  ok: boolean;
  message: string;
};

export async function subscribeNewsletter(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return { ok: false, message: "Please enter your email address." };
  }

  try {
    const res = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const msg =
        json?.message ||
        (typeof json?.errors?.email?.[0] === "string"
          ? json.errors.email[0]
          : null) ||
        "Subscription failed. Please try again.";
      return { ok: false, message: msg };
    }

    return {
      ok: true,
      message:
        json?.message || "Subscribed successfully. Please check your email.",
    };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}
