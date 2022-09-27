import { useState } from "react";

type CharacterInfoProps = {
  selectedMovieCharacters: string[] | undefined;
};

function CharacterInfo({ selectedMovieCharacters }: CharacterInfoProps) {
  const [characters, setCharacters] = useState<string[]>([]);

  //get the last part of the selected movie characters url to use as the id
  const characterIds = selectedMovieCharacters?.map((character) => {
    const characterId = character.split("/people/").pop();
    return characterId;
  });

  //fetch the characters with their ids only once

  return (
    <>
      {/* <ul className="text-yellow-300 text-center">{renderCharacters}</ul> */}
    </>
  );
}

export default CharacterInfo;
