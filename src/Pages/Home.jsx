import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Form from "../components/Form";
import CardList from "../components/CardList";

function Home({ click, setClick, cardList, setCardList }) {
  const navigate = useNavigate();

  return (
    <div>
      <Header click={click} setClick={setClick} />
      <Form cardList={cardList} setCardList={setCardList} />
      <CardList
        click={click}
        cardList={cardList}
        setCardList={setCardList}
        navigate={navigate}
      />
    </div>
  );
}

export default Home;
