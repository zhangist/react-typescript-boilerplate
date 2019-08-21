import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { I18nNamespace } from "../../enums/i18nNamespace";
import { I18nLanguage } from "../../enums/i18nLanguage";
import subMenuStyles from "../../components/styles/subMenu.scss";

const Page: React.FC = () => {
  const [t] = useTranslation([I18nNamespace.I18nDemo]);

  const changeLanguage = (lng: I18nLanguage) => {
    window.localStorage.setItem("i18nextLng", lng);
    window.location.reload();
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink
          to="/i18n-demo"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Default
        </NavLink>
      </div>
      <div style={{ padding: "10px" }}>{t("Hello!")}</div>
      <div style={{ padding: "10px" }}>
        <a href="#" onClick={() => changeLanguage(I18nLanguage.EN)}>
          en
        </a>
        <span> / </span>
        <a href="#" onClick={() => changeLanguage(I18nLanguage.ZH_CN)}>
          zh-cn
        </a>
      </div>
    </div>
  );
};

export default Page;
