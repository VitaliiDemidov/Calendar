import React from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import * as dateFns from "date-fns";
import styled, { withTheme } from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import colors from "../colors";

const Body = styled.div`
width: 100%;
    display:flex;
    flex-direction:column;
    align-items:center;
justify-content:center;
 text-align:center;
 color:blue;
 overflow:scroll;
  ::-webkit-scrollbar {
  width: 0px;
}
 `
const Block = styled.div`
width: 100%;
display:flex;
align-items:center;
justify-content:space-around;
 border-bottom: 1px solid #e5e5e5;
 `
const ColorTask = styled.div`
background-color: ${({ color }) => colors.find(c => c.title === color).hex};
border-radius:50%;
height:10px;
width:10px;
`
const LeftBlock = styled.div`
width:50%;
`

const BodyAside = ({ events, months }) => {
    return (
        <Body>
            {events.map(event => (
                <Block key={uuidv4()}>
                    <ColorTask color={event.color}></ColorTask>
                    <LeftBlock> <h5>{event.title}</h5>
                        <span>{event.hour || ''}</span></LeftBlock>
                </Block>
            ))}
        </Body>
    )
}

const mapStateToProps = ({ events, months }) => ({
    currentMonth: months.currentMonth,
    events
});


export default compose(
    withTheme,
    connect(
        mapStateToProps

    )
)(BodyAside);