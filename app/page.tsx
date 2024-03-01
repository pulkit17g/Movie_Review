"use client"
import React, { useState, useEffect } from 'react';
import SearchBar from "./components/searchBar";
import PrimaryContainer from "./containers/primaryContainer";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Function to fetch movies data
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); // Adjust the URL as needed
        const data = await response.json();
        if (data.movies) {
          console.log(data)
          setMovies(data.movies);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <PrimaryContainer>
      <div className="w-full h-full">
        <div className="text-xl text-[#293845] font-bold pb-5">
          The best movie reviews site!
        </div>
        <SearchBar placeholder="Search for your favourite movie" />
        <div className="movies mt-5 grid grid-cols-3 gap-4">
          {movies.map((movie, index) => (
            <div className="p-4 bg-[#E0DEFD] flex flex-col" key={index}>
              <div>{movie.name}</div>
              <div>{movie.releaseDate}</div>
              <div>{movie.averageRating}</div>
            </div>
          ))}
        </div>
      </div>
    </PrimaryContainer>
  );
}
