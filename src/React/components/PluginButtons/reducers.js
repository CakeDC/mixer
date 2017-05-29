import { REQUEST_INSTALL, RECEIVE_INSTALL, REQUEST_UNINSTALL, RECEIVE_UNINSTALL, REQUEST_UPDATE, RECEIVE_UPDATE } from './actions'

const initialState = {
    query: '',
    isFetching: false,
    data: null
}

const pluginButtons = (state = initialState, action) => {
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
        case REQUEST_UPDATE:
            return Object.assign({}, state, {
                isInstalling: action.name
            })
        case RECEIVE_UPDATE:
            return Object.assign({}, state, {
                isInstalling: false,
                data: action.data
            })
        default:
            return state
    }
}

export { pluginButtons }
