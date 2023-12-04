import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import defaultImg from "../assets/defaultImg.jpg";
import axios from "axios";
import { editProfile } from "../redux/modules/authSlice";

function Profile() {
  const { userId, nickname, avatar } = useSelector((state) => state.auth);

  const currentUserToken = localStorage.getItem("accessToken");

  const [profileEdit, setProfileEdit] = useState(false);
  const [profileImgUpload, setProfileImgUpload] = useState(
    avatar === "null" || avatar === null ? defaultImg : avatar
  );
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [editNickname, setEditNickname] = useState(nickname);
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const profileEditHandler = () => {
    setProfileEdit(true);
  };

  const profileCancelHandler = () => {
    setProfileEdit(false);
    setEditNickname(nickname);
    return;
  };

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImgUrl(file || imageUrl);
    const reader = new FileReader(); //화면에 프로필 사진 표시
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImgUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const editProfileResultHandler = async () => {
    const editCheck = window.confirm("프로필을 수정하시겠습니까?");
    if (editCheck) {
      setProfileEdit(false);

      const formData = new FormData();
      formData.append("avatar", profileImgUrl);
      formData.append("nickname", editNickname);
      try {
        const editProfileResult = await axios.patch(
          `${process.env.REACT_APP_AUTH_SERVER}/profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${currentUserToken}`,
            },
          }
        );
        dispatch(editProfile(editProfileResult));
      } catch (error) {
        console.log("Axios request failed:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      {userId && (
        <ProfileContainer>
          <ProfileWrap key={userId}>
            {profileEdit && (
              <ImageInput
                id="inputFile"
                type="file"
                ref={fileInput}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => imageChangeHandler(e)}
              />
            )}

            <AvatarImgWrap htmlFor="inputFile">
              <AvatarImg src={profileImgUpload || avatar} />
              {/* {item.avatar} */}
            </AvatarImgWrap>
            {profileEdit ? (
              <UserNickname
                value={editNickname}
                onChange={(e) => {
                  setEditNickname(e.target.value);
                }}
                minLength={4}
                maxLength={10}
              />
            ) : (
              <UserNickname disabled={profileEdit === false} value={nickname} />
            )}

            <UserId>{userId}</UserId>
            <TabWrapper>
              {profileEdit ? (
                <>
                  <EditButton onClick={editProfileResultHandler}>
                    수정완료
                  </EditButton>
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
      )}
      {!userId && <div>유저 정보가 없습니다</div>}
    </div>
  );
}

const ProfileContainer = styled.div`
  width: 100vw;
  height: 90vh;
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

const AvatarImgWrap = styled.label`
  width: 230px;
  height: 230px;
  border-radius: 500px;
  margin: 20px;
  /* background-color: black; */
  overflow: hidden;
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserNickname = styled.input`
  font-size: 32px;
  font-family: GmarketSansMedium;
  width: 400px;
  height: 50px;
  margin: 20px 20px 10px 20px;
  text-align: center;
  border: none;
  background: none;
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
