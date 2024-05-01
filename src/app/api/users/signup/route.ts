import { connect } from "@/dbConfig/dbconfig.ts";
import user from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mailer } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const checkUser = await user.findOne({ email: reqBody.email });
    if (checkUser)
      return NextResponse.json({
        message: "User Already Exists !",
        status: 400,
      });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;
    const createUser = await user.create(reqBody);

    await mailer(createUser.email, "verify", createUser._id);

    return NextResponse.json({ message: "User Created", status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
