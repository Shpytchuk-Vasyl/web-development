"use client";

import { Price, ProductWithPrices } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { subscribe } from "diagnostics_channel";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";

interface ModalProviderProps {
  products: ProductWithPrices[];
}

const formatPrice = (price: Price) => {
  const formated = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return formated;
};

const SubscribeModal: React.FC<ModalProviderProps> = ({ products }) => {
  const [priceIdLoading, setPriceIdLoading] = useState<string | null>(null);
  const { user, isLoading, subscription } = useUser();

  const handleCheckout = async (price: Price) => {
    if (!user) return toast.error("You need to be logged in to subscribe");
    if (subscription) return toast("You already have a subscription");

    setPriceIdLoading(price.id);
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
        console.log(error);
      toast.error("An error occurred, please try again");
    } finally {
      setPriceIdLoading(null);
    }
  };

  let content = <div className="text-center"> No products available</div>;

  if (subscription)
    return <div className="text-center">You already have a subscription</div>;

  if (products.length > 0) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length)
            return <div key={product.id}>No prices available</div>;
          else
            return product.prices.map((price) => (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            ));
        })}
      </div>
    );
  }

  return (
    <Modal
      title="Subscribe to Spotify Premium"
      description="Listen to music ad-free, offline, and with no limits."
      isOpen={true}
      onChange={() => {}}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
