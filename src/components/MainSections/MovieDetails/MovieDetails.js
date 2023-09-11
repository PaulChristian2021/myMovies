import { useEffect } from "react";
import StarRating from "./StarRating/StarRating";
import placeholderPoster from "../../../assets/poster-placeholder.png";

export default function MovieDetails({ fetchedMoviesDetail }) {
  console.log(
    "props",
    fetchedMoviesDetail,
    fetchedMoviesDetail.Poster,
    Object.keys(fetchedMoviesDetail)
  );
  const p = fetchedMoviesDetail;

  useEffect(() => {
    document.title = p.Title || "myMovies";
  }, [p.Title]);

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
          <StarRating />
          <button
            className="pointer yellowBg white"
            style={{ borderRadius: "20px", padding: "5px", width: "80%" }}
          >
            Add to list
          </button>
        </div>
        <div className="p15px_h" style={{ marginTop: "20px" }}>
          {p.Plot}
        </div>
        <div className="p15px_h" style={{ marginTop: "20px" }}>
          Starring {p.Actors}
        </div>
        <div className="p15px_h" style={{ marginTop: "20px" }}>
          Directed by {p.Director}
        </div>
      </div>
    </>
  );
}
