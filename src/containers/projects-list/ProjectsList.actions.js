import onActionCreator, { cleanObject } from '../../config/store/helpers';
import { getProjects  } from '../../services/projects.service';

export const GET_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';

export const getMyProjects = params => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const { projects } = await getProjects(user.id, cleanObject(params));
    dispatch(onActionCreator(GET_PROJECTS, { projects, loading: false, params }));
  } catch (error) {
    dispatch(onActionCreator(GET_PROJECTS_ERROR, { loading: false, error: true, params }));
  }
};

