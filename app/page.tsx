"use client";
import React, { useState, useEffect } from "react";
import PrimaryContainer from "./containers/primaryContainer";
import Link from "next/link";
import SearchBar from "./components/searchBar";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PrimaryContainer movies={movies}>
      <div className="w-full h-full">
        <div className="text-xl text-[#293845] font-bold pb-5">
          The best movie reviews site!
        </div>
        <SearchBar
          placeholder="Search for your favorite movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="movies mt-5 grid grid-cols-3 gap-4">
          {filteredMovies.map((movie, index) => (
            <Link href={`/reviews?id=${movie.id}`} key={index}>
              <div
                className="p-4 bg-[#E0DEFD] flex flex-col cursor-pointer gap-2"
                key={index}
              >
                <div>{movie.name}</div>
                <div className=" italic">Released: {movie.releaseDate}</div>
                <div className="font-bold">Rating: {movie.averageRating}/10</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PrimaryContainer>
  );
}