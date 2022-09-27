//fetch films from swapi
export const getFilms = async () => {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  return data.results;
};

//fetch function to get people from swapi
export const getPeople = async (id: string[]) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  const data = await response.json();
  return data;
};
