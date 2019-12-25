import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import subMenuStyles from "../../components/styles/subMenu.scss";
import { I18nLanguage } from "../../enums/i18nLanguage";
import { I18nNamespace } from "../../enums/i18nNamespace";

const Page: React.FC = () => {
  const [t, i18n] = useTranslation([I18nNamespace.I18nDemo]);

  const changeLanguage = (lng: I18nLanguage) => {
    i18n.changeLanguage(lng);
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
        <button onClick={() => changeLanguage(I18nLanguage.EN_US)}>
          en-US
        </button>
        <span> / </span>
        <button onClick={() => changeLanguage(I18nLanguage.ZH_CN)}>
          zh-CN
        </button>
      </div>
    </div>
  );
};

export default Page;
