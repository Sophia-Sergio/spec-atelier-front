import onActionCreator from '../../config/store/helpers';
import {
	getProductById,
	getProducts,
	updateDownloadsProduct,
	deleteProduct,
} from '../../services/products.service';
import { getItems as getItemsService } from '../../services/items.service';
import { cleanObjectsAndArrays } from '../../modules/services';
import { getSections as getServiceSections } from '../../services/sections.service';
import { getBrands as getServiceBrands } from '../../services/brands.service';
import { onShowAlertSuccess } from '../alert/Alert.actions';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';
export const GET_MORE_PRODUCTS = 'GET_MORE_PRODUCTS';
export const GET_SECTIONS = 'GET_SECTIONS';
export const GET_SECTIONS_ERROR = 'GET_SECTIONS_ERROR';
export const GET_SECTIONS_SUCCESS = 'GET_SECTIONS_SUCCESS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const GET_BRANDS_SUCCESS = 'GET_BRANDS_SUCCESS';
export const GET_BRANDS_ERROR = 'GET_BRANDS_ERROR';
export const SET_SELECTED_ALL = 'SET_SELECTED_ALL';

export const SET_FILTERS = 'SET_FILTERS';

export const CLEAN_PRODUCT_LIST_STORE = 'CLEAN_PRODUCT_LIST_STORE';
export const CLEAN_PRODUCT_LIST_DATA = 'CLEAN_PRODUCT_LIST_DATA';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const cleanStoreProductList = () => (dispatch) =>
	dispatch(onActionCreator(CLEAN_PRODUCT_LIST_STORE));

export const cleanProductListData = () => (dispatch) =>
	dispatch(onActionCreator(CLEAN_PRODUCT_LIST_DATA));

export const getProduct = (clientId) => async (dispatch) => {
	try {
		const response = await getProductById(clientId);
		if (response?.status >= 400)
			return dispatch(
				onActionCreator(GET_PRODUCT_ERROR, { loading: false, error: true }),
			);
		return dispatch(
			onActionCreator(GET_PRODUCT, { client: response.client, loading: false }),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(GET_PRODUCT_ERROR, { loading: false, error }),
		);
	}
};

export const onGetProducts = (filters, extraPayload = {}) => async (
	dispatch,
) => {
	dispatch(onActionCreator(GET_PRODUCTS));
	try {
		const { products } = await getProducts(cleanObjectsAndArrays(filters));
		return dispatch(
			onActionCreator(GET_PRODUCTS_SUCCESS, {
				nextPage: products?.next_page,
				products: products?.list || products || [],
				filterOptions: products?.filters || {},
				total: products?.total || 0,
				...extraPayload,
			}),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(GET_PRODUCTS_ERROR, { error: true, nativeError: error }),
		);
	}
};

export const getSections = (filters) => async (dispatch) => {
	try {
		const { sections } = await getServiceSections(
			cleanObjectsAndArrays({ ...filters, with_products: true }),
		);
		return dispatch(onActionCreator(GET_SECTIONS_SUCCESS, { sections }));
	} catch (error) {
		return dispatch(
			onActionCreator(GET_SECTIONS_ERROR, { error: true, nativeError: error }),
		);
	}
};

export const getItems = (filters) => async (dispatch) => {
	try {
		const { items } = await getItemsService(
			cleanObjectsAndArrays({ ...filters, with_products: true }),
		);
		return dispatch(onActionCreator(GET_ITEMS_SUCCESS, { items }));
	} catch (error) {
		return dispatch(
			onActionCreator(GET_ITEMS_ERROR, { error: true, nativeError: error }),
		);
	}
};

export const getBrands = (filters) => async (dispatch) => {
	try {
		const { brands } = await getServiceBrands(
			cleanObjectsAndArrays({ ...filters, with_products: true }),
		);
		return dispatch(onActionCreator(GET_BRANDS_SUCCESS, { brands }));
	} catch (error) {
		return dispatch(
			onActionCreator(GET_BRANDS_ERROR, { error: true, nativeError: error }),
		);
	}
};

export const setFilters = (filters) => (dispatch) => {
	dispatch(onActionCreator(SET_FILTERS, filters));
};

export const setSelectedAll = (value) => (dispatch) => {
	dispatch(onActionCreator(SET_SELECTED_ALL, value));
};

export const updateDownloads = (stat, productId) => {
	updateDownloadsProduct({ stat, productId }).then(
		(response) => response,
		(error) => console.error(error),
	);
};

export const onDeleteProduct = (productId) => async (dispatch, getState) => {
	try {
		const { filters } = getState().productsList;
		dispatch(onActionCreator(DELETE_PRODUCT));
		const response = await deleteProduct({ productId });
		if (response?.status >= 400) {
			dispatch(
				onActionCreator(GET_PRODUCT_ERROR, { loading: false, error: true }),
			);
			dispatch(
				onShowAlertSuccess({ message: 'Error al eliminar el producto.' }),
			);
			return;
		}

		dispatch(onActionCreator(DELETE_PRODUCT_SUCCESS));
		dispatch(
			onShowAlertSuccess({ message: 'Se eliminó el producto exitosamente.' }),
		);
		dispatch(onGetProducts(filters));
	} catch (error) {
		dispatch(onActionCreator(DELETE_PRODUCT_ERROR));
		dispatch(onShowAlertSuccess({ message: 'Error al eliminar el producto.' }));
	}
};
