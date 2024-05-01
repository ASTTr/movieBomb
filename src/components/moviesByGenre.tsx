"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const MovieByGenre = (selectedGenre) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(selectedGenre);
    if (selectedGenre?.type) {
      fetchMoviesByGenre();
      return;
    }
    fetchAllMovies();
  }, []);

  const fetchMoviesByGenre = async () => {
    try {
      const response = await axios.post("/api/movies/fetchMoviesByGenre", {
        data: selectedGenre,
      });
      setMovies(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get("/api/movies/fetchAllMovies");
      setMovies(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const showMovieInfo = (movieIndex) => {
    const element = document.getElementById(`showMore${movieIndex}`);
    if (element) {
      if (element.classList.contains("bottom-[-50%]")) {
        element?.classList.remove("bottom-[-50%]");
        element?.classList.add("bottom-[0%]");
      } else if (element.classList.contains("bottom-[0%]")) {
        element?.classList.add("bottom-[-50%]");
        element?.classList.remove("bottom-[0%]");
      }
    }
  };

  return (
    <div>
      <div className="max-w-screen px-8 flex text-gray-400 bg-gradient-to-r  from-black via-gray-700 to-gray-600">
        <div className=" my-3">
          <div className="flex flex-wrap py-2 ">
            {movies.map((movie, index) => (
              <div className="relative overflow-hidden text-white my-2">
                <a href={movie.imdb_link}>
                  <img
                    src={movie.image}
                    className="w-[200px] mx-3 cursor-pointer "
                  />
                </a>

                <div className="transition-all 3s ease-in w-[200px] mx-3 bottom-[10%] left-[10%] bg-gray-500 h-[150px]">
                  <div className="p-2">
                    <a href={movie.imdb_link}>
                      <p className="cursor-pointer">{movie.title}</p>
                    </a>
                    <p className="mx-3">Year : {" " + movie.year}</p>
                    <div className="flex ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="w-[20px] "
                      >
                        <path
                          fill="gold"
                          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        />
                      </svg>
                      <p className="mx-3">{movie.rating} / 10</p>
                    </div>
                  </div>
                  <div
                    id={`showMore${index}`}
                    className={`absolute bg-gray-900 text-center cursor-pointer overflow-y-auto ${
                      // showMore ? "bottom-[0%]" :
                      "bottom-[-50%]"
                    }`}
                  >
                    <p
                      onClick={() => showMovieInfo(index)}
                      className=" w-[200px] h-[250px] "
                    >
                      {" "}
                      Read More
                      <p className="text-blue-500">{movie.description}</p>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
