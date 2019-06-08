import * as React from "react";

export interface State {
  count: number;
}

export default class PageB extends React.Component<{}, State> {
  public constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  public render() {
    if (this.state.count >= 5) {
      throw new Error("I am error");
    }
    return (
      <div>
        <div>Page B</div>
        <div>
          <p>Click on the numbers to increase the counters.</p>
          <p>
            The counter is programmed to throw when it reaches 5. This simulates
            a JavaScript error in a component.
          </p>
          <span onClick={() => this.setState({ count: this.state.count + 1 })}>
            {this.state.count}
          </span>
        </div>
      </div>
    );
  }
}
