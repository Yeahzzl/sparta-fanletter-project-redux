import React from "react";
import { styled } from "styled-components";
import uuid from "react-uuid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLetter } from "../redux/modules/fanLetters";

function Form() {
  const [character, setCharacter] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const userNickname = useSelector((state) => state.auth.nickname);

  const dispatch = useDispatch();

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (text === "") {
      alert("내용을 입력해주세요");
      return;
    }
    if (character === "") {
      alert("캐릭터를 선택해주세요");
      return;
    }

    // 폼에 입력되는 값
    const addCard = {
      id: uuid(),
      nickname: name,
      content: text,
      writedto: character,
      createdat: new Date().toISOString(),
    };

    dispatch(addLetter(addCard));
    // setCardList([...cardList, addCard]);

    setName("");
    setText("");
    setCharacter("");
  };

  const choose = (e) => {
    setCharacter(e.target.value);
  };

  return (
    <Container>
      <FormBox onSubmit={onSubmit}>
        <Section>
          <Span>캐릭터</Span>
          <Select value={character} onChange={choose}>
            {/* TODO: map으로 바꿔보기 */}
            <option value="">캐릭터를 선택해주세요</option>
            <option value="토르">토르</option>
            <option value="블랙위도우">블랙위도우</option>
            <option value="캡틴아메리카">캡틴아메리카</option>
            <option value="닥터스트레인지">닥터스트레인지</option>
          </Select>
        </Section>
        <Section>
          <Span>닉네임</Span>
          <NicknameInput>{userNickname}</NicknameInput>
        </Section>
        <Section>
          <Span>내용</Span>
          <TextArea
            value={text}
            type="text"
            onChange={textChangeHandler}
            placeholder="최대 300자 까지 작성할 수 있습니다"
            maxLength={300}
          />
        </Section>
        <Section>
          <Button>등록하기</Button>
        </Section>
      </FormBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dedede;
`;

const FormBox = styled.form`
  width: 100vw;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: white; */
  margin: 0;
  padding: 50px;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const Span = styled.span`
  color: #8458a6;
  font-size: 16px;
  width: 50px;
  margin: 10px;
  display: flex;
  font-family: GmarketSansMedium;
`;

const Select = styled.select`
  width: 500px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #8458a6;
  font-family: GmarketSansMedium;
  font-size: 15px;
  color: #8458a6;
`;

const NicknameInput = styled.p`
  width: 480px;
  height: 30px;
  line-height: 30px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #8458a6;
  background-color: white;
  font-family: GmarketSansMedium;
  font-size: 15px;
`;

const TextArea = styled.textarea`
  width: 480px;
  height: 150px;
  padding: 10px 10px;
  resize: none;
  border-radius: 10px;
  border: 1px solid #8458a6;
  font-family: GmarketSansMedium;
  font-size: 15px;
`;

const Button = styled.button`
  width: 500px;
  height: 50px;
  margin-left: 60px;
  border-radius: 10px;
  border-style: none;
  background-color: #8458a6;
  color: white;
  cursor: pointer;
  font-family: GmarketSansMedium;
  font-size: 17px;
  &:hover {
    background-color: white;
    border: 1px solid #8458a6;
    color: #8458a6;
  }
  &:active {
    background-color: #8458a6;
    color: white;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export default Form;
