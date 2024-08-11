"use client";

import "../../../src/index.css";
import { ThemeProvider } from "../.././context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "../../store";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../../pages/_app"), { ssr: false });

export function ClientOnly() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}
