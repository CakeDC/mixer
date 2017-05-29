import React from 'react'
import { MarkdownPreview } from 'react-marked-markdown'
import NumberFormat from 'react-number-format'
import TimeAgo from 'timeago-react'

import { PluginButtons } from '../PluginButtons'

const Plugin = ({ data, isFetching = false }) => (
    <div className="row">
        <div className="col-md-8">
            <div className="box box-default readme">
                <div className="box-body with-border">
                    <MarkdownPreview value={data.readme} />
                </div>
                {isFetching && <div className="overlay"><i className="fa fa-refresh fa-spin" /></div>}
            </div>
        </div>
        <div className="col-md-4">
            {data.owner && <div className="box box-widget widget-user">
                <div className="widget-user-header bg-dark-grey">
                    <h3 className="widget-user-username">{data.owner.name}</h3>
                    <h5 className="widget-user-desc"><a href={`http://github.com/${data.owner.login}`} target="_blank">{data.owner.login}</a></h5>
                </div>
                <a href={`http://github.com/${data.owner.login}`} target="_blank" className="widget-user-image"><img className="img-rounded" src={data.owner.avatar_url} alt="User Avatar" /></a>
                <div className="box-footer">
                    <div className="row">
                        <div className="col-sm-4 border-right">
                            <div className="description-block">
                                <h5 className="description-header"><NumberFormat value={data.owner.public_repos} displayType={'text'} thousandSeparator={true} /></h5>
                                <span className="description-text">REPOSITORIES</span>
                            </div>
                        </div>
                        <div className="col-sm-4 border-right">
                            <div className="description-block">
                                <h5 className="description-header"><NumberFormat value={data.owner.followers} displayType={'text'} thousandSeparator={true} /></h5>
                                <span className="description-text">FOLLOWERS</span>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="description-block">
                                <h5 className="description-header"><NumberFormat value={data.owner.following} displayType={'text'} thousandSeparator={true} /></h5>
                                <span className="description-text">FOLLOWING</span>
                            </div>
                        </div>
                    </div>
                </div>
                {isFetching && <div className="overlay"><i className="fa fa-refresh fa-spin" /></div>}
            </div>}
            <div className="box box-solid">
                <div className="box-body text-center">
                    <PluginButtons data={data} size="btn-lg" />
                </div>
                <div className="box-footer no-padding">
                    <ul className="nav nav-stacked">
                        <li><a href={`http://github.com/${data.name}`} target="_blank"><i className="fa fa-fw fa-github" /> {data.name}</a></li>
                        <li><span className="line"><i className="fa fa-fw fa-star" /> Stars <span className="pull-right badge"><NumberFormat value={data.stars} displayType={'text'} thousandSeparator={true} /></span></span></li>
                        <li><span className="line"><i className="fa fa-fw fa-download" /> Downloads <span className="pull-right badge"><NumberFormat value={data.downloads} displayType={'text'} thousandSeparator={true} /></span></span></li>
                        {data.latest_release && <li><span className="line"><i className="fa fa-fw fa-code-fork" /> Latest release <span className="pull-right badge">{data.latest_release}</span></span></li>}
                        {data.latest_release_date && <li><span className="line"><i className="fa fa-fw fa-calendar" /> Released <TimeAgo datetime={data.latest_release_date} className="pull-right badge" /></span></li>}
                        {data.composer && <li>
                            <div className="line">
                                {Object.keys(data.composer).map((req) =>
                                    (Object.keys(data.composer[req]).length === 0 ? '' : <div key={req}>
                                        <strong>{req}</strong>
                                        <ul>
                                            {Object.keys(data.composer[req]).map((key) => <li key={key}><a href={`http://github.com/${key}`} target="_blank">{key}</a>: {data.composer[req][key]}</li>)}
                                        </ul>
                                    </div>)
                                )}
                            </div>
                        </li>}
                    </ul>
                </div>
                {isFetching && <div className="overlay"><i className="fa fa-refresh fa-spin" /></div>}
            </div>
        </div>
    </div>
)

export default Plugin
