import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 477 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorret" },
        { status: 455 }
      );
    }

    return NextResponse.json({ success: true, user: isExistingUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
};
