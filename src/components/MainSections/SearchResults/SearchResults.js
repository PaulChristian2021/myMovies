export default function SearchResults({ children, backgroundColor, style }) {
  return (
    <section
      style={{
        ...style,
        backgroundColor: backgroundColor,
        // maxHeight: "80vh",
        // height: "80vh",
        // width: "50%",
        // overflow: "auto",
      }}
    >
      {children}
    </section>
  );
}
