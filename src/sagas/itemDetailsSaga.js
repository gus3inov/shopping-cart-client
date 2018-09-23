import { take, fork, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { apiUrl } from '../constants/api';
import {
    SET_CART_ITEMS,
    setItemDetails,
} from './../actions';

export function* loadItemDetails(item) {
    const { id } = item;
    const response = yield fetch(`${apiUrl}/items/${id}`);
    const data = yield response.json();
    const info = data[0];
    yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
    const { items } = yield take(SET_CART_ITEMS);
    yield items.map(item => fork(loadItemDetails, item));
}