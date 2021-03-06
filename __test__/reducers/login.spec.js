/* eslint-disable no-undef */
import { LOG_IN, LOG_IN_ERROR } from '../../src/config/constants';
import { loginReducer } from '../../src/reducers';
import { initialState } from '../../src/reducers/login.reducer';

describe('Login Reducer', () => {
	it('should return default state', () => {
		const resultState = loginReducer(initialState, { type: 'LOG_IN_NEW' });
		expect(resultState).toEqual(initialState);
	});

	it('should return LOG_IN state with new state', () => {
		const resultState = loginReducer(initialState, {
			type: LOG_IN,
			payload: {
				isLogin: true,
				userData: {
					text: 'You are logged in',
				},
			},
		});

		expect(resultState.isLogin).toBeTruthy();
		expect(resultState.userData).toEqual({ text: 'You are logged in' });
	});

	it('should return LOG_IN_ERROR state with new state', () => {
		const resultState = loginReducer(initialState, {
			type: LOG_IN_ERROR,
			payload: {
				isLogin: false,
				error: 'New error',
			},
		});

		expect(resultState.isLogin).toBeFalsy();
		expect(resultState.error).toEqual('New error');
	});
});
