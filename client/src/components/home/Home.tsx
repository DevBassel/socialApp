import { Link } from "react-router-dom";

export default function Home() {
  return (
    <h1>
      Home <Link to="/login">Login</Link>
    </h1>
  );
}
