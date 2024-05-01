import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbconfig";
import user from "@/models/user.model";

import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    const userResponse = await user.findOneAndUpdate(
      { email: reqBody.email },
      { $set: { password: hashedPassword } }
    );
    if (!userResponse)
      return NextResponse.json({ error: "Email Not found" }, { status: 400 });
    return NextResponse.json({ message: "Password changed successfully !" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
