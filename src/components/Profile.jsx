import React from "react";
import { styled } from "styled-components";

function Profile() {
  return (
    <div>
      <ProfileContainer>
        <ProfileWrap></ProfileWrap>
      </ProfileContainer>
    </div>
  );
}

const ProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default Profile;
