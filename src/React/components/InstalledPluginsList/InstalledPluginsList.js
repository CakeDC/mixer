import React from 'react'
import { connect } from 'react-redux'

import { PluginListItem } from '../PluginListItem'

const InstalledPluginsList = ({ data, isFetching = false, className = 'row list', itemContainerClass = 'col-sm-6 list-item' }) => (
    (typeof(data.map) === 'function') && <div className={className}>
        {data.map((item, i) =>
            <div className={itemContainerClass} key={i}>
                <PluginListItem plugin={item} overlay={isFetching} />
            </div>
        )}
    </div>
)

function mapStateToProps(state, ownProps) {
    const { data, isFetching } = ownProps || {
        data: [],
        isFetching: false,
    }

    const installedPlugins = state.installedView.data.map((item) => {
        const installed = data.find((fetchedItem) => fetchedItem.name === item.name)
        return installed
            ? installed
            : item
    })

    return { data: installedPlugins, isFetching }
}

export default connect(mapStateToProps)(InstalledPluginsList)
