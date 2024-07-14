import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import StarWarsComponent from "./pages/StarWars";
import NotFoundPage from "./pages/NotFount";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<StarWarsComponent />} />
          <Route path="/:page" element={<StarWarsComponent />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
