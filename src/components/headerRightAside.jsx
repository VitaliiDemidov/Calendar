import React from 'react'
import { connect } from "react-redux";
import * as dateFns from "date-fns";
import styled from "styled-components";

const HeaderAside = styled.div`
  padding:1rem 0;
  align-items: center;
  align-items: baseline;
  border-bottom: 1px solid #e5e5e5;
  max-widht:100%;
  height: 3.6rem;
`
const HeaderDay = styled.h2`
  font-size:1.5rem;
  color:blue;
  margin: 0;
`;


const HeaderRightAside = ({ day }) => {
    console.log(day);

    return (
        <HeaderAside>
            <HeaderDay>
                {dateFns.format(day, 'eeee io')}
            </HeaderDay>
        </HeaderAside>
    )
}


const mapStateToProps = ({ months, eventModal }) => ({
    currentMonth: months.currentMonth,
    day: eventModal.day
});

export default connect(mapStateToProps)(HeaderRightAside);