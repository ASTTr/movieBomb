import { connect } from "@/dbConfig/dbConfig";
import movieInfoModal from "@/models/moviesInfoModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const response = await movieInfoModal.find({});
    // .aggregate([
    //   { $unwind: "$genre" },

    //   {
    //     $group: {
    //       _id: null,
    //       genreFields: { $addToSet: "$genre" },
    //     },
    //   },
    // ]);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
