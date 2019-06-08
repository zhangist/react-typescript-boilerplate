import * as React from "react";
import { NavLink } from "react-router-dom";
import { Theme } from "../../enums/theme";
import subMenuStyles from "../../components/styles/subMenu.scss";

export interface PageProps {}
export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  public render() {
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
          <a
            href="javascript:void(0);"
            onClick={() => this.changeTheme(Theme.White)}
          >
            white
          </a>
          <span> / </span>
          <a
            href="javascript:void(0);"
            onClick={() => this.changeTheme(Theme.Black)}
          >
            black
          </a>
        </div>
      </div>
    );
  }

  /**
   * change theme
   */
  private changeTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    const HTML_NODE = document.getElementsByTagName("html")[0];
    HTML_NODE.setAttribute("theme", theme);
  };
}

export default Page;
