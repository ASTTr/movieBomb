"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const [genreList, setGenreList] = useState(false);

  // const [isHidden, setIsHidden] = useState(false);
  // const showNavbar = () => {
  //   const navElement = document.getElementById("navbar");
  //   console.log(navElement);
  // if (navElement?.classList.contains("hidden")) {
  //   navElement.classList.remove("hidden");
  // } else if (!navElement?.classList.contains("hidden"))
  //   navElement?.classList.add("hidden");
  // };

  useEffect(() => {
    fetchMovieGenre();
  }, []);

  const fetchMovieGenre = async () => {
    try {
      const response = await axios.get("/api/movies/fetchGenre");
      setGenres(response.data.data[0].genreFields);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav
      className=" bg-gradient-to-r from-gray-700 to-black relative  border-gray-500 dark:bg-gray-900 rounded-br-full rounded-bl-3xl "
      id="navbar"
    >
      {/* <div
        className="absolute top-16 left-8 cursor-pointer"
        onClick={() => showNavbar()}
      >
        <p className="h-[70px]  bg-black w-1 rounded-full "></p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/66/SmileyFace.png"
          className="w-[50px] h-[50px] "
        />
      </div> */}
      <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://graphicriver.img.customer.envatousercontent.com/files/220959658/preview.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=253fe93ccfb50917a1cc5bc488a873d2"
            className="h-8 rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-sky-400 hover:text-blue-200">
            Movie Bomb
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href={"/"}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <div
                className="relative flex cursor-pointer z-10"
                onClick={() => setGenreList(!genreList)}
              >
                <p className=" flex block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  genre
                </p>
                {genreList ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[10px] mx-2"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="white"
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-[10px] mx-2"
                  >
                    <path
                      fill="white"
                      d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                    />
                  </svg>
                )}
                <div className="rounded-xl absolute top-[160%] backdrop-blur-2xl h-[400px] overflow-hidden overflow-y-auto bg-black/15">
                  {genreList &&
                    genres.length &&
                    genres.map((genre, index) => (
                      <Link href={`/movieType/${genre}`}>
                        <div className="border-sky-100 p-3 border-blue-200">
                          <p className="text-white hover:text-sky-400">
                            {genre}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </li>
            {/* <li>
              <Link
                href={"/signIn"}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Sign In
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
