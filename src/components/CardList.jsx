import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/defaultImg.jpg";
import axios from "axios";
import { addLetter } from "../redux/modules/fanLetters";

// 카드리스트 유저 닉네임 작성한 사람의 닉네임으로 나오게 수정하기(로그인한 유저로 다 바뀜..)

function CardList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeCharacter = useSelector((state) => state.characters);
  const letters = useSelector((state) => state.fanletters);
  // const userNickname = useSelector((state) => state.auth.nickname);
  let filteredList = letters.filter((item) => {
    return item.writedto === activeCharacter;
  });
  if (activeCharacter === "") {
    filteredList = letters;
  }

  //추가된 letter 그려주기
  useEffect(() => {
    const fetchLetter = async () => {
      const { data } = await axios.get("http://localhost:4000/newLetter");
      console.log("data", data);
      data.forEach((element) => {
        dispatch(addLetter(element));
      });
    };
    fetchLetter();
  }, []);

  return (
    <Container>
      {filteredList.length === 0 ? (
        <Card>
          <BlankText>
            🙅🏻‍♀️ {activeCharacter}에게 등록된 카드가 없습니다 🙅🏻‍♀️
            <br />
            💌 가장 먼저 카드를 등록해주세요! 💌
          </BlankText>
        </Card>
      ) : (
        filteredList.map((letter) => {
          return (
            <Card
              onClick={() => {
                navigate(`/detail/${letter.id}`);
                // console.log(card.id);
              }}
            >
              <NameProfile>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Nickname>{letter.nickname}</Nickname>
                  <Time>{letter.createdAt}</Time>
                  <Toletter>{letter.writedTo}</Toletter>
                </div>
                <Avatar $image={defaultImg}>{letter.avatar}</Avatar>
              </NameProfile>
              <Text>{letter.content}</Text>
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
  padding: 10px 20px;
  width: 500px;
  height: 160px;
  margin: 15px;
  background-color: white;
  border: 2px solid #545454;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: all 0.5s;
  }
  &:active {
    transform: scale(1.05);
    transition: all 0.3s;
  }
`;
const NameProfile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Nickname = styled.p`
  font-size: 20px;
  margin: 5px 10px;
  color: #8458a6;
`;

const Avatar = styled.image`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  object-fit: cover;
  background-image: url(${({ $image }) => $image});
`;

const Time = styled.p`
  font-size: 12px;
  margin: 5px 10px;
`;

const Toletter = styled.p`
  font-size: 12px;
  margin: 5px 10px;
`;

const Text = styled.p`
  font-size: 15px;
  margin: 7px;
  border-top: 1px solid #545454;
  padding-top: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlankText = styled.p`
  font-size: 20px;
  line-height: 35px;
  text-align: center;
`;

export default CardList;
