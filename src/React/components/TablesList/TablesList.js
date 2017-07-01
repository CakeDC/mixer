import React from 'react'

import { TableListItem } from '../TableListItem'

const TablesList = ({ data, isFetching = false, onSelectionChange }) => (
    (typeof(data.map) === 'function') && <div className="row list">
        {data.map((item, i) =>
            <div className="col-sm-4 bakery-table" key={i}>
                <TableListItem data={item} overlay={isFetching} onSelectionChange={onSelectionChange} />
            </div>
        )}
    </div>
)

export default TablesList;
