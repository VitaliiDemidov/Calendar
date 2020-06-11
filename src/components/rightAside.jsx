import React from 'react'
import styled from "styled-components";
import { connect } from "react-redux";

import BodyAside from './bodyAside.jsx'
import HeaderRightAside from './headerRightAside.jsx'

const Container = styled.div`
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 15vw;
  background-color:#fff;
  border-bottom-right-radius: 20px;

`;



const RightAside = () => {
    return (
        <Container>
            <HeaderRightAside />
            <BodyAside />
        </Container>
    )
}

const mapStateToProps = ({ months }) => ({
    currentMonth: months.currentMonth
});

export default connect(mapStateToProps)(RightAside);

