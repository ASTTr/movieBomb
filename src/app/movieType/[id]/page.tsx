import { MovieByGenre } from "@/components/moviesByGenre";
import { Navbar } from "@/components/navbar";
import React from "react";

export default function MoviesByType({ params }) {
  return (
    <main className="flex flex-col  bg-gradient-to-r from-blue-900  to-blue-200">
      <div>
        <p className="flex text-4xl mx-6 my-3">
          {params.id} movies{" "}
          <span>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-[30px] mx-4"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </span>
        </p>
      </div>
      <MovieByGenre type={params.id} />
    </main>
  );
}
