import React from "react";
import { NavLink } from "react-router-dom";
import { json } from "../../common/axios";
import subMenuStyles from "../../components/styles/subMenu.scss";
import { AbortContext } from "../../interfaces/abortContext";

const getDataRequestId = Symbol();
const getDataAbortContext: AbortContext = {};

interface GetDataConfig {
  requestId?: symbol;
  abortContext?: AbortContext;
}

const Page: React.FC = () => {
  const [data, setData] = React.useState<object>({});
  const [error, setError] = React.useState<object>({});

  const clear = async () => {
    setData({});
    setError({});
  };

  const getData = async (config?: GetDataConfig) => {
    try {
      const url = `files/data.json`;
      const jsonData = await json({ url, ...config });
      setData(jsonData);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const getDataWithRequestId = async () => {
    getData({ requestId: getDataRequestId });
  };

  const getDataWithCancel = async () => {
    if (typeof getDataAbortContext.abort !== "undefined") {
      getDataAbortContext.abort();
    }

    getData({ abortContext: getDataAbortContext });
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink
          to="/http-demo"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Default
        </NavLink>
      </div>
      <div style={{ padding: "10px" }}>
        <button onClick={getDataWithRequestId}>get data with request id</button>
        <span> / </span>
        <button onClick={getDataWithCancel}>get data with abort context</button>
        <span> / </span>
        <button onClick={clear}>clear</button>
      </div>
      <div style={{ padding: "10px" }}>data:{JSON.stringify(data)}</div>
      <div style={{ padding: "10px" }}>error:{JSON.stringify(error)}</div>
    </div>
  );
};

export default Page;
