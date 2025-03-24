import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Instantiate a single Prisma Client instance
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  // Retrieve the raw request body as text (needed for signature verification)
  const rawBody = await request.text();
  // Get the signature header from Stripe
  const sig = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    const sessionObj = event.data.object as Stripe.Checkout.Session;
    // Try to get the user ID from metadata
    const userId = sessionObj.metadata?.userId;
    
    if (userId) {
      try {
        await prisma.user.update({
          where: { id: userId },
          data: { isPaidSubscriber: true },
        });
        console.log(`User with id ${userId} updated to paid subscriber.`);
      } catch (dbError) {
        console.error("Error updating user subscription by id:", dbError);
        return NextResponse.json({ error: "Database Error" }, { status: 500 });
      }
    } else {
      // Fallback: try updating by customer email if metadata is missing
      const customerEmail = sessionObj.customer_details?.email;
      if (customerEmail) {
        try {
          await prisma.user.update({
            where: { email: customerEmail },
            data: { isPaidSubscriber: true },
          });
          console.log(`User with email ${customerEmail} updated to paid subscriber.`);
        } catch (dbError) {
          console.error("Error updating user subscription by email:", dbError);
          return NextResponse.json({ error: "Database Error" }, { status: 500 });
        }
      } else {
        console.error("No user identifier found in the session.");
      }
    }
  }

  return NextResponse.json({ received: true });
}


