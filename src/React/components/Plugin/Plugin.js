import React from 'react'
import { MarkdownPreview } from 'react-marked-markdown'

const Plugin = ({ data }) => (
    <div className="row">
        <div className="col-md-8">
            <div className="box box-solid">
                <div className="box-body">
                    <MarkdownPreview value={data.readme} />
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="box box-solid">
                <div className="box-header with-border">
                    <h3 className="box-title">{data.name}</h3>
                </div>
                <div className="box-body">
                    asdas
                </div>
            </div>
        </div>
    </div>
)

export default Plugin
