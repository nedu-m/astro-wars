//fetch films from swapi
export const getFilms = async () => {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  return data.results;
};
