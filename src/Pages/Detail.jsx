import React from "react";
import { useNavigate } from "react-router-dom";
import CardDetail from "../components/CardDetail";

function Detail({ cardList, setCardList }) {
  const navigate = useNavigate();
  // console.log(id);
  return (
    <div>
      <CardDetail
        navigate={navigate}
        cardList={cardList}
        setCardList={setCardList}
      />
    </div>
  );
}

export default Detail;
