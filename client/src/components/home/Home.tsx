import { Link } from "react-router-dom";

export default function Home() {
  return (
    <h1>
      Home <Link to="/login">Login</Link>
      Home <Link to="/profile">profile</Link>
    </h1>
  );
}
