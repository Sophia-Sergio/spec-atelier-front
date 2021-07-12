import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
	onHideSpecEditProduct,
	onGetSpecProductsSystems,
	onGetSpecProductsBrands,
	onEditSpecProduct,
	cleanStore,
} from './SpecEditProduct.actions';
import { onGetSpecProductsSections } from '../spec-products-sections/SpecProductsSections.actions';
import { onGetSpecProductsItems } from '../spec-products-items/SpecProductsItems.actions';
import {
	useInput,
	useSelect,
	useTextarea,
	useMultiSelect,
} from '../../components/inputs/Inputs.hooks';
import useModal from '../../components/layouts/ModalLayout.hooks';
import {
	Root,
	Section,
	Footer,
	Label,
	ProductContainer,
	Text,
	DocContainer,
	ImagesContainer,
	ProductContent,
	DraggableImageContainer,
	SubtitleContent,
	ContainerHeaderContent,
} from './SpecEditProduct.styles';
import {
	TextArea,
	Input,
	Select,
	Button,
	Modal,
	ImageDelete,
	AttachedImages,
	AttachedDocuments,
} from '../../components/SpecComponents';
import { mapToSelector, reorderList } from '../../helpers/helpers';
import { onShowAlertSuccess } from '../alert/Alert.actions';
import DocumentItem from '../../components/attachments/DocumentItem';
import MultiSelect from '../../components/inputs/MultiSelect';
import { COLOR_GREY } from '../../config/constants/styled-vars';

function* KeyGen() {
	let i = 1;
	while (true) yield (i += 1) + Date.now();
}

const keygen = KeyGen();
/**
 * The SpecEditProduct's container.
 */
