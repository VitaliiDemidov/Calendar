import React from "react";
import { object } from "prop-types";
import { connect } from "react-redux";
import * as dateFns from "date-fns";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const dayFormat = "eee";
const daysOfTheWeek = 7;

const DayOfTheWeek = styled.h4`
  border: 1px solid ${({ theme }) => theme.lightGray};

  color: ${({ theme }) => theme.gray};
  flex-grow: 1;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 1rem .50rem;
  text-align: start;
  text-transform: uppercase;
  width: calc(100% / ${daysOfTheWeek});
`;

const StyledDaysOfTheWeek = styled.div`
  display: flex;
`;

const DaysOfTheWeek = ({ currentMonth }) => (
    <StyledDaysOfTheWeek>
        {[...Array(daysOfTheWeek).keys()].map(day => (
            <DayOfTheWeek key={uuidv4()}>
                {dateFns.format(
                    dateFns.addDays(dateFns.startOfWeek(currentMonth), day),
                    dayFormat
                )}
            </DayOfTheWeek>
        ))}
    </StyledDaysOfTheWeek>
);

DaysOfTheWeek.propTypes = {
    currentMonth: object.isRequired
};

const mapStateToProps = ({ months }) => ({
    currentMonth: months.currentMonth
});

export default connect(mapStateToProps)(DaysOfTheWeek);
