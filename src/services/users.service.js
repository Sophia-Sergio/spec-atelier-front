import { API_BASE_URL } from '../config/constants/environment';
import { getJsonRequest, postJsonRequest } from '../modules/requests';
import { factoryService, formatParams } from '../modules/services';

export const getUsers = factoryService((params) =>
  getJsonRequest(`${API_BASE_URL}/users${formatParams(params || {})}`),
);

export const impersonateUser = factoryService((data) =>
  postJsonRequest(`${API_BASE_URL}/users/impersonate`, data),
);
