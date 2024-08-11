import "../../src/App.css";
import ErrorBoundary from "../components/ErrorBoundary";
import StarWarsComponent from "../components/StarWars";

function App() {
  return (
    <ErrorBoundary>
      <StarWarsComponent />
    </ErrorBoundary>
  );
}

export default App;
