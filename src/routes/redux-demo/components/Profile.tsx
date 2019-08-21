import React from "react";
import { Profile } from "../store/states/profile";

export interface ProfileComponentProps {
  profile: Profile;
}

const ProfileComponent: React.FC<ProfileComponentProps> = props => {
  const { profile } = props;

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
};

export default ProfileComponent;
