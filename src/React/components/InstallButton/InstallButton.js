import React, { Component } from 'react'
import { connect } from 'react-redux'

import { install, uninstall } from './actions'

class InstallButton extends Component {
    constructor(props) {
        super(props)

        this.handleInstall = this.handleInstall.bind(this)
        this.handleUninstall = this.handleUninstall.bind(this)
    }

    handleInstall(event) {
        event.preventDefault()

        const { dispatch, name } = this.props

        if (confirm('Are you sure you want to install ' + name + '?')) {
            dispatch(install(name))
        }
    }

    handleUninstall(event) {
        event.preventDefault()

        const { dispatch, name } = this.props

        if (confirm('Are you sure you want to uninstall ' + name + '?')) {
            dispatch(uninstall(name))
        }
    }

    render() {
        const { isInstalled, size, text, isInstalling, name } = this.props

        const button = isInstalled
            ? (<button className={`btn btn-warning btn-social btn-install ${size}`} onClick={this.handleUninstall}><i className="fa fa-trash" /><span>Uninstall{text}</span></button>)
            : (<button className={`btn btn-primary btn-social btn-install ${size}`} onClick={this.handleInstall}><i className="fa fa-download" /><span>Install{text}</span></button>)

        const loader = (isInstalling === name)
            ? <div className="global-overlay"><div><h3>{isInstalled ? 'Uninstalling' : 'Installing'} <strong>{name}</strong><br />Please wait, it might take a bit...</h3><i className="fa fa-cog fa-spin fa-3x fa-fw" /></div></div>
            : ''

        return <div style={{ display: 'inline-block' }}>{loader}{button}</div>
    }
}

function mapStateToProps(state, ownProps) {
    const { name, description = '', size = 'btn-sm', text = '' } = ownProps;

    let isInstalled = false;
    if (state.installedView.data.find((item) => { return item.name === name })) {
        isInstalled = true;
    }

    const { isInstalling } = state.installButton || {
        isInstalling: false
    }

    return { name, description, isInstalled, size, text, isInstalling }
}

export default connect(mapStateToProps)(InstallButton)
