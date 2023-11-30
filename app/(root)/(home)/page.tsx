"use client";
import { IPost } from "@/app/types";
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import PostIemt from "@/components/shared/postItem";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session, status }: any = useSession();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/posts?limit=10");
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);
  return (
    <div>
      <Header label="Home" isBack={true} />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <Form
            setPosts={setPosts}
            placeholder="What's on yout mind?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
          />
          {posts.map((post: IPost) => (
            <PostIemt
            setPosts={setPosts}
              key={post._id}
              post={post}
              user={JSON.parse(JSON.stringify(session.currentUser))}
            />
          ))}
        </>
      )}
    </div>
  );
}
