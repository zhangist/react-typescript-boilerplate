import * as React from "react";
import { Profile } from "../interfaces/profile";

export interface ProfileComponentProps {
  profile: Profile;
}

export default class ProfileComponent extends React.PureComponent<
  ProfileComponentProps,
  {}
> {
  public render() {
    const { profile } = this.props;
    return (
      <ul>
        <li>name: {profile.name}</li>
        <li>age: {profile.age}</li>
        <li>
          hobbies:
          {profile.hobbies.map((hobby, index) => {
            return (
              <span key={index}>
                &nbsp;
                {hobby}
              </span>
            );
          })}
        </li>
      </ul>
    );
  }
}
