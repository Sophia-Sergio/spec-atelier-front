import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { onShowSpecCreateProductSuccess } from '../spec-create-product/SpecCreateProduct.actions';
import { onShowSpecEditProduct } from '../spec-edit-product/SpecEditProduct.actions';
import { onShowSpecImagesModalSuccess } from '../spec-images-modal/SpecImagesModal.actions';
import { onShowSpecProducts } from '../spec-products/SpecProducts.actions';
import {
	onAddSpecBlockText,
	onGetSpecBlocks,
	onRemoveSpecBlock,
	onRemoveSpecBlockImage,
	onRemoveSpecBlockText,
	onSortSpecBlocks,
	onUpdateSpecBlockText,
} from './SpecDocument.actions';
import useDropdown from '../../components/basics/Dropdown.hooks';
import Dropdown from '../../components/basics/Dropdown';
import DraggableList from '../../components/basics/DraggableList';
import Editor from '../../components/inputs/Editor';
import {
	Root,
	AddIcon,
	AddMenuItem,
	Page,
	Block,
	BlockEditor,
	BlockMenuItem,
	BlockDotsIcon,
	BlockImage,
	BlockContent,
	BlockText,
	BlockTextContent,
	BlockTitle,
	Section,
	Item,
	Product,
	ProductImage,
	ProductTitle,
	ProductDescription,
	ProductSystem,
	ProductReference,
	ProductBrand,
} from './SpecDocument.styles';
import specAddSource from '../../assets/images/icons/spec-add.svg';
import threeDotsVerticalSource from '../../assets/images/icons/three-dots-vertical.svg';
import { MAX_SCREEN_SMALL_NAV_JS } from '../../config/constants/styled-vars';

/**
 * The SpecDocument's container.
 */
