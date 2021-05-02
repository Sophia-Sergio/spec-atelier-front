import React from 'react';

import {
	Container,
	Title,
	Subtitle,
	Descriptor,
	TitleInfo,
	IconCheck,
	ItemInfo,
	ItemDesc,
	ContainerCreateButton,
	ContainerIWantItButton,
	FooterInfo,
} from './styles';
import Button from '../../../../buttons/Button';
import { VARIANTS_BUTTON } from '../../../../../config/constants/button-variants';
import { TYPES } from '../../constants';

const Plan = ({ type, title, subtitle, itemsInfo, footerInfo }) => {
	return (
		<Container type={type}>
			<Descriptor type={type}>
				{type === TYPES.ARCHITECT
					? 'Solo para Arquitectos'
					: 'Solo para proveedores'}
			</Descriptor>
			<Title>{title}</Title>
			<Subtitle type={type}>{subtitle}</Subtitle>
			{type === TYPES.ARCHITECT && (
				<ContainerCreateButton>
					<Button variant={VARIANTS_BUTTON.PRIMARY} onClick={() => {}}>
						Crear cuenta
					</Button>
				</ContainerCreateButton>
			)}
			<TitleInfo>Este plan incluye</TitleInfo>
			{itemsInfo.map((item) => (
				<ItemInfo>
					<IconCheck type={type} className="fas fa-check" />
					<ItemDesc>{item.text}</ItemDesc>
				</ItemInfo>
			))}
			{!!footerInfo && <FooterInfo>{footerInfo}</FooterInfo>}
			{type === TYPES.PROVIDER && (
				<ContainerIWantItButton containFooterInfo={!!footerInfo}>
					<Button variant={VARIANTS_BUTTON.PRIMARY} onClick={() => {}}>
						¡Lo quiero!
					</Button>
				</ContainerIWantItButton>
			)}
		</Container>
	);
};

export default Plan;
