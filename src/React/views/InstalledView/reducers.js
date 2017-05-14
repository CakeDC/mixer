import { PLUGIN_INSTALLED, PLUGIN_UNINSTALLED } from './actions'

const initialState = {
    data: window.installedPlugins
}

const installedView = (state = initialState, action) => {
    switch(action.type) {
        case PLUGIN_INSTALLED:
            return Object.assign({}, state, {
                data: state.data.concat({name: action.name, description: action.description})
                //isInstalling: action.name
            })
        case PLUGIN_UNINSTALLED:
            return Object.assign({}, state, {
                data: state.data.filter((item) => item.name !== action.name).map((item) => item)
                //isInstalling: false,
                //data: action.data
            })
        default:
            return state
    }
}

export { installedView }
