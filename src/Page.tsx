import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { I18nNamespace } from "./enums/i18nNamespace";
import { ReducerKey } from "./enums/reducerKey";
import { HistoryService } from "./services/historyService";
import { I18nService } from "./services/i18nService";
import { StoreService } from "./services/storeService";
import { reducer } from "./store/reducer";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import "./components/styles/global.scss";
import DefaultLoader from "./routes/default/Loader";
import ReduxDemoLoader from "./routes/redux-demo/Loader";
import HttpDemoLoader from "./routes/http-demo/Loader";
import PagesDemoLoader from "./routes/pages-demo/Loader";
import UrlParamsDemoLoader from "./routes/url-params-demo/Loader";
import ThemeDemoLoader from "./routes/theme-demo/Loader";
import I18nDemoLoader from "./routes/i18n-demo/Loader";
import UserLoader from "./routes/user/Loader";

const history = HistoryService.getHistory();
const i18n = I18nService.getI18n();
const store = StoreService.getStore();

StoreService.injectReducer(ReducerKey.App, reducer);

export interface PageProps {}
export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  public async componentDidMount() {
    if (!I18nService.hasResourceBundle(I18nNamespace.App)) {
      try {
        await I18nService.addResourceBundle(I18nNamespace.App);
      } catch (error) {
      } finally {
        this.forceUpdate();
      }
    }
  }

  public render() {
    if (!I18nService.hasResourceBundle(I18nNamespace.App)) {
      return <Loading />;
    }

    return (
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Router history={history}>
              <div className="app">
                <div className="header">
                  <Header />
                </div>
                <div className="content">
                  <Switch>
                    <Route path="/" exact={true} component={DefaultLoader} />
                    <Route path="/redux-demo" component={ReduxDemoLoader} />
                    <Route path="/http-demo" component={HttpDemoLoader} />
                    <Route path="/pages-demo" component={PagesDemoLoader} />
                    <Route
                      path="/url-params-demo"
                      component={UrlParamsDemoLoader}
                    />
                    <Route path="/i18n-demo" component={I18nDemoLoader} />
                    <Route path="/theme-demo" component={ThemeDemoLoader} />
                    <Route path="/user" component={UserLoader} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
                <div className="footer">
                  <Footer />
                </div>
              </div>
            </Router>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    );
  }
}

export default Page;
