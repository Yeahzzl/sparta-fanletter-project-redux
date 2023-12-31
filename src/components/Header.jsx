import React from "react";
import { styled } from "styled-components";
import bannerImg from "../assets/avengersImg.png";
import { useDispatch, useSelector } from "react-redux";
import { setCharacter } from "../redux/modules/characters";

function Header() {
  const activeCharacter = useSelector((state) => state.characters);
  const dispatch = useDispatch();

  const onActiveCharacter = (event) => {
    if (event.target === event.currentTarget) return;
    dispatch(setCharacter(event.target.textContent));
  };

  const fanLettetBtn = () => {
    dispatch(setCharacter(""));
  };
  return (
    <Container>
      <Wrapper $image={bannerImg}></Wrapper>
      <Title>Avengers</Title>
      <Contents onClick={fanLettetBtn}>Fan Letter</Contents>
      <TabBox onClick={onActiveCharacter}>
        <Tab $isClick={activeCharacter}>토르</Tab>
        <Tab $isClick={activeCharacter}>블랙위도우</Tab>
        <Tab $isClick={activeCharacter}>캡틴아메리카</Tab>
        <Tab $isClick={activeCharacter}>닥터스트레인지</Tab>
      </TabBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 480px;
  background-image: url(${({ $image }) => $image});
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100%;
`;
const Title = styled.h1`
  font-family: Bondrians;
  font-size: 200px;
  font-weight: 800;
  letter-spacing: 8px;
  display: flex;
  justify-content: center;
  margin: 100px 0 20px 0;
`;

const Contents = styled.button`
  font-family: Lemosty;
  font-size: 60px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 40px auto;
  border-style: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #818181;
    border-style: none;
  }
  &:active {
    color: #818181;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

const TabBox = styled.ul`
  width: 800px;
  margin: 0 auto;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Tab = styled.button`
  width: 150px;
  height: 60px;
  font-size: 15px;
  font-family: GmarketSansMedium;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isClick, children }) =>
    $isClick === children ? "white" : "#282828"};
  margin: 15px;
  border: 1px solid #8458a6;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-color: ${({ $isClick, children }) =>
    $isClick === children ? " #8458a6" : "transparent"};
  &:hover {
    background-color: #8458a6;
    color: white;
    border-style: none;
  }
  &:active {
    /* background-color: #282828; */
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export default Header;
