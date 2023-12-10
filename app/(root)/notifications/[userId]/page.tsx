"use client";

import Header from "@/components/shared/header";
import Button from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";
import { INotification } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  params: {
    userId: string;
  };
}

const NotificationsPage = ({ params }: Props) => {
  const [isClearing, setIsClearing] = useState(false);
  const { data, isLoading, mutate } = useNotifications(params.userId);

  const { refresh } = useRouter();

  const onClear = async () => {
    try {
      setIsClearing(true);
      await axios.delete(`/api/notifications/${params.userId}`);
      mutate();
      refresh();
      setIsClearing(false);
    } catch (error) {
      console.log(error);
      setIsClearing(false);
    }
  };

  return (
    <>
      <Header isBack label="Notifications" />
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="text-sky-500 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col">
          {data.length > 0 ? (
            data.map((notification: INotification) => (
              <div
                key={notification._id}
                className="flex flex-row items-center  p-6 gap-4  border-b-[1px] border-neutral-800"
              >
                <Image
                  src={"/images/x.svg"}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <p className="text-white">{notification.body}</p>
              </div>
            ))
          ) : (
            <div className="text-neutral-600 text-center p-6 text-xl">
              No notifications
            </div>
          )}
          {data?.length > 0 && (
            <div className="mt-4 flex  justify-center">
              <Button
                outline
                label="Clear all"
                onClick={onClear}
                disabled={isClearing}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationsPage;
