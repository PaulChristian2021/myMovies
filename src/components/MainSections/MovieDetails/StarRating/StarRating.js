import { useState } from "react";

export default function StarRating() {
  const [stars, setStars] = useState(0);

  function clickHandler(index) {
    setStars(index + 1);
  }

  return (
    <div style={{ padding: "10px" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Star
          star={i < stars ? "★" : "☆"}
          index={i}
          clickHandler={clickHandler}
          key={Math.random()}
        />
      ))}
    </div>
  );

  //   ☆
  //   ★
}

function Star({ star, index, clickHandler }) {
  return (
    <span
      className="noSelect yellow"
      style={{ fontSize: "25px" }}
      onClick={() => clickHandler(index)}
    >
      {star}
    </span>
  );
}
