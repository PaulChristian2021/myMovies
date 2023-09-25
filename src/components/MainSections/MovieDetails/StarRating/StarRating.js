export default function StarRating({ stars, setStars, ratingHandler }) {
  function clickHandler(index) {
    setStars(index + 1);
    ratingHandler(index + 1);
  }

  return (
    <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Star
          star={i < stars ? "★" : "☆"}
          index={i}
          clickHandler={clickHandler}
          key={Math.random()}
        />
      ))}
      <span style={{ marginLeft: "5px", fontWeight: "600", fontSize: "110%" }}>
        {stars}
        <span style={{ filter: "brightness(.7)" }}>/10</span>
      </span>
    </div>
  );

  //   ☆
  //   ★
}

function Star({ star, index, clickHandler }) {
  return (
    <span
      style={{ fontSize: "25px", userSelect: "none", color: "yellow" }}
      onClick={() => clickHandler(index)}
    >
      {star}
    </span>
  );
}
