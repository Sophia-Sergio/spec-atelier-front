import { batch } from 'react-redux';
import onActionCreator from '../../config/store/helpers';
import {
	addSpecBlock,
	addSpecBlockText,
	deleteSpecBlock,
	deleteSpecBlockImage,
	getSpecBlocks,
	sortSpecBlocks,
	updateSpecBlockImage,
	updateSpecBlockText,
	deleteSpecBlockText,
} from '../../services/specs.service';
import { onShowAlertSuccess } from '../alert/Alert.actions';
import { onGetProducts } from '../products-list/ProductsList.actions';
import { closeModal } from '../spec-modal-product/SpecModalProduct.actions';
import { MAX_SCREEN_SMALL_NAV_JS } from '../../config/constants/styled-vars';

export const GET_SPEC_BLOCKS = 'GET_SPEC_BLOCKS';
export const GET_SPEC_BLOCKS_ERROR = 'GET_SPEC_BLOCKS_ERROR';
export const GET_SPEC_BLOCKS_SUCCESS = 'GET_SPEC_BLOCKS_SUCCESS';
export const onGetSpecBlocks = (specID) => async (dispatch, getState) => {
	dispatch(onActionCreator(GET_SPEC_BLOCKS));

	try {
		const { auth } = getState();
		const { blocks = [], project = {} } =
			(await getSpecBlocks({ specID, userID: auth.user?.id })) || {};

		return dispatch(
			onActionCreator(GET_SPEC_BLOCKS_SUCCESS, { blocks, project }),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(GET_SPEC_BLOCKS, { error: true, nativeError: error }),
		);
	}
};

