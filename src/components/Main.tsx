// import { useState } from "react";
import StarLogo from "@assets/star-logo.png";
import Movies from "./Movies";
import { MovieContext } from "../context/MovieContext";
import { useContext } from "react";

function Main() {
  const { movies } = useContext(MovieContext);
  console.log(movies);
  return (
    <>
      <main className="w-1/3 md:w-1/4 mx-auto mt-8">
        <img src={StarLogo} alt="Star Wars Logo" />
      </main>

      {/* <Movies /> */}
    </>
  );
}

export default Main;
