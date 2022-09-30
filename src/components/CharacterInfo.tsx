import { useState, useEffect } from "react";
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

  return (
    <div className="text-yellow-300 flex flex-col md:mx-auto md:my-8 md:px-16 mx-1">
      {loading && <div>Loading...</div>}
      <table className="table-fixed">
        <thead>
          <tr className="border-solid border-2 border-yellow-300 rounded-md">
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Height</th>
            <th className="px-2 py-2">Mass</th>
            <th className="px-2 py-2">Gender</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => {
            return (
              <tr key={character.name}>
                <td className="border px-2 py-2">{character.name}</td>
                <td className="border px-2 py-2">{character.height}</td>
                <td className="border px-2 py-2">{character.mass}</td>
                <td className="border px-2 py-2">{character.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error && (
        <div className="text-center text-2xl mt-5">Something went wrong...</div>
      )}
    </div>
  );
}

export default CharacterInfo;
