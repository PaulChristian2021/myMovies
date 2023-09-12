import { useEffect, useState } from "react";
import "./App.css";

import MovieDetails from "./components/MainSections/MovieDetails/MovieDetails";
import Movie from "./components/MainSections/SearchResults/Movie/Movie";
import SearchResults from "./components/MainSections/SearchResults/SearchResults";
import Loader from "./components/Loader/Loader";
import Tabs from "./components/MainSections/SearchResults/Tabs/Tabs";

function App() {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [myMovies, setmyMovies] = useState([]);
  const [isSearchLoading, setisSearchLoading] = useState(false);
  const [isMovieDetailLoading, setisMovieDetailLoading] = useState(false);
  const [fetchMoviesError, setfetchMoviesError] = useState("");

  const [fetchedMoviesDetail, setfetchedMoviesDetail] = useState("");
  const [fetchedMoviesDetailError, setfetchedMoviesDetailError] = useState("");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const [activeTab, setactiveTab] = useState("Search");

  function titleInputHandler(e) {
    console.log("titleInputHandler", e);
    setTitle(e.target.value);
  }
  function yearInputHandler(e) {
    console.log("yearInputHandler", e);
    setYear(e.target.value);
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
    let data;
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=44876fda&s=${title}&y=${year}`
      );
      data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setFetchedMovies(data.Search);
      } else {
        setfetchMoviesError(data.Error);
      }
    } catch (error) {
      console.log("Error caught:");
      console.log(error);
      setfetchMoviesError(`${error.name}: ${error.message}`);
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

  function tabsClickHandler(tabName) {
    console.log("tabsClickHandler", tabName);
    setactiveTab(tabName);
  }

  function addMovieHandler(movie) {
    // movie prop gotten from API + custom "userRating" from MovieDetails
    console.log("addMovieHandler", movie);
    // prevents adding an already listed movie
    if (myMovies.some((m) => m.imdbID === movie.imdbID)) {
      return;
    } else {
      setmyMovies((prevMyMovies) => [...prevMyMovies, movie]);
    }
  }
  function removeMovieHandler(movieImdbID) {
    // movie prop gotten from API + custom "userRating" from MovieDetails
    console.log("removeMovieHandler", movieImdbID);
    // prevents adding an already listed movie
    // if (myMovies.some((m) => m.imdbID === movie.imdbID)) {
    //   return;
    // } else {
    //   setmyMovies((prevMyMovies) => [...prevMyMovies, movie]);
    // }
    const list = myMovies.filter((movie) => movie.imdbID !== movieImdbID);
    console.log("movie-filtered list", list);
    setmyMovies(list);
  }

  useEffect(() => {
    console.log("load localStorage movies:", localStorage.getItem("myMovies"));
    const myMovies = JSON.parse(localStorage.getItem("myMovies"));
    setmyMovies(myMovies ? myMovies : []);
  }, []);
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
  useEffect(() => {
    console.log("CALL API: Search Movies");
    if (title.length > 1) searchMovies(title, year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, year]);
  useEffect(() => {
    // Sets the browser tab title
    if (activeTab === "List") document.title = "myMovies";
    else if (activeTab !== "List" && fetchedMoviesDetail.Title)
      document.title = fetchedMoviesDetail.Title;
  }, [activeTab, fetchedMoviesDetail.Title]);
  useEffect(() => {
    localStorage.setItem("myMovies", JSON.stringify(myMovies));
  }, [myMovies]);

  return (
    <div className="App darkBg p15px flex flexCol alignCenter">
      <Header
        titleInputHandler={titleInputHandler}
        yearInputHandler={yearInputHandler}
        fetchedMovies={fetchedMovies}
      />
      {fetchedMovies && activeTab === "Search" && (
        <div className="p15px_h" id="resultCount">
          Search results ({fetchedMovies.length})
        </div>
      )}
      {activeTab === "List" && (
        <div className="p15px_h" id="resultCount">
          Your list ({myMovies.length})
        </div>
      )}
      <Main>
        <SearchResults backgroundColor={"rgb(70, 67, 67)"}>
          <Tabs
            className=" yellowBg noSelect "
            tabsClassName="yellowBg pointer p15px white"
            tabs={[{ name: "Search" }, { name: "List" }]}
            clickHandler={tabsClickHandler}
            activeTab={activeTab}
          />
          {activeTab === "Search" && (
            <>
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
            </>
          )}
          {activeTab === "List" && (
            <>
              {/* {isSearchLoading && <Loader />} */}
              <ul className="flex flexCol p15px">
                {myMovies &&
                  myMovies.length > 0 &&
                  myMovies.map((m) => (
                    <Movie
                      title={m.Title}
                      year={m.Year}
                      key={m.imdbID}
                      poster={m.Poster}
                      selectMovieHandler={selectMovieHandler}
                      id={m.imdbID}
                    />
                  ))}

                {myMovies &&
                  myMovies.length < 1 &&
                  'Start adding movies to your list by click the "Add to list" on a movie you searched for.'}
              </ul>
            </>
          )}
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
              <MovieDetails
                fetchedMoviesDetail={fetchedMoviesDetail}
                addMovieHandler={addMovieHandler}
                removeMovieHandler={removeMovieHandler}
                myMovies={myMovies}
              />
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
        <h1 className="noSelect" style={{ fontSize: "24px" }}>
          🎬 myMovies
        </h1>
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
              }, [1000]);
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
              }, [1000]);
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
