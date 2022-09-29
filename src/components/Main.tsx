import { useState, useEffect } from "react";
import type { Movie } from "../types/swapi-type";
import { getFilms } from "../api/swapi";
import StarLogo from "@assets/star-logo.png";
import MovieInfo from "@components/Movies";
import CharacterInfo from "./CharacterInfo";

function Main() {
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
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMovie(e.target.value);
  }

  //get the characterUrl from the selected movie and convert it to an array of objects
  const characterUrlArray = movies
    .filter((movie) => movie.title === selectedMovie)
    .map((movie) => {
      return movie.characters.map((url) => {
        return { url };
      });
    });

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
        <div className="text-yellow-300 text-center md:mt-8 mt-6">
          <h2 className="text-2xl font-bold">{selectedMovie}</h2>
          <p className="hover:animate-pulse break-words whitespace-normal">
            {selectedMovieOpeningCrawl}
          </p>
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
      <header className="w-1/3 md:w-1/4 mx-auto mt-8">
        <img src={StarLogo} alt="Star Wars Logo" />
      </header>
      <section className="w-full md:w-1/4 mt-8 px-6 md:mx-auto">
        <select
          className="w-full text-yellow-300 bg-gray-800 border-2 border-yellow-300 rounded-md p-2"
          onChange={handleChange}
        >
          <option value="Select a movie">Select a movie</option>
          {renderMovies}
        </select>
        {renderLoading()}
      </section>
      <MovieInfo renderSelectedMovie={renderSelectedMovie} />
      <CharacterInfo characterUrlArray={characterUrlArray} />
    </>
  );
}

export default Main;
