import React from 'react'
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction:column;
  margin:auto;
  height: 15vh;
  width: 15vw;
  background-color:#fff;
  border-radius: 20px;
`;



const RightAside = () => {
    return (
        <Container>

        </Container>
    )
}

const mapStateToProps = ({ months }) => ({
    currentMonth: months.currentMonth
});

export default connect(
    mapStateToProps,
)(RightAside);

