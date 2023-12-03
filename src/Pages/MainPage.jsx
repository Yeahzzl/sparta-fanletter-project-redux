import React from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import CardList from "../components/CardList";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __getLetters } from "../redux/modules/fanLetters";

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getLetters());
  }, []);
  return (
    <div>
      <Header />
      <Form />
      <CardList />
      <Footer />
    </div>
  );
}

export default MainPage;
