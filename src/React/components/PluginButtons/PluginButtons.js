import React, { Component } from 'react'
import { connect } from 'react-redux'

import { install, uninstall, update } from './actions'

class PluginButtons extends Component {
    constructor(props) {
        super(props)

        this.handleInstall = this.handleInstall.bind(this)
        this.handleUninstall = this.handleUninstall.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleInstall(event) {
        event.preventDefault()

        const { dispatch, data } = this.props

        if (confirm('Are you sure you want to install ' + data.name + '?')) {
            dispatch(install(data.name))
        }
    }

    handleUninstall(event) {
        event.preventDefault()

        const { dispatch, data } = this.props

        if (confirm('Are you sure you want to uninstall ' + data.name + '?')) {
            dispatch(uninstall(data.name))
        }
    }

    handleUpdate(event) {
        event.preventDefault()

        const { dispatch, data, dev } = this.props

        if (confirm('Are you sure you want to update ' + data.name + ' to ' + data.latest_release +  '?')) {
            dispatch(update(data.name, data.latest_release, dev))
        }
    }

    render() {
        const { data, size, installedVersion, isInstalling, className = '' } = this.props

        let children = []

        if (isInstalling === data.name) {
            children.push(<div className="global-overlay" key="loader"><div><h3>Please wait, it might take a bit...</h3><i className="fa fa-cog fa-spin fa-3x fa-fw" /></div></div>)
        }

        if (installedVersion) {
            children.push(<button className={`btn btn-warning btn-social btn-install ${size}`} onClick={this.handleUninstall} key="uninstall"><i className="fa fa-trash" /><span>Uninstall {installedVersion}</span></button>);
            if (data.latest_release && installedVersion !== data.latest_release) {
                children.push(<button className={`btn btn-primary btn-social btn-install ${size}`} onClick={this.handleUpdate} key="update"><i className="fa fa-refresh" /><span>Update to {data.latest_release}</span></button>);
            }
        } else {
            children.push(<button className={`btn btn-primary btn-social btn-install ${size}`} onClick={this.handleInstall} key="install"><i className="fa fa-download" /><span>Install</span></button>);
        }

        return <div style={{ display: 'inline-block' }} className={"plugin-buttons " + className}>{children.map((child) => child)}</div>
    }
}

function mapStateToProps(state, ownProps) {
    const { data, size = 'btn-sm', text = '', className = '' } = ownProps;

    let installedVersion = false;
    let dev = false;
    const installed = state.installedView.data.find((item) => { return item.name === data.name });
    if (installed) {
        installedVersion = installed.version;
        dev = installed.dev;
    }

    const { isInstalling } = state.pluginButtons || {
        isInstalling: false
    }

    return { data, installedVersion, size, text, isInstalling, className, dev }
}

export default connect(mapStateToProps)(PluginButtons)
