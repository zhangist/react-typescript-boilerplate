import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "./common/history";
import { i18n } from "./common/i18n";
import { injectReducer, store } from "./common/store";
import { ErrorBoundary, Footer, Header, NotFound } from "./components/app";
import "./components/styles/global.scss";
import { ReducerKey } from "./enums/reducerKey";
import DefaultLoader from "./routes/default/Loader";
import HttpDemoLoader from "./routes/http-demo/Loader";
import I18nDemoLoader from "./routes/i18n-demo/Loader";
import PagesDemoLoader from "./routes/pages-demo/Loader";
import ReduxDemoLoader from "./routes/redux-demo/Loader";
import ThemeDemoLoader from "./routes/theme-demo/Loader";
import UrlParamsDemoLoader from "./routes/url-params-demo/Loader";
import UserLoader from "./routes/user/Loader";
import { reducer } from "./store/reducer";

injectReducer(ReducerKey.App, reducer);

const Page: React.FC = () => {
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
};

export default Page;
