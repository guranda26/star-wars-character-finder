import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
  return (
    <div>
      <h1>Star Wars Characters</h1>
      <Outlet />
    </div>
  );
};

export default Root;
