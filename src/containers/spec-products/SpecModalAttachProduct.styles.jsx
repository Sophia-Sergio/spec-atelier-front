import styled from 'styled-components';
import {
	COLOR_WHITE,
	COLOR_BLACK,
	COLOR_LIGHTERGREY,
	MEDIA_QUERY_SMALL,
} from '../../config/constants/styled-vars';

const PADDING_CONTENT = '8px 2px 8px 8px';
const HEIGHT_CONTENT = '350px';

export const Container = styled.div`
	width: 400px;
	padding: 40px;
	background-color: ${COLOR_WHITE};
	border-radius: 4px;
	min-height: ${HEIGHT_CONTENT};
	${MEDIA_QUERY_SMALL} {
		border-radius: 0;
		height: 100%;
		padding: 5px;
	}
`;

export const Content = styled.section`
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	flex-direction: column;
	letter-spacing: 1px;
	font-family: Lato;
`;

export const ButtonClose = styled.span`
	display: flex;
	justify-content: flex-end;
	cursor: pointer;
	outline: none;
`;

export const Header = styled.section`
	padding: ${PADDING_CONTENT};
	display: flex;
	justify-content: space-between;
	margin-right: 8px;
`;

export const Title = styled.div`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
	padding: 0 8px 8px 0;
	width: 318px;
	height: 17px;
	height: 17px;
	font-family: Lato;
	font-size: 14px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 1.17px;
	color: ${COLOR_BLACK};
	${MEDIA_QUERY_SMALL} {
		padding: 0px 20px 0px 0px;
	}
`;

export const Section = styled.section`
	display: flex;
	justify-content: space-between;
	height: ${HEIGHT_CONTENT};
	padding: ${PADDING_CONTENT};
	flex-direction: column;
	${MEDIA_QUERY_SMALL} {
		height: 100%;
		flex-direction: column;
	}
`;

export const OptionsList = styled.section`
	background-color: transparent;
	margin: 5px 0 20px;
	max-height: 270px;
	overflow-y: auto;
`;

export const SectionName = styled.div`
	font-family: Lato;
	font-size: 12px;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 1px;
	color: ${COLOR_BLACK};
	font-weight: bold;
	margin-bottom: 20px;
`;

export const Separator = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${COLOR_LIGHTERGREY};
`;

export const Options = styled.div`
	margin: 20px 0;
`;

export const Option = styled.section`
	align-items: center;
	box-sizing: border-box;
	color: #212121;
	cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};;
	display: flex;
	font-family: Lato;
	font-size: 12px;
	letter-spacing: 0.86px;
	padding: 10px 16px;
	width: 100%;
	background-color: ${({ disabled }) => disabled ? '#eee' : 'none'};

	&:hover {
		background-color: #eee;
	}

	&:first-child {
		margin: 6px 0 0;
	}

	&:last-child {
		margin: 0 0 6px;
	}
`;

export const OptionCheckboxIcon = styled.img`
	height: 18px;
	margin: 0 8px 0 0;
	width: 18px;
`;

export const OptionText = styled.span`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
