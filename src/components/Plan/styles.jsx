import styled from 'styled-components';
import {
	COLOR_WHITE,
	MEDIA_QUERY_SMALL,
} from '../../config/constants/styled-vars';
import { TYPES } from './constants';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	position: relative;
	width: 360px;
	border-radius: 24px;
	border: solid 3px
		${({ type }) => (type === TYPES.ARCHITECT ? '#ff6e37' : '#00bfa7')};
	background-color: #f9f9f9;
	padding: 45px 30px 60px;
	margin: 20px 10px;
	height: 595px;
	::before {
		content: '';
		width: 140px;
		height: 120px;
		background-color: #cad7d6;
		opacity: 0.16;
		position: absolute;
		top: 0px;
		left: 0px;
		border-radius: 70px 0px 330px 0px;
	}

	${MEDIA_QUERY_SMALL} {
		width: 320px;
	}
`;

export const Descriptor = styled.div`
	height: 36px;
	width: 190px;
	font-family: Lato;
	font-size: 14px;
	border-radius: 18px;
	padding: 10px 20px;
	color: ${COLOR_WHITE};
	background-color: ${({ type }) =>
		type === TYPES.ARCHITECT ? '#ff6e37' : '#00bfa7'};
	text-align: center;
	position: absolute;
	top: -20px;
	right: 25px;
`;

export const Title = styled.h1`
	width: 100%;
	max-width: 200px;
	font-family: Lato;
	font-weight: bold;
	font-size: 30px;
	text-align: center;
	margin-bottom: 20px;
`;

export const Subtitle = styled.p`
	font-family: Lato;
	font-size: 16px;
	text-align: center;
	line-height: 19px;
	margin-bottom: ${({ type }) => (type === TYPES.ARCHITECT ? '36px' : '70px')};
`;

export const TitleInfo = styled.h1`
	font-family: Lato;
	font-size: 18px;
	font-weight: bold;
	width: 100%;
	margin-bottom: 15px;
`;

export const IconCheck = styled.i`
	font-size: 16px;
	color: ${({ type }) => (type === TYPES.ARCHITECT ? '#ff6e37' : '#00bfa7')};
	margin-right: 9px;
`;

export const ItemInfo = styled.div`
	width: 100%;
	display: flex;
	margin: 5px 0;
`;

export const ItemDesc = styled.p`
	font-family: Lato;
	font-size: 16px;
`;

export const ContainerCreateButton = styled.div`
	margin-bottom: 54px;
`;

export const ContainerIWantItButton = styled.div`
	margin-top: ${({ containFooterInfo }) =>
		containFooterInfo ? '0px' : '100px'};
`;

export const FooterInfo = styled.p`
	text-align: center;
	margin-top: 28px;
	margin-bottom: 36px;
	font-family: Lato;
	font-size: 12px;
	max-width: 280px;
`;
