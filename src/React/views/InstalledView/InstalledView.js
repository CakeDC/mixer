import React from 'react'
import { connect } from 'react-redux'

import { PluginsList } from '../../components/PluginsList'

const InstalledView = ({ data }) => (
    <div>
        <h3>Installed Plugins</h3>
        <PluginsList data={data} className="row" itemContainerClass="col-md-6" />
    </div>
)

function mapStateToProps(state, ownProps) {
    const { data } = state.installedView;

    return { data }
}

export default connect(mapStateToProps)(InstalledView)
