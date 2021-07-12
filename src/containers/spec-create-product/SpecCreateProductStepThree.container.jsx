import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onShowAlertSuccess } from '../alert/Alert.actions';
import {
	onCreateSpecProduct,
	onHideSpecCreateProduct,
	onHideSpecCreateProductStepThreeSuccess,
} from './SpecCreateProduct.actions';
import useModal from '../../components/layouts/ModalLayout.hooks';
import ModalLayout from '../../components/layouts/ModalLayout';
import StepsBubbles from '../../components/basics/StepsBubbles';
import AttachedImages from '../../components/attachments/AttachedImages';
import AttachedDocuments from '../../components/attachments/AttachedDocuments';
import Button from '../../components/buttons/Button';
import {
	Root,
	Loading,
	Header,
	Title,
	CloseIcon,
	Body,
	Section,
	Footer,
	Gap,
} from './SpecCreateProduct.styles';
import closeSource from '../../assets/images/icons/close.svg';
import { VARIANTS_BUTTON } from '../../config/constants/button-variants';
import { reorderList } from '../../helpers/helpers';

/**
 * The SpecCreateProductStepThree's container.
 */
const SpecCreateProductStepThree = () => {
	const { loading } = useSelector((state) => state.specCreateProduct);
	const { documents, images, show } = useSelector(
		(state) => state.specCreateProduct.stepThree,
	);
	const dispatch = useDispatch();
	const [imagesValues, setImagesValues] = useState(images || []);
	const [documentsValues, setDocumentsValues] = useState(documents || []);
	const handleImagesChange = (attachedImages) =>
		setImagesValues(attachedImages);
	const handleDocumentsChange = (attachedDocuments) =>
		setDocumentsValues(attachedDocuments);
	const handleAttachReject = (reason) =>
		dispatch(onShowAlertSuccess({ message: reason }));
	const {
		onClose: handleClose,
		onEntering: handleEntering,
		onExited: handleExited,
	} = useModal({
		closeCallback: () => dispatch(onHideSpecCreateProduct()),
		enteringCallback: () => {
			setImagesValues(images || []);
			setDocumentsValues(documents || []);
		},
		exitedCallback: () => {
			setImagesValues([]);
			setDocumentsValues([]);
		},
	});
	const handlePrev = () =>
		dispatch(
			onHideSpecCreateProductStepThreeSuccess({
				images: imagesValues,
				documents: documentsValues,
			}),
		);
	const handleCreate = () =>
		dispatch(
			onCreateSpecProduct({ images: imagesValues, documents: documentsValues }),
		);

	const handleDragImage = (result) => {
		if (!result.destination) {
			return;
		}

		const reorderListImages = reorderList(
			imagesValues,
			result.source.index,
			result.destination.index,
		);

		setImagesValues(reorderListImages);
	};

	return (
		<ModalLayout
			overlay={false}
			show={show}
			transition={false}
			onClose={handleClose}
			onEntering={handleEntering}
			onExited={handleExited}
		>
			<Root shadow={false}>
				<Header>
					<Title>Crear producto</Title>
					<CloseIcon alt="Cerrar" src={closeSource} onClick={handleClose} />
				</Header>
				<Body>
					{loading && <Loading>Creando producto...</Loading>}
					{!loading && (
						<>
							<Section>
								<StepsBubbles
									prefix="step-3"
									steps={[{ active: true }, { active: true }, { active: true }]}
								/>
							</Section>
							<Section
								display="grid"
								gridTemplateColumns="286px 286px auto"
								padding="41px 0 0"
							>
								<AttachedImages
									images={imagesValues}
									label="Imágenes del producto"
									onChange={handleImagesChange}
									onReject={handleAttachReject}
									onDragEnd={handleDragImage}
								/>
								<AttachedDocuments
									documents={documentsValues}
									label="Documentos del producto"
									onChange={handleDocumentsChange}
									onReject={handleAttachReject}
								/>
							</Section>
						</>
					)}
				</Body>
				<Footer>
					{!loading && (
						<>
							<Button
								variant={VARIANTS_BUTTON.CANCEL}
								width="163px"
								onClick={handlePrev}
							>
								Atrás
							</Button>
							<Gap />
							<Button
								variant={VARIANTS_BUTTON.PRIMARY}
								width="163px"
								onClick={handleCreate}
							>
								Crear
							</Button>
						</>
					)}
				</Footer>
			</Root>
		</ModalLayout>
	);
};

export default SpecCreateProductStepThree;
