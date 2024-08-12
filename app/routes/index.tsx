import { Link } from "@remix-run/react";
import Characters from "./characters";

export default function Index() {
  return (
    <>
      <Characters />
      <Link to="/star-wars">Go to Star Wars Component</Link>
    </>
  );
}
