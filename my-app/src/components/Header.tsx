
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/first">First</Link> |{" "}
      <Link to="/second">Second</Link> |{" "}
      <Link to="/third">Third</Link>
    </nav>
  );
}
