import { useState, useEffect, useMemo } from "react";
import type { Character } from "src/types/Character";

type characterUrlArray = { url: string }[][];

function CharacterInfo({
  characterUrlArray,
}: {
  characterUrlArray: characterUrlArray;
}) {
  //set the state of the characters
  const [characters, setCharacters] = useState<Character[]>([]);
  //set the state of the loading
  const [loading, setLoading] = useState(true);
  //set error state
  const [error, setError] = useState(false);

  //fetch all the characters for the charactersUrlArray, store data in local storage to prevent unnecessary API calls
  useEffect(() => {
    const promises = characterUrlArray.map((characterUrl) => {
      return Promise.all(
        characterUrl.map((character) => {
          return fetch(character.url).then((res) => res.json());
        })
      );
    });

    Promise.all(promises)
      .then((characters) => {
        setCharacters(characters.flat());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [characterUrlArray]);

  console.log(characters);

  //use
  const renderCharacters = useMemo(() => {
    if (loading) {
      return <p className="text-yellow-300">Loading...</p>;
    }

    if (error) {
      return <p className="text-yellow-300">Something went wrong...</p>;
    }

    return characters.map((character) => {
      return (
        <div key={character.name}>
          <h3>{character.name}</h3>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair color: {character.hair_color}</p>
        </div>
      );
    });
  }, [characters, loading, error]);

  return (
    <div className="text-yellow-300 text-center md:mt-8 mt-6">
      {renderCharacters}
    </div>
  );
}

export default CharacterInfo;
