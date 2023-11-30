"use client";

import React from "react";
import Button from "../ui/button";
import { Loader2 } from "lucide-react";
import User from "./user";
import useUsers from "@/hooks/useUsers";
import { IUser } from "@/app/types";
import Link from "next/link";

export default function Followbar() {
  const { isLoading, users } = useUsers(5);

  return (
    <div className="py-4 hidden lg:block w-[266px]">
      <div className="bg-neutral-800 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <Button
            secondary
            label="See all"
            className="h-[30px] p-0 w-fit px-3 text-sm"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        ) : (
          <div className="flex flex-col gap-6 mt-4">
            {users.map((user: IUser) => (
              <Link key={user._id} href={`profile/${user._id}`}>
                <User user={user} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
