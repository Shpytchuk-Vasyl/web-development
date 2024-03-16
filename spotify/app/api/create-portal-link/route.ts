import { getUrl } from "@/libs/helpers";
import { stripe } from "@/libs/stripe";
import { createOrRetriveCustomer } from "@/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { get } from "http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not found");

    const customer = await createOrRetriveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    if (!customer) throw new Error("Customer not found");

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: getUrl() + "/account",
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error creating portal link", error);
    return new NextResponse("Error creating portal link", { status: 500 });
  }
}
