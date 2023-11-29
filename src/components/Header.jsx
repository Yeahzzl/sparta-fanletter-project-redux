import React from "react";
import { styled } from "styled-components";
import bannerImg from "../assets/avengersImg.png";

function Header({ click, setClick }) {
  // const bannerImg = require("../assets/avengers.jpg");

  /*
 // 버튼 클릭시 색상이 유지되게 하기
  이거 실패였음...focus로 기능하고 있었던것..
  const [click, setClick] = useState(0);
  const getClick = () => {
    setClick(!click);
  };
  <Tab className={click ? "active" : ""} onClick={getClick}>
*/

  return (
    <Container>
      <Wrapper $image={bannerImg}></Wrapper>
      <Title>Avengers</Title>
      <Contents onClick={() => setClick("")}>Fan Letter</Contents>
      <TabBox>
        <Tab $isClick={click === "토르"} onClick={() => setClick("토르")}>
          토르
        </Tab>
        <Tab
          $isClick={click === "블랙위도우"}
          onClick={() => setClick("블랙위도우")}
        >
          블랙위도우
        </Tab>
        <Tab
          $isClick={click === "캡틴아메리카"}
          onClick={() => setClick("캡틴아메리카")}
        >
          캡틴아메리카
        </Tab>
        <Tab
          $isClick={click === "닥터스트레인지"}
          onClick={() => setClick("닥터스트레인지")}
        >
          닥터스트레인지
        </Tab>
      </TabBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
`;

const Wrapper = styled.div`
  width: 100%;
  height: 480px;
  background-image: url(${({ $image }) => $image});
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: orange; */
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
  font-family: GmarketSansMedium;
  font-size: 50px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 40px auto;
  border-style: none;
  background-color: white;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isClick }) => ($isClick ? "white" : "#282828")};
  margin: 15px;
  border: 2px solid #282828;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-color: ${({ $isClick }) => ($isClick ? "#282828" : "white")};
  &:hover {
    background-color: #282828;
    color: white;
    border-style: none;
  }
  &:active {
    background-color: #282828;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export default Header;
