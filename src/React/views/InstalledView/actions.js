export const PLUGIN_INSTALLED = 'PLUGIN_INSTALLED'
export const PLUGIN_UNINSTALLED = 'PLUGIN_UNINSTALLED'

export function installed(name, description) {
    return (dispatch, getState) => {
        return dispatch(dispatch => {
            dispatch({
                type: PLUGIN_INSTALLED,
                name,
                description,
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
