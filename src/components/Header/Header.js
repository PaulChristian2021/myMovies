import { useEffect, useRef } from "react";

export default function Header({ titleInputHandler, yearInputHandler }) {
  const titleInput = useRef(null);

  useEffect(() => {
    titleInput.current.focus();
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        if (document.activeElement !== titleInput) {
          titleInput.current.focus();
        }
      }
    });
  }, []);

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
            ref={titleInput}
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
