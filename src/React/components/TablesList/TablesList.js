import React from 'react'
import { TableListItem } from '../TableListItem'

const TablesList = ({ data, isFetching = false, className = 'row list', itemContainerClass = 'col-sm-6 list-item' }) => (
    (typeof(data.map) === 'function') && <div className={className}>
        {data.map((item, i) =>
            <div className={itemContainerClass} key={i}>
                <TableListItem data={item} overlay={isFetching} />
            </div>
        )}
    </div>
)

export default TablesList
