import React from 'react'
// import { connect } from "react-redux";
// import * as dateFns from "date-fns";
import styled from "styled-components";

const HeaderAside = styled.div`
position:fixed;
  padding:0.5rem;
  align-items: center;
  align-items: baseline;
  border-bottom: 1px solid #e5e5e5;
  max-widht:100%;
  height: 3rem;
`
const HeaderDay = styled.h2`
  font-size:1.5rem;
  color:blue;
  margin: 0;
`;


const HeaderRightAside = () => {

    return (
        <HeaderAside>
            <HeaderDay>
                Fridey, 4
            </HeaderDay>
        </HeaderAside>
    )
}


export default HeaderRightAside;