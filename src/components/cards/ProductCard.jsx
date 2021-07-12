import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
	Root,
	Content,
	Photo,
	Details,
	Title,
	Description,
	Category,
	Reference,
	Footer,
	Actions,
	SeeMore,
	Add,
	Check,
	DotsIcon,
	ActionsMenuItem,
} from './ProductCard.styles';
import noPhoto from '../../assets/images/icons/no-photo.svg';
import threeDotsVerticalSource from '../../assets/images/icons/three-dots-vertical.svg';
import { onShowSpecEditProduct } from '../../containers/spec-edit-product/SpecEditProduct.actions';
import { DownloadDocumentsIcons } from '../SpecComponents';
import { onDeleteProduct } from '../../containers/products-list/ProductsList.actions';
import useDropdown from '../basics/Dropdown.hooks';
import Dropdown from '../basics/Dropdown';
import Confirm from '../confirm/Confirm';

/**
 * The ProductCard's component.
 */
const ProductCard = (props) => {
	const {
		pdfs,
		dwg,
		bim,
		category,
		description,
		photo,
		reference,
		selected,
		title,
		onClickCard,
		onClickSeeMore,
		canAdd,
		productId,
		canEdit,
		canDelete,
		itemsUsed,
	} = props;
	const [hover, setHover] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const dispatch = useDispatch();
	const {
		anchor: actionsAnchor,
		onClose: handleActionsMenuClose,
		onOpen: handleActionsMenuOpen,
	} = useDropdown();
	const handleCardMouseEnter = () => setHover(true);
	const handleCardMouseLeave = () => setHover(false);
	const handleShowActions = (event) => {
		event.stopPropagation();
		handleActionsMenuOpen(event);
	};
	const handleHideActions = (event) => {
		event.stopPropagation();
		handleActionsMenuClose(event);
	};

	const handleEditProduct = () => {
		handleActionsMenuClose();
		dispatch(onShowSpecEditProduct({ id: productId }));
	};

	const handleDeleteProduct = () => {
		handleActionsMenuClose();
		setShowDelete(true);
	};

	const handleCloseDelete = () => {
		setShowDelete(false);
	};

	const handleConfirm = async () => {
		handleCloseDelete();
		dispatch(onDeleteProduct(productId));
	};

	const photoStyles = {
		backgroundImage: `url('${photo || noPhoto}')`,
		backgroundSize: photo ? 'cover' : 'initial',
	};
	const showSeeMore = Boolean(onClickSeeMore);

	return (
		<>
			<Root
				hover={hover || itemsUsed}
				selected={selected}
				onClick={onClickSeeMore}
				onMouseEnter={handleCardMouseEnter}
				onMouseLeave={handleCardMouseLeave}
			>
				<Content>
					<Photo style={photoStyles} />
					<Details>
						<Title title={title}>{title}</Title>
						<Description title={description}>{description}</Description>
						<Category title={category}>
							{category ? `Sistema constructivo: ${category}` : ''}
						</Category>
						<Reference>{`Referencia ${
							reference || 'sin especificar'
						}`}</Reference>
					</Details>
				</Content>
				<Footer>
					<Actions>
						<DownloadDocumentsIcons
							pdfs={pdfs}
							dwg={dwg}
							bim={bim}
							positionToolTip="top"
							productId={productId}
						/>
					</Actions>
					<SeeMore
						hover={hover || itemsUsed}
						show={showSeeMore}
						onClick={onClickSeeMore}
					>
						Ver más
					</SeeMore>
				</Footer>
				{(hover || itemsUsed) && !selected && canAdd && (
					<Add onClick={onClickCard} />
				)}
				{selected && <Check onClick={onClickCard} />}
				{(canEdit || canDelete) && (
					<DotsIcon src={threeDotsVerticalSource} onClick={handleShowActions} />
				)}
				<Dropdown
					anchorRef={actionsAnchor}
					offset={{ x: -8, y: -8 }}
					open={Boolean(actionsAnchor)}
					origin={{ x: 'right', y: 'top' }}
					onClose={handleHideActions}
				>
					{canEdit && (
						<ActionsMenuItem onClick={handleEditProduct}>
							Editar
						</ActionsMenuItem>
					)}
					{canDelete && (
						<ActionsMenuItem onClick={handleDeleteProduct}>
							Eliminar
						</ActionsMenuItem>
					)}
				</Dropdown>
			</Root>
			<Confirm
				show={showDelete}
				onClose={handleCloseDelete}
				onExit={handleCloseDelete}
				onConfirm={handleConfirm}
				description={`Se eliminará permanentemente el producto ${title}`}
				question="¿Está seguro que desea eliminarlo?"
			/>
		</>
	);
};

ProductCard.defaultProps = {
	photo: '',
	selected: false,
	reference: '',
	onClickCard: () => undefined,
	onClickSeeMore: undefined,
};
ProductCard.propTypes = {
	category: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	photo: PropTypes.string,
	reference: PropTypes.string,
	selected: PropTypes.bool,
	title: PropTypes.string.isRequired,
	onClickCard: PropTypes.func,
	onClickSeeMore: PropTypes.func,
	productId: PropTypes.number.isRequired,
};

export default ProductCard;
