import { useState, useEffect } from "react";

interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

function Movies() {
  //set the state of the movies
  const [movies, setMovies] = useState<Movie[]>([]);
  //set the state of the loading
  const [loading, setLoading] = useState(true);

  //fetch the movies from the API
  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      });
  }, []);

  // Movie names in the dropdown to be sorted by release date from earliest to newest,
  //  with the default option being "Select a movie" and movie year in brackets
  const sortedMovies = movies.sort((a, b) => {
    return a.release_date.localeCompare(b.release_date);
  });

  //set the state of the selected movie and set the default to "Select a movie"
  const [selectedMovie, setSelectedMovie] = useState("Select a movie");

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
        <div className="text-white text-center mt-8">
          <h2 className="text-2xl font-bold">{selectedMovie}</h2>
          <p className="mt-4">{selectedMovieOpeningCrawl}</p>
        </div>
      );
    }
  };

  //render the loading message
  const renderLoading = () => {
    if (loading) {
      return <p className="text-white text-center mt-8">Loading...</p>;
    }
  };

  return (
    <main className="w-1/3 md:w-1/4 mx-auto mt-8">
      <select
        className="w-full bg-black text-white py-2 px-4 rounded"
        onChange={(e) => setSelectedMovie(e.target.value)}
      >
        <option value="Select a movie">Select a movie</option>
        {renderMovies}
      </select>
      {renderSelectedMovie()}
      {renderLoading()}
    </main>
  );
}

export default Movies;
