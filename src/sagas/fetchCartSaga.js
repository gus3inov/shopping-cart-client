import { take, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { apiUrl } from '../constants/api';
import {
    SET_CURRENT_USER,
    setCartItems,
} from './../actions';

export function* fetchCartSaga() {
    const { user: {id} } = yield take(SET_CURRENT_USER);
    const response = yield fetch(`${apiUrl}/cart/${id}`);
    const { items } = yield response.json();

    yield put(setCartItems(items));
} 