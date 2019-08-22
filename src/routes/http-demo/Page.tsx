import React from "react";
import { NavLink } from "react-router-dom";
import { I18nNamespace } from "../../enums/i18nNamespace";
import { json } from "../../common/axios";
import subMenuStyles from "../../components/styles/subMenu.scss";

const getDataId = Symbol();

interface PageState {
  data: object;
  error: object;
}

const Page: React.FC = () => {
  const [state, setState] = React.useState<PageState>({
    data: {},
    error: {},
  });

  const clear = async () => {
    setState(prevState => ({ ...prevState, data: {}, error: {} }));
  };

  const getData = async () => {
    try {
      const url = `/static/i18n/zh-CN/${I18nNamespace.Common}.json`;
      const data = await json({ url, cancelId: getDataId });
      setState(prevState => ({ ...prevState, data }));
    } catch (error) {
      console.error(error);
      setState(prevState => ({ ...prevState, error }));
    }
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
        <button onClick={getData}>get data</button>
        <span> / </span>
        <button onClick={clear}>clear</button>
      </div>
      <div style={{ padding: "10px" }}>data:{JSON.stringify(state.data)}</div>
      <div style={{ padding: "10px" }}>error:{JSON.stringify(state.error)}</div>
    </div>
  );
};

export default Page;
