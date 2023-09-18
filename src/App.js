import { useEffect, useReducer } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import MovieDetails from "./components/MainSections/MovieDetails/MovieDetails";
import Movie from "./components/MainSections/SearchResults/Movie/Movie";
import SearchResults from "./components/MainSections/SearchResults/SearchResults";
import Loader from "./components/Loader/Loader";
import Tabs from "./components/MainSections/SearchResults/Tabs/Tabs";
import Footer from "./components/Footer/Footer";

const initialState = {
  fetchedMovies: [],
  myMovies: [],
  isSearchLoading: false,
  isMovieDetailLoading: false,
  fetchMoviesError: "",
  fetchedMoviesDetail: "",
  fetchedMoviesDetailError: "",
  selectedMovieID: "",
  title: "",
  year: "",
  activeTab: "Search",
};

function reducer(state, action) {
  switch (action.type) {
    case "setisSearchLoading":
      return { ...state, isSearchLoading: action.payload };
    case "setFetchedMovies":
      return { ...state, fetchedMovies: action.payload };
    case "setfetchMoviesError":
      return { ...state, fetchMoviesError: action.payload };
    case "addToMyMovies":
      return { ...state, myMovies: [...state.myMovies, action.payload] };
    case "setMyMovies":
      return { ...state, myMovies: action.payload };
    case "setSelectedMovieID":
      return { ...state, selectedMovieID: action.payload };
    case "setisMovieDetailLoading":
      return { ...state, isMovieDetailLoading: action.payload };
    case "setfetchedMoviesDetail":
      return { ...state, fetchedMoviesDetail: action.payload };
    case "setfetchedMoviesDetailError":
      return { ...state, fetchedMoviesDetailError: action.payload };
    case "changeTitleInput":
      return { ...state, title: action.payload };
    case "changeYearInput":
      return { ...state, year: action.payload };

    case "setActiveTab":
      return { ...state, activeTab: action.payload };
    default:
      throw new Error("Reducer error");
  }
}

