import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import subMenuStyles from "../../components/styles/subMenu.scss";
import DefaultLoader from "./routes/default/Loader";
import ALoader from "./routes/a/Loader";
import BLoader from "./routes/b/Loader";

const Page: React.FC = () => {
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink
          to="/pages-demo"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Default
        </NavLink>
        <span> / </span>
        <NavLink
          to="/pages-demo/a"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Page A
        </NavLink>
        <span> / </span>
        <NavLink
          to="/pages-demo/b"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Page B
        </NavLink>
      </div>
      <div style={{ padding: "10px" }}>
        <Switch>
          <Route path="/pages-demo" exact={true} component={DefaultLoader} />
          <Route path="/pages-demo/a" exact={true} component={ALoader} />
          <Route path="/pages-demo/b" exact={true} component={BLoader} />
          <Route
            path="/pages-demo/:any"
            component={() => <div>Not Found.</div>}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Page;
