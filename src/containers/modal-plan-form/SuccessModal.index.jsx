import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalLayout from '../../components/layouts/ModalLayout';
import useModal from '../../components/layouts/ModalLayout.hooks';
import iconSuccess from '../../assets/images/businessPlan/icon_phone.svg';
import closeSource from '../../assets/images/icons/close.svg';
import { CloseIcon } from '../profile-change-picture/ProfileChangePicture.styles';

import { onHideModal } from './actions';
import {
	Container,
	ContainerModalSuccess,
	IconSuccess,
	TitleSuccess,
	TextBodySuccess,
	ButtonCloseContainer,
} from './styles';

const ModalSuccess = () => {
	const { showSuccessModal } = useSelector((state) => state.modalPlanForm);
	const dispatch = useDispatch();
	const { onClose: handleClose, onExiting: handleExiting } = useModal({
		closeCallback: () => dispatch(onHideModal()),
	});

	return (
		<ModalLayout
			show={showSuccessModal}
			onClose={handleClose}
			onExiting={handleExiting}
		>
			<Container isModalSuccess>
				<ButtonCloseContainer isSuccessModal>
					<CloseIcon alt="Cerrar" src={closeSource} onClick={handleClose} />
				</ButtonCloseContainer>
				<ContainerModalSuccess>
					<IconSuccess src={iconSuccess} />
					<TitleSuccess>¡Muy bien, recibimos tu solicitud!</TitleSuccess>
					<TextBodySuccess>
						tomaremos contacto en los próximos minutos para agendar una
						conversación
					</TextBodySuccess>
				</ContainerModalSuccess>
			</Container>
		</ModalLayout>
	);
};

export default ModalSuccess;
