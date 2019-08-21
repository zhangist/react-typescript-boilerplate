import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface PageProps extends RouteComponentProps<{ param?: string }> {}

const Page: React.FC<PageProps> = props => {
  return (
    <div style={{ padding: "10px" }}>
      <div>current param: {props.match.params.param}</div>
    </div>
  );
};

export default withRouter(Page);
