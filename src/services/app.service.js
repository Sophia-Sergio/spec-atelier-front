import { API_BASE_URL } from '../config/constants/environment';
import { getJsonRequest } from '../modules/requests';
import { factoryService, formatParams } from '../modules/services';

/**
 * Get default app data
 */
export const getDefaultData = factoryService((params) => getJsonRequest(`${API_BASE_URL}/configs/project_data${formatParams(params || {})}`));
