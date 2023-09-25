// import { useContext } from "react";
// import { MyMoviesContext } from "../../App";

export default function SmallButton({ className, children, onClick }) {
  // const myMovies = useContext(MyMoviesContext);
  // console.log("asdf", myMovies);
  return (
    <button
      className={className}
      style={{
        opacity: ".9",
        color: "white",
        width: "30px",
        height: "30px",
        fontSize: "20px",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
