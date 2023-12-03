"use client";

import { IPost } from "@/app/types";
import React from "react";

interface Props {
  comment: IPost;
}

const CommentItem = ({ comment }: Props) => {
  return <div>CommentItem</div>;
};

export default CommentItem;
