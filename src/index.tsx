import React, { useState, FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Router, Link, RouteComponentProps } from "@reach/router";
import "normalize.css";
import DebugPage from "./pages/DebugPage";
import Catalogue from "./catalogue/Catalogue";
import DebugModeToggle from "./components/DebugModeToggle";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./baseTheme";
import useGlobals from "./utils/useGlobals";
import GridPage from "./pages/GridPage";
import Route from "./utils/Route";
import { number } from "prop-types";

interface AppContextProps {
  isDebugMode: boolean;
  setDebugMode: Function;
}
export const AppContext = React.createContext<AppContextProps>({
  isDebugMode: false,
  setDebugMode: () => {}
});

interface GridContextProps {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
}
export const GridContext = React.createContext<GridContextProps>({
  gridWidth: 10,
  gridHeight: 10,
  cellSize: 10
});

interface GlobalsContextProps {
  state: any;
  dispatch: any;
}
export const GlobalsContext = React.createContext<GlobalsContextProps>({
  state: {},
  dispatch: () => {}
});

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
              <Route component={GridPage} path="/" />
              <Route component={DebugPage} path="/debug" />
              <Route component={Catalogue} path="/catalogue/*" />
            </Router>
          </GlobalsContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
