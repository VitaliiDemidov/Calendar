import React from "react";
import styled from "styled-components";

import RightAside from './rightAside'
import AddEventModal from "./add-event-modal";
import Header from './header.jsx'
import CalendarAside from "./aside.jsx";
import DaysOfTheMonth from "./monthsDays.jsx";
import DaysOfTheWeek from "./weekDays.jsx";

const Background = styled.div`
  background: linear-gradient(100deg, rgb(251, 102, 150) 36%, #4391d0 0);
  display: flex;
  height: 100vh;
  width: 100vw
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  margin:auto;
  height: 80vh;
  width: 80vw;
  background-color:#fff;
  border-radius: 20px;
`;


const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  position: relative;
`;

const Calendar = () => (
  <>
    <Background>
      <Container>
        <AddEventModal />
        <CalendarAside />
        <CalendarBody>
          <Header />
          <DaysOfTheWeek />
          <DaysOfTheMonth />
        </CalendarBody>
        <RightAside />
      </Container>
    </Background>
  </>
);

export default Calendar;
