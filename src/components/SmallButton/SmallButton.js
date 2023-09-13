export default function SmallButton({ className, children, onClick }) {
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
