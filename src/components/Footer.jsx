import React from "react";
import { styled } from "styled-components";

function Footer() {
  return (
    <div>
      <Container>
        <p>© 2023.Avengers.All rights reserved</p>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
export default Footer;
