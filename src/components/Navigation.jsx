import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function Navigation() {
  const navigate = useNavigate();
  return (
    <div>
      <NavContainer>
        <HomeButtonWrap>
          <HomeButton onClick={() => navigate("/")}>MARVEL</HomeButton>
        </HomeButtonWrap>
        <button onClick={() => navigate("/login")}>임시로그인</button>
        <ButtonWrap>
          <Button>마이페이지</Button>
          <Button>로그아웃</Button>
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
