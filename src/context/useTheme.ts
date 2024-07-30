import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "./ThemeContext";

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