export const ADD_SPEC_BLOCK = 'ADD_SPEC_BLOCK';
export const ADD_SPEC_BLOCK_ERROR = 'ADD_SPEC_BLOCK_ERROR';
export const ADD_SPEC_BLOCK_SUCCESS = 'ADD_SPEC_BLOCK_SUCCESS';
export const onAddSpecBlock = ({
	specID,
	productID,
	systemID,
	...rest
}) => async (dispatch, getState) => {
	dispatch(onShowAlertSuccess({ message: 'Añadiendo producto...' }));
	dispatch(onActionCreator(ADD_SPEC_BLOCK));
	try {
		const {
			auth,
			productsList: { filters },
		} = getState();

		const { blocks: updatedBlocks } = await addSpecBlock(
			{
				params: { ...rest },
				productID,
				systemID,
				specID,
				userID: auth.user?.id,
			},
			ADD_SPEC_BLOCK,
		);
		dispatch(
			onActionCreator(ADD_SPEC_BLOCK_SUCCESS, { blocks: updatedBlocks }),
		);
		dispatch(onGetProducts(filters));
		dispatch(
			onShowAlertSuccess({ message: 'Añadiste producto a una sección' }),
		);
		if (window.matchMedia(MAX_SCREEN_SMALL_NAV_JS).matches)
			dispatch(closeModal());
	} catch (error) {
		dispatch(
			onActionCreator(ADD_SPEC_BLOCK_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const ATTACH_SPEC_PRODUCT = 'ATTACH_SPEC_PRODUCT';
export const onAttachSpecProduct = (payload) => (dispatch) =>
	batch(() => {
		dispatch(
			onAddSpecBlock({
				...payload,
			}),
		);
	});

export const REMOVE_SPEC_BLOCK = 'REMOVE_SPEC_BLOCK';
export const REMOVE_SPEC_BLOCK_ERROR = 'REMOVE_SPEC_BLOCK_ERROR';
export const REMOVE_SPEC_BLOCK_SUCCESS = 'REMOVE_SPEC_BLOCK_SUCCESS';
export const onRemoveSpecBlock = ({ blockID, specID }) => async (
	dispatch,
	getState,
) => {
	dispatch(onShowAlertSuccess({ message: 'Removiendo producto...' }));
	dispatch(onActionCreator(REMOVE_SPEC_BLOCK));

	try {
		const {
			auth,
			productsList: { filters },
		} = getState();
		const { blocks: updatedBlocks } = await deleteSpecBlock({
			blockID,
			specID,
			userID: auth.user?.id,
		});

		dispatch(
			onActionCreator(REMOVE_SPEC_BLOCK_SUCCESS, { blocks: updatedBlocks }),
		);
		dispatch(onGetProducts(filters));
		dispatch(
			onShowAlertSuccess({ message: 'Removiste el producto de una sección' }),
		);
		if (window.matchMedia(MAX_SCREEN_SMALL_NAV_JS).matches)
			dispatch(closeModal());
	} catch (error) {
		dispatch(
			onActionCreator(REMOVE_SPEC_BLOCK_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const DETACH_SPEC_PRODUCT = 'DETACH_SPEC_PRODUCT';
export const onDetachSpecProduct = ({ productID, specID }) => (
	dispatch,
	getState,
) => {
	const { specDocument } = getState();
	const selectedBlock =
		specDocument.blocks.find(
			(block) => block.element?.original_product_id === productID,
		) || {};

	return dispatch(onRemoveSpecBlock({ specID, blockID: selectedBlock?.id }));
};

export const ADD_SPEC_BLOCK_IMAGE = 'ADD_SPEC_BLOCK_IMAGE';
export const ADD_SPEC_BLOCK_IMAGE_ERROR = 'ADD_SPEC_BLOCK_IMAGE_ERROR';
export const ADD_SPEC_BLOCK_IMAGE_SUCCESS = 'ADD_SPEC_BLOCK_IMAGE_SUCCESS';
export const onAddSpecBlockImage = ({ blockID, imageID, specID }) => async (
	dispatch,
	getState,
) => {
	dispatch(onActionCreator(ADD_SPEC_BLOCK_IMAGE));

	try {
		const { auth } = getState();
		const { blocks: updatedBlocks } = await updateSpecBlockImage({
			blockID,
			imageID,
			specID,
			userID: auth.user?.id,
		});

		return dispatch(
			onActionCreator(ADD_SPEC_BLOCK_IMAGE_SUCCESS, { blocks: updatedBlocks }),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(ADD_SPEC_BLOCK_IMAGE_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const REMOVE_SPEC_BLOCK_IMAGE = 'REMOVE_SPEC_BLOCK_IMAGE';
export const REMOVE_SPEC_BLOCK_IMAGE_ERROR = 'REMOVE_SPEC_BLOCK_IMAGE_ERROR';
export const REMOVE_SPEC_BLOCK_IMAGE_SUCCESS =
	'REMOVE_SPEC_BLOCK_IMAGE_SUCCESS';
export const onRemoveSpecBlockImage = ({ blockID, specID }) => async (
	dispatch,
	getState,
) => {
	dispatch(onActionCreator(REMOVE_SPEC_BLOCK_IMAGE));

	try {
		const { auth } = getState();
		const { blocks: updatedBlocks } = await deleteSpecBlockImage({
			blockID,
			specID,
			userID: auth.user?.id,
		});

		return dispatch(
			onActionCreator(REMOVE_SPEC_BLOCK_IMAGE_SUCCESS, {
				blocks: updatedBlocks,
			}),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(REMOVE_SPEC_BLOCK_IMAGE_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const ADD_SPEC_BLOCK_TEXT = 'ADD_SPEC_BLOCK_TEXT';
export const ADD_SPEC_BLOCK_TEXT_ERROR = 'ADD_SPEC_BLOCK_TEXT_ERROR';
export const ADD_SPEC_BLOCK_TEXT_SUCCESS = 'ADD_SPEC_BLOCK_TEXT_SUCCESS';
export const onAddSpecBlockText = ({ blockID, specID, textValue }) => async (
	dispatch,
	getState,
) => {
	dispatch(onActionCreator(ADD_SPEC_BLOCK_TEXT));

	try {
		const { auth } = getState();
		const { blocks: updatedBlocks } = await addSpecBlockText({
			blockID,
			specID,
			textValue,
			userID: auth.user?.id,
		});

		return dispatch(
			onActionCreator(ADD_SPEC_BLOCK_TEXT_SUCCESS, { blocks: updatedBlocks }),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(ADD_SPEC_BLOCK_TEXT_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const REMOVE_SPEC_BLOCK_TEXT = 'REMOVE_SPEC_BLOCK_TEXT';
export const REMOVE_SPEC_BLOCK_TEXT_ERROR = 'REMOVE_SPEC_BLOCK_TEXT_ERROR';
export const REMOVE_SPEC_BLOCK_TEXT_SUCCESS = 'REMOVE_SPEC_BLOCK_TEXT_SUCCESS';
export const onRemoveSpecBlockText = ({ textID, specID }) => async (
	dispatch,
	getState,
) => {
	dispatch(onActionCreator(REMOVE_SPEC_BLOCK_TEXT));

	try {
		const { auth } = getState();
		const { blocks: updatedBlocks } = await deleteSpecBlockText({
			specID,
			textID,
			userID: auth.user?.id,
		});

		return dispatch(
			onActionCreator(REMOVE_SPEC_BLOCK_TEXT_SUCCESS, {
				blocks: updatedBlocks,
			}),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(REMOVE_SPEC_BLOCK_TEXT_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const UPDATE_SPEC_BLOCK_TEXT = 'UPDATE_SPEC_BLOCK_TEXT';
export const UPDATE_SPEC_BLOCK_TEXT_ERROR = 'UPDATE_SPEC_BLOCK_TEXT_ERROR';
export const UPDATE_SPEC_BLOCK_TEXT_SUCCESS = 'UPDATE_SPEC_BLOCK_TEXT_SUCCESS';
export const onUpdateSpecBlockText = ({
	blockID,
	specID,
	textID,
	textValue,
}) => async (dispatch, getState) => {
	dispatch(onActionCreator(UPDATE_SPEC_BLOCK_TEXT));

	try {
		const { auth } = getState();
		const { blocks: updatedBlocks } = await updateSpecBlockText({
			blockID,
			specID,
			textID,
			textValue,
			userID: auth.user?.id,
		});

		return dispatch(
			onActionCreator(UPDATE_SPEC_BLOCK_TEXT_SUCCESS, {
				blocks: updatedBlocks,
			}),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(UPDATE_SPEC_BLOCK_TEXT_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};

export const SORT_SPEC_BLOCKS = 'SORT_SPEC_BLOCKS';
export const SORT_SPEC_BLOCKS_ERROR = 'SORT_SPEC_BLOCKS_ERROR';
export const SORT_SPEC_BLOCKS_SUCCESS = 'SORT_SPEC_BLOCKS_SUCCESS';
export const onSortSpecBlocks = ({ blocksIDs, specID }) => async (
	dispatch,
	getState,
) => {
	dispatch(onActionCreator(SORT_SPEC_BLOCKS));

	try {
		const { auth, specDocument } = getState();
		const sortedSpecBlocks = blocksIDs.reduce((blocks, blockID) => {
			const found = specDocument.blocks.find((block) => block.id === blockID);

			if (!found) {
				return blocks;
			}

			return blocks.concat({
				block: found.id,
				product_item: found.type === 'Product' ? found.item : null,
				type: found.type,
			});
		}, []);
		const { blocks: updatedBlocks } = await sortSpecBlocks({
			specID,
			blocks: sortedSpecBlocks,
			userID: auth.user?.id,
		});

		return dispatch(
			onActionCreator(SORT_SPEC_BLOCKS_SUCCESS, { blocks: updatedBlocks }),
		);
	} catch (error) {
		return dispatch(
			onActionCreator(SORT_SPEC_BLOCKS_ERROR, {
				error: true,
				nativeError: error,
			}),
		);
	}
};
