import { Outlet } from "@remix-run/react";
import "../App.css";

export default function Characters() {
  return (
    <div>
      <h1>Star Wars Characters</h1>
      <Outlet />
    </div>
  );
}