const SpecEditProduct = () => {
	const { id } = useParams();
	const {
		show,
		product,
		loading,
		systemsCollection: systems = [],
		brandsCollection: brands,
	} = useSelector((state) => state.specEditProduct);
	const { collection: sections = [] } = useSelector(
		(state) => state.specProductsSections,
	);
	const { collection: items = [] } = useSelector(
		(state) => state.specProductsItems,
	);
	const { project_types = [], room_types = [], work_types = [] } = useSelector(
		(state) => state.app,
	);
	const dispatch = useDispatch();

	const [imagesModal, setImagesModal] = useState(false);
	const [documentsModal, setDocumentsModal] = useState(false);
	const [imagesToDelete, setImagesToDelete] = useState([]);
	const [documentsToDelete, setDocumentsToDelete] = useState([]);
	const [roomTypesOptions, setRoomTypesOptions] = useState(room_types || []);
	const [showMoreData, setShowMoreData] = useState(false);
	const [imagesValues, setImagesValues] = useState([]);
	const [documentsValues, setDocumentsValues] = useState([]);

	const {
		onChange: handleNameChange,
		set: setNameValue,
		value: nameValue,
	} = useInput(product.name);
	const {
		onChange: handlePriceChange,
		set: setPriceValue,
		value: priceValue,
	} = useInput('', 'currency');

	const {
		onChange: handleReferenceChange,
		set: setReferenceValue,
		value: referenceValue,
	} = useInput('');
	const {
		onChange: handleUnitChange,
		set: setUnitValue,
		value: unitValue,
	} = useInput('');

	const {
		onChange: handleLongDescChange,
		set: setLongDescValue,
		value: longDescValue,
	} = useTextarea(product.long_desc);
	const {
		onChange: handleShortDescChange,
		set: setShortDescValue,
		value: shortDescValue,
	} = useTextarea(product.short_desc);
	const {
		onChange: onSectionChange,
		set: setSectionValue,
		values: sectionValue = [],
	} = useMultiSelect(product.sections);
	const {
		onChange: onItemChange,
		set: setItemValue,
		values: itemValue,
	} = useMultiSelect(product.items);
	const {
		onChange: handleSystemChange,
		set: setSystemValue,
		values: systemValue,
	} = useMultiSelect(product.systems);
	const {
		onChange: handleBrandChange,
		set: setBrandValue,
		value: brandValue,
	} = useSelect(product.brand);
	const {
		onChange: handleProjectTypeChange,
		set: setProjectTypeValue,
		values: projectTypeValues,
	} = useMultiSelect();
	const {
		onChange: handleRoomTypeChange,
		set: setRoomTypeValue,
		values: roomTypeValues,
	} = useMultiSelect();
	const {
		onChange: handleWorkTypeChange,
		set: setWorkTypeValue,
		values: workTypeValues,
	} = useMultiSelect();

	const handleSectionChange = (options) => {
		onSectionChange(options);
		setItemValue([]);
		setSystemValue([]);
	};

	const onSubmitSection = () => {
		dispatch(onGetSpecProductsItems({ sections: sectionValue }));
	};

	const handleItemChange = (option) => {
		onItemChange(option);
		setSystemValue([]);
	};

	const onSubmitItem = () => {
		dispatch(onGetSpecProductsSystems({ items: itemValue }));
	};

	const { onClose: handleClose, onExiting: handleExiting } = useModal({
		closeCallback: () => {
			dispatch(onHideSpecEditProduct());
			dispatch(cleanStore());
			setShowMoreData(false);
			setItemValue([]);
			setSystemValue([]);
			setImagesValues([]);
			setImagesToDelete([]);
			setDocumentsToDelete([]);
			setNameValue('');
			setLongDescValue('');
			setShortDescValue('');
			setPriceValue('');
			setReferenceValue('');
			setUnitValue('');
			setSectionValue([]);
			setDocumentsValues([]);
			setRoomTypesOptions([]);
		},
		exitingCallback: () => {
			setImagesModal(false);
			setDocumentsModal(false);
		},
	});

	const filterRoomTypesOptions = (selectedProjectTypes) => {
		const filteredRoomTypes = room_types
			.filter((rt) =>
				rt.project_types.some((rpt) =>
					selectedProjectTypes.some((spt) => spt.id === rpt.id),
				),
			)
			.map(mapToSelector);

		setRoomTypesOptions(filteredRoomTypes);
		setRoomTypeValue(
			filteredRoomTypes.filter((frt) =>
				roomTypeValues.some((rt) => rt.id === frt.id),
			),
		);
		handleProjectTypeChange(selectedProjectTypes);
	};

	const handleMoreDate = () => {
		setShowMoreData(true);
		setProjectTypeValue(product.project_type.map(mapToSelector));
		filterRoomTypesOptions(product.project_type);
		setWorkTypeValue(product.work_type.map(mapToSelector));
	};

	const handleDeleteImg = (img) => {
		setImagesValues(imagesValues.filter((image) => image.id !== img.id));
		if (!img.isNew) setImagesToDelete([...imagesToDelete, img.id]);
	};

	const handleDeletePDF = (doc) => () => {
		setDocumentsValues(documentsValues.filter((file) => file.id !== doc.id));
		if (!doc.isNew) setDocumentsToDelete([...documentsToDelete, doc.id]);
	};

	const openModalImg = () => setImagesModal(true);
	const closeModalImg = () => setImagesModal(false);
	const toggleDocumentsModal = () => setDocumentsModal(!documentsModal);

	const mapToImages = (img) => ({ ...img, src: img?.urls?.medium });
	const mapToFiles = (file) => ({
		id: file.id,
		file,
		src: file.url,
		name: file.name,
	});

	const mapToId = ({ id: idMap }) => idMap;

	const handleAttachReject = (reason) =>
		dispatch(onShowAlertSuccess({ message: reason }));

	const onAddImages = (imgs) => {
		// eslint-disable-next-line no-undef
		const newImages = imgs.filter((img) => img instanceof File);
		setImagesValues([
			...imagesValues,
			...newImages.map((img) => ({
				id: keygen.next().value,
				name: img.name,
				size: img.size,
				src: URL.createObjectURL(img),
				file: img,
				isNew: true,
				order: imagesValues.length,
			})),
		]);
	};

	const onAddDocuments = (attachedDocuments) => {
		// eslint-disable-next-line no-undef
		const newDocs = attachedDocuments.filter((doc) => doc instanceof File);
		setDocumentsValues([
			...documentsValues,
			...newDocs.map((doc) => ({
				id: keygen.next().value,
				name: doc.name,
				size: doc.size,
				src: URL.createObjectURL(doc),
				file: doc,
				isNew: true,
			})),
		]);
	};

	const isSameArray = (arr1, arr2) =>
		arr1.every((ae1) => arr2.some((ae2) => ae1.id === ae2.id));
	const onSave = () =>
		dispatch(
			onEditSpecProduct({
				product: {
					id: product.id,
					name: product.name !== nameValue ? nameValue : undefined,
					brand: product.brand?.id !== brandValue?.id ? brandValue : undefined,
					long_desc:
						product.long_desc !== longDescValue ? longDescValue : undefined,
					short_desc:
						product.short_desc !== shortDescValue ? shortDescValue : undefined,
					price: product.price !== priceValue ? priceValue : undefined,
					reference:
						product.reference !== referenceValue ? referenceValue : undefined,
					unit: product.unit !== unitValue ? unitValue : undefined,
					item: isSameArray(product.items, itemValue)
						? itemValue.map(mapToId)
						: undefined,
					section: isSameArray(product.sections, sectionValue)
						? sectionValue.map(mapToId)
						: undefined,
					system: isSameArray(product.systems, systemValue)
						? systemValue.map(mapToId)
						: undefined,
					room_type: roomTypeValues.length
						? roomTypeValues.map((rt) => rt.id)
						: undefined,
					work_type: workTypeValues.length
						? workTypeValues.map((wt) => wt.id)
						: undefined,
					project_type: projectTypeValues.length
						? projectTypeValues.map((pt) => pt.id)
						: undefined,
				},
				documents: documentsValues.reduce(
					(acc, doc) => (doc.isNew ? [...acc, doc.file] : acc),
					[],
				),
				images: imagesValues.map((img, index) =>
					img.file
						? { ...img, order: index }
						: { image_id: img.id, order: index },
				),
				imagesToDelete,
				documentsToDelete,
				specID: id,
			}),
		);

	useEffect(() => {
		if (!show) return;
		dispatch(onGetSpecProductsBrands());
		dispatch(onGetSpecProductsSections());
	}, [show]);

	useEffect(() => {
		if (product.id) {
			setLongDescValue(product.long_desc);
			setShortDescValue(product.short_desc);
			setNameValue(product.name);
			setSectionValue(product.sections.map(mapToSelector));
			setItemValue(product.items.map(mapToSelector));
			setSystemValue(product?.systems.map(mapToSelector));
			setPriceValue(product.price || '');
			setReferenceValue(product.reference || '');
			setUnitValue(product.unit || '');
			setBrandValue(mapToSelector(product.brand));
			setImagesValues(product.images.map(mapToImages));
			setDocumentsValues(product.pdfs.map(mapToFiles));
			setDocumentsToDelete([]);
			setImagesToDelete([]);
			dispatch(onGetSpecProductsItems({ sections: product.sections }));
			dispatch(onGetSpecProductsSystems({ items: product.items }));
		}
	}, [product]);

	if (loading || !brands || !product.id) return null;
	const canEdit = !nameValue || !sectionValue.length || !itemValue.length;
	const imageWidth =
		imagesValues.length < 3
			? `${Number.parseInt(100 / imagesValues.length || 1, 10)}%`
			: '33%';
	const imagesHeight =
		imagesValues.length < 3
			? '100%'
			: `${Number.parseInt(100 / Math.ceil(imagesValues.length / 3), 10)}%`;

	const handleDragEnd = (result) => {
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
		<Modal show={show} onClose={handleClose} onExiting={handleExiting}>
			<Root>
				<Section padding="0 0 20px 0" width="50%">
					<Label>Nombre del producto</Label>
					<Input
						type="form"
						placeholder="Nombre"
						value={nameValue}
						width="490px"
						onChange={handleNameChange}
						name="name"
					/>
				</Section>
				<ProductContainer>
					{/* Left */}
					<ProductContent>
						<ContainerHeaderContent>
							<Text onClick={openModalImg}>
								<i className="fas fa-plus" /> Añadir imagen
							</Text>
							<SubtitleContent>
								(Puedes ordenarlas. La primera se mostrará por defecto)
							</SubtitleContent>
						</ContainerHeaderContent>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable
								droppableId="droppable-images-list"
								direction="horizontal"
							>
								{(dropProvided) => (
									<ImagesContainer
										ref={dropProvided.innerRef}
										{...dropProvided.droppableProps}
									>
										{imagesValues.map((img, index) =>
											imagesValues.length === 1 ? (
												<ImageDelete
													key={img.id}
													width={imageWidth}
													height={imagesHeight}
													img={img}
													onDelete={handleDeleteImg}
													hideDelete={!!img.hide_delete}
												/>
											) : (
												imagesValues.length > 1 &&
												img.src !== '' && (
													<Draggable
														draggableId={`draggable-${img.id}`}
														key={img.id}
														index={index}
													>
														{(dragProvided) => (
															<DraggableImageContainer
																ref={dragProvided.innerRef}
																width={imageWidth}
																height={imagesHeight}
																{...dragProvided.draggableProps}
																{...dragProvided.dragHandleProps}
															>
																<ImageDelete
																	key={img.id}
																	img={img}
																	onDelete={handleDeleteImg}
																	hideDelete={!!img.hide_delete}
																/>
															</DraggableImageContainer>
														)}
													</Draggable>
												)
											),
										)}
									</ImagesContainer>
								)}
							</Droppable>
						</DragDropContext>

						<Text onClick={toggleDocumentsModal}>
							<i className="fas fa-plus" /> Añadir archivo
						</Text>
						<DocContainer>
							<ProductContainer>
								{documentsValues.map(
									(pdf) =>
										pdf && (
											<DocumentItem
												key={pdf.id}
												document={pdf.file}
												bordered
												onClickRemove={handleDeletePDF(pdf)}
											/>
										),
								)}
								{product.dwg?.name && (
									<DocumentItem
										key={product.dwg.id}
										document={product.dwg}
										bordered
									/>
								)}
								{product.bim?.name && (
									<DocumentItem
										key={product.bim.id}
										document={product.bim}
										bordered
									/>
								)}
							</ProductContainer>
						</DocContainer>
					</ProductContent>
					{/* Right */}
					<div>
						<Section padding="0 0 10px">
							<div>
								<Label>Descripción corta</Label>
								<TextArea
									minHeightTextArea="75px"
									placeholder="Detalla el producto"
									value={shortDescValue}
									onChange={handleShortDescChange}
									name="short_desc"
									maxlength={200}
								/>
							</div>
							<div>
								<Label>Descripción larga</Label>
								<TextArea
									minHeightTextArea="118px"
									placeholder="Detalla el producto"
									value={longDescValue}
									onChange={handleLongDescChange}
									name="long_desc"
								/>
							</div>
						</Section>
						<Section
							alignItems="flex-end"
							display="grid"
							gridTemplateColumns="1fr 1fr"
							padding="20px 0"
						>
							<div>
								<Label>Sección</Label>
								<MultiSelect
									changeOnCLose
									showButtons
									options={sections.map(mapToSelector)}
									placeholder="Elige una sección"
									values={sectionValue || []}
									onChange={handleSectionChange}
									onSubmit={onSubmitSection}
									optionAll={false}
								/>
							</div>
							<div>
								<Label>Partida</Label>
								<MultiSelect
									changeOnCLose
									showButtons
									options={items.map(mapToSelector)}
									placeholder="Elige una partida"
									values={itemValue || []}
									onChange={handleItemChange}
									onSubmit={onSubmitItem}
									optionAll={false}
									disabled={!items.length}
								/>
							</div>
							<div>
								<Label>Sistema</Label>
								<MultiSelect
									changeOnCLose
									showButtons
									options={systems.map(mapToSelector)}
									placeholder="Elige un sistema"
									values={systemValue || []}
									onChange={handleSystemChange}
									onSubmit={handleSystemChange}
									optionAll={false}
									disabled={!systems.length}
								/>
							</div>
						</Section>
						<Section
							display="grid"
							gridTemplateColumns="1fr 1fr"
							padding="12px 0"
						>
							<div>
								<Label>Marcas</Label>
								<Select
									options={brands.map(mapToSelector)}
									placeholder="Elige una marca"
									value={brandValue}
									onChange={handleBrandChange}
								/>
							</div>
							<div>
								<Label>Precio</Label>
								<Input
									type="form"
									placeholder="Precio"
									value={priceValue}
									width="100%"
									onChange={handlePriceChange}
									name="price"
								/>
							</div>
							<div>
								<Label>Referencia</Label>
								<Input
									type="form"
									placeholder="Referencia"
									value={referenceValue}
									width="100%"
									onChange={handleReferenceChange}
									name="reference"
								/>
							</div>
							<div>
								<Label>Unidad</Label>
								<Input
									type="form"
									placeholder="Unidad"
									value={unitValue}
									width="100%"
									onChange={handleUnitChange}
									name="unit"
								/>
							</div>
						</Section>
						{showMoreData && (
							<Section
								alignItems="flex-end"
								display="grid"
								gridTemplateColumns="1fr 1fr"
								gridGap="12px"
							>
								<div>
									<Label>Tipo de proyecto</Label>
									<MultiSelect
										changeOnCLose
										offsetY={-264}
										showButtons
										options={project_types.map(mapToSelector)}
										placeholder="Elige un tipo de proyecto"
										values={projectTypeValues.map(mapToSelector)}
										onChange={filterRoomTypesOptions}
									/>
								</div>
								<div>
									<Label>Tipo de Obra</Label>
									<MultiSelect
										changeOnCLose
										offsetY={-264}
										showButtons
										options={work_types.map(mapToSelector)}
										placeholder="Elige un tipo de obra"
										values={workTypeValues.map(mapToSelector)}
										onChange={handleWorkTypeChange}
									/>
								</div>
								<div>
									<Label>Tipo de habitación</Label>
									<MultiSelect
										changeOnCLose
										offsetY={-264}
										showButtons
										options={roomTypesOptions}
										placeholder={
											roomTypesOptions.length
												? 'Elige una habitación'
												: 'Elige un proyecto primero'
										}
										values={roomTypeValues.map(mapToSelector)}
										onChange={handleRoomTypeChange}
										disabled={!roomTypesOptions.length}
									/>
								</div>
							</Section>
						)}
					</div>
				</ProductContainer>
				<Footer>
					<div>
						<Button disabled={canEdit} variant="primary" onClick={onSave}>
							Guardar
						</Button>
						<Button
							inverse
							disabled={canEdit}
							variant="cancel"
							onClick={handleClose}
							style={{ marginLeft: 12, color: COLOR_GREY }}
						>
							Descartar
						</Button>
					</div>
					{!showMoreData && (
						<Button
							inverse
							disabled={canEdit}
							variant="cancel"
							onClick={handleMoreDate}
						>
							Añadir datos adicionales
						</Button>
					)}
				</Footer>
				<AttachedImages
					images={imagesValues}
					maxSize={10}
					onChange={onAddImages}
					onReject={handleAttachReject}
					onClose={closeModalImg}
					showModal={imagesModal}
					hideItems
				/>
				<AttachedDocuments
					maxSize={5}
					documents={documentsValues}
					onChange={onAddDocuments}
					onReject={handleAttachReject}
					showModal={documentsModal}
					onClose={toggleDocumentsModal}
					hideItems
				/>
			</Root>
		</Modal>
	);
};

export default SpecEditProduct;
