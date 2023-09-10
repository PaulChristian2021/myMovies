import placeholderPoster from "../../assets/poster-placeholder.png";
export default function Movie({ title, year, poster, selectMovieHandler, id }) {
  return (
    <li
      className={`flex alignCenter p15px pointer`}
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        backgroundColor: "rgb(70, 67, 67)",
      }}
      onClick={() => selectMovieHandler(id)}
    >
      <div>
        <img
          src={poster === "N/A" ? placeholderPoster : poster}
          alt="movie poster"
          style={{ width: "65px", height: "70px" }}
        />
      </div>

      <div
        className="flex flexCol p15px_h"
        style={{
          height: "70px",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <p>{title}</p>
        <p>📅 {year}</p>
      </div>
    </li>
  );
}
