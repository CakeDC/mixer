import { PLUGIN_INSTALLED, PLUGIN_UNINSTALLED, PLUGIN_UPDATED } from './actions'

const initialState = {
    data: window.installedPlugins
}

const installedView = (state = initialState, action) => {
    switch(action.type) {
        case PLUGIN_INSTALLED:
            return Object.assign({}, state, {
                data: state.data.concat({name: action.name, description: action.description, version: action.latestRelease})
                //isInstalling: action.name
            })
        case PLUGIN_UNINSTALLED:
            return Object.assign({}, state, {
                data: state.data.filter((item) => item.name !== action.name).map((item) => item)
                //isInstalling: false,
                //data: action.data
            })
        case PLUGIN_UPDATED:
            return Object.assign({}, state, {
                data: state.data.map((item) => {
                    if (item.name === action.name) {
                        item.version = action.version
                    }

                    return item
                })
            })
        default:
            return state
    }
}

export { installedView }
