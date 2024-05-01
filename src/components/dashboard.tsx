"use client";
import React from "react";
import { TopMovies } from "./topMovies";
import { MovieByGenre } from "./moviesByGenre";

export const Dashoard = () => {
  return (
    <div>
      <TopMovies />
      <MovieByGenre />
    </div>
  );
};
