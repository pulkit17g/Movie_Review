"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchBar";
import PrimaryContainer from "./containers/primaryContainer";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        const data = await response.json();
        if (data.movies) {
          console.log(data);
          setMovies(data.movies);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <PrimaryContainer movies={movies}>
      <div className="w-full h-full">
        <div className="text-xl text-[#293845] font-bold pb-5">
          The best movie reviews site!
        </div>
        <SearchBar placeholder="Search for your favourite movie" />
        <div className="movies mt-5 grid grid-cols-3 gap-4">
          {movies.map((movie, index) => (
            <Link href={`/reviews?id=${movie.id}`} key={index}>
              <div
                className="p-4 bg-[#E0DEFD] flex flex-col cursor-pointer"
                key={index}
              >
                <div>{movie.name}</div>
                <div>{movie.releaseDate}</div>
                <div>{movie.averageRating}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PrimaryContainer>
  );
}
