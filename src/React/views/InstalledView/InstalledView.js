import React from 'react'
import { connect } from 'react-redux'

import { InstalledPluginsList } from '../../components/InstalledPluginsList'
import { FetchData } from '../../components/FetchData'

const InstalledView = ({ data }) => (
    <div>
        <h3>Installed Plugins</h3>
        <FetchData namespace="installedPlugins" query={`${window.apiUrl}/packages?n=${data.join(',')}`}>
            <InstalledPluginsList className="row list" itemContainerClass="col-md-6 list-item" />
        </FetchData>
    </div>
)

function mapStateToProps(state, ownProps) {
    const { data } = state.installedView;

    return { data: data.map((item) => item.name) }
}

export default connect(mapStateToProps)(InstalledView)
