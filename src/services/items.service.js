import { API_BASE_URL } from '../config/constants/environment';
import { getJsonRequest } from '../modules/requests';
import { factoryService, formatParams } from '../modules/services';

/**
 * Gets the list of items by params (page, limit, sort, keywords).
 */
export const getItems = factoryService(
  (params) => getJsonRequest(`${API_BASE_URL}/items${formatParams(params || {})}`),
);



