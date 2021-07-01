import styled from 'styled-components';
import {
	COLOR_MINE_SHAFT,
	MEDIA_QUERY_SMALL,
} from '../../config/constants/styled-vars';
import specDownloadSource from '../../assets/images/icons/spec-download.svg';
import specDownloadActiveSource from '../../assets/images/icons/spec-download_active.svg';
import specMonetizationSource from '../../assets/images/icons/spec-monetization.svg';
import specMonetizationActiveSource from '../../assets/images/icons/spec-monetization_active.svg';

export const Root = styled.div`
  align-items: center;
  background-color: #FFF;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  display: inline-flex;
  height: 51px;
  padding: 10px 0 10px 23px;

  ${MEDIA_QUERY_SMALL} {
    padding: 0px;
    width: 100%;
    justify-content: space-around;
  }
`;

export const Separator = styled.span`
  background-color: rgba(151, 151, 151, 0.49);
  height: 16px;
  width: 2px;

  ${MEDIA_QUERY_SMALL} {
    display: none;
  }
`;

export const Section = styled.section`
  padding: 0 23px;

  ${MEDIA_QUERY_SMALL} {
    padding: 0 15px;
  }
`;

export const ProjectName = styled(Section)`
  color: ${COLOR_MINE_SHAFT};
  font-family: Lato;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 1.58;
  
  ${MEDIA_QUERY_SMALL} {
    font-size: 12px;
  }
`;

const Span = styled.span`
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: block;
  height: 24px;
  width: 24px;
`;

export const Download = styled(Span)`
  background-image: url('${specDownloadSource}');

  &:hover {
    background-image: url('${specDownloadActiveSource}');
  }
`;

export const Monetization = styled(Span)`
  background-image: url('${specMonetizationSource}');

  &:hover {
    background-image: url('${specMonetizationActiveSource}');
  }
`;

export const Logo = styled.div`
	${MEDIA_QUERY_SMALL} {
		display: none;
	}
`;

export const MobileLogo = styled.div`
	display: none;
	${MEDIA_QUERY_SMALL} {
		display: flex;
	}
`;