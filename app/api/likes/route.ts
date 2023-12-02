import Post from "@/database/post.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const { userId, postId } = await req.json();

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: userId },
      },
      { new: true }
    );

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 499 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { userId, postId } = await req.json();

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId },
      },
      { new: true }
    );

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 499 });
  }
}
