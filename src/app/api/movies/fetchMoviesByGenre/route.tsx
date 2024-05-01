import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import moviesInfoModal from "@/models/moviesInfoModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const response = await moviesInfoModal.aggregate([
      {
        $match: {
          $expr: {
            $in: [reqBody.data.type, "$genre"],
          },
        },
      },
    ]);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
