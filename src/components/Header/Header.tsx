import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { I18nNamespace } from "../../enums/i18nNamespace";
import styles from "./styles.scss";

interface HeaderState {
  isMenuListOpen: boolean;
}

const bodyOverflow = document.body.style.overflow;

const Header: React.FC = () => {
  const [t] = useTranslation([I18nNamespace.Common]);
  const [state, setState] = React.useState<HeaderState>({
    isMenuListOpen: false,
  });

  const renderMenuList = () => {
    return (
      <div className={styles.menuList}>
        <NavLink
          to="/redux-demo"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("Redux Demo")}
        </NavLink>
        <NavLink
          to="/http-demo"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("Http Demo")}
        </NavLink>
        <NavLink
          to="/pages-demo"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("Pages Demo")}
        </NavLink>
        <NavLink
          to="/url-params-demo"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("Url Params Demo")}
        </NavLink>
        <NavLink
          to="/i18n-demo"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("I18n Demo")}
        </NavLink>
        <NavLink
          to="/theme-demo"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("Theme Demo")}
        </NavLink>
        <NavLink
          to="/user"
          className={styles.navLink}
          activeClassName={styles.active}
        >
          {t("User")}
        </NavLink>
      </div>
    );
  };

  const openMenu = () => {
    setState(prevState => ({ ...prevState, isMenuListOpen: true }));
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    document.body.style.overflow = bodyOverflow;
    setState(prevState => ({ ...prevState, isMenuListOpen: false }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <NavLink
          to="/"
          exact={true}
          className={styles.navLink}
          activeClassName={styles.active}
        >
          Home
        </NavLink>
        <div className={styles.narrow}>
          <div style={{ height: "100%", display: "flex" }}>
            <div style={{ flex: "auto" }} />
            <div>
              {state.isMenuListOpen ? (
                <button onClick={closeMenu}>{t("Close Menu")}</button>
              ) : (
                <button onClick={openMenu}>{t("Open Menu")}</button>
              )}
            </div>
            <div style={{ width: "10px" }} />
          </div>
          {state.isMenuListOpen ? renderMenuList() : null}
        </div>
        <div className={styles.wide}>{renderMenuList()}</div>
      </div>
    </div>
  );
};

export default Header;
