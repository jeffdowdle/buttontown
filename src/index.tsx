import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import "normalize.css";
import DebugPage from "./pages/DebugPage";
import Catalogue from "./catalogue/Catalogue";
import DebugModeToggle from "./components/DebugModeToggle";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./baseTheme";
import useGlobals from "./utils/useGlobals";
import GridPage from "./pages/GridPage";

export const AppContext = React.createContext({});
export const GridContext = React.createContext({});
export const GlobalsContext = React.createContext({});

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

const App = () => {
  const [isDebugMode, setDebugMode] = useState(false);
  const [globalsState, globalsDispatch] = useGlobals();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            isDebugMode: isDebugMode,
            setDebugMode: setDebugMode
          }}
        >
          <GlobalsContext.Provider
            value={{
              state: globalsState,
              dispatch: globalsDispatch
            }}
          >
            <Link to="/">Grid</Link> | <Link to="/debug">Debug</Link> |{" "}
            <Link to="/catalogue">Catalogue</Link>
            <DebugModeToggle />
            <Router>
              <GridPage path="/" />
              <DebugPage path="/debug" />
              <Catalogue path="/catalogue/*" />
            </Router>
          </GlobalsContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
