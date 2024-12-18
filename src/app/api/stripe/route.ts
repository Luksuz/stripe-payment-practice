import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

// This is your test secret API key.
// Make sure the environment variable is set. The `!` operator asserts it's non-null.
console.log(process.env.STRIPE_SECRET_KEY!)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const calculateOrderAmount = (items: any): number => {
  // Replace this with a real calculation of the order amount
  return 1400;
};

export const POST = async (req: NextRequest) => {
  // Parse JSON from the request
  const { items } = await req.json();

  // Create a PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: { enabled: true },
  });

  // Respond with the client secret
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
