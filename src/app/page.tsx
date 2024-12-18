"use client"
import React, { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import CompletePage from "../components/CompletePage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function App() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);

  // Check for the payment intent client secret in the URL.
  useEffect(() => {
    const queryClientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setConfirmed(Boolean(queryClientSecret));
  }, []);

  // Fetch the clientSecret when the page loads
  useEffect(() => {
    fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  // Stripe appearance options
  const appearance: any = {
    theme: "stripe",
  };

  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );
}
