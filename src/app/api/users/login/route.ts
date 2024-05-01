import { connect } from "@/dbConfig/dbconfig.ts";
import user from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const checkUser = await user.findOne({ email: reqBody.email });
    if (!checkUser)
      return NextResponse.json(
        { error: "user does not exists" },
        { status: 400 }
      );
    if (!checkUser.isVerified)
      return NextResponse.json(
        { error: "Email Not Verified !" },
        { status: 400 }
      );
    const validPassword = await bcryptjs.compare(
      reqBody.password,
      checkUser.password
    );
    if (!validPassword)
      return NextResponse.json(
        { message: "Invalid Email or Password !" },
        { status: 400 }
      );
    const tokenData = {
      id: checkUser._id,
      email: checkUser.email,
      password: checkUser.password,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const response = NextResponse.json({
      message: "Login Successfull !",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
