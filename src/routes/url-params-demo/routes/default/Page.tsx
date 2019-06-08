import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface PageProps extends RouteComponentProps<{ param?: string }> {}
export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  public render() {
    return (
      <div style={{ padding: "10px" }}>
        <div>current param: {this.props.match.params.param}</div>
      </div>
    );
  }
}

export default withRouter(Page);
