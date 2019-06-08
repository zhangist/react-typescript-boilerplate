import * as React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { I18nNamespace } from "../../enums/i18nNamespace";
import { I18nService } from "../../services/i18nService";
import Loading from "../../components/Loading";
import subMenuStyles from "../../components/styles/subMenu.scss";

enum LanguageTypes {
  en = "en",
  zh_cn = "zh-cn",
}

export interface PageProps extends WithTranslation {}
export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  public async componentDidMount() {
    if (!I18nService.hasResourceBundle(I18nNamespace.I18nDemo)) {
      try {
        await I18nService.addResourceBundle(I18nNamespace.I18nDemo);
      } catch (error) {
      } finally {
        this.forceUpdate();
      }
    }
  }

  public render() {
    if (!I18nService.hasResourceBundle(I18nNamespace.I18nDemo)) {
      return <Loading />;
    }

    const { t } = this.props;
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
          <a
            href="javascript:void(0);"
            onClick={() => this.changeLanguage(LanguageTypes.en)}
          >
            en
          </a>
          <span> / </span>
          <a
            href="javascript:void(0);"
            onClick={() => this.changeLanguage(LanguageTypes.zh_cn)}
          >
            zh-cn
          </a>
        </div>
      </div>
    );
  }

  private changeLanguage = (lng: LanguageTypes) => {
    localStorage.setItem("i18nextLng", lng);
    location.reload();
  };
}

export default withTranslation(I18nNamespace.I18nDemo)(Page);
