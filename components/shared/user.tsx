"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import { sliceText } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import axios from "axios";

interface Props {
  user: IUser;
  onChangeFollowing?: (data: IUser[]) => void;
  isFollow?: boolean;
  following?: IUser[];
}

export default function User({
  user,
  onChangeFollowing,
  isFollow,
  following,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session }: any = useSession();

  const router = useRouter();

  const onUnfollow = async (evt: any) => {
    evt.stopPropagation();
    try {
      setIsLoading(true);
      await axios.delete("/api/follows", {
        data: {
          userId: user._id,
          currentUserId: session?.currentUser?._id,
        },
      });
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onFollow = async (evt: any) => {
    evt.stopPropagation();
    try {
      setIsLoading(true);
      await axios.put("/api/follows", {
        userId: user._id,
        currentUserId: session?.currentUser?._id,
      });

      const updateFollowing = [...(following as IUser[]), user];
      onChangeFollowing && onChangeFollowing(updateFollowing);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const goToProfile = (evt: any) => {
    evt.stopPropagation();
    router.push(`/profile/${user._id}`);
  };

  return (
    <div
      onClick={goToProfile}
      className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300/10 transition rounded-md py-2 px-3"
    >
      <div className="flex gap-2 cursor-pointer">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-white font-semibold text-sm line-clamp-1">
            {user.name}
          </p>
          <p className="text-neutral-400  text-sm line-clamp-1">
            {user.username
              ? `@${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>
        </div>
      </div>
      {isFollow && user._id !== session?.currentUser?._id ? (
        user.followers.includes(session?.currentUser?._id) ? (
          <Button
            label="Unfollow"
            outline
            className="h-[30px] p-0 w-fit px-3 text-sm"
            disabled={isLoading}
            onClick={onUnfollow}
          />
        ) : (
          <Button
            label="Follow"
            className="h-[30px] p-0 w-fit px-3 text-sm"
            disabled={isLoading}
            onClick={onFollow}
          />
        )
      ) : null}
    </div>
  );
}
