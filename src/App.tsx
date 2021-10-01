import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { isLoggedInVar } from "./apollo/apollo";
import GlobalStyle from "./assets/styles/global-style";
import { lightTheme } from "./assets/styles/theme";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreateAccount from "./pages/CreateAccount";
import Layout from "./components/Layout";
import Hashtag from "./pages/Hashtag";
import Profile from "./pages/Profile";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Router>
      <div>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? (
                <Layout>
                  <Home />
                </Layout>
              ) : (
                <>
                  <Route exact path="/">
                    <Login />
                  </Route>
                  <Route exact path="/create-account">
                    <CreateAccount />
                  </Route>
                </>
              )}
            </Route>
            {isLoggedIn && (
              <>
                <Route exact path="/hashtag/:word">
                  <Layout>
                    <Hashtag />
                  </Layout>
                </Route>
                <Route exact path="/profile/:username">
                  <Layout width="950px">
                    <Profile />
                  </Layout>
                </Route>
              </>
            )}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
