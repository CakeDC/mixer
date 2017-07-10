import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'timeago-react'
import NumberFormat from 'react-number-format'

import { PluginButtons } from '../PluginButtons'
import { Loader } from '../Loader'

const PluginListItem = ({ plugin, overlay = false }) => (
    <div className="box box-default">
        <div className="box-header with-border">
            <h3 className="box-title"><Link to={"/view/" + plugin.name}>{plugin.name}</Link></h3>
            <div className="box-tools pull-right">
                {plugin.downloads !== undefined ? (<span className="btn-box-tool"><i className="fa fa-download" /> <NumberFormat value={plugin.downloads} displayType={'text'} thousandSeparator={true} /></span>) : ''}
                {plugin.stars !== undefined ? (<span className="btn-box-tool"><i className="fa fa-star" /> <NumberFormat value={plugin.stars} displayType={'text'} thousandSeparator={true} /></span>) : ''}
            </div>
        </div>
        <div className="box-body">
            <p>{plugin.description}</p>
            <div className="direct-chat-info">
                <PluginButtons data={plugin} className="pull-left" />
                {plugin.latest_release_date && <span className="direct-chat-timestamp pull-right"><i className="fa fa-code-fork" /> {plugin.latest_release} released <TimeAgo datetime={plugin.latest_release_date} /></span>}
            </div>
        </div>
        {overlay && <Loader />}
    </div>
)

export default PluginListItem


