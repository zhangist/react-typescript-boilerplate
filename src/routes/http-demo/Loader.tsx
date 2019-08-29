import React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loading from "../../components/Loading";

const Component = React.lazy(() =>
  import(/* webpackChunkName: "route_i18n-demo" */ "./Page"),
);

const Loader: React.FC = () => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Loading />}>
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Loader;
