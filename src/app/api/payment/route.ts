import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const data = await request.json();
    const priceId = data.priceId;
    
    // ✅ Debugging: Log the received priceId
    console.log("Received priceId:", priceId);

    if (!priceId) {
      console.error("Error: Stripe Price ID is missing!");
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    // ✅ Debugging: Log environment variables
    console.log("Success URL:", process.env.NEXT_PUBLIC_SITE_URL);
    console.log("Cancel URL:", process.env.NEXT_PUBLIC_SITE_URL);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    console.log("Stripe Session Created:", session);

    return NextResponse.json(session.url);
  } catch (error) {
    console.error("Stripe API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
