"use client";

import { IPost } from "@/app/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";

interface Props {
  comment: IPost;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
      <div>
        <div className="flex flex-row items-center gap-3 cursor-pointer">
          <Avatar>
            <AvatarImage src={comment?.user.profileImage} />
            <AvatarFallback>{comment?.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold cursor-pointer hover:underline">
                {comment?.user.name}
              </p>
              <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                {comment?.user.username
                  ? `@${sliceText(comment?.user.username, 16)}`
                  : comment && sliceText(comment?.user.email, 16)}
              </span>
              <span className="text-neutral-500 text-sm">
                {comment &&
                  formatDistanceToNowStrict(new Date(comment?.createdAt))}{" "}
                ago
              </span>
            </div>
            <div className="text-white mt-1">{comment?.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
