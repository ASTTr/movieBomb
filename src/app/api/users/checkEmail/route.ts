import { connect } from "@/dbConfig/dbconfig";
import user from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userResponse = await user.findOne({ email: reqBody.email });
    if (!userResponse)
      return NextResponse.json({ error: "Email Not Found !" }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
