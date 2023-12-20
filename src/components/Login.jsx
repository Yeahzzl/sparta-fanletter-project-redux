import React, { useState } from "react";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/authSlice";
import { authApi } from "../api/indexApi";

function Login() {
  const [loginToggle, setLoginToggle] = useState(true);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const loginButtonHandler = () => {
    setUserId("");
    setUserPassword("");
    setUserNickname("");
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

  const inValidRegister =
    userId !== "" && userPassword !== "" && userNickname !== "";
  const inValidLogin = userId !== "" && userPassword !== "";

  // 회원가입
  const onRegisterHandler = async () => {
    if (!inValidRegister) {
      return;
    }

    const newUser = {
      id: userId,
      password: userPassword,
      nickname: userNickname,
    };
    try {
      const { data } = await authApi.post("/register", newUser);
      console.log(data);
      if (data.success) {
        toast.success("회원가입이 완료되었습니다");
        setUserId("");
        setUserPassword("");
        setLoginToggle(!loginToggle);
      }
    } catch (error) {
      console.log("Axios request failed:", error);
      // toast.error(error.response.data.message);
    }
  };

  // 로그인
  const onLoginHandler = async () => {
    if (!inValidLogin) {
      return;
    }
    const registerUser = {
      id: userId,
      password: userPassword,
    };
    try {
      const { data } = await authApi.post("/login?expiresIn=60m", registerUser);
      if (data.success) {
        dispatch(login(data));
        toast.success("로그인이 완료되었습니다");
      }
    } catch (error) {
      console.log("Axios request failed:", error);
      // toast.error(error.response.data.message);
    }
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
            <LoginButton
              disabled={!inValidLogin}
              $disabled={!inValidLogin}
              type="submit"
              onClick={onLoginHandler}
            >
              Login
            </LoginButton>
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
            <LoginButton
              disabled={!inValidRegister}
              $disabled={!inValidRegister}
              type="submit"
              onClick={onRegisterHandler}
            >
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
  background-color: ${(props) =>
    props.$disabled === true ? "#a4a4a4" : "#8458a6"};
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
