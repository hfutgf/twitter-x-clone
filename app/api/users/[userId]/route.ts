import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request, route: { params: { userId: string } }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { userId } = route.params;
    await User.findByIdAndUpdate(userId, body, { new: true });

    return NextResponse.json({ message: "User updated successfully!" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ message: result.message }, { status: 433 });
  }
}
