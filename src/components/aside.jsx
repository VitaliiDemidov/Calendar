import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import * as dateFns from "date-fns";
import styled from "styled-components";


import { setNextMonth, setPrevMonth } from "../store/actions";

const monthFormat = "MMM";

const StyledCalendarAside = styled.aside`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  display: flex;
  flex-direction:column;
  overfolv
  padding: 2rem 2rem;
  cursor: pointer;
  border-radius: 20px 0px 0px 20px;
-moz-border-radius: 20px 0px 0px 20px;
-webkit-border-radius: 20px 0px 0px 20px;
background-color: blueviolet;
position: relative;

  ::after {
    position:absolute;
    content:'';
    height: 2rem;
    width:2rem;
    background-color: white;
    bottom:50%;
    right: -20%;
    z-index: 1;
    border-radius: 55%;
  }

`;
const Li = styled.li`
list-style:none;
margin:3rem 0;
color:white;
scroll-snap-align: center;
  :first-child{
    margin:0;
  }
`
const ListBox = styled.ul`
overflow: overlay;
padding: 0 3rem;
::-webkit-scrollbar {
  width: 0px;
}
`
const CalendarAside = ({
  setNextMonth,
  setPrevMonth,
  currentMonth
}) => {
  let result = dateFns.eachMonthOfInterval({
    start: new Date(2019, 0, 1),
    end: new Date(2020, 11, 31)
  })
  console.log(result);

  const month = () => {
    return result.map((item, index) => <Li className={dateFns.format(item, monthFormat)} key={index}>{dateFns.format(item, monthFormat)}</Li>)
  }
  const getScrollLocations = () => {
    let whatIDo = document.getElementsByClassName(dateFns.format(currentMonth, monthFormat))
    // whatIDo.scrollIntoView();
  }
  return (
    <StyledCalendarAside
      onWheel={event => {
        if (event.nativeEvent.wheelDelta > 0) {
          setPrevMonth()
        } else {

          setNextMonth()
        }
      }}

    >
      <ListBox getScrollLocations={getScrollLocations()}>{month()}</ListBox>
    </StyledCalendarAside>)
};

CalendarAside.propTypes = {
  setNextMonth: func.isRequired,
  setPrevMonth: func.isRequired,
};

const mapStateToProps = ({ months }) => ({
  currentMonth: months.currentMonth
});

const mapDispatchToProps = {
  setNextMonth,
  setPrevMonth,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarAside);
