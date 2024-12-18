import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming JSON payload
    const event = await req.json();

    // Handle Stripe webhook events
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful:", paymentIntent);
        // TODO: Define and call a function to handle successful payment intent
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached:", paymentMethod);
        // TODO: Define and call a function to handle successful payment method attachment
        break;

    case "checkout.session.completed":
        const checkputSessionCompleted = event.data.object;
        console.log("Session was attached:", checkputSessionCompleted);
        // TODO: Define and call a function to handle successful payment method attachment
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    // Respond with acknowledgment
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return NextResponse.json(
      { error: "Webhook error: Unable to process the event." },
      { status: 400 }
    );
  }
};
