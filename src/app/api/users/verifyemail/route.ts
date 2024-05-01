import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import user from "@/models/user.model";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const userResponse = await user.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: new Date() },
    });
    if (!userResponse)
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });

    userResponse.isVerified = true;
    userResponse.verifyToken = undefined;
    userResponse.verifyTokenExpiry = undefined;
    await userResponse.save();
    return NextResponse.json({ message: "Email Verified Successfully !" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
