import Auth from "@/components/auth";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import React, { PropsWithChildren } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  console.log(session);

  return <div>{children}</div>;
}
