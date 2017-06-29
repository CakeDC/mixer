import React from 'react'

import { Loader } from '../Loader'

const TableListItem = ({ data, overlay = false }) => (
    <div className="box box-default">
        <div className="box-header with-border">
            <h3 className="box-title">{data.name}</h3>
        </div>
        <div className="box-body">
            {['Model', 'Controller', 'Templates'].map((subCommand, k) => (
                <div className="checkbox" key={k}>
                    <input type="checkbox" name={`${data.name}[${subCommand}]`} id={`${data.name}_${subCommand}`} value="1" defaultChecked={(data[subCommand.toLowerCase() + 'Exists'] === false)} />
                    <label htmlFor={`${data.name}_${subCommand}`}>{subCommand}</label>
                </div>
            ))}
        </div>
        {overlay && <Loader />}
    </div>
)

export default TableListItem
