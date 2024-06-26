import React, { Fragment, Suspense, lazy } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import { StateProvider } from './StateProvider'; 
import ProtectedRoute from './ProtectedRoute'; 

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Pace color={theme.palette.primary.light} />
            <Suspense fallback={<Fragment />}>
              <Switch>
                <Route exact path="/" component={LoggedOutComponent} />
                <ProtectedRoute path="/c" component={LoggedInComponent} />
                <Route path="/*" component={LoggedOutComponent} />
              </Switch>
            </Suspense>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
