import { ThemeProvider } from "../context/ThemeContext";
import StarWarsComponent from "../components/StarWars";
import ThemeToggleButton from "../components/ThemeToggle";

export default function StarWars() {
  return (
    <ThemeProvider>
      <div>
        <h1>Starwars Character Finder</h1>
        <StarWarsComponent />
        <ThemeToggleButton />
      </div>
    </ThemeProvider>
  );
}
