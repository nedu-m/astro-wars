//import atom from nanostores and movie from api
import { atom } from "nanostores";
import { getFilms, getPeople } from "../api/swapi";

//create a store for movies
export const movies = atom([]);
//create a store for people
export const people = atom([]);

//fetch movies from swapi
export const fetchMovies = async () => {
  movies.set(await getFilms());
};

//fetch people from swapi
export const fetchPeople = async () => {
  people.set(await getPeople());
};

//fetch movies and people from swapi
export const fetchAll = async () => {
  await fetchMovies();
  await fetchPeople();
};

//export all the stores
export default {
  movies,
  people,
  fetchMovies,
  fetchPeople,
  fetchAll,
};
