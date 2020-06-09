import React from 'react'
import { object } from 'prop-types'
import styled from "styled-components";
import { connect } from "react-redux";
import * as dateFns from "date-fns";

const monthFormat = "MMMM";
const yearFormat = "yyyy"

const YearStyle = styled.h3`
    color:grey;
`
const StyledHeader = styled.div`
  padding:0.5rem;
  display:flex;
  align-items: center;
  align-items: baseline;
  border-right: 1px solid #e5e5e5;
`

const CurrentMonth = styled.h2`
  font-size:2rem;
  color:blue;
  margin: 0;
`;


const Header = ({ currentMonth }) => (
    <StyledHeader >
        <CurrentMonth>{dateFns.format(currentMonth, monthFormat)},</CurrentMonth>
        <YearStyle>{dateFns.format(currentMonth, yearFormat)}</YearStyle>
    </StyledHeader>
)

Header.propTypes = {
    currentMonth: object.isRequired
}
const mapStateToProps = ({ months }) => ({
    currentMonth: months.currentMonth
});

export default connect(mapStateToProps)(Header);
