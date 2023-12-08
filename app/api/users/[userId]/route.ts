import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextFetchEvent, NextResponse } from "next/server";

export async function PUT(req: Request, route: { params: { userId: string } }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { userId } = route.params;

    const isExistinUsername = await User.findOne({ username: body.username });

    if (!isExistinUsername) {
      return NextResponse.json(
        {
          error: "Username already exists",
        },
        { status: 433 }
      );
    }
    await User.findByIdAndUpdate(userId, body, { new: true });

    return NextResponse.json({ message: "User updated successfully!" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ message: result.message }, { status: 433 });
  }
}
