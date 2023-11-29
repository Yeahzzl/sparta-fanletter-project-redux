import React from "react";
import { styled } from "styled-components";
import uuid from "react-uuid";
import { useState } from "react";

function Form({ cardList, setCardList }) {
  const [character, setCharacter] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (name === "") {
      alert("닉네임을 입력해주세요");
      return;
    }
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
      // toISOString() 찾아보기!!
    };
    // console.log(addCard);
    // cardList를 펼쳐서 폼에 입력된 카드를 추가해줌
    setCardList([...cardList, addCard]);

    // 등록하기 버튼 클릭시 값 초기화
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
          <NameInput
            value={name}
            onChange={nameChangeHandler}
            type="text"
            placeholder="최대 10자 까지 작성할 수 있습니다"
            maxLength={10}
          />
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
  /* background-color: #ffa1ff; */
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
`;

const FormBox = styled.form`
  width: 700px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #282828;
  margin: 0;
  padding: 50px;
  border-radius: 0 50px 0 50px;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const Span = styled.span`
  color: white;
  font-size: 16px;
  width: 50px;
  margin: 10px;
  display: flex;
`;

const Select = styled.select`
  width: 320px;
  height: 40px;
  padding: 10px;
  border-radius: 50px;
  border-style: none;
`;

const NameInput = styled.input`
  width: 300px;
  height: 30px;
  padding: 5px 10px;
  border-radius: 50px;
  border-style: none;
`;

const TextArea = styled.textarea`
  width: 300px;
  height: 150px;
  padding: 10px 10px;
  resize: none;
  border-radius: 20px;
  border-style: none;
`;

const Button = styled.button`
  width: 320px;
  height: 40px;
  margin-left: 60px;
  border-radius: 50px;
  border-style: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #ffa704;
    color: white;
  }
  &:active {
    background-color: #ffa704;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export default Form;
