import React from "react";
import Loading from "../../../../components/Loading";

const Component = React.lazy(() =>
  import(/* webpackChunkName: "route_user_profile" */ "./Page"),
);

const Loader: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Component />
    </React.Suspense>
  );
};

export default Loader;
