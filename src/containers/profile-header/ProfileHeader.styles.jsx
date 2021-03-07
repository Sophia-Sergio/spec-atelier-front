import styled from 'styled-components';
import {
  COLOR_BLACK,
  COLOR_GREY,
  COLOR_LIGHTGREY,
  COLOR_PRIMARY,
  COLOR_WHITE,
  VIEW_HEADER_HEIGHT,
  COLOR_GREEN_UNDERLINE
} from '../../config/constants/styled-vars';

const position_bottom = 30;

export const Container = styled.section`
  width: 100%;
  position: relative;
  height: ${VIEW_HEADER_HEIGHT + position_bottom}px;
  margin-bottom: 32px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  right: 60px;
  bottom: 48px;
`;

export const Header = styled.img`
  height: ${VIEW_HEADER_HEIGHT}px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ProfilePhoto = styled.div`
  width: 191px;
  height: 190px;
  padding: 1px 1px 2px 2px;
  border: solid 1px #ffffff;
  position: absolute;
  bottom: -${position_bottom}px;
  background-color: ${COLOR_WHITE};
  left: 50%;
  margin-left: -95px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Photo = styled.img`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const IconPhoto = styled.div`
  position: absolute;
  bottom: 22%;
  right: 4%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_GREY};
  cursor: pointer;
`;
export const ContentEdit = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 340px;
  margin: 0 auto 60px auto;
`;

export const Row = styled.div`
  display: flex;
`;

export const ProfileName = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ isEditting }) => isEditting ? 'space-between' : 'center'};;
  margin-bottom: ${({ isEditting }) => isEditting ? '4px' : '12px'};
  font-family: Lato;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.25px;
  color: ${COLOR_BLACK};
  -webkit-text-stroke: 1px ${COLOR_BLACK};
`

export const ProfileCompany = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 8px;
  font-family: Lato;
  -webkit-text-stroke: 1px ${({ isEditting }) => isEditting ? COLOR_BLACK : COLOR_GREY};
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.13px;
  color: ${({ isEditting }) => isEditting ? COLOR_BLACK : COLOR_LIGHTGREY};
  white-space: nowrap;
`;

export const ProfileCity = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: Lato;
  -webkit-text-stroke: 1px ${({ isEditting }) => isEditting ? COLOR_BLACK : COLOR_GREY};
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.13px;
  color: ${({ isEditting }) => isEditting ? COLOR_BLACK : COLOR_LIGHTGREY};
  white-space: nowrap;
`;

export const Item = styled.div`
  color: ${COLOR_PRIMARY};
  height: 100%;
  margin: 0;
  display: flex;
  min-width: 100px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export const ItemText = styled.span`
  height: 18px;
  font-family: Lato;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-bottom: 10px;
`;

export const UnderLine = styled.span`
  width: 100px;
  height: 3px;
  margin-bottom: 27px;
  border-radius: 1.5px;
  background-color: ${COLOR_PRIMARY};
`;

export const InputText = styled.div`
  white-space: nowrap;
  padding: 10px 10px 10px 0;
  border: 0; 
  outline: 0;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLOR_GREEN_UNDERLINE};
  font-family: Lato;
  font-size: 18px;
  letter-spacing: 1px;
  color: ${COLOR_BLACK};
  border-radius: 0;
  width: 100%;
`
export const DropIcon = styled.img`
  cursor: pointer;
`;

export const TextValue = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ButtonCreateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ProfileNameInputContainer = styled.div`
  max-width: 160px;
`;