import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __deleteLetters, __patchLetters } from "../redux/modules/fanLetters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImg from "../assets/defaultImg.jpg";

function CardDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, letters } = useSelector((state) => {
    return state.fanletters;
  });
  const currentUserId = useSelector((state) => state.auth.userId);

  const { id } = useParams();
  const clickData = letters.find((item) => {
    return item.id === id;
  });
  const [editText, setEditText] = useState(clickData ? clickData.content : "");
  const [isEdit, setIsEdit] = useState(false);

  const moveMain = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // 현재 로그인유저 토큰이랑 작성자가 동일할 경우에만 삭제, 수정이 가능하도록
  // 삭제 기능
  const deleteBtn = async (id) => {
    // 삭제버튼 클릭시 취소, 확인 유효성 검사
    const deleteCheck = window.confirm("정말로 삭제하시겠습니까?");
    if (deleteCheck) {
      dispatch(__deleteLetters(id));
      toast.warning("삭제되었습니다");
    } else {
      return;
    }
    setTimeout(() => moveMain(), 200);
  };

  // 수정버튼
  const editBtn = async (id) => {
    // 수정완료 버튼을 눌렀을때 확인창 띄우기
    const editCheck = window.confirm("수정을 완료하시겠습니까?");
    if (editCheck) {
      if (editText === clickData.content) {
        toast.warning("수정사항이 없습니다");
        return;
      } else {
        setIsEdit(false);
        dispatch(__patchLetters({ id, content: editText }));
        toast.success("수정이 완료되었습니다");
        moveMain();
      }
    }
  };

  return (
    <>
      <Container>
        {letters
          .filter((card) => {
            return card.id === id;
          })
          .map((item) => {
            return (
              <DetailCard key={item.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ProfileWrap>
                    <Name>{item.nickname}</Name>
                    <Time>
                      ⏱️ {item.createdAt.replace("T", " ").substring(0, 19)}
                    </Time>
                    <To>To. {item.writedTo}</To>
                  </ProfileWrap>
                  <Avatar $image={defaultImg}>{item.avatar}</Avatar>
                </div>

                <TabWrapper>
                  {isEdit ? (
                    <>
                      <Tab
                        style={{ width: "210px" }}
                        onClick={() => editBtn(item.id)}
                      >
                        수정완료
                      </Tab>
                      <ToastContainer position="top-center" />
                    </>
                  ) : (
                    <>
                      {currentUserId === clickData.userId && (
                        <>
                          <Tab onClick={() => setIsEdit(true)}>수정</Tab>
                          <Tab onClick={() => deleteBtn(item.id)}>삭제</Tab>
                        </>
                      )}
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

const Avatar = styled.image`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  margin: 60px 60px 0 0;
  object-fit: cover;
  background-image: url(${({ $image }) => $image});
`;
const ProfileWrap = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
`;
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
  margin: 0 auto 0 510px;
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
