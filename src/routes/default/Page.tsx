import * as React from "react";
import { NavLink } from "react-router-dom";
import subMenuStyles from "../../components/styles/subMenu.scss";
import styles from "./styles.scss";

export default class Page extends React.Component {
  public render() {
    return (
      <div>
        <div style={{ padding: "10px" }}>
          <NavLink to="/" exact={true} activeClassName={subMenuStyles.active}>
            Default
          </NavLink>
        </div>
        <div style={{ padding: "10px" }}>
          <pre className={styles.code}>{`
- public
  + i18n
    favicon.ico
    index.html
- src
  + @types
  + components
  + containers
  + enums
  + interfaces
  + routes
  + services
  + store
  + utils
    Loader.tsx
    Page.tsx
    Root.tsx
          `}</pre>
        </div>
        <div style={{ padding: "10px" }}>
          <div>Features:</div>
          <ul>
            <li>support abort http request</li>
            <li>support i18n</li>
            <li>support change theme</li>
          </ul>
        </div>
        <div style={{ padding: "10px" }}>
          <div>Dependencies:</div>
          <ul>
            <li>redux</li>
            <li>axios</li>
            <li>i18next</li>
            <li>scss/postcss</li>
          </ul>
        </div>
        <div style={{ padding: "10px" }}>
          <div>
            <span>Github: </span>
            <a
              target="_blank"
              href="https://github.com/zhangist/react-ts-boilerplate"
            >
              zhangist/react-ts-boilerplate
            </a>
          </div>
        </div>
      </div>
    );
  }
}
