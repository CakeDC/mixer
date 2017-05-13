import React from 'react'
import { FetchData } from '../../components/FetchData'
import { PluginsList } from '../../components/PluginsList'

const HomeView = () => (
    <div className="row">
        <div className="col-md-6">
            <h3>Top Starred</h3>
            <FetchData namespace="homeTopStarred" query="packages?sort=last_week_stars&direction=desc&limit=4">
                <PluginsList className="row" itemContainerClass="col-sm-12" />
            </FetchData>
        </div>
        <div className="col-md-6">
            <h3>Top Downloaded</h3>
            <FetchData namespace="homeTopDownloaded" query="packages?sort=last_week_downloads&direction=desc&limit=4">
                <PluginsList className="row" itemContainerClass="col-sm-12" />
            </FetchData>
        </div>
        <div className="col-md-6">
            <h3>New Releases</h3>
            <FetchData namespace="homeNewPlugins" query="packages?sort=latest_release_date&direction=desc&limit=4">
                <PluginsList className="row" itemContainerClass="col-sm-12" />
            </FetchData>
        </div>
        <div className="col-md-6">
            <h3>New Plugins</h3>
            <FetchData namespace="homeNewReleases" query="packages?sort=created&direction=desc&&limit=4">
                <PluginsList className="row" itemContainerClass="col-sm-12" />
            </FetchData>
        </div>
    </div>
)

export default HomeView;
