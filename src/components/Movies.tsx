import { useState, useEffect } from "react";
import type { Movie } from "../types/swapi-type";
import { getFilms } from "src/api/swapi";

function Movies() {
  //set the state of the movies
  const [movies, setMovies] = useState<Movie[]>([]);
  //set the state of the loading
  const [loading, setLoading] = useState(true);
  //set the state of the selected movie and set the default to "Select a movie"
  const [selectedMovie, setSelectedMovie] = useState("Select a movie");

  //fetch the movies from the API
  useEffect(() => {
    getFilms().then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  //sort the movies by episode id
  const sortedMovies = movies.sort((a, b) => {
    return a.release_date.localeCompare(b.release_date);
  });

  //handle the change of the select element
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMovie(e.target.value);
  };

  //get the opening crawl for the selected movie
  const selectedMovieOpeningCrawl = movies.find(
    (movie) => movie.title === selectedMovie
  )?.opening_crawl;

  //render the movies in the dropdown
  const renderMovies = sortedMovies.map((movie) => {
    return (
      <option key={movie.title} value={movie.title}>
        {movie.title} ({movie.release_date.slice(0, 4)})
      </option>
    );
  });

  //render the selected movie
  const renderSelectedMovie = () => {
    if (selectedMovie !== "Select a movie") {
      return (
        <div className="text-yellow-300 text-center mt-8">
          <h2 className="text-2xl font-bold">{selectedMovie}</h2>
          <p className="hover:animate-pulse">{selectedMovieOpeningCrawl}</p>
        </div>
      );
    }
  };

  //render the loading message
  const renderLoading = () => {
    if (loading) {
      return (
        <p className="text-yellow-300 text-center mt-8 animate-ping">
          Loading...
        </p>
      );
    }
  };

  return (
    <>
      <main className="w-full md:w-1/4 mt-8 px-6 md:mx-auto">
        <select
          className="w-full text-yellow-300 bg-gray-800 border-2 border-yellow-300 rounded-md p-2"
          onChange={handleChange}
        >
          <option value="Select a movie">Select a movie</option>
          {renderMovies}
        </select>
        {renderSelectedMovie()}
        {renderLoading()}
      </main>
    </>
  );
}

export default Movies;
