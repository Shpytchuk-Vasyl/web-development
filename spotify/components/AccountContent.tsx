"use client";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, subscription, user } = useUser();
  const subscribeModal = useSubscribeModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({ url: "/api/create-portal-link" });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No ative plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You currently in the <b>{subscription?.prices?.products?.name}</b>{" "}
            plan
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
