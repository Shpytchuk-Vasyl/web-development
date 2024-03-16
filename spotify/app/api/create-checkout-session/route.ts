import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {  cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetriveCustomer } from "@/libs/supabaseAdmin";

export async function POST(req: Request) {
  const { price, quantity = 1, metadata = {} } = await req.json();
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetriveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        metadata,
      },

      success_url: `${getUrl()}/account`,
      cancel_url: getUrl(),
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session", error);
    return new NextResponse("Error creating checkout session", { status: 500 });
  }
}