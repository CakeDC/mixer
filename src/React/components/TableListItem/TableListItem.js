import React from 'react'
//import { Link } from 'react-router-dom'
import { Loader } from '../Loader'
import { Checkbox } from 'react-icheck'
//import 'icheck/skins/all.css'

const TableListItem = ({ data, overlay = false }) => (
    <div className="box box-default">
        <div className="box-header with-border">
            <h3 className="box-title">{data.name}</h3>
        </div>
        <div className="box-body">
            {['model', 'controller', 'template'].map((subCommand, k) => (
                <Checkbox key={k} checkboxClass="icheckbox_minimal-red" increaseArea="20%" label={" " + subCommand} checked={(data[subCommand + 'Exists'] === false)} />
            ))}
        </div>
        {overlay && <Loader />}
    </div>
)

export default TableListItem
