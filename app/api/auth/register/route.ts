import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const step = searchParams.get("step");

    if (step === "1") {
      const { email } = await req.json();
      const isExistingUser = await User.findOne({ email });

      if (isExistingUser) {
        return NextResponse.json(
          { error: "Email aleady exists" },
          { status: 499 }
        );
      }

      return NextResponse.json({ success: true });
    } else if (step === "2") {
      const { email, password, name, username } = await req.json();

      const isExistingUsername = await User.findOne({ username });

      if (isExistingUsername) {
        return NextResponse.json(
          { error: "Username aleady exists" },
          { status: 499 }
        );
      }

      const hashPassword = await bcrypt.hash(password, 4);

      const user = await User.create({
        email,
        name,
        username,
        password: hashPassword,
      });
      return NextResponse.json({ success: true, user });
    }
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 499 });
  }
}
