import { REQUEST_BAKE, RECEIVE_BAKE, RECEIVE_BAKE_ENABLED } from './actions'

const initialState = {
    isFetching: false,
    tables: {}
}

const kitchenView = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_BAKE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_BAKE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case RECEIVE_BAKE_ENABLED:
            return Object.assign({}, state, {
                enabled: action.enabled
            })
        default:
            return state
    }
}

export { kitchenView }
