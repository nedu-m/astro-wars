import { createContext, useState, useEffect } from "react";

//set interface for the context
interface MovieProviderProps {
  children: React.ReactNode;
}

//set interface for the context
interface MovieContextData {
  movies: any[];
}

//create movie context
const MovieContext = createContext({} as MovieContextData);

function MovieProvider({ children }: MovieProviderProps) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
