import React, { useState } from "react";

const AddMovie = () => {

  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [averageRating, setAverageRating] = useState("");

    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = { name, releaseDate, averageRating };
    console.log(movieData);
    try {
      const response = await fetch("/api/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      console.log("Movie created:", result);
      window.location.reload();
    } catch (error) {
      console.error("Failed to create movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
      <div className="text-lg">Add a new movie</div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-400 pl-2 py-1"
      />
      <input
        type="text"
        placeholder="Release Date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        className="w-full border border-gray-400 pl-2 py-1"
      />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="p-2 border-none bg-[#6558F5] text-white text-center rounded-md"
        >
          Create Movie
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
