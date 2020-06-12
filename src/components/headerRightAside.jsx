import React from 'react'
import { connect } from "react-redux";
import * as dateFns from "date-fns";
import styled from "styled-components";

const HeaderAside = styled.div`
  padding:1rem;
  align-items: center;
  align-items: baseline;
  border-bottom: 1px solid #e5e5e5;
  max-widht:100%;
  height: 2.6rem;
`
const HeaderDay = styled.h2`
  font-size:1.5rem;
  color:blue;
  margin: 0;
`;


const HeaderRightAside = ({ currentMonth }) => {

    // const d = data.filter(event => dateFns.isSameDay(day, event.date))
    // console.log(d);

    return (
        <HeaderAside>
            <HeaderDay>
                {dateFns.format(new Date(currentMonth), 'eeee io')}
            </HeaderDay>
        </HeaderAside>
    )
}


const mapStateToProps = ({ months }) => ({
    currentMonth: months.currentMonth,
    // data: events.data
});

export default connect(mapStateToProps)(HeaderRightAside);