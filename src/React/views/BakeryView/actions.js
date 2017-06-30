import 'whatwg-fetch'

import { fetchData } from '../../components/FetchData/actions'

export const REQUEST_BAKE = 'REQUEST_BAKE'
export const RECEIVE_BAKE = 'RECEIVE_BAKE'
export const RECEIVE_BAKE_ENABLED = 'RECEIVE_BAKE_ENABLED'

function requestBake(tables) {
    return {
        type: REQUEST_BAKE,
        tables
    }
}

function receiveBakeEnabled(enabled) {
    return {
        type: RECEIVE_BAKE_ENABLED,
        enabled
    }
}

export function updateBakeEnabled(enabled) {
    return dispatch => {
        dispatch(receiveBakeEnabled(enabled))
    }
}

function receiveBake(dispatch, json) {
    dispatch(baked())

    return {
        type: RECEIVE_BAKE,
    }
}

function baked() {
    return (dispatch) => {
        return dispatch(fetchData('tables', 'tables.json'))
    }
}

function shouldAction(state) {
    const results = state.bakeryView
    if (!results) {
        return true
    } else {
        return !results.isFetching;
    }
}

export function bake(form) {
    return (dispatch, getState) => {
        if (shouldAction(getState())) {
            return dispatch(dispatch => {
                dispatch(requestBake(form))

                return fetch('bake.json', {
                        method: 'POST',
                        body: new FormData(form)
                    })
                    .then(response => response.json())
                    .then(json => dispatch(receiveBake(dispatch, json)))
            })
        }
    }
}
