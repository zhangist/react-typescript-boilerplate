import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { ReducerKey } from "./enums/reducerKey";
import { history } from "./common/history";
import { i18n } from "./common/i18n";
import { store, injectReducer } from "./common/store";
import { reducer } from "./store/reducer";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
