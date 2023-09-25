import { useEffect, useState } from "react";
import StarRating from "./StarRating/StarRating";
import placeholderPoster from "../../../assets/poster-placeholder.png";
import SmallButton from "../../SmallButton/SmallButton";

export default function MovieDetails({
  fetchedMoviesDetail,
  addMovieHandler,
  removeMovieHandler,
  myMovies,
  closeMovieDetail,
  updateRating,
}) {
  console.log(
    "MovieDetails props",
    fetchedMoviesDetail,
    fetchedMoviesDetail.Poster,
    Object.keys(fetchedMoviesDetail),
    myMovies
  );
  const p = fetchedMoviesDetail;
  const isMovieListed = myMovies.some(
    (m) => m.imdbID === fetchedMoviesDetail.imdbID
  );

  const [starRate, setStarRate] = useState(0);

  function addMovie() {
    console.log("addMovie movie:", p);
    addMovieHandler({ ...fetchedMoviesDetail, userRating: starRate });
  }
  function removeMovie() {
    console.log("removeMovie movie:", p);
    removeMovieHandler(fetchedMoviesDetail.imdbID);
    setStarRate(0);
  }
  function updateRatingHandler(rating) {
    // prevents error when rating an unlisted movie in the search
    // rating the unlisted movie disappears if "Add to list" is not clicked
    if (isMovieListed) {
      updateRating(rating);
    }
  }

  useEffect(() => {
    console.log("Moviedetail rating useEffect", fetchedMoviesDetail);
    if (isMovieListed) {
      if (fetchedMoviesDetail.userRating) {
        setStarRate(fetchedMoviesDetail.userRating);
      } else {
        setStarRate(0);
      }
    }
  }, [isMovieListed, fetchedMoviesDetail, fetchedMoviesDetail.userRating]);

  return (
    <>
      <div className="flex " style={{ backgroundColor: "rgb(85,82,82)" }}>
        <img
          src={p.Poster === "N/A" ? placeholderPoster : p.Poster}
          alt="movie poster"
          style={{ width: "20%", minWidth: "150px", height: "200px" }}
        />
        <div
          className="flex flexCol justifyBetween p15px"
          style={{ margin: "20px" }}
        >
          <h2 style={{ fontSize: "20px" }}>{p.Title}</h2>
          <div>{p.Released}</div>
          <div>{p.Genre}</div>
          <div>⭐{p.imdbRating} IMDb rating</div>
        </div>
        <div>
          <SmallButton className="grayBg pointer" onClick={closeMovieDetail}>
            &times;
          </SmallButton>
        </div>
      </div>
      <div className="p15px">
        <div
          className="flex flexCol alignCenter p15px"
          style={{
            backgroundColor: "rgb(85,82,82)",
            borderRadius: "10px",
            margin: "15px",
          }}
        >
          <StarRating
            stars={starRate}
            setStars={setStarRate}
            ratingHandler={updateRatingHandler}
          />

          <button
            className={`pointer white ${isMovieListed ? "redBg" : "yellowBg"}`}
            style={{ borderRadius: "20px", padding: "5px", width: "80%" }}
            onClick={isMovieListed ? removeMovie : addMovie}
          >
            {isMovieListed ? "Remove from list" : "Add to list"}
          </button>
        </div>
        <div className="p15px_h" style={{ marginTop: "20px" }}>
          Plot: {p.Plot}
        </div>
        <div className="p15px_h" style={{ marginTop: "20px" }}>
          Starring: {p.Actors}
        </div>
        <div className="p15px_h" style={{ marginTop: "20px" }}>
          Directed by: {p.Director}
        </div>
      </div>
    </>
  );
}
