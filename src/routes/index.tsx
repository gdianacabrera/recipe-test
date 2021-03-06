//vendors
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//context
import RecipeProvider from "../home/context";

//constants
import PATHS from "./constants/paths.constants";

//components
import { Footer } from "../footer";
import { Header } from "../header";

//views
//@ts-ignore
const Home = lazy(() => import("../home"));
const RecipeDetail = lazy(() => import("../home/components/recipe-detail"));

const Routes = () => (
  <Suspense fallback={<div></div>}>
    <RecipeProvider>
      <Header />
      <Router>
        <Switch>
          <Route exact key={PATHS.HOME} path={PATHS.HOME} component={Home} />
          <Route
            exact
            key={PATHS.RECIPE_DETAIL}
            path={`${PATHS.RECIPE_DETAIL}/:id`}
            component={RecipeDetail}
          />
        </Switch>
      </Router>
      <Footer />
    </RecipeProvider>
  </Suspense>
);

export default Routes;
