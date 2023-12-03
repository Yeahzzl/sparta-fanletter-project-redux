import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import defaultImg from "../assets/defaultImg.jpg";

function Profile() {
  const { isLoading, error, letters } = useSelector((state) => {
    return state.fanletters;
  });
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileImgUpload, setProfileImgUpload] = useState(defaultImg);
  const fileInput = useRef();

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const profileEditHandler = async () => {
    setProfileEdit(true);
  };

  const profileCancelHandler = () => {
    setProfileEdit(false);
  };

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImgUpload(imageUrl);
  };

  return (
    <div>
      {letters.map((item) => {
        return (
          <ProfileContainer>
            <ProfileWrap key={item.id}>
              <ImageInput
                id="inputFile"
                type="file"
                ref={fileInput}
                accept="image/*"
                // style={{ display: "none" }}
                onChange={imageChangeHandler}
              />
              <AvatarImgWrap>
                <AvatarImg htmlFor="inputFile" src={profileImgUpload}>
                  {item.avatar}
                </AvatarImg>
              </AvatarImgWrap>
              <UserNickname>{item.nickname}</UserNickname>
              <UserId>{item.userId}</UserId>
              <TabWrapper>
                {profileEdit ? (
                  <>
                    <EditButton>수정완료</EditButton>
                    <EditButton onClick={profileCancelHandler}>취소</EditButton>
                    {/* <ToastContainer position="top-center" /> */}
                  </>
                ) : (
                  <>
                    <EditButton onClick={profileEditHandler}>
                      프로필 수정
                    </EditButton>
                  </>
                )}
              </TabWrapper>
            </ProfileWrap>
          </ProfileContainer>
        );
      })}
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
  margin: 0;
`;

const ProfileWrap = styled.div`
  width: 600px;
  height: 600px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
`;

const ImageInput = styled.input`
  width: 100px;
  height: 100px;
`;

const AvatarImgWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 500px;
  margin: 20px;
  background-color: black;
  overflow: hidden;
`;
const AvatarImg = styled.label`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserNickname = styled.h1`
  font-size: 35px;
  font-family: GmarketSansMedium;
  margin: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
`;

const UserId = styled.p`
  font-size: 20px;
  font-family: GmarketSansMedium;
  margin: 10px;
  color: #747474;
`;
const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const EditButton = styled.button`
  width: 120px;
  height: 40px;
  margin: 20px 10px;
  border-radius: 10px;
  border-style: none;
  background-color: #8458a6;
  color: white;
  cursor: pointer;
  font-family: GmarketSansMedium;
  font-size: 16px;
  &:hover {
    background-color: white;
    border: 1px solid #8458a6;
    color: #8458a6;
  }
`;
export default Profile;
