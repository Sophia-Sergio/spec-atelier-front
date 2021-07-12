import styled from 'styled-components';
import {
	COLOR_WHITE,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	MEDIA_QUERY_SMALL,
	COLOR_BLACK,
} from '../../config/constants/styled-vars';

const HEIGHT_CONTENT = '350px';
const PADDING_CONTENT = '8px 2px 8px 8px';

export const ButtonClose = styled.img`
	display: flex;
	justify-content: flex-end;
	cursor: pointer;
	outline: none;
	width: 30px;
	height: 30px;
`;

export const Container = styled.div`
	width: 80%;
	padding: 40px;
	background-color: ${COLOR_WHITE};
	border-radius: 4px;
	min-height: ${HEIGHT_CONTENT};
	${MEDIA_QUERY_SMALL} {
		width: 100vw;
		border-radius: 0;
		height: 100vh;
		padding: 0;
		position: relative;
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
	${MEDIA_QUERY_SMALL} {
		height: 100vh;
	}
`;

export const Header = styled.section`
	padding: ${PADDING_CONTENT};
	display: flex;
	justify-content: space-between;
	margin-right: 8px;
	align-items: center;
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
	height: ${HEIGHT_CONTENT};
	padding: ${PADDING_CONTENT};
	${MEDIA_QUERY_SMALL} {
		height: 90vh;
		flex-direction: column;
	}
`;

export const ImagesContainer = styled.section`
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow-y: auto;
	${MEDIA_QUERY_SMALL} {
		display: none;
	}
`;

export const ImagesContent = styled.div`
	outline: none;
	margin: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	max-width: 100px;
	border: 2px solid;
	max-height: 120px;
	border-color: ${({ active }) => (active ? COLOR_PRIMARY : 'transparent')};
	${MEDIA_QUERY_SMALL} {
		display: none;
	}
`;

export const ProductImageSelectedContainer = styled.div`
	justify-content: center;
	align-items: center;
	flex: 3;
	padding: 16px;
	display: flex;
	min-height: 200px;
	${MEDIA_QUERY_SMALL} {
		flex: initial;
	}
`;

export const ProductImageSelected = styled.div`
	max-height: 250px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const InfoContainer = styled.section`
	flex: 3;
	display: flex;
	padding: ${PADDING_CONTENT};
	${MEDIA_QUERY_SMALL} {
		height: 39%;
		flex: initial;
	}
`;

export const InfoContent = styled.section`
	flex-direction: column;
	flex: 1;
	display: flex;
	justify-content: space-between;
	letter-spacing: 0.83px;
`;

export const ProductName = styled.div`
	font-family: Lato;
	font-size: 12px;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 1px;
	color: ${COLOR_BLACK};
	font-weight: bold;
`;

export const ProductDescription = styled.div`
	margin: 16px 0px 8px;
	font-size: 12px;
	overflow-y: auto;
	height: 100%;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 1px;
	color: ${COLOR_BLACK};
`;

export const ProductBrand = styled.div`
	margin: 8px 0px;
	color: ${COLOR_BLACK};
	font-family: Lato;
	font-size: 10px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.83px;
`;

export const Actions = styled.section`
	display: flex;
	align-items: center;
`;

export const ButtonContact = styled.input`
	outline: none;
	cursor: pointer;
	color: ${COLOR_WHITE};
	border-radius: 16px;
	padding: 8px 28px;
	background-color: ${COLOR_SECONDARY};
	font-size: 16px;
	font-weight: bold;
	text-align: center;
`;

export const AddButtonContainer = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	padding: 0 10px;
	width: 100%;
	height: 50px;
	position: fixed;
	bottom: 10px;
	left: 0;
	${MEDIA_QUERY_SMALL} {
		display: flex;
	}
`;
