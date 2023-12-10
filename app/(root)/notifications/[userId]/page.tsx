"use client";

import Header from "@/components/shared/header";
import useNotifications from "@/hooks/useNotifications";
import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  params: {
    userId: string;
  };
}

const NotificationsPage = ({ params }: Props) => {
  const { data, isLoading, mutate } = useNotifications(params.userId);

  console.log(data);

  return (
    <>
      <Header isBack label="Notifications" />
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="text-sky-500 animate-spin" />
        </div>
      ) : (
        <>HELLO</>
      )}
    </>
  );
};

export default NotificationsPage;
