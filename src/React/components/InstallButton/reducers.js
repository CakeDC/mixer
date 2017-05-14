import { REQUEST_INSTALL, RECEIVE_INSTALL, REQUEST_UNINSTALL, RECEIVE_UNINSTALL } from './actions'

const initialState = {
    query: '',
    isFetching: false,
    data: null
}

const installButton = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_INSTALL:
            return Object.assign({}, state, {
                isInstalling: action.name
            })
        case RECEIVE_INSTALL:
            return Object.assign({}, state, {
                isInstalling: false,
                data: action.data
            })
        case REQUEST_UNINSTALL:
            return Object.assign({}, state, {
                isInstalling: action.name
            })
        case RECEIVE_UNINSTALL:
            return Object.assign({}, state, {
                isInstalling: false,
                data: action.data
            })
        default:
            return state
    }
}

export { installButton }
