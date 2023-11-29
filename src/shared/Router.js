import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Detail from "../Pages/Detail";
import { useState } from "react";

const Router = ({ cardList, setCardList }) => {
  const [click, setClick] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cardList={cardList}
              setCardList={setCardList}
              click={click}
              setClick={setClick}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={<Detail cardList={cardList} setCardList={setCardList} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
