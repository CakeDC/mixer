import 'whatwg-fetch'

import { installed, uninstalled, updated } from '../../views/InstalledView/actions'

export const REQUEST_INSTALL = 'REQUEST_INSTALL'
export const RECEIVE_INSTALL = 'RECEIVE_INSTALL'
export const REQUEST_UNINSTALL = 'REQUEST_UNINSTALL'
export const RECEIVE_UNINSTALL = 'RECEIVE_UNINSTALL'
export const REQUEST_UPDATE = 'REQUEST_UPDATE'
export const RECEIVE_UPDATE = 'RECEIVE_UPDATE'

function requestInstall(name) {
    return {
        type: REQUEST_INSTALL,
        name
    }
}

function receiveInstall(dispatch, name, json) {
    dispatch(installed(name, json.data.description, json.data.latest_release))

    return {
        type: RECEIVE_INSTALL,
        name,
        data: json.data
    }
}

function requestUpdate(name, version, dev) {
    return {
        type: REQUEST_UPDATE,
        name,
        version,
        dev,
    }
}

function receiveUpdate(dispatch, name, json) {
    dispatch(updated(name, json.version))

    return {
        type: RECEIVE_UPDATE,
        name
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
        name
    }
}

function shouldAction(state, name) {
    const results = state.pluginButtons
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

export function update(name, version, dev) {
    return (dispatch, getState) => {
        if (shouldAction(getState(), name)) {
            return dispatch(dispatch => {
                dispatch(requestUpdate(name, version, dev))

                return fetch('update.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        package: name,
                        version: version,
                        dev: dev ? 1 : 0
                    })
                })
                    .then(response => response.json())
                    .then(json => dispatch(receiveUpdate(dispatch, name, json)))
            })
        }
    }
}
