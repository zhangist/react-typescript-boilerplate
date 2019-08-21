import React from "react";

export interface State {
  count: number;
}

const PageB: React.FC = () => {
  const [state, setState] = React.useState<State>({
    count: 0,
  });

  if (state.count >= 5) {
    throw new Error("I am error");
  }

  return (
    <div>
      <div>Page B</div>
      <div>
        <p>Click on the numbers to increase the counters.</p>
        <p>
          The counter is programmed to throw when it reaches 5. This simulates a
          JavaScript error in a component.
        </p>
        <span
          onClick={() =>
            setState(prevState => ({
              ...prevState,
              count: prevState.count + 1,
            }))
          }
        >
          {state.count}
        </span>
      </div>
    </div>
  );
};
export default PageB;
