import { batch } from 'react-redux';
import onActionCreator from '../../config/store/helpers';
import { getBrands } from '../../services/brands.service';
import {
	createProduct,
	getProductsSystems,
	uploadProductImages,
	uploadProductDocuments,
} from '../../services/products.service';
import { onShowAlertSuccess } from '../alert/Alert.actions';
import {
	setFilters,
	cleanProductListData,
} from '../products-list/ProductsList.actions';

export const GET_SPEC_PRODUCTS_SYSTEMS = 'GET_SPEC_PRODUCTS_SYSTEMS';
export const GET_SPEC_PRODUCTS_SYSTEMS_ERROR =
	'GET_SPEC_PRODUCTS_SYSTEMS_ERROR';
export const GET_SPEC_PRODUCTS_SYSTEMS_SUCCESS =
	'GET_SPEC_PRODUCTS_SYSTEMS_SUCCESS';
export const onGetSpecProductsSystems = ({ items }) => async (dispatch) => {
	dispatch(onActionCreator(GET_SPEC_PRODUCTS_SYSTEMS));

	try {
		const response = await getProductsSystems({ item: items });

		return dispatch(
			onActionCreator(GET_SPEC_PRODUCTS_SYSTEMS_SUCCESS, {
				systems: response.subitems,
			}),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(GET_SPEC_PRODUCTS_SYSTEMS_ERROR, { error }),
		);
	}
};

export const GET_SPEC_PRODUCTS_BRANDS = 'GET_SPEC_PRODUCTS_BRANDS';
export const GET_SPEC_PRODUCTS_BRANDS_ERROR = 'GET_SPEC_PRODUCTS_BRANDS_ERROR';
export const GET_SPEC_PRODUCTS_BRANDS_SUCCESS =
	'GET_SPEC_PRODUCTS_BRANDS_SUCCESS';
export const onGetSpecProductsBrands = () => async (dispatch) => {
	dispatch(onActionCreator(GET_SPEC_PRODUCTS_BRANDS));

	try {
		const response = await getBrands();

		return dispatch(
			onActionCreator(GET_SPEC_PRODUCTS_BRANDS_SUCCESS, {
				brands: response.brands.list.filter((brand) => brand.name !== null),
			}),
		);
	} catch (error) {
		return dispatch(onActionCreator(GET_SPEC_PRODUCTS_BRANDS_ERROR, { error }));
	}
};

export const CREATE_SPEC_PRODUCT = 'CREATE_SPEC_PRODUCT';
export const CREATE_SPEC_PRODUCT_ERROR = 'CREATE_SPEC_PRODUCT_ERROR';
export const CREATE_SPEC_PRODUCT_SUCCESS = 'CREATE_SPEC_PRODUCT_SUCCESS';
export const onCreateSpecProduct = ({ documents, images }) => async (
	dispatch,
	getState,
) => {
	dispatch(onActionCreator(CREATE_SPEC_PRODUCT));
	const mapId = ({ id }) => id;
	try {
		const state = getState();
		const { stepOne, stepTwo } = state.specCreateProduct;
		const { filters: productFilters } = state.productsList.filters;
		const payload = {
			name: stepOne.name,
			section: stepOne.section.map(mapId),
			item: stepOne.item.map(mapId),
			system: stepOne.system.map(mapId),
			long_desc: stepTwo.long_desc,
			short_desc: stepTwo.short_desc,
			brand: stepTwo.brand.label,
			unit: stepTwo.unit,
			price: stepTwo.price,
			reference: stepTwo.reference,
		};
		const response = await createProduct(payload);

		const postData = [];
		if (images?.length)
			postData.concat(
				uploadProductImages({ productID: response.product.id, images }),
			);
		if (documents?.length)
			postData.concat(
				uploadProductDocuments({ productID: response.product.id, documents }),
			);
		if (postData.length) await Promise.All(postData);

		return batch(() => {
			dispatch(onActionCreator(CREATE_SPEC_PRODUCT_SUCCESS));
			dispatch(onShowAlertSuccess({ message: 'Producto creado exitosamente' }));
			dispatch(cleanProductListData());
			dispatch(
				setFilters({
					...productFilters,
					page: 0,
					limit: 10,
				}),
			);
		});
	} catch (error) {
		return batch(() => {
			dispatch(onActionCreator(CREATE_SPEC_PRODUCT_ERROR, { error }));
			dispatch(onShowAlertSuccess({ message: 'Error al crear producto' }));
		});
	}
};

export const HIDE_SPEC_CREATE_PRODUCT = 'HIDE_SPEC_CREATE_PRODUCT';
export const HIDE_SPEC_CREATE_PRODUCT_SUCCESS =
	'HIDE_SPEC_CREATE_PRODUCT_SUCCESS';
export const onHideSpecCreateProduct = () => (dispatch) =>
	batch(() => {
		dispatch(onActionCreator(HIDE_SPEC_CREATE_PRODUCT_SUCCESS));
	});

export const SHOW_SPEC_CREATE_PRODUCT_SUCCESS =
	'SHOW_SPEC_CREATE_PRODUCT_SUCCESS';
export const onShowSpecCreateProductSuccess = () => ({
	type: SHOW_SPEC_CREATE_PRODUCT_SUCCESS,
});

export const HIDE_SPEC_CREATE_PRODUCT_STEP_TWO_SUCCESS =
	'HIDE_SPEC_CREATE_PRODUCT_STEP_TWO_SUCCESS';
export const SHOW_SPEC_CREATE_PRODUCT_STEP_TWO_SUCCESS =
	'SHOW_SPEC_CREATE_PRODUCT_STEP_TWO_SUCCESS';
export const onHideSpecCreateProductStepTwoSuccess = (payload) => ({
	payload,
	type: HIDE_SPEC_CREATE_PRODUCT_STEP_TWO_SUCCESS,
});
export const onShowSpecCreateProductStepTwoSuccess = (payload) => ({
	payload,
	type: SHOW_SPEC_CREATE_PRODUCT_STEP_TWO_SUCCESS,
});

export const SHOW_SPEC_CREATE_PRODUCT_FROM_ITEM_SUCCESS =
	'SHOW_SPEC_CREATE_PRODUCT_FROM_ITEM_SUCCESS';
export const onShowSpecCreateProductFromItemSuccess = ({
	itemID,
	sectionID,
}) => (dispatch, getState) => {
	const { collection: sections } = getState().specProductsSections;
	const { collection: items } = getState().specProductsItems;
	dispatch(
		onActionCreator(SHOW_SPEC_CREATE_PRODUCT_FROM_ITEM_SUCCESS, {
			item: items.find((i) => i.id === itemID),
			section: sections.find((i) => i.id === sectionID),
		}),
	);
};

export const HIDE_SPEC_CREATE_PRODUCT_STEP_THREE_SUCCESS =
	'HIDE_SPEC_CREATE_PRODUCT_STEP_THREE_SUCCESS';
export const SHOW_SPEC_CREATE_PRODUCT_STEP_THREE_SUCCESS =
	'SHOW_SPEC_CREATE_PRODUCT_STEP_THREE_SUCCESS';
export const onHideSpecCreateProductStepThreeSuccess = (payload) => ({
	payload,
	type: HIDE_SPEC_CREATE_PRODUCT_STEP_THREE_SUCCESS,
});
export const onShowSpecCreateProductStepThreeSuccess = (payload) => ({
	payload,
	type: SHOW_SPEC_CREATE_PRODUCT_STEP_THREE_SUCCESS,
});
