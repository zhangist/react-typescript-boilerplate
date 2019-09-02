import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { NotFound } from "../../components/app";
import subMenuStyles from "../../components/styles/subMenu.scss";
import DefaultLoader from "./routes/default/Loader";
import ProfileLoader from "./routes/profile/Loader";
import SettingsLoader from "./routes/settings/Loader";

const Page: React.FC = () => {
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink to="/user" exact={true} activeClassName={subMenuStyles.active}>
          Default
        </NavLink>
        <span> / </span>
        <NavLink
          to="/user/profile"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Profile
        </NavLink>
        <span> / </span>
        <NavLink
          to="/user/settings"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Settings
        </NavLink>
      </div>
      <div>
        <Switch>
          <Route path="/user" exact={true} component={DefaultLoader} />
          <Route path="/user/profile" exact={true} component={ProfileLoader} />
          <Route
            path="/user/settings"
            exact={true}
            component={SettingsLoader}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default Page;
