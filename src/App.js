import { useEffect, useState } from "react";
import "./App.css";

import MovieDetails from "./components/MainSections/MovieDetails/MovieDetails";
import Movie from "./components/MainSections/SearchResults/Movie/Movie";
import SearchResults from "./components/MainSections/SearchResults/SearchResults";
import Loader from "./components/Loader/Loader";

function App() {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [isSearchLoading, setisSearchLoading] = useState(false);
  const [isMovieDetailLoading, setisMovieDetailLoading] = useState(false);
  const [fetchMoviesError, setfetchMoviesError] = useState("");

  const [fetchedMoviesDetail, setfetchedMoviesDetail] = useState("");
  const [fetchedMoviesDetailError, setfetchedMoviesDetailError] = useState("");

  function headerInputHandler(e) {
    console.log("headerInputHandler", e);
    if (e.target.value.length > 2) searchMovies(e.target.value);
  }

  function selectMovieHandler(imdbID) {
    console.log(imdbID);

    searchMovieDetail(imdbID);
  }

  async function searchMovies(query) {
    console.log("searchMovies");
    setfetchMoviesError("");
    setisSearchLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=44876fda&s=${query}`
    );
    const data = await res.json();
    console.log(data);
    if (data.Response === "True") {
      setFetchedMovies(data.Search);
    } else {
      setfetchMoviesError(data.Error);
    }

    setisSearchLoading(false);
  }
  async function searchMovieDetail(imdbID) {
    setfetchedMoviesDetailError("");
    setisMovieDetailLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=44876fda`
    );
    const data = await res.json();
    console.log(data);
    if (data.Response === "True") {
      setfetchedMoviesDetail(data);
    } else {
      setfetchedMoviesDetailError(data.Error);
    }

    setisMovieDetailLoading(false);
  }

  useEffect(() => {
    searchMovies("movie");
  }, []);

  return (
    <div className="App darkBg p15px flex flexCol alignCenter">
      <Header
        headerInputHandler={headerInputHandler}
        fetchedMovies={fetchedMovies}
      />
      {fetchedMovies && (
        <span className="p15px_h" style={{ alignSelf: "flex-start" }}>
          Search results ({fetchedMovies.length})
        </span>
      )}
      <Main>
        <SearchResults backgroundColor={"rgb(70, 67, 67)"}>
          {isSearchLoading && <Loader />}
          <ul className="flex flexCol p15px">
            {!fetchMoviesError &&
              !isSearchLoading &&
              fetchedMovies.length > 0 &&
              fetchedMovies.map((m) => (
                <Movie
                  title={m.Title}
                  year={m.Year}
                  key={m.imdbID}
                  poster={m.Poster}
                  selectMovieHandler={selectMovieHandler}
                  id={m.imdbID}
                />
              ))}

            {fetchMoviesError && fetchMoviesError}
          </ul>
        </SearchResults>
        <SearchResults backgroundColor={"rgb(70, 67, 62)"}>
          {isMovieDetailLoading && <Loader />}
          {!isMovieDetailLoading &&
            !fetchedMoviesDetailError &&
            !fetchedMoviesDetail &&
            "No movie selected yet"}
          {!isMovieDetailLoading &&
            !fetchedMoviesDetailError &&
            fetchedMoviesDetail && (
              <MovieDetails fetchedMoviesDetail={fetchedMoviesDetail} />
            )}
          {fetchedMoviesDetailError && fetchedMoviesDetailError}
        </SearchResults>
      </Main>
      <Footer />
    </div>
  );
}

function Header({ headerInputHandler, fetchedMovies }) {
  return (
    <div className="p15px ">
      <header
        className="flex justifyBetween alignCenter p15px_h yellowBg"
        style={{
          height: "45px",
        }}
      >
        <h1 style={{ fontSize: "24px" }}>🎬 useMovies</h1>

        <input
          className="p15px_h"
          style={{
            height: "25px",
            width: "300px",
            backgroundColor: "rgb(230, 230, 120)",
            border: "none",
          }}
          placeholder="Find a movie..."
          onChange={(e) => {
            setTimeout(() => {
              headerInputHandler(e);
            }, [300]);
          }}
          minLength={3}
        />
      </header>
    </div>
  );
}

function Main({ children }) {
  return (
    <div className="p15px flex justifyBetween alignCenter">{children}</div>
  );
}

function Footer() {
  return (
    <footer className="p15px" style={{ textAlign: "center" }}>
      Copyright © 2012 - 2023 useMovies®. All rights reserved.
    </footer>
  );
}

export default App;