const SpecDocument = () => {
	const { id: specID } = useParams();
	const { blocks } = useSelector((state) => state.specDocument);
	const { localConfig } = useSelector((state) => state.specAdmin);
	const dispatch = useDispatch();
	const [selectedBlockID, setSelectedBlockID] = useState('');
	const [selectedBlockTextID, setSelectedBlockTextID] = useState('');
	const [showBlockEditor, setShowBlockEditor] = useState('');
	const [showBlockTextEditor, setShowBlockTextEditor] = useState('');
	const {
		anchor: addAnchor,
		onClose: handleAddMenuClose,
		onOpen: handleAddMenuOpen,
	} = useDropdown();
	const {
		anchor: blockAnchor,
		onClose: handleBlockMenuClose,
		onOpen: handleBlockMenuOpen,
	} = useDropdown({ closeCallback: () => setSelectedBlockID('') });
	const {
		anchor: blockTextAnchor,
		onClose: handleBlockTextMenuClose,
		onOpen: handleBlockTextMenuOpen,
	} = useDropdown({ closeCallback: () => setSelectedBlockTextID('') });
	const handleShowProducts = () => {
		handleAddMenuClose();
		dispatch(onShowSpecProducts());
	};
	const handleCreateProduct = () => {
		handleAddMenuClose();
		dispatch(onShowSpecCreateProductSuccess());
	};
	const handleEditProduct = (block) => (event) => {
		handleBlockMenuClose(event);
		dispatch(onShowSpecEditProduct({ id: block.element.id || 1 }));
	};

	const handleBlocksSortChange = (blocksIDs) =>
		dispatch(onSortSpecBlocks({ blocksIDs, specID }));
	const handleShowBlockMenu = (blockID) => (event) => {
		handleBlockMenuOpen(event);
		setSelectedBlockID(blockID);
	};
	const handleShowBlockTextMenu = (textID) => (event) => {
		handleBlockTextMenuOpen(event);
		setSelectedBlockTextID(textID);
	};
	const handleShowImagesModal = (blockID) => () => {
		handleBlockMenuClose();
		dispatch(onShowSpecImagesModalSuccess({ blockID }));
	};
	const handleHideBlockEditor = () => setShowBlockEditor('');
	const handleShowBlockEditor = (blockID) => () => {
		handleBlockMenuClose();
		setShowBlockEditor(blockID);
	};
	const handleHideBlockTextEditor = () => setShowBlockTextEditor('');
	const handleShowBlockTextEditor = (textID) => () => {
		handleBlockTextMenuClose();
		setShowBlockTextEditor(textID);
	};
	const handleAddBlockText = (blockID) => (textValue) => {
		handleHideBlockEditor();
		dispatch(onAddSpecBlockText({ blockID, specID, textValue }));
	};
	const handleEditBlockText = (textID) => (textValue) => {
		handleHideBlockTextEditor();
		dispatch(onUpdateSpecBlockText({ textID, specID, textValue }));
	};
	const handleRemoveBlock = (blockID) => () => {
		handleHideBlockEditor();
		dispatch(onRemoveSpecBlock({ blockID, specID }));
	};
	const handleBlockImageRemove = (blockID) => () => {
		handleBlockMenuClose();
		dispatch(onRemoveSpecBlockImage({ blockID, specID }));
	};
	const handleBlockTextRemove = (textID) => () => {
		handleBlockTextMenuClose();
		dispatch(onRemoveSpecBlockText({ textID, specID }));
	};
	const getBlockMarginByType = (type) => {
		if (type === 'Section') {
			return '0 0 4px 0';
		}

		if (type === 'Item') {
			return '0 0 7px 0';
		}

		return '0 0 15px 0';
	};
	const getBlockWrapperByType = (type, content) => {
		if (type === 'Section') {
			return <Section>{content}</Section>;
		}

		if (type === 'Item') {
			return <Item>{content}</Item>;
		}

		return <Product>{content}</Product>;
	};
	const selectedBlock = blocks.find((block) => block.id === selectedBlockID);

	useEffect(() => {
		dispatch(onGetSpecBlocks(specID));
	}, []);

	return (
		<Root>
			<Dropdown
				anchorRef={addAnchor}
				offset={
					window.matchMedia(MAX_SCREEN_SMALL_NAV_JS).matches
						? { x: 0, y: -80 }
						: { x: -7, y: -7 }
				}
				open={Boolean(addAnchor)}
				origin={{ x: 'right', y: 'top' }}
				onClose={handleAddMenuClose}
			>
				<AddMenuItem onClick={handleShowProducts}>Añadir producto</AddMenuItem>
				<AddMenuItem onClick={handleCreateProduct}>Crear producto</AddMenuItem>
			</Dropdown>

			{Boolean(blockAnchor) && selectedBlock && (
				<Dropdown
					anchorRef={blockAnchor}
					offset={{ x: -5, y: -4 }}
					open={Boolean(blockAnchor)}
					origin={{ x: 'right', y: 'top' }}
					onClose={handleBlockMenuClose}
				>
					{!selectedBlock?.text && (
						<BlockMenuItem onClick={handleShowBlockEditor(selectedBlockID)}>
							Añadir texto
						</BlockMenuItem>
					)}
					{selectedBlock?.type === 'Product' && (
						<BlockMenuItem onClick={handleShowImagesModal(selectedBlockID)}>
							{selectedBlock?.product_block_image
								? 'Editar imagen'
								: 'Añadir una imagen'}
						</BlockMenuItem>
					)}
					{selectedBlock?.type === 'Product' &&
						selectedBlock?.product_block_image && (
							<BlockMenuItem onClick={handleBlockImageRemove(selectedBlockID)}>
								Eliminar imagen
							</BlockMenuItem>
						)}
					{selectedBlock?.type === 'Product' &&
						selectedBlock?.element?.user_owned && (
							<BlockMenuItem onClick={handleEditProduct(selectedBlock)}>
								Editar
							</BlockMenuItem>
						)}
					<BlockMenuItem onClick={handleRemoveBlock(selectedBlockID)}>
						Eliminar
					</BlockMenuItem>
				</Dropdown>
			)}
			{Boolean(blockTextAnchor) && (
				<Dropdown
					anchorRef={blockTextAnchor}
					offset={{ x: -5, y: -4 }}
					open={Boolean(blockTextAnchor)}
					origin={{ x: 'right', y: 'top' }}
					onClose={handleBlockTextMenuClose}
				>
					<BlockMenuItem
						onClick={handleShowBlockTextEditor(selectedBlockTextID)}
					>
						Editar texto
					</BlockMenuItem>
					<BlockMenuItem onClick={handleBlockTextRemove(selectedBlockTextID)}>
						Eliminar texto
					</BlockMenuItem>
				</Dropdown>
			)}
			<Page>
				<DraggableList onChange={handleBlocksSortChange} blocks={blocks}>
					{blocks.map((block) => {
						return (
							<Block
								disabled={block.type === 'Section' || block.type === 'Item'}
								id={block.id}
								key={block.id}
								margin={getBlockMarginByType(block.type)}
							>
								{getBlockWrapperByType(
									block.type,
									<>
										{showBlockEditor === block.id && (
											<BlockEditor>
												<Editor
													actions
													label="Texto"
													placeholder="Ingresa el texto"
													onCancel={handleHideBlockEditor}
													onSubmit={handleAddBlockText(block.id)}
												/>
											</BlockEditor>
										)}
										<BlockDotsIcon
											src={threeDotsVerticalSource}
											onClick={handleShowBlockMenu(block.id)}
										/>
										{block.type === 'Product' && block?.product_block_image && (
											<BlockImage>
												<ProductImage
													src={
														block?.element?.images.find(
															(image) => image.id === block.product_block_image,
														)?.urls?.small || '#'
													}
												/>
											</BlockImage>
										)}
										{block.type !== 'Product' && (
											<BlockTitle>{block?.element?.name}</BlockTitle>
										)}
										{block.type === 'Product' && (
											<BlockContent>
												<ProductTitle>{block?.element?.name}</ProductTitle>
												{block?.element?.long_desc && localConfig.long_desc && (
													<ProductDescription
														dangerouslySetInnerHTML={{
															__html: block?.element?.long_desc?.replace(
																/\n/g,
																'<br />',
															),
														}}
													/>
												)}
												{block?.element?.short_desc &&
													localConfig.short_desc && (
														<ProductDescription>
															{block?.element?.short_desc}
														</ProductDescription>
													)}
												{block?.element?.system && (
													<ProductSystem>{`Sistema constructivo: ${block?.element?.system?.name}`}</ProductSystem>
												)}
												{block?.element?.brand && localConfig.brand && (
													<ProductBrand>{`Marca: ${block?.element?.brand?.name}`}</ProductBrand>
												)}
												{block?.element?.reference && localConfig.reference && (
													<ProductReference>{`Referencia: ${block?.element?.reference}`}</ProductReference>
												)}
											</BlockContent>
										)}
									</>,
								)}
								{block?.text && (
									<BlockText>
										<BlockTextContent
											dangerouslySetInnerHTML={{ __html: block?.text?.text }}
										/>
										{showBlockTextEditor === block?.text?.id && (
											<BlockEditor>
												<Editor
													actions
													initialValue={block?.text?.text}
													label="Texto"
													placeholder="Ingresa el texto"
													onCancel={handleHideBlockTextEditor}
													onSubmit={handleEditBlockText(block?.text?.id)}
												/>
											</BlockEditor>
										)}
										<BlockDotsIcon
											src={threeDotsVerticalSource}
											onClick={handleShowBlockTextMenu(block?.text?.id)}
										/>
									</BlockText>
								)}
							</Block>
						);
					})}
				</DraggableList>
			</Page>
			<AddIcon
				alt="Agregar sección"
				src={specAddSource}
				onClick={
					window.matchMedia(MAX_SCREEN_SMALL_NAV_JS).matches
						? handleShowProducts
						: handleAddMenuOpen
				}
			/>
		</Root>
	);
};

export default SpecDocument;
