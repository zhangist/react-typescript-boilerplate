import React from "react";
import { NavLink } from "react-router-dom";
import { Theme } from "../../enums/theme";
import subMenuStyles from "../../components/styles/subMenu.scss";

const Page: React.FC = () => {
  const changeTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    const HTML_NODE = document.getElementsByTagName("html")[0];
    HTML_NODE.setAttribute("theme", theme);
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink
          to="/theme-demo"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Default
        </NavLink>
      </div>
      <div style={{ padding: "10px" }}>
        <a href="#" onClick={() => changeTheme(Theme.White)}>
          white
        </a>
        <span> / </span>
        <a href="#" onClick={() => changeTheme(Theme.Black)}>
          black
        </a>
      </div>
    </div>
  );
};

export default Page;
