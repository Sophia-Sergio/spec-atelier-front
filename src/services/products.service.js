import { API_BASE_URL } from '../config/constants/environment';
import {
	getJsonRequest,
	postFormRequest,
	postJsonRequest,
	patchJsonRequest,
	deleteJsonRequest,
} from '../modules/requests';
import {
	cleanObjectsAndArrays,
	factoryService,
	formatParams,
} from '../modules/services';

/**
 * Gets the list of products' sections available.
 */
export const getProductsSections = factoryService(() =>
	getJsonRequest(`${API_BASE_URL}/sections`),
);

/**
 * Gets the list of products' items by the given section.
 */
export const getProductsItems = factoryService((sections) =>
	getJsonRequest(
		`${API_BASE_URL}/items${formatParams(cleanObjectsAndArrays(sections))}`,
	),
);

/**
 * Gets the list of products' systems by the given item.
 */
export const getProductsSystems = factoryService((items) =>
	getJsonRequest(
		`${API_BASE_URL}/subitems${formatParams(cleanObjectsAndArrays(items))}`,
	),
);

/**
 * Gets a list of products.
 */
export const getProducts = factoryService((filters) =>
	getJsonRequest(`${API_BASE_URL}/products${formatParams(filters)}`),
);

/**
 * Gets a product by the given item.
 */
export const getProductById = factoryService((productID) =>
	getJsonRequest(`${API_BASE_URL}/products/${productID}`),
);

/**
 * Create a new product.
 */
export const createProduct = factoryService((data) => {
	const body = {
		product: {
			brand: data.brand,
			item: data.item,
			long_desc: data.long_desc,
			name: data.name,
			price: data.price,
			system: data.system,
			short_desc: data.short_desc,
			reference: data.reference,
			unit: data.unit,
		},
	};

	return postJsonRequest(`${API_BASE_URL}/products`, body);
});

export const editProduct = factoryService((product) => {
	return patchJsonRequest(`${API_BASE_URL}/products/${product.id}`, {
		product,
	});
});

/**
 * Upload images to the given product.
 */
export const uploadProductImages = factoryService(({ productID, images }) => {
	const body = { 'images[]': images };

	return postFormRequest(
		`${API_BASE_URL}/products/${productID}/associate_images`,
		body,
	);
});

/**
 * Delete images to the given product.
 */
export const removeProductImages = factoryService(({ productID, images }) => {
	const body = { images };
	return deleteJsonRequest(
		`${API_BASE_URL}/products/${productID}/remove_images`,
		body,
	);
});

/**
 * Update images to the given product.
 */
export const updateProductImages = factoryService(({ productID, images }) => {
	const body = { images };
	return deleteJsonRequest(
		`${API_BASE_URL}/products/${productID}/update_images`,
		body,
	);
});

/**
 * Upload documents to the given product.
 */
export const uploadProductDocuments = factoryService(
	({ productID, documents }) => {
		const body = { 'documents[]': documents };

		return postFormRequest(
			`${API_BASE_URL}/products/${productID}/associate_documents`,
			body,
		);
	},
);

/**
 * Delete documents to the given product.
 */
export const removeProductDocuments = factoryService(
	({ productID, documents }) => {
		const body = { documents };
		return deleteJsonRequest(
			`${API_BASE_URL}/products/${productID}/remove_documents`,
			body,
		);
	},
);

/**
 * Gets a product by the given item.
 */
export const updateDownloadsProduct = factoryService(({ stat, productId }) =>
	patchJsonRequest(
		`${API_BASE_URL}/product_stats/products//${productId}/update_downloads${formatParams(
			{
				stat,
			},
		)}`,
	),
);

/**
 * Delete product
 */
export const deleteProduct = factoryService(({ productId }) => {
	return deleteJsonRequest(`${API_BASE_URL}/products/${productId}`);
});
