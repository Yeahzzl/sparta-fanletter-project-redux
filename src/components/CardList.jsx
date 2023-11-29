import React from "react";
import { styled } from "styled-components";

// 삼항연산자 안에 삼항연산자를 사용하면서 .map 중복사용했었는데 filteredList를 따로 빼서 간결하게 수정하였다.
function CardList({ click, cardList, setCardList, navigate }) {
  // console.log(cardList);
  let filteredList = cardList.filter((item) => {
    //   console.log(item.id, item.writedto === click);
    return item.writedto === click;
  });
  if (click === "") {
    filteredList = cardList;
  }
  console.log(click);

  return (
    <Container>
      {filteredList.length === 0 ? (
        <Card>
          <BlankText>
            🙅🏻‍♀️ 등록된 카드가 없습니다 🙅🏻‍♀️
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
