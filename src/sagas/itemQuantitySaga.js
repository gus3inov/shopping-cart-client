import { takeLatest, select, put, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { apiUrl } from '../constants/api';
import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    increaseItemQuantity,
    FETCHING, FETCHED
} from './../actions';
import {
    currentUserSelector
} from '../selectors';

export function* handleIncreaseItemQuantity({ id }) {
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `${apiUrl}/cart/add/${user.get('id')}/${id}`);
    console.info('Got response', response);

    if(response.status !== 200) {
        console.warn('Received non-200 status::', response);
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
    yield [
        takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity), 
        takeLatest(DECREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
    ]
}