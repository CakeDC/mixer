import React from 'react'
import { FetchData } from '../../components/FetchData'
import { TablesList } from '../../components/TablesList'

const BakeryView = () => (
    <div>
        <h3>Bakery</h3>
        <FetchData namespace="tables" query="tables.json">
            <TablesList />
        </FetchData>
    </div>
)

export default BakeryView;
