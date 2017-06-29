import { REQUEST_BAKE, RECEIVE_BAKE } from './actions'

const initialState = {
    isFetching: false,
    tables: []
}

const bakeryView = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_BAKE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_BAKE:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}

export { bakeryView }
