import React, { useState } from "react";
import { styled } from "styled-components";

function Login() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Container>
      {isLogin ? (
        <LoginContainer>
          <LoginTitle>로그인</LoginTitle>
          <LoginWrap>
            <InputMemberInfo
              type="text"
              placeholder="아이디 최대 10자"
              maxLength={10}
            />
            <InputMemberInfo
              type="password"
              placeholder="비밀번호 최대 15자"
              maxLength={15}
            />
            <LoginButton>Login</LoginButton>
            <RegisterButton>Sign up</RegisterButton>
          </LoginWrap>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <LoginTitle>회원가입</LoginTitle>
          <LoginWrap>
            <InputMemberInfo
              type="text"
              placeholder="아이디 최대 10자"
              maxLength={10}
            />
            <InputMemberInfo
              type="password"
              placeholder="비밀번호 최대 15자"
              maxLength={15}
            />
            <InputMemberInfo
              type="text"
              placeholder="닉네임 최대 10자"
              maxLength={10}
            />
            <LoginButton>Sign up</LoginButton>
            <RegisterButton>Login</RegisterButton>
          </LoginWrap>
        </LoginContainer>
      )}
    </Container>
  );
}

const Container = styled.form`
  width: 100vw;
  height: 100vh;
  background-color: #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
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
