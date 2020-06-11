import React from "react";
import { arrayOf, func, object } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import * as dateFns from "date-fns";
import styled, { withTheme } from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import chunk from "lodash/chunk";
import { MdClose } from "react-icons/md";

import colors from "../colors";
import {
    removeEvent,
    setEventModalColor,
    setEventModalDay,
    setEventModalId,
    setEventModalHour,
    setEventModalTitle,
    toggleEventModal
} from "../store/actions";

const dayFormat = "d";
const daysOfTheWeek = 7;

const Close = styled(MdClose)`
  cursor: pointer;
`;

const Day = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGray};
  overflow: hidden;
  width: calc(100% / ${daysOfTheWeek});

`;

const Event = styled.div`
  background: ${({ color }) => colors.find(c => c.title === color).hex};
  color: ${({ theme }) => theme.white};
  border-radius:50%;
  font-size: 0.40rem;
  display: inline-block
`;

const EventsOfTheDay = styled.div`
  height: calc(100% - 2.5rem);
  overflow-y: auto;
`;

const Week = styled.div`
  display: flex;
  height: ${({ numberOfWeeks }) => `calc(100% / ${numberOfWeeks})`};
`

const Month = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${Week}:last-child {
    border-radius: 0px 20px 20px 20px;
-moz-border-radius: 0px 20px 20px 20px;
-webkit-border-radius: 0px 20px 20px 20px;
  }
`;

const DayHeader = styled.div`
  align-items: center;
  display: flex;
  height: 2.125rem;
  justify-content: start;
  padding: 0.25rem 0.50rem;
`;

const DayNumber = styled.h5`
  ${({ isToday, theme }) =>
        isToday
            ? `
      background: ${theme.blue};
      border-radius: 50%;
      color: ${theme.white};
    `
            : `color: ${theme.blue};`}
  font-variant-numeric: tabular-nums;
  font-weight: bold;
  height: 1.625rem;
  line-height: 1.625rem;
  margin: 0;
  text-align:center;
  width: 1.625rem;
`;

const DaysOfTheMonth = ({
    currentMonth,
    events,
    removeEvent,
    setEventModalColor,
    setEventModalDay,
    setEventModalHour,
    setEventModalId,
    setEventModalTitle,
    theme,
    toggleEventModal
}) => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(currentMonth);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);


    const allDaysOfTheMonth = [
        ...Array(dateFns.differenceInDays(endDate, startDate) + 1).keys()
    ].map(index => {
        const day = dateFns.addDays(startDate, index);
        const isToday = dateFns.isSameDay(day, new Date());


        const openEditModal = ({ color, date, hour, id, title }) => {
            setEventModalColor({ payload: color });
            setEventModalDay({ payload: date });
            setEventModalHour({ payload: hour });
            setEventModalId({ payload: id });
            setEventModalTitle({ payload: title });
            toggleEventModal({ payload: true });
        };

        return (
            <Day
                key={uuidv4()}
                onClick={() => {
                    setEventModalDay({ payload: day });
                    toggleEventModal({ payload: true });
                }}
            >
                <DayHeader>
                    <DayNumber isToday={isToday}>
                        {dateFns.format(day, dayFormat)}
                    </DayNumber>
                </DayHeader>
                <EventsOfTheDay>
                    {events
                        .filter(event => dateFns.isSameDay(day, event.date))
                        .map(event => (
                            <Event
                                color={event.color}
                                key={uuidv4()}
                                onClick={() => openEditModal(event)}>
                                <span>
                                    {event.hour ? `${event.hour}h · ` : ""}
                                    {event.title}
                                </span>
                                <Close
                                    color={theme.white}
                                    onClick={e => {
                                        e.stopPropagation();
                                        removeEvent({ payload: event.id });
                                    }}
                                />
                            </Event>
                        ))}
                </EventsOfTheDay>
            </Day>
        );
    });
    return (
        <Month>
            {chunk(allDaysOfTheMonth, daysOfTheWeek).map((week, index, array) => (
                <Week Week key={uuidv4()} numberOfWeeks={array.length} >
                    {week}
                </Week>
            ))
            }
        </Month>
    );
};

DaysOfTheMonth.propTypes = {
    currentMonth: object.isRequired,
    events: arrayOf(object).isRequired,
    removeEvent: func.isRequired,
    setEventModalColor: func.isRequired,
    setEventModalDay: func.isRequired,
    setEventModalHour: func.isRequired,
    setEventModalId: func.isRequired,
    setEventModalTitle: func.isRequired,
    theme: object.isRequired,
    toggleEventModal: func.isRequired
};

const mapStateToProps = ({ events, months }) => ({
    currentMonth: months.currentMonth,
    events
});

const mapDispatchToProps = {
    removeEvent,
    setEventModalColor,
    setEventModalDay,
    setEventModalHour,
    setEventModalId,
    setEventModalTitle,
    toggleEventModal
};

export default compose(
    withTheme,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(DaysOfTheMonth);
