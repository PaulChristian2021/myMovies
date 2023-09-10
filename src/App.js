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

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  function titleInputHandler(e) {
    console.log("titleInputHandler", e);
    setTitle(e.target.value);
    if (e.target.value.length > 1) searchMovies(e.target.value, year);
  }
  function yearInputHandler(e) {
    console.log("yearInputHandler", e);
    setYear(e.target.value);
    if (e.target.value.length > 1 && title) searchMovies(title, e.target.value);
  }

  function selectMovieHandler(imdbID) {
    console.log(imdbID);

    searchMovieDetail(imdbID);
  }

  async function searchMovies(title, year) {
    console.log("searchMovies", title, year);
    setfetchMoviesError("");
    setFetchedMovies([]);
    setisSearchLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=44876fda&s=${title}&y=${year}`
    );
    const data = await res.json();
    console.log(data);
    if (data.Response === "True") {
      setFetchedMovies(data.Search);
    } else {
      setfetchMoviesError(data.Error);
    }

    setisSearchLoading(false);

    // Sets the lastSearched__ so everytime the app loads, the last searched texts are used
    localStorage.setItem("lastSearchedTitle", title);
    localStorage.setItem("lastSearchedYear", year);
    localStorage.setItem("lastSearchMovieCount", fetchedMovies.length);
  }
  async function searchMovieDetail(imdbID) {
    setfetchedMoviesDetailError("");
    setisMovieDetailLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=44876fda&plot=full`
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
    // uses lastSearched__ texts for initial onload movies. If no movie result from lastSearched__, uses "movie" and current year as query
    const lastSearchedTitle = localStorage.getItem("lastSearchedTitle");
    const lastSearchedYear = localStorage.getItem("lastSearchedYear");
    const lastSearchMovieCount = localStorage.getItem("lastSearchMovieCount");
    if (lastSearchMovieCount >= 1) {
      searchMovies(lastSearchedTitle, lastSearchedYear);
    } else {
      const date = new Date();
      searchMovies("movie", date.getFullYear());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App darkBg p15px flex flexCol alignCenter">
      <Header
        titleInputHandler={titleInputHandler}
        yearInputHandler={yearInputHandler}
        fetchedMovies={fetchedMovies}
      />
      {fetchedMovies && (
        <div className="p15px_h" id="resultCount">
          Search results ({fetchedMovies.length})
        </div>
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
            !fetchedMoviesDetail && (
              <div
                className="flex justifyCenter alignCenter"
                style={{ height: "100%" }}
              >
                <p>&larr; Click on a movie to know more</p>
              </div>
            )}
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

function Header({ titleInputHandler, yearInputHandler }) {
  return (
    <div className="p15px ">
      <header
        className="flex justifyBetween alignCenter p15px_h yellowBg"
        style={{
          height: "45px",
        }}
      >
        <h1 style={{ fontSize: "24px" }}>🎬 myMovies</h1>
        <form>
          <input
            className="p15px_h"
            style={{
              height: "25px",
              width: "300px",
              backgroundColor: "rgb(230, 230, 120)",
              border: "none",
            }}
            placeholder="Type the movie title here"
            onChange={(e) => {
              setTimeout(() => {
                titleInputHandler(e);
              }, [500]);
            }}
            minLength={2}
          />
          <input
            className="p15px_h"
            style={{
              height: "25px",
              width: "70px",
              backgroundColor: "rgb(230, 230, 120)",
              border: "none",
              marginLeft: "10px",
            }}
            placeholder="Year"
            onChange={(e) => {
              setTimeout(() => {
                yearInputHandler(e);
              }, [500]);
            }}
            minLength={2}
          />
        </form>
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
      Copyright © 2012 - 2023 myMovies®. All rights reserved.
    </footer>
  );
}

export default App;
