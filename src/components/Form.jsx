import { styled } from "styled-components";
import uuid from "react-uuid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addLetters } from "../redux/modules/fanLetters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [character, setCharacter] = useState("");
  const [content, setContent] = useState("");
  const userNickname = useSelector((state) => state.auth.nickname);
  const currentUserId = useSelector((state) => state.auth.userId);
  const currentUserAvatar = useSelector((state) => state.auth.avatar);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => {
    return state.fanletters;
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  // 캐릭터 선택
  const choose = (e) => {
    setCharacter(e.target.value);
  };
  // 내용 입력
  const textChangeHandler = (event) => {
    setContent(event.target.value);
  };

  // letter 추가기능
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (content === "") {
      toast.warning("내용을 입력해주세요");
      return;
    }
    if (character === "") {
      toast.warning("캐릭터를 선택해주세요");
      return;
    }

    const newLetter = {
      id: uuid(),
      nickname: userNickname,
      content,
      avatar: currentUserAvatar,
      writedTo: character,
      createdAt: new Date(),
      userId: currentUserId,
    };
    dispatch(__addLetters(newLetter));

    setContent("");
    setCharacter("");
  };

  // useEffect(() => {
  //   fetchLetter();
  // }, []);

  return (
    <Container>
      <FormBox onSubmit={onSubmitHandler}>
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
            value={content}
            type="text"
            onChange={textChangeHandler}
            placeholder="최대 300자 까지 작성할 수 있습니다"
            maxLength={300}
          />
        </Section>
        <Section>
          <Button>등록하기</Button>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
  font-family: GmarketSansMedium;
  font-size: 15px;
  color: #545454;
  border: 1px solid #7f7f7f;
  border-radius: 10px;
  &:focus {
    border-color: #8458a6;
    outline: none;
  }
`;

const NicknameInput = styled.p`
  width: 472px;
  height: 30px;
  line-height: 30px;
  color: #545454;
  padding: 5px 13px;
  border-radius: 10px;
  border: 1px solid #7f7f7f;
  background-color: white;
  font-family: GmarketSansMedium;
  font-size: 15px;
`;

const TextArea = styled.textarea`
  width: 480px;
  height: 150px;
  padding: 10px 10px;
  resize: none;
  font-family: GmarketSansMedium;
  font-size: 15px;
  border: 1px solid #7f7f7f;
  border-radius: 10px;
  &:focus {
    border-color: #8458a6;
    outline: none;
  }
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
    transform: scale(1.05);
    transition: all 0.3s;
  }
`;

export default Form;
