import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { logout } from "../redux/modules/authSlice";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutButtonHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <NavContainer>
        <HomeButtonWrap>
          <HomeButton onClick={() => navigate("/")}>MARVEL</HomeButton>
        </HomeButtonWrap>
        <ButtonWrap>
          <Button onClick={() => navigate("/profile")}>마이페이지</Button>
          <Button onClick={logoutButtonHandler}>로그아웃</Button>
        </ButtonWrap>
      </NavContainer>
    </div>
  );
}

const NavContainer = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  background-color: white;
`;
const HomeButtonWrap = styled.div`
  margin-left: 100px;
  cursor: pointer;
`;
const HomeButton = styled.div`
  font-family: Bondrians;
  font-size: 40px;
  border-style: none;
  background-color: white;
`;
const ButtonWrap = styled.ul`
  display: flex;
  margin-right: 100px;
`;
const Button = styled.li`
  font-family: GmarketSansMedium;
  margin-left: 30px;
  cursor: pointer;
`;
export default Navigation;
