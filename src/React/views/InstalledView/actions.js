export const PLUGIN_INSTALLED = 'PLUGIN_INSTALLED'
export const PLUGIN_UNINSTALLED = 'PLUGIN_UNINSTALLED'
export const PLUGIN_UPDATED = 'PLUGIN_UPDATED'

export function installed(name, description, latestRelease) {
    return (dispatch, getState) => {
        return dispatch(dispatch => {
            dispatch({
                type: PLUGIN_INSTALLED,
                name,
                description,
                latestRelease,
            })
        })
    }
}

export function uninstalled(name) {
    return (dispatch, getState) => {
        return dispatch(dispatch => {
            dispatch({
                type: PLUGIN_UNINSTALLED,
                name,
            })
        })
    }
}

export function updated(name, version) {
    return (dispatch, getState) => {
        return dispatch(dispatch => {
            dispatch({
                type: PLUGIN_UPDATED,
                name,
                version,
            })
        })
    }
}
