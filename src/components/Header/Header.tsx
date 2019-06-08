import * as React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { I18nNamespace } from "../../enums/i18nNamespace";
import styles from "./styles.scss";

export interface HeaderProps extends WithTranslation {}
export interface HeaderState {
  isMenuListOpen: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  private bodyOverflow = document.body.style.overflow;

  public constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isMenuListOpen: false,
    };
  }

  public render() {
    const { t } = this.props;
    const { isMenuListOpen } = this.state;
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
                {isMenuListOpen ? (
                  <button onClick={this.closeMenu}>{t("Close Menu")}</button>
                ) : (
                  <button onClick={this.openMenu}>{t("Open Menu")}</button>
                )}
              </div>
              <div style={{ width: "10px" }} />
            </div>
            {isMenuListOpen ? this.renderMenuList() : null}
          </div>
          <div className={styles.wide}>{this.renderMenuList()}</div>
        </div>
      </div>
    );
  }

  /**
   * render menu list
   */
  private renderMenuList = () => {
    const { t } = this.props;
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

  /**
   * open menu
   */
  private openMenu = () => {
    this.setState({ isMenuListOpen: true });
    document.body.style.overflow = "hidden";
  };

  /**
   * close menu
   */
  private closeMenu = () => {
    document.body.style.overflow = this.bodyOverflow;
    this.setState({ isMenuListOpen: false });
  };
}

export default withTranslation(I18nNamespace.App)(Header);
