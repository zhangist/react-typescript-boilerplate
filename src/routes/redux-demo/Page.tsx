import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";
import { injectReducer } from "../../common/store";
import subMenuStyles from "../../components/styles/subMenu.scss";
import { ReducerKey } from "../../enums/reducerKey";
import ProfileComponent from "./components/Profile";
import { updateCounter } from "./store/actions";
import { reducer, State } from "./store/reducer";
import { Profile } from "./store/states/profile";

injectReducer(ReducerKey.ReduxDemo, reducer);

export interface StateToProps {
  counter: number;
  hello: string;
  friends: string[];
  profile: Profile;
}
export interface DispatchToProps {
  updateCounter: (value: number) => void;
}
export interface PageProps extends StateToProps, DispatchToProps {}

const mapStateToProps = (state: {
  [ReducerKey.ReduxDemo]: State;
}): StateToProps => {
  const stateReduxDemo = state[ReducerKey.ReduxDemo];
  return {
    friends: stateReduxDemo.friends,
    profile: stateReduxDemo.profile,
    counter: stateReduxDemo.counter,
    hello: stateReduxDemo.hello,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => {
  return {
    updateCounter: value => dispatch(updateCounter(value)),
  };
};

const Page: React.FC<PageProps> = props => {
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <NavLink
          to="/redux-demo"
          exact={true}
          activeClassName={subMenuStyles.active}
        >
          Default
        </NavLink>
      </div>
      <div style={{ padding: "10px" }}>
        <section>
          <h4>Count:</h4>
          <div>
            {props.counter}
            &nbsp;
            <button onClick={() => props.updateCounter(props.counter + 1)}>
              Add
            </button>
          </div>
        </section>
        <section>
          <h4>Hello: </h4>
          <div>{props.hello}</div>
        </section>
        <section>
          <h4>Friends:</h4>
          <div>
            {props.friends.map((friend, index) => {
              return (
                <span key={index}>
                  &nbsp;
                  {friend}
                </span>
              );
            })}
          </div>
        </section>
        <section>
          <h4>Profile:</h4>
          <ProfileComponent profile={props.profile} />
        </section>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
