import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteLetter, editLetter } from "../redux/modules/fanLetters";

// 삭제 확인 후 확인 메시지 띄우기
// function showAlert() {
//   alert("삭제되었습니다");
// }
function CardDetail() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.fanletters);
  const navigate = useNavigate();
  const { id } = useParams();
  const clickData = letters.find((item) => {
    return item.id === id;
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(clickData ? clickData.content : "");
  function moveMain() {
    navigate("/");
  }
  // 삭제 기능
  const deleteBtn = (id) => {
    // 삭제버튼 클릭시 취소, 확인 유효성 검사
    const deleteCheck = window.confirm("정말로 삭제하시겠습니까?");
    if (deleteCheck) {
      dispatch(deleteLetter(id));
      alert("삭제되었습니다");
      // setCardList(setDelete);
    } else {
      return;
    }
    // setTimeout(() => showAlert(), 200);
    // 확인버튼 클릭 후 메인화면으로 이동
    setTimeout(() => moveMain(), 200);
  };

  // 수정버튼
  const editBtn = (id) => {
    // 수정완료 버튼을 눌렀을때 확인창 띄우기
    const editCheck = window.confirm("수정을 완료하시겠습니까?");
    if (editCheck) {
      if (editText === clickData.content) {
        alert("수정사항이 없습니다");
        return;
      } else {
        setIsEdit(false);
        dispatch(editLetter({ editText }));
      }
    }
  };
  return (
    <>
      <Container>
        {/* <Avatar>이미지</Avatar> */}

        {letters
          .filter((card) => {
            return card.id === id;
          })
          .map((item) => {
            return (
              <DetailCard key={item.id}>
                <>
                  <Name>{item.nickname}</Name>
                  <Time>⏱️ {item.createdat}</Time>
                  <To>To. {item.writedto}</To>
                </>

                <TabWrapper>
                  {isEdit ? (
                    <Tab
                      style={{ width: "210px" }}
                      onClick={() => editBtn(item.id)}
                    >
                      수정완료
                    </Tab>
                  ) : (
                    <>
                      <Tab onClick={() => setIsEdit(true)}>수정</Tab>
                      <Tab onClick={() => deleteBtn(item.id)}>삭제</Tab>
                    </>
                  )}
                </TabWrapper>

                <TextWrapper>
                  {isEdit ? (
                    <Text
                      onChange={(event) => {
                        setEditText(event.target.value);
                      }}
                      defaultValue={item.content}
                      maxLength={300}
                    />
                  ) : (
                    <Text disabled={isEdit === false} value={editText} />
                  )}
                </TextWrapper>
              </DetailCard>
            );
          })}

        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          메인화면으로 이동
        </Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  height: 80vh;
`;

const DetailCard = styled.div`
  /* display: flex;
  justify-content: center; */
  border: 2px solid #282828;
  border-radius: 0 60px 0 60px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  background-color: white;
  width: 800px;
  height: 600px;
  margin: auto auto 10px auto;
`;

// const Avatar = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: #282828;
//   margin: 20px auto auto 400px;
// `;

const Name = styled.h3`
  margin: 60px 0 0 60px;
  font-size: 50px;
  font-weight: 600;
`;

const Time = styled.p`
  font-size: 15px;
  font-weight: 400;
  margin: 20px 0 0 60px;
`;

const To = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin: 20px 0 0 60px;
`;

const TabWrapper = styled.div`
  display: flex;
  margin: 10px auto 0 510px;
`;

const Tab = styled.button`
  font-size: 15px;
  width: 100px;
  height: 40px;
  color: white;
  border-style: none;
  margin: 10px;
  border-radius: 50px;
  background-color: #282828;
  &:hover {
    transform: scale(1.1);
    transition: all 0.4s;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  width: 700px;
  height: 280px;
  background-color: white;
  margin: 20px auto 0 auto;
  border: 2px solid #282828;
  border-radius: 0 40px 0 40px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const Text = styled.textarea`
  width: 700px;
  height: 245px;
  padding: 17px;
  font-size: 18px;
  font-weight: 400;
  color: black;
  line-height: 25px;
  /* letter-spacing: 2px; */
  text-align: justify;
  border-radius: 0 40px 0 40px;
  border: none;
  resize: none;
  background: none;
`;

const Button = styled.button`
  width: 400px;
  font-size: 20px;
  height: 55px;
  margin: 30px auto auto auto;
  display: flex;
  justify-content: center;
  color: #282828;
  border: 2px solid #282828;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-color: white;
  padding: 15px;
  &:hover {
    background-color: #282828;
    color: white;
  }
  &:active {
    transform: scale(1.1);
    transition: all 0.4s;
  }
`;

export default CardDetail;
