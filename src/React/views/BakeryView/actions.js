import 'whatwg-fetch'

import { fetchData } from '../../components/FetchData/actions'

export const REQUEST_BAKE = 'REQUEST_BAKE'
export const RECEIVE_BAKE = 'RECEIVE_BAKE'

function requestBake(tables) {
    return {
        type: REQUEST_BAKE,
        tables
    }
}

function receiveBake(dispatch, json) {
    console.log('receiveBake');
    //dispatch((dispatch, getState) => dispatch())
    //dispatch((dispatch, getState) => dispatch(fetchData('tables', 'tables.json')))
    dispatch(baked())

    return {
        type: RECEIVE_BAKE,
    }
}


function baked() {
    console.log('baked');
    return (dispatch, getState) => {
        return dispatch(fetchData('tables', 'tables.json'))
    }
    /*
    return (dispatch, getState) => {
        return dispatch(dispatch => {
            dispatch(requestData('tables', 'tables.json'))
        })
    }
    return (dispatch) => {
        return dispatch(dispatch => {
            dispatch(requestData('tables', 'tables.json'))
        })
    }*/
}

function shouldAction(state) {
    const results = state.bakeryView
    if (!results) {
        return true
    } else {
        return !results.isFetching;
    }
}

export function bake(tables) {
    return (dispatch, getState) => {
        if (shouldAction(getState())) {
            return dispatch(dispatch => {
                dispatch(requestBake(tables))

                return fetch('bake.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tables
                        })
                    })
                    .then(response => response.json())
                    .then(json => dispatch(receiveBake(dispatch, json)))
            })
        }
    }
}
