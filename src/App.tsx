import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import StarWarsComponent from "./pages/StarWars";

function App() {
  return (
    <ErrorBoundary>
      <StarWarsComponent />
    </ErrorBoundary>
  );
}

export default App;
