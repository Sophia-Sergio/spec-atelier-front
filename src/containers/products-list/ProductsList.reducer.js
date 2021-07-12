import {
	GET_PRODUCTS,
	GET_PRODUCTS_ERROR,
	GET_PRODUCTS_SUCCESS,
	GET_SECTIONS_ERROR,
	GET_SECTIONS_SUCCESS,
	GET_ITEMS_SUCCESS,
	GET_ITEMS_ERROR,
	CLEAN_PRODUCT_LIST_STORE,
	GET_BRANDS_SUCCESS,
	GET_BRANDS_ERROR,
	SET_FILTERS,
	SET_SELECTED_ALL,
	DELETE_PRODUCT,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_ERROR,
	CLEAN_PRODUCT_LIST_DATA,
} from './ProductsList.actions';

export const productsListInitialState = {
	filters: {
		page: 0,
		limit: 10,
		view: null,
	},
	products: [],
	items: [],
	brands: [],
	sections: [],
	filterOptions: {},
	isSelectedAll: true,
	loading: true,
	nextPage: null,
	show: false,
	total: 0,
	error: false,
};

/**
 * The products' reducer.
 */
const productsListReducer = (
	state = { ...productsListInitialState },
	{ payload, type },
) => {
	switch (type) {
		case GET_PRODUCTS:
		case DELETE_PRODUCT: {
			return {
				...state,
				loading: true,
				error: false,
			};
		}
		case GET_PRODUCTS_ERROR:
		case GET_PRODUCTS_SUCCESS:
		case DELETE_PRODUCT_SUCCESS: {
			return {
				...state,
				...payload,
				products: [...state.products, ...payload.products],
				loading: false,
				error: false,
			};
		}
		case GET_SECTIONS_SUCCESS: {
			return {
				...state,
				sections: payload.sections,
				error: false,
			};
		}
		case GET_ITEMS_SUCCESS: {
			return {
				...state,
				items: payload.items,
				error: false,
			};
		}
		case GET_BRANDS_SUCCESS:
			return {
				...state,
				brands: payload.brands.list,
				error: false,
			};
		case GET_SECTIONS_ERROR:
		case GET_ITEMS_ERROR:
		case GET_BRANDS_ERROR:
		case DELETE_PRODUCT_ERROR:
			return { ...state };
		case CLEAN_PRODUCT_LIST_STORE:
			return {
				...productsListInitialState,
			};
		case CLEAN_PRODUCT_LIST_DATA:
			return {
				...productsListInitialState,
				filters: state.filters,
			};
		case SET_FILTERS:
			return {
				...state,
				filters: { ...state.filters, ...payload },
			};
		case SET_SELECTED_ALL:
			return {
				...state,
				isSelectedAll: payload,
			};
		default: {
			return state;
		}
	}
};

export default productsListReducer;