function App() {
  const [
    {
      fetchedMovies,
      myMovies,
      isSearchLoading,
      isMovieDetailLoading,
      fetchMoviesError,
      selectedMovieID,
      fetchedMoviesDetail,
      fetchedMoviesDetailError,
      title,
      year,
      activeTab,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log("myMovies", myMovies);
  const isSelectedMovieIDListed = myMovies.some(
    (m) => m.imdbID === selectedMovieID
  );
  const listedMovieDetail = myMovies.filter(
    (m) => m.imdbID === selectedMovieID
  )[0];

  function titleInputHandler(e) {
    console.log("titleInputHandler", e);
    // setTitle(e.target.value);
    dispatch({ type: "changeTitleInput", payload: e.target.value });
  }
  function yearInputHandler(e) {
    console.log("yearInputHandler", e);
    // setYear(e.target.value);
    dispatch({ type: "changeYearInput", payload: e.target.value });
  }

  function selectMovieHandler(imdbID) {
    console.log(imdbID);
    // setSelectedMovieID(imdbID);
    dispatch({ type: "setSelectedMovieID", payload: imdbID });
    if (myMovies.some((m) => m.imdbID === imdbID)) {
      console.log("Using movie details from myMovies in localStorage...");
      const movieDetail = myMovies.filter((m) => m.imdbID === imdbID);
      console.log(movieDetail[0]);
      // setfetchedMoviesDetail(movieDetail[0]);
      dispatch({ type: "setfetchedMoviesDetail", payload: movieDetail[0] });
    } else {
      searchMovieDetail(imdbID);
    }
  }

  async function searchMovies(title, year) {
    console.log("searchMovies", title, year);
    // setfetchMoviesError("");
    dispatch({
      type: "setfetchMoviesError",
      payload: "",
    });
    // setFetchedMovies([]);
    dispatch({ type: "setFetchedMovies", payload: [] });
    // setisSearchLoading(true);
    dispatch({ type: "setisSearchLoading", payload: true });
    // let data;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=44876fda&s=${title}&y=${year}`
      );
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        // setFetchedMovies(data.Search);
        dispatch({ type: "setFetchedMovies", payload: data.Search });
      } else {
        // setfetchMoviesError(data.Error);
        dispatch({
          type: "setfetchMoviesError",
          payload: data.Error,
        });
      }
    } catch (error) {
      console.log("Error caught when searching for movies:");
      console.log(error);
      // setfetchMoviesError(`${error.name}: ${error.message}`);
      dispatch({
        type: "setfetchMoviesError",
        payload: `${error.name}: ${error.message}`,
      });
    }

    // setisSearchLoading(false);
    dispatch({ type: "setisSearchLoading", payload: false });

    // Sets the lastSearched__ so everytime the app loads, the last searched texts are used
    localStorage.setItem("lastSearchedTitle", title);
    localStorage.setItem("lastSearchedYear", year);
    localStorage.setItem("lastSearchMovieCount", fetchedMovies.length);
  }
  async function searchMovieDetail(imdbID) {
    // setfetchedMoviesDetailError("");
    dispatch({
      type: "setfetchedMoviesDetailError",
      payload: "",
    });
    // setisMovieDetailLoading(true);
    dispatch({ type: "setisMovieDetailLoading", payload: true });

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=44876fda&plot=full`
      );
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        // setfetchedMoviesDetail(data);
        dispatch({ type: "setfetchedMoviesDetail", payload: data });
      } else {
        // setfetchedMoviesDetailError(data.Error);
        dispatch({
          type: "setfetchedMoviesDetailError",
          payload: data.Error,
        });
      }
    } catch (error) {
      console.log("Error caught when fetching movie detail:");
      console.log(error);
      // setfetchedMoviesDetailError(`${error.name}: ${error.message}`);
      dispatch({
        type: "setfetchedMoviesDetailError",
        payload: `${error.name}: ${error.message}`,
      });
    }

    // setisMovieDetailLoading(false);
    dispatch({ type: "setisMovieDetailLoading", payload: false });
  }
  function closeMovieDetail() {
    // setfetchedMoviesDetail("");
    dispatch({ type: "setfetchedMoviesDetail", payload: "" });
  }

  function tabsClickHandler(tabName) {
    console.log("tabsClickHandler", tabName);
    // setactiveTab(tabName);
    dispatch({ type: "setActiveTab", payload: tabName });
  }

  function addMovieHandler(movie) {
    // movie prop gotten from API + custom "userRating" from MovieDetails
    console.log("addMovieHandler", movie);
    // prevents adding an already listed movie
    if (myMovies.some((m) => m.imdbID === movie.imdbID)) {
      return;
    } else {
      // setmyMovies((prevMyMovies) => [...prevMyMovies, movie]);

      dispatch({ type: "addToMyMovies", payload: movie });
    }
  }
  function removeMovieHandler(movieImdbID) {
    console.log("removeMovieHandler", movieImdbID);
    const list = myMovies.filter((movie) => movie.imdbID !== movieImdbID);
    console.log("movie-filtered list", list);
    // setmyMovies(list);
    dispatch({ type: "setMyMovies", payload: list });
  }
  function updateRating(rating) {
    const movieIndex = myMovies.findIndex((m) => m.imdbID === selectedMovieID);
    myMovies[movieIndex].userRating = rating;
  }

  useEffect(() => {
    console.log("load localStorage movies:", localStorage.getItem("myMovies"));
    const myMovies = JSON.parse(localStorage.getItem("myMovies"));
    // setmyMovies(myMovies ? myMovies : []);
    if (myMovies.length > 0) {
      dispatch({ type: "setMyMovies", payload: myMovies ? myMovies : [] });
    }
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
    if (fetchedMoviesDetail.Title) {
      document.title = fetchedMoviesDetail.Title;
    } else {
      document.title = "myMovies";
    }
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
        <div style={{ maxHeight: "80vh", height: "80vh", width: "50%" }}>
          <Tabs
            className=" yellowBg noSelect "
            tabsClassName="yellowBg pointer p15px white"
            tabs={[{ name: "Search" }, { name: "List" }]}
            clickHandler={tabsClickHandler}
            activeTab={activeTab}
          />
          <SearchResults
            backgroundColor={"rgb(70, 67, 67)"}
            style={{
              maxHeight: "80vh",
              height: "calc(80vh - 46px)",
              overflow: "auto",
            }}
          >
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
        </div>
        <SearchResults
          backgroundColor={"rgb(70, 67, 62)"}
          style={{
            maxHeight: "80vh",
            height: "80vh",
            width: "50%",
            overflow: "auto",
          }}
        >
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
                fetchedMoviesDetail={
                  isSelectedMovieIDListed
                    ? listedMovieDetail
                    : fetchedMoviesDetail
                }
                addMovieHandler={addMovieHandler}
                removeMovieHandler={removeMovieHandler}
                myMovies={myMovies}
                closeMovieDetail={closeMovieDetail}
                updateRating={updateRating}
              />
            )}
          {fetchedMoviesDetailError && fetchedMoviesDetailError}
        </SearchResults>
      </Main>
      <Footer />
    </div>
  );
}

function Main({ children }) {
  return (
    <div className="p15px flex justifyBetween alignCenter">{children}</div>
  );
}

export default App;
