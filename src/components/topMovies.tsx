import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export const TopMovies = () => {
  const timeoutRef = useRef(null);

  const [topMovies, setTopMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getTopMovies();
  }, []);

  const getTopMovies = async () => {
    try {
      const response = await axios.get("/api/movies/fetchTopMovies");
      setTopMovies(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    topMoviesInterval();
    return () => {};
  }, [currentIndex]);

  const previousTopMovie = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(topMovies.length - 1);
      return;
    }
    setCurrentIndex(currentIndex - 1);
    clearTimeout(timeoutRef.current);
  };

  const nextTopMovie = () => {
    if (currentIndex >= topMovies.length - 1) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(currentIndex + 1);
    clearTimeout(timeoutRef.current);
  };

  const topMoviesInterval = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex == topMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
  };

  return (
    <div className="flex p-5">
      <div className="flex w-[800px] max-h-[800px] items-center ">
        <div className=" m-auto overflow-hidden items-start justify-items-start ">
          <div
            className=" whitespace-nowrap w-[600px] transition-all ease-out 2s items-center"
            style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
          >
            {topMovies.map((movie, index) => (
              <div
                className="rounded inline-block text-center relative"
                key={index}
              >
                <img src={movie.big_image} className="w-[600px] h-[600px]" />
                <p className="text-4xl font-bold ">{movie.title}</p>
                <div className="flex absolute left-14 bottom-20">
                  <a href={movie.imdb_link}>
                    <img src={movie.image} className="w-[150px] h-[250px]  " />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            {topMovies.map((_, index) => (
              <div
                className={`inline-block h-3 w-3 rounded-full cursor-pointer mt-5 mx-2 mb-8 ${
                  currentIndex == index ? "bg-gray-800" : "bg-gray-400"
                }`}
                onClick={() => {
                  setCurrentIndex(index);

                  clearTimeout(timeoutRef.current);
                }}
              ></div>
            ))}
          </div>
        </div>
        <div
          onClick={previousTopMovie}
          className="absolute  top-[55%] left-[2%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer "
        >
          {"<"}
        </div>
        <div
          onClick={nextTopMovie}
          className="absolute  top-[55%] right-[60%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer "
        >
          {">"}
        </div>
      </div>
      <div className=" w-screen rounded-xl flex flex-col items-center border-4 border-blue-900 mx-2">
        <p className="text-4xl ">
          {" "}
          {`Top ${topMovies.length} Movies Rating more than 8.9`}{" "}
        </p>
        <div className="flex flex-wrap">
          {topMovies.map((movie) => (
            <div className="m-5 mt-8">
              <a href={movie.imdb_link}>
                <img src={movie.image} className="w-[150px] h-[250px] " />
              </a>
              <p className="bg-black/25 mt-2 w-[150px]">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    // <div className="max-w-[500px] h-[780px] w-full m-auto py-16 px-4 relative">
    //   <div
    //     onClick={previousTopMovie}
    //     className="absolute  top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer "
    //   >
    //     {"<"}
    //   </div>

    //   {topMovies.length && (
    //     <div
    //       style={{
    //         backgroundImage: `url(${topMovies[currentIndex].big_image})`,
    //       }}
    //       className="w-full h-full rounded-2xl bg-center bg-cover duration-500  "
    //     ></div>
    //   )}

    //   <div
    //     onClick={nextTopMovie}
    //     className="absolute  top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer "
    //   >
    //     {">"}
    //   </div>
    // </div>
  );
};
