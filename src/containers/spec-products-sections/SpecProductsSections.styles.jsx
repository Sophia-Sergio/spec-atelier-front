import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Root = styled.div`
  background-color: #FFF;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const Loading = styled.div`
  align-items: center;
  color: #212121;
  display: flex;
  font-family: Lato;
  font-size: 16px;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Body = styled.section`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, 50%);
  padding: 40px 35px 15px;
  width: 100%;
`;

export const Item = styled.section`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 0 29px;
  width: 100%;
`;

export const ItemIcon = styled.span`
  background-image: url('/images/${({ icon }) => icon}.svg');
  background-position: center center;
  background-repeat: no-repeat;
  height: 34px;
  margin: 0 0 9px;
  width: 34px;

  &:hover {
    background-image: url('/images/${({ iconHover }) => iconHover}.svg');
  }
`;

ItemIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconHover: PropTypes.string.isRequired,
};

export const ItemText = styled.span`
  color: #212121;
  font-family: Lato;
  font-size: 12px;
  letter-spacing: 0.86px;
  text-align: center;
`;
