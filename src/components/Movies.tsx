import { useState, useEffect } from "react";

//make an api call to  https://swapi.dev/api/films/ and get the data, set the type and display the data

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
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, []);

  //display the movies from earlist to latest with a button to show the opening crawl
  return (
    <div className="flex justify-center items-center gap-8 mx-auto mt-10 text-white">
      {movies.map((movie) => (
        <div key={movie.episode_id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default Movies;
