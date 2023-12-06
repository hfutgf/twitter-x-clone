"use client";

import { IPost, IUser } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import { FaHeart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Props {
  comment: IPost;
  user: IUser;
  setComments: Dispatch<SetStateAction<IPost[]>>;
  comments: IPost[];
}

const CommentItem = ({ comment, user, setComments, comments }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLike = async () => {
    try {
      setIsLoading(true);
      if (comment.hasLiked) {
        await axios.delete("/api/comments", {
          data: {
            commentId: comment._id,
          },
        });
        const updateComments = comments.map((c: any) => {
          if (c._id === comment._id) {
            return {
              ...c,
              hasLiked: false,
              likes: c.likes - 1,
            };
          }
        });
        setComments(updateComments);
      } else {
        await axios.put("/api/comments", {
          commentId: comment._id,
        });
        const updateComments = comments.map((c: any) => {
          if (c._id === comment._id) {
            return {
              ...c,
              hasLiked: true,
              likes: c.likes + 1,
            };
          }
        });
        setComments(updateComments);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/comments/${comment._id}`);
      const updateComments = comments.filter((c) => c._id !== comment._id);
      setComments(updateComments);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="border-b-[1px] relative border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 size={20} className="animate-spin text-sky-500" />
          </div>
        </div>
      )}
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
      <div className="flex flex-row itmes-center mt-3 gap-10">
        <div
          onClick={onLike}
          className={`flex flex-row  items-center text-neutral-500  gap-2 cursor-pointer transition hover:text-red-500`}
        >
          <FaHeart size={20} color={comment.hasLiked ? "red" : ""} />
          <p>{comment.likes || 0}</p>
        </div>

        {comment.user._id === user._id && (
          <div
            onClick={onDelete}
            className="flex flex-row  items-center text-neutral-500  gap-2 cursor-pointer transition hover:text-white"
          >
            <AiFillDelete size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
