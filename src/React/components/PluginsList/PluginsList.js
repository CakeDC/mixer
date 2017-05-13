import React from 'react'
import { PluginListItem } from '../PluginListItem'

const PluginsList = ({ data, isFetching = false, className = 'row list', itemContainerClass = 'col-sm-6 list-item' }) => (
    (typeof(data.map) === 'function') && <div className={className}>
        {data.map((item, i) =>
            <div className={itemContainerClass} key={i}>
                <PluginListItem plugin={item} overlay={isFetching} />
            </div>
        )}
    </div>
)

export default PluginsList
