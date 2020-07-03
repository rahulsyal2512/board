import React from "react";
import styled from "styled-components";
import Board from "../Board";
import Settings from "../Settings";
import { connect } from "react-redux";

const Container = styled.div`
  position: absolute;
  width: calc(100vw - 15px);
`;

const Image = styled.img`
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  filter: brightness(0.7);
`;

const Title = styled.p`
  text-align: center;
  margin: 20px auto;
  font-size: 31px;
  font-weight: 500;
  color: white;
`;

const WrapperComponent = (props) => {
  const { backgroundImage } = props.app;

  return (
    <>
      <Image src={backgroundImage} />
      <Container>
        <Title>Tasks for today</Title>
        <Board />
        <Settings />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

export default connect(mapStateToProps)(WrapperComponent);
