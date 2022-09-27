type MovieInfoProps = {
  renderSelectedMovie: () => JSX.Element | undefined;
};

function MovieInfo({ renderSelectedMovie }: MovieInfoProps) {
  return (
    <>
      <main className="w-full md:w-1/2 md:mx-auto px-5 mt-3">
        {renderSelectedMovie()}
      </main>
    </>
  );
}

export default MovieInfo;
