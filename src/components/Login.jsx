import axios from "axios";
import React, { useState } from "react";
import { styled } from "styled-components";

function Login() {
  const [loginToggle, setLoginToggle] = useState(true);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const loginButtonHandler = () => {
    setLoginToggle(!loginToggle);
  };

  const idChangeHandler = (e) => {
    setUserId(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const nicknameChangeHandler = (e) => {
    setUserNickname(e.target.value);
  };
  // 회원가입
  const onRegisterHandler = async () => {
    const newUser = {
      id: userId,
      password: userPassword,
      nickname: userNickname,
    };
    console.log(newUser);
    const check = await axios.post(
      "https://moneyfulpublicpolicy.co.kr/register",
      newUser
    );
    console.log(check);
  };

  return (
    <Container>
      {loginToggle ? (
        <LoginContainer onSubmit={onSubmit}>
          <LoginTitle>로그인</LoginTitle>
          <LoginWrap>
            <InputMemberInfo
              value={userId}
              type="text"
              placeholder="아이디 최대 10자"
              minLength={4}
              maxLength={10}
              onChange={idChangeHandler}
            />
            <InputMemberInfo
              value={userPassword}
              type="password"
              placeholder="비밀번호 최대 15자"
              minLength={4}
              maxLength={15}
              onChange={passwordChangeHandler}
            />
            <LoginButton type="submit">Login</LoginButton>
            <RegisterButton onClick={loginButtonHandler}>
              Sign up
            </RegisterButton>
          </LoginWrap>
        </LoginContainer>
      ) : (
        <LoginContainer onSubmit={onSubmit}>
          <LoginTitle>회원가입</LoginTitle>
          <LoginWrap>
            <InputMemberInfo
              value={userId}
              type="text"
              placeholder="아이디 최대 10자"
              minLength={4}
              maxLength={10}
              onChange={idChangeHandler}
            />
            <InputMemberInfo
              value={userPassword}
              type="password"
              placeholder="비밀번호 최대 15자"
              minLength={4}
              maxLength={15}
              onChange={passwordChangeHandler}
            />
            <InputMemberInfo
              value={userNickname}
              type="text"
              placeholder="닉네임 최대 10자"
              maxLength={10}
              onChange={nicknameChangeHandler}
            />
            <LoginButton type="submit" onClick={onRegisterHandler}>
              Sign up
            </LoginButton>
            <RegisterButton onClick={loginButtonHandler}>Login</RegisterButton>
          </LoginWrap>
        </LoginContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LoginTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-family: GmarketSansMedium;
  font-size: 30px;
  color: #8458a6;
`;

const LoginWrap = styled.div`
  margin: 30px;
`;

const InputMemberInfo = styled.input`
  display: flex;
  justify-content: center;
  font-size: 15px;
  padding: 10px;
  margin: 30px;
  width: 400px;
  height: 30px;
  border: 1px solid #7f7f7f;
  border-radius: 10px;
  &:focus {
    border-color: #8458a6;
    outline: none;
  }
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 420px;
  height: 50px;
  margin: 30px;
  padding: 0;
  background-color: #8458a6;
  color: white;
  border-style: none;
  border-radius: 10px;
  cursor: pointer;
  &:active {
    background-color: white;
    color: #8458a6;
  }
`;

const RegisterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 425px;
  height: 50px;
  margin: 30px;
  padding: 20px 0 0 0;
  border-style: none;
  border-top: 1px solid #8458a6;
  color: #8458a6;
  background-color: transparent;
  cursor: pointer;
  &:active {
    color: white;
    border-top: 1px solid white;
  }
`;
export default Login;
