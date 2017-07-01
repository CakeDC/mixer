import React, { Component } from 'react'

import { Loader } from '../Loader'

class TableListItem extends Component {
    componentDidMount() {
        this.props.onSelectionChange()
    }

    render() {
        const { data, overlay = false, onSelectionChange } = this.props

        return <div className="box box-default">
            <div className="box-header with-border">
                <h3 className="box-title">{data.name}</h3>
            </div>
            <div className="box-body">
                {['Model', 'Controller', 'Templates'].map((subCommand, k) => {
                    const defaultChecked = (data[subCommand.toLowerCase() + 'Exists'] === false)
                    const key = subCommand + Number(defaultChecked).toString()

                    return <div className="checkbox" key={key}>
                        <input
                            type="checkbox"
                            name={`tables[${data.name}][${subCommand}]`}
                            id={`${data.name}_${subCommand}`}
                            value="1"
                            defaultChecked={defaultChecked}

                            onChange={(e) => {
                                if (e.target.checked && data[subCommand.toLowerCase() + 'Exists'] === true) {
                                    if (!window.confirm(subCommand + ' for table `' + data.name + '` already exists. Are you sure you want to overwrite it?')) {
                                        e.target.checked = false

                                        return false
                                    }
                                }

                                onSelectionChange()
                            }}
                        />
                        <label htmlFor={`${data.name}_${subCommand}`}>{subCommand}</label>
                    </div>
                })}
            </div>
            {overlay && <Loader />}
        </div>
    }
}

/*
const TableListItem = ({ data, overlay = false, onSelectionChange }) => (
    <div className="box box-default">
        <div className="box-header with-border">
            <h3 className="box-title">{data.name}</h3>
        </div>
        <div className="box-body">
            {['Model', 'Controller', 'Templates'].map((subCommand, k) => (
                <div className="checkbox" key={k}>
                    <input
                        type="checkbox"
                        name={`${data.name}[${subCommand}]`}
                        id={`${data.name}_${subCommand}`}
                        value="1"
                        defaultChecked={(data[subCommand.toLowerCase() + 'Exists'] === false)}
                        onChange={onSelectionChange}
                    />
                    <label htmlFor={`${data.name}_${subCommand}`}>{subCommand}</label>
                </div>
            ))}
        </div>
        {overlay && <Loader />}
    </div>
)
*/

export default TableListItem
