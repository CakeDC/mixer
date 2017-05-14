import 'whatwg-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

function requestData(namespace, query) {
    return {
        type: `${namespace}/${REQUEST_DATA}`,
        query
    }
}

function receiveData(namespace, query, json) {
    return {
        type: `${namespace}/${RECEIVE_DATA}`,
        query,
        data: json.data
    }
}

function fetchData(namespace, query) {
    return dispatch => {
        dispatch(requestData(namespace, query))

        window.scrollTo(0, 0);

        return fetch(`${window.apiUrl}/${query}`)
            .then(response => response.json())
            .then(json => dispatch(receiveData(namespace, query, json)))
    }
}

function shouldFetchData(state, namespace, q) {
    const results = state[namespace]
    if (!results) {
        return true
    } else {
        return !results.isFetching;
    }
}

export function fetchDataIfNeeded(namespace, q) {
    return (dispatch, getState) => {
        if (shouldFetchData(getState(), namespace, q)) {
            return dispatch(fetchData(namespace, q))
        }
    }
}
