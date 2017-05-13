import { REQUEST_DATA, RECEIVE_DATA } from './actions'

const initialState = {
    query: '',
    isFetching: false,
    data: null
}

const fetchData = (namespace) => (state = initialState, action) => {
    switch(action.type) {
        case `${namespace}/${REQUEST_DATA}`:
            return Object.assign({}, state, {
                isFetching: true
            })
        case `${namespace}/${RECEIVE_DATA}`:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            })
        default:
            return state
    }
}

export { fetchData }
