import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  color: #212121;
  display: block;
  font-family: Lato;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 0 0 18px;
  width: 100%;
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  z-index: ${({ open = false }) => open ? '12' : 'initial'};
`;

Section.propTypes = {
  open: PropTypes.bool.isRequired,
};

export const Input = styled.input`
  align-items: center;
  background-color: transparent;
  border: 1px solid #979797;
  border-radius: 9px;
  color: #212121;
  cursor: pointer;
  display: inline-flex;
  height: 38px;
  font-family: Lato;
  font-size: 12px;
  letter-spacing: 1px;
  overflow: hidden;
  padding: 0 31px 0 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;

  &:active, &:focus {
    outline: 0;
  }

  &::placeholder {
    color: rgba(33, 33, 33, 0.46);
  }

  &:disabled {
    background-color: #DDD;
    cursor: not-allowed;
  }
`;

export const Option = styled.section`
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  font-family: Lato;
  font-size: 12px;
  letter-spacing: 0.86px;
  padding: 10px 23px;
  width: 100%;

  &:hover {
    background-color: #EEE;
  }

  &:first-child {
    margin: 6px 0 0;
  }

  &:last-child {
    margin: 0 0 6px;
  }

  &:only-child {
    margin: 6px 0;
  }
`;

export const AddOption = styled.section`
  align-items: center;
  display: flex;
  height: 52px;
  min-height: 52px;
  padding: 0 23px;
  width: 100%;
`;

export const AddAction = styled.span`
  color: #00C1AA;
  cursor: pointer;
  font-family: Lato;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.86px;
  margin: 0 5px 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const AddText = styled.span`
  color: #212121;
  font-family: Lato;
  font-size: 12px;
  letter-spacing: 0.86px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;