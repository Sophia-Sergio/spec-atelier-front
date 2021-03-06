import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEscapeKey } from '../../modules/hooks';
import {
	onAttachSpecProduct,
	onDetachSpecProduct,
} from '../spec-document/SpecDocument.actions';
import {
	onHideSpecProducts,
	onShowAttachModal,
	onHideAttachModal,
} from './SpecProducts.actions';
import ProductListContainer from '../products-list/ProductsList.container';

import { Root, Body } from './SpecProducts.styles';
import SpecModalAttachProduct from './SpecModalAttachProduct.container';
import CreateProduct from '../../components/product/CreateProduct';
import { onShowSpecCreateProductFromItemSuccess } from '../spec-create-product/SpecCreateProduct.actions';

/**
 * The SpecProductsList's container.
 */
const SpecProductsList = () => {
	const { id: specID } = useParams();
	const selectedProducts =
		useSelector((state) =>
			state.specDocument.blocks?.filter((block) => block.type === 'Product'),
		) || [];
	const { show, filters, showAttachModal, productToAttach } = useSelector(
		(state) => state.specProducts,
	);
	const dispatch = useDispatch();

	const handleAttachSpecProduct = (selectedItems, product) => {
		dispatch(onHideAttachModal());
		const item = selectedItems.map(({ id }) => id);
		const section = [];
		selectedItems.forEach(({ section_id }) => {
			if (!section.includes(section_id)) {
				section.push(section_id);
			}
		});
		return dispatch(
			onAttachSpecProduct({
				productID: product.id,
				specID,
				systemID: product?.systems[0]?.id,
				item,
				section,
			}),
		);
	};

	const handleCardClick = (product) => (event) => {
		event.stopPropagation();
		const { id: productID, items } = product;
		const hasProduct = selectedProducts.find(
			(selectedProduct) => selectedProduct?.element.id === productID,
		);

		if (hasProduct) {
			return dispatch(onDetachSpecProduct({ productID, specID }));
		}

		if (items.length > 1) {
			return dispatch(onShowAttachModal({ product }));
		}
		return handleAttachSpecProduct(items, product);
	};

	const handleCreateProduct = () => {
		dispatch(
			onShowSpecCreateProductFromItemSuccess({
				itemID: filters.item,
				sectionID: filters.section,
			}),
		);
	};

	useEscapeKey(show, () => dispatch(onHideSpecProducts()));

	return (
		<>
			<Root>
				<Body>
					{show && (
						<ProductListContainer
							extraFilters={{ limit: 20 }}
							filterOptionsKey="spec"
							canAdd
							selectedProducts={selectedProducts}
							withoutPadding
							customEmpty
							emptyListComponent={CreateProduct}
							onActionCard={handleCardClick}
							onClickCreate={handleCreateProduct}
						/>
					)}
				</Body>
			</Root>
			<SpecModalAttachProduct
				showAttachModal={showAttachModal}
				product={productToAttach}
				onClose={() => dispatch(onHideAttachModal())}
				onSubmit={handleAttachSpecProduct}
			/>
		</>
	);
};

export default SpecProductsList;
