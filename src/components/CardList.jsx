import React from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CardList() {
  const navigate = useNavigate();
  const activeCharacter = useSelector((state) => state.characters);
  const letters = useSelector((state) => state.fanletters);
  let filteredList = letters.filter((item) => {
    return item.writedto === activeCharacter;
  });
  if (activeCharacter === "") {
    filteredList = letters;
  }

  return (
    <Container>
      {filteredList.length === 0 ? (
        <Card>
          <BlankText>
            🙅🏻‍♀️ {activeCharacter}에게 등록된 카드가 없습니다 🙅🏻‍♀️
            <br />
            💌 가장 먼저 카드를 카드를 등록해주세요! 💌
          </BlankText>
        </Card>
      ) : (
        filteredList.map((card) => {
          return (
            <Card
              key={card.id}
              onClick={() => {
                navigate(`/detail/${card.id}`);
                // console.log(card.id);
              }}
            >
              {/* <Avatar></Avatar> */}
              <Name>{card.nickname}</Name>
              <Time>{card.createdat}</Time>
              <Text>{card.content}</Text>
            </Card>
          );
        })
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: 1px solid #545454;
  padding-top: 50px;
  margin-bottom: 50px;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #545454;
  padding: 15px;
  width: 600px;
  height: 150px;
  margin: 15px;
  background-color: white;
  border: 3px solid #545454;
  border-radius: 0px 30px 0px 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
  &:active {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

const Name = styled.p`
  font-size: 22px;
  margin: 10px;
`;
const Time = styled.p`
  font-size: 15px;
  margin: 7px;
`;
const Text = styled.p`
  font-size: 15px;
  margin: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlankText = styled.p`
  font-size: 20px;
  line-height: 35px;
  text-align: center;
`;
// const Avatar = styled.image`
//   width: 50px;
//   height: 50px;
//   border-radius: 100px;
//   background-color: black;
// `;

export default CardList;
