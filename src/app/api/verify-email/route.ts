import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Invalid or missing token" }, { status: 400 });
    }

    // Find the user with matching token and valid expiry
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired verification link." }, { status: 400 });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
        // ✅ Redirect to sign in page after success
    return NextResponse.redirect(new URL("/sign-in", req.url));



   
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
