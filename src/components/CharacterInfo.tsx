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

  //fetch all the characters for the charactersUrlArray
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await Promise.all(
          characterUrlArray.flat().map((character) => {
            return fetch(character.url).then((res) => res.json());
          })
        );
        setCharacters(characters);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCharacters();
  }, [characterUrlArray]);

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
          <table className="table-auto">
            <thead>
              <tr className="px-4">
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{character.name}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{character.gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  }, [characters, loading, error]);

  return (
    <div className="text-yellow-300 text-center w-full md:w-1/2 md:mx-auto px-5 mt-3">
      {renderCharacters}
    </div>
  );
}

export default CharacterInfo;
