import { connect } from "@/dbConfig/dbConfig";
import movieInfoModal from "@/models/moviesInfoModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    // const reqBody = await request.json();
    console.log("hahahahahha");
    const response = await movieInfoModal.aggregate([
      {
        $addFields: {
          ratingInNumber: { $toDecimal: "$rating" },
        },
      },
      {
        $match: {
          ratingInNumber: { $gt: 8.9 },
        },
      },
    ]);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
