import React, { useState } from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import * as dateFns from "date-fns";

import styled from "styled-components";
import Swiper from 'react-id-swiper';
import './swiper.css'


import { setNextMonth, setPrevMonth } from "../store/actions";

const monthFormat = "MMM";

const StyledCalendarAside = styled.aside`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  display: flex;
  flex-direction:column;
  padding-top:1rem;
  cursor: pointer;
  border-radius: 20px 0px 0px 20px;
-moz-border-radius: 20px 0px 0px 20px;
-webkit-border-radius: 20px 0px 0px 20px;
background-color: blueviolet;
position: relative;
overflow:hidden;

  ::after {
    position:absolute;
    content:'';
    height: 2rem;
    width:2rem;
    background-color: white;
    bottom:50%;
    right: -20%;
    z-index: 55;
    border-radius: 50%;
  }

`;
const Li = styled.li`
list-style:none;
margin: 0;
color:white;
font-weight:bold;

`

const params = {
  direction: 'vertical',
  mousewheel: true,
  slidesPerView: '11',
  spaceBetween: 20,
  speed: .50,
  loop: true,
}

const CalendarAside = ({
  setNextMonth,
  setPrevMonth,
  currentMonth
}) => {
  const [swiper, updateSwiper] = useState(null);
  let result = dateFns.eachMonthOfInterval({
    start: dateFns.subMonths(new Date(dateFns.startOfToday()), 4),
    end: dateFns.addMonths(new Date(dateFns.startOfToday()), 7)
  })


  const month = () => {
    return result.map((item, index) => <Li className={dateFns.format(item, monthFormat)} key={index}>{dateFns.format(item, monthFormat)}</Li>)
  }

  return (
    <StyledCalendarAside
      onWheel={event => {
        if (event.nativeEvent.wheelDelta > 0) {

          swiper.slidePrev(setPrevMonth());

        } else {
          swiper.slideNext(setNextMonth())


        }
      }}>

      <Swiper getSwiper={updateSwiper} {...params}>
        {month()}
      </Swiper>
    </StyledCalendarAside>
  )
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
