import * as React from "react";
import { NavLink } from "react-router-dom";
import { HttpService } from "../../services/httpService";
import { AbortContext } from "../../interfaces/abortContext";
import subMenuStyles from "../../components/styles/subMenu.scss";

export interface PageProps {}
export interface PageState {
  data: object;
  error: object;
}

class Page extends React.Component<PageProps, PageState> {
  private abortContext: AbortContext = {};
  public constructor(props: PageProps) {
    super(props);
    this.state = {
      data: {},
      error: {},
    };
  }

  public render() {
    const { data, error } = this.state;
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
          <button onClick={this.getData}>get data</button>
          <span> / </span>
          <button onClick={this.abort}>abort</button>
          <span> / </span>
          <button onClick={this.clear}>clear</button>
        </div>
        <div style={{ padding: "10px" }}>data:{JSON.stringify(data)}</div>
        <div style={{ padding: "10px" }}>error:{JSON.stringify(error)}</div>
      </div>
    );
  }

  private clear = async () => {
    this.setState({ data: {}, error: {} });
  };

  private getData = async () => {
    try {
      const url = `/i18n/app/zh-cn.json`;
      const data = await HttpService.json({ url }, this.abortContext);
      this.setState({ data });
    } catch (error) {
      this.setState({ error });
    }
  };

  private abort = () => {
    if (typeof this.abortContext.abort === "function") {
      this.abortContext.abort();
      this.abortContext.abort = undefined;
    }
  };
}

export default Page;
