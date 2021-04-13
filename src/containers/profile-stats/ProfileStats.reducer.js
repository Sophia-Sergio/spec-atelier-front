import {
	GET_PROFILE_STATS_PRODUCTS,
	GET_PROFILE_STATS_PRODUCTS_SUCCESS,
	GET_PROFILE_STATS_PRODUCTS_ERROR,
	GET_PROFILE_STATS_PROJECTS,
	GET_PROFILE_STATS_PROJECTS_SUCCESS,
	GET_PROFILE_STATS_PROJECTS_ERROR,
	GET_PRODUCTS_BY_PROJECT,
	GET_PRODUCTS_BY_PROJECT_SUCCESS,
	GET_PRODUCTS_BY_PROJECT_ERROR,
	GET_PROJECTS_BY_PRODUCT,
	GET_PROJECTS_BY_PRODUCT_SUCCESS,
	GET_PROJECTS_BY_PRODUCT_ERROR,
} from './ProfileStats.actions';

const ProfileStatsState = {
	products: {
		loading: false,
		nextPage: null,
		total: 0,
		error: false,
		list: [],
		filters: {
			page: 0,
			limit: 10,
			sort_by: null,
			stat: null,
		},
	},
	projects: {
		loading: false,
		nextPage: null,
		total: 0,
		error: false,
		list: [],
		filters: {
			page: 0,
			limit: 10,
			sort_by: null,
			stat: null,
		},
	},
	productsByProject: {
		loading: false,
		nextPage: null,
		total: 0,
		error: false,
		list: [],
		filters: {
			page: 0,
			limit: 10,
		},
	},
	projectsByProduct: {
		loading: false,
		nextPage: null,
		total: 0,
		error: false,
		list: [],
		filters: {
			page: 0,
			limit: 10,
		},
	},
};

/**
 * The Stats' reducer.
 */
const ProfileStatsReducer = (
	state = { ...ProfileStatsState },
	{ payload, type },
) => {
	switch (type) {
		case GET_PROFILE_STATS_PRODUCTS: {
			return {
				...state,
				products: {
					...state.products,
					loading: true,
					error: false,
				},
			};
		}
		case GET_PROFILE_STATS_PRODUCTS_SUCCESS: {
			return {
				...state,
				products: {
					loading: false,
					error: false,
					...payload,
				},
			};
		}
		case GET_PROFILE_STATS_PRODUCTS_ERROR: {
			return {
				...state,
				products: {
					...payload,
					loading: false,
					error: true,
				},
			};
		}
		case GET_PROFILE_STATS_PROJECTS: {
			return {
				...state,
				projects: {
					...state.projects,
					loading: true,
					error: false,
				},
			};
		}
		case GET_PROFILE_STATS_PROJECTS_SUCCESS: {
			return {
				...state,
				projects: {
					loading: false,
					error: false,
					...payload,
				},
			};
		}
		case GET_PROFILE_STATS_PROJECTS_ERROR: {
			return {
				...state,
				projects: {
					...payload,
					loading: false,
					error: true,
				},
			};
		}
		case GET_PRODUCTS_BY_PROJECT: {
			return {
				...state,
				productsByProject: {
					...state.productsByProject,
					loading: true,
					error: false,
				},
			};
		}
		case GET_PRODUCTS_BY_PROJECT_SUCCESS: {
			return {
				...state,
				productsByProject: {
					loading: false,
					error: false,
					...payload,
				},
			};
		}
		case GET_PRODUCTS_BY_PROJECT_ERROR: {
			return {
				...state,
				productsByProject: {
					...payload,
					loading: false,
					error: true,
				},
			};
		}
		case GET_PROJECTS_BY_PRODUCT: {
			return {
				...state,
				projectsByProduct: {
					...state.projectsByProduct,
					loading: true,
					error: false,
				},
			};
		}
		case GET_PROJECTS_BY_PRODUCT_SUCCESS: {
			return {
				...state,
				projectsByProduct: {
					loading: false,
					error: false,
					...payload,
				},
			};
		}
		case GET_PROJECTS_BY_PRODUCT_ERROR: {
			return {
				...state,
				projectsByProduct: {
					...payload,
					loading: false,
					error: true,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default ProfileStatsReducer;