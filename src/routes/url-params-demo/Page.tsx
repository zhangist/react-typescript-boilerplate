import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import subMenuStyles from "../../components/styles/subMenu.scss";
import DefaultLoader from "./routes/default/Loader";

const Page: React.FC = () => {
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink
          to="/url-params-demo"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Default
        </NavLink>
        <span> / </span>
        <NavLink
          to="/url-params-demo/1"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Param 1
        </NavLink>
        <span> / </span>
        <NavLink
          to="/url-params-demo/2"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Param 2
        </NavLink>
      </div>
      <Switch>
        <Route
          path="/url-params-demo/:param"
          exact={true}
          component={DefaultLoader}
        />
        <Route path="/url-params-demo" exact={true} component={DefaultLoader} />
      </Switch>
    </div>
  );
};

export default Page;
