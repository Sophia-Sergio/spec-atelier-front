import onActionCreator from '../../config/store/helpers';
import { getProductById, getProducts } from '../../services/products.service';
import { getItems as getItemsService } from '../../services/items.service';
import { cleanObjectsAndArrays } from '../../modules/services';
import { getSections as getServiceSections } from '../../services/sections.service';
import { getBrands as getServiceBrands } from '../../services/brands.service';

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

export const SET_FILTERS = 'SET_FILTERS';

export const CLEAN_PRODUCT_LIST_STORE = 'CLEAN_PRODUCT_LIST_STORE';

export const cleanStoreProductList = () => (dispatch) =>
	dispatch(onActionCreator(CLEAN_PRODUCT_LIST_STORE));

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
				total: products?.total || 0,
				filters,
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

export const onGetFiltersByFilters = (filters) => (dispatch) => {
	dispatch(getBrands({ ...filters }));
	dispatch(getSections({ ...filters }));
	dispatch(getItems({ ...filters }));
};

export const onGetProductsByFilter = (filters, isSelectedAll = false) => async (
	dispatch,
) => {
	dispatch(onGetFiltersByFilters(filters));
	dispatch(onGetProducts(filters, { isSelectedAll }));
};

export const getMoreProducts = (filters) => async (dispatch) => {
	try {
		const { products } = await getProducts(cleanObjectsAndArrays(filters));
		return dispatch(
			onActionCreator(GET_MORE_PRODUCTS, {
				nextPage: products?.next_page,
				products: products?.list || products || [],
				total: products?.total || 0,
				filters,
			}),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(GET_PRODUCTS_ERROR, { error: true, nativeError: error }),
		);
	}
};

export const setSelectedAll = (filters) => (dispatch) => {
	dispatch(onGetProductsByFilter(filters, true));
};

export const setFilters = (filters) => (dispatch) =>
	dispatch(onActionCreator(SET_FILTERS, filters));
