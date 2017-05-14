import 'whatwg-fetch'

import { installed, uninstalled } from '../../views/InstalledView/actions'

export const REQUEST_INSTALL = 'REQUEST_INSTALL'
export const RECEIVE_INSTALL = 'RECEIVE_INSTALL'
export const REQUEST_UNINSTALL = 'REQUEST_UNINSTALL'
export const RECEIVE_UNINSTALL = 'RECEIVE_UNINSTALL'

function requestInstall(name) {
    return {
        type: REQUEST_INSTALL,
        name
    }
}

function receiveInstall(dispatch, name, json) {
    dispatch(installed(name, json.data.description))

    return {
        type: RECEIVE_INSTALL,
        name,
        data: json.data
    }
}

function requestUninstall(name) {
    return {
        type: REQUEST_UNINSTALL,
        name
    }
}

function receiveUninstall(dispatch, name, json) {
    dispatch(uninstalled(name))

    return {
        type: RECEIVE_UNINSTALL,
        name,
        data: json.data
    }
}

function shouldAction(state, name) {
    const results = state.installButton
    if (!results) {
        return true
    } else {
        return !results.isInstalling;
    }
}

export function install(name, description) {
    return (dispatch, getState) => {
        if (shouldAction(getState(), name)) {
            return dispatch(dispatch => {
                dispatch(requestInstall(name))

                return fetch('install.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            package: name,
                        })
                    })
                    .then(response => response.json())
                    .then(json => dispatch(receiveInstall(dispatch, name, json)))
            })
        }
    }
}

export function uninstall(name) {
    return (dispatch, getState) => {
        if (shouldAction(getState(), name)) {
            return dispatch(dispatch => {
                dispatch(requestUninstall(name))

                return fetch('uninstall.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            package: name,
                        })
                    })
                    .then(response => response.json())
                    .then(json => dispatch(receiveUninstall(dispatch, name, json)))
            })
        }
    }
}
