import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'timeago-react';

const PluginListItem = ({ plugin, overlay = false }) => (
    <div className="box box-default">
        <div className="box-header with-border">
            <h3 className="box-title"><Link to={"/view/" + plugin.name}>{plugin.name}</Link></h3>
            <div className="box-tools pull-right">
                <span className="btn btn-box-tool"><i className="fa fa-download" /> {plugin.downloads}</span>
                <span className="btn btn-box-tool"><i className="fa fa-star" /> {plugin.stars}</span>
            </div>
        </div>
        <div className="box-body">
            <p>{plugin.description}</p>
            <div className="direct-chat-info">
                <button className="btn btn-xs btn-primary btn-social pull-left"><i className="fa fa-download" />Install</button>
                {plugin.latest_release_date && <span className="direct-chat-timestamp pull-right"><TimeAgo datetime={plugin.latest_release_date} /></span>}
            </div>
        </div>
        {overlay &&
            <div className="overlay"><i className="fa fa-refresh fa-spin" /></div>
        }
    </div>
)

export default PluginListItem


