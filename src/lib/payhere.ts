declare global {
  interface Window {
    payhere: {
      startPayment: (payment: any) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: string) => void;
    };
  }
}

export interface PayHerePayment {
  sandbox: boolean;
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  amount: string;
  currency: string;
  hash: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export const initializePayHere = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.payhere) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PayHere script"));
    document.body.appendChild(script);
  });
};

export const startPayHerePayment = (
  payment: PayHerePayment,
  callbacks: {
    onCompleted: (orderId: string) => void;
    onDismissed: () => void;
    onError: (error: string) => void;
  },
): void => {
  if (!window.payhere) {
    callbacks.onError("PayHere is not loaded");
    return;
  }

  // Set callbacks
  window.payhere.onCompleted = callbacks.onCompleted;
  window.payhere.onDismissed = callbacks.onDismissed;
  window.payhere.onError = callbacks.onError;

  // Start payment
  try {
    window.payhere.startPayment(payment);
  } catch (err: any) {
    const message =
      typeof err?.message === "string" && err.message.length > 0
        ? err.message
        : "Failed to start PayHere payment";
    callbacks.onError(message);
  }
};
